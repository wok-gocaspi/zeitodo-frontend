<template>
  <v-container>

    <!--
    <v-btn v-on:click="getCurrentUId()">Get user Id of Peter</v-btn>
    <v-btn v-on:click="getUserObj(tempUserId)" >Get user Info</v-btn>
    <v-btn v-on:click="getToken(testName,testPwd)">get Token of Peter</v-btn>
    <v-btn v-on:click="getTokenServiceR()">get Token of Peter</v-btn>
    <v-btn v-on:click="getComplete()">get complete</v-btn>
    -->
    <v-card
        elevation="12"
        id="topCard"
    >
      <v-card-title v-if="userStore.isLoggedIn">

      </v-card-title>
      <v-card-title v-if="!userStore.isLoggedIn">
        Bitte logge dich ein!
      </v-card-title>
      <v-card-text>
        <h1><p align="center">   Gesamte Arbeitszeit </p></h1>
        <h1><p align="center" >&#128337; {{this.total}} STD</p></h1>
      </v-card-text>
    </v-card>

    <v-card
        elevation="12"
        class="margin-top"
        id="midCard"
    >
      <v-card-title>
        Leistungen
      </v-card-title>
      <v-card-subtitle>
        Das Kuchendiagramm zeigt den Anteil aller Projekte an der Gesamtarbeitszeit. Um ein Projekt von der Betrachtung auszuschließen,
        wähle das Projekt über die Toggle-Buttons aus.
      </v-card-subtitle>
      <p align="center"> <canvas id="myChart" ></canvas></p>

    </v-card>

    <v-card
        elevation="12"
        class="margin-top"
        id="botCard"
    >
      <v-card-title>
        Projekte
      </v-card-title>
      <v-card-subtitle>
        Das Diagramm zeigt die Tage an denen ein Zeiteintrag geleistet wurde gegenübergestellt die Anzahl an eingetragenen Stunden
        an diesem Eintrag. Alle Projekte mit selben Projekttitel sind gleich coloriert.
      </v-card-subtitle>
      <p align="center"> <canvas id="barChart" ></canvas></p>

    </v-card>

  </v-container>

</template>

<style>
#myChart{

  max-width: 300px !important;
  max-height: 300px !important;



}
#barChart{
  /*
    max-width: 400px !important;
   max-height: 400px !important;

   */


}
.margin-top{
  margin-top: 1rem;
}

#topCard{

}
#midCard{
  padding-bottom: 1rem;

}
#botCard{

}
</style>

<script>
import userService from "@/services/userService";
import chartService from "@/services/chartService";
import Chart from "chart.js/auto";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";

export default {
  name: "DashboardView.vue",
  setup(){
    const userStore = useUserStore()
    const {user, error} = storeToRefs(userStore)
    return{userStore,user,error}
  },

  data: ()=>({
    getUserErr:"",
    token:"",
    testName:"Peter",
    testPwd:"234",
    completeEffort:{BMW:49},
    chart:{},
    busLoginData:[],
    total:0,
    err:""
  }),


  methods:{

    async getAllEntries1(userId) {
      await userService.getAllTimeEntries2(userId)
          .then(resp => {
            let entries = resp.data

            let [dates, projects, durations] = chartService.extractDatesProjectDuration(entries)

            this.createBar(dates, projects, durations)
          })
    },


    async getEffort1(userId){
      await userService.getProjectEffort1(userId)
          .then(async (resp) =>{
            this.completeEffort = resp.data
            let time = resp.data
            let projects = [];
            for(let key in time){
              projects.push(key);
            }
            let efforts = Object.values(time)
            let total = userService.getTotalTime(time)
            this.total = total
            const ctx = document.getElementById('myChart');
            await this.createDoughnut(projects,efforts,ctx)
          })
    },
    /*
    returnBarLabels(completeEffortObject, allTimeEntries){
      let colorMap = []
      let labels = []
      for(let key in completeEffortObject){
        colorMap.push(chartService.random_rgba());
      }

      for (let i=0;i<allTimeEntries.length();i++){
      let startDay = allTimeEntries[i].start.split("T")[0]
      let projectCursor = allTimeEntries[i].project
        for(let j=0;j<colorMap.length();j++){

        }
      }
    }
,
     */



    async createDoughnut(projects,efforts,ctx){
      let colors = chartService.getRandomColor(projects)
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: projects,
          datasets: [{
            label: '# hours worked in project',
            data: efforts,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
          }]
        }
      })
    },
    async createBar(dates,projects,durations){
      const ctx = document.getElementById('barChart');

      let colorMap = chartService.getColor_projectSpecific(projects)
      let formattedDates = []
      dates.forEach(d => {

        formattedDates.push( d.split("T")[0])
      })
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: formattedDates,
          datasets: [{
            label: '# hours worked in project',
            data: durations,
            backgroundColor: colorMap,
            borderColor: colorMap,
            borderWidth: 1
          }]
        }
      })
    },

  },


  async mounted(){
    await this.getEffort1(this.user.id)
    await this.getAllEntries1(this.user.id)
  }
}
</script>