import utils from '../utils/index'
import touchHandler from './touchHandler'

export default {
  ...touchHandler,

  switchTo(index) {
    if (this.index === index) return
    this.index = index
  },

  switchPrev() {
    if (!this.ifFirst()) {
      this.prevTransition()
    }
  },

  switchNext() {
    if (!this.ifLast()) {
      this.nextTransition()
    }
  },

  ifFirst() {
    return this.index === 0
  },

  ifLast() {
    return this.index === this.panels.length - 1
  },

  relayout() {
    this.panels.forEach(el => el.style.display = 'none')

    const fn = (el, translateX) => {
      if (!el) return
      utils.setTranslateX(el, translateX)
      el.style.display = 'block'
    }

    const { prevEl, currentEl, nextEl } = this.getCenterPanels()
    fn(prevEl, -this.clientWidth)
    fn(currentEl, 0)
    fn(nextEl, this.clientWidth)
  }
}
