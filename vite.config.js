/** @type {import('vite').UserConfig} */
export default {
    build: {
        lib: {
            entry: 'src/index.ts',
            formats: ['cjs'],
            name: 'CharacterSheet',
            fileName: 'character-sheet',
        },
    }
}
