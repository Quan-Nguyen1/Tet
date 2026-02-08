// ========== KHỞI TẠO ==========
document.addEventListener("DOMContentLoaded", function () {
  console.log("🎯 Website Tết Bính Ngọ 2026 đã được tải thành công!");
  console.log("📅 Thời điểm Tết: 00:00 ngày 17/02/2026 (GMT+7)");
  console.log("🔧 Để test nhanh, gọi hàm testTetArrival() trong console");

  // Bắt đầu đếm ngược
  startCountdown();

  // Khởi tạo tương tác
  initInteractions();

  // Tạo pháo hoa chào mừng
  setTimeout(() => {
    createFireworks(3);
  }, 1000);

  // Khởi tạo scroll
  initScroll();

  // TEST: Để test nhanh, bạn có thể uncomment dòng dưới đây
  // testTetArrival();
});

// ========== BIẾN TOÀN CỤC ==========
let isTetArrived = false;
let fireworksInterval;
let confettiInterval;

// ========== HÀM TEST TẾT ĐẾN ==========
function testTetArrival() {
  console.log("⚠️ ĐANG TEST CHẾ ĐỘ TẾT ĐẾN ⚠️");
  // Sửa ngày Tết thành 10 giây sau để test
  window.testTetDate = new Date();
  window.testTetDate.setSeconds(window.testTetDate.getSeconds() + 10);
  console.log("Tết sẽ đến lúc:", window.testTetDate.toLocaleString());
}

// ========== BỘ ĐẾM NGƯỢC ==========
function startCountdown() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  if (isTetArrived) return;

  // Sử dụng ngày test nếu có, nếu không dùng ngày Tết thật
  const tetDate = window.testTetDate || new Date("2026-02-17T00:00:00+07:00");
  const now = new Date();
  const timeLeft = tetDate.getTime() - now.getTime();

  if (timeLeft <= 0) {
    console.log("🎉 TẾT ĐÃ ĐẾN! 🎉");
    isTetArrived = true;

    // Cập nhật hiển thị đếm ngược
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    // HIỂN THỊ THÔNG BÁO TẾT ĐÃ ĐẾN
    const countdownTitle = document.querySelector(".countdown-title");
    countdownTitle.innerHTML =
      '🎉 <span style="color:#ffd700; font-size:3rem; text-shadow: 0 0 20px #ff0000;">CHÚC MỪNG NĂM MỚI BÍNH NGỌ 2026!</span> 🎉';

    // Tạo thông báo Tết đặc biệt
    const newYearMessage = document.createElement("div");
    newYearMessage.className = "new-year-message";
    newYearMessage.innerHTML = `
            <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">🎊 XUÂN BÍNH NGỌ ĐÃ VỀ! 🎊</h2>
            <p style="font-size: 1.5rem; margin-bottom: 1rem;">
                Giao thừa đã điểm! Chúc mọi người một năm mới:
            </p>
            <div class="new-year-grid">
                <div class="new-year-item">
                    🐎 <strong>Năm Ngọ Thịnh Vượng</strong>
                </div>
                <div class="new-year-item">
                    💰 <strong>Phát Tài Phát Lộc</strong>
                </div>
                <div class="new-year-item">
                    🏡 <strong>Gia Đình An Khang</strong>
                </div>
                <div class="new-year-item">
                    💖 <strong>Tình Duyên Viên Mãn</strong>
                </div>
            </div>
            <p style="font-size: 1.2rem; font-style: italic; margin-top: 1rem;">
                "Xuân sang trăm hoa đua nở, Năm mới vạn sự như ý"
            </p>
        `;

    // Thêm thông báo vào countdown
    const countdown = document.querySelector(".countdown");
    countdown.appendChild(newYearMessage);

    // Cập nhật thông tin ngày Tết
    const tetDateElement = document.querySelector(".tet-date");
    tetDateElement.innerHTML =
      '<div style="color:#ffd700; font-size:1.5rem;">✨ Đã đến thời khắc Giao thừa ✨</div>';

    // Thay đổi style countdown
    countdown.style.background =
      "linear-gradient(135deg, #ff0000, #ff4500, #ffd700)";
    countdown.style.animation = "rainbowBackground 3s infinite alternate";

    // Thêm hiệu ứng pháo hoa liên tục
    startContinuousFireworks();

    // Tạo confetti
    createConfetti();

    // Phát âm thanh chúc mừng
    playNewYearSound();

    // Thay đổi tiêu đề trang
    document.title = "🎉 Chúc Mừng Năm Mới Bính Ngọ 2026! 🎉";

    // Thêm hiệu ứng cho toàn bộ page
    document.body.style.animation = "rainbowBackground 10s infinite";

    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

// ========== PHÁO HOA LIÊN TỤC ==========
function startContinuousFireworks() {
  if (fireworksInterval) clearInterval(fireworksInterval);

  // Pháo hoa dày đặc trong 30 giây đầu
  fireworksInterval = setInterval(() => {
    createFireworks(5);
  }, 300);

  // Sau 30 giây, giảm tần suất
  setTimeout(() => {
    clearInterval(fireworksInterval);
    fireworksInterval = setInterval(() => {
      createFireworks(2);
    }, 1500);
  }, 30000);
}

// ========== TẠO CONFETTI ==========
function createConfetti() {
  if (confettiInterval) clearInterval(confettiInterval);

  const colors = [
    "#c41e3a",
    "#ffd700",
    "#ff4500",
    "#32cd32",
    "#1e90ff",
    "#9370db",
  ];
  confettiInterval = setInterval(() => {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 15 + 5 + "px";
        confetti.style.height = Math.random() * 15 + 5 + "px";
        confetti.style.opacity = "1";

        document.body.appendChild(confetti);

        const animationDuration = Math.random() * 3 + 2;
        confetti.style.animation = `confettiFall ${animationDuration}s linear forwards`;

        setTimeout(() => {
          confetti.remove();
        }, animationDuration * 1000);
      }, i * 50);
    }
  }, 2000);
}

