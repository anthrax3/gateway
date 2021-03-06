/**
 * Adapter Controller.
 *
 * Manages HTTP requests to /adapters.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

var express = require('express');
var addonManager = require('../addon-manager');

var adaptersController = express.Router();

/**
 * Return a list of adapters
 */
adaptersController.get('/', (request, response) => {
  var adapters = addonManager.getAdapters();
  var adapterList = Array.from(adapters.values()).map(adapter => {
    return adapter.asDict();
  });
  response.json(adapterList);
});

/**
 * Get a particular adapter.
 */
adaptersController.get('/:adapterId/', (request, response) => {
  var adapterId = request.params.adapterId;
  var adapter = addonManager.getAdapter(adapterId);
  if (adapter) {
    response.json(adapter.asDict());
  } else {
    response.status(404).send('Adapter "' + adapterId + '" not found.');
  }
});

module.exports = adaptersController;
