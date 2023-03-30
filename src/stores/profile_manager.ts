import { defineStore } from 'pinia'

export interface Profile {
  mnemonics: string
  ssh: string
  twinId: number
  address: string
  balance: { free: number; locked: number }
}

interface State {
  mnemonics: string
  profile: Profile | null
}

const useProfileManager = defineStore('profile-manager', {
  state: (): State => {
    return {
      mnemonics: '',
      profile: null
    }
  },

  actions: {
    setProfile(profile: Profile | null) {
      this.profile = profile
    }
  }
})

export { useProfileManager }
