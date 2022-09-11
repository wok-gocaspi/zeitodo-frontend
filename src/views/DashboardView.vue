<template>
  <v-container>
    <h1>Dashboard</h1>
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
      <v-card-title>
        Moin!  {{this.tempUserName}}
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

        <p align="center"> <canvas id="barChart" ></canvas></p>



    </v-card>

  </v-container>

</template>

<style>
#myChart{
  max-width: 400px !important;
  max-height: 400px !important;



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

}
#botCard{

}
</style>

<script>
import userService from "@/services/userService";
import chartService from "@/services/chartService";
import Chart from "chart.js/auto";

export default {
  name: "DashboardView.vue",


  data: ()=>({
    tempUserName:"Bitte Logge dich ein um das Dashboard zu nutzen!",
    tempUserId:"",
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

    async getAllEntries1(userId){
      await userService.getAllTimeEntries2(userId)
          .then(resp => {
          let  entries = resp.data
            console.log(entries, "new getAllEntries")
            let [dates,projects,durations] =  chartService.extractDatesProjectDuration(entries)
            console.log([dates,projects,durations ])
            this.createBar(dates,projects,durations)
          })
          .catch(err => console.log(err))
    },

    async getEffort1(userId){
      await userService.getProjectEffort1(userId)
          .then(resp =>{
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
            this.createDoughnut(projects,efforts,ctx)
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


   async getUserObjSelf(){
      await userService.getSelf()
          .then(resp => {
            console.log(resp, "response for /self endpoint")
            this.tempUserName = resp.data.username
            this.tempUserId = resp.data.id})
          .catch(error => this.err = error)
   },

      // chart generation methods. parameter ctx controls the canvas that gets used to plot the graph
    createDoughnut(projects,efforts,ctx){
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
    createBar(dates,projects,durations){
      const ctx = document.getElementById('barChart');
   //   let colors = chartService.getRandomColor(projects)
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


  async created(){
    await this.getUserObjSelf()
    await this.getEffort1(this.tempUserId)
    await this.getAllEntries1(this.tempUserId)
  }
}
</script>