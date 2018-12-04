head.ready(function () {
    //Seccion de reportes Siniestralidad
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
        alert('Buscando información');
    });
});
//# sourceMappingURL=ReporteAsignacionCorredor.js.map