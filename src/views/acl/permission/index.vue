<template>
    <el-table
      :data="permissionList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="权限值" />
        <el-table-column prop="updateTime" label="修改时间" />
        <el-table-column label="操作">
            <template # = "{row, $index}">
                <el-button type = "primary" size = "small" :disabled = "row.level == 4" @click = "add(row)">添加{{row.level == 3 ? '功能' : '菜单'}}</el-button>
                <el-button type = "primary" size = "small" :disabled = "row.level == 1" @click = "edit(row)">编辑</el-button>
                <el-popconfirm title="确定删除?" @confirm = "confirmDelete(row)">
                    <template #reference>
                        <el-button type = "primary" size = "small" :disabled = "row.level == 1">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
        <el-form :model="permissionParams">
            <el-form-item label="名称">
                <el-input v-model="permissionParams.name" placeholder = "请输入菜单名称" />
            </el-form-item>
            <el-form-item label="权限">
                <el-input v-model="permissionParams.code" placeholder = "请输入权限数值" />
            </el-form-item>
        </el-form>
        <template #footer>
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="save">
                确定
                </el-button>
        </template>
    </el-dialog>
</template>

<script lang = 'ts' setup>
    import { ref, onMounted, reactive } from 'vue';
    import { permissionDataList, permissionData, addPermissionRequestBody } from '../../../api/acl/menu/type';
    import { getPermission, reqAddOrUpdatePermission, reqDeletePermission } from '../../../api/acl/menu';
    import { ElMessage } from 'element-plus';

    let permissionList = ref<permissionDataList>([]);
    let dialogFormVisible = ref<boolean>(false);
    let permissionParams = reactive<addPermissionRequestBody>({
        code: '',
        name: '',
        pid: 0,
        level: 0
    });

    const getPermissionList = async () => {
        let result = await getPermission();

        if(result.code == 200){
            permissionList.value = result.data;
        }
    }

    const add = async (row: permissionData) => {
        dialogFormVisible.value = true;
        Object.assign(permissionParams, {
            id: 0,
            code: '',
            name: '',
            pid: 0,
            level: 0
        });
        permissionParams.pid = row.id;
        permissionParams.level = row.level + 1;
    }

    const edit = (row: permissionData) => {
        dialogFormVisible.value = true;
        Object.assign(permissionParams, row);
    }

    const save = async () => {
        dialogFormVisible.value = false;
        let result = await reqAddOrUpdatePermission(permissionParams);

        if(result.code == 200){
            ElMessage({
                type: 'success',
                message: permissionParams.id ? '更新成功' : '添加成功'
            });
            getPermissionList();
        } else {
            ElMessage({
                type: 'error',
                message: permissionParams.id ? '更新失败' : '添加失败'
            });
        }
    }

    const confirmDelete = async (row: permissionData) => {
        let result = await reqDeletePermission(row.id);

        if(result.code == 200) {
            ElMessage({
                type: 'success',
                message: '删除成功'
            });
            getPermissionList();
        } else {
            ElMessage({
                type: 'error',
                message: '删除失败'
            });
        }
    }

    onMounted(() => {
        getPermissionList();
    });
</script>