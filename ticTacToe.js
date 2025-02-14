const Gameboard=(function(){
  const board=[
    [" "," "," "],
    [" "," "," "],
    [" "," "," "]
  ]
  const board1 = Array(7).fill().map(() => Array(7).fill(" "));
  
  const board2=Array(15).fill().map(()=>Array(15).fill(" "));
  let count1=0;
  let count2=0;
  const toMark=(boarding,mark,row,column)=>{
        boarding[row][column]=mark;
        console.log(row)
        console.log(column)
  }
  // const thing=board1[5][6];
  const toMarkDOM=(boarding,num)=>{
    const squareDiv=document.querySelectorAll(".squareDiv");
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
        
        } else {
          console.log("co mark roi");
          return;
        }
        if(boarding===board){
          giveResult("connect3Game")
        }else if(boarding===board1){
          giveResult("connect4Game")
        }
      })
    })
  }
  const modeChange=()=>{
  const connect3=document.querySelector(".connect3");
  const connect4=document.querySelector(".connect4");
  const connect5=document.querySelector(".connect5");
  
  connect3.addEventListener("click",function(){
      displayUIGameBoard(3);
      toMarkDOM(board,7);
  })
  connect4.addEventListener("click",function(){
    displayUIGameBoard(7);
    toMarkDOM(board1,4);
  })
  connect5.addEventListener("click",function(){
    displayUIGameBoard(15);
    toMarkDOM(board2,1.5);
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
  
  const resetBoard=(boarding)=>{
    const squareDiv=document.querySelectorAll(".squareDiv")
    const paragraph=document.querySelector(".paraNote")
    squareDiv.forEach(div=>{
      div.innerHTML="";
      paragraph.textContent="";
    })
    for(let i=0;i<boarding.length;i++){
      for(let j=0;j<boarding[i].length;j++){
        boarding[i][j]=" "
          
      }
    }
    count1=0;
    count2=0;
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
    const declareWinner = (player) => {
      p.textContent = `${player === "X" ? "Player1" : "Player2"} wins the game`;
      notification.style.display = "block";
      if(type==="connect3Game"){closeUp(board)}
      else if(type==="connect4Game"){closeUp(board1)}
      else if(type==="connect5Game"){closeUp(board2)}
    
      winnerDeclared = true;  // Stop further checks once a winner is found
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
      if (!winnerDeclared) {
        squareDiv.forEach((div) => {
          if (div.textContent !== "") cell++;
          if (cell === 9) {
            paraNote.textContent = "The Game is tied.";
            notification.style.display = "block";
            closeUp();
          }
        });
      }
    }
   else if(type==="connect4Game"){
    let winnerDeclared = false;
    if(!winnerDeclared){
      for(let i=0;i<board1.length-3;i++){
        for(let j=0;j<board1[i].length-3;j++){
          if(board1[i][j]===board1[i][j+1]&& board1[i][j+1]===board1[i][j+2]&&board1[i][j+2]===board1[i][j+3]){
             if(board1[i][j]!==" "){
               declareWinner(board1[i][j]);
             }
          }
          else if(board1[i][j]===board1[i+1][j]&&board1[i+1][j]===board1[i+2][j]&&board1[i+2][j]===board1[i+3][j]){
            if(board1[i][j]!==" "){
              declareWinner(board1[i][j]);
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


