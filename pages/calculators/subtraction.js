export async function subtraction(app) {
    app.innerHTML = `
        <div>
        <h2>Substraction</h2>
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
            
            <p>More about result:</p>
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

        let result = (indexX / indexY).toString(numSystem).toUpperCase();
        let resultNum = parseInt(result, numSystem)

        const maxLen = Math.max(
            x.length,
            indexX.toString(8).length,
            indexX.toString(2).length,
            indexX.toString(4).length,
            y.length,
            indexY.toString(8).length,
            indexY.toString(2).length,
            indexY.toString(4).length,
            resultNum.toString(10).length,
            resultNum.toString(8).length,
            resultNum.toString(2).length,
            resultNum.toString(4).length
        ) * 14;

        if (result === "NaN") {
            console.log("Oups! You did something wrong! Try it again.");
            document.getElementById("result").textContent = "Oups! You did something wrong! Try it again.";
        } else {
            console.log(result);
            document.getElementById("result").textContent = result;
            document.getElementById("details_text").innerHTML =
                `${x} : ${y} = ${result}<br>` +
                `${indexX} : ${indexY} = ${parseInt(result, numSystem).toString(10)}<br>` +

                `<div style="
                    font-size: 14px;
                    line-height: 1.5;
                    display: inline-block;
                    text-align: right;
                ">
                <div>
                    <span style="display:inline-block; width:${maxLen}px;">
                        ${x}<sub>${numSystem}</sub>
                    </span>
                     =
                    <span style="display:inline-block; width:${maxLen}px; ">
                        ${indexX.toString(8)}<sub>8</sub>
                    </span>
                    =
                    <span style="display:inline-block; width:${maxLen}px;">
                        ${indexX.toString(2)}<sub>2</sub>
                    </span>
                    =
                    <span style="display:inline-block; width:${maxLen}px;">
                        ${indexX.toString(4)}<sub>4</sub>
                    </span>
                </div>
    
                <div>
                    <span style="display:inline-block; width:${maxLen}px; border-bottom:2px solid black;">
                        ${y}<sub>${numSystem}</sub>
                    </span>
                    =
                    <span style="display:inline-block; width:${maxLen}px; border-bottom:2px solid black;">
                        ${indexY.toString(8)}<sub>8</sub>
                    </span>
                    =
                    <span style="display:inline-block; width:${maxLen}px; border-bottom:2px solid black;">
                        ${indexY.toString(2)}<sub>2</sub>
                    </span>
                    =
                    <span style="display:inline-block; width:${maxLen}px; border-bottom:2px solid black;">
                        ${indexY.toString(4)}<sub>4</sub>
                    </span>
                </div>

                <div>
                    <span style="display:inline-block; width:${maxLen}px;">
                        ${resultNum}<sub>${10}</sub>
                    </span>
                    =
                    <span style="display:inline-block; width:${maxLen}px;">
                        ${resultNum.toString(8)}<sub>8</sub>
                    </span>
                    =
                    <span style="display:inline-block; width:${maxLen}px;">
                        ${resultNum.toString(2)}<sub>2</sub>
                    </span>
                    =
                    <span style="display:inline-block; width:${maxLen}px;">
                        ${resultNum.toString(4)}<sub>4</sub>
                    </span>
                </div>
            </div>`
        }
    }
}