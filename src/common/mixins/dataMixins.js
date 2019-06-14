export default {
    data() {
        return {
            sheet: {}
        }
    },
    created() { // 创建时更新当前的歌单
        this.updateSheetList()
    },
    watch: {
        $route() { // 动态路由变化时更新当前的歌单
            this.updateSheetList()
        }
    },
    methods: {
        changeRouter(id, singerID) { // 点击改变动态路由
            this.$router.push({
                name: this.$route.name,
                params: {
                    id: id,
                    singerID: singerID
                }
            })
        },
        updateSheetList() { // 更新重新获取歌单列表数据
            if (this.$route.params.id) {
                this.getSheetList()
            }
        },
        showCom(comIndex) { // 展示歌单或者歌手页面
            if (comIndex === 1) {
                this.singersCom = this.singersCom || this.$createZSingers({
                    $props: {
                        title: 'title',
                        singers: 'singers'
                    }
                })
                this.singersCom.show()
            } else {
                this.songSheetcom = this.songSheetcom || this.$createZSongSheet({
                    $props: {
                        sheet: 'sheet'
                    }
                })
                this.songSheetcom.show()
            }
        }
    }
}
