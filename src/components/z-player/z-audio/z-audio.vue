<template>
    <audio ref='myAudio'
    :src="play_url"
    autoplay=“autoplay”
    loop=“loop”
    @timeupdate='timeupdate'
    @canplay='getDuration'
    ></audio>
</template>

<script>
import { mapState } from 'vuex'
const EVENT_CANPLAY = 'timeupdateHandle'
const EVENT_UPDATE = 'getDurationHandle'
export default {
    props: {
        play_url: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState(['isPlay', 'listIndex'])
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
        },
        getDuration(event) {
            this.$emit(EVENT_UPDATE, event)
        }
    }
}
</script>

<style>

</style>
