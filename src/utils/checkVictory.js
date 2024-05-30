

export const checkVictory = (boardState) => {
    for (let i = 0; i < boardState.length; i++) {
      for (let j = 0; j < boardState[i].length; j++) {
        if(boardState.length === 3){
        if (
          //row
          (boardState[i][j] &&
            boardState[i][j] === boardState[i][j + 1] &&
            boardState[i][j + 1] === boardState[i][j + 2]) ||
          //column
          (boardState[i + 1] !== undefined &&
            boardState[i + 2] !== undefined &&
            boardState[i][j] &&
            boardState[i][j] === boardState[i + 1][j] &&
            boardState[i + 1][j] === boardState[i + 2][j]) ||
          // diagonal left
          (boardState[i][j] &&
            boardState[i + 1] !== undefined &&
            boardState[i + 2] !== undefined &&
            boardState[i][j] === boardState[i + 1][j + 1] &&
            boardState[i + 1][j + 1] &&
            boardState[i + 1][j + 1] === boardState[i + 2][j + 2]) ||
          // diagonal right
          (boardState[i][j] &&
            boardState[i - 1] !== undefined &&
            boardState[i - 2] !== undefined &&
            boardState[i][j] === boardState[i - 1][j + 1] &&
            boardState[i - 1][j + 1] === boardState[i - 2][j + 2])
        ) {
          return true;
        }}
        if(boardState.length === 6){
            if (
              //row
              (boardState[i][j] &&
                boardState[i][j] === boardState[i][j + 1] &&
                boardState[i][j + 1] === boardState[i][j + 2] &&
                boardState[i][j + 2] === boardState[i][j + 3]) ||
              //column
              (boardState[i + 1] !== undefined &&
                boardState[i + 2] !== undefined &&
                boardState[i + 3] !== undefined &&
                boardState[i][j] &&
                boardState[i][j] === boardState[i + 1][j] &&
                boardState[i + 1][j] === boardState[i + 2][j] &&
                boardState[i + 2][j] === boardState[i + 3][j])  ||
              // diagonal left
              (boardState[i][j] &&
                boardState[i + 1] !== undefined &&
                boardState[i + 2] !== undefined &&
                boardState[i + 3] !== undefined &&
                boardState[i][j] === boardState[i + 1][j + 1] &&
                boardState[i + 1][j + 1] &&
                boardState[i + 1][j + 1] === boardState[i + 2][j + 2] &&
                boardState[i + 2][j + 2] === boardState[i + 3][j + 3]) ||
              // diagonal right
              (boardState[i][j] &&
                boardState[i - 1] !== undefined &&
                boardState[i - 2] !== undefined &&
                boardState[i - 3] !== undefined &&
                boardState[i][j] === boardState[i - 1][j + 1] &&
                boardState[i - 1][j + 1] === boardState[i - 2][j + 2] &&
                boardState[i - 2][j + 2] === boardState[i - 3][j + 3]
            )
            ) {
              return true;
            }}
            if(boardState.length === 9){
                if (
                  //row
                  (boardState[i][j] &&
                    boardState[i][j] === boardState[i][j + 1] &&
                    boardState[i][j + 1] === boardState[i][j + 2] &&
                    boardState[i][j + 2] === boardState[i][j + 3] &&
                    boardState[i][j + 3] === boardState[i][j + 4] ) ||
                  //column
                  (boardState[i + 1] !== undefined &&
                    boardState[i + 2] !== undefined &&
                    boardState[i + 3] !== undefined &&
                    boardState[i + 4] !== undefined &&
                    boardState[i][j] &&
                    boardState[i][j] === boardState[i + 1][j] &&
                    boardState[i + 1][j] === boardState[i + 2][j] &&
                    boardState[i + 2][j] === boardState[i + 3][j] &&
                    boardState[i + 3][j] === boardState[i + 4][j])  ||
                  // diagonal left
                  (boardState[i][j] &&
                    boardState[i + 1] !== undefined &&
                    boardState[i + 2] !== undefined &&
                    boardState[i + 3] !== undefined &&
                    boardState[i + 4] !== undefined &&
                    boardState[i][j] === boardState[i + 1][j + 1] &&
                    boardState[i + 1][j + 1] &&
                    boardState[i + 1][j + 1] === boardState[i + 2][j + 2] &&
                    boardState[i + 2][j + 2] === boardState[i + 3][j + 3] &&
                    boardState[i + 3][j + 3] === boardState[i + 4][j + 4]
                ) ||
                  // diagonal right
                  (boardState[i][j] &&
                    boardState[i - 1] !== undefined &&
                    boardState[i - 2] !== undefined &&
                    boardState[i - 3] !== undefined &&
                    boardState[i - 4] !== undefined &&
                    boardState[i][j] === boardState[i - 1][j + 1] &&
                    boardState[i - 1][j + 1] === boardState[i - 2][j + 2] &&
                    boardState[i - 2][j + 2] === boardState[i - 3][j + 3] &&
                    boardState[i - 3][j + 3] === boardState[i - 4][j + 4]
                )
                ) {
                  return true;
                }}
      }
    }
  };