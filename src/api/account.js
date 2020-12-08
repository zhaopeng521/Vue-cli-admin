import request from '@/utils/request'
import store from '@/store';

export function userLogin(data) {//登录
  let cc = store.state;
  return request({
    url:'/pay/api/v1/service/user/userLogin',
    method: 'post',
    data
  })
}
export function loginout() {//退出
  return request({
    url:'/pay/api/v1/service/user/loginout',
    method: 'post',
  })
}
export function platformDetailsQuery() {//退出
  return request({
    url:'/pay/api/v1/platformDetailsQuery',
    method: 'post',
  })
}
export function payManage(data) {//交易管理列表
  return request({
    url:'/pay/api/v1/payManage',
    method: 'post',
    data
  })
}
export function userInfoByMerchantNoQuery(data) {//查询用户
  return request({
    url:'/pay/api/v1/userInfoByMerchantNoQuery',
    method: 'post',
    data
  })
}
// 分润设置页面的增删改查
export function ledger(data) {
  return request({
    url:'/pay/api/v1/ledger',
    method: 'post',
    data
  })
}
export function saveLedger(data) {
  return request({
    url:'/pay/api/v1/saveLedger',
    method: 'post',
    data
  })
}
export function updateLedger(data) {
  return request({
    url:'/pay/api/v1/updateLedger',
    method: 'post',
    data
  })
}
export function deleteLedger(data) {
  return request({
    url:'/pay/api/v1/deleteLedger',
    method: 'post',
    data
  })
}
// 账务明细查询
export function transactionDetailsQuery(data) {
  return request({
    url:'/pay/api/v1/transactionDetailsQuery',
    method: 'post',
    data
  })
}

export function withdraw(data) { //提现
  return request({
    url:'/pay/api/v1/withdraw',
    method: 'post',
    data
  })
}
export function balanceQuery(data) { //余额查询(聚合)
  return request({
    url:'/pay/api/v1/balanceQuery',
    method: 'post',
    data
  })
}
export function selectShortName(data) { //余额查询(聚合)
  return request({
    url:'/pay/api/v1/selectShortName',
    method: 'post',
    data
  })
}
export function salanceQuery() { //账户余额查询
  return request({
    url:'/pay/api/v1/service/salanceQuery',
    method: 'post',
  })
}
export function enterpriseAccountOpenQuery(data) { //商户进件查询
  return request({
    url:'/pay/api/v1/service/enterpriseAccountOpenQuery',
    method: 'post',
    data
  })
}
export function bindingCardByMerchantQuery(data) { //绑卡名称
  return request({
    url:`/pay/api/v1/bindingCardByMerchantQuery/${data}`,
    method: 'post',
  })
}
export function payRefund(data) { //退款管理查询列表
  return request({
    url:'/pay/api/v1/payRefund',
    method: 'post',
    data
  })
}
export function paycheck(data) { //交易管理详情
  return request({
    url:`/pay/api/v1/service/paycheck`,
    method: 'post',
    data
  })
}
//提交商户进件
export function storeJoin(data) {
  return request({
    url:'/pay/api/v1/service/enterpriseAccountOpen',
    method: 'POST',
    data: data
  })

}
//获取省份
export function getProvince(params) {
  return request({
    url:'/pay/api/v1/service/getProvince',
    method: 'POST',
    params: params
  })
}
//获取城市
export function getCity(params) {
  return request({
    url:'/pay/api/v1/service/getCityInfo/' + params,
    method: 'POST',
  })
}
//获取银行
export function getBank(provinceCode, cityCode) {
  return request({
    url:'/pay/api/v1/service/getBanknameInfo/' + provinceCode + "/" + cityCode,
    method: 'POST',
  })
}



//获取支行
export function getSubBank(provinceCode, cityCode, bankId, subbranchName) {
  return request({
    url:'/pay/api/v1/service/getBankno/',
    method: 'POST',
    data: {
      bankId: bankId, //银行ID
      cityCode: cityCode, //市Code
      provinceCode: provinceCode, //省Code
      subbranchName: subbranchName //支行名称
    }
  })
}