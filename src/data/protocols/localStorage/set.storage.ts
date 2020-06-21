export interface SetStorage {
  set: (key: string, value: string) => Promise<void>
}
