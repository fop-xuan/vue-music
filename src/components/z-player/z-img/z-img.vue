<template>
     <div class="player-middle1">
        <div class="player-img">
            <img :src="img" :class="{'active':rotate}">
        </div>
        <div class="playing-lyric-wrap">
            <p>{{activeLyric}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        img: {
            type: String,
            default: ''
        },
        rotate: {
            type: Boolean
        },
        activeLyric: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang='less' scoped>
    .playing-lyric-wrap{
        p{
            color:#fff
        }
    }
   .player-img{
        margin: 50px auto;
        width: 250px;
        height: 250px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        background-image: url(./disc.png);
        background-size: cover;
        img{
            width: 65%;
            height: 65%;
            border-radius: 50%;
            &.active{
                animation: 15s rotate infinite linear;
            }
        }
    }
    @keyframes rotate{
        100%{transform: rotate(360deg)}
    }
    @media all and (max-width:320px){
        .player-img{
            margin: 20px auto;
        }
    }
    @media all and (min-height:731px){
         .player-img{
             margin: 60px auto;
         }
    }
    @media all and (min-width:768px){
        .player-img{
            width: 600px;
            height: 600px;
        }
    }
</style>
