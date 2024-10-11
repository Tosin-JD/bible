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
            const searchButton = document.getElementById('search-btn');
            searchButton.addEventListener("click", ()=>{
                bibleDiv.innerHTML = '';
                const lowercaseQuery = document.getElementById('search').value.toLowerCase();

                if (lowercaseQuery.includes('-')) {
                    const [bookAndChapter, verseRange] = lowercaseQuery.split(':');
                    const [book, chapter] = bookAndChapter.split(' ');
                    const [startVerse, endVerse] = verseRange.split('-').map(Number);
                
                    for (let i = startVerse; i <= endVerse; i++) {
                    const verseName = `${book} ${chapter}:${i}`;
                    const matchingVerse = data.find(data => data.name.toLowerCase() === verseName.toLowerCase());
                
                    if (matchingVerse) {
                        const pElement = document.createElement('p');
                        pElement.classList.add("verse");
                        const cleanedName = matchingVerse.name.replace(/:/g, '-').replace(/\s/g, '').toLowerCase();
                        pElement.id = cleanedName;
                        pElement.innerHTML = `<span class="verse-number">${matchingVerse.name.toUpperCase()}</span> ${matchingVerse.verse}`;
                        bibleDiv.appendChild(pElement);
                    }
                    }
                }else if (lowercaseQuery.includes(':')) {
                    for (let i = 0; i < data.length; i++) {
                        const name = data[i].name.toLowerCase(); 
                        const verse = data[i].verse.toLowerCase();
                  
                        if (name === lowercaseQuery || verse === lowercaseQuery) {
                          const cleanedName = data[i].name.replace(/:/g, '-').replace(/\s/g, '').toLowerCase();
                          const ariParts = data[i].ari.split(':');
                          const middleAriPart = ariParts[2];
                  
                          const pElement = document.createElement('p');
                          pElement.classList.add("verse");
                          pElement.id = cleanedName;
                          pElement.innerHTML = `<span class="verse-number">${name.toUpperCase()}</span> ${data[i].verse}`;

                          bibleDiv.appendChild(pElement);
                        }
                    }
                }else{
                    lowercaseQueryWithColon = ensureEndsWithColon(lowercaseQuery);
                    for (let i = 0; i < data.length; i++) {
                        const name = data[i].name.toLowerCase(); 
                        const verse = data[i].verse.toLowerCase();
                  
                        if (name.includes(lowercaseQueryWithColon) || verse.includes(lowercaseQueryWithColon)) {
                          const cleanedName = data[i].name.replace(/:/g, '-').replace(/\s/g, '').toLowerCase();
                          const ariParts = data[i].ari.split(':');
                          const middleAriPart = ariParts[2];
                  
                          const pElement = document.createElement('p');
                          pElement.classList.add("verse");
                          pElement.id = cleanedName;
                          pElement.innerHTML = `<span class="verse-number">${name.toUpperCase()}</span> ${data[i].verse}`;
                        //   console.log(pElement);
                          bibleDiv.appendChild(pElement);
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Failed to load the Bible data:', error);
        });
});


