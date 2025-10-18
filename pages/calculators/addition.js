export async function addition(app) {
    app.innerHTML = `
        <div>
            <div>
                <select id="numSystem_select">
                <option>Choose System</option>
                <option value="2">Binary (2)</option>
                <option value="3">Ternary (3)</option>
                <option value="4">Quaternary (4)</option>
                <option value="10">Decimal (10)</option>
                <option value="16">Hexadecimal (16)</option>
                </select>
                <input id="x_number" placeholder="Enter number..." />
                <input id="y_number" placeholder="Enter number..." />
            </div>
            <button id="resultBtn">Result</button> <p id="result"></p>
            
            <button class="accordion">More about result...</button>
            <div class="details">
                <p id="details_text"></p>
            </div>
        </div>
    `;

    let btn = document.getElementById("resultBtn")
    btn.onclick = function convert() {
        let x = document.getElementById("x_number").value;
        let y = document.getElementById("y_number").value;
        let numSystem = parseInt(document.getElementById("numSystem_select").value);

        let indexX = parseInt(x, numSystem);
        let indexY = parseInt(y, numSystem);

        let result = (indexX + indexY).toString(numSystem).toUpperCase()

        if (result === "NaN") {
            console.log("Oups! You did something wrong! Try it again.");
            document.getElementById("result").textContent = "Oups! You did something wrong! Try it again.";
        } else {
            console.log(result);
            document.getElementById("result").textContent = result;
            document.getElementById("details_text").innerHTML =
                `${x} + ${y} = ${result}<br>` +
                `${indexX} + ${indexY} = ${parseInt(result, numSystem).toString(10)}`
        }
    }

}