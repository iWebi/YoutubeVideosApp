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
        getObjectKeys: function (obj) {
            var keys = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
            return keys;
        },

        isUserLoggedIntoYoutube: function () {
            var cache = YoutubeVideosApp.core.GlobalCache,
                constants = YoutubeVideosApp.core.Constants,
                loggedInDate = cache.getIntItem(constants.YOUTTUBE_LOGGED_IN_TIME_CACHE_KEY),
                isLoggedIn = false;
            if (loggedInDate) {
                var expiryInMillis = cache.getIntItem(constants.YOUTTUBE_TOKEN_EXPIRY_CACHE_KEY) * 1000;
                if ((new Date().getTime() - loggedInDate) <= expiryInMillis) {
                    isLoggedIn = true;
                }
            }
            return isLoggedIn;
        },

        getChannelIdsFromCache: function () {
            return this.getObjectValues(this.getChannelsFromCache());
        },

        // Call the Data API to retrieve the playlist ID that uniquely identifies the
        // list of videos uploaded to the currently authenticated user's channel.
        cacheFavouritesPlayListId: function () {
            var cache = YoutubeVideosApp.core.GlobalCache,
                constants = YoutubeVideosApp.core.Constants,
                cached_entry = cache.getItem(constants.YOUTTUBE_FAVORITES_PLAY_LIST_ID_CACHE_KEY);
            if ( !cached_entry ) {
                Ext.Ajax.request({
                    url: 'https://www.googleapis.com/youtube/v3/channels',
                    params: {
                        part: 'contentDetails',
                        mine: true,
                        access_token: cache.getItem(constants.YOUTTUBE_ACCESS_TOKEN_CACHE_KEY)
                    },
                    method: 'GET',
                    success: function (response) {
                        var jsonResponse = JSON.parse(response.responseText),
                            favoritesId = jsonResponse.items[0].contentDetails.relatedPlaylists.favorites;
                        cache.setItem(constants.YOUTTUBE_FAVORITES_PLAY_LIST_ID_CACHE_KEY, favoritesId);
                    },
                    failure: function (response, opts) {
                        console.log('Favorites ID retrieval failure with status code ' + response.status);
                        //TODO: How to handle this scenario
                    }
                });
            }
        },

        addVideoToFavorites : function(videoId) {
            var cache = YoutubeVideosApp.core.GlobalCache,
                constants = YoutubeVideosApp.core.Constants,
                access_token_value = cache.getItem(constants.YOUTTUBE_ACCESS_TOKEN_CACHE_KEY),
                favorites_playlist_id = cache.getItem(constants.YOUTTUBE_FAVORITES_PLAY_LIST_ID_CACHE_KEY),
                jsonData = {
                "snippet" : {
                    "playlistId" : favorites_playlist_id,
                    "resourceId" : {
                        "kind" : "youtube#video",
                        "videoId": videoId
                    }
                }
            };
            Ext.Ajax.request({
                url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet',
                jsonData: jsonData,
                method : 'POST',
                params: {
                    access_token: access_token_value
                },
                success: function(response){
                    console.log("Success in adding video to playlist");
                },
                failure: function (response, opts) {
                    console.log('Adding videos to favorites failure with status code ' + response.status);
                    //TODO: How to handle this scenario
                }
            });
        },

        getChannelNamesFromCache : function() {
            return this.getObjectKeys(this.getChannelsFromCache());
        },


        validate_access_token : function (access_token_value) {
            //Validate the returned token
            Ext.Ajax.request({
                url: 'https://www.googleapis.com/oauth2/v1/tokeninfo',
                params: {
                    access_token: access_token_value
                },
                success: function(response){
                    console.log("access_token validated successfully");
                }
            });
        },
        refresh_access_token : function() {
            //there is no direct way to get a refresh token from google auth server usingJavascript based client. See below
            //http://stackoverflow.com/questions/15399883/youtube-api-is-there-a-way-to-refresh-an-access-token-in-the-client-side-v3-api
        }
    }
});