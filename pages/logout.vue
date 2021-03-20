<template>
  <div></div>
</template>

<script>
export default {
  async created () {
    const tokenRefresh = this.$auth.strategy.refreshToken.get()
    this.$axios.post('auth/jwt/logout/', {
      refresh: tokenRefresh
    })
    await this.$auth.logout()
  }
}
</script>
