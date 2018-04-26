import utils from '../utils/index'

const cssTransitionDuration = utils.getCssProperty('transition-duration')
const startPos = { x: 0, y: 0 }
let delta = { x: 0, y: 0 }
let stopMove = false

export default {
  doTouchStart(event) {
    if (this.transitioning) return
    startPos.x = event.touches[0].pageX
    startPos.y = event.touches[0].pageY
    stopMove = false
  },

  doTouchMove(event) {
    if (this.transitioning || stopMove) return
    delta.x = event.touches[0].pageX - startPos.x
    delta.y = event.touches[0].pageY - startPos.y

    if (Math.abs(delta.x) < Math.abs(delta.y)) {
      stopMove = true
      return
    } else {
      event.preventDefault()
    }

    this.move(delta.x)
  },

  async doTouchEnd() {
    if (this.transitioning || delta.x === 0) return

    if (this.ifFirst() && delta.x > 0 || this.ifLast() && delta.x < 0) {
      await this.startEndKickBack()
      console.log(1)
    } else if (Math.abs(delta.x) / this.clientWidth < 0.1) {
      await this.deltaKickBack()
      console.log(2)
    } else if (delta.x > 0) {
      await this.prevTransition()
      console.log(3)
    } else if (delta.x < 0) {
      await this.nextTransition()
      console.log(4)
    }
  },

  move(deltaX) {
    if (deltaX > 0) {
      this.prevMove(deltaX)
    } else if (deltaX < 0) {
      this.nextMove(deltaX)
    }
  },

  prevMove(deltaX) {
    const { prevEl, currentEl } = this.getCenterPanels()

    if (!this.ifFirst()) {
      utils.setTranslateX(currentEl, deltaX)
      utils.setTranslateX(prevEl, -this.clientWidth + deltaX)
    } else {
      utils.setTranslateX(currentEl, delta.x / (Math.abs(delta.x) / this.clientWidth + 2))
    }
  },

  nextMove(deltaX) {
    const { currentEl, nextEl } = this.getCenterPanels()

    if (!this.ifLast()) {
      utils.setTranslateX(currentEl, deltaX)
      utils.setTranslateX(nextEl, this.clientWidth + deltaX)
    } else {
      utils.setTranslateX(currentEl, delta.x / (Math.abs(delta.x) / this.clientWidth + 2))
    }
  },

  async startEndKickBack() {
    const { currentEl } = this.getCenterPanels()
    await this.runTransition(currentEl, 0)
    this.transitionReset()
  },

  async deltaKickBack() {
    const { prevEl, currentEl, nextEl } = this.getCenterPanels()

    if (delta.x > 0) {
      await Promise.all([this.runTransition(prevEl, -this.clientWidth), this.startEndKickBack()])
    } else if (delta.x < 0) {
      await Promise.all([this.runTransition(nextEl, this.clientWidth), this.startEndKickBack()])
    }
  },

  async prevTransition() {
    const { prevEl, currentEl } = this.getCenterPanels()
    await Promise.all([this.runTransition(prevEl, 0), this.runTransition(currentEl, this.clientWidth)])
    this.index--
  },

  async nextTransition() {
    const { currentEl, nextEl } = this.getCenterPanels()
    await Promise.all([this.runTransition(currentEl, -this.clientWidth), this.runTransition(nextEl, 0)])
    this.index++
  },

  runTransition(el, translateX, callback) {
    if (this.transitioning) return
    return new Promise(resolve => {
      utils.requestAnimationFrame(() => {
        this.transitioning = true

        utils.setTranslateX(el, translateX)
        el.style[cssTransitionDuration] = '0.25s'
      })
      const endCallback = () => {
        el.removeEventListener('webkitTransitionEnd', endCallback)
        el.removeEventListener('transitionend', endCallback)
        el.style[cssTransitionDuration] = ''
        callback && callback()
        resolve()
      }
      el.addEventListener('webkitTransitionEnd', endCallback)
      el.addEventListener('transitionend', endCallback)
    })
  },

  transitionReset() {
    delta = { x: 0, y: 0 }
    this.transitioning = false
  },

  getCenterPanels(switchToIndex) {
    const i = typeof switchToIndex === 'undefined' ? this.index : switchToIndex
    return {
      prevEl: this.panels[i - 1],
      currentEl: this.panels[i],
      nextEl: this.panels[i + 1]
    }
  }
}
