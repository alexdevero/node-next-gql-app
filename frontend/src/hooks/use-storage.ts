type StorageType = 'local' | 'session'

export const useStorage = (key: string, storageType: StorageType = 'local') => {
  const getItem = () => {
    if (!window) return null

    const storage = storageType === 'local' ? localStorage : sessionStorage
    const item = storage.getItem(key)

    return item ? JSON.parse(item) : null
  }

  const setItem = (value: any) => {
    if (!window) return null

    const storage = storageType === 'local' ? localStorage : sessionStorage
    const item = JSON.stringify(value)

    storage.setItem(key, item)
  }

  const removeItem = () => {
    if (!window) return null

    const storage = storageType === 'local' ? localStorage : sessionStorage

    storage.removeItem(key)
  }

  return {
    getItem,
    setItem,
    removeItem,
  }
}
