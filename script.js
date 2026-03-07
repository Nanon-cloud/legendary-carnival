const consonants = [
    { letter: 'ก', name: 'ko kai', thaiName: 'กอ ไก่', sound: 'k' },
    { letter: 'ข', name: 'kho khai', thaiName: 'ขอ ไข', sound: 'kh' },
    { letter: 'ฃ', name: 'kho khuat', thaiName: 'ขอ ฃวด', sound: 'kh' },
    { letter: 'ค', name: 'kho khwai', thaiName: 'ขอ ควาย', sound: 'kh' },
    { letter: 'ฅ', name: 'kho khon', thaiName: 'ขอ ขอน', sound: 'kh' },
    { letter: 'ฆ', name: 'kho rakhang', thaiName: 'ขอ ระฆัง', sound: 'kh' },
    { letter: 'ง', name: 'ngo ngu', thaiName: 'งอ งู', sound: 'ng' },
    { letter: 'จ', name: 'cho chan', thaiName: 'จอ จาน', sound: 'ch' },
    { letter: 'ฉ', name: 'cho ching', thaiName: 'ฉอ ฉิ่ง', sound: 'ch' },
    { letter: 'ช', name: 'cho chang', thaiName: 'ชอ ช้าง', sound: 'ch' },
    { letter: 'ซ', name: 'so so', thaiName: 'ซอ ซอ', sound: 's' },
    { letter: 'ฌ', name: 'cho choe', thaiName: 'ฌอ เฌอ', sound: 'ch' },
    { letter: 'ญ', name: 'yo ying', thaiName: 'ญอ หญิง', sound: 'y' },
    { letter: 'ฎ', name: 'do chada', thaiName: 'ฎอ จัตวา', sound: 'd' },
    { letter: 'ฏ', name: 'to patak', thaiName: 'ฏอ ปฏัก', sound: 't' },
    { letter: 'ฐ', name: 'tho than', thaiName: 'ฐอ ฐาน', sound: 'th' },
    { letter: 'ฑ', name: 'tho montho', thaiName: 'ฑอ มณโฑ', sound: 'th' },
    { letter: 'ฒ', name: 'tho phuthao', thaiName: 'ฒอ ผู้เถา', sound: 'th' },
    { letter: 'ณ', name: 'no nen', thaiName: 'ณอ เณร', sound: 'n' },
    { letter: 'ด', name: 'do dek', thaiName: 'ดอ เด็ก', sound: 'd' },
    { letter: 'ต', name: 'to tao', thaiName: 'ตอ เต่า', sound: 't' },
    { letter: 'ถ', name: 'tho thung', thaiName: 'ถอ ถุง', sound: 'th' },
    { letter: 'ท', name: 'tho thahan', thaiName: 'ทอ ทหาร', sound: 'th' },
    { letter: 'ธ', name: 'tho thong', thaiName: 'ธอ ธง', sound: 'th' },
    { letter: 'น', name: 'no nu', thaiName: 'นอ หนู', sound: 'n' },
    { letter: 'บ', name: 'bo baimai', thaiName: 'บอ ใบไม้', sound: 'b' },
    { letter: 'ป', name: 'po pla', thaiName: 'ปอ ปลา', sound: 'p' },
    { letter: 'ผ', name: 'pho phung', thaiName: 'ผอ ผึ้ง', sound: 'ph' },
    { letter: 'ฝ', name: 'fo fa', thaiName: 'ฝอ ฝา', sound: 'f' },
    { letter: 'พ', name: 'pho phan', thaiName: 'พอ พาน', sound: 'ph' },
    { letter: 'ฟ', name: 'fo fan', thaiName: 'ฟอ ฟัน', sound: 'f' },
    { letter: 'ภ', name: 'pho samphao', thaiName: 'ภอ สำเภา', sound: 'ph' },
    { letter: 'ม', name: 'mo ma', thaiName: 'มอ ม้า', sound: 'm' },
    { letter: 'ย', name: 'yo yak', thaiName: 'ยอ ยักษ์', sound: 'y' },
    { letter: 'ร', name: 'ro rua', thaiName: 'รอ เรือ', sound: 'r' },
    { letter: 'ล', name: 'lo ling', thaiName: 'ลอ ลิง', sound: 'l' },
    { letter: 'ว', name: 'wo waen', thaiName: 'วอ แหวน', sound: 'w' },
    { letter: 'ศ', name: 'so sala', thaiName: 'ศอ ศาลา', sound: 's' },
    { letter: 'ษ', name: 'so rusi', thaiName: 'ษอ ฤๅษี', sound: 's' },
    { letter: 'ส', name: 'so sua', thaiName: 'สอ เสือ', sound: 's' },
    { letter: 'ห', name: 'ho hip', thaiName: 'หอ หีบ', sound: 'h' },
    { letter: 'ฬ', name: 'lo chula', thaiName: 'ฬอ จุฬา', sound: 'l' },
    { letter: 'อ', name: 'o ang', thaiName: 'ออ อ่าง', sound: 'o' },
    { letter: 'ฮ', name: 'ho nokhuk', thaiName: 'ฮอ นกฮูก', sound: 'h' }
];

