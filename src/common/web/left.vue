<template>
    <div class="menu">
        <div class="span" @click="selectMenu(1)">
            <router-link to="/environment">
                <img v-if="menuNum == 2" src="../../assets/menu10.png">
                <img v-if="menuNum == 1" src="../../assets/menu11.png">
            </router-link>

        </div>
        <div class="span" @click="selectMenu(2)">
            <router-link to="/irrigate">
                <img v-if="menuNum == 1" src="../../assets/menu20.png">
                <img v-if="menuNum == 2" src="../../assets/menu21.png">
            </router-link>

        </div>
        <div class="span" @click="selectMenu(3)">
            <router-link to="/curing">
                <img v-if="menuNum == 1" src="../../assets/menu31.png">
                <img v-if="menuNum == 2" src="../../assets/menu30.png">
            </router-link>

        </div>
    </div>
</template>

<script>
    export default {
        name: "left",
        data() {
            return{
                menuNum: 1
            }
        },
        methods:{
            selectMenu(menu) {
                this.menuNum = menu
                //window.console.log(menu)
            }
        }

    }
</script>

<style scoped>
    .menu{
        height: 97%;
        width: 6.6rem;
        background: #00000060;
        /* z-irrigate: 10000; */
        top: 3%;
        position: absolute;
    }
    .menu .span{
        margin-top: 0.5rem;
        width: 98%;
        height: 2rem;
        margin-bottom: 0.3rem;
    }

    .menu .span:first-child{
        margin-top: 0.5rem;
    }
    .menu img {
        margin-top: 1rem;
        width: 6rem;
    }
</style>
