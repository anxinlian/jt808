/** 向页面 head 注入 JSON-LD 结构化数据（GEO / SEO） */
export function useJsonLd(data: MaybeRefOrGetter<Record<string, unknown> | Record<string, unknown>[] | null | undefined>) {
  useHead(() => {
    const raw = toValue(data)
    if (!raw) return {}

    const items = Array.isArray(raw) ? raw : [raw]
    return {
      script: items.map((item, index) => ({
        key: `jsonld-${String(item['@type'] ?? index)}`,
        type: 'application/ld+json',
        textContent: JSON.stringify(item),
      })),
    }
  })
}
