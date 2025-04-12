// Get DOM elements
const pinInput = document.getElementById('pin');
const checkButton = document.getElementById('check');
const resultView = document.getElementById('result');
const sha256HashView = document.getElementById('sha256-hash');

// Generate a random 3-digit number and its SHA256 hash
function generateRandomHash() {
    const randomNumber = Math.floor(Math.random() * 900) + 100; // Generates number between 100-999
    return sha256(randomNumber.toString()).then(hash => {
        sha256HashView.innerHTML = hash;
        return randomNumber;
    });
}

// SHA256 hash function
async function sha256(message) {
    // Encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
    // Hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // Convert to hex string
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Check if the input matches the hash
async function checkAnswer() {
    const pin = pinInput.value;

    if (pin.length !== 3) {
        resultView.innerHTML = '💡 Please enter exactly 3 digits';
        resultView.classList.remove('hidden');
        return;
    }

    const hashedPin = await sha256(pin);

    if (hashedPin === sha256HashView.innerHTML) {
        resultView.innerHTML = '🎉 Success! You correctly deciphered the SHA256 hash!';
        resultView.classList.add('success');
    } else {
        resultView.innerHTML = '❌ Not quite right. Try another 3-digit number!';
        resultView.classList.remove('success');
    }
    resultView.classList.remove('hidden');
}

// Event listeners
checkButton.addEventListener('click', checkAnswer);
pinInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Initialize the exercise
generateRandomHash(); 