function loginfun() {
    let logintext = document.getElementById("logintext");
    console.log(logintext.value);
    sessionStorage.setItem("username",logintext.value)
    setTimeout("window.location.href='chatHome'",300);
}