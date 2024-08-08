import request from '@/utils/request';
import { ResponseBody } from './type';

enum API{
    GETROLELIST_URL = '/admin/acl/role/',
}

export const reqGetRoleList = (pageNo: number, pageLimit: number) => request.get<any, ResponseBody>(API.GETROLELIST_URL+`${pageNo}/${pageLimit}`)