
const main =  document.getElementById('main');

const serchButton= ()=> {
   
    const input = document.getElementById('input-Value');
    const inputValue = parseInt(input.value) ;
    const error = document.getElementById('error');
    if(isNaN(inputValue) || inputValue==""){
        error.innerText='please enter number!';
        input.value="";
        main.innerHTML="";
           
    }

    else if (inputValue <= 0){

        error.innerText='please enter positive number!';
        input.value="";
        main.innerHTML="";
    }
   else{
     main.innerHTML="";
     fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
     .then(res=> res.json())
     .then( data => displayCard(data.cards))
     input.value="";
     error.innerText="";

   }
   
//  console.log(inputValue);
}

const displayCard = (cards)=>{

 for( const card of cards){
   const div = document.createElement('div');
   div.classList.add('col-lg-3');
   div.classList.add('mb-5');
   div.innerHTML=`
       <div class="card" style="width: 18rem;">
          <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${card.suit}</h5>
              <p class="card-text">${card.code}</p>
              <button onclick="cardDitels('${card.code}' )" class="btn btn-primary">Ditels</button>
            </div>
        </div>
   ` 
   main.appendChild(div);
  
    // console.log(card); 
 }
  
}

const cardDitels =(code) =>{
  
  fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
  .then(res=> res.json())
  .then( data => {
   const allCards = (data.cards);
   const singleCard = allCards.find( card => card.code === code);
   const div = document.createElement('div');
 
   main.innerHTML="";
  
   div.innerHTML=`
         <div class="card " style="width: 18rem;">
                <img src="${singleCard.image}" class="card-img-top" alt="...">
             <div class="card-body">
                <h5 class="card-title">${singleCard.suit}</h5>
                 <p class="card-text">${singleCard.value}</p>
                 <p class="card-text">${singleCard.code}</p>
      
              </div>
         </div>
   `
   main.appendChild(div);

  //  console.log(singleCard);
  })

}