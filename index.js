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

function displayData(para) {
    $('table tbody tr').remove()
    if (para) data = para
    for (user of data) {
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
var serialNumber = 1
function submitData(e) {
    e.preventDefault()
    var firstname = $('#firstname').val()
    var lastname = $('#lastname').val()
    var contactNumber = $('#contactnumber').val()
    const name = firstname + " " + lastname

    // Inserting data
    if (!ifPresent(name, contactNumber)) {
        $("table tbody").append(
            '<tr>' +
            '<td >' + serialNumber + '</td>' +
            '<td>' + name + '</td>' +
            '<td>' + contactNumber + '</td>' +
            '<td><span class="del">x</span></td>' +
            '</tr>'
        )
        data.push({
            name: name,
            contact: contactNumber,
            sn: serialNumber++
        })
    }
}

$('form').submit((e) => submitData(e))

// Removing the selected row
$("table").on('click', '.del', function () {
    var ser = $(this).closest("tr").find("td:eq(0)").text()
    const index= data.findIndex(item=>item.sn===ser)
    data.splice(index,1)
    
    alert("This user will be removed!")
    displayData(data)
})

//  Sorting data with names
$('#name').click(function () {
    data.sort(compare)
    displayData();
})

// Searching data with name
$("#searchButton").click(function () {
    const searchName = $("#searchInput").val()
    var found = data.filter(e => e.name === searchName)
    if (found.length)
        displayData(found)
    else alert('User not found!')
})
