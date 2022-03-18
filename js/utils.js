let utils = {
    createStyle: async(styleID, styleTags) => {
        if (!document.getElementById(styleID + "Style")) {
            var style = document.createElement("style");
            style.type = "text/css";
            style.id = styleID + "Style";
            style.innerHTML = styleTags;
            document.getElementsByTagName("head")[0].appendChild(style);
        }
    },
    //
    //
    setInnerHTML: async(el, innerHTML) => {
        let element = document.getElementById(el);
        element.innerHTML = innerHTML;
    },

    //
    //
    getMenueClicks: () => {
        // select all list element in header
        const menuLinks = document.querySelectorAll("header li");

        // for each list element, add an eventListener
        menuLinks.forEach(function(menuLink) {
            menuLink.addEventListener("click", (el) => {
                // read the 'data-hash' attribute from the li-tag and put it in the URL
                window.location.hash = el.target.dataset.hash;
            });
        });
    },

    //
    //
    getHashFromURL: () => {
        return location.hash.slice(1).toLowerCase() || "/";
    },

    pageTitle: (string) => {
        document.title = ` ${string}`;
    },

    // end utils
};

export default utils;