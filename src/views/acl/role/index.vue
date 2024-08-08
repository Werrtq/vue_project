<template>
    <el-card style = "height: 70px;">
        <el-form inline class = 'form'>
            <el-form-item label = "职位搜索">
                <el-input></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type = 'primary'>搜索</el-button>
                <el-button type = 'primary'>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style = "margin: 10px 0px;">
        <el-button type = "primary" icon = "Plus">添加职位</el-button>
        <el-table :data = "roleList" border style = "margin: 10px 0px;">
            <el-table-column label = '#' type = 'index'></el-table-column>
            <el-table-column label = 'ID' prop = "id"></el-table-column>
            <el-table-column label = '职位名称' prop = "roleName"></el-table-column>
            <el-table-column label = '创建时间' prop = "createTime"></el-table-column>
            <el-table-column label = '更新时间' prop = "updateTime"></el-table-column>
            <el-table-column label = '操作' width = "280px">
                <template # = "{row, $index}">
                    <el-button type = 'primary' size = 'small' icon = 'User'>分配权限</el-button>
                    <el-button type = 'primary' size = 'small' icon = 'Edit'>编辑</el-button>
                    <el-button type = 'primary' size = 'small' icon = 'Delete'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[5, 7, 9]"
            :background="true"
            layout="prev, pager, next, jumper, -> ,sizes, total"
            :total="total"
            @size-change = "sizeChange"
            @current-change = "pageChange"
            />
    </el-card>
</template>

<script lang = 'ts' setup>
    import { ref, onMounted } from 'vue';
    import { reqGetRoleList } from '../../../api/acl/role';

    let pageNo = ref(1);
    let pageSize = ref(5);
    let total = ref(0);
    let roleList = ref([]);

    const getRoleListData = async () => {
        let result = await reqGetRoleList(pageNo.value, pageSize.value);
        if(result.code = 200){
            roleList.value = result.data.records;
            total.value = result.data.total;
        }
    }

    onMounted(() => {
        getRoleListData();
    });

    const pageChange = () => {
        getRoleListData();
    }

    const sizeChange = () => {
        getRoleListData();
    }


</script>

<style scoped>
    .form{
        display: flex;
        justify-content: space-between;
    }
</style>