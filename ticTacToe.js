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
  return{
    toCheck,
    toMark,
    toDraw,
  }
})