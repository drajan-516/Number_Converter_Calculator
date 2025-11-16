export async function converter(app){

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
        
        <div id="codeConverter">
            <h2>Code Converter</h2>
            <div>
                <select id="numSystem_select">
                <option>Choose System</option>
                <option value="2">Binary (2)</option>
                <option value="3">Ternary (3)</option>
                <option value="4">Quaternary (4)</option>
                <option value="10">Decimal (10)</option>
                <option value="16">Hexadecimal (16)</option>
                </select>
            </div>
            <input id="num" placeholder="Enter number..." /> 
            <button id="resultConvertBtn">Result</button> <p id="resultConvert"></p>
            <h3>Direct</h3>
                <div id="directCode"></div>
            <h3>Inverse</h3>
                <div id="inverseCode"></div>
            <h3>Complement</h3>
                <div id="complementCode"></div>
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

    let convertBtn = document.getElementById("resultConvertBtn")
    convertBtn.onclick = function convertCode() {
        let num = document.getElementById("num").value;
        let numbersArr = num.toString().replace("-", "").split('').map(element =>
            Number.isNaN(Number(element)) ? "." : Number(element)
        );
        console.log(numbersArr);
        let numSystem = parseInt(document.getElementById("numSystem_select").value);

        function directCode() {
            let directCodeResult;

            if (num >= 0) {
                directCodeResult = "0." + num;
            } else {
                directCodeResult = `${numSystem-1}.` + Math.abs(num);
            }
            console.log(directCodeResult)
            document.getElementById("directCode").textContent = directCodeResult;
        }


        function inverseCode() {
            let inverseCodeResult;
            let numArray = numbersArr.map(element =>
                Number.isNaN(Number(element))
                    ? "."
                    : (numSystem-1) - Number(element)
            );
            console.log(numArray);

            if (num >= 0) {
                inverseCodeResult = "00." + numbersArr.join("");
            } else {
                inverseCodeResult = `${numSystem-1}${numSystem-1}.` + numArray.join("");
            }
            console.log(inverseCodeResult)
            document.getElementById("inverseCode").textContent = inverseCodeResult;
        }

        function complementCode() {
            let complementCodeResult;
            let numArray = numbersArr.map(element =>
                Number.isNaN(Number(element))
                    ? "."
                    : (numSystem-1) - Number(element)
            );

            function incrementNumber(numArray, numSystem) {
                let i = numArray.length - 1;
                numArray[i]++;

                while (i >= 0 && numArray[i] >= numSystem) {
                    numArray[i] = 0;
                    i--;
                    if (i >= 0) numArray[i]++;
                }

                return numArray;
            }

            if (num >= 0) {
                complementCodeResult = "00." + numbersArr.join("");
            } else {
                let newNumPlus = incrementNumber(numArray, numSystem);
                complementCodeResult = `${numSystem - 1}${numSystem - 1}.` + newNumPlus.join("");
            }

            console.log(complementCodeResult)
            document.getElementById("complementCode").textContent = complementCodeResult;
        }

        directCode();
        inverseCode();
        complementCode()
    }
}

