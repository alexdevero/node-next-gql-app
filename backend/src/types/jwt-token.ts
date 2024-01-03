export type JwtToken = {
  id: string
  username: string
  email: string
  iat: number
  exp?: number
}
