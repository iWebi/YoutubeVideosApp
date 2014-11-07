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
                        xtype: 'videos'
                    },
                    {
                        docked: 'bottom',
                        xtype: 'button',
                        margin: 10,
                        text: 'Go for it',
                        ui: 'confirm'
                    }
                ]
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