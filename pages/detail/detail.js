import Event from '../../api/event.js'
import Common from '../../api/common.js'

Page({
    data: {
        article: {
            id: 0,
            image: '',
            tags: '',
            region: '',
            link: '',
            title: '',
            content: ''
        }
    },

    onLoad: function (options) {
        var id = options.id;
        if (!id) { wx.navigateBack(); }
        Event.event(id).then(res => {
            if (res.data.status == 1) {
                var data = res.data.res.event;
                data.tags = data.tags ? data.tags.split(',') : [];
                data.time = Common.formatTime(data.time);

                let result = data.content;
                let regep = new RegExp('<p>', 'gi');
                let regeimg = new RegExp('<img', 'gi');
                result = result.replace(regep, `<p style="text-indent:2em;margin-bottom:10px;">`);
                result = result.replace(regeimg, `<img style="max-width: 100%;margin-left:-30px;"`);

                data.content = result;
                this.setData({ article: data });
            } else {
                this._showTips('你来晚了，活动已经被删除了，看看其他的吧！');
            }
        });
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