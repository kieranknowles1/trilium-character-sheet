function createRenderNote(title, src, isTemplate) {
    return {
        title,
        type: "render",
        attributes: isTemplate ? {
            "~renderNote": "static/index.html", "#template": ""
        } : {
            "~renderNote": "static/index.html"
        },
        children: [
            {
                title: "Data",
                file: src
            }
        ]
    }
}

module.exports = {
    output: "dist.zip",
    notes: {
        title: "Trilium Character Sheet",
        file: "readme.md",
        children: [
            {
                // Data that the template renders from
                file: "static/index.html",
                title: "HTML",
                children: [
                    {
                        // This script is executed when opening the note
                        title: "index.js",
                        file: "dist/bundle.js",
                        env: "frontend",
                    }
                ]
            },
            {
                title: "Schema",
                file: "dist/CharacterSchema.json",
            },
            createRenderNote("Character Sheet", "static/sheet.json", true),
            createRenderNote("Demo", "static/demo.json", false),
        ]
    }
}
