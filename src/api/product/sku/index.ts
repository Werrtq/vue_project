import request from "../../../utils/request";
import { skuListResponseBody } from '@/api/product/sku/type'

enum API {
    GETSKULISTBYPAGE_URL = '/admin/product/list/',
    SETSKUONSALE_URL = '/admin/product/onSale/',
    SETSKUCANCELSALE_URL = '/admin/product/cancelSale/',
    DELETESKU_URL = '/admin/product/deleteSku/',
    GETSKUINFO_URL = '/admin/product/getSkuInfo/'
}

export const reqGetSkuListByPage = (pageNo: number, limit: number) => request.get<any, skuListResponseBody>(API.GETSKULISTBYPAGE_URL+`${pageNo}/${limit}`)

export const reqSetSkuOnSale = (skuId: number) => request.get<any, any>(API.SETSKUONSALE_URL + skuId)

export const reqSetSkuCancelSale = (skuId: number) => request.get<any, any>(API.SETSKUCANCELSALE_URL + skuId)

export const reqDeleteSku = (skuId: number) => request.delete<any, any>(API.DELETESKU_URL + skuId)

export const reqGetSkuInfo = (skuId: number) => request.get<any, any>(API.GETSKUINFO_URL + skuId)