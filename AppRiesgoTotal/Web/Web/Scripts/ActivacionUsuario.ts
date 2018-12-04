/// <reference path="../Scripts/Init.ts" />

var IdEmpresa = 0;
var IdUsuario = 0;
var IdRegistro = 0;
var Cobertura = "";
var Infobase: Enrolamiento;

head.ready(function () {

    // Borrar versión final
    //$('#btn_msgOK').kendoButton();
    //$('#btn_msgNO').kendoButton();
    //$('#btn_msgOK').click(function () {
    //    sendMessage("OK");
    //});
    //$('#btn_msgNO').click(function () {
    //    sendMessage("NO");
    //});
    //
    // http://pruebas.nmcorporativo.saludsa.com.ec/PortalContratante/Views/ActivacionUsuario.html?p=NjExNDEsMTMwMyw5Njk2
    $('#btn_AgregarDependiente').kendoButton();
    $('#btn_Grabar').kendoButton();
    $('#grid_Dependientes').kendoGrid();
    $('#txt_FechaNacimiento').kendoDatePicker();
    $(".k-datepicker input").prop("readonly", true);
    $("#txt_Ciudad").kendoDropDownList();
    $("#txt_Ciudad").attr('readonly', true);
    $('#txt_TelefonoDomicilio').kendoMaskedTextBox({
        mask: "(99) 000-0000"
    });

    $('#txt_TelefonoCelular').kendoMaskedTextBox({
        mask: "(99) 0000-0000"
    });



    var p = getParameterByName("p");

    if (p == null || p == '') {
        $('#pnl_Editar').hide();
        $('#pnl_NoActivo').show();
        $('#pnl_YaConfigurado').hide();
        Loading_Hide();
        return;
    }



    // VALORES FIJOS
    //<option[value]="1" > Cuenta Corriente< /option>
    //    < option[value]="2" > Cuenta Ahorro< /option> 
    //        < option[value]="3" > Tarjeta < /option>
    //            < option[value]="4" > Pago Directo< /option>

    $("#cmb_TipoCuenta").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Cuenta Corriente", value: "1" },
            { text: "Cuenta Ahorros", value: "2" },
            { text: "Tarjeta", value: "3" },
            { text: "Pagos Directos", value: "4" }
        ],
        filter: "contains",
        suggest: true,
        index: -1
    });

    // VALORES FIJOS
    $("#txt_Parentesco").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Seleccione...", value: "0" },
            { text: "Cónyuge", value: "2" },
            { text: "Hijo", value: "3" }
        ],
        filter: "contains",
        suggest: true,
        index: 0
    });


    // VALORES FIJOS
    $("#txt_TipoIdentificacion").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Seleccione...", value: "0" },
            { text: "Cédula", value: "1" },
            { text: "Pasaporte", value: "2" }
        ],
        filter: "contains",
        suggest: true,
        index: 0,
        change: TipoChange
    });

    //VALORES  FIJOS
    $("#txt_Genero").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Seleccione...", value: "0" },
            { text: "Masculino", value: "1" },
            { text: "Femenino", value: "2" }
        ],
        filter: "contains",
        suggest: true,
        index: 0,
    });

    function CambioProvincia() {

        var IdProvincia = parseInt($("#txt_Provincia").data('kendoDropDownList').value().toString());
        post$divisionpolitica$ObtenerCiudadesPorIdProvincia(IdProvincia,
            function (result) {

                $("#txt_Ciudad").data('kendoDropDownList').value(-1);
                $("#txt_Ciudad").attr('readonly', false);

                $("#txt_Ciudad").kendoDropDownList({
                    dataTextField: "descripcionField",
                    dataValueField: "codigoField",
                    dataSource: result,
                    filter: "contains",
                    suggest: true,
                    index: -1
                });
            },
            function () { }
        );
    }

    var lstDependientes = new Array<Dependiente>();

    $("#grid_Dependientes").kendoGrid({
        dataSource: {
            data: lstDependientes,
            //schema: {
            //    model: {
            //        fields: {
            //            ProductName: { type: "string" },
            //            UnitPrice: { type: "number" },
            //            UnitsInStock: { type: "number" },
            //            Discontinued: { type: "boolean" }
            //        }
            //    }
            //},
            pageSize: 5,
            sort: { field: "Apellidos", dir: "asc" }
        },
        height: 400,
        scrollable: true,
        sortable: true,
        filterable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            { field: "Identificacion", title: "Identificación", width: "150px" },
            { field: "Nombres", title: "Nombres", width: "200px" },
            { field: "Apellidos", title: "Apellidos", width: "200px" },
            { field: "FechaNacimiento", title: "Fecha", template: '#= kendo.toString(kendo.parseDate(FechaNacimiento), "MM/dd/yyyy")#', width: "200px" },
            { field: "Parentesco", title: "Estado", template: kendo.template($('#ParentescoTemplate').html()), width: "100px" },
            { command: { text: "Quitar", click: QuitarRegistro, visible: function (dataItem) { return !Infobase.inclusiones[0].CompletadoEnrolamiento; } }, title: " ", width: "150px" }
        ]
    });

    //public TipoIdentificacion: string;
    //public Identificacion: string;
    //public Nombres: string;
    //public Apellidos: string;
    //public FechaNacimiento: Date;
    //public Parentesco: number; // 1 conyuge, 2 hijo

    function QuitarRegistro(e) {
        e.preventDefault();
        var dataItem = <Dependiente>this.dataItem($(e.currentTarget).closest("tr"));

        // si viene desde la base de datos, cargado de un enrolamiento anterior, no puede quitar al dependiente de la lista.
        // para quitar un dependiente anteriormente grabado, es necesario hacer un movimiento de exclusión, no por medio de esta pantalla
        if (dataItem.Anterior == true) {
            return alert('No se puede quitar un beneficiario anteriormente registrado. Es necesario realizar un movimiento para completar esta acción.');
        }

        // quito el registro de la lista
        lstDependientes = lstDependientes.filter(d => d.Identificacion != dataItem.Identificacion);

        // se recarga la grilla
        var grid = $("#grid_Dependientes").data("kendoGrid");
        grid.dataSource.data(lstDependientes);
        //grid.dataSource.query({
        //    page: 1,
        //    pageSize: 10
        //});
    }

    $('#btn_AgregarDependiente').click(function () {

        var dep = new Dependiente();

        dep.Identificacion = <string>$('#txt_Identificacion').val();
        dep.Parentesco = parseInt(<string>$('#txt_Parentesco').val());
        dep.TipoIdentificacion = <string>$("#txt_TipoIdentificacion").data('kendoDropDownList').value();
        dep.Anterior = false;

        // validaciones del formulario de ingreso de datos
        if (dep.TipoIdentificacion == "0" || dep.TipoIdentificacion == null || dep.TipoIdentificacion == "") {
            return alert('No se ha seleccionado el tipo de Identificación');
        }

        if ($("#txt_Identificacion").val() == "") {
            return alert('No se ha ingresado la identificación del beneficiario');
        }

        if ($('#lbl_Documento').html() == dep.Identificacion) {
            return alert('No se puede incorporar como beneficiario al mismo afiliado.');
        }



        if (dep.TipoIdentificacion == "2") { // SI ES PASAPORTE

            if ($("#txt_Nombres").val() == "") {
                return alert('No se ha ingresado los Nombres del beneficiario');
            }

            if ($("#txt_Apellidos").val() == "") {
                return alert('No se ha ingresado los Apellidos del beneficiario');
            }

            if ($("#txt_FechaNacimiento").val() == "") {
                return alert('No se ha ingresado la Fecha de Nacimiento del beneficiario');
            }
        }

        if (dep.Parentesco == 0 || dep.Parentesco == null) {
            return alert('No se ha ingresado el parentesco del beneficiario');
        }

        // Validación para saber si la persona que se está tratando de incluir como dependiente no esté como dependiente en otro titular de la misma lista
        get$beneficiario$ObtenerSiYaExisteBeneficiario(Infobase.inclusiones[0].EmpresaID, Infobase.inclusiones[0].SucursalID, $("#txt_Identificacion").val(),
            function (res: Msg) {  

                if (res.Datos == true) {
                    return alert("El beneficiario ingresado ya se encuentra registrado anteriormente para otra lista");
                }

                // Procedimiento para agregar a la lista.

                if (dep.TipoIdentificacion == "1") { // SI ES CÉDULA

                    // primero llamo al registro civil para ver si lo encuentra

                    post$registrocivil$ObtenerPersonaPorNumeroIdentificacion(<string>$('#txt_Identificacion').val(),
                        function (result: PersonaEntity) {
                             // si no encontró a la persona en el registro civil
                            if (result == null) {
                                return alert('No se ha encontrado a la persona con el numero de documento ingresado. Por favor verificar el tipo de documento / numero de  identificación y proceder nuevamente.');
                            }

                            dep.RC = result;
                            dep.Apellidos = (result.Primer_Apellido == null ? "" : result.Primer_Apellido) + " " + (result.Segundo_Apellido == null ? "" : result.Segundo_Apellido);
                            var fecha = new Date(result.Fecha_Nacimiento);
                            dep.FechaNacimiento = new Date(fecha.getUTCFullYear(), fecha.getUTCMonth(), fecha.getUTCDate());
                            dep.Nombres = (result.Primer_Nombre == null ? "" : result.Primer_Nombre) + " " + (result.Segundo_Nombre == null ? "" : result.Segundo_Nombre);


                            // validación de si puede ser insertado

                            // si ya contiene dicha identificación, no puede repetir
                            if (lstDependientes.filter(function (e: Dependiente) { return e.Identificacion == dep.Identificacion; }).length > 0) {
                                return alert('El beneficiario ingresado ya se encuentra registrado');
                            }

                            // no puede asegurarse un hijo de más de 25 años}
                            if (dep.Parentesco === 3 && gregorianAge(dep.FechaNacimiento) >= 25) {
                                return alert('No puede incluir un beneficiario que tenga 25 años o más. La persona ingresada tiene ' + gregorianAge(dep.FechaNacimiento).toString() + " años");
                            }

                            // No puede agregarse una persona de más de 70 años
                            //if (gregorianAge(dep.FechaNacimiento) >= 70) {
                            //    return alert('No puede agregarse una persona que tenga 70 años o más');
                            //}

                            // no puede haber más de un conyuge
                            if (dep.Parentesco === 2 && lstDependientes.filter(function (e: Dependiente) { return e.Parentesco === 2; }).length > 0) {
                                return alert('No puede agregarse más de un conyuge');
                            }

                            // no puede colocarse una fecha de nacimiento futura
                            if (dep.FechaNacimiento > new Date()) {
                                return alert('No puede definirse una fecha de nacimiento a futuro');
                            }

                            // SI ES A1, PUEDE AGREGAR SOLAMENTE 1, SI ES AA, NO LE APARECE, SI ES AF, PUEDE AGREGAR TANTOS COMO QUIERA
                            if (Cobertura == "AT") return alert('En una tarifa de afiliado solo no puede agregar beneficiarios');
                            if (Cobertura == "A1" && lstDependientes.length == 1) return alert('En una tarifa afiliado más uno, no se permite agregar más de un beneficiario');

                            lstDependientes.push(dep);

                            // se recarga la grilla
                            var grid = $("#grid_Dependientes").data("kendoGrid");
                            grid.dataSource.data(lstDependientes);

                            // Limpia los campos para que pueda agregarse uno nuevo
                            $('#txt_TipoIdentificacion').data('kendoDropDownList').value(0);
                            $('#txt_Identificacion').val('');
                            $('#txt_Parentesco').data('kendoDropDownList').value(0);
                            $('#txt_Nombres').val('');
                            $('#txt_Apellidos').val('');
                            $('#txt_FechaNacimiento').data('kendoDatePicker').value('');
                        },
                        function () {

                        });
                }
                else if (dep.TipoIdentificacion == "2") { // PASAPORTE

                    dep.Apellidos = (<string>$('#txt_Apellidos').val()).toUpperCase();
                    dep.FechaNacimiento = <Date>$('#txt_FechaNacimiento').data('kendoDatePicker').value();
                    dep.Nombres = (<string>$('#txt_Nombres').val()).toUpperCase();
                    if (dep.RC == undefined || dep.RC == null)
                        dep.RC = new PersonaEntity();
                    dep.RC.Genero = parseInt($('#txt_Genero').data('kendoDropDownList').value().toString());

                    // validación de si puede ser insertado

                    // si ya contiene dicha identificación, no puede repetir
                    if (lstDependientes.filter(function (e: Dependiente) { return e.Identificacion == dep.Identificacion; }).length > 0) {
                        return alert('El beneficiario ingresado ya se encuentra en la lista');
                    }

                    // no puede asegurarse un hijo de más de 25 años}
                    if (dep.Parentesco === 3 && gregorianAge(dep.FechaNacimiento) >= 25) {
                        return alert('No puede incluir un beneficiario que tenga 25 años o más. La persona ingresada tiene ' + gregorianAge(dep.FechaNacimiento).toString() + " años");
                    }

                    // No puede agregarse una persona de más de 70 años
                    //if (gregorianAge(dep.FechaNacimiento) >= 70) {
                    //    return alert('No puede agregarse una persona que tenga 70 años o más');
                    //}

                    // no puede haber más de un conyuge
                    if (dep.Parentesco === 2 && lstDependientes.filter(function (e: Dependiente) { return e.Parentesco === 2; }).length > 0) {
                        return alert('No puede agregarse más de un conyuge');
                    }

                    // no puede colocarse una fecha de nacimiento futura
                    if (dep.FechaNacimiento > new Date()) {
                        return alert('No puede definirse una fecha de nacimiento a futuro.');
                    }

                    // SI ES A1, PUEDE AGREGAR SOLAMENTE 1, SI ES AA, NO LE APARECE, SI ES AF, PUEDE AGREGAR TANTOS COMO QUIERA
                    if (Cobertura == "AT") return alert('En una tarifa de afiliado solo no puede agregar beneficiarios');
                    if (Cobertura == "A1" && lstDependientes.length == 1) return alert('En una tarifa  afiliado más uno, no se permite agregar más de un beneficiario');


                    lstDependientes.push(dep);

                    // se recarga la grilla
                    var grid = $("#grid_Dependientes").data("kendoGrid");
                    grid.dataSource.data(lstDependientes);


                    // Limpia los campos para que pueda agregarse uno nuevo
                    $('#txt_TipoIdentificacion').data('kendoDropDownList').value(0);
                    $('#txt_Identificacion').val('');
                    $('#txt_Parentesco').data('kendoDropDownList').value(0);
                    $('#txt_Nombres').val('');
                    $('#txt_Apellidos').val('');
                    $('#txt_FechaNacimiento').data('kendoDatePicker').value('');
                    $('#txt_Genero').data('kendoDropDownList').value(0);
                }

            },
            function () { });
    });


    function TipoChange() {

        if ($("#txt_TipoIdentificacion").val() == "0" || $("#txt_TipoIdentificacion").val() == "1") {
            $('#field_Nombres').hide();
            $('#field_Apellidos').hide();
            $('#field_FechaNacimiento').hide();
            $('#field_Genero').hide();

            $('#txt_Nombres').val('');
            $('#txt_Apellidos').val('');
            $('#txt_FechaNacimiento').data('kendoDatePicker').value('');
            $('#txt_Genero').data('kendoDropDownList').value(0);
        }
        else if ($("#txt_TipoIdentificacion").val() == "2") {
            $('#field_Nombres').show();
            $('#field_Apellidos').show();
            $('#field_FechaNacimiento').show();
            $('#field_Genero').show();

            $('#txt_Nombres').val('');
            $('#txt_Apellidos').val('');
            $('#txt_FechaNacimiento').data('kendoDatePicker').value('');
            $('#txt_Genero').data('kendoDropDownList').value(0);
        }
    }

    $('#btn_Grabar').click(function () {

        // Validaciones, ver que todo esté lleno
        var msgErrores = "";
        if ($('#txt_Provincia').data('kendoDropDownList') == null) {
            return alert('No se ha cargado el listado de provincias. Por favor refresque la pantalla y vuelva a intentar.');
        }
        if ($('#txt_Ciudad').data('kendoDropDownList') == null) {
            return alert('No se ha cargado el listado de ciudades. Por favor elija una provincia para que se despliegue la lista desplegable de ciudades.');
        }
        if ($('#cmb_Banco').data('kendoDropDownList') == null) {
            return alert('No se ha cargado el listado de Bancos. Por favor refresque la pantalla y vuelva a intentar.');
        }


        if ($('#txt_Provincia').data('kendoDropDownList').value() == "0" || $('#txt_Provincia').data('kendoDropDownList').value() == "" || $('#txt_Provincia').data('kendoDropDownList').value() == null) msgErrores += "No se ha llenado el campo de la provincia. \n";
        if ($('#txt_Ciudad').data('kendoDropDownList').value() == "0" || $('#txt_Ciudad').data('kendoDropDownList').value() == "" || $('#txt_Ciudad').data('kendoDropDownList').value() == null) msgErrores += "No se ha llenado el campo de la ciudad. \n";
        if ($('#txt_Sector').val() == "") msgErrores += "No se ha llenado el campo del sector \n";
        if ($('#txt_DireccionDomicilio').val() == "") msgErrores += "No se ha llenado el campo de la dirección del domicilio \n";
        if ($('#txt_Email').val() == "") msgErrores += "No se ha llenado el campo del Email Personal \n";
        if (!validateEmail($('#txt_Email').val())) msgErrores += "El correo electrónico no cumple el formato esperado \n";
        if ($('#txt_TelefonoDomicilio').val() == "" || GetRawfromMasked('txt_TelefonoDomicilio') == "") msgErrores += "No se ha llenado el campo del Teléfono del Domicilio \n";
        if ($('#txt_TelefonoCelular').val() == "") msgErrores += "No se ha llenado el campo del Teléfono Celular \n";
        if ($('#cmb_Banco').data('kendoDropDownList').value() == "0" || $('#cmb_Banco').data('kendoDropDownList').value() == "" || $('#cmb_Banco').data('kendoDropDownList').value() == null) msgErrores += "No se ha llenado el campo del Banco. \n";
        if ($('#cmb_TipoCuenta').data('kendoDropDownList').value() == "0" || $('#cmb_TipoCuenta').data('kendoDropDownList').value() == "" || $('#cmb_TipoCuenta').data('kendoDropDownList').value() == null) msgErrores += "No se ha llenado el campo del Tipo de Cuenta. \n";
        if ($('#txt_NumeroCuenta').val() == "") msgErrores += "No se ha llenado el campo del Número de Cuenta \n";
        if (GetRawfromMasked('txt_TelefonoDomicilio').length != 9) msgErrores += "El valor del teléfono de Domicilio está incompleto. Debe llenar el número con el código regional. \n";
        if (GetRawfromMasked('txt_TelefonoCelular').length != 10) msgErrores += "El valor del teléfono de Celular está incompleto. Debe llenar el número con el código regional. \n";


        // validaciones de dependientes, valida solo si es enrolamiento inicial
        if (Infobase.inclusiones[0].CompletadoEnrolamiento == false) {
            // si es AT solo uno, A1 más uno, AF varios
            if (Cobertura == "AT" && lstDependientes.length > 0) msgErrores += "No se puede agregar beneficiarios a un plan afiliado solo";
            if (Cobertura == "A1" && lstDependientes.length > 1) msgErrores += "No se puede agregar más de un beneficiario en un plan de afiliado más uno";
            if (Cobertura == "AF" && lstDependientes.length == 0) msgErrores += "El afiliado ha elegido el plan de afiliado más familia, sin embargo no ha llenado sus beneficiarios.";
        }

        // si hay errores
        if (msgErrores != "") {
            return alert(msgErrores);
        }

        // advertencias que no bloquean la grabación
        if (Cobertura == "A1" && lstDependientes.length == 0) {
            Confirmation("El plan contratado permite agregar un beneficiario, pero no se lo ha agregado en pantalla. Desea continuar sin agregarlo?",
                function () {
                    ProcederGrabacion();
                },
                function () {
                   // alert('no');
                });

            //kendo.confirm("El plan contratado permite agregar un dependiente, pero no se lo ha agregado en pantalla. Desea continuar sin agregarlo?").then(
            //    function () {
            //        ProcederGrabacion();
            //    }, function () {
            //        // si no acepta, detiene el proceso
            //        return;
            //    });
        }

        // advertencias que no bloquean la grabación
        else if (Cobertura == "AF" && lstDependientes.length == 0) {
            Confirmation("El plan contratado permite agregar varios beneficiarios, pero no se ha agregado ninguno en pantalla. Desea continuar sin agregarlos?",
                function () {
                    ProcederGrabacion();
                },
                function () {
                    //alert('no');
                });


            //kendo.confirm("El plan contratado permite agregar varios dependientes, pero no se ha agregado ninguno en pantalla. Desea continuar sin agregarlos?").then(
            //    function () {
            //        ProcederGrabacion();
            //    }, function () {
            //        // si no acepta, detiene el proceso
            //        return;
            //    });
        }

        // advertencias que no bloquean la grabación
        else if (Cobertura == "AF" && lstDependientes.length == 1) {
            Confirmation("El plan contratado permite dar cobertura a todas las personas de la familia, pero se ha agregado a una sola. Desea continuar de esta manera?",
                function () {
                    ProcederGrabacion();
                },
                function () {
                    //alert('no');
                });

            //kendo.confirm("El plan contratado permite dar cobertura a todas las personas de la familia, pero se ha agregado a una sola. Desea continuar de esta manera?").then(
            //    function () {
            //        ProcederGrabacion();
            //    }, function () {
            //        // si no acepta, detiene el proceso
            //        return;
            //    });
        }
        else {
            ProcederGrabacion();
        }

    });

    function ProcederGrabacion() {
        Confirmation("Está seguro de proceder el registro de los datos ingresados?",
            function () {
                var actualizacion = new EnrolamientoActualizacion();

                // lleno el objeto de actualización con los mismos datos consultados.
                actualizacion.inclusiones = Infobase.inclusiones;
                actualizacion.persona = Infobase.persona;
                actualizacion.idregistro = IdRegistro;

                // Procedimiento de grabación 

                // empieza actualizando los datos de la persona
                actualizacion.persona.Banco = $('#cmb_Banco').data('kendoDropDownList').value();
                actualizacion.persona.BancoCodigo = $('#cmb_Banco').data('kendoDropDownList').value();
                actualizacion.persona.direccion = $('#txt_DireccionDomicilio').val().toString();// + " " + $('#txt_Sector').val().toString();
                actualizacion.persona.email = $('#txt_Email').val().toString();
                actualizacion.persona.ciudad = $('#txt_Ciudad').data('kendoDropDownList').value();
                //datos.IdEmpresa = IdEmpresa; // en la inclusion viene, no haría falta cambiarlo
                actualizacion.persona.provincia = $('#txt_Provincia').data('kendoDropDownList').value();
                //datos.IdUsuario = IdUsuario; // no cambio
                actualizacion.persona.NumeroCuenta = $('#txt_NumeroCuenta').val().toString();
                actualizacion.persona.celular = GetRawfromMasked('txt_TelefonoCelular');
                actualizacion.persona.emailempresa = GetRawfromMasked('txt_TelefonoDomicilio'); //NO TENGO DONDE GRABAR EL TELÉFONO DEL DOMICILIO --- REVISAR
                actualizacion.persona.TipoCuenta = $('#cmb_TipoCuenta').data('kendoDropDownList').value();


                // Grabación de servicios adicionales
                if (Infobase.inclusiones[0].CompletadoEnrolamiento != true) { // no entra si es que ya ha hecho enrolamiento antes
                    if (Infobase.sucursal.Configuracion != undefined && Infobase.sucursal.Configuracion != null && Infobase.sucursal.Configuracion != '') {
                        var subSucursales = <Array<SubSucursal>>JSON.parse(Infobase.sucursal.Configuracion);

                        if (subSucursales != undefined && subSucursales != null) {

                            var dCOB = subSucursales.filter(function (s1) { return s1.opcional == true });

                            for (let i in dCOB) {
                                var id = dCOB[i].id.toString();

                                if ($('#chk_' + id).data('kendoMobileSwitch').check()) {
                                    var TarifaAct = "";
                                    if ($('#bt_' + id + '_Tarifa').data('kendoButtonGroup').current().index() == 0) {
                                        TarifaAct = "AT";
                                    }
                                    else if ($('#bt_' + id + '_Tarifa').data('kendoButtonGroup').current().index() == 1) {
                                        TarifaAct = "A1";
                                    }
                                    else if ($('#bt_' + id + '_Tarifa').data('kendoButtonGroup').current().index() == 2) {
                                        TarifaAct = "AF";
                                    }

                                    // Actualización de servicios adicionales
                                    var inc = new Inclusion();
                                    inc.CompletadoEnrolamiento = false;
                                    inc.ContratoNumero = 0;//Infobase.inclusiones[0].ContratoNumero; // Al atarse a otra lista, se supone que se creará otro número de contrato, ver parámetro en proceso de grabación
                                    inc.EmpresaID = Infobase.inclusiones[0].EmpresaID; // Es siempre la misma empresa de la inclusión inicial
                                    inc.FechaInclusion = new Date(); // revisar que en lógica se tome la fecha del servidor, se coloca la fecha actual
                                    inc.NombreSucursal = ""; // no se requiere nombre de sucursal para incluir, revisar proceso de actualización
                                    inc.Observacion = ""; // no debería copiarse de la inclusión inicial
                                    inc.PersonaNumero = Infobase.inclusiones[0].PersonaNumero; // es la misma persona que hizo la inclusion inicial
                                    inc.PlanID = TarifaAct; // toma la tarifa seleccionada en la pantalla (AT, A1 o AF)
                                    inc.Region = Infobase.inclusiones[0].Region; // Es siempre la misma región de la inclusion original
                                    inc.Resultados = new Array<string>(); // no debería copiarse de la inclusión inicial
                                    inc.SucursalID = dCOB[i].id;  // Id almacenado
                                    inc.Tipo = Infobase.inclusiones[0].Tipo; // Igual que inclusiòn inicial
                                    inc.TipoProducto = dCOB[i].plan;//Infobase.inclusiones[0].TipoProducto; // igual que inclusion inicial
                                    inc.Usuario = Infobase.inclusiones[0].Usuario; // Se toma el usuario del portal, ver la nomenclatura para revisar

                                    actualizacion.inclusiones.push(inc);
                                }

                            }
                        }
                    }
                }

                if (lstDependientes != undefined && lstDependientes != null) {
                    //lstDependientes.forEach(function (dependiente,index) {
                    var item;
                    for (item in lstDependientes) {
                        // solamente envía los nuevos dependientes a ser grabados, SI YA ES ANTERIOR, NO SE ENVÌA
                        var dependiente = lstDependientes[item];
                        if (dependiente == null || dependiente == undefined)
                            return;

                        if (dependiente.Anterior == false) {
                            // LLENADO DEL OBJETO DE DEPENDIENTES
                            var d = new DependienteAct();
                            d.Apellidos = dependiente.Apellidos;
                            d.Estado = 1; // ASUMO QUE ES EL ESTADO DE INICIO --- REVISAR
                            d.FechaNacimiento = dependiente.FechaNacimiento;
                            d.Genero = dependiente.RC != null ? dependiente.RC.Genero.toString() : "0"; // NO TENGO EL GÉNERO EN LA LISTA DE DATOS SOLICITADOS EN PANTALLA, LO TENGO GRABADO EN LA INFORMACIÓN DESCARGADA DEL REGISTRO CIVIL, PERO CUANDO ES PASAPORTE NO TENGO, TODOS ENTRAN COMO HOMBRES? -- REVISAR
                            d.Idenitifcacion = dependiente.Identificacion;
                            d.Nombres = dependiente.Nombres;
                            d.Relacion = dependiente.Parentesco; // EL PARENTESCO SE LLENO EN BASE A UN CATALOGO FIJO, 2= CONYUGE, 3=HIJO
                            d.Titular = "NO";

                            if (actualizacion.Dependientes == undefined)
                                actualizacion.Dependientes = new Array<DependienteAct>();
                            actualizacion.Dependientes.push(d);


                            // LLENADO DEL OBJETO DE BENEFICIARIOS
                            // equirado con datos que vienen de base del registro civil o de ingreso de pantalla
                            // nombres, apellidos, fecha nacimiento, genero
                            var b = new Persona();
                            var nombre1 = null;
                            var nombre2 = null;
                            var apellido1 = null;
                            var apellido2 = null;
                            if (dependiente.TipoIdentificacion == "2" || dependiente.TipoIdentificacion == "P") {
                                //caso de personas con pasaporte
                                if (dependiente.RC == undefined || dependiente.RC == null) {
                                    dependiente.RC = new PersonaEntity();
                                }
                                const parts = dependiente.Apellidos.split(" ");
                                //var parts = aps.split(" ");
                                if (parts.length == 1) {
                                    dependiente.RC.Primer_Apellido = apellido1 = parts[0];
                                    dependiente.RC.Segundo_Apellido = apellido2 = "";
                                }
                                else if (parts.length == 2) {
                                    dependiente.RC.Primer_Apellido = apellido1 = parts[0];
                                    dependiente.RC.Segundo_Apellido = apellido2 = parts[1];
                                }
                                else if (parts.length > 2) {
                                    dependiente.RC.Primer_Apellido = apellido1 = parts[0];
                                    for (let i = 1; i < parts.length; i++) {
                                        apellido2 += parts[i] + ' ';
                                    };
                                    apellido2 = apellido2.replace(/\s+$/g, '');//.TrimEnd();
                                    dependiente.RC.Segundo_Apellido = apellido2;
                                }
                                const parts2 = dependiente.Nombres.split(" ");
                                if (parts2.length == 1) {
                                    dependiente.RC.Primer_Nombre = nombre1 = parts2[0];
                                    dependiente.RC.Segundo_Nombre = nombre2 = "";
                                }
                                else if (parts2.length == 2) {
                                    dependiente.RC.Primer_Nombre = nombre1 = parts2[0];
                                    dependiente.RC.Segundo_Nombre = nombre2 = parts2[1];
                                }
                                else if (parts2.length > 2) {
                                    dependiente.RC.Primer_Nombre = nombre1 = parts2[0];
                                    for (let i = 1; i < parts2.length; i++) {
                                        nombre2 += parts2[i] + ' ';
                                    };
                                    nombre2 = nombre2.replace(/\s+$/g, '');//.TrimEnd();
                                    dependiente.RC.Segundo_Nombre = nombre2;
                                }
                            }

                            b.Nombre1 = dependiente.RC.Primer_Nombre;
                            b.Nombre2 = dependiente.RC.Segundo_Nombre;
                            b.Apellido1 = dependiente.RC.Primer_Apellido;
                            b.Apellido2 = dependiente.RC.Segundo_Apellido;
                            b.Cedula = dependiente.Identificacion;
                            b.Nombres = dependiente.Nombres;
                            b.Apellidos = dependiente.Apellidos;
                            b.FechaNacimiento = dependiente.FechaNacimiento;
                            b.Genero = dependiente.RC != null ? dependiente.RC.Genero.toString() : "0";
                            // NO TENGO EL GÉNERO EN LA LISTA DE DATOS SOLICITADOS EN PANTALLA, LO TENGO GRABADO EN LA INFORMACIÓN DESCARGADA DEL REGISTRO CIVIL, PERO CUANDO ES PASAPORTE NO TENGO -- REVISAR
                            b.TipoDocumento = dependiente.TipoIdentificacion;
                            if (actualizacion.Beneficiarios == undefined)
                                actualizacion.Beneficiarios = new Array<Persona>();
                            actualizacion.Beneficiarios.push(b);
                        }
                    };
                }

                if (actualizacion.Dependientes == undefined)
                    actualizacion.Dependientes = new Array<DependienteAct>();
                if (actualizacion.Beneficiarios == undefined)
                    actualizacion.Beneficiarios = new Array<Persona>();



                post$portalcorporativo$GuardarInformacionCliente(actualizacion,
                    function (result: Inclusion[]) {
                        if (result != null) {
                            var message = "";
                            var error = false;
                            for (let i in result) {
                                if (result[i].Observacion === "ATENCION AFILIADO NO VALIDA") {
                                    message += "No se pudo registrar su beneficio adicional, atención afiliados no válida. Por favor contáctese con su ejecutivo de cuenta.\n";
                                    error = true;
                                }
                                else if (result[i].Observacion === "PRODUCTO INACTIVO") {
                                    message += "No se pudo registrar su beneficio adicional, productos inactivos. Por favor contáctese con su ejecutivo de cuenta.\n";
                                    error = true;
                                }
                                else if (result[i].Observacion === "NO") {
                                    message += "No se pudo registrar su beneficio adicional, intentelo más tarde.\n";
                                    error = true;
                                }
                                else if (result[i].Observacion === "OK" || result[i].Observacion === "" || result[i].Observacion === undefined) {
                                    for (let j in result[i].Resultados)
                                        message += result[i].Resultados[j] + "\n";
                                }
                            }
                        }
                        if (!error) {
                            alert(message + 'Sus datos han sido actualizados satisfactoriamente.');
                            $('#pnl_Editar').hide();
                            $('#pnl_NoActivo').hide();
                            $('#pnl_YaConfigurado').show();

                            // pedido de Byteq invocación iframe desde hijo hasta padre
                            sendMessage('OK');
                        }
                        else {
                            alert(message);
                            // pedido de Byteq invocación iframe desde hijo hasta padre
                            sendMessage('NO');
                        }
                    },
                    function () { });
            },
            function () {
                //alert('no');
            });

        //kendo.confirm("Está seguro de proceder el registro de los datos ingresados?").then(function () {

        //    var actualizacion = new EnrolamientoActualizacion();

        //    // lleno el objeto de actualización con los mismos datos consultados.
        //    actualizacion.inclusiones = Infobase.inclusiones;
        //    actualizacion.persona = Infobase.persona;
        //    actualizacion.idregistro = IdRegistro;

        //    // Procedimiento de grabación 

        //    // empieza actualizando los datos de la persona
        //    actualizacion.persona.Banco = $('#cmb_Banco').data('kendoDropDownList').value();
        //    actualizacion.persona.BancoCodigo = $('#cmb_Banco').data('kendoDropDownList').value();
        //    actualizacion.persona.direccion = $('#txt_DireccionDomicilio').val().toString();// + " " + $('#txt_Sector').val().toString();
        //    actualizacion.persona.email = $('#txt_Email').val().toString();
        //    actualizacion.persona.ciudad = $('#txt_Ciudad').data('kendoDropDownList').value();
        //    //datos.IdEmpresa = IdEmpresa; // en la inclusion viene, no haría falta cambiarlo
        //    actualizacion.persona.provincia = $('#txt_Provincia').data('kendoDropDownList').value();
        //    //datos.IdUsuario = IdUsuario; // no cambio
        //    actualizacion.persona.NumeroCuenta = $('#txt_NumeroCuenta').val().toString();
        //    actualizacion.persona.celular = GetRawfromMasked('txt_TelefonoCelular');
        //    actualizacion.persona.emailempresa = GetRawfromMasked('txt_TelefonoDomicilio'); //NO TENGO DONDE GRABAR EL TELÉFONO DEL DOMICILIO --- REVISAR
        //    actualizacion.persona.TipoCuenta = $('#cmb_TipoCuenta').data('kendoDropDownList').value();


        //    // Grabación de servicios adicionales
        //    if (Infobase.inclusiones[0].CompletadoEnrolamiento != true) { // no entra si es que ya ha hecho enrolamiento antes
        //        if (Infobase.sucursal.Configuracion != undefined && Infobase.sucursal.Configuracion != null && Infobase.sucursal.Configuracion != '') {
        //            var subSucursales = <Array<SubSucursal>>JSON.parse(Infobase.sucursal.Configuracion);

        //            if (subSucursales != undefined && subSucursales != null) {

        //                var dCOB = subSucursales.filter(function (s1) { return s1.opcional == true });

        //                for (let i in dCOB) {
        //                    var id = dCOB[i].id.toString();

        //                    if ($('#chk_' + id).data('kendoMobileSwitch').check()) {
        //                        var TarifaAct = "";
        //                        if ($('#bt_' + id + '_Tarifa').data('kendoButtonGroup').current().index() == 0) {
        //                            TarifaAct = "AT";
        //                        }
        //                        else if ($('#bt_' + id + '_Tarifa').data('kendoButtonGroup').current().index() == 1) {
        //                            TarifaAct = "A1";
        //                        }
        //                        else if ($('#bt_' + id + '_Tarifa').data('kendoButtonGroup').current().index() == 2) {
        //                            TarifaAct = "AF";
        //                        }

        //                        // Actualización de servicios adicionales
        //                        var inc = new Inclusion();
        //                        inc.CompletadoEnrolamiento = false;
        //                        inc.ContratoNumero = 0;//Infobase.inclusiones[0].ContratoNumero; // Al atarse a otra lista, se supone que se creará otro número de contrato, ver parámetro en proceso de grabación
        //                        inc.EmpresaID = Infobase.inclusiones[0].EmpresaID; // Es siempre la misma empresa de la inclusión inicial
        //                        inc.FechaInclusion = new Date(); // revisar que en lógica se tome la fecha del servidor, se coloca la fecha actual
        //                        inc.NombreSucursal = ""; // no se requiere nombre de sucursal para incluir, revisar proceso de actualización
        //                        inc.Observacion = ""; // no debería copiarse de la inclusión inicial
        //                        inc.PersonaNumero = Infobase.inclusiones[0].PersonaNumero; // es la misma persona que hizo la inclusion inicial
        //                        inc.PlanID = TarifaAct; // toma la tarifa seleccionada en la pantalla (AT, A1 o AF)
        //                        inc.Region = Infobase.inclusiones[0].Region; // Es siempre la misma región de la inclusion original
        //                        inc.Resultados = new Array<string>(); // no debería copiarse de la inclusión inicial
        //                        inc.SucursalID = dCOB[i].id;  // Id almacenado
        //                        inc.Tipo = Infobase.inclusiones[0].Tipo; // Igual que inclusiòn inicial
        //                        inc.TipoProducto = dCOB[i].plan;//Infobase.inclusiones[0].TipoProducto; // igual que inclusion inicial
        //                        inc.Usuario = Infobase.inclusiones[0].Usuario; // Se toma el usuario del portal, ver la nomenclatura para revisar

        //                        actualizacion.inclusiones.push(inc);
        //                    }

        //                }
        //            }
        //        }
        //    }

        //    if (lstDependientes != undefined && lstDependientes != null) {
        //        //lstDependientes.forEach(function (dependiente,index) {
        //        var item;
        //        for (item in lstDependientes) {
        //            // solamente envía los nuevos dependientes a ser grabados, SI YA ES ANTERIOR, NO SE ENVÌA
        //            var dependiente = lstDependientes[item];
        //            if (dependiente == null || dependiente == undefined)
        //                return;

        //            if (dependiente.Anterior == false) {
        //                // LLENADO DEL OBJETO DE DEPENDIENTES
        //                var d = new DependienteAct();
        //                d.Apellidos = dependiente.Apellidos;
        //                d.Estado = 1; // ASUMO QUE ES EL ESTADO DE INICIO --- REVISAR
        //                d.FechaNacimiento = dependiente.FechaNacimiento;
        //                d.Genero = dependiente.RC != null ? dependiente.RC.Genero.toString() : "0"; // NO TENGO EL GÉNERO EN LA LISTA DE DATOS SOLICITADOS EN PANTALLA, LO TENGO GRABADO EN LA INFORMACIÓN DESCARGADA DEL REGISTRO CIVIL, PERO CUANDO ES PASAPORTE NO TENGO, TODOS ENTRAN COMO HOMBRES? -- REVISAR
        //                d.Idenitifcacion = dependiente.Identificacion;
        //                d.Nombres = dependiente.Nombres;
        //                d.Relacion = dependiente.Parentesco; // EL PARENTESCO SE LLENO EN BASE A UN CATALOGO FIJO, 2= CONYUGE, 3=HIJO
        //                d.Titular = "NO";

        //                if (actualizacion.Dependientes == undefined)
        //                    actualizacion.Dependientes = new Array<DependienteAct>();
        //                actualizacion.Dependientes.push(d);


        //                // LLENADO DEL OBJETO DE BENEFICIARIOS
        //                // equirado con datos que vienen de base del registro civil o de ingreso de pantalla
        //                // nombres, apellidos, fecha nacimiento, genero
        //                var b = new Persona();
        //                var nombre1 = null;
        //                var nombre2 = null;
        //                var apellido1 = null;
        //                var apellido2 = null;
        //                if (dependiente.TipoIdentificacion == "2" || dependiente.TipoIdentificacion == "P") {
        //                    //caso de personas con pasaporte
        //                    if (dependiente.RC == undefined || dependiente.RC == null) {
        //                        dependiente.RC = new PersonaEntity();
        //                    }
        //                    const parts = dependiente.Apellidos.split(" ");
        //                    //var parts = aps.split(" ");
        //                    if (parts.length == 1) {
        //                        dependiente.RC.Primer_Apellido = apellido1 = parts[0];
        //                        dependiente.RC.Segundo_Apellido = apellido2 = "";
        //                    }
        //                    else if (parts.length == 2) {
        //                        dependiente.RC.Primer_Apellido = apellido1 = parts[0];
        //                        dependiente.RC.Segundo_Apellido = apellido2 = parts[1];
        //                    }
        //                    else if (parts.length > 2) {
        //                        dependiente.RC.Primer_Apellido = apellido1 = parts[0];
        //                        for (let i = 1; i < parts.length; i++) {
        //                            apellido2 += parts[i] + ' ';
        //                        };
        //                        apellido2 = apellido2.replace(/\s+$/g, '');//.TrimEnd();
        //                        dependiente.RC.Segundo_Apellido = apellido2;
        //                    }
        //                    const parts2 = dependiente.Nombres.split(" ");
        //                    if (parts2.length == 1) {
        //                        dependiente.RC.Primer_Nombre = nombre1 = parts2[0];
        //                        dependiente.RC.Segundo_Nombre = nombre2 = "";
        //                    }
        //                    else if (parts2.length == 2) {
        //                        dependiente.RC.Primer_Nombre = nombre1 = parts2[0];
        //                        dependiente.RC.Segundo_Nombre = nombre2 = parts2[1];
        //                    }
        //                    else if (parts2.length > 2) {
        //                        dependiente.RC.Primer_Nombre = nombre1 = parts2[0];
        //                        for (let i = 1; i < parts2.length; i++) {
        //                            nombre2 += parts2[i] + ' ';
        //                        };
        //                        nombre2 = nombre2.replace(/\s+$/g, '');//.TrimEnd();
        //                        dependiente.RC.Segundo_Nombre = nombre2;
        //                    }
        //                }

        //                b.Nombre1 = dependiente.RC.Primer_Nombre;
        //                b.Nombre2 = dependiente.RC.Segundo_Nombre;
        //                b.Apellido1 = dependiente.RC.Primer_Apellido;
        //                b.Apellido2 = dependiente.RC.Segundo_Apellido;
        //                b.Cedula = dependiente.Identificacion;
        //                b.Nombres = dependiente.Nombres;
        //                b.Apellidos = dependiente.Apellidos;
        //                b.FechaNacimiento = dependiente.FechaNacimiento;
        //                b.Genero = dependiente.RC != null ? dependiente.RC.Genero.toString() : "0";
        //                // NO TENGO EL GÉNERO EN LA LISTA DE DATOS SOLICITADOS EN PANTALLA, LO TENGO GRABADO EN LA INFORMACIÓN DESCARGADA DEL REGISTRO CIVIL, PERO CUANDO ES PASAPORTE NO TENGO -- REVISAR
        //                b.TipoDocumento = dependiente.TipoIdentificacion;
        //                if (actualizacion.Beneficiarios == undefined)
        //                    actualizacion.Beneficiarios = new Array<Persona>();
        //                actualizacion.Beneficiarios.push(b);
        //            }
        //        };
        //    }

        //    if (actualizacion.Dependientes == undefined)
        //        actualizacion.Dependientes = new Array<DependienteAct>();
        //    if (actualizacion.Beneficiarios == undefined)
        //        actualizacion.Beneficiarios = new Array<Persona>();



        //    post$portalcorporativo$GuardarInformacionCliente(actualizacion,
        //        function (result: Inclusion[]) {
        //            if (result != null) {
        //                var message = "";
        //                var error = false;
        //                for (let i in result) {
        //                    if (result[i].Observacion === "ATENCION AFILIADO NO VALIDA") {
        //                        message += "No se pudo registrar su beneficio adicional, atención afiliados no válida. Por favor contáctese con su ejecutivo de cuenta.\n";
        //                        error = true;
        //                    }
        //                    else if (result[i].Observacion === "PRODUCTO INACTIVO") {
        //                        message += "No se pudo registrar su beneficio adicional, productos inactivos. Por favor contáctese con su ejecutivo de cuenta.\n";
        //                        error = true;
        //                    }
        //                    else if (result[i].Observacion === "NO") {
        //                        message += "No se pudo registrar su beneficio adicional, intentelo más tarde.\n";
        //                        error = true;
        //                    }
        //                    else if (result[i].Observacion === "OK" || result[i].Observacion === "" || result[i].Observacion === undefined) {
        //                        for (let j in result[i].Resultados)
        //                            message += result[i].Resultados[j] + "\n";
        //                    }
        //                }
        //            }
        //            if (!error) {
        //                alert(message + 'Sus datos han sido actualizados satisfactoriamente.');
        //                $('#pnl_Editar').hide();
        //                $('#pnl_NoActivo').hide();
        //                $('#pnl_YaConfigurado').show();

        //                // pedido de Byteq invocación iframe desde hijo hasta padre
        //                sendMessage('OK');
        //            }
        //            else {
        //                alert(message);
        //                // pedido de Byteq invocación iframe desde hijo hasta padre
        //                sendMessage('NO');
        //            }
        //        },
        //        function () { });

        //}, function () {
        //    // no hace nada si cancela
        //});
    }

    // Send a message to the parent
    function sendMessage(msg) {
        // Make sure you are sending a string, and to stringify JSON
        window.parent.postMessage(msg, '*');
    };

    // INICIALIZACIÓN DE LA VENTANA
    post$transaccion$getDatosPI(
        function (result) {


            var cmb_Banco = $("#cmb_Banco").kendoDropDownList({
                dataTextField: "NombreBanco",
                dataValueField: "CodigoBanco",
                dataSource: result.Bancos,
                filter: "contains",
                suggest: true,
                index: -1
            });


            // TRAIDO DESDE SERVICIO DE PASARELA
            post$divisionpolitica$ObtenerProvincias(
                function (result) {

                    $("#txt_Provincia").kendoDropDownList({
                        dataTextField: "Nombre",
                        dataValueField: "IdProvincia",
                        dataSource: result,
                        filter: "contains",
                        suggest: true,
                        index: -1,
                        change: CambioProvincia
                    });


                    // LLENADO DE LA INFORMACIÓN PRINCIPAL

                    try {
                        var rawVars = atob(p);
                        var partsOfStr = rawVars.split(',');
                        IdEmpresa = parseInt(partsOfStr[0]);
                        IdUsuario = parseInt(partsOfStr[1]);
                        IdRegistro = parseInt(partsOfStr[2]);

                        // LECTURA DE DATOS
                        get$masivo$ObtenerDatosEnrolamientoPorID(IdRegistro,
                            function (result: Msg) {
                                if (result == null || result.Datos == null) {
                                    return alert('No se ha podido obtener los datos del cliente');
                                }
                                var data = <Enrolamiento>result.Datos;
                                Infobase = data;
                                Cobertura = data.inclusiones[0].PlanID.substr(0, 2);

                                $('#lbl_Tipo').html(data.persona.TipoDocumento == "1" || data.persona.TipoDocumento == "C" ? "CEDULA" : "PASAPORTE");
                                $('#lbl_Documento').html(data.persona.Cedula);
                                $('#lbl_Nombres').html(data.persona.Nombres);
                                $('#lbl_Apellidos').html(data.persona.Apellidos);
                                $('#lbl_FechaNacimiento').html(getFormattedDate(data.persona.FechaNacimiento));
                                //$('#lbl_Plan').html(data.inclusiones[0].NombreSucursal);
                                $('#lbl_Plan').html(data.registro.NombreProducto); // aquí debería venir el alias
                                $('#lbl_Tarifa').html(NombreCobertura());
                                $('#lbl_EmailEmpresa').html(data.persona.emailempresa);

                                // Consulta al servicio si es que este usuario ya ha configurado previamente. 

                                // No recarga datos para cuando empieza el enrolamiento
                                if (data.inclusiones[0].CompletadoEnrolamiento == true) {
                                    $('#txt_Provincia').data('kendoDropDownList').value(data.persona.provincia);
                                    $('#txt_Ciudad').data('kendoDropDownList').value(data.persona.ciudad);
                                    //$('#txt_Sector').val(data.persona.provincia);
                                    $('#txt_DireccionDomicilio').val(data.persona.direccion);
                                    $('#txt_Email').val(data.persona.email);
                                    //$('#txt_TelefonoDomicilio').val(data.persona);
                                    $('#txt_TelefonoCelular').val(data.persona.celular);
                                    $('#cmb_Banco').data('kendoDropDownList').value(data.persona.BancoCodigo);
                                    $('#cmb_TipoCuenta').data('kendoDropDownList').value(data.persona.TipoCuenta);
                                    $('#txt_NumeroCuenta').val(data.persona.NumeroCuenta);
                                }

                                // recargo dependientes
                                // mapeo de objetos-- revisar que vengan los datos del dependiente en la carga

                                lstDependientes = new Array<Dependiente>();

                                data.dependientes.forEach(function (d) {
                                    var dep = new Dependiente();
                                    dep.Anterior = true;
                                    dep.Apellidos = d.Apellidos;
                                    dep.FechaNacimiento = d.FechaNacimiento;
                                    dep.Identificacion = d.Idenitifcacion;
                                    dep.Nombres = d.Nombres;
                                    dep.Parentesco = d.Relacion;
                                    dep.RC = new PersonaEntity(); // no veo necesidad de llenarlo
                                    dep.TipoIdentificacion = d.TipoIdentificacion;
                                    lstDependientes.push(dep);
                                });

                                // se recarga la grilla
                                var grid = $("#grid_Dependientes").data("kendoGrid");
                                grid.dataSource.data(lstDependientes);

                                // Si es un plan Solo Titular, no le permite agregar varios Dependientes
                                if (Cobertura == "AT") {
                                    $('#pnl_Dependientes').hide();
                                    $('#pnl_AgregarDep').hide();
                                    $('#titulo_Dependientes').hide();
                                }

                                // si ya ha sido enrolado anteriormnte, ya no puede cambiar los dependientes.
                                if (data.inclusiones[0].CompletadoEnrolamiento == true) {
                                    $('#pnl_AgregarDep').hide();
                                    $('#pnl_ServiciosAdicionales').hide();
                                }
                                else {
                                    // los servicios adicionales no se muestran en la actualización de datos

                                    if (data.sucursal.Configuracion != null && data.sucursal.Configuracion != undefined) {

                                        // Configuración de servicios adicionales
                                        var subSucursales = <Array<SubSucursal>>JSON.parse(data.sucursal.Configuracion);

                                        if (subSucursales != undefined && subSucursales != null) {

                                            CargarCoberturaAdicional('EXE', subSucursales);
                                            CargarCoberturaAdicional('DEN', subSucursales);
                                            CargarCoberturaAdicional('CPO', subSucursales);

                                            // Si no hay ninguna opcional, no aparece toda la sección
                                            var dCOB = subSucursales.filter(function (s1) { return s1.opcional == true });
                                            if (dCOB.length > 0) {
                                                // Activo la sección de servicios adicionales, solamente si tiene alguna de las secciones adicionales, sino queda oculto
                                                $('#pnl_ServiciosAdicionales').show();
                                            }
                                            else {
                                                $('#pnl_ServiciosAdicionales').hide();
                                            }
                                        }
                                        else {
                                            $('#pnl_ServiciosAdicionales').hide();
                                        }
                                    }
                                    else {
                                        $('#pnl_ServiciosAdicionales').hide();
                                    }
                                }
                            },
                            function () {
                                $('#pnl_Editar').hide();
                                $('#pnl_NoActivo').show();
                                $('#pnl_YaConfigurado').hide();

                            });
                    }
                    catch (err) {
                        $('#pnl_Editar').hide();
                        $('#pnl_NoActivo').show();
                        $('#pnl_YaConfigurado').hide();
                    }

                },
                function () { })

        },
        function () { });


    Loading_Hide(true);
});

