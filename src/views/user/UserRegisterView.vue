<script lang="ts">
import { userRegister } from '@/api/user'
import { reactive } from 'vue'
import { message } from 'ant-design-vue'
import router from '@/router'
interface FormState {
    account: string;
    password: string;
    checkPassword: string,
}
export default {
    setup(props, ctx) {
        const formState = reactive<FormState>({
            account: '',
            password: '',
            checkPassword: '',
        })
        /**
         * 提交表单
         * @param values 
         */
        const onFinish = async (values: any) => {
            // 前后密码不一致
            if (formState.password !== formState.checkPassword) {
                message.error('注册失败，前后密码不一致！')
                return
            }
            const res = await userRegister(values)
            // 注册成功，就跳转到登录页面
            if (res.data.code === 0 && res.data.data) {
                message.success('注册成功')
                router.push({
                    path: '/user/login',
                    replace: true,
                })
            } else {
                message.error('注册失败，' + res.data.description)
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
    <div id="userRegisterView">
        <h2 class="title">用户注册</h2>
        <a-form :model="formState" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off"
            @finish="onFinish" class="form" label-align="left">
            <a-form-item label="账户名称" name="account" :rules="[{ required: true, message: '请输入账号！' }]">
                <a-input v-model:value="formState.account" />
            </a-form-item>
            <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码！' }]">
                <a-input-password v-model:value="formState.password" />
            </a-form-item>
            <a-form-item label="确认密码" name="password" :rules="[{ required: true, message: '请再次输入密码！' }]">
                <a-input-password v-model:value="formState.checkPassword" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 10, span: 2 }">
                <a-button type="primary" html-type="submit">注册</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<style scoped>
#userRegisterView .form {
    max-width: 480px;
    margin: 0 auto;
}

#userRegisterView .title {
    text-align: center;
    margin-bottom: 20px;
}
</style>