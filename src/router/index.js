import { createRouter, createWebHistory } from 'vue-router'
import ItineraryView from '@/views/ItineraryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'itinerary',
      component: ItineraryView,
    },
    {
      path: '/pre-travel',
      name: 'pre-travel',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/PreTravelView.vue'),
    },
    {
      path: '/travel',
      name: 'travel',
      component: () => import('@/views/TravelView.vue'),
    },
    {
      path: '/notes-gate',
      name: 'notes-gate',
      component: () => import('@/views/NotesGateView.vue'),
    },
    {
      path: '/overview',
      name: 'overview',
      component: () => import('@/views/OverviewView.vue'),
    },
    {
      path: '/scan',
      name: 'scan',
      component: () => import('@/views/ScanView.vue'),
    },
    {
      path: '/post-scan',
      name: 'post-scan',
      component: () => import('@/views/PostScanView.vue'),
    },
    {
      path: '/deliver-to',
      name: 'deliver-to',
      component: () => import('@/views/DeliverToView.vue'),
    },
    {
      path: '/picture-of-delivery',
      name: 'picture-of-delivery',
      component: () => import('@/views/PictureOfDeliveryView.vue'),
    },
    {
      path: '/summary',
      name: 'summary',
      component: () => import('@/views/SummaryView.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/TestView.vue'),
    }
  ],
})

export default router
