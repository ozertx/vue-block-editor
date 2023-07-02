/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import PanZoomComponent from './PanZoom.vue'
import AjvComponent from './PanZoom.vue'
import vuetify from './vuetify'
import router from '../router'
import Ajv from 'ajv';

const ajv = new Ajv();

// Types
import type { App } from 'vue'


export function registerPlugins (app: App) {
  loadFonts()
  app.component("PanZoom", PanZoomComponent);
  app.component("Ajv", PanZoomComponent);
  app.config.globalProperties.$ajv = ajv

  app
    .use(vuetify)
    .use(router)
}
