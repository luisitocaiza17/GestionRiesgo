class UsuarioEntity {
}
class Msg {
    constructor(Estado, Datos, Mensajes) {
        this.Estado = Estado;
        this.Datos = Datos;
        this.Mensajes = Mensajes;
    }
}
class TokenInfo {
}
/// <summary>
/// En la cabezaran van los parametros que se solicitaran
/// </summary>
/// <param name="usuario">Cabecera de la llamada</param>
/// <param name="password"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("LoginVerificacion")]
function get$Login$LoginVerificacion(usuario, password, callDone, callFail) {
    Callback({ "usuario": usuario, "password": password }, arguments, callDone, callFail);
}
//# sourceMappingURL=Proxy.js.map