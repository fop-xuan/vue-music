<template>
    <transition name='showSheet'>
        <div class="sheet" v-if='Object.keys(sheet).length' v-show='visibility' :class="{'active': isward}">
            <float :sheetTitle='sheet.specialname' :title='sheet.name' @back='onBack'></float>
            <cube-scroll :data='listDate' :options='scrollOptions' ref='scroll'>
                <div class="sheet-header">
                    <img :src="sheet.imgurl" class="sheetBg">
                    <div class="header-content">
                        <p class="rankTitle" v-if='sheet.rankname'>{{sheet.rankname}}</p>
                        <div class="updateTime" v-if='sheet.rankname'>更新时间：{{sheet.update_frequency}}</div>
                    </div>
                </div>
                <z-musicList :listDate='listDate'></z-musicList>
            </cube-scroll>
        </div>
    </transition>
</template>

<script>
import zMusicList from 'components/z-musicList/z-musicList'
import float from 'components/float/float'
import scrollMixins from 'common/mixins/scrollMixins'
import visibilityMixins from 'common/mixins/visibilityMixins'
import { mapMutations } from 'vuex'
const EVENT_SHOW = 'show'
export default {
    name: 'zSongSheet',
    mixins: [scrollMixins, visibilityMixins],
    props: {
        sheet: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    created() {
        this.$on(EVENT_SHOW, () => { // 每次show方法展示页面的时候执行
            this.computedH() // 调用refresh方法 要不然初次加载不能滚动
        })
    },
    methods: {
        ...mapMutations(['changeListDateLen'])
    },
    computed: {
        listDate() {
            this.changeListDateLen({
                listDateLen: this.sheet.songList.length
            })
            return this.sheet.songList
        }
    },
    components: {
        zMusicList,
        float
    }
}
</script>

<style lang='less'>
@import '/~common/style/style.less';
    .showSheet-enter,.showSheet-leave-to{
        transform: translateX(100%);
    }
    .showSheet-enter-active,.showSheet-leave-active{
        transition: .5s;
    }
    .sheet{
        position: absolute;
        left: 0px;
        top: 0px;
        bottom: 0;
        width: 100%;
        z-index:777;
        background: linear-gradient(50deg, #9cd0df, #dfa8a9);
        &.active{
            bottom: 60px;
        }
    }
    // .float{
    //     position: fixed;
    //     top: 0px;
    //     left:0px;
    //     width: 100%;
    //     z-index: 8;
    //     background: rgba(0, 0, 0, .1);
    //     i{
    //         float: left;
    //         padding: 10px;
    //         width: 30px;
    //         height: 30px;
    //         font-size: @fontsize-large-xxxx;
    //         color: @background-yellow;
    //     }
    //     .sheetTitle{
    //         line-height: 50px;
    //         color: #fff;
    //         text-indent: 2em;
    //         white-space: nowrap;
    //         overflow: hidden;
    //         text-overflow: ellipsis;
    //     }
    // }
    .sheet-header{
        overflow: hidden;
        position: relative;
        height:250px;
        .sheetBg{
            width: 100%;
            transform: translateY(-70px);
        }
        .rankTitle{
            font-size: @fontsize-large-xxxxx;
            color: #fff;
            text-align: center;
            margin-top: 100px;
        }
        .updateTime{
            position: absolute;
            left: 12px;
            bottom: 12px;
            width: 100%;
            color: @color-gray-ttt;
            font-size: @fontsize-medium;
        }
    }
    .header-content{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .4);
    }
    @media all and (max-width: 320px){
        .sheet-header{
            .sheetTitle{
                text-indent: 0em;
            }
            .sheetBg{
                transform: translateY(-50px);
            }
        }
    }
</style>
