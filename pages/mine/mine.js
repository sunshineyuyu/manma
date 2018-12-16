import User from '../../api/user.js'
import Common from '../../api/common.js'

Page({

    data: {
        is_login: 0,
        user: {}
    },

    onLoad: function (options) {

    },

    bindgetuserinfo: function (e) {
        if (e.detail.userInfo) {
            wx.login({
                success: res => {
                    var userInfoStr = JSON.stringify(e.detail);
                    User.wxlogin(res.code, userInfoStr).then(res => {
                        if (res.data.status == 1) {
                            Common.settokenx(res.data.res.token, userInfoStr);
                            this.setData({
                                is_login: 1,
                                user: e.detail.userInfo
                            });
                        } else { }
                    });
                }
            })
        } else {
            this._showTips('必须同意授权才能正常使用本程序');
        }
    },

    onShow: function () {
        var user = Common.getuser();
        if (typeof (user) == 'string') {
            user = JSON.parse(user);
            user = user.userInfo;
            console.log(user);
            this.setData({
                user: user,
                is_login: 1
            });
        }
    },

    _showTips: function (tips) {
        wx.showModal({
            title: '提示',
            content: tips,
            confirmText: "我知道了",
            showCancel: false,
            success: function (res) {
                wx.navigateBack();
            }
        });
    }


})