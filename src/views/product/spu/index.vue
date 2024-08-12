<template>
    <div>
        <Category></Category>
        <el-card style = "margin: 10px 0px;">
            <div v-show = "scene == 0">
                <el-button @click = "addSpu" type = "primary" icon = "Plus" :disabled = "!categoryStore.valueC3">添加SPU</el-button>
            <el-table :data = "spuRecordList" style="margin: 10px 0px;" border>
                <el-table-column label = "序号" type = "index" align = "center"></el-table-column>
                <el-table-column label = "SPU名称" prop = "spuName"></el-table-column>
                <el-table-column label = "SPU描述" prop = "description"></el-table-column>
                <el-table-column label = "SPU操作">
                    <template # = "{row, $index}">
                        <el-button type = "primary" size = "small" icon = "Plus"></el-button>
                        <el-button type = "primary" size = "small" icon = "Edit"  @click = "updateSpu(row)"></el-button>
                        <el-button type = "primary" size = "small" icon = "view"></el-button>
                        <el-button type = "primary" size = "small" icon = "Delete"></el-button>
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
            <spuForm ref = "spuRef" v-show = "scene == 1" @turnScene0 = "scene = 0"></spuForm>
            <skuForm v-show = "scene == 2"></skuForm>
        </el-card>
    </div>
</template>

<script lang = 'ts' setup>
    import { ref, watch } from 'vue';
    import { useCategoryStore } from '../../../store/modules/category';
    import { reqGetUrl } from '../../../api/product/spu';
    import { spuRecords, spuRecord } from '../../../api/product/spu/type';
    import spuForm from './spuForm.vue';
    import skuForm from './skuForm.vue';
    
    let scene = ref(0);
    let categoryStore = useCategoryStore();
    let currentPage = ref(1);
    let pageSize = ref(3);
    let total = ref(3);
    let spuRecordList = ref<spuRecords>([]);

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
        scene.value = 1;
    }

    const updateSpu = (row: spuRecord) => {
        scene.value = 1;
        spuRef.value.prepareSpuFormData(row);
    }
</script>