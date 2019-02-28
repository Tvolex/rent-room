import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Room from './views/Room.vue'
import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'
import Register from './views/Register.vue'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/room/:id',
            name: 'room',
            component: Room
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component:  Dashboard,
            redirect: '/dashboard/statistics',
            children: [
                {
                    path: 'statistics',
                    name: 'statistics',
                    component: Dashboard.components.Statistics,
                },
                {
                    path: 'rooms',
                    name: 'MyRooms',
                    component:  Dashboard.components.MyRooms,
                }
            ]
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/forgotPass',
            name: 'forgotPass',
            component: Login
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/*',
            name: 'not found',
            component: NotFound
        }
    ]
})
