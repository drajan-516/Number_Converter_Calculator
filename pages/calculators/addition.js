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
        //let result = (indexX + indexY).toString(numSystem).toUpperCase()

        //arr "." base
        function parseNewArray(str, base) {
            str = str.replace("-", "");

            return str.split("").map(element => {
                if (element === ".") return ".";

                let digit = parseInt(element, base);

                if (Number.isNaN(digit)) return console.log("Oups! You did something wrong! Try it again.");
                return digit;
            })
        }

        let numArrX = parseNewArray(x, numSystem);
        let numArrY = parseNewArray(y, numSystem);

        console.log(numArrX);
        console.log(numArrY)

        //for dots
        let dotX = numArrX.indexOf("."); let dotY = numArrY.indexOf(".");

        let numX = {
            int:  numArrX.slice(0, dotX),
            frac: numArrX.slice(dotX + 1)
        };

        let numY = {
            int:  numArrY.slice(0, dotY),
            frac: numArrY.slice(dotY + 1)
        };

        function alignFractions(a, b) {
            let diff = a.length - b.length;

            if (diff > 0) {
                b.push(...Array(Math.abs(diff)).fill(0));
            } else if (diff < 0) {
                a.push(...Array(Math.abs(diff)).fill(0));
            }

            return [a, b];
        }



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
                i--;
                j--;
            }

            return result.reverse();
        }

        [numX.frac, numY.frac] = alignFractions(numX.frac, numY.frac);
        let fracSum = addArrays(numX.frac, numY.frac, numSystem);

        let carryFromFrac = 0;
        if (fracSum.length > numX.frac.length) {
            carryFromFrac = fracSum[0];
            fracSum.shift();
        }

        let intSum = addArrays(numX.int, numY.int, numSystem);
        if (carryFromFrac > 0) {
            intSum = addArrays(intSum, [carryFromFrac], numSystem);
        }

        let result = intSum.join("") + "." + fracSum.join("");


        if (result === "" || result.includes("NaN")) {
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