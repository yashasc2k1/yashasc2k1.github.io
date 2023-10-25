playerScores = JSON.parse(localStorage.getItem('scores'));
if(playerScores === null){
    playerScores = {
        wins: 0,
        losses: 0,
        tie: 0
    };
}

setScores();
function computerMove(){
    const move = Math.random();
    let cmpMove = '';
    if(move >= 0 && move < 1 / 3){
        cmpMove = 'rock';
    }
    else if(move >= 1 / 3 && move <= 2 / 3){
        cmpMove = 'paper';
    }
    else if(move >= 2 / 3 && move < 1){
        cmpMove = 'scissors';
    }
    return cmpMove;
}
        




function playGame(userMove){
        const cmpMove = computerMove();
        let res = '';
        if(userMove === 'rock'){
            if(cmpMove === 'rock'){
                res = "It's a TIE.";
            }
            else if(cmpMove === 'paper'){
                res = 'You LOSE.';
            }
            else if(cmpMove === 'scissors'){
                res = 'You WIN.';
            }
        }
        else if(userMove === 'paper'){
            if(cmpMove === 'rock'){
                res = 'You WIN.';
            }
            else if(cmpMove === 'paper'){
                res = "It's a TIE.";
            }
            else if(cmpMove === 'scissors'){
                res = 'You LOSE.';
            }
        }
        else if(userMove === 'scissors'){
            if(cmpMove === 'rock'){
                res = 'You LOSE.';
            }
            else if(cmpMove === 'paper'){
                res = "You WIN.";
            }
            else if(cmpMove === 'scissors'){
                res = "It's a TIE.";
            }
        }
        else if(userMove === 'reset'){
            playerScores.losses = 0;
            playerScores.wins = 0;
            playerScores.tie = 0;
            localStorage.removeItem('scores');
            document.querySelector('.js-result').innerHTML = null;
            document.querySelector('.js-picks').innerHTML = null;    
            setScores();
            return;
        }
        if(res === 'You LOSE.') playerScores.losses += 1;
        if(res === 'You WIN.') playerScores.wins += 1;
        if(res === "It's a TIE.") playerScores.tie += 1;
        localStorage.setItem('scores', JSON.stringify(playerScores));
        document.querySelector('.js-result').innerHTML = `${res}`;
        let userImage = '';
        if(userMove === 'rock') userImage = 'images/rock-emoji.png';
        if(userMove === 'paper') userImage = 'images/paper-emoji.png';
        if(userMove === 'scissors') userImage = 'images/scissors-emoji.png';

        let computerImage = '';
        if(cmpMove === 'rock') computerImage = 'images/rock-emoji.png';
        if(cmpMove === 'paper') computerImage = 'images/paper-emoji.png';
        if(cmpMove === 'scissors') computerImage = 'images/scissors-emoji.png';

        document.querySelector('.js-picks').innerHTML = `You<img src="${userImage}" class="move-icon">    <img src="${computerImage}" class="move-icon">Computer`;
        setScores();
        
    }


    function setScores(){
        document.querySelector('.js-score').innerHTML = `Wins: ${playerScores.wins}, Loss: ${playerScores.losses}, Tie: ${playerScores.tie}`;
    }