**TL;DR**

[NoFrameworkJS](https://github.com/KoljaL/noFrameworkJS)

**Short form**


In the following I would like to show you the framework of HTML, CSS and Javascript I used to create my first sigle page application,
without using any framework (Vue, React, etc) or webcomponents.

**Introduction**

So far I have always created websites the classical way:  
PHP gets data from the database and creates a template from it.
The server generates, depending on the URL, the complete page each time and delivers it.  
The browser has to rebuild the source code every time the page is changed.
Since in most cases only the content of a part of the page changes, this is quite a lot of work, 
this is a lot of work without any real added value.

It is more elegant to load only the part of the data that is needed for the new view and to dynamically integrate it into the existing source code.
and integrate it dynamically into the existing source code.
This approach is followed by Javascript frameworks such as Vue, React or Angular.
Such pages can also be created with Svelte or via web components.
For my first attempt, however, the hurdle of a framework was too great and I decided to implement everything with techniques I was familiar with,
to implement everything with techniques I was familiar with:

Data
All data for the website must be delivered as JSON objects from the web server. In this example, I use freely available APIs that generate random content.

**File structure**

```CSS
index.html
├── css
│   └── styles.css
└── js
    ├── app.js
    ├── utils.js
    └── pages
        ├── StartPage.js
        ├── ProfilPage.js
        └── ImagePage.js
``` 



The `index.html` file contains only a list with the entries necessary for navigation, a DIV element with the ID `app` and a link to the first Javascript file.   
Important, this must be integrated as a `module`.


```HTML
<body>
  <header>
    <ul>
      <li data-hash="">Start</li>
      <li data-hash="profil">Profil</li>
      <li data-hash="images">Images</li>
    </ul>
  </header>
  <div id="app"></div>
  <script type="module" src="./js/app.js"></script>
</body>
```
In `App.js`, the scripts of the individual pages and the script with the help functions are imported first:

```JS
import StartPage from './pages/StartPage.js';
import ProfilPage from './pages/ProfilPage.js';
import ImagePage from './pages/ImagePage.js';
import u from "./utils.js"
```
Then a function from `utils.js` is called that reacts to clicks on the navigation and brings the content of the respective `data-hash` into the address bar of the browser.

Changes to this hash are registered via the following event listener and then the `router()` function is called:

```JS
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);

function router() {

    let page = u.getHashFromURL();
    switch (page) {

        case '/':
            StartPage.render();
            break;

        case 'profil':
            ProfilPage.render();
            break;

        case 'images':
            ImagePage.render();
            break;

        default:
            StartPage.render();
            break;
    }
}
```
This function first reads the hash from the URL and uses it to render a specific page view.

Before we look at the structure of the page views, two functions of `utils.js` should be briefly introduced:

This function creates a `<style>` tag in the header of the HTML file with the content from the string `styleTags` and the ID `styleID`.

```JS
createStyle: async(styleID, styleTags) => {
    if (!document.getElementById(styleID + "Style")) {
        var style = document.createElement("style");
        style.type = "text/css";
        style.id = styleID + "Style";
        style.innerHTML = styleTags;
        document.getElementsByTagName("head")[0].appendChild(style);
    }
},
```
This function replaces the HTML code of the element `el` with the string `innerHTML`.

```JS
setInnerHTML: async(el, innerHTML) => {
    let element = document.getElementById(el);
    element.innerHTML = innerHTML;
},
```

Finally, the structure of the individual pages, which always follows the same pattern:

1. integrate CSS code into the header
2. insert HTML code into the element with the ID `app`
3. load data from the API and integrate it into the DOM.

```JS
let TextPage = {
    render: async() => {
        u.createStyle('TextPage_style', Style);
        await Content();
        await getData();
    }
};

export default TextPage;
```
The last line releases the object for export to other files.


The CSS and HTML parts are basically identical, but can be implemented in different ways:
- Either as a string with the function call in the object:

```JS
const Style = /*CSS*/ `
    #TextPage h2 {
        color: blue;
    } 

    #TextPage p{
        font-family: sans;
    }`; 
```

- Or the function is called directly afterwards:

```JS
let Content = async() => {
    let innerHTML = /*HTML*/ `
    <div id=TextPage>
       <h1> nonsense Text</h1>
       <h2 id=sentence></h2>
       <p id=paragraph></p>
    </div>`;
    await u.setInnerHTML('app', innerHTML);
}
```

Finally, only the actual data is missing; this is fetched from the API using fetch and integrated into the corresponding tags using `getElementById()`:

```JS
let getData = async() => {
    fetch('https://random-data-api.com/api/hipster/random_hipster_stuff')
        .then((resp) => resp.json())
        .then(function(data) {
            document.getElementById('sentence').innerHTML = data.sentence;
            document.getElementById('paragraph').innerHTML = data.paragraph;
        })
}
```

**So, that's it.**  

Of course, this system can be extended as much as you like, especially components (slideshows) that are needed again and again can be stored in separate files.

I ask you for constructive criticism of this method and my description (it's the first time I've written something like this).

You can find the complete example on Github: [NoFrameworkJS](https://github.com/KoljaL/noFrameworkJS)

Made with ❤️ by ![Logo](https://rasal.de/img/noFrameworhAtGithub-15.png)