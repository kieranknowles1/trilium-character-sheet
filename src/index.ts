import { FrontendAPI } from "trilium/frontend";
import { AnyCharacter, error } from "./util";
import { renderDnd } from "./dnd";
import { renderCthulu } from "./cthulu";

// The API object is available in the global scope
declare const api: FrontendAPI;

async function render(): Promise<void> {
    const dataChild = api.getActiveContextNote().children[0];
    const data = await api.getNote(dataChild)
        .then(note => note.getBlob())
        .then(blob => blob.content)
    const json: Partial<AnyCharacter> = JSON.parse(data)

    switch (json.type) {
        case 'cthulu': renderCthulu(json); break
        case 'dnd': renderDnd(json); break
        default: error(`Unknown character type '${json.type}'`)
    }
}
render()
