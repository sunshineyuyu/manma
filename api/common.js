import User from './user.js'

var setuserinfo = function (userinfo) {
    wx.setStorage({
        key: 'userinfo',
        data: userinfo
    });
};

var dbuserinfo = function () {
    User.wxgetinfo().then(res => {
        if (res.data.status == 1) {
            setuserinfo(res.data.res.userinfo);
        } else {
            wx.showModal({
                title: '提示',
                content: '必须完善基本信息才能正常使用！',
                confirmText: "前去完善",
                showCancel: false,
                success: function (res) {
                    wx.navigateTo({
                        url: '../userinfo/userinfo'
                    });
                }
            });
        }
    });
};

export default {
    
    gettoken: function () {
        var session = wx.getStorageSync('session');
        return session.token;
    },
    getuser: function () {
        var session = wx.getStorageSync('session');
        return session.userInfo;
    },
    settoken: function (token, userinfo) {
        wx.setStorage({
            key: "session",
            data: {
                token: token,
                userInfo: userinfo,
            },
            success: function(){
                dbuserinfo()
            }
        });
    },
    settokenx: function (token, userinfo) {
        wx.setStorage({
            key: "session",
            data: {
                token: token,
                userInfo: userinfo,
            },
            success: function () {
                
            }
        });
    },
    setuserinfo: setuserinfo,
    getuserinfo: function () {
        var userinfo = wx.getStorageSync('userinfo');
        return userinfo;
    },
    dbuserinfo: dbuserinfo,
    formatDate: function (timestamp) {
        var date = new Date(timestamp * 1000);
        var Y = date.getFullYear();
        var M = date.getMonth() + 1;
        var D = date.getDate();
        M = M < 10 ? "0" + M : M;
        D = D < 10 ? "0" + D : D;
        return `${Y}/${M}/${D}`;
    },
    formatTime: function (timestamp) {
        var date = new Date(timestamp * 1000);
        var Y = date.getFullYear();
        var M = date.getMonth() + 1;
        var D = date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        M = M < 10 ? "0" + M : M;
        D = D < 10 ? "0" + D : D;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return `${Y}/${M}/${D} ${h}:${m}:${s}`;
    }
}