import myAxios from "@/request"

/**
 * 用户注册
 * @param params 
 * @returns 
 */
export const userRegister = async (params: any) => {
    return myAxios.request({
        url: '/api/user/register',
        method: 'POST',
        data: params,
    })
}
/**
 * 用户登录
 * @param params 
 * @returns 
 */
export const userLogin = async (params: any) => {
    return myAxios.request({
        url: '/api/user/login',
        method: 'POST',
        data: params,
    })
}
/**
 * 用户登出
 * @param params 
 * @returns 
 */
export const userLogout = async (params: any) => {
    return myAxios.request({
        url: '/api/user/logout',
        method: 'POST',
        data: params,
    })
}
/**
 * 获取当前用户
 * @returns 
 */
export const getCurrentUser = async () => {
    return myAxios.request({
        url: '/api/user/current',
        method: 'GET',
    })
}
/**
 * 获取用户列表
 * @param username
 */
export const searchUsers = async (username: any) => {
    return myAxios.request({
        url: '/api/user/search',
        method: 'GET',
        params: {
            username
        },
    })
}
/**
 * 删除用户
 * @param id 
 * @returns 
 */
export const deleteUser = async (id: string) => {
    return myAxios.request({
        url: '/api/user/delete',
        method: 'POST',
        data: id,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}