<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
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
                  elevation="2"
                  fab
                  icon
                  color="primary"

                  v-bind="attrs"
                  v-on="on"
              >
                Profil
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

        <router-view></router-view>

      </v-container>
    </v-main>


  </v-app>
</template>

<script>
import userservice from "@/services/userService";
import LoginDialog from "@/components/LoginDialog";



export default {
  name: 'App',
  components: {LoginDialog},

  data: () => ({
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', path:"/" },
    ],
    profilBtn:[
      {title: "Einstellungen", icon:"mdi-view-dashboard"},
      {title: "Login", icon:"mdi-view-dashboard"}
    ],
    drawer: false,

  username: '',
    loginDialog: false,

  }),
  methods: {
    async getLoggedinUser() {
      this.success = await userservice.getLoggedinUser(this.username,this.username);
    },
  }
};
</script>
<style scoped>
.toolbar-btn{
 position: absolute;
  right: 2rem;
}
</style>