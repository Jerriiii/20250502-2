let capture;
let graphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上

  // 建立與攝影機影像相同大小的 graphics
  graphics = createGraphics(capture.width, capture.height);
}

function draw() {
  background('#bc4749'); // 背景顏色為指定的紅色 (#bc4749)

  // 翻轉畫布以修正影像左右顛倒
  push();
  translate(width, 0);
  scale(-1, 1);
  image(
    capture,
    (width - capture.width) / 2, // 計算影像水平置中的位置
    (height - capture.height) / 2 // 計算影像垂直置中的位置
  );
  pop();

  // 在 graphics 上繪製內容
  graphics.background(0); // 設定 graphics 背景為黑色
  graphics.noStroke();
  for (let x = 0; x < graphics.width; x += 20) {
    for (let y = 0; y < graphics.height; y += 20) {
      // 從攝影機影像中取得相對應位置的顏色
      let col = capture.get(x, y);
      graphics.fill(col); // 設定圓的顏色為該位置的顏色
      graphics.ellipse(x + 10, y + 10, 15, 15); // 繪製寬高為 15 的圓
    }
  }

  // 將 graphics 顯示在螢幕正中間
  image(
    graphics,
    (width - graphics.width) / 2, // 計算 graphics 水平置中的位置
    (height - graphics.height) / 2 // 計算 graphics 垂直置中的位置
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小
  graphics = createGraphics(capture.width, capture.height); // 更新 graphics 大小
}
