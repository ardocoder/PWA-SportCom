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