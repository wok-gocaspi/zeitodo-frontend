<template>
  <v-container>
  <v-card
      elevation="1"
      id="topCard"
  >
    <!-- Moved viewHeader to the toolbar
<v-container>
  <v-card-title>
  <h1>Stundentafel </h1>
    </v-card-title>
</v-container>
    -->
    <v-row justify="center">

      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        >

        <v-card>
          <span class="text-h5" >Neuer Zeiteintrag</span> &#8505;
        </v-card>
        <v-card >
          <v-card-text>
            <v-container>
              <v-row>
                <form action="/timeentry" method="post"><br>
                  <div class="v-input-holder">
                  <label for=""><p>Datum :<input type="date" name="trip-start" v-model="date" ></p></label><br>
                  </div>
                </form>
                <v-row>
                <form action="/timeentry" method="post"><br><br><br>
                  <div class="form-group">
                  <label for="">Start_Zeit:</label>
                  <input type="time" name="start" v-model="timeentry.start">
                  </div>
                   <div class="form-group">
                  <label for="">End_Zeit:</label>
                    <input type="time" name="end" v-model="timeentry.end">
                   </div>

                </form>
                  </v-row>
                <v-row>
                <form action="/timeentry" method="post"><br><br>
                  <div class="form-group">
                  <label>
                    Start_Pause:
                    <input type="time" name="breakStart" v-model="timeentry.breakStart">
                  </label>
                  </div>

                  <label>
                    End_Pause:
                    <input type="time" name="breakEnd" v-model="timeentry.breakEnd">
                  </label>
                </form >
                  </v-row>
                <v-col
                    cols="12"
                    sm="6"
                >
                  <v-select
                      :items="['ProjektX', 'ZeiToDo', 'Employee-Register', 'Audi']"
                      label="Kunden/Projekt*"
                      required
                      v-model="timeentry.project"
                  ></v-select>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                  <v-autocomplete
                      :items="['Intern Arbeitszeit']"
                      label="Leistung"
                      multiple

                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>

          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="cleartimenetry()"
            >
              Close
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="savetimeentry()"
            >
              Save
            </v-btn>

             <template v-slot:actions>
               <v-btn
                 color="pink"
                 variant="text"

                 >
                 close
               </v-btn>
             </template>

          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>


  </v-card>

  <v-card
      elevation="12"
      class="margin-top"
      id="midCard"
  >

    <v-card-subtitle>

    </v-card-subtitle>

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
            <v-btn
                outlined
                class="mr-2"
                color="primary"
                dark
                @click="timeentrydialoge()"

            >

              &#43;Zeiteintrag

            </v-btn>
            <v-menu
              bottom
              right
              >

            <template v-slot:activator="{on,attrs}">
              <v-btn
                outlined
                color="primary"
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
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = '4day'">
              <v-list-item-title>4 Day</v-list-item-title>
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
              <v-btn icon @click="updatedialog()">
                <v-icon>mdi-pencil</v-icon>

              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-text>


            </v-card-text>
            <v-card-actions>
              <v-btn
                  text
                  color="secondary"
                  @click="selectedOpen = false"
              >
                Cancel
              </v-btn >
            </v-card-actions>
          </v-card>
           </v-menu>
        </v-sheet>
      </v-col>
    </v-row>



  </v-card>
    </v-container>

</template>

<script>
import timeentryService from "@/services/timeentryService";


export default {

  name: "TimeentryView.vue",
  data: () => ({

    text:`Hallo,Test`,
    dialog: false,
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', ],
    names: ['Meeting', 'Holiday', 'Travel', 'Event', 'Birthday', 'Conference'],
    dragEvent: null,
    dragStart: null,
    createStart:null,
    extendOriginal:null,
    date :"",
    timeentry:{
      start:"",
      end:"",
      breakStart:"",
      breakEnd:"",
      project:"",

    },
    selectedtype:"",





  }),
  mounted () {

    this.$refs.calendar.checkChange()
  },
    created() {
      this.gettimeentry()

    },
  computed :{

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
    creattimeentry(timeentry){

      let te = timeentry

      te.start=new Date(this.startdate)
      te.start=te.start.toISOString()

      te.end=new Date(this.enddate)
      te.end=te.end.toISOString()

      te.breakStart=new Date(this.breakstartdate)
      te.breakStart=te.breakStart.toISOString()

      te.breakEnd=new Date(this.breakenddate)
      te.breakEnd=te.breakEnd.toISOString()



      this.events.push({

        name:te.project,start:Date.parse(te.start),end:Date.parse(te.end),breakStart:Date.parse(te.breakStart),breakEnd:Date.parse(te.breakEnd),color:"blue",timed:true
                      })

      timeentryService.creattimeentry(JSON.stringify(te))
          .then(() => {
            this.$emit("setsnackbar", {text: "Zeitantrag erfolgreich erstellt!", color: "green", timeout: 5000})
            this.dialog = false
          })
          .catch(err => {
            this.$emit("setsnackbar", {text: err.response.data.errorMessage, color: "red", timeout: 5000})
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
            .then(() => {
              this.$emit("setsnackbar", {text: "Zeitantrag erfolgreich geändert!", color: "green", timeout: 5000})
              this.dialog = false
            })
            .catch(err => {
              this.$emit("setsnackbar", {text: err.response.data.errorMessage, color: "red", timeout: 5000})
            })


   },

   timeentrydialoge(){

        this.dialog=true
        this.selectedtype="create"

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
