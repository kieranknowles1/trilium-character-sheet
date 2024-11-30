import { FrontendAPI } from "trilium/frontend";

import {
    SKILL_ATTRIBUTES
} from './data.ts'

// The API object is available in the global scope
declare const api: FrontendAPI;

type Optional<T> = T | undefined
function isNotNull<T>(name: string, value: Optional<T>): value is T {
    const isNull = value === null || value === undefined
    if (isNull) {
        api.$container.append(`<div style="color: red">${name} is not set</div>`)
        $('#missing-field').css('display', 'block')
    }
    return !isNull
}

type Skill = keyof typeof SKILL_ATTRIBUTES

interface Attributes {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
}
type Attribute = keyof Attributes

interface Character {
    $schema: string,
    name: string,
    alignment: string,
    class: string,
    level: number,
    attributes: Attributes,
    /** Skills the character is proficient in */
    proficiencies: Skill[],
    /** Skills the character has expertise in, gaining double proficiency bonus */
    expertises: Skill[],
    saveProficiencies: Attribute[],
}

/**
 * Check if the value is null and display a message if it is
 */
function nullCheck<T>(query: string, value: Optional<T>): value is T {
    if (!isNotNull(query, value)) {
        $(query).css('color', 'red').text('Not set')
        return false
    }
    return true
}

function getAttributeModifier(value: number): number {
    // +1 for every 2 points above 10, -1 for every 2 points below 10, rounded down
    return Math.floor((value - 10) / 2)
}

function getProficiencyBonus(level: number): number {
    // https://roll20.net/compendium/dnd5e/Character%20Advancement
    if (level <= 4) return 2
    if (level <= 8) return 3
    if (level <= 12) return 4
    if (level <= 16) return 5
    return 6
}

function displayValue<T extends Object>(query: string, value: Optional<T>) {
    if (!nullCheck(query, value)) return
    $(query).text(value.toString())
}

function displayAttribute(query: string, value: Optional<number>) {
    if (!nullCheck(query, value)) return

    const modifier = getAttributeModifier(value)
    const sign = modifier >= 0 ? '+' : '-'

    $(query).text(`${value} (${sign}${Math.abs(modifier)})`)
}

function displaySkills(level: number, proficiencies: Skill[], expertises: Skill[], attributes: Attributes) {
    const proficiencyBonus = getProficiencyBonus(level)
    const table = $('#skills')

    for (const skill of Object.keys(SKILL_ATTRIBUTES)) {
        const attribute = SKILL_ATTRIBUTES[skill]
        const modifier = getAttributeModifier(attributes[attribute])

        const isProficient = proficiencies.includes(skill as Skill)
        const isExpertise = expertises.includes(skill as Skill)

        var bonus = modifier
        if (isProficient) bonus += proficiencyBonus
        if (isExpertise) bonus += proficiencyBonus

        var proficiency = ''
        if (isProficient) proficiency += ' *'
        else if (isExpertise) proficiency += ' **'

        table.append(
            `<tr>` +
                `<td>${skill} (${attribute.substring(0, 3)}${proficiency})</td>` +
                `<td>${bonus}</td>` +
            `</tr>`
        )
    }
}

function displaySaves(level: number, saves: Attribute[], attributes: Attributes) {
    const bonus = getProficiencyBonus(level)
    const table = $('#saving-throws')
    for (const attribute of Object.keys(attributes)) {
        const modifier = getAttributeModifier(attributes[attribute])

        var save = getAttributeModifier(attributes[attribute])
        if (saves.includes(attribute as Attribute)) save += bonus

        table.append(
            `<tr>` +
                `<td>${attribute}</td>` +
                `<td>${save}</td>` +
            `</tr>`
        )
    }
}

async function render(): Promise<void> {
    const dataChild = api.getActiveContextNote().children[0];
    const data = await api.getNote(dataChild)
        .then(note => note.getBlob())
        .then(blob => blob.content)
    const json: Partial<Character> = JSON.parse(data)

    displayValue('#name', json.name)
    if (isNotNull('class', json.class)) {
        // Wikidot can be slow, but the site that shall not be named is ad infested
        const wikiUrl = `https://dnd5e.wikidot.com/${json.class.toLowerCase()}`
        $('#class').text(json.class).attr('href', wikiUrl)
    }
    displayValue('#level', json.level)
    displayValue('#alignment', json.alignment)

    if (isNotNull('attributes', json.attributes)) {
        displayAttribute('#strength', json.attributes.strength)
        displayAttribute('#dexterity', json.attributes.dexterity)
        displayAttribute('#constitution', json.attributes.constitution)
        displayAttribute('#intelligence', json.attributes.intelligence)
        displayAttribute('#wisdom', json.attributes.wisdom)
        displayAttribute('#charisma', json.attributes.charisma)
    }

    if (
        isNotNull('level', json.level) &&
        isNotNull('proficiencies', json.proficiencies) &&
        isNotNull('attributes', json.attributes)
    ) {
        displaySkills(json.level, json.proficiencies, json.expertises ?? [], json.attributes)
    }

    if (
        isNotNull('level', json.level) &&
        isNotNull('saveProficiencies', json.saveProficiencies) &&
        isNotNull('attributes', json.attributes)
    ) {
        displaySaves(json.level, json.saveProficiencies, json.attributes)
    }
}
render()
