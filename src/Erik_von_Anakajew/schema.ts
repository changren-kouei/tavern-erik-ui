export const Schema = z
  .object({
    世界: z
      .object({
        当前时间: z.string().prefault('2096年11月18日 01:37'),
      })
      .prefault({}),
    Erik: z
      .object({
        _角色名称: z.string().prefault('Erik·von·Anakajew'),
        当前衣着: z.string().prefault('白衬衫袖口挽至前臂，领口微松；实验外套搭在椅背'),
        当前心理: z.string().prefault('姐姐果然还是来了；他不愿承认自己一直在等她。'),
        性器状态: z.string().prefault('放松，无明显反应'),
        理智值: z.coerce
          .number()
          .transform(value => _.clamp(value, 0, 100))
          .prefault(92),
        欲望: z.coerce
          .number()
          .transform(value => _.clamp(value, 0, 100))
          .prefault(38),
        关系阶段: z.enum(['守护如常', '欲望自觉', '边界试探', '秘密恋人']).prefault('守护如常'),
      })
      .prefault({}),
  })
  .prefault({});

export type Schema = z.output<typeof Schema>;
