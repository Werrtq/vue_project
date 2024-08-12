import request from "../../../utils/request";
import { spuListResponseBody, trademarkListResponseBody, spuDataResponseBody, allSaleAttrListResponseBody } from "./type";

enum API {
    GETSPULIST_URL = '/admin/product/',
    GETTRADEMARKLIST_URL = '/admin/product/baseTrademark/getTrademarkList',
    GETSPUDATA_URL = '/admin/product/getSpuInfo/',
    GETALLSALEATTRLIST = '/admin/product/baseSaleAttrList'
}

export const reqGetUrl = (pageNo: number, limit: number, category3Id: number | string) => request.get<any, spuListResponseBody>(API.GETSPULIST_URL + `${pageNo}/${limit}/?category3Id=${category3Id}`)

export const reqGetTrademarkList = () => request.get<any, trademarkListResponseBody>(API.GETTRADEMARKLIST_URL)

export const reqGetSpuDataById = (spuId: number) => request.get<any, spuDataResponseBody>(API.GETSPUDATA_URL+spuId)

export const reqGetAllSaleAttrList = () => request.get<any, allSaleAttrListResponseBody>(API.GETALLSALEATTRLIST)