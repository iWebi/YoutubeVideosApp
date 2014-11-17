/**
 * Created by suman on 11/2/14.
 */
Ext.define('YoutubeVideosApp.view.VideoListItem', {
    extend: 'Ext.dataview.component.ListItem',
    xtype: 'videolistitem',
    requires: ['Ext.Img', 'YoutubeVideosApp.core.Constants'],
    config: {
        layout: 'vbox',
        videoRecordModel: undefined,
        listeners: {
            updatedata: function (me, newData, eOpts) {
                if (!me.getVideoRecordModel()) {
                    //process newData record to polish for UI display
                    //include date field alone in the published time field. No need for the detailed micro seconds time
                    newData['publishedAt']=newData['publishedAt'].split('T')[0];
                    me.setVideoRecordModel(newData);
                    var video_link_template = YoutubeVideosApp.core.Constants.video_link_template;
                    var compWithButtons = Ext.create('Ext.Panel', {
                        layout: 'hbox',
                        items : [
                            {
                                height : '100px',
                                flex : 2,
                                html: video_link_template.apply(newData)
                            },
                            {
                                flex : 0.2,
                                xtype : 'button',
                                text: '+',
                                ui: 'confirm plain',
                                handler : function () {
                                    YoutubeVideosApp.core.Util.addVideoToFavorites(newData['id']);
                                    Ext.Msg.alert("Success", "Video added to favorites playlist");
                                }
                            }
                        ]
                    });
                    me.add([
                            {
                                xtype: 'image',
                                height: 250,
                                width: 250,
                                src: newData['thumbnail']
                            },
                            compWithButtons
                        ]
                    );
                }
            }
        }
    }
});