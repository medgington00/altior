const heartCard = document.getElementById("heart-template");
const heartRow = document.getElementById("heart-row");
let heartNumbers = new Array(2,3,4,5,6,7,8,9,10,'J','Q','K','A');
let heartCards = new Array();
let heartExtrasRow = document.getElementById("heart-extra");

const diamondCard = document.getElementById("diamond-template");
const diamondRow = document.getElementById("diamond-row");
let diamondNumbers = new Array(2,3,4,5,6,7,8,9,10,'J','Q','K','A');
let diamondCards = new Array();
let diamondExtrasRow = document.getElementById("diamond-extra");

const spadeCard = document.getElementById("spade-template");
const spadeRow = document.getElementById("spade-row");
let spadeNumbers = new Array(2,3,4,5,6,7,8,9,10,'J','Q','K','A');
let spadeCards = new Array();
let spadeExtrasRow = document.getElementById("spade-extra");

let extraCards = new Array();

let currentColumn = -1;
let points = 0;
let streak = 0;

const winText = document.getElementById("win-text");
const streakText = document.getElementById("streak-text");

let root = document.querySelector(':root');
let rootStyle = getComputedStyle(root);
const settingsPopup = document.getElementById("settings-popup");
const settingsButton = document.getElementById("settings-button");

const resultText = document.getElementById("result-text");

const container = document.getElementById("container");

let winnablecount = 0;
let testingcount = 10;
let isTesting = false;
let currenttest = 0;

let isTwoTie = false;

localStorage['streakSTORE'] = '0';
localStorage['tableSTORE'];
localStorage['cardColorSTORE'];
localStorage['gamesPlayedSTORE'];
localStorage['winnableGamesSTORE'];

function OnLoad() {
    streak = parseInt(localStorage['streakSTORE'] || 'defaultValue');

    if (localStorage.getItem("gamesPlayedSTORE") === null) {
        localStorage.setItem("gamesPlayedSTORE","0");
    }
    
    if (localStorage.getItem("winnableGamesSTORE") === null) {
        localStorage.setItem("winnableGamesSTORE","0");
    }
    

    SetTableBackground(localStorage.getItem("tableSTORE"));
    SetCardColor(localStorage.getItem("cardColorSTORE"));

    if(isTesting) {
        TestingLoop(currenttest);
    } else {
        NewGame();
    }
}

