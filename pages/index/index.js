import Event from '../../api/event.js'
import Common from '../../api/common.js'

Page({
    data: {
        tab: '',
        region: [],
        list: [],
        sstatus: 0,
        keyword: '',
        no: 0
    },

    onLoad: function () {
        Event.region().then(res => {
            var tabnow = res.data.res.region[0].name;
            this.getList(1, tabnow);
            this.setData({
                region: res.data.res.region,
                tab: tabnow
            });
        });
    },

    tabChange({ detail }) {
        this.setData({
            tab: detail.key
        });
        this.getList(1, detail.key);
    },

    openDetial(e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../detail/detail?id=' + id
        });
    },

    getList: function (page = 1, region = '') {
        Event.events(page, region).then(res => {
            if (res.data.status == 1) {
                var data = res.data.res.events;
                for (var i in data) {
                    data[i].tags = data[i].tags ? data[i].tags.split(',') : [];
                    data[i].time = Common.formatTime(data[i].time);
                }
                this.setData({ list: data, no: 0 });
            } else {
                this.setData({ no: 1 });
            }
        });
    },

    onShareAppMessage: function () {
        return {
            title: '画象',
            path: 'pages/index/index',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }




})
