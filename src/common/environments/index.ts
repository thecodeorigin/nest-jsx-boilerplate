import { config } from 'dotenv'
// setting up env
config()

export const NODE_ENV = process.env.NODE_ENV
export const PORT = process.env.PORT || 3000

export const RDS_DB_TYPE = process.env.RDS_DB_TYPE
export const TYPEORM_SYNC = Boolean(process.env.TYPEORM_SYNC) || false
export const RDS_DB_CONNECTION_STRING = process.env.RDS_DB_CONNECTION_STRING

export const JWT_SECRET = process.env.JWT_SECRET
export const JWT_EXPIRES = process.env.JWT_EXPIRES

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const GOOGLE_SECRET = process.env.GOOGLE_SECRET
