define(function() {
    var hr = codebox.require("hr/hr");

    var FileItem = hr.View.extend({
        tagName: "li",

        initialize: function(options) {
            FileItem.__super__.initialize.apply(this, arguments);

            this.tree = null;
        },

        render: function() {
            this.$el.html(this.model.get("name"));
            return this.ready();
        }
    });

    var FilesTree = hr.View.extend({
        tagName: "ul",

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