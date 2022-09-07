<template>
  <v-container>
    <h1>Test</h1>
    <!--
    <v-btn v-on:click="getCurrentUId()">Get user Id of Peter</v-btn>
    <v-btn v-on:click="getUserObj(tempUserId)" >Get user Info</v-btn>
    <v-btn v-on:click="getToken(testName,testPwd)">get Token of Peter</v-btn>
    <v-btn v-on:click="getTokenServiceR()">get Token of Peter</v-btn>
    <v-btn v-on:click="getComplete()">get complete</v-btn>
    -->
    <v-card
        elevation="12"
    >
      <v-card-title>
        Moin ZeiToDo Nutzer: {{this.tempUserName}}
      </v-card-title>
      <v-card-text>
        Deine gesamte Arbeitszeit beträgt:
      </v-card-text>
    </v-card>

    <v-card
        elevation="12"
        class="margin-top"
    >
      <v-card-title>
        Aufstellung deiner Zeitzuteilung zu deinen Projekten
      </v-card-title>
      <canvas id="myChart" width="400" height="400"></canvas>

    </v-card>

    <v-card
        elevation="12"
        class="margin-top"
    >
      <v-card-title>
        Aufstellung deiner Zeitzuteilung zu deinen Projekten
      </v-card-title>
      <canvas id="barChart" width="400" height="400"></canvas>

    </v-card>

  </v-container>

</template>

<style>
#myChart{
  max-width: 400px !important;
  max-height: 400px !important;
}
.margin-top{
  margin-top: 1rem;
}
</style>

<script>
import userService from "@/services/userService";
// import Chart from 'chart.js/auto';
import chartService from "@/services/chartService";

// import axios from "axios";
export default {

  name: "DashboardView.vue",


  data: ()=>({
    tempUserName:"",
    tempUserId:"",
    getUserErr:"",
    token:"",
    testName:"Peter",
    testPwd:"234",
    completeEffort:{BMW:49},
    chart:{}
  }),


  methods:{


    async getTokenServiceR(){
     let n = "Peter"
      let p = "234"
   let  [t,i]= await userService.getTokenUIDService(n,p)
      this.tempUserId = i
      console.log("Response from Dashboard is; ", [t,i])
    },

    async getUserObj(id){
     let obj = await userService.getUserObject(id)
      this.tempUserName = obj.data.username

      console.log("Response is the UserObject: ", obj)
    },
    // fetches the object with hours per project of a given user id. Passes the fetched data to the chartService to draw a doughnut
    async getEffort(userId){
      let time = await userService.getProjectEffort(userId)
      this.completeEffort = time
      let projects = [];
      for(let key in time){
        projects.push(key);
      }
     let efforts = Object.values(time)

     chartService.createDoughnut(projects,efforts)

    },
    async getAllEntries(userId){
      let entries = await userService.getAllTimeEntries(userId)
      console.log(entries)
     let [dates,projects,durations ] =  chartService.extractDatesProjectDuration(entries)
      console.log([dates,projects,durations ])
      chartService.createBar(dates,projects,durations)
    }


  },

/*
  mounted (){
    console.log("mounted")
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [this.completeEffort.BMW, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    this.chart = myChart
    myChart;

  },

 */


  async created(){
    await this.getTokenServiceR()
    await this.getUserObj(this.tempUserId)
    await this.getEffort(this.tempUserId)
    await this.getAllEntries(this.tempUserId)
  }
}
</script>