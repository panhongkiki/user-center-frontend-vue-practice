<script lang="ts">
import BasicLayout from './layouts/BasicLayout.vue'
import { useLoginUserStore } from './store/useLoginUserStore.ts'

export default {
  components: {
    BasicLayout,
  },
  setup() {
    const loginUserStore = useLoginUserStore()
    loginUserStore.fetchLoginUser()
    return {

    }
  }
}
</script>

<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style scoped></style>
