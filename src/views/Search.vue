<template>
    <div class="Search">
        <div class="Search_top">
            <span @click="$router.push({name:'home'})">返回</span>
            <van-field v-model="value" placeholder="请输入菜品关键字" @keyup.enter="onserch" @click-left-icon="onserch" size="mini" left-icon="search" />
        </div>
        <div class="cont_r" :class="[cpli?'cont_r_hov':'']">
            <ul>
                <li v-for="(item,index) in cplilistrArr" :key="index">
                    <div class="cont_r_l">
                        <van-image
                                width="0.8rem"
                                height="0.8rem"
                                :src="item.pic" @click="ontpyl(item.pic)"/>
                        <!--                        <img :src="" alt="">-->
                    </div>
                    <div class="cont_r_r">
                        <h3>{{item.name}}</h3>
                        <p>销量131</p>
                        <div>￥{{item.price}}<span v-if="item.ismethod==1" @click="onguig(item)" class="guige">选规格</span>  <span v-else class="jiagw" @touchstart="touchstart"  @click="omjrgwc(item)"> <van-icon size="0.26rem" name="add" /></span></div>
                    </div>
                </li>
            </ul>
            <div class="kongshtu" v-if="cpli">
                <img src="@img/kongshit.png" alt="">
                <p>暂未查询到该菜品</p>
            </div>
        </div>
        <!--      购物车小球-->
        <span class="gwcdd" style="display:none;">1</span>
        <!--      购物车-->
        <div class="gouc">
            <div>
               <shoppingCart :Cart="jiarule"></shoppingCart>
            </div>
        </div>
        <!--    //规格弹框-->
        <van-overlay :show="show" >
            <div class="wrappergg" @click.stop  v-for="(item,index) in guigeArr" :key="index">
                <div class="block">
                    <h3>{{item.name}}</h3>
                    <div class="block_ge">
                        <p>规格:</p>
                        <ul>
                            <li :class="[gexzid==item2.methodid?'block_ge_hov':'']" v-for="(item2,index2) in item.method" @click="gexzid=item2.methodid" :key="index2">{{item2.name}}</li>
                        </ul>
                    </div>
                    <div class="block_je">
                        <div class="block_je_l">总价<span><b>￥</b>{{item.price}}</span></div>
                        <div class="block_je_r" @click="onjrgwc(item)"><van-icon size="0.16rem" name="plus" />加入购物车</div>
                    </div>
                    <div class="block_gb">
                        <i @click="show = false;gexzid=''"><img src="@img/chaxx.png" alt=""></i>
                    </div>
                </div>
            </div>
        </van-overlay>
<!--        搜索为空-->
<!--        <van-overlay :show="true" @click=" false">-->
<!--            <div class="wrapper" @click.stop>-->
<!--                <div class="block" >-->
<!--                    <img src="@img/kongshit.png" alt="">-->
<!--                </div>-->
<!--            </div>-->
<!--        </van-overlay>-->
    </div>
</template>

<script>
    import shoppingCart from "../components/shoppingCart";
    export default {
        name: "Search",
        components:{
            shoppingCart
        },
        data(){
            return{
                value:'',
                cplilistrArr:[],     //
                cpli:false,        //空视图
                show:false,      //规格弹框
                guigeArr:[],      //规格列表
                methodid:'',          //规格id
                gexzid:'',              //规格选中下标
                jiarule:{},        //添加给购物车的内容
                jrdh:true,       //加入动画
            }
        },
        methods:{
            // 搜索
            onserch(){
                this.$post(this.$api.getDishesByName,{searchname:this.value}).then(data=>{
                    console.log(data);
                    this.cplilistrArr=data.data;
                    if(data.data.length==0){
                        this.cpli=true;
                    }else{
                        this.cpli=false;
                    }
                });

            },
            //点击规格
            onguig(val){
                this.show=true;
                this.guigeArr[0]=val;
            },
            //点击加入购物车
            omjrgwc(val){
                this.jiarule={price:val.price,num:1,name:val.name,disheid:val.disheid};
            },
            //规格加入
            onjrgwc(val){
                console.log(val);
                this.jiarule={price:val.price,num:1,name:val.name,disheid:val.disheid,methodid:this.gexzid};
                this.show=false;
                this.gexzid='';
            },
            // 加入购物车动画
            touchstart(e) {
                // 获取x 坐标 // 获取y 坐标
                if(this.jrdh){
                    this.jrdh=false;
                    var $ball = document.getElementsByClassName("gwcdd")[0];
                    $ball.style.position='fixed';
                    $ball.style.top =e.targetTouches[0].clientY+'px';
                    $ball.style.left = e.targetTouches[0].clientX+'px';
                    $ball.style.display =`block`;
                    setTimeout(()=>{
                        $ball.style.top = (window.innerHeight-60)+'px';
                        $ball.style.left = '0.4rem';
                        $ball.style.transition = 'left .8s linear, top .8s ease-in';
                    }, 20);
                    setTimeout(()=>{
                        $ball.style.display =`none`;
                        this.jrdh=true;
                    },900);
                }

            },
        }
    }
