export interface responseBase  {
    code: number,
    message: string,
    ok: boolean
}

export interface baseData {
    id: number,
    createTime: string,
    updateTime: string,
    name: string,
    category1Id?: number,
    category2Id?: number
}


export interface totalData extends responseBase{
    data: baseData[]
}

export interface attrValueData {
    id?: number,
    valueName: string,
    attrId?: number|string,
    flag?: boolean
}

export type attrValueList = attrValueData[];

export interface attrData {
    id?: number,
    attrName: string,
    categoryId: number|string,
    categoryLevel: number,
    attrValueList: attrValueList,
}

export type attrDataList = attrData[];

export interface responseAttr extends responseBase{
    data: attrData[]
}