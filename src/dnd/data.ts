export const SKILL_ATTRIBUTES = {
    'Acrobatics': 'dexterity',
    'Animal Handling': 'wisdom',
    'Arcana': 'intelligence',
    'Athletics': 'strength',
    'Deception': 'charisma',
    'History': 'intelligence',
    'Insight': 'wisdom',
    'Intimidation': 'charisma',
    'Investigation': 'intelligence',
    'Medicine': 'wisdom',
    'Nature': 'intelligence',
    'Perception': 'wisdom',
    'Performance': 'charisma',
    'Persuasion': 'charisma',
    'Religion': 'intelligence',
    'Sleight of Hand': 'dexterity',
    'Stealth': 'dexterity',
    'Survival': 'wisdom',
}

export type Skill = keyof typeof SKILL_ATTRIBUTES

export interface Attributes {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
}
export type Attribute = keyof Attributes

export interface DndCharacter {
    type: 'dnd',

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
