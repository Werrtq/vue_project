export interface ResponseBaseData {
    code: number,
    message: string,
    ok: boolean
}

export type skuRecord = {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "spuId": number,
    "price": number,
    "skuName": string,
    "skuDesc": string,
    "weight": string,
    "tmId": number,
    "category3Id": number,
    "skuDefaultImg": string,
    "isSale": number,
    "skuImageList": null,
    "skuAttrValueList": null,
    "skuSaleAttrValueList": null
}

export type skuRecords = skuRecord[]

export interface skuListResponseBody extends ResponseBaseData {
    data: {
        records: skuRecords,
        "total": number,
        "size": number,
        "current": number,
        "orders": [],
        "optimizeCountSql": boolean,
        "hitCount": boolean,
        "countId": null,
        "maxLimit": null,
        "searchCount": boolean,
        "pages": number
    }
}