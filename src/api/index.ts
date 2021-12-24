import network from './network'

export const getGlobalUserInfoDemo = () => network.get('xxxxxx')

export const getGlobalUserInfo = () => new Promise(resolve => {
  // @ts-ignore
  setTimeout(() => resolve({
    success: true,
    data: {
      id: 1,
      name: '示例用户',
      phone: 'xxxxx',
      avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      permissions: [],
      unreadNotice: Math.round(Math.random()*10)
    }
  }), 1000)
}) as any