<template>
  <div>
    <div class="form-top m-t-20">
      <div class="t-li">
        <div class="lab-title">商户名称</div>
        <div class="m-r-20">
          <el-input v-model="listQuery.merchantName" clearable placeholder="商户名称" style="width: 200px;" class="filter-item" @keyup.enter.native="query" />
        </div>
        <div class="lab-title">系统来源</div>
        <div class="t-sel">
          <el-select v-model="listQuery.source" style="width: 120px" class="filter-item">
            <el-option
                    v-for="item in sourceOp"
                    :key="item.platformNm"
                    :label="item.platformDes"
                    :value="item.platformNm">
            </el-option>
          </el-select>
        </div>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="query">
          查询
        </el-button>
      </div>
    </div>
    <div class="acc-table">
      <div class="table-btn">
        <el-button @click="toPaht" type="primary">添加进件</el-button>
      </div>
      <el-table
              :data="tableData"
              border
              style="width: 100%">
        <el-table-column
                prop="merchantName"
                label="商户名称" width="220">
        </el-table-column>
        <el-table-column
                prop="source"
                label="系统来源"
                width="120">
        </el-table-column>
        <el-table-column
                prop="applyStatus"
                label="申请状态">
        </el-table-column>
        <el-table-column
                prop="userType"
                label="商户类型">
          <template slot-scope="scope">{{ scope.row.userType|userTypeF }}</template>
        </el-table-column>
        <el-table-column
                prop="email"
                label="邮箱">
        </el-table-column>
        <el-table-column
                prop="applyNo"
                label="进件申请编号"
                width="220">
        </el-table-column>
        <el-table-column
                prop="merchantNo"
                label="商户号">
        </el-table-column>
        <el-table-column
                prop="createdTime"
                label="申请时间">
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
  import {enterpriseAccountOpenQuery,platformDetailsQuery} from '@/api/account.js';

  export default {
    name: "openAccountInfo",
    data() {
      let cJson = this.$store.state.user.cookieData;
      let siteId = cJson['tbl'][0]['siteId'];
      let siteType = cJson['tbl'][0]['siteType'];
      return {
        handleDialog:false,
        sourceOp:[],
        listQuery: {
          source: 'MALL',
          merchantName: '',
        },
        addForm:{
          source: 'MALL',
          proportion: '',
          sotId:'',
        },
        dialogTitle:'分润新增',
        tableData:[],
        page:{
          page:1,
          size:10,
          total:0
        },
      }
    },
    created() {
      this.platformDetailsQuery();
      // this.getTableData()
    },
    filters: {
      userTypeF:function (val) {
        let resType={
          1:'企业',
          2:'个人',
        }
        return resType[val]
      },
    },
    methods: {
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
        this.page.page = 1;
        this.page.size = 10;
        this.getTableData()
      },
      getTableData(){
        let pd = {
          ...this.listQuery,
          pageNum:this.page.page,
          pageSize:this.page.size,
        }
        enterpriseAccountOpenQuery(pd).then(res => {
          if(res.code == '0000'){
            this.tableData= res.data.data
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
            this.listQuery.source = this.sourceOp[0]['platformNm']
            this.addForm.source = this.sourceOp[0]['platformNm'];
            this.getTableData()
          }
        });
      },
      handleData() {
        if(this.valid()){
          let pd = this.addForm;
          saveLedger(pd).then(res => {
            if(res.code == '0000'){
              this.$message({
                message: '数据新增成功',
                type: 'success'
              })
              this.handleDialog = false;
              this.reset()
              this.query()
            } else {

            }
          });
        }

      },
      handleDelete(row){
        let pd = {
          sotId:row.sotId
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteLedger(pd).then(res => {
            if(res.code == '0000'){
              this.$message({
                message: '数据被成功删除',
                type: 'success'
              })
              this.query()
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },
      cancelEdit(row) {
        row.proportion = row.originalProportion
        row.edit = false
        this.$message({
          message: '已取消修改',
          type: 'warning'
        })
      },
      confirmEdit(row) {
        row.edit = false
        row.originalProportion = row.proportion;
        updateLedger(row).then(res => {
          if(res.code == '0000'){
            this.$message({
              message: '数据被成功修改',
              type: 'success'
            })
          }
          this.query()
        });
      },
      toPaht(){
        this.$router.push('/account/openAccount')
      },
      reset(){
        this.addForm = {
          source: 'MALL',
          proportion: '',
          sotId:'',
        };
      },
      valid(){
        if(!(this.addForm.proportion>0 && this.addForm.proportion <= 1)){
          this.$message({
            message: '请输入大于0小于等于1的小数',
            type: 'warning'
          })
          return false
        }
        return true;
      }
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

  .table-btn{
    text-align: right;
    margin-bottom: 10px;
  }
  .t-li{
    display: flex;
    height: 32px;
    margin: 20px 0;
    align-items: baseline;
    div{
      flex-shrink: 0;
    }
    .lab-title{
      text-align: left;
      margin:0 10px;
    }
    .t-sel{
      margin:0 20px 0 10px;
    }
  }
  .footer{
    text-align: center;
    margin-top: 20px;
  }
  .edit-input{
    width: 120px;
    margin-right: 10px;
  }
  .ml-dialog{

    .ml-dialog-body{
      padding:20px;
      .form-list{
        display: flex;
        line-height: 50px;
        .form-l{
          width: 120px;
          text-align: right;
          margin-right: 10px;

        }

      }
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
