require("./stylesheets/main.less");
var Panel = require("./panel");

// Open file panels
codebox.panels.add(Panel, {}, {
    title: "Files",
    icon: "file-directory"
});
