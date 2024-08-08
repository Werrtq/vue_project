<template>
    <el-card>
        <el-button type="primary" icon="Plus" @click = "addTardemark">添加品牌</el-button>
        <el-table style="margin: 10px 0px" border :data = "trademarkArr">
            <el-table-column label="序号" width="80px" align="center" type = "index"></el-table-column>
            <el-table-column label="品牌名称" prop = "tmName"></el-table-column>
            <el-table-column label="品牌LOGO">
                <template # = "{row, $index}">
                    <img :src = "row.logoUrl" style="height: 80px; width: 80px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #="{row, $index}">
                    <el-button type="primary" size = "small" icon = "Edit" @click = "updateTardemark(row)"></el-button>
                    
                    <el-popconfirm title="确定删除？" @confirm = "deleteTrademark(row)">
                        <template #reference>
                            <el-button type="primary" size = "small" icon = "Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="demo-pagination-block">
            <el-pagination 
                @current-change = "getHasTrademark"
                @size-change = "getHasTrademark"
                v-model:current-page="pageNo" 
                v-model:page-size="limit"
                :page-sizes="[3, 5, 7, 9]" 
                :background="true"
                layout="prev, pager, next, jumper, ->, sizes, total" 
                :total="total" />
        </div>
    </el-card>

    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" width="500">
        <el-form  label-width="100px" :model = "trademarkParams" :rules = "rules" ref = "formRef" >
            <el-form-item label="品牌名称" prop = "tmName">
                <el-input v-model="trademarkParams.tmName" style = "width: 80%;" />
            </el-form-item>
            <el-form-item label="品牌LOGO"  prop = "logoUrl">
                <el-upload
                    class="avatar-uploader"
                    action="/api/admin/product/fileUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
        </el-form>

        <template #footer>
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm">
                确定
                </el-button>
        </template>
    </el-dialog>
</template>

<script setup lang = "ts">
    import { ref, reactive, onMounted, nextTick } from 'vue';
    import { reqHasTrademark, reqTrademark, reqDeleteTrademark } from '../../../api/product/trademark';
    import { ElMessage, type UploadProps } from 'element-plus';
    import type { Records, Record } from '../../../api/product/trademark/type';

    let pageNo = ref(1);
    let limit = ref(3);
    let trademarkArr = ref<Records>([]);
    let total = ref(0);
    let dialogFormVisible = ref(false);
    let trademarkParams = reactive<Record>({
        tmName: '',
        logoUrl: ''
    })
    let formRef = ref();

    const getHasTrademark = async () => {
        let result = await reqHasTrademark(pageNo.value,limit.value);
        if(result.code == 200){
            trademarkArr.value = result.data.records;
            total.value = result.data.total;
        } 
    }

    const addTardemark = () => {
        trademarkParams.id = 0;
        trademarkParams.logoUrl = '';
        trademarkParams.tmName = '';
        dialogFormVisible.value = true;

        nextTick(() => {
            formRef.value.clearValidate('logoUrl');
            formRef.value.clearValidate('tmName');
        })
    }

    const updateTardemark = (row:any) => {
        trademarkParams.id = 0;
        trademarkParams.logoUrl = '';
        trademarkParams.tmName = '';
        dialogFormVisible.value = true;

        nextTick(() => {
            formRef.value.clearValidate('logoUrl');
            formRef.value.clearValidate('tmName');
        })

        Object.assign(trademarkParams, row);
    }

    onMounted(() => {
        getHasTrademark();
    })

    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
        if(rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif'){
            if(rawFile.size / 1024 / 1024 <= 4){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    const handleAvatarSuccess = (response:any) => {
        trademarkParams.logoUrl = response.data;
        formRef.value.clearValidate('logoUrl');
    }

    const confirm = async () => {
        await formRef.value.validate();

        let result:any = await reqTrademark(trademarkParams);
        dialogFormVisible.value = false;
        if(result.code == 200){
            getHasTrademark();
            ElMessage({
                type: 'success',
                message: trademarkParams.id ? '修改品牌成功' : "添加品牌成功"
            })
        } else {
            ElMessage({
                type: 'error',
                message: trademarkParams.id ? '修改品牌失败' : "添加品牌失败"
            })
        }
    }

    const cancel = () => {
        dialogFormVisible.value = false;
        trademarkParams.logoUrl = '';
        trademarkParams.tmName = '';
    }

    const validatorLogoUrl = (rule: any, value: any, callback: any) => {
        if(value){
            callback();
        }else{
            callback(new Error("请选择图片"));
        }
    }

    const deleteTrademark = async (row:any) => {
        let result: any = await reqDeleteTrademark(row.id);
        if(result.code == 200){
            ElMessage({
                type: 'success',
                message: '删除成功'
            });
            getHasTrademark();
        } else {
            ElMessage({
                type: 'error',
                message: '删除失败'
            })
        }
    }

    const rules = {
        tmName: [
            {required: true , message: '请输入品牌名', trigger: 'blur'},
            {min: 2, message: '名字要大于2位', trigger: 'change'}
        ],
        logoUrl: [
            {required: true, validator: validatorLogoUrl}
        ]
    }
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>