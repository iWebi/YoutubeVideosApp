/**
 * Created by suman on 11/2/14.
 */
Ext.define('YoutubeVideosApp.model.VideoModel', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'id',// its better if this name is not same as any fields name
        fields: [
            'publishedAt', 'title', 'thumbnail'
        ]
    }
});
