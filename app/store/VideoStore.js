/**
 * Created by suman on 11/3/14.
 */
Ext.define('YoutubeVideosApp.store.VideoStore', {
    extend: 'Ext.data.Store',
    alias: 'videostore',
    requires: ['YoutubeVideosApp.model.VideoModel', 'YoutubeVideosApp.core.GlobalCache', 'YoutubeVideosApp.core.Session', 'YoutubeVideosApp.core.Constants'],
    config: {
        storeId: 'videostore',
        model: 'YoutubeVideosApp.model.VideoModel',
        autoLoad: false, //we need to wait until we get channel information from Session
        proxy: {
            url : 'http://localhost:9090/youtube/channel_videos',
            useDefaultXhrHeader : false,
            defaultHeaders: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            type: 'ajax',
            reader: {
                type: 'json'
            }
        },
        listeners: {
            beforeload: function (store, operations, eOpts) {
                console.log("call to before load");
                this.updateProxyUrl();
                //---------------------------------------------------------------------------------------------------------
                // HACKY PROCEDURE TO PREVENT STORE FROM MAKING AJAX REQUEST IF LOCAL STORAGE HAS DATA CACHED
                //---------------------------------------------------------------------------------------------------------
                var me = this,
                    data = me.getDataFromCache();
                if (data) {
                    store.setData(data);
                    return false; //prevent store calling load
                }
                return true;
            },

            load: function (store, records, successful, operation, eOpts) {
                console.log("call to load made");
                //Once the data is loaded, cache it
                var me = this,
                    cache = YoutubeVideosApp.core.GlobalCache,
                    constants = YoutubeVideosApp.core.Constants;
                cache.setItem(constants.DATE_CACHE_KEY_FOR_MOVIES, new Date().getTime());
                cache.setItem(constants.CACHE_KEY_FOR_MOVIES, me.createMoviesCacheData(records));
            }
        }
    },

    createMoviesCacheData: function (records) {
        //records element holds all the Movie model instances. However it has circular dependency properties.
        // converting the records to JSON fails due to circular references
        // Adopting the solution suggested in http://stackoverflow.com/questions/11616630/json-stringify-avoid-typeerror-converting-circular-structure-to-json
        var data = [];
        for (var i = 0; i < records.length; i++) {
            data.push(records[i].data)
        }
        return JSON.stringify(data);
    },

    // For each test launched, entire data (i.e all questions) are retrieved and stored in local storage cache.
    // Initial launch of the application will load the "InitialLoad" data which includes overall application
    // information such as available tests, and their last updated timestamp.
    // Compare the timestamp from InitialLoad with the timestamp of the cached item. If timestamp from initial load matches
    // with cache timestamp, we can safely use cache. Else return null so that Store will issue Ajax request
    // and update cache
    getDataFromCache: function () {
        var me = this,
            cache = YoutubeVideosApp.core.GlobalCache,
            data = null;
        if (!me.isCacheDataStale()) {
            var cachedDataStr = cache.getItem(YoutubeVideosApp.core.Constants.CACHE_KEY_FOR_MOVIES);
            if (cachedDataStr) {
                console.log("Got data from cache");
                data = JSON.parse(cachedDataStr);
                if (!data || data.length == 0) {
                    data = null;
                }
            }
        }
        return data;
    },

    //If data is cached for more than 2 hours, its considered stale
    isCacheDataStale: function () {
        var me = this,
            cache = YoutubeVideosApp.core.GlobalCache,
        // date is cached separately so that we can parse this item independently to improve performance
            cachedDateTime = cache.getItem(YoutubeVideosApp.core.Constants.DATE_CACHE_KEY_FOR_MOVIES),
            isStale = true;
        if (cachedDateTime) {
            var currentTime = new Date().getTime(),
                diffHours = (currentTime - cachedDateTime) / (3600000); // 1000*60*60
            if (diffHours <= 12) {
                isStale = false;
            }
        }
        return isStale;
    },

    updateProxyUrl: function () {
        var me = this,
            proxy = me.getProxy(),
            channelIds = YoutubeVideosApp.core.Session.getFromCache("channelIds");
        if ( channelIds ) {
            console.log("updating proxy url");
            proxy.setExtraParam("channelIds", JSON.stringify(channelIds));
            me.updateProxy(proxy, null);
        }
    }
});
