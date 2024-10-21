const board = document.getElementById('board');
let currentRow = 1;
let currentCol = 10;
let image;
let matBool=[];
let cntBall=1;
let idSetInterval;
let gameOver = false;

function creatMatBool() {
    for(let i = 0; i < 10; i++){
        matBool[i]=[];
        for (let j = 0; j < 12; j++)
            matBool[i][j]=false;
        }
}

function createBoard() {
    for (let i = 0; i < 10; i++) {
        const row = document.createElement('tr')
        for (let j = 0; j < 12; j++) {
            const cell = document.createElement('td');
            if ((i == 0 || i == 9) && j == 5) {
                cell.style.backgroundColor = 'lightgray';
            } else if ((j == 0 || j == 11) && i == 4) {
                cell.style.backgroundColor = 'lightgray'; 
            } else if (j == 0 || j == 11 || i == 0 || i == 9) {
                cell.style.backgroundColor = 'purple';
            }
            row.appendChild(cell)
        }
        board.appendChild(row)
    }
    
}

function beforGame(){
    image=document.createElement('img');
    image.id="imgMove";
    image.src="../image/gamer-purple.png"
    const cell=board.getElementsByTagName('tr')[currentRow].getElementsByTagName('td')[currentCol];
    cell.appendChild(image);
    matBool[1][10]=true
    const imgBall=document.createElement('img');
    imgBall.src="../image/ball.png"
    imgBall.alt="ball"
    const cellBall=board.getElementsByTagName('tr')[4].getElementsByTagName('td')[5];
    cellBall.appendChild(imgBall);
    matBool[4][5]=true
}

function addBall(){
    const imgBall=document.createElement('img');
    imgBall.src="../image/ball.png"
    imgBall.alt="ball"
    let rowNum
    let columnNum
    do{
        rowNum=Math.floor(Math.random()*(9-1)+1);
        columnNum=Math.floor(Math.random()*(11-1)+1);
    }while(matBool[rowNum][columnNum])
    const row=board.getElementsByTagName('tr')[rowNum];
    const colum=row.getElementsByTagName('td')[columnNum];
    colum.appendChild(imgBall)
    matBool[rowNum][columnNum]=true
    cntBall++;
}

function muneMove(){
    document.addEventListener('keydown', (e) => {
        if (gameOver) return;
        switch (e.key) {
            case 'ArrowUp':
                moveImage(-1, 0); 
                break;
            case 'ArrowDown':
                moveImage(1, 0);
                break;
            case 'ArrowLeft':
                moveImage(0, -1);
                break;
            case 'ArrowRight':
                moveImage(0, 1);
                break;
        }
    });
}

function moveImage(dx, dy) {
    let newRow = currentRow + dx;
    let newCol = currentCol + dy;

    if (newRow < 0 && newCol == 5) {
        newRow = 9;
    } else if (newRow > 9 && newCol == 5) {
        newRow = 0; 
    }

    if (newCol < 0 && newRow == 4) {
        newCol = 11; 
    } else if (newCol > 11 && newRow == 4) {
        newCol = 0; 
    }

    if (
        (newRow > 0 && newRow < 9 && newCol > 0 && newCol < 11) ||  
        ((newRow == 0 || newRow == 9) && newCol == 5) ||  
        ((newCol == 0 || newCol == 11) && newRow == 4)    
    ) {
        const currentCell = board.getElementsByTagName('tr')[currentRow].getElementsByTagName('td')[currentCol];
        currentCell.innerHTML = "";

        if (matBool[newRow][newCol]) {
            const newCellWithBall = board.getElementsByTagName('tr')[newRow].getElementsByTagName('td')[newCol];
            newCellWithBall.innerHTML = "";
            matBool[newRow][newCol] = false;
            cntBall--;
        }

        currentRow = newRow;
        currentCol = newCol;
        const newCell = board.getElementsByTagName('tr')[currentRow].getElementsByTagName('td')[currentCol];
        newCell.appendChild(image);

        if (cntBall == 0) {
            setTimeout(() => {
                creatModel();
                clearInterval(idSetInterval);
            }, 100);
        }
    }
}

function creatModel(){
    gameOver = true;

    const home=document.getElementsByTagName('body')[0];
    const modal= document.createElement('div');
    modal.className="modal"
    modal.style.display = "block";
    const modalContent = document.createElement('div');
    modalContent.className="modal-content";
    const content=document.createElement('p')
    content.className="content"
    content.innerHTML="win!!!!"
    const buttonContainer = document.createElement('div');
    buttonContainer.className="button-container"
    const button=document.createElement('button')
    button.className="button"
    button.innerHTML="new game"
    button.onclick = function() {
        modal.style.display = "none";
        window.location.reload();
    };
    const buttonClose=document.createElement('button')
    buttonClose.className="buttonClose"
    buttonClose.innerHTML="close"
    buttonClose.onclick = function() {
        modal.style.display = "none";
    };
    modalContent.appendChild(content)
    buttonContainer.appendChild(button)
    buttonContainer.appendChild(buttonClose)
    modalContent.appendChild(buttonContainer)
    modal.appendChild(modalContent)
    home.appendChild(modal)
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
}

function game(){
    creatMatBool();
    createBoard()
    beforGame()
    muneMove()
    idSetInterval=setInterval(addBall, 3000);
}

game();

