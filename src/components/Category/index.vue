<template>
    <div>
        <el-card>
            <el-form inline = "true">
                <el-form-item label = "一级分类">
                    <el-select :disabled = "scene?true:false" v-model="categoryStore.valueC1" style = "width: 200px;" @change = "handle1">
                        <el-option v-for = "item in categoryStore.dataArrC1" :label = "item.name" :key = "item.id" :value = "item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label = "二级分类">
                    <el-select :disabled = "scene?true:false" v-model="categoryStore.valueC2" style = "width: 200px;" @change = "handle2">
                        <el-option v-for = "item in categoryStore.dataArrC2" :label = "item.name" :key = "item.id" :value = "item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label = "三级分类">
                    <el-select :disabled = "scene?true:false" v-model="categoryStore.valueC3" style = "width: 200px;">
                        <el-option v-for = "item in categoryStore.dataArrC3" :label = "item.name" :key = "item.id" :value = "item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang = 'ts' setup>
import { onMounted } from 'vue';
import { useCategoryStore } from '../../store/modules/category';

defineProps(['scene']);

let categoryStore = useCategoryStore();

onMounted(async () => {
    categoryStore.getC1();
})

const handle1 = () => {
    categoryStore.dataArrC2 = [];
    categoryStore.dataArrC3 = [];
    categoryStore.valueC2 = '';
    categoryStore.valueC3 = '';
    categoryStore.getC2();
}

const handle2 = () => {
    categoryStore.dataArrC3 = [];
    categoryStore.valueC3 = '';
    categoryStore.getC3();
}
</script>