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
                <el-form>
                    <el-form-item >
                        <el-select>
                            <el-option></el-option>
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
            <el-form-item>
                <el-table border>
                    <el-table-column type = "selection"></el-table-column>
                    <el-table-column label = "图片"></el-table-column>
                    <el-table-column label = "名称"></el-table-column>
                    <el-table-column label = "操作">
                        <template # = "{row, $index}">
                            <el-button size = "small" >设置默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang = 'ts'>

</script>