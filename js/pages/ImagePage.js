import u from '../utils.js';

let ImagePage = {
    render: async() => {

        u.pageTitle(`Image`)
        await Style();
        await Content();
        await getData();
    }
};

export default ImagePage;




let Style = async() => {
    let styleTags = /*CSS*/ `
        #authors {
            display:flex;
        } 
       
    `;
    u.createStyle('ImagePage_style', styleTags);
};



let Content = async() => {
    let innerHTML = /*HTML*/ `
    <div id=ImagePage>
       <h1>Some Images</h1>
       <div id=authors></div>
       <hr>
       <div><code>https://randomuser.me/api/?results=10</code></div>
    </div>`;
    await u.setInnerHTML('app', innerHTML);
}


let getData = async() => {
    function createNode(element) {
        return document.createElement(element);
    }

    function append(parent, el) {
        return parent.appendChild(el);
    }

    const ul = document.getElementById('authors');
    const url = 'https://randomuser.me/api/?results=10';

    fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            let authors = data.results;
            return authors.map(function(author) {
                let li = createNode('li');
                let img = createNode('img');
                let span = createNode('span');
                img.src = author.picture.medium;
                span.innerHTML = `${author.name.first} ${author.name.last}`;
                append(li, img);
                append(li, span);
                append(ul, li);
            })
        })
        .catch(function(error) {
            console.log(error);
        });
}