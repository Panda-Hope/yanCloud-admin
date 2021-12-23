import { App, Component } from 'vue'
import * as Icons from '@element-plus/icons'

const setIcons = (app: App) => {
  Object.keys(Icons).map(name => {
    // @ts-ignore
    const Icon: Component = Icons[name]
    app.component(name, Icon)
  })

}
export default setIcons
