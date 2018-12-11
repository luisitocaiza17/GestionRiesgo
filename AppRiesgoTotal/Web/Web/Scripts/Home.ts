/// <reference path="../Scripts/Init.ts" />
var contadorElementos: number = 0;

head.ready(function () { 

    var UsuarioLogueado = UsuarioSesion();
    var vulnerabilidadesList: Array<VULNERABILIDADES>;
    var escalaDegradacionList: Array<ESCALA_DEGRADACION>;

    $('#btnAgregar').kendoButton();
    $('#btnContinuar').kendoButton();
    
    //cargamos las vulnerabilidades
    get$Vulnerabilidad$TraerVulnerabilidades(function (result: Msg) {
        if (result == undefined)
            return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
        if (result.Estado == 'False')
            return alert('No existen catalogos');
        vulnerabilidadesList = <Array<VULNERABILIDADES>>result.Datos;
    }, function (error: Msg) {
        
        });
    //cargamos la escala de degradacion
    get$EscalaDegradacion$TraerEscalaDegradacion(function (result: Msg) {
        if (result == undefined)
            return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
        if (result.Estado == 'False')
            return alert('No existen catalogos');
        escalaDegradacionList = <Array<ESCALA_DEGRADACION>>result.Datos;
    }, function (error: Msg) {

    });

    Loading_Hide();
    //continuamos a las operaciones
    $('#btnContinuar').click(function () {
        if (confirm('Desea continuar?'))
            $('#primeraSeccion').hide();

    });
    //Agregamos activos
    $('#btnAgregar').click(function () {
        $('#tableRiesgo').append(
            "<tr >" +
            "<td>" +
            "<input type='text' id='txtAmenaza_" + contadorElementos+"'>" +
            "</td>" +
            "<td>" +
            "<input type='text' id='txtVulnerabilidad_" + contadorElementos +"'>" +
            "</td>" +
            "<td>" +
            "<input type='text' id='txtDisponibilidad_" + contadorElementos +"'>" +
            "</td>" +
            "<td>" +
            "<input type='text' id='txtConfidencialidad_" + contadorElementos +"'>" +
            "</td>" +
            "<td>" +
            "<input type='text' id='txtIntegridad_" + contadorElementos +"'>" +
            "</td>" +
            "<td>" +
            "<input type='text' id='txtCriticidad_" + contadorElementos +"'>" +
            "</td>" +
            "<td>" +
            "<input type='text' id='txtPromedioImpacto_" + contadorElementos +"'>" +
            "</td>" +
            "<td>" +
            "<button id='btnQuitar_" + contadorElementos + "'  onclick='quitar(this)'> Quitar </button>" +
            "</td>" +
            "</tr>");
        //boton de quitar
        $("#btnQuitar_" + contadorElementos).kendoButton();
        //cargamos el combo dinamicamente
        $("#txtVulnerabilidad_" + contadorElementos).kendoDropDownList({
            filter: "startswith",
            dataTextField: "V_NOMBRE",
            dataValueField: "ID_VULNERABILIDAD",
            dataSource: vulnerabilidadesList,
            optionLabel: "Seleccione",
        });
        //cargamos el combo de escala de degracion
        $("#txtDisponibilidad_" + contadorElementos).kendoDropDownList({
            filter: "startswith",
            dataTextField: "E_D_NOMBRE",
            dataValueField: "E_D_VALOR",
            dataSource: escalaDegradacionList,
            optionLabel: "Seleccione",
            change: Promedio
        });
        $("#txtConfidencialidad_" + contadorElementos).kendoDropDownList({
            filter: "startswith",
            dataTextField: "E_D_NOMBRE",
            dataValueField: "E_D_VALOR",
            dataSource: escalaDegradacionList,
            optionLabel: "Seleccione",
            change: Promedio
        });
        $("#txtIntegridad_" + contadorElementos).kendoDropDownList({
            filter: "startswith",
            dataTextField: "E_D_NOMBRE",
            dataValueField: "E_D_VALOR",
            dataSource: escalaDegradacionList,
            optionLabel: "Seleccione",
            change: Promedio
        });
        $("#txtCriticidad_" + contadorElementos).kendoDropDownList({
            filter: "startswith",
            dataTextField: "E_D_NOMBRE",
            dataValueField: "E_D_VALOR",
            dataSource: escalaDegradacionList,
            optionLabel: "Seleccione",
            change: Promedio
        });
        contadorElementos++;


    });

    function Promedio() {
        var i = 0;
        for (i = 0; i < contadorElementos; i++) {
            //Disponibilidad
            var disponibilidad = $("#txtDisponibilidad_" + i).data("kendoDropDownList").value();
            var disponibilidadNumber: number;
            if (disponibilidad == undefined || disponibilidad == null || disponibilidad == '')
                disponibilidadNumber = 0;
            else
                disponibilidadNumber = Number(disponibilidad);
            //Confidencialidad
            var confidencialidad = $("#txtConfidencialidad_" + i).data("kendoDropDownList").value();
            var confidencialidadNumber: number;
            if (confidencialidad == undefined || confidencialidad == null || confidencialidad == '')
                confidencialidadNumber = 0;
            else
                confidencialidadNumber = Number(confidencialidad);
            //integridad
            var integridad = $("#txtIntegridad_" + i).data("kendoDropDownList").value();
            var integridadNumber: number;
            if (integridad == undefined || integridad == null || integridad == '')
                integridadNumber = 0;
            else
                integridadNumber = Number(integridad);
            //criticidad
            var criticidad = $("#txtCriticidad_" + i).data("kendoDropDownList").value();
            var criticidadNumber: number;
            if (criticidad == undefined || criticidad == null || criticidad == '')
                criticidadNumber = 0;
            else
                criticidadNumber = Number(criticidad);
            //promedio
            var valorTotal: number = (disponibilidadNumber + confidencialidadNumber + integridadNumber + criticidadNumber) / 4;
            $("#txtPromedioImpacto_" + i).val(valorTotal);            
        }
    }    
});
//Funcion para quitar elmento
function quitar(r) {
    var c = confirm("¿Seguro desea quitar el activo?");
    if (c == true) {
        var i = r.parentNode.parentNode.rowIndex;
        document.getElementById("tablaPrincipal").deleteRow(i);
        contadorElementos--;
    }
}

