import Vue from 'vue'

import Router from 'vue-router'
Vue.use(Router)

import environment from '@/page/web/environment/index'
import irrigate from '@/page/web/irrigate/index'
import curing from '@/page/web/curing/index'

export default new Router({
    routes:[
        {
            path: '/',
            name: 'environment',
            component: environment
        },
        {
            path: '/environment', 
            name: 'environment',
            component: environment
        },
        {
            path: '/irrigate',
            name: 'irrigate',
            component: irrigate
        },
        {
            path: '/curing',
            name: 'curing',
            component: curing
        },
    ]
})