<template>
    <cube-scroll class="rink"  :data='ranks'  :options="scrollOptions" ref='scroll'>
        <ul class="rankList">
            <li class="rank-item" v-for='rank of ranks' :key='rank.rankname' @click='changeRouter(rank.rankid)'>
                <div class="left">
                    <img v-lazy='rank.imgurl'>
                    <p class="frequency">{{rank.update_frequency}}更新</p>
                </div>
                <div class="right">
                    <p class="rankname">{{rank.rankname}}</p>
                    <i class="cubeic-arrow"></i>
                </div>
            </li>
        </ul>
    </cube-scroll>
</template>

<script>
import { getDate } from 'api/api.js'
import scrollMixins from 'common/mixins/scrollMixins'
import dataMixins from 'common/mixins/dataMixins'
const RE = /{size}/
export default {
    mixins: [scrollMixins, dataMixins],
    data() {
        return {
            ranks: []
        }
    },
    created() { // 获取rank数据
        getDate('/rank/list').then((data) => {
            const ranks = data.rank.list
            ranks.forEach(item => {
                item.imgurl = item.imgurl.replace(RE, 400)
            })
            this.ranks = ranks
        })
    },
    methods: {
        getSheetList() { // 得到排行歌单 并且显示歌单页面
            getDate(`${this.$route.name}`, {
                rankid: this.$route.params.id
            }).then((data) => {
                data.info.imgurl = data.info.imgurl.replace(RE, 400)
                this.sheet = {
                    songList: data.songs.list,
                    imgurl: data.info.imgurl,
                    rankname: data.info.rankname,
                    update_frequency: data.info.update_frequency
                }
                this.showCom()
            })
        }
    }
}
</script>

<style lang='less'>
@import '/~common/style/style.less';
    .rank-item{
        display: flex;
        background: linear-gradient(45deg, rgba(114,126,115,.3), rgba(80,81,95,.3));
        margin: 10px 5px;
        .left{
            width: 100px;
            position: relative;
            img{
                width: 100%;
                display: block;
            }
            .frequency{
                position: absolute;
                left: 5px;
                bottom: 5px;
                font-size: @fontsize-small;
                color: #fff;
            }
        }
        .right{
            flex-grow: 1;
            color: #fff;
            line-height: 100px;
            font-size: @fontsize-large;
            text-indent: 2em;
            position: relative;
            .cubeic-arrow{
                position: absolute;
                right: 0px;
                top: 0;
                font-size: @fontsize-large-xx;
            }
        }
    }
</style>
