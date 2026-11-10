<script lang="ts">
import { useRouter } from 'vue-router'
import { h, ref } from 'vue'
import { HomeOutlined, CrownOutlined, UserOutlined, UserAddOutlined, YoutubeOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { useLoginUserStore } from '@/store/useLoginUserStore'
export default {
    setup() {
        const router = useRouter()
        const current = ref<string[]>([''])
        router.afterEach((to, from, failure) => {
            current.value = [to.path]
        })
        const items = ref<MenuProps['items']>([
            {
                key: '/',
                icon: () => h(HomeOutlined),
                label: '主页',
                title: '主页',
            },
            {
                key: '/user/login',
                icon: () => h(UserOutlined),
                label: '用户登录',
                title: '用户登录',
            },
            {
                key: '/user/register',
                icon: () => h(UserAddOutlined),
                label: '用户注册',
                title: '用户注册',
            },
            {
                key: '/admin/userManage',
                icon: () => h(CrownOutlined),
                label: '用户管理',
                title: '用户管理',
            },
            {
                key: 'others',
                icon: () => h(YoutubeOutlined),
                label: h(
                    'a', { href: 'https://www.youtube.com/', target: '_blank' },
                    'youtube'
                ),
                title: 'youtube',
            }
        ])
        // 点击菜单后路由跳转事件
        const onMenuClick = ({ key }: { key: string }) => {
            router.push({
                path: key,
            })
        }
        const loginUserStore = useLoginUserStore()
        return {
            current,
            items,
            onMenuClick,
            loginUserStore
        }
    }

}
</script>

<template>
    <div id="globalHeader">
        <a-row :wrap="false">
            <a-col flex="200px">
                <div class="titleBar">
                    <img src="../assets/task.svg" alt="logo" class="logo" />
                    <div class="title">vue3</div>
                </div>
            </a-col>
            <a-col flex="auto">
                <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="onMenuClick" />
            </a-col>
            <a-col flex="80px">
                <div class="userLoginStatus" v-if="loginUserStore.loginUser.id">
                    {{ loginUserStore.loginUser.username ?? 'jcc' }}
                </div>
                <div v-else>
                    <a-button type="primary" href="/user/login">登录</a-button>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<style scoped>
#globalHeader .titleBar {
    display: flex;
    align-items: center;
}

.logo {
    height: 48px;

}

.title {
    color: black;
    font-size: 18px;
    margin-left: 10px;
}
</style>