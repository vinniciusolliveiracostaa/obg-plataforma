export interface NatsConfig {
  url: string;
  queue: string;
  name: string;
  timeout?: number;
  user?: string;
  pass?: string;
}
