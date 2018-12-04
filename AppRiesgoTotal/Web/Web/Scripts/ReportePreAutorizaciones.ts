head.ready(function () {
    var listEmpresaSucursales;
    //Seccion de reportes Siniestralidad
    $('#dt_Desde').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $('#dt_Hasta').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $(".k-datepicker input").prop("readonly", true);
    $('#btn_Buscar').kendoButton();
    $('#btn_AceptarEmpresas').kendoButton();
    $('#extrasEmpresas').hide();
    $('#extrasEmpresas2').hide();
    $('#extrasIndividual').hide();
    $('#extrasIndividual2').hide();
    $("#rb_formato").kendoButtonGroup({
        index: 0
    });
    //Verifico los permisos que tiene el usuario para cargar el combo
    var UsuarioLogueado: PC_UsuarioRol_Result = UsuarioSesion();
    var planes = UsuarioLogueado.PermisoPlan;
    var respGeneral;
    var listPlanes;
    var listOpciones = new Array<Object>();
    var listaSucursales: Array<number> = new Array<number>();
    var listasSucursalesSeleccionadas: Array<EmpresaList>;
    if (planes != null && planes.length > 0) {
        var listPlanes = planes.split(';');
        if (listPlanes.length > 1) {
            var opcionesProductos = new Object();
            opcionesProductos.id = null;
            opcionesProductos.value = 'Seleccione';
            listOpciones.push(opcionesProductos);
        } 
        for (var i = 0; i < listPlanes.length - 1; i++) {
            if (listPlanes[i] == 'COR') {
                var opcionesProductos = new Object();
                opcionesProductos.id = 'COR';
                opcionesProductos.value = 'CORPORATIVOS';
                listOpciones.push(opcionesProductos);
            }
            if (listPlanes[i] == 'SMAR') {
                var opcionesProductos = new Object();
                opcionesProductos.id = 'SMAR';
                opcionesProductos.value = 'SMARTPLAN';
                listOpciones.push(opcionesProductos);
            }
            if (listPlanes[i] == 'POO') {
                var opcionesProductos = new Object();
                opcionesProductos.id = 'POO';
                opcionesProductos.value = 'POOL';
                listOpciones.push(opcionesProductos);
            }
            if (listPlanes[i] == 'GRUPAL') {
                var opcionesProductos = new Object();
                opcionesProductos.id = 'GRUPAL';
                opcionesProductos.value = 'GRUPAL';
                listOpciones.push(opcionesProductos);
            }
            if (listPlanes[i] == 'IND') {
                var opcionesProductos = new Object();
                opcionesProductos.id = 'IND';
                opcionesProductos.value = 'INDIVIDUAL';
                listOpciones.push(opcionesProductos);
            }
            if (listPlanes[i] == 'XPR') {
                var opcionesProductos = new Object();
                opcionesProductos.id = 'XPR';
                opcionesProductos.value = 'EXPERIENCE';
                listOpciones.push(opcionesProductos);
            }
            if (listPlanes[i] == 'ONC') {
                var opcionesProductos = new Object();
                opcionesProductos.id = 'ONC';
                opcionesProductos.value = 'ONCOCARE';
                listOpciones.push(opcionesProductos);
            }
            
        }
        if (listPlanes.length > 1) {
            var opcionesProductos = new Object();
            opcionesProductos.id = 'TODOS';
            opcionesProductos.value = 'TODOS';
            listOpciones.push(opcionesProductos);
        }
    }
    var localDataSource = new kendo.data.DataSource({
        data: listOpciones
    });

    $("#selectProducto").kendoDropDownList({
        dataSource: localDataSource,
        dataTextField: "value",
        dataValueField: "id",
        animation: false,
        maxSelectedItems: 1,
        value: [1],
        change: SeleccionTipoPlan
    });
    function SeleccionTipoPlan() {
        var valorSeleccion = $('#selectProducto').val();
        if (valorSeleccion === 'COR' || valorSeleccion === 'SMAR' || valorSeleccion === 'POO' || valorSeleccion === 'GRUPAL') {
            $('#extrasEmpresas').show();
            $('#extrasEmpresas2').show();
            $('#extrasIndividual').hide();
            $('#extrasIndividual2').hide();
            $('#txt_NumeroContrato').val('');
            $('#txt_IdentificacionP').val('');
        } else {
            if (valorSeleccion === 'TODOS') {
                $('#extrasEmpresas').show();
                $('#extrasEmpresas2').show();
                $('#extrasIndividual').show();
                $('#extrasIndividual2').show();
                $('#txt_NumeroSucursal').val('');
                $('#txt_NumeroContrato').val('');
                $('#txt_IdentificacionP').val('');
            } else {
                if (valorSeleccion === '') {
                    $('#extrasEmpresas').hide();
                    $('#extrasEmpresas2').hide();
                    $('#extrasIndividual').hide();
                    $('#extrasIndividual2').hide();
                    $('#txt_NumeroSucursal').val('');
                    $('#txt_NumeroContrato').val('');
                    $('#txt_IdentificacionP').val('');
                } else {
                    $('#extrasEmpresas2').hide();
                    $('#extrasIndividual').show();
                    $('#extrasIndividual2').show();
                    $('#txt_NumeroSucursal').val('');
                }
            }
        }
    }
    var listaBrokers: Array<number> = new Array<number>();
    var listasSeleccion: Array<AgenteVentaCorredoresEntity>;
    var generalListas: Array<AgenteVentaCorredoresEntity>;
    $('#btn_SeleccionarAgentes').kendoButton();
    $('#btn_AceptarGrupoAgentes').kendoButton();
    $("#ventana_GrupoAgentes").kendoWindow({
        width: "950px",
        height: "550px",
        title: "Seleccionar Brokers",
        modal: true
    }).data("kendoWindow");
    $("#ventana_Empresas").kendoWindow({
        width: "950px",
        height: "550px",
        title: "Seleccionar Empresas",
        modal: true
    }).data("kendoWindow");
    ///verifico si es brokers o grupo de brokers
    if (UsuarioLogueado.CodigoGrupoAgentes == null || UsuarioLogueado.CodigoGrupoAgentes == undefined || UsuarioLogueado.CodigoGrupoAgentes == 0 || UsuarioLogueado.rol[0].Id == 1 || UsuarioLogueado.rol[0].Id == 3) {
        listaBrokers.push(UsuarioLogueado.IdCorredor);
        $('#seccionBroker').hide();
    } else {

        get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaPorGrupoAgentes(UsuarioLogueado.CodigoGrupoAgentes,
            function (res: Msg) {
                $('#seccionBroker').show();
                var lst: Array<AgenteVentaCorredoresEntity> = res.Datos;
                generalListas = lst;
                $('#grid_GrupoAgentes').kendoGrid({
                    dataSource: {
                        data: lst,
                        schema: {
                            model: {
                                id: "Codigo"
                            }
                        },
                        pageSize: 5,
                        sort: { field: "Nombre", dir: "asc" }
                        //group: [{ field: "NombreEmpresa" }]
                    },
                    height: 450,
                    scrollable: true,
                    sortable: true,
                    groupable: false,
                    persistSelection: true,
                    filterable: true,
                    pageable: true,
                    columns: [
                        { selectable: true, width: "50px" },
                        { field: "Nombre", title: "Nombre", width: "300px", filterable: { multi: true, search: true } }
                    ]
                });
            },
            function () { });
    }

    var filtro = new ContratosIndividualesEmpresasPorAgenteFilter();
    filtro.Brokers = [UsuarioLogueado.IdCorredor];
    var productoList = new Array<string>();
    //tomamos los productos
    var planes = UsuarioLogueado.PermisoPlan;
    if (planes != null && planes.length > 0) {
        var listPlanesP = planes.split(';');
        for (var i = 0; i < listPlanesP.length - 1; i++) {
            //llenamos los productos
            productoList.push(listPlanesP[i].toUpperCase());
        }
    }
    filtro.lstProductos = productoList;
    filtro.SoloActivos = true;
    post$contrato$ConsultarEmpresasPorAgenteGeneral(filtro, function (result: Msg) {
        if (result == undefined) {
            return alert('Ha ocurrido un problema en la obtención de datos del servidor.');
        }
        var resultado = result.Datos;
        listEmpresaSucursales = <Array<EmpresaList>>result.Datos;
        listasSucursalesSeleccionadas = listEmpresaSucursales;
        $('#grid_Empresas').kendoGrid({
            dataSource: {
                data: listEmpresaSucursales,
                schema: {
                    model: {
                        id: "NumeroSucursal"
                    }
                },
                pageSize: 10,
                sort: { field: "RazonSocial", dir: "asc" },
                //group: [{ field: "RazonSocial" }]
            },
            height: 450,
            scrollable: true,
            sortable: true,
            groupable: false,
            persistSelection: true,
            filterable: true,
            pageable: true,
            columns: [
                { selectable: true, width: "50px" },
                { field: "RazonSocial", title: "Empresa", width: "200px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                { field: "NumeroSucursal", title: "Número de Lista", headerAttributes: { style: "white-space: normal" }, width: "60px", filterable: { multi: true, search: true } },
                { field: "NombreSucursal", title: "Nombre de Lista", headerAttributes: { style: "white-space: normal" }, width: "200px", filterable: { multi: true, search: true } }
            ]
        });
    }, function (error: Msg) {

    });

    Loading_Hide();

    $('#btn_SeleccionarAgentes').click(function () {
        $("#ventana_GrupoAgentes").data('kendoWindow').center().open();
    });

    $('#txt_IdentificacionGenerica').click(function () {
        $("#ventana_Empresas").data('kendoWindow').center().open();
    });

    $('#btn_AceptarGrupoAgentes').click(function () {

        $("#lbl_GrupoAgentes").val(">>" + $("#grid_GrupoAgentes").data('kendoGrid').selectedKeyNames().length + " items seleccionados");
        //proceso de seleccion de listas
        var sl = $("#grid_GrupoAgentes").data('kendoGrid').selectedKeyNames();
        listasSeleccion = new Array<AgenteVentaCorredoresEntity>();
        listaBrokers = new Array<number>();
        for (let r of sl) {
            var parcialresult = generalListas.filter(iteml => iteml.Codigo === Number(r));
            for (let s of parcialresult) {
                //listasSeleccion.push(s);
                listaBrokers.push(s.Codigo);
            }
        }
        //fin proceso
        $("#ventana_GrupoAgentes").data('kendoWindow').close();

    });

    $('#btn_AceptarEmpresas').click(function () {

        $("#txt_IdentificacionGenerica").val(">>" + $("#grid_Empresas").data('kendoGrid').selectedKeyNames().length + " items seleccionados");
        //proceso de seleccion de listas
        var sl = $("#grid_Empresas").data('kendoGrid').selectedKeyNames();
        listaSucursales = new Array<number>();
        for (let r of sl) {
            var parcialresult = listasSucursalesSeleccionadas.filter(iteml => iteml.NumeroSucursal === Number(r));
            for (let s of parcialresult) {
                //listasSeleccion.push(s);
                listaSucursales.push(s.NumeroSucursal);
            }
        }
        //fin proceso
        $("#ventana_Empresas").data('kendoWindow').close();
    });

    $('#btn_Buscar').click(function () {
        var FiltroDesde = <Date>$('#dt_Desde').data('kendoDatePicker').value();
        var FiltroHasta = <Date>$('#dt_Hasta').data('kendoDatePicker').value();
        if (FiltroDesde == null || FiltroHasta == null) {
            return alert('Debe seleccionar las fechas de inicio y fin para poder ejecutar el reporte');
        }
        if (FiltroDesde > FiltroHasta)
            return alert('La fecha desde no puede ser mayor a la fecha hasta');
        if (FiltroDesde > new Date() || FiltroHasta > new Date())
            return alert('Las fechas del filtro no pueden referir a fechas futuras');
        if (listaBrokers.length == 0)
            return alert('Debe seleccionar al menos un broker');
        
        var TipoReporte = <number>$("#rb_formato").data('kendoButtonGroup').current().index();
        var lisProductos = new Array<string>();
        
        if ($('#selectProducto').val() === 'TODOS') {
            for (var i = 0; i < listPlanes.length - 1; i++) {
                if (listPlanes[i] == 'COR')
                    lisProductos.push('COR');
                if (listPlanes[i] == 'SMAR')
                    lisProductos.push('SMAR');
                if (listPlanes[i] == 'POO')
                    lisProductos.push('POO');
                if (listPlanes[i] == 'IND')
                    lisProductos.push('IND');
                if (listPlanes[i] == 'ONC')
                    lisProductos.push('ONC');
                if (listPlanes[i] == 'XPR')
                    lisProductos.push('XPR');
                if (listPlanes[i] == 'GRUPAL')
                    lisProductos.push('GRUPAL');
            }
        } else {
            lisProductos.push($('#selectProducto').val());
        }



        //buscamos y cargamos la grilla :D
        var filtro: PreautorizacionesFilter = new PreautorizacionesFilter();
        filtro.IdBroker = listaBrokers;
        filtro.fechaInicio = FiltroDesde;
        filtro.fechaFin = FiltroHasta;
        filtro.productos = lisProductos;
        filtro.empresa = $('#txt_IdentificacionGenerica').val();//empresa

        //if ($('#txt_NumeroSucursal').val() != null && $('#txt_NumeroSucursal').val() != '')
        //    filtro.numSucursal = $('#txt_NumeroSucursal').val();
        if ($('#txt_NumeroContrato').val() != null && $('#txt_NumeroContrato').val() != '')
            filtro.numContrato = $('#txt_NumeroContrato').val();
        if ($('#txt_IdentificacionP').val() != null && $('#txt_IdentificacionP').val() != '')
            filtro.identificacion = $('#txt_IdentificacionP').val();
        //if ($('#txt_IdentificacionGenerica').val() != null && $('#txt_IdentificacionGenerica').val() != '')
        //    filtro.empresa = $('#txt_IdentificacionGenerica').val();
        if(listaSucursales.length > 0)
            filtro.Sucursales = listaSucursales;
        else
            filtro.Sucursales = new Array<number>();
        if ($('#grid_General').data().kendoGrid) {
            $('#grid_General').data().kendoGrid.destroy();
            $('#grid_General').empty();
        }

        post$CorredoresAutorizacionController$ConsultaAutorizaciones(filtro,
            function (res: Msg) {
                var lst: Array<AutorizacionesCubiertas> = res.Datos;
                
                respGeneral = lst;
                if (TipoReporte == 0) {
                    $('#ventanaGrid').show();
                    $('#pnl_ResultadoReporteador').hide();
                    $('#grid_General').kendoGrid({
                        dataSource: {
                            data: lst,
                            pageSize: 20
                        },
                        height: 450,
                        scrollable: true,
                        sortable: true,
                        persistSelection: true,
                        pageable: true,
                        columns: [
                            { field: "CodigoProducto", title: "Código Cobertura", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                            { field: "Region", title: "Region", width: "200px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                            { field: "NombreEmpresa", title: "Razón Social/ Nombres Apellidos", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                            { field: "ContratoNumero", title: "Contrator", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                            { field: "NombreBeneficiario", title: "Paciente", width: "200px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                            { field: "NombreDiagnostico", title: "Diagnóstico", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                            { field: "NombrePrestadorEmpresa", title: "Prestador", width: "150px", headerAttributes: { style: "white-space: normal" }, filterable: { multi: true, search: true } },
                            { command: { text: "Descargar", click: VerDetalles }, title: "Condiciones", width: "150px" }
                        ]
                    });
                }
                else {
                    //Reportadeor
                    // muestro el panel del reporteador
                    $('#ventanaGrid').hide();
                    $('#pnl_ResultadoReporteador').show();
                    // Genero base 64 de paso de parámetros para ejecución de query en el lado del reporteador
                    var pars = new ParametrosReporte();
                    pars.NombreReporte = "ReportePreAutorizacionesGeneral";
                    //pars.CodigosListas = $("#grid_SelectLista").data('kendoGrid').selectedKeyNames().join(",");
                    pars.Estados = ""; // este reporte no tiene filtro por estados
                    pars.FechaInicio = $('#dt_Desde').data('kendoDatePicker').value();
                    pars.FechaFin = $('#dt_Hasta').data('kendoDatePicker').value();
                    //pars.Identificacion = $('#txt_Identificacion').val().toString();

                    var serializado = JSON.stringify(pars);
                    var codificado = btoa(serializado);
                    var estados = new Array<string>();
                    // cargo la ruta en el reporteador
                    $('#iframeReporteador').attr('src', '../Reports/Reporte.aspx?p=' + codificado);
                    ReporteInvocado = false;

                }

            },
            function () { });

        function VerDetalles(e) {
            e.preventDefault();
            var dataItem = <AutorizacionesCubiertas>this.dataItem($(e.currentTarget).closest("tr"));
            var estadoCob = "";
            //verificamos si es no cubierto
            if (dataItem.EstadoCobertura.toLowerCase().includes("no")) {
                estadoCob = dataItem.EstadoCobertura.replace(' ','_');
            } else {
                estadoCob = dataItem.EstadoCobertura;
            }
            window.open(AddresServicioDescargaPreAutorizaciones + "" + dataItem.IdAutorizacion + "/" + estadoCob + "/"); 
        }


        var ReporteInvocado = false;
        $('#iframeReporteador').load(function () {

            if (ReporteInvocado == false) {
                var myJsonString = JSON.stringify(respGeneral);
                $('#iframeReporteador').contents().find('#hdn_Data').val(myJsonString);
                $('#iframeReporteador').contents().find('#btn_Cargar').trigger("click");
                ReporteInvocado = true;
            }
        });

        $('#grid_General').kendoGrid();
    });
    
});