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