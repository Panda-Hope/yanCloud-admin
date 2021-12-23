import { App } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import './scss/index.scss'

/*
 * Reset Element-plus Component
 * Add Customized Behaviour
 */
const setElementPlus = (app: App) => {
  app.use(ElementPlus, { size: 'small', locale: zhCn })
  dayjs.locale('zh-cn')
  // @ts-ignore
  dayjs.locale({ weekStart: 1 }) // 设置Element Date
}

export default setElementPlus
