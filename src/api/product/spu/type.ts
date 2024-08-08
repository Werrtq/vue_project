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
    spuPosterList: null,
    spuSaleAttrList: null,
    tmId: number,
}

export type spuRecords = spuRecord[]

export interface spuData extends ResponseData{
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