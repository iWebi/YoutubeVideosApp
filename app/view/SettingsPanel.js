/**
 * Created by suman on 11/2/14.
 */
Ext.define('YoutubeVideosApp.view.SettingsPanel', {
    extend: 'Ext.Panel',
    xtype: 'youtube_settings',
    requires: ['Ext.form.FieldSet', 'YoutubeVideosApp.view.ChannelsRemoveSheet', 'YoutubeVideosApp.core.GlobalCache', 'YoutubeVideosApp.core.Util', 'YoutubeVideosApp.core.Session', 'YoutubeVideosApp.core.Constants'],
    config: {
        layout : 'vbox',
        defaults : {
            flex : 1
        },
        items: [
            {
                xtype: 'button',
                flex : 0.1,
                text: 'List channels to remove',
                itemId: "channels_remove_button",
                action: "removeChannels",
                iconCls: 'action',
                margin: 10,
                ui: 'action',
                handler: function () {
                    //display channels picker if channels are available (i.e selected by user)
                    var channelsObj = YoutubeVideosApp.core.Util.getChannelsFromCache();
                    if (YoutubeVideosApp.core.Util.isEmpty(channelsObj)) {
                        Ext.Msg.alert("Info", "There are no channels to list");
                    } else {
                        this.parent.down('channels_remove_sheet').show();
                    }
                }
            },
            {
                xtype : 'formpanel',
                items : [
                    {
                        xtype: 'fieldset',
                        title: 'Add A Channel By Id',
                        instructions: 'copy the channel id from youtube website',
                        items: [
                            {
                                xtype: 'textfield',
                                name : 'channelId',
                                itemId : 'channelId',
                                label: 'Channel ID'
                            },
                            {
                                xtype: 'button',
                                text : 'Add',
                                ui: 'confirm',
                                handler : function () {
                                    var me = this,
                                        channelId = me.up('.fieldset').down('#channelId');
                                    console.log("channelId to be added is  "+channelId.getValue());
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'channels_remove_sheet',
                itemId: 'channels_remove_sheet',
                hidden: true,
                height : '100%',
                width : '100%',
                scrollable : true,
                listeners: {
                    change: function (me, value, eOpts) {
                        console.log("change called");
                    }
                }
            }
        ]
    }
});