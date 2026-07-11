// Simple interactivity: mobile menu toggle, smooth scroll, and basic announcement loader
document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  menuBtn.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.background = 'rgba(7,17,31,.95)';
      navLinks.style.position = 'absolute';
      navLinks.style.right = '16px';
      navLinks.style.top = '64px';
      navLinks.style.padding = '12px';
      navLinks.style.borderRadius = '10px';
      navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,.45)';
    }
  });

  // Smooth scroll fallback for older browsers
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // allow default for external links
      if (this.getAttribute('href') === '#') return;
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // close mobile menu if open
      if (window.innerWidth < 920) {
        navLinks.style.display = 'none';
      }
    });
  });

  // Example: load announcements dynamically (replace with fetch from server if available)
  const announcements = [
    { title: 'Orientation: New Semester Activities', meta: 'Orientation on July 20, 2026. Register now.' },
    { title: 'Hackathon 2026 Registration Open', meta: 'Register teams of up to 4. Prizes for top 3.' },
    { title: 'Lab Safety Workshop', meta: 'Mandatory for first-year project teams.' }
  ];

  const announcementList = document.getElementById('announcementList');
  if (announcementList) {
    // create markup
    const ul = document.createElement('div');
    ul.style.display = 'grid';
    ul.style.gap = '10px';
    announcements.forEach(a => {
      const item = document.createElement('div');
      item.className = 'announcement';
      item.innerHTML = `<div><strong>${a.title}</strong><p class="meta">${a.meta}</p></div>
                        <div><a class="btn btn-outline" href="#announcements">View</a></div>`;
      ul.appendChild(item);
    });
    // replace existing content
    announcementList.innerHTML = '';
    announcementList.appendChild(ul);
  }
});