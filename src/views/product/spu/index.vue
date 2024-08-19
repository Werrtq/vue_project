<template>
    <div>
        <Category :scene = "categoryScene"></Category>
        <el-card style = "margin: 10px 0px;">
            <div v-show = "scene == 0">
                <el-button @click = "addSpu" type = "primary" icon = "Plus" :disabled = "!categoryStore.valueC3">添加SPU</el-button>
            <el-table :data = "spuRecordList" style="margin: 10px 0px;" border>
                <el-table-column label = "序号" type = "index" align = "center"></el-table-column>
                <el-table-column label = "SPU名称" prop = "spuName"></el-table-column>
                <el-table-column label = "SPU描述" prop = "description"></el-table-column>
                <el-table-column label = "SPU操作">
                    <template # = "{row}">
                        <el-button type = "primary" size = "small" icon = "Plus" @click = "addSku(row)"></el-button>
                        <el-button type = "primary" size = "small" icon = "Edit"  @click = "updateSpu(row)"></el-button>
                        <el-button type = "primary" size = "small" icon = "View" @click = "viewSku(row)"></el-button>
                        <el-button type = "primary" size = "small" icon = "Delete" @click = "deleteSpu(row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[3, 5, 7, 9]"
                layout="prev, pager, next, jumper, -> , sizes, total"
                :total="total"
                @current-change = "pageChange"
                @size-change = "sizeChange"
                />
            </div>
            <spuForm ref = "spuRef" v-show = "scene == 1" @turnScene0 = "turnScene0"></spuForm>
            <skuForm ref = "skuRef" v-show = "scene == 2" @turnScene0 = "turnScene0"></skuForm>
        </el-card>

        <el-dialog v-model="dialogTableVisible" title="Shipping address" width="800">
            <el-table :data="skuList">
            <el-table-column property="skuName" label="SKU名字" />
            <el-table-column property="price" label="SKU价格" />
            <el-table-column property="weight" label="SKU重量" />
            <el-table-column label="SKU图片">
                <template # = "{row}">
                    <img :src="row.skuDefaultImg" alt="" width="100px" height="100px">
                </template>
            </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script lang = 'ts' setup>
    import { ref, watch, onBeforeUnmount } from 'vue';
    import { useCategoryStore } from '../../../store/modules/category';
    import { reqDeleteSpu, reqGetSkuList, reqGetUrl } from '../../../api/product/spu';
    import { spuRecords, spuRecord } from '../../../api/product/spu/type';
    import spuForm from './spuForm.vue';
    import skuForm from './skuForm.vue';
    import { ElMessage } from 'element-plus';
    
    let scene = ref(0);
    let categoryScene = ref(0);
    let categoryStore = useCategoryStore();
    let currentPage = ref(1);
    let pageSize = ref(3);
    let total = ref(3);
    let spuRecordList = ref<spuRecords>([]);

    const turnScene0 = () => {
        scene.value = 0;
        categoryScene.value = 0;
        getSpuData();
    }

    watch(  () => categoryStore.valueC3,
            () => {
                if(!categoryStore.valueC3) return;
                getSpuData();
    });

    const getSpuData = async () => {
        let result = await reqGetUrl(currentPage.value, pageSize.value, categoryStore.valueC3);
        if(result.code == 200){
            spuRecordList.value = result.data.records;
            total.value = result.data.total;
        }
    }

    const pageChange = () => {
        getSpuData();
    }

    const sizeChange = () => {
        getSpuData();
    }

    //SPU
    let spuRef = ref();

    const addSpu = () => {
        categoryScene.value = 1;
        scene.value = 1;
        spuRef.value.prepareSpuFormData_Add(categoryStore.valueC3);
    }

    const updateSpu = (row: spuRecord) => {
        categoryScene.value = 1;
        scene.value = 1;
        spuRef.value.prepareSpuFormData_Update(row);
    }

    const deleteSpu = async (spuId: number) => {
        let result = await reqDeleteSpu(spuId);

        if(result.code == 200){
            ElMessage({
                type: 'success',
                message: '删除成功'
            });
            getSpuData();
        } else {
            ElMessage({
                type: 'error',
                message: '删除失败'
            });
        }
    }

    //SKU
    let skuRef = ref();

    const addSku = (row: spuRecord) => {
        scene.value = 2;
        console.log(row);
        skuRef.value.initSkuData(categoryStore.valueC1, categoryStore.valueC2, row);
    }

    //ViewDialog
    let dialogTableVisible = ref(false);
    let skuList = ref<any>([]);

    const viewSku = async (row: any) => {
        dialogTableVisible.value = true;
        let result = await reqGetSkuList(row.id);
        if(result.code == 200){
            skuList.value = result.data;
        }
    }

    onBeforeUnmount(() => {
        categoryStore.$reset();
    });
</script>