</script>

<style scoped lang="scss">
    .Search_top{
        padding: 0.1rem;
        background: #fff;
        display: flex;
        align-items: center;
        font-size: 0.15rem;
        color: #666;
        span{
            padding: 0.05rem 0.15rem 0.05rem 0;
        }
        .van-cell{
            flex-grow: 1;
            width: 70%;
            background: #F5F5F5;
            border-radius: 50px;
            padding: 0.05rem 0.16rem;

        }

    }
    .gouc{
        position: fixed;
        z-index: 100;
        bottom: 0;
        width: 100%;
        >div{
            position: absolute;
            bottom: 0;
            width: 100%;
            /*background: #fff;*/
            box-shadow: 0 0 5px rgba(0,0,0,.12);
        }

    }
    .cont_r{

        background: #fff;

        margin:0 auto;
        /*max-height: 11rem;*/
        /*overflow-x: auto;*/
        li{
            display: flex;
            margin-top: 0.15rem;
            padding: 0.1rem;
            .cont_r_l{
                margin-right: 0.1rem;
                img{
                    width: 0.8rem;
                    height: 0.8rem;
                    border-radius: 5px;
                }
            }
            .cont_r_r{
                display: flex;
                flex-grow: 1;
                width: 60%;
                flex-direction: column;
                justify-content: space-between;
                h3{
                    font-size: 0.16rem;
                    color: #333;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                p{
                    font-size: 0.13rem;
                    color: #999;
                    margin-top: -0.1rem;
                }
                div{
                    font-size:0.15rem;
                    color: #333;
                    display: flex;
                    width: 100%;
                    align-items: flex-end;
                    .guige{
                        margin-left: auto;
                        width: 0.63rem;
                        height: 0.27rem;
                        line-height: 0.27rem;
                        text-align: center;
                        background:#C9161E ;
                        color: #fff;
                        border-radius: 50px;
                        font-size: 0.12rem;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                    .jiagw{
                        width: 0.23rem;
                        height: 0.23rem;
                        margin-left: auto;
                        color: #C9161E;
                    }
                }
            }
        }
        li:nth-child(1){
            margin-top: 0;
        }
    }
    .block{
        width: 3.38rem;
        position: relative;
        /*height: 1.8rem;*/
        padding: 0.15rem 0;
        border-radius: 10px;
        background-color: #fff;
        h3{
            font-size: 0.18rem;
            color: #333;
            padding: 0 0.15rem;
        }
        .block_ge{
            margin-top: 0.13rem;
            padding: 0 0.15rem;
            border-bottom: 1px solid #E8E8E8;
            p{
                font-size: 0.13rem;
                color: #999;
            }
            ul{
                display: flex;
                flex-wrap: wrap;
                padding-bottom: 0.5rem;
                li{
                    width:0.95rem;
                    height: 0.3rem;
                    text-align: center;
                    line-height: 0.3rem;
                    color: #333;
                    font-size: 0.13rem;
                    border: 1px solid #E8E8E8;
                    border-radius:50px;
                    box-sizing: border-box;
                    margin-right: 0.11rem;
                    margin-top: 0.08rem;
                }
                .block_ge_hov{
                    color:#C9161E ;
                    background: #FFF4F4;
                    border-color:#C9161E;
                }
                li:nth-child(3n){
                    margin-right: 0;
                }
            }
        }
        .block_je{
            display: flex;
            padding: 0.1rem;
            .block_je_l{
                font-size:0.15rem;
                height: 0.4rem;
                line-height: 0.4rem;

                span{
                    b{
                        font-size: 0.15rem;
                    }
                    font-size: 0.25rem;
                    font-weight: bold;
                }
            }
            .block_je_r{
                margin-left: auto;
                width: 1.2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background:#C9161E ;
                border-radius: 50px;
                font-size: 0.15rem;
                color: #fff;
            }
        }
        .block_gb{
            position: absolute;
            left: 0;
            bottom: -0.5rem;
            width: 100%;
            display: flex;
            justify-content: center;
            i{
                width: 0.36rem;
                height: 0.36rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }

        }
    }
    .wrappergg {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .cont_r_hov{
        position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        z-index: -1;
        display: flex;
        flex-direction: column;
        justify-content: center ;
        align-items: center;
        background: #cccccc;
        .kongshtu{
                img{
                    width: 1.2rem;
                    height: 1.2rem;
                }
            p{
                margin-top: 0.2rem;
                color: #C9161E;
            }
        }
    }
    .gwcdd{
        width: 0.15rem;
        height: 0.15rem;
        text-align: center;
        line-height: 0.15rem;
        background: #C9161E;
        border-radius: 100%;
        z-index: 88;
        color: #fff;
        font-size: 0.1rem;
        top:0;
        left: 0;
    }
</style>