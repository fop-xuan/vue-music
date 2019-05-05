<template>
    <div class="hot-search" v-if='hotMessage.length'>
        <h3 class="hot-title">热门搜索</h3>
        <ul class="hot-list">
            <li class="hot-list-item"
            v-for='(title,index) in hotMessage'
            :key='index'
            :class="{'high': index === 0}"
            @touchend='searchHot(title.keyword)'
            >{{title.keyword}}</li>
        </ul>
    </div>
</template>

<script>
import { getSearchdate } from 'api/api.js'
export default {
    data() {
        return {
            hotMessage: []
        }
    },
    created() {
        getSearchdate('hot', {
            plat: 0,
            count: 30
        }).then(({ data }) => {
            this.hotMessage = data.info
        })
    },
    methods: {
        searchHot(keyword) {
            this.$parent.searchHot(keyword)
        }
    }
}
</script>

<style lang='less'>
@import '/~common/style/style.less';
    .hot-search{
        margin-top: 64px;
        padding: 20px 10px;
        .hot-title{
            font-size: @fontsize-medium;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.6);
        }
        .hot-list{
            padding-top: 15px;
            .hot-list-item{
                color: #333;
                font-size:  @fontsize-medium;
                border: 1px solid @color-gray;
                display: inline-block;
                padding: 5px 8px;
                border-radius: 20px;
                margin-right: 10px;
                margin-bottom: 8px;
                &.high{
                    color: red;
                    border: 1px solid red;
                }
            }
        }
    }
</style>
