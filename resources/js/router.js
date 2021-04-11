import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Notfound from './pages/Notfound'
import Logout from './pages/Logout'
import Team from './pages/Team'
import Account from './pages/Account'
import Unauthorized from './pages/Unauthorized'


export default {

    mode: 'history',

    routes: [

        {
            path: '*',
            component: Notfound
        },

        {
            path: '/dashboard',
            component: Dashboard,
            name: 'Dashboard',
            beforeEnter: (to, form, next) => {
                axios.get('/api/authenticated').then(() => {
                    next()
                }).catch(() => {
                    return next({ path: '/unauthorized' });
                })
            }

        },


        {
            path: '/',
            component: Home
        },

        {
            path: '/team',
            component: Team,
            name: 'Team',
            // beforeEnter: (to, form, next) => {
            //     axios.get('/api/authenticated').then(() => {
            //         next()
            //     }).catch(() => {
            //         return next({ path: '/unauthorized' });
            //     })
            // }
        },

        {
            path: '/projects',
            component: Projects,
            name: 'Projects',
            // beforeEnter: (to, form, next) => {
            //     axios.get('/api/authenticated').then(() => {
            //         next()
            //     }).catch(() => {
            //         return next({ path: '/unauthorized' });
            //     })
            // }

        },

        {
            path: '/account',
            component: Account,
            name: 'Account',
            // beforeEnter: (to, form, next) => {
            //     axios.get('/api/authenticated').then(() => {
            //         next()
            //     }).catch(() => {
            //         return next({ path: '/unauthorized' });
            //     })
            // }

        },

        {
            path: '/logout',
            component: Logout,
            name: 'Logout',
        },

        {
            path: '/unauthorized',
            component: Unauthorized,
            name: 'Unauthorized',
        },
    ]
}