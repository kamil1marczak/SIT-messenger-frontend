
<template>
  <div class="register-page">
    <v-container>
      <v-layout flex align-center justify-center>
        <v-flex xs6 sm6 elevation-6>
          <v-card>
            <v-card-title flex align-center justify-center>
              <h1>Log In</h1>
            </v-card-title>
            <v-card-text class="pt-4">
              <div>
                <v-form ref="form">
                  <v-text-field
                    v-model="user.username"
                    :rules="[rules.required]"
                    label="Login"
                    hint="Uername"
                  ></v-text-field>

                  <v-text-field
                    v-model="user.password"
                    :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    :type="show3 ? 'text' : 'password'"
                    label="Not visible"
                    hint="At least 8 characters"
                    @click:append="show3 = !show3"
                  ></v-text-field>

                  <v-layout justify-space-between>
                    <v-btn @click="login"> Login</v-btn>
                  </v-layout>
                </v-form>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      user: {},

      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        emailMatch: () => ('The email and password you entered don\'t match')
      }
    }
  },
  methods: {
    async login () {
      try {
        await this.$auth.loginWith('local', {
          data: this.user
        })
        // await this.$auth.refreshTokens()
        this.$toasted.global.defaultSuccess({
          msg: 'You have logged in'
        })
      } catch (err) {
        this.$toasted.global.defaultError({
          msg: 'Invalid login or password'
          // msg: err
        })
      }
    }
  }
}
</script>
