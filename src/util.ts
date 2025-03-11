import { CthuluCharacter } from "./cthulu/data"
import { DndCharacter } from "./dnd/data"

export type Optional<T> = T | undefined

export type CharacterBase = {
    $schema: string,
    type: string,
    name: string,
}

export type AnyCharacter = CharacterBase & (DndCharacter | CthuluCharacter)

export function error(msg: string) {
    api.$container.append(`<div style="color: red">${msg}</div>`)
    $('#missing-field').css('display', 'block')
}

export function isNotNull<T>(name: string, value: Optional<T>): value is T {
    const isNull = value === null || value === undefined
    if (isNull) {
        error(`${name} is not set`)
    }
    return !isNull
}

/**
 * Check if the value is null and display a message if it is
 */
export function nullCheck<T>(query: string, value: Optional<T>): value is T {
    if (!isNotNull(query, value)) {
        $(query).css('color', 'red').text('Not set')
        return false
    }
    return true
}

export function displayValue<T extends Object>(query: string, value: Optional<T>) {
    if (!nullCheck(query, value)) return
    $(query).text(value.toString())
}
