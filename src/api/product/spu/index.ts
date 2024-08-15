import request from "../../../utils/request";
import { spuListResponseBody, trademarkListResponseBody, spuDataResponseBody, allSaleAttrListResponseBody, attrListResponseBody } from "./type";

enum API {
    GETSPULIST_URL = '/admin/product/',
    GETTRADEMARKLIST_URL = '/admin/product/baseTrademark/getTrademarkList',
    GETSPUDATA_URL = '/admin/product/getSpuInfo/',
    GETALLSALEATTRLIST = '/admin/product/baseSaleAttrList',
    UPDATESPU_URL = '/admin/product/updateSpuInfo',
    ADDSPU_URL = '/admin/product/saveSpuInfo',
    DELETESPU_URL = '/admin/product/deleteSpu/',
    GETATTRLIST_URL = '/admin/product/attrInfoList/' //平台属性
}

export const reqGetUrl = (pageNo: number, limit: number, category3Id: number | string) => request.get<any, spuListResponseBody>(API.GETSPULIST_URL + `${pageNo}/${limit}/?category3Id=${category3Id}`)

export const reqGetTrademarkList = () => request.get<any, trademarkListResponseBody>(API.GETTRADEMARKLIST_URL)

export const reqGetSpuDataById = (spuId: number) => request.get<any, spuDataResponseBody>(API.GETSPUDATA_URL+spuId)

export const reqGetAllSaleAttrList = () => request.get<any, allSaleAttrListResponseBody>(API.GETALLSALEATTRLIST)

export const reqUpdateOrAddSpu = (spuBody: spuDataResponseBody) => {
    if(spuBody.data?.id){
        return request.post<any, any>(API.UPDATESPU_URL, spuBody)
    } else {
        return  request.post<any, any>(API.ADDSPU_URL, spuBody)
    }
}

export const reqDeleteSpu = (spuId: number) => request.delete<any, any>(API.DELETESPU_URL+spuId)

export const reqGetAttrList = (id1: number, id2: number, id3: number) => request.get<any, attrListResponseBody>(API.GETATTRLIST_URL + id1 + '/' + id2 + '/' + id3)

//export const reqUpdateSpu = (spuBody: spuDataResponseBody) => request.post<any, any>(API.UPDATESPU_URL, spuBody)