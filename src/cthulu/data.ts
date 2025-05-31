import { Optional } from "../util"

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

export const BASE_SKILLS = {
    Accounting: 5,
    Anthropology: 1,
    Appraise: 5,
    Charm: 15,
    Climb: 20,
    'Credit Rating': 0,
    'Cthulu Mythos': 0,
    Disguise: 5,
    'Drive Auto': 20,
    'Electric Repair': 10,
    'Fast Talk': 5,
    'Fighting (Brawl)': 25,
    'Firearms (Handgun)': 20,
    'Firearms (Rifle/Shotgun)': 25,
    'First Aid': 30,
    'History': 5,
    'Intimidate': 15,
    Jump: 20,
    Law: 5,
    'Library Use': 20,
    Listen: 20,
    Locksmith: 1,
    'Mechanical Repair': 10,
    Medicine: 1,
    'Natural World': 10,
    Occult: 10,
    Persuade: 10,
    Psychoanalysis: 1,
    Psychology: 1,
    Ride: 5,
    'Sleight of Hand': 10,
    'Spot Hidden': 25,
    Stealth: 20,
    Swim: 20,
    Throw: 20,
    Track: 10
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
