import { FrontendAPI } from "trilium/frontend";

// The API object is available in the global scope
declare const api: FrontendAPI;

interface Data {
    [key: string]: string
}

function displayValue(query: string, value: string | null) {
    if (value === null) {
        $(query).css('color', 'red')
    }
    $(query).text(value || 'Not set')
}

async function render(): Promise<void> {
    const dataChild = api.getActiveContextNote().children[0];
    const data = await api.getNote(dataChild)
        .then(note => note.getBlob())
        .then(blob => blob.content)
    const json: Data = JSON.parse(data)

    displayValue('#name', json['name'])
}
render()
