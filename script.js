const quoteContainer  = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote() {
    showLoadingSpinner();
    // Use a proxy url to make an API call to avoid 429 errors
    const proxyUrl = 'https://ancient-river-64905.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // Reduce font size for longer quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;

        // If author name is blank, display 'Unknown Author'
        if (data.quoteAuthor === "") {
            authorText.innerText = "Unknown Author";
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Stop loader, show quote
        removeLoadingSpinner();
    } catch (error) {
        console.log(error)
        getQuote(); // if it encounters an issue at getting a quote, request for another one
    }

}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuote();