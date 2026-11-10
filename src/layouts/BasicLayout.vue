<script lang="ts">
import { getCurrentUser, userRegister } from '@/api/user'
import GlobalHeader from '@/components/GlobalHeader.vue'
export default {
    components: {
        GlobalHeader,
    },
    setup() {
        // getCurrentUser().then(res => {
        //     console.log(res)
        // })
        return {

        }
    }
}
</script>

<template>
    <div id="basicLayout">
        <a-layout>
            <a-layout-header class="header">
                <GlobalHeader />
            </a-layout-header>
            <a-layout-content class="content">
                <RouterView />
            </a-layout-content>
            <a-layout-footer class="footer">
                <a href="https://www.douyin.com" target="_blank">About</a>
            </a-layout-footer>
        </a-layout>
    </div>
</template>
<style scoped>
#basicLayout .header {
    background-color: white;
    margin-bottom: 16px;
    color: unset;
    padding-inline: 20px;
}

#basicLayout .content {
    padding: 20px;
    margin-bottom: 20px;
    background-color: linear-gradient(to right, #fefefe, #fff);
}

#basicLayout .footer {
    background-color: #efefef;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
}
</style>