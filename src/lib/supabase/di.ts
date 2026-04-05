import 'reflect-metadata';

const SERVICES_METADATA_KEY = Symbol('services');
const container = new Map<any, any>();

export function Service() {
  return function (target: any) {
    // In a real SpringBoot style, we would register it in the container
    // For Next.js Server Components, we might need a fresh instance or a singleton
    container.set(target, new target());
  };
}

export function Inject<T>(serviceToken: any): T {
  if (!container.has(serviceToken)) {
    container.set(serviceToken, new serviceToken());
  }
  return container.get(serviceToken);
}
