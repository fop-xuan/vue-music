<template>
    <cube-scroll class="singerClass" :data="songerClass">
        <div class="singer-class-warp">
            <ul class="singer-class-list" v-for='(items, indexs) in songerClass' :key='indexs'>
                <li v-for='(item, index) in items' :key='index' @click='changeRouter(item.classid)'>
                    <span>{{item.classname}}</span>
                    <i class="cubeic-arrow"></i>
                </li>
            </ul>
        </div>
    </cube-scroll>
</template>

<script>
import { getDate } from 'api/api.js'
import dataMixins from 'common/mixins/dataMixins'
const RE = /{size}/
export default {
    mixins: [dataMixins],
    data() {
        return {
            songerClass: [],
            title: '',
            singers: []
        }
    },
    created() { // 获取歌手class数据
        getDate(`${this.$route.name}`).then((data) => {
            const list = data.list
            this.computedClass(list)
        })
    },
    methods: {
        computedClass(list) { // 按数据按照名字开头类别
            const newList = []
            let n = 0
            for (let i = 0; i < list.length; i++) {
                if (i !== list.length - 1 && list[i].classname.charAt(0) !== list[i + 1].classname.charAt(0)) {
                    newList.push(list.slice(n, i + 1))
                    n = i + 1
                } else if (i === list.length - 1) {
                    newList.push(list.slice(n, i + 1))
                }
            }
            this.songerClass = newList
        },
        getSheetList() { // 得到歌手列表数据
            getDate(`/singer/list/${this.$route.params.id}`).then((data) => {
                this.title = data.classname
                const info = data.singers.list.info
                info.forEach(item => {
                    item.imgurl = item.imgurl.replace(RE, 400)
                })
                this.singers = info
                this.showCom(1)
            })
        }
    }
}
</script>

<style lang='less'>
@import '/~common/style/style.less';
    .singer-class-list{
        margin:15px 10px;
        li{
            position:relative;
            border-radius: 2px;
            height: 60px;
            line-height: 60px;
            text-indent: 1em;
            font-size: @fontsize-large;
            background: linear-gradient(45deg, rgba(114, 126, 115, 0.3), rgba(80, 81, 95, 0.3));
            color: #000;
            &:last-of-type{
                border-bottom: none;
            }
            border-bottom: 1px solid @color-gray-t;
            i{
                color:rgb(95, 94, 94);
                position: absolute;
                right: 0;
                height: 100%;
                font-size: @fontsize-large-x;
            }
        }
    }
</style>
