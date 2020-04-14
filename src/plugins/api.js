//let http='http://192.168.0.70:8080'; //开发测试
let http='http://www.cqgyxg.com'; //生产线上
export default {
    login:http+'/wechat/store/login',          //登录
    getSecondDisheClassifyByStoreid:http+'/wechat/store/getSecondDisheClassifyByStoreid',       //菜品分类
    getDisheByClassifyId:http+'/wechat/store/getDisheByClassifyId',               //获取菜品
    orderDishes:http+'/wechat/store/orderDishes',                                 //下单
    getTablesNameById:http+'/wechat/store/getTablesNameById',                      //获取餐台名称
    getTablesStatus:http+'/wechat/store/getTablesStatus',                           //获取开台情况
    getTablesInfoById:http+'/wechat/store/getTablesInfoById',                        //获取订单详情
    getDishesByName:http+'/wechat/store/getDishesByName',                            //搜索\
    getBanner:http+"/wechat/store/getBanner",                                    //轮播图
    getToken:http+'/wechat/store/getToken',                  //获取token
    storePreOrder:http+'/wechat/store/preOrder'+'?token='+localStorage.getItem('token'),               //结账
}