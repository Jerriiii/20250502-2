let capture;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上
}

function draw() {
  background('#bc4749'); // 背景顏色為指定的紅色 (#bc4749)

  // 翻轉畫布以修正影像左右顛倒
  push(); // 儲存當前繪圖設定
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉畫布

  // 繪製攝影機影像
  image(
    capture,
    (width - capture.width) / 2, // 計算影像水平置中的位置
    (height - capture.height) / 2 // 計算影像垂直置中的位置
  );

  pop(); // 恢復繪圖設定
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小
}
