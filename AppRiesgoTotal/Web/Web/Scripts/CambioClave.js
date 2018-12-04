/// <reference path="../Scripts/Init.ts" />
head.ready(function () {
    var UsuarioLogueado = UsuarioSesion();
    $('#btn_CambiarClave').kendoButton();
    //Registro estadistiva
    RegistroEstadistica(4);
    $('#btn_CambiarClave').click(function () {
        //validaciones
        if ($('#txt_ClaveAnterior').val() == "") {
            return alert('Debe ingresar su clave anterior');
        }
        if ($('#txt_ClaveNueva').val() == "") {
            return alert('Debe ingresar la nueva clave');
        }
        if ($('#txt_RepetirClave').val() == "") {
            return alert('Debe ingresar su clave nuevamente');
        }
        if ($('#txt_ClaveNueva').val() != $('#txt_RepetirClave').val()) {
            return alert('Su contraseña no coincide');
        }
        //Validación complejidad clave
        get$usuario$CorredoresCambioClave(UsuarioLogueado.Id, UsuarioLogueado.NombreUsuario, $('#txt_ClaveAnterior').val(), $('#txt_ClaveNueva').val(), function (res) {
            if (res.Datos == true) {
                alert('Su clave ha sido cambiada existosamente.');
                window.location.assign("Home.html");
            }
            else {
                alert('No ha sido posible cambiar su clave. Revise por favor los datos ingresados y vuelva a intentarlo.');
            }
        }, function () { });
    });
    Loading_Hide();
});
//# sourceMappingURL=CambioClave.js.map