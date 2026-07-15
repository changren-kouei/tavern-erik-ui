import { defineStore } from 'pinia';
import { Schema } from '../../schema';

const isPreviewMode = typeof Mvu === 'undefined' || typeof getVariables === 'undefined';

const openingData: Schema = Schema.parse({
  世界: {
    当前时间: '2096年11月18日 01:37',
  },
  Erik: {
    _角色名称: 'Erik·von·Anakajew',
    当前衣着: '白衬衫袖口挽至前臂，领口微松；实验外套搭在椅背',
    当前心理: '姐姐果然还是来了；他不愿承认自己一直在等她。',
    性器状态: '放松，无明显反应',
    理智值: 92,
    欲望: 38,
    关系阶段: '守护如常',
  },
});

export const useDataStore = defineStore('erik-status-readonly', () => {
  const readCurrentData = () => {
    if (isPreviewMode) {
      return openingData;
    }
    return Schema.parse(_.get(getVariables({ type: 'message', message_id: getCurrentMessageId() }), 'stat_data', {}));
  };

  const source = ref<Schema>(readCurrentData());

  if (!isPreviewMode) {
    useIntervalFn(() => {
      const result = Schema.safeParse(
        _.get(getVariables({ type: 'message', message_id: getCurrentMessageId() }), 'stat_data', {}),
      );
      if (result.success && !_.isEqual(source.value, result.data)) {
        source.value = result.data;
      }
    }, 1000);
  }

  // Only expose a computed snapshot: the interface never writes to story data.
  const data = computed(() => source.value);
  return { data };
});
