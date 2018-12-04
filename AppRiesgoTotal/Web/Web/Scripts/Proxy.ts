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

function get$empresa$ObtenerEmpresasPorGrupo(IdGrupo: number, callDone, callFail) {
    Callback({ "IdGrupo": IdGrupo }, arguments, callDone, callFail);
}

class Empresa {
    public Numero: number;
    public Nombre: string;
    public AgenteVenta: string;
    public Ruc: string;
    public Ciudad: string;
    public Barrio: string;
    public Calle: string;
    public Zona: string;
    public NombreGrupo: string;
    public EmpresaMision: string;
    public EmpresaVision: string;
    public EmpresaLogo: string;
    public TipoSociedad: string;
    public RazonSocial: string;
    public NombresRepresentante: string;
    public ApellidosRepresentante: string;
    public Telefono: string;
    public Telefono1: string;
    public Telefono2: string;
}

function get$contrato$ObtenerMovimientosBeneficiariosEmpresas(empresaNumero: string[], sucursalEmpresa: string[], codigoProducto: string[], fechaDesde: Date, fechaHasta: Date, codigoTransaccion: string[], callDone, callFail) {
    Callback4(AddressServicioContratos, null, { "empresaNumero": empresaNumero.join(","), "sucursalEmpresa": sucursalEmpresa.join(","), "codigoProducto": codigoProducto.join(","), "fechaDesde": getFormattedDateymd(fechaDesde), "fechaHasta": getFormattedDateymd(fechaHasta), "codigoTransaccion": codigoTransaccion.join(",") }, arguments, callDone, callFail);
}

class MovimientoBeneficiarioEmpresa {
    public FechaMovimiento: string;
    public Movimiento: string;
    public FechaEfectoMovimiento: string;
    public Digitador: string;
    public EmpresaNumero: number;
    public RazonSocial: string;
    public NumeroSucursal: number;
    public SucursalNombre: string;
    public ContratoNumero: number;
    public ServicioAnterior: string;
    public Persona: string;
    public ServicioActual: string;
    public CodigoEmpresa: number;
    public CodigoSucursal: number;
    public NombreCorto: string;
}

class ListaElegida {
    public CodigoLista: string;
    public IDEmpresa: number;
}

class ParametrosReporte {
    public NombreReporte: string; // Nombre del reporte que va a ser renderizado en Reporting Services RDLC
    public CodigosListas: Array<ListaElegida>; // enviaría una lista separada por comas de los códigos de lista (pueden venir de varias empresas)
    public FechaInicio: Date; // rango de fechas del reporte (inicio)
    public FechaFin: Date; // rango de fechas del reporte (inicio)
    public Identificacion: string; // para filtrar por identificación
    public Estados: string; // para los reportes que requieren filtro por estados (irìan los estaos separados por comas cuando sean varios)
}



class ReclamoEmpresaLista {

    public NombreEmpresa: string;
    public NumeroReclamo: number;
    public NumeroAlcance: number;
    public FechaIncurrencia: string;
    public FechaPago: string;
    public ContratoNumero: number;
    public Plan: string;
    public DocumentoTitular: string;
    public Titular: string;
    public Beneficiario: string;
    public Relacion: string;
    public Sexo: string;
    public FechaNacimiento: string;
    public Diagnostico: string;
    public CodigoDiagnostico: string;
    public Prestador: string;
    public MontoPresentado: number;
    public MontoPagado: number;
    public MontoDeducible: number;
    public LugarAtencion: string;
    public EmpresaNumero: number;
    public SucursalEmpresa: number;
    public NombreTipoReclamo: string;
    //datos procesados
    public sexoP: string;
    public edad: number;
    public NContrato_Alcance: string;
}


class PersonaEntity {
    public Celular: string;
    public Condicion_Cedulado: number;
    public Email_Personal: string;
    public Email_trabajo: string;
    public Estado_Civil: number;
    public FechaConsulta: Date;
    public Fecha_Nacimiento: Date;
    public Genero: number;
    public Identificacion: string;
    public Nombre_Madre: string;
    public Nombre_Padre: string;
    public Primer_Apellido: string;
    public Primer_Nombre: string;
    public Segundo_Apellido: string;
    public Segundo_Nombre: string;
    public Telefono_Domicilio: string;
    public Telefono_Trabajo: string;
    public Tipo_Identificacion: number;
}

