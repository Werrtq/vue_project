<template>
    <div>
        <el-form label-width = "100px">
            <el-form-item label = "SPU名称">
                <el-input v-model="spuParams.spuName" placeholder = "请你输入SPU名称"></el-input>
            </el-form-item>
            <el-form-item label = "SPU品牌">
                <el-select
                    v-model="spuParams.tmId"
                    placeholder="请选择"
                    size="large"
                    style="width: 240px"
                    >
                    <el-option 
                        v-for = "item in trademarkList"
                        :key = "item.id"
                        :label = "item.tmName"
                        :value = "item.id"
                        >{{ item.tmName }}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label = "SPU描述">
                <el-input
                    v-model="spuParams.description"
                    style="width: 240px"
                    :rows="2"
                    type="textarea"
                    placeholder="请输入SPU描述"
                />
            </el-form-item>
            <el-form-item label = "SPU图标">
                <el-upload
                    v-model:file-list="imgList"
                    action="/api/admin/product/fileUpload"
                    list-type="picture-card"
                    :before-upload = "beforeImgUpload"
                    :on-preview="previewPicture"
                >
                    <el-icon><Plus /></el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" style = "width: 100%; height: 100%;" />
                </el-dialog>
            </el-form-item>
            <el-form-item label = "SPU销售属性">
                <el-select
                    v-model="selectValue"
                    :placeholder="`还未选择${saleAttrList.length - spuParams.spuSaleAttrList.length}个`"
                    size="large"
                    style="width: 240px"
                    >
                    <el-option
                        v-for="item in saleAttrList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                    </el-select>
                    <el-button type = 'primary' icon = "Plus" style = "margin-left: 10px;">添加销售属性值</el-button>
                    <el-table :data = 'spuParams.spuSaleAttrList' border>
                        <el-table-column label = '序号' type = "index"></el-table-column>
                        <el-table-column label = '销售属性名字' prop = 'saleAttrName'></el-table-column>
                        <el-table-column label = '销售属性值'>
                            <template # = "{row, $index}">
                                <el-tag
                                    v-for="tag in row.spuSaleAttrValueList"
                                    :key="tag"
                                    closable
                                    :disable-transitions="false"
                                    @close="handleClose(tag)"
                                    style = "margin: 0px 10px;"
                                    >
                                    {{ tag.saleAttrValueName }}
                                </el-tag>
                                <el-input
                                    v-if="inputVisible"
                                    ref="InputRef"
                                    v-model="inputValue"
                                    class="w-20"
                                    size="small"
                                    @keyup.enter="handleInputConfirm"
                                    @blur="handleInputConfirm"
                                    />
                                <el-button v-else class="button-new-tag" size="small" type = "primary" icon = "Plus" @click="showInput">
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label = '操作'>
                            <el-button type = "primary" icon = "Delete" size = 'small'></el-button>
                        </el-table-column>
                    </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type = 'primary'>保存</el-button>
                <el-button type = 'primary' @click = "$emit('turnScene0')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang = 'ts'>
    import { ref, onMounted } from 'vue';
    import { reqGetTrademarkList, reqGetSpuDataById, reqGetAllSaleAttrList } from '../../../api/product/spu';
    import type { trademarkList, spuRecord, spuImageList, saleAttrList } from '@/api/product/spu/type'
    import { ElMessage, UploadFile, UploadRawFile } from 'element-plus';

    let trademarkList = ref<trademarkList>([]);
    let imgList = ref<spuImageList>([]);
    let saleAttrList = ref<saleAttrList>([]);
    let dialogVisible = ref(false);
    let dialogImageUrl = ref('');
    let spuParams = ref<spuRecord>({     
        category3Id: '',
        id: '',
        spuName: '',
        tmId: '',
        description: '',
        spuImageList: '',
        spuSaleAttrList: ''
    });
   
    const setTrademarkList = async () => {
        let result = await reqGetTrademarkList();
        trademarkList.value = result.data;
    }

    const prepareSpuFormData = async (row: spuRecord) => {
        let result = await reqGetSpuDataById(row.id);
        if(result.code == 200){
            spuParams.value = result.data;
            imgList.value = spuParams.value.spuImageList.map(item => {
                return {
                    name: item.imgName,
                    url: item.imgUrl
                }
            });
            console.log(spuParams.value);
        }

        let result1 = await reqGetAllSaleAttrList();
        saleAttrList.value = result1.data;
        console.log(saleAttrList.value)
    }

    const previewPicture = (UploadFile: UploadFile) => {
        dialogVisible.value = true;
        dialogImageUrl.value = (UploadFile.url as string);
        console.log(UploadFile);
    }

    const beforeImgUpload = (rawFile: UploadRawFile) => {
        console.log(rawFile);
        if(rawFile.type == 'image/png' || rawFile.type == 'image/jpg' || rawFile.type == 'image/gif'){
            if(rawFile.size / 1024 / 1024 <= 4){
                return true;
            } else {
                ElMessage({
                    type: 'error',
                    message: '上传文件务必小于4M'
                });
                return false;
            }
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件务必PNG|JPG|GIF'
            });
            return false;
        }
    }

    onMounted(() => {
        setTrademarkList();
    })

    defineExpose({
        prepareSpuFormData,
    });


    //let selectValue = ref(0);
</script>

<style scoped>

</style>