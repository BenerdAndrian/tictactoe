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
  return{
    toCheck,
    toMark,
    toDraw,
    displayUIGameBoard,
  }
})