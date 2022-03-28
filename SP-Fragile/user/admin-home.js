axios.defaults.withCredentials = true;

document.getElementById("verify").addEventListener("click", check);

function check() {
  const email = document.getElementById("email").value;
  const code = document.getElementById("code").value;
  axios
    .post("http://localhost:8000/admin/checkticket", {
      email: email,
      code: code,
    })
    .then((response) => {
      if(response.status==202)
      {
        alert("Ticket Verified Sucessfully");
        document.getElementById("email").value ="";
        document.getElementById("code").value = "";
      }
    });
}
