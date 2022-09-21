function Connect() {

    var LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");
    var Logger = require("dw/system/Logger");
    var Encoding = require("dw/crypto/Encoding");
    var StringUtils = require("dw/util/StringUtils");

    var buluSetup = (dw.system.Site.getCurrent().getCustomPreferenceValue('BuluSetup') ? dw.system.Site.getCurrent().getCustomPreferenceValue('BuluSetup') : "");
    if (buluSetup == "") {
        return;
    } else {
        buluSetup = JSON.parse(buluSetup);
    }
    var authUrl = buluSetup.authUrl;
    var choiceUrl = buluSetup.choiceUrl;
    var apiKey = buluSetup.apiKey; /////
    var client_id = buluSetup.client_id;
    var client_secret = buluSetup.client_secret;

    //var server = "gnc-dev.bulubox.com"; //TODO: site pref
    //var path = "api/sample-choice";  // TODO: site pref
    // var apiKey = "WltGOTIt.XQ0dOoRplcgtYsCncqmswLLdvVdqQbot";

    var jsonParam = "";
    //var window.user.loyaltyID
    try {

        var httpclient = new dw.net.HTTPClient();
        var requestBody = "grant_type=client_credentials";

        var requestParamsAuth = {
            'callUrl': authUrl,
            'requestMethod': 'POST',
            'requestBody': requestBody,
            'requestType': 'application/x-www-form-urlencoded'
        };

        var authService = LocalServiceRegistry.createService("Bulu.Api", {
            createRequest: function (svc, params) {
                svc.setRequestMethod('POST');
                svc.setURL(params.callUrl);
                svc.addHeader('Content-type', params.requestType);
                var auth = StringUtils.encodeBase64(client_id + ":" + client_secret);
                svc.addHeader('Authorization', "Basic " + auth);
                return params.requestBody;
            },
            parseResponse: function (svce, response) {
                return response;
            },
            mockExec: function (svc, params) {
                return {
                    statusCode: 201,
                    statusMessage: "mockExec"
                };
            } 
        });
        var buluResponse = authService.call(requestParamsAuth);
        var access_token = "";

        if (buluResponse.ok == false) {
            return JSON.parse(buluResponse).error;
        } else {
            access_token = JSON.parse(buluResponse.object.text).access_token;
        }

        ////


        jsonParam = JSON.parse(request.httpParameterMap.getRequestBodyAsString());

        var requestParamsChoice = {
            'callUrl': choiceUrl,
            'access_token': access_token,
            'requestMethod': 'POST',
            'requestBody': request.httpParameterMap.getRequestBodyAsString(),
            'requestType': 'application/json'
        };

        var choiceService = LocalServiceRegistry.createService("Bulu.Api", {
            createRequest: function (svc, params) {
                svc.setRequestMethod('POST');
                svc.setURL(params.callUrl);
                svc.addHeader('Content-type', "application/json");
                svc.addHeader('Authorization', "Bearer " + params.access_token);
                //svc.addHeader('Authorization', "Api-Key " + apiKey);
                return params.requestBody;
            },
            parseResponse: function (svce, response) {
                return response;
            },
            mockExec: function (svc, params) {
                return {
                    statusCode: 201,
                    statusMessage: "mockExec"
                };
            }
        });
        
        buluResponse = choiceService.call(requestParamsChoice);
        //.object.text;

        if (!buluResponse) {
            var error = " - ";
            Logger.error(error.toString());
            return;
        }
        if (buluResponse.ok == false) {
            return JSON.parse(buluResponse).error;
        } else {
           
        }

        var jsonResult = JSON.parse(buluResponse.object.text);
        if (jsonResult == null) {
            Logger.error(error);
            return;
        } else {
            response.getWriter().println(buluResponse.object.text);
        }



        // website_token = jsonResult.website_token;

    } catch (err) {
        var error = err.toString();
        Logger.error(error);
        return;
    }

}

exports.Connect = Connect;
exports.Connect.public = true;