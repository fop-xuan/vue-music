<template>
    <transition name='showSheet'>
        <div class="singers" v-if='singers.length' v-show='visibility'>
            <float :title='title' @back='onBack'></float>
            <cube-scroll class="scroll" :class="{'active':isward}" ref='scroll'>
                <ul class="singer-list">
                    <li v-for='(singer, index) in singers' :key='index' @click='changeRouter($route.params.id, singer.singerid)'>
                        <img v-lazy="singer.imgurl" :key="singer.imgurl">
                        <p>{{singer.singername}}</p>
                        <i class="cubeic-arrow"></i>
                    </li>
                </ul>
            </cube-scroll>
        </div>
    </transition>
</template>

<script>
import float from 'components/float/float'
import scrollMixins from 'common/mixins/scrollMixins'
import visibilityMixins from 'common/mixins/visibilityMixins'
import dataMixins from 'common/mixins/dataMixins'
import { getDate } from 'api/api.js'
const RE = /{size}/
export default {
    name: 'zSingers',
    mixins: [scrollMixins, visibilityMixins, dataMixins],
    props: {
        singers: {
            type: Array,
            default() {
                return []
            }
        },
        title: {
            type: String,
            default: ''
        }
    },
    methods: {
        getSheetList() { // 获取相应歌手页面对应的歌单
            if (this.$route.params.singerID) { // 必须具有singerID
                getDate(`/singer/info/${this.$route.params.singerID}`).then((data) => {
                    data.info.imgurl = data.info.imgurl.replace(RE, 400)
                    this.sheet = {
                        songList: data.songs.list,
                        imgurl: data.info.imgurl,
                        name: data.info.singername
                    }
                    this.showCom()
                })
            }
        }
    },
    components: {
        float
    }
}
</script>

<style lang='less'>
@import '/~common/style/style.less';
    .singers{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 775;
        background:@background-custom1;
        height: 100%;
        .float{
            background: rgba(63, 63, 63,0.6);
            i{
                position: absolute;
                left: 0;
                top: 0px;
            }
        }
    }
    .singer-list{
        background: rgba(177, 177, 177,0.6);
        li{
            padding: 5px 0px;
            margin: 0 10px;
            border-bottom: 1px solid @color-violet;
            position: relative;
            line-height: 70px;
            img{
                float: left;
                width: 70px;
                border-radius: 50%;
            }
            p{
                text-indent: 1em;
                font-size: @fontsize-large;
            }
            i{
                position: absolute;
                right: 5px;
                height: 100%;
                top: 0;
                font-size: @fontsize-large-xx;
            }
        }
    }
    .scroll{
        width: 100%;
        position: absolute;
        top: 50px;
        bottom: 0;
        height: auto;
        &.active{
            bottom: 60px;
        }
    }
</style>
