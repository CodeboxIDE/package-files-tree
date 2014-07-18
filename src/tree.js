define(function() {
    var hr = codebox.require("hr/hr");

    var FileItem = hr.View.extend({
        tagName: "li",
        events: {
            "click .filename": "onClick"
        },

        initialize: function(options) {
            FileItem.__super__.initialize.apply(this, arguments);

            this.tree = null;

            this.$name = $("<span>", {
                "class": "filename"
            });
            this.$name.appendTo(this.$el);
        },

        render: function() {
            this.$name.text(this.model.get("name"));

            return this.ready();
        },

        onClick: function(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }

            if (this.model.isDirectory()) {
                if (!this.tree) {
                    this.tree = new FilesTree({ model: this.model });
                    this.tree.appendTo(this);
                    this.tree.refresh();
                } else {
                    this.tree.$el.toggleClass("hidden");
                }
            } else {
                this.model.open();
            }
        }
    });

    var FilesTree = hr.View.extend({
        tagName: "ul",
        className: "component-files-tree",

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