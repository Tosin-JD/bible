// Your existing variables
var bible_translation = "../bibles/kjv/kjv.json";

var allBibleTranslations = {
    crtb: '../bibles/crtb/crtb.json',
    esv: '../bibles/esv/esv.json',
    kjv: '../bibles/kjv/kjv.json',
    nkjv: '../bibles/nkjv/nkjv.json',
    niv: '../bibles/niv/niv.json',
    segond: '../bibles/segond_french/segond_1910.json',
    spanish: '../bibles/es_rvr/es_rvr.json',
};

// Set the current_bible variable to null
var current_bible = localStorage.getItem('selectedBible') || allBibleTranslations.kjv;



document.getElementById('crtb-button').addEventListener('click', () => {
    current_bible = allBibleTranslations.crtb; // Select NKJV translation
    localStorage.setItem('selectedBible', current_bible); // Save in localStorage
    get_data();
});

document.getElementById('esv-button').addEventListener('click', () => {
    current_bible = allBibleTranslations.esv; // Select NKJV translation
    localStorage.setItem('selectedBible', current_bible); // Save in localStorage
    get_data();
});

// Event listener for the NKJV button
document.getElementById('kjv-button').addEventListener('click', () => {
    current_bible = allBibleTranslations.kjv; // Select NKJV translation
    localStorage.setItem('selectedBible', current_bible); // Save in localStorage
    get_data();
});


// Event listener for the NKJV button
document.getElementById('nkjv-button').addEventListener('click', () => {
    current_bible = allBibleTranslations.nkjv; // Select NKJV translation
    localStorage.setItem('selectedBible', current_bible); // Save in localStorage
    get_data();
});

// Event listener for the NKJV button
document.getElementById('niv-button').addEventListener('click', () => {
    current_bible = allBibleTranslations.niv; // Select NKJV translation
    localStorage.setItem('selectedBible', current_bible); // Save in localStorage
    get_data();
});

document.getElementById('spanish-button').addEventListener('click', () => {
    current_bible = allBibleTranslations.spanish; // Select NKJV translation
    localStorage.setItem('selectedBible', current_bible); // Save in localStorage
    get_data();
});



document.getElementById('segond-button').addEventListener('click', () => {
    current_bible = allBibleTranslations.segond; // Select NKJV translation
    localStorage.setItem('selectedBible', current_bible); // Save in localStorage
    get_data();
});

// Optional: Retrieve the saved translation when the page loads
window.onload = () => {
    const savedBible = localStorage.getItem('selectedBible');
    if (savedBible) {
        current_bible = savedBible; // Restore the selected translation
    }
};

