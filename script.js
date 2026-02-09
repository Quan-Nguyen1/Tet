// ========== KHỞI TẠO ==========
document.addEventListener("DOMContentLoaded", function() {
    console.log("🎯 Website Tết Bính Ngọ 2026 đã được tải thành công!");
    console.log("📅 Thời điểm Tết: 00:00 ngày 17/02/2026 (GMT+7)");
    console.log("🔧 Để test nhanh, gọi hàm testTetArrival() trong console");

    // Bắt đầu đếm ngược
    startCountdown();

    // Khởi tạo tương tác
    initInteractions();

    // Khởi tạo tử vi 12 con giáp
    initZodiacHoroscope();

    // Tạo pháo hoa chào mừng
    setTimeout(() => {
        createFireworks(3);
    }, 1000);

    // Khởi tạo scroll
    initScroll();

    // Thêm CSS animations động
    addDynamicCSS();

    // TEST: Để test nhanh, bạn có thể uncomment dòng dưới đây
    // testTetArrival();
});

// ========== BIẾN TOÀN CỤC ==========
let isTetArrived = false;
let fireworksInterval;
let confettiInterval;

// ========== THÊM CSS ĐỘNG ==========
function addDynamicCSS() {
    const style = document.createElement('style');
    style.textContent = `
    @keyframes rainbowBackground {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes confettiFall {
      0% {
        transform: translateY(-100px) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
    
    .confetti {
      position: fixed;
      top: 0;
      z-index: 9999;
      pointer-events: none;
      border-radius: 2px;
    }
    
    .firework {
      position: fixed;
      pointer-events: none;
      border-radius: 50%;
      z-index: 9998;
      box-shadow: 0 0 10px currentColor;
    }
    
    .new-year-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }
    
    .new-year-item {
      background: rgba(255, 255, 255, 0.1);
      padding: 1rem;
      border-radius: 10px;
      text-align: center;
      font-size: 1.2rem;
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 215, 0, 0.3);
    }
    
    .scroll-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: #c41e3a;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      transform: translateY(100px);
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(196, 30, 58, 0.3);
    }
    
    .scroll-top.active {
      opacity: 1;
      transform: translateY(0);
    }
    
    .scroll-top:hover {
      background: #ff4500;
      transform: scale(1.1);
    }
  `;
    document.head.appendChild(style);
}

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
        if (countdownTitle) {
            countdownTitle.innerHTML =
                '🎉 <span style="color:#ffd700; font-size:3rem; text-shadow: 0 0 20px #ff0000;">CHÚC MỪNG NĂM MỚI BÍNH NGỌ 2026!</span> 🎉';
        }

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
        if (countdown) {
            countdown.appendChild(newYearMessage);
            countdown.style.background = "linear-gradient(135deg, #ff0000, #ff4500, #ffd700)";
            countdown.style.animation = "rainbowBackground 3s infinite alternate";
            countdown.style.backgroundSize = "400% 400%";
        }

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
        document.body.style.backgroundSize = "400% 400%";

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

