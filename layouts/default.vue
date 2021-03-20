<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list dense nav>
        <v-list-item>
          <v-list-item-icon>
            <v-icon> mdi-home-city </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <nuxt-link :to="{name: 'index'}" exact-active-class="is-active">
              <v-list-item-title> Home </v-list-item-title>
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>

        <div v-if="loggedIn">
          <v-list-item
            v-for="(item, key) in authenticatedItems"
            :key="key"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <nuxt-link :to="item.to" exact-active-class="is-active">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </nuxt-link>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-else>
          <v-list-item
            v-for="(item, key) in unAuthenticatedItems"
            :key="key"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <nuxt-link :to='item.to' exact-active-class="is-active">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </nuxt-link>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
<!--      <v-btn-->
<!--        icon-->
<!--        @click.stop="miniVariant = !miniVariant"-->
<!--      >-->
<!--        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>-->
<!--      </v-btn>-->
<!--      <v-btn-->
<!--        icon-->
<!--        @click.stop="clipped = !clipped"-->
<!--      >-->
<!--        <v-icon>mdi-application</v-icon>-->
<!--      </v-btn>-->
<!--      <v-btn-->
<!--        icon-->
<!--        @click.stop="fixed = !fixed"-->
<!--      >-->
<!--        <v-icon>mdi-minus</v-icon>-->
<!--      </v-btn>-->
      <v-toolbar-title v-text="appTitle" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-account-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-icon> mdi-account-circle </v-icon>
<!--            <img src="https://static.thenounproject.com/png/363639-200.png">-->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-if="user">{{ user.username }}</v-list-item-title>
            <v-list-item-subtitle v-if="user">Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list>
        <div v-if="loggedIn">
          <v-list-item
            v-for="(item, key) in userSettings"
            :key="key"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <nuxt-link :to="item.to" exact-active-class="is-active">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </nuxt-link>
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-else>
          <v-list-item
            v-for="(item, key) in unAuthenticatedItems"
            :key="key"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <nuxt-link :to='item.to' exact-active-class="is-active">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </nuxt-link>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>

import {mapState} from 'vuex'

export default {
  async fetch() {
    try {
      this.userList = await this.$storage.getUniversal('userList')
      // await this.$toast.show( 'data updated from storage')
      console.log('data updated from storage')
    } catch (err) {
      // await this.$toast.show('Invalid login or password')
      console.log('Invalid login or password')
    }
  },

  data()
  { return {

    globalItems: [
      {
        title: 'Home',
        icon: 'home',
        to: {name: 'index'}
      }
    ],
    authenticatedItems: [
      {title: 'Users',
        icon: 'mdi-account-group',
        to: {name: 'users'}
      },

      {
        title: 'Chats',
        icon: 'mdi-chat',
        to: {name: 'chat'}
      },
      {
        title: 'Create chat',
        icon: 'mdi-message-plus',
        to: {name: 'chat-add'}
      },
    ],
    unAuthenticatedItems: [
      {
        title: 'Log In',
        icon: 'mdi-login',
        to: {name: 'login'}
      },
      {
        title: 'Sign In',
        icon: 'mdi-account-plus',
        to: {name: 'register'}
      },
    ],

    userSettings: [
      {
        title: 'Log Out',
        icon: 'mdi-logout',
        to: {name: 'logout'}
      },
    ],


    userList: [],

    clipped: false,
    drawer: false,
    fixed: false,
    items: [
      {
        icon: 'mdi-apps',
        title: 'Welcome',
        to: '/'
      },
      {
        icon: 'mdi-chart-bubble',
        title: 'Inspire',
        to: '/inspire'
      }
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
    appTitle: 'SIT messenger'
  }
  },

  computed: {
    ...mapState('auth', ['loggedIn', 'user']),
  },

  mounted()
  {
    // this.userList = this.$storage.getLocalStorage('usersList')
  }

}
</script>
