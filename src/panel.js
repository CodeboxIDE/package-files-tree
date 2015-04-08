var settings = require("./settings");
var Tree = require("./tree");
var Toolbar = require("./toolbar");

var View = codebox.require("hr.view");
var menu = codebox.require("utils/menu");
var dialogs = codebox.require("utils/dialogs");
var upload = codebox.require("utils/upload");
var File = codebox.require("models/file");

var Panel = View.extend({
    className: "component-files-panel",

    initialize: function(options) {
        Panel.__super__.initialize.apply(this, arguments);

        // Toolbar
        this.toolbar = new Toolbar({}, this);
        this.toolbar.appendTo(this);

        // Add files tree
        this.tree = new Tree({
            model: codebox.root
        }, this);
        this.tree.appendTo(this);

        // Settings update
        this.listenTo(settings.data, "change", this.onSettingsChanged);
        this.onSettingsChanged();

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
            },
            {
                type: "divider"
            },
            {
                label: "Upload",
                type: "menu",
                items: [
                    {
                        label: "Files",
                        click: function() {
                            codebox.statusbar.progress(
                                upload.upload({
                                    'url': "/rpc/fs/upload"
                                }),
                                {
                                    prefix: "Uploading files"
                                }
                            )
                            .fail(dialogs.alert);
                        }
                    },
                    {
                        label: "Folder",
                        click: function() {
                            codebox.statusbar.progress(
                                upload.upload({
                                    'url': "/rpc/fs/upload",
                                    'directory': true
                                }),
                                {
                                    prefix: "Uploading folder"
                                }
                            )
                            .fail(dialogs.alert);
                        }
                    }
                ]
            },
            {
                type: "divider"
            },
            {
                label: "Refresh Tree",
                click: that.tree.refresh.bind(that.tree)
            }
        ];

        return items;
    },

    // When settings changed
    onSettingsChanged: function() {
        this.toolbar.$el.toggle(settings.data.get("showToolbar"));
        this.toolbar.setCommands(settings.data.get("toolbar"));
    }
});

module.exports = Panel;
