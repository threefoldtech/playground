import { defineStore } from 'pinia'

export interface Profile {
  mnemonics: string
  ssh: string
  twinId: number
  address: string
}

interface State {
  mnemonics: string
  ssh: string
  loading: boolean
  profile?: Profile
}

const useProfileManager = defineStore('profile-manager', {
  state: (): State => {
    return {
      mnemonics: '',
      ssh: '',
      loading: false
    }
  },

  actions: {}
})

export { useProfileManager }
