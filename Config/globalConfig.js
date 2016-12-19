'use strict'

/**
 * 全局配置文件
 * liz
 * 2016.12.19
 */
const config={
    // 数据访问api
    api:{
        base:'http://172.16.4.137:8085/',
        //base:'http://61.50.135.114:8085/',
        login:'rest/Author/IsLogin',//登陆
        search:'rest/PatolTreeApi/GetPatolTree',//全文检索
        secondSearch:'rest/PatolTreeApi/GetAutomaticSearch',//全文详细检索
        monitorTypeSearch:' rest/OutputAsPointApi/GetOutput',//监测点专题查询
    },
    map:{
        // method: 'POST',
        // headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        // },
        // follow: 20,
        // timeout: 8000,
        // size: 0,
    }
}
module.exports = config
