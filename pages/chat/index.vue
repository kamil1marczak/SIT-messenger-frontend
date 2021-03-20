<template>
  <v-card
    class="mx-auto"
  >
    <template>
      <v-card>
        <v-card-title>
          List of Chats
        </v-card-title>
        <v-spacer></v-spacer>
        <v-expansion-panels
          v-model="panel"
          :disabled="disabled"
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              Settings
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-search"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                >
                  <v-menu
                    v-model="menuDateFromCreated"
                    :close-on-content-click="false"
                    max-width="290"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="dateFromCreated"
                        clearable
                        label="Date From"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        @click:clear="dateFromCreated = null"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateFromCreated"
                      @change="menuDateFromCreated = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col

                >
                  <v-menu
                    v-model="menuDateToCreated"
                    :close-on-content-click="false"
                    max-width="290"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="dateToCreated"
                        clearable
                        label="Date To"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        @click:clear="dateToCreated = null"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateToCreated"
                      @change="menuDateToCreated = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>

              <v-row>
                <v-col
                >
                  <v-menu
                    v-model="menuDateFromUpdated"
                    :close-on-content-click="false"
                    max-width="290"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="dateFromUpdated"
                        clearable
                        label="Date From"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        @click:clear="dateFromUpdated = null"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateFromUpdated"
                      @change="menuDateFromUpdated = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col

                >
                  <v-menu
                    v-model="menuDateToUpdated"
                    :close-on-content-click="false"
                    max-width="290"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="dateToUpdated"
                        clearable
                        label="Date To"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        @click:clear="dateToUpdated = null"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="dateToUpdated"
                      @change="menuDateToUpdated = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-skeleton-loader
          v-show="loading"
          type="table-heading, list-item-two-line, table-tbody,  table-tfoot"
        />

        <v-data-table
          :headers="headers"
          :items="chats"
          :search="search"
          :sort-by="['username', 'created', 'updated',]"
          v-show="!loading"
          multi-sort
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              @click="deleteItem(item.id)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:item.id="{ item }">
            <nuxt-link :to="`/chat/${item.id}/`" class="btn btn-sm btn-success">
              <v-chip
                class="ma-2"
                color="primary"
                label
              >
                <v-icon left>
                  mdi-account-circle-outline
                </v-icon>
                Open Chat
              </v-chip>
            </nuxt-link>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="mdi-warning">
              Your search found no results.
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
    </template>
    <v-footer>
    </v-footer>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
import {mapState} from "vuex";
import moment from 'moment'
import {format, parseISO, isBefore, isAfter, differenceInMilliseconds, getUnixTime, addHours} from 'date-fns'
import _ from '~/plugins/lodash'

