/**
 * Created by suman on 11/7/14.
 */
Ext.define('YoutubeVideosApp.core.Util', {
    extend: 'Ext.Component',
    requires: ['Ext.device.Device'],
    statics: {
        getChannelsFromCache: function () {
            var channelStr = YoutubeVideosApp.core.GlobalCache.getItem("channels") || "{}";
            return JSON.parse(channelStr);
        },

        setChannelsToCacheAndSession: function (channels) {
            YoutubeVideosApp.core.GlobalCache.setItem("channels", JSON.stringify(channels));
            YoutubeVideosApp.core.Session.cacheIt("channels", channels);
        },

        isEmpty: function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
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

        isUserLoggedIntoYoutube: function () {
            var loggedInDate = YoutubeVideosApp.core.Session.getFromCache("LoggedInDate"),
                isLoggedIn = false;
            if (loggedInDate) {
                var expiryInSeconds = YoutubeVideosApp.core.Session.getFromCache("expires_in");
                if ((new Date().getTime() - loggedInDate.getTime()) <= expiryInSeconds) {
                    isLoggedIn = true;
                }
            }
            return isLoggedIn;
        },

        getChannelIdsFromCache: function () {
            return this.getObjectValues(this.getChannelsFromCache());
        }
    }
});