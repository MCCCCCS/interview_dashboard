document.querySelector('.toggle-btn').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('active');
});

// Optional: Add active class to clicked nav item
document.querySelectorAll('.sidebar nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('.sidebar nav ul li a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});