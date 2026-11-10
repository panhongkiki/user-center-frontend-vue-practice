import { getCurrentUser } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginUserStore = defineStore('login', () => {
    const loginUser = ref<any>({
        username: '未登录'
    })
    // 远程获取登录用户信息
    async function fetchLoginUser() {
        const res = await getCurrentUser()
        if (res.data.code === 0 && res.data.data) {
            loginUser.value = res.data.data
        }
        //else {
        //     setTimeout(() => {
        //         loginUser.value = { username: 'Why_Esh', id: 1 }
        //     }, 3000)
        // }
    }
    // 单独设置用户信息
    function setLoginUser(newLoginUser: any) {
        loginUser.value = newLoginUser
    }
    return {
        loginUser,
        fetchLoginUser,
        setLoginUser,
    }
})