function NewGame() {

    isTwoTie = false;

    streakText.innerHTML = "Streak: " + streak;

    resultText.style.textDecoration = "none";
    resultText.onclick = "";
    resultText.innerHTML = "Pick a card!";

    if(currentColumn < 9) {
        streak = 0;
        localStorage['streakSTORE'] = streak + "";
    }

    points = 0;
    SetPointsText();

    while(!heartCards.length == 0) {
        heartCards[0].remove();
        heartCards.shift();
    }

    while(!diamondCards.length == 0) {
        diamondCards[0].remove();
        diamondCards.shift();
    }

    while(!spadeCards.length == 0) {
        spadeCards[0].remove();
        spadeCards.shift();
    }

    while(!extraCards.length == 0) {
        extraCards[0].remove();
        extraCards.shift();
    }

    currentColumn = -1;

    heartNumbers = new Array(2,3,4,5,6,7,8,9,10,'J','Q','K','A');
    heartCards = new Array();

    diamondNumbers = new Array(2,3,4,5,6,7,8,9,10,'J','Q','K','A');
    diamondCards = new Array();

    spadeNumbers = new Array(2,3,4,5,6,7,8,9,10,'J','Q','K','A');
    spadeCards = new Array();

    extraCards = new Array();

    //Setup Heart Cards
    while(heartNumbers.length > 3) {
        let tempCard = heartCard.cloneNode(true);
        heartRow.appendChild(tempCard);

        const rand = Math.floor(Math.random() * heartNumbers.length);
        const num = heartNumbers[rand];
        heartNumbers = RemoveArrayItem(num,heartNumbers);

        SetCardNumber(tempCard, num);

        heartCards.push(tempCard);
    }
    //Heart Extras
    while(heartNumbers.length > 0) {
        let tempCard = heartCard.cloneNode(true);
        heartExtrasRow.appendChild(tempCard);

        const rand = Math.floor(Math.random() * heartNumbers.length);
        const num = heartNumbers[rand];
        heartNumbers = RemoveArrayItem(num,heartNumbers);

        SetCardNumber(tempCard, num);

        extraCards.push(tempCard);
    }
    //Setup Diamond Cards
    while(diamondNumbers.length > 3) {
        let tempCard = diamondCard.cloneNode(true);
        diamondRow.appendChild(tempCard);

        const rand = Math.floor(Math.random() * diamondNumbers.length);
        const num = diamondNumbers[rand];
        diamondNumbers = RemoveArrayItem(num,diamondNumbers);

        SetCardNumber(tempCard, num);

        diamondCards.push(tempCard);
    }
    //Diamond Extras
    while(diamondNumbers.length > 0) {
        let tempCard = diamondCard.cloneNode(true);
        diamondExtrasRow.appendChild(tempCard);

        const rand = Math.floor(Math.random() * diamondNumbers.length);
        const num = diamondNumbers[rand];
        diamondNumbers = RemoveArrayItem(num,diamondNumbers);

        SetCardNumber(tempCard, num);

        extraCards.push(tempCard);
    }
    //Setup Spade Cards
    while(spadeNumbers.length > 3) {
        let tempCard = spadeCard.cloneNode(true);
        spadeRow.appendChild(tempCard);

        const rand = Math.floor(Math.random() * spadeNumbers.length);
        const num = spadeNumbers[rand];
        spadeNumbers = RemoveArrayItem(num,spadeNumbers);

        SetCardNumber(tempCard, num);

        spadeCards.push(tempCard);
    }
    //Spade Extras
    while(spadeNumbers.length > 0) {
    let tempCard = spadeCard.cloneNode(true);
    spadeExtrasRow.appendChild(tempCard);

    const rand = Math.floor(Math.random() * spadeNumbers.length);
    const num = spadeNumbers[rand];
    spadeNumbers = RemoveArrayItem(num,spadeNumbers);

    SetCardNumber(tempCard, num);

    extraCards.push(tempCard);

    if(isTesting) {
        GameOver();
    }
}


    NextColumn();
}

function FlipToBack(card) {
    card.style.transform = "rotateY(0deg)";
}

function FlipToFront(card) {
    card.style.transform = "rotateY(180deg)";
}

function SelectHeart() {
    FlipToFront(heartCards[currentColumn]);

    diamondCards[currentColumn].getElementsByClassName("card-face front")[0].style.filter = "brightness(.25)"; 

    for(i = currentColumn; i >= 0; i--) {
        FlipToFront(heartCards[i]);
    }

    let oppNum = LetterToNumber(GetCardNumber(heartCards[currentColumn]));
    let playerNum = LetterToNumber(GetCardNumber(spadeCards[currentColumn]));

    if(playerNum > oppNum) {
        points++;
    } else if(playerNum == 2 && oppNum == 2) {
        isTwoTie = true;
    } else {
    }

    SetResultText(playerNum, oppNum);
    SetPointsText();

    if(currentColumn==9 || isTwoTie) {
        GameOver();
    } else {
        NextColumn();
    }

    
}

function SelectDiamond() {
    FlipToFront(diamondCards[currentColumn]);
    
    heartCards[currentColumn].getElementsByClassName("card-face front")[0].style.filter = "brightness(.25)"; 

    for(i = currentColumn; i >= 0; i--) {
        FlipToFront(diamondCards[i]);
    }

    let oppNum = LetterToNumber(GetCardNumber(diamondCards[currentColumn]));
    let playerNum = LetterToNumber(GetCardNumber(spadeCards[currentColumn]));

    if(playerNum > oppNum) {
        points++;
    } else if(playerNum == 2 && oppNum == 2) {
        isTwoTie = true;
    } else {
    }

    SetResultText(playerNum, oppNum);
    SetPointsText();

    if(currentColumn==9 || isTwoTie) {
        GameOver();
    } else {
        NextColumn();
    }
}

