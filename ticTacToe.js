const Gameboard=(function(){
  const board=[
    [" "," "," "],
    [" "," "," "],
    [" "," "," "]
  ]
  const board1 = Array(7).fill().map(() => Array(7).fill(" "));
  let currentPlayer="O"
  const board2=Array(15).fill().map(()=>Array(15).fill(" "));
  let count1=0;
  let count2=0;
  let Xplayer=0;
  let Oplayer=0;
  let round=0;
  const toMark=(boarding,mark,row,column)=>{
        boarding[row][column]=mark;
        console.log(row)
        console.log(column)
  }
  // const thing=board1[5][6];
  const toMarkDOM=(boarding,num)=>{
    const squareDiv=document.querySelectorAll(".squareDiv");
    const playTurn=document.querySelector(".playTurn")
     
     console.log("currentPlayer: "+currentPlayer)
    squareDiv.forEach(div=>{
      console.log(div)
     
      div.addEventListener("click",function(){
       
        let row=div.dataset.row;
        let col=div.dataset.col;
        console.log(row);console.log(col)
        if(div.textContent===""){
          console.log("bi trong");
          const p=document.createElement("p");
          p.style.fontSize=`${num}rem`;
          p.setAttribute("class","mark");
          playTurn.textContent=`Player's ${currentPlayer} turn...`
         
          if(count1===count2){
            p.textContent=player1.mark;
            
            toMark(boarding,player1.mark,row,col)
            toDraw(boarding);
            div.appendChild(p);
            count1++;
          }
          else if(count1>count2){
            p.textContent=player2.mark;
            toMark(boarding,player2.mark,row,col)
            console.log(row),console.log(col)
            toDraw(boarding);
            div.appendChild(p);
            count2++;
          }
          currentPlayer=currentPlayer==="X"? "O":"X";
          console.log(currentPlayer)
        } else {
          console.log("co mark roi");
          return;
        }
        if(boarding===board){
          giveResult("connect3Game")
        }else if(boarding===board1){
          giveResult("connect4Game")
        }else if(boarding===board2){
          giveResult("connect5Game")
        }
      })
    })
    startNewGame(boarding)
    replayRound(boarding)
  }
  const modeChange=()=>{
  const connect3=document.querySelector(".connect3");
  const connect4=document.querySelector(".connect4");
  const connect5=document.querySelector(".connect5");
  const playTurn=document.querySelector(".playTurn")
  displayUIGameBoard(3);
      playTurn.style.display="block";
      playTurn.textContent="Player's X Turn"
      count1=0;count2=0;
      toMarkDOM(board,7);
  connect3.addEventListener("click",function(){
      displayUIGameBoard(3);
      playTurn.style.display="block";
      playTurn.textContent="Player's X Turn"
      count1=0;count2=0;
      toMarkDOM(board,8);
  })
  connect4.addEventListener("click",function(){
    displayUIGameBoard(7);
    playTurn.style.display="block";
     playTurn.textContent="Player's X Turn"
     count1=0;count2=0
    toMarkDOM(board1,4);
  })
  connect5.addEventListener("click",function(){
    displayUIGameBoard(15);
    playTurn.style.display="block";
     playTurn.textContent="Player's X Turn"
     count1=0;count2=0;
    toMarkDOM(board2,1.6);
  })
  
  }
  const toDraw=(board)=>{
    for(let i=0;i<board.length;i++){
        const array=[];
        for(let j=0;j<board[i].length;j++){
            array.push(board[i][j]);
        }
        console.log(array);
    }
  }
  const startNewGame=(boarding)=>{
    const newGameBtn=document.querySelector(".startNewGame")
    newGameBtn.addEventListener("click",function(){
      round=0;
      Xplayer=0;
      Oplayer=0;
      document.querySelector(".roundNumber").innerText="0"
      document.querySelector(".XNumber").innerText="0"
      document.querySelector(".ONumber").innerText="0";
      resetBoard(boarding)
    })
   
  }
  const replayRound=(boarding)=>{
      const replayBtn=document.querySelector(".replay");
      replayBtn.addEventListener("click",function(){
        resetBoard(boarding)
      })
  }
  
  const resetBoard=(boarding)=>{
    const squareDiv=document.querySelectorAll(".squareDiv")
    const paragraph=document.querySelector(".paraNote")
    const playTurn=document.querySelector(".playTurn")
    let num
    squareDiv.forEach(div=>{
      div.innerHTML="";
      paragraph.textContent="";

    })
    
    console.log("hola"+ boarding)
    for(let i=0;i<boarding.length;i++){
      for(let j=0;j<boarding[i].length;j++){
        boarding[i][j]=" "
          
      }
    }
    playTurn.textContent="Player's X turn"
    currentPlayer="O"
    count1=0;
    count2=0;

    if(boarding===board){toMarkDOM(board,7)}
    else if(boarding===board1){toMarkDOM(board1,4)}
    else if(boarding===board2){toMarkDOM(board2,1.5)}
  }
  const closeUp=(boarding)=>{
  const closebtn=document.querySelector(".close")
  const notification=document.querySelector(".notification")
  closebtn.addEventListener("click",()=>{
    notification.style.display="none";
    resetBoard(boarding);
  })
  }
  const giveResult = (type) => {
    
    const notification = document.querySelector(".notification");
    const p = document.querySelector(".paraNote");
    const close = document.querySelector(".close");
    const squareDiv = document.querySelectorAll(".squareDiv");
    const paraNote = document.querySelector(".paraNote");
    const Xnumber=document.querySelector(".XNumber");
    const Onumber=document.querySelector(".ONumber");
    const roundNumber=document.querySelector(".roundNumber");
    const declareWinner = (player) => {
      round++;
      p.textContent = `${player === "X" ? "Player1" : "Player2"} wins the game`;
      if(player==="X"){
        Xplayer++;
        Xnumber.innerText=Xplayer;
      }else if(player==="O"){
        Oplayer++
        Onumber.innerText=Oplayer;
      }
      roundNumber.innerText=round;
      
      
      notification.style.display = "block";
      if(type==="connect3Game"){closeUp(board)}
      else if(type==="connect4Game"){closeUp(board1)}
      else if(type==="connect5Game"){closeUp(board2)}
      
     let winnerDeclared = true;  // Stop further checks once a winner is found
    };
    if(type==="connect3Game"){
      let cell = 0;
      let winnerDeclared = false; // To prevent further checking after a winner is found

    
      // Check rows and columns for a winner
      for (let i = 0; i < 3; i++) {
        // Check row
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== " ") {
          declareWinner(board[i][0]);
        }
        // Check column
        else if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== " ") {
          declareWinner(board[0][i]);
        }
      }
    
      // Check diagonals for a winner
      if (!winnerDeclared) {
       
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== " ") {
          declareWinner(board[0][0]);
        } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== " ") {
          declareWinner(board[0][2]);
        }
      }
    
      // Check if the game is tied (only if no winner declared)
      if (winnerDeclared) {
        squareDiv.forEach((div) => {
          if (div.textContent !== "") cell++;
          if (cell === 9) {
            paraNote.textContent = "The Game is tied.";
            notification.style.display = "block";
            round++;
            document.querySelector(".roundNumber").innerText=round;
            closeUp();
          }
        });
      }
    }
   else if(type==="connect4Game"){
      
      let winnerDeclared = false;
      if(!winnerDeclared){
        //checking horizontally
        for(let i=0;i<board1.length;i++){
          for(let j=0;j<board1[i].length-3;j++){
            if(board1[i][j]===board1[i][j+1]&& board1[i][j+1]===board1[i][j+2]&&board1[i][j+2]===board1[i][j+3]){
               if(board1[i][j]!==" "){
                 declareWinner(board1[i][j]);
               }
            }
         
          }
        }
              // Checking vertically
        for (let j = 0; j < board1[0].length; j++) { // Iterate over columns
          for (let i = 0; i < board1.length - 3; i++) { // Iterate over rows, stopping 3 rows from the bottom
            if (board1[i][j] === board1[i + 1][j] && board1[i + 1][j] === board1[i + 2][j] && board1[i + 2][j] === board1[i + 3][j]) {
              if (board1[i][j] !== " ") { // Check if the cell is not empty
                declareWinner(board1[i][j]);
              }
            }
          }
        }   
        //checking diagnal
        for(let i=0;i<board1.length-3;i++){
          for(let j=0;j<board1[i].length-3;j++){
             if(board1[i][j]===board1[i+1][j+1]&& board1[i+1][j+1]===board1[i+2][j+2]&& board1[i+2][j+2]===board1[i+3][j+3]){
                if(board1[i][j]!==" "){
                  declareWinner(board1[i][j])
                }
             }
          }
        }
       //checking anti diagnal
       for(let i=3;i<board1.length;i++){
        for (let j=0;j<board1[i].length-3;j++){
           if(board1[i][j]===board1[i-1][j+1]&&board1[i-1][j+1]===board1[i-2][j+2]&&board1[i-2][j+2]===board1[i-3][j+3]){
            if(board1[i][j]!==" "){
              declareWinner(board1[i][j])
            }
           }
        }
       }
      }
    }
    
    else if(type==="connect5Game"){
      let winnerDeclared=false;
       //checking horizontally
       if(!winnerDeclared){
         for(let i=0;i<board2.length;i++){
           for(let j=0;j<board2[i].length-4;j++){
              if(board2[i][j]===board2[i][j+1]&&board2[i][j+1]===board2[i][j+2]&&board2[i][j+2]===board2[i][j+3]&&board2[i][j+3]===board2[i][j+4]){
               if(board2[i][j]!==" "){
                 declareWinner(board2[i][j])
               }
              }
           }
          }
          //checking vertically
          for(let j=0;j<board2.length;j++){
           for(let i=0;i<board2[j].length-4;i++){
              if(board2[i][j]===board2[i+1][j]&&board2[i+1][j]===board2[i+2][j]&&board2[i+2][j]===board2[i+3][j]&&board2[i+3][j]===board2[i+4][j]){
               if(board2[i][j]!==" "){
                 declareWinner(board2[i][j])
               }
              }
           }
          }
          //checking anti diagnally
          for(let i=0;i<board2.length-4;i++){
           for(let j=0;j<board2[i].length-4;j++){
              if(board2[i][j]===board2[i+1][j+1]&& board2[i+1][j+1]===board2[i+2][j+2]&&board2[i+2][j+2]===board2[i+3][j+3]&&board2[i+3][j+3]===board2[i+4][j+4]){
               if(board2[i][j]!==" "){
                 declareWinner(board2[i][j])
               }
              }
           }
          }
          //checking diagnally
          for (let i = 4; i < board2.length; i++) {
           for (let j = 0; j < board2[i].length - 4; j++) {
             if (board2[i][j] === board2[i-1][j+1] &&
                 board2[i-1][j+1] === board2[i-2][j+2] &&
                 board2[i-2][j+2] === board2[i-3][j+3] &&
                 board2[i-3][j+3] === board2[i-4][j+4]) {
               if (board2[i][j] !== " ") {
                 declareWinner(board2[i][j]);
               }
             }
           }
         }
         
        } 
      }
  };


  const displayUIGameBoard=(num)=>{
    const gameBoard=document.querySelector(".gameBoard");
    gameBoard.innerHTML=""
    for(let i=0;i<num;i++){
      for(let j=0;j<num;j++){
        const squareDiv=document.createElement("div");
        squareDiv.setAttribute("class","squareDiv");
        squareDiv.setAttribute("data-row",i);
        squareDiv.setAttribute("data-col",j);
        squareDiv.style.height=`${500/num}px`;
        squareDiv.style.width=`${500/num}px`;
        gameBoard.appendChild(squareDiv);
      }
    
    }
  }
 const toPlayGame=()=>{
  modeChange();

 }
  const player1={
    mark:"X",
  }
  const player2={
    mark:"O",
  }
  return{
    toMark,
    toDraw,
    giveResult,
    displayUIGameBoard,
    toMarkDOM,
    modeChange,
    toPlayGame,
    board1,board2
  }
})();


Gameboard.toPlayGame();


