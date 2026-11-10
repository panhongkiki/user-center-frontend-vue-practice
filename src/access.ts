import router from '@/router'
import { useLoginUserStore } from './store/useLoginUserStore'
import { message } from 'ant-design-vue'


/**
 * 全局权限校验
 */
router.beforeEach((to) => {
    const loginUser = useLoginUserStore().loginUser
    const toUrl = to.fullPath
    if (toUrl.startsWith('/admin')) {
        if (!loginUser || loginUser.userRole !== 1) {
            message.error('权限不足，将跳转到首页。')
            return { name: 'home', replace: true }
        }
    }
})