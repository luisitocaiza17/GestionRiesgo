/// <reference path="../Scripts/Init.ts" />
var contadorElementos = 0;
var indicesList = new Array();
var riesgoList;
head.ready(function () {
    var UsuarioLogueado = UsuarioSesion();
    var vulnerabilidadesList;
    var escalaDegradacionList;
    var amenazaList;
    var escalaFrecuencia;
    $('#btnAgregar').kendoButton();
    $('#btnContinuar').kendoButton();
    $('#btnRegresar').kendoButton();
    $('#btnTerminar').kendoButton();
    $('#SegundaSeccion').hide();
    $("#tituloFinal").hide();
    //cargamos las vulnerabilidades
    get$Vulnerabilidad$TraerVulnerabilidades(function (result) {
        if (result == undefined)
            return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
        if (result.Estado == 'False')
            return alert('No existen catalogos');
        vulnerabilidadesList = result.Datos;
    }, function (error) {
    });
    //cargamos la escala de degradacion
    get$EscalaDegradacion$TraerEscalaDegradacion(function (result) {
        if (result == undefined)
            return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
        if (result.Estado == 'False')
            return alert('No existen catalogos');
        escalaDegradacionList = result.Datos;
    }, function (error) {
    });
    //cargamos las amenazas
    get$Amenaza$TraerAmenazas(function (result) {
        if (result == undefined)
            return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
        if (result.Estado == 'False')
            return alert('No existen catalogos');
        amenazaList = result.Datos;
    }, function (error) {
    });
    //cargamos la escala de frecuencia
    get$Frecuencia$TraerFrecuencias(function (result) {
        if (result == undefined)
            return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
        if (result.Estado == 'False')
            return alert('No existen catalogos');
        escalaFrecuencia = result.Datos;
    }, function (error) {
    });
    Loading_Hide();
    //continuamos a las operaciones
    $('#btnContinuar').click(function () {
        if (confirm('Desea continuar?')) {
            $('#primeraSeccion').hide();
            $('#SegundaSeccion').show();
            riesgoList = new Array();
            //voy a crear un objeto donde guardar la informacion
            var listaObjetoActivo = new Array();
            for (let indice of indicesList) {
                var activo = new ACTIVO_GENERAL();
                activo.ID = indice;
                activo.ACTIVO = $('#txtActivo_' + indice).val();
                activo.VULNERABILIDAD = $('#txtVulnerabilidad_' + indice).data("kendoDropDownList").text();
                ;
                activo.DISPONIBILIDAD = Number($('#txtDisponibilidad_' + indice).val());
                activo.CONFIDENCIALIDAD = Number($('#txtConfidencialidad_' + indice).val());
                activo.INTEGRIDAD = Number($('#txtIntegridad_' + indice).val());
                activo.CRITICIDAD = Number($('#txtCriticidad_' + indice).val());
                activo.PROMEDIO_IMPACTO = Number($('#txtPromedioImpacto_' + indice).val());
                activo.AMENAZA = $('#txtAmenaza_' + indice).data("kendoDropDownList").text();
                ;
                listaObjetoActivo.push(activo);
            }
            console.log(listaObjetoActivo);
            //ahora voy a tomar solo las amenazas que son distintas las sumo y saco el promedio
            //buscamos los unicos
            var listVulnerabilidadesTemp = new Array();
            for (let a of listaObjetoActivo) {
                listVulnerabilidadesTemp.push(a.AMENAZA);
            }
            //ahora tomo solo los unicos
            var uniqs = listVulnerabilidadesTemp.filter(function (item, index, array) {
                return array.indexOf(item) === index;
            });
            //ahora voy a agrupar por valores de vulnerabilidad
            var indiceRiesgoUnico = 0;
            for (let v of uniqs) {
                var agrupacionAmenaza = listaObjetoActivo.filter(x => x.AMENAZA === v);
                //promediamos
                var contadorRepetidos = 0;
                var sumatoriaPromedio = 0;
                var amenazaNombre = "";
                for (let p of agrupacionAmenaza) {
                    contadorRepetidos++;
                    sumatoriaPromedio += p.PROMEDIO_IMPACTO;
                    amenazaNombre = p.AMENAZA;
                }
                //llenamos el objeto
                var riesgo = new RIESGO_GENERAL();
                riesgo.ID = indiceRiesgoUnico;
                riesgo.AMENAZA = amenazaNombre;
                riesgo.PROMEDIO_IMPACTO = sumatoriaPromedio / contadorRepetidos;
                riesgo.VULNERABILIDADES_REPETIDAS = contadorRepetidos;
                riesgoList.push(riesgo);
                indiceRiesgoUnico++;
            }
            console.log(riesgoList);
            // ahora creamos los promediados
            $('#tablaSecundaria').show();
            $("#tableAmenaza").empty();
            for (let a of riesgoList) {
                $('#tableAmenaza').append("<tr >" +
                    "<td>" +
                    "<input type='text' id='txtActivoAgrupado_" + a.ID + "'>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='txtVulnerabilidadAgrupado_" + a.ID + "'>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='txtPromedioAgrupado_" + a.ID + "'>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='txtFrecuenciaAgrupado_" + a.ID + "'>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' id='txtRiesgoTotal_" + a.ID + "'>" +
                    "</td>" +
                    "</tr>");
                //ahora asigno los valores
                $("#txtActivoAgrupado_" + a.ID).val(a.AMENAZA);
                $("#txtVulnerabilidadAgrupado_" + a.ID).val(a.VULNERABILIDADES_REPETIDAS);
                $("#txtPromedioAgrupado_" + a.ID).val(a.PROMEDIO_IMPACTO);
                $("#txtFrecuenciaAgrupado_" + a.ID).kendoDropDownList({
                    filter: "startswith",
                    dataTextField: "E_F_NOMBRE",
                    dataValueField: "E_F_VALOR",
                    dataSource: escalaFrecuencia,
                    optionLabel: "Seleccione",
                    change: RiesgoCalculado
                });
            }
        }
    });
    //Agregamos activos
    $('#btnAgregar').click(function () {
        $('#tableRiesgo').append("<tr >" +
            "<td>" +
            "<input type='text' id='txtActivo_" + contadorElementos + "'>" +
            "</td>" +
            "<td>" +
            "<input type='text' id='txtVulnerabilidad_" + contadorElementos + "'>" +
            "</td>" +
            "<td>" +
            "<input type='text' id='txtDisponibilidad_" + contadorElementos + "'>" +
            "</td>" +
            "<td>" +
            "<input type='text' id='txtConfidencialidad_" + contadorElementos + "'>" +
            "</td>" +
            "<td>" +
            "<input type='text' id='txtIntegridad_" + contadorElementos + "'>" +
            "</td>" +
            "<td>" +
            "<input type='text' id='txtCriticidad_" + contadorElementos + "'>" +
            "</td>" +
            "<td>" +
            "<input type='text' id='txtPromedioImpacto_" + contadorElementos + "'>" +
            "</td>" +
            "<td>" +
            "<input type='text' id='txtAmenaza_" + contadorElementos + "'>" +
            "</td>" +
            "<td>" +
            "<button id='btnQuitar_" + contadorElementos + "'  onclick='quitar(this," + contadorElementos + ")'> Quitar </button>" +
            "</td>" +
            "</tr>");
        //boton de quitar
        $("#btnQuitar_" + contadorElementos).kendoButton();
        //cargamos el combo dinamicamente
        $("#txtVulnerabilidad_" + contadorElementos).kendoDropDownList({
            filter: "startswith",
            dataTextField: "V_NOMBRE",
            dataValueField: "V_NOMBRE",
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
        $("#txtAmenaza_" + contadorElementos).kendoDropDownList({
            filter: "startswith",
            dataTextField: "AM_NOMBRE",
            dataValueField: "ID_AMENAZA",
            dataSource: amenazaList,
            optionLabel: "Seleccione",
            change: Promedio
        });
        indicesList.push(contadorElementos);
        contadorElementos++;
    });
    $('#btnRegresar').click(function () {
        $('#primeraSeccion').show();
        $('#SegundaSeccion').hide();
        $("#tituloFinal").hide();
    });
    function Promedio() {
        var i = 0;
        for (i = 0; i < indicesList.length; i++) {
            //Disponibilidad
            var disponibilidad = $("#txtDisponibilidad_" + indicesList[i]).data("kendoDropDownList").value();
            var disponibilidadNumber;
            if (disponibilidad == undefined || disponibilidad == null || disponibilidad == '')
                disponibilidadNumber = 0;
            else
                disponibilidadNumber = Number(disponibilidad);
            //Confidencialidad
            var confidencialidad = $("#txtConfidencialidad_" + indicesList[i]).data("kendoDropDownList").value();
            var confidencialidadNumber;
            if (confidencialidad == undefined || confidencialidad == null || confidencialidad == '')
                confidencialidadNumber = 0;
            else
                confidencialidadNumber = Number(confidencialidad);
            //integridad
            var integridad = $("#txtIntegridad_" + indicesList[i]).data("kendoDropDownList").value();
            var integridadNumber;
            if (integridad == undefined || integridad == null || integridad == '')
                integridadNumber = 0;
            else
                integridadNumber = Number(integridad);
            //criticidad
            var criticidad = $("#txtCriticidad_" + indicesList[i]).data("kendoDropDownList").value();
            var criticidadNumber;
            if (criticidad == undefined || criticidad == null || criticidad == '')
                criticidadNumber = 0;
            else
                criticidadNumber = Number(criticidad);
            //promedio
            var valorTotal = (disponibilidadNumber + confidencialidadNumber + integridadNumber + criticidadNumber) / 4;
            $("#txtPromedioImpacto_" + indicesList[i]).val(valorTotal);
        }
    }
    //calculo de Riesgo
    function RiesgoCalculado() {
        var i = 0;
        for (let r of riesgoList) {
            //Disponibilidad
            var frecuenciaEscala = $("#txtFrecuenciaAgrupado_" + r.ID).data("kendoDropDownList").value();
            var frecuenciaEscalaNumber;
            if (frecuenciaEscala == undefined || frecuenciaEscala == null || frecuenciaEscala == '')
                frecuenciaEscalaNumber = 0;
            else
                frecuenciaEscalaNumber = Number(frecuenciaEscala);
            var riesgoTOTAL = frecuenciaEscalaNumber * r.PROMEDIO_IMPACTO;
            r.AMENAZA_PROMEDIO = riesgoTOTAL;
            $("#txtRiesgoTotal_" + r.ID).val(riesgoTOTAL);
        }
        createChart();
    }
});
//Funcion para quitar elmento
function quitar(r, id) {
    var c = confirm("¿Seguro desea quitar el activo?");
    if (c == true) {
        var i = r.parentNode.parentNode.rowIndex;
        document.getElementById("tablaPrincipal").deleteRow(i);
        indicesList = indicesList.filter(item => item !== id);
    }
}
// como usar: https://demos.telerik.com/kendo-ui/bar-charts/plotbands
function createChart() {
    $("#tituloFinal").show();
    $("#chart").kendoChart({
        chartArea: {
            width: 500,
            height: 520
        },
        dataSource: {
            data: riesgoList
        },
        title: {
            align: "center",
            text: "ESTADISTICAS DE RIESGO"
        },
        legend: {
            visible: true
        },
        seriesDefaults: {
            type: "column",
            labels: {
                visible: true,
                background: "transparent"
            }
        },
        series: [{
                field: "AMENAZA_PROMEDIO",
                categoryField: "AMENAZA"
            }],
        categoryAxis: {
            majorGridLines: {
                visible: true
            },
            line: {
                visible: true
            }
        },
        valueAxis: {
            labels: {
                format: "N0"
            },
            majorUnit: 500,
            plotBands: [{
                    from: 0,
                    to: 200,
                    color: "#c00",
                    opacity: 0.3
                }, {
                    from: 201,
                    to: 400,
                    color: "#c00",
                    opacity: 0.5
                },
                {
                    from: 401,
                    to: 500,
                    color: "#c00",
                    opacity: 0.8
                }],
            max: 510,
            line: {
                visible: true
            }
        },
        tooltip: {
            visible: true,
            format: "{0}%",
            template: "#= series.categoryField #: #= value #"
        }
    });
    //Pastel como usar:https://demos.telerik.com/kendo-ui/pie-charts/local-data-binding
    $("#pastel").kendoChart({
        chartArea: {
            width: 500,
            height: 500
        },
        title: {
            text: "Pastel de Riesgos"
        },
        legend: {
            position: "bottom"
        },
        dataSource: {
            data: riesgoList
        },
        series: [{
                type: "pie",
                field: "AMENAZA_PROMEDIO",
                categoryField: "AMENAZA"
            }],
        seriesColors: ["#03a9f4", "#ff9800", "#fad84a", "#4caf50"],
        tooltip: {
            visible: true,
            template: "#= series.categoryField #: #= value #" //tooltip
        }
    });
}
//# sourceMappingURL=Home.js.map