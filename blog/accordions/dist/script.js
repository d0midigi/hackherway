class Accordion {
  constructor(button) {
    this.button = button;
    this.panel = document.getElementById(this.button.getAttribute('aria-controls'));
    this.isExpanded = this.button.getAttribute('aria-expanded') === 'true';

    this.button.addEventListener('click', (event) => {
      this.toggleExpanded();
    });
  }

  static init() {
    const elements = document.querySelectorAll('.accordion [aria-expanded]');

    elements.forEach((element) => {
      new Accordion(element);
    });
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;

    this.button.setAttribute('aria-expanded', this.isExpanded);

    if (this.isExpanded) {
      this.panel.classList.remove('collapsed');
    } else {
      this.panel.classList.add('collapsed');
    }
  }
}
    
document.addEventListener('DOMContentLoaded', (event) => {
  Accordion.init();
});
