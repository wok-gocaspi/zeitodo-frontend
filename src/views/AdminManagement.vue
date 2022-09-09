<template>
<v-container>
  <h1>Admin Management Panel</h1>
  <v-container>
    <v-tabs v-model="tab">
      <v-tab>User Management</v-tab>
      <v-tab>Proposal Management</v-tab>
    </v-tabs>
    <UserManagementPanel v-if="tab == 0"></UserManagementPanel>
    <ProposalManagementPanel v-if="tab == 1"></ProposalManagementPanel>
  </v-container>
</v-container>
</template>

<script>
import UserManagementPanel from "@/components/UserManagementPanel";
import ProposalManagementPanel from "@/components/ProposalManagementPanel";
export default {
  name: "AdminManagement.vue",
  components: {UserManagementPanel, ProposalManagementPanel},
  data(){
    return{
      tab: ""
    }
  }
}
</script>

<style scoped>

</style>