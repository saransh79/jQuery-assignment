function ifPresent(name, contactNumber) {
    if (data.find(e => e.name === name)) {
        alert("User's name is already present!")
        return true;
    }
    else if (data.find(e => e.contact === contactNumber)) {
        alert("User's contact number is already present!")
        return true;
    }
    return false;
}

function compare(a, b) {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
}

function displayData() {
    $('table tbody tr').remove()
    var serialNum = 1;
    for (user of data) {
        user.sn = serialNum++
        $("table tbody").append(
            '<tr>' +
            '<td>' + user.sn + '</td>' +
            '<td>' + user.name + '</td>' +
            '<td>' + user.contact + '</td>' +
            '<td><span class="del">x</span></td>' +
            '</tr>'
        )
    }
}

// Inserting data
var data = []
function submitData(e) {
    e.preventDefault()
    var firstname = $('#firstname').val()
    var lastname = $('#lastname').val()
    var contactNumber = $('#contactnumber').val()

    if (!ifPresent(name, contactNumber)) {
        data.push({
            name: firstname + " " + lastname,
            contact: contactNumber,
        })
        displayData();
    }
}

$('form').submit((e) => submitData(e))

// Removing the selected row
$("table").on('click', '.del', function () {
    var ser = $(this).closest("tr").find("td:eq(0)").text()
    const index = data.findIndex(item => item.sn === ser)
    data.splice(index, 1)
    alert("This user will be removed!")
    displayData()
})

//  Sorting data with names
$('#name').click(function () {
    data.sort(compare)
    displayData();
})

// Searching data with name
$("#searchButton").click(function () {
    const searchName = $("#searchInput").val()
    var found = data.find(e => e.name === searchName)

    if (found) {
        $('table tbody tr').remove()
        $("table tbody").append(
            '<tr>' +
            '<td>' + found.sn + '</td>' +
            '<td>' + found.name + '</td>' +
            '<td>' + found.contact + '</td>' +
            '<td><span class="del">x</span></td>' +
            '</tr>'
        )
        $("table").click(function () {
            displayData()
        })
    }
    else alert('User not found!')
})
