<template>
    <nav class="music-nav">
        <ul class="tab-list clear-fix">
            <router-link
                tag='li'
                class="tab-list-item"
                v-for="item in nav"
                :key='item.name'
                :to="{name:item.name}"
                :exact="item.name ==='home'? true : false"
                event="touchend"
            >
                <a href="javascript:;">{{item.title}}</a>
            </router-link>
        </ul>
    </nav>
</template>

<script>
import nav from '@/router/index'
export default {
    data() {
        return {
            nav
        }
    }
}
</script>

<style lang='less'>
@import '/~common/style/style.less';
    .tab-list{
        background: rgba(0, 0, 0,.01);
        display: flex;
        .tab-list-item{
            box-sizing: border-box;
            text-align: center;
            line-height: 45px;
            width: 0;
            flex: 1;
            height: 45px;
            float: left;
            font-size: @fontsize-large-x;
            a{
                display: block;
                transition: .3s color;
            }
            &.tab-list-item-active{
                border-bottom: 2px solid @color-violet;
                a{
                    color: @color-violet;
                }
            }
        }
    }
</style>
