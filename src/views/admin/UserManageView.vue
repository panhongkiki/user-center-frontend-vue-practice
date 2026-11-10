<script lang="ts">
import { ref } from 'vue'
import { searchUsers, deleteUser } from '@/api/user'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
export default {
    setup(props, ctx) {
        const searchValue = ref('')
        const onSearch = () => {
            fetchData(searchValue.value)
        }
        const onDelete = async (id: string) => {
            if (!id) {
                return
            }
            const res = await deleteUser(id)
            if (res.data.code === 0) {
                message.success('删除成功！')
                fetchData()
            } else {
                message.error('删除失败' + res.data.description)
            }
        }

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'username',
            },
            {
                title: '账号',
                dataIndex: 'userAccount',
            },
            {
                title: '头像',
                dataIndex: 'avatarUrl', // avatar表示头像
            },
            {
                title: '性别',
                dataIndex: 'gender',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
            },
            {
                title: '用户信息',
                dataIndex: 'userRole',
            },
            {
                title: '操作',
                dataIndex: 'action',
            },
        ]
        // 数据
        const data = ref([])
        /**
         * 获取数据
         */
        const fetchData = async (username = '') => {
            const res = await searchUsers(username)
            if (res.data.data) {
                data.value = res.data.data
            } else {
                message.error('获取数据失败，' + res.data.description)
            }
        }
        return {
            columns,
            data,
            fetchData,
            dayjs,
            searchValue,
            onSearch,
            onDelete,
        }
    }
}
</script>
<template>
    <div id="userManageView">
        <a-input-search v-model:value="searchValue" placeholder="input search text" style="width: 200px"
            @search="onSearch" />
        <a-table :columns="columns" :data-source="data">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'avatarUrl'">
                    <img :src="record.avatarUrl" alt="avatar" :width="120">
                </template>
                <template v-else-if="column.dataIndex === 'userRole'">
                    <div v-if="record.userRole === 1">
                        <a-tag color="green">管理员</a-tag>
                    </div>
                    <div v-else>
                        <a-tag color="blue">普通用户</a-tag>
                    </div>
                </template>
                <template v-else-if="column.dataIndex === 'createTime'">
                    {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
                <template v-else-if="column.dataIndex === 'action'">
                    <a-button danger @click="onDelete(record.id)">删除</a-button>
                </template>
            </template>
        </a-table>
    </div>
</template>
<style scoped>
#userManageView {}
</style>