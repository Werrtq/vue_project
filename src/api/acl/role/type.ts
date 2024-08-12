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

export type RequestBodyAddRole = {
    roleName: string,
    id: number,
}

//分配权限相关
export interface permissionData {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "pid": number,
    "name": string,
    "code": null,
    "toCode": null,
    "type": number,
    "status": null,
    "level": number,
    "children": permissionDataList,
    "select": boolean
}

export type permissionDataList = permissionData[]

export interface ResponsePermissionBody extends ResponseBaseData{
    data: permissionDataList
}