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
    let mnemonics = ''
    let profile: Profile | null = null
    try {
      const p = JSON.parse(sessionStorage.getItem('profile')!)
      profile = p
      mnemonics = p.mnemonics
    } catch {
      /* Pass */
    }

    return { mnemonics, profile }
  },

  actions: {
    setProfile(profile: Profile | null) {
      this.profile = profile
      this.storeProfile()
    },
    storeProfile() {
      if (this.profile) {
        sessionStorage.setItem('profile', JSON.stringify(this.profile))
      } else {
        sessionStorage.removeItem('profile')
      }
    }
  }
})

export { useProfileManager }
