import request from "../../../utils/request";
import { totalData, responseAttr, attrData } from './type';


enum API {
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2/',
    C3_URL = '/admin/product/getCategory3/',
    ATTR_URL = '/admin/product/attrInfoList/',
    SAVEATTR_URL = '/admin/product/saveAttrInfo',
    DELETEATTR_URL = '/admin/product/deleteAttr/'
}

export const reqGetC1 = () => request.get<any, totalData>(API.C1_URL);

export const reqGetC2 = (id: number | string) => request.get<any, totalData>(API.C2_URL + id);

export const reqGetC3 = (id: number | string) => request.get<any, totalData>(API.C3_URL + id);

export const reqGetAttr = (id1: number | string, id2: number | string, id3: number | string) => request.get<any, responseAttr>(API.ATTR_URL + `${id1}/${id2}/${id3}`)

export const reqSaveAttr = (data: attrData) => request.post<any, any>(API.SAVEATTR_URL, data);

export const reqDeleteAttr = (id: number) => request.delete<any, any>(API.DELETEATTR_URL + id);