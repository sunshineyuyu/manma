import Common from './common.js'

const URL = 'https://time.zhangtutu.top/man_php';

export default {
    userlist: function () {
        var url = URL + '/userlist';
        var promise = new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                data: { page: 1 },
                method: 'get',
                header: {
                    'content-type': 'application/json'
                },
                success: resolve,
                fail: reject
            });
        });
        return promise;
    },
    wxlogin: function (code, userInfoStr) {
        var url = URL + '/wxlogin';
        var promise = new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                data: {
                    code: code,
                    userInfo: userInfoStr
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: resolve,
                fail: reject
            });
        });
        return promise;
    },
    wxupdatetoken: function(code){
        var url = URL + '/wxupdatetoken';
        var promise = new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                data: {
                    code: code
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: resolve,
                fail: reject
            });
        });
        return promise;
    },
    saveinfo: function (info) {
        var url = URL + '/wxsaveinfo';
        info.token = Common.gettoken();
        var promise = new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                data: info,
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: resolve,
                fail: reject
            });
        });
        return promise;
    },
    wxgetinfo: function () {
        var url = URL + '/wxgetinfo';
        var promise = new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                data: { token: Common.gettoken() },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'get',
                success: resolve,
                fail: reject
            });
        });
        return promise;
    }
}