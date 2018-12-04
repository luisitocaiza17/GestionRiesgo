head.ready(function () {
    var UsuarioLogueado = UsuarioSesion();
    var agenteListaInicial = new ContratoEntityFilter();
    $("#tabstrip").kendoTabStrip({
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });
    //verificamos si es un grupo
    if (UsuarioLogueado.CodigoGrupoAgentes == null || UsuarioLogueado.CodigoGrupoAgentes == undefined || UsuarioLogueado.CodigoGrupoAgentes == 0 || UsuarioLogueado.rol[0].Id == 1 || UsuarioLogueado.rol[0].Id == 3) {
        agenteListaInicial.Brokers = [UsuarioLogueado.IdCorredor];
        post$CorredoresAgenteVenta$ConsultarEmpresasPorAgente(agenteListaInicial, function (res) {
            var Empresas = res.Datos;
            if (Empresas.length == 0)
                return alert('El borker no tiene contratos smartplan');
            $('#OpcionesBusquedaEmpresas').kendoDropDownList({
                dataTextField: "RazonSocial",
                dataValueField: "Numero",
                dataSource: Empresas,
                optionLabel: "Seleccione una empresa..",
                change: onSelect
            });
        }, function () { });
    }
    else {
        get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaPorGrupoAgentes(UsuarioLogueado.CodigoGrupoAgentes, function (res) {
            var lst = res.Datos;
            var brokers = new Array();
            for (var o of lst) {
                brokers.push(o.Codigo);
            }
            agenteListaInicial.Brokers = brokers;
            //reviso llamo al servicio que llama al listado de empresas
            post$CorredoresAgenteVenta$ConsultarEmpresasPorAgente(agenteListaInicial, function (res) {
                var Empresas = res.Datos;
                if (Empresas.length == 0)
                    return alert('El borker no tiene contratos smartplan');
                $('#OpcionesBusquedaEmpresas').kendoDropDownList({
                    dataTextField: "RazonSocial",
                    dataValueField: "Numero",
                    dataSource: Empresas,
                    change: onSelect
                });
            }, function () { });
        }, function () { });
    }
    function onSelect() {
        LoadGrids();
    }
    //cargamos grilla inicial
    function LoadGrids() {
        var selecionado = $("#OpcionesBusquedaEmpresas").data("kendoDropDownList").value();
        if (selecionado == undefined || selecionado == null || selecionado === '') {
            return alert('Debe seleccionar un broker');
        }
        get$masivo$ObtenerConsolidadoRegistrosCarga(Number(selecionado), function (result) {
            var estadisticaGeneral = result.Datos;
            var colores = rainbow();
            $("#pie_Activacion").kendoChart({
                title: {
                    position: "top",
                    text: "Colaboradores activos versus colaboradores pendientes de activación."
                },
                legend: {
                    visible: false
                },
                chartArea: {},
                seriesDefaults: {
                    labels: {
                        visible: true,
                        template: "#= (category=='Enrolados')? 'Activados': category #: #= (percentage * 100).toFixed(2) # %"
                    }
                },
                series: [{
                        type: "pie",
                        startAngle: 0,
                        data: [{
                                category: "Enrolados",
                                value: estadisticaGeneral.TotalCompletaronEnrolamiento,
                                percentage: (estadisticaGeneral.TotalCompletaronEnrolamiento / (estadisticaGeneral.TotalCompletaronEnrolamiento + estadisticaGeneral.TotalNoCompletaronEnrolamiento)),
                                explode: true,
                                color: "#2196f3"
                            }, {
                                category: "Pendientes",
                                value: estadisticaGeneral.TotalNoCompletaronEnrolamiento,
                                percentage: (estadisticaGeneral.TotalNoCompletaronEnrolamiento / (estadisticaGeneral.TotalCompletaronEnrolamiento + estadisticaGeneral.TotalNoCompletaronEnrolamiento)),
                                explode: true,
                                color: "#034694"
                            }
                        ]
                    }],
                tooltip: {
                    visible: true,
                    format: "{0} personas"
                }
            });
        }, function () {
        });
        get$masivo$ObtenerRegistrosCargaPorEmpresa(Number(selecionado), function (result) {
            var lstEstadistica = result.Datos;
            lstEstadistica.forEach(function (v) {
                if (v.CompletadoEnrolamiento == undefined || v.CompletadoEnrolamiento == null || v.CompletadoEnrolamiento == false)
                    v.CompletadoEnrolamiento = false;
                if (v.CompletadoEnrolamiento == true)
                    v.CompletadoEnrolamiento = true;
                if (v.BloqueadoServicio == undefined || v.BloqueadoServicio == null || v.BloqueadoServicio == false)
                    v.BloqueadoServicio = false;
                if (v.BloqueadoServicio == true)
                    v.BloqueadoServicio = true;
            });
            var lstActivos = lstEstadistica.filter(r => r.CompletadoEnrolamiento == true);
            var lstPendientes = lstEstadistica.filter(r => r.CompletadoEnrolamiento == null || r.CompletadoEnrolamiento != true);
            if ($('#grid_DatosActivos').data().kendoGrid) {
                $('#grid_DatosActivos').data().kendoGrid.destroy();
                $('#grid_DatosActivos').empty();
            }
            $('#grid_DatosActivos').show();
            $("#grid_DatosActivos").kendoGrid({
                dataSource: {
                    data: lstActivos,
                    schema: {
                        model: {
                            fields: {
                                NumeroDocumento: { type: "string" },
                                Nombres: { type: "string" },
                                Apellidos: { type: "string" },
                                CompletadoEnrolamiento: { type: "boolean" },
                                BloqueadoServicio: { type: "boolean" }
                                //UnitPrice: { type: "number" },
                                //UnitsInStock: { type: "number" },
                            }
                        }
                    },
                    pageSize: 10,
                    sort: [{ field: "NombreProducto", dir: "asc" }, { field: "Apellidos", dir: "asc" }]
                },
                height: 500,
                scrollable: true,
                sortable: true,
                filterable: true,
                pageable: {
                    input: true,
                    numeric: false
                },
                columns: [
                    { field: "NumeroDocumento", title: "Nro. Documento", width: "140px", filterable: { multi: true, search: true } },
                    { field: "Nombres", title: "Nombre", width: "150px", filterable: { multi: true, search: true } },
                    { field: "Apellidos", title: "Apellido", width: "150px", filterable: { multi: true, search: true } },
                    { field: "NombreProducto", title: "Lista", width: "150px", filterable: { multi: true, search: true } },
                    {
                        field: "CompletadoEnrolamiento", title: "Estado", width: "100px",
                        template: kendo.template('# if (CompletadoEnrolamiento){ #ACTIVO#} else {#PENDIENTE#}#'),
                        filterable: {
                            multi: true, search: true,
                            itemTemplate: function (e) {
                                if (e.field == "all") {
                                    //handle the check-all checkbox template
                                    return "<div><label><strong><input type='checkbox' />#= all#</strong></label></div>";
                                }
                                else {
                                    //handle the other checkboxes
                                    return "<span><label><input type='checkbox' name='" + e.field + "' value='#=CompletadoEnrolamiento#'/><span># if (CompletadoEnrolamiento){ #ENROLADO#} else {#PENDIENTE#}#</span></label></span><br>";
                                }
                            }
                        }
                    },
                ]
            });
            //cargamos los pendientes
            if ($('#grid_DatosPendientes').data().kendoGrid) {
                $('#grid_DatosPendientes').data().kendoGrid.destroy();
                $('#grid_DatosPendientes').empty();
            }
            $('#grid_DatosPendientes').show();
            $("#grid_DatosPendientes").kendoGrid({
                dataSource: {
                    data: lstPendientes,
                    schema: {
                        model: {
                            fields: {
                                NumeroDocumento: { type: "string" },
                                Nombres: { type: "string" },
                                Apellidos: { type: "string" },
                                CompletadoEnrolamiento: { type: "boolean" },
                                BloqueadoServicio: { type: "boolean" }
                            }
                        }
                    },
                    pageSize: 10,
                    sort: [{ field: "NombreProducto", dir: "asc" }, { field: "Apellidos", dir: "asc" }]
                },
                height: 500,
                scrollable: true,
                sortable: true,
                filterable: true,
                pageable: {
                    input: true,
                    numeric: false
                },
                columns: [
                    { field: "NumeroDocumento", title: "Nro. Documento", width: "140px", filterable: { multi: true, search: true } },
                    { field: "Nombres", title: "Nombre", width: "140px", filterable: { multi: true, search: true } },
                    { field: "Apellidos", title: "Apellido", width: "140px", filterable: { multi: true, search: true } },
                    { field: "NombreProducto", title: "Lista", width: "140px", filterable: { multi: true, search: true } },
                    {
                        field: "CompletadoEnrolamiento", title: "Estado", width: "100px",
                        template: kendo.template('# if (CompletadoEnrolamiento){ #ACTIVO#} else {#PENDIENTE#}#'),
                        filterable: {
                            multi: true, search: true,
                            itemTemplate: function (e) {
                                if (e.field == "all") {
                                    //handle the check-all checkbox template
                                    return "<div><label><strong><input type='checkbox' />#= all#</strong></label></div>";
                                }
                                else {
                                    //handle the other checkboxes
                                    return "<span><label><input type='checkbox' name='" + e.field + "' value='#=CompletadoEnrolamiento#'/><span># if (CompletadoEnrolamiento){ #ACTIVO#} else {#PENDIENTE#}#</span></label></span><br>";
                                }
                            }
                        }
                    }
                ]
            });
        }, function () { });
    }
});
//# sourceMappingURL=EstadisticaActivacion.js.map