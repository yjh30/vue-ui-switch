<template>
  <div class="vue-ui-switch">
    <div 
      class="switch-panels"
      @touchstart="doTouchStart"
      @touchmove="doTouchMove"
      @touchend="doTouchEnd"
    >
      <slot>这里放置panels数据</slot>
    </div>
  </div>
</template>

<script>
  require('es6-promise').polyfill()

  import utils from './utils/index'
  import methods from './methods/index'

  export default {
    data() {
      return {
        panels: [],
        index: 0,
        clientWidth: 0,
        transitioning: false
      }
    },
    mounted() {
      this.clientWidth = utils.getPropertySize(this.$el, 'width')
      this.panels = [].slice.call(this.$el.querySelector('.switch-panels').children, 0)

      this.relayout()
    },
    methods,
    watch: {
      index() {
        this.relayout()
        this.transitionReset()
        this.$emit('change', this.index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .switch-panels {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    &>* {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>