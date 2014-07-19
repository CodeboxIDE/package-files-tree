define([
    "src/panel",
    "less!src/stylesheets/main.less"
], function(Panel) {
    var panel = new Panel();

    // Add panel to grid
    codebox.app.grid.addView(panel, {
        width: 20
    });

    // Render the panel
    panel.render();
});