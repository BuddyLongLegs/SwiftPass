// axios.defaults.withCredentials = true;

document.getElementById("verify").addEventListener("click", check);

function check() {
  const email = document.getElementById("email").value;
  const code = document.getElementById("code").value;
  axios
    .post("/admin/checkticket", {
      email: email,
      code: code,
    })
    .then((response) => {
      console.log(response);
    });
}
