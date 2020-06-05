### About the Roomle Configurator

The Roomle Configurator can display 3d products, i.e. furniture, in high quality. You can rotate the object to view it from different perspectives inside the configurator. The products can be configured by changing parameters which are displayed inside a menu on the right side of the configurator. Parameters can be the material, the width or the number of shelfes of the product. Some furniture can be mounted to other furniture (i.e. you can add a shelf to a desk). You can dock objects to other objects inside the configurator using drag and drop or by clicking on the shadow after selecting an add-on object in the parameter list. Only valid configurations can be created since it is validated on every change. A parts list and corresponding prices are calculated instantly. You can use the api to get updated images of the configured product.

### First steps to integrate the Roomle Configurator
The easiest way to integrate the Roomle Configurator API is to see a simple example. The following web page displays a button which loads the configurator when clicked.

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Simple Roomle Integration</title>
		<style type="text/css">
			html, body {
				height: 100%;
				margin: 0;
				padding: 0;
			}
			#roomleConfButton {
				position: absolute;
				cursor: pointer;
				width: 300px;
				height: 20px;
				background-color: #EEEEEE;
				font-family: Arial Black;
				font-size: 14px;
				color: black;
			}
			#roomleContainer {
				height: 100%;
			}
		</style>
	</head>
	<body>
		<div id="roomleConfButton">Click to start the Roomle Configurator</div>
		<div id="roomleContainer"></div>
		<script async defer src="http://roomle.com/app/assets/scripts/configurator/configurator-api.js"></script>
		<script type="text/javascript">
			document.addEventListener('DOMContentLoaded', function() {
				roomleConfButton.addEventListener('click', function() {
				    var options = {}; // Available options can be found in the api docs and in the examples
					RoomleConfigurator.init('CONFIGURATOR-ID', 'roomleContainer', 'fantoni_1:FW_Singledesk:04F48A98A90AF8E94844F60B4BCB15164B32A6A76C7C09A876A9605CBDD9E8FE', options, function() { console.log('init:success'); });
				});
			});
		</script>
	</body>
</html>
```

Even in this simple example, there are a few things to note:

1. We create a div element named "roomleContainer" to hold the Configurator.
2. We define some JavasScript that creates a configurator in the div.
3. We load the roomle configurator API JavaScript using a script tag.
4. The Configurator starts loading when the button is clicked.

A basic sample can be found on [https://www.roomle.com/app/assets/scripts/configurator/configurator-sample.html](https://www.roomle.com/app/assets/scripts/configurator/configurator-sample.html)

### Loading the Roomle Configurator API
To load the Roomle Configurator API, use a script tag like the one in the following example:
```html
<script async defer
	src="http://roomle.com/app/assets/scripts/configurator/configurator-api.js">
