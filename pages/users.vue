
<template>
  <v-card
    class="mx-auto"
  >
    <template>
      <v-card>
        <v-card-title>
          Find User
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="userList"
          :search="search"
        >
          <template v-slot:items="props">
            <td class="text-xs-subtitle-1">{{ props.user.id }}</td>
            <td class="text-xs-caption">{{ props.user.username}}</td>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="mdi-warning">
              Your search for "{{ search }}" found no results.
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
import _ from '~/plugins/lodash'

export default {

  async fetch() {
    // this.mountains = await this.$http.$get('https://api.nuxtjs.dev/mountains')

    let userListResponse = await this.$axios.get("v1/users/")
    this.userList = userListResponse.data;

  },

  data() {
    return {
      userList: [],
      search: '',
      headers: [
        {
          text: 'User id',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        {
          text: 'User Name (Login)',
          align: 'left',
          sortable: false,
          value: 'username'
        },
      ]
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn', 'user']),
  },

}
</script>


<style>

</style>
