<template>
  <div class="example">
    <vue-ui-switch
      class="switch-component"
      ref="switch"
    >
      <div
        class="panel"
        v-for="(item, i) in list"
        :key="i"
      >
        <img :src="item">
        <span>第{{i + 1}}个面板</span><br>
        <span>共有<em class="total-count">{{list.length}}</em>个面板</span>
        <!-- <p>4月10日上午，在海南博鳌亚洲论坛的年会上，来自海内外数千名嘉宾，听到了一场极为精彩、印象深刻的演讲，中国国家主席习近平对当今世界形势作了十分准确的分析，对未来全球经济发展作了富有远见的研判，对中国改革开放事业的前景作了令人振奋的描绘。

开放还是封闭？前进还是后退？人类面临着新的重大抉择。面对复杂变化的世界，人类社会向何处去？亚洲前途在哪里？中国改革开放的航船将舵使何方？请听中国国家主席习近平的声音！

（央视记者：申勇 刘爱民 彭柏闳 陈汉章 邢彬 李铮 章猛 石伟明 王哈男 舒贝 张晓鹏 段德文 杨立峰 沈忱 米鹤 李昊 伊斌 齐欢）</p>
<p>4月10日上午，在海南博鳌亚洲论坛的年会上，来自海内外数千名嘉宾，听到了一场极为精彩、印象深刻的演讲，中国国家主席习近平对当今世界形势作了十分准确的分析，对未来全球经济发展作了富有远见的研判，对中国改革开放事业的前景作了令人振奋的描绘。

开放还是封闭？前进还是后退？人类面临着新的重大抉择。面对复杂变化的世界，人类社会向何处去？亚洲前途在哪里？中国改革开放的航船将舵使何方？请听中国国家主席习近平的声音！

（央视记者：申勇 刘爱民 彭柏闳 陈汉章 邢彬 李铮 章猛 石伟明 王哈男 舒贝 张晓鹏 段德文 杨立峰 沈忱 米鹤 李昊 伊斌 齐欢）</p> -->
      </div>
    </vue-ui-switch>

    <div class="buttons-wrap">
      <div class="buttons">
        <span class="btn" @click="switchNext">切换下一面板</span>
        <span class="btn" @click="switchPrev">切换上一面板</span>
      </div>

      <div class="buttons">
        <span class="btn" @click="switchTo(0)">切换到第一个面板</span>
        <span class="btn" @click="switchTo(list.length - 1)">切换到最后个面板</span>
      </div>
    </div>
  </div>
</template>

<script>
  import VueUiSwitch from '../lib/index.vue'

  export default {
    data() {
      return {
        index: 0,
        list: [
          'https://m.360buyimg.com/n12/s750x750_jfs/t3205/78/6355048904/291608/441e877a/58a452adN80497df6.jpg!q70.jpg',
          'https://m.360buyimg.com/n12/jfs/t4105/47/2155533704/319583/53f79440/58a452adNc80be146.jpg!q70.jpg',
          'https://m.360buyimg.com/n12/jfs/t3121/156/6492473908/284095/b8160ca5/58a452adN9d9dbd1c.jpg!q70.jpg',
          'https://m.360buyimg.com/n12/jfs/t3241/59/6354264578/600889/6a343612/58a452aeN0e746eb0.jpg!q70.jpg',
          'https://m.360buyimg.com/n12/jfs/t3070/354/6352201488/462630/ae6f4309/58a452aeN7df0a937.jpg!q70.jpg',
        ]
      }
    },
    components: {
      VueUiSwitch
    },
    methods: {
      switchTo(index) {
        this.$refs['switch'].switchTo(index)
      },
      change(index) {
        this.index = index
      },
      switchNext() {
        this.$refs['switch'].switchNext()
      },
      switchPrev() {
        this.$refs['switch'].switchPrev()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .switch-component {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    img {
      width: 100%;
      vertical-align: top;
    }
  }
  .panel {
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .total-count {
    font-weight: bold;
    color: red;
    margin: 0 10px;
  }
  .buttons-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .buttons {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    .btn {
      background-color: green;
      color: #fff;
      font-size: 10px;
      padding: 8px 10px;
      border: 1px soild #ccc;
      border-radius: 5px;
      margin-left: 10px;
    }
  }
</style>
