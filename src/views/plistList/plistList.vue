<template>
    <cube-scroll class="pList" :data='plists'  :options="scrollOptions" ref='scroll'>
        <div class="pListList">
           <div class="pList-item" v-for='(pList, index) of plists' :key='index'>
               <div class="imgInfo" @click='changeRouter(pList.specialid)'>
                   <img v-lazy='pList.imgurl'>
                   <div class="icon-box">
                       <span class="play-num">
                           <i></i>
                           {{pList.playcount}}
                       </span>
                       <span class="play-icon"></span>
                   </div>
               </div>
               <div class="info">
                   <p class="title">{{pList.specialname}}</p>
                   <p class="name">{{pList.username}}</p>
               </div>
           </div>
        </div>
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
            plists: []
        }
    },
    created() { // 获取plistList数据
        getDate('/plist/index').then((data) => {
            const info = data.plist.list.info
            info.forEach(item => {
                item.imgurl = item.imgurl.replace(RE, 400)
            })
            this.plists = info
        })
    },
    methods: {
        getSheetList() { // 获取对应的歌单 并显示歌单页面
            getDate(`${this.$route.name}/${this.$route.params.id}`).then((data) => {
                data.info.list.imgurl = data.info.list.imgurl.replace(RE, 400)
                this.sheet = {
                    songList: data.list.list.info,
                    imgurl: data.info.list.imgurl,
                    specialname: data.info.list.specialname
                }
                this.showCom()
            })
        }
    }
}
</script>

<style lang='less'>
@import '/~common/style/style.less';
    .pList{
        background: linear-gradient(45deg, #31315c, #354b35);
    }
    .pListList{
        display: flex;
        justify-content: space-around;
        align-content: space-around;
        flex-wrap: wrap;
        padding: 15px 10px 0 10px;
        .pList-item{
            flex: 0 0 48%;
            img{
                width: 100%;
            }
            .info{
                padding: 10px 0px;
                .title{
                    color: #fff;
                    font-size: @fontsize-small;
                    height: 30px;
                    line-height: 15px;
                }
                .name{
                    color: @color-gray-ttt;
                    font-size: @fontsize-small;
                    line-height: 20px;
                }
            }
        }
    }
    .imgInfo{
        position:relative;
        .icon-box{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            color: #fff;
            .play-num{
                float: left;
                font-size: @fontsize-small;
                font-weight: 500;
                margin-left: 5px;
                margin-top: 8px;
                i{
                    width: 10px;
                    height: 10px;
                    background: url(./sprite.png) no-repeat;
                    background-size: 24px 60px;
                    background-position: 0 -50px;
                    display: inline-block;
                }
            }
            .play-icon{
                float: right;
                background: url(./sprite.png) no-repeat;
                width: 24px;
                height: 24px;
                background-size: 100%;
                margin-right: 3px;
                margin-bottom: 3px;
                &.active{
                    background-position: 0 -24px;
                }
            }
        }
    }
</style>
