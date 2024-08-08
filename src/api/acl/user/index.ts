import request from '@/utils/request';
import type { ResponseData, userRecord, userAssignAndAllResponseData, setUserRoleData } from '../../acl/user/type';

enum API{
    GETUSERLIST_URL = '/admin/acl/user/',
    ADDUSER_URL = '/admin/acl/user/save',
    UPDATEUSER_URL = '/admin/acl/user/update',
    GETUSERALLROLE_URL = '/admin/acl/user/toAssign/',
    SETUSERROLE_URL = '/admin/acl/user/doAssignRole',
    DELETEUSER_URL = '/admin/acl/user/remove/',
    DELETEUSERLIST_URL = '/admin/acl/user/batchRemove'
}

export const reqGetUserList = (page: number, limit: number, username: string) => request.get<any, ResponseData>(API.GETUSERLIST_URL + page + '/' + limit + `/?username=${username}`);

export const reqAddOrUpdateUser = (data: userRecord) => {
    if(data.id){
        return request.put<any, any>(API.UPDATEUSER_URL, data);
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data);
    }
}

export const reqGetUserAllRole = (userId: number | undefined) => request.get<any, userAssignAndAllResponseData>(API.GETUSERALLROLE_URL+`${userId}`)

export const reqSetUserRole = (data: setUserRoleData) => request.post<any, any>(API.SETUSERROLE_URL, data)

export const reqDeleteUser = (userId: number | undefined) => request.delete<any, any>(API.DELETEUSER_URL+userId)

export const reqDeleteUserList = (userIdList: number[]) => request.delete<any, any>(API.DELETEUSERLIST_URL, {data: userIdList})