/**
 * Created by suman on 11/2/14.
 */

Ext.define('YoutubeVideosApp.store.StaticVideosStore', {
    extend: 'Ext.data.Store',
    alias: 'staticvideosstore',

    requires: ['YoutubeVideosApp.model.VideoModel'],
    config: {
        storeId : 'staticvideosstore',
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
            },
            {
                videoUrl : 'foo4_videoUrl',
                imageUrl : 'foo1_imageUrl',
                name: 'foo1_name',
                user: 'foo1_user'
            },
            {
                videoUrl : 'foo5_videoUrl',
                imageUrl : 'foo2_imageUrl',
                name: 'foo2_name',
                user: 'foo2_user'
            },
            {
                videoUrl : 'foo6_videoUrl',
                imageUrl : 'foo3_imageUrl',
                name: 'foo3_name',
                user: 'foo3_user'
            },
            {
                videoUrl : 'foo7_videoUrl',
                imageUrl : 'foo1_imageUrl',
                name: 'foo1_name',
                user: 'foo1_user'
            },
            {
                videoUrl : 'foo8_videoUrl',
                imageUrl : 'foo2_imageUrl',
                name: 'foo2_name',
                user: 'foo2_user'
            },
            {
                videoUrl : 'foo9_videoUrl',
                imageUrl : 'foo3_imageUrl',
                name: 'foo3_name',
                user: 'foo3_user'
            },
            {
                videoUrl : 'foo10_videoUrl',
                imageUrl : 'foo1_imageUrl',
                name: 'foo1_name',
                user: 'foo1_user'
            },
            {
                videoUrl : 'foo11_videoUrl',
                imageUrl : 'foo2_imageUrl',
                name: 'foo2_name',
                user: 'foo2_user'
            },
            {
                videoUrl : 'foo12_videoUrl',
                imageUrl : 'foo3_imageUrl',
                name: 'foo3_name',
                user: 'foo3_user'
            },
            {
                videoUrl : 'foo13_videoUrl',
                imageUrl : 'foo1_imageUrl',
                name: 'foo1_name',
                user: 'foo1_user'
            },
            {
                videoUrl : 'foo14_videoUrl',
                imageUrl : 'foo1_imageUrl',
                name: 'foo1_name',
                user: 'foo1_user'
            },
            {
                videoUrl : 'foo15_videoUrl',
                imageUrl : 'foo2_imageUrl',
                name: 'foo2_name',
                user: 'foo2_user'
            },
            {
                videoUrl : 'foo16_videoUrl',
                imageUrl : 'foo3_imageUrl',
                name: 'foo3_name',
                user: 'foo3_user'
            },
            {
                videoUrl : 'foo17_videoUrl',
                imageUrl : 'foo1_imageUrl',
                name: 'foo1_name',
                user: 'foo1_user'
            },
            {
                videoUrl : 'foo18_videoUrl',
                imageUrl : 'foo2_imageUrl',
                name: 'foo2_name',
                user: 'foo2_user'
            },
            {
                videoUrl : 'foo19_videoUrl',
                imageUrl : 'foo3_imageUrl',
                name: 'foo3_name',
                user: 'foo3_user'
            }
        ]
    }
});