<template>
  <div id="app" data-app>
    <v-container fluid>
      <v-textarea
        counter
        label="Text"
        :rules="rules"
        :value="newMessage"
      ></v-textarea>
    </v-container>
    <v-btn
      :loading="loading3"
      :disabled="loading3"
      color="blue-grey"
      class="ma-2 white--text"
      @click="createChat"
    >
      Create Chat
      <v-icon
        right
        dark
      >
        mdi-cloud-upload
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    rules: [v => v.length <= 3750 || 'Max 3750 characters'],
    newMessage: 'Write message !',
    loading3: false
  })
}
</script>