function NextColumn() {
    if(currentColumn>=0) {
        heartCards[currentColumn].onclick = "";
        diamondCards[currentColumn].onclick = "";
        heartCards[currentColumn].classList.remove("active-card");
        diamondCards[currentColumn].classList.remove("active-card");
    }
    
    if(currentColumn<10) {

        currentColumn+=1;

        setTimeout(() => {
            diamondCards[currentColumn].classList.add("active-card");
          }, 500);   

          setTimeout(() => {
            heartCards[currentColumn].classList.add("active-card");
          }, 500);   

        setTimeout(() => {
            FlipToFront(spadeCards[currentColumn]);
          }, 500);    
          
          setTimeout(() => {
            heartCards[currentColumn].onclick = function() {SelectHeart()};
          }, 500);  
    
          setTimeout(() => {
            diamondCards[currentColumn].onclick = function() {SelectDiamond()};
          }, 500);  
    }
}   

function SetPointsText() {
    if(points < 5)
        winText.style.color = "white";
    if(points == 5)
        winText.style.color = "yellow";
    if(points >= 6)
        winText.style.color = "green";
    winText.innerHTML = "Points: " + points;
}

function GameOver() {
    
    let maxPoints = 0;

    for(i = 0; i < 10; i++) {
        let tempHeart = LetterToNumber(GetCardNumber(heartCards[i]));
        let tempDiamond = LetterToNumber(GetCardNumber(diamondCards[i]));
        let tempSpade = LetterToNumber(GetCardNumber(spadeCards[i]));

        if(tempHeart < tempDiamond) {
            if(tempSpade > tempHeart) {
                maxPoints++;
            } else if(tempSpade == 2 && tempHeart == 2) {
                maxPoints+=2;
            }   
        } else if(tempHeart > tempDiamond) {
            if(tempSpade > tempDiamond) {
                maxPoints++;
            } else if(tempSpade == 2 && tempDiamond == 2) {
                maxPoints+=2;
            }   
        } 
    }

    resultText.style.textDecoration = "underline";
    resultText.onclick = function() {NewGame()};

    setTimeout(() => {
       FlipExtras(); 
    }, 500);

    if(points >= 6 || isTwoTie) {
        WinningGame();
    } else {
        LosingGame();
    }
        
    if(!isTesting) {
        heartCards[currentColumn].onclick = "";
        diamondCards[currentColumn].onclick = "";
        heartCards[currentColumn].classList.remove("active-card");
        diamondCards[currentColumn].classList.remove("active-card");
    }
    
    console.log(maxPoints);
    if(maxPoints > 6) {
        let temp1 = parseInt(localStorage.getItem("winnableGamesSTORE"));
        temp1++;
        localStorage.setItem("winnableGamesSTORE", temp1);
    }

    let temp2 = parseInt(localStorage.getItem("gamesPlayedSTORE"));
    temp2++;
    localStorage.setItem("gamesPlayedSTORE",temp2);

    if(isTesting) {
        CheckWinnable(maxPoints);
        TestingLoop(currenttest+1);
    }
    
}

function CheckWinnable(pts) {
    if(pts >= 6)
        winnablecount++;
}

function WinningGame() {
    streak++;
    localStorage['streakSTORE'] = streak + "";
    if(!isTwoTie) {
        resultText.innerHTML = "You win! Play again?";
    }
    streakText.innerHTML = "Streak: " + streak;
}

function LosingGame() {
    streak = 0;
    localStorage['streakSTORE'] = streak + "";
    resultText.innerHTML = "You lose. Try again?";
}

