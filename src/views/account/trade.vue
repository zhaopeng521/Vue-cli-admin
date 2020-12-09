<template>
  <div>
    <div v-show="!isDetail">
      <div class="form-top">
        <div class="form-left">
          <div class="t-li">
            <div class="t-li-item">
              <div class="lab-title">订单状态</div>
              <div>
                <el-radio-group v-model="form.order_status">
                  <el-radio :label="''">全部交易</el-radio>
                  <el-radio :label="'SUCCESS'">交易成功</el-radio>
                  <el-radio :label="'PROCESSING'">交易进行中</el-radio>
                  <el-radio :label="'FAIL'">交易失败</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div v-show="queryLiShow" class="t-li">
            <div class="t-li-item">
              <div class="lab-title">订单创建时间</div>
              <div>
                <el-radio-group v-model="form.identifying">
                  <el-radio :label="'0'">近1周</el-radio>
                  <el-radio :label="'1'">近1个月</el-radio>
                  <el-radio :label="'2'">近3个月</el-radio>
                  <el-radio :label="'3'">近半年</el-radio>
                  <el-radio :label="''">具体时间</el-radio>
                </el-radio-group>
                <el-date-picker class="time-range"
                                v-model="arrTime"
                                type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div v-show="queryLiShow" class="t-li">
            <div class="t-li-item">
              <div class="lab-title">支付类型</div>
              <el-select class="m-r-20" v-model="form.pay_type" placeholder="请选择">
                <el-option
                        v-for="item in payOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="t-li-item">
              <div v-if="accountType == '0'" class="lab-title">用户筛选</div>
              <el-select v-if="accountType == '0'" class="m-r-20" clearable v-model="form.selType" placeholder="请选择">
                <el-option
                        v-for="item in selTypeOptions"
                        :key="item.merchantShortName"
                        :label="item.merchantShortName"
                        :value="item.merchantShortName">
                </el-option>
              </el-select>
            </div>

            <div class="t-li-item">
              <div class="lab-title">
                交易单号
              </div>
              <el-input  maxlength="120" class="m-r-20 form-inp" v-model="form.sto_order_main_no" clearable>
              </el-input>
            </div>
            <div class="t-li-item">
              <div class="lab-title">
                支付方式
              </div>
              <el-select class="m-r-20" v-model="form.pay_mode" placeholder="请选择">
                <el-option
                        label="线上支付"
                        value="线上支付">
                </el-option>
                <el-option
                        label="线下支付"
                        value="线下支付">
                </el-option>
              </el-select>
            </div>
            <div class="t-li-item">
              <div class="lab-title">
                支付订单号
              </div>
              <el-input  maxlength="120" class="m-r-20 form-inp" v-model="form.bf_pay_order_no" clearable>
              </el-input>
            </div>
            <div class="m-r-20 t-li-item" v-if="accountType == '0'">
              <div class="lab-title">
                系统来源
              </div>
              <el-select v-model="form.paySource" clearable>
                <el-option
                        v-for="item in sourceOp"
                        :key="item.platformNm"
                        :label="item.platformDes"
                        :value="item.platformNm">
                </el-option>
              </el-select>
            </div>
            <div class="t-li-item">
              <div class="lab-title">订单金额</div>
              <el-input  maxlength="120" class="money-inp" v-model="form.biginprice" clearable>
              </el-input>
              <div class="to-line"></div>
              <el-input  maxlength="120" class="money-inp" v-model="form.endprice" clearable>
              </el-input>
            </div>
          </div>

        </div>
        <div class="btn-box">
          <div class="query">
            <el-button @click="queryLiShow=!queryLiShow" type="text">{{queryLiShow?'收起':'展开'}}<i class="el-icon-arrow-down" v-show="!queryLiShow"></i>
              <i class="el-icon-arrow-up" v-show="queryLiShow"></i></el-button>
            <el-button class="btn-handle" @click="query" type="primary">查询</el-button>
          </div>
        </div>
      </div>
      <div class="acc-table">
        <div class="table-btn">
            <el-button @click="download" type="primary">导出</el-button>

        </div>
        <el-table
          :data="tableData" max-height="500"
          border
          style="width: 100%">
          <el-table-column v-if="accountType == '0'"
            prop="merchantShortName"
            label="用户名称"
            width="200">
          </el-table-column>
          <el-table-column
                  prop="sto_order_main_no"
                  label="交易单号"
                  width="200">
          </el-table-column>
          <el-table-column
            prop="pay_mode"
            label="支付方式">
          </el-table-column>
          <el-table-column
            prop="bf_pay_order_no"
            label="支付订单号"
            width="250">
          </el-table-column>
          <el-table-column
            prop="pay_type"
            label="支付类型"
            width="100">
            <template slot-scope="scope">{{ scope.row.pay_type|enTozh }}</template>
          </el-table-column>
          <el-table-column
            prop="count_price"
            label="订单金额">
          </el-table-column>
          <el-table-column
            prop="created_time"
            label="创建时间" width="200">
          </el-table-column>
          <el-table-column
                  prop="orderAmt"
                  label="成功金额" width="100">
          </el-table-column>
          <el-table-column
            prop="finished_date" width="200"
            label="完成时间">
            <template slot-scope="scope">{{ scope.row.finished_date||'----' }}</template>
          </el-table-column>
          <el-table-column
            prop="order_status"
            label="订单状态">
            <template slot-scope="scope">{{ scope.row.order_status|backType }}</template>
          </el-table-column>
          <el-table-column
            prop="cost"
            label="支付手续费" width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="detail(scope.row)" type="text" size="small">查看</el-button>
              <!-- <el-button type="text" size="small">编辑</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="m-t-20" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="page.page" :page-sizes="[10,20,50,100]" :page-size="page.size" layout="total,sizes,prev, pager, next, jumper"
                       :total="page.total">
        </el-pagination>
      </div>
    </div>
    <div v-show="isDetail">
      <div class="detail-box">
        <div>
          <el-button type="text" icon="el-icon-back" @click="isDetail=false">返回</el-button>
        </div>
        <div class="top">
          <div class="item-flex">
            <div class="lab-title">交易单号:</div>
            <div>{{stoPayCheckResponse.sto_order_main_no}}</div>
          </div>
          <div class="item-flex">
            <div class="lab-title">支付订单号:</div>
            <div>{{stoPayCheckResponse.bf_pay_order_no}}</div>
          </div>
          <div class="item-flex">
            <div class="lab-title">订单金额:</div>
            <div>{{stoPayCheckResponse.count_price}}元</div>
          </div>
          <div class="item-flex">
            <div class="lab-title">订单状态:</div>
            <div>{{stoPayCheckResponse.order_status | backType}}</div>
          </div>
        </div>
        <div class="acc-table">
          <el-table
            :data="stoPayOrderResponse"
            border
            style="width: 100%">
            <el-table-column
              prop="merchant_no"
              label="商户号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="merchant_short_name"
              label="用户名称">
            </el-table-column>
            <el-table-column
              prop="finished_date"
              label="支付成功时间"
              width="220">
            </el-table-column>
            <el-table-column
              prop="source_name"
              label="付款方姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="bank_name"
              label="银行名称"
              width="100">
            </el-table-column>
            <el-table-column
              prop="acc_card_no"
              label="银行卡号">
            </el-table-column>
            <el-table-column
              prop="pay_mode"
              label="支付方式" width="200">
            </el-table-column>
            <el-table-column
              prop="pay_source" width="200"
              label="支付渠道">
            </el-table-column>
            <!-- <el-table-column
              prop="order_status"
              label="分润方">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="费率类型">
            </el-table-column> -->
          </el-table>
          <div class="table-lab">
            <span class="lab-T"></span><span class="title">关联订单</span> 
          </div>
          <el-table
            :data="stoRefundResponse"
            border
            style="width: 100%">
            <el-table-column
              prop="bf_refund_no"
              label="退款订单号"
              width="320">
            </el-table-column>
            <el-table-column width="120"
              prop="refund_type"
              label="退款类型">
            </el-table-column>
            <el-table-column
              prop="refund_mode"
              label="退款方式"
              width="220">
            </el-table-column>
            <el-table-column width="100"
              prop="order_refund_amt"
              label="退款金额">
            </el-table-column>
            <el-table-column width="220"
              prop="request_date"
              label="退款完成时间">
            </el-table-column>
            <el-table-column
              prop="refund_reason"
              label="备注">
            </el-table-column>
          </el-table>
          <div class="table-lab">
            <span class="lab-T"></span>分润明细
          </div>
          <el-table
            :data="stoPayLedgerResponse"
            border>
            <el-table-column
              prop="merchant_no"
              label="商户号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="merchant_short_name"
              label="分润主体" width="120">
            </el-table-column>
            <el-table-column
              prop="sto_order_sub_no"
              label="子订单号"
              width="220">
            </el-table-column>
            <el-table-column
              prop="count_price"
              label="订单金额"
              width="100">
            </el-table-column>
            <el-table-column
              prop="proportion_price"
              label="分润金额" width="100">
            </el-table-column>
            <el-table-column
              prop="freight_amt"
              label="运费" width="100">
            </el-table-column>
            <el-table-column
              prop="sum"
              label="合计结算金额">
            </el-table-column>
            <el-table-column
              prop="orderLedgerStatus"
              label="分账状态">
               <template slot-scope="scope">{{ scope.row.orderLedgerStatus|enTozh }}</template>
            </el-table-column>
            <el-table-column
              prop="orderRefundStatus"
              label="是否退款">
              <template slot-scope="scope">{{ scope.row.orderRefundStatus=='SUCCESS'?'是':'否' }}</template>
            </el-table-column>
            <el-table-column width="200"
                    prop="requestDate"
                    label="分润时间">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {payManage,paycheck,selectShortName,platformDetailsQuery} from '@/api/account.js';
  import {tradeExports,downClick} from '@/api/downFile.js';

  export default {
      name: "trade",
      data() {
        let cJson = this.$store.state.user.cookieData;
        let siteId = cJson['tbl'][0]['siteId'];
        let source = cJson['tbl'][0]['source'];
        let userId = cJson['tbl'][0]['userId'];
        let merchantNo = cJson['tbl'][0]['merchantNo'];
        let pdJson = {
          sourceId:siteId,
          // sourceId:userId,
          siteType:cJson['tbl'][0]['siteType'],
          source:source
        }
        return {
          queryLiShow:false,
          pdJson:pdJson,
          accountType:pdJson.siteType,
          merchantNo:merchantNo,
          arrTime: ['',''],
          isDetail:false,
          selTypeOptions:[],
          form:{
            identifying:'',
            order_status:'',
            selType:'',
            accCardName:'',
            pay_mode:'线上支付',
            pay_type:'',
            biginprice:'',
            endprice:'',
            paySource:'',
            sto_order_main_no:'',
            bf_pay_order_no:'',
          },
          stoPayCheckResponse:{
            sto_order_main_no:'',
            bf_pay_order_no	:'',
            count_price:'',
            order_status:''
          },
          sourceOp:[],//系统来源
          stoPayOrderResponse:[],//详情table1
          stoRefundResponse:[],//详情table2
          stoPayLedgerResponse:[],//详情table3
          payOptions: [{
            value: '',
            label: '全部类型'
          }, {
            value: 'WECHAT',
            label: '微信支付'
          }, {
            value: 'ALI',
            label: '支付宝支付'
          }, {
            value: 'QUICK',
            label: '协议支付'
          }, {
            value: 'GATEWAY',
            label: '网银支付'
          }],
          tableData: [],
          page:{
            page:1,
            size:10,
            total:0
          },
        }
      },
      created() {
        this.getData();
        this.platformDetailsQuery()
        this.selectShortName()
      },
      filters: {
        backType: function (val) {
          let resType={
            FAIL:'交易失败',
            SUCCESS:'交易成功',
            PROCESSING:'交易进行中',
            INIT:'初始化'
          }
          return resType[val]
        },
      },
      methods:{
        // 分页事件
        handleCurrentChange(val) {
          this.page.page = val;
          this.getData();
        },
        handleSizeChange(val) {
          this.page.size = val;
          this.getData();
        },
        query() {
            this.page.page = 1,
            this.page.size = 10;
            this.getData()
        },
        platformDetailsQuery(){
          platformDetailsQuery().then(res => {
            if(res.code == '0000'){
              this.sourceOp = res.data;
            }
          });
        },
        selectShortName(){
          let pd = {
            source:this.pdJson.source
          }

          selectShortName(pd).then(res => {
            if(res.code == '0000'){
              this.selTypeOptions =res.data.data;
            }
          });
        },
        getData(){
          this.arrTime = this.arrTime || ['',''];
          let pd = {
            bf_pay_order_no: this.form.bf_pay_order_no,
            biginprice: this.form.biginprice,
            createdtime:this.form.identifying ? '' :this.arrTime[0] ,
            endprice: this.form.endprice,
            endtime:this.form.identifying ? '' :this.arrTime[1],
            identifying: this.form.identifying,
            order_status: this.form.order_status,
            pageNum: this.page.page,
            pageSize: this.page.size,
            pay_mode: this.form.pay_mode,
            pay_type:this.form.pay_type,
            accCardName:this.form.accCardName,
            merchantShortName:this.form.selType,
            paySource:this.form.paySource,
            sto_order_main_no: this.form.sto_order_main_no
          }
          pd = {...pd,...this.pdJson}
          payManage(pd).then(res => {
            if(res.code == '0000'){
              this.tableData = res.data.data;
              this.page.total = res.data.count;
            } else {
              this.tableData = [];
              this.page.total = 0;
            }
          });
        },
        detail(item){
          let pd = {
            sto_order_main_no:item.sto_order_main_no,
          }
          pd = {...pd,...this.pdJson}
          paycheck(pd).then(res => {
            if(res.code == '0000'){
              this.isDetail = true;
              this.stoRefundResponse = res.data.stoRefundResponse;
              this.stoPayOrderResponse = res.data.stoPayOrderResponse;
              this.stoPayLedgerResponse = res.data.stoPayLedgerResponses;
              this.stoPayCheckResponse = res.data.stoPayCheckResponse;
            } else {
            }
          });
        },
        download(){
          let pd = {
            bf_pay_order_no: this.form.bf_pay_order_no,
            biginprice: this.form.biginprice,
            createdtime:this.form.identifying ? '' :this.arrTime[0] ,
            endprice: this.form.endprice,
            endtime:this.form.identifying ? '' :this.arrTime[1],
            identifying: this.form.identifying,
            order_status: this.form.order_status,
            pageNum: this.page.page,
            pageSize: this.page.size,
            pay_mode: this.form.pay_mode,
            pay_type:this.form.pay_type,
            merchantShortName:this.form.selType,
            accCardName:this.form.accCardName,
            paySource:this.form.paySource,
            sto_order_main_no: this.form.sto_order_main_no
          }
          pd = {...pd,...this.pdJson}
          tradeExports(pd).then(res => {
              const content = res.data;
              downClick(content,'交易列表.xlsx')
          })
          // let exportURL = this.apiURL + `/pay/api/v1/service/exports?${strPth}`;
          // window.location.href = exportURL;
      	  // window.open(exportURL, "_blank")
        },
      }
    }
