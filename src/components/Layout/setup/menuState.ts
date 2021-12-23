import { computed} from 'vue'
import { useStore } from 'vuex'
import { User } from '@/store/modules/user'

export default () => {
  const store = useStore()
  const isCollapse = computed(() => store.getters.getIsCollapse)
  const userInfo = computed<User>(() => store.getters.getUserInfo)
  const setIsCollapse = () => store.commit('setIsCollapse', !isCollapse.value)

  // Created Hook Function
  const watchScreenWidth = () => {
    const autoCollapse = () => {
      const width = window.innerWidth
      store.commit('setIsCollapse', width < 1000)
    }
    window.addEventListener('load', autoCollapse)
    window.addEventListener('resize', autoCollapse)
  }

  watchScreenWidth() // Auto Change Menu Collapse Status When Window Width Changed
  return {
    userInfo,
    isCollapse,
    setIsCollapse
  }
}
