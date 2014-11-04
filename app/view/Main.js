Ext.define('YoutubeVideosApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.List',
        'YoutubeVideosApp.view.VideosContainer'
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
                    }
                ]
            },
            {
                title: 'Settings',
                iconCls: 'settings',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Filter Options'
                    }
                ]
            }
        ]
    }
});