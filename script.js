var data = [
  [
    { title: '表单 & 事件'},
    { url: 'form&event/01/index.html', title: '复选框 全选/反选' },
    { url: 'form&event/02/index.html', title: '网页换肤' },
    { url: 'form&event/03/index.html', title: '键盘操作DOM' },
    { url: 'form&event/04/index.html', title: '星级评分系统' },
    { url: 'form&event/05/index.html', title: '级联菜单' },
    { url: 'form&event/06/index.html', title: '完美拖拽' },
    { url: 'form&event/07/index.html', title: '弹出菜单' },
    { url: 'form&event/08/index.html', title: '拖拽 复制' },
    { url: 'form&event/09/index.html', title: '弹出层' },
    { url: 'form&event/10/index.html', title: '商品分类' },
    { url: 'form&event/11/index.html', title: '百度爱玩 - 榜单切换' },
    { url: 'form&event/12/index.html', title: '仿MAC OS任务栏' },
    { url: 'form&event/13/index.html', title: 'DOM移动' },
    { url: 'form&event/14/index.html', title: 'iPhone解锁' },
  ],
  [
    { title: '图片'},
    { url: 'pic/01/index.html', title: '自适应瀑布流' },
    { url: 'pic/02/index.html', title: '滑动门' },
    { url: 'pic/03/index.html', title: '放大镜' },
    { url: 'pic/04/index.html', title: '跟随对联广告' },
    { url: 'pic/05/index.html', title: '跟随鼠标显示大图' },
    { url: 'pic/06/index.html', title: '图片加载' },
    { url: 'pic/07/index.html', title: '百度爱玩 - 遮罩下拉' },
    { url: 'pic/08/index.html', title: '小米4' }
  ],
  [
    { title: '图片轮播'},
    { url: 'picplay/01/index.html', title: '图片加载切换' },
    { url: 'picplay/02/index.html', title: '网易天谕 - 进度轮播' },
    { url: 'picplay/03/index.html', title: '旋转木马' },
    { url: 'picplay/04/index.html', title: '翻页轮播' },
    { url: 'picplay/05/index.html', title: '淡入淡出轮换' },
    { url: 'picplay/06/index.html', title: '单个滚动轮播' }
  ],
  [
    { title: '综合'},
    { url: 'project/01/index.html', title: '计算器' },
    { url: 'project/02/index.html', title: '仿腾讯微博' }
  ],
  [
    { title: 'OOC'},
    { url: 'ooc/01/index.html', title: '运动' },
    { url: 'ooc/02/index.html', title: '照片墙' },
    { url: 'ooc/03/index.html', title: '图片轮播' },
    { url: 'ooc/04/index.html', title: '延时加载' },
    { url: 'ooc/05/index.html', title: '百度有啊通栏展示' },
    { url: 'ooc/06/index.html', title: '拖拽' },    
  ],
  [
    { title: 'GAME'},
    { url: 'game/01/index.html', title: '跑酷' },
    { url: 'game/02/index.html', title: '拼图' }
  ],
  [
    { title: 'OTHER'},
    { url: 'other/01/index.html', title: 'css函数' }
  ]
];

var ol = document.getElementById('ol');

for (var i = 0; i < data.length; i++) {
  var item = data[i];
  var li = document.createElement('li');
  var h1 = document.createElement('h1');
  var dl = document.createElement('dl');
  dl.className = 'sub-dl';
  for (var j = 0; j < item.length; j++) {
    var a = document.createElement('a');
    a.textContent = item[j].title;
    if (j == 0) {
      a.setAttribute('href', 'javascript:');
      h1.appendChild(a);
    } else {
      a.setAttribute('href', item[j].url);
      dl.appendChild(a);
    }
  }
  li.appendChild(h1);
  li.appendChild(dl);
  ol.appendChild(li);
}

var h1 = ol.getElementsByTagName('h1');
var dl = ol.getElementsByTagName('dl');
var openId = null;
for (i = 0; i < h1.length; i++) {
  h1[i].index = i;
  h1[i].onclick = function() {
    if (openId == null) {
      dl[this.index].style.display = 'block';
      openId = this.index;
    } else if (openId == this.index) {
      dl[this.index].style.display = 'none';
      openId = null;
    } else {
      dl[openId].style.display = 'none';
      dl[this.index].style.display = 'block';
      openId = this.index;
    }
  }
}
