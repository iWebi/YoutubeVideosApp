/**
 * Created by suman on 11/2/14.
 */
Ext.define('YoutubeVideosApp.view.VideosContainer', {
    extend: 'Ext.Container',
    xtype: 'videos',
    requires: ['YoutubeVideosApp.view.VideosList'],
    config: {
        layout: 'vbox',
        flex: 1,
        scrollable: true,
        items: [
            {
                xtype: 'videoslist'
            }
        ]
    },
    refreshVideos : function() {
        console.log("refreshing videos");
        var me = this;
        me.remove(me.down('.videoslist'), true);
        me.add( { xtype : 'videoslist' } );
    }
});