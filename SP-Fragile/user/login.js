document.getElementById("login-form").addEventListener("submit", login);

function login(e) {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  axios
    .post("http://localhost:8000/admin/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      location.href = "../user/admin-home.html";
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  e.preventDefault();
}
