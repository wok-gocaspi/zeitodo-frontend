<template>
  <v-app class="mx-auto">
    <v-navigation-drawer dark color="deep-purple accent-4" app v-model="drawer">
      <v-list dense nav>
        <v-list-item v-for="item in items" v-bind:key="item.title" link :to="item.path">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="toolbar-btn">
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  icon

                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                  v-for="(opt, index) in profilBtn"
                  :key="index"
                  v-on:click="loginDialog = true"
              >
                <v-list-item-icon>
                  <v-icon>{{opt.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{opt.title}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-app-bar>
    <v-main>
      <LoginDialog @closed="loginDialog=false" v-if="loginDialog"></LoginDialog>
      <v-container fluid>
        <SnackBar v-if="snackbar" @snackbartimeout="snackbarTimeoutMethod()" :snackbardata="snackbarData"></SnackBar>
        <router-view @setsnackbar="(sb) => snackbarSetEvent(sb)"></router-view>

      </v-container>
    </v-main>


  </v-app>
</template>

<script>
import userservice from "@/services/userService";
import LoginDialog from "@/components/LoginDialog";
import SnackBar from '@/components/SnackbarComponent'


export default {
  name: 'App',
  components: {LoginDialog, SnackBar},

  data: () => ({
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', path:"/" },
    ],
    profilBtn:[
      {title: "Einstellungen", icon:"mdi-account-cog"},
      {title: "Login", icon:"mdi-account-lock-open"}
    ],
    drawer: false,

    username: '',
    loginDialog: false,
    snackbar: false,
    snackbarData: ""

  }),
  methods: {
    snackbarTimeoutMethod(){
      this.snackbar = false
      this.snackbarText = ""
    },
    snackbarSetEvent(sb){
      this.snackbarData = sb
      this.snackbar = true
    },
    async getLoggedinUser() {
      this.success = await userservice.getLoggedinUser(this.username,this.username);
    },
  },
};
</script>
<style scoped>
.toolbar-btn{
  position: absolute;
  right: 2rem;
}
</style>