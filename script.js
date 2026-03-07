const consonants = [
    { letter: 'ก', name: 'ko kai', toneClass: 'Middle' },
    { letter: 'ข', name: 'kho khai', toneClass: 'High' },
    { letter: 'ฃ', name: 'kho khuat', toneClass: 'High' },
    { letter: 'ค', name: 'kho khwai', toneClass: 'Low' },
    { letter: 'ฅ', name: 'kho khon', toneClass: 'Low' },
    { letter: 'ฆ', name: 'kho rakhang', toneClass: 'Low' },
    { letter: 'ง', name: 'ngo ngu', toneClass: 'Low' },
    { letter: 'จ', name: 'cho chan', toneClass: 'Middle' },
    { letter: 'ฉ', name: 'cho ching', toneClass: 'High' },
    { letter: 'ช', name: 'cho chang', toneClass: 'Low' },
    { letter: 'ซ', name: 'so so', toneClass: 'Low' },
    { letter: 'ฌ', name: 'cho choe', toneClass: 'Low' },
    { letter: 'ญ', name: 'yo ying', toneClass: 'Low' },
    { letter: 'ฎ', name: 'do chada', toneClass: 'Middle' },
    { letter: 'ฏ', name: 'to patak', toneClass: 'Middle' },
    { letter: 'ฐ', name: 'tho than', toneClass: 'High' },
    { letter: 'ฑ', name: 'tho montho', toneClass: 'High' },
    { letter: 'ฒ', name: 'tho phuthao', toneClass: 'High' },
    { letter: 'ณ', name: 'no nen', toneClass: 'Low' },
    { letter: 'ด', name: 'do dek', toneClass: 'Middle' },
    { letter: 'ต', name: 'to tao', toneClass: 'Middle' },
    { letter: 'ถ', name: 'tho thung', toneClass: 'High' },
    { letter: 'ท', name: 'tho thahan', toneClass: 'Low' },
    { letter: 'ธ', name: 'tho thong', toneClass: 'Low' },
    { letter: 'น', name: 'no nu', toneClass: 'Low' },
    { letter: 'บ', name: 'bo baimai', toneClass: 'Middle' },
    { letter: 'ป', name: 'po pla', toneClass: 'Middle' },
    { letter: 'ผ', name: 'pho phung', toneClass: 'High' },
    { letter: 'ฝ', name: 'fo fa', toneClass: 'High' },
    { letter: 'พ', name: 'pho phan', toneClass: 'Low' },
    { letter: 'ฟ', name: 'fo fan', toneClass: 'Low' },
    { letter: 'ภ', name: 'pho samphao', toneClass: 'Low' },
    { letter: 'ม', name: 'mo ma', toneClass: 'Low' },
    { letter: 'ย', name: 'yo yak', toneClass: 'Low' },
    { letter: 'ร', name: 'ro rua', toneClass: 'Low' },
    { letter: 'ล', name: 'lo ling', toneClass: 'Low' },
    { letter: 'ว', name: 'wo waen', toneClass: 'Low' },
    { letter: 'ศ', name: 'so sala', toneClass: 'High' },
    { letter: 'ษ', name: 'so rusi', toneClass: 'High' },
    { letter: 'ส', name: 'so sua', toneClass: 'High' },
    { letter: 'ห', name: 'ho hip', toneClass: 'High' },
    { letter: 'ฬ', name: 'lo chula', toneClass: 'Low' },
    { letter: 'อ', name: 'o ang', toneClass: 'Middle' },
    { letter: 'ฮ', name: 'ho nokhuk', toneClass: 'Low' }
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

document.getElementById('start-btn').onclick = async () => {
    name = document.getElementById('name-input').value.trim();
    if (!name) {
        alert('Please enter your name');
        return;
    }
    try {
        const response = await fetch('https://thai-drill-backend.onrender.com/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        const data = await response.json();
        const count = data.count;
        document.getElementById('name-screen').style.display = 'none';
        document.getElementById('drill-screen').style.display = 'block';
        document.getElementById('greeting').textContent = `Hello, ${name}! (Started ${count} times) Let's start the drill.`;
        shuffled = shuffle([...consonants]);
        currentIndex = 0;
        hearts = 3;
        streak = 0;
        updateHearts();
        updateStreak();
        loadQuestion();
    } catch (error) {
        alert('Failed to connect to server. Please try again.');
    }
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
    // show only the consonant letter
    document.getElementById('question').textContent = cons.letter;
    let options = [`${cons.name} — ${cons.toneClass}`];
    while (options.length < 3) {
        const rand = consonants[Math.floor(Math.random() * consonants.length)];
        const text = `${rand.name} — ${rand.toneClass}`;
        if (!options.includes(text)) options.push(text);
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
    const correctText = `${correct.name} — ${correct.toneClass}`;
    if (selected === correctText) {
        streak++;
        feedback.textContent = `Correct! ${correct.letter} is ${correctText}`;
        feedback.className = 'correct';
        document.getElementById('next-btn').classList.add('big-next');
    } else {
        streak = 0;
        hearts--;
        updateHearts();
        feedback.textContent = `Heart lost! Incorrect! The correct answer is ${correct.letter} (${correctText})`;
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