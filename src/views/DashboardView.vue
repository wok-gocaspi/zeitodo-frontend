<template>
  <v-container>
    <h1>Dashboard</h1>

    <!-- start bar chart offset picker -->
    <div class="text-center"
    id="offsetPicker">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
          >
            Alle Daten
          </v-btn>
        </template>
        <v-list>
          <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="setDataOffsetBarChart(item.offsetValue),destroyDoughnut()"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <!-- end chart offset picker -->


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
      <v-card-title
      id="midCard-title"
      >
        Leistungen in Stunden
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
      <v-card-title
      id="botCard-title"
      >
        Projekte in Minuten
      </v-card-title>
      <v-card-subtitle>

      </v-card-subtitle>
        <p align="center"> <canvas id="barChart" ></canvas></p>

    </v-card>

  </v-container>

</template>

<style>
#myChart{
  max-width: 600px !important;
  max-height: 600px !important;
}
#barChart{
  /*
    max-width: 400px !important;
   max-height: 400px !important;

   */


}

#offsetPicker{
  text-align: unset !important;
  margin-bottom: 1rem;
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
import moment from "moment-timezone";

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
    chart:{},
    busLoginData:[],
    total:0,
    err:"",
    barChartOffset:"",
    helperDoughnutOffset:[],
    barChart:{},
    doughnutChart:{},
    items: [
      { title: 'Letzte 7 Tage', offsetValue: 7 },
      { title: 'Letzte 28 Tage', offsetValue: 28 },
      { title: 'Heute', offsetValue: 1 },
    ],
  }),


  methods:{
  // Given a valid user id , all timeentries of that user gets fetched for the zeitodo-api.
  // The data gets destructured in [dates,projects,durations], whereas each is an array containing (date of the timeentry, project of that timeentry, duration of that entry)
  // If the data is fetched successfully the createBar methods fills the bar chart of the component given the fetched data
    async getAllEntries1(userId){
      await userService.getAllTimeEntries2(userId)
          .then(resp => {
            let [dates,projects,durations] =  chartService.extractDatesProjectDuration(resp.data)
            console.log("dates,projects,durations",[dates,projects,durations])
            this.createBarRewriten(dates,projects,durations)
          })
          .catch(err => console.log(err))
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
            console.log("This are the time values of getEffort: ", efforts)
            let total = userService.getTotalTime(time)
            this.total = total
            const ctx = document.getElementById('myChart');

           if(this.barChartOffset != ""){
            this.doughnutChart.destroy()
             let offsetProjects = []
              let offsetEfforts =[]
              this.helperDoughnutOffset.forEach(project =>{
                offsetEfforts.push(project.hourValue)
                offsetProjects.push(project.projectname)
                this.createDoughnut(offsetProjects,offsetEfforts,ctx)
          //      return
              })
             this.total = this.calculateTotalAgainstOffset(offsetEfforts)
            }
            await this.createDoughnut(projects,efforts,ctx)

          })
    },
    calculateTotalAgainstOffset(effortsArray){
      let sum = 0;
      effortsArray.forEach(e =>{
        sum += e
      })
      return sum
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
      // chart generation methods. parameter ctx controls the canvas that gets used to plot the graph
    async createDoughnut(projects,efforts,ctx){
      if(this.barChartOffset != ""){
        this.doughnutChart.destroy()
        let offsetProjects = []
        let offsetEfforts =[]
        this.helperDoughnutOffset.forEach(project => {
          offsetEfforts.push(project.hourValue)
          offsetProjects.push(project.projectname)
        });
        [projects,efforts] =[offsetProjects,offsetEfforts]
        console.log("BarChartOffset is not EMPTY, offsetprojects, offset efforts are ", [offsetProjects,offsetEfforts])
      }

      console.log("this are the PROJECTS,EFFORTS of DOUGHNUT", projects,efforts)
      let colorMap = []

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
      let concatProjects = []
      projects.forEach(p =>{
        concatProjects.push("# Stunden in " + p)
      })
     let doughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels:  projects,
          datasets: [{
            label: '# Stunden worked in project in hours',
            data: efforts,
            backgroundColor: colorMap,
            borderColor: colorMap,
            borderWidth: 1
          }]
        }
      })
      this.doughnutChart = doughnutChart
      doughnutChart
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
    destroyDoughnut(){
      this.doughnutChart.destroy()
    },
    async setDataOffsetBarChart(offsetPicker){
      let today = new Date()
      today.setDate(today.getDate() - offsetPicker);
      today.toISOString()
      console.log("today is given back as ", today.toISOString())
      console.log(this.barChartOffset)
  //    let offset = "2022-09-28T08:00:00Z"
      let offset = today.toISOString()
      this.barChartOffset = offset
      this.barChart.destroy()
      this.doughnutChart.destroy()
     await this.getAllEntries1(this.user.id)
      await this.getEffort1(this.user.id)

    },
    async createBarRewriten(dates,projects,durations){
      const ctx = document.getElementById('barChart');

      // try to set the offset
      if (this.barChartOffset != ""){
        [dates,projects,durations] = chartService.getDataOfset(dates,projects,durations,this.barChartOffset)
        console.log("after setting offset ",[dates,projects,durations])

      }

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


console.log("after the if block in create barchart",dates,projects,durations)
      let checkProjektX = this.dataSetToOneProject(dates,projects,durations, "ProjektX")
      let checkZeiToDo = this.dataSetToOneProject(dates,projects,durations, "ZeiToDo")
      let checkEmployeeRegister = this.dataSetToOneProject(dates,projects,durations, "Employee-Register")
      let checkAudi = this.dataSetToOneProject(dates,projects,durations, "Audi")
      let checkArray = [checkAudi,checkZeiToDo,checkProjektX,checkEmployeeRegister,]
      let formattedCheckArray =[AudiData,ZeitodoData, ProjektXData,EmployeeRegisterData]
      let sets = []
      let colorMap = chartService.ALL_DIFFERENT_PROJECT_COLORS()
      //
      // get data offset method
      //
      console.log("This are the ofsetted data with offset 10", chartService.getDataOfset(dates,projects,durations,"2022-09-28T08:00:00Z"))
      for (let i = 0; i < 4 ; i++){
        if (!chartService.allArrayElementsAreZero(checkArray[i].values)){
    //      console.log(checkArray[i].values,"THese are the v aluse from checkarray")
       //  console.log("formattedCHeckArray is : ", formattedCheckArray[i])
          let millisecToDUration = [];
         formattedCheckArray[i].forEach(milliseconds =>{
           millisecToDUration.push(moment.duration(milliseconds, 'milliseconds').asHours())
         })
          console.log("try to catch duration via moment js ", moment.duration(formattedCheckArray[i][1], 'milliseconds').asHours(), "values: ", formattedCheckArray[i][1])
          sets.push({
            label: checkArray[i].projectName,
        //    data: formattedCheckArray[i],
            data: millisecToDUration,
            backgroundColor: colorMap[i],
            borderColor: colorMap[i],
            borderWidth: 1
          })
        }
      }

   if(this.barChartOffset != ""){
     let helperAllProfiles =[]
     sets.forEach(s =>{
       let helperSum = 0
       s.data.forEach(entry =>{ helperSum += entry})
       let helperProfilSnapshot = {projectname:s.label, hourValue:helperSum}
       helperAllProfiles.push(helperProfilSnapshot)
     })
      this.helperDoughnutOffset = helperAllProfiles
     console.log("This is my helper for the doughnut offset ", helperAllProfiles)
   }



    let barChart=  new Chart(ctx, {
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
      this.barChart = barChart
      barChart
    },
  },


  async mounted(){
    await this.getEffort1(this.user.id)
    await this.getAllEntries1(this.user.id)
  }
}
</script>