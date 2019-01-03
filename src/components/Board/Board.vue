<template>
  <v-layout class="Board" row wrap>
    <v-flex xs12>
      <div class="content_wrapper">
        <div class="content">
          <Filters></Filters>

          <div class="content_inner">
            <v-layout row wrap>
              <v-flex xs12 sm2>
                <Navbar></Navbar>
              </v-flex>
              <v-flex xs12 sm10>
                <Rooms :rooms="items"></Rooms>
              </v-flex>
            </v-layout>
          </div>
          <Pagination :rooms="items"></Pagination>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'

import Rooms from './Rooms'
import Navbar from './Navbar'
import Pagination from './Pagination'
import Filters from './Filters'

export default {
  name: 'Board',
  components: {
    Rooms,
    Navbar,
    Pagination,
    Filters
  },
  beforeMount () {
    axios.get('/api/room/list').then(res => {
      this.items = res.data.map(el => {
        el.expandDescription = false
        return el
      })
    }).catch(err => {
      console.log(err)
      this.items = null
    })
  },
  data () {
    return {
      items: [
        {
          _id: '5c1a5db3037a7d0b239350fe',
          title: 'test1',
          price: '7050',
          photo: 'https://besplatka.ua/aws/19/75/61/11/6421f3648df1.jpg',
          expandDescription: false
        },
        {
          _id: 2,
          title: 'test2',
          price: '5750',
          photo: 'http://pandadom.com/content/thumbs/1000x/nocrop/j7bd3j/1f/tb/1ftb1fn7phj1g8nbs8ve11gn88h1mc0v.jpg',
          expandDescription: false
        },
        {
          _id: 3,
          title: 'test3',
          price: '6200',
          photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ3SozeyhR-mj1fWDn_XtSJMo_KanftM0-kseVuu_lsJUcCVQd',
          expandDescription: false
        },
        {
          _id: 4,
          title: 'test4',
          price: '6900',
          photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRulwe-cp1eUg_6R0dKe3jlLCmgjT1OVKa9hyDNoAyPElYZRp6e',
          expandDescription: false
        },
        {
          _id: 5,
          title: 'test5',
          price: '4600',
          photo: 'https://images.ua.prom.st/836252515_w0_h0_bedroom_1.jpg',
          expandDescription: false
        },
        {
          _id: 6,
          title: 'test6',
          price: '8300',
          photo: 'https://zaholovok.com.ua/sites/default/files/1_2.gif',
          expandDescription: false
        },
        {
          _id: 7,
          title: 'test7',
          price: '9500',
          photo: 'https://besplatka.ua/aws/19/75/61/11/6421f3648df1.jpg',
          expandDescription: false
        },
        {
          _id: 8,
          title: 'test8',
          price: '7500',
          photo: 'http://pandadom.com/content/thumbs/1000x/nocrop/j7bd3j/1f/tb/1ftb1fn7phj1g8nbs8ve11gn88h1mc0v.jpg',
          expandDescription: false
        },
        {
          _id: 9,
          title: 'test9',
          price: '6700',
          photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ3SozeyhR-mj1fWDn_XtSJMo_KanftM0-kseVuu_lsJUcCVQd',
          expandDescription: false
        },
        {
          _id: 10,
          title: 'test10',
          price: '5500',
          photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRulwe-cp1eUg_6R0dKe3jlLCmgjT1OVKa9hyDNoAyPElYZRp6e',
          expandDescription: false
        },
        {
          _id: 11,
          title: 'test11',
          price: '6500',
          photo: 'https://images.ua.prom.st/836252515_w0_h0_bedroom_1.jpg',
          expandDescription: false
        },
        {
          _id: 12,
          title: 'test12',
          price: '6400',
          photo: 'https://zaholovok.com.ua/sites/default/files/1_2.gif',
          expandDescription: false
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
