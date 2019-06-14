<template>
    <audio ref='myAudio'
    :src="play_url"
    autoplay=“autoplay”
    @ended="end"
    @timeupdate='timeupdate'
    @canplay='getDuration'
    ></audio>
</template>

<script>
import { mapState } from 'vuex'
const EVENT_CANPLAY = 'timeupdateHandle'
const EVENT_UPDATE = 'getDurationHandle'
const EVENT_END = 'end'
export default {
    props: {
        play_url: {
            type: String,
            default: ''
        },
        playMode: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            next: null
        }
    },
    computed: {
        ...mapState(['isPlay', 'listIndex', 'listDateLen'])
    },
    mounted() {
        this.on = null
        document.addEventListener('touchstart', () => {
            if (this.on === null) {
                this.$refs.myAudio.src = this.play_url
                this.$refs.myAudio.play()
                this.on = true
            }
        })
    },
    watch: {
        isPlay(newV) {
            if (this.$refs.myAudio) {
                if (newV) {
                    this.$refs.myAudio.play()
                } else {
                    this.$refs.myAudio.pause()
                }
            }
        }
    },
    methods: {
        timeupdate(event) {
            this.$emit(EVENT_CANPLAY, event)
            if (this.playMode === '' || this.playMode === '单曲循环') {
                event.target.setAttribute('loop', 'loop')
            } else {
                event.target.removeAttribute('loop')
            }
        },
        getDuration(event) {
            this.$emit(EVENT_UPDATE, event)
        },
        end() {
            let next = null
            if (this.playMode === '顺序播放') {
                next = this.listIndex + 1
            } else if (this.playMode === '随机播放') {
                next = Math.round(Math.random() * this.listDateLen)
                if (next === this.listIndex) {
                    next = this.listIndex + 1
                }
            }
            if (next) {
                this.$emit(EVENT_END, next)
            }
        }
    }
}
</script>

<style>

</style>
