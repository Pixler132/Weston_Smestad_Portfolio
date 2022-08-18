export class PersistanceService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      //if (e) console.error('Error saving to localStorage', e)
    }
  }
  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key) || '')
    } catch (e) {
      // if (e) console.error('Error getting from localStorage', e)
      return null
    }
  }
}
