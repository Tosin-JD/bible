const searchInput = document.getElementById('search');
const bibleDiv = document.getElementById('bible');

const performSearch = (data) => {
    bibleDiv.innerHTML = '';
    const lowercaseQuery = searchInput.value.toLowerCase();

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
    } else if (lowercaseQuery.includes(':')) {
        for (let i = 0; i < data.length; i++) {
            const name = data[i].name.toLowerCase(); 
            const verse = data[i].verse.toLowerCase();

            if (name === lowercaseQuery || verse === lowercaseQuery) {
                const cleanedName = data[i].name.replace(/:/g, '-').replace(/\s/g, '').toLowerCase();
                const pElement = document.createElement('p');
                pElement.classList.add("verse");
                pElement.id = cleanedName;
                pElement.innerHTML = `<span class="verse-number">${name.toUpperCase()}</span> ${data[i].verse}`;

                bibleDiv.appendChild(pElement);
            }
        }
    } else if (!/\d/.test(lowercaseQuery)){
        let cleanedLowercaseQuery = lowercaseQuery.replace(/\s{2,}/g, ' ');
        // Clean the query by replacing double spaces with a single space
        cleanedLowercaseQuery = lowercaseQuery.replace(/\s{2,}/g, ' ').trim();

        // Split the cleaned query into individual words
        const searchWords = cleanedLowercaseQuery.split(' ');

        // Loop through the data to search for the query
        for (let i = 0; i < data.length; i++) {
            const name = data[i].name.toLowerCase(); 
            const verse = data[i].verse.toLowerCase();

            // Check if all words in the search query are present in either the name or the verse
            const isMatchInName = searchWords.every(word => name.includes(word));
            const isMatchInVerse = searchWords.every(word => verse.includes(word));

            if (isMatchInName || isMatchInVerse) {
                const cleanedName = data[i].name.replace(/:/g, '-').replace(/\s/g, '').toLowerCase();
                const pElement = document.createElement('p');
                pElement.classList.add("verse");
                pElement.id = cleanedName;
                pElement.innerHTML = `<span class="verse-number">${name.toUpperCase()}</span> ${data[i].verse}`;

                // Append the result to the bibleDiv
                bibleDiv.appendChild(pElement);
            }
        }
    } else{
        const lowercaseQueryWithColon = ensureEndsWithColon(lowercaseQuery);
        for (let i = 0; i < data.length; i++) {
            const name = data[i].name.toLowerCase(); 
            const verse = data[i].verse.toLowerCase();

            if (name.includes(lowercaseQueryWithColon) || verse.includes(lowercaseQueryWithColon)) {
                const cleanedName = data[i].name.replace(/:/g, '-').replace(/\s/g, '').toLowerCase();
                const pElement = document.createElement('p');
                pElement.classList.add("verse");
                pElement.id = cleanedName;
                pElement.innerHTML = `<span class="verse-number">${name.toUpperCase()}</span> ${data[i].verse}`;

                bibleDiv.appendChild(pElement);
            }
        }
    }
};