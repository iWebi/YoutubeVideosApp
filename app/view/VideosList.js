/**
 * Created by suman on 11/2/14.
 */
Ext.define('YoutubeVideosApp.view.VideosList', {
    extend: 'Ext.List',
    xtype: 'videoslist',
    requires: ['YoutubeVideosApp.store.StaticVideosStore'],
    config : {
        scrollable: true,
        flex: 1,
        itemTpl: '{videoUrl}-{imageUrl}',
        store : 'videostore'
    }
});