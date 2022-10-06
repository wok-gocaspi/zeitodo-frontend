<template>
  <v-container>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Neuer Antrag</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <p>Wähle die Zeitspanne</p>
                <v-date-picker v-model="datePicker" range></v-date-picker>
              </v-col>
            </v-row>
              <v-col>
                <v-select
                  :items="proposalTypes"
                  label="Type"
                  v-model="proposal.type"
                  >

                </v-select>
              </v-col>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="closeDialog()"
          >
            Close
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="submitData()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ProposalService from "@/services/proposalService";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";
export default {
  name: "ProposalDialog.vue",
  setup(){
    const userStore = useUserStore()
    const {user} = storeToRefs(userStore)
    return {user}
  },
  data(){
    return {
      dialog: true,
      proposal: {
        startDate: "",
        endDate: "",
        type: "",
        userid: this.user.id
      },
      datePicker: [],
      proposalTypes: ["sickness", "vacation"]
    }
  },
  methods: {
    closeDialog(){
      this.$emit('close')
      this.dialog = false
    },
    submitData(){
      this.proposal.startDate = this.sDate
      this.proposal.endDate = this.eDate
      ProposalService.createProposal(JSON.stringify(this.proposal))
          .then(() => {
            this.$parent.$emit("setsnackbar", {text: "Proposal was created!", color: "green", timeout: 5000})
          })
          .catch(err => {
            this.$parent.$emit("setsnackbar", {text: err.response.data.errorMessage, color: "red", timeout: 5000})
          })
    }
  },
  computed: {
    sDate(){
      return this.datePicker[1]
    },
    eDate(){
      return this.datePicker[0]
    }
  }
}
</script>

<style scoped>

</style>