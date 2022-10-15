<template>
  <v-container>

    <v-container>
      <v-btn
          class="mx-2"
          fab
          dark
          color="indigo"
          @click="proposalDialog = true"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-container>
    <v-container>
      <v-card class="card-padding">
        <v-card-title>Legende</v-card-title>
        <v-card-text>

          <v-list>
            <v-list-item v-bind:key="index" v-for="(desc, index) in description">
              <v-list-item-avatar>
                <v-icon>
                  {{desc.icon}}
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{desc.text}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>

      <v-card class="card-padding">

        <v-card-title>Meine Anträge</v-card-title>

        <v-card-text>
          <v-list >
            <v-list-item
                :key="index"
                v-for="(proposal, index) in proposals"
                class="item-list"
            >
              <v-list-item-avatar>
                <v-icon id="proposal-approved-true" v-if="proposal.status === 'approved'">
                  mdi-check
                </v-icon>
                <v-icon id="proposal-approved-false" v-else-if="proposal.status === 'pending'">
                  mdi-clock
                </v-icon>
                <v-icon id="proposal-approved-false" v-else-if="proposal.status === 'denied'">
                  mdi-window-close
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title id="proposal-title" v-text="proposal.startDate + ' --- ' + proposal.endDate "></v-list-item-title>
                <v-list-item-subtitle id="proposal-subtitle" v-text="typeDict[proposal.type]"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-row>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn @click="openDeleteProposalDialog(index)" id="close-btn" v-bind="attrs" v-on="on" icon>
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </template>
                    <span>Antrag zurückziehen</span>
                  </v-tooltip>

                </v-row>

              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-container>
    <ProposalDialog v-if="proposalDialog" @close="closeProposalDialogHandler()"></ProposalDialog>
    <DeleteProposalDialog v-if="deleteProposalDialog" @close="closeDeleteProposalHandler()" v-bind:proposal="this.selectedProposal"></DeleteProposalDialog>
  </v-container>

</template>

<script>
import proposalService from "@/services/proposalService";
import {useUserStore} from "@/stores/user";
import {storeToRefs} from "pinia";
import ProposalDialog from "@/components/ProposalDialog";
import DeleteProposalDialog from "@/components/DeleteProposalDialog";
export default {
  name: "ProposalView.vue",
  components: {ProposalDialog, DeleteProposalDialog},
  setup(){
    const userStore = useUserStore()
    const {user} = storeToRefs(userStore)
    return{
      userStore, user
    }
  },
  data(){
    return {
      proposals: "",
      proposalDialog: false,
      deleteProposalDialog: false,
      selectedProposal: "",
      typeDict: {
        "vacation": "Urlaub",
        "sickness": "Krank",
      },
      description: [
        {icon: " mdi-check", text: "Angenommen"},
        {icon: "mdi-window-close", text: "Abgelehnt"},
        {icon: "mdi-clock", text: "Ausstehend"}
      ]
    }
  },
  created(){
    this.loadProposals()
  },
  methods: {
    closeProposalDialogHandler(){
      this.loadProposals()
      this.proposalDialog = false
    },
    closeDeleteProposalHandler(){
      this.deleteProposalDialog = false
      this.loadProposals()
    },
    openDeleteProposalDialog(index){
      this.selectedProposal = this.proposals[index]
      this.deleteProposalDialog = true
    },
    loadProposals(){
      proposalService.getProposalsByUserID(this.user.id)
          .then(res => {
            this.proposals = res.data
          })
          .catch(err => {
            this.proposals = []
            this.$emit("setsnackbar", {text: err.response.data.errorMessage, color: "red", timeout: 5000})
          })
    }
  }
}
</script>

<style scoped>
.card-padding{
  margin-bottom: 1em;
}
</style>