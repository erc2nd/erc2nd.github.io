// Get current number of articles in each language
// Will be used to set RNG max
let num_en
let num_ja
let num_zh

async function countSetup() {
    num_en = await getArticleCount('en');
    num_ja = await getArticleCount('ja');
    num_zh = await getArticleCount('zh');
}

countSetup();


async function getArticleCount(lang) {
    const url = `https://${lang}.wikipedia.org/w/api.php`;

    const params = new URLSearchParams({
        action: "query",
        meta: "siteinfo",
        siprop: "statistics",
        format: "json",
        origin: "*"
    });

    try {
        const response = await fetch(`${url}?${params}`, {
            headers: {
                "Accept": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error(`Fetch error status: ${response.status}`);
        }

        const data = await response.json();
        const count = data.query.statistics.articles;

        console.log(`${lang} Wikipedia has ${count} articles.`);

        return count;

    } catch (error) {
        console.error("Fetch error: ", error);
        return null;
    }
}

let mainLang;
let mainLangChosen = false;
let programRuns = 0;

// Set up all our event listeners so all buttons function on page
document.querySelector('.lang-header-english').addEventListener('click', () => {
    document.querySelector('.en-text').classList.toggle("hidden");
})

document.querySelector('.ja-zh').addEventListener('click', () => {
    mainLang = ['ja', 'zh', num_ja];
    mainLangChosen = true;
    resetText();
    progress(0);
    programRuns = 0;
    document.querySelector('.head').innerText = 'JAPANESE';
    document.querySelector('.qlang').innerText = 'CHINESE';
})
document.querySelector('.zh-ja').addEventListener('click', () => {
    mainLang = ['zh', 'ja', num_zh];
    mainLangChosen = true;
    resetText();
    progress(0);
    programRuns = 0;
    document.querySelector('.head').innerText = 'CHINESE';
    document.querySelector('.qlang').innerText = 'JAPANESE';
})

document.getElementById('findWord').addEventListener('click', () => {
    if (mainLangChosen === true) {
        programRuns = 0;
        runProgram();
    } else {
        document.querySelector('.choose').classList.toggle("pulse");
        return;
    }
})

let answered = false;

function resetText() {
    document.querySelector('.q1').style.backgroundColor = "white";
    document.querySelector('.q2').style.backgroundColor = "white";
    document.querySelector('.q3').style.backgroundColor = "white";
    document.querySelector('.en-text').innerText = '???';
    document.querySelector('.main-text').innerText = '???';
    document.querySelector('.q1').innerText = '???';
    document.querySelector('.q2').innerText = '???';
    document.querySelector('.q3').innerText = '???';
}


// TODO:    Find out more wikiAPI errors that cause complete failure
//          and make a way to deal with that
async function runProgram() {
    answered = false;
    resetText();

    // This fills up the loading bar
    if (programRuns < 80) {
        programRuns++;
    }
    progress(programRuns);

    // Call to find one Wiki article in all 3 languages (en, ja, zh)
    let result = await langCheck()
        .then(data => {
            if (data) {
                return data;
            } else {
                console.log("Running langCheck() again.")
                runProgram();
            }
        }).then(data => {
            if (data) {
                buildQuestion(data)
            } else {}
        })
    console.log("RESULT: " + result)
}

// Creates a random number in the range of valid Wiki page IDs
// and returns the title of the related page
async function beginSearch(pageLang, maxId, iswrong) {
    let randomId = Math.floor(Math.random() * maxId);

    let title = await getWikiPageById(pageLang, randomId, iswrong)
        .then(data => {
            if (data) {
                let fixdata = data.replace(/"/g, '');
                return fixdata;
            } else {
                beginSearch(pageLang, maxId, iswrong);
            }
        });
    return title;
}

async function getWikiPageById(pageLang, pageId, iswrong) {
    let findTitle;
    const url = `https://${pageLang}.wikipedia.org/w/api.php?action=query&prop=extracts&pageids=${pageId}&format=json&origin=*`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // This section throws out unusuable Wiki pages (e.g. "Talk:" pages)
        let regex;

        if (iswrong) {
            regex = /[:\d\w]/g;
        } else {
            regex = /[:\d]/g;
        }

        if (regex.test(data.query.pages[pageId].title)) {
            throw new Error("Colon found.")
        } else if (data.query && data.query.pages && data.query.pages[pageId]) {
            findTitle = JSON.stringify(data.query.pages[pageId].title);
            findTitle = findTitle.replace(/\s+/g, '_');
            return findTitle;
        } else {
            throw new Error("Page not found");
        }
    } catch (error) {
        return null;
    }
}

async function langCheck() {

    try {
        // FORMAT: matchedTitles[English, Japanese, Chinese]
        let matchedTitles = [];
        let urlTitle = await beginSearch('en', num_en, false);

        console.log("URL-TITLE: " + urlTitle)
        console.log("Type of URL-TITLE: " + typeof urlTitle)

        let url = "https://en.wikipedia.org/w/rest.php/v1/page/" + urlTitle + "/links/language";
        let headers = {
            'Api-User-Agent': 'MediaWiki REST API docs examples/0.1 (https://www.mediawiki.org/wiki/API_talk:REST_API)'
        }

        const rsp = await fetch(url, headers);
        const data = await rsp.json();

        progress(20);

        // Used to throw out wiki titles that would be too easy
        // (e.g. an article about the M1 Garand, has "M1"
        // in all titles, irrespective of language)
        const regex = /[:\d\w]/g;

        let lang_count = 0
        let ja_title;
        let zh_title;
        data.forEach((e) => {
            console.log(e)
            if (e.code == 'ja') {
                console.log('Japanese present');
                ja_title = e.title;
                lang_count++;
            } else if (e.code == 'zh') {
                console.log('Chinese present');
                zh_title = e.title;
                lang_count++;
            }
        })
        progress(30);
        console.log("Lang count: " + lang_count)
        if (lang_count < 2) {
            throw new Error("Both languages not present");
        } else if (ja_title === zh_title) {
            throw new Error("Names match");
        } else if (regex.test(ja_title) || regex.test(zh_title)) {
            throw new Error("Invalid chars in string.")
        } else {
            matchedTitles.push(urlTitle);
            matchedTitles.push(ja_title);
            matchedTitles.push(zh_title);
            console.log('SUCCESS! JA & ZH present')
        }

        return matchedTitles;
    } catch (error) {
        console.error("Language match failure:", error)
        return null;
    }
}

async function buildQuestion(matchedTitles) {
    let qwordArray = [];
    let wrongWord = undefined;
    let english = matchedTitles[0];

    let headword;
    let qword;

    if (mainLang[0] == 'ja') {
        headword = matchedTitles[1];
        qword = matchedTitles[2];
    } else {
        headword = matchedTitles[2];
        qword = matchedTitles[1];
    }

    progress(80);

    // Grabs two random words to complete the multiple choice
    while (wrongWord === undefined) {
        wrongWord = await beginSearch(mainLang[1], mainLang[2], true)
            .then(data => {
                if (data) {
                    return data;
                } else {
                    beginSearch(mainLang[1], mainLang[2], true);
                }
            });
    }

    qwordArray.push(wrongWord);
    wrongWord = undefined;
    progress(90);

    while (wrongWord === undefined) {
        wrongWord = await beginSearch(mainLang[1], mainLang[2], true)
            .then(data => {
                if (data) {
                    return data;
                } else {
                    beginSearch(mainLang[1], mainLang[2], true)
                }
            });
    }

    qwordArray.push(wrongWord);
    qwordArray.push(qword);

    qwordArray = mix(qwordArray);
    console.log(qwordArray)

    document.querySelector('.en-text').innerHTML = `<a href="https://en.wikipedia.org/wiki/${english}" target="_blank">${english}</a>`;
    document.querySelector('.main-text').innerText = headword;

    document.querySelector('.q1').innerText = qwordArray[0]
    document.querySelector('.q2').innerText = qwordArray[1]
    document.querySelector('.q3').innerText = qwordArray[2]

    document.querySelector('.q1').addEventListener('click', (e) => {
        checkAnswer(e.target, qword)
    })
    document.querySelector('.q2').addEventListener('click', (e) => {
        checkAnswer(e.target, qword)
    })
    document.querySelector('.q3').addEventListener('click', (e) => {
        checkAnswer(e.target, qword)
    })
    progress(100);
}

function checkAnswer(ans, qword) {
    console.log("Inner Text: " + ans.innerText);
    console.log("qword: " + qword);
    if (ans.innerText == qword && answered == false) {
        ans.style.backgroundColor = 'green';
    } else if (answered == false) {
        ans.style.backgroundColor = "red";
        if (document.querySelector('.q1').innerText == qword) {
            document.querySelector('.q1').style.backgroundColor = "yellow";
        } else if (document.querySelector('.q2').innerText == qword) {
            document.querySelector('.q2').style.backgroundColor = "yellow";
        } else if (document.querySelector('.q3').innerText == qword) {
            document.querySelector('.q3').style.backgroundColor = "yellow";
        }
    }
    answered = true;

}

function progress(cur) {
    document.querySelector(".progress-fill").style.width = `${cur}%`;
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
