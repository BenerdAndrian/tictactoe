const Gameboard=(function(){
  const board=[
    [" "," "," "],
    [" "," "," "],
    [" "," "," "]
  ]
  const toCheck=()=>{
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
            if(board[i][j]===" ") console.log("true");
            else if(board[i][j]!==" ") console.log("false");
        }
        
    }
  }
  const toMark=(mark,row,column)=>{
    board[row][column]=mark;
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
const displayUIGameBoard=()=>{
  const gameBoard=document.querySelector(".gameBoard");
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      const squareDiv=document.createElement("div");
      squareDiv.setAttribute("class","squareDiv");
      squareDiv.setAttribute("data-row",i);
      squareDiv.setAttribute("data-col",j);
      squareDiv.style.height=`${500/3}px`;
      squareDiv.style.width=`${500/3}px`;
      gameBoard.appendChild(squareDiv);
    }
  
  }
}
const giveResult=()=>{
  // Check rows
  let result='';
 for(let i=0;i<3;i++){
   //check rows
   if(board[i][0]===board[i][1]&&board[i][1]===board[i][2]&&board[i][0]!=" "){
     board[i][0]==="X"? console.log("player1 wins"):console.log("player2 wins")
   }
   //check columns
   else if(board[0][i]===board[1][i]&&board[1][i]===board[2][i]&&board[0][i]!=" "){
     board[0][i]==="X"? console.log("player1 wins"):console.log("player2 wins")
   }
 }
 if(board[0][0]===board[1][1] && board[1][1]===board[2][2]&& board[1][1]!=" "){
   board[0][0]==="X"? console.log("player1 wins"):console.log("player2 wins")
 }
 else if(board[0][2]===board[1][1] && board[1][1]===board[2][0]&& board[1][1]!=" "){
   board[0][2]==="X"? console.log("player1 wins"):console.log("player2 wins")
 }
}
  return{
    toCheck,
    toMark,
    toDraw,
    displayUIGameBoard,
    giveResult,
  }
})