/**
 * Created by IntelliJ IDEA.
 * User: xsiry
 * Date: 2017/11/02
 * Time: 16:39
 */
define(function (require, exports, module) {
    var menus = [];
    module.exports = {
        init: function (root) {
            this.root = root;
            this._menusAjax(this, []);
        },
        _menuMap: function (data) {
            return menuMap(data);
        },
        _menusAjax: function () {
            var self = this;
            var data = require('./menus_data');
            menus = self._menuMap(data.Rows);
            self._menusGenerate();
            // $.get('/menu/userMenus', {}, function (result) {
            //     menus = self._menuMap(result.Rows);
            //     self._menusGenerate();
            // }, 'json')
        },
        _menusGenerate: function () {
            var lis = menus.join('');
            this.root.find('.x-menus').prepend(lis);
        },
    };

    function menuMap(data) {
        return data.map(function (menu) {
            return rootMenu(menu);
        });
    }

    function rootMenu(menu) {
        var m = "<li class=" + (menu.children.length > 0 ? 'sub-menu system_menus' : '') + ">";
        m += "<a class='waves-effect x-menu' href='javascript:;' data-url=" + menu.href + " data-title=" + menu.name + ">";
        m += menu.level === 1 ? ("<i class='" + menu.icon + "'></i>" + menu.name) : menu.name;

        if (menu.children.length > 0) {
            m += childMenu(menu);
        } else {
            m += "</a></li>";
        }

        return m;
    }

    function childMenu(rootMenu) {
        var child = "</a><ul style='margin-left:" + 5 * rootMenu.level + "px;'>";
        rootMenu.children.map(function (menu) {
            child += "<li class=" + (menu.children.length > 0 ? 'sub-menu system_menus' : '') + ">";
            child += "<a class='waves-effect x-menu'  data-title='" + menu.name + "' data-url=" + menu.href + ">" + menu.name;
            if (menu.children.length > 0) {
                child += childMenu(menu);
            } else {
                child += "</a></li>";
            }
        });
        child += "</ul></li>";
        return child;
    }
});