import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DemoBadge } from '../components/DemoBadge.jsx'
import { createLifeSliceDraft } from '../lib/content.js'
import { lifeCategories } from '../data/lifeSlices.js'
import { formatDateCompact, initialOf, normalizeText } from '../lib/format.js'

const CONTENT_MIN = 10
const CONTENT_MAX = 600

/**
 * 生活切片投稿页。
 *
 * 重要说明（也是这一版的设计原则）：
 * 这里没有接入后端。提交按钮做的事情，是在本地把你写的内容
 * 渲染成一张预览卡片，帮助你确认排版和语气。
 * 页面不会显示「提交成功」，因为那会让人误以为内容已经发出去了。
 */
export function LifeSliceSubmitPage() {
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('最近经历')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState({})
  const [preview, setPreview] = useState(null)

  const selectableCategories = lifeCategories.filter((item) => item !== '全部')

  function validate() {
    const next = {}
    const text = normalizeText(content)

    if (text.length < CONTENT_MIN) {
      next.content = `请至少写下 ${CONTENT_MIN} 个字，再多说一点。`
    } else if (text.length > CONTENT_MAX) {
      next.content = `内容不能超过 ${CONTENT_MAX} 个字，当前 ${text.length} 个字。`
    }

    return next
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setPreview(null)
      return
    }

    const draft = await createLifeSliceDraft({
      author: normalizeText(author) || '匿名',
      category,
      content: normalizeText(content),
    })
    setPreview(draft)
  }

  function resetForm() {
    setAuthor('')
    setCategory('最近经历')
    setContent('')
    setErrors({})
    setPreview(null)
  }

  return (
    <div className="page">
      <div className="container container--narrow">
        <Link className="back-link" to="/life">
          ← 返回生活切片
        </Link>

        <div className="page-header">
          <p className="eyebrow">栏目 02 · 投稿</p>
          <h1 className="page-header__title">写下你的生活切片</h1>
          <p className="lede">
            可以是一件小事、一种说不清的感受，也可以是一本书、一部电影、
            一首歌，或者你最近沉迷的一件事。写多写少都可以。
          </p>
          <div className="page-header__meta">
            <DemoBadge label="演示版投稿表单" />
          </div>
        </div>

        <div className="notice notice--demo" style={{ marginBottom: 'var(--space-6)' }}>
          <span className="notice__title">请先读这段说明</span>
          这是第一版网站，投稿功能<strong>还没有接入服务器</strong>。
          点击下面的按钮，只是在你自己的电脑上生成一张预览卡片，
          用来确认排版和字数。
          <ul>
            <li>你的文字不会被发送、保存或上传到任何地方。</li>
            <li>刷新或关闭页面后，写的内容就消失了。</li>
            <li>不会有人看到，也不会进入审核流程。</li>
            <li>需要正式投稿时，请等待后续版本上线，或先联系学术部。</li>
          </ul>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label className="field__label" htmlFor="author">
              昵称
            </label>
            <input
              id="author"
              className="input"
              type="text"
              value={author}
              maxLength={20}
              placeholder="可以不填，默认显示「匿名」"
              onChange={(event) => setAuthor(event.target.value)}
            />
            <span className="field__hint">
              如果内容涉及你自己或他人的隐私，建议留空或使用化名。
            </span>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="category">
              分类
            </label>
            <select
              id="category"
              className="select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {selectableCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="content">
              内容
              <span className="field__required">必填</span>
            </label>
            <textarea
              id="content"
              className="textarea"
              value={content}
              maxLength={CONTENT_MAX}
              placeholder="例如：今天在图书馆坐到闭馆，出来发现下雨了，没带伞，走回去的路上反而有点开心。"
              onChange={(event) => setContent(event.target.value)}
              aria-invalid={Boolean(errors.content)}
              aria-describedby={errors.content ? 'content-error' : undefined}
            />
            {errors.content ? (
              <span className="field__error" id="content-error">
                {errors.content}
              </span>
            ) : (
              <span className="field__hint">
                建议 {CONTENT_MIN} 到 {CONTENT_MAX} 字。换行会被保留。
              </span>
            )}
          </div>

          <div className="form__actions">
            <button type="submit" className="btn btn--primary">
              在本地生成预览
            </button>
            <button type="button" className="btn btn--ghost" onClick={resetForm}>
              清空
            </button>
            <span className="form__counter">
              {normalizeText(content).length} / {CONTENT_MAX} 字
            </span>
          </div>
        </form>

        {preview ? (
          <section className="preview-panel" aria-live="polite">
            <h2 className="preview-panel__title">本地预览</h2>
            <div className="notice notice--demo">
              <span className="notice__title">这不是正式提交</span>
              下面只是在你自己的浏览器里生成的预览卡片，没有上传到服务器，
              也没有进入审核。你可以继续修改左侧内容并重新生成预览。
            </div>

            <div className="preview-panel__card">
              <div className="slice-card__head" style={{ marginBottom: 'var(--space-4)' }}>
                <span className="avatar" aria-hidden="true">
                  {initialOf(preview.author)}
                </span>
                <span>
                  <span className="slice-card__author">{preview.author}</span>
                  <br />
                  <span className="slice-card__time">
                    {formatDateCompact(preview.createdAt)}
                  </span>
                </span>
                <span style={{ marginLeft: 'auto' }}>
                  <span className="tag tag--plain">{preview.category}</span>
                </span>
              </div>
              <p className="slice-card__body">{preview.content}</p>
            </div>

            <p className="field__hint">
              提交状态：未提交（仅本地预览）。刷新页面后这段预览会消失。
            </p>
          </section>
        ) : null}

        <section className="section" style={{ borderTop: 'none' }}>
          <h2 className="preview-panel__title">未来的投稿流程</h2>
          <div className="prose" style={{ marginTop: 'var(--space-4)' }}>
            <p>后续版本接上数据库后，流程会是这样的：</p>
            <ul>
              <li>你在投稿页填写内容并提交；</li>
              <li>内容进入「待审核」状态，此时只有管理员能看到；</li>
              <li>管理员确认内容合适之后，把它标记为已通过；</li>
              <li>通过之后，这条切片才会出现在留言墙上。</li>
            </ul>
            <p>
              这个顺序是刻意的：公开页面上只会出现已经审核过的内容，
              投稿者的草稿不会因为误操作而被公开。
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
