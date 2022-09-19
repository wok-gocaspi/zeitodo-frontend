<template>
  <v-container>
  <v-card
      elevation="1"
      id="topCard"
  >
<v-container>
  <v-card-title>
  <h1>Stundentafel </h1>
    </v-card-title>
</v-container>
    <v-row
      justify="center"
      >
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        >
        <template v-slot:activator="{ on, attrs }">

        <v-btn
        outlined
        class="mr-2"
        color="primary"
        dark
        v-bind ="attrs"
        v-on="on"
        >

       &#43;Zeiteintrag
        </v-btn>
        </template>

        <v-card style="background-color: aqua">

          <v-card-title>
            <span class="text-h5">Neuer Zeiteintrag</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <form action="https://localhost:8080">
                  <label for="start"><p>Datum :<input type="date" name="trip-start" ></p></label><br>


                </form>
                <v-row>
                <form>
                  <label>
                     Start_Zeit:
                      <input type="time" name="starttime">
                  </label>

                  <label>

                    End_Zeit:
                      <input type="time" name="endtime">
                  </label>
                </form>
                  </v-row>
                <v-row>
                <form><br>
                  <label>
                    Start_Pause:
                    <input type="time" name="startpause">
                  </label>

                  <label>
                    End_Pause:
                    <input type="time" name="endpause">
                  </label>
                </form>
                  </v-row>
                <v-col
                    cols="12"
                    sm="6"
                >
                  <v-select
                      :items="['ProjektX', 'ZeiToDo', 'Employee-Register', 'Audi']"
                      label="Kunden/Projekt*"
                      required
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
                @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
            >
              Save
            </v-btn>
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
     Dank einer übersichtlichen kalenderansicht haben Sie alle Ihre Abwesenheiten auf einem Blick.
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
              <v-list-item-title>4 days</v-list-item-title>
            </v-list-item>
          </v-list>
          </v-menu>
          </v-toolbar>
        </v-sheet>

        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            :type="type"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"

            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
        ></v-calendar>

        </v-sheet>
      </v-col>
    </v-row>



  </v-card>
    </v-container>

</template>

<script>

export default {

  name: "TimeentryView.vue",
  data: () => ({
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
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'Travel', 'Event', 'Birthday', 'Conference'],
    dragEvent: null,
    dragStart: null,
    createStart:null,
    extendOriginal:null,

  }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
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
      const days = (max.getTime() - min.getTime()) / 86400000
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

/*export default {
  name: "TimeentryView.vue",
}*/
</script>
