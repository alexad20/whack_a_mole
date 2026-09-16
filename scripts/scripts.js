let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

window.onload = function () {
    setGame();
    document.getElementById("refreshButton").onclick = function() {
        window.location.reload(); // This reloads the page
    };
    document.getElementById("nextLevel").onclick = function() {
        window.location.reload(); // This reloads the page
    };
    
}

function setGame() {
    // Set up the grid for the game board in HTML
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000);
    setInterval(setPlant, 1100);
}

function getRandomTile(excludeId){
    let num;
    do {
        num = Math.floor(Math.random() * 9);
    } while (num.toString() === excludeId);
    return num.toString();
}

function setMole(){
    if(gameOver){
        return;
    }
    if(currMoleTile){
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "../images/monty-mole.png";
    let num = getRandomTile(currPlantTile ? currPlantTile.id : null);
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant(){
    if(gameOver){
        return;
    }
    if(currPlantTile){
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "../images/piranha-plant.png";
    let num = getRandomTile(currMoleTile ? currMoleTile.id : null);
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile(){
    if(gameOver){
        return;
    }
    if(this === currMoleTile){
        this.innerHTML = "";  // Clear the mole from the tile immediately upon clicking
        score += 10;
        document.getElementById("score").innerText = score.toString();
    } else if (this === currPlantTile){
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
        document.getElementById("refreshButton").style.display = "block"; // Show the button when game is over
    }
    if(score == 100){
        document.getElementById("score").innerText = "Congrats you win: " + score.toString();

        gameOver = true;

        document.getElementById("nextLevel").style.display = "block"; // Show the button when game is over
    }
}