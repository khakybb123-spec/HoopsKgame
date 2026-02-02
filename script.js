let soBiMat = Math.floor(Math.random() * 101);
let soLanDoan = 0;
let gioiHanLan = 7;
let diem = 0;
let vong = 1;
let tongVong = 5;

function resetVong() {
  soBiMat = Math.floor(Math.random() * 101);
  soLanDoan = 0;
  document.getElementById("round").innerText = vong;
}

function hienThongBao(text, type) {
  const effect = document.getElementById("effect");
  effect.innerText = text;
  effect.className = "effect " + type;
}

function checkGuess() {
  const doan = Number(document.getElementById("guess").value);

  if (isNaN(doan)) return;

  soLanDoan++;

  if (doan < soBiMat) {
    hienThongBao("Trên", "lose");
  } else if (doan > soBiMat) {
    hienThongBao("Dưới", "lose");
  } else {
    diem++;
    document.getElementById("score").innerText = diem;
    hienThongBao("Chuẩn luôn bro 🏀", "win");

    vong++;

    if (vong > tongVong) {
      alert("Xin chúc mừng bro 🎉");
      return;
    }

    resetVong();
    return;
  }

  if (soLanDoan >= gioiHanLan) {
    hienThongBao("Sao bro ngáo thế :)", "lose");
    vong++;

    if (vong > tongVong) {
      alert("Game over rồi bro 😅");
      return;
    }

    resetVong();
  }
}

resetVong();
