<template>
  <v-card
    class="mx-auto"
  >
    <v-toolbar
      color="pink"
      dark
    >
      <v-toolbar-title>Inbox</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row>
        <v-col>
          <v-text-field
            v-model="search"
            :append-outer-icon="'mdi-magnify'"
            filled
            clear-icon="mdi-close-circle"
            clearable
            label="Search"
            single-line
            hide-details
            @click:clear="clearSearch"
            @click:append-outer="searchMessages"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-list two-line>
      <template v-for="(item, index) in searchMessagesData">
        <v-list-item :key="item.title">
          <v-list-item-content>
            <v-list-item-title v-text="item.userName"></v-list-item-title>
            <v-list-item-subtitle v-text="item.message"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text v-text="item.dateTimeParsed"></v-list-item-action-text>
          </v-list-item-action>
        </v-list-item>
        <v-divider
          v-if="index < messagesData.length - 1"
          :key="index"
        ></v-divider>
      </template>
    </v-list>
    <v-divider/>
    <div>
      <template>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newMessage"
                  :append-outer-icon="'mdi-send'"
                  filled
                  clear-icon="mdi-close-circle"
                  clearable
                  label="Message"
                  type="text"
                  @click:append-outer="addMessage"
                  @click:clear="clearMessage"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </template>

    </div>
  </v-card>
</template>

<script>
import {parseISO} from 'date-fns';
import _ from '~/plugins/lodash';

export default {
  async fetch () {

    let userListResponse = await this.$axios.get('v1/users/')
    this.userList = userListResponse.data;

    const chatId = this.$route.params.id
    let chatsResponse = await this.$axios.get(`v1/chat/${chatId}/`)
    let messages = chatsResponse.data.message_data.messages
    let cacheMessages = chatsResponse.data.cache_messages.messages
    let allMessages = messages.concat(cacheMessages)

    this.messagesData = _.map(allMessages, function foo(message) {
      message.userName = _.find(userListResponse, ['id', message.user])
      message.dateTimeParsed = parseISO(message.datetime)
      return message
    })
    this.searchMessagesData = this.messagesData
  },

  methods: {
    async addMessage () {
      // try {
      let newMessage = {new_message: this.newMessage}
      const chatId = this.$route.params.id
      let chatsUpdateResponse = await this.$axios.patch(`v1/chat/${chatId}/`, newMessage)
      let messagesUpdate = chatsUpdateResponse.data.message_data.messages
      let cacheMessagesUpdate = chatsUpdateResponse.data.cache_messages.messages
      // console.log('cache message' + cacheMessagesUpdate)
      let allMessagesUpdate = messagesUpdate.concat(cacheMessagesUpdate)
      let userList = this.userList

      this.messagesData = _.map(allMessagesUpdate, function foo(message) {
        message.userName = _.find(userList, ['id', message.user])
        message.dateTimeParsed = parseISO(message.datetime)
        return message
      })
      this.searchMessagesData = this.messagesData

      await this.$toast.success('message send ').goAway(1000)
      // } catch (err) {
      //   await this.$toast.error('message error').goAway(1000)
      // }
    },

    clearMessage () {
      this.newMessage = ''
    },
    clearSearch () {
      this.search = ''
      this.searchMessagesData = this.messagesData
    },

    searchMessages () {
      const search = this.search
      this.searchMessagesData = _.filter(this.messagesData, function (o) { return _.includes(o.message, search)})
    }
  },

  data () {
    return {
      selected: [0],
      messagesData: [],
      searchMessagesData: [],
      defaultMessage: 'write new message',
      // rules: [v => v.length <= 3750 || 'Max 3750 characters'],
      newMessage: 'Hey !',
      loading3: false,
      userList: [],
      search: ''

    }
  }
}
</script>
