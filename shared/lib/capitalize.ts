


export const capitalize = (value: string) => {
    if(value){
        const letter = value.charAt(0).toUpperCase()
        const str = value.slice(1)
        return letter + str
    }
    return ''
}