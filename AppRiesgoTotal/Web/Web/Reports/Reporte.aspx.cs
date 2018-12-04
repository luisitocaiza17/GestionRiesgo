using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Web.Reports
{
    public partial class Reporte : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request["p"] == null)
                Response.Redirect("Vacio.html");

        }
        protected void btn_Cargar_click(object sender, EventArgs args)
        {

            string p = Request["p"];

            string serializado = System.Text.Encoding.Default.GetString(Convert.FromBase64String(p));
            ParametrosReporte pars = Newtonsoft.Json.JsonConvert.DeserializeObject<ParametrosReporte>(serializado);

            // Consulta al servicio los datos
            switch (pars.NombreReporte)
            {
                
                case "ReporteReclamos":

                    //string dataReclamos ="[{\"Numeroreclamo\":1, \"NumeroAlcance\": 2, \"Plan\": \"Primero\"}, {\"Numeroreclamo\":4, \"NumeroAlcance\": 6, \"Plan\": \"Segundo\"}]";
                    string dataReclamos = hdn_Data.Value;
                    var dtReclamos = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.ReclamoEmpresaListaDataTable>(dataReclamos);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtReclamos));

                    List<ReportParameter> rparsReclamos = new List<ReportParameter>();
                    rparsReclamos.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsReclamos.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    string empresas = "";
                    
                    ReportViewer1.LocalReport.SetParameters(rparsReclamos);

                    break;
                case "ReporteCopagos":
                    //string dataReclamos ="[{\"Numeroreclamo\":1, \"NumeroAlcance\": 2, \"Plan\": \"Primero\"}, {\"Numeroreclamo\":4, \"NumeroAlcance\": 6, \"Plan\": \"Segundo\"}]";
                    string dataCopago = hdn_Data.Value;
                    var dtCopago = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.CopagoPendienteDataTable>(dataCopago);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtCopago));

                    List<ReportParameter> rparsCopago = new List<ReportParameter>();
                    rparsCopago.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsCopago.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsCopago);

                    break;
                case "ReporteFacturacion":
                    //string dataReclamos ="[{\"Numeroreclamo\":1, \"NumeroAlcance\": 2, \"Plan\": \"Primero\"}, {\"Numeroreclamo\":4, \"NumeroAlcance\": 6, \"Plan\": \"Segundo\"}]";
                    string dataFacturacion = hdn_Data.Value;
                    var dtFacturacion = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.FacturaEmpresaDataTable>(dataFacturacion);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtFacturacion));

                    List<ReportParameter> rparsFacturacion = new List<ReportParameter>();
                    rparsFacturacion.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsFacturacion.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsFacturacion);

                    break;
                case "ReporteMovimientos":
                    //string dataReclamos ="[{\"Numeroreclamo\":1, \"NumeroAlcance\": 2, \"Plan\": \"Primero\"}, {\"Numeroreclamo\":4, \"NumeroAlcance\": 6, \"Plan\": \"Segundo\"}]";
                    string dataMovimientos = hdn_Data.Value;
                    var dtMovimientos = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.MovimientoBeneficiarioEmpresaDataTable>(dataMovimientos);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtMovimientos));

                    List<ReportParameter> rparsMovimientos = new List<ReportParameter>();
                    rparsMovimientos.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsMovimientos.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsMovimientos);

                    break;
                case "ReportePreAutorizaciones":
                    //string dataReclamos ="[{\"Numeroreclamo\":1, \"NumeroAlcance\": 2, \"Plan\": \"Primero\"}, {\"Numeroreclamo\":4, \"NumeroAlcance\": 6, \"Plan\": \"Segundo\"}]";
                    string dataPreautorizaciones = hdn_Data.Value;
                    var dtPreautorizaciones = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.AutorizacionesCubiertasDataTable>(dataPreautorizaciones);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtPreautorizaciones));

                    List<ReportParameter> rparsPreautorizaciones = new List<ReportParameter>();
                    rparsPreautorizaciones.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsPreautorizaciones.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsPreautorizaciones);

                    break;
                case "ReportePreAutorizacionesGeneral":
                    //string dataReclamos ="[{\"Numeroreclamo\":1, \"NumeroAlcance\": 2, \"Plan\": \"Primero\"}, {\"Numeroreclamo\":4, \"NumeroAlcance\": 6, \"Plan\": \"Segundo\"}]";
                    string dataPreautorizaciones2 = hdn_Data.Value;
                    var dtPreautorizaciones2 = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.AutorizacionesCubiertasDataTable>(dataPreautorizaciones2);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtPreautorizaciones2));

                    List<ReportParameter> rparsPreautorizaciones2 = new List<ReportParameter>();
                    rparsPreautorizaciones2.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsPreautorizaciones2.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsPreautorizaciones2);

                    break;

                    
                case "ReporteSiniestralidad":
                    //string dataReclamos ="[{\"Numeroreclamo\":1, \"NumeroAlcance\": 2, \"Plan\": \"Primero\"}, {\"Numeroreclamo\":4, \"NumeroAlcance\": 6, \"Plan\": \"Segundo\"}]";
                    string dataSinistralidad = hdn_Data.Value;
                    var dtSinistralidad = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.SiniestralidadListaDataTable>(dataSinistralidad);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtSinistralidad));

                    List<ReportParameter> rparsSinistralidad = new List<ReportParameter>();
                    rparsSinistralidad.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsSinistralidad.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsSinistralidad);

                    break;
                case "ReporteSiniestralidadMensualizada":
                    //string dataReclamos ="[{\"Numeroreclamo\":1, \"NumeroAlcance\": 2, \"Plan\": \"Primero\"}, {\"Numeroreclamo\":4, \"NumeroAlcance\": 6, \"Plan\": \"Segundo\"}]";
                    string dataSinistralidadMensualizada = hdn_Data.Value;
                    var dtSinistralidadMensualizada = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.SiniestralidadListaDataTable>(dataSinistralidadMensualizada);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtSinistralidadMensualizada));

                    List<ReportParameter> rparsSinistralidadMensualizada = new List<ReportParameter>();
                    rparsSinistralidadMensualizada.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsSinistralidadMensualizada.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsSinistralidadMensualizada);
                    break;
                case "ReporteSiniestralidadReclamos":
                    //string dataReclamos ="[{\"Numeroreclamo\":1, \"NumeroAlcance\": 2, \"Plan\": \"Primero\"}, {\"Numeroreclamo\":4, \"NumeroAlcance\": 6, \"Plan\": \"Segundo\"}]";
                    string dataSiniestralidadReclamos = hdn_Data.Value;
                    var dtSiniestralidadReclamos = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.ReclamoEmpresaListaDataTable>(dataSiniestralidadReclamos);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtSiniestralidadReclamos));

                    List<ReportParameter> rparsSiniestralidadReclamos = new List<ReportParameter>();
                    rparsSiniestralidadReclamos.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsSiniestralidadReclamos.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsSiniestralidadReclamos);
                    break;
                case "ReporteSiniestralidadPrimas"://string dataReclamos ="[{\"Numeroreclamo\":1, \"NumeroAlcance\": 2, \"Plan\": \"Primero\"}, {\"Numeroreclamo\":4, \"NumeroAlcance\": 6, \"Plan\": \"Segundo\"}]";
                    string dataSiniestralidadPrimas = hdn_Data.Value;
                    var dtSiniestralidadPrimas = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.PrimasListaDataTable>(dataSiniestralidadPrimas);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtSiniestralidadPrimas));

                    List<ReportParameter> rparsSiniestralidadPrimas = new List<ReportParameter>();
                    rparsSiniestralidadPrimas.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsSiniestralidadPrimas.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsSiniestralidadPrimas);
                    break;
                case "ReporteSiniestralidadChar":
                    //string dataReclamos ="[{\"Numeroreclamo\":1, \"NumeroAlcance\": 2, \"Plan\": \"Primero\"}, {\"Numeroreclamo\":4, \"NumeroAlcance\": 6, \"Plan\": \"Segundo\"}]";
                    string dataSinistralidadMensualizadaChar = hdn_Data.Value;
                    var dtSinistralidadMensualizadaChar = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.SiniestralidadListaDataTable>(dataSinistralidadMensualizadaChar);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtSinistralidadMensualizadaChar));

                    List<ReportParameter> rparsSinistralidadMensualizadaChar = new List<ReportParameter>();
                    rparsSinistralidadMensualizadaChar.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsSinistralidadMensualizadaChar.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsSinistralidadMensualizadaChar);
                    break;
                case "ReporteSiniestralidadCostos":
                    string dataSiniestralidadCostos = hdn_Data.Value;
                    var dtSiniestralidadCostos = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.DistribucionCostoDataTable>(dataSiniestralidadCostos);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtSiniestralidadCostos));

                    List<ReportParameter> rparsSiniestralidadCostos = new List<ReportParameter>();
                    rparsSiniestralidadCostos.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsSiniestralidadCostos.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsSiniestralidadCostos);
                    break;
                case "ReporteSiniestralidadDiagnosticos":
                    string dataSiniestralidadDiagnostico = hdn_Data.Value;
                    var dtSiniestralidadDiagnosticos = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.DiagnosticoFrecuenteDataTable>(dataSiniestralidadDiagnostico);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtSiniestralidadDiagnosticos));

                    List<ReportParameter> rparsSiniestralidadDiagnosticos = new List<ReportParameter>();
                    rparsSiniestralidadDiagnosticos.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsSiniestralidadDiagnosticos.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsSiniestralidadDiagnosticos);
                    break;
                case "ReporteSiniestralidadPrestadores":
                    string dataSiniestralidadPrestadores = hdn_Data.Value;
                    var dtSiniestralidadPrestadores = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.PrestadorFrecuenteDataTable>(dataSiniestralidadPrestadores);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtSiniestralidadPrestadores));

                    List<ReportParameter> rparsSiniestralidadPrestadores = new List<ReportParameter>();
                    rparsSiniestralidadPrestadores.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsSiniestralidadPrestadores.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsSiniestralidadPrestadores);
                    break;
                case "ReporteSiniestralidadUsuarios":
                    string dataSiniestralidadUsuarios = hdn_Data.Value;
                    var dtSiniestralidadUsuarios = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.UsuarioFrecuenteDataTable>(dataSiniestralidadUsuarios);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtSiniestralidadUsuarios));

                    List<ReportParameter> rparsSiniestralidadUsuarios = new List<ReportParameter>();
                    rparsSiniestralidadUsuarios.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsSiniestralidadUsuarios.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsSiniestralidadUsuarios);
                    break;
                case "ReporteSiniestralidadBeneficiarios":
                    string dataSiniestralidadBeneficiarios = hdn_Data.Value;
                    var dtSiniestralidadBeneficiarios = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.BeneficiariosListaDataTable>(dataSiniestralidadBeneficiarios);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtSiniestralidadBeneficiarios));

                    List<ReportParameter> rparsSiniestralidadBeneficiarios = new List<ReportParameter>();
                    rparsSiniestralidadBeneficiarios.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsSiniestralidadBeneficiarios.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsSiniestralidadBeneficiarios);
                    break;

                case "ReporteFacturacionGeneral":

                    //string dataReclamos ="[{\"Numeroreclamo\":1, \"NumeroAlcance\": 2, \"Plan\": \"Primero\"}, {\"Numeroreclamo\":4, \"NumeroAlcance\": 6, \"Plan\": \"Segundo\"}]";
                    string dataFacturas = hdn_Data.Value;
                    var dtFacturas = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.ReclamoEmpresaListaDataTable>(dataFacturas);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtFacturas));

                    List<ReportParameter> rparsFacturasG = new List<ReportParameter>();
                    rparsFacturasG.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsFacturasG.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    
                    ReportViewer1.LocalReport.SetParameters(rparsFacturasG);

                    break;

                case "ReporteContrInd":
                    string dataIndv = hdn_Data.Value;
                    var dtIndv = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.ContratosIndDataTable>(dataIndv);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtIndv));
                    List<ReportParameter> rparsIndv = new List<ReportParameter>();
                    rparsIndv.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsIndv.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsIndv);
                    break;
                case "ReporteContrCorp":
                    string dataCorp = hdn_Data.Value;
                    var dtCorp = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportDataSet.ContratosCorpDataTable>(dataCorp);

                    //Envía los datos al reporte para su presentación

                    ReportViewer1.LocalReport.ReportPath = "Reports/" + pars.NombreReporte + ".rdlc";
                    ReportViewer1.LocalReport.DataSources.Clear();
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSet1", (DataTable)dtCorp));
                    List<ReportParameter> rparsCorp = new List<ReportParameter>();
                    rparsCorp.Add(new ReportParameter("FechaInicio", pars.FechaInicio.ToShortDateString())); //pars.FechaInicio.ToShortDateString()));
                    rparsCorp.Add(new ReportParameter("FechaFin", pars.FechaFin.ToShortDateString()));
                    ReportViewer1.LocalReport.SetParameters(rparsCorp);
                    break;
            }

            ReportViewer1.DataBind();
            ReportViewer1.Visible = true;
            // renderiza el reporte.


        }
        
        
    }

}