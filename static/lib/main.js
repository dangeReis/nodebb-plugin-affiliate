"use strict";

(function() {
	function addPrimeTips() {
		if (typeof ajaxify === 'undefined' || !ajaxify.data || !ajaxify.data.template || ajaxify.data.template.name !== 'topic') {
			return;
		}

		$('[component="post/content"]').each(function() {
			var $content = $(this);
			if ($content.find('.pw-prime-tip').length) {
				return;
			}

			var hasAmazonLink = false;
			$content.find('a[href]').each(function() {
				var href = $(this).attr('href') || '';
				if (/(?:^|\.)(?:amazon\.com|a\.co|amzn\.to|amzn\.com)(?:\/|$)/i.test(href)) {
					// Do not add tip if link is already for prime/sub trial signup
					if (!/joinyoungadult|amazon\.com\/prime|qualify/i.test(href)) {
						hasAmazonLink = true;
						return false;
					}
				}
			});

			if (hasAmazonLink) {
				var bountyTag = (typeof config !== 'undefined' && config.affiliate && config.affiliate.bounty_tag) ||
					(typeof config !== 'undefined' && config.affiliate && config.affiliate.amazon_tag) ||
					'phtwllt-20';
				var tipHtml = '<div class="pw-prime-tip text-muted">' +
					'<i class="fa fa-truck text-muted" aria-hidden="true"></i> <strong>Prime perks:</strong> Need free shipping? Try a ' +
					'<a href="https://www.amazon.com/prime?tag=' + encodeURIComponent(bountyTag) + '" target="_blank" rel="nofollow noopener">30-day Free Trial</a> or ' +
					'<a href="https://www.amazon.com/joinyoungadult?tag=' + encodeURIComponent(bountyTag) + '" target="_blank" rel="nofollow noopener">6 Months Free (18–24 &amp; Students)</a>.' +
					'</div>';
				$content.append(tipHtml);
			}
		});
	}

	$(window).on('action:ajaxify.end', function(ev, data) {
		if (data && data.tpl_url === 'topic') {
			addPrimeTips();
		}
	});

	$(window).on('action:posts.loaded', function() {
		addPrimeTips();
	});
})();