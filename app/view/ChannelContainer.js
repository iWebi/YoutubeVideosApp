/**
 * Created by suman on 11/2/14.
 */
Ext.define('YoutubeVideosApp.view.ChannelContainer', {
    extend: 'Ext.Container',
    xtype: 'channels',
    requires: ['YoutubeVideosApp.core.GlobalCache', 'YoutubeVideosApp.view.VideosContainer'],
    config: {
        layout: 'fit',
        scrollable: true,
        listeners: {
            initialize: function () {
                var me = this,
                    channelIds = me.getChannelIds();
                if (!channelIds || channelIds.length == 0) {
                    me.add({
                        html: "No videos to list. Please select at least one channel to give you search results"
                    });
                }
                else {
                    var channelComponents = [];
                    for (var i = 0; i < channelIds.length; i++) {
                        channelComponents.push(
                            {
                                xtype: 'videos',
                                channelId: channelIds[i]
                            }
                        );
//                        channelComponents.push({ xtype: 'spacer'});
                    }
                    me.add(channelComponents);
                }
            }
        }
    },
    //fetch the channels added by user
    getChannelIds: function () {
        var channelIdsString = YoutubeVideosApp.core.GlobalCache.getItem('channelIds');
        if (channelIdsString)
            return JSON.parse(channelIdsString);
        else
            return null;
    }
});