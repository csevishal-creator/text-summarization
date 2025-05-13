async function summarizeText() {
    const inputText = document.getElementById('inputText').value.trim();
    const summaryTextElement = document.getElementById('summaryText');

    if (!inputText) {
        summaryTextElement.textContent = "Please enter some text to summarize.";
        return;
    }

    summaryTextElement.textContent = "Summarizing... please wait.";

    try {
        // Make a POST request to the backend to summarize the text
        const response = await fetch('http://localhost:3000/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText })
        });

        const data = await response.json();

        // Display the summary if available
        if (data.summary) {
            summaryTextElement.textContent = data.summary;
        } else {
            summaryTextElement.textContent = "Failed to get a summary. Please try again.";
        }
    } catch (error) {
        console.error('Error:', error);
        summaryTextElement.textContent = "An error occurred. Please try again.";
    }
}