</script>
```

The URL contained in the script tag is the location of a JavaScript file that loads all of the definitions you need for using the Roomle Configurator API. This script tag is required.

#### Synchronously Loading the API

The async attribute lets the browser render the rest of your website while the Configurator API loads. It is possible to omit the async attribute. This will cause the loading of the page to block until the API is downloaded. This will probably slow your page load. But it means you can write subsequent script tags assuming that the API is already loaded.

#### HTTPS or HTTP
At the moment the Roomle Configurator API is available on http only.

### Configurator DOM Elements
```javascript
<div id="roomleContainer"></div>
```
For the configurator to display on a web page, we must reserve a spot for it. Commonly, we do this by creating a named div element and obtaining a reference to this element in the browser's document object model (DOM).

In the example above, we used CSS to set the height of the configurator div to "100%". This will expand to fit the size on all devices. Note that divs usually take their width from their containing element, and empty divs usually have 0 height. For this reason, you must always set a height on the div explicitly.

### The Configurator Object
```javascript
RoomleConfigurator.init('roomleContainer', 'en', 'fantoni_1:FW_Singledesk:04F48A98A90AF8E94844F60B4BCB15164B32A6A76C7C09A876A9605CBDD9E8FE');
```
The JavaScript class that represents a Roomle Configurator is the RoomleConfigurator class. Objects of this class define a single configurator on a page. You can create only one instance of this class. We create a new instance of this class using the init method.

When you create a new configurator instance, you specify a div HTML element in the page as a container for the configurator. HTML nodes are children of the JavaScript document object, and we obtain a reference to this element via the document.getElementById() method inside the init method. This way you just need to privide the id of your div element (i.e. 'roomleContainer').

You can find more details about its definition in the documentation: [https://www.roomle.com/app/assets/scripts/configurator/configurator-doc/RoomleConfigurator.html](https://www.roomle.com/app/assets/scripts/configurator/configurator-doc/RoomleConfigurator.html)

#### Loading an existing configuration
You can use the following code snippet to load a configuration.
```javascript
RoomleConfigurator.loadConfiguration('{"componentId":"fantoni_1:FW_Singledesk:04F48A98A90AF8E94844F60B4BCB15164B32A6A76C7C09A876A9605CBDD9E8FE"}');
```

#### Getting configurationId, price and image
Here are some example code snippets how to request information from the Roomle Configurator. Do not forget to replace the configurationId of this example with your own configurationId.

```javascript
RoomleConfigurator.getCurrentConfigurationId(function (hash) {
		console.log(hash);
	}, function (error) {
		console.log('caught error "' + error + '"');
	}
);
```

```javascript
RoomleConfigurator.getCurrentPrice(function (price, currency) {
		console.log(price + " " + currency);
	}, function (error) {
		console.log('caught error "' + error + '"');
	}
);
```

```javascript
RoomleConfigurator.getPerspectiveImage('fantoni_1:FW_Singledesk:04F48A98A90AF8E94844F60B4BCB15164B32A6A76C7C09A876A9605CBDD9E8FE', function (perspectiveImage) {
		console.log(perspectiveImage);
	}, function (error) {
		console.log('caught error "' + error + '"');
	}
);
```

#### Setting the language
The language of the configurator can be set as argument of the RoomleConfiguration.init method. The following country codes are supported:

| Code | Language |
|------|----------|
| `en` | English |
| `de` | German |
| `zh-Hans` | Chinese |
| `it` | Italian |
| `fr` | French |
| `es` | Spanish |
| `hi` | Hindu |
| `ja` | Japanese |
| `pt` | Portuguese |
| `pt-BR` | Brazilian Portuguese |
| `pl` | Polish |
| `ru` | Russian |

See the documentation for more functions: [docs/markdown/js/api.md](docs/markdown/js/api.md)

### Connecting your configurator with our iOS App
To give the user the best available UX we recommend to connect your configurator with our iOS App. If a user starts to configure he can do this in our optimized iOS App. To enable iOS you have to provide the following data to the configurator

* init the configurator with options.enableIOS = true
* set the webshop callback url with the method setWebshopCallbackUrl

After the user finished configuring he will be redirected to the callback url provided by the setWebshopCallbackUrl method. The actual configuration ID will be inserted in the URL. Therefore the placeholder __CONFID__ is replaced.


### Best practice Integration

#### Display a preview during loading
We recommend to hide the configurator during loading and display a preview image to improve usability. Set the configurator visible as soon as it finishes loading.

* Note on Firefox 45: when hiding a div using 'display:none' Firefox stops processing the content inside the hidden div. This can cause problems when the configurator never finishes loading.

#### Start the configurator with content
Load a default product on init to let the user see interesting content right from the beginning.

#### Provide preconfigured examples
We strongly recommend to display some different configurations of the product where the user can easily switch between.

### Browsercompatibility
* Internet Explorer: version 10+
* Firefox, Safari, Chrome: newest and previous version

### Notice
[Try out our full featured room planner. It's for free :-)](https://www.roomle.com/en/floorplanner)



