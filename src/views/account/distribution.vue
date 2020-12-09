<template>
    <div>
        <div class="form-top m-t-20">
            <div class="t-li">
                <div class="lab-title">商户编号</div>
                <div class="m-r-20">
                    <el-input v-model="listQuery.sourceId" clearable placeholder="商户编号" style="width: 200px;" class="filter-item" @keyup.enter.native="query" />
                </div>
                <div class="lab-title">分润比例</div>
                <div class="m-r-20">
                    <el-input v-model="listQuery.proportion" clearable placeholder="分润比例" style="width: 200px;" class="filter-item" @keyup.enter.native="query" />
                </div>
                <div class="lab-title">系统来源</div>
                <div class="t-sel">
                    <el-select v-model="listQuery.source" clearable style="width: 120px" class="filter-item">
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
                <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleDialog=true">
                    新增
                </el-button>
            </div>
        </div>
        <div class="acc-table">
            <el-table
                    :data="tableData" max-height="500"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="sotName"
                        label="商户名称">
                </el-table-column>
                <el-table-column
                        prop="sotId"
                        label="分润商户号"
                        width="220">
                </el-table-column>
                <el-table-column
                        prop="source"
                        label="来源">
                </el-table-column>
                <el-table-column
                        prop="createdTime" width="200"
                        label="创建时间">
                    <template slot-scope="scope">{{ scope.row.createdTime|parseTime }}</template>
                </el-table-column>
                <el-table-column
                        prop="updatedTime" width="200"
                        label="修改时间">
                    <template slot-scope="scope">{{ scope.row.updatedTime|parseTime }}</template>
                </el-table-column>
                <el-table-column min-width="200px"
                        prop="proportion"
                        label="比例">
                    <template slot-scope="{row}">
                        <template v-if="row.edit">
                            <el-input v-model="row.proportion" class="edit-input" size="small" />
                            <el-button
                                    class="cancel-btn"
                                    size="small"
                                    icon="el-icon-refresh"
                                    type="warning"
                                    @click="cancelEdit(row)"
                            >
                                取消
                            </el-button>
                        </template>
                        <span v-else>{{ row.proportion }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                    <template slot-scope="{row,$index}">
                        <el-button
                                v-if="row.edit"
                                type="success"
                                size="mini"
                                icon="el-icon-circle-check-outline"
                                @click="confirmEdit(row)"
                        >
                            Ok
                        </el-button>
                        <el-button
                                v-else
                                type="primary"
                                size="mini"
                                icon="el-icon-edit"
                                @click="row.edit=!row.edit"
                        >
                            编辑
                        </el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="m-t-20" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="page.page" :page-sizes="[10,20,50,100]" :page-size="page.size" layout="total,prev,sizes, pager, next, jumper"
                           :total="page.total">
            </el-pagination>

        </div>

        <el-dialog class="ml-dialog"
                   :title="dialogTitle"
                   :visible.sync="handleDialog"
                   width="30%">
            <div class="ml-dialog-body">
                <div class="form-list">
                    <div class="form-l">商户名称</div>
                    <div class="form-r"><el-input v-model="addForm.sotName" placeholder="商户名称" style="width: 200px;" class="filter-item" />
                    </div>
                </div>
                <div class="form-list">
                    <div class="form-l">商户编号</div>
                    <div class="form-r"><el-input v-model="addForm.sotId" placeholder="商户编号" style="width: 200px;" class="filter-item" />
                    </div>
                </div>
                <div class="form-list">
                    <div class="form-l">分润比例</div>
                    <div class="form-r"><div class="form-r"><el-input v-model="addForm.proportion" placeholder="分润比例" style="width: 200px;" class="filter-item" />
                    </div></div>
                </div>
                <div class="form-list">
                    <div class="form-l">分润平台</div>
                    <div class="form-r">
                        <el-select v-model="addForm.source" style="width: 200px;" class="filter-item">
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
            <div class="footer">
                <el-row>
                    <el-col :span="12"><el-button class="footer-btn" @click="handleDialog = false">取消</el-button></el-col>
                    <el-col :span="12"><el-button class="footer-btn" @click="handleData">提交</el-button></el-col>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {deleteLedger, updateLedger, saveLedger, ledger, platformDetailsQuery} from "@/api/account";
    export default {
        name: "distribution",
        data() {
            let cJson = this.$store.state.user.cookieData;
            let siteId = cJson['tbl'][0]['siteId'];
            let siteType = cJson['tbl'][0]['siteType'];
            return {
                handleDialog:false,
                listQuery: {
                    source: '',
                    proportion: '',
                    sourceId:'',
                },
                sourceOp:[],
                addForm:{
                    source: 'MALL',
                    proportion: '',
                    sotName:'',
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
            this.getTableData();
            this.platformDetailsQuery()
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
                this.page.page = 1,
                this.page.size = 10;
                this.getTableData()
            },
            getTableData(){
                let pd = {
                    ...this.listQuery,
                    pageNum:this.page.page,
                    pageSize:this.page.size
                }
                ledger(pd).then(res => {
                    if(res.code == '0000'){
                        let arr = res.data.data
                        this.tableData = arr.map(el=>{
                            el['edit'] = false;
                            el.originalProportion = el.proportion
                            return el;
                        });
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
                        this.addForm.source = this.sourceOp[0]['platformNm'];
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
            margin-right: 20px;
            margin-left: 10px;
        }
    }
    .footer{
        text-align: center;
        margin-top: 20px;
    }
    .edit-input{
        width: 70px;
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
