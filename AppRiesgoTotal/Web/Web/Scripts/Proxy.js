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
/// ya le cache
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
/// <summary>
/// En la cabezaran van los parametros que se solicitaran
/// </summary>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("TraerVulnerabilidades")]
function get$Vulnerabilidad$TraerVulnerabilidades(callDone, callFail) {
    Callback({}, arguments, callDone, callFail);
}
class VULNERABILIDADES {
}
/// <summary>
/// En la cabezaran van los parametros que se solicitaran
/// </summary>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("TraerEscalaDegradacion")]
function get$EscalaDegradacion$TraerEscalaDegradacion(callDone, callFail) {
    Callback({}, arguments, callDone, callFail);
}
class ESCALA_DEGRADACION {
}
class ACTIVO_GENERAL {
}
class RIESGO_GENERAL {
}
/// <summary>
/// En la cabezaran van los parametros que se solicitaran
/// </summary>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("TraerAmenazas")]
function get$Amenaza$TraerAmenazas(callDone, callFail) {
    Callback({}, arguments, callDone, callFail);
}
class AMENAZAS {
}
//# sourceMappingURL=Proxy.js.map