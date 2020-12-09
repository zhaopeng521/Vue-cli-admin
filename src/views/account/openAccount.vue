<template>
  <div id="open">
    <div class="container">
      <p class="title">产品签约</p>
      <div class="center">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
          size="mini"
          :rules="rules"
        >
          <p class="title1">
            <span></span>商户基本信息：
          </p>
          <el-form-item
            label="系统来源:"
            prop="source"
            :rules="[
      { required: true, message: '系统来源不能为空',trigger: 'change'},
     
    ]"
          >
            <el-select v-model="ruleForm.source">
              <el-option
                      v-for="item in sourceOp"
                      :key="item.platformNm"
                      :label="item.platformDes"
                      :value="item.platformNm">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="进件编号:"
            prop="sourceId"
            :rules="[
      { required: true, message: '进件编号不能为空'},
     
    ]"
          >
            <el-input v-model="ruleForm.sourceId"></el-input>
          </el-form-item>
          <el-form-item
                  label="商户全称:"
                  prop="merchantName"
                  :rules="[
      { required: true, message: '商户全称不能为空'},

    ]"
          >
            <el-input v-model="ruleForm.merchantName"></el-input>
          </el-form-item>
          <el-form-item
            label="商户简称:"
            prop="merchantShortName"
            :rules="[
      { required: true, message: '商户简称不能为空'},
     
    ]"
          >
            <el-input v-model="ruleForm.merchantShortName"></el-input>
          </el-form-item>
          <el-form-item
            label="联系邮箱:"
            prop="email"
            :rules="[
      { required: true, message: '联系邮箱不能为空'},
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
          >
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="客服电话:" prop="servicePhone">
            <el-input v-model="ruleForm.servicePhone"></el-input>
          </el-form-item>
          <el-form-item
            label="经营类目:"
            prop="industryType"
            :rules="[
      { required: true, message: '经营类目不能为空',trigger: 'change'},
     
    ]"
          >
            <el-select v-model="ruleForm.industryType" placeholder="请选择经营类目">
              <el-option label="零售业 " value="零售业"></el-option>
              <el-option label="住宿、餐饮和休闲娱乐业" value="住宿、餐饮和休闲娱乐业"></el-option>
              <el-option label="房地产与金融业 " value="房地产与金融业"></el-option>
              <el-option label="居民服务与商业服务 " value="居民服务与商业服务"></el-option>
              <el-option label="教育、卫生、福利及其他政府服务" value="教育、卫生、福利及其他政府服务"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="营业执照编号:"
            prop="businessLicense"
            :rules="[
      { required: true, message: '营业执照编号不能为空'},
     
    ]"
          >
            <el-input v-model="ruleForm.businessLicense"></el-input>
          </el-form-item>
          <!-- <el-form-item label="商户公钥" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>-->

          <p class="title1">
            <span></span>地址信息：
          </p>

          <el-form-item label="地区编码：" prop="districtCode">
            <el-input v-model="ruleForm.districtCode"></el-input>
          </el-form-item>
          <el-form-item label="地址：" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
          <el-form-item label="经度：" prop="longitude">
            <el-input v-model="ruleForm.longitude"></el-input>
          </el-form-item>
          <el-form-item label="纬度：" prop="latitude">
            <el-input v-model="ruleForm.latitude"></el-input>
          </el-form-item>

          <p class="title1">
            <span></span>法人信息：
          </p>
          <el-form-item
            label="法人姓名："
            prop="legalName"
            :rules="[
      { required: true, message: '法人姓名不能为空'},
     
    ]"
          >
            <el-input v-model="ruleForm.legalName"></el-input>
          </el-form-item>
          <el-form-item
            label="法人证件号码："
            prop="legalIdcardNo"
            :rules="[
      { required: true, message: '法人证件号码不能为空'},
     
    ]"
          >
            <el-input v-model="ruleForm.legalIdcardNo"></el-input>
          </el-form-item>

          <el-form-item
            label="法人证件类型:"
            prop="legalIdcardType"
            :rules="[
      { required: true, message: '法人证件类型不能为空',trigger: 'change'},
     
    ]"
          >
            <el-select v-model="ruleForm.legalIdcardType" placeholder="请选择法人证件类型">
              <el-option label="大陆身份证" value="1"></el-option>
              <el-option label="护照" value="2"></el-option>
              <el-option label="港澳居民来往内地通行证" value="3"></el-option>
              <el-option label="台湾居民来往内地通行证" value="4"></el-option>
              <el-option label="其他" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="法人手机号码：" prop="legalPhone">
            <el-input v-model="ruleForm.legalPhone"></el-input>
          </el-form-item>

          <p class="title1">
            <span></span>联系人信息：
          </p>
          <el-form-item label="联系人姓名：" prop="contactName">
            <el-input v-model="ruleForm.contactName"></el-input>
          </el-form-item>
          <el-form-item label="联系人手机号：" prop="contactPhone">
            <el-input v-model="ruleForm.contactPhone"></el-input>
          </el-form-item>

          <el-form-item label="联系人证件类型:">
            <el-select v-model="ruleForm.contactIdcardType" placeholder="请选择联系人证件类型">
              <el-option label="大陆身份证" value="1"></el-option>
              <el-option label="护照" value="2"></el-option>
              <el-option label="港澳居民来往内地通行证" value="3"></el-option>
              <el-option label="台湾居民来往内地通行证" value="4"></el-option>
              <el-option label="其他" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人证件号：" prop="contactIdcardNo">
            <el-input v-model="ruleForm.contactIdcardNo"></el-input>
          </el-form-item>

          <p class="title1">
            <span></span>银行账户信息：
          </p>
          <el-form-item
            label="卡号："
            prop="bankCardNo"
            :rules="[
      { required: true, message: '卡号不能为空'},
      
    ]"
          >
            <el-input v-model="ruleForm.bankCardNo"></el-input>
          </el-form-item>
          <el-form-item
            label="联行号："
            prop="cnapsNo"
            :rules="[
      { required: true, message: '联行号不能为空'}
      
    ]"
          >
            <div class="ban">
              <el-cascader
                v-model="ruleForm.selectedOptions"
                placeholder="请选择开户行"
                :show-all-levels="true"
                :options="cascaderData"
                @active-item-change="handleItemChange"
                :props="{
                value: 'id',
                label: 'name',
                children: 'cities'
              }"
              ></el-cascader>

              <el-select
                v-model="ruleForm.cnapsNo"
                value-key="bankBnkcode"
                filterable
                placeholder="请选择开户支行"
                @visible-change="getYH()"
                @change="selected"
                style="margin-left:20px;"
              >
                <el-option
                  v-for="item in ruleForm.infs"
                  :key="item.cnapsNo"
                  :label="item.subbranchName"
                  :value="item.cnapsNo"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <div class="photo">
            <p class="title1">
              <span></span>文件信息：
            </p>
            <p class="zy">注意：支持 JPG、JPEG、PNG、BMP 、 GIF，图片最大不能超过 1MB</p>
            <el-form-item
              v-for="(item,index) in ruleForm.pactures.slice(0,3)"
              :key="index"
              :label="item.name"
              :required="item.required"
            >
              <el-upload
                :action="actionUrl"
                :headers="headers"
                list-type="picture-card"
                :data="item"
                :on-remove="handleRemove"
                 :on-preview="handlePictureCardPreview"
                :show-file-list="true"
                :limit="1"
                :on-success="success"
                :before-upload="beforeAvatarUpload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <div class="demoImg">
                <img :src="item.imgUrl" alt style="width:130px;height:100px;margin-top:10px;" />
                <p style="color:#999" class="syt-img">示意图</p>
              </div>
            </el-form-item>
            <p class="title1">
              <span></span>照：
            </p>
            <p class="zy">注意：支持 JPG、JPEG、PNG、BMP 、 GIF，图片最大不能超过 1MB</p>

            <el-form-item
              v-for="(item) in ruleForm.pactures.slice(3,13)"
              :key="item.name"
              :label="item.name"
              :required="item.required"
            >
              <el-upload
                :action="actionUrl"
                :headers="headers"
                list-type="picture-card"
                :data="item"
                :on-remove="handleRemove"
                 :on-preview="handlePictureCardPreview"
                :show-file-list="true"
                :limit="1"
                :on-success="success"
                :before-upload="beforeAvatarUpload"

              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <div class="demoImg">
                <img :src="item.imgUrl" alt style="width:130px;height:100px;margin-top:10px;" />
                <p style="color:#999" class="syt-img">示意图</p>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button class="subtn" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
  import {
    getProvince,
    getCity,
    getBank,
    getSubBank,
    storeJoin, platformDetailsQuery
  } from "@/api/account";
