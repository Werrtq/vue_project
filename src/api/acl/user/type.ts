export interface ResponseBaseData {
    code: number,
    message: string,
    ok: boolean
}

//用户类型
//11

export type userRecord =  {
    id?: number,
    createTime?: string,
    updateTime?: string,
    username?: string,
    password?: string,
    name?: string,
    phone?: null,
    roleName?: string
}

export type userRecords = userRecord[]

export interface ResponseData extends ResponseBaseData {
    data: {
        records: userRecords,
        total: number,
        size: number,
        current: number,
        pages: number
    }
}
//11

//角色类型
//22

export type Role = {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "roleName": string,
}

export type Roles = Role[]

export interface userAssignAndAllResponseData extends ResponseBaseData{
    data: {
        assignRoles: Roles,
        allRolesList:Roles
    }
}

//22

//设置角色列表类型
//33

export type roleIdList = number[];

export type setUserRoleData = {
    roleIdList: roleIdList,
    userId: number | undefined
}

//33