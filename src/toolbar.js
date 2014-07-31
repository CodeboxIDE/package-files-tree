define(function() {
    var _ = codebox.require("hr/utils");
    var hr = codebox.require("hr/hr");
    var menu = codebox.require("utils/menu");
    var dialogs = codebox.require("utils/dialogs");
    var commands = codebox.require("core/commands");
    var Commands = codebox.require("collections/commands");

    var CommandItem = hr.List.Item.extend({
        tagName: "li",
        className: "toolbar-command",
        events: {
            "click": "run"
        },

        render: function() {
            this.$el.html("<i class='octicon octicon-"+this.model.get("icon")+"'></i>");
        },

        run: function(e) {
            if (e) e.preventDefault();
            this.model.run();
        }
    });

    var CommandsList = hr.List.extend({
        className: "toolbar-commands",
        Item: CommandItem,
        Collection: Commands
    });


    var Toolbar = hr.View.extend({
        className: "component-panel-toolbar",

        initialize: function(options) {
            Toolbar.__super__.initialize.apply(this, arguments);

            this.commands = new CommandsList({}, this);
            this.commands.appendTo(this);
        },

        setCommands: function(_commands) {
            this.commands.collection.reset(
                _.chain(_commands)
                .map(function(c) {
                    return commands.get(c.command);
                })
                .compact()
                .value()
            );
        }
    });

    return Toolbar;
});