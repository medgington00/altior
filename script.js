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

let isTwoTie = false;

let isInTutorial = false;
let tutorialSlide = -1;
const tutorialContainer = document.getElementById("tutorial-container");
const tutorialText = tutorialContainer.getElementsByClassName("tutorial-text")[0];
const thOne = document.getElementById("th-1");
const thTwo = document.getElementById("th-2");
const thThree = document.getElementById("th-3");
const thFour = document.getElementById("th-4");

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

    NewGameNoTutorial();
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

    if(!isInTutorial) {
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
        }

    } else {
        SetTutorialCards();
    }
    
    if(!isInTutorial) {
        NextColumn();
    }
    
}

function NewGameNoTutorial() {
    HideTutorialElements();
    tutorialContainer.style.display = "none";
    isInTutorial = false;
    NewGame();
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
        if(!isInTutorial)
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
        if(!isInTutorial)
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

function PreviousColumn() {
    if(currentColumn>=0) {
        heartCards[currentColumn].onclick = "";
        diamondCards[currentColumn].onclick = "";
        heartCards[currentColumn].classList.remove("active-card");
        diamondCards[currentColumn].classList.remove("active-card");
    }
    
    if(currentColumn>0) {

        currentColumn-=1;

        diamondCards[currentColumn].classList.add("active-card"); 

        heartCards[currentColumn].classList.add("active-card"); 

        FlipToBack(spadeCards[currentColumn+1]);   
        FlipToBack(diamondCards[currentColumn]);
        FlipToBack(heartCards[currentColumn]);

        heartCards[currentColumn].onclick = function() {SelectHeart()};
    
        diamondCards[currentColumn].onclick = function() {SelectDiamond()};
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

function StartTutorial() {
    isInTutorial = true;

    NewGame();

    heartCards[0].classList.remove("active-card");
    diamondCards[0].classList.remove("active-card");

    tutorialContainer.style.display = "flex";
    
    tutorialSlide = -1;
    SetTutorialSlide(1);
}

//Advances or rewinds tutorial based on -1 = rewind and 1 = advance
function SetTutorialSlide(i) {
    if(i == -1 && tutorialSlide > 0) {
        HideTutorialElements()
        tutorialSlide-=1;
    }
    if(i == 1 && tutorialSlide < 50) {
        HideTutorialElements()
        tutorialSlide+=1;
    }

    if(tutorialSlide == 0) {

        tutorialText.innerHTML = "Welcome to Altior!<br>Press the right arrow to advance.";
        FlipToBack(spadeCards[0]);

    } else if(tutorialSlide==1) {

        tutorialText.innerHTML = "The player sees their card first.";
        FlipToFront(spadeCards[0]);
        thOne.style.opacity="1";

    } else if(tutorialSlide==2) {

        tutorialText.innerHTML = "They must then pick between the opponents two suits<br>Let's go with hearts.";
        FlipToBack(heartCards[0]);
        thTwo.style.opacity="1";
        winText.innerHTML = "Points: 0"

    } else if(tutorialSlide==3) {

        tutorialText.innerHTML = "You won this round since 10 is higher than 5.";
        FlipToFront(heartCards[0]);
        FlipToBack(spadeCards[1]);
        winText.innerHTML = "Points: 1"
        
    } else if(tutorialSlide==4) {

        tutorialText.innerHTML = "Let's go for another.";
        FlipToFront(spadeCards[1]);
        FlipToBack(heartCards[1]);
        
    } else if(tutorialSlide==5) {

        tutorialText.innerHTML = "You lost this round since Ace is higher than Queen.";
        FlipToFront(heartCards[1]);
        FlipToBack(spadeCards[2]);

    } else if(tutorialSlide==6) {

        tutorialText.innerHTML = "Tough luck. Let's try again.";
        FlipToFront(spadeCards[2]);
        FlipToBack(heartCards[2]);

        
    } else if(tutorialSlide==7) {

        tutorialText.innerHTML = "Another loss round since ties go to the opponent.";
        FlipToFront(heartCards[2]);
        FlipToBack(spadeCards[3]);

        
    } else if(tutorialSlide==8) {

        tutorialText.innerHTML = "This isn't going too well, we are due for a lucky break.";
        FlipToFront(spadeCards[3]);
        FlipToBack(heartCards[3]);
        winText.innerHTML = "Points: 1"
        winText.style.color = "white";

    } else if(tutorialSlide==9) {

        tutorialText.innerHTML = "Look at that! A Two-Tie is when both players have a 2. This results in an instant game win for the player.";
        FlipToFront(heartCards[3]);
        FlipToBack(spadeCards[4]);

        winText.innerHTML = "Points: 6"
        winText.style.color = "green";

    } else if(tutorialSlide==10) {

        tutorialText.innerHTML = "Let's try out diamonds now.";
        FlipToFront(spadeCards[4]);
        FlipToBack(diamondCards[4]);
        FlipToBack(diamondCards[3]);
        FlipToBack(diamondCards[2]);
        FlipToBack(diamondCards[1]);
        FlipToBack(diamondCards[0]);

    } else if(tutorialSlide==11) {

        tutorialText.innerHTML = "When you select a card, all cards of that suit to the left will also be flipped";
        FlipToFront(diamondCards[4]);
        FlipToFront(diamondCards[3]);
        FlipToFront(diamondCards[2]);
        FlipToFront(diamondCards[1]);
        FlipToFront(diamondCards[0]);
        FlipToBack(extraCards[0]);
        FlipToBack(extraCards[1]);
        FlipToBack(extraCards[2]);
        thThree.style.opacity = "1";
        
    } else if(tutorialSlide==12) {

        tutorialText.innerHTML = "Each game there will be 3 cards of each suit that are not used.";
        FlipToFront(extraCards[0]);
        FlipToFront(extraCards[1]);
        FlipToFront(extraCards[2]);
        thFour.style.opacity = "1";
    } else if(tutorialSlide==13) {

        tutorialText.innerHTML = "In order to win the player must score at least 6 points or a Two-Tie";
        winText.classList.add("th-5");
        tutorialContainer.getElementsByClassName("tutorial-button")[1].innerHTML = "&#8594;";

    } else if(tutorialSlide==14) {

        tutorialText.innerHTML = "Streaks are tracked here.<br> Good luck!";
        streakText.classList.add("th-5");
        tutorialContainer.getElementsByClassName("tutorial-button")[1].innerHTML = "Exit";

    } else if(tutorialSlide==15) {

        tutorialContainer.style.display = "none";
        NewGameNoTutorial();
    }
    
    
    
}

function HideTutorialElements() {
    thOne.style.opacity="0";
    thTwo.style.opacity="0";
    thThree.style.opacity="0";
    thFour.style.opacity="0";
    winText.classList.remove("th-5");
    streakText.classList.remove("th-5");
}

function SetTutorialCards() {
    let tempCard;
    //Set Heart Cards
    tempCard = heartCard.cloneNode(true);
    heartRow.appendChild(tempCard);
    SetCardNumber(tempCard,"5");
    heartCards.push(tempCard);

    tempCard = heartCard.cloneNode(true);
    heartRow.appendChild(tempCard);
    SetCardNumber(tempCard,"A");
    heartCards.push(tempCard);

    tempCard = heartCard.cloneNode(true);
    heartRow.appendChild(tempCard);
    SetCardNumber(tempCard,"9");
    heartCards.push(tempCard);

    tempCard = heartCard.cloneNode(true);
    heartRow.appendChild(tempCard);
    SetCardNumber(tempCard,"2");
    heartCards.push(tempCard);

    tempCard = heartCard.cloneNode(true);
    heartRow.appendChild(tempCard);
    heartCards.push(tempCard);
    tempCard = heartCard.cloneNode(true);
    heartRow.appendChild(tempCard);
    heartCards.push(tempCard);
    tempCard = heartCard.cloneNode(true);
    heartRow.appendChild(tempCard);
    heartCards.push(tempCard);
    tempCard = heartCard.cloneNode(true);
    heartRow.appendChild(tempCard);
    heartCards.push(tempCard);
    tempCard = heartCard.cloneNode(true);
    heartRow.appendChild(tempCard);
    heartCards.push(tempCard);
    tempCard = heartCard.cloneNode(true);
    heartRow.appendChild(tempCard);
    heartCards.push(tempCard);

    //Heart Extras
    tempCard = heartCard.cloneNode(true);
    heartExtrasRow.appendChild(tempCard);
    SetCardNumber(tempCard,"K");
    extraCards.push(tempCard);

    tempCard = heartCard.cloneNode(true);
    heartExtrasRow.appendChild(tempCard);
    SetCardNumber(tempCard,"10");
    extraCards.push(tempCard);

    tempCard = heartCard.cloneNode(true);
    heartExtrasRow.appendChild(tempCard);
    SetCardNumber(tempCard,"4");
    extraCards.push(tempCard);

    //Setup Diamond Cards
    tempCard = diamondCard.cloneNode(true);
    diamondRow.appendChild(tempCard);
    SetCardNumber(tempCard,"7");
    diamondCards.push(tempCard);

    tempCard = diamondCard.cloneNode(true);
    diamondRow.appendChild(tempCard);
    SetCardNumber(tempCard,"5");
    diamondCards.push(tempCard);

    tempCard = diamondCard.cloneNode(true);
    diamondRow.appendChild(tempCard);
    SetCardNumber(tempCard,"2");
    diamondCards.push(tempCard);

    tempCard = diamondCard.cloneNode(true);
    diamondRow.appendChild(tempCard);
    SetCardNumber(tempCard,"Q");
    diamondCards.push(tempCard);

    tempCard = diamondCard.cloneNode(true);
    diamondRow.appendChild(tempCard);
    SetCardNumber(tempCard,"9");
    diamondCards.push(tempCard);

    tempCard = diamondCard.cloneNode(true);
    diamondRow.appendChild(tempCard);
    diamondCards.push(tempCard);
    tempCard = diamondCard.cloneNode(true);
    diamondRow.appendChild(tempCard);
    diamondCards.push(tempCard);
    tempCard = diamondCard.cloneNode(true);
    diamondRow.appendChild(tempCard);
    diamondCards.push(tempCard);
    tempCard = diamondCard.cloneNode(true);
    diamondRow.appendChild(tempCard);
    diamondCards.push(tempCard);
    tempCard = diamondCard.cloneNode(true);
    diamondRow.appendChild(tempCard);
    diamondCards.push(tempCard);

    tempCard = diamondCard.cloneNode(true);
    diamondExtrasRow.appendChild(tempCard);
    extraCards.push(tempCard);
    tempCard = diamondCard.cloneNode(true);
    diamondExtrasRow.appendChild(tempCard);
    extraCards.push(tempCard);
    tempCard = diamondCard.cloneNode(true);
    diamondExtrasRow.appendChild(tempCard);
    extraCards.push(tempCard);

    //Setup Spade Cards
    tempCard = spadeCard.cloneNode(true);
    spadeRow.appendChild(tempCard);
    SetCardNumber(tempCard,"10");
    spadeCards.push(tempCard);

    tempCard = spadeCard.cloneNode(true);
    spadeRow.appendChild(tempCard);
    SetCardNumber(tempCard,"Q");
    spadeCards.push(tempCard);

    tempCard = spadeCard.cloneNode(true);
    spadeRow.appendChild(tempCard);
    SetCardNumber(tempCard,"9");
    spadeCards.push(tempCard);

    tempCard = spadeCard.cloneNode(true);
    spadeRow.appendChild(tempCard);
    SetCardNumber(tempCard,"2");
    spadeCards.push(tempCard);

    tempCard = spadeCard.cloneNode(true);
    spadeRow.appendChild(tempCard);
    SetCardNumber(tempCard,"4");
    spadeCards.push(tempCard);

    tempCard = spadeCard.cloneNode(true);
    spadeRow.appendChild(tempCard);
    spadeCards.push(tempCard);
    tempCard = spadeCard.cloneNode(true);
    spadeRow.appendChild(tempCard);
    spadeCards.push(tempCard);
    tempCard = spadeCard.cloneNode(true);
    spadeRow.appendChild(tempCard);
    spadeCards.push(tempCard);
    tempCard = spadeCard.cloneNode(true);
    spadeRow.appendChild(tempCard);
    spadeCards.push(tempCard);
    tempCard = spadeCard.cloneNode(true);
    spadeRow.appendChild(tempCard);
    spadeCards.push(tempCard);
    tempCard = spadeCard.cloneNode(true);

    spadeExtrasRow.appendChild(tempCard);
    extraCards.push(tempCard);
    tempCard = spadeCard.cloneNode(true);
    spadeExtrasRow.appendChild(tempCard);
    extraCards.push(tempCard);
    tempCard = spadeCard.cloneNode(true);
    spadeExtrasRow.appendChild(tempCard);
    extraCards.push(tempCard);
}