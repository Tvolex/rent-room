import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Room from './views/Room.vue'
import Login from './views/Login.vue'
import NotFound from './views/NotFound.vue'
import Register from './views/Register.vue'
import Dashboard from './views/Dashboard.vue'
import Store from './store';

Vue.use(Router);

const isAuth = async () => {
    const isAuth = !!await Store.dispatch({ type: 'Auth' }).catch(err => false);

    return (Store.getters.user && isAuth);
};


const router = new Router({
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
            redirect: '/dashboard/rooms',
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
                },
                {
                    path: 'announcement',
                    name: 'Announcement',
                    component: Dashboard.components.Announcement,
                },
                {
                    path: 'users',
                    name: 'Users',
                    component: Dashboard.components.Users,
                },
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
    ],
});

router.beforeEach(async (to, from, next) => {


    if (from.path.includes('login') && to.path.includes('dashboard'))
        return next();

    if (from.path.includes('dashboard') && to.path.includes('login'))
        return next();

    if (to.path.includes('dashboard')) {
        if (!await isAuth())
            return next({ path: '/login' });
    }
    else if (to.path.includes('login')) {
        if (await isAuth())
            return next({ path: '/dashboard' });
    }

    next();
});

export default router;
