define(function() {
    return codebox.settings.schema("tree",
        {
            "title": "Files Tree",
            "type": "object",
            "properties": {
                "showToolbar": {
                    "description": "Show toolbar",
                    "type": "boolean",
                    "default": true
                },
                "showHidden": {
                    "description": "Show hidden files",
                    "type": "boolean",
                    "default": true
                },
                "showDotGit": {
                    "description": "Show .git folder",
                    "type": "boolean",
                    "default": false
                }
            }
        }
    );
});