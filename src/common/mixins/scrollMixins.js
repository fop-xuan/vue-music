export default {
    data() {
        return {
            scrollOptions: {
                directionLockThreshold: 0,
                stopPropagation: true
            }
        }
    },
    computed: {
        isward() {
            return this.$store.state.isward
        }
    },
    watch: {
        isward() {
           this.computedH()
        }
    },
    methods: {
        computedH() {
            this.$nextTick(() => {
                if (this.$refs.scroll) {
                    this.$refs.scroll.refresh()
                }
            })
        }
    }
}
