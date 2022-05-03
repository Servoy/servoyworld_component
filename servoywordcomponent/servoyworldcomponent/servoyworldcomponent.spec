{
	"name": "servoyworld-servoyworldcomponent",
	"displayName": "servoyworldcomponent",
	"version": 1,
	"definition": "servoyworld/servoyworldcomponent/servoyworldcomponent.js",
	"libraries": [],
	"model":
	{
		"value" : "dataprovider",
		"text" :  {"type":"tagstring" , "initialValue":"Label", "tags": { "directEdit" : "true" }},
		"values": { "type" :"valuelist", "tags": { "scope" :"design" } },
		"fieldstyleclass" : { "type" :"styleclass", "tags": { "scope" :"design" } },
		"buttonstyleclass" : { "type" :"styleclass", "tags": { "scope" :"design" } },
		"hidevalues" : "boolean"
	},
	"handlers":
	{
	        "click" : {
	        	"parameters":[
								{
						          "name":"event",
								  "type":"JSEvent"
								}
							 ]
	        }
	 },
	 "api":
	{
		"requestFocus": {
				"delayUntilFormLoads": true,
				"discardPreviouslyQueuedSimilarCalls": true
	    }
	 }
}