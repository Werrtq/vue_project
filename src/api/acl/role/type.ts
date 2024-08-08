export interface ResponseBaseData {
    code: number,
    message: string,
    ok: boolean
}

export type roleRecord = {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "roleName": string,
}

export type roleRecords = roleRecord[]

export interface ResponseBody extends ResponseBaseData {
    data: {
        records: roleRecords,
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