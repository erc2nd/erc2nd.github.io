let multi_word_index = 0;
let typed_word_index = 0;
let cur_multi_word;
let cur_typed_word;
let multi_answered = false;
let typed_answered = false;
let hanzi = [];

async function load_hanzi() {
    return fetch('json/hanzi.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            hanzi = data;
        });
};

main();
async function main() {
    await load_hanzi();

    document.addEventListener("DOMContentLoaded", load_question_1());
    document.addEventListener("DOMContentLoaded", load_question_2());

    load_cheat();

    // Sets up the cheatsheet dynamically
    function load_cheat() {
        const cheat = document.querySelector('.sheet');
        for (let i = 0; i < hanzi.length; i++) {
            const cheat_item = document.createElement('div');
            cheat_item.className = 'cheat-item';
            const cheat_hanzi = document.createElement('p');
            cheat_hanzi.className = 'cheat-hanzi';
            cheat_hanzi.textContent = hanzi[i].zh;
            cheat_item.appendChild(cheat_hanzi);
            const cheat_meaning = document.createElement('p');
            cheat_meaning.className = 'cheat-meaning';
            cheat_meaning.textContent = hanzi[i].en;
            cheat_item.appendChild(cheat_meaning);
            const cheat_reading = document.createElement('p');
            cheat_reading.className = 'cheat-reading';
            let rom = hanzi[i].latin;
            cheat_reading.textContent = hanzi[i].latin
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

        // Check if all hanzi state_multis === 2
        if (hanzi.every((element) => element.state_multi === 2)) {
            hanzi.forEach((element, index) => {
                hanzi[index].state_multi = 0;
            })
        }

        // Select a random word to quiz us on
        do {
            multi_word_index = Math.floor(Math.random() * hanzi.length);
        } while (hanzi[multi_word_index].state_multi === 2)


        if (hanzi[multi_word_index].state_multi != 2) {
            // EN>ZH
            let lang_ans;
            if (hanzi[multi_word_index].state_multi === 1) {
                cur_multi_word = hanzi[multi_word_index].en;
                lang_ans = 'zh';
            }
            // ZH>EN
            else if (hanzi[multi_word_index].state_multi === 0) {
                cur_multi_word = hanzi[multi_word_index].zh;
                lang_ans = 'en';
            }
            document.querySelector('.multi_q').innerText = `Please select the corresponding answer to: ${cur_multi_word}`;

            let ans = mix([0, 1, 2]);
            ans.forEach((element, index) => {
                ans[index] += hanzi[multi_word_index].group
            });

            let but = mix([1, 2, 3]);

            for (let i = 0; i < 3; i++) {
                switch (but[i]) {
                    case 1:
                        document.querySelector('#ans_a').innerText = `${hanzi[ans[i]][lang_ans]}`;
                        break;
                    case 2:
                        document.querySelector('#ans_b').innerText = `${hanzi[ans[i]][lang_ans]}`;
                        break;
                    case 3:
                        document.querySelector('#ans_c').innerText = `${hanzi[ans[i]][lang_ans]}`;
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
        if (hanzi[multi_word_index].en === answer.srcElement.textContent ||
            hanzi[multi_word_index].zh === answer.srcElement.textContent) {
            answer.srcElement.style.backgroundColor = "green";
            answer.srcElement.style.color = "white";
            document.querySelector('.response').innerText = 'Correct!';
            hanzi[multi_word_index].state_multi = hanzi[multi_word_index].state_multi === 0 ? 1 : 2;
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
    });


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
        if (hanzi.every((element) => element.state_typed === 1)) {
            hanzi.forEach((element, index) => {
                hanzi[index].state_typed = 0;
            })
        }

        // Select a random word to quiz us on
        do {
            typed_word_index = Math.floor(Math.random() * hanzi.length);
        } while (hanzi[typed_word_index].state_typed === 1)

        cur_typed_word = hanzi[typed_word_index].zh;

        document.querySelector('#typed_q').innerText = `Please type any valid reading of: ${cur_typed_word}`;
    }

    function check_typed() {
        let typed = document.getElementById('reading').value;
        // If answer correct
        if (hanzi[typed_word_index].latin == typed) {
            // if (hanzi[typed_word_index].latin.includes(typed)) {
            hanzi[typed_word_index].state_typed = 1;
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

    function show_hint(hint_type, word_index) {
        if (document.querySelector(hint_type).classList.contains("hidden")) {
            document.querySelector(hint_type).classList.toggle("hidden");
        }
        const hint = document.querySelector(hint_type);
        const big_hanzi = document.createElement('p');
        big_hanzi.className = 'big-hanzi';
        big_hanzi.textContent = hanzi[word_index].zh;
        hint.appendChild(big_hanzi);

        const big_meaning = document.createElement('p');
        big_meaning.className = 'big-meaning';
        big_meaning.textContent = hanzi[word_index].en;
        hint.appendChild(big_meaning);

        const big_romaji = document.createElement('p');
        big_romaji.className = 'big-romaji';
        big_romaji.textContent = hanzi[word_index].latin;
        hint.appendChild(big_romaji);
    }
}