class Persona {
    public Cedula: string;
    public Nombres: string;
    public Nombre1: string;
    public Nombre2: string;
    public Apellidos: string;
    public Apellido1: string;
    public Apellido2: string;
    public FechaNacimiento: Date;
    public Genero: string;
    public CodigoCliente: string;
    public TipoDocumento: string;
    public EstadoCivil: string;
    public BancoCodigo: string;
    public Banco: string;
    public NumeroCuenta: string;
    public TipoCuenta: string;
    public email: string;
    public emailempresa: string;
    public celular: string;
    public provincia: string;
    public ciudad: string;
    public direccion: string; //( concatena sector y direccion)
    public PersonaNumero: number;
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


function get$grupo$ObtenerListaSucursalesPorGrupo(IDEmpresa: number, callDone, callFail) {
    Callback({ "IDEmpresa": IDEmpresa }, arguments, callDone, callFail);
}

class GrupoCorporativo {
    public IDGrupo: number;
    public NombreGrupo: string;
    public IDEmpresa: number;
    public NombreEmpresa: string;
    public IDSucursal: number;
    public NombreSucursal: string;
    public CodProducto: string;
}

// Reporte de Reclamos
//http://desarrollo.servicios.saludsa.com.ec/ServicioLiquidacion/swagger/ui/index#!/Liquidaciones/Liquidaciones_ObtenerReclamosGrupoEmpresaListaBeneficiario

//GET / api / ObtenerReclamosGrupoEmpresaListaBeneficiario
// REQUEST:
//http://desarrollo.servicios.saludsa.com.ec/ServicioLiquidacion/api/ObtenerReclamosGrupoEmpresaListaBeneficiario?empresaNumero=1&sucursalEmpresa=1&fechaDesde=1&fechaHasta=1

function get$Liquidacion$ObtenerReclamosGrupoEmpresaListaBeneficiario(empresaNumero: string[], sucursalEmpresa: string[], fechaDesde: Date, fechaHasta: Date, documento: string, callDone, callFail) {
    Callback4(AddressServicioLiquidacion, null, { "empresaNumero": empresaNumero.join(","), "sucursalEmpresa": sucursalEmpresa.join(","), "fechaDesde": getFormattedDateymd(fechaDesde), "fechaHasta": getFormattedDateymd(fechaHasta), "documento": documento }, arguments, callDone, callFail);
}

//servicio de generacion de reporte reclamos
//http://pruebas.servicios.saludsa.com.ec/ServicioArmonix/swagger/ui/index#!/Reclamo/Reclamo_GenerarPdf
//POST /api/reclamos/generarPdf
function post$reclamos$generarPdf64(reclamo: ReclamoEntityFilter, callDone, callFail) {
    Callback2(JSON.stringify(reclamo), arguments, callDone, callFail);
}

class ReclamoEntityFilter {
    public NumeroReclamo: number;
    public NumeroAlcance: number;
    public NumeroContrato: number;
    public CodigoContrato: number;
    public NumeroPersona: number;
    public NumeroSobre: string;
    public TipoReclamo: string;
    public Producto: string;
    public CodigoPlan: string;
    public NombreTitular: string;
    public PersonaNumero: number;
    public NombreBeneficiario: string;
    public MontoPresentado: number;
    public MontoCubierto: number;
    public MontoBonificado: number;
    public MontoCopago: number;
    public MontoArancel: number;
    public EstadoReclamo: string;
    public FechaLiquidacion: string;
    public Region: string;
    public Prestador: string;
    public Diagnostico: string;
    public OficinaLiquidacion: string;
    public Digitador: string;
    public NivelPrestadorDesde: number;
    public NivelPrestadorHasta: number;
    public NivelCliente: number;
    public Especialidad: string;
    public FechaDesde: string;
    public FechaHasta: string;
    public NumeroPrestador: number;
    public NumeroConvenio: string;
    public RucPrestador: string;
}

class numerosSucursalEmpresa {
    public NumeroEmpresa: number;
    public NumeroLista: number;
}

// Reporte de Copagos
//http://desarrollo.servicios.saludsa.com.ec/ServicioLiquidacion/swagger/ui/index#!/Copagos/Copagos_ConsultaAutorizaciones
//POST /api/ConsultaCopagos

function post$Copagos$ConsultaCopagos(tipoCliente: number, empresas: Array<numerosSucursalEmpresa>, fechaDesde: Date, fechaHasta: Date, estados: number, docTitular: string, callDone, callFail) {
    Callback4(AddressServicioCopagoAutorizacion, JSON.stringify(empresas), { "tipoCliente": tipoCliente, "fechaDesde": getInternationalFomat(fechaDesde), "fechaHasta": getInternationalFomat(fechaHasta), "estadoCopago": estados, "documentoTitular": docTitular }, arguments, callDone, callFail);
}
//copago
class CopagoPendiente {
    public NumeroEmpresa: number;
    public SucursalEmpresa: number;
    public NumeroContrato: number;
    public NumeroReclamo: number;
    public NumeroAlcance: number;
    public NumeroCopago: number;
    public NumeroPersonaTitular: number;
    public NumeroPersonaBeneficiario: number;
    public PersonaCedulaTitular: string;
    public PersonaCedulaBeneficiario: string;
    public NombresBeneficiario: string;
    public NombresTitular: string;
    public CodigoDiagnostico: string;
    public FechaPago: string;
    public FechaPagoReclamo: string;
    public CodigoEstado: number;
    public EstadoCopago: string;
    public ValorCobrado: number;
    public ValorPagado: number;
    public FechaEmision: string;
    public NombreDiagnostico: string;
    public DiasImpago: string;
    public ReclamoAlcance: string;
    public AliasSucursal: string;
}

// Reporte de Autorizaciones
//http://desarrollo.servicios.saludsa.com.ec/ServicioLiquidacion/swagger/ui/index#!/Copagos/Copagos_ConsultaAutorizaciones
//POST /api/ConsultaAutorizaciones

function post$CorredoresAutorizacionController$ConsultaAutorizacionesEspecificas(tipoCliente: number, empresas: Array<numerosSucursalEmpresa>, fechaDesde: Date, fechaHasta: Date, documento: string, callDone, callFail) {
    Callback4(AddressServicioCopagoAutorizacion, JSON.stringify(empresas), { "tipoCliente": tipoCliente, "fechaDesde": getInternationalFomat(fechaDesde), "fechaHasta": getInternationalFomat(fechaHasta), "documentoBeneficiario": documento }, arguments, callDone, callFail);
}

class AutorizacionesCubiertas {
    public NombreEmpresa: string;
    public NumeroEmpresa: number;
    public SucursalEmpresa: number;
    public ContratoNumero: number;
    public CodigoContrato: number;
    public NombreBeneficiario: string;
    public CedulaBeneficiario: string;
    public NombreTitular: string;
    public CodigoDiagnostico: string;
    public NumeroAutorizacion: number;
    public EstadoAutorizacion: string;
    public EstadoId: number;
    public FechaAutorizacion: string;
    public CodigoPrestadorEmpresa: number;
    public NombrePrestadorEmpresa: string;
    public PrestadorTipo: string;
    public TipoCobertura: string;
    public CodigoPrestador: number;
    public NombrePrestador: string;
    public NivelPrestador: string;
    public FechaRequerimiento: string;
    public FechaAlta: string;
    public LugarAtencion: string;
    public CodigoMotivoNoCubierto: number;
    public EstadoCobertura: string;
    public CodigoProducto: string;
    public DescripcionMotivo: string;
    public TipoAplicacion: string;
    public NumeroReclamo: number;
    public NumeroAlcance: number;
    public FechaHospitalizacion: string;
    public Region: string;
    public NombreDiagnostico: string;
    public IdAutorizacion: number;
}
// Reporte de Siniestralidad: 1'

//POST /api/Siniestralidad/Mensualizada
//Obtiene la siniestralidad mensualizada por listas
//http://desarrollo.servicios.saludsa.com.ec/ServicioEmpresas/swagger/ui/index#!/Siniestralidad/Siniestralidad_SiniestralidadListas

function post$siniestralidad$Mensualizada(fechaDesde: Date, fechaHasta: Date, empresas: Array<numerosSucursalEmpresa>, soloCorporativos:boolean ,callDone, callFail) {
    //Callback4(AddressServicioSiniestralidad, JSON.stringify(empresas), { "fechaDesde": getFormattedDateymd(fechaDesde), "fechaHasta": getFormattedDateymd(fechaHasta) }, arguments, callDone, callFail);
    Callback4(AddressServicioSiniestralidad, JSON.stringify(empresas), { "fechaDesde": getInternationalFomat(fechaDesde), "fechaHasta": getInternationalFomat(fechaHasta), "soloCorporativos": false }, arguments, callDone, callFail);
}

class SiniestralidadLista {
    public NumeroLista: number;
    public Nombre: string;
    public NumeroEmpresa: number;
    public Empresa: string;
    public NumeroRuc: string;
    public Anio: number;
    public Mes: string;
    public Primas: number;
    public Liquidaciones: number;
    public Porcentaje: number;
    public LiquidacionesSinIdnr: number;
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

function post$facturacion$GenerarExportableSiniestralidadLista(lst: Array<SiniestralidadLista>, callDone, callFail) {
    Callback(JSON.stringify(lst), arguments, callDone, callFail);
}


class CORP_Registro {
    public IdRegistro: number;
    public IdArchivo: number;
    public IdUsuario: number;
    public TipoDocumento: number;
    public TipoMovimiento: number;
    public Estado: number;
    public Fechacreacion: Date;
    public NumeroDocumento: string;
    public Nombres: string;
    public Apellidos: string;
    public Email: string;
    public NombreProducto: string;
    public IdProducto: string;
    public IdCobertura: string;
    public Observaciones: string;
    public Datos: string;
    public Resultado: string;
    public RC_Celular: string;
    public RC_CondicionCedulado: number;
    public RC_EmailPersonal: string;
    public RC_EmailTrabajo: string;
    public RC_EstadoCivil: number;
    public RC_FechaNacimiento: Date;
    public RC_Genero: number;
    public RC_TelefonoDomicilio: string;
    public RC_TelefonoTrabajo: string;
    public CompletadoEnrolamiento: boolean;
    public BloqueadoServicio: boolean;

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

function post$usuario$CorredoresObtenerUsuarioPorNombreyClave(usuario: PC_UsuarioRol_Result, callDone, callFail) {
    Callback(JSON.stringify(usuario), arguments, callDone, callFail);
}
//CLASE
class PC_UsuarioRol_Result {
    public Id: number; 
    public Cedula: string;
    public NombreApellido: string;
    public Email: string;
    public Telefono: string;
    public NombreUsuario: string;
    public Contrasena: string;
    public IdCorredor: number;
    public IdGrupo: number;
    public TelefonoFijo: string
    public Extension: string;
    public RucEmpresa: string;
    public Estado: number;
    public rol: Array<PC_Rol_Result>;
    public permiso: Array<PC_Permiso_Result>;
    public TerminosCondicionesAprobado?:number;
    public Region: string;
    public PermisoPlan: string;
    public CodigoGrupoAgentes?: number;
}
class PC_Rol_Result {
    public Id: number;
    public Nombre: string;
}
class PC_Permiso_Result {
    public IDPermiso: number;
    public Nombre: string
    public Activo?: boolean;
    public Seleccionable?: boolean;
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

function get$terminoscondiciones$CorredoresTerminosCondicionesPorID(TerminosCondicionesID: number, callDone, callFail) {
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

function get$usuario$CorredoresObtenerPermisosUsuarioPorID(IDUsuario: number, callDone, CallFail) {
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

function get$usuario$CorredoresObtenerUsuariosActivosPorEmpresa(IDEmpresa: number, callDone, CallFail) {
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

function get$usuario$CorredoresResetearClaveCorp(RUCEmpresa: String, UserName: String, callDone, callFail) {
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

function get$terminoscondiciones$CorredoresTerminosCondicionesPDFContenido(TerminosCondicionesID: number, callDone, callFail) {
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

function get$terminoscondiciones$CorredoresTerminosCondicionesAceptado(TerminosCondicionesID: number, UsuarioID: number, callDone, callFail) {
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

function get$usuario$CorredoresCambioClave(IdUsuario: number, NombreUsuario: string, ClaveAnterior: string, ClaveNueva: string, callDone, callFail) {
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
    public TerminosCondicionesID: number;
    public DescripcionCorta: string;
    public ResumenCambios: string;
    public ContenidoCompleto:string;
    public Publicado: boolean;
}

class PC_Usuario {
    public Id: number; 
    public IdCorredor: number; 
    public IdGrupo: number;
    public Cedula: string;
    public NombreApellido: string;
    public Email: string;
    public Telefono: string;
    public NombreUsuario: string;
    public Contrasena: string;
    public TelefonoFijo: string;
    public Extension: string;
    public RUCEmpresa: string;
    public FechaCreacion?: Date;
    public int: number; 
    public TerminosCondicionesAprobado?: number;
    public Region: string;
}

class PC_PermisoUsuario
{
    public IDPermiso: number;
    public IDUsuario: number;
    public IDCorredor: number;
}

class FactCorpElectronica {
    public IDEmpresa: number;
    public IDSucursal: number;
    public IDCuota: number;
    public SucursalNombre: string;
    public NumeroFactura: string;
    public NumAutorizacion: string;
    public FechaEmision: Date;
    public ValorTotal: number;
    public TipoDocumento: string;
    public FechaMes: string;
    public SerieFacturacion: number;
    public CodigoSucursal: string;
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

function post$usuario$CorredoresGrabarUsuarioCorp(usuario: PC_UsuarioRol_Result, callDone, callFail) {
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

function get$usuario$CorredoresEliminarUsuario(IdUsuario: number, callDone, callFail) {
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
    Callback("",arguments, callDone, callFail);
}

function get$usuario$CorredoresObtenerPermisosActivos(callDone, CallFail) {
    Callback("", arguments, callDone, CallFail);
}

class PC_Permiso {
    public IDPermiso: number;
    public Nombre: string;
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
function get$usuario$CorredoresResetearClaveUsuarioPorID(IDUsuario: number, callDone, callFail) {
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

function post$Estadistica$CorredoresEstadisticaNavegacionCrearActualizar(estadistica: PC_EstadisticaNavegacion, callDone, callFail) {
    Callback(JSON.stringify(estadistica), arguments, callDone, callFail);
}

class PC_EstadisticaNavegacion {
    public Id:number ;
    public IdUsuario:number ;
    public NombreUsuario: string ;
    public IdCorredor:number ;
    public FechaHoraVisita:Date ;
    public IdPermiso:number ;
}

//calse Dummy de Afiliado
class Afiliado {
    public id: number;   
    public region: string;
    public producto: string;
    public contrato: string;
    public codigoPlan: string;
    public estado: string;
    public fechaInicio: Date;
    public fechaFin: Date;
    public pendientePago: string;
    public nombresApelldos: string;
    public cedula: string;
    public numeroPersona: string;
    public RazonSocial: string;
    public numeroEmpresa: string;
    public Ciudad: string;
    public Sucursal: string;
    public valor: number;
    public vigencia: Date;
}
//clase dummyFacturacion
class FacturacionDummy {
    public id: number;
    public factura: string;
    public mes: string;
    public facturacionDesde: Date;
    public facturacionHasta: Date;
    public estado: string;
    public valorCuota: number;
}
//clase Dummy Reclamos
class ReclamoDummy {
    public id: number;
    public NumeroReclamo: string;
    public NombreBeneficiario: string;
    public Tipo: string;
    public Diagnostico: string;
    public FechaRetencion: string;
    public Estado: string;
    public FormaPago: string;
    public MontoCubierto: string;
    public MontoNoCubierto: string;
    public MontoDeducible: string;
    public MontoCopago: string;
    public MontoBonificado: string;
}
//clase Pre-Autorizaciones Dummy
class PreAutorizacionesDummy {
    public id: number;
    public codigoProducto: string;
    public autorizaciones: string;
    public fechaCreacion: Date;
    public fechaHospitalizacion: Date;
    public fechaAutorizacion: Date;
    public fechaAnulacion: Date;
    public estado: string;
    public cobertura: string;
}
//clase Empresa Dummy
class EmpresaDummy {
    public id: number;
    public empresa: string;
    public numeroEmpresa: string;
    public ruc: string;
    public region: string;
    public contrato: string;
    public nombreLista: string;
    public numeroLista: string;
    public grupo: string;
    public pendientePago: boolean;
    public bloqueado: boolean;
    public valor: number;
    public vigencia: Date;
}
//clase Facturas Dummy
class facturaEmpresaDummy {
    public id: number;
    public numeroFactura: string;
    public nombreLista: string;
    public periodoFacturacion: string;
    public mesEmision: string;
    public valorTotal: number;
    public estado: string;
}

//clase PlanIndendiente Dummy
class planIndependienteDummy {
    public id: number;
    public contratato: string;
    public nombresApellidos: string;
    public valor: number;
    public vigencia: string;
}

//clase PlanIndendiente Dummy
class planEmpresasDummy {
    public id: number;
    public Empresa: string;
    public nombresEmpresa: string;
    public lista: string;
    public NombreLista: string;
    public vigencia: string;
}

// clase BeneficiariosDummy
class beneficiarioDummy {
    public id: number;
    public nombres: string;
    public relacion: string;
    public estado: string;
    public fechaInclusion: Date;
    public fechaExclusion: Date;
    public precioBeneficiario: number;
    public precioServiciosAdicionales: number;
    public plan: string;
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
function post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro: ResumenEjecutivoFilter, callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}

class ResumenEjecutivoFilter {
    public Brokers: Array<number>;
    public fecha: Date;
    public lstProductos: Array<string>;
    public region: string;
}

class PC_ResumenEjecutivo {
    public Id?: number;
    public FechaCreación?: Date;
    public FechaConsulta?: Date;
    public AgenteVentaId?: number;
    public Producto?: string;
    public ClientesActivos ?:number
    public ClientesMora?: number;
    public Anulados?: number;
    public Valor?: number;
    public Comision?: number;
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
function get$usuario$CorredoresObtenerBrokerPorId(idBroker: number, callDone, callFail) {
    Callback({ "idBroker": idBroker }, arguments, callDone, callFail);
}

class PC_AgenteVenta {
    public codigo_agente_venta?:number;
    public codigo_vendedor?: string;
    public persona_numero?: number;
    public empresa_numero?: number;
    public codigo_sucursal?: number;
    public tipo_agente_venta?: string;
    public codigo_director?: number;
    public numero_vendedores?: number;
    public fecha_ingreso_agente?: Date;
    public fecha_salida_agente?: Date;
    public region?: string;
    public codigo_grupo?: number;
    public nombre_agente_venta?: string;
    public grupo_venta?: string;
    public porcentaje_comision?: number;
    public numero_cuenta_contable?: string;
    public estado_agente_venta?: number;
    public comision_renov?: number;
    public estado?: number;
    public fecha_modificacion?: number;
    public digitador_modificacion?: string;
    public hora_creacion?: string;
    public hora_modificacion?: string;
    public prog_modificacion?: string;
    public fecha_creacion?: Date;
    public digitador_creacion?:string;
    public prog_creacion?:string;
    public fecha_anulacion?: Date;
    public digitador_anulacion?: string;
    public hora_anulacion?: string;
    public razon_social_broker?: string;
    public ruc_broker?: string;
    public prog_anulacion?: string;
    public usuarioweb?: string;
    public claveweb?: string;
    public email_broker?: string;
    public tipo_contribuyente?:number;
    public nivel?: number;
    public codigo_tipo?: number;
    public imprime_documento?: boolean;
    public permiso?: boolean;
    public us_login?: string;
    public aplica_poo?: boolean;
    public aplica_cor?: boolean;
    public aplica_ind?: boolean;
    public active_directory_user?: string;
    public renovacion_email_broker?: string;
    public representante_legal?: string;
    public contacto_nombre?: string;
    public comunicacionesEmail?: string;
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

function post$contrato$ConsultarEmpresasPorAgente(filtro: ContratosIndividualesEmpresasPorAgenteFilter, callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}
function post$contrato$ConsultarEmpresasPorAgenteGeneral(filtro: ContratosIndividualesEmpresasPorAgenteFilter, callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}

class EmpresaList {
    public RazonSocial?: string;
    public NumeroEmpresa?: number;
    public RUCEmpresa?: string;
    public Region?: string;
    public NombreSucursal?: string;
    public NumeroSucursal?: number;
    public Grupo?: string;
    public CodigoProducto?: string;
    public NumeroContratos?: number;
    public FechaInicioSucursal?: string;
    public FechaInicioSucursalDate?: Date;
    public FechaFinSucursal?: string;
    public FechaFinSucursalDate?: Date;
    public PendientePago?: boolean;
    public Bloqueado?: boolean;
    public CodigoAgenteVenta?: number;
    public NombreAgenteVenta?: string;
    public FechaDigitacionEmpresa?: Date;
    public NumeroAfiliados?: number;
    public NumeroBeneficiarios?: number;
    public TotalUsuarios?: number;
    public EstadoEmpresa?: number;
    public EstadoDesc?: string;
    public CodigoEjecutivoVenta?: string;
    public EjecutivoVenta?: string;
    public AliasSucursal?: string;
    public EstadoSucursal: number;
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
    public IDEmpresa?: number;
    public IDSucursal?: number;
    public IDCuota?: number;
    public SucursalNombre?: string;
    public NumeroFactura?: string;
    public NumAutorizacion?: string;
    public FechaFacturacion?: Date;
    public FechaEmision?: Date;
    public ValorTotal?: number;
    public TipoDocumento?: string;
    public Alias?: string;
    public PeriodoFacturacion?: string;
    public FechaMes?: string;
    public NombreSucursal?: string;
    public NombreEmpresa?: string;
    public Estado?: string;
    public SerieFacturacion: number;
    public CodigoSucursal: string;
}


//[Route("ConsultaFacturaPdf")]
//[HttpGet]
//[Authorize]
//public HttpResponseMessage ConsultaFacturaPdf([FromHeader]ApplicationHeaders headers, string NumeroFactura)
function get$ebilling$ConsultaFacturaPdf(NumeroFactura: string, callDone, callFail) {
    Callback2({ "NumeroFactura": NumeroFactura }, arguments, callDone, callFail);
}


//[Route("ConsultaFacturaXml")]
//[HttpGet]
//[Authorize]
//public HttpResponseMessage ConsultaFacturaXml([FromHeader]ApplicationHeaders headers, string NumeroFactura)
function get$ebilling$ConsultaFacturaXml(NumeroFactura: string, callDone, callFail) {
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
    public ClaveAcceso: string;
    public NumAutorizacion: string;
    public Estado: number;
    public Detalle: string;
    public EnContingencia: string;
    public FechaAutorizacion: string;
    public ArchivoPDF: string;
}

function get$facturacion$ObtenerDatosReporteSoportesFactura(IDEmpresa: number, IDSucursal: number, Cuota: number, tipoReporte: number, callDone, callFail) {
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
function get$facturacion$ObtenerFormaPagoEmpresa(IDEmpresa: number, IDSucursal: number, callDone, callFail) {
    Callback({ "IDEmpresa": IDEmpresa, "IDSucursal": IDSucursal }, arguments, callDone, callFail);
}

class FormaPagoEntity {
    public EmpresaNombre?: string;
    public FacturarA?: string;
    public FormaPago?: string;
    public TipoCuenta?: string;
    public NombreBanco?: string;
    public numeroCuenta?: string;
    public periodoPago?: string;

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
        
function get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaPorGrupoAgentes(CodigoGrupoAgentes: number, callDone, callFail) {
    Callback({ "CodigoGrupoAgentes": CodigoGrupoAgentes }, arguments, callDone, callFail);
}


class AgenteVentaCorredoresEntity {
    //public class AgenteVentaCorredoresEntity {

    //    public virtual string CodigoVendedor { get; set; }
    public CodigoVendedor: string;

    //    public virtual int Codigo { get; set; }
    public Codigo: number;

    //    public virtual int NumeroPersona { get; set; }
    public NumeroPersona: number;

    //    public virtual string Persona { get; set; }
    public Persona: string;

    //    public virtual int NumeroEmpresa { get; set; }
    public NumeroEmpresa: number;

    //    public virtual string Empresa { get; set; }
    public Empresa: string;

    //    public virtual short? CodigoSucursal { get; set; }
    public CodigoSucursal?: number;

    //    public virtual string Sucursal { get; set; }
    public Sucursal: string;

    //    public virtual string Tipo { get; set; }
    public Tipo: string;

    //    public virtual int CodigoDirector { get; set; }
    public CodigoDirector: number;

    //    public virtual string Director { get; set; }
    public Director: string;

    //    public virtual short NumeroVendedores { get; set; }
    public NumeroVendedores: number;

    //    public virtual DateTime? FechaIngreso { get; set; }
    public FechaIngreso?: Date;

    //    public virtual DateTime? FechaSalida { get; set; }
    public FechaSalida?: Date;

    //    public virtual string Region { get; set; }
    public Region: string;

    //    public virtual short CodigoGrupo { get; set; }
    public CodigoGrupo: number;

    //    public virtual string Grupo { get; set; }
    public Grupo: string;

    //    public virtual string Nombre { get; set; }
    public Nombre: string;

    //    public virtual string GrupoVenta { get; set; }
    public GrupoVenta: string;

    //    public virtual decimal PorcentajeComision { get; set; }
    public PorcentajeComision: number;

    //    public virtual string NumeroCuentaContable { get; set; }
    public NumeroCuentaContable: string;

    //    public virtual short CodigoEstadoAgente { get; set; }
    public CodigoEstadoAgente: number;

    //    public virtual string EstadoAgente { get; set; }
    public EstadoAgente: string;

    //    public virtual decimal ComisionRenovacion { get; set; }
    public ComisionRenovacion: number;

    //    public virtual short CodigoEstado { get; set; }
    public CodigoEstado: number;

    //    public virtual int Estado { get; set; }
    public Estado: number;

    //    public virtual DateTime? FechaModificacion { get; set; }
    public FechaModificacion?: Date;

    //    public virtual string DigitadorModificacion { get; set; }
    public DigitadorModificacion: string;

    //    public virtual string HoraCreacion { get; set; }
    public HoraCreacion: string;

    //    public virtual string HoraModificacion { get; set; }
    public HoraModificacion: string;

    //    public virtual string ProgramaModificacion { get; set; }
    public ProgramaModificacion: string;

    //    public virtual DateTime? FechaCreacion { get; set; }
    public FechaCreacion?: Date;

    //    public virtual string DigitadorCreacion { get; set; }
    public DigitadorCreacion: string;

    //    public virtual string ProgramaCreacion { get; set; }
    public ProgramaCreacion: string;

    //    public virtual DateTime? FechaAnulacion { get; set; }
    public FechaAnulacion?: Date;

    //    public virtual string DigitadorAnulacion { get; set; }
    public DigitadorAnulacion: string;

    //    public virtual string HoraAnulacion { get; set; }
    public HoraAnulacion: string;

    //    public virtual string RazonSocialBroker { get; set; }
    public RazonSocialBroker: string;

    //    public virtual string RucBroker { get; set; }
    public RucBroker: string;

    //    public virtual string ProgramaAnulacion { get; set; }
    public ProgramaAnulacion: string;

    //    public virtual string UsuarioWeb { get; set; }
    public UsuarioWeb: string;

    //    public virtual string ClaveWeb { get; set; }
    public ClaveWeb: string;

    //    public virtual string EmailBroker { get; set; }
    public EmailBroker: string;

    //    public virtual short CodigoTipoContribuyente { get; set; }
    public CodigoTipoContribuyente: number;

    //    public virtual int TipoContribuyente { get; set; }
    public TipoContribuyente: number;

    //    public virtual short Nivel { get; set; }
    public Nivel: number;

    //    public virtual int CodigoTipo { get; set; }
    public CodigoTipo: number;

    //    public virtual bool EsImpresionDocumento { get; set; }
    public EsImpresionDocumento: boolean;

    //    public virtual bool EsPermiso { get; set; }
    public EsPermiso: boolean;

    //    public virtual string LoginUsuario { get; set; }
    public LoginUsuario: string;

    //    public virtual bool AplicaPool { get; set; }
    public AplicaPool: boolean;

    //    public virtual bool AplicaCorporativo { get; set; }
    public AplicaCorporativo: boolean;

    //    public virtual bool AplicaIndividual { get; set; }
    public AplicaIndividual: boolean;

    //    public virtual string UsuarioDirectorioActivo { get; set; }
    public UsuarioDirectorioActivo: string;

    //    public virtual string EmailRenovacion { get; set; }
    public EmailRenovacion: string;

    //    public virtual string comunicacionesEmail { get; set; }
    public comunicacionesEmail: string;

    //    public virtual string representante_legal { get; set; }
    public representante_legal: string;

    //    public virtual string contacto_nombre { get; set; }
    public contacto_nombre: string;

    public contratoAgenciamiento: string;
    // no mapeado

    //    public virtual int? CodigoGrupoAgentes { get; set; }
    public CodigoGrupoAgentes?: number;

    //    public virtual List< PC_UsuarioRol_Result > Usuarios { get; set; }
    public Usuarios: Array<PC_UsuarioRol_Result>;

    //        public virtual string Mensaje { get; set; }
    public Mensaje: string;
   
    //    }
}

function get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaCorredorPorCodigo(codigo: number, callDone, callFail) {
    Callback({ "codigo": codigo }, arguments, callDone, callFail);
}

class ContratosIndividualesEmpresasPorAgenteFilter {
    public Brokers: Array<number>;
    public lstProductos: Array<string>;
    public RazonSocial: string;
    public RUCEmpresa: string;
    public NumeroEmpresa: string;
    public NumeroSucursal: string;
    public SoloActivos: boolean;
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

function post$facturacion$ConsultarReporteGeneralFacturacion(filtro: FacturacionFilter, callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}

class Facturacion_ReporteGeneral {
    public FechaEmision?: Date;
    public FechaEmisionAdap?: string;
    public Nombre: string;
    public Identificacion: string;
    public NumeroFactura: string;
    public FechaInicio?: Date;
    public FechaInicioAdap?: string;
    public FechaFin?: Date;
    public FechaFinAdap?: string;
    public ValorTotal: number;
    public Estado: number;
    public EstadoAdap: string;
    public EstadoDesc: string;
    public Region: string;
    public SmartPlan: boolean;
    public CodigoAgenteVenta: string;
    public NombreAgenteVenta: string;
    public IDEmpresa: number;
    public IDSucursal: number;
    public IDCuota: number;
    public EstadoContrato: number;
    public EstadoContratoDesc: string;
    public MesEmision: string;
    public SerieFacturacion: number;
    public CodigoSucursal: string;
    public CodigoProducto: string;
    public ValorCouta: number;
    public ValorServiciosAdicionales: number;
    public ValorGastosAdministrativos: number;
    public ValorTarjeta: number;
    public ValorSeguroCampesino: number;
    public NumeroContrato: number;
}

class FacturacionFilter {
    public Brokers: Array<number>;
    public lstProductos: Array<String>;
    public fechaDesde: Date;
    public fechaHasta: Date;
    public region: string;
    public RazonSocial: string;
    public Identificacion: string;
    public NumContrato: number;
    public NumSucursal: number;
    public Sucursales: Array<number>;
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

function post$CorredoresAutorizacionController$ConsultaAutorizaciones(filtro: PreautorizacionesFilter, callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}

class PreautorizacionesFilter {
    public productos: Array<String>;
    public empresa: string;
    public fechaInicio: Date;
    public fechaFin: Date;
    public IdBroker: Array<number>;
    public identificacion: string;
    public numContrato: number;
    public numSucursal: number;
    public Sucursales: Array<number>;
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
    Callback({ }, arguments, callDone, callFail);
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
function get$usuario$CorredoresObtenerUsuariosPorCorredorList(idBroker: number, callDone, CallFail) {
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

function post$contrato$ConsultarContratosPorFiltro(filtro: ContratoEntityFilter, callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}
function post$contrato$ConsultarContratosPorFiltroAfiliadoGeneral(filtro: ContratoEntityFilter, callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}

class ContratoEntityFilter
{
    public NumeroContrato: number;
    public NumeroCedula: string;
    public NombrePersona: string;
    public RUCEmpresa: string;
    public RazonSocial: string;
    public NumeroEmpresa: string;
    public NumeroSucursal: string;
    public CodigoPlan: string;
    public Brokers: Array<number>;
    public lstProductos: Array<string>;
    public SoloActivos: boolean;
}

class ContratoEntityList
{
    public CodigoContrato?: number;
    public CodigoRegion: string;
    public CodigoProducto: string;
    public CodigoBanco: number;
    public ContratoCodigoEstado: number;
    public CodigoMotivoAnulacion: number;
    public CodigoSucursal: number;
    public NumeroContrato?: number;
    public CodigoPlan: string;
    public EstadoContrato: string;
    public FechaInicio: string;
    public FechaInicioDate?: Date;
    public FechaFin: string;
    public FechaFinDate?:Date;
    public FechaFinOriginal?: Date;
    public FechaVigencia: string;
    public FechaVigenciaDate?: Date;
    public EsMoroso?: boolean;
    public MontoMora: number;
    public NumeroCuenta: string;
    public Cedula: string;
    public NumeroPersona?: number;
    public NombresApellidos: string;
    public EmailTrabajo: string;
    public EmailDomicilio: string;
    public RazonSocial: string;
    public NumeroEmpresa: string;
    public Sucursal: string;
    public RucEmpresa: string;
    public TipoSociedad: string;
    public GrupoEmpresa: string;
    public CiudadEmpresa: string;
    public NumeroSucursal: string;
    public SucursalBloqueada: boolean;
    public NumeroPersonaReclamo?: number;
    public NivelReferencia?:number;
    public Observaciones: string;
    public CeroTramites: string;
    public Transicion?: boolean;
    public Garantia?: boolean;
    public Deducible?: boolean;
    public Direccion: string;
    public Telefonos: string;
    public Ciudad: string;
    public VersionPlan: number;
    public CarenciasAmbulatorias?: number;
    public OdasDisponibles?: number;
    public OdasConsumidas?: number;
    public PeriodoPago?: number;
    public Usuario: string;
    public TipoUsuario: string;
    public GarantiaText: string;
    public TelefonosTrabajo: string;

    public DireccionPe: string;
    public PagoInteligente: boolean;
    public NumeroCuentaCredito: string;
    public TipoCuentaCredito: number;
    public Celular: string;
    public EnvioPi: number;
    public NombreBancoPI: string;

    public FormaPago: number;
    public TipoCuenta: number;
    public FacturarRuc: string;
    public FacturarCedula: string;
    public NombreDuenioCuenta: string;
    public FechaFinTarjeta: string;
    public FechaFinTarjetaDate?: Date;
    public FacturarPasaporte: string;
    public CodigoBancoCredito: number;

    public CodigoDescuento: number;
    public AFavor?: number;
    public NumeroCuota: number;
    public NombrePlan: string;

    public TitularBeneficios: boolean;
    public TarjetasAdicionales?: number;
    public CobrandoTarjetasAdicionales: boolean;
    public ValorTarjetasAdicionales: number;

        //MODIFICA BENEFICAIRIO
    public PrecioBase: number;

    //FACTURACION MANUAL
    public CobradoGastoAdministrativo: boolean;
    public MontoGastosAdministrativos: number;
    public ValorRenovacion: number;

    public Nombres: string;
    public Apellidos: string;

        //Cobranzas 
    public DomicilioCalle: string;
    public TrabajoCalle: string;
    public CalleCorrespondencia: string;
    public DomicilioTelefono1: string;
    public DomicilioTelefono2: string;
    //Agente
    public EjecutivoCuenta: string;
    public CodigoAgenteVenta: number;

        // Datos Personales 
    public Antiguedad: number;
    public AntiguedadDesc: string;
    public FechaNacimientoDate?: Date;
    public FechaNacimientoDesc: string;
    public Edad: number;
    public EdadDesc: string;
    public EstadoCivil: string;

    public FechaVigenciaDateDesc: string;
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

function get$contrato$ObtenerBeneficiariosIndividuales(NumContrato:number, callDone, callFail) {
    Callback({ "NumContrato": NumContrato }, arguments, callDone, callFail);
}


class BeneficiarioEntity {
    public NombreBeneficiario: string;
    public CodigoRelacion: number;
    public RelacionDesc: string;
    public Estado: number;
    public EstadoDesc: string;
    public FechaInclusion?: Date;
    public FechaIncl: string;
    public FechaExclusion?: Date;
    public FechaExcl: string;
    public PrecioBeneficiario: number;
    public PrecioServicios: number;
    public Plan: string;
    public NumeroPersona: number;
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

function get$contrato$ConsultarDetalleCuotasXContrato(NumContrato: number, callDone, callFail) {
    Callback({ "NumContrato": NumContrato }, arguments, callDone, callFail);
}

class DetalleFormaPagoEntity {
    public FacturarCedula: string;
    public FacturarRUC: string;
    public FacturarPasaporte: string;
    public BancoTarjeta: string;
    public TipoCuenta: number;
    public TipoCuentaDesc: string;
    public NumCuentaDebito: string;
    public FormaPago: number;
    public FormaPagoDesc: string;
    public CodPeriodoPago: number;
    public PeriodoPago: string;
    public FechaFinTarjeta?: Date;
    public NombreDuenioCuenta: string;
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
function get$facturacion$ConsultarFacturacionIndividualXCliente(NumeroContrato: number, NumeroFactura: string, fechaDesde: Date, fechaHasta: Date, callDone, callFail) {
    Callback({ "NumeroContrato": NumeroContrato, "NumeroFactura": NumeroFactura, "fechaDesde": getInternationalFomat(fechaDesde), "fechaHasta": getInternationalFomat(fechaHasta), "CodigoEstado": 0}, arguments, callDone, callFail);
}



function post$liquidacion$ObtenerLiquidacionesIndividuales(filtro: ReclamoFilter , callDone, callFail) {
    Callback(JSON.stringify(filtro), arguments, callDone, callFail);
}

class ReclamoFilter {
    public Contrato: number;
    public NumeroReclamo: string;
    public NumeroSobre: string;
    public Beneficiario: Array<number>;
    public FechaInicio: Date;
    public FechaFin: Date;
}

class LiquidacionIndividual {
    public Contrato: string;
    public CodigoContrato: number;
    public Reclamo: string;
    public Alcance: string;
    public ReclamoAlcance: string;
    public NombreBeneficiario: string;
    public Tipo: string;
    public Diagnostico: string;
    public FechaAtencion: Date;
    public FechaAtencionDesc: string;
    public Estado: string;
    public EstadoDesc: string;
    public FormaPago: string;
    public FormaPagoHospitalizacion: string;
    public MontoCubierto: number;
    public MontoNoCubierto: number;
    public MontoDeducible: number;
    public MontoCopago: number;
    public MontoBonificado: number;
    public MontoPagado: number;
    public MontoDebito: number;
    public Parentesco: string;
    public Sobre: string;
    public NumeroPersona: number;
    public OficinaLiquidacion: number;
    public LugarDeAtencion: string;
    public NombreTipoReclamo: string;
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
function post$Qpra$CorredoresObtenerContratoQpra(filtroC: FilterQpra, callDone, callFail) {
    Callback(JSON.stringify(filtroC), arguments, callDone, callFail);
}

class QpraEntity {
    public Num_Solicitud?: number;
    public Contrato_Numero: number;
    public Id_DetalleArchivo: string;
    public Reclamante_Identificacion: string;
    public Reclamante_Nombre: string;
    public Reclamante_Numero_Persona?: number;
    public Titular_Identificacion: string;
    public Titular_Nombre: string;
    public Titular_Numero_Persona: number;
    public Contrato_Region: string;
    public Contrato_Codigo_Producto: string;
    public Contrato_Codigo_Plan: string;
    public Contrato_Empresa_Numero: number;
    public Contrato_Sucursal_Numero: number;
    public Contrato_Fecha_Suscripcion: Date;
    public Contrato_Fecha_Fin: Date;
    public Contrato_Estado: string;
    public Area_Registro_Descripcion: string;
    public Area_Gestion_Descripcion: string;
    public Fecha_Inicio_Solicitud: Date;
    public Fecha_Fin_Solicitud: Date;
    public Accion_Usuario: string;
    public Descripcion_Caso: string;
    public Descripcion_Gestion: string;
    public Descripcion_Respuesta :string;
    public Tipo_Tramite_Descripcion: string;
    public Motivo: string;
    public Relacion: string;
 }
class FilterQpra {
    public Contrato_Numero:number;
    public  beneficiarios:Array<number>;
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
function get$Qpra$CorredoresObtenerArchivoQpra(filtro: string , callDone, callFail) {
    Callback({ "filtro": filtro }, arguments, callDone, callFail);
}

class QpraArchivo {
    public Extension: string;
    public Archivo: string;
    public Nombre: string;
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
function get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaPorRuc(Ruc: string, callDone, callFail) {
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
function get$usuario$CorredoresResetearClaveCorredores(IDCorredor: number, UserName:string, callDone, callFail) {
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

function post$contrato$ConsultarContratosIndividualesPorAgente(filtroC: ContratoEntityFilter, callDone, callFail) {
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

function post$contrato$ConsultarContratosCorpPorAgente(filtroC: ContratosIndividualesEmpresasPorAgenteFilter, callDone, callFail) {
    Callback(JSON.stringify(filtroC), arguments, callDone, callFail);
}

function post$contrato$getOneByKey(filtro: FiltroSiniestralidadActual, callDone, callFail) {
    Callback4(AddresServicioSiniestralidadAfiliado, JSON.stringify(filtro), {}, arguments, callDone, callFail);
}

class FiltroSiniestralidadActual{
    CodigoContrato: number;
    CodigoRegion: string;
    CodigoProducto: string;  
    NumeroPersona: number;
    NumeroContrato: number;
}
class SiniestralidadAcumulada {
    CodigoContrato: number;
    CodigoRegion: string;
    CodigoProducto: string;
    NumeroContrato: number;
    CodigoPlan: string;
    FechaDigitacion: string;
    VersionPlan: number;
    NombrePlan: string;
    EstadoContrato: string;
    NivelReferencia: number;
    FechaInicio: string;
    FechaFin: string;
    EsMoroso: boolean;
    MontoMora: number;
    TitularBeneficio: boolean;
    MotivoAnulacion: string;
    Sucursal: string;
    AgenteVenta: string;
    AgenteContacto: number;
    EjecutivoCuenta: string;
    Observaciones: string;
    FacturarCedula: number;
    FacturarRUC: string;
    FacturarPasaporte: string;
    BancoTarjeta: string;
    TipoCuenta: string;
    NumeroCuenta: number;
    FormaPago: string;
    PeriodoPago: string;
    SaldoFavor: number;
    FechaFinTarjeta: string;
    NombreDuennoCuenta: string;
    TipoDocumento: string;
    NumeroDocumento: number;
    Nombres: string;
    Apellidos: string;
    FechaNacimiento: string;
    Edad: number;
    Genero: string;
    EstadoCivil: string;
    Ecuatoriano: boolean;
    Direccion: string;
    Telefonos: string;
    Ciudad: string;
    Barrio: string;
    Zona: string;
    Email: string;
    Empresa: string;
    TelefonoEmpresa: string;
    TotalFacturado: number;
    TotalBonificado: number;
    TotalGastoAdministrativo: number;
    PorcentajeSiniestralidad: number;
    FechaInicioSiniestalidad: string;
    FechaFinSiniestalidad: string;
    TotalFacturadoVigente: number;
    TotalBonificadoVigente: number;
    TotalGastoAdministrativoVigente: number;
    PorcentajeSiniestralidadVigente: number;
    PersonaNumero: number;
    CalleCorrespondencia: string;
    NumeroCuota: number;
    NumeroEmpresa: number;
    SucursalEmpresa: number;
    CodigoBanco: number;
    NumeroLista: string;
    EsCuentaBloqueada: boolean;
    CodigoVendedor: string;
    CodigoDirector: number;
    ComisionVenta: number;
    ComisionRenovacion: number;
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

function post$CorredoresAgenteVenta$ConsultarEmpresasPorAgente(filtroC: ContratoEntityFilter, callDone, callFail) {
    Callback(JSON.stringify(filtroC), arguments, callDone, callFail);
}


function get$masivo$ObtenerRegistrosCargaPorEmpresa(IDEmpresa: number, callDone, callFail) {
    Callback4(AddresServicioEstadisticaContratante, '', { "IDEmpresa": IDEmpresa }, arguments, callDone, callFail);
}
class registroEstadistica {

    public IdRegistro: number;
    public IdArchivo: number;
    public IdEmpresa: number;
    public IdUsuario: number;
    public TipoDocumento: number;
    public TipoMovimiento: number;
    public Estado: number;
    public FechaCreacion: Date;
    public NumeroDocumento: string;
    public Nombres: string;
    public Apellidos: string;
    public Email: string;
    public NombreProducto: string;
    public IdProducto: string;
    public IdCobertura: string;
    public Observaciones: string;
    public Datos: string;
    public Resultado: string;
    public RC_Celular: string;
    public RC_CondicionCedulado: number;
    public RC_EmailPersonal: string;
    public RC_EmailTrabajo: string;
    public RC_EstadoCivil: number;
    public RC_FechaNacimiento: Date;
    public RC_Genero: number;
    public RC_TelefonoDomicilio: string;
    public RC_TelefonoTrabajo: string;
    public CompletadoEnrolamiento: boolean;
    public BloqueadoServicio: boolean;
}


function get$masivo$ObtenerConsolidadoRegistrosCarga(IDEmpresa: number, callDone, callFail) {
    Callback4(AddresServicioEstadisticaContratante, '', { "IDEmpresa": IDEmpresa }, arguments, callDone, callFail);
}

class ResumenConsolidadoRegistrosCarga {
    public TotalCompletaronEnrolamiento: number;
    public TotalNoCompletaronEnrolamiento: number;
}


function post$facturacion$ConsultarFacturacionPendienteAfiliado(filtroC: ConsultaFacturacionFilter, callDone, callFail) {
    Callback(JSON.stringify(filtroC), arguments, callDone, callFail);
}

class ConsultaFacturacionFilter {
    public Brokers: number;
    public lstProductos: Array<string>;
    public fechaDesde: Date;
    public fechaHasta: Date;
    public region: string
    public RazonSocial: string;
    public Identificacion: string;
    public NumContrato:number;
    public NumSucursal: number;
}

function post$facturacion$ConsultarFacturacionPendienteEmpresa(filtroC: ConsultaFacturacionFilter, callDone, callFail) {
    Callback(JSON.stringify(filtroC), arguments, callDone, callFail);
}