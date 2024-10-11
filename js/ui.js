const burger = document.getElementById('burger');
const sidebar = document.getElementById('left-sidebar');


burger.addEventListener('click', (event) => {
    sidebar.classList.toggle('active');
    event.stopPropagation(); // Prevent event from bubbling up to the document
});

// Remove active class if clicking anywhere outside the sidebar
document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && !burger.contains(event.target)) {
        sidebar.classList.remove('active');
    }
});