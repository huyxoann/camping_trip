function setCookie(cname, cvalue, exdays) {
    const day = new Date();
    day.setTime(day.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = "expires" + day.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ";path ='/public/admin/'"
}

setCookie('admin01', 'huyhuy007', 9)
console.log(document.cookie)
