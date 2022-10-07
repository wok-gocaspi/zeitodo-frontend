<template>
  <v-container>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5" id="usr-title">
          Delete {{username}}
        </v-card-title>
        <v-card-text id="usr-text">Are you sure to delete {{username}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="disableDialog()"
              id="abort-btn"
          >
            Abort
          </v-btn>
          <v-btn
              color="red darken-1"
              text
              @click="disableDialogWithDeletion()"
              id="delete-btn"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import userService from "@/services/userService";
export default {
  name: "DeleteDialog",
  props: {
    userid: String,
    username: String
  },
  data(){
    return{
      dialog: true
    }
  },
  methods: {
    disableDialogWithDeletion(){
      this.deleteUser(this.userid)
      this.dialog = false
      this.$emit("close")
    },
    disableDialog(){
      this.dialog = false
      this.$emit("close")
    },
    async deleteUser(userid){
      await userService.deleteUser(userid)
          .then(() => {

              this.$parent.$parent.$emit("setsnackbar",{text: "Successfully Deleted User!", timeout: 5000, color: "green"})
          })
          .catch(err => {
            this.$parent.$parent.$emit("setsnackbar",{text: err, timeout: 5000, color: "red"})
          })
    }
  },
}
</script>

<style scoped>

</style>