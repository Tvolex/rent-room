<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md4
            v-if="rooms && rooms.length"
            v-for="room in rooms"
            :key="room._id"
    >
      <v-hover>
        <v-card class="card-room" slot-scope="{ hover }" >
          <v-img
            :src="room.photos ? room.photos[0] : 'https://static.thenounproject.com/png/220984-200.png'"
            height="200px"
          >
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out grey darken-3 v-card--reveal display-3 white--text"
                style="height: 100%;"
              >
                ₴{{room.price}}
              </div>
            </v-expand-transition>
          </v-img>

          <v-card-title primary-title>
            <div>
              <div class="headline">{{room.title}}</div>
              <span class="grey--text">{{room.description | limitDescription}}</span>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat @click="openRoom(room)">Open</v-btn>
            <v-btn flat color="purple lighten-3" >Description</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text>
              {{'description'| limitDescription}}
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-hover>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Rooms',
  props: {
    rooms: Array
  },
  data: () => {
    return {
      show: false
    }
  },
  methods: {
    openRoom: function (room) {
      this.$store.commit('room', { type: 'room', value: room })
      this.$router.push(`/room/${room._id}`)
    },
  },
  filters: {
    limitDescription: function (value) {
      if (value && value.length > 53) {
        return value.slice(0, 50) + '...';
      }
      return value;
    }
  }
}
</script>

<style scoped>
  .card-room {
    margin: 0 0 20px 15px;
    border-radius: 10px;
  }
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
  }
</style>
