<template>
    <div>
        <el-form label-width = "100px">
            <el-form-item label = "SPU名称">
                <el-input placeholder = "请你输入SPU名称"></el-input>
            </el-form-item>
            <el-form-item label = "SPU品牌">
                <el-select
                    v-model="selectValue"
                    placeholder="Select"
                    size="large"
                    style="width: 240px"
                    >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                    </el-select>
            </el-form-item>
            <el-form-item label = "SPU描述">
                <el-input
                    v-model="textarea"
                    style="width: 240px"
                    :rows="2"
                    type="textarea"
                    placeholder="Please input"
                />
            </el-form-item>
            <el-form-item label = "SPU图标">
                <el-upload
                    v-model:file-list="fileList"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                >
                    <el-icon><Plus /></el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-form-item>
            <el-form-item label = "SPU销售属性">
                <el-select
                    v-model="selectValue"
                    placeholder="Select"
                    size="large"
                    style="width: 240px"
                    >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                    </el-select>
                    <el-button type = 'primary' icon = "Plus" style = "margin-left: 10px;">添加销售属性值</el-button>
                    <el-table>
                    <el-table-column label = '序号'></el-table-column>
                    <el-table-column label = '序号'></el-table-column>
                    <el-table-column label = '序号'></el-table-column>
                    <el-table-column label = '序号'></el-table-column>
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
    import { ref } from 'vue';

    let selectValue = ref(0);
</script>

<style scoped>

</style>