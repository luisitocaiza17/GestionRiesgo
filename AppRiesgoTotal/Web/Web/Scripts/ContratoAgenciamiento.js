head.ready(function () {
    var UsuarioLogueado = UsuarioSesion();
    var listaBrokers = new Array();
    var listasSeleccion;
    var generalListas;
    $('#btn_SeleccionarAgentes').kendoButton();
    $('#btn_AceptarGrupoAgentes').kendoButton();
    $("#ventana_GrupoAgentes").kendoWindow({
        width: "950px",
        height: "550px",
        title: "Seleccionar Listas",
        modal: true
    }).data("kendoWindow");
    ///verifico si es brokers o grupo de brokers
    if (UsuarioLogueado.CodigoGrupoAgentes == null || UsuarioLogueado.CodigoGrupoAgentes == undefined || UsuarioLogueado.CodigoGrupoAgentes == 0 || UsuarioLogueado.rol[0].Id == 1 || UsuarioLogueado.rol[0].Id == 3) {
        listaBrokers.push(UsuarioLogueado.IdCorredor);
        $('#seccionBroker').hide();
    }
    else {
        get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaPorGrupoAgentes(UsuarioLogueado.CodigoGrupoAgentes, function (res) {
            $('#seccionBroker').show();
            var lst = res.Datos;
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
        }, function () { });
    }
    Loading_Hide();
    $('#btn_SeleccionarAgentes').click(function () {
        $("#ventana_GrupoAgentes").data('kendoWindow').center().open();
    });
    $('#btn_AceptarGrupoAgentes').click(function () {
        $("#lbl_GrupoAgentes").val(">>" + $("#grid_GrupoAgentes").data('kendoGrid').selectedKeyNames().length + " items seleccionados");
        //proceso de seleccion de listas
        var sl = $("#grid_GrupoAgentes").data('kendoGrid').selectedKeyNames();
        listasSeleccion = new Array();
        listaBrokers = new Array();
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
    $('#btn_DescargarContrato').kendoButton();
    $('#btn_DescargarContrato').click(function () {
        if (listaBrokers.length == 0)
            return alert('Se debe seleccionar al menos un broker');
        for (let br of listaBrokers) {
            get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaCorredorPorCodigo(br, function (res) {
                var resumen = res.Datos;
                // convert base64 string to byte array
                if (resumen.contratoAgenciamiento == undefined || resumen.contratoAgenciamiento == null) {
                    return alert('El contrato de agenciamiento del broker ' + br + ' no se encuentra subido.');
                }
                var byteCharacters = atob(resumen.contratoAgenciamiento);
                var byteNumbers = new Array(byteCharacters.length);
                for (var i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                // now that we have the byte array, construct the blob from it
                var blob1 = new Blob([byteArray], { type: "application/octet-stream" });
                var fileName1 = "Portal_Brokers_Contraro_Agenciamiento.pdf";
                saveAs(blob1, fileName1);
                // saving text file
                //var blob2 = new Blob(["cool"], { type: "text/plain" });
                //var fileName2 = "cool.txt";
                //saveAs(blob2, fileName2);
            }, function () { });
        }
    });
});
//# sourceMappingURL=ContratoAgenciamiento.js.map