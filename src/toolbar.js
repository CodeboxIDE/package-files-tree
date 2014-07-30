define(function() {
    var hr = codebox.require("hr/hr");
    var menu = codebox.require("utils/menu");
    var dialogs = codebox.require("utils/dialogs");
    var File = codebox.require("models/file");

    var Toolbar = hr.View.extend({
        className: "component-panel-toolbar",

        initialize: function(options) {
            Toolbar.__super__.initialize.apply(this, arguments);
        },

        render: function() {
            return this.ready();
        }
    });

    return Toolbar;
});