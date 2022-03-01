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