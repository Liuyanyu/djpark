<template>
    <div class="info">
        <div class="analyze">
            <div class="soil-model">
                <div class="title">
                    <span>土壤监测指标分析</span>
                    <img src="../../../assets/loading.png">
                </div>
                <div class="search">
                    <div style="color: #ffffff">
                        <Select v-model="deviceId" class="select">
                            <Option v-for="item in sensorList" :value="item.deviceId" :key="item.deviceId">{{ item.deviceName }}</Option>
                        </Select>
                        <Button icon="ios-search" @click="selectData">查询</Button>
                    </div>
                    <div class="radioGroup">
                        <label>时间间隔</label>
                        <RadioGroup v-model="selectType" class="radio">
                            <Radio value="1" label="小时"></Radio>
                            <Radio value="2" label="日"></Radio>
                            <Radio value="3" label="月"></Radio>
                        </RadioGroup>
                    </div>
                    <div class="timeGroup">
                        <div v-if="selectType == '小时'">
                            <label>时间范围</label>
                            <div style="float: right; margin-right: 0.1rem;">
                                <Select v-model="selectYear" class="select-time">
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
                            <div style="float: right; margin-right: 0.1rem;margin-top: 0.2rem;">
                                <Select v-model="selectHour1" class="select-time">
                                    <Option v-for="item in selectHourList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <span>~</span>
                                <Select v-model="selectHour2" class="select-time">
                                    <Option v-for="item in selectHourList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
                        </div>

                        <div v-if="selectType == '日'">
                            <label>时间范围</label>
                            <div style="float: right; margin-right: 0.1rem;">
                                <Select v-model="selectYear" class="select-time">
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
                            <div style="float: right; margin-right: 0.1rem;margin-top: 0.2rem;">
                                <Select v-model="selectMonth2" class="select-time">
                                    <Option v-for="item in selectMonthList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <span>~</span>
                                <Select v-model="selectDay2" class="select-time">
                                    <Option v-for="item in selectDayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
                        </div>

                        <div v-if="selectType == '月'">
                            <label>时间范围</label>
                            <div style="float: right; margin-right: 0.1rem;">
                                <Select v-model="selectYear" class="select-time">
                                    <Option v-for="item in selectYearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <span>~</span>
                                <Select v-model="selectMonth1" class="select-time">
                                    <Option v-for="item in selectMonthList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <span>~</span>
                                <Select v-model="selectMonth2" class="select-time">
                                    <Option v-for="item in selectMonthList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div id="myChart1" :style="{width: '100%', height: '4rem'}"></div>
            <div id="myChart2" :style="{width: '100%', height: '4rem'}"></div>
            <div id="myChart3" :style="{width: '100%', height: '4rem'}"></div>
        </div>
    </div> 
</template>

