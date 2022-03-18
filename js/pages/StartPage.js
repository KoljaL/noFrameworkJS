import u from '../utils.js';

let TextPage = {
    render: async() => {

        u.pageTitle(`Text`)
        u.createStyle('TextPage_style', Style);

        await Content();
        await getData();
    }
};

export default TextPage;



const Style = /*CSS*/ `

        #TextPage h2 {
            color: blue;
        } 
    
        #TextPage p{
            font-family: sans;
        }
       
    `; // EOS





let Content = async() => {
    let innerHTML = /*HTML*/ `
    <div id=TextPage>
       <h1> nonsense Text</h1>
       <h2 id=sentence></h2>
       <p id=paragraph></p>
    </div>`;
    await u.setInnerHTML('app', innerHTML);
}


let getData = async() => {

    fetch('https://random-data-api.com/api/hipster/random_hipster_stuff')
        .then((resp) => resp.json())
        .then(function(data) {
            // console.log(data)
            document.getElementById('sentence').innerHTML = data.sentence;
            document.getElementById('paragraph').innerHTML = data.paragraph;
        })
        .catch(function(error) {
            console.log(error);
        });

}