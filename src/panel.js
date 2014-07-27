define([
    "src/tree"
], function(Tree) {
    var hr = codebox.require("hr/hr");
    var menu = codebox.require("utils/menu");
    var dialogs = codebox.require("utils/dialogs");
    var File = codebox.require("models/file");

    var Panel = hr.View.extend({
        className: "component-files-panel",

        initialize: function(options) {
            Panel.__super__.initialize.apply(this, arguments);

            // Add files tree
            this.tree = new Tree({
                model: codebox.root
            });
            this.tree.appendTo(this);

            // Context menu
            menu.add(this.$el, this.getContextMenu.bind(this));
        },

        render: function() {
            this.tree.refresh();

            return this.ready();
        },

        // Generate the context menu items
        getContextMenu: function() {
            var that = this;

            var items = [
                {
                    label: "New File",
                    click: function() {
                        return dialogs.prompt("Create a new file:", "untitled")
                        .then(function(n) {
                            return File.create("./", n);
                        })
                        .then(that.update.bind(that));
                    }
                },
                {
                    label: "New Folder",
                    click: function() {
                        return dialogs.prompt("Create a new folder:", "untitled")
                        .then(function(n) {
                            return File.mkdir("./", n);
                        })
                        .then(that.update.bind(that));
                    }
                }
            ];

            return items;
        },
    });

    return Panel;
});