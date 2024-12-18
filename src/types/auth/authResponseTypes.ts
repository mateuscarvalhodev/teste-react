export type LoginResponseType = {
  accessToken: string
	refreshToken: string 
	id: number
	username: string
	email: string
	firstName: string
	lastName: string
	gender: string
	image: string
	redirectTo?: string
}