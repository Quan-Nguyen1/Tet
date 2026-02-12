// ========== KHỞI TẠO ==========
document.addEventListener("DOMContentLoaded", function() {
    console.log("🎯 Website Tết Bính Ngọ 2026 đã được tải thành công!");
    console.log("📅 Thời điểm Tết: 00:00 ngày 17/02/2026 (GMT+7)");
    console.log("🔧 Để test nhanh, gọi hàm testTetArrival() trong console");
    console.log("🎵 Để test nhạc, gọi hàm testTetMusic() trong console");

    // Ẩn toàn bộ nội dung chính, chỉ hiện countdown lúc đầu
    hideAllContentExceptCountdown();

    // Bắt đầu đếm ngược
    startCountdown();

    // Khởi tạo tử vi 12 con giáp
    initZodiacHoroscope();

    // Khởi tạo scroll
    initScroll();

    // Thêm CSS animations động
    addDynamicCSS();

    // Tiền tải nhạc nền (không phát)
    preloadMusic();
});

// ========== BIẾN TOÀN CỤC ==========
let isTetArrived = false;
let fireworksInterval;
let confettiInterval;
let tetMusic = null;
let isMusicPlaying = false;
let audioContext = null;

// ========== TIỀN TẢI NHẠC NỀN ==========
function preloadMusic() {
    try {
        tetMusic = new Audio();
        tetMusic.src = 'tet-music.mp3'; // Tên file MP3 của bạn
        tetMusic.loop = true;
        tetMusic.volume = 0.5;
        tetMusic.load(); // Tiền tải nhạc
        console.log("🎵 Đã tiền tải nhạc Tết thành công!");
    } catch (error) {
        console.error("❌ Không thể tải nhạc Tết:", error);
    }
}

// ========== ẨN TẤT CẢ NỘI DUNG NGOẠI TRỪ COUNTDOWN ==========
function hideAllContentExceptCountdown() {
    // Ẩn header, hero, footer, scroll-top
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const footer = document.querySelector('footer');
    const scrollTop = document.getElementById('scrollTop');

    if (header) header.classList.add('hidden');
    if (hero) hero.classList.add('hidden');
    if (footer) footer.classList.add('hidden');
    if (scrollTop) scrollTop.classList.add('hidden');

    // Trong container, chỉ giữ countdown, ẩn hết phần còn lại
    const container = document.querySelector('.container');
    if (container) {
        const countdown = container.querySelector('.countdown');
        Array.from(container.children).forEach(child => {
            if (child !== countdown) {
                child.classList.add('hidden');
            }
        });
    }
}

// ========== HIỂN THỊ TOÀN BỘ NỘI DUNG KHI TẾT ĐẾN ==========
function showAllContent() {
    // Hiển thị header, hero, footer, scroll-top
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const footer = document.querySelector('footer');
    const scrollTop = document.getElementById('scrollTop');

    if (header) header.classList.remove('hidden');
    if (hero) hero.classList.remove('hidden');
    if (footer) footer.classList.remove('hidden');
    if (scrollTop) scrollTop.classList.remove('hidden');

    // Hiển thị tất cả nội dung trong container
    const container = document.querySelector('.container');
    if (container) {
        Array.from(container.children).forEach(child => {
            child.classList.remove('hidden');
        });
    }

    // Khởi tạo lại các tương tác sau khi hiển thị nội dung
    initInteractions();
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

        // 1. Ẩn countdown
        const countdown = document.querySelector('.countdown');
        if (countdown) countdown.classList.add('hidden');

        // 2. Hiển thị toàn bộ nội dung trang
        showAllContent();

        // 3. Cập nhật tiêu đề trang
        document.title = "🎉 Chúc Mừng Năm Mới Bính Ngọ 2026! 🎉";

        // 4. Pháo hoa rầm rộ
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createFirework();
            }, i * 70);
        }

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createFirework(
                    window.innerWidth / 2 + (Math.random() - 0.5) * 200,
                    window.innerHeight / 3 + (Math.random() - 0.5) * 150,
                    getRandomColor()
                );
            }, 500 + i * 100);
        }

        // 5. Pháo hoa liên tục
        startContinuousFireworks();

        // 6. Tạo confetti
        createConfetti();

        // 7. PHÁT NHẠC TẾT
        playTetMusic();

        // 8. Thêm hiệu ứng cho toàn bộ page
        document.body.style.animation = "rainbowBackground 10s infinite";
        document.body.style.backgroundSize = "400% 400%";

        // 9. Thêm thông báo Tết
        addNewYearNotification();

        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}