export default {

  data() {
    return {
      panel: [],
      disabled: false,
      readonly: false,
      // https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments
      dateFromCreated: undefined,
      dateToCreated: undefined,
      dateFromUpdated: undefined,
      dateToUpdated: undefined,
      // dateTo: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),

      menuDateFromCreated: false,
      menuDateToCreated: false,
      menuDateFromUpdated: false,
      menuDateToUpdated: false,

      loading: true,

      chatsRaw: [],
      chats: [],
      userList: [],
      search: '',

      dialogDelete: false,
      deleteChatId: '',

    }
  },

  async fetch() {
    // this.mountains = await this.$http.$get('https://api.nuxtjs.dev/mountains')
    let chatsResponse = await this.$axios.get("v1/chat/")
    let userListResponse = await this.$axios.get("v1/users/")
    this.userList = userListResponse.data

    const selfId = this.$auth.user.id
    let chatRaw = chatsResponse.data

    let chatParsedDate = _.map(chatRaw, function computedDateFormattedDatefns(chat) {
      chat.createdParsed = format(parseISO(chat.created), 'EEEE, MMMM do yyyy')
      chat.updatedParsed = format(parseISO(chat.updated), 'EEEE, MMMM do yyyy')
      chat.createdUnix = getUnixTime(parseISO(chat.created))
      chat.updatedUnix = getUnixTime(parseISO(chat.updated))
      return chat
    })

    let chatsSingleOwner = _.map(chatParsedDate, function lodashDifference(chat) {
      if (chat.owner.length > 1) {
        chat.singleOwner = _.toString(_.difference(chat.owner, [selfId,]))
        return chat
      } else {
        return chat
      }
    })

    const userListRaw = userListResponse.data;

    this.chats = _.map(chatsSingleOwner, function lodashUsername(chat) {
      const user = _.find(userListRaw, ['id', chat.singleOwner]);
      if (user) {
        chat.username = user.username;
        return chat
      } else {
        return chat
      }
    })

  },

  computed: {
    ...mapState('auth', ['loggedIn', 'user']),
    headers () {
      return [
        {
          text: 'Open Chat',
          align: 'left',
          sortable: true,
          value: 'id'
        },
        {
          text: 'User Name (Login)',
          align: 'left',
          sortable: true,
          value: 'username'
        },
        {
          text: 'Created',
          align: 'left',
          sortable: true,
          value: 'createdParsed'

        },
        {
          text: 'Last Update',
          align: 'left',
          sortable: true,
          value: 'updatedParsed'
        },
        {
          text: 'Delete',
          align: 'left',
          sortable: true,
          value: 'actions'
        },

        {
          text: 'createdUnix',
          align: ' d-none',
          sortable: true,
          value: 'createdUnix',
          filter: (value) => {
            if (this.dateFromCreated && this.dateToCreated) return getUnixTime(parseISO(this.dateFromCreated)) <= value && value <= getUnixTime(parseISO(this.dateToCreated)) + (24 * 60 * 60)
            else if (!this.dateFromCreated && this.dateToCreated) return value <= getUnixTime(parseISO(this.dateToCreated)) + (24 * 60 * 60)
            else if (this.dateFromCreated && !this.dateToCreated) return getUnixTime(parseISO(this.dateFromCreated)) <= value
            else if (!this.dateFromCreated && !this.dateToCreated) return true
          },
        },
        {
          text: 'updatedUnix',
          align: ' d-none',
          sortable: true,
          value: 'updatedUnix',
          filter: (value) => {
            if (this.dateFromUpdated && this.dateToUpdated) return getUnixTime(parseISO(this.dateFromUpdated)) <= value && value <= getUnixTime(parseISO(this.dateToCreated)) + (24 * 60 * 60)
            else if (!this.dateFromUpdated && this.dateToUpdated) return value <= getUnixTime(parseISO(this.dateToUpdated)) + (24 * 60 * 60)
            else if (this.dateFromUpdated && !this.dateToUpdated) return getUnixTime(parseISO(this.dateFromCreated)) <= value
            else if (!this.dateFromUpdated && !this.dateToUpdated) return true
          },
        },
        this.loading = false
      ]
    },

    filterDate() {
      let localDateFromCreated = this.dateFromCreated ? parseISO(this.dateFromCreated) : undefined
      let localDateFromUpdated = this.dateFromUpdated ? parseISO(this.dateFromUpdated) : undefined
      let localDateToCreated = this.dateToCreated ? addHours(parseISO(this.dateToCreated), 24) : undefined
      let localDateToUpdated = this.dateToUpdated ? addHours(parseISO(this.dateToUpdated), 24) : undefined

      _.filter(this.chats, function (o) {
        if (localDateFromCreated && localDateToCreated)
          return isAfter(parseISO(o.created), localDateFromCreated) && isBefore(parseISO(o.created), localDateToCreated)
        else if (!localDateFromCreated && localDateToCreated)
          return isBefore(parseISO(o.created), localDateToCreated)
        else if (localDateFromCreated && !localDateToCreated)
          return isAfter(parseISO(o.created), localDateFromCreated)
        else return true
      })

    },


    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
    parseDateFrom() {
      return this.dateFrom ? format(parseISO(this.dateFrom), 'EEEE, MMMM do yyyy') : ''
    },

    parseDateTo() {
      return this.dateTo ? format(parseISO(this.dateTo), 'EEEE, MMMM do yyyy') : ''
    },
  },

  methods: {

    filterTime(){
      let dateToCreatedLocal = this.dateToCreated
      let dateToUpdatedLocal = this.dateToUpdated
      let dateFromCreatedLocal = this.dateFromCreated
      let dateFromUpdatedLocal = this.dateFromCreated

      let chatNew = _.filter(this.chats, function(o) {
        if (dateFromCreatedLocal && dateToCreatedLocal) return getUnixTime(parseISO(dateFromCreatedLocal)) <= o.createdParsed && o.createdParsed <= getUnixTime(parseISO(dateToCreatedLocal)) + (24 * 60 * 60)
        else if (!dateFromCreatedLocal && dateToCreatedLocal) return o.createdParsed <= getUnixTime(parseISO(dateToCreatedLocal)) + (24 * 60 * 60)
        else if (dateFromCreatedLocal && !dateToCreatedLocal) return getUnixTime(parseISO(dateFromCreatedLocal)) <= o.createdParsed
        else if (!dateFromCreatedLocal && !dateToCreatedLocal) return true
      })


    },

    refreshFetch() {
      let chatsResponse = this.$axios.get("v1/chat/")
      let userListResponse = this.$axios.get("v1/users/")
      this.userList = userListResponse.data;
      this.chatsRaw = chatsResponse.data;
    },

    deleteItem(id) {
      this.deleteChatId = id
      this.dialogDelete = true
    },
    async deleteItemConfirm () {
      let chatId = this.deleteChatId
      let deletedChat = await this.$axios.delete('v1/chat/' + chatId)
      let chatNew = _.filter(this.chats, function (o) { return o.id !== chatId});
      if (!deletedChat.data) this.chats = chatNew
      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
      this.deleteChatId = ''
    }
  }
}
</script>
<style>

</style>
