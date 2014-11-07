/**
 * Created by suman on 7/8/14.
 */
Ext.define('YoutubeVideosApp.core.Constants', {
    extend: 'Ext.Component',
    statics: {
        API_HOST : 'http://localhost:9090',
        DATE_CACHE_KEY_FOR_MOVIES : 'ChannelMovies-DateTime',
        CACHE_KEY_FOR_MOVIES : 'ChannelMovies',
        video_link_template: Ext.create('Ext.XTemplate', '<div class="video_item">' +
            '<div><a href="{thumbnail}">{title}</a></div>' +
            '<div><p>Date : {publishedAt}</p></div>' +
            '</div>')
    }
});
