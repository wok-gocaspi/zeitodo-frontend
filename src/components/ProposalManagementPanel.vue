<template>
<v-container>
  <v-row>
    <v-select
        label="Status"
        :items="proposalKinds"
        v-model="selectedFilter.selectedKinds"
        v-on:change="getProposals()"
        class="select"
    ></v-select>
    <v-select
        label="Zeitliche Reihenfolge"
        :items="proposalTimeFilter"
        v-model="selectedFilter.selectedOrder"
        v-on:change="getProposals()"
        class="select"
    ></v-select>
    <v-select
        label="Antrag Typ"
        :items="proposalTypes"
        v-model="selectedFilter.selectedType"
        v-on:change="getProposals()"
        class="select"
    ></v-select>
  </v-row>

  <v-list
  subheader
  two-line
  >
    <v-list-item v-for="proposal in proposals" :key="proposal.userid" class="item-list">
      <v-list-item-avatar>
        <v-icon id="proposal-approved-true" v-if="proposal.type === 'vacation'">
          mdi-palm-tree
        </v-icon>
        <v-icon id="proposal-approved-false" v-else-if="proposal.type === 'sickness'">
          mdi-hospital
        </v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{proposal.startDate}}---{{proposal.endDate}}</v-list-item-title>
        <v-list-item-subtitle>{{proposal.username}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</v-container>
</template>

<script>
import proposalService from "@/services/proposalService";

export default {
  name: "ProposalManagementPanel.vue",
  data(){
    return {
      proposalKinds: ["Ausstehend", "Genehmigt", "Abgelehnt", "Alle"],
      proposalTimeFilter: ["Neu zu Alt", "Alt zu Neu"],
      proposalTypes: ["Alle", "Urlaub", "Krank"],
      selectedFilter: {
        selectedKinds: "Alle",
        selectedOrder: "Alt zu Neu",
        selectedType: "Alle"
      },
      proposals: ""
    }
  },
  created() {
    this.getProposals()
  },
  methods: {
    async getProposals(){
      let filter = this.selectedFilter
      await proposalService.getAllProposals(filter)
          .then(res => {
            this.proposals = res
          })
          .catch(err => {
            console.log(err)
            this.proposals = []
          })
    }
  }

}
</script>

<style scoped>
.select{
  padding: 0em 1em 0em 1em;
}
</style>