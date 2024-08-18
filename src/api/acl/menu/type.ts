export interface ResponseBaseData {
    code: number,
    message: string,
    ok: boolean
}

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
    select: boolean
}

export type permissionDataList = permissionData[]

export interface permissionDataListResponseBody extends ResponseBaseData {
    data: permissionDataList
}

export interface addPermissionRequestBody {
    id?: number,
    "code": string,
    "level": number,
    "name": string,
    "pid": number,
}