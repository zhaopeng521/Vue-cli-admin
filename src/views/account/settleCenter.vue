<template>
    <div class="settle-container">
      <div class="top-handle-btn" v-if="accountType!='0'">
        <el-button class="btn-handle" @click="txDialog = true"  type="primary">提现</el-button>
<!--        <el-button v-if="accountType=='0'" class="btn-handle" @click="txDialog = true"  type="primary">充值</el-button>-->
      </div>
      <div class="num-box" v-if="accountType=='0'">
        <div class="money-type-item">
          <div class="lab">平台基本户余额</div>
          <div class="num">{{balance||'0.00'}}元</div>
        </div>
        <div class="money-type-item">
          <div class="lab">分润账户余额</div>
          <div class="num">{{freezeAmount||'0.00'}}元</div>
        </div>
        <div class="money-type-item">
          <div class="lab">可用余额</div>
          <div class="num">{{availableAmount||'0.00'}}元</div>
        </div>
      </div>
      <div class="num-box" v-if="accountType!='0'">
        <div class="money-type-item">
          <div class="lab">账户余额</div>
          <div class="num">{{balance||'0.00'}}元</div>
        </div>
        <div class="money-type-item">
          <div class="lab">可用余额</div>
          <div class="num">{{availableAmount||'0.00'}}元</div>
        </div>
      </div>
      <div class="router-box">
        <div class="router-item" v-for="items in routers" :key="items.value">
          <div class="router-lab-box">
            <div class="lab"><span class="lab-T"></span><span>{{items.meta.title}}</span></div>
          </div>
          <div class="router-to-box">
            <div class="router-to-li" v-for="item in items.children" :key="item.path">
              <div class="title" @click="goPath(item)"><span class="l-tab"></span><span>{{item.meta.title}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <el-dialog class="ml-dialog"
          title="充值"
          :visible.sync="czDialog"
          width="30%">
          <div class="ml-dialog-body">
            <div class="form-list">
              <div class="form-l">户名</div>
              <div class="form-r">发送到发送方</div>
            </div>
            <div class="form-list">
              <div class="form-l">账户金额</div>
              <div class="form-r">¥0.00</div>
            </div>
            <div class="form-list form-list-inp">
              <div class="form-l">金额</div>
              <div class="form-r">
                <el-input v-model="czForm.num"></el-input>
              </div>
              <div>元（例如：100元）</div>
            </div>
            <div class="form-list">
              <div class="form-l">账户类型</div>
              <div class="form-r">
                <el-select v-model="czForm.type">
                  <el-option label="区域一" value="1"></el-option>
                  <el-option label="区域二" value="2"></el-option>
                </el-select>
              </div>
            </div>
            <div class="form-list">
              <div class="form-l">备注</div>
              <div class="form-r remark">
                <el-input v-model="czForm.remark"></el-input>
              </div>
            </div>
          </div> 
          <div class="footer">
            <el-row>
              <el-col :span="24"><el-button class="footer-btn">到网上银行划拨</el-button></el-col>
            </el-row>
          </div>
        </el-dialog>
        <el-dialog class="ml-dialog"
          title="提现"
          :visible.sync="txDialog"
          width="30%">
          <div class="ml-dialog-body">
            <div class="form-list">
              <div class="form-l">账户名称</div>
              <div class="form-r">{{txInfo.merchantName}}</div>
            </div>
            <div class="form-list">
              <div class="form-l">开户行名称</div>
              <div class="form-r">{{txInfo.subbranchName}}</div>
            </div>
            <div class="form-list">
              <div class="form-l">银行账户</div>
              <div class="form-r">
                {{txInfo.bankCardNo}}
              </div>
            </div>
            <div class="form-list">
              <div class="form-l">可用余额</div>
              <div class="form-r">{{txInfo.availableAmount||'0'}}元</div>
            </div>
            <div class="form-list form-list-inp">
              <div class="form-l">可提现金额</div>
              <div class="form-r">
                <el-input v-model="txForm.txPrice"></el-input>
                <div class="tip">注意：提现金额仅支持最低100元</div>
              </div>
            </div>
          </div>
          <div class="footer">
            <el-row>
              <el-col :span="12"><el-button class="footer-btn" @click="txDialog = false">取消</el-button></el-col>
              <el-col :span="12"><el-button class="footer-btn" @click="withdraw">提交</el-button></el-col>
            </el-row>
          </div>
        </el-dialog>
        <el-dialog class="ml-dialog"
          title="银行卡管理"
          :visible.sync="bankDialog"
          width="40%">
          <div class="ml-dialog-body dia-bank-handle">
            <div class="bank-info">
              <div class="lab">当前结算账户</div>
              <div class="info-list">
                <div>
                  <span>户名</span><span>上海脉链品冠网络技术有限公司</span>
                </div>
                <div>
                  <span>银行名称</span><span>平安银行股份有限公司西北支行</span>
                </div>
                <div>
                  <span>银行账户</span><span>23123123*******</span>
                </div>
              </div>
            </div>
            <div class="bank-info">
              <div class="lab">当前结算账户</div>
              <div class="info-list">
                <div>
                  <span>户名</span><span>上海脉链品冠网络技术有限公司</span>
                </div>
                <div>
                  <span>银行名称</span><span>平安银行股份有限公司西北支行</span>
                </div>
                <div>
                  <span>银行账户</span><span>23123123*******</span>
                </div>
              </div>
            </div>
          </div>
          <div class="footer">
            <el-row>
              <el-col :span="12"><el-button class="footer-btn" @click="bankDialog = false">取消</el-button></el-col>
              <el-col :span="12"><el-button class="footer-btn">提交</el-button></el-col>
            </el-row>
          </div>
        </el-dialog>
      </div>
    </div>
</template>

<script>
  import {withdraw,balanceQuery,userInfoByMerchantNoQuery,salanceQuery} from '@/api/account.js';
  import {deepClone} from '@/utils'

  export default {
        name: "settleCenter",
        data() {
          var cJson = this.$store.state.user.cookieData;
          var siteId = cJson['tbl'][0]['siteId'];
          var source = cJson['tbl'][0]['source'];
          var userId = cJson['tbl'][0]['userId'];
          var merchantNo = cJson['tbl'][0]['merchantNo'];
          var pdJson = {
            sourceId:siteId,
            // sourceId:userId,
            siteType:cJson['tbl'][0]['siteType'],
            source:source
          }
          return {
            pdJson:pdJson,
            merchantNo:merchantNo,
            accountType:pdJson.siteType,
            czDialog:false,
            txDialog:false,
            bankDialog:false,
            balance:'0.00',//账户余额
            availableAmount:'0.00',//可用余额
            freezeAmount:'',
            txForm:{
              txPrice:'',
              subMerchantName:'',
              subMerchantNo:'',

            },
            txInfo:{
              bankCardNo :'',
              subbranchName :'',
              merchantName :'',
              availableAmount :'',
            },
            czForm:{
              num:'',
              type:'1',
              remark:''
            },
            listLoading: true,
          }
        },
        computed:{
          routers() {
            let arr = [];
            let permissionRoutes = this.$store.state.permission.constantRoutes;
            permissionRoutes = deepClone(permissionRoutes);
            permissionRoutes.forEach(el=>{
              if(el.name=='account'){
                el.meta.title = '财务管理'
              }
              if(!el.hidden){
                let arrChild = el.children.filter(v=>{
                  if(v.name != 'settleCenter'){
                    return v.hidden!=true;
                  }
                })
                el.children = arrChild;
                arr.push(el);
              }
            })
            return arr;
          },
        },
        created() {
          this.balanceQuery();
          if(this.accountType !='0'){
            this.userInfoByMerchantNoQuery();
          }
        },
        methods:{
          userInfoByMerchantNoQuery(){
            let pd = {
              "sourceId": '',
            }
            pd = {...pd,...this.pdJson}
            userInfoByMerchantNoQuery(pd).then(res => {
                if(res.code == '0000'){
                  this.txInfo = res.data;
                }
            });
          },
          withdraw(){//提现

            let pd = {
              "price": this.txForm.txPrice
            }
            pd = {...pd,...this.pdJson}
            if(this.withdrawValid()){
              withdraw(pd).then(res => {
                if(res.code == '0000'){
                  this.txForm.txPrice = '';
                  this.txDialog = false;
                  location.reload()
                  // setTimeout(()=>{this.balanceQuery()},1000)
                }
              });
            };


          },
          balanceQuery(){
            let pd = {
              "subMerchantNo":this.merchantNo
            };
            pd['merchantNo'] = this.merchantNo;
            if(this.accountType == 0){
              salanceQuery().then(res => {
                if(res.code == '0000'){
                  this.balance = res.data.balance;
                  this.freezeAmount = res.data.freezeAmount;
                  this.availableAmount = res.data.availableAmount;
                }
              });
            } else {
              balanceQuery(pd).then(res => {
                if(res.code == '0000'){
                  this.balance = res.data.balance;
                  this.freezeAmount = res.data.freezeAmount;
                  this.availableAmount = res.data.availableAmount;
                }
              });
            }

          },
          goPath(it){
            this.$router.push(it.path)
          },
          withdrawValid(){
            let reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;//正数 小数点最多为两位的
            if(!reg.test(this.txForm.txPrice)){
              this.$message({
                message: '提现金额不能为空，请输入大于0的正数',
                type: 'warning'
              })
              return false
            }
            return true;
          }
        }
    }
</script>

<style lang="scss"  scoped>
  .settle-container{
    padding: 20px;
    background: #fafafa;
    position: relative;
    .top-handle-btn{
      margin-right: 20px;
      position: absolute;
      top: 30px;
      right: 20px;;
    }
    .num-box{
      height: 200px;
      background: #fff;
      display: flex;
      align-items: center;
      margin-bottom: 4px;
      .money-type-item{
        height: 120px;
        width: 357px;
        position: relative;
        top: 20px;
        box-shadow:0px 0px 5px rgba(136, 136, 136, 0.93);
        border-radius: 20px;
        margin-left: 20px;
        background-image: linear-gradient(to bottom right, #fff ,#f3f3f3);
        .lab{
          height: 28px;
          color: #666666;
          font-size: 20px;
          line-height: 28px;
          margin: 20px;
        }
        .num{
          font-weight: 500;
          font-style: normal;
          font-size: 24px;
          color: #ED6D00;
          margin-left: 20px;
        }
      }
    }
    .router-item{
      margin-bottom: 4px;
      .router-lab-box{
        margin-bottom: 2px;
        height: 68px;
        background: #fff;
        .lab{
          height: 33px;
          line-height: 33px;
          font-weight: 500;
          display: flex;
          font-size: 20px;
          padding: 17px 0;
          .lab-T{
            display: inline-block;
            height: 33px;
            width: 4px;
            background: coral;
            margin-right: 10px;
          }
        }
      }
      .router-to-box{
        display: flex;
        flex-wrap:wrap;
        .router-to-li:last-child{
          flex-grow: 1;
        }
        .router-to-li{
          width: 33.3%;
          margin-bottom: 2px;
          height: 68px;
          background: #fff;
          .title{
            display: flex;
            width: 250px;
            text-align: center;
            font-size: 20px;
            line-height: 33px;
            padding: 17px 0;
            cursor: pointer;
            .l-tab{
              width:2px;
              height: 33px;
              display: inline-block;
              background: #737b7f;
              margin-right: 70px;
            }
          }
          .title:hover{
            color: #ee6d01;
            .l-tab{
              background: #ee6d01;
              width: 4px;
            }
          }
        }
      }
    }
    .top{
      display: flex;

      line-height: 90px;
      height: 90px;

    }
    .money-num{
      font-size: 28px;
      color: #D9001B;
      margin-right: 20px;
    }
    .money-title{
      margin-right: 10px;

    }
    .btn-handle{
      margin-left: 20px;
    }
    .router-lab{
      font-weight: 700;
      font-style: normal;
      font-size: 25px;
      color: rgba(245, 154, 35, 0.88);
      height: 40px;
      line-height: 40px;

    }
    .route-box{
      display: flex;
      padding-left: 20px;
      padding-top: 20px;
      margin-bottom: 20px;
      .route-to{
        width: 100px;
        height: 74px;
        text-align: center;
        line-height: 74px;
        font-weight: 400;
        font-style: normal;
        font-size: 18px;
        color: #000000;
        cursor: pointer;
        border-radius: 3px;
        margin-left: 20px;
        box-shadow: 4px 5px 9px rgba(136, 136, 136, 0.93);
      }
    }

  }
  .form-list{
    display: flex;
    height: 45px;
    .form-l{
      width: 100px;
      text-align: right;
      flex-shrink:0;
      margin-right: 10px;
    }
    .remark{
      width: 70%;
    }
    .tip{
      line-height: 0;
      position: relative;
      top: 8px;
    }
  }
  .form-list-inp{
      line-height: 45px;
  }
  .dia-bank-handle{
    display: flex;
    justify-content: space-between;

    .bank-info{

      width: 200px;
      flex-wrap: wrap;
      div{
        padding: 10px 0;
      }
      .lab{
        font-weight: 700;
        height: 32px;
        font-size: 18px;
        line-height: 32px;
      }
    }
  }
  .footer{
    text-align: center;
    margin-top: 20px;
  }
  .ml-dialog{

    .ml-dialog-body{
        padding:20px;
    }
    .footer{
      box-shadow:4px 0px 10px rgba(136, 136, 136, 0.93);
      height: 60px;
      border-radius: 2px;
      .footer-btn{
        height: 60px;
        width: 100%;
      }
    }
  }
</style>
