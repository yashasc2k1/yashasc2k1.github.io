document.addEventListener('DOMContentLoaded', () =>{
    generateGrid();
});
let matrix = [];
let selectedCell = null;
function generateGrid(){
    const gridContainer = document.getElementById('grid-container');
    for(let i = 0;i < 9; i++){
        matrix[i] = [];
        for(let j = 0;j < 9; j++){
            const cell = document.createElement('div');
            const input = document.createElement('input');

            input.type = 'text';
            input.maxLength = 1;
            input.classList.add('cell');
            input.id = `cell-${i}-${j}`;
            matrix[i][j] = -1;
            
            input.addEventListener('input', event => {addNumber(event.target)});
            cell.appendChild(input);
            gridContainer.appendChild(cell);
        }
    }
    printNumbers();
}     



function addNumber(inputCell){
    if(inputCell !== null){
        let value = inputCell.value;
        let row = parseInt(inputCell.id.slice(5,6));
        let column = parseInt(inputCell.id.slice(7, 8));
        
        if(!isNaN(value) && value >= 1 && value <= 9){
            if(isValid(value, row, column)){
                matrix[row][column] = parseInt(value);
                inputCell.value = value;
                return;
            }
        }
        matrix[row][column] = -1;

        inputCell.classList.add('glow-red');
                setTimeout(() => {
                    inputCell.classList.remove('glow-red');
                }, 1000);

        inputCell.value = null;
    }
}

function isValid(number, row, column){
    //row check and column check
    for(let i = 0; i < 9; i++){
        if(matrix[row][i] == number) return false;
        if(matrix[i][column] == number) return false;
    }



    
    //3x3 check
    let rstart = Math.floor(row / 3) * 3;
    let cstart = Math.floor(column / 3) * 3;
    for(let i = rstart; i < rstart + 3; i++){
        for(let j = cstart; j < cstart + 3; j++){
            if(matrix[i][j] == number) return false;
        }
    }
    return true;
}


function solveSudoku(){
    helperSolveSudoku();
    printNumbers();
}


function helperSolveSudoku(){
    for(let i = 0;i < 9; i++){
        for(let j = 0;j < 9; j++){
            if(matrix[i][j] === -1){
                let flag = false;
                let notFound = false;
                for(let num = 1; num <= 9; num++){
                    if(isValid(num, i, j)){
                        notFound = true;
                        matrix[i][j] = num;
                        if(helperSolveSudoku()) return true;
                        else{
                            flag = false;
                        }
                    }
                }
                if(!notFound) return false;
                if(!flag){
                    matrix[i][j] = -1;
                    return false;
                }
            }
        }
    }
    return true;
}




async function printNumbers(){
    for(let i = 0; i < 9; i++){
        for(let j = 0;j < 9; j++){
            const inputBox = document.getElementById(`cell-${i}-${j}`);
            if(matrix[i][j] != -1){
                await new Promise(resolve => setTimeout(() => {
                    inputBox.value = matrix[i][j];
                    resolve();
                }, 50));
                // inputBox.value = matrix[i][j];
            }
            else{
                inputBox.value = null;
            }
        }
    }
}


function reset(){
    for(let i = 0; i < 9; i++){
        for(let j = 0;j < 9; j++){
            if(matrix[i][j] != -1){
                document.getElementById(`cell-${i}-${j}`).value = null;
                matrix[i][j] = -1;
            }
        }
    }
}






