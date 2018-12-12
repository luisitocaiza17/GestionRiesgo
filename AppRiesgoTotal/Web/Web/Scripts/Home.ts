/// <reference path="../Scripts/Init.ts" />
var contadorElementos: number = 0;
var indicesList: Array<number> = new Array<number>();
head.ready(function () { 

    var UsuarioLogueado = UsuarioSesion();
    var vulnerabilidadesList: Array<VULNERABILIDADES>;
    var escalaDegradacionList: Array<ESCALA_DEGRADACION>;
    var amenazaList: Array<AMENAZAS>;
    var riesgoList: Array<RIESGO_GENERAL>;
    $('#btnAgregar').kendoButton();
    $('#btnContinuar').kendoButton();
    $('#btnTerminar').kendoButton();
    $('#tablaSecundaria').hide();
    
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
    //cargamos las amenazas
    get$Amenaza$TraerAmenazas(function (result: Msg) {
        if (result == undefined)
            return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
        if (result.Estado == 'False')
            return alert('No existen catalogos');
        amenazaList = <Array<AMENAZAS>>result.Datos;
    }, function (error: Msg) {

        });

    Loading_Hide();
    //continuamos a las operaciones
    $('#btnContinuar').click(function () {
        if (confirm('Desea continuar?')) {
            $('#primeraSeccion').hide();
            $('#tablaSecundaria').show();
            riesgoList = new Array<RIESGO_GENERAL>();
            //voy a crear un objeto donde guardar la informacion
            var listaObjetoActivo: Array<ACTIVO_GENERAL> = new Array<ACTIVO_GENERAL>();
            for (let indice of indicesList) {
                var activo: ACTIVO_GENERAL = new ACTIVO_GENERAL();
                activo.ACTIVO = $('#txtActivo_' + indice).val();
                activo.VULNERABILIDAD = $('#txtVulnerabilidad_' + indice).val();
                activo.DISPONIBILIDAD = Number($('#txtDisponibilidad_' + indice).val());
                activo.CONFIDENCIALIDAD = Number($('#txtConfidencialidad_' + indice).val());
                activo.INTEGRIDAD = Number($('#txtIntegridad_' + indice).val());
                activo.CRITICIDAD = Number($('#txtCriticidad_' + indice).val());
                activo.PROMEDIO_IMPACTO = Number($('#txtPromedioImpacto_' + indice).val());
                listaObjetoActivo.push(activo);
            }
            console.log(listaObjetoActivo);
            //ahora voy a tomar solo las vulnerabilidades que son distintas las sumo y saco el promedio
            //buscamos los unicos
            var listVulnerabilidadesTemp = new Array<string>();
            for (let a of listaObjetoActivo) {
                listVulnerabilidadesTemp.push(a.VULNERABILIDAD);
            }
            //ahora tomo solo los unicos
            var uniqs = listVulnerabilidadesTemp.filter(function (item, index, array) {
                return array.indexOf(item) === index;
            })
            //ahora voy a agrupar por valores de vulnerabilidad
            for (let v of uniqs) {
                var agrupacionVulnerabilidad = listaObjetoActivo.filter(x => x.VULNERABILIDAD === v);
                //promediamos
                var contadorRepetidos = 0;
                var sumatoriaPromedio = 0;
                var vulnerabilidadN = "";
                for (let p of agrupacionVulnerabilidad){
                    contadorRepetidos++;
                    sumatoriaPromedio += p.PROMEDIO_IMPACTO;
                    vulnerabilidadN = p.VULNERABILIDAD;
                }
                //llenamos el objeto
                var riesgo: RIESGO_GENERAL = new RIESGO_GENERAL();
                riesgo.VULNERABILIDAD = vulnerabilidadN;
                riesgo.PROMEDIO_IMPACTO = sumatoriaPromedio / contadorRepetidos;
                riesgo.VULNERABILIDADES_REPETIDAS = contadorRepetidos;
                riesgoList.push(riesgo);
            }
            console.log(riesgoList);  

        }

    });
    //Agregamos activos
    $('#btnAgregar').click(function () {
        $('#tableRiesgo').append(
            "<tr >" +
                "<td>" +
                    "<input type='text' id='txtActivo_" + contadorElementos+"'>" +
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

    function Promedio() {
        var i = 0;
        for (i = 0; i < indicesList.length; i++) {
            //Disponibilidad
            var disponibilidad = $("#txtDisponibilidad_" + indicesList[i]).data("kendoDropDownList").value();
            var disponibilidadNumber: number;
            if (disponibilidad == undefined || disponibilidad == null || disponibilidad == '')
                disponibilidadNumber = 0;
            else
                disponibilidadNumber = Number(disponibilidad);
            //Confidencialidad
            var confidencialidad = $("#txtConfidencialidad_" + indicesList[i]).data("kendoDropDownList").value();
            var confidencialidadNumber: number;
            if (confidencialidad == undefined || confidencialidad == null || confidencialidad == '')
                confidencialidadNumber = 0;
            else
                confidencialidadNumber = Number(confidencialidad);
            //integridad
            var integridad = $("#txtIntegridad_" + indicesList[i]).data("kendoDropDownList").value();
            var integridadNumber: number;
            if (integridad == undefined || integridad == null || integridad == '')
                integridadNumber = 0;
            else
                integridadNumber = Number(integridad);
            //criticidad
            var criticidad = $("#txtCriticidad_" + indicesList[i]).data("kendoDropDownList").value();
            var criticidadNumber: number;
            if (criticidad == undefined || criticidad == null || criticidad == '')
                criticidadNumber = 0;
            else
                criticidadNumber = Number(criticidad);
            //promedio
            var valorTotal: number = (disponibilidadNumber + confidencialidadNumber + integridadNumber + criticidadNumber) / 4;
            $("#txtPromedioImpacto_" + indicesList[i]).val(valorTotal);            
        }
    }    
});
//Funcion para quitar elmento
function quitar(r,id) {
    var c = confirm("¿Seguro desea quitar el activo?");
    if (c == true) {
        var i = r.parentNode.parentNode.rowIndex;
        document.getElementById("tablaPrincipal").deleteRow(i); 
        indicesList = indicesList.filter(item => item !== id);   
    }
}