// ========== TỬ VI 12 CON GIÁP ==========
function initZodiacHoroscope() {
    const zodiacData = [{
            id: 'ty',
            name: 'Tý',
            icon: '🐀',
            years: [1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020],
            prediction: 'Năm Ngọ khắc với Tý nên cần thận trọng. Tuy nhiên, công việc có nhiều cơ hội phát triển, tài chính ổn định.'
        },
        {
            id: 'suu',
            name: 'Sửu',
            icon: '🐂',
            years: [1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021],
            prediction: 'Năm khá thuận lợi cho Sửu. Công việc ổn định, tài chính có dấu hiệu tăng trưởng. Tình cảm gia đình hạnh phúc.'
        },
        {
            id: 'dan',
            name: 'Dần',
            icon: '🐅',
            years: [1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022],
            prediction: 'Năm Dần gặp nhiều may mắn. Sự nghiệp thăng tiến, tài lộc dồi dào. Cần chú ý sức khỏe và các mối quan hệ.'
        },
        {
            id: 'mao',
            name: 'Mão',
            icon: '🐇',
            years: [1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023],
            prediction: 'Năm bình ổn cho Mão. Công việc có thể gặp một số thử thách nhỏ nhưng sẽ vượt qua. Tình cảm ổn định.'
        },
        {
            id: 'thin',
            name: 'Thìn',
            icon: '🐉',
            years: [1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024],
            prediction: 'Năm cực kỳ tốt cho Thìn. Thăng tiến vượt bậc trong sự nghiệp, tài lộc dồi dào. Mọi việc đều thuận lợi.'
        },
        {
            id: 'ti', // FIXED: Đã sửa từ 'ty' thành 'ti'
            name: 'Tỵ',
            icon: '🐍',
            years: [1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025],
            prediction: 'Năm có nhiều biến động cho Tỵ. Cần thận trọng trong đầu tư và các quyết định quan trọng. Sức khỏe cần chú ý.'
        },
        {
            id: 'ngo',
            name: 'Ngọ',
            icon: '🐎',
            years: [1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026],
            prediction: 'Năm Bản Mệnh! Ngọ gặp nhiều may mắn, công việc thuận lợi, tài lộc dồi dào. Đây là năm để phát triển vượt bậc.'
        },
        {
            id: 'mui',
            name: 'Mùi',
            icon: '🐑',
            years: [1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027],
            prediction: 'Năm hòa hợp với Mùi. Công việc ổn định, tài chính có cải thiện. Tình cảm gia đình ấm áp, hạnh phúc.'
        },
        {
            id: 'than',
            name: 'Thân',
            icon: '🐒',
            years: [1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028],
            prediction: 'Năm nhiều thách thức cho Thân. Cần kiên nhẫn và cẩn trọng trong mọi việc. Tuy nhiên, cuối năm sẽ có kết quả tốt.'
        },
        {
            id: 'dau',
            name: 'Dậu',
            icon: '🐓',
            years: [1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029],
            prediction: 'Năm khá tốt cho Dậu. Công việc có nhiều cơ hội mới, tài chính ổn định. Cần chú ý các mối quan hệ xã giao.'
        },
        {
            id: 'tuat',
            name: 'Tuất',
            icon: '🐕',
            years: [1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030],
            prediction: 'Năm bình ổn cho Tuất. Mọi việc diễn ra theo kế hoạch, ít biến động. Tình cảm và sức khỏe đều tốt.'
        },
        {
            id: 'hoi',
            name: 'Hợi',
            icon: '🐖',
            years: [1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031],
            prediction: 'Năm thuận lợi cho Hợi. Công việc có bước tiến mới, tài chính khả quan. Gia đình hạnh phúc, con cháu hiếu thảo.'
        }
    ];

    const zodiacSelector = document.getElementById('zodiacSelector');
    const zodiacResult = document.getElementById('zodiacResult');

    if (!zodiacSelector || !zodiacResult) return;

    // Tạo các nút con giáp
    zodiacData.forEach(zodiac => {
        const button = document.createElement('button');
        button.className = 'zodiac-btn';
        button.innerHTML = `${zodiac.icon}<br><span>${zodiac.name}</span>`;
        button.setAttribute('data-zodiac', zodiac.id);
        button.setAttribute('title', `Sinh năm: ${zodiac.years.join(', ')}`);

        button.addEventListener('click', () => {
            // Xóa active class từ tất cả các nút
            document.querySelectorAll('.zodiac-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Thêm active class cho nút được click
            button.classList.add('active');

            // Hiển thị kết quả tử vi
            displayZodiacPrediction(zodiac);
        });

        zodiacSelector.appendChild(button);
    });

    // Hiển thị tử vi mặc định cho Ngọ (năm hiện tại)
    const currentZodiac = zodiacData.find(z => z.id === 'ngo');
    if (currentZodiac) {
        displayZodiacPrediction(currentZodiac);
        const defaultBtn = document.querySelector('[data-zodiac="ngo"]');
        if (defaultBtn) defaultBtn.classList.add('active');
    }
}

function displayZodiacPrediction(zodiac) {
    const zodiacResult = document.getElementById('zodiacResult');
    if (!zodiacResult) return;

    // Hiển thị loading
    zodiacResult.innerHTML = `
    <div class="zodiac-loading">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Đang xem tử vi cho tuổi ${zodiac.name}...</p>
    </div>
  `;

    // Hiển thị kết quả sau 300ms để tạo hiệu ứng
    setTimeout(() => {
        zodiacResult.innerHTML = `
    <div class="zodiac-result-content">
      <div class="zodiac-result-header">
        <h3>${zodiac.icon} Tử vi tuổi ${zodiac.name} năm Bính Ngọ 2026</h3>
        <span class="zodiac-years">Các năm sinh: ${zodiac.years.join(', ')}</span>
      </div>
      <div class="zodiac-prediction">
        <h4>Dự đoán:</h4>
        <p>${zodiac.prediction}</p>
      </div>
      <div class="zodiac-luck">
        <h4>Vận may:</h4>
        <div class="luck-items">
          <div class="luck-item ${zodiac.id === 'ngo' ? 'very-lucky' : 'normal'}">
            <i class="fas ${zodiac.id === 'ngo' ? 'fa-star' : 'fa-chart-line'}"></i>
            <span>Sự nghiệp: ${zodiac.id === 'ngo' ? 'Rất tốt' : 'Khá tốt'}</span>
          </div>
          <div class="luck-item ${zodiac.id === 'ngo' ? 'very-lucky' : 'normal'}">
            <i class="fas ${zodiac.id === 'ngo' ? 'fa-money-bill-wave' : 'fa-coins'}"></i>
            <span>Tài lộc: ${zodiac.id === 'ngo' ? 'Dồi dào' : 'Ổn định'}</span>
          </div>
          <div class="luck-item ${zodiac.id === 'ngo' ? 'lucky' : 'normal'}">
            <i class="fas fa-heart"></i>
            <span>Tình cảm: ${zodiac.id === 'ngo' ? 'Hạnh phúc' : 'Bình ổn'}</span>
          </div>
          <div class="luck-item ${zodiac.id === 'ngo' ? 'lucky' : 'normal'}">
            <i class="fas fa-heartbeat"></i>
            <span>Sức khỏe: ${zodiac.id === 'ngo' ? 'Tốt' : 'Bình thường'}</span>
          </div>
        </div>
      </div>
      <div class="zodiac-advice">
        <h4>Lời khuyên:</h4>
        <p>${getZodiacAdvice(zodiac.id)}</p>
      </div>
    </div>
  `;
    }, 300);
}

function getZodiacAdvice(zodiacId) {
    const advice = {
        'ty': 'Nên tập trung vào công việc hiện tại, tránh đầu tư mạo hiểm. Giữ gìn sức khỏe.',
        'suu': 'Có cơ hội thăng tiến, nên chủ động nắm bắt. Tình cảm gia đình cần quan tâm nhiều hơn.',
        'dan': 'Năm nhiều cơ hội, nên mạnh dạn đầu tư. Cần chú ý đến các mối quan hệ xã hội.',
        'mao': 'Nên ổn định và kiên nhẫn. Tránh thay đổi công việc đột ngột.',
        'thin': 'Năm cực kỳ thuận lợi, nên tận dụng tối đa cơ hội. Có thể đầu tư mạnh tay.',
        'ti': 'Cần thận trọng trong mọi quyết định. Nên tập trung vào việc học hỏi và tích lũy kinh nghiệm.',
        'ngo': 'Năm bản mệnh, mọi việc đều thuận lợi. Nên mở rộng kinh doanh và phát triển sự nghiệp.',
        'mui': 'Nên duy trì sự ổn định hiện tại. Có thể học thêm kỹ năng mới để phát triển bản thân.',
        'than': 'Cần kiên nhẫn vượt qua thử thách. Nên tập trung vào mục tiêu dài hạn.',
        'dau': 'Có nhiều cơ hội mới, nên chủ động tìm kiếm. Chú ý đến các mối quan hệ đối tác.',
        'tuat': 'Nên duy trì nhịp độ công việc hiện tại. Có thể cân nhắc đầu tư nhỏ.',
        'hoi': 'Năm thuận lợi, nên mở rộng các mối quan hệ. Có thể đầu tư vào bất động sản.'
    };

    return advice[zodiacId] || 'Nên giữ vững tinh thần lạc quan, làm việc chăm chỉ và quan tâm đến gia đình.';
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
                confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";

                document.body.appendChild(confetti);

                const animationDuration = Math.random() * 3 + 2;
                confetti.style.animation = `confettiFall ${animationDuration}s linear forwards`;

                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.remove();
                    }
                }, animationDuration * 1000);
            }, i * 50);
        }
    }, 2000);
}

