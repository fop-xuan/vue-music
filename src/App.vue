<template>
  <div id="app">
    <z-header></z-header>
    <div class="count" :class="{'active': isward}">
      <transition name='showCom'>
        <router-view />
      </transition>
    </div>
    <z-player></z-player>
  </div>
</template>
<script>
import zHeader from 'components/z-header/z-header'
import zPlayer from 'components/z-player/z-player'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['isward'])
  },
  components: {
    zHeader,
    zPlayer
  }
}
</script>

<style lang="less" scoped>
@import '/~common/style/style.less';
  .showCom-enter,.showCom-leaver-to{
    opacity: 0;
  }
  .showCom-enter-active,.showCom-leaver-active{
    transition: .8s;
  }
  .count{
    position: absolute;
    top: 110px;
    left: 0;
    width: 100%;
    bottom: 0px;
    right: 0;
    overflow: hidden;
    background: @background-custom1;
    &.active{
      bottom: 60px;
    }
  }
</style>
