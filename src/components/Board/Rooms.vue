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
                  v-if="room.photos && room.photos.length"
                  :src="getPhoto(room.photos, { lazy: false } )"
                  :lazy-src="getPhoto(room.photos, { lazy: true })"
                  alt="Photo"
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
          <img v-else src="@/assets/no-photo.png" />
          <v-card-title >
            <div class="room-info-table">
              <div class="headline">{{room.title | formatTitle}}</div>
              <div class="grey--text" style="float: left">
                Price: <span class="grey--text text--darken-2">₴{{room.price}}</span>
                <v-spacer></v-spacer>
                Rooms: <span class="grey--text text--darken-2">{{room.rooms}}</span>
              </div>
              <div class="grey--text" style="float: right">
                Type: <span class="grey--text text--darken-2">{{room.type}}</span>
                <v-spacer></v-spacer>
                Term: <span class="grey--text text--darken-2">{{room.term}}</span>
              </div>
            </div>
          </v-card-title>

          <v-card-text class="py-0">
            <span class="grey--text">{{room.description | limitDescription}}</span>
          </v-card-text>

          <v-card-actions>
            <v-btn flat @click="openRoom(room)" block>Show more</v-btn>
          </v-card-actions>
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
    getPhoto: function (photos, options = {}) {
      if (options.lazy) {
        return photos && photos.length && photos[0].location && photos[0].location.thumb?
                photos[0].location.thumb :  photos[0].location.fit;
      }

      return photos && photos.length && photos[0].location && photos[0].location.fit ?
              photos[0].location.fit :  photos[0].location.original;
    }
  },
  filters: {
    limitDescription: function (value) {
      if (value && value.length > 47) {
        return value.slice(0, 44) + '...';
      }
      return value;
    },
      formatTitle(title) {
          if (title && title.length > 20)
              return title.substr(0, 30);
          return title;
      }
  }
}
</script>

<style scoped>
  .room-info-table {
    width: 100% ;
  }
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
