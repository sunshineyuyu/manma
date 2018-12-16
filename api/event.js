import Common from './common.js'

const URL = 'https://time.zhangtutu.top/man_php';

export default {
    events: function (page = 1, region = '') {
        var url = URL + '/events';
        var data = { page: page ? page : 1, active: 1 };
        if(region) data.region = region;
        var promise = new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                data: data,
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
    event: function (id) {
        var url = URL + '/event/' + id;
        var promise = new Promise(function (resolve, reject) {
            wx.request({
                url: url,
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
    myevent: function () {
        var url = URL + '/myevent';
        var promise = new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                method: 'get',
                data: { token: Common.gettoken() },
                header: {
                    'content-type': 'application/json'
                },
                success: resolve,
                fail: reject
            });
        });
        return promise;
    },
    region: function () {
        var url = URL + '/region';
        var promise = new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                method: 'get',
                data: { token: Common.gettoken() },
                header: {
                    'content-type': 'application/json'
                },
                success: resolve,
                fail: reject
            });
        });
        return promise;
    },
    getabout: function(){
        var url = URL + '/getabout';
        var promise = new Promise(function (resolve, reject) {
            wx.request({
                url: url,
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
    sitembyid: function (eid) {
        var url = URL + '/sitembyid/' + eid;
        var promise = new Promise(function (resolve, reject) {
            wx.request({
                url: url,
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
    submitsurvey: function (id, data) {
        var data = {
            id: id,
            items: JSON.stringify(data),
            token: Common.gettoken()
        };
        var url = URL + '/submitsurvey';
        var promise = new Promise(function (resolve, reject) {
            wx.request({
                url: url,
                data: data,
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: resolve,
                fail: reject
            });
        });
        return promise;
    }
}