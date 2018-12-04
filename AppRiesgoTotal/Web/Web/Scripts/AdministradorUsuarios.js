/// <reference path="../js/kendoui/typescript/kendo.all.d.ts" />
head.ready(function () {
    var UsuarioLogueado = UsuarioSesion();
    //Registro estadistiva
    RegistroEstadistica(5);
    var persona;
    var personaExl;
    var titular;
    var seccionCambio;
    var proceso = '';
    var listCob;
    //variables Globalaes
    var permisosGlobal;
    var permisosAlmacenarGlobal;
    var idUsuario;
    var IdCorredorSeleccionado;
    //Inicializacion
    $('#detalleUsuarios').hide();
    $("#butGuardar").kendoButton();
    $("#butNuevo").kendoButton();
    $("#butCancelar").kendoButton();
    $("#butEliminar").kendoButton();
    $('#cedula').val('');
    $('#nombres').val('');
    $('#email').val('');
    $('#celular').val('');
    $('#telefono').val('');
    $('#extension').val('');
    $('#telefono').kendoMaskedTextBox({
        mask: "(99) 000-0000"
    });
    $('#celular').kendoMaskedTextBox({
        mask: "(99) 0000-0000"
    });
    $("#region").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Seleccione", value: null },
            { text: "Sierra", value: "Sierra" },
            { text: "Costa", value: "Costa" },
            { text: "Austro", value: "Austro" }
        ],
        filter: "contains",
        suggest: true,
        index: -1
    });
    //seccion administracion de grupos
    var UsuarioLogueado = UsuarioSesion();
    var listaBrokers = new Array();
    var listasSeleccion;
    var generalListas;
    $('#btn_SeleccionarAgentes').kendoButton();
    $('#btn_AceptarGrupoAgentes').kendoButton();
    $("#ventana_GrupoAgentes").kendoWindow({
        width: "950px",
        height: "550px",
        title: "Seleccionar Brokers",
        modal: true
    }).data("kendoWindow");
    ///verifico si es brokers o grupo de brokers
    if (UsuarioLogueado.CodigoGrupoAgentes == null || UsuarioLogueado.CodigoGrupoAgentes == undefined || UsuarioLogueado.CodigoGrupoAgentes == 0 || UsuarioLogueado.rol[0].Id == 1 || UsuarioLogueado.rol[0].Id == 3) {
        listaBrokers.push(UsuarioLogueado.IdCorredor);
        //llamo directamente a la busqueda de usuarios
        //opciones coberturas
        Loading_Hide(true);
        get$rol$CorredoresObtenerRoles(function (res) {
            //cargamos los permisos
            get$usuario$CorredoresObtenerPermisosActivos(function (res) {
                CargarGridUsuarios();
                var tablaPermisos = $('#adminCoberturas');
                var data = res.Datos;
                permisosGlobal = data.filter(p => p.Seleccionable == true);
                var htmltable;
                for (let d of permisosGlobal) {
                    htmltable += '<tr><td><input type="checkbox" id=\'check_' + d.IDPermiso + '\'><td/><td>' + d.Nombre + '</td></tr>';
                }
                tablaPermisos.append(htmltable);
            }, function () { });
            var data = res.Datos;
            $("#rolPerson").kendoDropDownList({
                dataSource: data,
                dataTextField: "Nombre",
                dataValueField: "Id",
                animation: false,
                maxSelectedItems: 1,
                value: ["1"]
            });
        }, function () { });
    }
    else {
        //Es de grupo asi que busco los agentes
        get$CorredoresAgenteVenta$CorredoresObtenerAgentesVentaPorGrupoAgentes(UsuarioLogueado.CodigoGrupoAgentes, function (res) {
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
            $("#ventana_GrupoAgentes").data('kendoWindow').center().open();
            Loading_Hide(true);
        }, function () { });
    }
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
        if (listaBrokers.length == 0)
            return alert('debe seleccionar al menos un broker');
        //fin proceso
        $("#ventana_GrupoAgentes").data('kendoWindow').close();
        //cargo los usuarios
        //opciones coberturas
        get$rol$CorredoresObtenerRoles(function (res) {
            //cargamos los permisos
            get$usuario$CorredoresObtenerPermisosActivos(function (res) {
                CargarGridUsuariosGrupo();
                var tablaPermisos = $('#adminCoberturas');
                var data = res.Datos;
                permisosGlobal = data.filter(p => p.Seleccionable == true);
                var htmltable;
                for (let d of permisosGlobal) {
                    htmltable += '<tr><td><input type="checkbox" id=\'check_' + d.IDPermiso + '\'><td/><td>' + d.Nombre + '</td></tr>';
                }
                tablaPermisos.append(htmltable);
            }, function () { });
            var data = res.Datos;
            $("#rolPerson").kendoDropDownList({
                dataSource: data,
                dataTextField: "Nombre",
                dataValueField: "Id",
                animation: false,
                maxSelectedItems: 1,
                value: ["1"]
            });
        }, function () { });
    });
    var lstUsuarios = new Array();
    $('#gridUsuarios').kendoGrid({
        dataSource: {
            data: lstUsuarios,
            schema: {
                model: {
                    id: "Id",
                    fields: {
                        Id: { type: "number" },
                        NombreApellido: { type: "string" },
                        Email: { type: "string" },
                        Telefono: { type: "string" },
                        NombreUsuario: { type: "string" },
                        Contrasena: { type: "string" },
                        IdEmpresa: { type: "number" },
                        IdGrupo: { type: "number" },
                        TelefonoFijo: { type: "string" },
                        Extension: { type: "string" },
                        RucEmpresa: { type: "string" },
                        Estado: { type: "number" },
                        TerminosCondicionesAprobado: { type: "number" },
                        Region: { type: "string" },
                    }
                }
            },
            pageSize: 5
        },
        height: 500,
        scrollable: true,
        sortable: true,
        groupable: false,
        persistSelection: true,
        filterable: true,
        pageable: true,
        selectable: false,
        columns: [
            { field: "IdCorredor", title: "Id Broker", width: "150px", filterable: { multi: true, search: true } },
            { field: "Cedula", title: "Cédula", width: "150px", filterable: { multi: true, search: true } },
            { field: "NombreApellido", title: "Nombres y Apellidos", width: "200px", filterable: { multi: true, search: true } },
            //{ field: "NombreUsuario", title: "Nombre de Usuario", width: "250px", filterable: { multi: true, search: true } },
            { field: "Telefono", title: "Teléfono", width: "100px", filterable: { multi: true, search: true } },
            { field: "TelefonoFijo", title: "Teléfono Fijo", width: "100px", filterable: { multi: true, search: true } },
            { command: { text: "Editar", click: EditarRegistro }, title: "Editar", width: "100px" },
            { command: { text: "Regenerar clave", click: RegenerarClave }, title: "Reseteo Clave", width: "150px" }
        ]
    });
    function CargarGridUsuarios() {
        var IdEmpresaFiltro = UsuarioLogueado.IdCorredor;
        // LLENADO DE GRILLA DE SELECCIÓN DE LISTAS
        get$usuario$CorredoresObtenerUsuariosActivosPorEmpresa(IdEmpresaFiltro, function (res) {
            var data = res.Datos;
            $('#gridUsuarios').data('kendoGrid').dataSource.data(data);
            //cargamos la grilla de usuarios
            $('#tablaUsuairos').show();
        }, function () { });
    }
    function CargarGridUsuariosGrupo() {
        var data = new Array();
        //recorremos los brokers
        for (let br of listaBrokers) {
            // LLENADO DE GRILLA DE SELECCIÓN DE LISTAS
            get$usuario$CorredoresObtenerUsuariosActivosPorEmpresa(br, function (res) {
                //recorremos y vamos cargando la grid
                var dataR = res.Datos;
                for (let d of dataR) {
                    data.push(d);
                }
                $('#gridUsuarios').data('kendoGrid').dataSource.data(data);
            }, function () { });
            //cargamos la grilla de usuarios
            $('#tablaUsuairos').show();
        }
    }
    /**PROCESOS**/
    $("#checkTODOS").change(function () {
        if (this.checked) {
            $('#checkInd').prop('checked', true);
            $('#checkExp').prop('checked', true);
            $('#checkSmar').prop('checked', true);
            $('#checkOnc').prop('checked', true);
            $('#checkCor').prop('checked', true);
            $('#checkPool').prop('checked', true);
            $('#checkGrupal').prop('checked', true);
        }
        else {
            $('#checkInd').prop('checked', false);
            $('#checkExp').prop('checked', false);
            $('#checkSmar').prop('checked', false);
            $('#checkOnc').prop('checked', true);
            $('#checkCor').prop('checked', false);
            $('#checkPool').prop('checked', false);
            $('#checkGrupal').prop('checked', false);
        }
    });
    $('#butGuardar').click(function () {
        var usuario = new PC_UsuarioRol_Result();
        permisosAlmacenarGlobal = new Array();
        for (let obj of permisosGlobal) {
            if ($('#check_' + obj.IDPermiso).prop('checked')) {
                var object = new PC_Permiso_Result();
                object.IDPermiso = obj.IDPermiso;
                permisosAlmacenarGlobal.push(object);
            }
        }
        if (permisosAlmacenarGlobal === undefined || permisosAlmacenarGlobal.length === 0) {
            alert('El usuario debe tener al menos un Permiso');
            return false;
        }
        else {
            usuario.permiso = permisosAlmacenarGlobal;
        }
        var cedula = $('#cedula').val();
        if (cedula === undefined || cedula === '') {
            alert('El número de identificación no puede estar vacío');
            return false;
        }
        else {
            usuario.Cedula = cedula;
        }
        var nombres = $('#nombres').val();
        if (nombres === undefined || nombres === '') {
            alert('Los nombres no pueden estar vacíos');
            return false;
        }
        else {
            usuario.NombreApellido = nombres;
        }
        var email = $('#email').val();
        if (email === undefined || email === '') {
            alert('El Email no puede estar vacío');
            return false;
        }
        else {
            usuario.Email = email;
        }
        if (validarEmail(email) == false)
            return alert("El formato de Email es incorrecto.");
        var Telefono = $('#telefono').val();
        if (Telefono === undefined || Telefono === '' || GetRawfromMasked('telefono') == '') {
            alert('El Teléfono no puede estar vacío');
            return false;
        }
        else {
            usuario.TelefonoFijo = GetRawfromMasked('telefono');
        }
        var celular = $('#celular').val();
        if (celular === undefined || celular === '' || GetRawfromMasked('celular') == '') {
            alert('El celular no puede estar vacío');
            return false;
        }
        else {
            usuario.Telefono = GetRawfromMasked('celular');
        }
        usuario.NombreUsuario = cedula; // El nombre de usuario es la misma identificación
        usuario.Contrasena = cedula; // Se genera en el servidor, se envía al correo registrado
        usuario.Extension = $('#extension').val(); //agregamos la extension
        usuario.IdGrupo = UsuarioLogueado.IdGrupo; // se ata al mismo grupo de la persona de sesión
        usuario.RucEmpresa = UsuarioLogueado.RucEmpresa; // se ata a la misma empresa de la sesion
        usuario.Region = $('#region').val();
        //recorro los permisos sobre los planes
        var planes = '';
        if ($('#checkInd').prop('checked')) {
            planes += 'IND;';
        }
        if ($('#checkExp').prop('checked')) {
            planes += 'XPR;';
        }
        if ($('#checkOnc').prop('checked')) {
            planes += 'ONC;';
        }
        if ($('#checkSmar').prop('checked')) {
            planes += 'SMAR;';
        }
        if ($('#checkCor').prop('checked')) {
            planes += 'COR;';
        }
        if ($('#checkPool').prop('checked')) {
            planes += 'POO;';
        }
        if ($('#checkGrupal').prop('checked')) {
            planes += 'GRUPAL;';
        }
        usuario.PermisoPlan = planes;
        var Roles = new Array();
        var elRol = new PC_Rol_Result();
        elRol.Id = $('#rolPerson').val();
        elRol.Nombre = $('#rolPerson').data("kendoDropDownList").text();
        Roles.push(elRol);
        usuario.rol = Roles; //agregamos los roles
        if (idUsuario !== undefined && idUsuario !== 0)
            usuario.Id = idUsuario; //agregi id de usuario
        else {
            usuario.Id = 0;
            if (UsuarioLogueado.CodigoGrupoAgentes == null || UsuarioLogueado.CodigoGrupoAgentes == undefined || UsuarioLogueado.CodigoGrupoAgentes == 0 || UsuarioLogueado.rol[0].Id == 1 || UsuarioLogueado.rol[0].Id == 3) {
            }
            else {
                IdCorredorSeleccionado = $("#selectBroker").val();
            }
        }
        usuario.IdCorredor = IdCorredorSeleccionado; // agregamos la empresa
        //ws de guardado        
        post$usuario$CorredoresGrabarUsuarioCorp(usuario, function (res) {
            if (idUsuario !== undefined && idUsuario !== 0)
                alert('Usuario actualizado correctamente');
            else
                alert('Usuario creado correctamente');
            if (UsuarioLogueado.CodigoGrupoAgentes == null || UsuarioLogueado.CodigoGrupoAgentes == undefined || UsuarioLogueado.CodigoGrupoAgentes == 0 || UsuarioLogueado.rol[0].Id == 1 || UsuarioLogueado.rol[0].Id == 3) {
                CargarGridUsuarios();
            }
            else {
                CargarGridUsuariosGrupo();
            }
            $('#tablaUsuairos').show();
            $('#detalleUsuarios').hide();
            //habilitamos botones modal
            $('#but_guardar_permisos').show();
            $('#but_cancelar_permisos').show();
            $('#but_permisos_regresar').hide();
        }, function () { });
    });
    $('#butCancelar').click(function () {
        if (UsuarioLogueado.CodigoGrupoAgentes == null || UsuarioLogueado.CodigoGrupoAgentes == undefined || UsuarioLogueado.CodigoGrupoAgentes == 0 || UsuarioLogueado.rol[0].Id == 1 || UsuarioLogueado.rol[0].Id == 3) {
            CargarGridUsuarios();
        }
        else {
            CargarGridUsuariosGrupo();
        }
        $('#tablaUsuairos').show();
        $('#detalleUsuarios').hide();
        //habilitamos botones modal
        $('#but_guardar_permisos').show();
        $('#but_cancelar_permisos').show();
        $('#but_permisos_regresar').hide();
    });
    $("#butEliminar").click(function () {
        Confirmation("Está seguro de eliminar el usuario seleccionado?", function () {
            if (idUsuario !== undefined && idUsuario !== 0) {
                get$usuario$CorredoresEliminarUsuario(idUsuario, function (res) {
                    if (res.Datos == true) {
                        alert('Se ha eliminado el usuario satisfactoriamente.');
                        if (UsuarioLogueado.CodigoGrupoAgentes == null || UsuarioLogueado.CodigoGrupoAgentes == undefined || UsuarioLogueado.CodigoGrupoAgentes == 0 || UsuarioLogueado.rol[0].Id == 1 || UsuarioLogueado.rol[0].Id == 3) {
                            CargarGridUsuarios();
                        }
                        else {
                            CargarGridUsuariosGrupo();
                        }
                        $('#tablaUsuairos').show();
                        $('#detalleUsuarios').hide();
                        //habilitamos botones modal
                        $('#but_guardar_permisos').show();
                        $('#but_cancelar_permisos').show();
                        $('#but_permisos_regresar').hide();
                    }
                    else {
                        alert('Ha ocurrido un problema en la eliminación del usuario seleccionado.');
                    }
                }, function () { });
            }
            else {
                alert('Es necesario elegir un usuario para eliminar');
            }
        }, function () {
            //alert('no');
        });
    });
    $('#butNuevo').click(function () {
        idUsuario = 0;
        //mostramos combo y lo cargamos
        if (UsuarioLogueado.CodigoGrupoAgentes == null || UsuarioLogueado.CodigoGrupoAgentes == undefined || UsuarioLogueado.CodigoGrupoAgentes == 0 || UsuarioLogueado.rol[0].Id == 1 || UsuarioLogueado.rol[0].Id == 3) {
            $("#GrupoBoker").hide();
            IdCorredorSeleccionado = UsuarioLogueado.IdCorredor;
        }
        else {
            $("#GrupoBoker").show();
            $("#selectBroker").kendoDropDownList({
                dataSource: {
                    data: generalListas
                },
                dataTextField: "Nombre",
                dataValueField: "Codigo",
                animation: false,
                maxSelectedItems: 1,
                value: [1]
            });
        }
        $('#tablaUsuairos').hide();
        $('#detalleUsuarios').show();
        $('#cedula').val('');
        $('#nombres').val('');
        $('#email').val('');
        $('#celular').val('');
        $('#telefono').val('');
        $('#extension').val('');
        $('#rolPerson').data('kendoDropDownList').value(-1);
        $('#region').data('kendoDropDownList').value(-1);
        $("#butEliminar").hide();
        //$('#nombreUsuariosN').val('');
        //$('#constraseniaN').val('');
        var htmltable;
        for (let d of permisosGlobal) {
            $('#check_' + d.IDPermiso).prop('checked', false);
        }
        //habilitamos botones modal
        $('#but_guardar_permisos').show();
        $('#but_cancelar_permisos').show();
        $('#but_permisos_regresar').hide();
    });
    function RegenerarClave(e) {
        e.preventDefault();
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        Confirmation("Esta acción enviará un correo electrónico al usuario con una nueva contraseña. Está seguro de proceder con el reseteo de clave?", function () {
            get$usuario$CorredoresResetearClaveUsuarioPorID(dataItem.Id, function (res) {
                var data = res.Datos;
                if (data == true) {
                    alert('Se ha enviado una nueva contraseña al correo electrónico registrado.');
                }
                else {
                    alert('Ha ocurrido un problema al generar la nueva contraseña.');
                }
            }, function () { });
        }, function () {
            //alert('no');
        });
    }
    function EditarRegistro(e) {
        e.preventDefault();
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        IdCorredorSeleccionado = dataItem.IdCorredor;
        //habilitamos botones modal
        $('#but_guardar_permisos').show();
        $('#but_cancelar_permisos').show();
        $('#but_permisos_regresar').hide();
        $("#butEliminar").show();
        //mostramos combo y lo cargamos
        if (UsuarioLogueado.CodigoGrupoAgentes == null || UsuarioLogueado.CodigoGrupoAgentes == undefined || UsuarioLogueado.CodigoGrupoAgentes == 0 || UsuarioLogueado.rol[0].Id == 1 || UsuarioLogueado.rol[0].Id == 3) {
            $("#GrupoBoker").hide();
            IdCorredorSeleccionado = UsuarioLogueado.IdCorredor;
        }
        else {
            $("#GrupoBoker").show();
            $("#selectBroker").kendoDropDownList({
                dataSource: {
                    data: generalListas
                },
                dataTextField: "Nombre",
                dataValueField: "Codigo",
                animation: false,
                maxSelectedItems: 1,
                value: [1]
            });
        }
        $('#tablaUsuairos').hide();
        $('#cedula').val(dataItem.Cedula);
        $('#nombres').val(dataItem.NombreApellido);
        $('#email').val(dataItem.Email);
        $('#celular').data('kendoMaskedTextBox').value(dataItem.Telefono);
        $('#telefono').data('kendoMaskedTextBox').value(dataItem.TelefonoFijo);
        $('#extension').val(dataItem.Extension);
        $('#region').data('kendoDropDownList').value(dataItem.Region);
        idUsuario = dataItem.Id;
        $('#detalleUsuarios').show();
        //cargo los permisos del usuario especifico
        // Cargo el rol
        $('#rolPerson').data('kendoDropDownList').value(dataItem.rol[0].Id);
        //primero limpio los checks
        for (let d of permisosGlobal) {
            $('#check_' + d.IDPermiso).prop('checked', false);
        }
        //limpio los planes
        $('#checkInd').prop('checked', false);
        $('#checkExp').prop('checked', false);
        $('#checkSmar').prop('checked', false);
        $('#checkOnc').prop('checked', false);
        $('#checkCor').prop('checked', false);
        $('#checkPool').prop('checked', false);
        $('#checkGrupal').prop('checked', false);
        //lleno los permisos de plan
        var planes = dataItem.PermisoPlan;
        if (planes != null && planes.length > 0) {
            var listPlanes = planes.split(';');
            for (var i = 0; i < listPlanes.length - 1; i++) {
                if (listPlanes[i] == 'IND')
                    $('#checkInd').prop('checked', true);
                if (listPlanes[i] == 'XPR')
                    $('#checkExp').prop('checked', true);
                if (listPlanes[i] == 'SMAR')
                    $('#checkSmar').prop('checked', true);
                if (listPlanes[i] == 'ONC')
                    $('#checkOnc').prop('checked', true);
                if (listPlanes[i] == 'COR')
                    $('#checkCor').prop('checked', true);
                if (listPlanes[i] == 'POO')
                    $('#checkPool').prop('checked', true);
                if (listPlanes[i] == 'GRUPAL')
                    $('#checkGrupal').prop('checked', true);
            }
        }
        //lleno los check
        get$usuario$CorredoresObtenerPermisosUsuarioPorID(dataItem.Id, function (res) {
            var data = res.Datos;
            for (let d of data) {
                $('#check_' + d.IDPermiso).prop('checked', true);
            }
        }, function () { });
    }
    function validarEmail(valor) {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
            return true;
        }
        else {
            return false;
        }
    }
});
//# sourceMappingURL=AdministradorUsuarios.js.map