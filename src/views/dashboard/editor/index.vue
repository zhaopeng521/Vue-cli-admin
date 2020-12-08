<template>
  <div class="dashboard-editor-container">

    <div class="clearfix">
<!--      <pan-thumb :image="avatar" style="float: left">-->
<!--        Your roles:-->
<!--        <span class="pan-info-roles">{{ siteName }}</span>-->
<!--      </pan-thumb>-->
      <div class="info-container" v-if="idShow">
        <span style="font-size:20px;padding-top:20px;display:inline-block;">该编号可用于企业进件或分润设置！进件编号为：</span>
        <span class="id-h1">{{id}}</span>
      </div>
    </div>
    <div>
      <img :src="emptyGif" class="emptyGif">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {cookieData} from '@/utils/auth';
import PanThumb from '@/components/PanThumb'
import GithubCorner from '@/components/GithubCorner'

export default {
  name: 'DashboardEditor',
  components: { PanThumb, GithubCorner },
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3',
      avatar:"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      id:'--',
      siteName:'',
      idShow:false,
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    let cJson= cookieData();
    console.log(cJson)
    this.siteName = cJson['tbl'][0]['siteName'];
    if(cJson['tbl'][0]['siteType']!=0){
      if(!cJson['tbl'][0]['merchantNo']){
        this.idShow = true;
        this.id = cJson['tbl'][0]['siteId']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
  .id-h1{
    font-weight: 500;
    font-style: normal;
    font-size: 24px;
    color: #ED6D00;
  }
</style>
