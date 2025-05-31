import { AnyCharacter, displayValue } from "../util";

export default function renderCommon(json: Partial<AnyCharacter>) {
    displayValue('#name', json.name)
}
