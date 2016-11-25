'use strict'

//http://rap.taobao.org/mockjs/7756/api/list?accessToken=ssss

const config={
    api:{
        base:'http://172.16.4.137:8085/',
        login:'rest/Author/IsLogin?userName={userName}&passWord={passWord}',

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
