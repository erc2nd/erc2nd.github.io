let kanjiArray = [
    {char: "一", eng: "one"},
    {char: "二", eng: "two"},
    {char: "三", eng: "three"},
    {char: "四", eng: "four"},
    {char: "五", eng: "five"},
    {char: "六", eng: "six"},
    {char: "七", eng: "seven"},
    {char: "八", eng: "eight"},
    {char: "九", eng: "nine"},
    {char: "十", eng: "ten"},
    {char: "百", eng: "hundred"},
    {char: "千", eng: "thousand"},
    {char: "上", eng: "above"},
    {char: "下", eng: "below"},
    {char: "左", eng: "left"},
    {char: "右", eng: "right"},
    {char: "中", eng: "middle"},
    {char: "大", eng: "big"},
    {char: "小", eng: "small"},
    {char: "月", eng: "moon, month"},
    {char: "日", eng: "sun, day"},
    {char: "年", eng: "year"},
    {char: "早", eng: "early"},
    {char: "木", eng: "tree"},
    {char: "林", eng: "woods"},
    {char: "山", eng: "mountain"},
    {char: "川", eng: "river"},
    {char: "土", eng: "soil"},
    {char: "空", eng: "sky"},
    {char: "田", eng: "rice field"},
    {char: "天", eng: "heaven"},
    {char: "生", eng: "life"},
    {char: "花", eng: "flower"},
    {char: "草", eng: "grass"},
    {char: "虫", eng: "insect"},
    {char: "犬", eng: "dog"},
    {char: "人", eng: "person"},
    {char: "名", eng: "name"},
    {char: "女", eng: "woman"},
    {char: "男", eng: "man"},
    {char: "子", eng: "child"},
    {char: "目", eng: "eye"},
    {char: "耳", eng: "ear"},
    {char: "口", eng: "mouth"},
    {char: "手", eng: "hand"},
    {char: "足", eng: "foot"},
    {char: "見", eng: "see"},
    {char: "音", eng: "sound"},
    {char: "力", eng: "power"},
    {char: "雨", eng: "rain"},
    {char: "円", eng: "circle, yen"},
    {char: "休", eng: "rest"},
    {char: "校", eng: "school"},
    {char: "先", eng: "previous"},
    {char: "村", eng: "village"},
    {char: "町", eng: "town"},
    {char: "森", eng: "forest"},
    {char: "水", eng: "water"},
    {char: "火", eng: "fire"},
    {char: "玉", eng: "ball"},
    {char: "王", eng: "king"},
    {char: "石", eng: "stone"},
    {char: "竹", eng: "bamboo"},
    {char: "貝", eng: "shellfish"},
    {char: "車", eng: "car"},
    {char: "金", eng: "gold, money"},
    {char: "入", eng: "enter"},
    {char: "出", eng: "exit"},
    {char: "立", eng: "stand"},
    {char: "正", eng: "correct"},
    {char: "気", eng: "spirit"},
    {char: "学", eng: "study"},
    {char: "文", eng: "writing"},
    {char: "字", eng: "character"},
    {char: "本", eng: "book"},
    {char: "教", eng: "teach"},
    {char: "室", eng: "room"},
    {char: "社", eng: "company, shrine"},
    {char: "外", eng: "outside"},
    {char: "国", eng: "country"},
    {char: "東", eng: "east"},
    {char: "西", eng: "west"},
    {char: "南", eng: "south"},
    {char: "北", eng: "north"},
    {char: "分", eng: "minute, understand"},
    {char: "間", eng: "interval"},
    {char: "今", eng: "now"},
    {char: "時", eng: "time"},
    {char: "来", eng: "come"},
    {char: "話", eng: "talk"},
    {char: "聞", eng: "hear"},
    {char: "食", eng: "eat"},
    {char: "飲", eng: "drink"},
    {char: "行", eng: "go"},
    {char: "読", eng: "read"},
    {char: "書", eng: "write"},
    {char: "言", eng: "say"}
  ];

  let hanziArray = [
    {char: "爱", eng: "love"},
    {char: "八", eng: "eight"},
    {char: "吧", eng: "particle"},
    {char: "白", eng: "white"},
    {char: "百", eng: "hundred"},
    {char: "帮", eng: "help"},
    {char: "报", eng: "newspaper"},
    {char: "本", eng: "book"},
    {char: "不", eng: "not"},
    {char: "菜", eng: "vegetable"},
    {char: "茶", eng: "tea"},
    {char: "吃", eng: "eat"},
    {char: "出", eng: "exit"},
    {char: "穿", eng: "wear"},
    {char: "大", eng: "big"},
    {char: "的", eng: "of"},
    {char: "点", eng: "o'clock, dot"},
    {char: "电", eng: "electricity"},
    {char: "东", eng: "east"},
    {char: "都", eng: "all"},
    {char: "读", eng: "read"},
    {char: "对", eng: "correct"},
    {char: "多", eng: "many"},
    {char: "儿", eng: "child"},
    {char: "二", eng: "two"},
    {char: "饭", eng: "meal"},
    {char: "飞", eng: "fly"},
    {char: "分", eng: "minute"},
    {char: "高", eng: "tall"},
    {char: "个", eng: "measure word"},
    {char: "工", eng: "work"},
    {char: "狗", eng: "dog"},
    {char: "好", eng: "good"},
    {char: "号", eng: "number"},
    {char: "喝", eng: "drink"},
    {char: "和", eng: "and"},
    {char: "很", eng: "very"},
    {char: "后", eng: "back"},
    {char: "话", eng: "speech"},
    {char: "会", eng: "can, meeting"},
    {char: "几", eng: "how many"},
    {char: "家", eng: "home"},
    {char: "见", eng: "see"},
    {char: "叫", eng: "call"},
    {char: "今", eng: "now"},
    {char: "九", eng: "nine"},
    {char: "开", eng: "open"},
    {char: "看", eng: "look"},
    {char: "块", eng: "piece"},
    {char: "来", eng: "come"},
    {char: "老", eng: "old"},
    {char: "了", eng: "completed"},
    {char: "冷", eng: "cold"},
    {char: "里", eng: "inside"},
    {char: "六", eng: "six"},
    {char: "吗", eng: "question particle"},
    {char: "买", eng: "buy"},
    {char: "猫", eng: "cat"},
    {char: "没", eng: "not"},
    {char: "米", eng: "rice"},
    {char: "名", eng: "name"},
    {char: "明", eng: "bright"},
    {char: "哪", eng: "which"},
    {char: "那", eng: "that"},
    {char: "呢", eng: "question particle"},
    {char: "能", eng: "can"},
    {char: "你", eng: "you"},
    {char: "年", eng: "year"},
    {char: "女", eng: "female"},
    {char: "朋", eng: "friend"},
    {char: "七", eng: "seven"},
    {char: "钱", eng: "money"},
    {char: "前", eng: "front"},
    {char: "请", eng: "please"},
    {char: "去", eng: "go"},
    {char: "热", eng: "hot"},
    {char: "人", eng: "person"},
    {char: "认", eng: "recognize"},
    {char: "日", eng: "day"},
    {char: "三", eng: "three"},
    {char: "上", eng: "up"},
    {char: "少", eng: "few"},
    {char: "谁", eng: "who"},
    {char: "什", eng: "what"},
    {char: "十", eng: "ten"},
    {char: "时", eng: "time"},
    {char: "是", eng: "be"},
    {char: "书", eng: "book"},
    {char: "水", eng: "water"},
    {char: "睡", eng: "sleep"},
    {char: "说", eng: "speak"},
    {char: "四", eng: "four"},
    {char: "岁", eng: "years old"},
    {char: "他", eng: "he"},
    {char: "她", eng: "she"},
    {char: "太", eng: "too"},
    {char: "天", eng: "sky, day"},
    {char: "听", eng: "listen"},
    {char: "同", eng: "same"},
    {char: "我", eng: "I"},
    {char: "五", eng: "five"},
    {char: "午", eng: "noon"},
    {char: "西", eng: "west"},
    {char: "喜", eng: "like"},
    {char: "下", eng: "down"},
    {char: "先", eng: "first"},
    {char: "现", eng: "now"},
    {char: "想", eng: "think"},
    {char: "小", eng: "small"},
    {char: "校", eng: "school"},
    {char: "些", eng: "some"},
    {char: "写", eng: "write"},
    {char: "谢", eng: "thank"},
    {char: "星", eng: "star"},
    {char: "学", eng: "study"},
    {char: "一", eng: "one"},
    {char: "衣", eng: "clothes"},
    {char: "医", eng: "medical"},
    {char: "院", eng: "courtyard"},
    {char: "椅", eng: "chair"},
    {char: "有", eng: "have"},
    {char: "月", eng: "month, moon"},
    {char: "在", eng: "at"},
    {char: "再", eng: "again"},
    {char: "怎", eng: "how"},
    {char: "这", eng: "this"},
    {char: "中", eng: "middle, China"},
    {char: "住", eng: "live"},
    {char: "桌", eng: "table"},
    {char: "字", eng: "character"},
    {char: "昨", eng: "yesterday"},
    {char: "坐", eng: "sit"},
    {char: "做", eng: "do"},
    {char: "爸", eng: "father"},
    {char: "妈", eng: "mother"},
    {char: "弟", eng: "younger brother"},
    {char: "哥", eng: "older brother"},
    {char: "姐", eng: "older sister"},
    {char: "妹", eng: "younger sister"},
    {char: "子", eng: "child"},
    {char: "友", eng: "friend"},
    {char: "商", eng: "commerce"},
    {char: "馆", eng: "establishment"},
    {char: "租", eng: "rent"},
    {char: "车", eng: "vehicle"},
    {char: "视", eng: "vision"},
    {char: "脑", eng: "brain"},
    {char: "机", eng: "machine"},
    {char: "自", eng: "self"},
    {char: "行", eng: "go"},
    {char: "银", eng: "silver"}
];

