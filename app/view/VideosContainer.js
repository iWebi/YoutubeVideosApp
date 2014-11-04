/**
 * Created by suman on 11/2/14.
 */
Ext.define('YoutubeVideosApp.view.VideosContainer', {
    extend: 'Ext.Container',
    xtype: 'videos',
    requires: ['YoutubeVideosApp.view.VideosList', 'YoutubeVideosApp.store.VideoStore'],
    config: {
        layout: 'vbox',
        channelId: null,
        flex : 1,
        scrollable: true,
        listeners: {
            initialize: function () {
                var me = this,
                    store = Ext.create('YoutubeVideosApp.store.VideoStore', {
                        channelId: me.getChannelId()
                    });
                me.add([
//                        {
//                            docked: 'top',
//                            xtype: 'titlebar',
//                            padding : 10,
//                            title: me.getChannelId()
//                        },
                        {
                            xtype: 'videoslist',
                            store: store
                        }
                    ]
                );
            }
        }
    }
});