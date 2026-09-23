"use strict";
var url = require('url'),
	controllers = require('./lib/controllers'),
	plugin = {},
	meta;

try {
	meta = module.parent ? module.parent.require('./meta') : null;
} catch (e) {
	meta = null;
}

plugin.init = function(params, callback) {
	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;
		
	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

	router.get('/admin/plugins/affiliate', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/affiliate', controllers.renderAdminPage);

	callback();
};
plugin.getThemeConfig = function(config, callback) {
	if (!meta || !meta.settings || !meta.settings.get) {
		return callback(null, config);
	}
	meta.settings.get('affiliate', function(err, settings) {
		if (!err && settings) {
			config.affiliate = settings;
		}
		callback(null, config);
	});
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/affiliate',
		icon: 'fa-tint',
		name: 'Affiliate'
	});

	callback(null, header);
};
plugin.processPost = function(data, callback) {
	if (!data || !data.postData || typeof data.postData.content !== 'string') {
		return callback(null, data);
	}

	var content = data.postData.content;

	// Sanitize malformed href attributes with stray quotes, escaped quotes, or backslashes
	content = content.replace(/href=(?:(["'])(?:\\*["']|%5C%22|%22)*(https?:\/\/[^\s"'>]+?)(?:\\*["']|%5C%22|%22)*\1|\\+["'](https?:\/\/[^\s"'>]+?)\\+["'])/gi, function(m, q, u1, u2) {
		return 'href="' + (u1 || u2) + '"';
	});

	var linkRegex = /"(https?:\/\/[^"]+)"/gm;
	var match;
	while ((match = linkRegex.exec(content)) !== null) {
		var target;
		try {
			target = url.parse(match[1], true);
		} catch (err) {
			target = null;
		}

		if (target && target.host && /(?:^|\.)(?:amazon\.com|a\.co|amzn\.to|amzn\.com)$/i.test(target.host)) {
			target.protocol = 'https:';
			delete target.search;
			target.query = target.query || {};
			target.query["tag"] = "phtwllt-20";
			var uri = url.format(target);
			content = content.split(match[1]).join(uri);
		}
	}

	data.postData.content = content;
	callback(null, data);
};
module.exports = plugin;