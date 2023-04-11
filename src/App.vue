<template>
  <v-app>
    <v-navigation-drawer width="280" permanent>
      <v-list>
        <v-list-item title="Home" value="home"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <ProfileManager />
      <v-switch label="publicIP" v-model="publicIP" />
      <SelectNodeId v-model="nodeId" :deps="{ publicIp: publicIP }" />
      <InputValidator :rules="rules" :asyncRules="asyncRules">
        <template #default="{ props }">
          <v-text-field label="test" v-model="valueInput" v-bind="props"> </v-text-field>
        </template>
      </InputValidator>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import ProfileManager from './weblets/profile_manager.vue'
import SelectNodeId from './components/select_node_id.vue'
import InputValidator from './components/input_validator.vue'
import { ref } from 'vue'
import { getGrid } from './utils/grid'

export default {
  name: 'App',
  components: {
    ProfileManager,
    SelectNodeId,
    InputValidator
  },
  setup() {
    const nodeId = ref<number>(0)
    const title = ref('')
    const publicIP = ref(false)
    const valueInput = ref('')

    const testRule = (value: string) => {
      console.log("🚀 ~ file: App.vue:43 ~ testRule ~ value:", value)
      if (value && value.length > 10) {
        return 'Value is More than 10 chars' as string
      }
      return ''
    }
    const testasyncRule = async (value: string) => {
      const grid = await getGrid(ProfileManager.profile!)

      if (value && !grid) {
        return 'Api error' as string
      }
      return ''
    }
    const asyncRules = [testasyncRule]
    const rules = [testRule]

    return { nodeId, title, publicIP, valueInput, rules, asyncRules }
  }
}
</script>

<style lang="scss" global>
.app-link {
  text-decoration: none;
  font-weight: bold;
  color: #0d47a1;
  cursor: pointer;
}
</style>
