const quoteContainer = document.getElementById('quote_container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const quoteTwitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new_quote')
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Getting quote from API
async function getQuote() {
    showLoadingSpinner();
    const apiUrl ='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const resp = await fetch(apiUrl);
        const data = await resp.json();
        //If Author is blank, add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor;
        };
        //Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long_quote');
        } else {
            quoteText.classList.remove('long_quote');
        }
        quoteText.innerText = data.quoteText;
        removeLoadingSpinner();
    } catch (error) {
       getQuote();
    }
}

function tweetQuote () {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}

quoteTwitterBtn.addEventListener('click', tweetQuote)
newQuoteBtn.addEventListener('click', getQuote)

getQuote() 