// ========== TIỀN TẢI NHẠC NỀN ==========
function preloadMusic() {
    try {
        // Danh sách các tên file MP3 có thể có - ƯU TIÊN music.mp3
        const possibleMusicFiles = [
            'music.mp3', // Tên file của bạn
            'tet-music.mp3',
            'nhac-tet.mp3',
            'happy-new-year.mp3',
            'tet.mp3',
            'audio/music.mp3',
            'assets/music.mp3'
        ];

        tetMusic = new Audio();
        let fileLoaded = false;

        console.log("🎵 Đang tìm file nhạc: music.mp3");

        // Thử từng file cho đến khi tìm thấy
        possibleMusicFiles.forEach(file => {
            if (!fileLoaded) {
                const audio = new Audio();
                audio.src = file;

                audio.addEventListener('canplaythrough', function() {
                    if (!fileLoaded) {
                        fileLoaded = true;
                        tetMusic.src = file;
                        tetMusic.loop = true;
                        tetMusic.volume = 0.3; // Âm lượng 30%
                        console.log(`🎵 ĐÃ TÌM THẤY NHẠC: ${file}`);
                        console.log(`✅ Sẵn sàng phát nhạc Tết từ file: ${file}`);

                        // Hiển thị thông báo tìm thấy nhạc
                        showMusicNotification(`🎵 Đã tải: ${file}`);
                    }
                }, { once: true });

                audio.addEventListener('error', function() {
                    console.log(`❌ Không tìm thấy: ${file}`);
                });

                audio.load();
            }
        });

        // Nếu không tìm thấy file nào, tạo nhạc ảo
        // setTimeout(() => {
        //     if (!tetMusic.src) {
        //         console.log("❌ KHÔNG TÌM THẤY FILE MUSIC.MP3");
        //         console.log("📁 Vui lòng đặt file music.mp3 cùng thư mục với index.html");
        //         console.log("🎵 Sử dụng nhạc ảo từ Web Audio API");
        //         createVirtualMusic();
        //         showMusicHelp();
        //     }
        // }, 1500);

    } catch (error) {
        console.error("❌ Lỗi tải nhạc:", error);
        createVirtualMusic();
        showMusicHelp();
    }
}

// ========== PHÁT NHẠC TẾT ==========
function playTetMusic() {
    try {
        if (!tetMusic) {
            tetMusic = new Audio('music.mp3');
            tetMusic.loop = true;
            tetMusic.volume = 0.5;
        }

        // Reset nhạc về đầu
        tetMusic.currentTime = 0;

        // Phát nhạc
        tetMusic.play()
            .then(() => {
                isMusicPlaying = true;
                console.log("🎵 Đang phát nhạc Tết!");

                // Cập nhật nút điều khiển nhạc nếu có
                updateMusicButtonUI();
            })
            .catch(error => {
                console.log("❌ Không thể phát nhạc tự động:", error);
                console.log("ℹ️ Trình duyệt chặn autoplay. Click vào nút play để phát nhạc!");

                // Tạo nút play nhạc thủ công
                createMusicControlButton();
            });
    } catch (error) {
        console.error("Lỗi phát nhạc:", error);
        createMusicControlButton();
    }
}

// ========== TẠO NÚT ĐIỀU KHIỂN NHẠC ==========
function createMusicControlButton() {
    // Kiểm tra nếu đã có nút thì không tạo lại
    if (document.querySelector('.music-control')) return;

    const musicBtn = document.createElement('div');
    musicBtn.className = 'music-control';
    musicBtn.innerHTML = `
        <div class="music-btn" onclick="toggleMusic()">
            <i class="fas fa-music"></i>
            <span class="music-text">Bật nhạc Tết</span>
        </div>
    `;
    document.body.appendChild(musicBtn);
}

// ========== CẬP NHẬT UI NÚT NHẠC ==========
function updateMusicButtonUI() {
    const musicBtn = document.querySelector('.music-btn');
    if (musicBtn) {
        if (isMusicPlaying) {
            musicBtn.innerHTML = '<i class="fas fa-pause-circle"></i><span class="music-text">Tắt nhạc Tết</span>';
            musicBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
        } else {
            musicBtn.innerHTML = '<i class="fas fa-music"></i><span class="music-text">Bật nhạc Tết</span>';
            musicBtn.style.background = 'linear-gradient(45deg, var(--primary-red), var(--dark-red))';
        }
    }
}

