<template>
    <div class="player">
        <z-audio v-if='musicInfo'
        @timeupdateHandle='updateTime'
        @getDurationHandle='durationHandle'
        :play_url='musicInfo.play_url'
        ref='zAudio'></z-audio>
        <div class="player-tool" @touchend.stop='showPlayerPage'  v-if='musicInfo'>
            <div class="song-img" :class="{'active':isPlay}">
                <img :src="musicInfo.img">
            </div>
            <div class="song-info">
                <p class="songName">{{musicInfo.song_name}}</p>
                <p class="songerName">{{musicInfo.author_name}}</p>
            </div>
            <div class="song-tool">
                <span class="icon icon-previous" @touchend.stop='prev'></span>
                <span class="icon" @touchend.stop='toggle' :class="{'icon-play2':!isPlay,'icon-pause':isPlay}"></span>
                <span class="icon icon-next" @touchend.stop='next'></span>
            </div>
        </div>
        <transition name='showPlayerPage'>
             <div class="player-page"  v-if='musicInfo' v-show='showPlayPage'>
                <div class="bg">
                    <img :src="musicInfo.img">
                </div>
                <div class="player-page-center">
                    <div class="player-header" ref='header'>
                        <div class="back" @click.stop='onBack'>
                            <i class="cubeic-select"></i>
                        </div>
                        <div class="music-title">
                            <p class="songName">{{musicInfo.song_name}}</p>
                            <div class="singerName">
                                <div class="linear-box">
                                    <span class="linear"></span>
                                    <span class="linear-title">{{musicInfo.author_name}}</span>
                                    <span class="linear"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="player-middle">
                        <cube-slide ref="slide"
                        :loop='false'
                        :auto-play='false'
                        :options='slideOPtions'
                        >
                            <cube-slide-item>
                                <z-img :img='musicInfo.img' :rotate='isPlay' :activeLyric='activeLyric'></z-img>
                            </cube-slide-item>
                            <cube-slide-item>
                                <z-lyric :getLyric='getLyric' :activeIndex='activeIndex'></z-lyric>
                            </cube-slide-item>
                        </cube-slide>
                    </div>
                    <div class="player-footer">
                        <div class="audio-tool">
                            <span class="duration">{{duration}}</span>
                            <div class="audio-pro">
                                <div class="audio-proUp" ref='proUp' v-progressScroll>
                                    <i class="audio-proBar" :class="{'active':isPlay}"></i>
                                </div>
                            </div>
                            <span class="currentTime">{{currentTime}}</span>
                        </div>
                        <div class="audio-button">
                            <span class="icon icon-backward2" @touchend.stop='prev'></span>
                            <span class="icon icon-play3" @touchend.stop='toggle' :class="{'icon-play3':!isPlay,'icon-pause2':isPlay}"></span>
                            <span class="icon icon-forward3" @touchend.stop='next'></span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import zImg from './z-img/z-img'
