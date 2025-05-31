import { error, isNotNull } from "../util";
import { Characteristics, CthuluCharacter } from "./data";

function skillRow(name: string, value: number): string {
    const half = Math.floor(value / 2)
    const fifth = Math.floor(value / 5)
    return `<tr><td>${name}</td><td>${value}</td><td>${half}</td><td>${fifth}</td>`
}

function calculateDamageBonus(attrs: Characteristics): [string, number] {
    const sizeStr = attrs.Size + attrs.Strength
    if (sizeStr < 65) return ['-2', -2]
    else if (sizeStr < 85) return ['-1', -1]
    else if (sizeStr < 125) return ['0', 0]
    else if (sizeStr < 165) return ['+1D4', 1]
    else return ['+1D6', 2]
}

function calculateHealth(attrs: Characteristics): number {
    const sizeCon = attrs.Size + attrs.Constitution
    return Math.floor(sizeCon / 10)
}

function getAgeMoveModifier(age: number): number {
    // -1 point every 10 years starting at 40
    if (age < 40) return 0

    return Math.ceil((age - 40) / 10)
}

function getBaseMove(attrs: Characteristics): number {
    const strLessSize = attrs.Strength < attrs.Size
    const dexLessSize = attrs.Dexterity < attrs.Size
    if (strLessSize && dexLessSize) return 7
    else if (!strLessSize && !dexLessSize) return 9 // Both higher, +1 bonus
    return 8
}

export function renderCthulu(json: Partial<CthuluCharacter>) {
    if (isNotNull("characteristics", json.characteristics)) {
        const attrsTable = $('#characteristics')
        for (const attr of Object.keys(json.characteristics)) {
            attrsTable.append(skillRow(attr, json.characteristics[attr]))
        }

        const [damageBonus, build] = calculateDamageBonus(json.characteristics)
        const health = calculateHealth(json.characteristics)
        const move = getBaseMove(json.characteristics) + getAgeMoveModifier(json.age ?? 20)

        error(damageBonus); error(build.toString()); error(health.toString()); error(move.toString())
    }
    if (isNotNull("skills", json.skills)) {
        for (const skill of Object.keys(json.skills)) {
            error(skillRow(skill, json[skill]))
        }
    }

    error('Not yet implemented')
}
