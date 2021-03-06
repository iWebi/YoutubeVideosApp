/**
 * Created by suman on 11/2/14.
 */
Ext.define('YoutubeVideosApp.view.VideosList', {
    extend: 'Ext.List',
    xtype: 'videoslist',
    requires: ['YoutubeVideosApp.store.VideoStore', 'YoutubeVideosApp.view.VideoListItem'],
    config: {
        scrollable: true,
        striped: true,
        height: '100%',
        //mode: 'multi',
        emptyText : 'There are no videos to list. Please add a list of channels to retrieve the videos',
        loadingText : 'retrieving videos...',
        selectedCls: '', //this is to prevent the parent component adding styling around the selected item
        defaultType: 'videolistitem',
        layout: 'fit',
        flex: 1,
        store: 'videostore',
        listeners : {
            initialize : function() {
                this.getStore().load();
            }
        }
    }
});