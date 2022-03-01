var base_url = "https://api.football-data.org/v2/";

var fetchAPI = url => {
    return fetch(url, {headers: {'X-Auth-Token': '5f7c555b63654bc8a55dc3a6ed92fa7c'}});
}

var competitions_standings = "http://api.football-data.org/v2/competitions/2014/standings?standingType=TOTAL";
var competitions_matches = "http://api.football-data.org/v2/competitions/2014/matches?status=SCHEDULED";
var data_matches =  "http://api.football-data.org/v2/matches/";
var data_teams = "http://api.football-data.org/v2/teams/";
var data_players = "http://api.football-data.org/v2/players/";

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

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
                console.log(data)
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

function getDataTeamsById() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        var dataTeamHTML = ''
        var tableTeamHTML = ''
        if ("caches" in window) {
            caches.match(data_teams + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        dataTeam(data)
                        data.squad.forEach(function(squad, index) {
                            dataTeams = squad;
                            console.log("team name: " + squad.name);
                            console.log("team position: " + squad.position);
                            dataTeamHTML += `
                            <tr>
                                <td >
                                    <a href="./players.html?id=${squad.id}" class="blue-text text-lighten-3"> ${squad.name}</a>
                                </td>
                            <td >${squad.position}</td>
                            </tr>
                            `
                        });
                        tableTeamHTML += `<table> <tbody> ${dataTeamHTML}  </tbody> </table>`
                        document.getElementById("squad").innerHTML = tableTeamHTML;
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(data_teams + idParam)
            .then(status)
            .then(json)
            .then(function(data) {
                console.log(data);
                dataTeam(data)
                dataTeams = data;
                data.squad.forEach(function(squad, index) {
                    dataTeams = squad;
                    console.log("team name: " + squad.name);
                    console.log("team position: " + squad.position);
                    dataTeamHTML += `
                    <tr>
                        <td >
                            <a href="./players.html?id=${squad.id}" class="blue-text text-lighten-3"> ${squad.name}</a>
                        </td>
                        <td >${squad.position}</td>
                    </tr>
                    `;
                });
                tableTeamHTML += `<table> <tbody> ${dataTeamHTML}  </tbody> </table>`
                document.getElementById("squad").innerHTML = tableTeamHTML;
                resolve(data);
            })
            .catch(error);
    });
}

function dataTeam(data) {
    document.getElementById("namaKlub").innerHTML = data.name;
    document.getElementById("logoKlub").src = data.crestUrl;
    document.getElementById("name").innerHTML = data.name;
    document.getElementById("shortName").innerHTML = data.shortName;
    document.getElementById("tla").innerHTML = data.tla;
    document.getElementById("address").innerHTML = data.address;
    document.getElementById("phone").innerHTML = data.phone;
    document.getElementById("website").innerHTML = data.website;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("founded").innerHTML = data.founded;
    document.getElementById("clubColors").innerHTML = data.clubColors;
    document.getElementById("venue").innerHTML = data.venue;
    document.getElementById("preloader").innerHTML = '';
}

function getDataPlayersById() {
    return new Promise(function (resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(data_players + idParam).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        dataPlayer(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(data_players + idParam)
            .then(status)
            .then(json)
            .then(function(data) {
                console.log(data);
                dataPlayer(data);
                resolve(data);
            })
            .catch(error);
    });
}

function dataPlayer(data) {
    document.getElementById("name").innerHTML = data.name;
    document.getElementById("firstName").innerHTML = data.firstName;
    if (data.lastName == null) {
        data.lastName = "-"
    }
    document.getElementById("lastName").innerHTML = data.lastName;
    document.getElementById("dateOfBirth").innerHTML = data.dateOfBirth;
    document.getElementById("countryOfBirth").innerHTML = data.countryOfBirth;
    document.getElementById("nationality").innerHTML = data.nationality;
    document.getElementById("position").innerHTML = data.position;
    document.getElementById("preloader").innerHTML = '';
}

var convertUTCDate = date => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} ${formatAMPM(date)}`
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}



