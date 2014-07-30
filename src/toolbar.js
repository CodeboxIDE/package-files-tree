define(function() {
    var _ = codebox.require("hr/utils");
    var hr = codebox.require("hr/hr");
    var menu = codebox.require("utils/menu");
    var dialogs = codebox.require("utils/dialogs");
    var commands = codebox.require("core/commands");

    var Toolbar = hr.View.extend({
        className: "component-panel-toolbar",

        initialize: function(options) {
            Toolbar.__super__.initialize.apply(this, arguments);

            this.commands = [];
        },

        setCommands: function(coms) {
            this.commands = coms;
            return this.update();
        },

        render: function() {
            var that = this;
            this.$el.empty();

            _.each(this.commands, function(command) {
                var $command = $("<a>", {
                    'href': "#",
                    'title': command.title,
                    'class': "toolbar-command"
                });
                $command.click(function(e) {
                    if (e) e.preventDefault();

                    commands.run(command.command);
                });

                $command.appendTo(that.$el);
            });


            return this.ready();
        }
    });

    return Toolbar;
});