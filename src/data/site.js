/**
 * 网站全局信息。
 * 修改网站名称、栏目名称、口号时，改这里即可，导航和页脚会自动更新。
 */

export const siteInfo = {
  name: '心协学术空间',
  shortName: '心协学术空间',
  organizer: '山东大学学生心理协会学术部',
  tagline: '把心理学读进日常里',
  intro:
    '心协学术空间是山东大学学生心理协会学术部的线上交流与知识分享平台。我们希望它像一个安静的活动室：这里放得下逐周更新的读书笔记，也放得下每个人琐碎的日常，还有那些真正靠得住、有研究支撑的心理学概念。',
  contactNote: '网站由协会学术部维护',
}

/** 顶部导航与首页栏目入口 */
export const navigation = [
  { to: '/', label: '首页', description: '网站介绍与三个栏目入口', end: true },
  {
    to: '/reading',
    label: '共读档案',
    description: '每周更新的读书笔记，按书籍与主题归档',
  },
  {
    to: '/life',
    label: '生活切片',
    description: '全校同学的自由分享墙，不限于心理健康话题',
  },
  {
    to: '/psyche',
    label: '心理便利贴',
    description: '有研究支撑的心理学概念与发现',
  },
]

/** 首页的三个栏目入口卡片（顺序与编号呈现） */
export const sectionEntries = [
  {
    index: '01',
    to: '/reading',
    title: '共读档案',
    description:
      '每周一篇读书笔记，记录我们读到的心理学与人文社科作品。可按书籍或主题翻阅，也欢迎顺着某一条线索读下去。',
  },
  {
    index: '02',
    to: '/life',
    title: '生活切片',
    description:
      '一块属于全校同学的留言墙。最近的经历、说不清的感受、喜欢的书影音，都可以写下来。内容经审核后公开。',
  },
  {
    index: '03',
    to: '/psyche',
    title: '心理便利贴',
    description:
      '把心理学概念写成人话。每张便利贴包含术语、解释、生活案例与延伸思考，并列出可查证的研究来源。',
  },
]

/** 页脚链接组 */
export const footerGroups = [
  {
    title: '栏目',
    links: [
      { to: '/reading', label: '共读档案' },
      { to: '/life', label: '生活切片' },
      { to: '/psyche', label: '心理便利贴' },
    ],
  },
  {
    title: '参与',
    links: [
      { to: '/life/submit', label: '我要投稿' },
      { to: '/reading', label: '推荐一本书' },
    ],
  },
]
