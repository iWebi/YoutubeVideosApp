/**
 * Created by suman on 11/2/14.
 */
Ext.define('YoutubeVideosApp.model.VideoModel', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'videoId',// its better if this name is not same as any fields name
        fields: [
            {
                name: 'snippet'
            },
            {
                name: 'thumbnail',
                mapping: 'snippet.thumbnails.default.url'
            },
            {
                name: 'title',
                mapping: 'snippet.title'
            },
            {
                name: 'user',
                mapping: 'snippet.channelTitle'
            }
        ]
    }
});
