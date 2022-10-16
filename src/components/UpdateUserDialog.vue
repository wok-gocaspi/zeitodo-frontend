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
              <v-btn @click="addProject()">Add Project</v-btn>
              <v-container
                  v-for="(_, index) in user.projects"
                  :key="index"
                  style="padding: 0;"
              >
                <v-col>
                  <v-text-field
                      v-model="user.projects[index]"
                      label="Project"
                      required
                  ></v-text-field>
                  <v-btn @click="removeProject(index)">Remove</v-btn>
                </v-col>
              </v-container>
              <v-col cols="12">
                <v-text-field
                    v-model="user.group"
                    label="Group"
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
          })
          .catch(err => {
            this.$parent.$parent.$emit("setsnackbar",{text: err, timeout: 5000, color: "red"})
          })
    },
    async closeDialog(){
      this.$emit("close")
      this.dialog = false
    },
    saveDialog(){
      this.updateUser()
    },
    removeProject(index){
      if (index > -1){
        this.user.projects.splice(index, 1)
      }
    },
    addProject(){
      if (this.user?.projects === null){
        this.user.projects = []
      }
      this.user.projects.push("")
    },
    async updateUser(){
      await userService.updateUser(this.user)
          .then(() => {
            this.$parent.$parent.$emit("setsnackbar",{text: "User Updated!", timeout: 5000, color: "green"})
            this.closeDialog()
          })
          .catch(err => {
            this.$parent.$parent.$emit("setsnackbar", {text: err, timeout: 5000, color: "red"})
          })
    }
  },
  async created() {
    await this.getUserByID(this.userid)
  }
}
</script>
<style scoped>
</style>