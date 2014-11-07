/**
 * Created by suman on 11/7/14.
 */
Ext.define('YoutubeVideosApp.core.Util', {
    extend: 'Ext.Component',
    requires: ['Ext.device.Device'],
    statics: {
        getChannelsFromCache: function () {
            var channelStr = YoutubeVideosApp.core.GlobalCache.getItem("channels");
            if (channelStr) {
                return JSON.parse(channelStr);
            } else {
                return [];
            }
        },

        setChannelsToCacheAndSession: function (channels) {
            YoutubeVideosApp.core.GlobalCache.setItem("channels", JSON.stringify(channels));
            YoutubeVideosApp.core.Session.cacheIt("channels", channels);
        },

        deleteCachedDataForChannelMovies: function () {
            //remove the datetime and movies json data of channel
            YoutubeVideosApp.core.GlobalCache.removeItem(YoutubeVideosApp.core.Constants.DATE_CACHE_KEY_FOR_MOVIES);
            YoutubeVideosApp.core.GlobalCache.removeItem(YoutubeVideosApp.core.Constants.CACHE_KEY_FOR_MOVIES);
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