<template>
  <v-container>



    <div id="centerDiv">
      <v-card id="rowContainer">
        <v-card>
          <v-card-title>&#128101;Team Mitglieder</v-card-title>
          <v-card-text>{{teammenber}}</v-card-text>
      </v-card>
      </v-card>
    </div>
  <!--
    <v-layout row>
      <v-flex xs50 md12>
        <div ><v-card
            class=""

            color="grey lighten-3"

        >

          <v-row
            align="left"
            justify="left"
            class="ma-12"
            >



            <template v-slot:prepend-item>
              <v-divider class="mt-2"></v-divider>
            </template>

            <div ><h1>&#128101;Teams Mitglieder:</h1></div>

          &nbsp;&nbsp;&nbsp;&nbsp;<div  ><h1>{{teammenber}}</h1> </div>

          </v-row>




        </v-card></div></v-flex>


    </v-layout>
-->

    <v-card
        elevation="20"
        class="margin-top"
        id="midCard"
        height="22"
    >

      <v-row class="fill-height">
        <v-col>
          <v-sheet height="100">
            <v-toolbar
                flat
            >
              <v-btn
                  outlined
                  class="mr-4"
                  color="grey darken-2"
                  @click="setToday"
              >
                Heute

              </v-btn>


              <v-btn
                  fab
                  text
                  small
                  color="grey darken-2"
                  @click="prev"
              >
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <v-btn
                  fab
                  text
                  small
                  color="grey darken-2"
                  @click="next"
              >
                <v-icon small>
                  mdi-chevron-right
                </v-icon>
              </v-btn>

              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu
                  bottom
                  right
              >

                <template v-slot:activator="{on,attrs}">
                  <v-btn
                      outlined
                      color="grey darken-2"
                      v-bind="attrs"
                      v-on="on"
                  >
                    <span>{{typeToLabel[type]}}</span>
                    <v-icon right>
                      mdi-menu-down
                    </v-icon>
                  </v-btn>
                </template>


                <v-list>

                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                </v-list>

              </v-menu>
            </v-toolbar>
          </v-sheet>

          <v-sheet height="600">
            <v-calendar
                ref="calendar"
                :events="events"
                :event-color="getEventColor"
                color="primary"
                :type="type"
                v-model="focus"
                @click:event="showEvent"
                @click:day="viewDay"
                @click:more="viewDay"



            ></v-calendar>
            <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                offset-x
            >
              <v-card
                  color="grey lighten-4"
                  min-width="350px"
                  flat
              >
                <v-toolbar
                    :color="selectedEvent.color"
                    dark
                >

                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <v-spacer></v-spacer>

                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details"></span>
                </v-card-text>
                <v-card-text v-if="absence.sickness">
                  <div class="text-center">{{user.username}} Abwesenheit sind  {{this.absence}} <br><br> &#128153;Urlaub</div>

                </v-card-text>
                <v-card-actions>
                  <v-btn
                      text
                      color="secondary"
                      @click="selectedOpen = false"
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>



    </v-card>


  </v-container>

</template>
<style>
#rowContainer{
  display: flex;
  flex-direction: row;
  max-width: max-content;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
#centerDiv{
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
<script>
import timeentryService from "@/services/timeentryService";
import userService from "@/services/userService";

import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";
import stundenkontoService from "@/services/stundenkontoService";
import proposalService from "@/services/proposalService";




