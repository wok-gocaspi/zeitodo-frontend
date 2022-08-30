<template>
  <v-container>
      <v-tabs v-model="tab" align-with-title>
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="item in items" :key="item">
          {{item}}
        </v-tab>
      </v-tabs>
  </v-container>
</template>

<script>
export default {
  name: "AdminManagementView.vue",
  data(){
    return {
      tab: "",
      items: ["user"]
    }
  }
}
</script>

<style scoped>

</style>