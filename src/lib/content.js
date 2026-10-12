/**
 * 内容读取层（Content Source）
 * ============================================================
 * 页面不直接 import 数据文件，而是调用这里的函数。
 *
 * 这样做的好处：未来接入 Supabase 时，只需要把下面每个函数的
 * 内部实现换成数据库查询，页面代码完全不用改。
 *
 * 目前的实现全部是「读取本地示例数据」，所有函数都返回 Promise，
 * 是为了让将来的异步数据库查询可以无缝替换。
 */

import { readingNotes } from '../data/readingNotes.js'
import { lifeSlices } from '../data/lifeSlices.js'
import { psycheCards } from '../data/psycheCards.js'

/* ------------------------------------------------------------------
   共读档案
   ------------------------------------------------------------------ */

/** 获取全部读书笔记，按更新时间从新到旧排列 */
export async function listReadingNotes() {
  // 未来：return supabase.from('reading_notes').select('*').order('updated_at', { ascending: false })
  return [...readingNotes].sort((a, b) =>
    String(b.updatedAt).localeCompare(String(a.updatedAt)),
  )
}

/** 按 id 获取单篇读书笔记，找不到时返回 null */
export async function getReadingNote(id) {
  // 未来：return supabase.from('reading_notes').select('*').eq('id', id).maybeSingle()
  return readingNotes.find((note) => note.id === id) ?? null
}

/* ------------------------------------------------------------------
   生活切片
   ------------------------------------------------------------------ */

/**
 * 获取留言墙内容。
 * 注意：第一版返回的是本地示例数据，其中每一条的 isDemo 都是 true。
 * 未来接入真实数据库后，这里应当只返回「审核通过」的投稿。
 */
export async function listLifeSlices() {
  // 未来：return supabase.from('life_slices').select('*').eq('status', 'approved').order('created_at', { ascending: false })
  return [...lifeSlices].sort((a, b) =>
    String(b.createdAt).localeCompare(String(a.createdAt)),
  )
}

/**
 * 提交一条生活切片投稿。
 *
 * 第一版**没有接入任何后端**，此函数只做两件事：
 *   1. 把内容整理成一条「本地预览用的」记录返回；
 *   2. 明确标记 submitted = false，表示它没有发往任何服务器。
 *
 * 未来接入 Supabase 时，把下面的实现换成一次 insert 请求即可，
 * 同时注意：真实投稿必须带上 status = 'pending'，由管理员审核后
 * 才会变为 'approved' 并出现在留言墙上。
 */
export async function createLifeSliceDraft(input) {
  // 未来会是：
  // return supabase.from('life_slices').insert({
  //   author: input.author, category: input.category, content: input.content,
  //   status: 'pending',
  // })
  return {
    id: 'local-preview',
    author: input.author || '匿名',
    category: input.category,
    content: input.content,
    createdAt: new Date().toISOString().slice(0, 10),
    isDemo: true,
    submitted: false, // 关键：这一版投稿不会真的发送出去
  }
}

/* ------------------------------------------------------------------
   心理便利贴
   ------------------------------------------------------------------ */

/** 获取全部心理便利贴卡片 */
export async function listPsycheCards() {
  return [...psycheCards]
}

/** 按 id 获取单张便利贴，找不到时返回 null */
export async function getPsycheCard(id) {
  return psycheCards.find((card) => card.id === id) ?? null
}
