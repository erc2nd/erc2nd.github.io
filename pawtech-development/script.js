// const { encode } = require("tar/lib/large-numbers");

// form.onsubmit = validate;

// function validate(e) {
//     errorList.textContent = "";
//     for (let i = 0; i < formItems.length; i++) {
//         const testItem = formItems[i];
//         if (testItem.input.value === "") {
//             errorField.style.left = "360px";
//             createLink(testItem);
//         }
//     }

//     if (errorList.hasChildNodes()) {
//         e.preventDefault();
//     }
// }


const inputs = document.querySelectorAll("input, select, textarea");

inputs.forEach(input => {
    input.addEventListener(
        "invalid",
        (e) => {
            input.classList.add("error");
        },
        false
    );
});
