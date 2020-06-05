export interface HttpPostClient {
  post<T = any>(url: string): Promise<T>
}
