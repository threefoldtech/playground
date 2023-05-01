import { defineStore } from 'pinia'

export interface Profile {
  mnemonics: string
  ssh: string
  twinId: number
  address: string
}

interface State {
  profile: Profile | null
}

const useProfileManager = defineStore('profile-manager', {
  state: (): State => {
    return { profile: null }
  },

  actions: {
    set(profile: Profile | null) {
      this.profile = profile
    },
    clear() {
      this.profile = null
    }
  }
})

export { useProfileManager }
