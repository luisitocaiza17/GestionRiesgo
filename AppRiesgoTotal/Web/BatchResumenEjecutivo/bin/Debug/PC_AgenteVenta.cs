//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BatchResumenEjecutivo
{
    using System;
    using System.Collections.Generic;
    
    public partial class PC_AgenteVenta
    {
        public int codigo_agente_venta { get; set; }
        public string codigo_vendedor { get; set; }
        public Nullable<int> persona_numero { get; set; }
        public Nullable<int> empresa_numero { get; set; }
        public Nullable<int> codigo_sucursal { get; set; }
        public string tipo_agente_venta { get; set; }
        public Nullable<int> codigo_director { get; set; }
        public Nullable<int> numero_vendedores { get; set; }
        public Nullable<System.DateTime> fecha_ingreso_agente { get; set; }
        public Nullable<System.DateTime> fecha_salida_agente { get; set; }
        public string region { get; set; }
        public Nullable<int> codigo_grupo { get; set; }
        public string nombre_agente_venta { get; set; }
        public string grupo_venta { get; set; }
        public decimal porcentaje_comision { get; set; }
        public string numero_cuenta_contable { get; set; }
        public Nullable<int> estado_agente_venta { get; set; }
        public Nullable<decimal> comision_renov { get; set; }
        public Nullable<int> estado { get; set; }
        public Nullable<System.DateTime> fecha_modificacion { get; set; }
        public string digitador_modificacion { get; set; }
        public string hora_creacion { get; set; }
        public string hora_modificacion { get; set; }
        public string prog_modificacion { get; set; }
        public Nullable<System.DateTime> fecha_creacion { get; set; }
        public string digitador_creacion { get; set; }
        public string prog_creacion { get; set; }
        public Nullable<System.DateTime> fecha_anulacion { get; set; }
        public string digitador_anulacion { get; set; }
        public string hora_anulacion { get; set; }
        public string razon_social_broker { get; set; }
        public string ruc_broker { get; set; }
        public string prog_anulacion { get; set; }
        public string usuarioweb { get; set; }
        public string claveweb { get; set; }
        public string email_broker { get; set; }
        public Nullable<int> tipo_contribuyente { get; set; }
        public Nullable<int> nivel { get; set; }
        public Nullable<int> codigo_tipo { get; set; }
        public Nullable<bool> imprime_documento { get; set; }
        public Nullable<bool> permiso { get; set; }
        public string us_login { get; set; }
        public Nullable<bool> aplica_poo { get; set; }
        public Nullable<bool> aplica_cor { get; set; }
        public Nullable<bool> aplica_ind { get; set; }
        public string active_directory_user { get; set; }
        public string renovacion_email_broker { get; set; }
        public string representante_legal { get; set; }
        public string contacto_nombre { get; set; }
        public byte[] contratoAgenciamiento { get; set; }
        public string comunicacionesEmail { get; set; }
        public Nullable<int> codigo_grupo_agentes { get; set; }
    }
}