<script>
    import https from '@/https.js'
    export default {
        name: "right",
        data() {
            return{
                nowTime: '',
                sensorList: [],
                ddSoilDataList: [],
                soliData: null,
                timeList: [],
                temperatureList: [],
                humidityList: [],
                salinityList: [],
                selectYearList: [{value: '2019',label: '2019年' }],
                selectMonthList: [{value: '01',label: '1月' },{value: '02',label: '2月' },{value: '03',label: '3月' },{value: '04',label: '4月' },{value: '05',label: '5月' },{value: '06',label: '6月' },
                                    {value: '07',label: '7月' },{value: '08',label: '8月' },{value: '09',label: '9月' },{value: '10',label: '10月' },{value: '11',label: '11月' },{value: '12',label: '12月' }],
                selectDayList: [{value: '01',label: '1日' },{value: '02',label: '2日' },{value: '03',label: '3日' },{value: '04',label: '4日' },{value: '05',label: '5日' },{value: '06',label: '6日' },
                    {value: '07',label: '7日' },{value: '08',label: '8日' },{value: '09',label: '9日' },{value: '10',label: '10日' },{value: '11',label: '11日' },{value: '12',label: '12日' },
                    {value: '13',label: '13日' },{value: '14',label: '14日' },{value: '15',label: '15日' },{value: '16',label: '16日' },{value: '17',label: '17日' },{value: '18',label: '18日' },
                    {value: '19',label: '19日' },{value: '20',label: '20日' },{value: '21',label: '21日' },{value: '22',label: '22日' },{value: '23',label: '23日' },{value: '24',label: '24日' },
                    {value: '25',label: '25日' },{value: '26',label: '26日' },{value: '27',label: '27日' },{value: '28',label: '28日' },{value: '29',label: '29日' },{value: '30',label: '30日' },
                    {value: '31',label: '31日' }],
                selectHourList: [{value: '00:00',label: '00:00' },{value: '01:00',label: '01:00' },{value: '02:00',label: '02:00' },{value: '03:00',label: '03:00' },{value: '04:00',label: '04:00' },{value: '05:00',label: '05:00' },
                    {value: '06:00',label: '06:00' },{value: '07:00',label: '07:00' },{value: '08:00',label: '08:00' },{value: '09:00',label: '09:00' },{value: '10:00',label: '10:00' },{value: '11:00',label: '11:00' },
                    {value: '12:00',label: '12:00' },{value: '13:00',label: '13:00' },{value: '14:00',label: '14:00' },{value: '15:00',label: '15:00' },{value: '16:00',label: '16:00' },{value: '17:00',label: '17:00' },
                    {value: '18:00',label: '18:00' },{value: '19:00',label: '19:00' },{value: '20:00',label: '20:00' },{value: '21:00',label: '21:00' },{value: '22:00',label: '22:00' },{value: '23:00',label: '23:00' }],
                deviceId: '0000210',
                selectYear: '2019',
                selectMonth1: '07',
                selectMonth2: '07',
                selectDay1: '01',
                selectDay2: '29',
                selectHour1: '00:00',
                selectHour2: '20:00',
                selectType: '小时',
                maxtemperatureTime: '',
                mintemperatureTime: '',
                maxhumidityTime: '',
                minhumidityTime: '',
                minsalinityTime: '',
                maxsalinityTime: '',
            }
        },
        created() {
            this.getSoliDeviceList();
        },
        mounted() {
            //this.$chart.line1('chart1');

        },
        methods: {
            selectData() {
                var startTime = "";
                var endTime = "";
                if(this.selectType == '小时'){
                    startTime = this.selectYear + "-" + this.selectMonth1 + "-"+this.selectDay1 + " " + this.selectHour1 + ":00"
                    endTime = this.selectYear + "-" + this.selectMonth1 + "-"+this.selectDay1 + " " + this.selectHour2 + ":00"
                }
                if(this.selectType == '日'){
                    startTime = this.selectYear + "-" + this.selectMonth1 + "-"+this.selectDay1
                    endTime = this.selectYear + "-" + this.selectMonth2 + "-"+this.selectDay2
                }
                if(this.selectType == '月'){
                    startTime = this.selectYear + "-" + this.selectMonth1
                    endTime = this.selectYear + "-" + this.selectMonth2
                }
                window.console.log(startTime)
                window.console.log(endTime)
                let params ={'deviceId': this.deviceId, 'startTime': startTime, 'endTime':endTime}
                https.fetchGet('/iot/data/v1/soil/selectTime',params ).then((data) => {
                    if(data.code == '00'){
                        this.ddSoilDataList = data.object.ddSoilDataList
                        window.console.log("---" + this.ddSoilDataList)

                        this.salinityList = []
                        this.temperatureList = []
                        this.humidityList = []
                        this.timeList = []
                        for(var i=0;i<this.ddSoilDataList.length;i++){
                           this.salinityList[i] = this.ddSoilDataList[i].salinity;
                           this.temperatureList[i] = this.ddSoilDataList[i].temperature;
                           this.humidityList[i] = this.ddSoilDataList[i].humidity;

                           if(this.selectType == '小时'){
                               this.timeList[i] = this.ddSoilDataList[i].createTime.substr(11,2) + ":00";
                           }
                           if(this.selectType == '日'){
                               this.timeList[i] = this.ddSoilDataList[i].createTime.substr(5,5);
                           }
                           if(this.selectType == '月'){
                               this.timeList[i] = this.ddSoilDataList[i].createTime.substr(0,7);
                           }
                        }
                        console.log(this.salinityList)
                        this.soliData = data.object.soliData
                        //window.console.log(this.soliData)
                        if(this.selectType == '小时'){
                            this.maxsalinityTime = this.soliData.maxsalinityTime.substr(11,2) + ":00"
                            this.minsalinityTime = this.soliData.minsalinityTime.substr(11,2) + ":00"
                            console.log("-------" + this.minsalinityTime)
                            this.maxhumidityTime = this.soliData.maxhumidityTime.substr(11,2) + ":00"
                            this.minhumidityTime = this.soliData.minhumidityTime.substr(11,2) + ":00"
                            this.maxtemperatureTime = this.soliData.maxtemperatureTime.substr(11,2) + ":00"
                            this.mintemperatureTime = this.soliData.mintemperatureTime.substr(11,2) + ":00"
                        }
                        if(this.selectType == '日'){
                            this.maxsalinityTime = this.soliData.maxsalinityTime.substr(5,5)
                            this.minsalinityTime = this.soliData.minsalinityTime.substr(5,5)
                            this.maxhumidityTime = this.soliData.maxhumidityTime.substr(5,5)
                            this.minhumidityTime = this.soliData.minhumidityTime.substr(5,5)
                            this.maxtemperatureTime = this.soliData.maxtemperatureTime.substr(5,5)
                            this.mintemperatureTime = this.soliData.mintemperatureTime.substr(5,5)
                        }
                        if(this.selectType == '月'){
                            this.maxsalinityTime = this.soliData.maxsalinityTime.substr(0,7)
                            this.minsalinityTime = this.soliData.minsalinityTime.substr(0,7)
                            this.maxhumidityTime = this.soliData.maxhumidityTime.substr(0,7)
                            this.minhumidityTime = this.soliData.minhumidityTime.substr(0,7)
                            this.maxtemperatureTime = this.soliData.maxtemperatureTime.substr(0,7)
                            this.mintemperatureTime = this.soliData.mintemperatureTime.substr(0,7)
                        }
                        this.drawLine();
                    }
                }).catch(err=>{
                        window.console.log(err)
                    }
                )

            },
            getSoliDeviceList() {
                let params ={'projectId': 'dp97165035044120_137', 'typeId': '00002', 'pager': '1','limit':'20'}
                https.fetchGet('/iot/device/v1/list',params ).then((data) => {
                    //window.console.log(data)
                    if(data.code == '00'){
                        this.sensorList = data.object.ddDeviceList
                        this.nowTime = data.object.nowTime
                        this.selectYear = this.nowTime.substr(0,4)
                        this.selectMonth1 = this.nowTime.substr(5,2)
                        this.selectMonth2 = this.nowTime.substr(5,2)
                        this.selectDay1 = this.nowTime.substr(8,2)
                        this.selectDay2 = this.nowTime.substr(8,2)
                        this.selectHour2 = this.nowTime.substr(11,2) + ":00"

                        this.selectData();
                    }
                }).catch(err=>{
                        window.console.log(err)
                    }
                )
            },
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
                let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
                let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
                // 绘制图表
                myChart1.setOption({
                    title: [
                        {
                            text: '土壤盐度指标分析',
                            top:'10%',
                            textStyle: {color: '#00ffff',fontSize:14}
                        },
                        {
                            text: '最高值：' + this.soliData.maxsalinity,
                            left:'50%',
                            top:'12%',
                            textStyle: {color: '#00ccff',fontSize:12}
                        },
                        {
                            text: '最低值：' + this.soliData.minsalinity,
                            left:'75%',
                            top:'12%',
                            textStyle: {color: '#fef235',fontSize:12}
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
                        data: this.timeList
                    },
                    yAxis: {
                        // 去除网格线
                        splitLine:{
                            show: false
                        },
                        // 去除刻度线
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color:'#00ccff',
                            }
                        },
                    },
                    series: [{
                        name: '盐度',
                        color:['#75ff0f'],
                        symbol: 'none',  //取消折点圆圈
                        smooth: false,  //折线平滑
                        type:'line',
                        lineStyle:{normal:{width: 1}},
                        data: this.salinityList,
                        markLine: {
                            symbol:"none",
                            label:{
                                position:"end"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                            },
                            data: [
                                [
                                    {name: this.soliData.minsalinity,coord: [this.minsalinityTime, 0]},
                                    {coord: [this.minsalinityTime, this.soliData.minsalinity]},
                                    {lineStyle: {color:"#fef235"}}
                                ],
                                [
                                    {name: this.soliData.maxsalinity,coord: [this.maxsalinityTime, 0]},
                                    {coord: [this.maxsalinityTime, this.soliData.maxsalinity]},
                                    {lineStyle: {color:"#00ccff"}}
                                ]
                            ]
                        }
                    }]
                });
                myChart2.setOption({
                    title: [
                        {
                            text: '土壤温度指标分析',
                            top:'10%',
                            textStyle: {color: '#00ffff',fontSize:14}
                        },
                        {
                            text: '最高值：' + this.soliData.maxtemperature,
                            left:'50%',
                            top:'12%',
                            textStyle: {color: '#00ccff',fontSize:12}
                        },
                        {
                            text: '最低值：' + this.soliData.mintemperature,
                            left:'75%',
                            top:'12%',
                            textStyle: {color: '#fef235',fontSize:12}
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
                        data: this.timeList
                    },
                    yAxis: {
                        // 去除网格线
                        splitLine:{
                            show: false
                        },
                        // 去除刻度线
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color:'#00ccff',
                            }
                        },
                    },
                    series: [{
                        name: '温度',
                        color:['#75ff0f'],
                        symbol: 'none',  //取消折点圆圈
                        smooth: false,  //折线平滑
                        type:'line',
                        lineStyle:{normal:{width: 1}},
                        data: this.temperatureList,
                        markLine: {
                            symbol:"none",
                            label:{
                                position:"end"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                            },
                            data: [
                                [
                                    {name: this.soliData.mintemperature,coord: [this.mintemperatureTime, 0]},
                                    {coord: [this.mintemperatureTime, this.soliData.mintemperature]},
                                    {lineStyle: {color:"#fef235"}}
                                ],
                                [
                                    {name: this.soliData.maxtemperature,coord: [this.maxtemperatureTime, 0]},
                                    {coord: [this.maxtemperatureTime, this.soliData.maxtemperature]},
                                    {lineStyle: {color:"#00ccff"}}
                                ]
                            ]
                        }
                    }]
                });
                myChart3.setOption({
                    title: [
                        {
                            text: '土壤湿度指标分析',
                            top:'10%',
                            textStyle: {color: '#00ffff',fontSize:14}
                        },
                        {
                            text: '最高值：' + this.soliData.maxhumidity,
                            left:'50%',
                            top:'12%',
                            textStyle: {color: '#00ccff',fontSize:12}
                        },
                        {
                            text: '最低值：' + this.soliData.minhumidity,
                            left:'75%',
                            top:'12%',
                            textStyle: {color: '#fef235',fontSize:12}
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
                        data: this.timeList
                    },
                    yAxis: {
                        // 去除网格线
                        splitLine:{
                            show: false
                        },
                        // 去除刻度线
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color:'#00ccff',
                            }
                        },
                    },
                    series: [{
                        name: '湿度',
                        color:['#75ff0f'],
                        symbol: 'none',  //取消折点圆圈
                        smooth: false,  //折线平滑
                        type:'line',
                        lineStyle:{normal:{width: 1}},
                        data: this.humidityList,
                        markLine: {
                            symbol:"none",
                            label:{
                                position:"end"          //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                            },
                            data: [
                                [
                                    {name: this.soliData.minhumidity,coord: [this.minhumidityTime, 0]},
                                    {coord: [this.minhumidityTime, this.soliData.minhumidity]},
                                    {lineStyle: {color:"#fef235"}}
                                ],
                                [
                                    {name: this.soliData.maxhumidity,coord: [this.maxhumidityTime, 0]},
                                    {coord: [this.maxhumidityTime, this.soliData.maxhumidity]},
                                    {lineStyle: {color:"#00ccff"}}
                                ]
                            ]
                        }
                    }]
                });
            }
        }
    }
</script>

<style scoped>
    .info{
        height: 85%;
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
    .soil-model{
        height: 5rem;
    }
    .soil-model .title{
        text-align: left;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.4rem;
        color: #00ffff;
        border-bottom: 0.001rem solid #00ccff;
    }

    .soil-model .title span{
        font-weight: 600;
        margin-left: 0.1rem;
    }

    .soil-model .title img{
        margin-left: 0.5rem;
    }

    .search {
        margin: 0.3rem;
        text-align: left;
        margin-bottom: 1.5rem;
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


    .search .radio {
        font-weight: 600;
        margin-top: -0.1rem;
    }
    #myChart2, #myChart3{
        margin-top: -0.8rem;
    }

</style>
