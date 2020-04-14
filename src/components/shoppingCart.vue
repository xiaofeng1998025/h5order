<template>
    <div class="shoppingCart" v-if="show">
        <van-popup v-model="lieshow" position="bottom" v-if="list.length>0">
            <div class="contlist"  :class="[lieshow?'contlist_show':'']">
                <ul>
                    <li v-for="(item,index) in list" :key="index" v-if="item.num > 0">
                        <div class="contlist_l">
                            <p>{{item.name}}</p>
                            <div>￥{{item.price}}</div>
                        </div>
                        <div class="contlist_r van-stepper">
                            <van-button  type="" :class="item.num<2?'van-button-hov':''" @click="item.num--"><i></i></van-button>
                            <input type="number"  v-model="item.num" class="van-stepper__input">
                            <van-button  type="" @click="item.num++"><i></i><b></b></van-button>
                            <!--                        <van-stepper   min="0" v-model="item.num"  @change="onbjgxg(item,index)" />-->
                        </div>
                    </li>
                </ul>
            </div>
        </van-popup>
        <div class="bomt" @click="onckgwcl" v-if="list.length>0">
            <div class="bomt_l">
                <van-icon name="shopping-cart" size="0.37rem" color="#C9161E"  :info="copies" />
                <span v-if="Total>0">￥<b>{{Total}}</b></span>
            </div>
            <div class="bomt_r" @click="onqxiad">
                去下单
                <van-icon name="arrow" color="#fff" />
            </div>
        </div>
<!--        弹出框-->
<!--        <div class="contd" v-if="zzcshow" @click="zzcshow=false;lieshow=false"></div>-->
    </div>
</template>

<script>
    export default {
        name: "shoppingCart",
        props:{
            Cart:Object
        },
        data(){
            return{
                show:true,       //购物车
                lieshow:false,    //购物车列表
                list:[],        //购物车列表
                Total:0.00,       //总价
                copies:0,          //总份数
            }
        },
        methods:{
            // 点击查看购物车列表
            onckgwcl(){
                if(this.lieshow){
                    this.lieshow=false;
                }else{
                    this.lieshow=true;
                }
            },
            // 点击去下单
            onqxiad(){
                this.$router.push({name:'order'});
                localStorage.setItem("Cartlist", JSON.stringify(this.list));
            }
        },
        mounted() {
           if(JSON.parse(localStorage.getItem("Cartlist"))){
               this.list=JSON.parse(localStorage.getItem("Cartlist"))
           }
        },
        watch:{
            Cart(data){
                if(this.list.some(item=>{return item.disheid==data.disheid})&&this.list.some(item=>{return item.methodid==data.methodid})){
                    this.list.forEach((item,index)=>{
                        if(item.disheid==data.disheid){
                          this.list[index].num++;
                            return false
                        }
                    });
                }else{
                    this.list.push(data);
                }
                console.log(data);
            },
            list:{
                handler(data){
                    //console.log(data);
                    let price=0;
                    let num=0;
                    data.forEach((item,index)=>{
                      //  console.log(item.num)
                            if(item.num==0){
                                this.list.splice(index,1)
                            }
                            // this.$set(this.list[index],num,item.num)
                            price+=Number((item.num*item.price).toFixed(2));
                            num+=Number(item.num);
                           // console.log(Number((item.num*item.price).toFixed(2)))
                    });
                    this.Total=price.toFixed(2);
                    this.copies=num;
                    // console.log(data)

                    // this.list=data;

                },
                deep: true
            }
        },
        beforeDestroy(){
            localStorage.setItem("Cartlist", JSON.stringify(this.list));
        }
    }
</script>

<style scoped lang="scss">
    .shoppingCart{
        .contlist{
            max-height: 3.56rem;
            margin-bottom: 0.7rem;
            /*<!--overflow-x: auto;-->*/
            /*<!--position: absolute;-->*/
            /*<!--z-index: 99;-->*/
            /*<!--background: #fff;-->*/
            /*<!--width: 100%;-->*/
            /*<!--bottom:-100vh;-->*/
            li{
                display: flex;
                height: 0.7rem;
                padding: 0 0.15rem;
                border-top: 1px solid #E8E8E8;
                .contlist_l{
                    display: flex;
                    flex-direction: column;
                   justify-content: center;
                    flex-grow: 1;
                    width: 50%;
                    p{
                        font-size: 0.16rem;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    div{
                        margin-top: 0.02rem;
                        font-size:0.18rem;
                        font-weight: bold;
                    }
                }
                .contlist_r{
                    /*width: 0.97rem;*/
                    margin-left: 0.1rem;
                    display: flex;
                    /*flex-direction: column;*/
                    align-items: center;
                    justify-content: center;
                    .van-stepper__input{
                        width: 0.32rem;
                        height: 0.28rem;
                    }
                    .van-button-hov::before{
                        background-color:#f2f3f5 !important;
                    }
                    .van-button{
                        position: relative;
                        box-sizing: border-box;
                        width: 0.28rem;
                        height: 0.28rem;
                        margin: 0;
                        padding: 4px;
                        color: #323233;
                        vertical-align: middle;
                        background-color: #f2f3f5;
                        border: 0;
                        span{
                            font-size: 0.24rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: absolute;
                            top:0;
                            width: 0.28rem;
                            height: 0.28rem;
                            left: 0;
                            i{
                                width:0.13rem;
                                height: 0.01rem;
                                background: #000;
                            }
                            b{
                                width:0.13rem;
                                height: 0.01rem;
                                background: #000;
                                position: absolute;
                                transform: rotate(90deg);
                            }
                        }

                    }
                }
            }
            li:nth-child(1){
                margin-top: 0;
            }
        }
        .contd{
            position: fixed;
            top:0;
            left: 0;
            height: 100%;
            width: 100%;
            background: rgba(000,000,000,0.6);
        }
        .bomt{
            display: flex;
            position: relative;
            z-index: 99999;
            background: #fff;
            box-shadow: 0 0 5px rgba(0,0,0,.12);
            padding: 0.2rem 0.15rem 0.15rem 0.15rem;
            .bomt_l{
                display: flex;
                span{
                    font-size: 0.15rem;
                    display: flex;
                    align-items: flex-end;
                    margin-left: 0.15rem;
                    b{
                        font-size: 0.2rem;
                    }
                }
            }
            .bomt_r{
                margin-left: auto;
                width: 1rem;
                background: #C9161E;
                color: #fff;
                font-size: 0.15rem;
                text-align: center;
                border-radius: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .contlist_show{
            transition:bottom .2s;
            transition-timing-function:inherit;
            bottom:0.72rem;
        }
    }


</style>