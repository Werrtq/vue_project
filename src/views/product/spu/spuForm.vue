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
                    v-model="saleAttrSelectIdAndValue"
                    :placeholder="unSelectValue.length === 0 ? '无' : `还未选择${unSelectValue.length}个`"
                    size="large"
                    style="width: 240px"
                    >
                    <el-option
                        v-for="item in unSelectValue"
                        :key="item.id"
                        :label="item.name"
                        :value="`${item.id}:${item.name}`"
                    />
                    </el-select>
                    <el-button :disabled = "unSelectValue.length == 0" 
                        @click = "addSaleAttr"
                        type = 'primary' icon = "Plus" style = "margin-left: 10px;"
                        >添加销售属性值
                    </el-button>
                    <el-table :data = 'spuParams.spuSaleAttrList' border>
                        <el-table-column label = '序号' type = "index"></el-table-column>
                        <el-table-column label = '销售属性名字' prop = 'saleAttrName'></el-table-column>
                        <el-table-column label = '销售属性值'>
                            <template # = "{row, $index}">
                                <el-tag
                                    v-for="(tag, index) in row.spuSaleAttrValueList"
                                    :key="tag"
                                    closable
                                    :disable-transitions="false"
                                    @close="row.spuSaleAttrValueList.splice(index, 1)"
                                    style = "margin: 0px 10px;"
                                    >
                                    {{ tag.saleAttrValueName }}
                                </el-tag>
                                <el-input
                                    v-if="tagInputVisible"
                                    ref="InputRef"
                                    v-model="saleAttrValueName"
                                    class="w-20"
                                    size="small"
                                    @keyup.enter="handleTagInputConfirm(row, $index)"
                                    @blur="handleTagInputConfirm(row, $index)"
                                    />
                                <el-button v-else class="button-new-tag" size="small" type = "primary" icon = "Plus" @click="showTagInput">
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label = '操作'>
                            <template # = "{row, $index}">
                                <el-button type = "primary" icon = "Delete" size = 'small' @click = "spuParams.spuSaleAttrList.splice($index, 1)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type = 'primary' @click = "save">保存</el-button>
                <el-button type = 'primary' @click = "$emit('turnScene0')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang = 'ts'>
    import { ref, onMounted, computed } from 'vue';
    import { reqGetTrademarkList, reqGetSpuDataById, reqGetAllSaleAttrList, reqUpdateOrAddSpu } from '../../../api/product/spu';
    import type { trademarkList, spuRecord, spuImageList, saleAttrList } from '@/api/product/spu/type'
    import { ElMessage, UploadFile, UploadRawFile } from 'element-plus';

    let $emit = defineEmits(['turnScene0']);
    let trademarkList = ref<trademarkList>([]);
    let imgList = ref<spuImageList>([]);
    let saleAttrList = ref<saleAttrList>([]);
    let saleAttrSelectIdAndValue = ref('');
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

    const prepareSpuFormData_Update = async (row: spuRecord) => {
        let result = await reqGetSpuDataById(row.id);
        if(result.code == 200){
            spuParams.value = result.data;
            console.log(spuParams.value.spuSaleAttrList);
            imgList.value = spuParams.value.spuImageList.map((item: any) => {
                return {
                    name: item.imgName,
                    url: item.imgUrl
                }
            });
        }

        let result1 = await reqGetAllSaleAttrList();
        saleAttrList.value = result1.data;
    }

    const prepareSpuFormData_Add = async (Id3: number) => {
        Object.assign(spuParams.value, {     
            category3Id: Id3,
            id: '',
            spuName: '',
            tmId: '',
            description: '',
            spuImageList: [],
            spuSaleAttrList: []
        });
        imgList.value = [];
        let result1 = await reqGetAllSaleAttrList();
        saleAttrList.value = result1.data;
    }

    const previewPicture = (UploadFile: UploadFile) => {
        dialogVisible.value = true;
        dialogImageUrl.value = (UploadFile.url as string);
    }

    const beforeImgUpload = (rawFile: UploadRawFile) => {
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

    const unSelectValue = computed(() => {
        return saleAttrList.value.filter((item: any) => {
            return spuParams.value.spuSaleAttrList?.every((item1: any) => {
                return item.name != item1.saleAttrName;
            })
        })
    })

    const addSaleAttr = () => {
        let [baseSaleAttrId, saleAttrName] = saleAttrSelectIdAndValue.value.split(':');
        let newSaleAttr = {
            saleAttrName,
            baseSaleAttrId,
            spuSaleAttrValueList: []
        }
        // let isRepeat = spuParams.value.spuSaleAttrList.find( (item: any) => {
        //     return item.saleAttrName == newSaleAttr.saleAttrName;
        // });

        // if(isRepeat){
        //     ElMessage({
        //         type: 'warning',
        //         message: '不能重复添加'
        //     })
        // }
        spuParams.value.spuSaleAttrList.push(newSaleAttr);
        saleAttrSelectIdAndValue.value = '';
    }

    onMounted(() => {
        setTrademarkList();
    })

    //AttrAndtag
    let tagInputVisible = ref(false);
    let saleAttrValueName = ref('');

    const showTagInput = () => {
        tagInputVisible.value = true;
    }

    const handleTagInputConfirm = (row: any, index: any) => {
        let newTag ={
            baseSaleAttrId: '',
            saleAttrValueName: saleAttrValueName.value
        }
        tagInputVisible.value = false;
        console.log(row, index);
        if(newTag.saleAttrValueName.trim() == ''){
            ElMessage({
                type: 'warning',
                message: '请输入可视字符'
            });
            return;
        }
        if(row.spuSaleAttrValueList.find((item: any) => item.saleAttrValueName == newTag.saleAttrValueName)){
            ElMessage({
                type: 'warning',
                message: '重复'
            });
            return;
        }
        newTag.baseSaleAttrId = row.baseSaleAttrId;
        spuParams.value.spuSaleAttrList[index].spuSaleAttrValueList.push(newTag);
    }

    const save = async () => {
        spuParams.value.spuImageList = imgList.value.map( (item: any) => {
            return {
                imgName: item.name,
                imgUrl: (item.response && item.response.data) || item.url
            }
        });

        console.log(spuParams.value);

        let result = await reqUpdateOrAddSpu(spuParams.value);
        if(result.code == 200){
            ElMessage({
                type: 'success',
                message: spuParams.value.id ? '更新成功' : '添加成功'
            });
            $emit('turnScene0')
        } else {
            ElMessage({
                type: 'error',
                message: spuParams.value.id ? '更新失败' : '添加失败'
            });
        }
    }

    defineExpose({
        prepareSpuFormData_Update,
        prepareSpuFormData_Add
    });
</script>

<style scoped>

</style>