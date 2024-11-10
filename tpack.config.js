module.exports = {
    output: "dist.zip",
    notes: {
        title: "Trilium Character Sheet",
        file: "readme.md",
        children: [
            {
                file: "static/main.html",
                title: "HTML",
                children: [
                    {
                        file: "src/main.js",
                        env: "frontend",
                    }
                ]
            },
            {
                title: "Character Sheet",
                type: "render",
                attributes: {
                    "~renderNote": "static/main.html",
                    "#template": true,
                },
                children: [
                    {
                        file: "static/sheet.json",
                        title: "Data",
                    }
                ]
            }
        ]
    }
}
