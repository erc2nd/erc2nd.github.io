let vocab;
let filter_vocab;
let hanzi;
let filter_hanzi;
let para;

// Takes the text entered in the form and strips out any non-hanzi
// Stores the remaining characters in a Set (hash table—faster to search than array)
function add_vocab() {
    vocab = document.getElementById("vocab").value;
    filter_vocab = new Set();
    for (let i = 0; i < vocab.length; i++) {
        if (vocab[i].charCodeAt() >= 13312) {
            filter_vocab.add(vocab[i]);
        }
    }
    return filter_vocab;
}

// Takes list of hanzi entered and compares it against list of 
// characters stored in the filter_vocab set.
// Deletes any matching hanzi.
// Calls print_results() to print the non-matching chars to screen
function add_hanzi() {
    hanzi = document.getElementById("hanzi").value;
    for (let i = 0; i < hanzi.length; i++) {
        if (filter_vocab.has(hanzi[i])) {
                filter_vocab.delete(hanzi[i])
            }
    }
    print_results();
}

function print_results() {
    const list = Array.from(filter_vocab);
    for (let i = 0; i < list.length; i++) {
        para = document.createElement("p");
        para.innerText = list[i];
        document.body.appendChild(para);
    }
}
