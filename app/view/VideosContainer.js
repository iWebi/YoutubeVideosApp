/**
 * Created by suman on 11/2/14.
 */
Ext.define('YoutubeVideosApp.view.VideosContainer', {
    extend: 'Ext.Container',
    xtype: 'videos',
    requires: ['YoutubeVideosApp.view.VideosList'],
    config: {
        layout: 'vbox',
        items: [
            { xtype: 'videoslist' }
        ]
    }
});