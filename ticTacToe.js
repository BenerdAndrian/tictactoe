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

  return{
    toCheck,
  }
})