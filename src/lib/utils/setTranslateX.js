import getCssProperty from './getCssProperty'

const cssTransform = getCssProperty('transform')
const cssTransitionDuration = getCssProperty('transition-duration')

export default (el, value) => {
  if (!el) return
  el.style[cssTransform] = `translate3d(${value}px, 0, 0)`
  el.style[cssTransitionDuration] = ''
  return value
}
