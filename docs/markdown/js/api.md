## Objects

<dl>
<dt><a href="#RoomleConfigurator">RoomleConfigurator</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#UserCallbacks">UserCallbacks</a> : <code>object</code></dt>
<dd><p>This namespace is used to encapsulate all callbacks which needs to be provided
by the user of the API</p>
</dd>
<dt><a href="#InternalCallbacks">InternalCallbacks</a> : <code>object</code></dt>
<dd><p>This namespace is used to encapsulate all callbacks which are used internally</p>
</dd>
<dt><a href="#RoomleConfiguratorPrivate">RoomleConfiguratorPrivate</a> : <code>object</code></dt>
<dd><p>RoomleConfiguratorPrivate represents state and methods which should NOT be accessed
outside of the Roomle Configurator Module</p>
</dd>
</dl>

<a name="RoomleConfigurator"></a>

## RoomleConfigurator : <code>object</code>
**Kind**: global namespace  

* [RoomleConfigurator](#RoomleConfigurator) : <code>object</code>
    * [.init(configuratorId, htmlId, [configuration], options, [initCallback], [errorCallback])](#RoomleConfigurator.init) ⇒ <code>void</code>
    * [.initWithoutWebGl(id, [initWithoutWebGlCallback])](#RoomleConfigurator.initWithoutWebGl) ⇒ <code>void</code>
    * [.loadConfiguration(The, [successCallback], [errorCallback])](#RoomleConfigurator.loadConfiguration) ⇒ <code>void</code>
    * [.loadComponent(The, [successCallback], [errorCallback])](#RoomleConfigurator.loadComponent) ⇒ <code>void</code>
    * [.loadItem(The, [successCallback], [errorCallback])](#RoomleConfigurator.loadItem) ⇒ <code>void</code>
    * [.loadTag(The, [successCallback], [errorCallback])](#RoomleConfigurator.loadTag) ⇒ <code>void</code>
    * [.setContainerId(The, [successCallback], [errorCallback])](#RoomleConfigurator.setContainerId) ⇒ <code>void</code>
    * [.getCurrentParts(successCallback, [errorCallback])](#RoomleConfigurator.getCurrentParts)
    * [.setAddToCartListener(Settings, successCallback, [errorCallback])](#RoomleConfigurator.setAddToCartListener)
    * [.setFullscreenListener(listener)](#RoomleConfigurator.setFullscreenListener)
    * [.getParts(id, successCallback, [errorCallback])](#RoomleConfigurator.getParts)
    * [.getPrice(id, successCallback, [errorCallback])](#RoomleConfigurator.getPrice)
    * [.getPerspectiveImage(id, successCallback, [errorCallback])](#RoomleConfigurator.getPerspectiveImage)
    * [.getTopImage(id, successCallback, [errorCallback])](#RoomleConfigurator.getTopImage)
    * [.getCurrentPrice(successCallback, [errorCallback])](#RoomleConfigurator.getCurrentPrice)
    * [.addToCart(successCallback, [errorCallback])](#RoomleConfigurator.addToCart)
    * [.generateBase64ImagesOfCurrentConfiguration(options, successCallback, [errorCallback])](#RoomleConfigurator.generateBase64ImagesOfCurrentConfiguration)
    * [.generateImagesOfCurrentConfiguration(successCallback, [errorCallback])](#RoomleConfigurator.generateImagesOfCurrentConfiguration)
    * [.getCurrentConfiguration(successCallback, [errorCallback])](#RoomleConfigurator.getCurrentConfiguration)
    * [.getObjectData(successCallback, [errorCallback])](#RoomleConfigurator.getObjectData)
    * [.toggleFullscreen()](#RoomleConfigurator.toggleFullscreen)
    * [.getCurrentConfigurationId(successCallback, [errorCallback])](#RoomleConfigurator.getCurrentConfigurationId)
    * [.setWebshopCallbackUrl(url)](#RoomleConfigurator.setWebshopCallbackUrl)
    * [.setShareButtonClickedCallback(callback)](#RoomleConfigurator.setShareButtonClickedCallback)
    * [.setShareLink(url)](#RoomleConfigurator.setShareLink)
    * [.openPrint(imageSize, convertFunctions)](#RoomleConfigurator.openPrint)
    * [.getCurrentDimensions(successCallback, [errorCallback])](#RoomleConfigurator.getCurrentDimensions)
    * [.saveCurrentConfiguration(successCallback, [errorCallback])](#RoomleConfigurator.saveCurrentConfiguration)
    * [.didCheckout(cart, successCallback, [errorCallback])](#RoomleConfigurator.didCheckout)
    * [.addChangeListener(callback)](#RoomleConfigurator.addChangeListener) ⇒ <code>number</code>
    * [.removeChangeListener()](#RoomleConfigurator.removeChangeListener)
    * [.addConfigurationLoadedListener(callback)](#RoomleConfigurator.addConfigurationLoadedListener) ⇒ <code>number</code>
    * [.removeConfigurationLoadedListener()](#RoomleConfigurator.removeConfigurationLoadedListener)
    * [.scbLoadComponent](#RoomleConfigurator.scbLoadComponent) ⇒ <code>void</code>

<a name="RoomleConfigurator.init"></a>

### RoomleConfigurator.init(configuratorId, htmlId, [configuration], options, [initCallback], [errorCallback]) ⇒ <code>void</code>
Initializes the iframe. Therefore the id must be a HTML id of a container element
e.g. <div id="roomle-configurator-container"></div>. The innerHTML of the container
will be replaced with the Roomle Configurator Iframe which then loads the configurator.
The configurator starts with a blank scene which means there is only a blank canvas.

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| configuratorId | <code>string</code> | the id of the configurator. You get this ID from Roomle. Without this ID you can not use the configurator |
| htmlId | <code>string</code> | corresponding HTML id of a container element which should hold the Roomle Configurator iframe |
| [configuration] | <code>string</code> &#124; <code>Object</code> | The configuration which should be loaded. This can be either a string (with JSON.stringify) or the JSON representation of the configuration |
| options | <code>Object</code> | The options which can be passed to the configurator. Right now you can change the locale with {locale: lang}. If you need no options just provide null. For lang you can use ['en', 'de', 'zh-Hans', 'it', 'fr', 'es', 'hi', 'ja', 'pt', 'pt-BR', 'pl', 'ru'] |
| [initCallback] | <code>scbInit</code> | This callback is called when Roomle 3D Editor is ready |
| [errorCallback] | <code>ecbInit</code> | This callback is called when init has errors... |

<a name="RoomleConfigurator.initWithoutWebGl"></a>

### RoomleConfigurator.initWithoutWebGl(id, [initWithoutWebGlCallback]) ⇒ <code>void</code>
Initializes the iframe. Therefore the id must be a HTML id of a container element
e.g. <div id="roomle-configurator-container"></div>. The innerHTML of the container
will be replaced with the Roomle Configurator Iframe. The Iframe is needed for the communication with
the roomle backend.

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | corresponding HTML id of a container element which should hold the Roomle Configurator iframe |
| [initWithoutWebGlCallback] | <code>scbInitWithoutWebGl</code> | This callback is called when Roomle is ready |

<a name="RoomleConfigurator.loadConfiguration"></a>

### RoomleConfigurator.loadConfiguration(The, [successCallback], [errorCallback]) ⇒ <code>void</code>
Sends a configuration to the iframe and initializes the Roomle Configurator with this scene. Every call of loadConfiguration
discards the actual scene and reinitializes the Roomle Configurator with the new configuration

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| The | <code>string</code> &#124; <code>Object</code> |  | configuration which should be loaded. This can be either a string (with JSON.stringify) or the JSON representation of the configuration |
| [successCallback] | <code>successCallback</code> | <code>defaultSuccessCallback</code> | successCallback - The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.loadComponent"></a>

### RoomleConfigurator.loadComponent(The, [successCallback], [errorCallback]) ⇒ <code>void</code>
Sends a component to the iframe and loads the component to the Roomle Kernel. After this, the component can be
used in a configuration. Sending the same component again will overwrite the old version in the Roomle Kernel

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| The | <code>string</code> &#124; <code>Object</code> |  | component which should be loaded. This can be either a string (with JSON.stringify) or the JSON representation of the component |
| [successCallback] | <code>scbLoadComponent</code> | <code>defaultSuccessCallback</code> | successCallback - The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the error. |

<a name="RoomleConfigurator.loadItem"></a>

### RoomleConfigurator.loadItem(The, [successCallback], [errorCallback]) ⇒ <code>void</code>
Sends a item to the iframe and initializes the Roomle Configurator with this scene. Every call of loadItem
discards the actual scene and reinitializes the Roomle Configurator with the new configuration

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| The | <code>string</code> |  | id which should be loaded. |
| [successCallback] | <code>successCallback</code> | <code>defaultSuccessCallback</code> | successCallback - The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.loadTag"></a>

### RoomleConfigurator.loadTag(The, [successCallback], [errorCallback]) ⇒ <code>void</code>
Loads a tag from a roomle catalog to display possible configurations before the user starts

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| The | <code>string</code> &#124; <code>Object</code> |  | configuration which should be loaded. This can be either a string (with JSON.stringify) or the JSON representation of the configuration |
| [successCallback] | <code>successCallback</code> | <code>defaultSuccessCallback</code> | successCallback - The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.setContainerId"></a>

### RoomleConfigurator.setContainerId(The, [successCallback], [errorCallback]) ⇒ <code>void</code>
Sends the used containter to Roomle so we can perform fullscreen etc

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| The | <code>string</code> |  | ID of the container which is used to embedd Roomle |
| [successCallback] | <code>successCallback</code> | <code>defaultSuccessCallback</code> | successCallback - The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.getCurrentParts"></a>

### RoomleConfigurator.getCurrentParts(successCallback, [errorCallback])
Calls the successCallback with the parts of the current configuration. If there is an error the
error callback is called with an error number and an error message

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| successCallback | <code>scbGetCurrentParts</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.setAddToCartListener"></a>

### RoomleConfigurator.setAddToCartListener(Settings, successCallback, [errorCallback])
Calls the successCallback with an cart object {id: id, visible: true/false } If there is an error the
error callback is called with an error number and an error message

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| Settings | <code>Object</code> |  | which are applied to when pressing the cart button. For button styling there has to be at least an option visible: true. e.g. {backgroundColor: '#ff0000', fontColor: '#ff00ff', text: 'CHECKOUT', visible: true}, For Image generation provide: images the options which should be passed to image generation, you can pass pixelPerMeter (default is 200) and perspectiveImageSize (default is 320 pixel, it is a square so one dimension is enough) |
| successCallback | <code>scbAddAddToCartListener</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.setFullscreenListener"></a>

### RoomleConfigurator.setFullscreenListener(listener)
Defines a callback for the embedder to inform when a user clicks on the fullscreen button

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| listener | <code>fullScreenListener</code> | The listener that handles the fullscreen event. |

<a name="RoomleConfigurator.getParts"></a>

### RoomleConfigurator.getParts(id, successCallback, [errorCallback])
Calls the successCallback with the parts of the id configuration. If there is an error the
error callback is called with an error number and an error message. This call retrieves information from roomle
backend, therefore expact higher latency at the first call

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>number</code> |  | id of the configuration |
| successCallback | <code>scbGetParts</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.getPrice"></a>

### RoomleConfigurator.getPrice(id, successCallback, [errorCallback])
Calls the successCallback with the price and the currency symbol to a given configuration id.  This call
retrieves information from roomle backend, therefore expact higher latency at the first call

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>number</code> |  | id of the configuration |
| successCallback | <code>scbGetPrice</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.getPerspectiveImage"></a>

### RoomleConfigurator.getPerspectiveImage(id, successCallback, [errorCallback])
Calls the successCallback with the url to the perspective image to a given configuration id. This call retrieves
information from roomle backend, therefore expact higher latency at the first call

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>number</code> |  | id of the configuration |
| successCallback | <code>scbGetPerspectiveImage</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.getTopImage"></a>

### RoomleConfigurator.getTopImage(id, successCallback, [errorCallback])
Calls the successCallback with the url to the top image to a given configuration id. This call retrieves
information from roomle backend, therefore expact higher latency at the first call

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>number</code> |  | id of the configuration |
| successCallback | <code>scbGetTopImage</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.getCurrentPrice"></a>

### RoomleConfigurator.getCurrentPrice(successCallback, [errorCallback])
Used to get the price of the current configuration

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| successCallback | <code>scbGetCurrentPrice</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.addToCart"></a>

### RoomleConfigurator.addToCart(successCallback, [errorCallback])
Used to get the current cart item. The configuration is saved to the server so expect high latency

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| successCallback | <code>scbAddToCart</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.generateBase64ImagesOfCurrentConfiguration"></a>

### RoomleConfigurator.generateBase64ImagesOfCurrentConfiguration(options, successCallback, [errorCallback])
Used to get top image and the perspective image of the actual configuration as base64. The images are NOT stored to the server

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | the options which should be passed to image generation, you can pass pixelPerMeter (default is 200) and perspectiveImageSize (default is 320 pixel, it is a square so one dimension is enough) |
| successCallback | <code>scbGenerateBase64ImagesOfCurrentConfiguration</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.generateImagesOfCurrentConfiguration"></a>

### RoomleConfigurator.generateImagesOfCurrentConfiguration(successCallback, [errorCallback])
Used to get top image and the perspective image of the actual configuration. The images are stored to the server
and the URL is returned. This goes over the web so expect higher latecy

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| successCallback | <code>scbGenerateImagesOfCurrentConfiguration</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.getCurrentConfiguration"></a>

### RoomleConfigurator.getCurrentConfiguration(successCallback, [errorCallback])
Used to get the current configuration. It returns the configuration and the hash

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| successCallback | <code>scbGetCurrentConfiguration</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.getObjectData"></a>

### RoomleConfigurator.getObjectData(successCallback, [errorCallback])
Used to get the data of an object with its ID

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| successCallback | <code>scbGetObjectData</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.toggleFullscreen"></a>

### RoomleConfigurator.toggleFullscreen()
Used to get inform the configurator that fullscreen changed from outside

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  
<a name="RoomleConfigurator.getCurrentConfigurationId"></a>

### RoomleConfigurator.getCurrentConfigurationId(successCallback, [errorCallback])
Used to get the current configuration id, therefore the data needs to be presisted to the roomle db. Expect higher latency because this needs to go through the web

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| successCallback | <code>scbGetCurrentConfigurationId</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.setWebshopCallbackUrl"></a>

### RoomleConfigurator.setWebshopCallbackUrl(url)
Used to get the current configuration id, therefore the data needs to be presisted to the roomle db. Expect higher latency because this needs to go through the web

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | The url which should be visited after the user planned his configuration in the iOS app |

<a name="RoomleConfigurator.setShareButtonClickedCallback"></a>

### RoomleConfigurator.setShareButtonClickedCallback(callback)
Sets the callback which is triggered when the user clicks on the share button

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>eventCallback</code> | this callback is called when the user clicks on the share button |

<a name="RoomleConfigurator.setShareLink"></a>

### RoomleConfigurator.setShareLink(url)
Sets the url of the share pop up, this should be called "inside" the setShareButtonClickedCallback

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | the url of the share link (could be a async call to a shortener) |

<a name="RoomleConfigurator.openPrint"></a>

### RoomleConfigurator.openPrint(imageSize, convertFunctions)
Used to open the print dialog

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| imageSize | <code>Number</code> | size of the generated image in pixel. Because the image is square we only need one dimension |
| convertFunctions | <code>Object</code> | objects with converter functions for price and dimensions. Provide a function on key price to formate currency and price (parameters are currency (=string) and price (=float)). Provide a function to key dimensions to convert dimensions (parameter is a object with x, y, z) |

<a name="RoomleConfigurator.getCurrentDimensions"></a>

### RoomleConfigurator.getCurrentDimensions(successCallback, [errorCallback])
Used to get the dimensions of the current configuration

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| successCallback | <code>scbGetCurrentDimensions</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.saveCurrentConfiguration"></a>

### RoomleConfigurator.saveCurrentConfiguration(successCallback, [errorCallback])
Used to save the current configuration to the roomle backend, also the generated images are presisted! This request goes over the web so expect higher latency

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| successCallback | <code>scbSaveCurrentConfiguration</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.didCheckout"></a>

### RoomleConfigurator.didCheckout(cart, successCallback, [errorCallback])
When the user is doing his checkout you have to call this function. The cart is an array of cart items

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cart | <code>Object</code> |  | An array of all cart items. Every item has to have the following properties: configurationId:string, count:int and price:float |
| successCallback | <code>scbDidCheckout</code> |  | The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="RoomleConfigurator.addChangeListener"></a>

### RoomleConfigurator.addChangeListener(callback) ⇒ <code>number</code>
Used to register a change listener to the configuration. The callback is always called when the configuration changes

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  
**Returns**: <code>number</code> - they key where the listener is stored. Use this key to remove the listener  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>cbAddChangeListener</code> | The callback that handles the change. |

<a name="RoomleConfigurator.removeChangeListener"></a>

### RoomleConfigurator.removeChangeListener()
Used to remove a change listener to the configuration.

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  
<a name="RoomleConfigurator.addConfigurationLoadedListener"></a>

### RoomleConfigurator.addConfigurationLoadedListener(callback) ⇒ <code>number</code>
Used to register listener which triggers when the configuration is loaded. The callback is always called when a new configuration is loaded

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  
**Returns**: <code>number</code> - they key where the listener is stored. Use this key to remove the listener  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>cbAddConfigurationLoadedListener</code> | The callback that handles the change. |

<a name="RoomleConfigurator.removeConfigurationLoadedListener"></a>

### RoomleConfigurator.removeConfigurationLoadedListener()
Used to remove a change listener to the configuration.

**Kind**: static method of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  
<a name="RoomleConfigurator.scbLoadComponent"></a>

### RoomleConfigurator.scbLoadComponent ⇒ <code>void</code>
Success callback for loadComponent, the Roomle Kernel returns the component id how it is stored in the Roomle Kernel

**Kind**: static typedef of <code>[RoomleConfigurator](#RoomleConfigurator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| string |  |  | componentId          /** Sends a configuration to the iframe and initializes the Roomle Configurator with this scene. Every call of loadConfiguration discards the actual scene and reinitializes the Roomle Configurator with the new configuration |
| The | <code>string</code> &#124; <code>Object</code> |  | configuration which should be loaded. This can be either a string (with JSON.stringify) or the JSON representation of the configuration |
| [successCallback] | <code>successCallback</code> | <code>defaultSuccessCallback</code> | successCallback - The callback that handles the response. |
| [errorCallback] | <code>errorCallback</code> | <code>defaultErrorCallback</code> | errorCallback - The callback that handles the response. |

<a name="UserCallbacks"></a>

## UserCallbacks : <code>object</code>
This namespace is used to encapsulate all callbacks which needs to be provided
by the user of the API

**Kind**: global namespace  

* [UserCallbacks](#UserCallbacks) : <code>object</code>
    * [.scbInit](#UserCallbacks.scbInit) : <code>function</code>
    * [.ecbInit](#UserCallbacks.ecbInit) : <code>function</code>
    * [.scbInitWithoutWebGl](#UserCallbacks.scbInitWithoutWebGl) : <code>function</code>
    * [.scbGetCurrentParts](#UserCallbacks.scbGetCurrentParts) : <code>function</code>
    * [.scbAddAddToCartListener](#UserCallbacks.scbAddAddToCartListener) : <code>function</code>
    * [.fullScreenListener](#UserCallbacks.fullScreenListener) : <code>function</code>
    * [.scbGetParts](#UserCallbacks.scbGetParts) : <code>function</code>
    * [.scbGetPrice](#UserCallbacks.scbGetPrice) : <code>function</code>
    * [.scbGetPerspectiveImage](#UserCallbacks.scbGetPerspectiveImage) : <code>function</code>
    * [.scbGetTopImage](#UserCallbacks.scbGetTopImage) : <code>function</code>
    * [.scbGetCurrentPrice](#UserCallbacks.scbGetCurrentPrice) : <code>function</code>
    * [.scbAddToCart](#UserCallbacks.scbAddToCart) : <code>function</code>
    * [.scbGenerateImagesOfCurrentConfiguration](#UserCallbacks.scbGenerateImagesOfCurrentConfiguration) : <code>function</code>
    * [.scbGenerateImagesOfCurrentConfiguration](#UserCallbacks.scbGenerateImagesOfCurrentConfiguration) : <code>function</code>
    * [.scbGetCurrentConfiguration](#UserCallbacks.scbGetCurrentConfiguration) : <code>function</code>
    * [.scbGetObjectData](#UserCallbacks.scbGetObjectData) : <code>function</code>
    * [.scbGetCurrentConfigurationId](#UserCallbacks.scbGetCurrentConfigurationId) : <code>function</code>
    * [.scbGetCurrentDimensions](#UserCallbacks.scbGetCurrentDimensions) : <code>function</code>
    * [.scbSaveCurrentConfiguration](#UserCallbacks.scbSaveCurrentConfiguration) : <code>function</code>
    * [.scbDidCheckout](#UserCallbacks.scbDidCheckout) : <code>function</code>
    * [.cbAddChangeListener](#UserCallbacks.cbAddChangeListener) : <code>function</code>
    * [.cbAddConfigurationLoadedListener](#UserCallbacks.cbAddConfigurationLoadedListener) : <code>function</code>
    * [.errorCallback](#UserCallbacks.errorCallback) : <code>function</code>

<a name="UserCallbacks.scbInit"></a>

### UserCallbacks.scbInit : <code>function</code>
Success callback for initCallback, this callback is called when Roomle 3D is ready

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  
<a name="UserCallbacks.ecbInit"></a>

### UserCallbacks.ecbInit : <code>function</code>
Error callback when init fails

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  
<a name="UserCallbacks.scbInitWithoutWebGl"></a>

### UserCallbacks.scbInitWithoutWebGl : <code>function</code>
Success callback for initWithoutWebGlCallback, this callback is called when Roomle 3D is ready

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  
<a name="UserCallbacks.scbGetCurrentParts"></a>

### UserCallbacks.scbGetCurrentParts : <code>function</code>
Success callback for getCurrentParts, the parts are returned as an array of objects. Each object is a part

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type |
| --- | --- |
| currentParts | <code>Object</code> | 

<a name="UserCallbacks.scbAddAddToCartListener"></a>

### UserCallbacks.scbAddAddToCartListener : <code>function</code>
Success callback for scbAddAddToCartListener, the cart object {id: id, visible: true/false } is returned

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type |
| --- | --- |
| cartObject | <code>Object</code> | 

<a name="UserCallbacks.fullScreenListener"></a>

### UserCallbacks.fullScreenListener : <code>function</code>
This listener is triggered when the user clicks on the fullscreen button

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  
<a name="UserCallbacks.scbGetParts"></a>

### UserCallbacks.scbGetParts : <code>function</code>
Success callback for getCurrentParts, the parts are returned as an array of objects. Each object is a part

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type |
| --- | --- |
| currentParts | <code>Object</code> | 

<a name="UserCallbacks.scbGetPrice"></a>

### UserCallbacks.scbGetPrice : <code>function</code>
Success callback for getPrice, price is returned as a number and the currency is returned as currency symbol

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type |
| --- | --- |
| price | <code>number</code> | 
| currency | <code>string</code> | 

<a name="UserCallbacks.scbGetPerspectiveImage"></a>

### UserCallbacks.scbGetPerspectiveImage : <code>function</code>
Success callback for getPerspectiveImage, it passes the url of the perspective image to the user

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | url of the perspective image. Can be null if there is no image stored on the server |

<a name="UserCallbacks.scbGetTopImage"></a>

### UserCallbacks.scbGetTopImage : <code>function</code>
Success callback for getTopImage, it passes the url of the perspective image to the user

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | url of the top image. Can be null if there is no image stored on the server |

<a name="UserCallbacks.scbGetCurrentPrice"></a>

### UserCallbacks.scbGetCurrentPrice : <code>function</code>
Success callback for getCurrentPrice. It passes price as a number and currency symbol as a character

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type | Description |
| --- | --- | --- |
| Price | <code>number</code> |  |
| currencySymbol | <code>string</code> | as one character |

<a name="UserCallbacks.scbAddToCart"></a>

### UserCallbacks.scbAddToCart : <code>function</code>
Success callback for addToCart. It passes the cart item

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type | Description |
| --- | --- | --- |
| cart | <code>object</code> | item |

<a name="UserCallbacks.scbGenerateImagesOfCurrentConfiguration"></a>

### UserCallbacks.scbGenerateImagesOfCurrentConfiguration : <code>function</code>
Success callback for generateBase64ImagesOfCurrentConfiguration. It passes topImage and persepctiveImage to the caller
encoded as base64/png (this is because only strings can passed via iframe)

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type | Description |
| --- | --- | --- |
| topImageAsBase64Png | <code>string</code> | encoded as base64/png, this is the bird's-eye view of the configuration |
| perspectiveImageAsBase64Png | <code>string</code> | encoded as base64/png, this is the 3d view of the configuration |

<a name="UserCallbacks.scbGenerateImagesOfCurrentConfiguration"></a>

### UserCallbacks.scbGenerateImagesOfCurrentConfiguration : <code>function</code>
Success callback for generateImagesOfCurrentConfiguration. It passes topImage and persepctiveImage to the caller
as the URL pointing to the locations of the images on the server

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type | Description |
| --- | --- | --- |
| topImageUrl | <code>string</code> | URL to the top image |
| perspectiveImageUrl | <code>string</code> | URL to the perspective image |

<a name="UserCallbacks.scbGetCurrentConfiguration"></a>

### UserCallbacks.scbGetCurrentConfiguration : <code>function</code>
Success callback for getCurrentConfiguration. It passes configuration as object and the hash of the configuration
to the caller

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type | Description |
| --- | --- | --- |
| configuration | <code>object</code> | the actual configuration as object. It is just JSON.parse(configurationString) |

<a name="UserCallbacks.scbGetObjectData"></a>

### UserCallbacks.scbGetObjectData : <code>function</code>
Success callback for scbGetObjectData. It passes the data of the object
to the caller

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | of the object |

<a name="UserCallbacks.scbGetCurrentConfigurationId"></a>

### UserCallbacks.scbGetCurrentConfigurationId : <code>function</code>
Success callback for getCurrentConfigurationId. It passes configuration as object and the hash of the configuration
to the caller

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type | Description |
| --- | --- | --- |
| configurationHash | <code>string</code> | the actual configuration as object. It is just JSON.parse(configurationString) |

<a name="UserCallbacks.scbGetCurrentDimensions"></a>

### UserCallbacks.scbGetCurrentDimensions : <code>function</code>
Success callback for getCurrentDimensions. It passes back the dimensions of the configuration
to the caller

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type |
| --- | --- |
| dimensions | <code>object</code> | 

<a name="UserCallbacks.scbSaveCurrentConfiguration"></a>

### UserCallbacks.scbSaveCurrentConfiguration : <code>function</code>
Success callback for saveCurrentConfiguration. It passes back the save configuration object
to the caller

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type | Description |
| --- | --- | --- |
| savedConfiguration | <code>object</code> | the saved configuration how it's stored in the roomle backend |

<a name="UserCallbacks.scbDidCheckout"></a>

### UserCallbacks.scbDidCheckout : <code>function</code>
Success callback for didCheckout

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  
<a name="UserCallbacks.cbAddChangeListener"></a>

### UserCallbacks.cbAddChangeListener : <code>function</code>
Success callback for getCurrentConfigurationId. It passes configuration as object and the hash of the configuration
to the caller

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type | Description |
| --- | --- | --- |
| price | <code>number</code> | the actual price of the configuration |

<a name="UserCallbacks.cbAddConfigurationLoadedListener"></a>

### UserCallbacks.cbAddConfigurationLoadedListener : <code>function</code>
Success callback for getCurrentConfigurationId. It passes configuration as object and the hash of the configuration
to the caller

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  
<a name="UserCallbacks.errorCallback"></a>

### UserCallbacks.errorCallback : <code>function</code>
This callback is displayed as a global member.

**Kind**: static typedef of <code>[UserCallbacks](#UserCallbacks)</code>  

| Param | Type | Description |
| --- | --- | --- |
| Error | <code>string</code> | message |

<a name="InternalCallbacks"></a>

## InternalCallbacks : <code>object</code>
This namespace is used to encapsulate all callbacks which are used internally

**Kind**: global namespace  

* [InternalCallbacks](#InternalCallbacks) : <code>object</code>
    * [.scbGeneric](#InternalCallbacks.scbGeneric) : <code>function</code>
    * [.ecbGeneric](#InternalCallbacks.ecbGeneric) : <code>function</code>
    * [.eventCallback](#InternalCallbacks.eventCallback) : <code>function</code>
    * [.ecbInitInternal](#InternalCallbacks.ecbInitInternal) : <code>function</code>
    * [.scbInitInternal](#InternalCallbacks.scbInitInternal) : <code>function</code>

<a name="InternalCallbacks.scbGeneric"></a>

### InternalCallbacks.scbGeneric : <code>function</code>
Success callback which is saved into our callback map

**Kind**: static typedef of <code>[InternalCallbacks](#InternalCallbacks)</code>  
<a name="InternalCallbacks.ecbGeneric"></a>

### InternalCallbacks.ecbGeneric : <code>function</code>
Error callback which is saved into our callback map

**Kind**: static typedef of <code>[InternalCallbacks](#InternalCallbacks)</code>  
<a name="InternalCallbacks.eventCallback"></a>

### InternalCallbacks.eventCallback : <code>function</code>
callback which is called with all params passed by the event

**Kind**: static typedef of <code>[InternalCallbacks](#InternalCallbacks)</code>  
<a name="InternalCallbacks.ecbInitInternal"></a>

### InternalCallbacks.ecbInitInternal : <code>function</code>
Error callback which is saved into our callback map and called after an error on init

**Kind**: static typedef of <code>[InternalCallbacks](#InternalCallbacks)</code>  
<a name="InternalCallbacks.scbInitInternal"></a>

### InternalCallbacks.scbInitInternal : <code>function</code>
Success callback which is saved into our callback map and called after init

**Kind**: static typedef of <code>[InternalCallbacks](#InternalCallbacks)</code>  
<a name="RoomleConfiguratorPrivate"></a>

## RoomleConfiguratorPrivate : <code>object</code>
RoomleConfiguratorPrivate represents state and methods which should NOT be accessed
outside of the Roomle Configurator Module

**Kind**: global namespace  

* [RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate) : <code>object</code>
    * [._isLoaded](#RoomleConfiguratorPrivate._isLoaded)
    * [._isFullscreen](#RoomleConfiguratorPrivate._isFullscreen)
    * [._rapiOnly](#RoomleConfiguratorPrivate._rapiOnly)
    * [._initInProgress](#RoomleConfiguratorPrivate._initInProgress)
    * [._getIframeCode(conversationId, [rapiOlny], configuratorId, [options])](#RoomleConfiguratorPrivate._getIframeCode)
    * [._sendToRoomle(command)](#RoomleConfiguratorPrivate._sendToRoomle)
    * [._callSuccessCallback(expectedArgs, response, conversationId, [preserve])](#RoomleConfiguratorPrivate._callSuccessCallback)
    * [._callChangeListener(response)](#RoomleConfiguratorPrivate._callChangeListener)
    * [._callConfigurationLoadedListener(response)](#RoomleConfiguratorPrivate._callConfigurationLoadedListener)
    * [._handleResponse(command, conversationId, data)](#RoomleConfiguratorPrivate._handleResponse)
    * [._throwError(message)](#RoomleConfiguratorPrivate._throwError)
    * [._warn(message)](#RoomleConfiguratorPrivate._warn)
    * [._error(message)](#RoomleConfiguratorPrivate._error) ⇒ <code>Error</code>
    * [._addSuccessCallback(conversationId, command, data)](#RoomleConfiguratorPrivate._addSuccessCallback)
    * [._addErrorCallback(conversationId, command, data)](#RoomleConfiguratorPrivate._addErrorCallback)
    * [._nextConversationId()](#RoomleConfiguratorPrivate._nextConversationId) ⇒ <code>number</code>
    * [._nextListenerId()](#RoomleConfiguratorPrivate._nextListenerId) ⇒ <code>number</code>
    * [._registerListener(functionName, successCallback, errorCallback, specialConversationId)](#RoomleConfiguratorPrivate._registerListener)
    * [._removeListener(listenerId)](#RoomleConfiguratorPrivate._removeListener)
    * [._registerEventListener(eventName, callback)](#RoomleConfiguratorPrivate._registerEventListener)
    * [._removeEventListener(eventName, callback)](#RoomleConfiguratorPrivate._removeEventListener)
    * [._callEventListener(eventName, args)](#RoomleConfiguratorPrivate._callEventListener)
    * [._registerConfigurationLoadedListener(functionName, successCallback, errorCallback, specialConversationId)](#RoomleConfiguratorPrivate._registerConfigurationLoadedListener)
    * [._removeConfigurationLoadedListener(listenerId)](#RoomleConfiguratorPrivate._removeConfigurationLoadedListener)
    * [._registerCallbacks(functionName, successCallback, errorCallback, [specialConversationId])](#RoomleConfiguratorPrivate._registerCallbacks)
    * [._receiveFromRoomle(event)](#RoomleConfiguratorPrivate._receiveFromRoomle)
    * [._init(configuratorId, id, [configuration], [options], [rapiOnly], [initCallback], successCallback, errorCallback)](#RoomleConfiguratorPrivate._init)
    * [._finishedInit()](#RoomleConfiguratorPrivate._finishedInit)
    * [._isAvailable(methodname, needsWebGl)](#RoomleConfiguratorPrivate._isAvailable) ⇒ <code>boolean</code>
    * [.defaultErrorCallback](#RoomleConfiguratorPrivate.defaultErrorCallback) : <code>function</code>
    * [.defaultSuccessCallback](#RoomleConfiguratorPrivate.defaultSuccessCallback) : <code>function</code>

<a name="RoomleConfiguratorPrivate._isLoaded"></a>

### RoomleConfiguratorPrivate._isLoaded
is set to true if Roomle Configurator is loaded

**Kind**: static property of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  
**Field**:   
<a name="RoomleConfiguratorPrivate._isFullscreen"></a>

### RoomleConfiguratorPrivate._isFullscreen
is set to true if Roomle Configurator is in fullscreen

**Kind**: static property of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  
**Field**:   
<a name="RoomleConfiguratorPrivate._rapiOnly"></a>

### RoomleConfiguratorPrivate._rapiOnly
this flag indicates if the user only wants to use rapi access or not. If not also 3D editor is called

**Kind**: static property of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  
**Field**:   
<a name="RoomleConfiguratorPrivate._initInProgress"></a>

### RoomleConfiguratorPrivate._initInProgress
this flag indicates if init process is already in progress

**Kind**: static property of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  
**Field**:   
<a name="RoomleConfiguratorPrivate._getIframeCode"></a>

### RoomleConfiguratorPrivate._getIframeCode(conversationId, [rapiOlny], configuratorId, [options])
Getter for the iframe code! ConversationId is important, so that Roomle can response when it is ready

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| conversationId | <code>number</code> | Conversation id on which Roomle should responsed when it's ready |
| [rapiOlny] | <code>boolean</code> | boolean to indicated if user wants also the 3d editor or only the rapi interface |
| configuratorId | <code>string</code> | The id of the configurator |
| [options] | <code>Object</code> | Options which should be passed to the iframe before roomle is loaded. Right now it is {locale: de, sameOrigin: true|false} |

<a name="RoomleConfiguratorPrivate._sendToRoomle"></a>

### RoomleConfiguratorPrivate._sendToRoomle(command)
Sends a command to Roomle so Roomle can react to things from the outside

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>Array</code> | which is sent to Roomle Configurator. First parameter is always a string specifyng which action should be triggered in Roomle. The others are just arguments which can vary by each command |

<a name="RoomleConfiguratorPrivate._callSuccessCallback"></a>

### RoomleConfiguratorPrivate._callSuccessCallback(expectedArgs, response, conversationId, [preserve])
Helper function to call the right callback. This is needed because we can only communicate with strings over the iframe

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| expectedArgs | <code>number</code> | how many we are expecting as response from Roomle. |
| response | <code>Array</code> | the data which is send from Roomle. It is an Array which holds the data |
| conversationId | <code>number</code> | the corresponding conversation id. This id is important to be able to call the correct callback |
| [preserve] | <code>boolean</code> | if true the callback is NOT removed after execution |

<a name="RoomleConfiguratorPrivate._callChangeListener"></a>

### RoomleConfiguratorPrivate._callChangeListener(response)
Helper function to call all change listener.

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Array</code> | the data which is send from Roomle. It is an Array which holds the data |

<a name="RoomleConfiguratorPrivate._callConfigurationLoadedListener"></a>

### RoomleConfiguratorPrivate._callConfigurationLoadedListener(response)
Helper function to call all _callConfigurationLoadedListener.

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Array</code> | the data which is send from Roomle. It is an Array which holds the data |

<a name="RoomleConfiguratorPrivate._handleResponse"></a>

### RoomleConfiguratorPrivate._handleResponse(command, conversationId, data)
This function handles responses from Roomle. Because the data returned varies depending on which action caused the response there is a handler function
which knows what kind of data is expected and forwards this data in the correct format to the callback

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| command | <code>string</code> | to which Roomle responded |
| conversationId | <code>number</code> | conversation id which triggered the response of Roomle. This is important to find the corresponding callback |
| data | <code>any</code> | the data which is returned from Roomle. This can be everything. |

<a name="RoomleConfiguratorPrivate._throwError"></a>

### RoomleConfiguratorPrivate._throwError(message)
Convenience method to throw Errors if Roomle configurator encountered an error
which knows what kind of data is expected and forwards this data in the correct format to the callback

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  
**Throws**:

- Exception with the given error message


| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | the error message |

<a name="RoomleConfiguratorPrivate._warn"></a>

### RoomleConfiguratorPrivate._warn(message)
Convenience method to warn the user of the API if something is not totally correct.

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | the error message |

<a name="RoomleConfiguratorPrivate._error"></a>

### RoomleConfiguratorPrivate._error(message) ⇒ <code>Error</code>
Convenience method to create error messages which are given to the user

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  
**Returns**: <code>Error</code> - an error with the given error message  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | the error message |

<a name="RoomleConfiguratorPrivate._addSuccessCallback"></a>

### RoomleConfiguratorPrivate._addSuccessCallback(conversationId, command, data)
Adds a success callback to the success callback map. The conversation id is used as key, so we can react easyly to every response

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| conversationId | <code>number</code> | conversation id which triggered the response of Roomle. This is important to find the corresponding callback |
| command | <code>string</code> | to which Roomle responded |
| data | <code>any</code> | the data which is returned from Roomle. This can be everything. |

<a name="RoomleConfiguratorPrivate._addErrorCallback"></a>

### RoomleConfiguratorPrivate._addErrorCallback(conversationId, command, data)
Adds an error callback to the error callback map. The conversation id is used as key, so we can react easyly to every response

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| conversationId | <code>number</code> | conversation id which triggered the response of Roomle. This is important to find the corresponding callback |
| command | <code>string</code> | to which Roomle responded |
| data | <code>any</code> | the data which is returned from Roomle. This can be everything. |

<a name="RoomleConfiguratorPrivate._nextConversationId"></a>

### RoomleConfiguratorPrivate._nextConversationId() ⇒ <code>number</code>
Returns the next available conversation id. Always use this function and don't increment _conversationId manually!

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  
**Returns**: <code>number</code> - the next available conversation id  
<a name="RoomleConfiguratorPrivate._nextListenerId"></a>

### RoomleConfiguratorPrivate._nextListenerId() ⇒ <code>number</code>
Returns the next available listener id. Always use this function and don't increment _conversationId manually!

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  
**Returns**: <code>number</code> - the next available listener id  
<a name="RoomleConfiguratorPrivate._registerListener"></a>

### RoomleConfiguratorPrivate._registerListener(functionName, successCallback, errorCallback, specialConversationId)
registers a change listener. With the returned id the listener can be remove again

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| functionName | <code>string</code> | This name is needed to provide better debugging information to the user |
| successCallback | <code>scbGeneric</code> | to which Roomle responded |
| errorCallback | <code>ecbGeneric</code> | to which Roomle responded |
| specialConversationId | <code>number</code> | [specialConversationId=null] provide a special conversation id if the handling of the callbacks differs to the regular behavior |

<a name="RoomleConfiguratorPrivate._removeListener"></a>

### RoomleConfiguratorPrivate._removeListener(listenerId)
remove a change listener. Therefore you need the id which is returned by addChangeListener

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| listenerId | <code>number</code> | listener which should be removed |

<a name="RoomleConfiguratorPrivate._registerEventListener"></a>

### RoomleConfiguratorPrivate._registerEventListener(eventName, callback)
registers an event listener.

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | name of event which we want to listen to |
| callback | <code>eventCallback</code> | callback which is called with all params passed by the event |

<a name="RoomleConfiguratorPrivate._removeEventListener"></a>

### RoomleConfiguratorPrivate._removeEventListener(eventName, callback)
removes an event listener.

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | name of event which we want the listener to remove |
| callback | <code>eventCallback</code> | callback which should be removed |

<a name="RoomleConfiguratorPrivate._callEventListener"></a>

### RoomleConfiguratorPrivate._callEventListener(eventName, args)
Calls all event listener which are listening to a certain event.

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | name of event which we want the listener to call |
| args | <code>array</code> | arguments which are passed to the event listener |

<a name="RoomleConfiguratorPrivate._registerConfigurationLoadedListener"></a>

### RoomleConfiguratorPrivate._registerConfigurationLoadedListener(functionName, successCallback, errorCallback, specialConversationId)
registers a change listener which fires when a new configuration is loaded. With the returned id the listener can be remove again

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| functionName | <code>string</code> | This name is needed to provide better debugging information to the user |
| successCallback | <code>scbGeneric</code> | to which Roomle responded |
| errorCallback | <code>ecbGeneric</code> | to which Roomle responded |
| specialConversationId | <code>number</code> | [specialConversationId=null] provide a special conversation id if the handling of the callbacks differs to the regular behavior |

<a name="RoomleConfiguratorPrivate._removeConfigurationLoadedListener"></a>

### RoomleConfiguratorPrivate._removeConfigurationLoadedListener(listenerId)
remove a ConfigurationLoadedListener. Therefore you need the id which is returned by addChangeListener

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| listenerId | <code>number</code> | listener which should be removed |

<a name="RoomleConfiguratorPrivate._registerCallbacks"></a>

### RoomleConfiguratorPrivate._registerCallbacks(functionName, successCallback, errorCallback, [specialConversationId])
registers the callbacks in the callback map. This is needed to call the correct callback after the response of Roomle is received

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| functionName | <code>string</code> | This name is needed to provide better debugging information to the user |
| successCallback | <code>scbGeneric</code> | to which Roomle responded |
| errorCallback | <code>ecbGeneric</code> | to which Roomle responded |
| [specialConversationId] | <code>number</code> | provide a special conversation id if the handling of the callbacks differs to the regular behavior |

<a name="RoomleConfiguratorPrivate._receiveFromRoomle"></a>

### RoomleConfiguratorPrivate._receiveFromRoomle(event)
Helper function which parses the response from Roomle.

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>MessageEvent</code> | an event according to https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent, the data is a JSON string, encoded with JSON.stringify |

<a name="RoomleConfiguratorPrivate._init"></a>

### RoomleConfiguratorPrivate._init(configuratorId, id, [configuration], [options], [rapiOnly], [initCallback], successCallback, errorCallback)
Helper function for initializing roomle.

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| configuratorId | <code>string</code> | The id of the configurator |
| id | <code>string</code> | corresponding HTML id of a container element which should hold the Roomle Configurator iframe |
| [configuration] | <code>string</code> &#124; <code>Object</code> | The configuration which should be loaded. This can be either a string (with JSON.stringify) or the JSON representation of the configuration |
| [options] | <code>Object</code> | Options which should be passed to the iframe before roomle is loaded. Right now it is {locale: de} |
| [rapiOnly] | <code>Boolean</code> | flag which is true if there is no WebGL needed |
| [initCallback] | <code>scbInit</code> | This callback is called when Roomle 3D Editor is ready |
| successCallback | <code>scbInitInternal</code> | This callback is called when Roomle 3D Editor is ready |
| errorCallback | <code>ecbInitInternal</code> | This callback is called when Roomle 3D Editor is ready |

<a name="RoomleConfiguratorPrivate._finishedInit"></a>

### RoomleConfiguratorPrivate._finishedInit()
Helper function which should be called when init is finished.

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  
<a name="RoomleConfiguratorPrivate._isAvailable"></a>

### RoomleConfiguratorPrivate._isAvailable(methodname, needsWebGl) ⇒ <code>boolean</code>
Helper function to check if method is available. This is mainly used to check if the user tries to access a webgl method but only requested rapi-only

**Kind**: static method of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  
**Returns**: <code>boolean</code> - returns true if method is available and false if not  

| Param | Type | Description |
| --- | --- | --- |
| methodname | <code>string</code> | needed to provide better debugging information |
| needsWebGl | <code>boolean</code> | specifiy if the method needs webgl or not |

<a name="RoomleConfiguratorPrivate.defaultErrorCallback"></a>

### RoomleConfiguratorPrivate.defaultErrorCallback : <code>function</code>
This is a default error callback. This callback is called if
there is no error callback provided by the user of the function
the error message will contain the name of the API call which
is missing an error callback

**Kind**: static typedef of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  
**Throws**:

- Throws an error with the message given


| Param | Type | Description |
| --- | --- | --- |
| Error | <code>string</code> | message |

<a name="RoomleConfiguratorPrivate.defaultSuccessCallback"></a>

### RoomleConfiguratorPrivate.defaultSuccessCallback : <code>function</code>
This is a default success callback. This callback is called if
there is no success callback provided by the user of the function
this fallback is only used if successCallback is optional
this method is empty on purpose!

**Kind**: static typedef of <code>[RoomleConfiguratorPrivate](#RoomleConfiguratorPrivate)</code>  
