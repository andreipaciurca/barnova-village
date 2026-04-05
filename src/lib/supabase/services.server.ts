import { createClient } from './server'
import { SupabaseService } from './services'
import { Inject } from './di'

export async function getServerService(): Promise<SupabaseService> {
  const client = await createClient()
  const service = Inject<SupabaseService>(SupabaseService)
  service.client = client
  return service
}
