define(function() {
    return codebox.settings.schema("tree",
        {
            "title": "Files Tree",
            "type": "object",
            "properties": {
                "toolbar": {
                    "description": "Commands in the toolbar",
                    "type": "array",
                    "items": {
                        "command": {
                            "type": "string"
                        },
                        "title": {
                            "type": "string"
                        },
                        "icon": {
                            "type": "string"
                        }
                    },
                    "default": [
                        {
                            "command": "terminal.open",
                            "title": "Open New Terminal",
                            "icon": "terminal"
                        },
                        {
                            "command": "settings.open",
                            "title": "Open Settings",
                            "icon": "gear"
                        }
                    ]
                },
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