<template>
    <div class="Orderdetails">
        <div class="order_top">
            <div>桌台 <span>{{Dining}}</span></div>
            <div @click="show=true">人数 <span v-if="peoplenum">{{peoplenum}}人</span> <van-icon name="arrow" size="0.16rem" color="#BEBEBE" /></div>
            <div>备注 <van-field v-model="memo" disabled  placeholder="请输入备注" /></div>
        </div>
        <div class="contlist">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <div class="contlist_l">
                        <p>{{item.name}}</p>
                        <div>￥{{item.price}}</div>
                    </div>
                    <div class="contlist_r">
                        <van-button  type="" disabled  :class="item.num<2?'van-button-hov':''" @click="item.num--"><i></i></van-button>
                        <input type="number"  v-model="item.num" class="van-stepper__input">
                        <van-button  type="" disabled  @click="item.num++"><i></i><b></b></van-button>
                    </div>
                </li>
            </ul>
        </div>
        <div class="order_bootm">
            <div class="order_bootm_l">
                合计：￥<span v-if="Total">{{Total}}</span>
            </div>
<!--            <div class="order_bootm_r" @click="onSubmission">-->
<!--                提交订单-->
<!--            </div>-->
            <div class="order_bootm_r_jcjz" >
                <div class="order_bootm_r_jc" @click="$router.push({name:'home'})">加菜</div>
                <div class="order_bootm_r_jz" ><a :href="this.$api.storePreOrder">  结账</a><van-icon name="arrow" size="0.16rem" color="#fff" /></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Orderdetails",
        data(){
            return{
                memo:'',       //备注
                Dining:'',          //餐台
                peoplenum:'',      //用餐人数
                list:[],      //数据列表
                Total:'',    //总计
            }
        },
        methods:{
            init(){
                this.$post(this.$api.getTablesInfoById).then(data=>{
                    console.log(data);
                    if(data.code==0){
                        this.list=data.data.list;
                        this.peoplenum=data.data.peopleNum;
                        this.Dining=data.data.tablesName;
                        this.memo=data.data.memo;
                    }
                })
            },
            // 人数弹出层确定
            onConfirm(value) {
                this.peoplenum = value;
                this.show = false;
            },
            //订单提交
            onSubmission(){
                let data={
                    peoplenum:this.peoplenum,
                    memo:this.memo,
                    dishes:JSON.stringify(this.list)
                };
                this.$post(this.$api.orderDishes,data).then(data=>{
                    if(data.code==0){
                        localStorage.removeItem('Cartlist');
                        this.$router.push({name:'ordered'})
                    }
                    console.log(data);
                })
            },
            // 结账
            oninvoicing(){
                this.$post(this.$api.storePreOrder).then(data=>{
                    
                })
            }
        },
        mounted() {
            this.init()
        },
        watch:{
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
                    this.Total=price;


                },
                deep: true
            }
        }
    }
</script>

<style scoped lang="scss">

    .Orderdetails{
        margin-top: 0.1rem;
        .order_top{
            background: #fff;
            div{
                min-height: 0.5rem;
                display: flex;
                align-items: center;
                border-top:1px solid #E8E8E8;
                padding: 0 0.1rem;
                font-size: 0.17rem;
                span{
                    margin-left: 0.2rem;
                }
                i{
                    margin-left: auto;
                }
                .van-cell{
                    padding: 0;
                    flex-grow:1;
                    width: 70%;
                    margin-left: 0.2rem;
                }
            }
            div:nth-child(1){
                border-top:0;

            }
        }
        .contlist{
            margin-top: 0.1rem;
            background: #fff;
            margin-bottom: 0.64rem;
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
        .order_bootm{
            box-shadow: 0 0 5px rgba(0,0,0,.12);
            position: fixed;
            height: 0.64rem;
            background: #fff;
            display: flex;
            align-items: center;
            bottom: 0;
            width: 94%;
            padding: 0 3%;
            .order_bootm_l{
                font-size: 0.15rem;
                span{
                    font-size: 0.2rem;
                    font-weight: bold;
                }
            }
            .order_bootm_r{
                width: 0.9rem;
                height: 0.37rem;
                text-align: center;
                color: #fff;
                font-size: 0.15rem;
                background: #C9161E;
                border-radius: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: auto;

            }
            .order_bootm_r_jcjz{
                display: flex;
                margin-left: auto;
                .order_bootm_r_jc{
                    background: #FFAE02;
                    border-bottom-left-radius: 50px;
                    border-top-left-radius: 50px;
                    width: 0.8rem;
                    height: 0.37rem;
                    font-size: 0.15rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                }
                .order_bootm_r_jz{
                    background: #C9161E;
                    border-bottom-right-radius: 50px;
                    border-top-right-radius: 50px;
                    width: 0.8rem;
                    height: 0.37rem;
                    font-size: 0.15rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    i{
                        margin-left: 0.08rem;
                    }
                    a{
                        color: #fff;
                    }
                }
            }
        }
    }
</style>