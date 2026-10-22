export class Puissance4Game {
    constructor(root, config) {
        this.root = root;
        this.rows = config.rows;
        this.columns = config.columns;
        this.player1 = config.player1;
        this.player2 = config.player2;
        this.board = [];
        this.currentPlayer = 1;
        this.opponent = 2;
        this.turnCount = 0;
        this.plateau();
        this.generateTable();
        this.displayCurrentPlayer();
    }
    
    destroy() {
        this.root
            .querySelectorAll(":scope > table, :scope > div:not(#scoreDisplay)")
            .forEach((el) => el.remove());
    }

    plateau() {
        for (let i = 0; i < this.rows; i++) {
            this.board.push(Array(this.columns).fill(0));
        }
    }

    // Générer le tableau
    generateTable() {
        const tbl = document.createElement("table");
        const tblBody = document.createElement("tbody");

        for (let i = 0; i < this.rows; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < this.columns; j++) {
                const cell = document.createElement("td");
                cell.setAttribute("coordx", i);
                cell.setAttribute("coordy", j);
                cell.style.width = "5em";
                cell.style.height = "5em";
                cell.style.background = "white";
                cell.addEventListener("click", () => this.dropPiece(j));
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
        }

        tbl.appendChild(tblBody);
        this.root.appendChild(tbl);
        tbl.setAttribute("border", "2");
    }

    // Affichage du joueur actuel
    displayCurrentPlayer() {
        let header = this.root.querySelector("h3");
        if (!header) {
            header = document.createElement("h3");
            this.root.prepend(header);
        }
        header.innerHTML = `Joueur actuel : ${this.joueurs()}`;
    }

    dropPiece(col) {
        for (let i = this.rows - 1; i >= 0; i--) {
            if (this.board[i][col] === 0) {
                const cell = this.root.querySelector(`td[coordx="${i}"][coordy="${col}"]`);
                cell.style.backgroundColor = this.currentPlayer === 1 ? "red" : "yellow";
                cell.style.animation = "drop 0.5s ease-out";
                this.board[i][col] = this.currentPlayer;
                this.turnCount++;

                if (this.checkWin(i, col)) {
                    this.showEndMessage(`Victoire du joueur ${this.joueurs()} !`);
                } else if (this.turnCount === this.rows * this.columns) {
                    this.showEndMessage("Égalité ! Recommencer la partie ?");
                } else {
                    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                    this.displayCurrentPlayer();
                }
                break;
            }
        }
    }

    joueurs() {
        return this.currentPlayer === 1 ? this.player1 : this.player2;
    }

    // Message qui propose de faire une nouvelle partie + bouton "Nouvelle Partie"
    showEndMessage(message) {
        const endMessage = document.createElement("div");
        endMessage.innerHTML = `<h2>${message}</h2>`;
        const restartButton = document.createElement("button");
        restartButton.textContent = "Nouvelle partie";
        restartButton.addEventListener("click", () => this.resetGame());

        endMessage.appendChild(restartButton);
        this.root.appendChild(endMessage);
    }

    // Victoire horizontale
    horizontale(row, col, player) {
        let count = 1;
        for (let j = col - 1; j >= 0; j--) {
            if (this.board[row][j] === player) count++;
            else break;
        }
        for (let j = col + 1; j < this.columns; j++) {
            if (this.board[row][j] === player) count++;
            else break;
        }
        return count >= 4;
    }

    // Victoire verticale
    verticale(row, col, player) {
        let count = 1;
        for (let i = row + 1; i < this.rows; i++) {
            if (this.board[i][col] === player) count++;
            else break;
        }
        return count >= 4;
    }

    // Victoire en diagonale vers la droite
    diagonaleDroite(row, col, player) {
        let count = 1;
        for (let i = row - 1, j = col + 1; i >= 0 && j < this.columns; i--, j++) {
            if (this.board[i][j] === player) count++;
            else break;
        }
        for (let i = row + 1, j = col - 1; i < this.rows && j >= 0; i++, j--) {
            if (this.board[i][j] === player) count++;
            else break;
        }
        return count >= 4;
    }

    // Victoire en diagonale vers la gauche
    diagonaleGauche(row, col, player) {
        let count = 1;
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (this.board[i][j] === player) count++;
            else break;
        }
        for (let i = row + 1, j = col + 1; i < this.rows && j < this.columns; i++, j++) {
            if (this.board[i][j] === player) count++;
            else break;
        }
        return count >= 4;
    }

    checkWin(row, col) {
        const player = this.board[row][col];
        return (
            this.horizontale(row, col, player) ||
            this.verticale(row, col, player) ||
            this.diagonaleDroite(row, col, player) ||
            this.diagonaleGauche(row, col, player)
        );
    }

    // Système de points
    showPoints() {}

    resetGame() {
        this.board = [];
        this.plateau();
        this.currentPlayer = 1;
        this.turnCount = 0;
        this.root.querySelectorAll("td").forEach((cell) => {
            cell.style.backgroundColor = "white";
            cell.style.animation = "";
        });
        // Supprime uniquement le message de fin (et plus "le premier div du document")
        this.root.querySelector(":scope > div:not(#scoreDisplay)")?.remove();
        this.displayCurrentPlayer();
    }
}