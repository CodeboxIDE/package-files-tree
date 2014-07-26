define([
    "src/panel",
    "less!src/stylesheets/main.less"
], function(Panel) {
    // Open file panels
    codebox.panels.add(Panel, {}, {
        title: "Files"
    });
});