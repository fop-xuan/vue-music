<template>
    <div class="float">
        <i class="cubeic-back" @touchend='onBack'></i>
        <p class="sheetTitle" v-if='sheetTitle'>{{sheetTitle}}</p>
        <p class="title" v-if='title'>{{title}}</p>
    </div>
</template>

<script>
const BACK = 'back'
export default {
    props: {
        sheetTitle: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    methods: {
        onBack() {
            this.$emit(BACK)
        }
    }
}
</script>

<style lang='less'>
@import '/~common/style/style.less';
    .float{
        position: fixed;
        top: 0px;
        left:0px;
        width: 100%;
        z-index: 8;
        height: 50px;
        background: rgba(0, 0, 0, .1);
        color: #fff;
        i{
            padding: 10px;
            width: 30px;
            height: 30px;
            font-size: @fontsize-large-xxxx;
            color: @background-yellow;
            position: absolute;
            left: 0;
            top: 0px;
        }
        .sheetTitle{
            line-height: 50px;
            text-indent: 2em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-left: 30px;
        }
        .title{
            line-height: 50px;
            margin-right: 10px;
            text-align: center;
        }
    }
</style>
