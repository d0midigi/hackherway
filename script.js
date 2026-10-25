// ==========================================
// hackherway cyberspace - JavaScript
// ==========================================

// Page Navigation Functions
function showLinksPage() {
  document.getElementById('main-page').classList.add('hidden');
  document.getElementById('links-page').classList.add('active');
  window.scrollTo(0, 0);
}

function showMainPage() {
  document.getElementById('main-page').classList.remove('hidden');
  document.getElementById('links-page').classList.remove('active');
  window.scrollTo(0, 0);
}

// Dark Mode
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.classList.add("dark");
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  if (event.matches) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

// Theme Toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

// Blur Card Toggle
document.querySelectorAll(".blur-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("revealed");
  });
});

// Accordion Toggle
document.addEventListener('DOMContentLoaded', () => {
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", (e) => {
      e.preventDefault();
      const accordionItem = header.parentElement;
      const isActive = accordionItem.classList.contains("active");
      
      // Close all accordion items
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active");
      });
      
      // Toggle clicked item
      if (!isActive) {
        accordionItem.classList.add("active");
      }
    });
  });
});

// Search Functionality
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const searchButton = document.getElementById("search-button");
  const contentElements = document.querySelectorAll("main h1, main h2, main h3, main h4, main h5, main p, main li");
  
  const searchIndex = new Map();
  
  function hashText(text) {
    return text.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
  }
  
  // Build search index
  contentElements.forEach((element, index) => {
    const text = element.textContent;
    const hashedText = hashText(text);
    if (hashedText.length < 3) return;
    
    searchIndex.set(hashedText, { element, originalText: text, index });
    
    const words = hashedText.split(" ");
    words.forEach((word) => {
      if (word.length > 3) {
        if (!searchIndex.has(word)) searchIndex.set(word, []);
        if (Array.isArray(searchIndex.get(word))) {
          searchIndex.get(word).push({ element, originalText: text, index });
        }
      }
    });
  });
  
  function performSearch(query) {
    const results = [];
    const seenElements = new Set();
    const normalizedQuery = hashText(query);
    if (normalizedQuery.length < 2) return results;
    
    if (searchIndex.has(normalizedQuery) && !Array.isArray(searchIndex.get(normalizedQuery))) {
      const result = searchIndex.get(normalizedQuery);
      results.push(result);
      seenElements.add(result.element);
    }
    
    searchIndex.forEach((value, key) => {
      if (key.includes(normalizedQuery)) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (!seenElements.has(item.element)) {
              results.push(item);
              seenElements.add(item.element);
            }
          });
        } else if (!seenElements.has(value.element)) {
          results.push(value);
          seenElements.add(value.element);
        }
      }
    });
    
    results.sort((a, b) => {
      const aExact = hashText(a.originalText) === normalizedQuery;
      const bExact = hashText(b.originalText) === normalizedQuery;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return a.index - b.index;
    });
    
    return results.slice(0, 10);
  }
  
  function displayResults(results) {
    searchResults.innerHTML = "";
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="p-3 text-gray-500 dark:text-gray-400">No results found</div>';
      return;
    }
    
    results.forEach((result) => {
      const div = document.createElement("div");
      div.className = "p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm";
      let displayText = result.originalText;
      if (displayText.length > 80) displayText = displayText.substring(0, 80) + "...";
      div.textContent = displayText;
      div.addEventListener("click", () => {
        result.element.scrollIntoView({ behavior: "smooth" });
        result.element.classList.add("search-result");
        setTimeout(() => result.element.classList.remove("search-result"), 2000);
        searchResults.style.display = "none";
        searchInput.value = "";
      });
      searchResults.appendChild(div);
    });
  }
  
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query.length < 2) {
      searchResults.style.display = "none";
      return;
    }
    const results = performSearch(query);
    displayResults(results);
    searchResults.style.display = "block";
  });
  
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query.length < 2) return;
    const results = performSearch(query);
    displayResults(results);
    searchResults.style.display = "block";
  });
  
  document.addEventListener("click", (event) => {
    if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
      searchResults.style.display = "none";
    }
  });
});
