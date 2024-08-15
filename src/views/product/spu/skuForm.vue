<template>
    <div>
        <el-form>
            <el-form-item label = "SKU名称">
                <el-input placeholder = "SKU名称" v-model = "skuParams.skuName"></el-input>
            </el-form-item>
            <el-form-item label = "价格(元)">
                <el-input type = "number" placeholder = "价格(元)" v-model="skuParams.price"></el-input>
            </el-form-item>
            <el-form-item label = "重量(g)">
                <el-input type = "number" placeholder = "重量(g)" v-model="skuParams.weight"></el-input>
            </el-form-item>
            <el-form-item label = "SKU描述">
                <el-input type = "textarea" placeholder = "SKU描述" v-model="skuParams.skuDesc"></el-input>
            </el-form-item>
            <el-form-item label = "平台属性">
                <el-form :inline="true">
                    <el-form-item v-for = "item in platformAttrList" :key = "item.id" :label = "item.attrName">
                        <el-select v-model = "item.attrIdAndValueId" style = "width: 200px;">
                            <el-option v-for = "item1 in item.attrValueList"
                                    :key = "item1.id"
                                    :label = "item1.valueName"
                                    :value = "`${item.id}:${item1.id}`" 
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label = "销售属性">
                <el-form>
                    <el-form-item v-for = "item in saleAttrList" :key = "item.id" :label = "item.saleAttrName">
                        <el-select v-model="item.saleIdAndValueId" style = "width: 200px;">
                            <el-option v-for = "item1 in item.spuSaleAttrValueList"
                                        :key = "item1.id"
                                        :label = "item1.saleAttrValueName"
                                        :value = "`${item.id}:${item1.id}`"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label = "图片名称">
                <el-table :data = "imageList" ref = "imgTableRef" style = "margin: 10px 0px;" border>
                    <el-table-column type = "selection"></el-table-column>
                    <el-table-column label = "图片">
                        <template # = "{row, $index}">
                            <img :src = "row.imgUrl" alt = "" width="200px">
                        </template>
                    </el-table-column>
                    <el-table-column label = "名称" prop = "imgName"></el-table-column>
                    <el-table-column label = "操作">
                        <template # = "{row, $index}">
                            <el-button type = 'primary' size = "small" @click = "setDefaultImg(row)">设置默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type = "primary" @click = "save">保存</el-button>
                <el-button type = "primary" @click = "cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang = 'ts'>
    import { reactive, ref } from 'vue';
    import { reqGetAttrList, reqGetSaleAttrList, reqGetSpuImageList, reqSaveSkuInfo } from '../../../api/product/spu';
    import { spuRecord, spuImageList, skuDataRequestBody } from '../../../api/product/spu/type';
    import { ElMessage } from 'element-plus';

    let $emit = defineEmits(['turnScene0']);
    let imgTableRef = ref();
    let platformAttrList = ref<any>([]);
    let saleAttrList = ref<any>([]);
    let imageList = ref<spuImageList>([]);
    let skuParams = reactive<skuDataRequestBody>({
        "category3Id": '',
        "spuId": '',
        "tmId": '',
        "skuName": '',
        "price": '',
        "weight": '',
        "skuDesc": '',
        "skuDefaultImg": '',
        "skuAttrValueList": [],
        "skuSaleAttrValueList": [],
    })

    const initSkuData = async (id1: number, id2: number, spu: spuRecord) => {
        let result = await reqGetAttrList(id1, id2, spu.category3Id);
        let result1 = await reqGetSaleAttrList(spu.id);
        let result2 = await reqGetSpuImageList(spu.id);
        platformAttrList.value = result.data;
        saleAttrList.value = result1.data;
        imageList.value = result2.data;
        skuParams.category3Id = spu.category3Id;
        skuParams.spuId = spu.id;
        skuParams.tmId = spu.tmId;
    }

    const setDefaultImg = (item: any) => {
        skuParams.skuDefaultImg = item.imgUrl;
        imgTableRef.value.toggleRowSelection(item);
    }

    const save = async () => {
        skuParams.skuAttrValueList = platformAttrList.value.reduce((pre: any, next: any) => {
            if(next.attrIdAndValueId){
                let [attrId, valueId] = next.attrIdAndValueId.split(':');
                pre.push({
                    attrId,
                    valueId
                });
            }
            return pre;
        }, []);

        skuParams.skuSaleAttrValueList = saleAttrList.value.reduce((pre: any, next: any) => {
            if(next.saleIdAndValueId){
                let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':');
                pre.push({
                    saleAttrId,
                    saleAttrValueId
                });
                return pre;
            }
        }, []);

        $emit('turnScene0');

        let result = await reqSaveSkuInfo(skuParams);
        if(result.code == 200){
            ElMessage({
                type: 'success',
                message: '添加成功'
            });
        } else {
            ElMessage({
                type: 'error',
                message: '添加失败'
            });
        }
    }

    const cancel = () => {
        $emit('turnScene0');
    }

    defineExpose({
        initSkuData,
    })
</script>