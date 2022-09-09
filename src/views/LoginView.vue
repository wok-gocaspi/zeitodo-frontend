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
import userService from "@/services/userService";
import axios from "axios";

export default {
  name: "LoginView.vue",
  data: () => ({
    password: "",
    username:"",
    response:"",
    error:"",
  }),
  methods:{
    async Login(){
      await userService.getLoggedinUser(this.username,this.password)
          .then(data => {
            this.response = data.data
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`;
            localStorage.setItem("token", data.data.token)
            this.$emit("setsnackbar",{text: "Successfully logged in!", timeout: 5000, color: "green"})
            this.$router.push("/")

          })
          .catch(error => {
            this.error = error
            this.$emit("setsnackbar",{text: error.response.data.errorMessage, timeout: 5000, color: "red"})
          })

    },
  }
}
</script>

<style scoped>

</style>