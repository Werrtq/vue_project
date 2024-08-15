<template>
    <div>
        <el-form>
            <el-form-item label = "SKU名称">
                <el-input placeholder = "SKU名称"></el-input>
            </el-form-item>
            <el-form-item label = "价格(元)">
                <el-input type = "number" placeholder = "价格(元)"></el-input>
            </el-form-item>
            <el-form-item label = "重量(g)">
                <el-input type = "number" placeholder = "重量(g)"></el-input>
            </el-form-item>
            <el-form-item label = "SKU描述">
                <el-input type = "textarea" placeholder = "SKU描述"></el-input>
            </el-form-item>
            <el-form-item label = "平台属性">
                <el-form :inline="true">
                    <el-form-item v-for = "item in platformAttrList" :label = "item.attrName">
                        <el-select style = "width: 200px;">
                            <el-option v-for = "item1 in item.attrValueList"
                                    :key = "item1.id"
                                    :label = "item1.valueName"
                                    :value = "item1.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label = "销售属性">
                <el-form>
                    <el-form-item >
                        <el-select>
                            <el-option></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label = "图片名称">
                <el-table style = "margin: 10px 0px;" border>
                    <el-table-column type = "selection"></el-table-column>
                    <el-table-column label = "图片"></el-table-column>
                    <el-table-column label = "名称"></el-table-column>
                    <el-table-column label = "操作">
                        <template # = "{row, $index}">
                            <el-button size = "small" >设置默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type = "primary">保存</el-button>
                <el-button type = "primary">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang = 'ts'>
    import { ref } from 'vue';
    import { reqGetAttrList } from '../../../api/product/spu';
    import { attrList, spuRecord } from '../../../api/product/spu/type';

    let platformAttrList = ref<attrList>([]);

    const initSkuData = async (id1: number, id2: number, spu: spuRecord) => {
        let result = await reqGetAttrList(id1, id2, spu.category3Id);
        console.log(result);
        platformAttrList.value = result.data;

    }

    defineExpose({
        initSkuData,
    })
</script>