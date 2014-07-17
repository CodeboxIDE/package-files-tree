define([
    "src/tree"
], function(Tree) {
    var hr = codebox.require("hr/hr");

    var Panel = hr.View.extend({
        initialize: function(options) {
            Panel.__super__.initialize.apply(this, arguments);

            this.tree = new Tree({
                model: codebox.root
            });
            this.tree.appendTo(this);
        },

        render: function() {
            this.tree.refresh();

            return this.ready();
        }
    });

    return Panel;
});