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
               <v-btn v-bind="attrs" v-on="on" icon>
                 <v-icon>mdi-account-convert</v-icon>
               </v-btn>
             </template>
           <span>Update User</span>
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
 </v-container>

</template>

<script>
import userService from "@/services/userService";
import DeleteUserDialog from "@/components/DeleteUserDialog";
export default {
  name: "UserManagementPanel.vue",
  components: {DeleteUserDialog},
  data(){
    return{
      users: "",
      userError: "",
      selectedUser: {
        username: "",
        userid: ""
      },
      deleteUserDialog: false
    }
  },
  methods: {
    async fetchAllUser(){
      await userService.getAllUser()
          .then(res => {
            this.users = res.data
          })
          .catch(err => {
            this.$root.$emit("setsnackbar",{text: err, timeout: 5000, color: "red"})
          })
    },
    userDeleteSelector(userid, username){
      this.selectedUser.userid = userid
      this.selectedUser.username = username
      this.deleteUserDialog = true
    },
    deleteFormClosureHandler(){
      this.deleteUserDialog = false
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