<template>
    <div>
        <el-table :data="skuList" border>
            <el-table-column label = "序号" type = "index"></el-table-column>
            <el-table-column label = "名称" prop="skuName"></el-table-column>
            <el-table-column label = "描述" prop="skuDesc"></el-table-column>
            <el-table-column label = "图片">
                <template #="{row, $index}">
                    <img :src="row.skuDefaultImg" alt="" width = '100px' height = '100px'>
                </template>
            </el-table-column>
            <el-table-column label = "重量" prop="weight"></el-table-column>
            <el-table-column label = "价格" prop="price"></el-table-column>
            <el-table-column label = "操作" width = "220px">
                <template # = "{row, $index}">
                    <el-button type = "primary" size = "small" :icon = "row.isSale ? 'Bottom' : 'Top'" @click = "changeSaleState(row)"></el-button>
                    <el-button type = "primary" size = "small" icon = "Edit" @click = "edit"></el-button>
                    <el-button type = "primary" size = "small" icon = "InfoFilled" @click = "showDetail(row)"></el-button>
                    <el-popconfirm title="确定删除?" @confirm = 'deleteSku(row)'>
                        <template #reference>
                            <el-button type = "primary" size = "small" icon = "Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            style = "margin: 10px 0px;"
            v-model:current-page="pageNo"
            v-model:page-size="limit"
            :page-sizes="[3, 5, 7, 9]"
            :background="true"
            layout="prev, pager, next, jumper, ->,sizes, total"
            :total="totalPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            />
    </div>

    <el-drawer v-model="table">
             <template #header>
                <h4>查看商品的详情</h4>
            </template>
        <template #default>
            <el-row class = "elrow">
            <el-col :span="6">名称</el-col>
            <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row class = "elrow">
            <el-col :span="6">描述</el-col>
            <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row class = "elrow">
            <el-col :span="6">价格</el-col>
            <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row class = "elrow">
            <el-col :span="6">平台属性</el-col>
            <el-col :span="18">
                <el-tag v-for = "item in skuInfo.skuAttrValueList" style="margin: 5px;">{{item.attrName}}</el-tag>
            </el-col>
        </el-row>
        <el-row class = "elrow">
            <el-col :span="6">销售属性</el-col>
            <el-col :span="18">
                <el-tag v-for = "item in skuInfo.skuSaleAttrValueList" style="margin: 5px;">{{ item.saleAttrName }}</el-tag>
            </el-col>
        </el-row>
        <el-row class = "elrow">
            <el-col :span="6">商品图片</el-col>
            <el-col :span="18">
                <el-carousel :interval="4000" type="card" height="200px" indicator-position = "outside">
                            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                                <img :src="item.imgUrl" alt="" style="width:100%;height: 100%;">
                            </el-carousel-item>
                        </el-carousel>
            </el-col>
        </el-row>  
        </template>
        
    </el-drawer>
</template>

<script lang = 'ts' setup>
    import { ref, onMounted } from 'vue';
    import { reqGetSkuListByPage, reqSetSkuOnSale, reqSetSkuCancelSale, reqDeleteSku, reqGetSkuInfo } from '@/api/product/sku/index'
    import { ElMessage } from 'element-plus';

    let pageNo = ref<number>(1);
    let limit = ref<number>(7);
    let totalPage = ref<number>(0);
    let skuList = ref([]);
    let table = ref(false);
    let skuInfo = ref<any>({});

    const getSkuList = async (pageNo: number, limit: number) => {
        let result = await reqGetSkuListByPage(pageNo, limit);
        console.log(result);

        if(result.code == 200){
            skuList.value = result.data.records;
            totalPage.value = result.data.total;
        }
    }

    const handleSizeChange = () => {
        getSkuList(pageNo.value, limit.value);
    }

    const handleCurrentChange = () => {
        getSkuList(pageNo.value, limit.value);
    }

    function edit() {
        ElMessage({
            type: 'success',
            message: '此模块正在更新'
        });
    }

    async function deleteSku(row: any) {
        let result = await reqDeleteSku(row.id);
        if(result.code == 200){
            ElMessage({
                type: 'success',
                message: '删除成功'
            });
            getSkuList(pageNo.value, limit.value);
        } else {
            ElMessage({
                type: 'error',
                message: '删除失败'
            });
        }
    }

    async function changeSaleState(row: any){
        if(row.isSale){
            let result = await reqSetSkuCancelSale(row.id);
            if(result.code == 200){
                row.isSale = 0;
                ElMessage({
                    type: 'success',
                    message: '下架成功'
                });
            } else {
                ElMessage({
                    type: 'error',
                    message: '下架失败'
                });
            }
        } else {
            let result = await reqSetSkuOnSale(row.id);
            if(result.code == 200){
                row.isSale = 1;
                ElMessage({
                    type: 'success',
                    message: '上架成功'
                });
            } else {
                ElMessage({
                    type: 'error',
                    message: '上架失败'
                });
            }
        }
    }

    async function showDetail(row: any) {
        table.value = true;
        let result = await reqGetSkuInfo(row.id);

        if(result.code == 200){
            skuInfo.value = result.data;
        }
    }

    onMounted(() => {
        getSkuList(pageNo.value, limit.value);
    });
</script>

<style scoped>
    .elrow{
        margin: 10px 0px;
    }
 
</style>