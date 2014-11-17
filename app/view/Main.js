Ext.define('YoutubeVideosApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.List',
        'YoutubeVideosApp.view.VideosContainer',
        'YoutubeVideosApp.view.SettingsPanel'
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [
            {
                title: 'Welcome',
                iconCls: 'home',
                styleHtmlContent: true,
                layout: 'fit',
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Welcome To Finder'
                    },
                    {
                        docked: 'bottom',
                        xtype: 'button',
                        margin: 10,
                        text: 'Go for it',
                        ui: 'confirm'
                    }
                ],
                listeners : {
                    initialize : function() {
                        var util = YoutubeVideosApp.core.Util;
                        if ( util.isUserLoggedIntoYoutube()) {
                            util.getFavouritesPlayListId();
                            util.addVideosToFavorites();
                            this.add(
                                {
                                    xtype: 'videos'
                                }
                            );
                        } else {
                            this.add(
                                {
                                    html : '<a href="https://accounts.google.com/o/oauth2/auth?'+
                                    'client_id=824411757781-kuksgb48r8qtdlrnecka855knjp68i6q.apps.googleusercontent.com&' +
                                    'redirect_uri=http%3A%2F%2Flocalhost%3A1841&' +
                                    'scope=https://www.googleapis.com/auth/youtube&approval_prompt=auto&response_type=token">Login To Youtube</a>'
                                }
                            );
                        }
                    }
                }
            },
            {
                title: 'Settings',
                iconCls: 'settings',
                layout: 'fit',
                styleHtmlContent: true,
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Filter Options'
                    },
                    {
                        xtype: 'youtube_settings'
                    }
                ]
            }
        ]
    }
});