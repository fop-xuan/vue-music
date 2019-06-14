<template>
    <ul class="songList">
        <li class="songList-item"
        v-for='(item, index) in listDate'
        :key='index'
        @click.stop='openPlay(index)'
        ref='songList'
        >
            <span class="info">{{item.filename}}</span>
            <span class="icon icon-play2"></span>
            <!-- <div class="playIcon" v-show='index === musicIndex'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div> -->
        </li>
    </ul>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    props: {
        listDate: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            musicIndex: -1
        }
    },
    computed: {
       ...mapState(['listIndex'])
    },
    created() {
        this.changeListDateLen({
            listDateLen: this.listDate.length
        })
    },
    watch: {
        listIndex(newVal) { // 通过listIndex的变换发送歌曲请求
            if (newVal === -1) {
                return
            }
            let IncomingValues = newVal
            if (newVal > this.listDate.length - 1) {
                IncomingValues = 0
            } else if (newVal < 0) {
                IncomingValues = this.listDate.length - 1
            }
            if (IncomingValues !== newVal) {
                this.changeIndex({ listIndex: IncomingValues })
            }
            const hash = this.listDate[IncomingValues].hash
            this.musicIndex = IncomingValues
            this.changeMusic(hash)
        }
    },
    methods: {
         ...mapActions(['_getMusic']),
         ...mapMutations(['togglePlayPage', 'changeIndex', 'updateWard', 'changeListDateLen']),
        openPlay(index) { // 当前的listIndex 等于当前列表歌曲 并且显示出歌曲页面
            this.musicIndex = index
            this.changeIndex({ listIndex: index })
            this.togglePlayPage({ showPlayPage: true })
            if (!this.up) {
                this.up = true
                this.updateWard()
            }
        },
        changeMusic(hash) { // 发送歌曲请求
            this._getMusic({ hash: hash })
        }
    }
}
</script>

<style lang='less'>
@import '/~common/style/style.less';
    .songList{
        padding: 0 10px;
        .songList-item{
            height: 50px;
            line-height:60px;
            border-bottom: 1px solid @color-violet-t;
            &:first-of-type{
                padding-bottom: 5px;
            }
            &+.songList-item{
                 padding: 5px 0;
            }
            .info{
                width:70%;
                float: left;
                font-size:@fontsize-large;
                text-indent: 1em;
                white-space:nowrap;
                overflow: hidden;
                text-overflow:ellipsis;
            }
            .icon{
                margin-right: 15px;
                float:right;
                line-height: 60px;
                font-size: @fontsize-large-xx;
            }
            .playIcon{
                margin-right: 10px;
                margin-top: 10px;
                float: right;
                width:50px;
                height: 50px;
                span{
                    background: @color-violet;
                    width: 6px;
                    height: 40px;
                    float: left;
                    margin: 0px 2px;
                    animation: playIcon 1.2s ease-in-out infinite;
                }
            }
            .playIcon span:nth-of-type(1){
                animation-delay: -1.1s
            }
            .playIcon span:nth-of-type(2){
                animation-delay: -1s
            }
            .playIcon span:nth-of-type(3){
                animation-delay: -0.9s
            }
            .playIcon span:nth-of-type(4){
                animation-delay: -0.8s
            }
            .playIcon span:nth-of-type(5){
                animation-delay: -0.7s
            }
        }
    }
    @keyframes playIcon{
        0%{ transform: scaleY(.3);}
        20%{transform: scaleY(.8);}
        40%{transform: scaleY(.3);}
        100%{transform: scaleY(.3);}
    }
</style>
