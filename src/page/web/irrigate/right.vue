<template>
    <div class="info">
        <div class="analyze">
            <Tabs value="name1">

                <TabPane label="灌溉区耗水量分析" name="name1">
                    <div style="height: 2rem;text-align: left;padding: 0.2rem;color: #ffffff;margin-top: -0.4rem;">
                        <div style="height: 1rem">
                            <p>累计用水量<span style="font-size: 0.5rem;margin: 0 0.15rem;padding: 0 0.1rem;background-color: #00ccff;">{{waterMeter.total}}</span>t</p>
                        </div>
                        <div style="height: 1rem">
                            <p style="width: 50%;float: left;">昨日用水量<span style="font-size: 0.5rem;margin: 0 0.15rem;padding: 0 0.1rem;background-color: #00ccff;">{{waterMeter.yesterday}}</span>m3</p>
                            <p style="width: 50%;float: left;">节约水量<span style="font-size: 0.5rem;margin: 0 0.15rem;padding: 0 0.1rem;background-color: #00ccff;">{{waterMeter.money}}</span>m3</p>
                        </div>
                    </div>
                    <div style="width: 96%;margin: 0 2%;border: 1px solid #ffffff; height: 0.1rem;margin-top: 0.2rem;"></div>
                    <p style="text-align: left;font-size: 0.3rem;color: #00ccff;margin-left: 0.2rem;font-weight: 600;margin-top: 0.2rem;">灌溉耗水量历史数据分析</p>
                    <div class="search">
                        <div class="radioGroup">
                            <label>时间间隔</label>
                            <RadioGroup v-model="selectType1" class="radio">
                                <Radio value="1" label="年"></Radio>
                                <Radio value="2" label="月"></Radio>
                                <Radio value="2" label="日"></Radio>
                            </RadioGroup>
                            <Button icon="ios-search" @click="getHistroylist">查询</Button>
                        </div>
                        <div class="timeGroup">
                            <div v-if="selectType1 == '年'">
                                <label style="float: left">时间范围</label>
                                <div style="float: left; margin-right: 0.1rem;">
                                    <Select v-model="selectYear1" class="select-time">
                                        <Option v-for="item in selectYearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <span>~</span>
                                    <Select v-model="selectYear2" class="select-time">
                                        <Option v-for="item in selectYearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </div>
                            </div>
                            <div v-if="selectType1 == '月'">
                                <label style="float: left">时间范围</label>
                                <div style="float: left; margin-right: 0.1rem;">
                                    <Select v-model="selectYear1" class="select-time">
                                        <Option v-for="item in selectYearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <span>~</span>
                                    <Select v-model="selectMonth1" class="select-time">
                                        <Option v-for="item in selectMonthList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </div>
                                <div style="float: left; margin-right: 0.1rem; margin-top: 0.2rem">
                                    <Select v-model="selectYear1" class="select-time">
                                        <Option v-for="item in selectYearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <span>~</span>
                                    <Select v-model="selectMonth2" class="select-time">
                                        <Option v-for="item in selectMonthList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </div>
                            </div>
                            <div v-if="selectType1 == '日'">
                                <label style="float: left">时间范围</label>
                                <div style="float: left; margin-right: 0.1rem;">
                                    <Select v-model="selectYear1" class="select-time">
                                        <Option v-for="item in selectYearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <span>~</span>
                                    <Select v-model="selectMonth1" class="select-time">
                                        <Option v-for="item in selectMonthList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <span>~</span>
                                    <Select v-model="selectDay1" class="select-time">
                                        <Option v-for="item in selectDayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </div>
                                <div style="float: right; margin-right: 0.24rem; margin-top: 0.2rem">
                                    <Select v-model="selectMonth2" class="select-time">
                                        <Option v-for="item in selectMonthList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <span>~</span>
                                    <Select v-model="selectDay2" class="select-time">
                                        <Option v-for="item in selectDayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="myChart1" :style="{width: '100%', height: '4rem'}"></div>
                    <div id="myChart2" :style="{width: '100%', height: '4rem'}"></div>
                </TabPane>
                <TabPane label="灌溉控制" name="name2" :disabled="!isLogin" @onClick="deviceContro">
                    <div class="search">
                        <div>
                            <Select v-model="deviceId" class="select">
                                <Option v-for="item in deviceList" :value="item.deviceId" :key="item.deviceId">{{ item.deviceName }}</Option>
                            </Select>
                        </div>
                        <div class="radioGroup">
                            <RadioGroup v-model="selectType2" class="radio">
                                <Radio value="1" label="周期"></Radio>
                                <Radio value="2" label="用水量"></Radio>
                            </RadioGroup>
                        </div>
                        <p style="text-align: left;font-size: 0.3rem;color: #00ccff;margin-left: 0.2rem;font-weight: 600;margin-top: 0.2rem;">日常开启时间设备</p>
                        <div class="timeGroup">
                            <div v-if="selectType2 == '周期'">
                                <div style="color: #ffffff;margin-top: 0.2rem;">
                                    <label style="padding-right: 0.2rem;">时间段一</label>
                                    <i-input v-model="startTime1" placeholder="请输入..." style="width: 70px"></i-input>
                                    <label style="padding: 0 0.1rem">至</label>
                                    <i-input v-model="endTime1" placeholder="请输入..." style="width: 70px"></i-input>
                                </div>
                                <div style="color: #ffffff;margin-top: 0.2rem;">
                                    <label style="padding-right: 0.2rem;">时间段二</label>
                                    <i-input v-model="startTime2" placeholder="请输入..." style="width: 70px"></i-input>
                                    <label style="padding: 0 0.1rem">至</label>
                                    <i-input v-model="endTime2" placeholder="请输入..." style="width: 70px"></i-input>
                                </div>
                                <div style="color: #ffffff;margin-top: 0.2rem;">
                                    <label style="padding-right: 0.2rem;">时间段三</label>
                                    <i-input v-model="startTime3" placeholder="请输入..." style="width: 70px"></i-input>
                                    <label style="padding: 0 0.1rem">至</label>
                                    <i-input v-model="endTime3" placeholder="请输入..." style="width: 70px"></i-input>
                                </div>
                                <div style="color: #ffffff;margin-top: 0.2rem;">
                                    <label style="padding-right: 0.68rem;">周期</label>
                                    <i-input v-model="ddIrrigateJob.cycle" placeholder="请输入..." style="width: 70px"></i-input>
                                    <label style="padding: 0 0.1rem">天一次</label>
                                </div>
                            </div>
                            <div v-if="selectType2 == '用水量'">
                                <div style="color: #ffffff;margin-top: 0.2rem;">
                                    <label style="padding-right: 0.2rem;">灌溉水量</label>
                                    <i-input v-model="ddIrrigateJob.waterNum" placeholder="请输入..." style="width: 70px"></i-input>
                                    <label style="padding: 0 0.1rem">t/m3</label>
                                </div>
                                <div style="color: #ffffff;margin-top: 0.2rem;">
                                    <label style="padding-right: 0.2rem;">开启时间</label>
                                    <i-input v-model="ddIrrigateJob.openTime" placeholder="请输入..." style="width: 70px"></i-input>
                                    <label style="padding: 0 0.1rem"></label>
                                </div>
                                <div style="color: #ffffff;margin-top: 0.2rem;">
                                    <label style="padding-right: 0.68rem;">周期</label>
                                    <i-input v-model="ddIrrigateJob.cycle" placeholder="请输入..." style="width: 70px"></i-input>
                                    <label style="padding: 0 0.1rem">天一次</label>
                                </div>
                            </div>
                        </div>

                        <p style="text-align: left;font-size: 0.3rem;color: #00ccff;margin-left: 0.2rem;font-weight: 600;margin-top: 0.2rem;">土壤系数设置</p>
                        <div style="color: #ffffff;margin-top: 0.2rem;">
                            <label style="padding-right: 0.68rem;">高于</label>
                            <i-input v-model="ddIrrigateJob.exceed" placeholder="请输入..." style="width: 70px"></i-input>
                            <label style="padding: 0 0.1rem">开启</label>
                        </div>
                        <div style="color: #ffffff;margin-top: 0.2rem;">
                            <label style="padding-right: 0.68rem;">低于</label>
                            <i-input v-model="ddIrrigateJob.under" placeholder="请输入..." style="width: 70px"></i-input>
                            <label style="padding: 0 0.1rem">关闭</label>
                        </div>
                        <div style="text-align: center;margin-top: 3rem;">
                            <Button  @click="saveIrrigateJob">确认</Button>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
    import https from '@/https.js'
    export default {
        name: "right",
        data() {
            return{
                waterMeter: {
                    total: null,
                    yesterday: null,
                },
                isLogin: true,
                startTime1: null,
                startTime2: null,
                startTime3: null,
                endTime1: null,
                endTime2: null,
                endTime3: null,
                ddIrrigateJob: {
                    cycle: 1
                },
                deviceList: [],
                deviceId: '000031',
                selectType1: '年',
                selectType2: '周期',
                selectYear1: '2019',
                selectYear2: '2019',
                selectMonth1: '07',
                selectMonth2: '07',
                selectDay1: '01',
                selectDay2: '29',
                selectHour1: '00:00',
                selectHour2: '20:00',
                selectYearList: [{value: '2019',label: '2019年' }],
                selectMonthList: [{value: '01',label: '1月' },{value: '02',label: '2月' },{value: '03',label: '3月' },{value: '04',label: '4月' },{value: '05',label: '5月' },{value: '06',label: '6月' },
                    {value: '07',label: '7月' },{value: '08',label: '8月' },{value: '09',label: '9月' },{value: '10',label: '10月' },{value: '11',label: '11月' },{value: '12',label: '12月' }],
                selectDayList: [{value: '01',label: '1日' },{value: '02',label: '2日' },{value: '03',label: '3日' },{value: '04',label: '4日' },{value: '05',label: '5日' },{value: '06',label: '6日' },
                    {value: '07',label: '7日' },{value: '08',label: '8日' },{value: '09',label: '9日' },{value: '10',label: '10日' },{value: '11',label: '11日' },{value: '12',label: '12日' },
                    {value: '13',label: '13日' },{value: '14',label: '14日' },{value: '15',label: '15日' },{value: '16',label: '16日' },{value: '17',label: '17日' },{value: '18',label: '18日' },
                    {value: '19',label: '19日' },{value: '20',label: '20日' },{value: '21',label: '21日' },{value: '22',label: '22日' },{value: '23',label: '23日' },{value: '24',label: '24日' },
                    {value: '25',label: '25日' },{value: '26',label: '26日' },{value: '27',label: '27日' },{value: '28',label: '28日' },{value: '29',label: '29日' },{value: '30',label: '30日' },{value: '31',label: '31日' }],
                selectHourList: [{value: '00:00',label: '00:00' },{value: '01:00',label: '01:00' },{value: '02:00',label: '02:00' },{value: '03:00',label: '03:00' },{value: '04:00',label: '04:00' },{value: '05:00',label: '05:00' },
                    {value: '06:00',label: '06:00' },{value: '07:00',label: '07:00' },{value: '08:00',label: '08:00' },{value: '09:00',label: '09:00' },{value: '10:00',label: '10:00' },{value: '11:00',label: '11:00' },
                    {value: '12:00',label: '12:00' },{value: '13:00',label: '13:00' },{value: '14:00',label: '14:00' },{value: '15:00',label: '15:00' },{value: '16:00',label: '16:00' },{value: '17:00',label: '17:00' },
                    {value: '18:00',label: '18:00' },{value: '19:00',label: '19:00' },{value: '20:00',label: '20:00' },{value: '21:00',label: '21:00' },{value: '22:00',label: '22:00' },{value: '23:00',label: '23:00' }],
                waterTotalNumList1: [{
                    createTime: null
                }],
                waterTotalNumList2: [],
                timeList1: [],
                timeList2: [],
                water: {
                    max: null,
                    maxTime: null,
                    min: null,
                    minTime: null,
                }
            }
        },
        created() {
            this.getSoliDeviceList();
            this.getTotalList();
            this.getHistroylist();
        },
        mounted() {
            //this.$chart.line1('chart1');
            var djAdminUser = JSON.parse(window.localStorage.getItem("djAdminUser"))
            if(djAdminUser != null && djAdminUser.userId != null && djAdminUser.userId != ''){
                this.isLogin = true
            }else {
                this.isLogin = false
            }
        },
        methods: {
            selectData() {
                console.log("222222222")
                this.getDeviceControlInfo();
            },
            getHistroylist() {
                var startTime = "";
                var endTime = "";
                if(this.selectType1 == '年'){
                    startTime = this.selectYear1
                    endTime = this.selectYear2
                }
                if(this.selectType1 == '月'){
                    startTime = this.selectYear1 + "-" + this.selectMonth1
                    endTime = this.selectYear2 + "-" + this.selectMonth2
                }

                if(this.selectType1 == '日'){
                    startTime = this.selectYear1 + "-" + this.selectMonth1 + "-"+this.selectDay1
                    endTime = this.selectYear1 + "-" + this.selectMonth2 + "-"+this.selectDay2
                }
                window.console.log(startTime)
                window.console.log(endTime)
                let params ={'startTime': startTime, 'endTime': endTime}
                https.fetchGet('/iot/data/v1/water/histroylist',params ).then((data) => {
                    window.console.log(data)
                    if(data.code == '00'){
                        var ddWaterMeterDataList = data.object.ddWaterMeterDataList
                        this.water = data.object.water

                        this.waterTotalNumList1 = []
                        for(var i=0;i<ddWaterMeterDataList.length;i++){
                            this.waterTotalNumList1[i] = ddWaterMeterDataList[i].num;

                            if(this.selectType1 == '年'){
                                this.timeList1[i] = ddWaterMeterDataList[i].createTime
                            }
                            if(this.selectType1 == '月'){
                                this.timeList1[i] = ddWaterMeterDataList[i].createTime
                            }
                            if(this.selectType1 == '日'){
                                this.timeList1[i] = ddWaterMeterDataList[i].createTime
                            }
                        }

                        var chart = data.object.chart

                        this.waterTotalNumList2 = []
                        for(var i=0;i<chart.length;i++){
                            this.waterTotalNumList2[i] = chart[i].num;

                            if(this.selectType1 == '年'){
                                this.timeList2[i] = chart[i].deviceName
                            }
                            if(this.selectType1 == '月'){
                                this.timeList2[i] = chart[i].deviceName
                            }
                            if(this.selectType1 == '日'){
                                this.timeList2[i] = chart[i].deviceName
                            }
                        }
                        this.drawLine();
                    }

                }).catch(err=>{
                        window.console.log(err)
                    }
                )

            },
            getTotalList() {
                let params ={}
                https.fetchGet('/iot/data/v1/water/TotalList',params ).then((data) => {
                    window.console.log(data)
                    if(data.code == '00'){

                        this.waterMeter = data.object.WaterMeter
                    }
                    this.getDeviceControlInfo();
                }).catch(err=>{
                        window.console.log(err)
                    }
                )
            },
            deviceContro() {
              window.console.log(2222)
            },
            getSoliDeviceList() {
                let params ={'projectId': 'dp97165035044120_137', 'typeId': '00003', 'pager': '1','limit':'20'}
                https.fetchGet('/iot/device/v1/list',params ).then((data) => {
                    window.console.log(data)
                    if(data.code == '00'){
                        this.deviceList = data.object.ddDeviceList
                    }
                    this.getDeviceControlInfo();
                }).catch(err=>{
                        window.console.log(err)
                    }
                )
            },
            getDeviceControlInfo() {
                let params ={'deviceId': this.deviceId}
                https.fetchGet('/iot/data/v1/water/control/info',params ).then((data) => {
                    if(data.code == '00'){
                        this.ddIrrigateJob = data.object.ddIrrigateJob
                        if(this.ddIrrigateJob.type == 1){
                            this.selectType2 = '周期'
                        }
                        if(this.ddIrrigateJob.type == 2){
                            this.selectType2 = '用水量'
                        }
                        window.console.log(this.ddIrrigateJob.ddIrrigateQuartzList)
                        this.startTime1 = this.ddIrrigateJob.ddIrrigateQuartzList[0].startTime
                        this.startTime2 = this.ddIrrigateJob.ddIrrigateQuartzList[1].startTime
                        this.startTime3 = this.ddIrrigateJob.ddIrrigateQuartzList[2].startTime
                        this.endTime1 = this.ddIrrigateJob.ddIrrigateQuartzList[0].endTime
                        this.endTime2 = this.ddIrrigateJob.ddIrrigateQuartzList[1].endTime
                        this.endTime3 = this.ddIrrigateJob.ddIrrigateQuartzList[2].endTime
                    }
                }).catch(err=>{
                        window.console.log(err)
                    }
                )
            },
            saveIrrigateJob() {
                var type = 1;
                if(this.selectType2 = '周期'){
                    type = 1;
                }
                if(this.selectType2 = '用水量'){
                    type = 2;
                }
                let params ={'deviceId': this.deviceId, "type":type,"cycle":this.ddIrrigateJob.cycle,"waterNum":this.ddIrrigateJob.waterNum,"openTime": this.ddIrrigateJob.openTime,"exceed": this.ddIrrigateJob.exceed,"under": this.ddIrrigateJob.under}
                https.fetchPost('/iot/data/v1/water/control/update',params ).then((data) => {
                    if(data.code == '00'){
                        this.getDeviceControlInfo();
                        this.getSoliDeviceList();
                    }
                }).catch(err=>{
                        window.console.log(err)
                    }
                )
            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
                let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
                // 绘制图表
                myChart1.setOption({
                    title: [
                        {
                            text: '最高值：' + this.water.max,
                            left: '50%',
                            top: '12%',
                            textStyle: {color: '#00ccff', fontSize: 12}
                        },
                        {
                            text: '最低值：' + this.water.min,
                            left: '75%',
                            top: '12%',
                            textStyle: {color: '#fef235', fontSize: 12}
                        }
                    ],
                    tooltip: {},
                    xAxis: {
                        //去除刻度线
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color: '#00ccff',
                            }
                        },
                        data: this.timeList1
                    },
                    yAxis: {
                        // 去除网格线
                        splitLine: {
                            show: false
                        },
                        // 去除刻度线
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color: '#00ccff',
                            }
                        },
                    },
                    series: [{
                        name: '用水量',
                        color: ['#75ff0f'],
                        symbol: 'none',  //取消折点圆圈
                        smooth: false,  //折线平滑
                        type: 'line',
                        lineStyle: {normal: {width: 1}},
                        data: this.waterTotalNumList1,
                        markLine: {
                            symbol: "none",
                            label: {
                                position: "end"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                            },
                            data: [
                                [
                                    {name: this.water.min, coord: [this.water.minTime, 0]},
                                    {coord: [this.water.minTime, this.water.min]},
                                    {lineStyle: {color: "#fef235"}}
                                ],
                                [
                                    {name: this.water.max, coord: [this.water.maxTime, 0]},
                                    {coord: [this.water.maxTime, this.water.max]},
                                    {lineStyle: {color: "#00ccff"}}
                                ]
                            ]
                        }
                    }]
                });
                myChart2.setOption({
                    title: [
                        {
                            text: '各灌溉区总耗水量对比分析',
                            top: '10%',
                            textStyle: {color: '#00ffff', fontSize: 14}
                        }
                    ],
                    tooltip: {},
                    xAxis: {
                        //去除刻度线
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                type: 'solid',
                                color: '#ffffff',
                            }
                        },
                        data: this.timeList2

                    },
                    yAxis: {
                        // 去除网格线
                        splitLine: {
                            show: false
                        },
                        // 去除刻度线
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel : {
                            formatter: function(){
                                return "";
                            }
                        }
                    },
                    series: [{
                        name: '温度',
                        color: ['#75ff0f'],
                        type: 'bar',
                        barWidth : 20,//柱图宽度
                        itemStyle: {
                            normal: {
                                color:function(params) {
                                    // build a color map as your need.
                                    var colorList = [
                                        '#0fadff','#0fffd5','#75ff0f','#ffeb0f'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                label:{
                                    show: true,
                                    position: 'top',
                                    textStyle: { //数值样式
                                        color: '#ffffff',
                                        fontSize: 14,
                                        fontWeight: 600
                                    }
                                },
                                width: 1
                            }
                        },
                        data: this.waterTotalNumList2,
                    }]
                });
            }
        }
    }
