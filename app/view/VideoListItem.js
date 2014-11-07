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
                    me.setVideoRecordModel(newData);
                    var video_link_template = YoutubeVideosApp.core.Constants.video_link_template;
                    me.add([
                            {
                                xtype: 'image',
                                height: 250,
                                width: 250,
                                src: 'https://github.com/images/modules/dashboard/bootcamp/octocat_fork.png?1a1dfcb9'
                            },
                            {
                                html: video_link_template.apply(newData)
                            }
                        ]
                    );
                }
            }
        }
    }
});