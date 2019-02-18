<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-layout
        row
        justify-center
      >
        <v-btn
          color="primary"
          dark
          @click="dialog = true"
        >View Details</v-btn>
      </v-layout>
      <v-dialog
        v-model="dialog"
        persistent
        width="90%"
        lazy
      >

        <v-card>
          <div class="actions">
            <v-icon
              medium
              @click='dialog = false'
            >close</v-icon>
          </div>
          <v-card-title>
            <span class="headline">John Doe</span>

          </v-card-title>
          <v-card-text style="height: 500px;">
            <v-tabs
              v-model="active"
              grow
            >
              <v-tab
                :key="0"
                ripple
              >
                Overview
              </v-tab>
              <v-tab
                :key="1"
                ripple
              >
                Tree
              </v-tab>
              <v-tab-item :key="0">
                <v-card flat>
                  <v-card-text>Test</v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item :key="1">
                <v-card flat>
                  <v-card-text style="height: 420px;">
                    <DistributionTree
                      :personData=personDistribution
                      v-if='dialog && active == 1'
                    ></DistributionTree>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-content>

  </v-app>
</template>

<script>
import DistributionTree from './components/DistributionTree'
import { simulatedData } from './data'

export default {
  name: 'App',
  components: {
    DistributionTree
  },
  data() {
    return {
      personDistribution: null,
      dialog: false,
      active: null
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.personDistribution = simulatedData
      console.log('Data loaded', this.personDistribution)
    }
  }
}
</script>
<style scoped>
.actions {
  position: absolute;
  right: 10px;
  top: 15px;
  z-index: 300;
}
</style>