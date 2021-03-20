<template>
  <div class="register-page">
    <v-container>
      <v-layout flex align-center justify-center>
        <v-flex xs6 sm6 elevation-6>
          <v-card>
            <v-card-title flex align-center justify-center>
              <h1>Register</h1>
            </v-card-title>
            <v-card-text class="pt-4">
              <div>
                <v-form ref="form">
                  <v-text-field
                    v-model="userData.username"
                    label="Enter your login"
                    counter
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="userData.password"
                    label="Enter your password"
                    required
                    :append-icon="
                      userData.showPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :type="userData.showPassword ? 'text' : 'password'"
                    @click:append="
                      userData.showPassword = !userData.showPassword
                    "
                  ></v-text-field>
                  <v-text-field
                    v-model="userData.password2"
                    label="Confirm password"
                    :append-icon="
                      userData.showPassword2 ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :type="userData.showPassword2 ? 'text' : 'password'"
                    required
                    @click:append="
                      userData.showPassword2 = !userData.showPassword2
                    "
                  ></v-text-field>
                  <v-layout justify-space-between>
                    <v-btn @click="signUp(userData)"> Register </v-btn>
                    <a href="">Forgot Password</a>
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
  name: 'register',
  data: () => ({
    userData: {
      username: '',
      password: '',
      password2: '',
      showPassword: false,
      showPassword2: false,
    },
  }),
  methods: {
    async signUp (registrationInfo) {
      try {
        await this.$axios
          .$post('/auth/users/', registrationInfo)
        await this.$auth.loginWith('local', {
          data: this.userData
        })
        // await this.$auth.refreshTokens()
        await this.$toasted.global.defaultSuccess({
          msg: 'You have signed in'
        })
      } catch (err) {
        await this.$toasted.global.defaultError({
          msg: 'Invalid login or password'
          // msg: err
        })
      }
    }
  }
}
</script>
