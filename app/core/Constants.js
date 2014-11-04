/**
 * Created by suman on 7/8/14.
 */
Ext.define('YoutubeVideosApp.core.Constants', {
    extend: 'Ext.Component',
    statics: {
        video_link_template: Ext.create('Ext.XTemplate', '<div class="video_item">' +
            '<div><a href="{thumbnail}">{title}</a></div>' +
            '<div></div>' +
            '</div>')
    }
});
