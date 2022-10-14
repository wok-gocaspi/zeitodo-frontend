<template>
  <v-app class="mx-auto">
    <v-navigation-drawer dark color="deep-purple accent-4" app v-model="drawer">
      <v-list dense>
        <v-list-item>
          <v-list-item-title>ZeiToDo</v-list-item-title>
          <v-list-item-subtitle v-if="userStore.isLoggedIn">Hallo, {{user.username}}</v-list-item-subtitle>
          <v-list-item-subtitle v-else-if="!userStore.isLoggedIn" if="!user.username">Bitte einloggen!</v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="item in items" v-bind:key="item.title" link :to="item.path"
        @click="getCurrentHeadline(item.path)"
        >
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
      <v-toolbar-title><h3>{{ headlineText }}</h3></v-toolbar-title>
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
            <v-list >
              <v-list-item
                  link
                  :to="'/login'"
                  v-if="!userStore.isLoggedIn"
              >
                <v-list-item-icon>
                  <v-icon>mdi-account-lock-open</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Login</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                  link
                  @click="logout()"
                  v-if="userStore.isLoggedIn"
              >
                <v-list-item-icon>
                  <v-icon>mdi-account-lock-open</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                  link
                  :to="'/admin/panel'"
                  v-if="userStore.isAdmin"
              >
                <v-list-item-icon>
                  <v-icon>mdi-account-cog</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Admin Panel</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <SnackBar v-if="snackbar" @snackbartimeout="snackbarTimeoutMethod()" :snackbardata="snackbarData"></SnackBar>
        <router-view @setsnackbar="(sb) => snackbarSetEvent(sb)"></router-view>

      </v-container>
    </v-main>


  </v-app>
</template>

<script>
import SnackBar from '@/components/SnackbarComponent'
import {storeToRefs} from 'pinia'
import {useUserStore} from "@/stores/user";

export default {
  name: 'App',

  components: {SnackBar},
  setup(){
    const userStore = useUserStore()
    const {user, error} = storeToRefs(userStore)
    return {user, error, userStore}
  },
  created(){
    this.refreshToken()
    this.userStore.updateUserInfo()
  },
  data: () => ({
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', path:"/" },
      { title: 'Zeiteinträge', icon: 'mdi-account-edit-outline', path:"/timeentry" },
      { title: 'Stundenkonto', icon: 'mdi-account-eye-outline', path:"/stundenkonto"},
      { title: 'Planer', icon: 'mdi-calendar', path:"/planer"},
      { title: 'Anträge', icon: 'mdi-archive', path:"/proposals"},
    ],
    profilBtn:[
      {title: "Admin Panel", icon:"mdi-account-cog", path:"/admin/panel"},
      {title: "Login", icon:"mdi-account-lock-open", path:"/login"}
    ],
    drawer: false,
    headlineText:"Dashboard",
    adminPanelText:"AdminPanel",
    LoginText:"Log in",

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
    getCurrentHeadline(path){
        if (path === "/"){
          this.headlineText = "Dashboard"
        }
        if(path === "/proposals"){
          this.headlineText = "Anträge"
        }
      if(path === "/timeentry"){
        this.headlineText = "Zeiteinträge"
      }
      if(path === "/stundenkonto"){
        this.headlineText = "Stundenkonto"
      }
      if(path === "AdminPanel"){
        this.headlineText = "Admin Management Panel"
      }
      if(path === "Log in"){
        this.headlineText = ""
      }
    },
    async logout(){
      await this.userStore.logoutUser()
    },
    async refreshToken(){
      setInterval(async() => {

        await this.userStore.renewToken()
      }, 288000)
    }

  },
};
</script>
<style scoped>
.toolbar-btn{
  position: absolute;
  right: 2rem;
}
</style>