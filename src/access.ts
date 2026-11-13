import router from '@/router'
import { useLoginUserStore } from './store/useLoginUserStore'
import { message } from 'ant-design-vue'


/**
 * 全局权限校验
 */
router.beforeEach(async (to) => {
    const loginUserStore = useLoginUserStore()
    if (!loginUserStore.loaded) {
        await loginUserStore.fetchLoginUser()
    }
    if (to.path.startsWith('/admin') && loginUserStore.loginUser?.userRole !== 1) {
        message.error('权限不足，将跳转到首页。')
        return { name: 'home', replace: true }
    }
})
