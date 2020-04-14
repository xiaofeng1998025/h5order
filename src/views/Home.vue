<template>
  <div class="home">
    <div class="top">
  <van-swipe :autoplay="5000" touchable >
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img v-lazy="image" />
    </van-swipe-item>
  </van-swipe>
</div>
    <div class="cont_top">
  <div class="cont_top_logo"><img src="@img/logo.png" alt=""></div>
  <div class="cont_top_cot">
      <div class="cont_top_cot_t">古渝雄关(火凤山店)</div>
      <div><van-icon name="location-o" />重庆市重庆市渝北区</div>
      <div><van-icon name="phone-o" /><a href="tel:023-68887676">023-68887676</a></div>
  </div>
  <div class="cont_top_cot_r">
      <p><img src="@img/VIP.png" alt=""></p>
      <div>会员中心</div>
  </div>
</div>
    <div class="cont" :style="'marginBottom=0.72rem;'">
        <div class="cont_l">
            <ul>
                <li class="cont_l_top" @click="onsearch" :class="[classifyid==-1?'cont_l_hov':'']">
                    <p><van-icon name="search" size="0.18rem" /></p>
                      搜索
                </li>
                <li :class="[classifyid==item.classifyid?'cont_l_hov':'']" @click="onlxss(item)" v-for="(item,index) in fellb" :key="index" >
                    {{item.name}}
                </li>

            </ul>
        </div>
        <div class="cont_r">
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
                        <div>￥{{item.price}}<span v-if="item.ismethod==1" @click="onguig(item)" class="guige">选规格</span>  <span v-else class="jiagw"  @touchstart="touchstart"  @click="omjrgwc(item)"> <van-icon size="0.26rem" name="add" /></span></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
<!--      购物车小球-->
      <span class="gwcdd" style="display: none">1</span>
<!--      图片预览 class="dsadsa"-->
      <van-image-preview v-model="picshow.show" :images="picshow.img">
<!--          <template v-slot:index>第{{ index }}页</template>-->
      </van-image-preview>
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
<!--      购物车-->
      <div class="gouc">
          <div>
              <shoppingCart :Cart="jiarule"></shoppingCart>
          </div>
      </div>
<!--      我的订单-->
      <div class="wddda" @click="$router.push({name:'orderdetails'})" v-if="wodsshow">
          <img src="@img/dingd.png" alt="">
      </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Lazyload } from 'vant';
  import shoppingCart from "../components/shoppingCart";
  // options 为可选参数，无则不传
  Vue.use(Lazyload);
