// ========== KHỞI TẠO ==========
document.addEventListener("DOMContentLoaded", function() {
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

    // Khởi tạo phần tử vi
    initZodiacHoroscope();

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
        countdownTitle.innerHTML = '🎉 <span style="color:#ffd700; font-size:3rem; text-shadow: 0 0 20px #ff0000;">CHÚC MỪNG NĂM MỚI BÍNH NGỌ 2026!</span> 🎉';

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
        tetDateElement.innerHTML = '<div style="color:#ffd700; font-size:1.5rem;">✨ Đã đến thời khắc Giao thừa ✨</div>';

        // Thay đổi style countdown
        countdown.style.background = "linear-gradient(135deg, #ff0000, #ff4500, #ffd700)";
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
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
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

    const colors = ['#c41e3a', '#ffd700', '#ff4500', '#32cd32', '#1e90ff', '#9370db'];
    confettiInterval = setInterval(() => {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = Math.random() * 15 + 5 + 'px';
                confetti.style.height = Math.random() * 15 + 5 + 'px';
                confetti.style.opacity = '1';

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
        const audioContext = new(window.AudioContext || window.webkitAudioContext)();
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        let time = audioContext.currentTime;

        notes.forEach((freq, i) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                oscillator.type = 'sine';

                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);

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

                    oscillator.frequency.setValueAtTime(80 + Math.random() * 300, audioContext.currentTime);
                    oscillator.type = 'sawtooth';

                    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.05);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.4);
                }, i * 200);
            }
        }, 1500);

    } catch (error) {
        console.log("Không thể phát âm thanh:", error);
    }
}

