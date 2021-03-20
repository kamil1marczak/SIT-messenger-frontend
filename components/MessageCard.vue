<template>
  <v-card
    class="mx-auto"
    max-width="auto"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          Mesage
        </div>
        <v-list-item-content>
          <v-list-item-title>chat id</v-list-item-title>
          <v-list-item-subtitle v-text="chat.id"></v-list-item-subtitle>
          <v-list-item-title>user id</v-list-item-title>
          <v-list-item-subtitle v-text="chat.singleOwner"></v-list-item-subtitle>
          <v-list-item-title>username</v-list-item-title>
          <v-list-item-subtitle v-text="chat.username"></v-list-item-subtitle>
          <v-list-item-title>created</v-list-item-title>
          <v-list-item-subtitle v-text="chat.created"></v-list-item-subtitle>
          <v-list-item-title>updated</v-list-item-title>
          <v-list-item-subtitle v-text="chat.updated"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
      >
        <nuxt-link :to="`/chat/${chat.id}/`" class="btn btn-sm btn-success"> View </nuxt-link>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
export default {
  props: ["chat"]
};
</script>

