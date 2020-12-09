<template>
  <div>
    <div class="form-top">
      <div class="form-left">
        <div class="t-li">
          <div class="t-li-item">
            <div class="lab-title">退款状态</div>
            <div>
              <el-select v-model="form.orderStatus" clearable>
                <el-option label="全部" value=""></el-option>
                <el-option label="待退款" value="INIT"></el-option>
                <el-option label="进行中" value="PROCESSING"></el-option>
                <el-option label="退款成功" value="SUCCESS"></el-option>
                <el-option label="退款失败" value="FAIL"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="t-li" v-show="queryLiShow">
          <div class="t-li-item">
            <div class="lab-title">退款时间</div>
            <div>
<!--              <el-select v-model="form.identifying" clearable>-->
<!--                <el-option label="今日" value="0"></el-option>-->
<!--                <el-option label="近一个月" value="1"></el-option>-->
<!--                <el-option label="近三个月" value="2"></el-option>-->
<!--                <el-option label="近半年" value="3"></el-option>-->
<!--                <el-option label="退款失败" value="FAIL"></el-option>-->
<!--              </el-select>-->
              <el-radio-group v-model="form.identifying">
                <el-radio :label="'0'">今日</el-radio>
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
        <div class="t-li" v-show="queryLiShow">
          <div class="t-li-item">
            <div class="lab-title">
              退款单号
            </div>
            <el-input  maxlength="120" class="m-r-20 form-inp" v-model="form.bfRefundNo" clearable>
            </el-input>
          </div>
          <div class="t-li-item">
            <div class="lab-title">
              交易单号
            </div>
            <el-input  maxlength="120" class="m-r-20 form-inp" v-model="form.stoOrderMainNo" clearable>
            </el-input>
          </div>
          <div class="t-li-item">
            <div class="lab-title">
              原支付订单号
            </div>
            <el-input  maxlength="120" class="m-r-20 form-inp" v-model="form.bfPayOrderNo" clearable>
            </el-input>
          </div>
          <div class="t-li-item">
            <div class="lab-title">退款类型</div>
            <el-select class="m-r-20" v-model="form.refundType" placeholder="请选择">
              <el-option
                      v-for="item in payType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="t-li-item">
            <div class="lab-title">退款方式</div>
            <el-select class="m-r-20" v-model="form.refundMode" placeholder="请选择">
              <el-option
                      v-for="item in payOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="t-li-item">
            <div class="lab-title">退款金额</div>
            <el-input  maxlength="120" class="money-inp" v-model="form.beginRefundAmt" clearable>
            </el-input>
            <div class="to-line"></div>
            <el-input  maxlength="120" class="money-inp" v-model="form.endRefundAmt" clearable>
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
          prop="bfRefundNo"
          label="退款单号"
          width="250">
        </el-table-column>
        <el-table-column
          prop="bfPayOrderNo"
          label="原支付订单号" width="250">
        </el-table-column>
        <el-table-column
          prop="stoOrderMainNo"
          label="交易单号"
          width="250">
        </el-table-column>
        <el-table-column
          prop="merchantShortName"
          label="用户名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="refundType"
          label="退款类型">
        </el-table-column>
        <el-table-column
          prop="refundMode"
          label="退款方式">
          <template slot-scope="scope">{{ scope.row.refundMode|enTozh }}</template>

        </el-table-column>
        <el-table-column
          prop="stoOrderSubAmt" width="100"
          label="原支付金额">
        </el-table-column>
        <el-table-column
          prop="orderRefundAmt" width="100"
          label="退款金额">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="退款创建时间" width="200">
        </el-table-column>
        <el-table-column
          prop="updatedTime"
          label="退款完成时间" width="200">
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="退款状态">
          <template slot-scope="scope">{{ scope.row.orderStatus|enTozh }}</template>
        </el-table-column>
        <el-table-column
          prop="refundReason"
          label="备注">
        </el-table-column>
      </el-table>
      <el-pagination class="m-t-20" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="page.page" :page-sizes="[10,20,50,100]" :page-size="page.size" layout="total,prev, pager,sizes, next, jumper"
                     :total="page.total">
      </el-pagination>

    </div>
  </div>
</template>

<script>
    import {payRefund,platformDetailsQuery} from "@/api/account";
    import {downClick, payRefundexport,} from "@/api/downFile";
    export default {
      name: "refund",
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
          accountType:pdJson.siteType,
          merchantNo:merchantNo,
          arrTime: ['',''],
          queryLiShow:false,
          form:{
            identifying:'',
            orderStatus:'',
            createdtime:'',
            endtime:'',
            bfRefundNo:'',
            stoOrderMainNo:'',
            bfPayOrderNo:'',
            refundType:'',
            refundMode:'',
            beginRefundAmt:'',
            endRefundAmt:'',
            paySource:'',
          },
          sourceOp:[],
          payType:[{
            value: '',
            label: '全部类型'
          }, {
            value: '线上退款',
            label: '线上退款'
          }, {
            value: '线下退款',
            label: '线下退款'
          }],
          payOptions:[{
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
          list: null,
          total: null,

          tableData: [],
          page:{
            page:1,
            size:10,
            total:0
          },
          
        }
      },
      created() {
        this.getTableData();
        this.platformDetailsQuery();
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
            pageNum:this.page.page,
            pageSize:this.page.size
          }
          pd.createdtime = this.form.identifying ? '' :this.arrTime[0] ;
          pd.endtime = this.form.identifying ? '' :this.arrTime[1] ;
          pd = {...pd,...this.pdJson}
          payRefund(pd).then(res => {
            if(res.code == '0000'){
              this.tableData = res.data.data;
              this.page.total = res.data.count;
            } else {
              this.tableData = [];
              this.page.total = 0;
            }
          });
        },
        platformDetailsQuery(){
          platformDetailsQuery().then(res => {
            if(res.code == '0000'){
              this.sourceOp = res.data;
            }
          });
        },
        download(){
          let pd = {
            ...this.form,
            pageNum:this.page.page,
            pageSize:this.page.size
          }
          pd = {...pd,...this.pdJson}
          pd.createdtime = this.form.identifying ? '' :this.arrTime[0] ;
          pd.endtime = this.form.identifying ? '' :this.arrTime[1] ;
          payRefundexport(pd).then(res => {
            const content = res.data;
            downClick(content,'退款信息.xlsx')
          })

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
</style>
