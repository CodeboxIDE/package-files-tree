define([
    "src/panel",
    "less!src/stylesheets/main.less"
], function(Panel) {
    var panel = new Panel();

    // Add panel to grid
    codebox.panels.add({
        title: "Files",
        view: panel
    });

    // Render the panel
    panel.render();
});