import defaultSetting from '../setting'
const { title } = defaultSetting

export const pageTitle = title || 'cnyanqun'

export const setTitle = function (meta) {
  document.title = meta || pageTitle
  const ua = navigator.userAgent
}