</script>

<style scoped>
    .info{
        height: 80%;
        width: 8rem;
        background: #01071f35;
        /* z-irrigate: 10000; */
        right: 0.6rem;
        top: 10%;
        position: absolute;
    }
    .analyze{
        height: 90%;
        width: 90%;
        margin: 5%;
        background: #002e5c53;
    }

    >>>.ivu-tabs-nav-container{
        color: #ffffff;
    }

    .search {
        margin: 0 0.3rem;
        text-align: left;
        height: 2.8rem;
    }


    .search .select{
        width: 2.4rem;
    }

    .search .select-time{
        width: 1.5rem;
    }

    >>>.ivu-select-selection{
        color: #ffffff;
        background-color: #116fbd60 !important;
        border-radius: 0 !important;
    }

    >>>.ivu-btn {
        color: #ffffff;
        margin-left: 0.4rem;
        background-color: #116fbd60 !important;
    }
    .search .radioGroup{
        color: #ffffff;
    }

    .search .radioGroup label {
        padding: 0.4rem 0.4rem 0.4rem 0;
        font-size: 0.2rem;
        margin: 0;
    }

    .search .radio {
        font-weight: 600;
        margin-top: -0.1rem;
    }

    .search .timeGroup{
        color: #ffffff;
    }

    .search .timeGroup label {
        padding: 0.1rem 0.4rem 0.4rem 0;
        font-size: 0.2rem;
        margin: 0;
    }

    .search .timeGroup span {
        padding: 0 0.05rem;
    }
</style>
