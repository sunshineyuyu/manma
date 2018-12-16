import Event from '../../api/event.js'
import Common from '../../api/common.js'

Page({

    data: {
        article: ''
    },

    onLoad: function (options) {
        Event.getabout().then(res => {
            console.log(res);
            var data = res.data.res.about;
            let result = data.content;
            let regep = new RegExp('<p>', 'gi');
            let regeimg = new RegExp('<img', 'gi');
            result = result.replace(regep, `<p style="text-indent:2em;margin-bottom:10px;">`);
            result = result.replace(regeimg, `<img style="max-width: 100%;margin-left:-30px;"`);
            this.setData({
                article: result
            });
        });
    },


})