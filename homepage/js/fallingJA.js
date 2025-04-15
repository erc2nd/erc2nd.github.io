// Grab everything necessary to render images to screen
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = document.querySelector('.canvas-container').clientWidth;
canvas.height = document.querySelector('.canvas-container').clientHeight;
dpi = window.devicePixelRatio;

// These eventlisteners allow toggling cheatsheet ON/OFF
// & convert cheatsheet between kana forms
document.querySelector('.reveal').addEventListener('click', () => {
    document.querySelector('.sheetBinder').classList.toggle("hidden");
})

let kanaSelect = document.querySelector('.checkbox');

kanaSelect.addEventListener('input', () => {
    if (kanaSelect.checked) {
        document.querySelector('.hiragana').classList.remove('unselected');
        document.querySelector('.katakana').classList.add('unselected');
    } else {
        document.querySelector('.katakana').classList.remove('unselected');
        document.querySelector('.hiragana').classList.add('unselected');
    }
})

let kana = [];
let onscreen = [];
let correct = [];
let wrong = [];

// Grabs the chosen kana from the appropriate JSON file
async function load_kana(kanaChoice) {
    console.log(kanaChoice)
    await fetch(kanaChoice)
        .then(response => {
            return response.json();
        })
        .then(data => {
            kana = data;
        });
}

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

let playing = false;

function resetGame() {
    playing = true;
    kana.concat(correct, wrong);
    correct = [];
    wrong = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    main();
}

fix_dpi();
ctx.font = "3em sans-serif"
ctx.fillStyle = "white";
ctx.fillText("Falling Kana", 10, canvas.height / 2);

// Only allow player to start game if they are already in the text input box
document.querySelector('.answer').addEventListener('focusin', () => {
    document.addEventListener('keyup', enterGame)
})
document.querySelector('.answer').addEventListener('focusout', () => {
    document.removeEventListener('keyup', enterGame)
})

function enterGame(e) {
    if (e.key === 'Enter' && playing === false) {
        resetGame();
    }
}

// Launch game
async function main() {
    if (kanaSelect.checked) {
        await load_kana('json/hiragana_falling.json');
    } else {
        await load_kana('json/katakana_falling.json');
    }

    kana = mix(kana);

    let x;
    let y = -10;
    let fallSpeed = 3;

    class Char {
        constructor(char, latin, x, y, font, color) {
            this.char = char;
            this.latin = latin;
            this.x = x;
            this.y = y;
            this.font = font;
            this.color = color;
        }

        draw(ctx) {
            ctx.font = this.font;
            ctx.fillStyle = this.color;
            ctx.fillText(this.char, this.x, this.y);
        }

        updatePosition(y) {
            this.y = y;
        }
    }

    setInterval(update, 30);
    setInterval(dropChar, 1000);

    document.addEventListener('keyup', check_answer);

    function check_answer(e) {
        if (e.key === 'Enter') {
            // Check if input matches anything in onscreen.latin
            onscreen.forEach((e, i) => {
                if (document.getElementById('ans_box').value == onscreen[i].latin) {
                    // Move related kana to correct array
                    correct.push(onscreen.splice(i, 1))
                }
            })
            // Delete input text
            document.getElementById('ans_box').value = '';
        }
    }

    // Allow user to adjust speed of kana
    // Note: (this is buggy and could be implemented much better)
    document.querySelector('.speed-up').addEventListener('click', () => {
        fallSpeed++;
    })

    document.querySelector('.speed-down').addEventListener('click', () => {
        fallSpeed > 1 ? fallSpeed-- : fallSpeed;
    })

    // Send char on screen
    function dropChar() {
        x = Math.floor(Math.random() * (canvas.width - 100));
        if (kana.length > 0) {
            let tmp = kana.pop();
            onscreen.push(new Char(tmp.kana, tmp.latin, x, y, "5em Arial", 'white'));
        }
    }

    // Running game loop
    function update() {
        fix_dpi();
        // If we've run out of kana, end game
        if (kana.length == 0 && onscreen.length == 0) {
            ctx.font = "3em sans-serif"
            ctx.fillStyle = "white";
            ctx.fillText("Game Over", 0, canvas.height / 2);
            playing = false;
            return;
        }
        onscreen.forEach((e, i) => {
            // If a char passes the bottom of the screen, it was missed
            if (e.y > canvas.height + 50) {
                wrong.push(onscreen.splice(i, 1));
            }
            e.y += fallSpeed + (Math.floor(Math.random() * 3));
            e.updatePosition(e.y);
            e.draw(ctx);
        })
        // Update Score
        document.querySelector('.correct').innerText = `Correct: ${correct.length}`;
        document.querySelector('.wrong').innerText = `Missed: ${wrong.length}`;
    }
}