</script>

<style lang="scss" scoped>
  .item-flex{
    display: flex;
    line-height: 30px;
    .lab-title{
      width: 120px;
      text-align: left;
      margin-left: 10px;
    }
  }
  .m-r-20{
    margin-right: 20px;
  }
  .m-t-20{
    margin-top:20px;
  }
  .acc-table{
    padding: 20px;
  }

  .money-inp{
    width: 100px;
  }
  .form-inp{
    width: 200px;
  }

  .t-li{
    display: flex;
    flex-wrap:wrap;
    .t-li-item{
      flex-shrink: 0;
      display: flex;
      align-items: baseline;
      margin-top: 20px;
    }
    .el-radio{
      width: 70px;
    }
    .lab-title{
      width: 120px;
      text-align: left;
      margin-left: 10px;
    }
    .time-range{
      margin-left: 20px;
    }
  }
  .detail-box{
    padding: 20px;
  }
  .table-lab{
    line-height: 32px;
    font-size: 18px;
    height: 32px;
    margin: 20px 0;
    display: flex;
  }
  .t-li{
    .el-select{
      width:200px
    }
    .to-line{
      top: -4px;
      height: 2px;
      width: 50px;
      background: #c7b1b1;
      margin: 0px 2px;
      position: relative;
    }
  }
  .table-btn{
    text-align: right;
    margin-bottom: 10px;
  }
  .lab-T{
    display: inline-block;
    height: 33px;
    width: 4px;
    background: coral;
    margin-right: 10px;
  }
  .slide-fade-enter-active {
    transition: height 1s ease;
  }
  .slide-fade-leave-active {
    transition: height 1s ease;
  }
</style>
