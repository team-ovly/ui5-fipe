sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("ovly.fipe.controller.S0", {
		onInit: function () {
			this._oFiltroModel = new JSONModel({
				tipo: "",
				marca: "",
				modelo: "",
				ano: ""
					// ano: 2018
			});
			this.getView().setModel(this._oFiltroModel, "filtro");

			this._oTipoModel = new JSONModel([{
				codigo: "",
				nome: ""
			}, {
				codigo: "carros",
				nome: "Carros"
			}, {
				codigo: "motos",
				nome: "Motos"
			}, {
				codigo: "caminhoes",
				nome: "Caminhões"
			}]);
			this.getView().setModel(this._oTipoModel, "tipo");

			this._oMarcaModel = new JSONModel();
			this.getView().setModel(this._oMarcaModel, "marca");

			this._oModeloModel = new JSONModel();
			this.getView().setModel(this._oModeloModel, "modelo");

			this._oAnosModel = new JSONModel();
			this.getView().setModel(this._oAnosModel, "anos");

			this._oVeiculosModel = new JSONModel([]);
			this.getView().setModel(this._oVeiculosModel, "veiculos");

		},

		onChangeTipo: function (oEvent) {
			var sTipo = this._oFiltroModel.getProperty("/tipo");
			if (sTipo) {
				this._oMarcaModel.loadData("/api/" + sTipo + "/marcas");

			} else {
				this._oMarcaModel.setProperty("/", []);
				this._oModeloModel.setProperty("/", []);
			}
		},

		onChangeMarca: function (oEvent) {
			var sTipo = this._oFiltroModel.getProperty("/tipo");
			var sMarca = this._oFiltroModel.getProperty("/marca");

			if (sTipo && sMarca) {
				this._oModeloModel.loadData("/api/" + sTipo + "/marcas/" + sMarca + "/modelos");
			}
		},

		onChangeModelo: function (oEvent) {
			var sTipo = this._oFiltroModel.getProperty("/tipo");
			var sMarca = this._oFiltroModel.getProperty("/marca");
			var sModelo = this._oFiltroModel.getProperty("/modelo");

			if (sTipo && sMarca && sModelo) {
				this._oAnosModel.loadData("/api/" + sTipo + "/marcas/" + sMarca + "/modelos/" + sModelo + "/anos");
			}
		},

		onAdd: function (oEvent) {
			var sTipo = this._oFiltroModel.getProperty("/tipo");
			var sMarca = this._oFiltroModel.getProperty("/marca");
			var sModelo = this._oFiltroModel.getProperty("/modelo");
			var sAno = this._oFiltroModel.getProperty("/ano");

			if (sTipo && sMarca && sModelo && sAno) {
				var sUrl = "/api/" + sTipo + "/marcas/" + sMarca + "/modelos/" + sModelo + "/anos/" + sAno;

				$.get(sUrl, function (oResult) {

					var aVeiculos = this._oVeiculosModel.getProperty("/");
					var oNovoVeiculo = {
						marca: oResult.Marca,
						modelo: oResult.Modelo,
						ano: oResult.AnoModelo,
						valor: oResult.Valor,
						fipe: oResult.CodigoFipe.trim(),
						combustivel: {
							gasolina: false,
							alcool: false,
							diesel: false
						},
						tipo: oResult.TipoVeiculo
					};

					switch (oResult.SiglaCombustivel) {
					case "G":
						oNovoVeiculo.combustivel.gasolina = true;
						break;
					case "A":
						oNovoVeiculo.combustivel.alcool = true;
						break;
					case "D":
						oNovoVeiculo.combustivel.diesel = true;
						break;

					default:
					}

					aVeiculos.push(oNovoVeiculo);
					this._oVeiculosModel.setProperty("/", aVeiculos);

				}.bind(this));
			}

		},

		onDelete: function (oEvent) {

		},

		formatIcon: function (sTipo) {
			if (!sTipo) {
				return;
			}

			switch (sTipo) {
			case 1:
				return "sap-icon://car-rental";
			case 2:
				return "sap-icon://customer";
			case 3:
				return "sap-icon://shipping-status";

			default:
				return "sap-icon://sys-help";
			}

		}

	});
});