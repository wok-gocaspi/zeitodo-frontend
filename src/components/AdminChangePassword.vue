<template>
  <v-container>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Change Password for {{username}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                    required
                    label="Password"
                    type="password"
                    v-model="password"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                    required
                    label="Repeat Password"
                    persistent-hint
                    type="password"
                    v-model="rPassword"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>passwords need to match in order to change the password</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="closeDialog()"
          >
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              v-if="password === rPassword && password !== '' && rPassword !== ''"
              @click="saveDialog()"

          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import userService from "@/services/userService";
export default {
  name: "AdminChangePassword",
  props: {
    userid: String,
    username: String
  },
  data(){
    return {
      password: "",
      rPassword: "",
      dialog: true
    }
  },
  methods: {
    closeDialog(){
      this.$emit("close")
    },
    saveDialog(){
      this.updatePassword()
    },
    async updatePassword(){
      let body = {
        id: this.userid,
        password: this.password
      }
      await userService.updateUser(body)
          .then(() => {
            this.$parent.$parent.$emit("setsnackbar",{text: "User Password Updated!", timeout: 5000, color: "green"})
          })
          .catch((err) => {
            this.$parent.$parent.$emit("setsnackbar", {text: err, timeout: 5000, color: "red"})
          })

    }
  }

}
</script>

<style scoped>

</style>