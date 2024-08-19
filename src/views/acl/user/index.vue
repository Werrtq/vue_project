<template>
    <el-card style = "height: 70px;">
        <el-form :inline = "true" class = "form">
            <el-form-item  label = "用户名:">
                <el-input v-model="keyword" placeholder = "请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type = "primary" @click = "search" :disabled = 'keyword ? false : true'>搜索</el-button>
                <el-button type = "primary" @click = "reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style = "margin: 10px 0px;">
        <el-drawer
            v-model="table"
            :title="userData.id?'修改用户':'添加用户'"
            direction="rtl"
            size="30%"
        >
            <el-form ref = "formRef" :model = 'userData' :rules = 'rules'>
                <el-form-item label = '用户姓名' prop = "username" required>
                    <el-input v-model = 'userData.username'></el-input>
                </el-form-item>
                <el-form-item label = '用户昵称' prop = "name" required>
                    <el-input v-model = 'userData.name'></el-input>
                </el-form-item>
                <el-form-item label = '用户密码' prop = "password" required v-if = "!userData.id">
                    <el-input v-model = 'userData.password'></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click = "cancel">取消</el-button>
                    <el-button type="primary" @click = "confirm">确定</el-button>
                </div>
            </template>
        </el-drawer>
        <el-button type = "primary" @click="addUser">添加</el-button>
        
        <el-button type = "primary" @click = "multipleDelete">批量删除</el-button>
        <el-table :data = "userListArr" ref = "tableRef" border style = "margin: 10px 0px;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label = "#" type = 'index' width = "40px"></el-table-column>
            <el-table-column prop = "id" label = "id" width = "70px"></el-table-column>
            <el-table-column prop = "username" label = "用户名字"></el-table-column>
            <el-table-column prop = "name" label = "用户名称"></el-table-column>
            <el-table-column prop = "roleName" label = "用户角色"></el-table-column>
            <el-table-column prop = "createTime" label = "创建时间"></el-table-column>
            <el-table-column prop = "updateTime" label = "更新时间"></el-table-column>
            <el-table-column label = "操作" width = "300px">
                <template # = "{row}">
                    <el-button type = 'primary' size = 'small' icon = 'User' @click = 'assignRole(row)'>分配角色</el-button>
                    <el-button type = 'primary' size = 'small' icon = 'Edit' @click = "editUser(row)">编辑</el-button>
                    <el-popconfirm title="确定删除?" @confirm = "confirmDelete(row)">
                        <template #reference>
                            <el-button type = 'primary' size = 'small' icon = 'Delete'></el-button>
                        </template>
                    </el-popconfirm>
                    
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
    <el-drawer v-model="drawer2" direction="rtl">
        <template #header>
        <h4>分配角色(职位)</h4>
        </template>
        <template #default>
            <el-form>
                <el-form-item label = "用户姓名">
                    <el-input disabled v-model = "userData.username"></el-input>
                </el-form-item>
            </el-form>
        <div>
            <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
            >
                选择全部
            </el-checkbox>
            <el-checkbox-group
                v-model="userAssignRoleList"
                @change="handleCheckedCitiesChange"
            >
                <el-checkbox v-for="item in userAllRoleList" :key="item.id" :label="item.roleName" :value="item">
                </el-checkbox>
            </el-checkbox-group>
        </div>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawer2CancelClick">取消</el-button>
                <el-button type="primary" @click="drawer2ConfirmClick">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script lang = 'ts' setup>
    import { ref, onMounted, reactive, nextTick } from 'vue';
    import { reqGetUserList, reqAddOrUpdateUser, reqGetUserAllRole, reqSetUserRole, reqDeleteUser, reqDeleteUserList } from '../../../api/acl/user';
    import type { ResponseData, userRecord, userRecords, Roles, setUserRoleData } from '../../../api/acl/user/type';
    import { ElMessage } from 'element-plus';

    let pageNo = ref(1);
    let pageSize = ref(5);
    let userListArr = ref(<userRecords>[]);
    let total = ref(0);
    let table = ref(false);
    let drawer2 = ref(false);
    let formRef = ref();
    let userData = reactive<userRecord>({
        username: '',
        name: '',
        password: ''
    });

    const getUserList = async () => {
        let result: ResponseData = await reqGetUserList(pageNo.value, pageSize.value, keyword.value);
        userListArr.value = result.data.records;
        total.value = result.data.total;
    };

    onMounted(() => {
        getUserList();
    });

    const sizeChange = () => {
        getUserList();
    };

    const pageChange = () => {
        getUserList();
    }

    const addUser = () => {
        table.value = true;
        Object.assign(userData, {
            id: 0,
            username: '',
            name: '',
            password: ''
        });
        nextTick(() => {
            formRef.value.clearValidate('username');
            formRef.value.clearValidate('name');
            formRef.value.clearValidate('password');
        })
    }

    const editUser = (row: userRecord) => {
        table.value = true;
        Object.assign(userData, row);
        nextTick(() => {
            formRef.value.clearValidate('username');
            formRef.value.clearValidate('name');
        });
    }

    const confirm = async () => {
        await formRef.value.validate();
        let result = await reqAddOrUpdateUser(userData);
        table.value = false;
        if(result.code == 200){
            ElMessage({
                type: 'success',
                message: userData.id?'修改成功':'添加成功'
            });
            window.location.reload();
            //getUserList();
        } else {
            ElMessage({
                type: 'error',
                message: userData.id?'修改失败':'添加失败'
            });
        }
    }

    const cancel = () => {
        table.value = false;
    }

    function validatorUsername(_rule: any, value: any, callback: any){
        if(value.trim().length >= 5){
            callback();
        } else {
            callback(new Error('用户名字长度需大于5位'));
        }
    }

    function validatorName(_rule: any, value: any, callback: any){
        if(value.trim().length >= 5){
            callback();
        } else {
            callback(new Error('昵称长度需大于5位'));
        }
    }

    function validatorPassword(_rule: any, value: any, callback: any){
        if(value.trim().length >= 6){
            callback();
        } else {
            callback(new Error('密码长度需大于6位'));
        }
    }

    const rules = {
        username: [{required: true, trigger: 'blur', validator: validatorUsername}],
        name: [{required: true, trigger: 'blur', validator: validatorName}],
        password: [{required: true, trigger: 'blur', validator: validatorPassword}]
    }

    let checkAll = ref(false);
    let isIndeterminate = ref(true);
    let userAssignRoleList = ref(<Roles>[]);
    let userAllRoleList = ref(<Roles>[]);
    let setUserRole: setUserRoleData = {
        roleIdList: [],
        userId: 0
    }

    const getUserRolesList = async () => {
        let result = await reqGetUserAllRole(userData.id);
        if(result.code == 200){
            userAllRoleList.value = result.data.allRolesList;
            userAssignRoleList.value = result.data.assignRoles;
        }
    }

    const assignRole = (row: userRecord) => {
        drawer2.value = true;
        Object.assign(userData, row);
        getUserRolesList();
        setUserRole.userId = row.id;
    }

    const handleCheckAllChange = (val: boolean) => {
        userAssignRoleList.value = val ? userAllRoleList.value : [];
        isIndeterminate.value = false;
    }

    const handleCheckedCitiesChange = (val: any) => {
        let seletLength = val.length;

        checkAll.value = seletLength === userAllRoleList.value.length;
        isIndeterminate.value = seletLength > 0 && seletLength < userAllRoleList.value.length;
    }

    const drawer2CancelClick = () => {
        drawer2.value = false;
    }

    const drawer2ConfirmClick = async () => {

        for(let item of userAssignRoleList.value){
            setUserRole.roleIdList.push(item.id);
        }

        let result = await reqSetUserRole(setUserRole);

        if(result.code == 200){
            ElMessage({
                type: 'success',
                message: '更改成功'
            });
        } else {
            ElMessage({
                type: 'error',
                message: '更改失败'
            })
        }

        //getUserRolesList();
        getUserList();

        drawer2.value = false;
    }

    //删除用户功能
    let tableRef = ref();

    const confirmDelete = async (row: userRecord) => {
        let result = await reqDeleteUser(row.id);
        if(result.code == 200){
            ElMessage({
                type: 'success',
                message: '删除成功'
            });
            getUserList();
        } else {
            ElMessage({
                type: 'error',
                message: '删除失败'
            });
        }
    }

    const multipleDelete = async () => {
        let selectedUser = tableRef.value.getSelectionRows();
        
        let selectedId: number[] = [];

        for(let obj of selectedUser){
            selectedId.push(obj.id);
        }

        let result = await reqDeleteUserList(selectedId);

        if(result.code == 200){
            ElMessage({
                type: 'success',
                message: '删除成功'
            });
            getUserList();
        } else {
            ElMessage({
                type: 'error',
                message: '删除失败'
            });
        }
    }

    //搜索与重置
    import { useLayOutSettingStore } from '../../../store/modules/setting';

    let settingStore = useLayOutSettingStore();
    let keyword = ref('');

    const reset = () => {
        settingStore.refresh = false;
        setTimeout(() => {
            settingStore.refresh = true;
        }, 500);
    }

    const search = () => {
        getUserList();
    }
</script>

<style scoped>
    .form{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>