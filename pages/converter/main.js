export async function mainPage(app){

    app.innerHTML = `
        <h2>Converter</h2>
        <header class="main_menu">
        </header>
        <div>
            <div>
                <select id="numSystem_select_1">
                <option>Choose System</option>
                <option value="2">Binary (2)</option>
                <option value="3">Ternary (3)</option>
                <option value="4">Quaternary (4)</option>
                <option value="10">Decimal (10)</option>
                <option value="16">Hexadecimal (16)</option>
                </select>
                <p>Your number is:</p><input id="x_number" placeholder="Enter number..." />
            </div>
            <div>
                <select id="numSystem_select_2">
                <option>Choose System</option>
                <option value="2">Binary (2)</option>
                <option value="3">Ternary (3)</option>
                <option value="4">Quaternary (4)</option>
                <option value="10">Decimal (10)</option>
                <option value="16">Hexadecimal (16)</option>
                </select>
                <button id="resultBtn">Result</button> <p id="result"></p>
            </div>
        </div>
    `;

    let btn = document.getElementById("resultBtn")
    btn.onclick = function convert() {
        let x = document.getElementById("x_number").value;
        let fromNumS = parseInt(document.getElementById("numSystem_select_1").value);
        let toNumS = parseInt(document.getElementById("numSystem_select_2").value);



        let result = parseInt(x, fromNumS).toString(toNumS);

        if (result === "NaN") {
            console.log("Oups! You did something wrong! Try it again.");
            document.getElementById("result").textContent = "Oups! You did something wrong! Try it again.";
        } else {
            console.log(result);
            document.getElementById("result").textContent = result;
        }

    }
}

