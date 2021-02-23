$(document).ready(function() {
    var gender;
    var nationality;
    var num_results;
    var apiurl;

    $('#submitResults').click(function() {
        num_results = $('#num').val();
        $('#num').val('');
        getResults();
        return false;
    });

    $("input[type='radio']").click(function(){
        getResults();
    });

    $('#nationality').on('change', function() {
        getResults();
    });

    function getResults() {
        gender = $("input[name='gender']:checked").val();
        nationality = $('#nationality').val();
        apiurl = 'https://randomuser.me/api/?results='+num_results+'&gender='+gender+'&nat='+nationality.join(',');
        $("#result").empty();
        fetchRandomUsers();
    }

    function fetchRandomUsers() {
        $.ajax({
            url: apiurl,
            type: "GET",
            datatype: "json",
            crossDomain: true,  // NEED THIS FOR CORS ISSUES
            success: function (response) {
                response.results.forEach(person => {
                    person = `<div class="card">
                                <img class="img-rounded" src="${person.picture.medium}" alt="Card image">
                                <div class="card-body">
                                    <h5 class="card-title">${person.name.first} ${person.name.last}, ${person.nat}</h5>
                                    <p class="card-text">Age: ${person.dob.age}</p>
                                    <p class="card-text">Phone: ${person.phone}</p>
                                    <p class="card-text">Email: ${person.email}</p>
                                </div>
                            </div>`;
                    $("#result").append(person);
                });
            }
        })
    }

    return false;
});