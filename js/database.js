function databaseSPORT(idb) {
    var dbPromise = idb.open("sport_data", 1, function (upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains("favorite_team")) {
            var teamOS = upgradeDb.createObjectStore("favorite_team", {keyPath: "id"});
            teamOS.createIndex("team_name", "name", {unique: false});
        }
        if (!upgradeDb.objectStoreNames.contains("favorite_player")) {
            var playerOS = upgradeDb.createObjectStore("favorite_player", {keyPath: "id"});
            playerOS.createIndex("player_name", "name", {unique: false});
        }
        if (!upgradeDb.objectStoreNames.contains("favorite_match")) {
            var matchOS = upgradeDb.createObjectStore("favorite_match", {keyPath: "id"});
            matchOS.createIndex("home_team", "match.homeTeam.name", {unique: false});
            matchOS.createIndex("away_team", "match.awayTeam.name", {unique: false});
        }
    });
    return dbPromise;
}

function checkFavorite(storeName, id) {
    return new Promise(function (resolve, reject) {
        databaseSPORT(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                if (data != undefined) {
                    resolve("Favorite")
                } else {
                    reject("Not favorit")
                }
            });
    });
}

function createFavorite(dataType, data) {
    var storeName = "";
    var dataToCreate = {}
    if (dataType == "team_data") {
            storeName = "favorite_team";
            dataToCreate = {
            id: data.id,
            name: data.name,
            shortName: data.shortName,
            tla: data.tla,
            crestUrl: data.crestUrl,
            address: data.address,
            phone: data.phone,
            website: data.website,
            email: data.email,
            founded: data.founded,
            clubColors: data.clubColors,
            venue: data.venue,
            squad: data.squad
        }
    } else if (dataType == "player_data") {
            storeName = "favorite_player";
            dataToCreate = {
            id: data.id,
            name: data.name,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            counrtyOfBirth: data.counrtyOfBirth,
            nationality: data.nationality,
            position: data.position
        }
    } else if (dataType == "match_data") {
        storeName = "favorite_match";
        dataToCreate = {
            id: data.match.id,
            head2head: {
                numberOfMatches: data.head2head.numberOfMatches,
                totalGoals: data.head2head.totalGoals,
                homeTeam: {
                    wins: data.head2head.homeTeam.wins,
                    draws: data.head2head.homeTeam.draws,
                    losses: data.head2head.homeTeam.losses
                },
                awayTeam: {
                    wins: data.head2head.awayTeam.wins,
                    draws: data.head2head.awayTeam.draws,
                    losses: data.head2head.awayTeam.losses
                }
            },
            match: {
                utcDate: data.match.utcDate,
                venue: data.match.venue,
                matchday: data.match.matchday,
                homeTeam: {
                    name: data.match.homeTeam.name
                },
                awayTeam: {
                    name: data.match.awayTeam.name
                }
            }
        }
    }
    console.log("data " + dataToCreate);
    databaseSPORT(idb).then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(dataToCreate);
        return tx.complete;
    }).then(function () {
        console.log('data saved');
        document.getElementById("iconFav").innerHTML = "favorite";
        M.toast({
            html: 'Add Favorite!'
        });
    }).catch(function () {
        M.toast({
            html: 'Error'
        });
    });
}

function deleteFavorite(storeName, data) {
    databaseSPORT(idb).then(function (db) {
        var tx = db.transaction(storeName, 'readwrite');
        var store = tx.objectStore(storeName);
        store.delete(data);
        return tx.complete;
    }).then(function () {
        console.log('data deleted');
        document.getElementById("iconFav").innerHTML = "favorite_border";
        M.toast({
            html: 'Remove Favorite!'
        });
    }).catch(function () {
        M.toast({
            html: 'Error'
        });
    });
}

function setupFavorite(dataType) {
    if (dataType == "team_data") {
            getAllData("favorite_team").then(function (data) {
            teamFavorite(data);
        });
    } else if (dataType == "player_data") {
        getAllData("favorite_player").then(function (data) {
            playerFavorite(data);
        });
    } else if (dataType == "match_data") {
        getAllData("favorite_match").then(function (data) {
            matchFavorite(data);
        });
    }
}

function getSavedDataById(dataType) {
    
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = Number(urlParams.get("id"));

    if (dataType == "team_data") {
        var dataTeamHTML = ''
        var tableTeamHTML = ''
        getDataById("favorite_team", idParam).then(function (team) {
            console.dir("getSavedTeamById: " + team);
            dataTeam(team)
            dataTeams = team;
            team.squad.forEach(function (squad) {
                dataTeamHTML = squad;
                console.log("getSavedTeamById cek squad name: " + squad.name);
                console.log("getSavedTeamById cek squad position: " + squad.position);
                dataTeamHTML += `
                <tr>
                    <td >
                        <a href="./players.html?id=${squad.id}"> ${squad.name}</a>
                    </td>
                    <td >${squad.position}</td>
                </tr>
                `
            });
            tableTeamHTML += `<table> <tbody> ${dataTeamHTML}  </tbody> </table>`

            document.getElementById("squad").innerHTML = tableTeamHTML;
        })
    } else if (dataType == "player_data") {
        getDataById("favorite_player", idParam).then(function (player) {
            console.dir("getSavedPlayerById: data: " + player);
            dataPlayer(player);
        });
    } else if (dataType == "match_data") {
        getDataById("favorite_match", idParam).then(function (match) {
            dataMatches(match);
        });
    }
}

function getDataById(storeName, id) {
    return new Promise(function (resolve, reject) {
        databaseSPORT(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function getAllData(storeName) {
    return new Promise(function (resolve, reject) {
        databaseSPORT(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            });
    });
}