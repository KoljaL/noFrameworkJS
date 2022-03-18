import u from '../utils.js';

let ProfilPage = {
    render: async() => {

        u.pageTitle(`Profil`)
        u.createStyle('ProfilPage_style', Style);

        await Content();
        await getData();
    }
};

export default ProfilPage;



const Style = /*CSS*/ `

        #ProfilPage h2 {
            color: blue;
        } 

        #ProfilPage .wrapper {
            display: flex;
            gap: 1em;
          }
    
        #ProfilPage p{
            font-family: sans;
        }
       
    `; // EOS





let Content = async() => {
    let innerHTML = /*HTML*/ `
    <div id=ProfilPage>
       <h1>random Profil</h1>
        <div class=wrapper>
            <img id=img />
            <div class=profile>
                <h2 id=name></h2>
                <p id=email></p>
                <p id=phone></p>
            </div>
        </div>
    </div>`;
    await u.setInnerHTML('app', innerHTML);
}


let getData = async() => {

    fetch('https://randomuser.me/api/')
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data.results[0])
            let d = data.results[0];
            document.getElementById('img').src = d.picture.large;
            document.getElementById('name').innerHTML = d.name.first;
            document.getElementById('email').innerHTML = d.email;
            document.getElementById('phone').innerHTML = d.phone;
        })
        .catch(function(error) {
            console.log(error);
        });

}