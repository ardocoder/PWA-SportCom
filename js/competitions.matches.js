function getCompetitionsMatchesById() {
    return new Promise(function (resolve, reject) {

        if ("caches" in window) {
            caches.match(competitions_matches).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        competitionsMatches(data)
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(competitions_matches)
            .then(status)
            .then(json)
            .then(function(data) {
                competitionsMatches(data)
                resolve(data);
            })
            .catch(error);
    });
}

function competitionsMatches(data) {

    var tableCompetitionsMatchessHTML = ''
    var match = data.matches;
    var maxMatches = match.length;

    if (match.length > 20) {
        maxMatches = 20;
    }

    for (let i = 0; i < maxMatches; i++) {
        var dataTableCompetitionsMatches = ''
            dataTableCompetitionsMatches += `
            <div class="card-image">
            <img src="img/background.png" style="width: 870px;height:180px" class="responsive-img">
            <span class="card-title center">
                <a href="./matches.html?id=${match[i].id}" class="center">
                    <h4 class="center light blue-text text-lighten-3">${match[i].homeTeam.name}&nbsp&nbsp vs &nbsp&nbsp${match[i].awayTeam.name}</h4>
                </a>
            </span>
            </div>
            <tr>
                <td class="center-align">${match[i].matchday}</td>
                <td class="center-align">${convertUTCDate(new Date(match[i].utcDate))}</td>
            </tr>`
        tableCompetitionsMatchessHTML += `
        <div class="card">
            <div class="card-content">
                <table class="striped centered responsive-table " >
                <thead>
                    <tr>
                        <th class="center-align">Match Day</th>
                        <th class="center-align">Kick Off</th>
                    </tr>
                </thead>
                <tbody>` + dataTableCompetitionsMatches + `</tbody>
                </table>
            </div>
            <h6 class="right yellow-text text-lighten-1">Last Updated: ${convertUTCDate(new Date(data.competition.lastUpdated))}</h6> 
        </div> `
    }
    document.getElementById("divMatches").innerHTML = tableCompetitionsMatchessHTML;
}

function getDataMatchesById() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(data_matches + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        dataMatches(data)
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(data_matches + idParam)
            .then(status)
            .then(json)
            .then(function(data) {
                console.log(data);
                dataMatches(data)
                resolve(data);
            })
            .catch(error);
    });
}

function dataMatches(data) {
    document.getElementById("matchDay").innerHTML = `Matchday: ${data.match.matchday}`;
    document.getElementById("kickOff").innerHTML = `Kick Off: ${convertUTCDate(new Date(data.match.utcDate))}`;
    document.getElementById("homeTeamName").innerHTML = data.match.homeTeam.name;
    document.getElementById("awayTeamName").innerHTML = data.match.awayTeam.name;
    document.getElementById("preloader").innerHTML = "";
    document.getElementById("numberOfMatches").innerHTML = `Number Of Matches: ${data.head2head.numberOfMatches}`;
    document.getElementById("totalGoals").innerHTML = `Total Goals: ${data.head2head.totalGoals}`;
    document.getElementById("homeTeamWins").innerHTML = data.head2head.homeTeam.wins;
    document.getElementById("awayTeamWins").innerHTML = data.head2head.awayTeam.wins;
    document.getElementById("homeTeamDraws").innerHTML = data.head2head.homeTeam.draws;
    document.getElementById("awayTeamDraws").innerHTML = data.head2head.awayTeam.draws;
    document.getElementById("homeTeamLosses").innerHTML = data.head2head.homeTeam.losses;
    document.getElementById("awayTeamLosses").innerHTML = data.head2head.awayTeam.losses;
    document.getElementById("venue").innerHTML = data.match.venue;
}

function getSavedMatchById() {
    
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = Number(urlParams.get("id"));
  
    getCompetitionsMatchesById(idParam).then(function (match) {
        getDataMatchesById(match);
    });
}