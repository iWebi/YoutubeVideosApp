/**
 * Created by suman on 7/8/14.
 */
Ext.define('YoutubeVideosApp.core.Constants', {
    extend: 'Ext.Component',
    statics: {
        API_HOST : 'http://localhost:9090',
        DATE_CACHE_KEY_FOR_MOVIES : 'ChannelMovies-DateTime',
        YOUTTUBE_LOGGED_IN_TIME_CACHE_KEY : 'logged_in_time',
        //google returned expiry_in param with value in seconds
        YOUTTUBE_TOKEN_EXPIRY_CACHE_KEY : 'expires_in',
        YOUTTUBE_ACCESS_TOKEN_CACHE_KEY : 'access_token',
        YOUTTUBE_FAVORITES_PLAY_LIST_ID_CACHE_KEY : 'favorites_id',
        CACHE_KEY_FOR_MOVIES : 'ChannelMovies',
        video_link_template: Ext.create('Ext.XTemplate', '<div class="video_item">' +
            '<div><a href="{thumbnail}">{title}</a></div>' +
            '<div><p>Date : {publishedAt} by {channelTitle}</p></div>' +
            '</div>')
    }
});
