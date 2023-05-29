const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
		var jsonResponse = JSON.parse(this.responseText);

		// RETORNA A QUANTIDADE DOS ARRAYS
		var quantidadeResponse = Object.keys(jsonResponse).filter(key => Array.isArray(jsonResponse)).length;
		console.log(quantidadeResponse);

		// SELECIONAR VALORES QUE EU QUERO

		var home_team = jsonResponse[0].home_team;
		var away_team = jsonResponse[0].away_team;
		console.log(home_team + ' X ' + away_team);



		// SELECIONA O FLEX CONTAINER NA ONDE VAI RECEBER O HTML
		var flex_container = document.querySelector('.flex-container');
		const html = `
		<div class="jogos">

		</div>
		`; // HTML A SER MULTIPLICADO

		// Multiplica o HTML PELA QUANTIDADE DOS ARRAYS
		const resultadoDiv = html.repeat(quantidadeResponse);

		document.getElementById('flex_container_main').innerHTML = resultadoDiv;

		const divs = document.querySelectorAll('.flex-container .jogos')

		divs.forEach((div, index) => {
			const numeroDiv = index + 1;
			const numeroArray = jsonResponse[index];
			const home_team = jsonResponse[index].home_team;
			const away_team = jsonResponse[index].away_team;


			console.log(jsonResponse[index].scores);
			if(jsonResponse[index].score != 'null'){



				if(jsonResponse[index].scores === null){
					div.innerHTML = `
					<h2 id="team-name" class="team-name">
						<span class="team-home-name">${home_team}</span> x <span class="team-away-name">${away_team}</span>
					</h2>
					<h3 class="result-game">SEM RESULTADO AINDA</h3>
					`;
				}else {
					const resultado_home = jsonResponse[index].scores[0].score;
					const resultado_away = jsonResponse[index].scores[1].score;
					div.innerHTML = `
					<h2 id="team-name" class="team-name">
						<span class="team-home-name">${home_team}</span> x <span class="team-away-name">${away_team}</span>
					</h2>
					<h3 class="result-game">${resultado_home} X ${resultado_away}</h3>
					`;
				}

			}else {
				div.innerHTML = `
				<h2 id="team-name" class="team-name">
					<span class="team-home-name">${home_team}</span> x <span class="team-away-name">${away_team}</span>
				</h2>
				<h3 class="result-game">SEM RESULTADO AINDA</h3>
				`;
			}




			//const elementoHTML = document.createElement('p');
			//elementoHTML.textContent = `${home_team} Div ${numeroDiv} - Array ${numeroArray}`;

			//div.appendChild(elementoHTML);
		  });

	}
});

xhr.open('GET', 'https://odds.p.rapidapi.com/v4/sports/soccer_brazil_campeonato/scores?daysFrom=3');
xhr.setRequestHeader('X-RapidAPI-Key', '9f680892cbmsheb7ae43c86f2053p10994fjsnd2f0b4ea95b9');
xhr.setRequestHeader('X-RapidAPI-Host', 'odds.p.rapidapi.com');

xhr.send(data);


/* COUNTING NUMBER OF OBJECTS IN RESPONSE */