let name = '';
let hearts = 3;
let currentIndex = 0;
let shuffled = [];
let streak = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.getElementById('start-btn').onclick = () => {
    name = document.getElementById('name-input').value.trim();
    if (!name) {
        alert('Please enter your name');
        return;
    }
    document.getElementById('name-screen').style.display = 'none';
    document.getElementById('drill-screen').style.display = 'block';
    document.getElementById('greeting').textContent = `Hello, ${name}! Let's start the drill.`;
    shuffled = shuffle([...consonants]);
    currentIndex = 0;
    hearts = 3;
    streak = 0;
    updateHearts();
    updateStreak();
    loadQuestion();
};

function loadQuestion() {
    if (hearts <= 0) {
        showGameOver();
        return;
    }
    if (currentIndex >= shuffled.length) {
        showCongratulations();
        return;
    }
    const cons = shuffled[currentIndex];
    document.getElementById('question').textContent = `What is the pronunciation of: ${cons.letter}`;
    let options = [cons.thaiName];
    while (options.length < 4) {
        const rand = consonants[Math.floor(Math.random() * consonants.length)].thaiName;
        if (!options.includes(rand)) options.push(rand);
    }
    options = shuffle(options);
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(opt, cons);
        optionsDiv.appendChild(btn);
    });
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('next-btn').classList.remove('big-next');
}

function checkAnswer(selected, correct) {
    const feedback = document.getElementById('feedback');
    if (selected === correct.thaiName) {
        streak++;
        feedback.textContent = `Correct! ${correct.letter} is ${correct.name}`;
        feedback.className = 'correct';
        document.getElementById('next-btn').classList.add('big-next');
    } else {
        streak = 0;
        hearts--;
        updateHearts();
        feedback.textContent = `Heart lost! Incorrect! The correct answer is ${correct.letter} (${correct.name})`;
        feedback.className = 'incorrect';
    }
    updateStreak();
    feedback.style.display = 'block';
    document.getElementById('next-btn').style.display = 'block';
    document.getElementById('next-btn').onclick = () => {
        currentIndex++;
        loadQuestion();
    };
}

function updateHearts() {
    const heartsDiv = document.getElementById('hearts');
    heartsDiv.textContent = '❤️'.repeat(hearts);
}

function updateStreak() {
    const streakDiv = document.getElementById('streak');
    streakDiv.textContent = `Streak: ${streak}`;
}

function showGameOver() {
    document.getElementById('drill-screen').style.display = 'none';
    document.getElementById('game-over').style.display = 'block';
}

function showCongratulations() {
    document.getElementById('drill-screen').style.display = 'none';
    document.getElementById('congratulations').style.display = 'block';
}

document.getElementById('restart-btn').onclick = restart;
document.getElementById('restart-btn2').onclick = restart;

function restart() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('congratulations').style.display = 'none';
    document.getElementById('name-screen').style.display = 'block';
    document.getElementById('name-input').value = '';
}