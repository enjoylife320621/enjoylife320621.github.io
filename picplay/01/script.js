window.onload = function() {
  var big = document.querySelector('#big');
  var l = document.querySelector('#masks_L');
  var r = document.querySelector('#masks_R');
  var lBtn = document.querySelector('#btn_L');
  var rBtn = document.querySelector('#btn_R');
  var title = document.querySelector('#title');
  var span = title.querySelector('span');
  var index = 0;
  var data = [
    {"imgSrc" : "http://img1.gtimg.com/news/pics/hv1/106/238/825/53706421.jpg", "title" : "7月26日，吊车将事故现场的车头残片吊至大型运输车辆上。"},
    {"imgSrc" : "http://img1.gtimg.com/news/pics/hv1/105/238/825/53706420.jpg", "title" : "7月26日，一辆大卡车准备驶离事故现场。"},
    {"imgSrc" : "http://img1.gtimg.com/news/pics/hv1/101/238/825/53706416.jpg", "title" : "7月26日，工人在给最后一节车厢盖上彩条布，准备运离现场。"},
    {"imgSrc" : "http://img1.gtimg.com/news/pics/hv1/99/238/825/53706414.jpg", "title" : "7月26日，一名工人在事故现场最后一节车厢上作业。"},
    {"imgSrc" : "http://img1.gtimg.com/news/pics/hv1/100/238/825/53706415.jpg", "title" : "7月26日，工人在给最后一节车厢盖上彩条布，准备运离现场。"}
  ];

  loadImg();

  l.onmouseover = lBtn.onmouseover = function() {
    slide(lBtn, 'opacity', 100);
  };

  l.onmouseout = lBtn.onmouseout  = function() {
    slide(lBtn, 'opacity', 0);
  };

  r.onmouseover = rBtn.onmouseover  = function() {
    slide(rBtn, 'opacity', 100);
  };

  r.onmouseout = rBtn.onmouseout  = function() {
    slide(rBtn, 'opacity', 0);
  };

  lBtn.onclick = function() {
    if (index == 0) {
      alert('这是第一张图片！');
    } else {
      index--;
      loadImg();
    }
  };

  rBtn.onclick = function() {
    if (index == data.length - 1) {
      alert('这是最后一张图片！');
    } else {
      index++;
      loadImg();
    }
  };

  function loadImg() {
    big.className = 'loading';
    span.style.opacity = 0;
    span.style.filter = 'alpha(opacity=0)';
    title.style.height = 0 + 'px';
    var img = big.querySelector('img');
    img && big.removeChild(img);
    img = document.createElement('img');  
    img.src = data[index].imgSrc;
    img.onload = function() {
      big.appendChild(img);
      big.className = '';
      if (img.offsetWidth > 800)
        img.style.width = 800 + 'px';
      span.innerHTML = data[index].title;
      slide(title, 'height', 50, function() {
        slide(span, 'opacity', 100)
      });
    }
  }

  function slide(ele, attr, to, fn) {
    clearInterval(ele.timer);
    var cur = parseFloat(getStyle(ele, attr));
    if (attr == 'opacity')
      cur = cur * 100;
    ele.timer = setInterval(function() {
      var step = (to - cur) / 8;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      if (cur != to) {
        cur += step;
        if (attr == 'opacity') {
          ele.style.filter = 'alpha(opacity=' + cur + ')';
          ele.style[attr] = cur / 100;          
        } else {  
          ele.style[attr] = cur + 'px';  
        }
      }
      else {
        clearInterval(ele.timer);
        fn && fn();
      }
    }, 30);
  }

  function getStyle(ele, attr) {
    return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, null)[attr];
  }  
}
