import request from "../../../utils/request";
import { spuData } from "./type";

enum API {
    SPU_URL = '/admin/product/'
}

export const reqGetUrl = (pageNow: number, limit: number, category3Id: number | string) => request.get<any, spuData>(API.SPU_URL + `${pageNow}/${limit}?category3Id=${category3Id}`)