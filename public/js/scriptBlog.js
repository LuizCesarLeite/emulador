new function getHome() {
    $.ajax({
        type: "GET",
        url: "https://botike.com.br/strapiAPI/home-page",
        dataType: "json",
        success: function(data) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);

                console.log(data.Menu.link_pq);
                console.log(data.Infoblock[0].titulo);
                console.log(data.Infoblock[1].InfoBrick[3].texto);
            }
        },
        error: function(xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });
}