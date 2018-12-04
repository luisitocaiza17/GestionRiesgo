using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Reports
{
    public class ParametrosReporte
    {
        public string NombreReporte { get; set; }
        public string CodigosListas { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFin { get; set; }
        public string Identificacion { get; set; }
        public string Estados { get; set; }
    }



    //class ParametrosReporte
    //{
    //    public CodigosListas: string; // enviaría una lista separada por comas de los códigos de lista (pueden venir de varias empresas)
    //    public FechaInicio: Date; // rango de fechas del reporte (inicio)
    //    public FechaFin: Date; // rango de fechas del reporte (inicio)
    //    public Identificacion: string; // para filtrar por identificación
    //    public Estados: string; // para los reportes que requieren filtro por estados (irìan los estaos separados por comas cuando sean varios)
    //}
}