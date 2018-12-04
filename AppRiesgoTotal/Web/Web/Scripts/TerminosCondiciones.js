/// <reference path="../Scripts/Init.ts" />
head.ready(function () {
    $('#btn_DescargarTerminos').kendoButton();
    var TerminosCondicionesIDActual = 0;
    get$terminoscondiciones$CorredoresTerminosCondicionesActual(function (res) {
        var tc = res.Datos;
        TerminosCondicionesIDActual = tc.TerminosCondicionesID;
        $('#DescripcionCortaTC').html(tc.DescripcionCorta); // coloca el contenido guardado de los términos y condiciones ultimo
        $('#ResumenTC').html(tc.ResumenCambios); // coloca el contenido guardado de los términos y condiciones ultimo
        $('#ContenidoTC').html(tc.ContenidoCompleto); // coloca el contenido guardado de los términos y condiciones ultimo
    }, function () { });
    $('#btn_DescargarTerminos').click(function () {
        get$terminoscondiciones$CorredoresTerminosCondicionesPDFContenido(TerminosCondicionesIDActual, function (res) {
            if (res.Datos == null || res.Datos == undefined || res.Datos == '')
                return alert('El archivo no se encuentra disponible en este momento.');
            // convert base64 string to byte array
            var byteCharacters = atob(res.Datos);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            // now that we have the byte array, construct the blob from it
            var blob1 = new Blob([byteArray], { type: "application/octet-stream" });
            var fileName1 = "SmartPlan_TerminosCondiciones.pdf";
            saveAs(blob1, fileName1);
            // saving text file
            //var blob2 = new Blob(["cool"], { type: "text/plain" });
            //var fileName2 = "cool.txt";
            //saveAs(blob2, fileName2);
        }, function () { });
    });
    //Registro estadistiva
    RegistroEstadistica(5);
    Loading_Hide(true);
});
//# sourceMappingURL=TerminosCondiciones.js.map