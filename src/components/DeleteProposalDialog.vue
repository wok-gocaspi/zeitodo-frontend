<template>
  <v-container>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5" id="usr-title">
          Antrag löschen
        </v-card-title>
        <v-card-text id="usr-text">Sind sie sicher den Antrag vom {{proposal.startDate}} zu löschen?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="disableDialog()"
              id="abort-btn"
          >
            Abbrechen
          </v-btn>
          <v-btn
              color="red darken-1"
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
import ProposalService from '@/services/proposalService'
export default {
  name: "DeleteProposalDialog",
  props: {
    proposal: Object
  },
  data(){
    return {
      dialog: true,
    }
  },
  methods: {
    disableDialog(){
      this.dialog = false
      this.$emit('close')
    },
    async saveDialog(){
      console.log(JSON.stringify(this.proposal))
      await ProposalService.deleteProposal(JSON.stringify(this.proposal))
          .then(() => {
            this.$parent.$parent.$emit("setsnackbar",{text: "Antrag erfolgreich gelöscht!", timeout: 5000, color: "green"})
            this.disableDialog()
          })
          .catch((err) => {
            this.$parent.$parent.$emit("setsnackbar",{text: err.response.data.errorMessage, timeout: 5000, color: "red"})
          })
    }
  }
}
</script>

<style scoped>

</style>