/**
 * Created by suman on 11/7/14.
 */
Ext.define('YoutubeVideosApp.view.ChannelsRemovePicker', {
    extend: 'Ext.picker.Picker',
    xtype: 'channels_remove_picker',
    requires: ['Ext.picker.Picker', 'YoutubeVideosApp.core.Util'],
    config: {
        toolbar: {
            ui: 'light',
            title: 'Channels To Remove'
        },
        slots: [
            {
                name: 'channel_name'
            }
        ]
    },
    // overridden to dynamically add slot data. Should have used Store ideally. But its too simple scenario and
    // store is overkill
    // Slots display channel name and associated value is the id
    applySlots: function () {
        var slots = this.callParent(arguments);
        slots[0].data = this.getSlotsDataForChannels();
        return slots;
    },
    getSlotsDataForChannels: function () {
        var channelsObj = YoutubeVideosApp.core.Util.getChannelsFromCache(),
            slotsData = [];
        console.log("channelsObj=" + JSON.stringify(channelsObj));
        for (var key in channelsObj) {
            slotsData.push({
                text: key,
                value: channelsObj[key]
            });
        }
        console.log("slotsData=" + JSON.stringify(slotsData));
        return slotsData;
    }
});
