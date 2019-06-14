const EVENT_SHOW = 'show'
export default {
    data() {
        return {
            visibility: false
        }
    },
    methods: {
        show() {
            this.visibility = true
            this.$emit(EVENT_SHOW)
        },
        hide() {
            this.visibility = false
        },
        initPosition() { // 每次退出都使得滚动位置回到顶部
            if (this.$refs.scroll) {
                this.$refs.scroll.scrollTo(0, 0)
            }
        },
        onBack() {
            if (this.$route.params.id && this.$route.params.singerID) { // 当前页面在歌手对应的歌单页面
                this.$router.replace({
                    name: this.$route.name,
                    params: { id: this.$route.params.id }
                })
            } else if (this.$route.params.id) { // 其他歌单页面
                this.$router.replace({
                    name: this.$route.name
                })
            }
            this.hide()
            this.initPosition()
        }
    }
}