// ========== ÂM THANH CHÚC MỪNG ==========
function playNewYearSound() {
    try {
        // Kiểm tra hỗ trợ Web Audio API
        if (!window.AudioContext && !window.webkitAudioContext) {
            console.log("Trình duyệt không hỗ trợ Web Audio API");
            return;
        }

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();

        // Chỉ phát âm thanh khi người dùng đã tương tác với trang
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        const notes = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5

        notes.forEach((freq, i) => {
            setTimeout(() => {
                try {
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
                } catch (error) {
                    console.log("Lỗi tạo âm thanh:", error);
                }
            }, i * 300);
        });

        // Âm thanh pháo hoa
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    try {
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
                    } catch (error) {
                        console.log("Lỗi tạo âm thanh pháo hoa:", error);
                    }
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

    if (!wishText || !newWishBtn) {
        console.log("Không tìm thấy phần tử lời chúc");
        return;
    }

    newWishBtn.addEventListener("click", function() {
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
                [{
                        transform: "scale(1)",
                        opacity: 1,
                    },
                    {
                        transform: `translate(${targetX - x}px, ${targetY - y}px) scale(0)`,
                        opacity: 0,
                    },
                ], {
                    duration: Math.random() * 600 + 500,
                    easing: "cubic-bezier(0.1, 0.8, 0.9, 0.1)",
                },
            );

            anim.onfinish = () => {
                if (particle.parentNode) {
                    particle.remove();
                }
            };
        }, i * 50);
    }

    setTimeout(() => {
        if (firework.parentNode) {
            firework.remove();
        }
    }, 500);
}

function createFireworks(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 150);
    }
}

function getRandomColor() {
    const colors = ["#c41e3a", "#ffd700", "#ff4500", "#32cd32", "#1e90ff", "#9370db", "#ff69b4"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ========== SCROLL TO TOP ==========
function initScroll() {
    const scrollTopBtn = document.getElementById("scrollTop");

    if (!scrollTopBtn) {
        console.log("Không tìm thấy nút scroll top");
        return;
    }

    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add("active");
        } else {
            scrollTopBtn.classList.remove("active");
        }
    });

    scrollTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        createFireworks(1);
    });
}

// ========== CLEANUP KHI ĐÓNG TRANG ==========
window.addEventListener('beforeunload', function() {
    if (fireworksInterval) clearInterval(fireworksInterval);
    if (confettiInterval) clearInterval(confettiInterval);
});

// ========== XỬ LÝ LỖI TỔNG QUÁT ==========
window.addEventListener('error', function(e) {
    console.error('Lỗi JavaScript:', e.message, 'tại', e.filename, 'dòng', e.lineno);
});

console.log("✅ File script.js đã được tải và khởi chạy thành công!");