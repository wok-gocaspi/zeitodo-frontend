<template>
  <v-container>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5" id="usr-title">
          {{dialogText.title}}
        </v-card-title>
        <v-card-text id="usr-text">{{dialogText.text}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red darken-1"
              text
              @click="disableDialog()"
              id="abort-btn"
          >
            Abbrechen
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="saveDialog()"
              id="delete-btn"
          >
            Bestätigen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import proposalService from "@/services/proposalService";
export default {
  name: "ProposalStatusDialog",
  props: {
    proposal: Object,
    action: String,
  },
  methods: {
    saveDialog(){
      proposalService.updateProposalStatus(this.proposal, this.action)
          .then(() => {
            this.$parent.$parent.$emit("setsnackbar",{text: "Antrag erfolgreich aktualisiert!", timeout: 5000, color: "green"})
            this.disableDialog()
          })
          .catch(err => {
            this.$parent.$parent.$emit("setsnackbar",{text: err.response.data.errorMessage, timeout: 5000, color: "red"})
          })
    },
    disableDialog(){
      this.dialog = false
      this.$emit("close")
    }
  },
  computed: {
    dialogText(){
      if (this.action === "approved"){
        return {
          title: "Antrag genehmigen",
          text: "Sind sie sicher dass sie den Antrag genehmigen wollen?"
        }
      }
      if (this.action === "denied"){
        return {
          title: "Antrag ablehnen",
          text: "Sind sie sicher dass sie den Antrag ablehnen wollen?"
        }
      }
      else{
        return {
          title: "Antrag ändern",
          text: "Sind sie sicher dass sie den Antrag ändern wollen?"
        }
      }
    }
  },
  data(){
    return {
      dialog: true
    }
  }
}
</script>

<style scoped>

</style>