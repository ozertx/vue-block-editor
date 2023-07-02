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
import validators from './ajv'
// import Ajv from 'ajv';

// Types {JSONSchemaType} 
import type { App } from 'vue'


export function registerPlugins (app: App) {
  loadFonts()
  app.component("PanZoom", PanZoomComponent);
  app.component("Ajv", PanZoomComponent);
  app.config.globalProperties.$validators = validators

  app
    .use(vuetify)
    .use(router)
}
