export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export type Record = {
    id?: number,
    tmName: string,
    logoUrl: string
}

export type Records = Record[];

export type RecordData = {
    records: Records,
    total: number,
    size: number,
    current: number,
    orders: [],
    optimizeCountSql: boolean,
    hitCount: boolean,
    countId: null,
    maxLimit: null,
    searchCount: boolean,
    pages: number,
}

export interface TradeMarkResponseData extends ResponseData{
    data: RecordData
}