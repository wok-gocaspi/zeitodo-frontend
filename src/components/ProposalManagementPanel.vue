<template>
<v-container>
  <v-row>
    <v-select
        label="Status"
        :items="proposalKinds"
        v-model="selectedFilter.selectedStatus"
        v-on:change="getProposals()"
        class="select"
    ></v-select>
    <v-select
        label="Sortierung"
        :items="proposalTimeFilter"
        v-model="selectedFilter.selectedOrder"
        v-on:change="getProposals()"
        class="select"
    ></v-select>
    <v-select
        label="Typ"
        :items="proposalTypes"
        v-model="selectedFilter.selectedType"
        v-on:change="getProposals()"
        class="select"
    ></v-select>
    <v-text-field
      label="Username"
      v-model="selectedFilter.searchedUser"
    ></v-text-field>
  </v-row>

  <v-list>
    <div
        v-for="user in proposals"
        v-bind:key="user.userId"
    >
    <v-list-group
        v-if="selectedFilter.searchedUser === ''  || selectedFilter.searchedUser === user.username"
    >
      <template v-slot:activator>
        <v-list-item-title>{{user.username}}</v-list-item-title>
      </template>
      <div v-if="selectedFilter.selectedType === 'Alle'">
        <v-list-group
            sub-group
            no-action
            v-for="(ptypes, index) in proposalListTypes"
            v-bind:key="index"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ptypes.name}}</v-list-item-title>
            </v-list-item-content>
          </template>
          <div
              v-for="proposal in user.proposals"
              v-bind:key="proposal.startDate"
          >
            <v-list-group
                sub-group
                no-action
                v-if="proposal.type===ptypes.type"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>{{proposal.startDate}}---{{proposal.endDate}}</v-list-item-title>
                  <v-list-item-subtitle v-if="proposal.status === 'pending'">Ausstehend</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="proposal.status === 'denied'">Abgelehnt</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="proposal.status === 'approved'">Angenommen</v-list-item-subtitle>
                </v-list-item-content>
              </template>
              <v-list-item
              link
              >
                <v-list-item-avatar>
                  <v-icon>
                    mdi-clipboard-check
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-title>Annehmen</v-list-item-title>
              </v-list-item>
              <v-list-item
                  link
              >
                <v-list-item-avatar>
                  <v-icon>
                    mdi-clipboard-remove
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-title>Ablehnen</v-list-item-title>
              </v-list-item>
              <v-list-item
                  link
              >
                <v-list-item-avatar>
                  <v-icon>
                    mdi-clipboard-off
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-title>Löschen</v-list-item-title>
              </v-list-item>
              <v-list-item
                  link
              >
                <v-list-item-avatar>
                  <v-icon>
                    mdi-clipboard-edit
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-title>Bearbeiten</v-list-item-title>
              </v-list-item>
            </v-list-group>
          </div>
        </v-list-group>
      </div>
    </v-list-group>
    </div>
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
      proposalTimeFilter: ["Aufsteigend", "Absteigend"],
      proposalTypes: ["Alle", "Urlaub", "Krank"],
      selectedFilter: {
        selectedStatus: "Alle",
        selectedOrder: "Aufsteigend",
        selectedType: "Alle",
        searchedUser: ""
      },
      proposals: "",
      sicknessIndex: "",
      vacationIndex: "",
      proposalListTypes: [
        {type: "sickness", name: "Krankheit"},
        {type: "vacation", name: "Urlaub"}
      ]
    }
  },
  created() {
    this.getProposals()
  },
  methods: {
    getProposals(){
      proposalService.getAllProposals(JSON.stringify(this.selectedFilter))
          .then(res => {
            console.log(res.data)
            this.proposals = res.data
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