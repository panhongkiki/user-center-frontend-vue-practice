<script lang="ts">
import { userLogin } from '@/api/user'
import { reactive } from 'vue'
import { useLoginUserStore } from '@/store/useLoginUserStore'
import { message } from 'ant-design-vue'
import router from '@/router'
interface FormState {
    userAccount: string;
    userPassword: string;
}
export default {
    setup(props, ctx) {
        const loginUserStore = useLoginUserStore()
        const formState = reactive<FormState>({
            userAccount: '',
            userPassword: '',
        })
        /**
         * 提交表单
         * @param values 
         */
        const onFinish = async (values: any) => {
            const res = await userLogin(values)
            if (res.data.code === 0 && res.data.data) {
                loginUserStore.setLoginUser(res.data.data)
                message.success('登录成功')
                router.push({
                    path: '/',
                    replace: true,
                })
            } else {
                message.error('登录失败，账号或密码错误')
            }

        }
        return {
            formState,
            onFinish,
        }
    }
}


</script>

<template>
    <div id="userLoginView">
        <h2 class="title">用户登录</h2>
        <a-form :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off"
            @finish="onFinish" class="form" label-align="left">
            <a-form-item label="账户名称" name="userAccount" :rules="[{ required: true, message: '请输入账号！' }]">
                <a-input v-model:value="formState.userAccount" />
            </a-form-item>
            <a-form-item label="密码" name="userPassword" :rules="[{ required: true, message: '请输入密码！' }]">
                <a-input-password v-model:value="formState.userPassword" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 10, span: 2 }">
                <a-button type="primary" html-type="submit">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<style scoped>
/* #userLoginView{
    display:flex;
    align-items: center;
    justify-content:center;
} */
#userLoginView .form {
    max-width: 480px;
    margin: 0 auto;
}

#userLoginView .title {
    text-align: center;
    margin-bottom: 20px;
}
</style>