<template>
    <cube-scroll class="player-middle2" :options='scrollOPtions' ref='lyricScroll'>
        <div class="playing-lyric-wrap">
            <p
            v-for='(item,index) in getLyric'
            :key='index'
            :class="{'active':activeIndex === index}"
            >{{item[1]}}</p>
        </div>
    </cube-scroll>
</template>

<script>
export default {
    props: {
        getLyric: {
            type: Array,
            defalut() {
                return []
            }
        },
        activeIndex: {
            type: Number,
            defalut: -1
        }
    },
    watch: {
        activeIndex(newVval) {
            this.lyricAutoScroll(newVval)
        }
    },
    data() {
        return {
            scrollOPtions: {
                directionLockThreshold: 0
            }
        }
    },
    methods: {
        lyricAutoScroll(i) {
            this.$refs.lyricScroll.scrollTo(0, 32 * -i, 500) // x y time
        }
    }
}
</script>

<style lang='less'>
.player-middle2{
    .playing-lyric-wrap{
        margin-top: 200px;
        p{
            line-height: 32px;
            &.active{
                color: #fff
            }
        }
    }
}
</style>
