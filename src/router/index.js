import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@pages/index-page'
import DetailPage from '@pages/detail-page'
import DetailAnalysis from '@pages/detail/analysis'
import DetailCount from '@pages/detail/count'
import DetailForecast from '@pages/detail/forecast'
import DetailPublish from '@pages/detail/publish'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: IndexPage
    },
    {
      path: '/detail',
      redirect:'/detail/analysis',
      component: DetailPage,
      children: [{
          path: 'forecast',
          component: DetailForecast
        },
        {
          path: 'publish',
          component: DetailPublish
        },
        {
          path: 'count',
          component: DetailCount
        },
        {
          path: 'analysis',
          component: DetailAnalysis
        },
      ]
    }
  ]
})