let charArray = [];

let audio = false;
let msg = new SpeechSynthesisUtterance;

const canvas = document.getElementById('playfield');
const ctx = canvas.getContext('2d');
dpi = window.devicePixelRatio;

// Much thanks to this article by Zak Frisch on fixing canvas blur:
// https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
function fix_dpi() {
    //get CSS height
    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    //get CSS width
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    //scale the canvas
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}
fix_dpi();

function mix(array) {
    // Fisher–Yates shuffle
    // Working backwards from end of array
    for (let i = array.length - 1; i > 0; i--) {
        // Grab random index from 0 to i
        let j = Math.floor(Math.random() * (i + 1));
        // Swap current item with random one from before it
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const grid = 25;
const col = 20;
const row = 28;
const gameWidth = canvas.width = grid * col;
const gameHeight = canvas.height = grid * row;
const fieldColor = canvas.style.backgroundColor = "#000229";
const scoreDisplay = document.querySelector(".score");
const resetBtn = document.querySelector(".reset");

let score = 0;
let highscore_local = localStorage.getItem('highscore') || 0;
let highscore_display = document.querySelector('.highScore');
highscoreUpdate();
highscore_display.innerText = `High Score: ${highscore_local}`;

let playing = false;
let win = false;

let xSpeed;
let ySpeed;

const snakeColor = "green";
let snake = [{
    x: (gameWidth / 2),
    y: (gameHeight / 2)
}]

class Char {
    constructor(char, eng, x, y) {
        this.char = char;
        this.eng = eng;
        this.x = x;
        this.y = y;
    }
}

let cur_food = [];

// Allow user to select how many chars to have on screen at once
let foodSlider = document.querySelector('.screenChars');
let foodOnScreen = foodSlider.valueAsNumber;
document.querySelector('.screenCharInfo').innerText = `Chars on screen: ${foodOnScreen}`;
foodSlider.addEventListener('input', () => {
    if (foodSlider.valueAsNumber > practiceSlider.valueAsNumber) {
        practiceSlider.valueAsNumber = foodSlider.valueAsNumber;
        practiceNum = practiceSlider.valueAsNumber;
        document.querySelector('.practiceCharInfo').innerText = `Chars on screen: ${practiceNum}`;
    }
    foodOnScreen = foodSlider.valueAsNumber;
    document.querySelector('.screenCharInfo').innerText = `Chars on screen: ${foodOnScreen}`;
})

// Allow users to select how many chars to practice total
let practiceSlider = document.querySelector('.practiceChars');
let practiceNum = practiceSlider.valueAsNumber;
document.querySelector('.practiceCharInfo').innerText = `Characters to practice: ${practiceNum}`;
practiceSlider.addEventListener('input', () => {
    if (practiceSlider.valueAsNumber < foodSlider.valueAsNumber) {
        foodSlider.valueAsNumber = practiceSlider.valueAsNumber;
        foodOnScreen = foodSlider.valueAsNumber;
        document.querySelector('.screenCharInfo').innerText = `Chars on screen: ${foodOnScreen}`;
    }
    practiceNum = practiceSlider.valueAsNumber;
    document.querySelector('.practiceCharInfo').innerText = `Characters to practice: ${practiceNum}`;
})


let foodFont = "1em sans-serif";
let foodStyle = "white";

let endCause;

window.addEventListener('keyup', (e) => {
    if ((e.key === 'Enter' || e.key == ' ') && playing === false) {
        gameStart();
    }
});
resetBtn.addEventListener('click', gameStart);
window.addEventListener('keydown', move);

// Thanks to this video for help with a lot of early setup troubleshooting:
// https://www.youtube.com/watch?v=Je0B3nHhKmM
function gameStart() {
    score = win ? score : 0;
    audio = document.querySelector('.audio').checked ? true : false;
    win = false;
    playing = true;
    xSpeed = grid;
    ySpeed = 0
    scoreDisplay.innerHTML = `Score: ${score}`;
    snake = [{
        x: (gameWidth / 2),
        y: (gameHeight / 2)
    }];
    foodOnScreen = foodSlider.value;
    cur_food = [];
    charArray = [];
    loadCharArray();
    loadFood();
    nextTick();
}

// Prints the target word above the playfield
// The player should attempt to "eat" the char
// that matches this English word.
function printWord() {
    document.querySelector('.cur_word').innerText = `${cur_food[0].eng}`;
}

// Load our array with either Japanese or Chinese chars
// depending on which page we're coming from
function loadCharArray() {
    if (document.querySelector('.main').getAttribute('data-language') == "ja") {
        charArray = mix(kanjiArray).slice(0, practiceNum);
        msg.lang = 'ja';
    } else {
        charArray = mix(hanziArray).slice(0, practiceNum);
        msg.lang = 'zh';
    }
}

// Amount loaded is chosen by player (or default 5).
// This is the max num of chars on screen at any time.
function loadFood() {
    let word;
    let loadAmount = (charArray.length < foodOnScreen) ? charArray.length : foodOnScreen;
    for (let i = 0; i < loadAmount; i++) {
        word = charArray.pop();
        cur_food.push(new Char(
            char = word.char,
            eng = word.eng,
            x = Math.floor(Math.random() * col) * grid,
            y = Math.floor(Math.random() * row) * grid
        ))
    }
}

function drawFood() {
    cur_food.forEach((c) => {
        ctx.fillStyle = fieldColor;
        ctx.fillRect(c.x, c.y, grid, grid)
        ctx.font = foodFont;
        ctx.fillStyle = foodStyle;
        ctx.textAlign = "start";
        ctx.fillText(c.char, c.x, c.y + grid - 3);
    })
}

// Primary game loop
function nextTick() {
    if (playing) {
        setTimeout(() => {
            clearPlayfield();
            drawFood();
            moveSnake();
            drawSnake();
            isGameOver();
            if (playing) printWord();
            nextTick();
        }, 75)
    } else(
        gameOver()
    )
}

// Refreshes playfield by overwriting it every tick
function clearPlayfield() {
    ctx.fillStyle = fieldColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function moveSnake() {
    let head = {
        x: snake[0].x + xSpeed,
        y: snake[0].y + ySpeed
    };
    snake.unshift(head);
    if (foodEaten()) {
        score++;
        highscoreUpdate();
        scoreDisplay.innerHTML = `Score: ${score}`;
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    snake.forEach(section => {
        ctx.fillRect(section.x, section.y, grid, grid);
    })
}

function move(e) {
    switch (true) {
        case ((e.key == 'a' || e.key == 'ArrowLeft') && !(xSpeed == grid)):
            xSpeed = -grid;
            ySpeed = 0;
            break;
        case ((e.key == 'd' || e.key == 'ArrowRight') && !(xSpeed == -grid)):
            xSpeed = grid;
            ySpeed = 0;
            break;
        case ((e.key == 'w' || e.key == 'ArrowUp') && !(ySpeed == -grid)):
            xSpeed = 0;
            ySpeed = -grid;
            break;
        case ((e.key == 's' || e.key == 'ArrowDown') && !(ySpeed == grid)):
            xSpeed = 0;
            ySpeed = grid;
            break;
    }
}

function foodEaten() {
    let munch = false;
    // If you eat the right word
    for (let i = 0; i < cur_food.length; i++) {
        if (snake[0].x == cur_food[i].x &&
            snake[0].y == cur_food[i].y &&
            cur_food[i].eng === document.querySelector('.cur_word').innerText) {
            munch = true;
            if (audio) {
                msg.text = cur_food[i].char;
                window.speechSynthesis.speak(msg);
            }
            // delete the word
            cur_food.shift();
            if (cur_food.length === 0) {
                loadFood();
            }
            // replace the word
            // printWord();
            document.querySelector('.char_remain').innerText = `Remaining: ${charArray.length + cur_food.length}`;
            break;
        }
        // If you eat the wrong word
        else if (snake[0].x == cur_food[i].x &&
            snake[0].y == cur_food[i].y &&
            cur_food[i].eng != document.querySelector('.cur_word').innerText) {
            endCause = `ate "${cur_food[i].eng}"`;
            if (audio) {
                msg.text = cur_food[i].char;
                window.speechSynthesis.speak(msg);
            }
            playing = false;
        }
        // If you eat nothing
        else {
            munch = false;
        }
    }
    return munch;
}

function isGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            playing = false;
            endCause = 'hit a wall';
            break;
        case (snake[0].x > gameWidth):
            playing = false;
            endCause = 'hit a wall';
            break;
        case (snake[0].y < 0):
            playing = false;
            endCause = 'hit a wall';
            break;
        case (snake[0].y > gameHeight):
            playing = false;
            endCause = 'hit a wall';
            break;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            playing = false;
            endCause = 'hit yourself';
            break;
        }
    }
    if (charArray.length === 0 && cur_food.length === 0) {
        playing = false;
        win = true;
    }
}

function gameOver() {
    ctx.font = "3em";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    if (win === true) {
        ctx.fillText("You Win!", gameWidth / 2, gameHeight / 2);
    } else {
        ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
        ctx.fillText(`You ${endCause}`, gameWidth / 2, gameHeight / 2 + 75)
    }
}

function highscoreUpdate() {
    if (score > highscore_local) {
        localStorage.setItem('highscore', score);
        highscore_display.innerHTML = `Score: ${score}`;
    }
}
