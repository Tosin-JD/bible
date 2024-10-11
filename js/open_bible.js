function fetchBibleData(apiUrl) {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data; // Return the parsed JSON data
        })
        .catch(error => {
            console.error('Error fetching the API:', error);
            throw error; // Rethrow the error for further handling if needed
        });
}

// Usage example
document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = '../bibles/kjv/kjv.json'; 

    fetchBibleData(apiUrl)
        .then(data => {
            const bibleDiv = document.getElementById('bible');
            bibleDiv.innerHTML = ''; 

            let limit = 31;

            for (let i = 0; i < limit; i++) {
                const item = data[i];
                const verseElement = document.createElement('p');
                verseElement.classList.add("verse");
                verseElement.innerHTML = `<span class="verse-number">${item.ari.split(':').pop()}</span> ${item.verse}`;
                bibleDiv.appendChild(verseElement);
            }
            // Attach event listeners
            const searchButton = document.getElementById('search-btn');
            const searchInput = document.getElementById('search');
            searchButton.addEventListener("click", () => {
                performSearch(data);
            });
            searchInput.addEventListener("keydown", (event) => {
                if (event.key === 'Enter') {
                    performSearch(data);
                }
            });
        })
        .catch(error => {
            console.error('Failed to load the Bible data:', error);
        });
});


