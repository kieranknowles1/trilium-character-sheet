/** @type {import('vite').UserConfig} */
export default {
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'CharacterSheet',
            fileName: 'character-sheet',
        },
    }
}
