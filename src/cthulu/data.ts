export interface Characteristics {
    Strength: number,
    Constitution: number,
    Power: number,
    Dexterity: number,
    Appearance: number,
    Size: number,
    Intelligence: number,
    Education: number
}

export interface CthuluCharacter {
    type: 'cthulu',
    birthplace: string,
    occupation: string,
    residence: string,
    age: number,
    sanity: {
        starting: number,
        current: number
        insane: 'none' | 'temporary' | 'indefinite'
    },
    luck: {
        starting: number,
        current: number,
    }

    characteristics: Characteristics,
    skills: Record<string, number>,
}
