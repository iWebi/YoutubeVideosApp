/**
 * Created by suman on 11/2/14.
 */
Ext.define('YoutubeVideosApp.view.SettingsPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'youtube_settings',
    requires: ['Ext.form.FieldSet', 'YoutubeVideosApp.view.ChannelsRemovePicker', 'YoutubeVideosApp.core.GlobalCache', 'YoutubeVideosApp.core.Util', 'YoutubeVideosApp.core.Session', 'YoutubeVideosApp.core.Constants'],
    config: {
        scrollable: true,
        items: [
            {
                xtype: 'button',
                text: 'List channels to remove',
                itemId: "channels_remove_button",
                action: "removeChannels",
                iconCls: 'action',
                margin: 10,
                ui: 'confirm',
                handler : function() {
                    this.parent.down('channels_remove_picker').show();
                }
            },
            {
                xtype: 'channels_remove_picker',
                itemId: 'channels_remove_picker',
                hidden: true
            }
        ]
    }
});