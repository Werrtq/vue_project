<template>
    <Category :scene = "scene"></Category>
    <div>
        <el-card style = "margin: 10px 0px;">
            <div v-show = "scene == 0">
                <el-button type="primary" icon = "Plus" :disabled = "!categoryStore.valueC3" @click = "addAttr">添加属性</el-button>
                <el-table border :data="categoryStore.dataAttr" style="width: 100%">
                    <el-table-column label="序号" type = "index" width="80" />
                    <el-table-column prop = "attrName" label="属性名称" width = "120" />
                    <el-table-column prop = "" label="属性值名称">
                        <template # = "{row}">
                            <el-tag v-for = "item in row.attrValueList" :key = "item.id">{{ item.valueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width = "120">
                        <template # = "{row}">
                            <el-button type = "primary" size = "small" icon = "Edit" @click = "updateAttr(row)"></el-button>
                            
                            <el-popconfirm title="确定删除这个属性？" @confirm = "deleteAttr(row.id)">
                                <template #reference>
                                    <el-button type = "primary" size = "small" icon = "Delete"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show = "scene == 1">
                <el-form>
                    <el-form-item label = "属性名称">
                        <el-input v-model = "attrParams.attrName" style = "width: 200px;" placeholder = "请输入属性名"></el-input>
                    </el-form-item>
                </el-form>
                <el-button @click = "addAttrValue" :disabled = "attrParams.attrName ? false:true" type = "primary" icon = "Plus">添加属性值</el-button>
                <el-button type = "primary" @click = "cancel">取消</el-button>
                <el-table :data = "attrParams.attrValueList" border style = "margin: 10px 0px;">
                    <el-table-column label = "序号" type = "index" width = "80"></el-table-column>
                    <el-table-column label = "属性值名称">
                        <template # = "{row, $index}">
                            <el-input :ref = "(el: any) => inputArr[$index] = el" v-if="row.flag" v-model="row.valueName" @blur = "turnShow(row, $index)"></el-input>
                            <div v-else @click = "turnEdit($index)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label = "属性值操作" width = "120">
                        <template # = "{$index}">
                            <el-button type = "primary" size = "small" icon = "Delete" @click = "attrParams.attrValueList.splice($index, 1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button @click = "save" type = "primary">保存</el-button>
                <el-button type = "primary" @click = "cancel">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script lang = "ts" setup>
    import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue';
    import { useCategoryStore } from '../../../store/modules/category';
    import { attrData, attrValueData } from '../../../api/product/attr/type';
    import { reqDeleteAttr, reqSaveAttr } from '../../../api/product/attr';
    import { ElMessage } from 'element-plus';

    let categoryStore = useCategoryStore();
    let scene = ref<number>(0);
    let attrParams = reactive<attrData>({
        attrName: '',
        attrValueList: [],
        categoryId: '',
        categoryLevel: 3
    });
    let inputArr = ref<any>([]);

    watch(  () => categoryStore.valueC3,
            () => {
                categoryStore.dataAttr = [];
                if(!categoryStore.valueC3) return;
                categoryStore.getAttr();
    });

    const addAttr = () => {
        scene.value = 1;
        Object.assign(attrParams, {
            attrName: '',
            attrValueList: [],
            categoryId: '',
            categoryLevel: 3
        });
    }

    const updateAttr = (row: attrData) => {
        scene.value = 1;
        Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
    }

    const cancel = () => {
        scene.value = 0;
    }

    const addAttrValue = () => {
        attrParams.attrValueList.push({
            valueName: '',
            flag: true
        })

        nextTick(() => {
            inputArr.value[attrParams.attrValueList.length - 1].focus();
        })
    }

    const turnShow = (row: attrValueData, index: number) => {

        if(row.valueName.trim() == ''){
            attrParams.attrValueList.splice(index, 1);
            ElMessage({
                type: 'error',
                message: '输入不能为空'
            });
            return;
        }

        let repeat = attrParams.attrValueList.find((item) => {
            if(item != row){
                return item.valueName === row.valueName;
            }
        })

        if(repeat){
            attrParams.attrValueList.splice(index, 1);
            ElMessage({
                type: 'error',
                message: '输入不能重复'
            });
            return;
        }

        row.flag = false;
    }

    const turnEdit = (index: number) => {
        let item = attrParams.attrValueList[index];
        item.flag = true;

        nextTick(() => {
            inputArr.value[index].focus();
        })
    }

    async function save() {
        attrParams.categoryId = categoryStore.valueC3;
        let result = await reqSaveAttr(attrParams);
        if(result.code == 200){
            scene.value = 0;
            ElMessage({
                type: 'success',
                message: attrParams.id? '修改成功' : '添加成功'
            })
            categoryStore.getAttr();
        } else {
            ElMessage({
                type: 'error',
                message: attrParams.id? '修改失败' : '添加失败'
            })
        }
    }

    async function deleteAttr(attrId: number) {
        let result = await reqDeleteAttr(attrId);

        if(result.code == 200){
            ElMessage({
                type: 'success',
                message: '删除成功'
            });
            categoryStore.getAttr();
        } else {
            ElMessage({
                type: 'error',
                message: '删除失败'
            });
        }
    }

    onBeforeUnmount(() => {
        categoryStore.$reset();
    })
</script>