import  {checkPhone} from  "@/utils"
import { getToken} from '@/utils/auth'

export default {
  name:'openAccount',
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
    let checkIdCard = (rule, value, callback) => {
      let reg = /^\d{15}|\d{}18$/;
        if (value && !reg.test(value)) {
          return callback(new Error('请输入正确的身份证号'));
        }
        callback()
    };
    let checkBusinessLicense = (rule, value, callback) => {
      let reg = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/;
        if (!reg.test(value)) {
          return callback(new Error('请输入正确的营业执照'));
        }
        callback()
    };
    let checkNum = (rule, value, callback) => {
      let reg = /^[0-9]*$/;
      if (value && !reg.test(value)) {
        return callback(new Error('请输入数字'));
      }
       callback() 
    };
    return {
      sourceOp:[],
      source:source,
      dialogVisible:false,
      dialogImageUrl:"",
      actionUrl:this.apiURL+"/pay/api/v1/service/qualifiedFileUpload",
      headers:{},
      ruleForm: {
        source:'MALL',
        address: "", //地址
        bankCardNo: "", //卡号
        bankLicenseImg: "", //开户许可
        businessLicense: "", //营业执照编号
        businessLicenseImg: "", //营业执照
        cnapsNo: "", //联行号
        subbranchName:"",//开户行名称
        contactIdcardNo: "", //联系人证件号
        contactIdcardType: "", //联系人证件类型
        contactName: "", //联系人姓名
        contactPhone: "", //联系人手机号
        districtCode: "", //地区编码
        email: "", //联系邮箱
        extend1: "", //扩展字段
        icNetScreenShotUrl: "", //工商网截图
        icpImg: "", //icp 备案照片
        idCardBackImg: "", //法人身份证反面
        idCardFrontImg: "", //法人身份证正面
        idCardHandImg: "", //法人手持身份证
        industryType: "", //经营类目
        latitude: "", //纬度
        legalIdcardNo: "", //法人证件号码
        legalIdcardType: "", //法人证件类型
        legalName: "", //法人姓名
        legalPhone: "", //法人手机号码
        longitude: "", //经度
        merchantName: "", //商户全称
        merchantShortName: "", //商户简称
        orgCodeImg: "", //组织机构代码证照片
        otherImgs: "", //其它图片
        outMerchantNo: "", //外部商户号
        placeImg: "", //营业场所照片
        protocolImg: "", //平台协议
        publicKey: "", //商户公钥
        servicePhone: "", //客服电话
        socialCreditCodeImgUrl: "", //统一社会信用代码
        storeImg: "", //门头照
        sourceId:"",
        sourceName:"",
        dialogImageUrl: "",
        dialogVisible: false,
        selectedOptions: [], //银行选择
        ItemsBank: [], //支行参照
        selectedBank: {}, //选中的支行对象
        infs: [],
        options: [],

        pactures: [
          {
            name: "法人身份证正面:", //照片名字
            code: "idCardFrontImg", //对应字段
            required: true,
            // dialogImageUrl: "",
            // dialogVisible: false,
            imgUrl: require("@/assets/openaccount/u9.png")
          },
          {
            name: "法人身份证反面:", //照片名字
            code: "idCardBackImg", //对应字段
            required: true,
            imgUrl: require("@/assets/openaccount/u97.png")
          },
          {
            name: "法人手持身份证:", //照片名字
            code: "idCardHandImg", //对应字段
            imgUrl: require("@/assets/openaccount/u108.jpg")
          },
          {
            name: "门头照:", //照片名字
            code: "storeImg", //对应字段
            imgUrl: require("@/assets/openaccount/u119.jpg")
          },
          {
            name: "营业执照:", //照片名字
            code: "businessLicenseImg", //对应字段
            required: true,
            imgUrl: require("@/assets/openaccount/u135.png")
          },
          {
            name: "开户许可:", //照片名字
            code: "bankLicenseImg", //对应字段
            imgUrl: require("@/assets/openaccount/u146.png")
          },
          {
            name: "平台协议:", //照片名字
            code: "protocolImg", //对应字段
            imgUrl: require("@/assets/openaccount/u160.svg")
          },
          {
            name: "统一社会信用代码:", //照片名字
            code: "socialCreditCodeImgUrl", //对应字段
            imgUrl: require("@/assets/openaccount/u168.png")
          },
          {
            name: "工商网截图:", //照片名字
            code: "icNetScreenShotUrl", //对应字段
            imgUrl: require("@/assets/openaccount/u179.png")
          },
          {
            name: "icp备案照片:", //照片名字
            code: "icpImg", //对应字段
            imgUrl: require("@/assets/openaccount/u190.png")
          },
          {
            name: "组织机构代码证照片:", //照片名字
            code: "orgCodeImg", //对应字段,
            imgUrl: require("@/assets/openaccount/u201.jpg")
          },
          {
            name: "营业场所照片:", //照片名字
            code: "placeImg", //对应字段
            imgUrl: require("@/assets/openaccount/u119.jpg")
          },
          {
            name: "其它图片:", //照片名字
            code: "otherImgs", //对应字段
            imgUrl: require("@/assets/openaccount/u160.svg")
          }
        ]
      },
      cascaderData: [],
      rules: {
        legalPhone: [
          { required: true, trigger: "blur", validator: checkPhone } //这里需要用到全局变量
        ],
        legalIdcardNo:[
            {validator: checkIdCard, trigger: 'blur' }
          ],
        contactIdcardNo:[
            {validator: checkIdCard, trigger: 'blur' }
          ],
        businessLicense:[
            {validator: checkBusinessLicense, trigger: 'blur' }
          ],
        districtCode:[
            {validator: checkNum, trigger: 'blur' }
          ],
      }
    };
  },

  created() {
    this.headers ={token :getToken()||''}
    this.getNodes();
    this.platformDetailsQuery()
  },

  methods: {
    platformDetailsQuery(){
      platformDetailsQuery().then(res => {
        if(res.code == '0000'){
          this.sourceOp = res.data;
          this.ruleForm.source = this.sourceOp[0]['platformNm'];
        }
      });
    },
    beforeAvatarUpload(file) {
      let typemsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      let arr = ['jpg', 'jpeg', 'png', 'gif', 'JPG', 'JPEG', 'PNG', 'GIF']
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (arr.indexOf(typemsg) === -1) {
        this.$message.error('上传头像图片格式不正确!');
        return false;
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
        return false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid,'fvdfdss')
        if (valid) {
          const {
            dialogImageUrl,
            dialogVisible,
            selectedOptions,
            ItemsBank,
            selectedBank,
            infs,
            options,
            pactures,
            ...storeForm
          } = this.ruleForm;
          // storeForm['sourceId'] = siteId;
          // storeForm['source'] = this.source;
          storeForm['sourceName'] = storeForm['source'];
          storeJoin(storeForm).then(res => {
            if(res.code == '0000'){
              this.$message.success('商户进件成功。');
              this.$store.dispatch('tagsView/delView', this.$route)
              // 返回上一步路由
              this.$router.go(-1)
            } else {
              this.$message.error(res.data.respMsg || 'error');
            }
          });
        } else {
          return false;
        }
      });
    },
    
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //省市区联动
    getNodes(val) {
      let idArea;
      let sizeArea;
      if (!val) {
        idArea = null;
        sizeArea = 0;
      } else if (val.length === 1) {
        idArea = val[0];
        sizeArea = val.length; // 3:一级 4:二级 6:三级
      } else if (val.length === 2) {
        idArea = val[1];
        sizeArea = val.length; // 3:一级 4:二级 6:三级
      } else if (val.length === 3) {
        idArea = val[2];
        sizeArea = val.length; // 3:一级 4:二级 6:三级
      }
      // fu
      // console.log(sizeArea, idArea);
      // fu

      // 干掉银行信息
      if (sizeArea != 0 && sizeArea != 3) {
        this.cascaderData.forEach(v => {
          // console.log(v);
          if (v.cities.length > 0) {
            v.cities.forEach(vs => {
              // console.log(vs);
              if (vs.cities.length > 0) {
                vs.cities = [];
              }
            });
          }
        });
      }

      //获取省份
      if (sizeArea === 0) {
        this.cascaderData = [];
        getProvince().then(response => {
          if (response.data && response.code === "0000") {
            let Items = response.data;
            // 初始化 加载一级 省
            this.cascaderData = Items.map(value => {
              return {
                id: value.nodeCode,
                name: value.nodeName,
                cities: []
              };
            });
          }
          // console.log(this.cascaderData);
        });
      } else if (sizeArea === 1) {
        // console.log(idArea)
        // 点击一级 加载二级 市
        // debugger
        //请求市区数据
        getCity(idArea).then(res => {
          // console.log(res.data);
          let ItemsCity = res.data;
          this.cascaderData.map(value => {
            if (value.id === val[0]) {
              // debugger
              if (!value.cities.length) {
                value.cities = ItemsCity.map(value => {
                  return {
                    id: value.areaCode,
                    name: value.areaName,
                    cities: []
                  };
                });
              }
            }
          });
        });
      } else if (sizeArea === 2) {
        //取银行类型数据

        // console.log(this.cascaderData)
        // debugger
        //拿市的cityOraareacode找市下面的所有银行
        getBank(val[0], val[1]).then(res => {
          let ItemsBank = res.data;

          this.cascaderData.map(value => {
            if (value.id === val[0]) {
              value.cities.map(value => {
                if (value.id === val[1]) {
                  // console.log(value)

                  if (!value.cities.length) {
                    value.cities = ItemsBank.map(value => {
                      // console.log(value);
                      return {
                        id: value.bankId,
                        // id: value.id,
                        name: value.bankName
                        // cities: []
                      };
                    });
                  }
                }
              });
            }
          });
        });
      }
    },

    //选择支行
    getYH() {
      // console.log(this.ruleForm.selectedOptions)
      const arr = this.ruleForm.selectedOptions;
      (this.ruleForm.infs = []),
        getSubBank(arr[0], arr[1], arr[2]).then(res => {
          // console.log(res.data);
          this.ruleForm.infs = res.data;
        });
      // console.log(this.ruleForm.cnapsNo);
    
    },

    selected(item){
      // this.ruleForm.cnapsNo=item.cnapsNo
      this.ruleForm.infs.map(val=>{
        if(val.cnapsNo==item){
           this.ruleForm.subbranchName=val.subbranchName
        }
      })
      // this.ruleForm.subbranchName=item.subbranchName
      console.log(this.ruleForm)
    },

    //选项切换重新获取
    handleItemChange(val) {
      this.getNodes(val);
    },

    //图片上传成功回调
    success(response, file) {
      console.log(response,'fffff4444');
      if (response.code === "0000") {
        console.log(response.code);
        const zz = response.data.code;
        console.log(this.ruleForm[zz]);
        this.ruleForm[zz] = response.data.fileId;
        console.log(this.ruleForm[zz]);

        // this.ruleForm.pactures.map(val => {
        //   if (val.code == zz) {
        //     console.log(val);
        //     val.dialogImageUrl = file.url;
        //   }
        // });
      }
    },
     
  }
};
</script>
<style  scoped>
#open {
  background: #fff;
  width: 100%;
  height: 100%;
  text-align: left;
}
.title {
  border-bottom: 1px solid gray;
  text-align: left;
  font-size: 25px;
  padding: 20px 0;
}
#open .container {
  width: 60%;
  margin: 0 auto;
  min-width: 1024px;
  box-sizing: border-box;
}
#open .center {
  padding: 5% 20%;
}
.title1 {
  border-bottom: 1px dashed gray;
  text-align: left;
  font-size: 22px;
  margin: 30px 0;
}
.title1 span {
  width: 5px;
  height: 25px;
  background: #ff6000;
  display: inline-block;
  margin-bottom: -4px;
  margin-right: 10px;
}
.demoImg {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  text-align: center;
  width: 148px;
  height: 148px;
  margin-left: 8px;
}

.photo /deep/.el-form-item--mini .el-form-item__content,
.el-form-item--mini .el-form-item__label {
  line-height: 28px;
  display: flex;
  justify-content: flex-start;
}
.subtn {
  width: 160px;
  height: 40px;
  background-color: rgba(255, 96, 0, 1);
  border: none;
  border-radius: 5px;
  font-size: 14px;
  margin: 20px auto;
  margin-top: 40px;
}
.zy {
  font-size: 14px;
  color: #ff5000;
  margin-bottom: 20px;
}
.syt-img{
  margin: 0;
}
</style>