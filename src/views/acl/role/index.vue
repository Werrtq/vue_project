<template>
    <el-card style="height: 70px;">
        <el-form inline class='form'>
            <el-form-item label="职位搜索">
                <el-input placeholder="请你输入职位关键字" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' :disabled='keyword ? false : true' @click="search">搜索</el-button>
                <el-button type='primary' @click="refresh">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
        <el-table :data="roleList" border style="margin: 10px 0px;">
            <el-table-column label='#' type='index'></el-table-column>
            <el-table-column label='ID' prop="id"></el-table-column>
            <el-table-column label='职位名称' prop="roleName"></el-table-column>
            <el-table-column label='创建时间' prop="createTime"></el-table-column>
            <el-table-column label='更新时间' prop="updateTime"></el-table-column>
            <el-table-column label='操作' width="280px">
                <template #="{ row, $index }">
                    <el-button type='primary' size='small' icon='User' @click = "assignPermission(row)">分配权限</el-button>
                    <el-button type='primary' size='small' icon='Edit' @click="editRole(row)">编辑</el-button>
                    <el-popconfirm title="你确定删除这个？" @confirm="confirmDelete(row)">
                        <template #reference>
                            <el-button type='primary' size='small' icon='Delete'>删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9]"
            :background="true" layout="prev, pager, next, jumper, -> ,sizes, total" :total="total"
            @size-change="sizeChange" @current-change="pageChange" />
    </el-card>
    <el-dialog v-model="dialogFormVisible" title="添加职位" width="500">
        <el-form :model="roleParam">
            <el-form-item label="职位名称：">
                <el-input v-model="roleParam.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmAddRole">
                确定
            </el-button>
        </template>
    </el-dialog>
    <el-drawer v-model="treeDrawer" title="分配菜单与按钮的权限" direction="rtl" size="30%">
        <el-tree
            ref = 'treeRef'
            style="max-width: 600px"
            :data="treeDataArr"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="treeSelectedIdArr"
            :props="defaultProps"
        />
        <template #footer>
            <div style="flex: auto">
                <el-button @click="treeDrawerCancelClick">取消</el-button>
                <el-button type="primary" @click="treeDrawerConfirmClick">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script lang='ts' setup>
import { ref, onMounted, reactive } from 'vue';
import { reqAddOrUpdateRole, reqDeleteRole, reqGetRoleList, reqGetRolePermission, reqPostRolePermission } from '../../../api/acl/role';
import type { roleRecord, ResponsePermissionBody } from '@/api/acl/role/type'
import { ElMessage } from 'element-plus';

//基础页面11
let pageNo = ref(1);
let pageSize = ref(5);
let total = ref(0);
let roleList = ref([]);

const getRoleListData = async () => {
    let result = await reqGetRoleList(pageNo.value, pageSize.value, keyword.value);
    if (result.code = 200) {
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
//11

//添加与编辑角色
//22
let dialogFormVisible = ref(false);
let roleParam = reactive({
    roleName: '',
    id: 0
});

const confirmAddRole = async () => {
    dialogFormVisible.value = false;
    let result = await reqAddOrUpdateRole(roleParam);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: roleParam.id === 0 ? '添加成功' : '更新成功'
        });
        getRoleListData();
    } else {
        ElMessage({
            type: 'error',
            message: roleParam.id === 0 ? '添加失败' : '更新失败'
        });
    }
}

const addRole = () => {
    dialogFormVisible.value = true;
    Object.assign(roleParam, {
        roleName: '',
        id: 0
    });
}

const editRole = (row: roleRecord) => {
    dialogFormVisible.value = true;
    roleParam.roleName = row.roleName;
    roleParam.id = row.id;
}
//22

//搜索与删除
//33
let keyword = ref('');

const confirmDelete = async (row: roleRecord) => {
    let result = await reqDeleteRole(row.id);

    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
        getRoleListData();
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        });
    }
}

const search = () => {
    getRoleListData();
}
//33

//重置
//44
import { useLayOutSettingStore } from '../../../store/modules/setting';

let settingStore = useLayOutSettingStore();

const refresh = () => {
    settingStore.refresh = false;
    setTimeout(() => {
        settingStore.refresh = true;
    }, 500);
}
//44

//分配权限
//55
let treeDrawer = ref(false);
let treeDataArr = ref<ResponsePermissionBody>([]);
let treeSelectedIdArr = ref<number[]>([]);
let treeRef = ref<any>();

const assignPermission = async (row: roleRecord) => {
    treeDrawer.value = true;
    Object.assign(roleParam, row);
    let result = await reqGetRolePermission(row.id);
    if(result.code == 200){
        treeDataArr.value = result.data;
        treeSelectedIdArr.value = findSelectedArr(treeDataArr.value, []);
    }
}

const findSelectedArr = (allArr: ResponsePermissionBody, selectedArr: number[]) => {
    for(let item of allArr){
        if(item.children.length == 0){
            if(item.select == true){
                selectedArr.push(item.id);
            }
        } else {
            selectedArr = findSelectedArr(item.children, selectedArr);
        }
    }
    return selectedArr;
}

const defaultProps = {
  children: 'children',
  label: 'name',
}

const treeDrawerCancelClick = () => {
    treeDrawer.value = false;
}

const treeDrawerConfirmClick = async () => {
    let arr = treeRef.value.getCheckedKeys();
    let arr1 = treeRef.value.getHalfCheckedKeys();
    arr = arr.concat(arr1);
    let result = await reqPostRolePermission(roleParam.id, arr);

    if(result.code == 200){
        ElMessage({
            type: 'success',
            message: '更改完成'
        });
        window.location.reload();
    } else {
        ElMessage({
            type: 'error',
            message: '更改失败'
        });
    }
}

</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
}
</style>