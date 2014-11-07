/**
 * Created by suman on 11/7/14.
 */
Ext.define('YoutubeVideosApp.core.Util', {
    extend: 'Ext.Component',
    requires: ['Ext.device.Device'],
    statics: {
        globalCache: YoutubeVideosApp.core.GlobalCache,
        constants: YoutubeVideosApp.core.Constants,

        getChannelsFromCache: function () {
            var channelStr = this.globalCache.getItem("channels");
            if ( channelStr ) {
                return JSON.parse(channelStr);
            } else {
                return [];
            }
        },

        getObjectValues: function (obj) {
            var vals = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    vals.push(obj[key]);
                }
            }
            return vals;
        },

        getChannelIdsFromCache: function () {
            return this.getObjectValues(this.getChannelsFromCache());
        }
    }
});
