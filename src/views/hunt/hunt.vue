<template>
    <div class="search">
        <div class="search-bar">
            <div class="text-box">
                <cube-input v-model="message" placeholder='搜索歌曲、歌单、拼音'></cube-input>
                <span class="icon icon-search"></span>
            </div>
            <cube-button type="submit" :disabled="message===''? true : false" @touchend.native='search'>搜索</cube-button>
        </div>
        <transition name="component-fade" mode="out-in">
           <component :is='view' ref='view' :searchMessage='searchMessage' :isRequset='isRequset'></component>
        </transition>
    </div>
</template>

<script>
import zHotSearch from 'components/z-hotSearch/z-hotSearch'
import zSearchList from 'components/z-searchList/z-searchList'
import { getSearchdate } from 'api/api.js'
export default {
    data() {
        return {
            message: '',
            view: zHotSearch,
            searchMessage: {},
            page: 1,
            isRequset: true
        }
    },
    methods: {
        searchHot(keyword) { // hot组件传入
            this.message = keyword
        },
        search() { // 执行获取进行搜索的数据  并且在执行完后显示搜索列表组件
            this.searchMessage = {}
            this.page = 1
            this.getSearchDate().then(() => {
                this.view = zSearchList
            })
        },
        async getSearchDate() { // 获取进行搜索的数据
            const { data } = await getSearchdate('song', {
                keyword: this.message,
                page: this.page,
                pagesize: 10
            })
            if (Object.keys(this.searchMessage).length) { // 当keys存在说明时第二次请求
                this.searchMessage = {
                    ...this.searchMessage,
                    info: this.searchMessage.info.concat(data.info)
                }
            } else { // 第一次请求
                this.searchMessage = {
                    total: data.total,
                    info: data.info
                }
            }
            if (this.searchMessage.info.length === this.searchMessage.total) { // 当请求数据等于总数据 结束请求
                this.isRequset = false
            }
        },
        updateSearchDate() { // 下拉加载数据
            this.page++
            this.getSearchDate()
        },
        backHot() { // list组件中传入
            this.view = zHotSearch
        }
    },
    components: {
        zHotSearch,
        zSearchList
    }
}
</script>

<style lang='less'>
@import '/~common/style/style.less';
    .component-fade-enter,.component-fade-leave-to{
        opacity: 0;
    }
    .component-fade-enter-active,.component-fade-leave-active{
        transition: .2s;
    }
    .search{
        position: relative;
        height: 100%;
        overflow: hidden;
    }
    .search-bar{
        z-index: 555;
        box-sizing: border-box;
        position: fixed;
        top: 110px;
        width: 100%;
        padding: 12px 10px;
        background: #f4f4f4;
        display: flex;
        .text-box{
            position: relative;
            flex: 1;
            .cube-input{
                width: 95%;
                .cube-input-field{
                    padding-left: 30px;
                    border-radius: 5px;
                    &::placeholder{
                        font-size: @fontsize-medium;
                    }
                }
            }
            span{
                position: absolute;
                left: 6px;
                top: 0;
                color: @color-gray;
                font-size: @fontsize-large;
                margin-top: 11px;
            }
        }
        .cube-btn{
            width: 50px;
            height: 40px;
            font-size: @fontsize-medium;
            padding: 0;
        }
    }
</style>
