/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"ovly/fipe/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"ovly/fipe/test/integration/pages/S0",
	"ovly/fipe/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "ovly.fipe.view.",
		autoWait: true
	});
});