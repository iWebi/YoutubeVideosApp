/**
 * Created by suman on 6/27/14.
 */
Ext.define('YoutubeVideosApp.core.GlobalCache', {
    statics: {
        getItem: function (item) {
            return localStorage.getItem(item);
        },
        getIntItem: function (item) {
            return parseInt(localStorage.getItem(item));
        },
        setItem: function (item, value) {
            localStorage.setItem(item, value);
        },
        removeItem: function (item, value) {
            localStorage.removeItem(item);
        },
        addIfNotExists: function (item, value) {
            if (!this.getItem(item)) {
                if (typeof value == "function") {
                    value = value(Array.prototype.slice.call(arguments, 2)); //evaluate the function
                }
                this.setItem(item, value)
            }
        }
    }
});
