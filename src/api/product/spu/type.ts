export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface spuRecord {
    category3Id: number | string,
    description: string,
    id: number | string,
    spuImageList: any,
    spuName: string,
    spuSaleAttrList: any,
    tmId: number | string,
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

//添加SKU
export type attrValue = {
    id?: number,
    valueName: string,
    attrId?: number,
}

export type attrValueList = attrValue[]

export type attr = {
    id?: number,
    attrName: string,
    categoryId: number,
    categoryLevel: number,
    attrValueList: attrValueList
}

export type attrList = attr[]

export interface attrListResponseBody extends ResponseData {
    data: attrList
}

//SKU
export interface spuSaleAttrListResponseBody extends ResponseData {
    data: spuSaleAttrList
}

export interface spuImageListResponseBody extends ResponseData {
    data: spuImageList
}

export type skuAttrValue = {
    "attrId": number,
    "valueId": number
}

export type skuAttrValueList = skuAttrValue[]

export type skuSaleAttrValue = {
    "saleAttrId": number,
    "saleAttrValueId": number
}

export type skuSaleAttrValueList = skuSaleAttrValue[]

export interface skuDataRequestBody {
    "category3Id": number | string,
    "spuId": number | string,
    "tmId": number | string,
    "skuName": string,
    "price": number | string,
    "weight": string,
    "skuDesc": string,
    "skuDefaultImg": string,
    "skuAttrValueList": skuAttrValueList,
    "skuSaleAttrValueList": skuSaleAttrValueList,
}

export type skuData = {
    "id": number,
    "spuId": number,
    "price": number,
    "skuName": string,
    "skuDesc": string,
    "weight": string,
    "tmId": number,
    "category3Id": number,
    "skuDefaultImg": string,
    "isSale": number,
}

export type skuDatas = skuData[]

export interface skuDataResponseBody extends ResponseData {
    data: skuDatas
}

// export type skuAttrValue = {
//     "attrId": number,
//     "attrName": string,
//     "createTime"?: string,
//     "id": number,
//     "skuId": number,
//     "updateTime"?: string,
//     "valueId": number,
//     "valueName": string
// }