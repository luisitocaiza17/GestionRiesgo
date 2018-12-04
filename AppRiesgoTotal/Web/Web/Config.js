/// <reference path="Scripts/typings/kendo-ui/kendo-ui.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="Scripts/Init.ts" />
var AddressServicioPasarela = 'http://localhost:5150/api/';
var AddressServicioUsuarioCorporativo = 'http://localhost:49935/api/';
var AddressServicioAutorizacion = 'http://pruebas.servicios.saludsa.com.ec/ServicioAutorizacion/oauth2/token';
//compila
var SessionTimeOut = 20; // Tiempo de sesión en minutos
var OAuthusername = 'UsrServiciosSalud';
var OAuthpassword = 'UsrS3rv1c1os';
var OAuthclientid = '8a3e4d10b2b24d6b9c55c88a95fdc324';
var EncryptionPassword = 'QzPtMAJ7Mz5exBzGqHCGkUqQ6aKURpW3rWAYXzju4FNXmFVuPS5d64qt8fCMEDqNK5fQyThxCZq6yVH4kNQascwjVRC3stRzs3V7zdLVYH8296P6BsYLPMPh3mf6qR4u';
// Rutas reportes
// Reporte Reclamos
var AddressServicioLiquidacion = 'http://pruebas.servicios.saludsa.com.ec/ServicioLiquidacion/api/';
// Reporte Facturación
var AddressServicioEmpresas = 'http://pruebas.servicios.saludsa.com.ec/ServicioEmpresas/api/facturacion/';
// Reporte Movimientos
var AddressServicioContratos = 'http://pruebas.servicios.saludsa.com.ec/ServicioContratos/api/contrato/';
// Reporte Siniestralidad
var AddressServicioSiniestralidad = 'http://pruebas.servicios.saludsa.com.ec/ServicioEmpresas/api/Siniestralidad/';
// Reporte Copago Autorizaciones
var AddressServicioCopagoAutorizacion = 'http://localhost:49935/api/CorredoresAutorizacionController/';
// Reporte Reclamos
var AddressServicioReclamos = 'http://pruebas.servicios.saludsa.com.ec/ServicioArmonix/api/reclamos/';
//Reporte de descarga Pre-Autorizaciones
var AddresServicioDescargaPreAutorizaciones = 'http://pruebas.servicios.saludsa.com.ec/ServicioArmonix/api/autorizacion/getLetter/';
//Detalle de Siniestralidad  Afiliado
var AddresServicioSiniestralidadAfiliado = 'http://pruebas.servicios.saludsa.com.ec/ServicioArmonix/api/contratos/';
//Servicio WebApi Broker
var AddresServicioEstadisticaContratante = 'http://pruebas.servicios.saludsa.com.ec/ServicioEmpresas/api/masivo/';
//# sourceMappingURL=Config.js.map