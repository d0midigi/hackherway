// Dark mode toggle
    const toggle = document.getElementById('darkToggle');
toggle.addEventListener('click', () => {
  const html = document.documentElement;
  
  if (html.getAttribute('data-theme') === 'dark') {
    html.removeAttribute('data-theme');
  } else {
    html.setAttribute('data-theme', 'dark');
  }
});


    // Sample card data (JSON-like)
    const cardData = [
      { title: "Card One", description: "A brief summary of card one.", img: "https://via.placeholder.com/250x150" },
      { title: "Card Two", description: "Second card content shown here.", img: "https://via.placeholder.com/250x150" },
      { title: "Card Three", description: "Description for card three.", img: "https://via.placeholder.com/250x150" },
      { title: "Card Four", description: "Quick glance at the fourth card.", img: "https://via.placeholder.com/250x150" },
      { title: "Card Five", description: "Card five offers insights on design.", img: "https://via.placeholder.com/250x150" },
      { title: "Card Six", description: "Final card closes the loop.", img: "https://via.placeholder.com/250x150" },
    ];

    const cardGrid = document.querySelector('#cards');

    function renderCards(cards) {
      cardGrid.innerHTML = '';
      cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
          <img src="${card.img}" alt="${card.title}">
          <h3>${card.title}</h3>
          <p>${card.description}</p>
        `;
        cardGrid.appendChild(div);
      });
    }

    renderCards(cardData);

    // Search functionality
    document.getElementById('search').addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      const filtered = cardData.filter(card =>
        card.title.toLowerCase().includes(query) ||
        card.description.toLowerCase().includes(query)
      );
      renderCards(filtered);
    });
