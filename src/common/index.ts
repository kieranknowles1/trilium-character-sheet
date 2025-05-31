import { AnyCharacter, displayValue } from "../util";

export default function renderCommon(json: AnyCharacter) {
    displayValue('#name', json.name)
}
