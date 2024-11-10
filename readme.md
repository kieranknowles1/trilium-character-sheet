# Trilium Character Sheet

[Triilium](https://github.com/TriliumNext/Notes/) plugin for displaying DND character sheets.
Very much a work in progress and mainly done as a learning exercise. Don't expect it to compete
with DND Beyond.

## Installation

1. Build the plugin using `npm run pack`
2. Import `dist.zip` into Trilium, making sure to disable **Safe Import**

## Updating

1. Build the plugin using `npm run pack`
2. Replace the contents of `Trilium Character Sheet/HTML` with `./static/main.html`
3. Replace the contents of `Trilium Character Sheet/HTML/main.js` with `./src/main.js`

## Usage

Create a new note from the **Character Sheet** template, and fill in the details in the **Data**
subnote. The note will then display your character sheet.

Any missing fields will be highlighted in red.
