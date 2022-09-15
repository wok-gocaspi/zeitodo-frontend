<template>
  <v-container style="max-width: 25%">
    <v-card>
      <v-card-title>
        <span class="text-h5">Log in</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                  id ="username"
                  label="Username*"
                  v-model="username"
                  required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  id="password"
                  label="Password*"
                  type="password"
                  v-model="password"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="Login()"
            id="saveBtn"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import {useUserStore} from "@/stores/user";

export default {
  name: "LoginView.vue",
  setup(){
    const userStore = useUserStore()
    return {userStore}
  },
  data: () => ({
    password: "",
    username:"",
    response:"",
    error:"",
  }),
  methods:{
    async Login(){
      await this.userStore.loginUser(this.username, this.password)
      if(this.userStore.isError){
        this.$emit("setsnackbar", {text: "invalid credentials", color: "red", timeout: 5000})
      }
    },
  }
}
</script>

<style scoped>

</style>