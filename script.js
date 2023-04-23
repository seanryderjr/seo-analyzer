const form = document.getElementById("url-form");
const input = document.getElementById("url-input");
const submitBtn = document.getElementById("submit");
const resultDiv = document.getElementById("result-report");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = input.value;
  if (!url) {
    resultDiv.textContent = "Please enter a valid URL";
    return;
  }

  submitBtn.disabled = true;
  resultDiv.textContent = "Analyzing...";

  fetch(url)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");

      // Extract required information from the doc object
      const title = doc.querySelector("title").textContent;

      // Check if the description meta element exists
      const descriptionMeta = doc.querySelector("meta[name='description']");
      const description = descriptionMeta ? descriptionMeta.getAttribute("content") : "";

      // Check if the keywords meta element exists
      const keywordsMeta = doc.querySelector("meta[name='keywords']");
      const keywords = keywordsMeta ? keywordsMeta.getAttribute("content") : "";

      // Update the result container with the extracted information
      resultDiv.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <p>${keywords}</p>
      `;
    })
    .catch(error => {
      resultDiv.textContent = `Error: ${error.message}`;
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
});
