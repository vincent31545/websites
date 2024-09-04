var chessBoardList = [["R", "Kn", "B", "Q", "K", "B", "Kn", "R"], 
                      ["P", "P", "P", "P", "P", "P", "P", "P"], 
                      [".", ".", ".", ".", ".", ".", ".", "."],
                      [".", ".", ".", ".", ".", ".", ".", "."],
                      [".", ".", ".", ".", ".", ".", ".", "."],
                      [".", ".", ".", ".", ".", ".", ".", "."],
                      ["P", "P", "P", "P", "P", "P", "P", "P"],
                      ["R", "Kn", "B", "Q", "K", "B", "Kn", "R"]];
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
}

function allowMove() {
    
}