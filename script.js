document.addEventListener('DOMContentLoaded', function() {
    // your code goes here
 


const form = document.querySelector('#url-form');
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    const url = document.querySelector('#url-input').value;
    analyzePage(url);
}

function analyzePage(url) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const htmlDoc = xhr.response;
                const title = htmlDoc.querySelector('title').textContent;
                const description = htmlDoc.querySelector('meta[name="description"]').getAttribute('content');
                const keywords = htmlDoc.querySelector('meta[name="keywords"]').getAttribute('content');
                const report = `Title: ${title}\nDescription: ${description}\nKeywords: ${keywords}`;
                showReport(report);
            } else {
                console.log(xhr.status);
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.responseType = 'document';
    xhr.send();
}

function showReport(report) {
    const reportContainer = document.querySelector('#result-report');
    reportContainer.innerHTML = report;
}
});