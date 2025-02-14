const Gameboard=(function(){
  const board=[
    [" "," "," "],
    [" "," "," "],
    [" "," "," "]
  ]
  let count1=0;
  let count2=0;
  const toMark=(mark,row,column)=>{
        board[row][column]=mark;
  }
  const toMarkDOM=()=>{
    const squareDiv=document.querySelectorAll(".squareDiv");
    squareDiv.forEach(div=>{
      div.addEventListener("click",function(){
        let row=div.dataset.row;
        let col=div.dataset.col;
        if(div.textContent===""){
          console.log("bi trong");
          const p=document.createElement("p");
          p.setAttribute("class","mark");
          if(count1===count2){
            p.textContent=player1.mark;
            toMark(player1.mark,row,col)
             console.log(row);console.log(col)
            toDraw();
            div.appendChild(p);
            count1++;
          }
          else if(count1>count2){
            p.textContent=player2.mark;
            toMark(player2.mark,row,col)
            console.log(row),console.log(col)
            toDraw();
            div.appendChild(p);
            count2++;
          }
        
        } else {
          console.log("co mark roi");
          return;
        }
        giveResult();
      })
    })
  }
 
  const toDraw=()=>{
    for(let i=0;i<board.length;i++){
        const array=[];
        for(let j=0;j<board[i].length;j++){
            array.push(board[i][j]);
        }
        console.log(array);
    }
  }
  
  const resetBoard=()=>{
    const squareDiv=document.querySelectorAll(".squareDiv")
    const paragraph=document.querySelector(".paraNote")
    squareDiv.forEach(div=>{
      div.innerHTML="";
      paragraph.textContent="";
    })
    for(let i=0;i<board.length;i++){
      for(let j=0;j<board[i].length;j++){
        board[i][j]=" "
          
      }
    }
    count1=0;
    count2=0;
  }
  const closeUp=()=>{
  const closebtn=document.querySelector(".close")
  const notification=document.querySelector(".notification")
  closebtn.addEventListener("click",()=>{
    notification.style.display="none";
    resetBoard();
  })
  }
  const giveResult = () => {
    const notification = document.querySelector(".notification");
    const p = document.querySelector(".paraNote");
    const close = document.querySelector(".close");
    const squareDiv = document.querySelectorAll(".squareDiv");
    const paraNote = document.querySelector(".paraNote");
    
    let cell = 0;
    let winnerDeclared = false; // To prevent further checking after a winner is found
  
    // Function to handle game result notification
    const declareWinner = (player) => {
      p.textContent = `${player === "X" ? "Player1" : "Player2"} wins the game`;
      notification.style.display = "block";
      closeUp();
      winnerDeclared = true;  // Stop further checks once a winner is found
    };
  
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
  };


  const displayUIGameBoard=()=>{
    const gameBoard=document.querySelector(".gameBoard");
    for(let i=0;i<3;i++){
      for(let j=0;j<3;j++){
        const squareDiv=document.createElement("div");
        squareDiv.setAttribute("class","squareDiv");
        squareDiv.setAttribute("data-row",i);
        squareDiv.setAttribute("data-col",j);
        squareDiv.style.height=`${300/3}px`;
        squareDiv.style.width=`${300/3}px`;
        gameBoard.appendChild(squareDiv);
      }
    
    }
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
  }
})();


Gameboard.displayUIGameBoard();
Gameboard.toMarkDOM();
