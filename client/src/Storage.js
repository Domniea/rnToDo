import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV({
  id: `storage`
//   path: `rnToDo/storage`,
//   encryptionKey: 'encryptionkey'
})

// export const test2 = new MMKV({
//     id: 'testStorage'
// })