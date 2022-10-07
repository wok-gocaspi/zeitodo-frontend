<template>
  <nav>

  <v-snackbar
      v-model="snackbar"
      :timeout="snackbardata.timeout"
      class="main-snackbar"

  >
    {{ snackbardata.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
          v-bind:color="snackbardata.color"
          text
          v-bind="attrs"
          @click="snackbar = false; emitTimeout()"
          class="closeButton"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
  </nav>
</template>

<script>
export default {
  data(){
    return{
      snackbar: true
    }
  },
  props: ["snackbardata"],
  mounted(){
    setTimeout(() => {
      this.$emit('snackbartimeout')
    }, this.snackbardata.timeout)
  },
  methods: {
    emitTimeout(){
      this.$emit('snackbartimeout')
    }
  }
}
</script>
