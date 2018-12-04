head.ready(function () {
    var UsuarioLogueado: PC_UsuarioRol_Result = UsuarioSesion();
    console.log(UsuarioLogueado);
    //pruebas
    var idCorredorePruebas = 58567;
    var fechaPruebas = new Date(2018, 8, 21);
    var listasSeleccion: Array<AgenteVentaCorredoresEntity>;
    var generalListas: Array<AgenteVentaCorredoresEntity>;

    //inicialmente ocultamos todas las opciones para cargarlas dinamicamente
    $('#seccionIndividual').hide();
    $('#seccionExperience').hide();
    $('#seccionSmart').hide();
    $('#seccionCorp').hide();
    $('#seccionPool').hide();
    $('#cargaPlanes').hide();
    $('#cargandoMessage').show();
    
    $('#btn_SeleccionarAgentes').kendoButton();
    $('#btn_AceptarGrupoAgentes').kendoButton();
    $("#ventana_GrupoAgentes").kendoWindow({
        width: "950px",
        height: "550px",
        title: "Seleccionar Brokers",
        modal: true
    }).data("kendoWindow")

    // Valido si es que el filtro por grupo de agentes, y selección de agentes debe mostrarse (esto aplica solamente si el usuario de la sesión tiene configurado un grupo de agentes diferente a "Ninguno")
    if (UsuarioLogueado.CodigoGrupoAgentes == null || UsuarioLogueado.CodigoGrupoAgentes == undefined || UsuarioLogueado.CodigoGrupoAgentes == 0 || UsuarioLogueado.rol[0].Id == 1 || UsuarioLogueado.rol[0].Id == 3) {
        $('#pnl_FiltroGrupoAgentes').hide();
        //cargo grilla inicial
        var filtro: ResumenEjecutivoFilter = new ResumenEjecutivoFilter();
        var listaBroker = new Array<number>();
        filtro.fecha = new Date();
        filtro.region = '';
        listaBroker.push(UsuarioLogueado.IdCorredor);        
        filtro.Brokers = listaBroker;
        totalActivos = 0;
        totalMora = 0;
        totalAnulados = 0;
        totalPagado = 0;
        totalComisiones = 0;
        planes = UsuarioLogueado.PermisoPlan;

        if (planes != null && planes.length > 0) {
            var listPlanes = planes.split(';');
            for (var i = 0; i < listPlanes.length - 1; i++) {
                if (listPlanes[i] == 'IND') {
                    Loading_Show();
                    
                    $('#seccionIndividual').show();
                    var producto = new Array<string>();
                    producto.push("IND");
                    filtro.lstProductos = producto;
                    //get$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(UsuarioLogueado.IdCorredor, FiltroHasta, "IND",
                    post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro,
                        function (res: Msg) {
                            var resumen: PC_ResumenEjecutivo = res.Datos;
                            //Individual
                            $('#cargaPlanes').show();
                            $('#cargandoMessage').hide();
                            $('#IndivialClientesActivos').text(resumen.ClientesActivos);
                            $('#IndivialClientesMora').text(resumen.ClientesMora);
                            $('#IndivialClientesAnulados').text(resumen.Anulados);
                            $('#IndivialClientesValor').text(resumen.Valor);
                            $('#IndivialClientesComisión').text(resumen.Comision);
                            $('#seccionIndividual').show();
                            //sumo los valores
                            totalActivos += resumen.ClientesActivos;
                            totalMora += resumen.ClientesMora;
                            totalAnulados += resumen.Anulados;
                            totalPagado += resumen.Valor;
                            totalComisiones += resumen.Comision;
                            //Total
                            $('#TotalClientesActivos').text(totalActivos);
                            $('#TotalClientesMora').text(totalMora);
                            $('#TotalClientesAnulados').text(totalAnulados);
                            $('#TotalClientesValor').text(totalPagado);
                            $('#TotalClientesComisión').text(totalComisiones);
                        },
                        function () { });
                }
                if (listPlanes[i] == 'XPR') {
                    Loading_Show();
                    var producto = new Array<string>();
                    producto.push("XPR");
                    filtro.lstProductos = producto;
                    //get$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(UsuarioLogueado.IdCorredor, FiltroHasta, "IND",
                    post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro,
                        function (res: Msg) {
                            $('#cargaPlanes').show();
                            $('#cargandoMessage').hide();
                            var resumen: PC_ResumenEjecutivo = res.Datos;
                            //Experiencie
                            $('#ExperienceClientesActivos').text(resumen.ClientesActivos);
                            $('#ExperienceClientesMora').text(resumen.ClientesMora);
                            $('#ExperienceClientesAnulados').text(resumen.Anulados);
                            $('#ExperienceClientesValor').text(resumen.Valor);
                            $('#ExperienceClientesComisión').text(resumen.Comision);
                            $('#seccionExperience').show();
                            //sumo los valores
                            totalActivos += resumen.ClientesActivos;
                            totalMora += resumen.ClientesMora;
                            totalAnulados += resumen.Anulados;
                            totalPagado += resumen.Valor;
                            totalComisiones += resumen.Comision;
                            //Total
                            $('#TotalClientesActivos').text(totalActivos);
                            $('#TotalClientesMora').text(totalMora);
                            $('#TotalClientesAnulados').text(totalAnulados);
                            $('#TotalClientesValor').text(totalPagado);
                            $('#TotalClientesComisión').text(totalComisiones);
                        },
                        function () { });
                }
                if (listPlanes[i] == 'SMAR') {
                    Loading_Show();
                    var producto = new Array<string>();
                    producto.push("SMAR");
                    filtro.lstProductos = producto;
                    //get$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(UsuarioLogueado.IdCorredor, FiltroHasta, "IND",
                    post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro,
                        function (res: Msg) {
                            $('#cargaPlanes').show();
                            $('#cargandoMessage').hide();
                            var resumen: PC_ResumenEjecutivo = res.Datos;
                            //SmartPlan
                            $('#SmartPlanClientesActivos').text(resumen.ClientesActivos);
                            $('#SmartPlanClientesMora').text(resumen.ClientesMora);
                            $('#SmartPlanClientesAnulados').text(resumen.Anulados);
                            $('#SmartPlanClientesValor').text(resumen.Valor);
                            $('#SmartPlanClientesComisión').text(resumen.Comision);
                            $('#seccionSmart').show();
                            //sumo los valores
                            totalActivos += resumen.ClientesActivos;
                            totalMora += resumen.ClientesMora;
                            totalAnulados += resumen.Anulados;
                            totalPagado += resumen.Valor;
                            totalComisiones += resumen.Comision;
                            //Total
                            $('#TotalClientesActivos').text(totalActivos);
                            $('#TotalClientesMora').text(totalMora);
                            $('#TotalClientesAnulados').text(totalAnulados);
                            $('#TotalClientesValor').text(totalPagado);
                            $('#TotalClientesComisión').text(totalComisiones);
                        },
                        function () { });
                }
                if (listPlanes[i] == 'COR') {
                    Loading_Show();
                    var producto = new Array<string>();
                    producto.push("COR");
                    filtro.lstProductos = producto;
                    //get$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(UsuarioLogueado.IdCorredor, FiltroHasta, "IND",
                    post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro,
                        function (res: Msg) {
                            $('#cargaPlanes').show();
                            $('#cargandoMessage').hide();
                            var resumen: PC_ResumenEjecutivo = res.Datos;
                            //Corporativo
                            $('#CorporativoClientesActivos').text(resumen.ClientesActivos);
                            $('#CorporativoClientesMora').text(resumen.ClientesMora);
                            $('#CorporativoClientesAnulados').text(resumen.Anulados);
                            $('#CorporativoClientesValor').text(resumen.Valor);
                            $('#CorporativoClientesComisión').text(resumen.Comision);
                            $('#seccionCorp').show();
                            //sumo los valores
                            totalActivos += resumen.ClientesActivos;
                            totalMora += resumen.ClientesMora;
                            totalAnulados += resumen.Anulados;
                            totalPagado += resumen.Valor;
                            totalComisiones += resumen.Comision;
                            //Total
                            $('#TotalClientesActivos').text(totalActivos);
                            $('#TotalClientesMora').text(totalMora);
                            $('#TotalClientesAnulados').text(totalAnulados);
                            $('#TotalClientesValor').text(totalPagado);
                            $('#TotalClientesComisión').text(totalComisiones);
                        },
                        function () { });
                }
                if (listPlanes[i] == 'POO') {
                    Loading_Show();
                    var producto = new Array<string>();
                    producto.push("POO");
                    filtro.lstProductos = producto;
                    //get$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(UsuarioLogueado.IdCorredor, FiltroHasta, "IND",
                    post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro,
                        function (res: Msg) {
                            $('#cargaPlanes').show();
                            $('#cargandoMessage').hide();
                            var resumen: PC_ResumenEjecutivo = res.Datos;
                            //Corporativo
                            $('#PoolClientesActivos').text(resumen.ClientesActivos);
                            $('#PoolClientesMora').text(resumen.ClientesMora);
                            $('#PoolClientesAnulados').text(resumen.Anulados);
                            $('#PoolClientesValor').text(resumen.Valor);
                            $('#PoolClientesComisión').text(resumen.Comision);
                            $('#seccionPool').show();
                            //sumo los valores
                            totalActivos += resumen.ClientesActivos;
                            totalMora += resumen.ClientesMora;
                            totalAnulados += resumen.Anulados;
                            totalPagado += resumen.Valor;
                            totalComisiones += resumen.Comision;
                            //Total
                            $('#TotalClientesActivos').text(totalActivos);
                            $('#TotalClientesMora').text(totalMora);
                            $('#TotalClientesAnulados').text(totalAnulados);
                            $('#TotalClientesValor').text(totalPagado);
                            $('#TotalClientesComisión').text(totalComisiones);
                        },
                        function () { });
                }
            }
        }
    }
    else {
        $('#pnl_FiltroGrupoAgentes').show();
        Loading_Show();
        // carga la grilla de agentes disponibles
        get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaPorGrupoAgentes(UsuarioLogueado.CodigoGrupoAgentes,
            function (res: Msg) {
                
                var lst: Array<AgenteVentaCorredoresEntity> = res.Datos;
                generalListas = lst;
                //var filtro: ResumenEjecutivoFilter = new ResumenEjecutivoFilter();
                var filtro: ResumenEjecutivoFilter = new ResumenEjecutivoFilter();
                var listaBroker = new Array<number>();
                filtro.fecha = new Date();
                filtro.region = '';                
                for (let suc of generalListas) {
                    listaBroker.push(suc.Codigo);
                }                
                filtro.Brokers = listaBroker;
                totalActivos = 0;
                totalMora = 0;
                totalAnulados = 0;
                totalPagado = 0;
                totalComisiones = 0;
                planes = UsuarioLogueado.PermisoPlan;

                if (planes != null && planes.length > 0) {
                    var listPlanes = planes.split(';');
                    for (var i = 0; i < listPlanes.length - 1; i++) {
                        if (listPlanes[i] == 'IND') {
                            Loading_Show();
                            $('#seccionIndividual').show();
                            var producto = new Array<string>();
                            producto.push("IND");
                            filtro.lstProductos = producto;
                            //get$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(UsuarioLogueado.IdCorredor, FiltroHasta, "IND",
                            post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro,
                                function (res: Msg) {
                                    $('#cargaPlanes').show();
                                    $('#cargandoMessage').hide();
                                    var resumen: PC_ResumenEjecutivo = res.Datos;
                                    //Individual
                                    $('#IndivialClientesActivos').text(resumen.ClientesActivos);
                                    $('#IndivialClientesMora').text(resumen.ClientesMora);
                                    $('#IndivialClientesAnulados').text(resumen.Anulados);
                                    $('#IndivialClientesValor').text(resumen.Valor);
                                    $('#IndivialClientesComisión').text(resumen.Comision);
                                    $('#seccionIndividual').show();
                                    //sumo los valores
                                    totalActivos += resumen.ClientesActivos;
                                    totalMora += resumen.ClientesMora;
                                    totalAnulados += resumen.Anulados;
                                    totalPagado += resumen.Valor;
                                    totalComisiones += resumen.Comision;
                                    //Total
                                    $('#TotalClientesActivos').text(totalActivos);
                                    $('#TotalClientesMora').text(totalMora);
                                    $('#TotalClientesAnulados').text(totalAnulados);
                                    $('#TotalClientesValor').text(totalPagado);
                                    $('#TotalClientesComisión').text(totalComisiones);
                                },
                                function () { });
                        }
                        if (listPlanes[i] == 'XPR') {
                            Loading_Show();
                            var producto = new Array<string>();
                            producto.push("XPR");
                            filtro.lstProductos = producto;
                            //get$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(UsuarioLogueado.IdCorredor, FiltroHasta, "IND",
                            post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro,
                                function (res: Msg) {
                                    $('#cargaPlanes').show();
                                    $('#cargandoMessage').hide();
                                    var resumen: PC_ResumenEjecutivo = res.Datos;
                                    //Experiencie
                                    $('#ExperienceClientesActivos').text(resumen.ClientesActivos);
                                    $('#ExperienceClientesMora').text(resumen.ClientesMora);
                                    $('#ExperienceClientesAnulados').text(resumen.Anulados);
                                    $('#ExperienceClientesValor').text(resumen.Valor);
                                    $('#ExperienceClientesComisión').text(resumen.Comision);
                                    $('#seccionExperience').show();
                                    //sumo los valores
                                    totalActivos += resumen.ClientesActivos;
                                    totalMora += resumen.ClientesMora;
                                    totalAnulados += resumen.Anulados;
                                    totalPagado += resumen.Valor;
                                    totalComisiones += resumen.Comision;
                                    //Total
                                    $('#TotalClientesActivos').text(totalActivos);
                                    $('#TotalClientesMora').text(totalMora);
                                    $('#TotalClientesAnulados').text(totalAnulados);
                                    $('#TotalClientesValor').text(totalPagado);
                                    $('#TotalClientesComisión').text(totalComisiones);
                                },
                                function () { });
                        }
                        if (listPlanes[i] == 'SMAR') {
                            Loading_Show();
                            var producto = new Array<string>();
                            producto.push("SMAR");
                            filtro.lstProductos = producto;
                            //get$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(UsuarioLogueado.IdCorredor, FiltroHasta, "IND",
                            post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro,
                                function (res: Msg) {
                                    $('#cargaPlanes').show();
                                    $('#cargandoMessage').hide();
                                    var resumen: PC_ResumenEjecutivo = res.Datos;
                                    //SmartPlan
                                    $('#SmartPlanClientesActivos').text(resumen.ClientesActivos);
                                    $('#SmartPlanClientesMora').text(resumen.ClientesMora);
                                    $('#SmartPlanClientesAnulados').text(resumen.Anulados);
                                    $('#SmartPlanClientesValor').text(resumen.Valor);
                                    $('#SmartPlanClientesComisión').text(resumen.Comision);
                                    $('#seccionSmart').show();
                                    //sumo los valores
                                    totalActivos += resumen.ClientesActivos;
                                    totalMora += resumen.ClientesMora;
                                    totalAnulados += resumen.Anulados;
                                    totalPagado += resumen.Valor;
                                    totalComisiones += resumen.Comision;
                                    //Total
                                    $('#TotalClientesActivos').text(totalActivos);
                                    $('#TotalClientesMora').text(totalMora);
                                    $('#TotalClientesAnulados').text(totalAnulados);
                                    $('#TotalClientesValor').text(totalPagado);
                                    $('#TotalClientesComisión').text(totalComisiones);
                                },
                                function () { });
                        }
                        if (listPlanes[i] == 'COR') {
                            Loading_Show();
                            var producto = new Array<string>();
                            producto.push("COR");
                            filtro.lstProductos = producto;
                            //get$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(UsuarioLogueado.IdCorredor, FiltroHasta, "IND",
                            post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro,
                                function (res: Msg) {
                                    $('#cargaPlanes').show();
                                    $('#cargandoMessage').hide();
                                    var resumen: PC_ResumenEjecutivo = res.Datos;
                                    //Corporativo
                                    $('#CorporativoClientesActivos').text(resumen.ClientesActivos);
                                    $('#CorporativoClientesMora').text(resumen.ClientesMora);
                                    $('#CorporativoClientesAnulados').text(resumen.Anulados);
                                    $('#CorporativoClientesValor').text(resumen.Valor);
                                    $('#CorporativoClientesComisión').text(resumen.Comision);
                                    $('#seccionCorp').show();
                                    //sumo los valores
                                    totalActivos += resumen.ClientesActivos;
                                    totalMora += resumen.ClientesMora;
                                    totalAnulados += resumen.Anulados;
                                    totalPagado += resumen.Valor;
                                    totalComisiones += resumen.Comision;
                                    //Total
                                    $('#TotalClientesActivos').text(totalActivos);
                                    $('#TotalClientesMora').text(totalMora);
                                    $('#TotalClientesAnulados').text(totalAnulados);
                                    $('#TotalClientesValor').text(totalPagado);
                                    $('#TotalClientesComisión').text(totalComisiones);
                                },
                                function () { });
                        }
                        if (listPlanes[i] == 'POO') {
                            Loading_Show();
                            var producto = new Array<string>();
                            producto.push("POO");
                            filtro.lstProductos = producto;
                            //get$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(UsuarioLogueado.IdCorredor, FiltroHasta, "IND",
                            post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro,
                                function (res: Msg) {
                                    $('#cargaPlanes').show();
                                    $('#cargandoMessage').hide();
                                    var resumen: PC_ResumenEjecutivo = res.Datos;
                                    //Corporativo
                                    $('#PoolClientesActivos').text(resumen.ClientesActivos);
                                    $('#PoolClientesMora').text(resumen.ClientesMora);
                                    $('#PoolClientesAnulados').text(resumen.Anulados);
                                    $('#PoolClientesValor').text(resumen.Valor);
                                    $('#PoolClientesComisión').text(resumen.Comision);
                                    $('#seccionPool').show();
                                    //sumo los valores
                                    totalActivos += resumen.ClientesActivos;
                                    totalMora += resumen.ClientesMora;
                                    totalAnulados += resumen.Anulados;
                                    totalPagado += resumen.Valor;
                                    totalComisiones += resumen.Comision;
                                    //Total
                                    $('#TotalClientesActivos').text(totalActivos);
                                    $('#TotalClientesMora').text(totalMora);
                                    $('#TotalClientesAnulados').text(totalAnulados);
                                    $('#TotalClientesValor').text(totalPagado);
                                    $('#TotalClientesComisión').text(totalComisiones);
                                },
                                function () { });
                        }
                    }
                }
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

    $('#btn_AceptarGrupoAgentes').click(function () {

        $("#lbl_GrupoAgentes").val(">>" + $("#grid_GrupoAgentes").data('kendoGrid').selectedKeyNames().length + " items seleccionados");
        //proceso de seleccion de listas
        var sl = $("#grid_GrupoAgentes").data('kendoGrid').selectedKeyNames();
        listasSeleccion = new Array<AgenteVentaCorredoresEntity>();
        
        for (let r of sl) {
            var parcialresult = generalListas.filter(iteml => iteml.Codigo === Number(r));
            for (let s of parcialresult) {
                listasSeleccion.push(s);
            }
        }

        if (listasSeleccion.length == 0)
            return alert('Debe seleccionar al menos un Broker');

        //fin proceso
        $("#ventana_GrupoAgentes").data('kendoWindow').close();

        // tal vez aquí mismo podría invocarse la llamada al servicio que filtre los datos presentados
        revisarFecha();
    });

    $('#btn_SeleccionarAgentes').click(function () {
        $("#ventana_GrupoAgentes").data('kendoWindow').center().open();
    });
    

    $('#OpcionesRegion').kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Todas", value: null },
            { text: "Sierra", value: "Sierra" },
            { text: "Costa", value: "Costa" },
            { text: "Austro", value: "Austro" }
        ],
        suggest: true,
        value: ["Todas"],
        change: SeleccionCriterio
    });

    function SeleccionCriterio() {
        revisarFecha();
    }

    $('#dt_Hasta').kendoDatePicker({
        // defines the start view
        format: "MMMM yyyy",
        // defines the start view
        start: "year",
        // defines when the calendar should return date
        depth: "year",
        change: revisarFecha
    });
    function revisarFecha() {
        var FiltroHasta = <Date>$('#dt_Hasta').data('kendoDatePicker').value();
        var fecha = new Date(2018,7,31);
        
        if (fecha > FiltroHasta) {
            alert('El aplicativo muestra historicos a partir septiembre del 2018');
            return false;
        } else {
            if (FiltroHasta > new Date()) {
                alert('El aplicativo no muestra historicos fechas futuras');
                return false;
            }
        }

        var regionValue = $('#OpcionesRegion').val();
        if (regionValue == null)
            regionValue=''
        //pruebas
        //FiltroHasta = new Date(2018, 8, 21);
        var filtro: ResumenEjecutivoFilter = new ResumenEjecutivoFilter();
        var listaBroker = new Array<number>();

        if (UsuarioLogueado.CodigoGrupoAgentes == null || UsuarioLogueado.CodigoGrupoAgentes == undefined || UsuarioLogueado.CodigoGrupoAgentes == 0 || UsuarioLogueado.CodigoGrupoAgentes == null || UsuarioLogueado.CodigoGrupoAgentes == undefined || UsuarioLogueado.rol[0].Id == 1 || UsuarioLogueado.rol[0].Id == 3) {
            listaBroker.push(UsuarioLogueado.IdCorredor);
        } else {
            for (let suc of listasSeleccion) {
                listaBroker.push(suc.Codigo);
            }
        }        
        filtro.Brokers = listaBroker;
        filtro.fecha = FiltroHasta;
        filtro.region = regionValue;

        totalActivos = 0;
        totalMora = 0;
        totalAnulados = 0;
        totalPagado = 0;
        totalComisiones = 0;
        planes = UsuarioLogueado.PermisoPlan;
        if (planes != null && planes.length > 0) {
            var listPlanes = planes.split(';');
            for (var i = 0; i < listPlanes.length - 1; i++) {
                if (listPlanes[i] == 'IND') {
                    $('#seccionIndividual').show();
                    var producto = new Array<string>();
                    producto.push("IND");
                    filtro.lstProductos = producto;
                    //get$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(UsuarioLogueado.IdCorredor, FiltroHasta, "IND",
                    post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro,
                    function (res: Msg) {
                            var resumen: PC_ResumenEjecutivo = res.Datos;
                            //Individual
                            $('#IndivialClientesActivos').text(resumen.ClientesActivos);
                            $('#IndivialClientesMora').text(resumen.ClientesMora);
                            $('#IndivialClientesAnulados').text(resumen.Anulados);
                            $('#IndivialClientesValor').text(resumen.Valor);
                            $('#IndivialClientesComisión').text(resumen.Comision);
                            $('#seccionIndividual').show();
                            //sumo los valores
                            totalActivos += resumen.ClientesActivos;
                            totalMora += resumen.ClientesMora;
                            totalAnulados += resumen.Anulados;
                            totalPagado += resumen.Valor;
                            totalComisiones += resumen.Comision;
                            //Total
                            $('#TotalClientesActivos').text(totalActivos);
                            $('#TotalClientesMora').text(totalMora);
                            $('#TotalClientesAnulados').text(totalAnulados);
                            $('#TotalClientesValor').text(totalPagado);
                            $('#TotalClientesComisión').text(totalComisiones);
                        },
                        function () { });
                }
                if (listPlanes[i] == 'XPR') {
                    var producto = new Array<string>();
                    producto.push("XPR");
                    filtro.lstProductos = producto;
                    //get$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(UsuarioLogueado.IdCorredor, FiltroHasta, "IND",
                    post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro,
                        function (res: Msg) {
                            var resumen: PC_ResumenEjecutivo = res.Datos;
                            //Experiencie
                            $('#ExperienceClientesActivos').text(resumen.ClientesActivos);
                            $('#ExperienceClientesMora').text(resumen.ClientesMora);
                            $('#ExperienceClientesAnulados').text(resumen.Anulados);
                            $('#ExperienceClientesValor').text(resumen.Valor);
                            $('#ExperienceClientesComisión').text(resumen.Comision);
                            $('#seccionExperience').show();
                            //sumo los valores
                            totalActivos += resumen.ClientesActivos;
                            totalMora += resumen.ClientesMora;
                            totalAnulados += resumen.Anulados;
                            totalPagado += resumen.Valor;
                            totalComisiones += resumen.Comision;
                            //Total
                            $('#TotalClientesActivos').text(totalActivos);
                            $('#TotalClientesMora').text(totalMora);
                            $('#TotalClientesAnulados').text(totalAnulados);
                            $('#TotalClientesValor').text(totalPagado);
                            $('#TotalClientesComisión').text(totalComisiones);
                        },
                        function () { });
                }
                if (listPlanes[i] == 'SMAR') {
                    var producto = new Array<string>();
                    producto.push("SMAR");
                    filtro.lstProductos = producto;
                    //get$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(UsuarioLogueado.IdCorredor, FiltroHasta, "IND",
                    post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro,
                        function (res: Msg) {
                            var resumen: PC_ResumenEjecutivo = res.Datos;
                            //SmartPlan
                            $('#SmartPlanClientesActivos').text(resumen.ClientesActivos);
                            $('#SmartPlanClientesMora').text(resumen.ClientesMora);
                            $('#SmartPlanClientesAnulados').text(resumen.Anulados);
                            $('#SmartPlanClientesValor').text(resumen.Valor);
                            $('#SmartPlanClientesComisión').text(resumen.Comision);
                            $('#seccionSmart').show();
                            //sumo los valores
                            totalActivos += resumen.ClientesActivos;
                            totalMora += resumen.ClientesMora;
                            totalAnulados += resumen.Anulados;
                            totalPagado += resumen.Valor;
                            totalComisiones += resumen.Comision;
                            //Total
                            $('#TotalClientesActivos').text(totalActivos);
                            $('#TotalClientesMora').text(totalMora);
                            $('#TotalClientesAnulados').text(totalAnulados);
                            $('#TotalClientesValor').text(totalPagado);
                            $('#TotalClientesComisión').text(totalComisiones);
                        },
                        function () { });
                }
                if (listPlanes[i] == 'COR') {
                    var producto = new Array<string>();
                    producto.push("COR");
                    filtro.lstProductos = producto;
                    //get$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(UsuarioLogueado.IdCorredor, FiltroHasta, "IND",
                    post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro,
                        function (res: Msg) {
                            var resumen: PC_ResumenEjecutivo = res.Datos;
                            //Corporativo
                            $('#CorporativoClientesActivos').text(resumen.ClientesActivos);
                            $('#CorporativoClientesMora').text(resumen.ClientesMora);
                            $('#CorporativoClientesAnulados').text(resumen.Anulados);
                            $('#CorporativoClientesValor').text(resumen.Valor);
                            $('#CorporativoClientesComisión').text(resumen.Comision);
                            $('#seccionCorp').show();
                            //sumo los valores
                            totalActivos += resumen.ClientesActivos;
                            totalMora += resumen.ClientesMora;
                            totalAnulados += resumen.Anulados;
                            totalPagado += resumen.Valor;
                            totalComisiones += resumen.Comision;
                            //Total
                            $('#TotalClientesActivos').text(totalActivos);
                            $('#TotalClientesMora').text(totalMora);
                            $('#TotalClientesAnulados').text(totalAnulados);
                            $('#TotalClientesValor').text(totalPagado);
                            $('#TotalClientesComisión').text(totalComisiones);
                        },
                        function () { });
                }
                if (listPlanes[i] == 'POO') {
                    var producto = new Array<string>();
                    producto.push("POO");
                    filtro.lstProductos = producto;
                    //get$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(UsuarioLogueado.IdCorredor, FiltroHasta, "IND",
                    post$CorredoresResumenEjecutivoController$CorredoresResumenEjecutivoProducto(filtro,
                        function (res: Msg) {
                            var resumen: PC_ResumenEjecutivo = res.Datos;
                            //Corporativo
                            $('#PoolClientesActivos').text(resumen.ClientesActivos);
                            $('#PoolClientesMora').text(resumen.ClientesMora);
                            $('#PoolClientesAnulados').text(resumen.Anulados);
                            $('#PoolClientesValor').text(resumen.Valor);
                            $('#PoolClientesComisión').text(resumen.Comision);
                            $('#seccionPool').show();
                            //sumo los valores
                            totalActivos += resumen.ClientesActivos;
                            totalMora += resumen.ClientesMora;
                            totalAnulados += resumen.Anulados;
                            totalPagado += resumen.Valor;
                            totalComisiones += resumen.Comision;
                            //Total
                            $('#TotalClientesActivos').text(totalActivos);
                            $('#TotalClientesMora').text(totalMora);
                            $('#TotalClientesAnulados').text(totalAnulados);
                            $('#TotalClientesValor').text(totalPagado);
                            $('#TotalClientesComisión').text(totalComisiones);
                        },
                        function () { });
                }                
            }
        }

    }
    //TODO: PARA CARGA INICIAL
    $('#dt_Hasta').data('kendoDatePicker').value(new Date());
    var totalActivos = 0;
    var totalMora = 0;
    var totalAnulados = 0;
    var totalPagado = 0;
    var totalComisiones = 0;
    var planes = UsuarioLogueado.PermisoPlan;
    
});