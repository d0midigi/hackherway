let acc = document.getElementsByClassName("accordion");
        let i;
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                let accordionPanel = this.nextElementSibling;
                if (accordionPanel.style.maxHeight) {
                    accordionPanel.style.maxHeight = null;
                } else {
                    accordionPanel.style.maxHeight = accordionPanel.scrollHeight + "px";
                }
            });
        }
