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
      <HelloWorld />
      <v-dialog
        v-model="dialog"
        persistent
        width="90%"
      >
        <v-btn
          slot="activator"
          color="primary"
          dark
        >Open Dialog</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">John Doe</span>
          </v-card-title>
          <v-card-text style="height: 500px;">
            <DistributionTree :personData=personDistribution></DistributionTree>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              flat
              @click="dialog = false"
            >Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <DistributionTree :personData=personDistribution></DistributionTree>
    </v-content>

  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import DistributionTree from './components/DistributionTree'
import { simulatedData } from './data'
import * as d3 from 'd3'

export default {
  name: 'App',
  components: {
    HelloWorld,
    DistributionTree
  },
  data() {
    return {
      personDistribution: null,
      dialog: false
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
