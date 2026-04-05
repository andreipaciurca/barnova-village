import { createClient } from './client'
import { SupabaseService } from './services'
import { Inject } from './di'

export function getBrowserService(): SupabaseService {
  const client = createClient()
  const service = Inject<SupabaseService>(SupabaseService)
  service.client = client
  return service
}
