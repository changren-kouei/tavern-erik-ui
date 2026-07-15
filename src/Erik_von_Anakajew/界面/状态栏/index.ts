import { waitUntil } from 'async-wait-until';
// eslint-disable-next-line import-x/no-named-as-default
import jQuery from 'jquery';
import lodash from 'lodash';
import './global.css';

const isPreviewMode = typeof Mvu === 'undefined' || typeof getVariables === 'undefined';

jQuery(async () => {
  // schema.ts follows the Tavern convention of using the global lodash `_`.
  // Install it before lazily loading the component in standalone preview mode.
  (globalThis as any)._ ??= lodash;
  const { default: App } = await import('./App.vue');

  if (!isPreviewMode) {
    await waitGlobalInitialized('Mvu');
    await waitUntil(() => _.has(getVariables({ type: 'message', message_id: getCurrentMessageId() }), 'stat_data'));
  }

  const app = createApp(App).use(createPinia());
  app.mount('#app');
  console.info(`[Erik status] mounted in ${isPreviewMode ? 'preview' : 'MVU'} mode`);

  jQuery(window).on('pagehide', () => app.unmount());
});
