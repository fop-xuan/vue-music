<template>
    <div class="search-list" v-if='searchMessage' :class="{'active':isward}">
         <div class="search-list-header">
            <i class="cubeic-back" @touchend='backHot'></i>
            <h3 class="title">搜索结果总条数：{{searchMessage.total}}条</h3>
        </div>
        <cube-scroll
        class="search-list-warp"
        ref='scroll'
        :data='listDate'
        :options="options"
        @pulling-up="onPullingUp"
        >
            <z-musicList :listDate='listDate'></z-musicList>
        </cube-scroll>
    </div>
</template>

<script>
import zMusicList from 'components/z-musicList/z-musicList'
import scrollMixins from 'common/mixins/scrollMixins'
export default {
    mixins: [scrollMixins],
    props: {
        searchMessage: {
            type: Object,
            default() {
                return {}
            }
        },
        isRequset: {
            isRequset: Boolean,
            default: true
        }
    },
    data() {
        return {
            options: {
                pullUpLoad: {
                    threshold: -30, // 负值是当上拉到超过低部 30px；正值是距离底部距离时，
                    txt: {
                        more: '加载更多',
                        noMore: '没有更多数据'
                    }
                }
            }
        }
    },
    created() {
        this.computedH()
    },
    computed: {
        listDate() {
            return this.searchMessage.info
        }
    },
    methods: {
        backHot() {
            this.$parent.backHot()
        },
        onPullingUp() { // 触发下拉事件
            if (this.isRequset) {
                this.$parent.updateSearchDate()
            } else {
                this.$refs.scroll.forceUpdate() // 没有数据时 停止请求
            }
            // 如果你向Scroll组件传递了data属性，那么当Scroll组件监听到data有更新时会自行调用forceUpate(true)方法，因此推荐传递data属性。
            // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
        }
    },
    components: {
        zMusicList
    }
}
</script>

<style lang='less'>
@import '/~common/style/style.less';
    .search-list{
        position: fixed;
        top: 224px;
        width: 100%;
        bottom: 0px;
        &.active{
            bottom: 60px;
        }
    }
    .search-list-header{
        position: fixed;
        top: 174px;
        left: 0;
        width: 100%;
        height: 50px;
        i{
            width: 40px;
            position:absolute;
            left: 0;
            top: 0;
            font-size: @fontsize-large-xxx;
            text-align: center;
        }
        .title{
            margin-left:40px;
            font-size: @fontsize-medium;
        }
        line-height: 50px;
        background: @color-gray-ttt;
    }
</style>
