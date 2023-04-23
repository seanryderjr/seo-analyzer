const form = document.querySelector('#url-form');
const input = document.querySelector('#url-input');
const result = document.querySelector('#result-report');
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Replace with your own proxy server URL

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const url = input.value;
  
  // Fetch the webpage data through the proxy server
  const response = await fetch(proxyUrl + url);
  const data = await response.text();
  
  // Calculate the number of headings, links, and images on the page
  const headings = data.match(/<h\d>/gi)?.length ?? 0;
  const links = data.match(/<a/gi)?.length ?? 0;
  const images = data.match(/<img/gi)?.length ?? 0;
  
  // Display the SEO information to the user
  const parser = new DOMParser();
const doc = parser.parseFromString(data.contents, 'text/html');
const title = doc.querySelector('title')?.innerText ?? '';
const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';

// Display the SEO information to the user
result.innerHTML = `
  <h2>SEO Information for ${url}</h2>
  <p>Page Title: ${title}</p>
  <p>Meta Description: ${metaDesc}</p>
  <p>Number of Headings: ${headings}</p>
  <p>Number of Links: ${links}</p>
  <p>Number of Images: ${images}</p>
  `;
});

// Calculate the page title and meta description
