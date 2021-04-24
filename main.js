
const Player = {
    Human: "X",
    Bot: "O"
}

class Game {

    constructor() {
        this.board = document.querySelector("#board");
        this.gameEnded = false;
        this.cells = []
        for (let i = 0; i < 9; i++) {
            const div = document.createElement("div");
            div.classList.add("cell");
            div.addEventListener("click", (ev) => {
                this.play(i);
            })

            this.board.appendChild(div);
            this.cells.push({
                index: i,
                content: "",
                target: div
            })
        }
    }


    draw() {
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].target.innerHTML = this.cells[i].content;
        }
    }


    play(moveIndex) {
        if (this.gameEnded) {
            return;
        }
        if (this.cells[moveIndex].content != "") {
            alert("not allowed");
            return;
        }

        this.cells[moveIndex].content = Player.Human;

        // console.log(this._getWinner())

        let newMoveIndex = -1;
        let value = 1;

        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i].content == "") {
                this.cells[i].content = Player.Bot;
                let newValue = this.minimax(true, 1);
                console.log(`i: ${i}, value: ${newValue}`)
                if (newValue < value) {
                    newMoveIndex = i;
                    value = newValue;
                }
                this.cells[i].content = "";
            }
        }

        if (newMoveIndex >= 0)
            this.cells[newMoveIndex].content = Player.Bot;

        this.draw();



        console.log("d\nd")

        const winner = this._getWinner();
        this.gameEnded = winner != 0 || this._isFull();
        if (this.gameEnded) {
            if (winner > 0)
                document.querySelector("#alert").innerHTML = "Winner is <strong>X</strong>";
            else if (winner < 0)
                document.querySelector("#alert").innerHTML = "Winner is <strong>O</strong>";
            else
                document.querySelector("#alert").innerHTML = "It's a draw";
        }

    }



    minimax(maximize, depth) {

        if (this._isFull() || this._getWinner() != 0) {
            return this._getWinner() / depth;
        }

        if (maximize) {
            let value = -Infinity;
            for (let i = 0; i < this.cells.length; i++) {
                if (this.cells[i].content == "") {
                    this.cells[i].content = Player.Human;
                    value = Math.max(value, this.minimax(false, depth + 1))
                    this.cells[i].content = "";
                }
            }
            return value;
        } else {
            let value = +Infinity;
            for (let i = 0; i < this.cells.length; i++) {
                if (this.cells[i].content == "") {
                    this.cells[i].content = Player.Bot;
                    value = Math.min(value, this.minimax(true, depth + 1))
                    this.cells[i].content = "";
                }
            }
            return value;
        }

    }

    _getWinner() {
        const c = this.cells;

        if (
            c[0].content == c[1].content && c[1].content == c[2].content && c[2].content == Player.Human ||
            c[3].content == c[4].content && c[4].content == c[5].content && c[5].content == Player.Human ||
            c[6].content == c[7].content && c[7].content == c[8].content && c[8].content == Player.Human ||
            //
            c[0].content == c[3].content && c[3].content == c[6].content && c[6].content == Player.Human ||
            c[1].content == c[4].content && c[4].content == c[7].content && c[7].content == Player.Human ||
            c[2].content == c[5].content && c[5].content == c[8].content && c[8].content == Player.Human ||
            //
            c[0].content == c[4].content && c[4].content == c[8].content && c[8].content == Player.Human ||
            c[2].content == c[4].content && c[4].content == c[6].content && c[6].content == Player.Human
        ) {
            return 100;
        }
        else if (
            c[0].content == c[1].content && c[1].content == c[2].content && c[2].content == Player.Bot ||
            c[3].content == c[4].content && c[4].content == c[5].content && c[5].content == Player.Bot ||
            c[6].content == c[7].content && c[7].content == c[8].content && c[8].content == Player.Bot ||
            //
            c[0].content == c[3].content && c[3].content == c[6].content && c[6].content == Player.Bot ||
            c[1].content == c[4].content && c[4].content == c[7].content && c[7].content == Player.Bot ||
            c[2].content == c[5].content && c[5].content == c[8].content && c[8].content == Player.Bot ||
            //
            c[0].content == c[4].content && c[4].content == c[8].content && c[8].content == Player.Bot ||
            c[2].content == c[4].content && c[4].content == c[6].content && c[6].content == Player.Bot
        ) {
            return -100;
        }
        return 0;
    }

    _isFull() {
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i].content == "") {
                return false;
            }
        }
        return true;
    }

}


const game = new Game();