// ========== TỬ VI 12 CON GIÁP VỚI EMOJI ==========
function initZodiacHoroscope() {
    const zodiacData = [{
        id: "ty",
        name: "Tý",
        emoji: "🐭",
        years: "1996, 2008, 2020",
        colors: ["Xanh dương", "Đen"],
        numbers: ["2", "8"],
        career: "Năm nay Tý gặp Thái Tuế, công việc có nhiều thử thách. Cần thận trọng trong quyết định, tránh xung đột với đồng nghiệp. Tháng 5 và tháng 9 là thời điểm tốt để phát triển.",
        finance: "Tài chính không ổn định, cần quản lý chi tiêu cẩn thận. Tránh đầu tư mạo hiểm, đặc biệt vào tháng 3 và tháng 11.",
        health: "Sức khỏe cần được chú ý, đặc biệt hệ tiêu hóa và thần kinh. Nên tập thể dục đều đặn và có chế độ ăn uống lành mạnh.",
        love: "Tình cảm có chút sóng gió, cần sự kiên nhẫn và thấu hiểu. Người độc thân có thể gặp được người đặc biệt vào cuối năm.",
    }, {
        id: "suu",
        name: "Sửu",
        emoji: "🐮",
        years: "1997, 2009, 2021",
        colors: ["Vàng", "Nâu"],
        numbers: ["5", "9"],
        career: "Sửu và Ngọ tương hình nên năm nay nhiều trở ngại. Tuy nhiên có quý nhân giúp đỡ, đặc biệt vào tháng 6 và tháng 10.",
        finance: "Tài chính tương đối ổn định nhưng khó có đột phá. Tiết kiệm là chìa khóa thành công trong năm nay.",
        health: "Sức khỏe cần quan tâm đến hệ xương khớp. Nên vận động nhẹ nhàng và tránh làm việc quá sức.",
        love: "Tình cảm gia đình êm ấm, nhưng cần tránh những tranh cãi nhỏ nhặt. Người độc thân nên chủ động hơn trong các mối quan hệ.",
    }, {
        id: "dan",
        name: "Dần",
        emoji: "🐯",
        years: "1998, 2010, 2022",
        colors: ["Đỏ", "Cam"],
        numbers: ["1", "3", "7"],
        career: "Dần tam hợp với Ngọ nên năm nay cực kỳ thuận lợi. Cơ hội thăng tiến rõ rệt, đặc biệt vào tháng 4 và tháng 8.",
        finance: "Tài lộc dồi dào, có cơ hội đầu tư sinh lời. Tuy nhiên cần phân bổ hợp lý để tránh rủi ro.",
        health: "Sức khỏe tốt, năng lượng dồi dào. Là thời điểm tốt để bắt đầu chế độ tập luyện mới.",
        love: "Tình duyên viên mãn, người có đôi có cặp hạnh phúc. Người độc thân dễ tìm được ý trung nhân vào giữa năm.",
    }, {
        id: "mao",
        name: "Mão",
        emoji: "🐰",
        years: "1999, 2011, 2023",
        colors: ["Xanh lá", "Tím"],
        numbers: ["3", "6", "9"],
        career: "Năm nay Mão có nhiều cơ hội học hỏi và phát triển kỹ năng. Thích hợp để chuyển đổi công việc hoặc bắt đầu dự án mới.",
        finance: "Tài chính ổn định nhưng cần thận trọng trong các khoản cho vay. Tháng 7 là thời điểm tốt để đầu tư.",
        health: "Sức khỏe tinh thần cần được quan tâm. Nên dành thời gian thư giãn và tránh căng thẳng.",
        love: "Tình cảm lãng mạn, có nhiều kỷ niệm đẹp. Người độc thân có thể gặp người đặc biệt qua bạn bè giới thiệu.",
    }, {
        id: "thin",
        name: "Thìn",
        emoji: "🐲",
        years: "2000, 2012, 2024",
        colors: ["Vàng", "Bạc"],
        numbers: ["4", "9"],
        career: "Thìn có năm thành công trong sự nghiệp, dễ được cấp trên đề bạt. Tháng 3 và tháng 11 là thời điểm vàng.",
        finance: "Tài lộc tốt, có khoản thu nhập bất ngờ. Tuy nhiên cần tránh tiêu xài hoang phí.",
        health: "Cần chú ý sức khỏe đường hô hấp. Nên tránh những nơi ô nhiễm và tập thở sâu mỗi ngày.",
        love: "Tình cảm có chút thử thách nhưng sẽ vượt qua nếu biết lắng nghe. Người độc thân nên mở rộng mối quan hệ.",
    }, {
        id: "ty2",
        name: "Tỵ",
        emoji: "🐍",
        years: "2001, 2013, 2025",
        colors: ["Đỏ", "Vàng"],
        numbers: ["2", "7", "9"],
        career: "Tỵ có năm ổn định trong công việc, thích hợp để củng cố vị trí và phát triển chuyên môn.",
        finance: "Tài chính cần quản lý cẩn thận, tránh những khoản chi không cần thiết. Có cơ hội tăng thu nhập vào cuối năm.",
        health: "Sức khỏe tốt, nhưng cần chú ý đến giấc ngủ. Nên thiết lập thói quen ngủ đúng giờ.",
        love: "Tình cảm phát triển chậm nhưng bền vững. Người độc thân nên kiên nhẫn, duyên sẽ đến vào đúng thời điểm.",
    }, {
        id: "ngo",
        name: "Ngọ",
        emoji: "🐴",
        years: "2002, 2014",
        colors: ["Đỏ", "Tím"],
        numbers: ["3", "7", "9"],
        career: "Năm bản mệnh! Ngọ phạm Thái Tuế nên công việc nhiều thử thách. Cần kiên nhẫn và tránh đưa ra quyết định vội vàng.",
        finance: "Tài chính không ổn định, cần tiết kiệm và tránh đầu tư lớn. Tháng 6 có thể có khoản thu bất ngờ.",
        health: "Sức khỏe cần được ưu tiên hàng đầu. Nên khám sức khỏe định kỳ và chú ý đến chế độ dinh dưỡng.",
        love: "Tình cảm có nhiều biến động, cần sự thấu hiểu và bao dung. Người độc thân nên tập trung vào bản thân trước.",
    }, {
        id: "mui",
        name: "Mùi",
        emoji: "🐑",
        years: "2003, 2015",
        colors: ["Xanh lá", "Vàng"],
        numbers: ["5", "8"],
        career: "Mùi và Ngọ lục hợp nên năm nay cực kỳ thuận lợi. Công việc hanh thông, dễ đạt được thành tựu.",
        finance: "Tài lộc sung túc, có nhiều nguồn thu nhập. Thích hợp để đầu tư dài hạn vào bất động sản.",
        health: "Sức khỏe tốt, tinh thần thoải mái. Là năm thích hợp để tham gia các hoạt động ngoài trời.",
        love: "Tình cảm viên mãn, người có gia đình hạnh phúc. Người độc thân dễ tìm được bạn đời lý tưởng.",
    }, {
        id: "than",
        name: "Thân",
        emoji: "🐵",
        years: "2004, 2016",
        colors: ["Trắng", "Vàng"],
        numbers: ["4", "9"],
        career: "Thân có quý nhân hỗ trợ, công việc phát triển thuận lợi. Thích hợp để học hỏi kỹ năng mới.",
        finance: "Tài chính ổn định, có khoản tiết kiệm tăng dần. Nên tránh các khoản vay mượn trong năm nay.",
        health: "Sức khỏe cần chú ý đến hệ tiêu hóa. Nên ăn uống điều độ và tránh thức khuya.",
        love: "Tình cảm có nhiều niềm vui bất ngờ. Người độc thân có thể gặp người đặc biệt trong chuyến du lịch.",
    }, {
        id: "dau",
        name: "Dậu",
        emoji: "🐔",
        years: "2005, 2017",
        colors: ["Vàng", "Nâu"],
        numbers: ["6", "8"],
        career: "Dậu có năm tương đối ổn định, thích hợp để củng cố vị trí hiện tại. Tháng 10 có cơ hội thăng tiến.",
        finance: "Tài chính cần quản lý chặt chẽ, tránh chi tiêu không cần thiết. Có thể có thu nhập thụ động vào cuối năm.",
        health: "Sức khỏe tinh thần cần được quan tâm. Nên dành thời gian cho sở thích cá nhân và thư giãn.",
        love: "Tình cảm êm đềm, cần sự chia sẻ và đồng cảm. Người độc thân nên chủ động hơn trong tình yêu.",
    }, {
        id: "tuat",
        name: "Tuất",
        emoji: "🐶",
        years: "2006, 2018",
        colors: ["Đỏ", "Xanh"],
        numbers: ["3", "7"],
        career: "Tuất tam hợp với Ngọ nên năm nay đại cát đại lợi. Sự nghiệp thăng hoa, có nhiều cơ hội phát triển.",
        finance: "Tài lộc dồi dào, đầu tư sinh lời cao. Tháng 5 và tháng 9 là thời điểm tốt để mở rộng kinh doanh.",
        health: "Sức khỏe tốt, năng lượng tích cực. Thích hợp để tham gia các môn thể thao mới.",
        love: "Tình cảm nồng nhiệt, có nhiều kỷ niệm đáng nhớ. Người độc thân dễ tìm được người đồng điệu tâm hồn.",
    }, {
        id: "hoi",
        name: "Hợi",
        emoji: "🐷",
        years: "2007, 2019",
        colors: ["Xanh", "Trắng"],
        numbers: ["1", "6"],
        career: "Hợi có năm bình ổn trong công việc, thích hợp để hoàn thiện kỹ năng và xây dựng mối quan hệ.",
        finance: "Tài chính ổn định, không có biến động lớn. Nên tập trung vào tiết kiệm và đầu tư an toàn.",
        health: "Sức khỏe cần chú ý đến giấc ngủ và hệ thần kinh. Nên thực hành thiền định để giảm căng thẳng.",
        love: "Tình cảm gia đình ấm áp, cần dành thời gian cho người thân. Người độc thân có thể tìm thấy tình yêu gần nơi làm việc.",
    }];

    const zodiacSelector = document.getElementById("zodiacSelector");
    const zodiacResult = document.getElementById("zodiacResult");

    // Xóa nội dung cũ nếu có
    zodiacSelector.innerHTML = "";

    // Tạo các lựa chọn con giáp với emoji
    zodiacData.forEach((zodiac, index) => {
        const option = document.createElement("div");
        option.className = "zodiac-option";
        option.dataset.id = zodiac.id;
        option.dataset.index = index;

        option.innerHTML = `
            <div class="zodiac-option-icon">
                ${zodiac.emoji}
            </div>
            <div class="zodiac-option-name">${zodiac.name}</div>
            <div class="zodiac-option-year">${zodiac.years}</div>
        `;

        option.addEventListener("click", () => {
            // Xóa class active từ tất cả các option
            document.querySelectorAll(".zodiac-option").forEach((opt) => {
                opt.classList.remove("active");
            });

            // Thêm class active cho option được chọn
            option.classList.add("active");

            // Hiển thị kết quả tử vi
            showZodiacResult(zodiac);

            // Tạo hiệu ứng pháo hoa
            createFireworks(1);
        });

        zodiacSelector.appendChild(option);
    });

    // Tự động chọn con giáp đầu tiên
    // if (zodiacData.length > 0) {
    //     document.querySelector(".zodiac-option").classList.add("active");
    //     showZodiacResult(zodiacData[0]);
    // }

    function showZodiacResult(zodiac) {
        // Tạo badge đặc biệt cho năm bản mệnh
        let badge = "";
        if (zodiac.name === "Ngọ") {
            badge = '<div class="result-badge">NĂM BẢN MỆNH</div>';
        } else if (zodiac.name === "Dần" || zodiac.name === "Tuất") {
            badge = '<div class="result-badge" style="background:linear-gradient(45deg, #228b22, #32cd32)">TAM HỢP</div>';
        } else if (zodiac.name === "Mùi") {
            badge = '<div class="result-badge" style="background:linear-gradient(45deg, #228b22, #32cd32)">LỤC HỢP</div>';
        } else if (zodiac.name === "Sửu") {
            badge = '<div class="result-badge" style="background:linear-gradient(45deg, #8b0000, #c41e3a)">TƯƠNG HÌNH</div>';
        } else if (zodiac.name === "Tý") {
            badge = '<div class="result-badge" style="background:linear-gradient(45deg, #8b0000, #c41e3a)">THÁI TUẾ</div>';
        }

        zodiacResult.innerHTML = `
            <div class="zodiac-result-header">
                <div class="result-icon">
                    ${zodiac.emoji}
                </div>
                <div>
                    <div class="result-title">Tử Vi ${zodiac.name} Năm Bính Ngọ 2026</div>
                    <div style="margin-top: 0.5rem; color: #666;">Năm sinh (dưới 2026): ${zodiac.years}</div>
                </div>
                ${badge}
            </div>
            
            <div class="zodiac-details">
                <div class="detail-card">
                    <div class="detail-title">📊 Công Danh Sự Nghiệp</div>
                    <p class="prediction-text">${zodiac.career}</p>
                </div>
                
                <div class="detail-card">
                    <div class="detail-title">💰 Tài Lộc</div>
                    <p class="prediction-text">${zodiac.finance}</p>
                    <div class="lucky-items">
                        ${zodiac.numbers.map((num) => `<span class="lucky-item">Số ${num}</span>`).join("")}
                    </div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-title">❤️ Tình Duyên</div>
                    <p class="prediction-text">${zodiac.love}</p>
                    <div class="lucky-items">
                        ${zodiac.colors.map((color) => `<span class="lucky-item" style="background:${getColorHex(color)}20; border:1px solid ${getColorHex(color)}">${color}</span>`).join("")}
                    </div>
                </div>
                
                <div class="detail-card">
                    <div class="detail-title">🏥 Sức Khỏe</div>
                    <p class="prediction-text">${zodiac.health}</p>
                    <div style="margin-top: 1rem;">
                        <div class="highlight">Lời khuyên cho năm 2026:</div>
                        <p>Năm ${zodiac.name === "Ngọ" ? "bản mệnh" : "này"}, bạn nên ${zodiac.name === "Ngọ" ? "cẩn trọng trong mọi việc, đặc biệt là sức khỏe" : "tận dụng cơ hội để phát triển bản thân"}. Hãy ${zodiac.name === "Dần" || zodiac.name === "Tuất" || zodiac.name === "Mùi" ? "tận dụng vận may để phát triển sự nghiệp" : "kiên nhẫn vượt qua thử thách"} trong năm Bính Ngọ.</p>
                    </div>
                </div>
            </div>
        `;

        zodiacResult.classList.add("active");

        // Cuộn đến kết quả
        zodiacResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function getColorHex(colorName) {
        const colorMap = {
            Đỏ: "#c41e3a",
            Vàng: "#ffd700",
            "Xanh lá": "#228b22",
            "Xanh dương": "#1e90ff",
            Tím: "#9370db",
            Cam: "#ff8c00",
            Trắng: "#ffffff",
            Đen: "#000000",
            Bạc: "#c0c0c0",
            Nâu: "#8b4513",
            Xanh: "#228b22",
        };
        return colorMap[colorName] || "#c41e3a";
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

            const anim = particle.animate([{
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
            });

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