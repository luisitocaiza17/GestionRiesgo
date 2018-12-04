using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using Saludsa.LogicaNegocio.PortalCorredores;

namespace BatchResumenEjecutivo
{
    class Program
    {
        static void Main(string[] args)
        {
            /// Este batch debería correr una vez al día
            /// Llamará a consultas en progress y AX para consolidar la información del día
            /// La idea es almacenar en una tabla el resultado de estas consultas, y que quede el histórico diario
            /// de esta tabla se presentará la información en la pantalla de resumen ejecutivo más rápidamente, y tendrá capacidad de hacerlo hacia años anteriores
            /// 

            /// 1. Lista de brokers
            /// Iteras
            /// 2. casillero por casillero
            ///     si se trata de AX, se crea un EF propio
            ///     si se trata de SQL nuestro, se crea otro EF propio
            ///     si se trata de Progress, invocamos servicios Rest desde Servicios salud (para consultar servicios salud necesitamos crear un token de conexión de seguridad)
            /// 3. consumir el servicio web de tokens (ya está hecho, Chris puso esto en otra solución).
            /// 


            // Llamada directa a la dll de lógica
            try
            {
                //var data = ResumenEjecutivo.ResumenEjecutivoTraerValoresAgente(idBroker, producto, fecha, fechaFin);
                //var data = ResumenEjecutivo.ResumenEjecutivoTraerValoresAgente(3378, "IND", new DateTime(DateTime.Now.Year, 1, 1), DateTime.Now);
                //var prueba = Saludsa.Contratos.LogicaNegocio.Contratos.ConsultarEmpresasPorAgente(3378, "", "", "", "570756008", "");
                DateTime FechaHoy = DateTime.Now.Date;
                List<string> lstProdsIndividuales = new List<string>();
                lstProdsIndividuales.Add("ONC");
                //lstProdsIndividuales.Add("CPO");
                //lstProdsIndividuales.Add("DEN");
                //lstProdsIndividuales.Add("EXE");
                //lstProdsIndividuales.Add("TRA");

                // Obtener la data desde la BD de progress
                List<PC_ResumenEjecutivo> lstResumen = new List<PC_ResumenEjecutivo>();
                var lstBrokers = ResumenEjecutivo.ConsultarResumenEjecutivoDiario();
                foreach (var item in lstBrokers)
                {
                    if (lstProdsIndividuales.Contains(item.CodProducto))
                        item.CodProducto = "IND";

                    if(lstResumen.Count(x => x.FechaConsulta == FechaHoy && x.AgenteVentaId == item.AgenteVentaID
                        && x.Producto == item.CodProducto && x.Region == item.Region) == 0)
                    {
                        PC_ResumenEjecutivo rec = new PC_ResumenEjecutivo();
                        rec.AgenteVentaId = item.AgenteVentaID;
                        rec.Anulados = item.NumAnulados;
                        rec.ClientesActivos = item.NumActivos;
                        rec.ClientesMora = item.NumClientesMora;
                        rec.FechaConsulta = DateTime.Now.Date;
                        rec.FechaCreación = DateTime.Now;
                        rec.Producto = item.CodProducto;
                        rec.Region = item.Region;
                        rec.Valor = Convert.ToDecimal(item.Valor);

                        lstResumen.Add(rec);
                    }
                    else
                    {
                        var data = lstResumen.FirstOrDefault(x => x.FechaConsulta == FechaHoy && x.AgenteVentaId == item.AgenteVentaID
                                    && x.Producto == item.CodProducto && x.Region == item.Region);
                        data.Anulados += item.NumAnulados;
                        data.ClientesActivos += item.NumActivos;
                        data.ClientesMora += item.NumClientesMora;
                        data.Valor += Convert.ToDecimal(item.Valor);
                        data.FechaCreación = DateTime.Now;
                    }
                }

                // Grabar en SQL Server
                Salud_CorredoresEntities model = new Salud_CorredoresEntities();
                foreach (var item in lstResumen)
                    model.PC_ResumenEjecutivo.Add(item);
                model.SaveChanges();
            }
            catch (Exception ex)
            {
                throw;
                //SW.Common.ExceptionManager.ReportException(ex, SW.Common.ExceptionManager.ExceptionSources.Server);
            }




            //var respToLog = "";
            //var token = TokenSeguridad.GenerarToken();
            //try
            //{

            //    var address = ConfigurationManager.AppSettings[""]; // configuración de la ruta al servicio
            //    address = ""; // TODO ruta al servicio si es get, paramatros, post en body
            //    var client = new RestClient(address);
            //    var request = new RestRequest(Method.GET);
            //    request.AddHeader("Content-Type", "application/json");
            //    request.AddHeader("Authorization", "bearer " + token.access_token);
            //    request.AddHeader("CodigoAplicacion", "3");
            //    request.AddHeader("DispositivoNavegador", "Chrome");
            //    request.AddHeader("DireccionIP", "1.1.1.1");
            //    request.AddHeader("SistemaOperativo", "Windows");
            //    request.AddHeader("CodigoPlataforma", "7");
            //    request.OnBeforeDeserialization = resp => { resp.ContentType = "application/json"; };

            //    IRestResponse response = client.Execute(request);
            //    respToLog = response.Content;
            //    var respuesta = new JavaScriptSerializer().Deserialize<object>(response.Content);

            //}
            //catch (Exception ex)
            //{
            //    SW.Common.ExceptionManager.ReportException(ex, SW.Common.ExceptionManager.ExceptionSources.Server);
            //}
        }
    }
}
