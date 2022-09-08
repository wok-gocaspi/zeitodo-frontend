<template>
<v-container>
  <template>
    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
      >

        <v-card>
          <v-card-title>
            <span class="text-h5">Log in</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>

                <v-col cols="12">
                  <v-text-field
                      id ="username"
                      label="Username"
                      v-model="username"
                      required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      id="password"
                      label="Password"
                      type="password"
                      v-model="password"
                      required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="dialog = false ;setVisibility();"
            >
              Close
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="Login()"
                id="saveBtn"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
</v-container>
</template>

<script>

export default {

  name: "LoginDialog",

}
</script>