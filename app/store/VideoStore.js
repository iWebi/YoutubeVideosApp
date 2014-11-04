/**
 * Created by suman on 11/3/14.
 */
Ext.define('YoutubeVideosApp.store.VideoStore', {
    extend: 'Ext.data.Store',
    alias: 'videostore',

    requires: ['YoutubeVideosApp.model.VideoModel', 'YoutubeVideosApp.core.GlobalCache'],
    config: {
        storeId: 'videostore',
        model: 'YoutubeVideosApp.model.VideoModel',
        channelId: null,
        proxy: {
            type: 'ajax',
            url: 'https://www.googleapis.com/youtube/v3/search',
            useDefaultXhrHeader: false,
            extraParams: {
                part: 'snippet',
                maxResults: 30,
                key: 'AIzaSyByR-19brS7IWGmskOHhXiaCpSUxWfQOeU',
                order:'date',
                type:'video',
                videoDuration:'long'
            },
            reader: {
                type: 'json',
                rootProperty: 'items'
            }
        },
        listeners: {
            beforeload: function (store, operations, eOpts) {
                //---------------------------------------------------------------------------------------------------------
                // HACKY PROCEDURE TO PREVENT STORE FROM MAKING AJAX REQUEST IF LOCAL STORAGE HAS DATA CACHED
                //---------------------------------------------------------------------------------------------------------
                var me = this,
                    data = me.getDataFromCache();
                if (data) {
                    store.setData(data);
                    //fire the refresh event so that views can get updated
                    me.fireEvent('refresh', me, data);
                    return false; //prevent store calling load
                }
                return true;
            },

            load: function (store, records, successful, operation, eOpts) {
                //Once the data is loaded, cache it
                var me = this,
                    cache = YoutubeVideosApp.core.GlobalCache;
                cache.setItem(me.getCacheKeyForDateTime(), new Date().getTime());
                cache.setItem(me.getCacheKeyForMoviesData(), me.createMoviesCacheData(records));
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

    getCacheKeyForDateTime: function () {
        return this.getChannelId() + "-DateTime";
    },

    getCacheKeyForMoviesData: function () {
        return this.getChannelId();
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
            var cachedDataStr = cache.getItem(me.getCacheKeyForMoviesData());
            if (cachedDataStr) {
                console.log("Got data from cache=|"+cachedDataStr+"|");
                data = JSON.parse(cachedDataStr);
                if ( !data || data.length == 0 ) {
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
            cachedDateTime = cache.getItem(me.getCacheKeyForDateTime()),
            isStale = true;
        if (cachedDateTime) {
            var currentTime = new Date().getTime(),
                diffHours = (currentTime - cachedDateTime) / (3600000); // 1000*60*60
            if (diffHours <= 2) {
                isStale = false;
            }
        }
        return isStale;
    },

    initialize: function () {
        this.updateProxyUrl();
        this.callParent(arguments);
    },
    updateProxyUrl: function () {
        var me = this;
        me.getProxy().setExtraParam('channelId',me.getChannelId());
//        me.updateProxy(me.getProxy(), null);
    }
});
