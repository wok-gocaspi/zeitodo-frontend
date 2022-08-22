<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list dense nav>
        <v-list-item v-for="item in items" v-bind:key="item.title" link>
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
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
    ],
    drawer: false
  }),
  methods: {

  }
};
</script>
