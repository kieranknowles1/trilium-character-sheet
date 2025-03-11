function createRenderNote(title, src, extraAttrs) {
    var attributes = {
        "~renderNote": "static/index.html",
        "#iconClass": "bx bx-face",
        ...extraAttrs
    }

    return {
        title,
        type: "render",
        attributes,
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
                        file: "dist/character-sheet.js",
                        env: "frontend",
                    }
                ]
            },
            {
                title: "Schema",
                file: "build/CharacterSchema.json",
            },
            createRenderNote("Character Sheet", "static/sheet.json", {"#template": ""}),
            createRenderNote("Demo - DND", "static/demo-dnd.json", {}),
            createRenderNote("Demo - Call of Cthulu", "static/demo-cthulu.json", {})
        ]
    }
}
