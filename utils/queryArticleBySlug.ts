/** 按路由 slug 查询 `content/articles` 对应文档（id / stem / path 多路匹配） */
export async function queryArticleBySlug(slug: string) {
  if (!slug) return null

  const q = () => queryCollection('articles')

  let row = await q().where('id', '=', slug).first()
  if (row) return row

  row = await q().where('stem', '=', `articles/${slug}`).first()
  if (row) return row

  row = await q().path(`/articles/${slug}`).first()
  if (row) return row

  return await q().path(`articles/${slug}`).first()
}
