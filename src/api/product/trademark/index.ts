import request from '../../../utils/request';
import { TradeMarkResponseData } from './type';

enum API{
    GETDATA_URL = '/admin/product/baseTrademark/',
    SAVEDATA_URL = '/admin/product/baseTrademark/save',
    UPDATEDATA_URL = '/admin/product/baseTrademark/update',
    DELETE_URL = '/admin/product/baseTrademark/remove/'
}

export const reqHasTrademark = (pageNo:number, limit:number) => request.get<any,TradeMarkResponseData>(API.GETDATA_URL+`${pageNo}/${limit}`);

export const reqTrademark = (data: any) => {
    if(data.id){
        return request.put<any, any>(API.UPDATEDATA_URL, data);
    } else {
        return request.post<any, any>(API.SAVEDATA_URL, data);
    }
};

export const reqDeleteTrademark = (id: any) => request.delete<any, any>(API.DELETE_URL+id);