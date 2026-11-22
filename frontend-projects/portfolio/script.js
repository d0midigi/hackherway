// Native responsive tabs for the Infrasec section
(function () {
  'use strict';

  var tabGroup = document.querySelector('#infrasec-tabs');
  if (!tabGroup) return;

  var tabs = Array.from(tabGroup.querySelectorAll('.security-tab-button'));
  var panels = Array.from(tabGroup.querySelectorAll('.security-tab-panel'));

  function getPanel(tab) {
    var panelId = tab.getAttribute('aria-controls');
    if (!panelId) {
      var href = tab.getAttribute('href');
      panelId = href && href.charAt(0) === '#' ? href.slice(1) : tab.dataset.tab;
    }
    return panels.find(function (panel) {
      return panel.id === panelId;
    });
  }

  function selectTab(selectedTab, moveFocus) {
    tabs.forEach(function (tab) {
      var isSelected = tab === selectedTab;
      tab.setAttribute('aria-selected', String(isSelected));
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');

      var panel = getPanel(tab);
      if (panel) panel.hidden = !isSelected;
    });

    if (moveFocus) selectedTab.focus();
  }

  if (!tabs.length || !panels.length) return;

  var initiallySelected = tabs.find(function (tab) {
    return tab.getAttribute('aria-selected') === 'true';
  }) || tabs[0];
  selectTab(initiallySelected, false);

  tabGroup.addEventListener('click', function (event) {
    var tab = event.target.closest('.security-tab-button');
    if (tab && tabs.indexOf(tab) !== -1) selectTab(tab, false);
  });

  tabGroup.addEventListener('keydown', function (event) {
    var currentTab = event.target.closest('.security-tab-button');
    var currentIndex = tabs.indexOf(currentTab);
    if (currentIndex === -1) return;

    var nextIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    selectTab(tabs[nextIndex], true);
  });
}());



document.documentElement.setAttribute("lang", "en");
document.documentElement.classList.add("dark");


// Get IE or Edge browser version
var version = detectIE();

if( version !== false ) {
	alert( 'Please view in Chrome/Safari/Firefox' );
}
/**
 * detect IE
 * returns version number or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

// Copy the code sample only after a visitor presses its copy button.
document.querySelectorAll(".code-demo-copy").forEach(function (button) {
  button.addEventListener("click", async function () {
    var demo = button.closest(".code-demo");
    var code = demo && demo.querySelector("pre code");
    var status = demo && demo.querySelector(".code-demo-copy-status");
    if (!code || !status) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code.textContent);
      } else {
        var copyField = document.createElement("textarea");
        copyField.value = code.textContent;
        copyField.setAttribute("readonly", "");
        copyField.style.position = "fixed";
        copyField.style.opacity = "0";
        document.body.appendChild(copyField);
        copyField.select();
        var copied = document.execCommand("copy");
        copyField.remove();
        if (!copied) throw new Error("Copy command failed");
      }
      status.textContent = "Code copied to clipboard.";
    } catch (error) {
      status.textContent = "Could not copy automatically. Select the code and copy it manually.";
    }
  });
});