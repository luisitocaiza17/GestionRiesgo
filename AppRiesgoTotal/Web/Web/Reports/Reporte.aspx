<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Reporte.aspx.cs" Inherits="Web.Reports.Reporte" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=15.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Reportes</title>
</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="manager" runat="server"></asp:ScriptManager>
        <div>
            <rsweb:ReportViewer ID="ReportViewer1" runat="server" ProcessingMode="Local" Width="100%" Visible="false">
            </rsweb:ReportViewer>
            <asp:HiddenField ID="hdn_Data" runat="server" />
            <asp:ImageButton ID="btn_Cargar" runat="server" ImageUrl="~/images/spacer.gif" OnClick="btn_Cargar_click" />
        </div>
    </form>
</body>
</html>
