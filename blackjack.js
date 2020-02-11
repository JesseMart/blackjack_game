var deck = [];
var suits = ["spades", "hearts", "clubs", "diams"];
var cardNum = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var playerCard =[];
var dealerCard = [];
var count = 0;
var myDollars = 100;
var playerCards = document.getElementById("playerCards");
var dealerCards = document.getElementById("dealerCards");
var message = document.getElementById("message");
var pValue = document.getElementById("pValue");
var dValue = document.getElementById("dValue");
var output = document.getElementById("output");
var dollarV = document.getElementById("dollars");
var endplay = false;
for(s in suits){
    var suit = suits[s][0].toUpperCase();
    var bg = (suit == "S" || suit == "C") ? "black" : "red";
    for(n in cardNum){
        var cardValue = (n > 9) ? 10 : parseInt(n)+1;
        var card = {suit:suit, char:suits[s], bg:bg, cardnum:cardNum[n] , cardvalue:cardValue}

        deck.push(card);
    };
};


function start(array){    
    shuffleD(deck);
    dealNewHand();
    document.getElementById('start').style.display = 'none';
    document.getElementById('dollars').innerHTML = myDollars;
    

}
function dealNewHand(){
    playerCard = [];
    dealerCard = [];
    dealerCards.innerHTML = "";
    playerCards.innerHTML = "";

    var betValue = document.getElementById("mybet").value;
    myDollars =myDollars - betValue;
    document.getElementById('dollars').innerHTML = myDollars;
    document.getElementById('myActions').style.display = 'block';
    message.innerHTML = "Reach 21 to win and beat the dealer. <br>Your current BET is $" + betValue;
    document.getElementById('mybet').disabled = true;
    document.getElementById('maxbet').disabled = true;


    for(i = 0; i < 2; i++){
        dealerCard.push(deck[count]);
        dealerCards.innerHTML += cardOut(count, i);
        if(i==0){
            dealerCards.innerHTML += '<div id="coverDealerCard" style= "left:100px"></div>';
        };
        count++;
        playerCard.push(deck[count]);
        playerCards.innerHTML += cardOut(count, i);
        count++;
    }
    pValue.innerHTML = chckTotal(playerCard);
    console.log(dealerCard);
    console.log(playerCard);

}
function cardAction(a){
    switch (a) {
        case 'hit':
            addCard();
            break;
        case 'hold':
            endGame();
            break;
        case 'double':
            addCard();
            doubleDown();
            break;
        default:
            console.log("DONE");
            endPlay();

    }

}
function addCard(){
    playerCard.push(deck[count]);
    playerCards.innerHTML += cardOut(count, (playerCard.length -1));
    count++;
    var value = chckTotal(playerCard);
    pValue.innerHTML = value;
    if(value > 21){
        message.innerHTML = "<div style=text-align:center>BUSTED!</div>";  
        endGame();  
    }
}
function endGame(){
    endplay = true;
    document.getElementById("coverDealerCard").style.display = "none";
    document.getElementById("myActions").style.display = "none";
    document.getElementById("btndeal").style.display = "block";
    document.getElementById("mybet").style.display = "disable";
    document.getElementById("maxbet").style.display = "disable";
    message.innerHTML = "GAME OVER"

    var dealerV = chckTotal(dealerCard);
    dValue.innerHTML = dealerV;
    while(dealerV < 17){
        dealerCard.push(deck[count]);
        dealerCards.innerHTML += cardOut(count, (dealerCard.length -1));
        count++;
        var payoutJ = 1;
        dealerV = chckTotal(dealerCard);
        dValue.innerHTML = dealerV;
    }
    var playerValue = chckTotal(playerCard);
    if(playerValue == 21 && playerCard.length == 2){
        message.innerHTML = "BlackJack!!";
        payoutJ = 1.5;
    }
    var betvalue = parseInt(document.getElementById("mybet").value)*payoutJ;
    if((playerValue < 22 && dealerV < playerValue) || (dealerV > 21 && playerValue < 22)){

        message.innerHTML = '<span style="color:white"> You WIN! Your winnigs are '+ betvalue+'</span>';
        myDollars = myDollars + (betvalue * 2);

    }else if(playerValue > 21) {

        message.innerHTML = '<span style="color:red"> Dealer WINS. You lost $'+ betvalue+'</span>';

    }else if (playerValue == dealerV){

        message.innerHTML = '<span style="color:orange"> BUST</span>';
        myDolars = myDollars + betvalue

    }
    pValue.innerHTML = playerValue; 
    dollarV.innerHTML = myDollars;
}
function chckTotal(arr){
    var value = 0;
    var ace = false;
    for( var i in arr ){
        if(arr[i].cardnum == 'A' && !ace){
            ace = true;
            value = value + 10;
        }
        value = value +arr[i].cardvalue;
    }
    if(ace && value > 21 ){
    value = value - 10;
    }
    return value;
}

function cardOut(n, i){
    var hpos = (i > 0) ? i*60+100 : 100;    
    return '<div class ="cardSize '+ deck[n].char +' "style="left:' + hpos + 'px"> <div class="top-card suit"> ' + deck[n].cardnum + '<br> </div> <div class="content suit"></div> <div class="bottom suit"> '+ deck[n].cardnum +'<br></div> </div>'
}

function shuffleD(array){
    for(let i = array.length - 1; i > 0; i--){
        var randomShuffle = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[randomShuffle];
        array[randomShuffle] = temp;
    }
    return array;
}

function outputShuffle(){
    output.innerHTML +="<span style = 'color:" + deck[count].bg + "'>&" + deck[count].char + ";" + deck[count].cardnum + "</span> ";
}
