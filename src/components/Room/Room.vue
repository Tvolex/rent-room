<template>
  <v-layout class="layout-background" row wrap justify-center>
    <v-flex xs10 class="ma-3">
      <div v-if="room">
        <v-card>
          <v-img
            class="white--text"
            :src="room.photos[0]"
          >
          </v-img>
          <v-card-title>
            <v-layout row wrap justify-center>
              <v-flex xs12 md8 >
                <span class="grey--text">{{room.createdBy.date }}</span><br>
                <span class="headline">{{room.title || 'No title'}}</span><br>
                <span>{{room.description || 'No descriptions'}}</span>
              </v-flex>
              <v-flex xs12 md2 class="text-xs-center">
                <span class="headline">₴{{room.price || 'No price'}}</span>
              </v-flex>
              <v-flex xs10 class="mx-2">
                <span>
                  <v-icon>visibility</v-icon> {{room.views || 0}}
                </span>
              </v-flex>
            </v-layout>
            <div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div v-else>not found</div>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'InfoRoom',
  mounted () {
    const roomId = this.$route.params ? this.$route.params.id : null

    if (roomId) {
      this.getRoomById(roomId).then(room => {
        this.room = room
      }).catch(err => { console.log(err) })
    }
  },
  data: () => {
    return {
      room: null
    }
  },
  methods: {
    async getRoomById (id) {
      try {
        const res = await axios.get(`/api/room/${id}`)
        return res.data
      } catch (err) {
        console.log(err)
      }
    },
  },
    filters: {
        parseDate: function (value) {
            return moment(value).format();
        }
    }
}
</script>

<style scoped>
  .layout-background {
    background-color: rgb(238, 238, 238) !important;
    min-height: 70vh;
  }
  .views-number {
    margin-bottom: 2px;
  }
</style>
