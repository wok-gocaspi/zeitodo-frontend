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

      <v-card>
        <v-card-title>My Proposals</v-card-title>
        <v-card-text>
          <v-list >
            <v-list-item
                :key="index"
                v-for="(proposal, index) in proposals"
                class="item-list"
            >
              <v-list-item-avatar>
                <v-icon v-if="proposal.approved === true">
                  mdi-check
                </v-icon>
                <v-icon v-else-if="proposal.approved === false">
                  mdi-clock
                </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title id="user-title" v-text="proposal.startDate + ' --- ' + proposal.endDate "></v-list-item-title>
                <v-list-item-subtitle v-text="proposal.type"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-row>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn @click="openDeleteProposalDialog(index)" id="update-btn" v-bind="attrs" v-on="on" icon>
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </template>
                    <span>Close Proposal</span>
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
      selectedProposal: ""
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

</style>