// ========== BẬT/TẮT NHẠC ==========
function toggleMusic() {
    if (!tetMusic) {
        tetMusic = new Audio('tet-music.mp3');
        tetMusic.loop = true;
        tetMusic.volume = 0.3;
    }

    if (isMusicPlaying) {
        tetMusic.pause();
        isMusicPlaying = false;
        console.log("⏸️ Đã tạm dừng nhạc Tết");
    } else {
        tetMusic.play()
            .then(() => {
                isMusicPlaying = true;
                console.log("🎵 Tiếp tục phát nhạc Tết");
            })
            .catch(error => console.error("Lỗi phát nhạc:", error));
    }

    updateMusicButtonUI();
}

// ========== ĐIỀU CHỈNH ÂM LƯỢNG ==========
function setMusicVolume(volume) {
    if (tetMusic) {
        tetMusic.volume = Math.max(0, Math.min(1, volume));
        console.log(`🔊 Đã điều chỉnh âm lượng: ${Math.round(volume * 100)}%`);
    }
}

// ========== DỪNG NHẠC ==========
function stopTetMusic() {
    if (tetMusic) {
        tetMusic.pause();
        tetMusic.currentTime = 0;
        isMusicPlaying = false;
        console.log("⏹️ Đã dừng nhạc Tết");
    }
}

// ========== THÊM THÔNG BÁO TẾT ==========
function addNewYearNotification() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const notification = document.createElement('div');
        notification.className = 'new-year-message';
        notification.innerHTML = `
            <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">🎊 XUÂN BÍNH NGỌ ĐÃ VỀ! 🎊</h2>
            <p style="font-size: 1.5rem; margin-bottom: 1rem;">
                Giao thừa đã điểm! Chúc mọi người một năm mới:
            </p>
            <div class="new-year-grid">
                <div class="new-year-item">🐎 <strong>Năm Ngọ Thịnh Vượng</strong></div>
                <div class="new-year-item">💰 <strong>Phát Tài Phát Lộc</strong></div>
                <div class="new-year-item">🏡 <strong>Gia Đình An Khang</strong></div>
                <div class="new-year-item">💖 <strong>Tình Duyên Viên Mãn</strong></div>
            </div>
            <p style="font-size: 1.2rem; font-style: italic; margin-top: 1rem;">
                "Xuân sang trăm hoa đua nở, Năm mới vạn sự như ý"
            </p>
        `;
        hero.appendChild(notification);
    }
}

// ========== PHÁO HOA LIÊN TỤC ==========
function startContinuousFireworks() {
    if (fireworksInterval) clearInterval(fireworksInterval);

    fireworksInterval = setInterval(() => {
        createFireworks(4);
    }, 150);

    setTimeout(() => {
        clearInterval(fireworksInterval);
        fireworksInterval = setInterval(() => {
            createFireworks(2);
        }, 400);
    }, 30000);
}

// ========== TẠO CONFETTI ==========
function createConfetti() {
    if (confettiInterval) clearInterval(confettiInterval);
    const colors = ["#c41e3a", "#ffd700", "#ff4500", "#32cd32", "#1e90ff", "#9370db", "#ff69b4", "#ff8c00"];

    confettiInterval = setInterval(() => {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement("div");
                confetti.className = "confetti";
                confetti.style.left = Math.random() * 100 + "vw";
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = Math.random() * 15 + 5 + "px";
                confetti.style.height = Math.random() * 15 + 5 + "px";
                confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
                confetti.style.opacity = Math.random() * 0.8 + 0.2;
                document.body.appendChild(confetti);
                const animationDuration = Math.random() * 3 + 2;
                confetti.style.animation = `confettiFall ${animationDuration}s linear forwards`;
                setTimeout(() => {
                    if (confetti.parentNode) confetti.remove();
                }, animationDuration * 1000);
            }, i * 30);
        }
    }, 1000);
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
            id: 'ti',
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

    zodiacData.forEach(zodiac => {
        const button = document.createElement('button');
        button.className = 'zodiac-btn';
        button.innerHTML = `${zodiac.icon}<br><span>${zodiac.name}</span>`;
        button.setAttribute('data-zodiac', zodiac.id);
        button.setAttribute('title', `Sinh năm: ${zodiac.years.join(', ')}`);

        button.addEventListener('click', () => {
            document.querySelectorAll('.zodiac-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            displayZodiacPrediction(zodiac);
        });

        zodiacSelector.appendChild(button);
    });

    // const currentZodiac = zodiacData.find(z => z.id === 'ngo');
    // if (currentZodiac) {
    //     displayZodiacPrediction(currentZodiac);
    //     const defaultBtn = document.querySelector('[data-zodiac="ngo"]');
    //     if (defaultBtn) defaultBtn.classList.add('active');
    // }
}

