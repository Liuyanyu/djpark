<template>
    <div class="monitor">
        <div class="sensor" v-for="(item,index) in list" :key="index" :style="{left:item.latitude, top:item.longitude}">
            <div class="left">
                <span class="title">{{item.deviceName}}</span>
                  <div id="tab">
                    <div class="tab-bar clearfix">
                    <a href="javascript:;"
                        @click="tab(index)"
                        v-for="(item,index) in items"
                        :class="{active : index===curId}"
                    >{{item.item}}</a>
                    </div>
                    <div class="tab-con">
                    <div
                        v-show="index===curId"
                        v-for="(content, index) in contents" >{{content.content}}</div>
                    </div>
                </div>

        <webRight/>
        <Modal v-model="isLogin" title="用户登陆" width="300" :mask-closable="false" ok-text="登录" @on-ok="userLogin" style="text-align: center">
            <Input v-model="userPhone" placeholder="请输入用户名..." style="width: 200px" />
            <p style="padding: 10px 0;"></p>
            <Input v-model="userPassword" placeholder="请输入密码..." style="width: 200px" />
        </Modal>
    </div>
</template>

<script>
    //引入video样式
    import 'video.js/dist/video-js.css'
    import 'vue-video-player/src/custom-theme.css'

    //引入hls.js
    import 'videojs-contrib-hls.js/src/videojs.hlsjs'
    import https from '@/https.js'
    export default {
        name: "index",

        data() {
            return {
                isLogin:false,
                videoSrc: '',
                list:[],
                logList: [],
                userPhone: null,
                userPassword: null,
                curId: 0,
                items: [
                    {item: 'HTML'},
                    {item: 'CSS'},
                    {item: 'JavaScript'},
                    {item: 'Vue'},
                ],
                contents: [
                    {content: 'HTML'},
                    {content: 'CSS'},
                    {content: 'JavaScript'},
                    {content: 'Vue'},
                ]

            }



        },
        created() {
            this.getSoliDeviceList();
        },
        methods: {
            getSoliDeviceList() {
                let params ={'projectId': 'dp97165035044120_137', 'typeId': '00003', 'pager': '1','limit':'20'}
                https.fetchGet('/iot/device/v1/list',params ).then((data) => {
                    window.console.log(data)
                    if(data.code == '00'){
                        this.list = data.object.ddDeviceList
                        for (var i=0;i<this.list.length;i++){
                            this.list[i].openName = '开'
                            this.list[i].closeName = '关'
                        }
                    }
                }).catch(err=>{
                        window.console.log(err)
                    }
                )
            },
            userLogin() {
                let params ={'userPhone': this.userPhone, 'userPassword': this.userPassword}
                https.fetchPost('/iot/admin/user/v1/login',params ).then((data) => {
                    window.console.log(data)
                    if(data.code == '00'){
                        var ddUserInfo = data.object.ddUserInfo
                        window.localStorage.setItem("djAdminUser",JSON.stringify(ddUserInfo))
                        this.isLogin = false
                    }else {
                        this.$Message.error(data.msg);
                    }
                }).catch(err=>{
                        window.console.log(err)
                    }
                )

            },
            controlDevice(index, row, isOpen) {
                var djAdminUser = JSON.parse(window.localStorage.getItem("djAdminUser"))
                if(djAdminUser != null && djAdminUser.userId != null && djAdminUser.userId != ''){
                    if(this.list[index].isOpen != isOpen){
                        var cmdType = 0;
                        if(isOpen == 0){
                            cmdType = 3
                        }
                        if(isOpen == 1){
                            cmdType = 2
                        }
                        window.console.log(isOpen)
                        window.console.log(cmdType)
                        var djAdminUser = JSON.parse(window.localStorage.getItem("djAdminUser"))
                        var userId = djAdminUser.userId
                        let params ={'deviceId': this.list[index].deviceId,"userId": userId, 'cmdType': cmdType}
                        https.fetchPost('/iot/device/thread/start',params ).then((data) => {
                            window.console.log(data)
                            if(data.code == '00'){
                                this.list[index].isOpen = isOpen
                            }else if (data.code == '06') {
                                this.$Message.error(data.msg);
                                window.localStorage.removeItem("djAdminUser")
                                this.isLogin = true
                            }else {
                                this.$Message.error(data.msg);
                            }
                        }).catch(err=>{
                                window.console.log(err)
                            }
                        )
                    }
                }else {
                    this.isLogin = true
                }
            },
             tab (index) {
        this.curId = index;
      }
        }
    }
</script>

<style scoped>
   #tab {
    width: 400px;
    border: 1px solid #ccc;
    margin: 60px auto 0;
  }
  .tab-bar {
    width: 400px;
    background-color: #ccc;
  }
  .tab-bar a {
    float: left;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    text-decoration: none;
    color: #000;
  }
  .tab-bar .active {
    background-color: #0099ff;
  }
  .tab-con div {
    text-align: left;
    height: 100px;
  }
    .sensor{
        position: absolute;
        width: 9.76rem;
        height: 5.74rem;
        background-image: url("../../../assets/sensor2.png");
        background-size: cover;
        background-repeat: no-repeat;
        text-align: left;
    }

    .sensor .left{
        float: left;
        width: 34%;
        position: relative;
    }
    .sensor .right{
        float: right;
        width: 65%;
        padding: 0 0.2rem;
    }

    .sensor .control{
        position: relative;
        background-color: #00000040;
        width: 3.33rem;
        height: 0.6rem;
        margin-top: -0.7rem;
        color: #ffffff;
        font-size: 0.3rem;
        line-height: 0.6rem;
        text-align: center;
    }

    .sensor .control .close{
        float: left;
        width: 50%;
    }

    .sensor .control .close.select{
        background-color: #ef4e4e;
    }
    .sensor .control .open.select{
        background-color: #0499e6;
    }
    .sensor .control .open{
        float: right;
        width: 50%;
    }

    .sensor p{
        margin: 0;
        padding: 0;
        margin-left: 0.3rem;

    }

    .sensor .title{
        margin-top: 0.1rem;
        line-height: 1rem;
        font-size: 0.4rem;
        color: #00ffff;
        font-weight: 600;
        padding-bottom: 0;
        margin-bottom: 0;
    }

    .sensor .moisture{
        line-height: 0.37rem;
        font-size: 0.26rem;
        color: #ffffff;
        margin-bottom: 0.28rem;
    }

    .sensor .open-time {
        line-height: 0.37rem;
        font-size: 0.26rem;
        color: #ffffff;
    }

    .sensor .status{
        margin-top: 0.8rem;
        line-height: 0.2rem;
        font-size: 0.26rem;
        color: #ffffff;
    }

    .sensor .status label{
        padding: 0.2rem 0.1rem;
        border-radius: 0.2rem;
        font-size: 0.24rem;
        font-weight: 600;
    }

    .sensor .status .noFault{
        background-color: #00d2ff;
    }
    .sensor .status .isFault{
        background-color: #ff3939;
    }


   .ivu-tabs{
        color: #ffffff;
    }

   .ivu-tabs-bar{
        border-bottom: 1px solid #1586a1;
    }

    .ivu-tabs-nav .ivu-tabs-tab-active{
        color: #00ffff;
    }
    .ivu-tabs-ink-bar{
        height: 1px;
        background-color: #00ffff;
    }
    table {
        width: 100%;
        text-align: center;
    }

    .log-title{
        color: #ffffff;
        font-size: 0.2rem;
    }

    .log-value{
        line-height: 0.5rem;
        color: #00ed5e;
        font-size: 0.2rem;
        font-weight: 600;
    }

</style>
