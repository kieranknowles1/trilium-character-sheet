import { FrontendAPI } from "trilium/frontend";

// The API object is available in the global scope
declare const api: FrontendAPI;

type Optional<T> = T | null | undefined
function isValue<T>(value: Optional<T>): value is T {
    return value !== null && value !== undefined
}

interface Attributes {
    strength: Optional<number>,
    dexterity: Optional<number>,
    constitution: Optional<number>,
    intelligence: Optional<number>,
    wisdom: Optional<number>,
    charisma: Optional<number>,
}

interface Data {
    name: Optional<string>,
    class: Optional<string>,
    level: Optional<number>,
    attributes: Optional<Attributes>,
}

/**
 * Check if the value is null and display a message if it is
 */
function nullCheck<T>(query: string, value: Optional<T>): value is T {
    if (!isValue(value)) {
        $(query).css('color', 'red').text('Not set')
        return false
    }
    return true
}

function displayValue<T>(query: string, value: Optional<T>) {
    if (!nullCheck(query, value)) return
    $(query).text(value.toString())
}

function displayAttribute(query: string, value: Optional<number>) {
    if (!nullCheck(query, value)) return

    const modifier = Math.floor((value - 10) / 2)
    const sign = modifier >= 0 ? '+' : '-'

    $(query).text(`${value} (${sign}${Math.abs(modifier)})`)
}

async function render(): Promise<void> {
    const dataChild = api.getActiveContextNote().children[0];
    const data = await api.getNote(dataChild)
        .then(note => note.getBlob())
        .then(blob => blob.content)
    const json: Data = JSON.parse(data)

    displayValue('#name', json['name'])
    displayValue('#class', json['class'])
    displayValue('#level', json['level'])

    const attributes = json['attributes']
    if (isValue(attributes)) {
        displayAttribute('#strength', attributes['strength'])
        displayAttribute('#dexterity', attributes['dexterity'])
        displayAttribute('#constitution', attributes['constitution'])
        displayAttribute('#intelligence', attributes['intelligence'])
        displayAttribute('#wisdom', attributes['wisdom'])
        displayAttribute('#charisma', attributes['charisma'])
    }
}
render()