function FlipExtras() {
    for(i = 0; i < extraCards.length; i++) {
        FlipToFront(extraCards[i]);
    }

    for(i = 0; i < heartCards.length; i++) {
        FlipToFront(heartCards[i]);
    }

    for(i = 0; i < diamondCards.length; i++) {
        FlipToFront(diamondCards[i]);
    }
}

function RemoveArrayItem(item, arr) {
    for(i = 0; i < arr.length; i++) {
        let temp = arr.shift();
        if(temp == item) {
            i = arr.length;
        } else {
            arr.push(temp);
        }
    }
    return arr;
}

function GetCardNumber(card) {
    let tempCardText = card.getElementsByClassName("num");
    return tempCardText[0].innerHTML;
}

function SetCardNumber(card, num) {
    let tempCardText = card.getElementsByClassName("num");
    tempCardText[0].innerHTML = num;
}

function LetterToNumber(num) {
    if(num == 'J')
        return 11;
    if(num == 'Q')
        return 12;
    if(num == 'K')
        return 13;
    if(num == 'A')
        return 14;
    return parseInt(num);
}

function NumberToLetter(num) {
    if(num == 11)
        return "Jack";
    if(num == 12)
        return "Queen";
    if(num == 13)
        return "King";
    if(num == 14)
        return "Ace";
    return num;
}

function OpenSettings() {
    settingsPopup.style.pointerEvents = "auto";
    settingsPopup.style.top = "60px";
    settingsButton.style.filter = "brightness(.75)"
    setTimeout(() => {
        container.onclick = function() {CloseSettings()};
    }, 500);
}

function CloseSettings() {
    settingsPopup.style.pointerEvents = "none";
    settingsPopup.style.top = "-256px";
    settingsButton.style.filter = "brightness(1)"

    container.onclick = "";
}

function SetResultText(pnum, onum) {

    let pnumString = NumberToLetter(pnum);
    let onumString = NumberToLetter(onum);

    if(pnum > onum) {
        resultText.innerHTML = "Score! " + pnumString + " beats " + onumString + ".";
    } else if(pnum < onum) {
        resultText.innerHTML = "Loss. " + onumString + " beats " + pnumString + ".";
    } else if((onum == pnum) && pnum != 2) {
        resultText.innerHTML = "Loss. Ties go to opponent.";
    } else if(pnum==2 && onum==2) {
        resultText.innerHTML = "Two-Tie! You win!";
    }
}

function SetCardColor(num) {
    localStorage.setItem("cardColorSTORE",num + "");

    if(num==1) {
        root.style.setProperty("--card-back",rootStyle.getPropertyValue("--card-back-one"));
        root.style.setProperty("--card-back-alt",rootStyle.getPropertyValue("--card-back-alt-one"));

    } else if(num==2) {
        root.style.setProperty("--card-back",rootStyle.getPropertyValue("--card-back-two"));
        root.style.setProperty("--card-back-alt",rootStyle.getPropertyValue("--card-back-alt-two"));
    } else if(num==3) {
        root.style.setProperty("--card-back",rootStyle.getPropertyValue("--card-back-three"));
        root.style.setProperty("--card-back-alt",rootStyle.getPropertyValue("--card-back-alt-three"));
    }  
}

function SetTableBackground(num) {
    localStorage.setItem("tableSTORE",num + "");

    if(num==1)
        root.style.setProperty("--table-bg",rootStyle.getPropertyValue("--table-bg-one"));
    if(num==2)
        root.style.setProperty("--table-bg",rootStyle.getPropertyValue("--table-bg-two"));
    if(num==3)
        root.style.setProperty("--table-bg",rootStyle.getPropertyValue("--table-bg-three"));
}

function TestingLoop(i) {
    console.log("enter testing loop");
    if(i < testingcount) {
        NewGame();
    } else {
        console.log("Winnable Games Percentage: " + winnablecount / testingcount);
    }
}