/**
 * Created by suman on 11/2/14.
 */

Ext.define('YoutubeVideosApp.store.VideosStore', {
    extend: 'Ext.data.Store',
    alias: 'videosstore',

    requires: ['YoutubeVideosApp.model.VideoModel'],
    config: {
        storeId : 'videosstore',
        model: 'YoutubeVideosApp.model.VideoModel',
        autoLoad: true,
        data: [
            {
                videoUrl : 'foo1_videoUrl',
                imageUrl : 'foo1_imageUrl',
                name: 'foo1_name',
                user: 'foo1_user'
            },
            {
                videoUrl : 'foo2_videoUrl',
                imageUrl : 'foo2_imageUrl',
                name: 'foo2_name',
                user: 'foo2_user'
            },
            {
                videoUrl : 'foo3_videoUrl',
                imageUrl : 'foo3_imageUrl',
                name: 'foo3_name',
                user: 'foo3_user'
            }
        ]
    }
});