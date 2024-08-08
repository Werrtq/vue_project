export interface loginFormdata{
    name: string,
    password: string
};

export interface ResponesData{
    code: number,
    message: string,
    ok: boolean
}

export interface loginResponesData extends ResponesData{
    data: string
}

export interface userInfoResponesData extends ResponesData{
    data: {
        routes: string[],
        roles: string[],
        buttons: string[],
        avatar: string,
        name: string
    }
}