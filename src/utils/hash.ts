import { hashSync, compareSync } from 'bcrypt'

export const hashPassword = (ps: string): string => {
    const hash1 = hashSync(ps, 10) 
    return hash1
}

export const verifyPassword = (ps: string, encrypted: string): boolean => {
    const verify = compareSync(ps, encrypted)
    return verify
}