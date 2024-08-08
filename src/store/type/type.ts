import { attrData, baseData } from "../../api/product/attr/type"

export interface categoryState{
    valueC1: number | string,
    dataArrC1: baseData[],
    valueC2: number | string,
    dataArrC2: baseData[],
    valueC3: number | string,
    dataArrC3: baseData[],
    dataAttr: attrData[],
}