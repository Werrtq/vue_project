import request from '@/utils/request';
import { ResponseBody, RequestBodyAddRole, ResponsePermissionBody } from './type';

enum API{
    GETROLELIST_URL = '/admin/acl/role/',
    ADDROLE_URL = '/admin/acl/role/save',
    UPDATEROLE_URL = '/admin/acl/role/update',
    DELETEROLE_URL = '/admin/acl/role/remove/',
    GETPERMISSION_URL = '/admin/acl/permission/toAssign/',
    AGGIGNPERMISSION_URL = '/admin/acl/permission/doAssign/?'
}

export const reqGetRoleList = (pageNo: number, pageLimit: number, keyword: string) => request.get<any, ResponseBody>(API.GETROLELIST_URL+`${pageNo}/${pageLimit}?roleName=${keyword}`)

export const reqAddOrUpdateRole = (roleData: RequestBodyAddRole) => {
    if(roleData.id === 0){
        return  request.post<any, any>(API.ADDROLE_URL, roleData);
    } else {
        return  request.put<any, any>(API.UPDATEROLE_URL, roleData);
    }

}

export const reqDeleteRole = (roleId: number) => request.delete<any, any>(API.DELETEROLE_URL+`${roleId}`)
//export const reqAddRole = (roleData: RequestBodyAddRole) => request.post(API.ADDROLE_URL, roleData)

export const reqGetRolePermission = (roleId: number) => request.get<any, ResponsePermissionBody>(API.GETPERMISSION_URL +  `${roleId}`)

export const reqPostRolePermission = (roleId: number, permissionList: number[]) => request.post<any, any>(API.AGGIGNPERMISSION_URL+`roleId=${roleId}&permissionId=${permissionList}`)