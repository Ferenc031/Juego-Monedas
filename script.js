document.addEventListener("DOMContentLoaded", () => {

    $(function() {
        $('input[type=number]').keypress(function(key) {
            if(key.charCode < 48 || key.charCode > 57) return false;
        });
    });
    const gameForm = document.getElementById("game-form");
    const clearTableButton = document.getElementById("clear-table");
    const resultsTableBody = document.querySelector("#results-table tbody");
    const player1ScoreLabel = document.getElementById("player1-score-label");
    const player2ScoreLabel = document.getElementById("player2-score-label");
    const initialBetPlayer1Label = document.getElementById("player1-score-label");
    const initialBetPlayer2Label = document.getElementById("player2-score-label");
    const betAmountLabel = document.getElementById("bet-amount-label");
    const numOfRollsLabel = document.getElementById("num-of-rolls-label");
    const player1NameInput = document.getElementById("player1-name");
    const player2NameInput = document.getElementById("player2-name");

    
    let player1Points = 0;
    let player2Points = 0;
    let initialBetPlayer1 = 0;
    let initialBetPlayer2 = 0;
    let betAmount = 0;
    let numOfRolls = 0;
    let player1Name = "";
    let player2Name = "";

    gameForm.addEventListener("submit", (e) => {
        e.preventDefault();

        initialBetPlayer1 = parseInt(document.getElementById("initial-bet-player1").value);
        initialBetPlayer2 = parseInt(document.getElementById("initial-bet-player2").value);
        betAmount = parseInt(document.getElementById("bet-amount").value);
        numOfRolls = parseInt(document.getElementById("rows").value);
        player1Name = player1NameInput.value;
        player2Name = player2NameInput.value;

        if (isNaN(initialBetPlayer1) || isNaN(initialBetPlayer2) || isNaN(betAmount) || isNaN(numOfRolls)) {
            alert("Por favor, ingrese valores numéricos válidos.");
            return;
        }

        if (initialBetPlayer1 < betAmount || initialBetPlayer2 < betAmount) {
            alert("El valor apostado no puede ser mayor que el valor inicial.");
            return;
        }

        resultsTableBody.innerHTML = ""; // Limpia los resultados anteriores

        for (let i = 1; i <= numOfRolls; i++) {
            const coinResult = Math.random() < 0.5 ? "Cara" : "Cruz";
            const player1Result = Math.random() < 0.5 ? "Cara" : "Cruz";
            const player2Result = player1Result === "Cara" ? "Cruz" : "Cara"; // Si el jugador 1 elige Cara, el jugador 2 obtiene Cruz y viceversa.

            const winner = player1Result === coinResult ? player1Name : player2Name;

            if (winner === player1Name) {
                player1Points += betAmount;
                player2Points -= betAmount;
            } else {
                player2Points += betAmount;
                player1Points -= betAmount;
            }

            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="table-cell">${i}</td>
                <td class="table-cell">${coinResult}</td>
                <td class="table-cell">${player1Result}</td>
                <td class="table-cell">${player2Result}</td>
                <td class="table-cell">${winner }<br> ${coinResult}</td>
                <td class="table-cell">${player1Points}</td>
                <td class="table-cell">${player2Points}</td>
            `;

            resultsTableBody.appendChild(row);
        }

        // Actualiza los marcadores
        player1ScoreLabel.textContent = `${player1Name}: ${player1Points}`;
        player2ScoreLabel.textContent = `${player2Name}: ${player2Points}`;

        // Suma los puntos finales al valor inicial del propio jugador
        initialBetPlayer1 += player1Points;
        initialBetPlayer2 += player2Points;

        // Actualiza el valor inicial de cada jugador
        initialBetPlayer1Label.textContent = `Valor Inicial ${player1Name}: ${initialBetPlayer1}`;
        initialBetPlayer2Label.textContent = `Valor Inicial ${player2Name}: ${initialBetPlayer2}`;
        betAmountLabel.textContent = `Valor Apostado: ${betAmount}`;
        numOfRollsLabel.textContent = `No. de Lanzamientos: ${numOfRolls}`;

        // Verifica el ganador y muestra una ventana emergente con el resultado final
        let winnerMessage = "";
        if (player1Points > player2Points) {
            winnerMessage = `${player1Name} gana!`;
        } else if (player2Points > player1Points) {
            winnerMessage = `${player2Name} gana!`;
        } else {
            winnerMessage = "¡Empate!";
        }

        setTimeout(() => {
            alert(`Resultado Final:
            ${player1Name}: ${initialBetPlayer1}
            ${player2Name}: ${initialBetPlayer2}
            ${winnerMessage}`);
        }, 500);
    });

    clearTableButton.addEventListener("click", () => {
        resultsTableBody.innerHTML = "";
        player1Points = 0;
        player2Points = 0;

        // Reinicia los marcadores
        player1ScoreLabel.textContent = `${player1Name}: 0`;
        player2ScoreLabel.textContent = `${player2Name}: 0`;

        // Resetear los campos del formulario
        document.getElementById("initial-bet-player1").value = "0";
        document.getElementById("initial-bet-player2").value = "0";
        document.getElementById("bet-amount").value = "0";
        document.getElementById("rows").value = "1";
        player1NameInput.value = "";
        player2NameInput.value = "";

        // Actualiza las etiquetas de valor inicial, valor apostado y no. de lanzamientos
        initialBetPlayer1Label.textContent = `Valor Final ${player1Name}: ${initialBetPlayer1}`;
        initialBetPlayer2Label.textContent = `Valor Final ${player2Name}: ${initialBetPlayer2}`;
        betAmountLabel.textContent = `Valor Apostado: 0`;
        numOfRollsLabel.textContent = `No. de Lanzamientos: 0`;
    });
    
});
