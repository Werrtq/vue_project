export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface spuRecord {
    category3Id: number,
    description: string,
    id: number,
    spuImageList: null,
    spuName: string,
    spuSaleAttrList: null,
    tmId: number,
}

export type spuRecords = spuRecord[]

export interface spuListResponseBody extends ResponseData {
    data: {
        current: number,
        hitCount: boolean,
        pages: number,
        records: spuRecords,
        searchCount: boolean,
        size: number,
        total: number
    }
}

export type trademark = {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "tmName": string,
    "logoUrl": string
}

export type trademarkList = trademark[]

export interface trademarkListResponseBody extends ResponseData {
    data: trademarkList
}

export type spuSaleAttrValue = {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "spuId": number,
    "baseSaleAttrId": number,
    "saleAttrValueName": string,
    "saleAttrName": string,
    "isChecked": null
}

export type spuSaleAttrValueList = spuSaleAttrValue[]

export type spuSaleAttr = {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "spuId": number,
    "baseSaleAttrId": number,
    "saleAttrName": string,
    "spuSaleAttrValueList": spuSaleAttrValueList
}

export type spuSaleAttrList = spuSaleAttr[]

export type spuImage = {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "spuId": number,
    "imgName": string,
    "imgUrl": string
}

export type spuImageList = spuImage[]

export type spuPoster = {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "spuId": number,
    "imgName": string,
    "imgUrl": string
}

export type spuPosterList = spuPoster[]

export interface spuDataResponseBody extends ResponseData {
    data: {
        "id": number,
        "createTime": string,
        "updateTime": string,
        "spuName": string,
        "description": string,
        "category3Id": number,
        "tmId": number,
        "spuSaleAttrList": spuSaleAttrList,
        "spuImageList": spuImageList,
        "spuPosterList": spuPosterList
    }
}


//所有销售属性列表
export type saleAttr = {
    id: number,
    name: string,
}

export type saleAttrList = saleAttr[]

export interface allSaleAttrListResponseBody extends ResponseData {
    data: saleAttrList
}