export default {
  name: 'home',
  components:{
     shoppingCart
  },
  data(){
        return{
            images: [
            'http://img1.imgtn.bdimg.com/it/u=1124912927,2657561408&fm=26&gp=0.jpg',
            'http://bizhi.cnanzhi.com/upload/bizhi/2014/1202/14175244369822.jpg',
            'http://img1.imgtn.bdimg.com/it/u=1124912927,2657561408&fm=26&gp=0.jpg',
            'http://bizhi.cnanzhi.com/upload/bizhi/2014/1202/14175244369822.jpg',
          ],
            picshow:{ //图片预览
                show:false,
                img:[],
            },
            show:false,      //规格弹框
            guigeArr:[],      //规格列表
            methodid:'',          //规格id
            gexzid:'',              //规格选中下标
            fellb:[],          //分类列表
            classifyid:0,     //分类列表分类id
            cplilistrArr:[],  //菜品列表
            jiarule:{},        //添加给购物车的内容
            wodsshow:false,    //我的订单
            jrdh:true,       //加入动画
        }
    },
    methods:{
        init(){
            // 分类查询
            this.$post(this.$api.getSecondDisheClassifyByStoreid).then(data=>{
                console.log('分类列表',data);
                if(data.code==0){
                    this.fellb=data.data;
                    this.classifyid=data.data[0].classifyid;
                    this.cpflxcs();
                }
            });
            this.$post(this.$api.getTablesStatus).then(data=>{
                console.log(data);
                if(data.code==0){
                   if(data.data.stauts==1){
                        this.wodsshow=true;
                   }
                }
            });
            // 轮播图
            this.$post(this.$api.getBanner).then(data=>{
                console.log(data);
                if(data.code==0){
                    // if(data.data.stauts==1){
                    //     this.wodsshow=true;
                    // }
                }
            });
        },
        // 菜品分类查询
        cpflxcs(){
          this.$post(this.$api.getDisheByClassifyId,{classifyid:this.classifyid}).then(data=>{
              console.log(data);
              if(data.code==0){
                  this.cplilistrArr=data.data
              }

          })
        },
        // 搜索点击
        onsearch(){
            this.classifyid=-1;
            this.$router.push({name:'search'})
        },
        // 图片预览
        ontpyl(val){
            this.picshow={
                show:true,
                img:[val]
            }
        },
        // 分类搜索
        onlxss(val){
            this.classifyid=val.classifyid;
            this.cpflxcs();
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
        //地址参数匹配
        GetQueryValue1(queryName) {
          var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
           if ( r != null ){
                  return decodeURI(r[2]);
           }else{
                  return null;
           }
        }
    },
    mounted() {
        this.init();
        localStorage.setItem("token", this.GetQueryValue1('token'));
        console.log(this.GetQueryValue1('token'))
    }
}
</script>
<style lang="scss">
  .top{
    .van-swipe{
      .van-swipe__indicators{
          i{
              width: 14px;
               height: 4px;
              border-radius: 5px;
          }
          .van-swipe__indicator--active{
              width: 18px;
              background: #fff;
          }
        }
      }
    }
</style>
<style scoped lang="scss">
    .home{
        background: #F4F4F4;
    }
    .top{
        .van-swipe{
            height: 1.8rem;
            width: 100%;
            img{
                height: 1.8rem;
                width: 100%;
            }
        }
    .van-swipe{
      .van-swipe__indicators{
        i{
          width: 10px;
        }
      }
    }
  }
    .cont_top{
        display: flex;
        height:0.68rem;
        align-items: center;
        background: #fff;
        .cont_top_logo>img{
            width:0.34rem;
            height: 0.34rem;
            margin-left: 0.16rem;
        }
        .cont_top_cot{
            margin-left: 0.1rem;
            .cont_top_cot_t{
                font-size: 0.16rem;

            }
            >div{
                display: flex;
                align-items: center;
                i{
                    margin-right: 0.02rem;
                }
            }
            font-size: 0.13rem;
            color: #333;
            a{
                color: #333;
            }

        }
        .cont_top_cot_r{
            width: 0.84rem;
            margin-left: auto;
            border-left: 1px solid #F2F2F2;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            p{
                img{
                    width: 0.36rem;
                    height: 0.17rem;
                }
            }
        }
    }
    .cont{
        display: flex;
        margin-top: 0.1rem;
        border-bottom: 0.72rem solid #EDEDED;
        .cont_l{
            width: 26%;
            background: #fff;
            ul{
                li{
                    height: 0.5rem;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.15rem;
                    cursor: pointer;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .cont_l_top{
                    flex-direction: column;
                    align-items: center;
                    p{
                        width: 0.18rem;
                        height: 0.18rem;
                    }
                    i{
                        width: 0.18rem;
                        height: 0.18rem;
                    }
                }
                .cont_l_hov{
                    background: #f4f4f4;
                    border-left: 3px solid #C9161E;
                    color: #000;
                    font-weight: bold;
                }
            }
        }
        .cont_r{
            width:64%;
            background: #fff;
            padding: 0.1rem;
            margin:0 auto;
            /*max-height: 11rem;*/
            /*overflow-x: auto;*/
            li{
                display: flex;
                margin-top: 0.3rem;
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
    }
    .wrappergg {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
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
    .wddda{
        position: fixed;
        bottom: 0.8rem;
        right: 0.1rem;
        img{
            width: 0.55rem;
            height: 0.55rem;
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