/** 页面 SEO 字符长度规范（汉字、英文、标点均计 1 字符） */
export const SEO_TITLE_MIN = 50
export const SEO_TITLE_MAX = 60
export const SEO_DESC_MIN = 150
export const SEO_DESC_MAX = 160
export const SEO_KW_MIN = 50
export const SEO_KW_MAX = 90

const DESC_PAD = '更多详情欢迎访问星联互动官网。'
const KW_PAD = ',星联互动,北斗安心联'

/** title 过短时依次尝试的单次后缀（避免重复堆叠同一品牌词） */
const TITLE_SUFFIXES = [
  '｜河南星联互动科技',
  '｜北斗安心联车辆监控',
  '｜808/1078车载监控',
]

/** 将文本长度收敛到 [min, max]；过长时在标点处截断 */
export function fitSeoText(text: string, min: number, max: number, pad = ''): string {
  let s = text.trim()
  if (!s) return s

  if (s.length > max) {
    s = s.slice(0, max)
    const punct = Math.max(s.lastIndexOf('。'), s.lastIndexOf('，'), s.lastIndexOf('；'), s.lastIndexOf(','))
    if (punct >= min - 1) {
      s = s.slice(0, punct + 1)
    }
    if (s.length > max) s = s.slice(0, max)
    return s
  }

  const filler = pad || DESC_PAD
  while (s.length < min && filler) {
    const next = s + filler
    if (next.length > max) {
      s = next.slice(0, max)
      break
    }
    s = next
  }

  return s.slice(0, max)
}

/** title 专用：不足 50 字时只追加一次有意义后缀，禁止重复「｜星联互动」 */
export function fitSeoTitle(text: string): string {
  let s = text.trim()
  if (!s) return s

  if (s.length > SEO_TITLE_MAX) {
    s = s.slice(0, SEO_TITLE_MAX)
    const punct = Math.max(s.lastIndexOf('·'), s.lastIndexOf('｜'), s.lastIndexOf('，'))
    if (punct >= SEO_TITLE_MIN - 1) {
      s = s.slice(0, punct + 1)
    }
    return s.slice(0, SEO_TITLE_MAX)
  }

  if (s.length >= SEO_TITLE_MIN) return s

  for (const suffix of TITLE_SUFFIXES) {
    if (s.length >= SEO_TITLE_MIN) break
    const next = s + suffix
    s = next.length <= SEO_TITLE_MAX ? next : next.slice(0, SEO_TITLE_MAX)
  }

  return s.slice(0, SEO_TITLE_MAX)
}

export function fitSeoDescription(text: string): string {
  return fitSeoText(text, SEO_DESC_MIN, SEO_DESC_MAX, DESC_PAD)
}

export function fitSeoKeywords(text: string): string {
  return fitSeoText(text, SEO_KW_MIN, SEO_KW_MAX, KW_PAD)
}
