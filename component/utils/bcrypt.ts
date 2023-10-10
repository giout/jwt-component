import bcrypt from 'bcrypt'

export const encrypt = (text: string, saltRounds: number): string => {
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(text, salt)
}

export const compareCrypted = (text: string, hash: string): boolean => {
    return bcrypt.compareSync(text, hash)
}