function CargarCoberturaAdicional(cobertura, subSucursales) {
    var dCOB = subSucursales.filter(function (s1) { return s1.opcional == true && s1.cobertura == cobertura; });

    // Si en la configuraciòn permite una sublista opcional , presenta el componente para selección opcional
    if (dCOB.length > 0) {
        var Coberturatexto = "";

        if (cobertura == "EXE")
            Coberturatexto = "Exequial";
        if (cobertura == "DEN")
            Coberturatexto = "Dental";
        if (cobertura == "CPO")
            Coberturatexto = "Oncológico";

        // Creo los controles dentro del Fieldset
        var content = '<fieldset><legend>Cobertura ' + Coberturatexto + ' Adicional</legend><br>';

        for (let i in dCOB) {
            var id = dCOB[i].id.toString();
            var alias = dCOB[i].alias;
            if (alias == null || alias == undefined)
                alias = id;
            content += '<div class="fieldBox" id="box_' + id + '"><label for="chk_' + id + '"> Cobertura ' + alias + ':</label>&nbsp;&nbsp;&nbsp;<input id="chk_' + id + '" />&nbsp;&nbsp;<a href="javascript:DescargarCondiciones(' + id + ');" > Ver Condiciones</a><br / ><div id="bt_' + id + '_Tarifa" style= "display:none;" > </div></div>';
        }
        content += '</fieldset><br>';

        $('#pnl_ServiciosAdicionales').append(content);


        for (let i in dCOB) {
            var id = dCOB[i].id.toString();

            $('#chk_' + id).kendoMobileSwitch({
                onLabel: "SI",
                offLabel: "NO"
            }).data('kendoMobileSwitch').bind("change", function (e) {
                //$(this.element).trigger('change');
                if ($('#chk_' + id).data('kendoMobileSwitch').check()) {
                    $('#bt_' + id + '_Tarifa').show();
                }
                else {
                    $('#bt_' + id + '_Tarifa').hide();
                }
            });

            // El plan define si es AT, A1 o AF. 
            // En la configuraciòn se pone el nivel màximo que un usuario puede tomar

            var arr = new Array<SelectItem>();

            var cAT = new SelectItem();
            cAT.text = "AL AFILIADO";

            var cA1 = new SelectItem();
            cA1.text = "AL AFILIADO MÁS UNO";

            var cAF = new SelectItem();
            cAF.text = "AL AFILIADO MÁS FAMILIA";

            var comp = dCOB[i].plan;
            // si la empresa pide AT, aunque la cobertura de la persona sea A1, muestra solo AT
            if (comp == "AT" && Cobertura == "A1") {
                comp = "AT";
            }
            // si la empresa pide AT, aunque la cobertura de la persona sea AF, muestra solo AT
            if (comp == "AT" && Cobertura == "AF") {
                comp = "AT";
            }
            // si la empresa pide A1, aunque la cobertura de la persona sea AF, muestra solo A1
            if (comp == "A1" && Cobertura == "AF") {
                comp = "A1";
            }
            // si la empresa pide AF, pero la persona solo tiene AT
            if (comp == "AF" && Cobertura == "AT") {
                comp = "AT";
            }
            // si la empresa pide AF, pero la persona solo tiene AT
            if (comp == "AF" && Cobertura == "A1") {
                comp = "A1";
            }
            // si la empresa pide A1, pero la persona solo tiene AT
            if (comp == "A1" && Cobertura == "AT") {
                comp = "AT";
            }

            if (comp == "AT") {
                arr.push(cAT);
            }
            else if (comp == "A1") {
                arr.push(cAT);
                arr.push(cA1);
            }
            else if (comp == "AF") {
                arr.push(cAT);
                arr.push(cA1);
                arr.push(cAF);
            }


            $('#bt_' + id + '_Tarifa').kendoButtonGroup({
                index: 0,
                items: arr
            });

            $('#box_' + id).show();
        }
    }
}

