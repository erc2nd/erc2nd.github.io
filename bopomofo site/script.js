// Simple reveal
// Type it in
// Listen and type

const zhuyin = {'ㄅ':'B','ㄆ':'P','ㄇ':'M','ㄈ':'F','ㄉ':'D','ㄊ':'T','ㄋ':'N','ㄌ':'L','ㄍ':'G','ㄎ':'K','ㄏ':'H','ㄐ':'J','ㄑ':'Q','ㄒ':'X','ㄓ':'Zh','ㄔ':'Ch','ㄕ':'Sh','ㄖ':'R','ㄗ':'Z','ㄘ':'C','ㄙ':'S','ㄚ':'A','ㄛ':'O','ㄜ':'E','ㄝ':'Eh','ㄞ':'Ai','ㄟ':'ei','ㄠ':'au','ㄡ':'ou','ㄢ':'an','ㄣ':'en','ㄤ':'ang','ㄥ':'eng','ㄦ':'er','ㄧ':'i','ㄨ':'U','ㄩ':'ü'}
const zhLen = Object.keys(zhuyin).length
const ch = document.getElementById('ch');
const en = document.getElementById('en');
const btn = document.getElementById('revealNext');

function ranInt(min,max) {
    return Math.floor(Math.random() * (max - min +1) + min)
}

ch.innerHTML = Object.keys(zhuyin)[ranInt(0,zhLen)];
en.innerHTML = zhuyin[ch.innerHTML];

function revealNext() {
    if (btn.innerHTML === 'Reveal') {
        en.style.visibility = '';
        btn.innerHTML = 'Next'
    } else {
        ch.innerHTML = Object.keys(zhuyin)[ranInt(0,zhLen)];
        en.innerHTML = zhuyin[ch.innerHTML];
        en.style.visibility = 'hidden';
        btn.innerHTML = 'Reveal'
    }
    
}