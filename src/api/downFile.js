import request from '@/utils/request'

export function downClick(content,fileName){
    const blob = new Blob([content])
    // const fileName = '导出信息.xlsx'
    if ('download' in document.createElement('a')) { // 非IE下载
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
    } else { // IE10+下载
        navigator.msSaveBlob(blob, fileName)
    }
}

export function tradeExports(query) {//交易
    return request({
        url:'/pay/api/v1/service/exports',
        method: 'get',
        responseType:'blob',
        params: query
    })
}

export function payRefundexport(query) {//退款
    return request({
        url:'/pay/api/v1/service/payRefundexport',
        method: 'get',
        responseType:'blob',
        params: query
    })
}

export function reconciliationFileExport2(query) {//账务管理明细导出
    return request({
        url:'/pay/api/v1/reconciliationFileExport2',
        method: 'get',
        responseType:'blob',
        params: query
    })
}