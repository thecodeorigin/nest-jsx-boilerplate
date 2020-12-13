import { hash, genSalt, compare } from 'bcrypt'
import * as slug from 'slug'
import * as moment from 'moment'

export async function hashPassword(password: string): Promise<string> {
  return hash(password, await genSalt())
}

export async function compareHashPassword(password: string, hashed: string): Promise<boolean> {
  const isEquals = await compare(password, hashed)
  return isEquals
}

export const createSlug = (data: string) => slug(data, { locale: "vi" });

export const createSlugWithFullDateTime = (data: string) => `${createSlug(data)}-${moment().format('YYYYMMDDHHmmssSS')}`
