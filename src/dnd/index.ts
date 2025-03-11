import {
    type Attribute,
    type Attributes,
    Character,
    SKILL_ATTRIBUTES,
    type Skill,
} from './data.ts'

import {
    type Optional,
    nullCheck,
    isNotNull,
    displayValue,
} from '../util.ts'

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

function displayAttribute(query: string, value: Optional<number>) {
    if (!nullCheck(query, value)) return

    const modifier = getAttributeModifier(value)
    const sign = modifier >= 0 ? '+' : '-'

    $(query).text(`${value} (${sign}${Math.abs(modifier)})`)
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

export function renderDnd(json: Partial<Character>) {
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
