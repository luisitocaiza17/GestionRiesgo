head.ready(function () {
    //Seccion de reportes Siniestralidad
    $('#dt_Desde').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $('#dt_Hasta').kendoDatePicker({ format: 'dd-MM-yyyy' });
    $(".k-datepicker input").prop("readonly", true);
    $('#btn_Buscar').kendoButton();
    $("#selectProducto").kendoDropDownList({
        dataSource: {
            data: [
                { "id": 1, "value": "SmartPlan" },
                { "id": 2, "value": "Pool" },
                { "id": 3, "value": "Individual" },
                { "id": 4, "value": "Oncocare" },
                { "id": 5, "value": "Corporativo" }
            ]
        },
        dataTextField: "value",
        dataValueField: "id",
        animation: false,
        maxSelectedItems: 1,
        value: [1]
    });
    Loading_Hide();

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
        alert('Buscando información');
    });

});