// ========== ÂM THANH CHÚC MỪNG ==========
function playNewYearSound() {
  try {
    const audioContext = new (
      window.AudioContext || window.webkitAudioContext
    )();
    const notes = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5
    let time = audioContext.currentTime;

    notes.forEach((freq, i) => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          0.3,
          audioContext.currentTime + 0.1,
        );
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.8,
        );

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.8);
      }, i * 300);
    });

    // Âm thanh pháo hoa
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.frequency.setValueAtTime(
            80 + Math.random() * 300,
            audioContext.currentTime,
          );
          oscillator.type = "sawtooth";

          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(
            0.2,
            audioContext.currentTime + 0.05,
          );
          gainNode.gain.exponentialRampToValueAtTime(
            0.01,
            audioContext.currentTime + 0.4,
          );

          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.4);
        }, i * 200);
      }
    }, 1500);
  } catch (error) {
    console.log("Không thể phát âm thanh:", error);
  }
}

// ========== LỜI CHÚC TẾT ==========
function initInteractions() {
  const wishes = [
    "Chúc mừng năm mới Bính Ngọ 2026! An khang thịnh vượng, vạn sự như ý!",
    "Năm mới chúc bạn sức khỏe dồi dào, công việc thuận lợi, gia đình hạnh phúc!",
    "Xuân Bính Ngọ chúc bạn tiền vào như nước, tiền ra nhỏ giọt, tình yêu đầy ắp!",
    "Chúc bạn năm Ngọ thăng tiến như diều gặp gió, phát tài phát lộc!",
    "Năm mới chúc bạn bình an, hạnh phúc, thành công rực rỡ!",
    "Chúc gia đình bạn đón Tết ấm áp, sum vầy và tràn ngập tiếng cười!",
    "Xuân về chúc bạn ngập tràn niềm vui, hạnh phúc và những điều tốt đẹp nhất!",
    "Năm Bính Ngọ chúc bạn sự nghiệp thăng hoa, tài lộc dồi dào, sức khỏe viên mãn!",
    "Chúc bạn năm mới gặp nhiều may mắn, thành công vượt bậc trong mọi lĩnh vực!",
    "Xuân sang chúc bạn và gia đình an khang, thịnh vượng, vạn sự cát tường!",
  ];

  const wishText = document.getElementById("wishText");
  const newWishBtn = document.getElementById("newWishBtn");

  newWishBtn.addEventListener("click", function () {
    const randomIndex = Math.floor(Math.random() * wishes.length);

    wishText.style.opacity = "0";
    wishText.style.transform = "translateY(20px)";

    setTimeout(() => {
      wishText.textContent = wishes[randomIndex];
      wishText.style.opacity = "1";
      wishText.style.transform = "translateY(0)";
    }, 300);

    createFireworks(1);
  });
}

// ========== HIỆU ỨNG PHÁO HOA ==========
function createFirework(x, y, color) {
  if (x === undefined || y === undefined) {
    x = Math.random() * window.innerWidth;
    y = Math.random() * (window.innerHeight * 0.7);
  }

  const firework = document.createElement("div");
  firework.className = "firework";
  firework.style.left = x + "px";
  firework.style.top = y + "px";
  firework.style.backgroundColor = color || getRandomColor();
  document.body.appendChild(firework);

  const size = Math.random() * 8 + 4;
  firework.style.width = size + "px";
  firework.style.height = size + "px";

  const particles = Math.floor(Math.random() * 4) + 3;
  for (let i = 0; i < particles; i++) {
    setTimeout(() => {
      const particle = document.createElement("div");
      particle.className = "firework";
      particle.style.left = x + "px";
      particle.style.top = y + "px";
      particle.style.backgroundColor = firework.style.backgroundColor;
      document.body.appendChild(particle);

      const angle = (Math.PI * 2 * i) / particles;
      const distance = Math.random() * 60 + 30;
      const targetX = x + Math.cos(angle) * distance;
      const targetY = y + Math.sin(angle) * distance;

      const anim = particle.animate(
        [
          {
            transform: "scale(1)",
            opacity: 1,
          },
          {
            transform: `translate(${targetX - x}px, ${targetY - y}px) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration: Math.random() * 600 + 500,
          easing: "cubic-bezier(0.1, 0.8, 0.9, 0.1)",
        },
      );

      anim.onfinish = () => particle.remove();
    }, i * 50);
  }

  setTimeout(() => firework.remove(), 500);
}

function createFireworks(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      createFirework();
    }, i * 150);
  }
}

function getRandomColor() {
  const colors = ["#c41e3a", "#ffd700", "#ff4500", "#32cd32", "#1e90ff"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ========== SCROLL TO TOP ==========
function initScroll() {
  const scrollTopBtn = document.getElementById("scrollTop");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("active");
    } else {
      scrollTopBtn.classList.remove("active");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    createFireworks(1);
  });
}
