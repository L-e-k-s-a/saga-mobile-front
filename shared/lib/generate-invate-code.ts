


export const generateInviteCode = (): string => {
    const number = Math.floor(Math.random() * (1000 - 100) + 100)
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    const lengthAlphabet = alphabet.length
    let code = ''
    for(let i = 0; i < 4; i++){
        const letter = alphabet[Math.floor(Math.random() * lengthAlphabet)]
        code += letter
    }
    return `${number}-${code}`
}