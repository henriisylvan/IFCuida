function obterCookie(cookie) {
    const cookieArr = document.cookie.split(";");

    const cookieSelecionado = cookieArr
        .map(cookieStr => cookieStr.split("="))
        .find(cookieValores => cookieValores[0] == cookie);

    return cookieSelecionado ? decodeURIComponent(cookieSelecionado[1]) : null;
};