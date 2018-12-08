 class UsuarioEntity {
    public id:number;
    public nombres: string;
    public apellidos: string;
}

class Msg {
    constructor(
        public Estado: string,
        public Datos: any,
        public Mensajes: string[]
    ) { }
}


class TokenInfo {
    public access_token: string;
    public expires_in: number;
    public refresh_token: string;
    public token_type: string;
    public user_data: string;
    public error: string;
    public error_description: string;
    public token_retrieve: number;
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
 function get$Login$LoginVerificacion(usuario: string, password:string, callDone, callFail) {
     Callback({ "usuario": usuario, "password": password }, arguments, callDone, callFail);
 }