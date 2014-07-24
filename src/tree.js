define(function() {
    var $ = codebox.require("hr/dom");
    var hr = codebox.require("hr/hr");
    var dialogs = codebox.require("utils/dialogs");
    var menu = codebox.require("utils/menu");

    var FileItem = hr.View.extend({
        tagName: "li",
        events: {
            "click .file": "onClick"
        },

        initialize: function(options) {
            FileItem.__super__.initialize.apply(this, arguments);

            this.tree = null;

            this.$content = $("<div>", {
                "class": "file"
            });

            this.$caret = $("<span>", {
                "class": "caret"
            });

            this.$name = $("<span>", {
                "class": "filename"
            });

            this.$caret.appendTo(this.$content);
            this.$name.appendTo(this.$content);

            this.$content.appendTo(this.$el);

            // Bind file changement
            this.listenTo(this.model, "destroy", this.remove);

            // Context menu
            menu.add(this.$content, this.getContextMenu.bind(this));
        },

        render: function() {
            this.$caret.toggleClass("c-hidden", !this.model.isDirectory());
            this.$name.text(this.model.get("name"));
            this.$content.css("padding-left", (this.parent.options.indentation*12)+"px");

            return this.ready();
        },

        onClick: function(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }

            if (this.model.isDirectory()) {
                if (!this.tree) {
                    this.tree = new FilesTree({
                        model: this.model,
                        indentation: this.parent.options.indentation + 1
                    });
                    this.tree.appendTo(this);
                    this.tree.refresh();
                } else {
                    this.tree.$el.toggleClass("hidden");
                }
            } else {
                this.model.open();
            }

            this.$caret.toggleClass("open", !this.tree.$el.hasClass("hidden"));
        },

        // Generate the context menu items
        getContextMenu: function() {
            var items = [
                {
                    label: "Rename...",
                    click: function() {

                    }
                }
            ]

            if (this.model.isDirectory()) {
                items = items.concat([
                    {
                    label: "Delete Folder",
                        click: this.doDelete.bind(this)
                    }
                ]);
            } else {
                items = items.concat([
                    {
                    label: "Delete File",
                        click: this.doDelete.bind(this)
                    }
                ]);
            }

            return items;
        },

        // Delete this file/folder
        doDelete: function() {
            return dialogs.confirm("Delete "+(this.model.isDirectory()? "Folder": "file"))
            .then(this.model.remove.bind(this.model));
        }
    });

    var FilesTree = hr.View.extend({
        tagName: "ul",
        className: "component-files-tree",
        defaults: {
            indentation: 1
        },

        refresh: function() {
            var that = this;

            _.each(this.items || [], function(item) {
                item.destroy();
            });

            return this.model.list()
            .then(function(files) {
                that.items = _.map(files, function(file) {
                    return new FileItem({
                        model: file
                    }, that);
                });
            })
            .then(this.update.bind(this));
        },

        render: function() {
            this.$el.empty();

            _.each(this.items || [], function(item) {
                item.appendTo(this);
                item.render();
            }, this);

            return this.ready();
        }
    });

    return FilesTree;
});