/**
 * Created by suman on 11/7/14.
 */
Ext.define('YoutubeVideosApp.view.ChannelsRemoveSheet', {
    extend: 'Ext.Sheet',
    xtype: 'channels_remove_sheet',
    requires: ['Ext.Sheet', 'YoutubeVideosApp.core.Util'],
    config: {
        items: [
            {
                docked: 'top',
                xtype: 'toolbar',
                title: 'Remove selected channels'
            },
            {
                docked: 'bottom',
                xtype: 'button',
                text: 'Done'
            }
        ],
        listeners: {
            initialize: function () {
                var me = this,
                    channelsObj = YoutubeVideosApp.core.Util.getChannelsFromCache(),
                    channelCheckboxItems = [];
                for (var key in channelsObj) {
                    channelCheckboxItems.push(
                        {
                            xtype: 'checkboxfield',
                            name: key,
                            labelWidth: '80%',
                            label: key,
                            value: channelsObj[key]
                        }
                    );
                }
                if (channelCheckboxItems.length > 0 ) {
                    me.add(channelCheckboxItems);
                }
            }
        }
    }
});