function displayZodiacPrediction(zodiac) {
    const zodiacResult = document.getElementById('zodiacResult');
    if (!zodiacResult) return;

    zodiacResult.innerHTML = `
        <div class="zodiac-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Đang xem tử vi cho tuổi ${zodiac.name}...</p>
        </div>
    `;

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

    if (!wishText || !newWishBtn) return;

    newWishBtn.addEventListener("click", function() {
        const randomIndex = Math.floor(Math.random() * wishes.length);
        wishText.style.opacity = "0";
        wishText.style.transform = "translateY(20px)";
        setTimeout(() => {
            wishText.textContent = wishes[randomIndex];
            wishText.style.opacity = "1";
            wishText.style.transform = "translateY(0)";
        }, 300);
        createFireworks(3);
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

    const size = Math.random() * 10 + 5;
    firework.style.width = size + "px";
    firework.style.height = size + "px";

    const particles = Math.floor(Math.random() * 6) + 5;
    for (let i = 0; i < particles; i++) {
        setTimeout(() => {
            const particle = document.createElement("div");
            particle.className = "firework";
            particle.style.left = x + "px";
            particle.style.top = y + "px";
            particle.style.backgroundColor = firework.style.backgroundColor;
            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / particles;
            const distance = Math.random() * 80 + 40;
            const targetX = x + Math.cos(angle) * distance;
            const targetY = y + Math.sin(angle) * distance;

            particle.animate(
                [
                    { transform: "scale(1)", opacity: 1 },
                    { transform: `translate(${targetX - x}px, ${targetY - y}px) scale(0)`, opacity: 0 }
                ], { duration: Math.random() * 600 + 500, easing: "cubic-bezier(0.1, 0.8, 0.9, 0.1)" }
            ).onfinish = () => { if (particle.parentNode) particle.remove(); };
        }, i * 60);
    }

    setTimeout(() => { if (firework.parentNode) firework.remove(); }, 500);
}

function createFireworks(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => { createFirework(); }, i * 120);
    }
}

function getRandomColor() {
    const colors = ["#c41e3a", "#ffd700", "#ff4500", "#32cd32", "#1e90ff", "#9370db", "#ff69b4", "#ff8c00", "#dc143c", "#00ced1"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ========== SCROLL TO TOP ==========
function initScroll() {
    const scrollTopBtn = document.getElementById("scrollTop");
    if (!scrollTopBtn) return;

    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add("active");
        } else {
            scrollTopBtn.classList.remove("active");
        }
    });

    scrollTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
        createFireworks(2);
    });
}

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
            0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .confetti {
            position: fixed; top: 0; z-index: 9999; pointer-events: none;
            border-radius: 2px;
        }
        .firework {
            position: fixed; pointer-events: none; border-radius: 50%;
            z-index: 9998; box-shadow: 0 0 10px currentColor;
        }
    `;
    document.head.appendChild(style);
}

// ========== HÀM TEST TẾT ĐẾN ==========
function testTetArrival() {
    console.log("⚠️ ĐANG TEST CHẾ ĐỘ TẾT ĐẾN ⚠️");
    window.testTetDate = new Date();
    window.testTetDate.setSeconds(window.testTetDate.getSeconds() + 1);
    console.log("🎆 Tết sẽ đến sau 1 giây! Chuẩn bị xem pháo hoa và nghe nhạc! 🎆");
}

// ========== HÀM TEST NHẠC TẾT ==========
function testTetMusic() {
    console.log("🎵 Đang test nhạc Tết...");
    playTetMusic();
}

// ========== HÀM ĐIỀU CHỈNH ÂM LƯỢNG ==========
function setVolume50() {
    setMusicVolume(0.5);
    console.log("🔊 Âm lượng 50%");
}

function setVolume70() {
    setMusicVolume(0.7);
    console.log("🔊 Âm lượng 70%");
}

function setVolume100() {
    setMusicVolume(1.0);
    console.log("🔊 Âm lượng 100%");
}

// ========== CLEANUP KHI ĐÓNG TRANG ==========
window.addEventListener('beforeunload', function() {
    if (fireworksInterval) clearInterval(fireworksInterval);
    if (confettiInterval) clearInterval(confettiInterval);
    stopTetMusic();
});

// ========== XỬ LÝ LỖI TỔNG QUÁT ==========
window.addEventListener('error', function(e) {
    console.error('Lỗi JavaScript:', e.message, 'tại', e.filename, 'dòng', e.lineno);
});

console.log("✅ File script.js đã được tải và khởi chạy thành công!");