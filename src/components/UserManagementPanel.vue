<template>
 <v-container>
   <h1>UserManagement</h1>
   <v-list
       subheader
       two-line
   >
     <v-list-item
        v-for="user in users"
        :key="user.id"
     >
       <v-list-item-avatar>
         <v-icon>
           mdi-account
         </v-icon>
       </v-list-item-avatar>
       <v-list-item-content>
         <v-list-item-title v-text="user.username"></v-list-item-title>
         <v-list-item-subtitle v-text="user.firstname + ' ' + user.lastname"></v-list-item-subtitle>
       </v-list-item-content>
       <v-list-item-action>
         <v-tooltip bottom>
             <template v-slot:activator="{ on, attrs }">
               <v-btn @click="userUpdateSelector(user.id, user.username)" v-bind="attrs" v-on="on" icon>
                 <v-icon>mdi-account-convert</v-icon>
               </v-btn>
             </template>
           <span>Update User</span>
         </v-tooltip>
       </v-list-item-action>
       <v-list-item-action>
         <v-tooltip bottom>
           <template v-slot:activator="{ on, attrs }">
             <v-btn @click="userChangePasswordSelector(user.id, user.username)" v-bind="attrs" v-on="on" icon>
               <v-icon>mdi-lock-reset</v-icon>
             </v-btn>
           </template>
           <span>Change Password</span>
         </v-tooltip>
       </v-list-item-action>
       <v-list-item-action>
         <v-tooltip bottom>
           <template v-slot:activator="{ on, attrs }">
             <v-btn @click="userDeleteSelector(user.id, user.username)" v-bind="attrs" v-on="on" icon>
               <v-icon>mdi-delete</v-icon>
             </v-btn>
           </template>
           <span>Delete User</span>
         </v-tooltip>
       </v-list-item-action>
     </v-list-item>
   </v-list>
   <DeleteUserDialog @close="deleteFormClosureHandler()" v-bind="selectedUser" v-if="deleteUserDialog === true"></DeleteUserDialog>
   <UpdateUserDialog @close="updateFormClosureHandler()" v-if="updateUserDialog == true" v-bind="selectedUser"></UpdateUserDialog>
   <AdminChangePassword @close="passwordFormClosureHandler()" v-if="changeUserPasswordDialog == true" v-bind="selectedUser"></AdminChangePassword>
 </v-container>

</template>

<script>
import userService from "@/services/userService";
import DeleteUserDialog from "@/components/DeleteUserDialog";
import UpdateUserDialog from "@/components/UpdateUserDialog";
import AdminChangePassword from "@/components/AdminChangePassword";
export default {
  name: "UserManagementPanel.vue",
  components: {DeleteUserDialog, UpdateUserDialog, AdminChangePassword},
  data(){
    return{
      users: "",
      userError: "",
      selectedUser: {
        username: "",
        userid: ""
      },
      deleteUserDialog: false,
      updateUserDialog: false,
      changeUserPasswordDialog: false
    }
  },
  methods: {
    async fetchAllUser(){
      await userService.getAllUser()
          .then(res => {
            this.users = res.data
          })
          .catch(err => {
            this.$parent.$emit("setsnackbar",{text: err, timeout: 5000, color: "red"})
          })
    },
    userDeleteSelector(userid, username){
      this.selectedUser.userid = userid
      this.selectedUser.username = username
      this.deleteUserDialog = true
    },
    userUpdateSelector(userid, username){
      this.selectedUser.userid = userid
      this.selectedUser.username = username
      this.updateUserDialog = true
    },
    userChangePasswordSelector(userid, username){
      this.selectedUser.userid = userid
      this.selectedUser.username = username
      this.changeUserPasswordDialog = true
    },
    deleteFormClosureHandler(){
      this.deleteUserDialog = false
      this.fetchAllUser()
    },
    updateFormClosureHandler(){
      this.updateUserDialog = false
      this.fetchAllUser()
    },
    passwordFormClosureHandler(){
      this.changeUserPasswordDialog = false
      this.fetchAllUser()
    }

  },
  async created() {
    await this.fetchAllUser()
  }
}
</script>

<style scoped>

</style>