function NombreCobertura(): string {
    if (Cobertura == "AT")
        return "AFILIADO SOLO";
    else if (Cobertura == "A1")
        return "AFILIADO MÁS UNO";
    else if (Cobertura == "AF")
        return "AFILIADO MÁS FAMILIA";
    else
        return "";
}

function DescargarCondiciones(id) {

    //var subSucursales = <Array<SubSucursal>>JSON.parse(Infobase.sucursal.Configuracion);

    //if (subSucursales != undefined && subSucursales != null) {

    //    var dCOB = subSucursales.filter(function (s1) { return s1.opcional == true && s1.cobertura == cobertura; });

    //    if (dCOB != null && dCOB != undefined && dCOB.length > 0) {

    get$empresa$DescargaPublicidadLista(IdEmpresa, id, //dCOB[0].id,
        function (res: Msg) {

            if (res.Datos == '') {
                return alert('El archivo no se encuentra disponible en este momento.');
            }

            // convert base64 string to byte array

            var byteCharacters = atob(res.Datos);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);

            // now that we have the byte array, construct the blob from it
            var blob1 = new Blob([byteArray], { type: "application/octet-stream" });

            var fileName1 = "InformacionCobertura" + id + ".pdf";
            saveAs(blob1, fileName1);

            // saving text file
            //var blob2 = new Blob(["cool"], { type: "text/plain" });
            //var fileName2 = "cool.txt";
            //saveAs(blob2, fileName2);
        },
        function () { });
    //    }
    //    else {
    //        alert('El documento no se encuentra disponible.');
    //    }
    //}
    //else {
    //    alert('El documento no se encuentra disponible.');
    //}
}

