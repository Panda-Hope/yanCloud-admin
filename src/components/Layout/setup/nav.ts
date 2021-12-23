import { computed } from 'vue'
import { useRouter, useRoute, RouteRecordRaw } from 'vue-router'

/* Get Route Navigation */
export default () => {
  const route = useRoute()
  const router = useRouter()
  const homeRoute = router.getRoutes().find(i => i.name === 'Home')
  const matchedRoutes = computed<RouteRecordRaw[]>(() => {
    const [, isHome, ...routes] = route.matched
    return (isHome.name === 'Home' ? [homeRoute, ...routes] : [homeRoute, isHome, ...routes]) as RouteRecordRaw[]
  })

  return matchedRoutes
}
