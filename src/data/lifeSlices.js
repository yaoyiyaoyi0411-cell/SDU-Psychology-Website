/**
 * 生活切片：留言墙数据（第一版为示例内容）
 *
 * 字段说明：
 * id        唯一标识
 * author    昵称
 * category  分类，用于筛选
 * createdAt 发布时间，格式 YYYY-MM-DD
 * content   正文，支持换行
 * isDemo    是否演示内容（第一版全部为 true）
 */

export const lifeCategories = [
  '全部',
  '最近经历',
  '情绪与感受',
  '书影音推荐',
  '兴趣与日常',
]

export const lifeSlices = [
  {
    id: 'slice-01',
    author: '一只候鸟',
    category: '最近经历',
    createdAt: '2026-10-08',
    content:
      '第一次自己去食堂吃饭，坐在靠窗的位置。以前觉得一个人吃饭是件需要解释的事，那天发现根本没人看我。窗外的树开始变黄了，一顿饭吃完，天就暗了一截。',
    isDemo: true,
  },
  {
    id: 'slice-02',
    author: '七号楼常驻',
    category: '书影音推荐',
    createdAt: '2026-10-06',
    content:
      '推荐一部纪录片《我的章鱼老师》。看完之后走在路上会突然停下来看看水池、看看树根，好像世界比平时多了几个层次。适合在心情有点钝的时候看。',
    isDemo: true,
  },
  {
    id: 'slice-03',
    author: '匿名',
    category: '情绪与感受',
    createdAt: '2026-10-04',
    content:
      '保研的事情尘埃落定了，但高兴了大概两天就没了。剩下一种说不上来的空。别人都说这是好事，我也知道是好事，就是没办法一直高兴。',
    isDemo: true,
  },
  {
    id: 'slice-04',
    author: '爱好是洗衣服',
    category: '兴趣与日常',
    createdAt: '2026-10-02',
    content:
      '最近喜欢上了把衣服按颜色深浅排序再洗。听起来很无聊，但看着一堆混乱的东西被我分成几组，心里会踏实一点。也许人总得有一件事是完全由自己掌控的。',
    isDemo: true,
  },
  {
    id: 'slice-05',
    author: '来自图书馆五楼',
    category: '最近经历',
    createdAt: '2026-09-29',
    content:
      '和朋友因为一件很小的事冷战了五天。第六天她递给我一瓶水，我说了声谢谢，然后我们就和好了。原来很多僵局不需要谁先道歉，只需要一个人先打破沉默。',
    isDemo: true,
  },
  {
    id: 'slice-06',
    author: '晚八点散步协会',
    category: '兴趣与日常',
    createdAt: '2026-09-26',
    content:
      '发现学校西边那条路晚上八点人特别少，路灯把树的影子投在地上。这一个月我几乎每天都去走二十分钟，什么也不想。推荐给所有觉得生活有点挤的人。',
    isDemo: true,
  },
]
