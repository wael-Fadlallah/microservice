export interface serviceType {
  serviceName: string;
  serviceVersion: string;
  servicePort: string;
  timestamp?: number;
  ip: string;
}
export interface serviceArrayItemType {
  [key: string]: serviceType;
}
