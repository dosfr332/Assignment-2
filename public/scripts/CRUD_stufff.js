// Script to operate the delete button pop-up and redirect

async function deleteBird(db_id) {
    const d = JSON.stringify({ id: db_id })
    console.log(d);
    const res = await fetch('/birds/api/delete-bird', {
        method: 'POST',
        body: d,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(await res.text());
    if (res.status === 200) {
        window.alert('Successfuly deleted the bird! \nPress close to go back home.');
        window.location.replace('/');
    }
}

function toggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var pop = document.getElementById('popup');
    pop.classList.toggle('active');
}

 function createBird(){
    var list = document.querySelectorAll(".required");
    var status = document.getElementById('status');
    var inputs = document.getElementById('create_bird')

    // Make sure that the required feilds are filled
    for (i = 0; i < list.length; i++) {
        if (list[i].value == "" || status.value == "...") {
            window.alert('Please enter required feilds');
            return;
        }
    }
 }
    
//     const birdData = new FormData(inputs);
//     birdData.delete("myFile")
//     for (const pair of birdData.entries()) {
//         console.log(`${pair[0]}, ${pair[1]}`);
//     }

//     const request = new XMLHttpRequest();
//     request.open('POST', 'http://localhost:440/birds/api/create');
//     request.send(birdData);



//     var fileField = document.getElementById('upload');
//     var prm_nm = document.getElementById("prm");
//     var eng_nm = document.getElementById("eng");
//     var sci_nm = document.getElementById("sci");
//     var fam_nm = document.getElementById("fam");
//     var ord_nm = document.getElementById("ord");
//     var other_nm = document.getElementById("other");
//     var photo_cred = document.getElementById("cred");
//     var weight = document.getElementById("wei");
//     var length = document.getElementById("len");
    
//     var other_arr = other_nm.value.split(", ");

//     birdData.append('file', fileField.files[0])
//     birdData.append('primary_name', prm_nm.value)
//     birdData.append('english_name', eng_nm.value)
//     birdData.append('scientific_name', sci_nm.value)
//     birdData.append('family_name', fam_nm.value)
//     birdData.append('order', ord_nm.value)

//     for (var i = 1; i < (other_arr.length+1); i++) {
//         birdData.append("other_name " + i, other_arr[i-1]);
//     }

//     birdData.append('photo_credit', photo_cred.value)
//     birdData.append('weight', weight.value)
//     birdData.append('length', length.value)

//     const request = new xmlhttprequest();
//     request.open('POST', 'http://localhost:440/birds/api/create');
//     request.send(birdData);

//     const res = await fetch('/birds/api/create', {
//         method: 'POST',
//         body: birdData
//     });
//     console.log(await res.text());
//     if (res.status === 500) {
//         window.alert('Successfuly added the bird! \nPress close to go back home.');
//         //window.location.replace('');
//     }
// }