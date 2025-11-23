export async function addition(app) {
    app.innerHTML = `
        <div>
        <h2>Addition</h2>
        <h5>supports float numbers</h5>
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

        function charToDigit(char) {
            if (char >= '0' && char <= '9') return parseInt(char);
            return char.toUpperCase().charCodeAt(0) - 55;
        }

        function digitToChar(digit) {
            if (digit < 10) return digit.toString();
            return String.fromCharCode(55 + digit);
        }

        function arrayToBaseString(arr) {
            return arr.map(digitToChar).join("");
        }

        function splitNumber(str) {
            if (!str.includes(".")) str += ".0";
            let [intPart, fracPart] = str.split(".");
            return {
                int: intPart.split("").map(charToDigit),
                frac: fracPart.split("").map(charToDigit)
            };
        }

        function alignFractions(a, b) {
            let diff = a.length - b.length;
            if (diff > 0) b.push(...Array(diff).fill(0));
            if (diff < 0) a.push(...Array(-diff).fill(0));
            return [a, b];
        }

        // addition
        function addArrays(a, b, base) {
            let carry = 0;
            let result = [];
            let i = a.length - 1;
            let j = b.length - 1;

            while (i >= 0 || j >= 0 || carry) {
                let x = a[i] ?? 0;
                let y = b[j] ?? 0;
                let sum = x + y + carry;
                carry = Math.floor(sum / base);
                sum = sum % base;
                result.push(sum);
                i--; j--;
            }

            return result.reverse();
        }

        let numX = splitNumber(x);
        let numY = splitNumber(y);

        [numX.frac, numY.frac] = alignFractions(numX.frac, numY.frac);


        let fracSum = addArrays(numX.frac, numY.frac, numSystem);

        let carryFromFrac = 0;
        if (fracSum.length > numX.frac.length) {
            carryFromFrac = fracSum.shift();
        }

        let intSum = addArrays(numX.int, numY.int, numSystem);
        if (carryFromFrac) intSum = addArrays(intSum, [carryFromFrac], numSystem);

        let finalResult = arrayToBaseString(intSum) + "." + arrayToBaseString(fracSum);

        if (finalResult === "" || finalResult.includes("NaN")) {
            console.log("Oups! You did something wrong! Try it again.");
            document.getElementById("result").textContent = "Oups! You did something wrong! Try it again.";
        } else {
            console.log(finalResult);
            document.getElementById("result").textContent = `${finalResult}`;
            document.getElementById("details_text").innerHTML =
                `${x} + ${y} = ${finalResult}<br>` +
                `${parseInt(x, numSystem)} + ${parseInt(y, numSystem)} = ${parseInt(intSum.join(""), numSystem)}`;
        }
    }
}