import zLyric from './z-lyric/z-lyric'
import zAudio from './z-audio/z-audio'
export default {
    data() {
        return {
            slideOPtions: {
                listenScroll: true,
                directionLockThreshold: 0
            },
            duration: 0,
            currentTime: 0,
            pauseAutoScroll: false,
            activeIndex: -1,
            activeLyric: ''
        }
    },
    computed: {
        ...mapState(['musicInfo', 'isPlay', 'showPlayPage', 'listIndex']),
        getLyric() { // 得到数组形式歌词数据
            let arr = []
            if (this.musicInfo.lyrics) {
                const re = /\[[^[]+/g
                arr = this.musicInfo.lyrics.match(re)
                arr.forEach((item, i) => {
                    arr[i] = [this._getLyric(arr[i].substring(0, 10)), arr[i].substring(10)]
                })
            }
            return arr
        }
    },
    mounted() {
        document.addEventListener('DOMContentLoaded', () => {
            // console.log(1)
        })
    },
    methods: {
        ...mapMutations(['togglePlay', 'togglePlayPage', 'changeIndex']),
        toggle() { // 切换是否播放
            if (this.isPlay) {
                this.togglePlay({ isPlay: false })
            } else {
                this.togglePlay({ isPlay: true })
            }
        },
        onBack() { // 从播放页面中回退
            this.togglePlayPage({ showPlayPage: false })
        },
        showPlayerPage() { // 展示歌曲播放页面
            this.togglePlayPage({ showPlayPage: true })
        },
        durationHandle(e) { // 获取歌曲长度
           this.duration = this.getTime(e.target.duration)
        },
        updateTime(e) { // 歌曲播放时触发
            this.currentTime = this.getTime(e.target.currentTime)
            this.progressBarScroll(e.target)
            if (this.getLyric.length) {
                this.highLight_Lyric(e.target.currentTime)
            }
        },
        progressBarScroll(audio) { // bar滚动
            if (!this.pauseAutoScroll) {
                let scale = audio.currentTime / audio.duration || 0
                let width = Math.round(scale * 100)
                this.$refs.proUp.style.width = `${width}%`
            }
        },
        highLight_Lyric(time) { // 得到高亮歌词
            for (let i = 0; i < this.getLyric.length; i++) {
                if (i !== this.getLyric.length - 1 && time >= this.getLyric[i][0] && time <= this.getLyric[i + 1][0]) {
                    this.activeIndex = i
                    this.activeLyric = this.getLyric[i][1]
                } else if (i === this.getLyric.length - 1 && time >= this.getLyric[i][0]) {
                    this.activeIndex = i
                    this.activeLyric = this.getLyric[i][1]
                }
            }
        },
        getTime(time) { // 得到00:00格式的时间
            let minute = Math.floor(time % 86400 % 3600 / 60)
            let second = Math.floor(time % 60)
            minute = minute < 10 ? '0' + minute : minute
            second = second < 10 ? '0' + second : second
            return minute + ':' + second
        },
        _getLyric(time) { // 过滤出歌词 [时间，歌词]....
            const fliterTime = time.substring(1, time.length - 1).split(':')
            return parseFloat((fliterTime[0] * 60 + parseFloat(fliterTime[1])).toFixed(2))
        },
        next() {
            this.changeIndex({ listIndex: this.listIndex + 1 })
        },
        prev() {
            this.changeIndex({ listIndex: this.listIndex - 1 })
        }
    },
    directives: {
        progressScroll: { // 进度条拖拽
            inserted(el, binding, vnode) {
                const vm = vnode.context
                const maxW = el.parentNode.offsetWidth
                const bar = el.children[0]
                let scale = 0
                let start = 0
                bar.addEventListener('touchstart', (e) => {
                   start = e.changedTouches[0].pageX - bar.offsetLeft
                })
                bar.addEventListener('touchmove', (e) => {
                    let target = e.changedTouches[0].pageX - start
                    if (target > maxW) {
                        target = maxW
                    } else if (target < 0) {
                        target = 0
                    }
                    vm.pauseAutoScroll = true
                    scale = target / maxW
                    let width = Math.round(scale * 100)
                    el.style.width = `${width}%`
                })
                bar.addEventListener('touchend', () => {
                    const com = vm.$refs.zAudio
                    com.$refs.myAudio.currentTime = scale * com.$refs.myAudio.duration
                    vm.pauseAutoScroll = false
                })
            }
        }
    },
    components: {
        zImg,
        zLyric,
        zAudio
    }
}
</script>
<style lang='less'>
@import '/~common/style/style.less';
    audio{
        display: none;
    }
    .player-tool{
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
        height: 60px;
        background: @background-custom2;
        z-index: 887;
        div{
            float: left;
            height: 100%;
        }
        .song-img{
            width: 17%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items:center;
            &.active{
                animation: 6s rotate infinite linear;
            }
            img{
                border-radius: 50%;
                width: 50px;
                height: 50px;
            }
        }
        .song-info{
            width: 37%;
            text-indent: 1em;
            .songName{
                font-size: @fontsize-medium;
                font-weight: 500;
                white-space:nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding: 15px 0 5px 0;
            }
            .songerName{
                font-size: @fontsize-small;
                line-height:13px;
                color: @color-gray;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .song-tool{
            width: 46%;
            display: flex;
            span{
                font-size: @fontsize-large-xxxx;
                display: flex;
                justify-content: center;
                align-items: center;
                flex:1;
            }
        }
    }
    @keyframes rotate{
        100%{transform: rotate(360deg) translateZ(0);}
    }
    .showPlayerPage-enter,.showPlayerPage-leave-to{
        opacity: 0;
        transform: translateY(100%)
    }
    .showPlayerPage-enter-active,.showPlayerPage-leave-active{
        transition: .5s ease-out;
    }

    .player-page{
        transform-origin: left bottom;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 888;
        background: #222;
        .bg{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            filter: blur(15px);
            opacity: 0.5;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .player-page-center{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .player-header{
        height: 70px;
        position: relative;
        color: #fff;
        .back{
            position: absolute;
            text-align: center;
            width: 50px;
            font-size: @fontsize-large-xxxx;
            line-height:55px;
            color: @background-yellow;
        }
    }
    .music-title{
        text-align: center;
        height: 100%;
        .songName{
            line-height: 55px;
            margin: 0 75px;
            white-space: nowrap;
            overflow: hidden;
            font-size: @fontsize-large-x;
        }
        .singerName{
            font-size: @fontsize-medium;
            .linear-box{
                text-align: center;
                margin: 0 120px;
                display: flex;
                line-height: 16px;
            }
            .linear{
                flex-grow: 1;
                background: linear-gradient(to bottom,transparent 49%,#fff 56%,transparent 60%);
            }
            .linear-title{
                text-overflow: ellipsis;
                width: 60px;
                overflow: hidden;
                padding: 0 10px;
                white-space: nowrap;
            }
        }
    }
    .player-middle{
        position: fixed;
        width: 100%;
        bottom: 120px;
        top: 70px;
        overflow: hidden;
    }
    .player-footer{
        position: fixed;
        bottom: 0px;
        width: 100%;
        height: 120px;
    }
    .playing-lyric-wrap{
        text-align: center;
        p{
            color: @color-gray-t;
            font-size: @fontsize-medium;
        }
    }
    .audio-tool{
        margin: 0 20px;
        padding: 20px 0 20px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
            color: #fff;
            font-size: @fontsize-medium;
            flex-grow: 1;
            &:last-of-type{
                text-align: right;
            }
        }
        .audio-pro{
            width: 70%;
            height: 3px;
            background: #fff;
            border-radius: 10px;
            position: relative;
            .audio-proUp{
                width: 0%;
                height: 100%;
                background: @background-yellow;
                position: relative;
                .audio-proBar{
                    position: absolute;
                    right: -7.5px;
                    top: -6px;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    background: @background-yellow;
                    &.active{
                        animation: 1.8s twinkle infinite;
                    }
                }
            }
        }
    }
    .audio-button{
        display: flex;
        height: 50px;
        justify-content: center;
        align-items: center;
        .icon{
            font-size: @fontsize-large-xxxx;
            color:#fff;
            flex-basis: 70px;
            text-align: center;
            &:nth-of-type(2){
                font-size: @fontsize-large-xxxxxx;
            }
        }
    }
    @keyframes twinkle{
        0%{box-shadow: 0 0 0 0 @background-yellow-x;}
        100%{box-shadow: 0 0 0 15px transparent}
    }
    @media all and (max-width:320px){
        .music-title{
            .singerName{
                .linear-box{
                    margin: 0 100px;
                }
            }
        }
    }
    @media all and (min-width:768px){
        .music-title{
            .singerName{
                .linear-box{
                    display: block;
                    .linear{
                        display: none;
                    }
                }
            }
        }
    }
</style>
