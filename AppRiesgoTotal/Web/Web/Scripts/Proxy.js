class Msg {
    constructor(Estado, Datos, Mensajes) {
        this.Estado = Estado;
        this.Datos = Datos;
        this.Mensajes = Mensajes;
    }
}
class TokenInfo {
}
// Clases y Servicios
class Rol {
    constructor() { }
}
class Usuario {
    constructor() { }
}
///// <summary>
///// Obtiene la empresa por el Grupo
///// </summary>
///// <param name="cabecera">Cabecera de la llamada</param>
///// <param name="IdGrupo">Numero del Grupo</param>
///// <returns>
///// HttpResponseMessage
///// </returns>
///// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
///// <response code="400">Error datos enviados en la cabecera</response>
///// <response code="500">Si existe un error interno</response>
//[Route("ObtenerEmpresasPorGrupo")]
//[HttpGet()]
//[ResponseType(typeof (RespuestaGenericaServicio<Empresas>))]
//    public HttpResponseMessage ObtenerEmpresasPorGrupo([AtributoCabecera]CabeceraServicioRest cabecera, int IdGrupo)
function get$empresa$ObtenerEmpresasPorGrupo(IdGrupo, callDone, callFail) {
    Callback({ "IdGrupo": IdGrupo }, arguments, callDone, callFail);
}
class Empresa {
}
function get$contrato$ObtenerMovimientosBeneficiariosEmpresas(empresaNumero, sucursalEmpresa, codigoProducto, fechaDesde, fechaHasta, codigoTransaccion, callDone, callFail) {
    Callback4(AddressServicioContratos, null, { "empresaNumero": empresaNumero.join(","), "sucursalEmpresa": sucursalEmpresa.join(","), "codigoProducto": codigoProducto.join(","), "fechaDesde": getFormattedDateymd(fechaDesde), "fechaHasta": getFormattedDateymd(fechaHasta), "codigoTransaccion": codigoTransaccion.join(",") }, arguments, callDone, callFail);
}
class MovimientoBeneficiarioEmpresa {
}
class ListaElegida {
}
class ParametrosReporte {
}
class ReclamoEmpresaLista {
}
class PersonaEntity {
}
class Persona {
}
///// <summary>
///// Obtiene lista de todas las empresas
///// </summary>
///// <param name="cabecera">Cabecera de la llamada</param>
///// <returns>
///// HttpResponseMessage
///// </returns>
///// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
///// <response code="400">Error datos enviados en la cabecera</response>
///// <response code="500">Si existe un error interno</response>
//[Route("ObtenerEmpresasLista")]
//[HttpGet()]
//[ResponseType(typeof (RespuestaGenericaServicio<Empresas>))]
//        public HttpResponseMessage ObtenerEmpresasLista([AtributoCabecera]CabeceraServicioRest cabecera)
function get$empresa$ObtenerEmpresasLista(callDone, callFail) {
    Callback(null, arguments, callDone, callFail);
}
//Ejemplos:
//Cuando tiene grupo
//http://localhost:63359/api/grupo/ObtenerListaSucursalesPorGrupo?IDEmpresa=61008
//Cuando no pertenece a ningún grupo
//http://localhost:63359/api/grupo/ObtenerListaSucursalesPorGrupo?IDEmpresa=50268
function get$grupo$ObtenerListaSucursalesPorGrupo(IDEmpresa, callDone, callFail) {
    Callback({ "IDEmpresa": IDEmpresa }, arguments, callDone, callFail);
}
class GrupoCorporativo {
}
// Reporte de Reclamos
//http://desarrollo.servicios.saludsa.com.ec/ServicioLiquidacion/swagger/ui/index#!/Liquidaciones/Liquidaciones_ObtenerReclamosGrupoEmpresaListaBeneficiario
//GET / api / ObtenerReclamosGrupoEmpresaListaBeneficiario
// REQUEST:
//http://desarrollo.servicios.saludsa.com.ec/ServicioLiquidacion/api/ObtenerReclamosGrupoEmpresaListaBeneficiario?empresaNumero=1&sucursalEmpresa=1&fechaDesde=1&fechaHasta=1
function get$Liquidacion$ObtenerReclamosGrupoEmpresaListaBeneficiario(empresaNumero, sucursalEmpresa, fechaDesde, fechaHasta, documento, callDone, callFail) {
    Callback4(AddressServicioLiquidacion, null, { "empresaNumero": empresaNumero.join(","), "sucursalEmpresa": sucursalEmpresa.join(","), "fechaDesde": getFormattedDateymd(fechaDesde), "fechaHasta": getFormattedDateymd(fechaHasta), "documento": documento }, arguments, callDone, callFail);
}
//servicio de generacion de reporte reclamos
//http://pruebas.servicios.saludsa.com.ec/ServicioArmonix/swagger/ui/index#!/Reclamo/Reclamo_GenerarPdf
//POST /api/reclamos/generarPdf
function post$reclamos$generarPdf64(reclamo, callDone, callFail) {
    Callback2(JSON.stringify(reclamo), arguments, callDone, callFail);
}
class ReclamoEntityFilter {
}
class numerosSucursalEmpresa {
}
// Reporte de Copagos
//http://desarrollo.servicios.saludsa.com.ec/ServicioLiquidacion/swagger/ui/index#!/Copagos/Copagos_ConsultaAutorizaciones
//POST /api/ConsultaCopagos
function post$Copagos$ConsultaCopagos(tipoCliente, empresas, fechaDesde, fechaHasta, estados, docTitular, callDone, callFail) {
    Callback4(AddressServicioCopagoAutorizacion, JSON.stringify(empresas), { "tipoCliente": tipoCliente, "fechaDesde": getInternationalFomat(fechaDesde), "fechaHasta": getInternationalFomat(fechaHasta), "estadoCopago": estados, "documentoTitular": docTitular }, arguments, callDone, callFail);
}
//copago
class CopagoPendiente {
}
// Reporte de Autorizaciones
//http://desarrollo.servicios.saludsa.com.ec/ServicioLiquidacion/swagger/ui/index#!/Copagos/Copagos_ConsultaAutorizaciones
//POST /api/ConsultaAutorizaciones
function post$CorredoresAutorizacionController$ConsultaAutorizacionesEspecificas(tipoCliente, empresas, fechaDesde, fechaHasta, documento, callDone, callFail) {
    Callback4(AddressServicioCopagoAutorizacion, JSON.stringify(empresas), { "tipoCliente": tipoCliente, "fechaDesde": getInternationalFomat(fechaDesde), "fechaHasta": getInternationalFomat(fechaHasta), "documentoBeneficiario": documento }, arguments, callDone, callFail);
}
class AutorizacionesCubiertas {
}
// Reporte de Siniestralidad: 1'
//POST /api/Siniestralidad/Mensualizada
//Obtiene la siniestralidad mensualizada por listas
//http://desarrollo.servicios.saludsa.com.ec/ServicioEmpresas/swagger/ui/index#!/Siniestralidad/Siniestralidad_SiniestralidadListas
function post$siniestralidad$Mensualizada(fechaDesde, fechaHasta, empresas, soloCorporativos, callDone, callFail) {
    //Callback4(AddressServicioSiniestralidad, JSON.stringify(empresas), { "fechaDesde": getFormattedDateymd(fechaDesde), "fechaHasta": getFormattedDateymd(fechaHasta) }, arguments, callDone, callFail);
    Callback4(AddressServicioSiniestralidad, JSON.stringify(empresas), { "fechaDesde": getInternationalFomat(fechaDesde), "fechaHasta": getInternationalFomat(fechaHasta), "soloCorporativos": false }, arguments, callDone, callFail);
}
class SiniestralidadLista {
}
///// <summary>
///// Obtiene los datos consolidados del resumen de los registros cargados
///// </summary>
///// <param name="cabecera">Cabecera de la llamada</param>
///// <param name="IDEmpresa"></param>
///// <returns>
///// HttpResponseMessage
///// </returns>
///// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
///// <response code="400">Error datos enviados en la cabecera</response>
///// <response code="500">Si existe un error interno</response>
//[Route("GenerarExportableSiniestralidadLista")]
//[HttpPost()]
//[ResponseType(typeof (RespuestaGenericaServicio<bool>))]
//    public HttpResponseMessage GenerarExportableSiniestralidadLista([AtributoCabecera]CabeceraServicioRest cabecera, List < SiniestralidadLista > lst)
function post$facturacion$GenerarExportableSiniestralidadLista(lst, callDone, callFail) {
    Callback(JSON.stringify(lst), arguments, callDone, callFail);
}
class CORP_Registro {
}
/****TODO: EMPIEZA SECCION DE PORTAL CORREDORES****/
/// <summary>
/// Obtiene Usuario por nombre y clave
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="usuario"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function post$usuario$CorredoresObtenerUsuarioPorNombreyClave(usuario, callDone, callFail) {
    Callback(JSON.stringify(usuario), arguments, callDone, callFail);
}
//CLASE
class PC_UsuarioRol_Result {
}
class PC_Rol_Result {
}
class PC_Permiso_Result {
}
/// <summary>
/// Obtiene ID de Términos y Condiciones Actual (Publicado)
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function get$terminoscondiciones$CorredoresTerminosCondicionesIdActual(callDone, callFail) {
    Callback(null, arguments, callDone, callFail);
}
/// <summary>
/// Obtiene Términos y Condiciones por ID
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="TerminosCondicionesID">ID de Terminos y Condiciones</param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function get$terminoscondiciones$CorredoresTerminosCondicionesPorID(TerminosCondicionesID, callDone, callFail) {
    Callback({ "TerminosCondicionesID": TerminosCondicionesID }, arguments, callDone, callFail);
}
/// <summary>
/// Obtiene los usuarios activos
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="IDUsuario"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function get$usuario$CorredoresObtenerPermisosUsuarioPorID(IDUsuario, callDone, CallFail) {
    Callback({ "IDUsuario": IDUsuario }, arguments, callDone, CallFail);
}
/// <summary>
/// Obtiene los usuarios activos
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="IDEmpresa"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function get$usuario$CorredoresObtenerUsuariosActivosPorEmpresa(IDEmpresa, callDone, CallFail) {
    Callback({ "IDEmpresa": IDEmpresa }, arguments, callDone, CallFail);
}
/// <summary>
/// Resetea la contraseña para los admins de una empresa
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="RUCEmpresa"></param>
/// <param name="UserName"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function get$usuario$CorredoresResetearClaveCorp(RUCEmpresa, UserName, callDone, callFail) {
    Callback({ "RUCEmpresa": RUCEmpresa, "UserName": UserName }, arguments, callDone, callFail);
}
/// <summary>
/// Obtiene Archivo PDF (Base64) de Terminos y Condiciones por ID
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="TerminosCondicionesID">ID de Terminos y Condiciones</param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function get$terminoscondiciones$CorredoresTerminosCondicionesPDFContenido(TerminosCondicionesID, callDone, callFail) {
    Callback({ "TerminosCondicionesID": TerminosCondicionesID }, arguments, callDone, callFail);
}
/// <summary>
/// Graba el ID de terminos condiciones aceptado por el usuario en el login
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="TerminosCondicionesID">ID de Terminos y Condiciones</param>
/// <param name="UsuarioID">ID Usuario a ser afectado</param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function get$terminoscondiciones$CorredoresTerminosCondicionesAceptado(TerminosCondicionesID, UsuarioID, callDone, callFail) {
    Callback({ "TerminosCondicionesID": TerminosCondicionesID, "UsuarioID": UsuarioID }, arguments, callDone, callFail);
}
/// <summary>
/// Cambia la clave del usuario
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="IdUsuario"></param>
/// <param name="NombreUsuario"></param>
/// <param name="ClaveAnterior"></param>
/// <param name="ClaveNueva"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function get$usuario$CorredoresCambioClave(IdUsuario, NombreUsuario, ClaveAnterior, ClaveNueva, callDone, callFail) {
    Callback({ "IdUsuario": IdUsuario, "NombreUsuario": NombreUsuario, "ClaveAnterior": ClaveAnterior, "ClaveNueva": ClaveNueva }, arguments, callDone, callFail);
}
/// <summary>
/// Obtiene Términos y Condiciones Actual (Publicado)
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function get$terminoscondiciones$CorredoresTerminosCondicionesActual(callDone, callFail) {
    Callback(null, arguments, callDone, callFail);
}
class PC_TerminosCondiciones {
}
class PC_Usuario {
}
class PC_PermisoUsuario {
}
class FactCorpElectronica {
}
/// <summary>
/// Graba o actualiza PC_Usuario
/// </summary>
/// <param name="cabecera">Parámetros de cabecera</param>
/// <param name="usuario"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function post$usuario$CorredoresGrabarUsuarioCorp(usuario, callDone, callFail) {
    Callback(JSON.stringify(usuario), arguments, callDone, callFail);
}
/// <summary>
/// Elimina el Usuario
/// </summary>
/// <param name="cabecera">Parámetros de cabecera</param>
/// <param name="IdUsuario">Id del usuario a ser borrado</param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function get$usuario$CorredoresEliminarUsuario(IdUsuario, callDone, callFail) {
    Callback({ "IdUsuario": IdUsuario }, arguments, callDone, callFail);
}
/// <summary>
/// Obtiene listado de Rol
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function get$rol$CorredoresObtenerRoles(callDone, callFail) {
    Callback("", arguments, callDone, callFail);
}
function get$usuario$CorredoresObtenerPermisosActivos(callDone, CallFail) {
    Callback("", arguments, callDone, CallFail);
}
class PC_Permiso {
}
/// <summary>
/// Resetea la contraseña para los admins de una empresa
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="IDUsuario"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function get$usuario$CorredoresResetearClaveUsuarioPorID(IDUsuario, callDone, callFail) {
    Callback({ "IDUsuario": IDUsuario }, arguments, callDone, callFail);
}
/// <summary>
/// Crear registros de navegación
/// </summary>
/// <param name="cabecera">Parámetros de cabecera</param>
/// <param name="estadistica">Objeto PC_EstadisticaNavegación</param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function post$Estadistica$CorredoresEstadisticaNavegacionCrearActualizar(estadistica, callDone, callFail) {
    Callback(JSON.stringify(estadistica), arguments, callDone, callFail);
}
class PC_EstadisticaNavegacion {
}
//calse Dummy de Afiliado
class Afiliado {
}
//clase dummyFacturacion
class FacturacionDummy {
}
//clase Dummy Reclamos
class ReclamoDummy {
}
//clase Pre-Autorizaciones Dummy
class PreAutorizacionesDummy {
}
//clase Empresa Dummy
class EmpresaDummy {
}
//clase Facturas Dummy
class facturaEmpresaDummy {
}
//clase PlanIndendiente Dummy
class planIndependienteDummy {
}
//clase PlanIndendiente Dummy
class planEmpresasDummy {
}
// clase BeneficiariosDummy
class beneficiarioDummy {
}
/// <summary>
/// Obtiene Broker activos e inactivos por nombre
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="idBroker"></param>
/// <param name="fecha"></param>
/// <param name="producto"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
//[Route("CorredoresResumenEjecutivoProducto")]
//[HttpGet()]
//[ResponseType(typeof (RespuestaGenericaServicio<PC_ResumenEjecutivo>))]
function post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro, callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}
class ResumenEjecutivoFilter {
}
class PC_ResumenEjecutivo {
}
/// <summary>
/// Obtiene el broker por id
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="idBroker"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function get$usuario$CorredoresObtenerBrokerPorId(idBroker, callDone, callFail) {
    Callback({ "idBroker": idBroker }, arguments, callDone, callFail);
}
class PC_AgenteVenta {
}
/// <summary>
/// Obtiene el listado de contratos pool de acuerdo al filtro aplicado
/// </summary>
/// <param name="cabecera">Cabecera de seguimiento y autorización</param>
/// <param name="BrokerID">Código del Agente de Ventas</param>
/// <param name="RazonSocial">Código del Producto</param>
/// <param name="RUCEmpresa">Código del Producto</param>
/// <param name="NumeroEmpresa">Código del Producto</param>
/// <param name="NumeroSucursal">Código del Producto</param>
/// <param name="CodProducto">Código del Producto</param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function post$contrato$ConsultarEmpresasPorAgente(filtro, callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}
function post$contrato$ConsultarEmpresasPorAgenteGeneral(filtro, callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}
class EmpresaList {
}
/// <summary>
/// Obtiene los 10 ultimos registros de facturas por empresa y sucursal
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="IDEmpresa"></param>
/// <param name="IDSucursal"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function get$facturacion$ObtenerFacturasCorpElectronicasXEmpresaSucursalBrokerLQ(IDEmpresa, IDSucursal, numeroFactura, callDone, callFail) {
    Callback({ "IDEmpresa": IDEmpresa, "IDSucursal": IDSucursal, "numeroFactura": numeroFactura }, arguments, callDone, callFail);
}
class FacturaCorporativa {
}
//[Route("ConsultaFacturaPdf")]
//[HttpGet]
//[Authorize]
//public HttpResponseMessage ConsultaFacturaPdf([FromHeader]ApplicationHeaders headers, string NumeroFactura)
function get$ebilling$ConsultaFacturaPdf(NumeroFactura, callDone, callFail) {
    Callback2({ "NumeroFactura": NumeroFactura }, arguments, callDone, callFail);
}
//[Route("ConsultaFacturaXml")]
//[HttpGet]
//[Authorize]
//public HttpResponseMessage ConsultaFacturaXml([FromHeader]ApplicationHeaders headers, string NumeroFactura)
function get$ebilling$ConsultaFacturaXml(NumeroFactura, callDone, callFail) {
    Callback2({ "NumeroFactura": NumeroFactura }, arguments, callDone, callFail);
}
//public class wsConsultaDocumentoRespuesta {
//    public string ClaveAcceso { get; set; }
//        public string NumAutorizacion { get; set; }
//        public int Estado { get; set; }
//        public string Detalle { get; set; }
//        public string EnContingencia { get; set; }
//        public string FechaAutorizacion { get; set; }
//        public string ArchivoPDF { get; set; } // transformado a Base64
//    }
class wsConsultaDocumentoRespuesta {
}
function get$facturacion$ObtenerDatosReporteSoportesFactura(IDEmpresa, IDSucursal, Cuota, tipoReporte, callDone, callFail) {
    Callback({ "IDEmpresa": IDEmpresa, "IDSucursal": IDSucursal, "Cuota": Cuota, "tipoReporte": tipoReporte }, arguments, callDone, callFail);
}
/// <summary>
/// Obtiene la información para la generación del reporte de prefactura
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="IDEmpresa">Id de empresa</param>
/// <param name="IDSucursal"></param>        
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function get$facturacion$ObtenerFormaPagoEmpresa(IDEmpresa, IDSucursal, callDone, callFail) {
    Callback({ "IDEmpresa": IDEmpresa, "IDSucursal": IDSucursal }, arguments, callDone, callFail);
}
class FormaPagoEntity {
}
///// <summary>
///// Obtiene Broker activos e inactivos por Código de Grupo de Agentes
///// </summary>
///// <param name="cabecera">Cabecera de la llamada</param>
///// <param name="CodigoGrupoAgentes">Código del grupo de agentes</param>
///// <returns>
///// HttpResponseMessage, lista de agentes dentro del grupo
///// </returns>
///// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
///// <response code="400">Error datos enviados en la cabecera</response>
///// <response code="500">Si existe un error interno</response>
//[Route("CorredoresObtenerAgentesVentaPorGrupoAgentes")]
//[HttpGet()]
//[ResponseType(typeof (RespuestaGenericaServicio<List<AgenteVentaCorredoresEntity>>))]
//public HttpResponseMessage CorredoresObtenerAgentesVentaPorGrupoAgentes([AtributoCabecera]CabeceraServicioRest cabecera, int CodigoGrupoAgentes)
function get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaPorGrupoAgentes(CodigoGrupoAgentes, callDone, callFail) {
    Callback({ "CodigoGrupoAgentes": CodigoGrupoAgentes }, arguments, callDone, callFail);
}
class AgenteVentaCorredoresEntity {
}
function get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaCorredorPorCodigo(codigo, callDone, callFail) {
    Callback({ "codigo": codigo }, arguments, callDone, callFail);
}
class ContratosIndividualesEmpresasPorAgenteFilter {
}
/// <summary>
/// Genera la facturacion de empresas y clientes
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="filter">Parámetros de Consulta/param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
function post$facturacion$ConsultarReporteGeneralFacturacion(filtro, callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}
class Facturacion_ReporteGeneral {
}
class FacturacionFilter {
}
//Pre-autorizaciones
/// <summary>
/// Autorizaciones 
/// </summary>
/// <param name="cabecera">Parámetros de cabecera</param>
/// <param name="filtro"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("ConsultaAutorizaciones")]
/// [HttpPost]
function post$CorredoresAutorizacionController$ConsultaAutorizaciones(filtro, callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}
class PreautorizacionesFilter {
}
/// <summary>
/// Obtiene Los broker activos solo en base sql
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <returns>
/// HttpResponseMessage, lista de agentes dentro del grupo
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("CorredoresObtenerAgentesVentaListSQL")]
function get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaListSQL(callDone, callFail) {
    Callback({}, arguments, callDone, callFail);
}
/// <summary>
/// Obtiene todos los Usuario por Corredor
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="idBroker"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("CorredoresObtenerUsuariosPorCorredorList")]
function get$usuario$CorredoresObtenerUsuariosPorCorredorList(idBroker, callDone, CallFail) {
    Callback({ "idBroker": idBroker }, arguments, callDone, CallFail);
}
/// <summary>
/// Obtiene el listado de contratos individuales de acuerdo al filtro aplicado
/// </summary>
/// <param name="cabecera">Cabecera de seguimiento y autorización</param>
/// <param name="filter">Parámetros de Búsqueda</param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("ConsultarContratosIndividualesPorAgente")]
function post$contrato$ConsultarContratosPorFiltro(filtro, callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}
function post$contrato$ConsultarContratosPorFiltroAfiliadoGeneral(filtro, callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}
class ContratoEntityFilter {
}
class ContratoEntityList {
}
/// <summary>
/// Obtiene el listado de contratos pool de acuerdo al filtro aplicado
/// </summary>
/// <param name="cabecera">Cabecera de seguimiento y autorización</param>
/// <param name="NumContrato">Número de Contrato</param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("ObtenerBeneficiariosIndividuales")]
function get$contrato$ObtenerBeneficiariosIndividuales(NumContrato, callDone, callFail) {
    Callback({ "NumContrato": NumContrato }, arguments, callDone, callFail);
}
class BeneficiarioEntity {
}
/// <summary>
/// Obtiene datos de la forma de pago del contrato especificado
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="NumContrato">Número de Contrato</param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("ConsultarDetalleCuotasXContrato")]
function get$contrato$ConsultarDetalleCuotasXContrato(NumContrato, callDone, callFail) {
    Callback({ "NumContrato": NumContrato }, arguments, callDone, callFail);
}
class DetalleFormaPagoEntity {
}
/// <summary>
/// Obtiene las 10 últimas facturas individuales del cliente
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="NumeroContrato"></param>
/// <param name="FechaDesde"></param>
/// <param name="FechaHasta"></param>
/// <param name="CodigoEstado"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("ConsultarFacturacionIndividualXCliente")]
function get$facturacion$ConsultarFacturacionIndividualXCliente(NumeroContrato, NumeroFactura, fechaDesde, fechaHasta, callDone, callFail) {
    Callback({ "NumeroContrato": NumeroContrato, "NumeroFactura": NumeroFactura, "fechaDesde": getInternationalFomat(fechaDesde), "fechaHasta": getInternationalFomat(fechaHasta), "CodigoEstado": 0 }, arguments, callDone, callFail);
}
function post$liquidacion$ObtenerLiquidacionesIndividuales(filtro, callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}
class ReclamoFilter {
}
class LiquidacionIndividual {
}
/// <summary>
/// Obtienelos contratos de Qpra
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="contrato"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
//[Route("CorredoresObtenerContratoQpra")]
function post$Qpra$CorredoresObtenerContratoQpra(filtroC, callDone, callFail) {
    Callback(JSON.stringify(filtroC), arguments, callDone, callFail);
}
class QpraEntity {
}
class FilterQpra {
}
/// <summary>
/// Obtienelos contratos de Qpra
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="filtro"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("CorredoresObtenerArchivoQpra")]
/// [HttpGet()]
function get$Qpra$CorredoresObtenerArchivoQpra(filtro, callDone, callFail) {
    Callback({ "filtro": filtro }, arguments, callDone, callFail);
}
class QpraArchivo {
}
/// <summary>
/// Obtiene Broker Por numero de Ruc
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="Ruc">Código del grupo de agentes</param>
/// <returns>
/// HttpResponseMessage, lista de agentes dentro del grupo
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
//[Route("CorredoresObtenerAgentesVentaPorRuc")]
//[HttpGet()]
function get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaPorRuc(Ruc, callDone, callFail) {
    Callback({ "Ruc": Ruc }, arguments, callDone, callFail);
}
/// <summary>
/// Resetea la contraseña para los admins de una empresa
/// </summary>
/// <param name="cabecera">Cabecera de la llamada</param>
/// <param name="IDCorredor"></param>
/// <param name="UserName"></param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("CorredoresResetearClaveCorredores")]
function get$usuario$CorredoresResetearClaveCorredores(IDCorredor, UserName, callDone, callFail) {
    Callback({ "IDCorredor": IDCorredor, "UserName": UserName }, arguments, callDone, callFail);
}
/// <summary>
/// Obtiene el listado de contratos individuales de acuerdo al filtro aplicado
/// </summary>
/// <param name="cabecera">Cabecera de seguimiento y autorización</param>
/// <param name="filter">Parámetros de Búsqueda</param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("ConsultarContratosIndividualesPorAgente")]
/// [HttpPost()]
function post$contrato$ConsultarContratosIndividualesPorAgente(filtroC, callDone, callFail) {
    Callback(JSON.stringify(filtroC), arguments, callDone, callFail);
}
/// <summary>
/// Obtiene el listado de contratos corporativos de acuerdo al filtro aplicado
/// </summary>
/// <param name="cabecera">Cabecera de seguimiento y autorización</param>
/// <param name="filter">Parámetros de Búsqueda</param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("ConsultarContratosCorpPorAgente")]
function post$contrato$ConsultarContratosCorpPorAgente(filtroC, callDone, callFail) {
    Callback(JSON.stringify(filtroC), arguments, callDone, callFail);
}
function post$contrato$getOneByKey(filtro, callDone, callFail) {
    Callback4(AddresServicioSiniestralidadAfiliado, JSON.stringify(filtro), {}, arguments, callDone, callFail);
}
class FiltroSiniestralidadActual {
}
class SiniestralidadAcumulada {
}
/// <summary>
/// Obtiene el listado de empresas atadas a un broker
/// </summary>
/// <param name="cabecera">Cabecera de seguimiento y autorización</param>
/// <param name="filter">Objeto de la clase ContratoEntityFilter para ingresar los datos a consultar</param>
/// <returns>
/// HttpResponseMessage
/// </returns>
/// <response code="200">Si se ejecuta con éxito y retorna el valor esperado</response>
/// <response code="400">Error datos enviados en la cabecera</response>
/// <response code="500">Si existe un error interno</response>
/// [Route("ConsultarEmpresasPorAgente")]
function post$CorredoresAgenteVenta$ConsultarEmpresasPorAgente(filtroC, callDone, callFail) {
    Callback(JSON.stringify(filtroC), arguments, callDone, callFail);
}
function get$masivo$ObtenerRegistrosCargaPorEmpresa(IDEmpresa, callDone, callFail) {
    Callback4(AddresServicioEstadisticaContratante, '', { "IDEmpresa": IDEmpresa }, arguments, callDone, callFail);
}
class registroEstadistica {
}
function get$masivo$ObtenerConsolidadoRegistrosCarga(IDEmpresa, callDone, callFail) {
    Callback4(AddresServicioEstadisticaContratante, '', { "IDEmpresa": IDEmpresa }, arguments, callDone, callFail);
}
class ResumenConsolidadoRegistrosCarga {
}
function post$facturacion$ConsultarFacturacionPendienteAfiliado(filtroC, callDone, callFail) {
    Callback(JSON.stringify(filtroC), arguments, callDone, callFail);
}
class ConsultaFacturacionFilter {
}
function post$facturacion$ConsultarFacturacionPendienteEmpresa(filtroC, callDone, callFail) {
    Callback(JSON.stringify(filtroC), arguments, callDone, callFail);
}
//# sourceMappingURL=Proxy.js.map