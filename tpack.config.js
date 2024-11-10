function createRenderNote(title, src, isTemplate) {
    return {
        title,
        type: "render",
        attributes: isTemplate ? {
            "~renderNote": "static/main.html", "#template": ""
        } : {
            "~renderNote": "static/main.html"
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
                file: "static/main.html",
                title: "HTML",
                children: [
                    {
                        // This script is executed when opening the note
                        file: "src/main.js",
                        env: "frontend",
                    }
                ]
            },
            createRenderNote("Character Sheet", "static/sheet.json", true),
            createRenderNote("Demo", "static/demo.json", false),
        ]
    }
}
