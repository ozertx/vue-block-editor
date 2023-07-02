/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const rootProps = {
  initBlocks: {
    b1: {
      x: -300, y: 200
    },
    b2: {
      x: 200, y: 200
    },
  }
}

const app = createApp(App, rootProps)

registerPlugins(app)

app.mount('#app')
