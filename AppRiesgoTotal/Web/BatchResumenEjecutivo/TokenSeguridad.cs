using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace BatchResumenEjecutivo
{
    public class TokenSeguridad
    {
        public static TokenInfo GenerarToken()
        {
            string SeguridadesUsername = ConfigurationManager.AppSettings["SeguridadesUsername"];
            string SeguridadesPassword = ConfigurationManager.AppSettings["SeguridadesPassword"];
            string SeguridadesGrantType = ConfigurationManager.AppSettings["SeguridadesGrantType"];
            string SeguridadesClientID = ConfigurationManager.AppSettings["SeguridadesClientID"];
            string address_token = ConfigurationManager.AppSettings["AddressToken"];


            // GENERACION REPORTE FACTURACIÓN
            // Obtener un token
            var respToLog = " ";
            var data = "username=" + SeguridadesUsername + "&password=" + SeguridadesPassword + "&grant_type=" + SeguridadesGrantType + "&client_id=" + SeguridadesClientID + "";

            //Generacion del cliente a ejecutarse
            var client_token = new RestClient(address_token);

            var request_token = new RestRequest(Method.POST);
            request_token.AddHeader("Content-Type", "application/json");
            request_token.AddHeader("CodigoAplicacion", "1");
            request_token.AddHeader("DispositivoNavegador", "Chrome");
            request_token.AddHeader("DireccionIP", "1.1.1.1");
            request_token.AddHeader("SistemaOperativo", "Windows");
            request_token.AddHeader("CodigoPlataforma", "1");
            request_token.AddParameter("data", data, ParameterType.RequestBody);
            request_token.OnBeforeDeserialization = resp => { resp.ContentType = "application/json"; };

            IRestResponse response_token = client_token.Execute(request_token);
            respToLog = response_token.Content;
            var respuesta_token = new JavaScriptSerializer().Deserialize<TokenInfo>(response_token.Content);
            return respuesta_token;
        }
    }

    public class TokenInfo
    {
        public string access_token { get; set; }
        public int expires_in { get; set; }
        public string refresh_token { get; set; }
        public string token_type { get; set; }
        public string user_data { get; set; }
        public string error { get; set; }
        public string error_description { get; set; }
        public int token_retrieve { get; set; }
    }
}
