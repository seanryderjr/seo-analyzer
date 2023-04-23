document.addEventListener('DOMContentLoaded', function() {
    // Get references to the form and result container
    const form = document.querySelector('#url-form');
    const resultContainer = document.querySelector('#result-report');
  
    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission behavior
  
        // Get the URL entered by the user
        const url = document.querySelector('#url-input').value;
  
        // Call a function to analyze the URL and display the results
        analyzeUrl(url);
    });
  
    // Function to analyze the URL and display the results
    function analyzeUrl(url) {
        // Clear any previous results from the container
        resultContainer.innerHTML = '';
  
        // Display a loading message while analyzing the URL
        resultContainer.textContent = 'Analyzing...';
  
        // Make an API call to analyze the URL (you'll need to replace the URL with your own API endpoint)
        fetch(`https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed/${url}&key=AIzaSyA4k3TQg6QQ2GjpO8lJyPaZlbSUOsJ-35Y`)
            .then(response => response.json())
            .then(data => {
                // Display the results in the result container
                resultContainer.innerHTML = `
                <h2>Results for ${url}</h2>
                <p>Page title: ${data.title}</p>
                <p>Meta description: ${data.description}</p>
                <p>Page speed score: ${data.speedScore}</p>
              `;
            })
            .catch(error => {
                // Display an error message if there was an error analyzing the URL
                resultContainer.textContent = `Error analyzing URL: ${error.message}`;
            });
    }
  });
  