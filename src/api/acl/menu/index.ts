import request from '@/utils/request'

import { permissionDataListResponseBody, addPermissionRequestBody } from './type'

enum API {
    GETPERMISSION_URL = '/admin/acl/permission',
    ADDPERMISSION_URL = '/admin/acl/permission/save',
    UPDATEPERMISSION_URL = '/admin/acl/permission/update',
    DELETEPERMISSION_URL = '/admin/acl/permission/remove/'
}

export const getPermission = () => request.get<any, permissionDataListResponseBody >(API.GETPERMISSION_URL);

export const reqAddOrUpdatePermission = (data: addPermissionRequestBody) => {
    if(data.id){
        return request.put(API.UPDATEPERMISSION_URL, data);
    } else {
        return request.post(API.ADDPERMISSION_URL, data);
    }
}

export const reqDeletePermission = (id: number) => request.delete<any, any>(API.DELETEPERMISSION_URL + id);