<template>
  <v-card
    class="mx-auto"
  >
    <v-container>
      <v-row align="center">
        <v-col>
          <v-select
            v-model="userChat"
            :items="userList"
            item-text="username"
            item-value="id"
            label="select user to start chat"
            return-object
            :menu-props="{ top: true, offsetY: true }"
          />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col>
          <v-btn
            color="blue-grey"
            class="ma-2 white--text"
            @click="createChat"
          >
            Create Chat
            <v-icon
              right
              dark
            >
              folder-plus-outline
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {

  data () {
    return {
      select: {
        email: 'login@example.com',
        id: '00000000-0000-0000-0000-000000000000',
        username: 'uername'
      },
      userList: [],
      userChat: {},
      loading3: false
    }
  },

  async fetch () {
    const userListResponse = await this.$axios.get('v1/users/')
    this.userList = userListResponse.data

  },

  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn', 'user'])
  },
  methods: {
    async createChat () {
      try {
        const userData = { owner: this.userChat.id }
        await this.$axios
          .$post('v1/chat/', userData)
        await this.$toast.success('chat created').goAway(1000)
      } catch (err) {
        await this.$toast.error('invalid data').goAway(1000)
      }
    }
  }
}
</script>

<style>
</style>