export default {

  name: "PlanerView.vue",
  setup(){
    const userStore = useUserStore()
    const {user, error} = storeToRefs(userStore)
    return{userStore,user,error}

  },

  data: () => ({
      select: ['ZeiToDo'],
    items:['ZeiToDo','Okapi','Employee Register'],
    selectedTeams:['ZeiToDo','Okapi','Ohne Team'],
    userr:[],
    UserMember:[],
    teammenber:"",
    username:"",
    getUserErr:"",
    token:"",
    completeEffort:{BMW:49},
    chart:{},
    busLoginData:[],
    total:0,
    err:"",
    dialog: false,
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      day:'Day',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'blue'],
    names: [],
    dragEvent: null,
    dragStart: null,
    createStart:null,
    extendOriginal:null,
    date :"",

    proposal:{
      start:"",
      end:"",
      sickness:"",
      vacation:"",
      teammember:"",
    },
    value :{
      teammenber:"",
    },
    timeentry:{
      start:"",
      end:"",
      breakStart:"",
      breakEnd:"",
      project:"",
    },
    selectedtype:"",
    absence:"",
    allproposal:{
      start:"",
      end:"",
      sickness:"",
      vacation:"",
      teammember:"",
    },
    teammemberfeld:{
        firstname:"",
        lastname:"",
    }
  }),

  mounted () {

    this.getEffort1(this.user.id)
    this.getAllEntries1(this.user.id)
    this.$refs.calendar.checkChange()

  },
  created() {
    this.gettimeentry()
    this.teammember()
    this.getAllproposal()

  },
  computed :{
    allTeams(){
      return this.selectedTeams.length=== this.teams.length
    },

    startdate(){
      return this.date + "T" + this.timeentry.start + ":00+02:00"
    },
    enddate(){
      return this.date + "T" + this.timeentry.end + ":00+02:00"
    },
    breakstartdate(){
      return this.date + "T" + this.timeentry.breakStart + ":00+02:00"
    },
    breakenddate(){
      return this.date + "T" + this.timeentry.breakEnd + ":00+02:00"
    }
  },

  methods: {
    toggle () {
      this.$nextTick(()=>{
        if(this.allTeams){
          this.selectedTeams=[]
        } else {
          this.selectedTeams = this.teams.slice()
        }
      })
    },
    async getAllEntries1(userId){
      await userService.getAllTimeEntries2(userId)
          .then(resp => {
            let  entries = resp.data
    console.log("getAllEntries Returns: ", entries)
         //   let [dates,projects,durations] =  chartService.extractDatesProjectDuration(entries)

         //   this.createBar(dates,projects,durations)
          })

    },
    async teammember(){

      await userService.getAllteammenber(this.user.id)

          .then(resp => {
            console.log(resp.data)
            resp.data.forEach((tm)=>{
              this.teammenber = this.teammenber +"  "+ tm.firstname +"   "+ tm.lastname + "  , "
            })
          })
          .catch(err =>{
            console.log(err)
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
       //     let efforts = Object.values(time)
            let total = userService.getTotalTime(time)
            this.total = total
      //      const ctx = document.getElementById('myChart');
    //        await this.createDoughnut(projects,efforts,ctx)
          })
    },


    async getAllproposal(){

      let allteam= await proposalService.getTeamProposal(this.user.id)
      console.log(allteam)
      allteam.data.forEach((user)=>{
        user.vacationProposals.forEach((proposal)=>{
          this.events.push({
            name:user.username,start:Date.parse(proposal.startDate),end:Date.parse(proposal.endDate),color:this.colors[(0,this.colors.length - 1)],timed:false
          })
        })
      })


      stundenkontoService.getAbsence(this.user.id)
          .then(res=>{
            this.absence = res.data
          })


    },


    gettimeentry(){


      timeentryService.getTimeentry()
          .then(res => {
            res.data.forEach((te)=>{
              this.events.push({
                name:te.project,start:Date.parse(te.start),end:Date.parse(te.end),breakStart:Date.parse(te.breakStart),breakEnd:Date.parse(te.breakEnd),color:"blue",timed:true

              })

            })
          })

    },

    updatedialog(){

      this.date=timeentryService.getdate(this.selectedEvent.start)
      this.timeentry.start=timeentryService.gettime(this.selectedEvent.start)
      this.timeentry.end=timeentryService.gettime(this.selectedEvent.end)
      this.timeentry.breakStart=timeentryService.gettime(this.selectedEvent.breakStart)
      this.timeentry.breakEnd=timeentryService.gettime(this.selectedEvent.breakEnd)
      this.timeentry.project=this.selectedEvent.name
      this.dialog = true
      this.selectedtype="update"

    },

    savetimeentry(){



      if (this.selectedtype=="create"){
        this.creattimeentry(this.timeentry)

      }else {
        this.updatetimeentry()

      }

    },
    updatetimeentry(){

      let te = this.timeentry

      te.start=this.startdate
      te.end=this.enddate
      te.breakStart=this.breakstartdate
      te.breakEnd=this.breakenddate

      timeentryService.updatetimeentry(JSON.stringify(te))


    },

    timeentrydialoge(){

      this.dialog=true
      this.selectedtype="create"
      this.$emit("Timeentries")
    },

    cleartimenetry(){
      this.dialog=false
      this.date=""
      this.timeentry.start=""
      this.timeentry.end=""
      this.timeentry.breakStart=""
      this.timeentry.breakEnd=""
      this.timeentry.project=""
    },



    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime()- min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        })
      }

      this.events = events
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
}
</script>

<style scoped>

</style>