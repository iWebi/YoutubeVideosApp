/**
 * Created by suman on 11/2/14.
 */
Ext.define('YoutubeVideosApp.view.VideosContainer', {
    extend: 'Ext.Container',
    xtype: 'videos',
    requires: ['YoutubeVideosApp.view.VideosList', 'YoutubeVideosApp.store.VideoStore'],
    config: {
        layout: 'vbox',
        items: [
            { xtype: 'videoslist' }
        ]
    },
    addStore: function () {
        var me = this,
            store = Ext.create('YoutubeVideosApp.store.VideoStore', {
                channelId: 'UC3djj8jS0370cu_ghKs_Ong'
            });
        store.load();
    },

    initialize: function () {
        var me = this;
        me.addStore();
        me.callParent(arguments);
    }
});