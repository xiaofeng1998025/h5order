<template>
    <div class="Ordered">
        <p><img src="@img/xdcg.png" alt=""></p>
        <div>
            <p>下单成功</p>
            <div>菜单已发送到厨房，请稍等~</div>
        </div>
        <h3>
            <div @click="onckdd">查看订单</div>
        </h3>
    </div>
</template>

<script>
    export default {
        name: "Ordered",
        methods:{
            // 查看订单
            onckdd(){
                this.$router.push({name:'orderdetails'})
            }
        }
    }
</script>

<style scoped lang="scss">
    .Ordered{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        >p{
            margin: 0 auto;
            >img{
                width: 1.6rem;
                height: 1.5rem;
            }
        }
        >div{
            margin-top: 0.2rem;
            text-align: center;
            p{
                font-size: 0.2rem;
                font-weight: bold;
                text-align: center;
            }
            div{
                font-size: 0.12rem;
                color: #666;
                text-align: center;
                margin-top: 0.1rem;
            }
        }
        >h3{
            text-align: center;
            margin-top: 0.4rem;
            div{
                width: 1.1rem;
                height: 0.37rem;
                background: #C9161E;
                color: #fff;
                border-radius: 50px;
                text-align: center;
                line-height: 0.37rem;
                font-size: 0.16rem;
                font-weight: 500;
                margin: 0 auto;
            }
        }

    }
</style>