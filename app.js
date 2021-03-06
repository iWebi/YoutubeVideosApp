/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when it performs code generation tasks such as generating new
 models, controllers or views and when running "sencha app upgrade".

 Ideally changes to this file would be limited and most work would be done
 in other places (such as Controllers). If Sencha Cmd cannot merge your
 changes and its generated code, it will produce a "merge conflict" that you
 will need to resolve manually.
 */

Ext.application({
    name: 'YoutubeVideosApp',

    requires: [
        'Ext.MessageBox'
    ],

    views: [
        'Main', 'VideosList', 'VideosContainer', 'VideoListItem', 'SettingsPanel', 'ChannelsRemoveSheet'
    ],
    stores: [
        'StaticVideosStore', 'VideoStore'
    ],
    models: [
        'VideoModel', 'StaticVideoModel'
    ],
    controllers: [
        'SettingsController'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function () {

        this.ensureDefaultChannels();
        this.setupSessionData();

        if ( window.location.hash ) {
            this.onYoutubeAuthRedirect();
        }

        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('YoutubeVideosApp.view.Main'));
    },

    onYoutubeAuthRedirect: function () {
        if (window.location.hash) {
            var params = window.location.hash.substring(1).split('&');
            if (params[0].split('=')[0] == 'access_token') {
                var access_token_value = params[0].split('=')[1],
                    cache = YoutubeVideosApp.core.GlobalCache;
                cache.setItem(YoutubeVideosApp.core.Constants.YOUTTUBE_LOGGED_IN_TIME_CACHE_KEY, new Date().getTime());
                for (var i = 0; i < params.length; i++) {
                    var paramParts = params[i].split('=');
                    cache.setItem(paramParts[0], paramParts[1]);
                }
                YoutubeVideosApp.core.Util.validate_access_token(access_token_value);
            }
        }
    },

    ensureDefaultChannels: function () {
        // first time launch will not have any channels to search for
        // Use a set of default channels
        var util = YoutubeVideosApp.core.Util,
            channels = util.getChannelsFromCache();
        if (util.isEmpty(channels)) {
            var defaultChannels = { 'Volga Video': 'UCIeNlITYK46VkR7yIuTL8GQ', 'MaaTV': 'UCJF4y2nyCCrDKTgA7dxz1Qw' };
            YoutubeVideosApp.core.GlobalCache.setItem('channels', JSON.stringify(defaultChannels));
        }
    },

    setupSessionData: function () {
        YoutubeVideosApp.core.Session.cacheIt("channelIds", YoutubeVideosApp.core.Util.getChannelIdsFromCache());
    },

    onUpdated: function () {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function (buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
