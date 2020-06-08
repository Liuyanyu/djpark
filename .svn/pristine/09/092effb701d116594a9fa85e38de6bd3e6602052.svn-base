<template>
    <div class="monitor">
        <div style="margin-top: 20px;">
            <Button type="success" @click="toOpen">一键开启</Button><span style="padding: 0 20px;"></span>
            <Button type="error" @click="toClose">一键关闭</Button>
        </div>
        <div class="sensor" v-for="(item,index) in list" :key="index" :style="{left:item.latitude, top:item.longitude}">
            <div class="left">
                <div class="control">
                    <div class="close" :class="{'select':item.isOpen==1}" @click="controlDevice(index,item,1)">{{item.openName}}</div>
                    <div class="open" :class="{'select':item.isOpen==0}" @click="controlDevice(index,item,0)">{{item.closeName}}</div>
                </div>
                <p class="title">{{item.deviceName}}</p>

                <p class="moisture">土壤墒情：{{item.humidity}}%</p>
                <p class="open-time">开启灌溉时间</p>
                <p class="open-time" v-if="item.ddIrrigateJob.type == 2">灌溉水量：{{item.ddIrrigateJob.waterNum}}t</p>
                <p class="open-time" v-if="item.ddIrrigateJob.type == 2">开启时间：{{item.ddIrrigateJob.openTime}}</p>
                <p class="open-time" v-if="item.ddIrrigateJob.type == 1">时间段一：{{item.ddIrrigateJob.ddIrrigateQuartzList[0].startTime + "-" + item.ddIrrigateJob.ddIrrigateQuartzList[0].endTime}}</p>
                <p class="open-time" v-if="item.ddIrrigateJob.type == 1">时间段二：{{item.ddIrrigateJob.ddIrrigateQuartzList[1].startTime + "-" + item.ddIrrigateJob.ddIrrigateQuartzList[1].endTime}}</p>
                <p class="open-time">周期：{{item.ddIrrigateJob.cycle}}天一次</p>
                <p class="status">
                    状态：
                    <label v-if="item.status == 1" class="noFault">正常</label>
                    <label v-if="item.status == 0" class="isFault">故障</label>
                </p>
            </div>
            <div class="right">
                <Tabs value="name1">
                    <TabPane label="视频监控" name="name1">
                         <!--<video-player class="vjs-custom-skin" :options="playerOptions"></video-player>-->
                        <video style="width: 100%;" :src="item.deviceMac" autoplay controls="controls">
                            your browser does not support the video tag
                        </video>
                    </TabPane>
                    <TabPane label="灌溉记录" name="name2">
                        <table border="0">
                            <tr class="log-title">
                                <th>灌溉水量</th>
                                <th>灌溉时长</th>
                                <th>起末土壤墒情</th>
                                <th>上升比例</th>
                                <th>时间</th>
                            </tr>
                            <tr class="log-value" v-for="(item2,index) in item.ddIrrigateLogList" :key="index">
                                <td>{{item2.waterNum}}t</td>
                                <td>{{item2.lastTime}}分钟</td>
                                <td>{{item2.moisture}}</td>
                                <td>{{item2.ratio}}</td>
                                <td>{{item2.time}}</td>
                            </tr>
                        </table>
                    </TabPane>
                </Tabs>
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
    import webRight from '@/page/web/irrigate/right.vue'
    //引入video样式
    import 'video.js/dist/video-js.css'
    import 'vue-video-player/src/custom-theme.css'

    //引入hls.js
    import 'videojs-contrib-hls.js/src/videojs.hlsjs'
    import https from '@/https.js'
    export default {
        name: "index",
        components: {
            webRight
        },
        data() {
            return {
                isLogin:false,
                videoSrc: '',
                list:[],
                logList: [],
                userPhone: null,
                userPassword: null
            }
        },
        created() {
            this.getSoliDeviceList();
        },
        methods: {
            toOpen() {
                window.console.log("toOpen>>>>>>>")
            },
            toClose() {
                this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>The dialog box will be closed after 2 seconds</p>',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            this.$Modal.remove();
                            this.$Message.info('Asynchronously close the dialog box');
                        }, 2000);
                    }
                });
            },
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
            }
        }
    }
</script>

<style scoped>
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
        width: 35%;
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
