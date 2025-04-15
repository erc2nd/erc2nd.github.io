let multi_word_index = 0;
let typed_word_index = 0;
let cur_multi_word;
let cur_typed_word;
let multi_answered = false;
let typed_answered = false;
let kanji = [];
let kana;

// Will be used for questions
async function load_kanji() {
    return fetch('json/kanji.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            kanji = data;
        });
};

// Will be used for typing conversion
async function load_kana() {
    await fetch('json/kana.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            kana = data;
        });
}

main();
async function main() {
    await load_kanji();
    await load_kana();

    document.addEventListener("DOMContentLoaded", load_question_1());
    document.addEventListener("DOMContentLoaded", load_question_2());

    load_cheat();

    // Sets up the cheatsheet dynamically
    function load_cheat() {
        const cheat = document.querySelector('.sheet');
        for (let i = 0; i < kanji.length; i++) {
            const cheat_item = document.createElement('div');
            cheat_item.className = 'cheat-item';
            const cheat_kanji = document.createElement('p');
            cheat_kanji.className = 'cheat-kanji';
            cheat_kanji.textContent = kanji[i].jp;
            cheat_item.appendChild(cheat_kanji);
            const cheat_meaning = document.createElement('p');
            cheat_meaning.className = 'cheat-meaning';
            cheat_meaning.textContent = kanji[i].en;
            cheat_item.appendChild(cheat_meaning);
            const cheat_reading = document.createElement('p');
            cheat_reading.className = 'cheat-reading';
            let rom = kanji[i].latin;
            cheat_reading.textContent = kanji[i].latin.join(', ');
            cheat_item.appendChild(cheat_reading);

            cheat.appendChild(cheat_item);
        }
    }

    document.querySelector('.reveal').addEventListener('click', () => {
        document.querySelector('.sheet').classList.toggle("hidden");
    })



    function load_question_1() {
        // Resets the question space
        document.querySelectorAll('.answer').forEach(button => {
            button.style.backgroundColor = "#1A1A1D";
            button.style.color = "#fff";
            button.blur();
        })
        document.querySelector('#next-1').style.visibility = "hidden";
        document.querySelector('.response').style.visibility = "hidden";
        multi_answered = false;

        if (!document.querySelector('.multi-hint').classList.contains("hidden")) {
            document.querySelector('.multi-hint').classList.toggle("hidden");
        }

        document.querySelector('.multi-hint').innerHTML = '';

        // Check if all kanji state_multis === 2
        if (kanji.every((element) => element.state_multi === 2)) {
            kanji.forEach((element, index) => {
                kanji[index].state_multi = 0;
            })
        }

        // Select a random word to quiz us on
        do {
            multi_word_index = Math.floor(Math.random() * kanji.length);
        } while (kanji[multi_word_index].state_multi === 2)


        if (kanji[multi_word_index].state_multi != 2) {
            // EN>JP
            let lang_ans;
            if (kanji[multi_word_index].state_multi === 1) {
                cur_multi_word = kanji[multi_word_index].en;
                lang_ans = 'jp';
            }
            // JP>EN
            else if (kanji[multi_word_index].state_multi === 0) {
                cur_multi_word = kanji[multi_word_index].jp;
                lang_ans = 'en';
            }
            document.querySelector('.multi_q').innerText = `Please select the corresponding answer to: ${cur_multi_word}`;

            let ans = mix([0, 1, 2]);
            ans.forEach((element, index) => {
                ans[index] += kanji[multi_word_index].group
            });

            let but = mix([1, 2, 3]);

            for (let i = 0; i < 3; i++) {
                switch (but[i]) {
                    case 1:
                        document.querySelector('#ans_a').innerText = `${kanji[ans[i]][lang_ans]}`;
                        break;
                    case 2:
                        document.querySelector('#ans_b').innerText = `${kanji[ans[i]][lang_ans]}`;
                        break;
                    case 3:
                        document.querySelector('#ans_c').innerText = `${kanji[ans[i]][lang_ans]}`;
                        break;
                }
            }
        }
    }

    // Set up event listeners for Trivia Part 1
    document.querySelectorAll('.multi_a > button').forEach(answer => {
        answer.addEventListener('click', check_answer)
    });

    const but_a = document.getElementById('ans_a');
    const but_b = document.getElementById('ans_b');
    const but_c = document.getElementById('ans_c');

    function multi_click(e) {
        switch (e.key) {
            case '1':
                but_a.click();
                break;
            case '2':
                but_b.click();
                break;
            case '3':
                but_c.click();
                break;
        }
    }

    function enter_1(e) {
        if (e.key === 'Enter' && multi_answered === true) {
            load_question_1();
        }
    }

    function enter_2(e) {
        if (e.key === 'Enter') {
            if (typed_answered === false) {
                check_typed();
            } else {
                load_question_2();
            }
        }
    }

    function click_2(e) {
        if (typed_answered === false) {
            check_typed();
        } else {
            load_question_2();
        }
    }

    document.querySelector('#next-1').addEventListener('click', load_question_1);
    document.querySelector('#next-2').addEventListener('click', click_2);

    document.addEventListener('keyup', multi_click);
    document.addEventListener('keyup', enter_1);

    function check_answer(answer) {
        if (multi_answered === true) {
            return;
        }
        // If correct
        if (kanji[multi_word_index].en === answer.srcElement.textContent ||
            kanji[multi_word_index].jp === answer.srcElement.textContent) {
            answer.srcElement.style.backgroundColor = "green";
            answer.srcElement.style.color = "white";
            document.querySelector('.response').innerText = 'Correct!';
            kanji[multi_word_index].state_multi = kanji[multi_word_index].state_multi === 0 ? 1 : 2;
        }
        // If wrong
        else {
            answer.srcElement.style.backgroundColor = "red";
            answer.srcElement.style.color = "white";
            document.querySelector('.response').innerText = 'Incorrect.';
            show_hint('.multi-hint', multi_word_index);
        }
        document.querySelector('#next-1').style.visibility = "visible";
        document.querySelector('.response').style.visibility = "visible";
        multi_answered = true;
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

    // Set up event listeners for Part 2
    document.getElementById('reading').addEventListener('focusin', () => {
        document.removeEventListener('keyup', multi_click);
        document.removeEventListener('keyup', enter_1);
        document.addEventListener('keyup', enter_2);
        if (document.querySelector('.checkbox').checked) {
            document.querySelector('#reading').addEventListener('input', char_conversion);
        } else {
            document.querySelector('#reading').removeEventListener('input', char_conversion);
        }
    });

    document.querySelector('.hoverhere').addEventListener('click', () => {
        if (document.querySelector('.checkbox').checked) {
            document.getElementById('convert').innerHTML = 'Romaji to kana conversion ON';
        } else {
            document.getElementById('convert').innerHTML = 'Romaji to kana conversion OFF';
        }
    })

    document.getElementById('reading').addEventListener('focusout', () => {
        document.addEventListener('keyup', multi_click);
        document.addEventListener('keyup', enter_1);
        document.removeEventListener('keyup', enter_2);
    });

    function load_question_2() {
        document.getElementById('next-2').innerText = "Check answer";
        document.getElementById('reading').style.backgroundColor = "#f5f5f5";
        document.getElementById('reading').style.color = "black";
        document.getElementById('reading').value = '';
        document.getElementById('reading').readOnly = false;
        document.getElementById('typed-result').style.visibility = "hidden";
        typed_answered = false;

        if (!document.querySelector('.typed-hint').classList.contains("hidden")) {
            document.querySelector('.typed-hint').classList.toggle("hidden");
        }

        document.querySelector('.typed-hint').innerHTML = '';

        // Check if every word has already been successfully passed
        if (kanji.every((element) => element.state_typed === 1)) {
            kanji.forEach((element, index) => {
                kanji[index].state_typed = 0;
            })
        }

        // Select a random word to quiz us on
        do {
            typed_word_index = Math.floor(Math.random() * kanji.length);
        } while (kanji[typed_word_index].state_typed === 1)

        cur_typed_word = kanji[typed_word_index].jp;

        document.querySelector('#typed_q').innerText = `Please type any valid reading of: ${cur_typed_word}`;
    }

    function check_typed() {
        let typed = document.getElementById('reading').value;
        // If answer correct
        if (kanji[typed_word_index].kana.includes(typed) || kanji[typed_word_index].latin.includes(typed)) {
            kanji[typed_word_index].state_typed = 1;
            document.getElementById('reading').style.backgroundColor = "green";
            document.getElementById('reading').style.color = "white";
            document.getElementById('reading').readOnly = true;
            document.getElementById('typed-result').innerText = "Correct!";
            document.getElementById('typed-result').style.visibility = "visible";
        }
        // Else wrong
        else {
            document.getElementById('reading').style.backgroundColor = "red";
            document.getElementById('reading').style.color = "white";
            document.getElementById('reading').readOnly = true;
            document.getElementById('typed-result').innerText = "Incorrect.";
            document.getElementById('typed-result').style.visibility = "visible";
            show_hint('.typed-hint', typed_word_index);
        }
        typed_answered = true;
        document.getElementById('next-2').innerText = "Next question";

    }

    function converter() {

    }

    // Latin char to Japanese kana converter
    const latin = /[a-zA-Z]/;
    const vowel = /[aeiou]/;
    const consonant = /[bcdfghjkmnprstwyz]/;
    const small = ['っ', 'ゃ', 'ゅ', 'ょ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ']
    const large = ['つ', 'や', 'ゆ', 'よ', 'あ', 'い', 'う', 'え', 'お']

    function char_conversion(e) {
        let xinput = e.target.value;
        input = xinput.toLowerCase();
        input = [...input];
        for (let i = 0; i < input.length; i++) {
            // Is 1st char a vowel?
            if (vowel.test(input[i])) {
                for (let j = 0; j < 5; j++) {
                    if (input[i] === kana[j].latin[0]) {
                        input[i] = kana[j].kana;
                    }
                }
            }
            // 1st char is a valid consonant
            else if (consonant.test(input[i])) {
                // Are there more chars? If NO, break
                if (i + 1 === length) {
                    // break;
                }

                // Is 2nd char a vowel?
                // If yes, convert, break
                else if (vowel.test(input[i + 1])) {
                    let rom = [input[i], input[i + 1]];
                    rom = rom.join('');
                    for (let j = 0; j < kana.length; j++) {
                        if (rom === kana[j].latin[0] || rom === kana[j].latin[1]) {
                            input[i] = kana[j].kana;
                            input.pop();
                            break;
                        }
                    }
                }

                // Are 1st & 2nd char an N?
                // If yes, convert, break
                else if (input[i] == 'n' && input[i + 1] == 'n') {
                    input[i] = kana[45].kana;
                    input.pop();
                    // break;
                }

                // Is there a 3rd char? If NO, break
                else if (i + 2 === length) {
                    // break;
                }

                // Is current string tail "tsu"? If yes, convert, break
                else if (input[i] == 't' && input[i + 1] == 's' && input[i + 2] == 'u') {
                    input[i] = kana[17].kana;
                    input.pop();
                    input.pop();
                    // break;
                }


                // Is second char H?
                else if (['c', 's'].includes(input[i]) && input[i + 1] === 'h' && ['a', 'i', 'o', 'u'].includes(input[i + 2])) {
                    let rom = [input[i], input[i + 1], input[i + 2]];
                    rom = rom.join('');
                    for (let j = 0; j < kana.length; j++) {
                        if (rom === kana[j].latin[0] || rom === kana[j].latin[1]) {
                            input[i] = kana[j].kana;
                            input.pop();
                            input.pop();
                            // break;
                        }
                    }
                }

                // Is second char Y?
                else if (['k', 's', 't', 'n', 'm', 'r', 'g', 'j', 'b', 'p'].includes(input[i]) && input[i + 1] == 'y' && ['a', 'o', 'u'].includes(input[i + 2])) {
                    let rom = [input[i], input[i + 1], input[i + 2]];
                    rom = rom.join('');
                    for (let j = 0; j < kana.length; j++) {
                        if (rom === kana[j].latin[0] || rom === kana[j].latin[1]) {
                            input[i] = kana[j].kana;
                            input.pop();
                            input.pop();
                            // break;
                        }
                    }
                }

                // Is 2nd char a repeat of the previous char?
                else if (input[i + 1] === input[i]) {
                    input[i] = 'っ';
                }
            }

            // Is there an x?
            if (large.includes(input[i]) && input[i - 1] == 'x') {
                for (let j = 0; j < large.length; j++) {
                    if (large[j] == input[i]) {
                        input[i - 1] = small[j];
                        input.pop();
                    }
                }
            }
        }
        input = input.join('');
        e.target.value = input;
    }

    function show_hint(hint_type, word_index) {
        if (document.querySelector(hint_type).classList.contains("hidden")) {
            document.querySelector(hint_type).classList.toggle("hidden");
        }
        const hint = document.querySelector(hint_type);
        const big_kanji = document.createElement('p');
        big_kanji.className = 'big-kanji';
        big_kanji.textContent = kanji[word_index].jp;
        hint.appendChild(big_kanji);

        const big_meaning = document.createElement('p');
        big_meaning.className = 'big-meaning';
        big_meaning.textContent = kanji[word_index].en;
        hint.appendChild(big_meaning);

        const big_romaji = document.createElement('p');
        big_romaji.className = 'big-romaji';
        big_romaji.textContent = kanji[word_index].latin.join(', ');
        hint.appendChild(big_romaji);

        const big_kana = document.createElement('p');
        big_kana.className = 'big-kana';
        big_kana.textContent = kanji[word_index].kana.join(', ');
        hint.appendChild(big_kana);
    }


}
