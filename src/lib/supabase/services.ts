import { Service } from './di'

export interface IAuthService {
  getUser(): Promise<any>
  signInWithOtp(email: string): Promise<any>
  signOut(): Promise<any>
}

export interface IPostService {
  getAllPosts(): Promise<any[]>
  getPostById(id: string): Promise<any>
  upsertPost(post: any): Promise<any>
  deletePost(id: string): Promise<any>
}

@Service()
export class SupabaseService implements IAuthService, IPostService {
  private _client: any

  set client(c: any) {
    this._client = c
  }

  get client() {
    return this._client
  }

  async getUser() {
    if (!this.client) return null
    const { data } = await this.client.auth.getUser()
    return data.user
  }

  async signInWithOtp(email: string) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')
    return await this.client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback`,
      },
    })
  }

  async signOut() {
    return await this.client.auth.signOut()
  }

  async getAllPosts() {
    const { data } = await this.client.from('posts').select('*').order('created_at', { ascending: false })
    return data || []
  }

  async getPostById(id: string) {
    const { data } = await this.client.from('posts').select('*').eq('id', id).single()
    return data
  }

  async upsertPost(post: any) {
    return await this.client.from('posts').upsert(post)
  }

  async deletePost(id: string) {
    return await this.client.from('posts').delete().eq('id', id)
  }
}
