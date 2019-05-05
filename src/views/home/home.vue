<template>
    <cube-scroll class="home" :options="scrollOptions" :data='listDate' v-if='listDate.length' ref='scroll'>
        <cube-slide ref="slide" :data="banner" :options="slideOptions">
            <cube-slide-item v-for="(item, index) in banner" :key="index">
                <a :href="item.extra.tourl">
                    <img :src="item.imgurl" height="150">
                </a>
            </cube-slide-item>
        </cube-slide>
            <h2 class="title">新歌推荐</h2>
            <z-musicList :listDate='listDate'></z-musicList>
    </cube-scroll>
</template>

<script>
import { getDate } from 'api/api.js'
import zMusicList from 'components/z-musicList/z-musicList'
import scrollMixins from 'common/mixins/scrollMixins'
export default {
    mixins: [scrollMixins],
    data() {
        return {
            banner: [],
            listDate: [],
            slideOptions: {
                listenScroll: true,
                directionLockThreshold: 0
            }
        }
    },
    created() { // 获取首页数据
        getDate('').then((data) => {
            this.banner = data.banner
            this.listDate = data.data
        })
    },
    components: {
        zMusicList
    }
}
</script>

<style lang='less'>
@import '/~common/style/style.less';
    .home{
        .cube-slide-item{
            height: 150px;
            img{
                width: 100%;
            }
        }
        .title{
            padding: 0 10px;
            font-size: @fontsize-large-xx;
            line-height: 50px;
        }
    }
</style>
