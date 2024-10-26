function getHistory() {
    return document.getElementById("history-value").innerText;
}

function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printOutput(num) {
    if (num === "") {
        document.getElementById("output-value").innerText = num;
    } else {
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}

function getFormattedNumber(num) {
    var n = Number(num);
    return n.toLocaleString("en");
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(key)) {
        const numberButton = document.getElementById(key);
        if (numberButton) numberButton.click();
    } else {
        const operatorButton = document.getElementById(key);
        if (operatorButton) operatorButton.click();
    }

    if (key === "Backspace") {
        document.getElementById("backspace").click();
    } else if (key === "Enter") {
        document.getElementById("=").click();
    }
});

var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function() {
        if (this.id === "clear") {
            printHistory("");
            printOutput("");
        } else if (this.id === "backspace") {
            var output = reverseNumberFormat(getOutput()).toString();
            if (output) {
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        } else if (this.id === "!") {
            var f = 1;
            var output = reverseNumberFormat(getOutput()).toString();
            for (var i = 1; i <= reverseNumberFormat(output); i++) {
                f = f * i;
            }
            var result = f;
            printOutput(result);
            printHistory(output + this.id);
        } else if (this.id === "x^2") {
            var a = reverseNumberFormat(getOutput()).toString();
            var result = a * a;
            printOutput(result);
            printHistory(a + "^2");
        } else if (this.id === "x^3") {
            var b = reverseNumberFormat(getOutput()).toString();
            var result = b * b * b;
            printOutput(result);
            printHistory(b + "^3");
        } else if (this.id === "dec") {
            var p = reverseNumberFormat(getOutput()).toString();
            var result = p / 100;
            printOutput(result);
            printHistory(p + "%" + "=" + result + " in decimal");
        } else if (this.id === "per") {
            var p = reverseNumberFormat(getOutput()).toString();
            var result = p * 100;
            printOutput(result);
            printHistory(p + " in decimal" + "=" + result + "%");
        } else if (this.id === "°F") {
            var p = reverseNumberFormat(getOutput()).toString();
            var f = p * 9 / 5 + 32;
            printOutput(f);
            printHistory(p + "°C " + "= " + f + "°F");
        } else if (this.id === "°C") {
            var p = reverseNumberFormat(getOutput()).toString();
            var f = (p - 32) * 5 / 9;
            printOutput(f);
            printHistory(p + "°F " + "= " + f + "°C");
        } else if (this.id === "K") {
            var p = reverseNumberFormat(getOutput()).toString();
            var z = parseFloat(p) + 273.15;
            printOutput(z);
            printHistory(p + "°C " + "= " + z + "K");
        } else if (this.id === "1/x") {
            var p = reverseNumberFormat(getOutput()).toString();
            printOutput(1 / p);
            printHistory("Inverse of " + p + " is " + "1" + "/" + p);
        } else if (this.id === "√x") {
            var p = reverseNumberFormat(getOutput()).toString();
            var z = Math.sqrt(parseFloat(p));
            printOutput(z);
            printHistory("√" + p + " = " + z);
        } else if (this.id === "sin") {
            var p = reverseNumberFormat(getOutput()).toString();
            var z = Math.sin(p);
            printOutput(z);
            printHistory(this.id + p + " = " + z);
        } else if (this.id === "cos") {
            var p = reverseNumberFormat(getOutput()).toString();
            var z = Math.cos(p);
            printOutput(z);
            printHistory(this.id + p + " = " + z);
        } else if (this.id === "tan") {
            var p = reverseNumberFormat(getOutput()).toString();
            var z = Math.tan(p);
            printOutput(z);
            printHistory(this.id + p + " = " + z);
        } else if (this.id === "e^") {
            var p = reverseNumberFormat(getOutput()).toString();
            var z = Math.exp(p);
            printOutput(z);
            printHistory(this.id + p + " = " + z);
        } else if (this.id === "log") {
            var p = reverseNumberFormat(getOutput()).toString();
            var z = Math.log10(p);
            printOutput(z);
            printHistory(this.id + p + " = " + z);
        } else if (this.id === "ln") {
            var p = reverseNumberFormat(getOutput()).toString();
            if (p == 2) {
                var z = Math.LN2;
                printOutput(z);
                printHistory(this.id + p + " = " + z);
            } else if (p == 10) {
                var z = Math.LN10;
                printOutput(z);
                printHistory(this.id + p + " = " + z);
            } else {
                printOutput("");
                printHistory("Only 2 and 10 input accepted ");
            }
        } else if (this.id === "(-1)") {
            printOutput("-");
            printHistory(getHistory());
        } else if (this.id === "e") {
            var p = reverseNumberFormat(getOutput()).toString();
            var z = parseFloat(p) * 2.718;
            printOutput(z);
            printHistory("");
        } else if (this.id === "abs") {
            var p = reverseNumberFormat(getOutput()).toString();
            var z = Math.abs(p);
            printOutput(z);
            printHistory(this.id + "(" + p + ")" + " = " + z);
        } else if (this.id === "ceil") {
            var p = reverseNumberFormat(getOutput()).toString();
            var z = Math.ceil(p);
            printOutput(z);
            printHistory(this.id + "(" + p + ")" + " = " + z);
        } else if (this.id === "floor") {
            var p = reverseNumberFormat(getOutput()).toString();
            var z = Math.floor(p);
            printOutput(z);
            printHistory(this.id + "(" + p + ")" + " = " + z);
        } else {
            var output = getOutput();
            var history = getHistory();
            if (output === "" && history !== "") {
                if (isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length - 1);
                }
            }
            if (output !== "" || history !== "") {
                output = output === "" ? output : reverseNumberFormat(output);
                history = history + output;
                if (this.id === "=") {
                    try {
                        var result = eval(history);
                        printOutput(result);
                        printHistory("");
                    } catch (e) {
                        printOutput("Error");
                        printHistory("");
                    }
                } else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

// Toggle menu hamburger
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        const links = navLinks.querySelectorAll('a');
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Animasi ketika elemen masuk viewport
    const teamMembers = document.querySelectorAll('.team-member');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    teamMembers.forEach(member => {
        observer.observe(member);
    });

    // Transparansi header saat scroll
    function toggleHeaderTransparency() {
        const header = document.querySelector('header');
        const scrollThreshold = 50;

        if (window.scrollY > scrollThreshold) {
            header.classList.add('transparent');
        } else {
            header.classList.remove('transparent');
        }
    }

    window.addEventListener('scroll', toggleHeaderTransparency);

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const content = document.querySelectorAll('h1, h2, h3, p, a');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length > 2) {
            searchResults.innerHTML = '';
            searchResults.classList.add('active');
            
            content.forEach(element => {
                if (element.textContent.toLowerCase().includes(searchTerm)) {
                    const result = document.createElement('div');
                    result.classList.add('search-result');
                    result.textContent = element.textContent;
                    result.addEventListener('click', () => {
                        element.scrollIntoView({ behavior: 'smooth' });
                        searchResults.classList.remove('active');
                        searchInput.value = '';
                    });
                    searchResults.appendChild(result);
                }
            });
        } else {
            searchResults.classList.remove('active');
        }
    });
});

// Fungsi goToBooking
function goToBooking() {
    window.location.href = "booking.html";
}