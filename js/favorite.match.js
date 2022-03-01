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