<template>
  <v-container>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                    label="First Name"
                    v-model="user.firstname"
                    v-on:change="printHello()"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                    label="Last Name"
                    persistent-hint
                    v-model="user.lastname"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Username"
                  v-model="user.username"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Email"
                    required
                    v-model="user.email"

                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="user.team"
                    label="Team"
                    required

                ></v-text-field>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="12"
                     v-for="(project,index) in user.projects"
                     v-bind:key="index">
                <v-text-field
                    v-model="project[index]"
                    label="Team"
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
              @click="closeDialog()"
          >
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="closeDialog()"
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
  name: "UpdateUserDialog.vue",
  data(){
    return{
      dialog: true,
      user: "",
      updateReq: {
        id: this.userid
      }
    }
  },
  props: {
    userid: String,
    username: String,
  },
  methods: {
    async getUserByID(id){
      await userService.getUserByID(id)
          .then(res => {
            this.user = res.data
            console.log(this.user.projects)
          })
          .catch(err => {
            this.$parent.$parent.$emit("setsnackbar",{text: err, timeout: 5000, color: "red"})
          })
    },
    closeDialog(){
      this.$emit("close")
      this.dialog = false
    }
  },
  async created() {
    await this.getUserByID(this.userid)
    console.log(this.user)
  }
}
</script>

<style scoped>

</style>