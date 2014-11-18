/**
 * Created by suman on 11/7/14.
 */
Ext.define('YoutubeVideosApp.controller.SettingsController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            settingView: 'youtube_settings',
            removeChannels: 'button[text=Done]',
            addChannelById: 'button[text=Add By Id]',
            addChannelByName: 'button[text=Add By Name]'
        },

        routes: {},

        control: {
            removeChannels: {tap: 'onRemoveChannels'},
            addChannelById: {tap: 'onChannelAddById'},
            addChannelByName: {tap: 'onChannelAddByName'}
        }
    },

    onChannelAddById: function (button, e, eOpts) {
        var util = YoutubeVideosApp.core.Util,
            channelId = button.up('.fieldset').down('#channelId').getValue(),
            existingChannelIds = util.getChannelIdsFromCache();
        if (existingChannelIds.indexOf(channelId) != -1) {
            Ext.Msg.alert("DUPLICATE", "channel id " + channelId + " is already added");
        } else {
            console.log("channelId to be added is  " + channelId);
        }
    },

    onChannelAddByName: function (button, e, eOpts) {
        var util = YoutubeVideosApp.core.Util,
            existingChannels = util.getChannelsFromCache(),
            channelName = button.up('.fieldset').down('#channelName').getValue();
        if (existingChannels[channelName]) {
            Ext.Msg.alert("DUPLICATE", "channel name " + channelName + " is already added");
        } else {
            console.log("channelName to be added is  " + channelName);
        }
    },

    onRemoveChannels: function (button, e, eOpts) {
        var sheet = button.up('sheet'),
            channelItems = sheet.query('checkboxfield'),
            confirmResponse = function (buttonID) {
                if (buttonID != "no") {
                    console.log("channels will be removed=" + JSON.stringify(channelNamesToRemove));
                    var util = YoutubeVideosApp.core.Util,
                        channelsObj = util.getChannelsFromCache();
                    for (var i = 0; i < channelItems.length; i++) {
                        delete channelsObj[channelItems[i].getName()];
                    }
                    //update the cache and session data and trigger refresh of UI
                    console.log("setting channelsObj after deleting channels=" + JSON.stringify(channelsObj));
                    util.setChannelsToCacheAndSession(channelsObj);

                    //delete cache of movies to reload
                    util.deleteCachedDataForChannelMovies();

                    //refresh the videos
                    var videosContainer = Ext.ComponentQuery.query(".videos")[0];
                    videosContainer.refreshVideos();
                }
                sheet.hide();
            },
            channelNamesToRemove = [];

        console.log("channelItems.length=" + channelItems.length);
        for (var i = 0; i < channelItems.length; i++) {
            var channelItem = channelItems[i];
            if (channelItem.isChecked()) {
                channelNamesToRemove.push(channelItem.getName());
            }
        }
        if (channelNamesToRemove.length > 0) {
            Ext.Msg.confirm("Remove Channels", "Are you sure you want to remove selected channels?", confirmResponse);
        } else {
            sheet.hide();
        }
    }
});