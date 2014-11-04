/**
 * Created by suman on 11/2/14.
 */
Ext.define('YoutubeVideosApp.model.StaticVideoModel', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'videoUrl',
            'imageUrl',
            'name',
            'user'
        ]
    }
});
