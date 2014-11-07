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
                docked: 'bottom',
                xtype: 'button',
                text: 'Remove Selected Channels'
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
                me.add(channelCheckboxItems);
            }
        }
    }
});