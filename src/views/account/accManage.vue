<template>
  <div>
    <div class="form-top">
      <div class="form-left">
        <div class="t-li">
          <div class="t-li-item">
            <div class="lab-title">交易类型</div>
            <div>
              <el-radio-group v-model="form.orderCategory">
                <el-radio :label="''">全部</el-radio>
                <el-radio :label="'RECHARGE'">分账</el-radio>
                <el-radio :label="'WITHDRAW'">提现</el-radio>
                <el-radio :label="'TRANSFER'">转账</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="t-li" v-show="queryLiShow">
          <div class="t-li-item">
            <div class="lab-title">交易时间</div>
            <div>
              <el-radio-group v-model="form.identifying">
                <el-radio :label="'0'">昨天</el-radio>
                <el-radio :label="'1'">今天</el-radio>
                <el-radio :label="'2'">最近一周</el-radio>
                <el-radio :label="'3'">最近一个月</el-radio>
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
        <div class="t-li" v-show="queryLiShow">
          <div class="t-li-item">
            <div class="lab-title">资金流向</div>
            <div>
              <el-radio-group v-model="form.balanceDirection">
                <el-radio :label="''">全部</el-radio>
                <el-radio :label="'1'">收入</el-radio>
                <el-radio :label="'2'">支出</el-radio>
              </el-radio-group>
            </div>
          </div>

        </div>
        <div class="t-li" v-show="queryLiShow">
          <div class="t-li-item">
            <div class="lab-title">
              商户订单号
            </div>
            <el-input  maxlength="120" class="m-r-20 form-inp" v-model="form.transNo" clearable>
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

        <el-table-column
          prop="merchantNo"
          label="商户号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="merchantNm" width="200"
          label="用户名称">
        </el-table-column>
        <el-table-column
          prop="transNo"
          label="商户订单号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="tradeNo"
          label="交易订单号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="orderCategory"
          label="交易大类">
          <template slot-scope="scope">{{ scope.row.orderCategory|backType }}</template>
        </el-table-column>
        <el-table-column
          prop="accType"
          label="账户类型">
          <template slot-scope="scope">{{ scope.row.accType|accType }}</template>

        </el-table-column>
        <el-table-column
          prop="incomebalance" width="100"
          label="收入（元）">
        </el-table-column>
        <el-table-column
                prop="paybalance" width="100"
                label="支出（元）">
        </el-table-column>
        <el-table-column
                prop="orderAmt" width="100"
                label="交易金额">
        </el-table-column>
        <el-table-column
          prop="balanceDirection"
          label="资金流向">
          <template slot-scope="scope">{{ scope.row.balanceDirection|balanceDirection }}</template>

        </el-table-column>
        <el-table-column
          prop="balance"
          label="账户余额">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间">
        </el-table-column>
        <el-table-column
                prop="remark"
                label="备注">
        </el-table-column>
      </el-table>
      <el-pagination class="m-t-20" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="page.page" :page-sizes="[10,20,50,100]" :page-size="page.size" layout="total,prev,sizes, pager, next, jumper"
                     :total="page.total">
      </el-pagination>

    </div>
  </div>
</template>

<script>
    import {transactionDetailsQuery} from "@/api/account";
    import {reconciliationFileExport2,downClick} from '@/api/downFile.js';
    export default {
      name: "accManage",
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
          pdJson:pdJson,
          merchantNo:merchantNo,
          arrTime: ['',''],
          queryLiShow:false,
          form:{
            identifying:'',
            balanceDirection:'',
            endDate:'',
            transNo:'',
            startDate:'',
            orderCategory:'',
          },
          payOptions: [{
            value: '',
            label: '全部类型'
          }, {
            value: 'WECHAT_NATIVE',
            label: '微信支付'
          }, {
            value: 'ALI_NATIVE',
            label: '支付宝支付'
          }, {
            value: 'GATEWAY',
            label: '协议支付'
          }, {
            value: 'QUICK',
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
      filters: {
        backType: function (val) {
          let resType={
            RECHARGE:'分账',
            WITHDRAW:'提现',
            TRANSFER:'转账',
          }
          return resType[val]
        },
        accType: function (val) {
          let resType={
            1:'余额账户',
            2:'手续费账户',
            3:'收益账户',
            4:'营销账户',
          }
          return resType[val]
        },
        balanceDirection: function (val) {
          let resType={
            1:'收入',
            2:'支出',
          }
          return resType[val]
        }
      },
      created() {
        this.getTableData()
      },
      methods:{
        // 分页事件
        handleCurrentChange(val) {
          this.page.page = val;
          this.getTableData();
        },
        handleSizeChange(val) {
          this.page.size = val;
          this.getTableData();
        },
        query() {
          this.page.page = 1,
          this.page.size = 10;
          this.getTableData()
        },
        getTableData(){
          this.arrTime = this.arrTime || ['',''];
          let pd = {
            ...this.form,
            pageSize:this.page.size,
            pageNum:this.page.page
          }
          pd.startDate = this.form.identifying ? '' :this.arrTime[0] ;
          pd.endtime = this.form.identifying ? '' :this.arrTime[1] ;
          pd = {...pd,...this.pdJson}
          transactionDetailsQuery(pd).then(res => {
            if(res.code == '0000'){
              this.tableData = res.data.data;
              this.page.total = res.data.count;
            } else {
              this.tableData = [];
              this.page.total = 0;
            }
          });
        },
        download(){
          this.arrTime = this.arrTime || ['',''];
          let pd = {
            ...this.form,
            pageNum:this.page.page,
            pageSize:this.page.size
          }
          pd = {...pd,...this.pdJson}
          pd.startDate = this.form.identifying ? '' :this.arrTime[0] ;
          pd.endtime = this.form.identifying ? '' :this.arrTime[1] ;
          reconciliationFileExport2(pd).then(res => {
            const content = res.data;
            downClick(content,'账务列表.xlsx')
          })
          // let arrPath = [];
          // for(let key in pd){
          //   let str = key+'='+pd[key];
          //   arrPath.push(str)
          // }
          // let strPth = arrPath.join('&');
          // let exportURL = this.apiURL + `/pay/api/v1/reconciliationFileExport2`;
          // window.location.href = exportURL;
        },
      }
    }
</script>

<style lang="scss" scoped>
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
  .table-btn{
    text-align: right;
    margin-bottom: 10px;
  }
</style>
