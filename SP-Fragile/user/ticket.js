const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get("id");

function vhToPixels (vh) {
    return Math.round(window.innerHeight / (100 / vh));
  }

axios
    .get("/user/showticket/"+id)
    .then((response)=>{
        console.log(response.data.data);
        document.getElementById("name").innerHTML = response.data.data.name;
        document.getElementById("email").innerHTML = response.data.data.email;
        document.getElementById("groupsize").innerHTML = response.data.data.groupSize;
        document.getElementById("ticketcode").innerHTML = response.data.data.code;

        var bookedon = new Date(response.data.data.purchasedOn);
        document.getElementById("bookdate").innerHTML = (bookedon.getDate()).toString() + " " +bookedon.toLocaleString('default', { month: 'long' }) +" " + bookedon.getFullYear().toString();
    
        var bookedfor = new Date(response.data.data.forDate);
        document.getElementById("date").innerHTML = bookedfor.getDate();
        document.getElementById("month").innerHTML = bookedfor.toLocaleString('default', { month: 'long' }) ;

        new QRCode(document.getElementById("qr"), {text: response.data.data.code, width: vhToPixels(10), height: vhToPixels(10), colorLight : "#d8e061", correctLevel: QRCode.CorrectLevel.H});
    })
