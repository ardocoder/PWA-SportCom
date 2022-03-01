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
                            console.log("cek team name: " + squad.name);
                            console.log("cek team position: " + squad.position);
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
                    console.log("cek team name: " + squad.name);
                    console.log("cek team position: " + squad.position);
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