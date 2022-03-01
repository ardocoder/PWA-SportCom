function getCompetitionsStandings() {
    if ("caches" in window) {
        caches.match(competitions_standings).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    competitionsStandings(data);
                    console.dir("getCompetitionsStandings" + data);
                });
            }
        });
    }
      
    fetchAPI(competitions_standings)
        .then(status)
        .then(json)
        .then(function(data) {
            console.log(data)
            console.log(data)
            competitionsStandings(data)
        })
        .catch(error);
}

function competitionsStandings(data) {
    var tableCompetitionsStandingsHTML = ''
    data.standings.forEach(function(competition_standing) {
        var dataTableCompetitionsStandings = ''
        competition_standing.table.forEach(function(club) {
            dataTableCompetitionsStandings += `
            <tr>
                <td class="center-align">${club.position}</td>
                <td>
                    <a href="./teams.html?id=${club.team.id}">
                        <p class="text-darken-3">
                            <img class = "show-on-medium-and-up show-on-medium-and-down" src=${club.team.crestUrl} alt="logo club" style="float:left;width:30px;height:30px">
                            ${club.team.name}
                        </p>
                    </a>
                </td>
                <td class="center-align">${club.playedGames}</td>
                <td class="center-align">${club.won}</td>
                <td class="center-align">${club.draw}</td>
                <td class="center-align">${club.lost}</td>
                <td class="center-align">${club.goalsFor}</td>
                <td class="center-align">${club.goalsAgainst}</td>
                <td class="center-align">${club.goalDifference}</td>
                <td class="center-align">${club.points}</td>
            </tr>`

            })

        tableCompetitionsStandingsHTML += `
        <div class="card">
            <div class="card-content">
                <table class="highlight centered responsive-table " >
                <thead>
                    <tr>
                        <th class="center-align">Position</th>
                        <th>Team</th>
                        <th class="center-align">Played</th>
                        <th class="center-align">Won</th>
                        <th class="center-align">Draw</th>
                        <th class="center-align">Lost</th>
                        <th class="center-align">GF</th>
                        <th class="center-align">GA</th>
                        <th class="center-align">GD</th>
                        <th class="center-align">Points</th>
                    </tr>
                </thead>
                <tbody>` + dataTableCompetitionsStandings + `</tbody>
                </table>
            </div>
            <h6 class="right yellow-text text-lighten-1">Last Updated: ${convertUTCDate(new Date(data.competition.lastUpdated))}</h6> 
        </div> `
        });
    document.getElementById("divStandings").innerHTML = tableCompetitionsStandingsHTML;
}