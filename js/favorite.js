function teamFavorite(data) {

    var teamFavoriteHTML = ''
    data.forEach(function (team) {
        teamFavoriteHTML += `
        <table>
            <tr>
                <td>
                    <a href="./teams.html?id=${team.id}">
                        <h6 class=class="blue-text text-lighten-3>
                            <img class = "show-on-medium-and-up show-on-medium-and-down" src=${team.crestUrl} alt="logo club" style="float:left;width:40px;height:40px">
                            &nbsp&nbsp${team.name}
                        </h6>
                    </a>
                </td>
            </tr>
        </table>
            `
    });

    document.getElementById("divFavorite").innerHTML = teamFavoriteHTML;
}

function playerFavorite(data) {

    var playerFavoriteHTML = ''
    data.forEach(function (player) {
        playerFavoriteHTML += `
        <table>
            <tr>
                <td>
                    <a href="./players.html?id=${player.id}">
                        <h6 class=class="blue-text text-lighten-3>
                            ${player.name}&nbsp:&nbsp
                            ${player.position}
                        </h6>
                    </a>
                </td>
            </tr>
        </table>
            `
    });

    document.getElementById("divFavorite").innerHTML = playerFavoriteHTML;
}

function matchFavorite(data) {

    var matchFavoriteHTML = ''
    data.forEach(function (match) {
        matchFavoriteHTML += `
        <table>
            <tr>
                <td>
                    <a href="./matches.html?id=${match.id}">
                        <h6 class=class="blue-text text-lighten-3>
                            <p>Matchday:&nbsp${match.match.matchday}</p>
                            ${match.match.homeTeam.name}}&nbsp&nbspVS&nbsp&nbsp${match.match.awayTeam.name}
                        </h6>
                    </a>
                </td>
            </tr>
        </table>
            `
    });

    document.getElementById("divFavorite").innerHTML = matchFavoriteHTML;
}

