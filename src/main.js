import './style.css'

// Logic to toggle between Note templates
document.getElementById('btn-template').addEventListener('click', () => {
  const page = document.getElementById('active-page');
  if (page.classList.contains('template-lined')) {
    page.classList.remove('template-lined');
    page.classList.add('template-grid');
  } else if (page.classList.contains('template-grid')) {
    page.classList.remove('template-grid');
    // plain
  } else {
    page.classList.add('template-lined');
  }
});
