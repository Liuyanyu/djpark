<template>
    <div class="monitor">

        <div class="sensor sensor_left" v-for="(item,index) in list" v-if="item.subsetId < 16" :key="index" :style="{left:item.latitude, top:item.longitude}">
            <p class="title">{{item.deviceName}}</p>

            <p class="salinity">土壤盐度：{{item.ddSoilData.salinity}}</p>
            <p class="humidity">土壤湿度：{{item.ddSoilData.humidity}}</p>
            <p class="temperature">土壤温度：{{item.ddSoilData.temperature}}</p>
        </div>

        <div class="sensor sensor_right" v-for="(item,index) in list" v-if="item.subsetId > 15" :key="index" :style="{left:item.latitude, top:item.longitude}">
            <p class="title">{{item.deviceName}}</p>

            <p class="salinity">土壤盐度：{{item.ddSoilData.salinity}}</p>
            <p class="humidity">土壤湿度：{{item.ddSoilData.humidity}}</p>
            <p class="temperature">土壤温度：{{item.ddSoilData.temperature}}</p>
        </div>
        <webRight/>
    </div>

</template> 

<script>
    import webRight from '@/page/web/environment/right.vue'
    import https from '@/https.js'
    export default {
        name: "index",
        components: {
            webRight
        },
        data() {
            return {
                list:[]
            }
        },
        created() {
            this.getSoliDeviceList();
        },
        methods: {
            getSoliDeviceList() {
                let params ={'projectId': 'dp97165035044120_137', 'typeId': '00002', 'pager': '1','limit':'20'}
                https.fetchGet('/iot/device/v1/list',params ).then((data) => {
                    window.console.log(data)
                    if(data.code == '00'){
                        this.list = data.object.ddDeviceList
                    }
                }).catch(err=>{
                    window.console.log(err)
                    }
                 )
            }
        }
    }
</script>

<style scoped>
    .sensor{
        position: absolute;
        width: 4rem;
        height: 3rem;
        background-size: contain;
        background-repeat: no-repeat;
        text-align: left;
    }
    .sensor_left {
        background-image: url("../../../assets/sensor_l.png");
    }
    .sensor_right {
        background-image: url("../../../assets/sensor_r.png");
    }
    .sensor p{
        margin: 0;
        padding: 0;
        margin-left: 0.8rem;

    }
    .sensor .title{
        line-height: 0.8rem;
        font-size: 0.3rem;
        color: #00ffff;
        font-weight: 600;
        padding-bottom: 0;
        margin-bottom: 0;
    }
    .sensor .salinity,.humidity,.temperature{
        line-height: 0.37rem;
        font-size: 0.26rem;
        color: #ffffff;
    }

</style>
