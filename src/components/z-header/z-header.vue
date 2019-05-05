<template>
    <div class="header">
        <div class="header-title">
            <h2 class="title">
                <span class="logo"></span>
            </h2>
            <div class="icon-box" @touchend='search'>
                <span class="icon icon-search"></span>
            </div>
        </div>
        <z-tab></z-tab>
    </div>
</template>

<script>
import zTab from 'components/z-tab/z-tab'
export default {
    methods: {
        search() {
            this.$router.push({
                path: '/hunt'
            })
        }
    },
    components: {
        zTab
    }
}
</script>

<style lang='less'>
@import '/~common/style/style.less';
    .header{
        box-sizing: border-box;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: #fff;
        .header-title{
            height: 65px;
            box-shadow: 0 5px 5px rgba(0,0,0,.06);
            padding: 0 15px;
            .title{
                float: left;
                height: 65px;
                display: flex;
                align-items: center;
                .logo{
                    display:inline-block;
                    width: 227px;
                    height: 50px;
                    background-image: url(./logo.png);
                    background-position: center center;
                    background-size: cover;
                }
            }
            .icon-box{
                margin-left: 80%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                .icon{
                    color:@color-violet;
                    font-size: @fontsize-large-xx;
                }
            }
        }
    }
</style>
