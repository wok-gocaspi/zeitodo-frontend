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

    async getAllEntries1(userId){
      await userService.getAllTimeEntries2(userId)
          .then(resp => {
          let  entries = resp.data
            console.log(entries, "new getAllEntries")
            let [dates,projects,durations] =  chartService.extractDatesProjectDuration(entries)
            console.log([dates,projects,durations ])
            this.createBarRewriten(dates,projects,durations)
          })
          .catch(err => console.log(err))
    },
    getDateListAudi(dates,projects,durations){
      let AudiDates =[]
      let AudiValues = []
      for (let i = 0; i< dates.length; i++){
        if (projects[i] === "Audi"){
          AudiDates.push(dates[i])
          AudiValues.push(durations[i])
        }
      }
      return [AudiDates,AudiValues]
    },
    getDateListZeiToDo(dates,projects,durations){
      let AudiDates =[]
      let AudiValues = []
      for (let i = 0; i< dates.length; i++){
        if (projects[i] === "ZeiToDo"){
          AudiDates.push(dates[i])
          AudiValues.push(durations[i])
        }
      }
      return [AudiDates,AudiValues]
    },
    getDateListEmployeeRegister(dates,projects,durations){
      let AudiDates =[]
      let AudiValues = []
      for (let i = 0; i< dates.length; i++){
        if (projects[i] === "Employee-Register"){
          AudiDates.push(dates[i])
          AudiValues.push(durations[i])
        }
      }
      return [AudiDates,AudiValues]
    },
    getDateListProjektX(dates,projects,durations){
      let AudiDates =[]
      let AudiValues = []
      for (let i = 0; i< dates.length; i++){
        if (projects[i] === "ProjektX"){
          AudiDates.push(dates[i])
          AudiValues.push(durations[i])
        }
      }
      return [AudiDates,AudiValues]
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

      // chart generation methods. parameter ctx controls the canvas that gets used to plot the graph
    async createDoughnut(projects,efforts,ctx){
   //   let colors = chartService.ALL_DIFFERENT_PROJECT_COLORS()
      let colorMap = []
      console.log("doughnut projects:", projects)

      for (let i = 0; i < projects.length;i++){
        if(projects[i] === "Employee-Register"){
          colorMap.push('green')
        }
        if(projects[i] === "Audi"){
          colorMap.push('indigo')
        }
        if(projects[i] === "ProjektX"){
          colorMap.push('orange')
        }
        if(projects[i] === "ZeiToDo"){
          colorMap.push('cyan')
        }
      }

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: projects,
          datasets: [{
            label: '# hours worked in project',
            data: efforts,
            backgroundColor: colorMap,
            borderColor: colorMap,
            borderWidth: 1
          }]
        }
      })
    },

    // dataSet creates an Object to an given projectname (projectChecker) with all x (dates), y (duration of this date) values
    //
    dataSetToOneProject(dates,projects,durations,projectChecker){
      let dataToProject = []
      let datesOfProject = []
      for (let i=0;i<dates.length;i++){
        if (projects[i] === projectChecker ){
          dataToProject.push(durations[i])
          datesOfProject.push(dates[i])
        }
       else if ( dates[i+1] && projects[i+1] === projectChecker && dates[i+1].split("T")[0] === dates[i].split("T")[0] && !(projects[i] === projectChecker ) ){
          dataToProject.push(durations[i+1])
          datesOfProject.push(dates[i])
        }
        else if (projects[i-1] === projectChecker && dates[i-1].split("T")[0] === dates[i].split("T")[0] && !(projects[i] === projectChecker )){
          dataToProject.push(durations[i-1])
          datesOfProject.push(dates[i])
        }
        else {
          dataToProject.push(0)
          datesOfProject.push(dates[i])
        }
      }
      return {projectName: projectChecker,dates: datesOfProject, values: dataToProject}
    },
    async createBarRewriten(dates,projects,durations){
      const ctx = document.getElementById('barChart');

      let formattedDates = []
      dates.forEach(d => {
        if (!formattedDates.includes(d.split("T")[0])){
          formattedDates.push( d.split("T")[0])
        }})

      let Audi = this.getDateListAudi(dates,projects,durations)
      let  AudiData =[]
formattedDates.forEach(date =>{
  let sum = 0
  for (let i = 0; i< Audi[0].length; i++){
    if (date === Audi[0][i].split("T")[0]){
      sum += Audi[1][i]
    }
  }
  AudiData.push(sum)
})

      let ZeiToDo = this.getDateListZeiToDo(dates,projects,durations)
      let  ZeitodoData =[]
      formattedDates.forEach(date =>{
        let sum = 0
        for (let i = 0; i< ZeiToDo[0].length; i++){
          if (date === ZeiToDo[0][i].split("T")[0]){
            sum += ZeiToDo[1][i]
          }
        }
        ZeitodoData.push(sum)
      })

      let EmployeeRegister = this.getDateListEmployeeRegister(dates,projects,durations)
      let  EmployeeRegisterData =[]
      formattedDates.forEach(date =>{
        let sum = 0
        for (let i = 0; i< EmployeeRegister[0].length; i++){
          if (date === EmployeeRegister[0][i].split("T")[0]){
            sum += EmployeeRegister[1][i]
          }
        }
        EmployeeRegisterData.push(sum)
      })

      let ProjektX = this.getDateListProjektX(dates,projects,durations)
      let  ProjektXData =[]
      formattedDates.forEach(date =>{
        let sum = 0
        for (let i = 0; i< ProjektX[0].length; i++){
          if (date === ProjektX[0][i].split("T")[0]){
            sum += ProjektX[1][i]
          }
        }
        ProjektXData.push(sum)

      })

      let checkProjektX = this.dataSetToOneProject(dates,projects,durations, "ProjektX")
      let checkZeiToDo = this.dataSetToOneProject(dates,projects,durations, "ZeiToDo")
      let checkEmployeeRegister = this.dataSetToOneProject(dates,projects,durations, "Employee-Register")
      let checkAudi = this.dataSetToOneProject(dates,projects,durations, "Audi")
      let checkArray = [checkAudi,checkZeiToDo,checkProjektX,checkEmployeeRegister,]
      let formattedCheckArray =[AudiData,ZeitodoData, ProjektXData,EmployeeRegisterData]
      let sets = []
      let colorMap = chartService.ALL_DIFFERENT_PROJECT_COLORS()
      for (let i = 0; i < 4 ; i++){
        if (checkArray[i].values.length > 0){
          sets.push({
            label: '# hours worked in project: ' + checkArray[i].projectName,
            data: formattedCheckArray[i],
            backgroundColor: colorMap[i],
            borderColor: colorMap[i],
            borderWidth: 1
          })
        }
      }
  console.log("Check of Sets",sets)

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: formattedDates,
          datasets: sets
        },
        scales: {
          x: {
            stacked: false,
          },
          y: {
            stacked: false
          }
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