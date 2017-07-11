/**
 * @name RoomleConfigurator
 * @namespace
 */

/**
 * This namespace is used to encapsulate all callbacks which needs to be provided
 * by the user of the API
 * @name UserCallbacks
 * @namespace
 */

/**
 * This namespace is used to encapsulate all callbacks which are used internally
 * @name InternalCallbacks
 * @namespace
 */

/**
 * RoomleConfiguratorPrivate represents state and methods which should NOT be accessed
 * outside of the Roomle Configurator Module
 * @name RoomleConfiguratorPrivate
 * @namespace
 */


window.RoomleConfigurator = (function (win, doc) {
    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

    var privateObject = {
        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @description is set to true if Roomle Configurator is loaded
         * @name _isLoaded
         */
        _isLoaded: false,

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @description is set to true if Roomle Configurator is in fullscreen
         * @name _isFullscreen
         */
        _isFullscreen: false,

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @description this flag indicates if the user only wants to use rapi access or not. If not also 3D editor is called
         * @name _rapiOnly
         */
        _rapiOnly: false,

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @description this flag indicates if init process is already in progress
         * @name _initInProgress
         */
        _initInProgress: false,

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @private
         * @description instance of the roomle iframe. This is save to not search it again on every call
         * @name _roomleIframe
         */
        _roomleIframe: null,

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @private
         * @description the base url of the roomle webapp
         * @name _iframeCode
         */
        _baseUrl: 'http://localhost:4200/app/',

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @private
         * @description the iframe code which reloads the configurator, the conversationId of the init call has to be given as parameter to Roomle! Therefore always use the getter
         * @name _iframeCode
         */
        _iframeCode: '<iframe src="###baseurl###standalone/configurator/[conversationId][options]" style="width: 100%; height: 100%; border: none;"></iframe>',

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @private
         * @description a shared conversation id between roomle configurator and the main website. This is needed to call the correct callback if there are simultaneous calls to the same API function. Conversation ids 0-9 are reserved for special needs, e.g. init or addChangeListener
         * @name _conversationId
         */
        _conversationId: 9, // start with 9, next free is 10, other ids are reserved for special events 0 = init finished

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @private
         * @description the id of the listener callback
         * @name _listenerId
         */
        _listenerId: 0,

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @private
         * @description the id of html element to which the iframe is attached
         * @name _elementId
         */
        _elementId: null,

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @private
         * @description A map of successCallbacks. This is needed because communication between iframe is async. To find the correct success callback the conversation id is the key in the map to the corresponding callback
         * @name _successCallbacks
         */
        _successCallbacks: {}, // object on purpose! a map is more efficient than an array in this case, no recalc of length etc if a element is deleted

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @private
         * @description A map of errorCallbacks. This is needed because communication between iframe is async. To find the correct error callback the conversation id is the key in the map to the corresponding callback
         * @name _errorCallbacks
         */
        _errorCallbacks: {}, // object on purpose! a map is more efficient than an array in this case, no recalc of length etc if a element is deleted

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @private
         * @description A map of eventListeners.
         * @name _eventListeners
         */
        _eventListeners: {}, // object on purpose! a map is more efficient than an array in this case, no recalc of length etc if a element is deleted


        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @private
         * @description A map of listenerSuccessCallbacks.
         * @name _listenerSuccessCallbacks
         */
        _listenerSuccessCallbacks: {}, // object on purpose! a map is more efficient than an array in this case, no recalc of length etc if a element is deleted

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @private
         * @description A map of listenerErrorCallbacks.
         * @name _listenerErrorCallbacks
         */
        _listenerErrorCallbacks: {}, // object on purpose! a map is more efficient than an array in this case, no recalc of length etc if a element is deleted

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @private
         * @description A map of configurationLoadedListenerErrorCallbacks.
         * @name _configurationLoadedListenerErrorCallbacks
         */
        _configurationLoadedListenerErrorCallbacks: {},

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @private
         * @description A map of configurationLoadedListenerSuccessCallbacks.
         * @name _configurationLoadedListenerSuccessCallbacks
         */
        _configurationLoadedListenerSuccessCallbacks: {},

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @field
         * @private
         * @description Callback when fullscreen is changed from outside
         * @name _toggleFullscreen
         */
        _toggleFullscreen: function () {

        },

        /**
         * @memberOf RoomleConfiguratorPrivate
         * @private
         * @description transforms options to url params to bypass security issues
         * @name _optionsToUrl
         */
        _optionsToUrl: function (options) {
            var queryParams = '';
            var seperator = '?';
            for (var option in options) {
                if (options.hasOwnProperty(option)) {
                    var key = (option === 'locale') ? 'overrideLocale' : option;
                    var value = options[option];
                    if (key && key.length > 1 && key[0] === '_' && key[1] === '_') {
                        continue;
                    }
                    if (typeof value === 'function') {
                        continue;
                    }
                    queryParams += seperator + key + '=' + value;
                    seperator = '&';
                }
            }
            return queryParams;
        },

        /**
         * Getter for the iframe code! ConversationId is important, so that Roomle can response when it is ready
         * @memberOf RoomleConfiguratorPrivate
         * @param {number} conversationId Conversation id on which Roomle should responsed when it's ready
         * @param {boolean} [rapiOlny] boolean to indicated if user wants also the 3d editor or only the rapi interface
         * @param {string} configuratorId - The id of the configurator
         * @param {Object} [options] Options which should be passed to the iframe before roomle is loaded. Right now it is {locale: de, sameOrigin: true|false}
         */
        _getIframeCode: function (conversationId, rapiOnly, configuratorId, options) {
            options = options || {};
            var iframeCode = this._iframeCode;
            // nasty hack, but how can I inform Roomle in another way that it is rapiOnly? Roomle is not ready to receive messages while init :/
            if (rapiOnly !== false) {
                iframeCode = this._iframeCode.replace(/\[conversationId\]/g, 'rapiOnly.' + conversationId);
                this._rapiOnly = rapiOnly;
            } else {
                iframeCode = this._iframeCode.replace(/\[conversationId\]/g, conversationId);
            }
            var url = (options.__alternativeUrl) ? options.__alternativeUrl : this._baseUrl;
            var queryParams = this._optionsToUrl(options);
            var seperator = (queryParams.length > 0) ? '&' : '?';
            queryParams += seperator + 'configuratorId=' + configuratorId;
            iframeCode = iframeCode.replace('###baseurl###', url).replace(/\[options\]/g, queryParams);
            if (options.sameOrigin) {
                iframeCode = iframeCode.replace(/src=".*(\/app\/.*)"/i, function (match, $1) {
                    return 'src="' + $1 + '"';
                });
            }
            return iframeCode.replace('style="width: 100%; height: 100%;"', 'style="display: none; width: 0; height: 0;"');
        },

        /**
         * Sends a command to Roomle so Roomle can react to things from the outside
         * @memberOf RoomleConfiguratorPrivate
         * @param {Array} command which is sent to Roomle Configurator. First parameter is always a string specifyng which action should be triggered in Roomle. The others are just arguments which can vary by each command
         */
        _sendToRoomle: function (command) {
            // @todo remove '*' for security purposes check in handle response
            if (this._isLoaded === false) {
                this._warn('Roomle is not initialized yet! Did you receive an init callback? Did you call init before?');
                return;
            }

            this._roomleIframe.postMessage(JSON.stringify(command), '*');
        },
        /**
         * Helper function to call the right callback. This is needed because we can only communicate with strings over the iframe
         * @memberOf RoomleConfiguratorPrivate
         * @param {number} expectedArgs how many we are expecting as response from Roomle.
         * @param {Array} response the data which is send from Roomle. It is an Array which holds the data
         * @param {number} conversationId the corresponding conversation id. This id is important to be able to call the correct callback
         * @param {boolean} [preserve] if true the callback is NOT removed after execution
         */
        _callSuccessCallback: function (expectedArgs, response, conversationId, preserve) {
            if (expectedArgs !== null && response.length !== expectedArgs) {
                this._errorCallbacks[conversationId](response);
                return delete this._errorCallbacks[conversationId];
            }
            this._successCallbacks[conversationId].apply(this._successCallbacks[conversationId], response);
            if (preserve) {
                return;
            }
            return delete this._successCallbacks[conversationId];
        },
        /**
         * Helper function to call all change listener.
         * @memberOf RoomleConfiguratorPrivate
         * @param {Array} response the data which is send from Roomle. It is an Array which holds the data
         */
        _callChangeListener: function (response) {
            for (var key in this._listenerSuccessCallbacks) {
                if (this._listenerSuccessCallbacks.hasOwnProperty(key)) {
                    var listener = this._listenerSuccessCallbacks[key];
                    listener.apply(listener, response);
                }
            }
        },
        /**
         * Helper function to call all _callConfigurationLoadedListener.
         * @memberOf RoomleConfiguratorPrivate
         * @param {Array} response the data which is send from Roomle. It is an Array which holds the data
         */
        _callConfigurationLoadedListener: function (response) {
            for (var key in this._configurationLoadedListenerSuccessCallbacks) {
                if (this._configurationLoadedListenerSuccessCallbacks.hasOwnProperty(key)) {
                    var listener = this._configurationLoadedListenerSuccessCallbacks[key];
                    listener.apply(listener, response);
                }
            }
        },

        /**
         * This function handles responses from Roomle. Because the data returned varies depending on which action caused the response there is a handler function
         * which knows what kind of data is expected and forwards this data in the correct format to the callback
         * @memberOf RoomleConfiguratorPrivate
         * @param {string} command to which Roomle responded
         * @param {number} conversationId conversation id which triggered the response of Roomle. This is important to find the corresponding callback
         * @param {any} data the data which is returned from Roomle. This can be everything.
         */
        _handleResponse: function (command, conversationId, data) {
            if (command === 'configurationChanged') {
                this._callChangeListener(data);
                return;
            }
            if (command === 'configurationLoaded') {
                this._callConfigurationLoadedListener(data);
                return;
            }
            if (command === 'shareButtonClicked') {
                this._callEventListener(command, data);
                return;
            }
            if (command === 'printButtonClicked') {
                this._callEventListener(command, data);
                return;
            }
            if (typeof conversationId !== 'number') {
                return this._throwError('Conversation id is malformed for. Conversation id is "' + conversationId + '" and has type  "' + (typeof conversationId) + '"');
            }
            if (typeof this._successCallbacks[conversationId] !== 'function') {
                if (command === 'initDone') {
                    this._warn('There is no callback for "initDone" was there a live reload? The scene is blank but you should be able to use the standalone configurator normally.');
                    this._successCallbacks[conversationId] = this._fallbackSuccessCallback;
                } else {
                    return this._throwError('No success callback registered with conversationId "' + conversationId + '" for "' + command + '"');
                }
            }

            if (command === 'getCurrentConfiguration') {
                if (data.length !== 2) {
                    return this._throwError('Parameter mismatch! Expected 2 but got ' + data.length + ' for getCurrentConfiguration');
                }
                data[0] = JSON.parse(data[0]);
                return this._callSuccessCallback(2, data, conversationId);
            }

            if (command === 'getParts') {
                if (data.length !== 1) {
                    return this._throwError('Parameter mismatch! Expected 1 but got ' + data.length + ' for getParts');
                }
                data[0] = JSON.parse(data[0]);
                return this._callSuccessCallback(1, data, conversationId);
            }

            if (typeof this._errorCallbacks[conversationId] !== 'function') {
                return this._throwError('No error callback registered with conversationId "' + conversationId + '"! This is strange because there should be the fallback error callback');
            }

            if (command === 'setAddToCartListener') {
                return this._callSuccessCallback(null, data, conversationId, true);
            }

            if (command === 'setWebshopCallbackUrl') {
                return this._callSuccessCallback(null, data, conversationId, true);
            }

            if (command === 'error') {
                // in this case data === error;
                if (data.length !== 1) {
                    return this._throwError('Roomle reported an error but provided no error message for "' + command + '"');
                }
                this._errorCallbacks[conversationId](data[0]);
                return delete this._errorCallbacks[conversationId];
            }

            // FALLBACK IF THERE IS NO SPECIAL HANDLING OF PARAMETERS
            return this._callSuccessCallback(null, data, conversationId);
        },
        /**
         * Convenience method to throw Errors if Roomle configurator encountered an error
         * which knows what kind of data is expected and forwards this data in the correct format to the callback
         * @memberOf RoomleConfiguratorPrivate
         * @param {string} message the error message
         * @throws Exception with the given error message
         */
        _throwError: function (message) {
            throw new Error('RoomleException: ' + message);
        },
        /**
         * Convenience method to warn the user of the API if something is not totally correct.
         * @memberOf RoomleConfiguratorPrivate
         * @param {string} message the error message
         */
        _warn: function (message) {
            /*eslint-disable no-console */
            if (console && console.warn) {
                console.warn(message);
            }
            /*eslint-enable no-console */
        },
        /**
         * Convenience method to create error messages which are given to the user
         * @memberOf RoomleConfiguratorPrivate
         * @param {string} message the error message
         * @return {Error} an error with the given error message
         */
        _error: function (message) {
            return new Error(message);
        },
        /**
         * This is a default error callback. This callback is called if
         * there is no error callback provided by the user of the function
         * the error message will contain the name of the API call which
         * is missing an error callback
         * @memberof RoomleConfiguratorPrivate
         * @callback defaultErrorCallback
         * @param {string} Error message
         * @throws Throws an error with the message given
         */
        _fallbackErrorCallback: function (name, error) {
            this._throwError('Unhandled error on function ' + name + ' "' + error + '"! Add an error callback to implement your own error handling');
        },
        /**
         * This is a default success callback. This callback is called if
         * there is no success callback provided by the user of the function
         * this fallback is only used if successCallback is optional
         * this method is empty on purpose!
         * @memberof RoomleConfiguratorPrivate
         * @callback defaultSuccessCallback
         */
        _fallbackSuccessCallback: function () {

        },
        /**
         * Adds a success callback to the success callback map. The conversation id is used as key, so we can react easyly to every response
         * @memberOf RoomleConfiguratorPrivate
         * @param {number} conversationId conversation id which triggered the response of Roomle. This is important to find the corresponding callback
         * @param {string} command to which Roomle responded
         * @param {any} data the data which is returned from Roomle. This can be everything.
         */
        _addSuccessCallback: function (conversationId, name, successCallback) {
            if (typeof successCallback !== 'function') {
                return this._throwError('There is no success callback for "' + name + '"');
            }
            this._successCallbacks[conversationId] = successCallback;
        },
        /**
         * Adds an error callback to the error callback map. The conversation id is used as key, so we can react easyly to every response
         * @memberOf RoomleConfiguratorPrivate
         * @param {number} conversationId conversation id which triggered the response of Roomle. This is important to find the corresponding callback
         * @param {string} command to which Roomle responded
         * @param {any} data the data which is returned from Roomle. This can be everything.
         */
        _addErrorCallback: function (conversationId, name, errorCallback) {
            if (typeof errorCallback !== 'function') {
                this._errorCallbacks[conversationId] = function (error) {
                    this._fallbackErrorCallback(name, error);
                }.bind(this);
            } else {
                this._errorCallbacks[conversationId] = errorCallback;
            }
        },
        /**
         * Returns the next available conversation id. Always use this function and don't increment _conversationId manually!
         * @memberOf RoomleConfiguratorPrivate
         * @return {number} the next available conversation id
         */
        _nextConversationId: function () {
            this._conversationId = this._conversationId + 1;
            return this._conversationId;
        },
        /**
         * Returns the next available listener id. Always use this function and don't increment _conversationId manually!
         * @memberOf RoomleConfiguratorPrivate
         * @return {number} the next available listener id
         */
        _nextListenerId: function () {
            this._listenerId = this._listenerId + 1;
            return this._listenerId;
        },
        /**
         * registers a change listener. With the returned id the listener can be remove again
         * @memberOf RoomleConfiguratorPrivate
         * @param {string} functionName This name is needed to provide better debugging information to the user
         * @param {scbGeneric} successCallback to which Roomle responded
         * @param {ecbGeneric} errorCallback to which Roomle responded
         * @param {number} specialConversationId [specialConversationId=null] provide a special conversation id if the handling of the callbacks differs to the regular behavior
         */
        _registerListener: function (successCallback, errorCallback) {
            var callbackId = this._nextListenerId();
            if (typeof errorCallback !== 'function') {
                this._listenerErrorCallbacks[callbackId] = function (error) {
                    this._fallbackErrorCallback('listener_with_id_' + callbackId, error);
                }.bind(this);
            } else {
                this._listenerErrorCallbacks[callbackId] = errorCallback;
            }
            this._listenerSuccessCallbacks[callbackId] = successCallback;
            return callbackId;
        },
        /**
         * remove a change listener. Therefore you need the id which is returned by addChangeListener
         * @memberOf RoomleConfiguratorPrivate
         * @param {number} listenerId listener which should be removed
         */
        _removeListener: function (listenerId) {
            if (this._listenerErrorCallbacks[listenerId]) {
                delete this._listenerErrorCallbacks[listenerId];
            }
            if (this._listenerSuccessCallbacks[listenerId]) {
                delete this._listenerSuccessCallbacks[listenerId];
            }
        },
        /**
         * registers an event listener.
         * @param {string} eventName name of event which we want to listen to
         * @param {eventCallback} callback callback which is called with all params passed by the event
         * @memberOf RoomleConfiguratorPrivate
         */
        _registerEventListener: function (eventName, callback) {
            if (!this._eventListeners[eventName]) {
                this._eventListeners[eventName] = [];
            }
            this._eventListeners[eventName].push(callback);
        },
        /**
         * removes an event listener.
         * @param {string} eventName name of event which we want the listener to remove
         * @param {eventCallback} callback callback which should be removed
         * @memberOf RoomleConfiguratorPrivate
         */
        _removeEventListener: function (eventName, callback) {
            if (!this._eventListeners[eventName]) {
                return;
            }
            var length = this._eventListeners[eventName].length;
            for (var i = 0; i < length; i++) {
                if (this._eventListeners[eventName][i] === callback) {
                    this._eventListeners[eventName][i].splice(i, 1);
                }
            }
        },

        /**
         * Calls all event listener which are listening to a certain event.
         * @param {string} eventName name of event which we want the listener to call
         * @param {array} args arguments which are passed to the event listener
         * @memberOf RoomleConfiguratorPrivate
         */

        _callEventListener: function (eventName, args) {
            if (!this._eventListeners[eventName]) {
                return;
            }
            var length = this._eventListeners[eventName].length;
            for (var i = 0; i < length; i++) {
                var callback = this._eventListeners[eventName][i];
                callback.apply(callback, args);
            }
        },
        /**
         * registers a change listener which fires when a new configuration is loaded. With the returned id the listener can be remove again
         * @memberOf RoomleConfiguratorPrivate
         * @param {string} functionName This name is needed to provide better debugging information to the user
         * @param {scbGeneric} successCallback to which Roomle responded
         * @param {ecbGeneric} errorCallback to which Roomle responded
         * @param {number} specialConversationId [specialConversationId=null] provide a special conversation id if the handling of the callbacks differs to the regular behavior
         */
        _registerConfigurationLoadedListener: function (successCallback, errorCallback) {
            var callbackId = this._nextListenerId();
            if (typeof errorCallback !== 'function') {
                this._configurationLoadedListenerErrorCallbacks[callbackId] = function (error) {
                    this._fallbackErrorCallback('listener_with_id_' + callbackId, error);
                }.bind(this);
            } else {
                this._configurationLoadedListenerErrorCallbacks[callbackId] = errorCallback;
            }
            this._configurationLoadedListenerSuccessCallbacks[callbackId] = successCallback;
            return callbackId;
        },
        /**
         * remove a ConfigurationLoadedListener. Therefore you need the id which is returned by addChangeListener
         * @memberOf RoomleConfiguratorPrivate
         * @param {number} listenerId listener which should be removed
         */
        _removeConfigurationLoadedListener: function (listenerId) {
            if (this._configurationLoadedListenerErrorCallbacks[listenerId]) {
                delete this._configurationLoadedListenerErrorCallbacks[listenerId];
            }
            if (this._configurationLoadedListenerSuccessCallbacks[listenerId]) {
                delete this._configurationLoadedListenerSuccessCallbacks[listenerId];
            }
        },
        /**
         * registers the callbacks in the callback map. This is needed to call the correct callback after the response of Roomle is received
         * @memberOf RoomleConfiguratorPrivate
         * @param {string} functionName This name is needed to provide better debugging information to the user
         * @param {scbGeneric} successCallback to which Roomle responded
         * @param {ecbGeneric} errorCallback to which Roomle responded
         * @param {number} [specialConversationId] provide a special conversation id if the handling of the callbacks differs to the regular behavior
         */
        _registerCallbacks: function (functionName, successCallback, errorCallback, specialConversationId) {
            if (typeof specialConversationId === 'number' && specialConversationId >= 10) {
                this._throwError('Special conversation ID has to be smaller than 10 (<10)');
            }
            var conversationId = (typeof specialConversationId === 'number' && specialConversationId < 10) ? specialConversationId : this._nextConversationId();
            this._addErrorCallback(conversationId, functionName, errorCallback);
            this._addSuccessCallback(conversationId, functionName, successCallback);
            return conversationId;
        },
        /**
         * Success callback which is saved into our callback map
         * @memberof InternalCallbacks
         * @callback scbGeneric
         */

        /**
         * Error callback which is saved into our callback map
         * @memberof InternalCallbacks
         * @callback ecbGeneric
         */

        /**
         * callback which is called with all params passed by the event
         * @memberof InternalCallbacks
         * @callback eventCallback
         */

        /**
         * Helper function which parses the response from Roomle.
         * @memberOf RoomleConfiguratorPrivate
         * @param {MessageEvent} event an event according to https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent, the data is a JSON string, encoded with JSON.stringify
         */
        _receiveFromRoomle: function (event) {
            if (event && event.data) {
                var data = event.data;
                if (typeof event.data === 'string') {
                    try {
                        data = JSON.parse(event.data);
                    } catch (e) {
                        data = null;
                    }
                }
                // Data must have at least two entries! First is command and second is conversation id
                if (Array.isArray(data) && data.length >= 2 && data[0].indexOf('MessageFromRoomle') !== -1) {
                    var fullCommand = data.shift(); // remove first item of array and return it. Array is edited in place
                    var command = fullCommand.split('.')[1];
                    var conversationId = data.shift();
                    return this._handleResponse(command, conversationId, data);
                }
            }

        },
        /**
         * Helper function for initializing roomle.
         * @memberOf RoomleConfiguratorPrivate
         * @param {string} configuratorId - The id of the configurator
         * @param {string} id - corresponding HTML id of a container element which should hold the Roomle Configurator iframe
         * @param {string|Object} [configuration] The configuration which should be loaded. This can be either a string (with JSON.stringify) or the JSON representation of the configuration
         * @param {Object} [options] Options which should be passed to the iframe before roomle is loaded. Right now it is {locale: de}
         * @param {Boolean} [rapiOnly] flag which is true if there is no WebGL needed
         * @param {scbInit} [initCallback] This callback is called when Roomle 3D Editor is ready
         * @param {scbInitInternal} successCallback This callback is called when Roomle 3D Editor is ready
         * @param {ecbInitInternal} errorCallback This callback is called when Roomle 3D Editor is ready
         */
        _init: function (configuratorId, id, configuration, initCallback, options, rapiOnly, successCallback, errorCallback) {
            if (this._initInProgress === true) {
                this._warn('Init already in progress');
                return;
            }
            var isId = (typeof configuration === 'string' && configuration[0] !== '{');
            var debugString = (isId) ? 'initConfigurationId' : 'initConfiguration'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            debugString = (configuration) ? debugString : 'init';
            if (configuration.isTag) {
                options._tag = configuration.tag;
            }
            var conversationId = this._registerCallbacks(debugString, successCallback, errorCallback);
            var container = doc.getElementById(id);
            this._elementId = id;
            container.innerHTML = this._getIframeCode(conversationId, rapiOnly, configuratorId, options);
            var iframe = container.firstElementChild;
            if (!iframe && !iframe.contentWindow) {
                this._throwError('Problem finding roomle iframe');
            } else {
                privateObject._roomleIframe = iframe.contentWindow;
                win.addEventListener('message', this._receiveFromRoomle.bind(this), false);
            }
            this._initInProgress = true;
        },
        /**
         * Error callback which is saved into our callback map and called after an error on init
         * @memberof InternalCallbacks
         * @callback ecbInitInternal
         */
        /**
         * Success callback which is saved into our callback map and called after init
         * @memberof InternalCallbacks
         * @callback scbInitInternal
         */

        /**
         * Helper function which should be called when init is finished.
         * @memberOf RoomleConfiguratorPrivate
         */
        _finishedInit: function () {
            this._isLoaded = true;
            this._initInProgress = false;
        },
        /**
         * Helper function to check if method is available. This is mainly used to check if the user tries to access a webgl method but only requested rapi-only
         * @memberOf RoomleConfiguratorPrivate
         * @param {string} methodname - needed to provide better debugging information
         * @param {boolean} needsWebGl - specifiy if the method needs webgl or not
         * @return {boolean} returns true if method is available and false if not
         */
        _isAvailable: function (methodname, needsWebGl) {
            if (this._rapiOnly === true && needsWebGl) {
                this._warn(methodname + ' needs webgl');
                return false;
            }
            return true;
        }

    };

    var RoomleConfigurator = {
        __successCallbacks: privateObject._successCallbacks,
        __errorCallbacks: privateObject._errorCallbacks,

        /**
         * Initializes the iframe. Therefore the id must be a HTML id of a container element
         * e.g. <div id="roomle-configurator-container"></div>. The innerHTML of the container
         * will be replaced with the Roomle Configurator Iframe which then loads the configurator.
         * The configurator starts with a blank scene which means there is only a blank canvas.
         * @memberof RoomleConfigurator
         * @param {string} configuratorId - the id of the configurator. You get this ID from Roomle. Without this ID you can not use the configurator
         * @param {string} htmlId - corresponding HTML id of a container element which should hold the Roomle Configurator iframe
         * @param {string|Object} [configuration] The configuration which should be loaded. This can be either a string (with JSON.stringify) or the JSON representation of the configuration
         * @param {Object} options - The options which can be passed to the configurator. Right now you can change the locale with {locale: lang}. If you need no options just provide null. For lang you can use ['en', 'de', 'zh-Hans', 'it', 'fr', 'es', 'hi', 'ja', 'pt', 'pt-BR', 'pl', 'ru']
         * @param {scbInit} [initCallback] This callback is called when Roomle 3D Editor is ready
         * @param {ecbInit} [errorCallback] This callback is called when init has errors...
         * @return {void}
         */
        init: function (configuratorId, htmlId, configuration, options, initCallback, errorCallback) {
            // @todo init without canvas <-- use JS only to speak to RAPI
            var rapiOnly = false;
            var self = this;
            if (options === null) {
                options = {};
            }

            privateObject._init(configuratorId, htmlId, configuration, initCallback, options, rapiOnly, function () {
                privateObject._finishedInit();
                self.setContainerId(configuratorId);
                if (options && options.enablePrint === true) {
                    privateObject._registerEventListener('printButtonClicked', function () {
                        var converterFunctions = {
                            dimensions: options.dimensionsFormatter || null,
                            price: options.priceFormatter || null
                        };
                        self.openPrint(null, converterFunctions);
                    });
                }
                if (typeof initCallback === 'function') {
                    initCallback();
                } else {
                    initCallback = function () {
                    };
                }
                if (!configuration) {
                    return;
                }

                if (configuration.isTag) {
                    return;
                }

                if (configuration.isItem) {
                    self.loadItem(configuration.id);
                    return;
                }

                var isId = (typeof configuration === 'string' && configuration[0] !== '{');
                if (isId) {
                    self.loadConfigurationId(configuration);
                } else {
                    self.loadConfiguration(configuration);
                }
            }, function (error) {
                errorCallback(error);
            });
        },
        /**
         * Success callback for initCallback, this callback is called when Roomle 3D is ready
         * @callback scbInit
         * @memberof UserCallbacks
         */

        /**
         * Error callback when init fails
         * @memberof UserCallbacks
         * @callback ecbInit
         */


        /**
         * Initializes the iframe. Therefore the id must be a HTML id of a container element
         * e.g. <div id="roomle-configurator-container"></div>. The innerHTML of the container
         * will be replaced with the Roomle Configurator Iframe. The Iframe is needed for the communication with
         * the roomle backend.
         * @memberof RoomleConfigurator
         * @param {string} id - corresponding HTML id of a container element which should hold the Roomle Configurator iframe
         * @param {scbInitWithoutWebGl} [initWithoutWebGlCallback] This callback is called when Roomle is ready
         * @return {void}
         */

        initWithoutWebGl: function (configuratorId, htmlId, options, initWithoutWebGlCallback, initWithoutWebGlCallbackError) {
            var rapiOnly = true;
            options = options || {};
            privateObject._init(configuratorId, htmlId, {}, initWithoutWebGlCallback, options, rapiOnly, function () {
                privateObject._finishedInit();

                if (typeof initWithoutWebGlCallback === 'function') {
                    initWithoutWebGlCallback();
                }
            }, function (error) {
                if (typeof initWithoutWebGlCallbackError === 'function') {
                    initWithoutWebGlCallbackError(error);
                } else {
                    privateObject._throwError(error);
                }
            });
        },
        /**
         * Success callback for initWithoutWebGlCallback, this callback is called when Roomle 3D is ready
         * @callback scbInitWithoutWebGl
         * @memberof UserCallbacks
         */


        /**
         * Sends a configuration to the iframe and initializes the Roomle Configurator with this scene. Every call of loadConfiguration
         * discards the actual scene and reinitializes the Roomle Configurator with the new configuration
         * @memberof RoomleConfigurator
         * @param {string|Object} The configuration which should be loaded. This can be either a string (with JSON.stringify) or the JSON representation of the configuration
         * @param {successCallback} [successCallback=defaultSuccessCallback] successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         * @return {void}
         */
        loadConfiguration: function (configuration, successCallback, errorCallback) {
            if (!privateObject._isAvailable('loadConfiguration', true)) {
                return;
            }
            if (typeof configuration !== 'string') {
                configuration = JSON.stringify(configuration);
            }
            var functionName = 'loadConfiguration';
            successCallback = successCallback || privateObject._fallbackSuccessCallback;
            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['loadConfiguration', conversationId, configuration]);
        },

        /**
         * Sends a component to the iframe and loads the component to the Roomle Kernel. After this, the component can be
         * used in a configuration. Sending the same component again will overwrite the old version in the Roomle Kernel
         * @memberof RoomleConfigurator
         * @param {string|Object} The component which should be loaded. This can be either a string (with JSON.stringify) or the JSON representation of the component
         * @param {scbLoadComponent} [successCallback=defaultSuccessCallback] successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the error.
         * @return {void}
         */
        loadComponent: function (component, successCallback, errorCallback) {
            if (!privateObject._isAvailable('loadComponent', true)) {
                return;
            }
            if (typeof component !== 'string') {
                component = JSON.stringify(component);
            }
            var functionName = 'loadComponent';
            successCallback = successCallback || privateObject._fallbackSuccessCallback;
            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['loadComponent', conversationId, component]);
        },
        /**
         * Success callback for loadComponent, the Roomle Kernel returns the component id how it is stored in the Roomle Kernel
         * @callback scbLoadComponent
         * @memberof UserCallbacks
         * @param string componentId


         /**
         * Sends a configuration to the iframe and initializes the Roomle Configurator with this scene. Every call of loadConfiguration
         * discards the actual scene and reinitializes the Roomle Configurator with the new configuration
         * @memberof RoomleConfigurator
         * @param {string|Object} The configuration which should be loaded. This can be either a string (with JSON.stringify) or the JSON representation of the configuration
         * @param {successCallback} [successCallback=defaultSuccessCallback] successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         * @return {void}
         */
        loadConfigurationId: function (configuration, successCallback, errorCallback) {
            if (!privateObject._isAvailable('loadConfigurationId', true)) {
                return;
            }
            var functionName = 'loadConfigurationId';
            successCallback = successCallback || privateObject._fallbackSuccessCallback;
            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            var isId = true;
            privateObject._sendToRoomle(['loadConfigurationId', conversationId, configuration, isId]);
        },

        /**
         * Sends a item to the iframe and initializes the Roomle Configurator with this scene. Every call of loadItem
         * discards the actual scene and reinitializes the Roomle Configurator with the new configuration
         * @memberof RoomleConfigurator
         * @param {string} The id which should be loaded.
         * @param {successCallback} [successCallback=defaultSuccessCallback] successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         * @return {void}
         */
        loadItem: function (id, successCallback, errorCallback) {
            if (!privateObject._isAvailable('loadItem', true)) {
                return;
            }
            var functionName = 'loadItem';
            successCallback = successCallback || privateObject._fallbackSuccessCallback;
            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['loadItem', conversationId, id]);
        },


        /**
         * Loads a tag from a roomle catalog to display possible configurations before the user starts
         * @memberof RoomleConfigurator
         * @param {string|Object} The configuration which should be loaded. This can be either a string (with JSON.stringify) or the JSON representation of the configuration
         * @param {successCallback} [successCallback=defaultSuccessCallback] successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         * @return {void}
         */
        loadTag: function (tag, successCallback, errorCallback) {
            if (!privateObject._isAvailable('loadTag', true)) {
                return;
            }
            var functionName = 'loadTag';
            successCallback = successCallback || privateObject._fallbackSuccessCallback;
            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['loadTag', conversationId, tag]);
        },

        /**
         * Sends the used containter to Roomle so we can perform fullscreen etc
         * @memberof RoomleConfigurator
         * @param {string} The ID of the container which is used to embedd Roomle
         * @param {successCallback} [successCallback=defaultSuccessCallback] successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         * @return {void}
         */
        setContainerId: function (containerId, successCallback, errorCallback) {
            if (!privateObject._isAvailable('loadConfigurationId', true)) {
                return;
            }
            var functionName = 'setContainerId';
            successCallback = successCallback || privateObject._fallbackSuccessCallback;
            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['setContainerId', conversationId, containerId]);
        },

        /**
         * Calls the successCallback with the parts of the current configuration. If there is an error the
         * error callback is called with an error number and an error message
         * @memberof RoomleConfigurator
         * @param {scbGetCurrentParts} successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         */
        getCurrentParts: function (successCallback, errorCallback) {
            var functionName = 'getCurrentParts'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            if (!privateObject._isAvailable(functionName, true)) {
                return errorCallback(privateObject._error(functionName + ' is not available without webgl'));
            }
            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['getCurrentParts', conversationId]);
        },
        /**
         * Success callback for getCurrentParts, the parts are returned as an array of objects. Each object is a part
         * @callback scbGetCurrentParts
         * @memberof UserCallbacks
         * @param {Object} currentParts
         */

        /**
         * Calls the successCallback with an cart object {id: id, visible: true/false } If there is an error the
         * error callback is called with an error number and an error message
         * @memberof RoomleConfigurator
         * @param {Object} Settings which are applied to when pressing the cart button. For button styling there has to be at least an option visible: true. e.g. {backgroundColor: '#ff0000', fontColor: '#ff00ff', text: 'CHECKOUT', visible: true}, For Image generation provide: images the options which should be passed to image generation, you can pass pixelPerMeter (default is 200) and perspectiveImageSize (default is 320 pixel, it is a square so one dimension is enough)
         * @param {scbAddAddToCartListener} successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         */
        setAddToCartListener: function (options, successCallback, errorCallback) {
            var functionName = 'setAddToCartListener'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            if (!privateObject._isAvailable(functionName, true)) {
                return errorCallback(privateObject._error(functionName + ' is not available without webgl'));
            }
            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['setAddToCartListener', conversationId, options]);
        },
        /**
         * Success callback for scbAddAddToCartListener, the cart object {id: id, visible: true/false } is returned
         * @callback scbAddAddToCartListener
         * @memberof UserCallbacks
         * @param {Object} cartObject
         */

        /**
         * Defines a callback for the embedder to inform when a user clicks on the fullscreen button
         * @memberof RoomleConfigurator
         * @param {fullScreenListener} listener - The listener that handles the fullscreen event.
         */
        setFullscreenListener: function (listener) {
            var container = document.getElementById(privateObject._elementId);
            var functionName = 'getRoomleConfig'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            var conversationId = privateObject._registerCallbacks(functionName, function (sassCss) {
                var css = '.roomle-configurator--fullscreen svg {position: absolute;left: 5px;top: 5px;height: 30px;width: 30px;cursor: pointer;} .roomle-configurator--fullscreen svg:hover { fill:' + sassCss.configurator_font_color_highlighted + '; }';
                var head = document.head || document.getElementsByTagName('head')[0];
                var style = document.createElement('style');

                style.type = 'text/css';
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }

                head.appendChild(style);
                container.style.position = 'relative';
                var x = document.createElement('div');
                x.setAttribute('class', 'roomle-configurator--fullscreen');

                var svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

                svgNode.setAttributeNS(null, 'version', '1.1');
                svgNode.setAttributeNS(null, 'x', '0px');
                svgNode.setAttributeNS(null, 'y', '0px');
                svgNode.setAttributeNS(null, 'viewBox', '-247 370.9 100 100');
                svgNode.setAttributeNS(null, 'enable-background', 'new -247 370.9 100 100');

                var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                //path.setAttributeNS(null, 'fill', '#000000');
                path.setAttributeNS(null, 'd', 'M-160.7,386.7v19.3c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2v-14l-23.8,23.8c-0.4,0.4-1,0.6-1.5,0.6s-1.1-0.2-1.6-0.6 c-0.9-0.9-0.9-2.2,0-3.1l23.8-23.8h-14c-1.2,0-2.2-1-2.2-2.2c0-1.2,1-2.2,2.2-2.2h19.3c0.2,0,0.4,0,0.7,0.1c0.1,0,0.1,0.1,0.2,0.1 c0.3,0.1,0.5,0.3,0.7,0.5c0.1,0.1,0.1,0.1,0.1,0.2c0.1,0.1,0.2,0.2,0.2,0.4c0,0.1,0.1,0.1,0.1,0.2c0.1,0.2,0.1,0.4,0.1,0.6 c0,0,0,0,0,0.1C-160.7,386.6-160.7,386.7-160.7,386.7z');

                var g2 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                var path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

                //path2.setAttributeNS(null, 'fill', '#000000');
                path2.setAttributeNS(null, 'd', 'M-162.9,457.2h-68.3c-1.2,0-2.2-1-2.2-2.2v-68.3c0-1.2,1-2.2,2.2-2.2h19.3c1.2,0,2.2,1,2.2,2.2s-1,2.2-2.2,2.2h-17.1v63.9 h63.9v-17.1c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2V455C-160.7,456.2-161.7,457.2-162.9,457.2z');

                g.appendChild(path);
                g2.appendChild(path2);

                var g3 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                var path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

                path3.setAttributeNS(null, 'd', 'M-192.6,413.2v-19.3c0-1.2,1-2.2,2.2-2.2c1.2,0,2.2,1,2.2,2.2v14l23.8-23.8c0.4-0.4,1-0.6,1.5-0.6s1.1,0.2,1.5,0.6 c0.9,0.9,0.9,2.3,0,3.1l-23.8,23.8h14c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2h-19.3c-0.2,0-0.5,0-0.6-0.1c-0.1,0-0.2-0.1-0.2-0.1 c-0.2-0.1-0.5-0.2-0.7-0.5c-0.1-0.1-0.1-0.1-0.2-0.2s-0.2-0.2-0.2-0.4c0-0.1-0.1-0.2-0.1-0.2c-0.1-0.2-0.2-0.4-0.2-0.6v-0.1 C-192.6,413.3-192.6,413.2-192.6,413.2z');

                g3.appendChild(path3);

                svgNode.appendChild(g);
                svgNode.appendChild(g2);
                var clickBefore = false;
                var toggleFullscreen = function () {
                    clickBefore = true;
                    if (!privateObject._isFullscreen) {
                        svgNode.removeChild(g);
                        svgNode.appendChild(g3);
                    } else {
                        svgNode.removeChild(g3);
                        svgNode.appendChild(g);
                    }
                    privateObject._isFullscreen = !privateObject._isFullscreen;
                    listener.apply(listener, []);
                };

                x.addEventListener('click', toggleFullscreen);

                var check = function (/*e*/) {
                    if (!clickBefore) {
                        toggleFullscreen();
                    }
                    clickBefore = false;
                };

                privateObject._toggleFullscreen = toggleFullscreen;
                document.addEventListener('webkitfullscreenchange', check, false);
                document.addEventListener('mozfullscreenchange', check, false);
                document.addEventListener('fullscreenchange', check, false);

                x.appendChild(svgNode);
                container.insertBefore(x, container.firstChild);

            }/*, errorCallback*/);
            privateObject._sendToRoomle(['getRoomleConfig', conversationId]);
        },
        /**
         * This listener is triggered when the user clicks on the fullscreen button
         * @callback fullScreenListener
         * @memberof UserCallbacks
         */

        /**
         * Calls the successCallback with the parts of the id configuration. If there is an error the
         * error callback is called with an error number and an error message. This call retrieves information from roomle
         * backend, therefore expact higher latency at the first call
         * @memberof RoomleConfigurator
         * @param {number} id - id of the configuration
         * @param {scbGetParts} successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         */
        getParts: function (configurationId, successCallback, errorCallback) {
            var functionName = 'getParts'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['getParts', conversationId, configurationId]);
        },
        /**
         * Success callback for getCurrentParts, the parts are returned as an array of objects. Each object is a part
         * @callback scbGetParts
         * @memberof UserCallbacks
         * @param {Object} currentParts
         */

        /**
         * Calls the successCallback with the price and the currency symbol to a given configuration id.  This call
         * retrieves information from roomle backend, therefore expact higher latency at the first call
         * @memberof RoomleConfigurator
         * @param {number} id - id of the configuration
         * @param {scbGetPrice} successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         */
        getPrice: function (configurationId, successCallback, errorCallback) {
            var functionName = 'getPrice'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['getPrice', conversationId, configurationId]);
        },
        /**
         * Success callback for getPrice, price is returned as a number and the currency is returned as currency symbol
         * @callback scbGetPrice
         * @memberof UserCallbacks
         * @param {number} price
         * @param {string} currency
         */

        /**
         * Calls the successCallback with the url to the perspective image to a given configuration id. This call retrieves
         * information from roomle backend, therefore expact higher latency at the first call
         * @memberof RoomleConfigurator
         * @param {number} id - id of the configuration
         * @param {scbGetPerspectiveImage} successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         */
        getPerspectiveImage: function (configurationId, successCallback, errorCallback) {
            var functionName = 'getPerspectiveImage'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['getPerspectiveImage', conversationId, configurationId]);
        },
        /**
         * Success callback for getPerspectiveImage, it passes the url of the perspective image to the user
         * @callback scbGetPerspectiveImage
         * @memberof UserCallbacks
         * @param {string} url url of the perspective image. Can be null if there is no image stored on the server
         */


        /**
         * Calls the successCallback with the url to the top image to a given configuration id. This call retrieves
         * information from roomle backend, therefore expact higher latency at the first call
         * @memberof RoomleConfigurator
         * @param {number} id - id of the configuration
         * @param {scbGetTopImage} successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         */
        getTopImage: function (configurationId, successCallback, errorCallback) {
            var functionName = 'getTopImage'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['getTopImage', conversationId, configurationId]);
        },
        /**
         * Success callback for getTopImage, it passes the url of the perspective image to the user
         * @callback scbGetTopImage
         * @memberof UserCallbacks
         * @param {string} url url of the top image. Can be null if there is no image stored on the server
         */

        /**
         * Used to get the price of the current configuration
         * @memberof RoomleConfigurator
         * @param {scbGetCurrentPrice} successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         */
        getCurrentPrice: function (successCallback, errorCallback) {
            var functionName = 'getCurrentPrice'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            if (!privateObject._isAvailable(functionName, true)) {
                return errorCallback(privateObject._error(functionName + ' is not available without webgl'));
            }

            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['getCurrentPrice', conversationId]);
        },
        /**
         * Success callback for getCurrentPrice. It passes price as a number and currency symbol as a character
         * @memberof UserCallbacks
         * @callback scbGetCurrentPrice
         * @param {number} Price
         * @param {string} currencySymbol as one character
         */

        /**
         * Used to get the current cart item. The configuration is saved to the server so expect high latency
         * @memberof RoomleConfigurator
         * @param {scbAddToCart} successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         */
        addToCart: function (successCallback, errorCallback) {
            var functionName = 'addToCart'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            if (!privateObject._isAvailable(functionName, true)) {
                return errorCallback(privateObject._error(functionName + ' is not available without webgl'));
            }

            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['addToCart', conversationId]);
        },
        /**
         * Success callback for addToCart. It passes the cart item
         * @memberof UserCallbacks
         * @callback scbAddToCart
         * @param {object} cart item
         */


        /**
         * Used to get top image and the perspective image of the actual configuration as base64. The images are NOT stored to the server
         * @memberof RoomleConfigurator
         * @param {Object} options - the options which should be passed to image generation, you can pass pixelPerMeter (default is 200) and perspectiveImageSize (default is 320 pixel, it is a square so one dimension is enough)
         * @param {scbGenerateBase64ImagesOfCurrentConfiguration} successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         */
        generateBase64ImagesOfCurrentConfiguration: function (successCallback, errorCallback, options) {
            options = options || {};
            options.pixelPerMeter = options.pixelPerMeter || 200;
            options.perspectiveImageSize = options.perspectiveImageSize || 320;
            var functionName = 'generateBase64ImagesOfCurrentConfiguration'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            if (!privateObject._isAvailable(functionName, true)) {
                return errorCallback(privateObject._error(functionName + ' is not available without webgl'));
            }

            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['generateBase64ImagesOfCurrentConfiguration', conversationId, options]);
        },
        /**
         * Success callback for generateBase64ImagesOfCurrentConfiguration. It passes topImage and persepctiveImage to the caller
         * encoded as base64/png (this is because only strings can passed via iframe)
         * @memberof UserCallbacks
         * @callback scbGenerateImagesOfCurrentConfiguration
         * @param {string} topImageAsBase64Png encoded as base64/png, this is the bird's-eye view of the configuration
         * @param {string} perspectiveImageAsBase64Png encoded as base64/png, this is the 3d view of the configuration
         */

        /**
         * Used to get top image and the perspective image of the actual configuration. The images are stored to the server
         * and the URL is returned. This goes over the web so expect higher latecy
         * @memberof RoomleConfigurator
         * @param {scbGenerateImagesOfCurrentConfiguration} successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         */
        generateImagesOfCurrentConfiguration: function (successCallback, errorCallback) {
            var functionName = 'generateImagesOfCurrentConfiguration'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            if (!privateObject._isAvailable(functionName, true)) {
                return errorCallback(privateObject._error(functionName + ' is not available without webgl'));
            }

            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['generateImagesOfCurrentConfiguration', conversationId, 200]);
        },
        /**
         * Success callback for generateImagesOfCurrentConfiguration. It passes topImage and persepctiveImage to the caller
         * as the URL pointing to the locations of the images on the server
         * @memberof UserCallbacks
         * @callback scbGenerateImagesOfCurrentConfiguration
         * @param {string} topImageUrl URL to the top image
         * @param {string} perspectiveImageUrl URL to the perspective image
         */


        /**
         * Used to get the current configuration. It returns the configuration and the hash
         * @memberof RoomleConfigurator
         * @param {scbGetCurrentConfiguration} successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         */
        getCurrentConfiguration: function (successCallback, errorCallback) {
            var functionName = 'getCurrentConfiguration'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            if (!privateObject._isAvailable(functionName, true)) {
                return errorCallback(privateObject._error(functionName + ' is not available without webgl'));
            }

            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['getCurrentConfiguration', conversationId]);
        },
        /**
         * Success callback for getCurrentConfiguration. It passes configuration as object and the hash of the configuration
         * to the caller
         * @memberof UserCallbacks
         * @callback scbGetCurrentConfiguration
         * @param {object} configuration the actual configuration as object. It is just JSON.parse(configurationString)
         */

        /**
         * Used to get inform the configurator that fullscreen changed from outside
         * @memberof RoomleConfigurator
         */
        toggleFullscreen: function () {
            privateObject._toggleFullscreen();
        },

        /**
         * Used to get the current configuration id, therefore the data needs to be presisted to the roomle db. Expect higher latency because this needs to go through the web
         * @memberof RoomleConfigurator
         * @param {scbGetCurrentConfigurationId} successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         */
        getCurrentConfigurationId: function (successCallback, errorCallback) {
            var functionName = 'getCurrentConfigurationId'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            if (!privateObject._isAvailable(functionName, true)) {
                return errorCallback(privateObject._error(functionName + ' is not available without webgl'));
            }

            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['getCurrentConfigurationId', conversationId]);
        },
        /**
         * Success callback for getCurrentConfigurationId. It passes configuration as object and the hash of the configuration
         * to the caller
         * @memberof UserCallbacks
         * @callback scbGetCurrentConfigurationId
         * @param {string} configurationHash the actual configuration as object. It is just JSON.parse(configurationString)
         */


        /**
         * Used to get the current configuration id, therefore the data needs to be presisted to the roomle db. Expect higher latency because this needs to go through the web
         * @memberof RoomleConfigurator
         * @param {string} url - The url which should be visited after the user planned his configuration in the iOS app
         */
        setWebshopCallbackUrl: function (url) {
            var functionName = 'setWebshopCallbackUrl'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            var conversationId = privateObject._registerCallbacks(functionName, function (roomleUrl, storeurl, delay) {
                setTimeout(function () {
                    window.location = storeurl;
                }, delay);
                window.location = roomleUrl;
            });
            privateObject._sendToRoomle([functionName, conversationId, url]);
        },

        /**
         * Sets the callback which is triggered when the user clicks on the share button
         * @memberof RoomleConfigurator
         * @param {eventCallback} callback - this callback is called when the user clicks on the share button
         */
        setShareButtonClickedCallback: function (callback) {
            privateObject._registerEventListener('shareButtonClicked', callback);
            privateObject._sendToRoomle(['useCustomShareLink', null /*CONVERSATION ID NOT NEEDED */, true]);
        },
        /**
         * Sets the url of the share pop up, this should be called "inside" the setShareButtonClickedCallback
         * @memberof RoomleConfigurator
         * @param {string} url - the url of the share link (could be a async call to a shortener)
         */
        setShareLink: function (url) {
            privateObject._sendToRoomle(['setShareLink', 1 /*CONVERSATION ID NOT NEEDED */, url]);
        },

        /**
         * Used to open the print dialog
         * @memberof RoomleConfigurator
         * @param {Number} imageSize - size of the generated image in pixel. Because the image is square we only need one dimension
         * @param {Object} convertFunctions - objects with converter functions for price and dimensions. Provide a function on key price to formate currency and price (parameters are currency (=string) and price (=float)). Provide a function to key dimensions to convert dimensions (parameter is a object with x, y, z)
         */
        openPrint: function (imageSize, convertFunctions) {
            imageSize = imageSize || 2000;
            convertFunctions = convertFunctions || {};
            convertFunctions.dimensions = convertFunctions.dimensions ||
                    function (dim) {
                        var converter = function (val) {
                            return (val / 10).toFixed(2);
                        };
                        return converter(dim.x) + ' / ' + converter(dim.y) + ' / ' + converter(dim.z) + ' cm';
                    };
            convertFunctions.price = convertFunctions.price ||
                    function (currency, price) {
                        return currency + ' ' + price;
                    };
            var self = this;

            this.getCurrentPrice(function (price, currency) {
                self.getCurrentDimensions(function (dimensions) {
                    self.generateBase64ImagesOfCurrentConfiguration(function (topImage, perspectiveImage) {
                        var style = document.createElement('style');
                        var container = document.createElement('div');
                        var img = document.createElement('img');
                        var priceContainer = document.createElement('h3');
                        var size = document.createElement('h3');
                        priceContainer.innerText = convertFunctions.price(currency, price);
                        size.innerText = convertFunctions.dimensions(dimensions);
                        img.setAttribute('class', '__roomle-print-img');
                        img.setAttribute('src', 'data:image/png;base64,' + perspectiveImage);
                        style.innerText = '*{display: none;}html, body{display:block}.__roomle-print-container{margin-left:5%;margin-top:2%;position:absolute; z-index: 99999; width: 90%; height: 80%; background-color: white; text-align:center;display:block;}.__roomle-print-img{height:100%;display:inline-block}h3{display:block;height:5%;overflow:hidden;}';
                        container.setAttribute('class', '__roomle-print-container');
                        container.appendChild(img);
                        container.appendChild(priceContainer);
                        container.appendChild(size);
                        document.body.prepend(container);
                        document.head.prepend(style);
                        window.print();
                        //SET TIMEOUT IS USED HERE SO THAT REMOVE ELEMENT IS CALLED AFTER PRINT DIALOG
                        setTimeout(function () {
                            document.body.removeChild(container);
                            document.head.removeChild(style);
                        }, 0);
                    }, null, {perspectiveImageSize: imageSize});
                });
            });
        },

        /**
         * Used to get the dimensions of the current configuration
         * @memberof RoomleConfigurator
         * @param {scbGetCurrentDimensions} successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         */
        getCurrentDimensions: function (successCallback, errorCallback) {
            var functionName = 'getCurrentDimensions'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            if (!privateObject._isAvailable(functionName, true)) {
                return errorCallback(privateObject._error(functionName + ' is not available without webgl'));
            }

            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['getCurrentDimensions', conversationId]);
        },
        /**
         * Success callback for getCurrentDimensions. It passes back the dimensions of the configuration
         * to the caller
         * @memberof UserCallbacks
         * @callback scbGetCurrentDimensions
         * @param {object} dimensions
         */

        /**
         * Used to save the current configuration to the roomle backend, also the generated images are presisted! This request goes over the web so expect higher latency
         * @memberof RoomleConfigurator
         * @param {scbSaveCurrentConfiguration} successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         */
        saveCurrentConfiguration: function (successCallback, errorCallback) {
            var functionName = 'saveCurrentConfiguration'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            if (!privateObject._isAvailable(functionName, true)) {
                return errorCallback(privateObject._error(functionName + ' is not available without webgl'));
            }

            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['saveCurrentConfiguration', conversationId]);
        },

        /**
         * Success callback for saveCurrentConfiguration. It passes back the save configuration object
         * to the caller
         * @memberof UserCallbacks
         * @callback scbSaveCurrentConfiguration
         * @param {object} savedConfiguration the saved configuration how it's stored in the roomle backend
         */


        /**
         * When the user is doing his checkout you have to call this function. The cart is an array of cart items
         * @memberof RoomleConfigurator
         * @param {Object} cart - An array of all cart items. Every item has to have the following properties: configurationId:string, count:int and price:float
         * @param {scbDidCheckout} successCallback - The callback that handles the response.
         * @param {errorCallback} [errorCallback=defaultErrorCallback] errorCallback - The callback that handles the response.
         */
        didCheckout: function (cart, successCallback, errorCallback) {
            var functionName = 'didCheckout'; // this is just for debugging purpose! So the user knows where he forgot to add some callback
            if (!privateObject._isAvailable(functionName, true)) {
                return errorCallback(privateObject._error(functionName + ' is not available without webgl'));
            }

            var conversationId = privateObject._registerCallbacks(functionName, successCallback, errorCallback);
            privateObject._sendToRoomle(['didCheckout', conversationId, cart]);
        },
        /**
         * Success callback for didCheckout
         * @memberof UserCallbacks
         * @callback scbDidCheckout
         */

        /**
         * Used to register a change listener to the configuration. The callback is always called when the configuration changes
         * @memberof RoomleConfigurator
         * @param {cbAddChangeListener} callback - The callback that handles the change.
         * @return {number} they key where the listener is stored. Use this key to remove the listener
         */
        addChangeListener: function (successCallback) {
            var listenerId = privateObject._registerListener(successCallback, function () {
                privateObject._throwError('Some strange error on addChangeListener');
            });
            return listenerId;
        },
        /**
         * Success callback for getCurrentConfigurationId. It passes configuration as object and the hash of the configuration
         * to the caller
         * @memberof UserCallbacks
         * @callback cbAddChangeListener
         * @param {number} price the actual price of the configuration
         */

        /**
         * Used to remove a change listener to the configuration.
         * @memberof RoomleConfigurator
         */
        removeChangeListener: function (changeListenerId) {
            privateObject._removeListener(changeListenerId);
        },

        /**
         * Used to register listener which triggers when the configuration is loaded. The callback is always called when a new configuration is loaded
         * @memberof RoomleConfigurator
         * @param {cbAddConfigurationLoadedListener} callback - The callback that handles the change.
         * @return {number} they key where the listener is stored. Use this key to remove the listener
         */
        addConfigurationLoadedListener: function (successCallback) {
            var listenerId = privateObject._registerConfigurationLoadedListener(successCallback, function () {
                privateObject._throwError('Some strange error on addConfigurationLoadedListener');
            });
            return listenerId;
        },
        /**
         * Success callback for getCurrentConfigurationId. It passes configuration as object and the hash of the configuration
         * to the caller
         * @memberof UserCallbacks
         * @callback cbAddConfigurationLoadedListener
         */

        /**
         * Used to remove a change listener to the configuration.
         * @memberof RoomleConfigurator
         */
        removeConfigurationLoadedListener: function (changeListenerId) {
            privateObject._removeConfigurationLoadedListener(changeListenerId);
        }


        /**
         * This callback is displayed as a global member.
         * @memberof UserCallbacks
         * @callback errorCallback
         * @param {string} Error message
         */

    };

    return RoomleConfigurator;

}(window, document));