/**
  * Calculates human age in years given a birth day. Optionally ageAtDate
  * can be provided to calculate age at a specific date
  * https://stackoverflow.com/questions/8152426/how-can-i-calculate-the-number-of-years-betwen-two-dates
  * @param string|Date Object birthDate
  * @param string|Date Object ageAtDate optional
  * @returns integer Age between birthday and a given date or today
  */
function gregorianAge(birthDate: Date, ageAtDate?: Date) {
    // convert birthDate to date object if already not
    if (Object.prototype.toString.call(birthDate) !== '[object Date]')
        birthDate = new Date(birthDate);

    // use today's date if ageAtDate is not provided
    if (typeof ageAtDate == "undefined")
        ageAtDate = new Date();

    // convert ageAtDate to date object if already not
    else if (Object.prototype.toString.call(ageAtDate) !== '[object Date]')
        ageAtDate = new Date(ageAtDate);

    // if conversion to date object fails return null
    if (ageAtDate == null || birthDate == null)
        return null;


    var _m = ageAtDate.getMonth() - birthDate.getMonth();

    // answer: ageAt year minus birth year less one (1) if month and day of
    // ageAt year is before month and day of birth year
    return (ageAtDate.getFullYear()) - birthDate.getFullYear()
        - ((_m < 0 || (_m === 0 && ageAtDate.getDate() < birthDate.getDate())) ? 1 : 0)
}

function getByGuid(data, guid) {
    for (var i = 0; i < data.length; i++) {
        if (data[i]['Guid'] == guid) {
            return data[i];
        }
    }
    return null;
}

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}