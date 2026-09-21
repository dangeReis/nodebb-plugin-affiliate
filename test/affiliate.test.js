'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert');
const Url = require('../static/lib/url.js');

// Mock DOM element
function createMockElement(href) {
    const attrs = {};
    let _href = href;
    return {
        get href() {
            return _href;
        },
        set href(val) {
            _href = typeof val === 'object' && val !== null ? val.toString() : String(val);
        },
        nodeType: 1,
        getAttribute(name) {
            if (name === 'href') return _href;
            return attrs[name] || null;
        },
        setAttribute(name, val) {
            attrs[name] = String(val);
        },
        hasAttribute(name) {
            return Object.prototype.hasOwnProperty.call(attrs, name);
        }
    };
}

describe('nodebb-plugin-affiliate URL rewriting and sanitization', () => {
    // Replicate cleanUrl as implemented in cj.js
    function cleanUrl(rawUrl) {
        if (!rawUrl || typeof rawUrl !== 'string') return '';
        var url = rawUrl.trim();
        url = url.replace(/&quot;/gi, '"')
                 .replace(/&#34;/g, '"')
                 .replace(/&#39;/g, "'")
                 .replace(/&amp;/gi, '&');
        url = url.replace(/^(?:\\*["'`\s]|%5C%22|%22|%27)+|(?:\\*["'`\s]|%5C%22|%22|%27)+$/gi, '');
        var embeddedMatch = url.match(/(?:\/|%5C%22|%22|\\\"|\\|\")(https?:\/\/[^\s"'<>]+)$/i);
        if (embeddedMatch) {
            url = embeddedMatch[1];
        } else {
            var httpIdx = url.search(/https?:\/\//i);
            if (httpIdx > 0) {
                var prefix = url.substring(0, httpIdx);
                if (prefix.indexOf('?') === -1 && prefix.indexOf('&') === -1) {
                    url = url.substring(httpIdx);
                }
            }
        }
        url = url.replace(/^(?:\\*["'`\s]|%5C%22|%22|%27)+|(?:\\*["'`\s]|%5C%22|%22|%27)+$/gi, '');
        return url;
    }

    function getDomainAndProtocol(url) {
        var matches = url.match(/^(https?)\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        return {
            domain: matches && matches[2],
            protocol: matches && matches[1]
        };
    }

    function mockAutoMonetize(element) {
        if (!element || element.nodeType !== 1) return;
        if (element.getAttribute('data-affiliate-monetized') === 'true') return;

        var rawHref = element.getAttribute('href') || element.href || '';
        var url = cleanUrl(rawHref);
        if (!url && element.href) {
            url = cleanUrl(element.href);
        }

        if (!url || !/^https?:\/\//i.test(url)) {
            element.setAttribute('data-affiliate-monetized', 'true');
            return;
        }

        if (element.getAttribute('href') !== url) {
            element.href = url;
        }

        var domainAndProtocol = getDomainAndProtocol(url);
        if (!domainAndProtocol || !domainAndProtocol.domain) {
            element.setAttribute('data-affiliate-monetized', 'true');
            return;
        }

        var domainInLowerCase = domainAndProtocol.domain.toLowerCase();

        if (domainInLowerCase.indexOf('goto.target.com') !== -1 ||
            domainInLowerCase.indexOf('linksynergy.walmart.com') !== -1 ||
            domainInLowerCase.indexOf('click.linksynergy.com') !== -1) {
            element.setAttribute('data-affiliate-monetized', 'true');
            return;
        }

        if (domainInLowerCase.indexOf('amazon.com') !== -1) {
            var u = new Url(url);
            u.query['tag'] = 'phtwllt-20';
            element.href = u.toString();
            element.setAttribute('data-affiliate-monetized', 'true');
        } else if (domainInLowerCase.indexOf('target.com') !== -1 && domainInLowerCase.indexOf('goto.target.com') === -1) {
            var u = new Url('https://goto.target.com/c/437216/81938/2092');
            u.query['u'] = url;
            element.href = u.toString();
            element.setAttribute('data-affiliate-monetized', 'true');
        } else if (domainInLowerCase.indexOf('walmart.com') !== -1 && domainInLowerCase.indexOf('linksynergy.walmart.com') === -1) {
            var u = new Url('https://linksynergy.walmart.com/fs-bin/click?subid=0&type=10&tmpid=1082');
            u.query['RD_PARM1'] = url;
            u.query['id'] = 'R*/doq1oWeQ';
            u.query['offerid'] = '223073.1';
            element.href = u.toString();
            element.setAttribute('data-affiliate-monetized', 'true');
        } else if (domainInLowerCase.indexOf('bestbuy.com') !== -1 && domainInLowerCase.indexOf('click.linksynergy.com') === -1) {
            var u = new Url('https://click.linksynergy.com/fs-bin/click?subid=0&type=10&tmpid=13127');
            u.query['RD_PARM1'] = url;
            u.query['id'] = 'R*/doq1oWeQ';
            u.query['offerid'] = '492045.1';
            element.href = u.toString();
            element.setAttribute('data-affiliate-monetized', 'true');
        } else {
            element.setAttribute('data-affiliate-monetized', 'true');
        }
    }

    it('cleanUrl strips stray and escaped quotes from URLs', () => {
        const input1 = '"https://www.target.com/p/bose-qc35/-/A-123456"';
        assert.strictEqual(cleanUrl(input1), 'https://www.target.com/p/bose-qc35/-/A-123456');

        const input2 = '\\"https://www.target.com/p/bose-qc35/-/A-123456\\"';
        assert.strictEqual(cleanUrl(input2), 'https://www.target.com/p/bose-qc35/-/A-123456');

        const input3 = '&quot;https://www.amazon.com/dp/B012345&quot;';
        assert.strictEqual(cleanUrl(input3), 'https://www.amazon.com/dp/B012345');
    });

    it('cleanUrl recovers URLs corrupted by relative path resolution (%5C%22 and escaped quotes)', () => {
        const corrupted1 = 'https://phatwalletforums.com/topic/24452/bose/\\"https://goto.target.com/c/437216/201333/2092';
        assert.strictEqual(cleanUrl(corrupted1), 'https://goto.target.com/c/437216/201333/2092');

        const corrupted2 = '/topic/24452/daily-target-markdowns-2020-06-13/%5C%22https://goto.target.com/c/437216/201333/2092';
        assert.strictEqual(cleanUrl(corrupted2), 'https://goto.target.com/c/437216/201333/2092');

        const corrupted3 = 'https://phatwalletforums.com/topic/24452/bose/https://www.target.com/p/12345';
        assert.strictEqual(cleanUrl(corrupted3), 'https://www.target.com/p/12345');
    });

    it('cleanUrl does not truncate legitimate query parameters containing URLs', () => {
        const affiliateTarget = 'https://goto.target.com/c/437216/81938/2092?u=https%3A%2F%2Fwww.target.com%2Fp%2F12345';
        assert.strictEqual(cleanUrl(affiliateTarget), affiliateTarget);

        const walmartLink = 'https://linksynergy.walmart.com/fs-bin/click?subid=0&type=10&tmpid=1082&RD_PARM1=https%3A%2F%2Fwww.walmart.com%2Fip%2F123';
        assert.strictEqual(cleanUrl(walmartLink), walmartLink);
    });

    it('client autoMonetize rewrites Target link cleanly with https and string href', () => {
        const el = createMockElement('"https://www.target.com/p/bose-qc35/-/A-12345"');
        mockAutoMonetize(el);

        assert.strictEqual(typeof el.href, 'string');
        assert.ok(el.href.startsWith('https://goto.target.com/c/437216/81938/2092?u='));
        assert.ok(!el.href.includes('"') && !el.href.includes('\\'), 'Should not contain quotes or backslashes');
        assert.strictEqual(el.getAttribute('data-affiliate-monetized'), 'true');

        // Verify idempotency
        const prevHref = el.href;
        mockAutoMonetize(el);
        assert.strictEqual(el.href, prevHref, 'Repeated monetization should not modify URL');
    });

    it('client autoMonetize rewrites BestBuy link with https and single slash path', () => {
        const el = createMockElement('https://www.bestbuy.com/site/apple-airpods/12345.p');
        mockAutoMonetize(el);

        assert.strictEqual(typeof el.href, 'string');
        assert.ok(el.href.startsWith('https://click.linksynergy.com/fs-bin/click?'));
        assert.ok(!el.href.includes('//fs-bin/click'), 'Should not have double slashes');
        assert.strictEqual(el.getAttribute('data-affiliate-monetized'), 'true');
    });

    it('client autoMonetize handles internal and non-deal links idempotently', () => {
        const el = createMockElement('https://phatwalletforums.com/topic/100/general-discussion');
        mockAutoMonetize(el);

        assert.strictEqual(el.href, 'https://phatwalletforums.com/topic/100/general-discussion');
        assert.strictEqual(el.getAttribute('data-affiliate-monetized'), 'true');
    });

    it('client autoMonetize ignores in-page anchors, javascript, and mailto links', () => {
        const hashEl = createMockElement('#reply');
        mockAutoMonetize(hashEl);
        assert.strictEqual(hashEl.href, '#reply');
        assert.strictEqual(hashEl.getAttribute('data-affiliate-monetized'), 'true');

        const jsEl = createMockElement('javascript:void(0)');
        mockAutoMonetize(jsEl);
        assert.strictEqual(jsEl.href, 'javascript:void(0)');
        assert.strictEqual(jsEl.getAttribute('data-affiliate-monetized'), 'true');

        const mailEl = createMockElement('mailto:test@example.com');
        mockAutoMonetize(mailEl);
        assert.strictEqual(mailEl.href, 'mailto:test@example.com');
        assert.strictEqual(mailEl.getAttribute('data-affiliate-monetized'), 'true');
    });

    it('server-side processPost correctly sanitizes escaped quotes in href attributes', (t, done) => {
        const plugin = require('../library.js');
        const data = {
            postData: {
                content: '<p>Check this deal: <a href=\\"https://www.target.com/p/12345\\">Target Deal</a></p>'
            }
        };

        plugin.processPost(data, (err, result) => {
            assert.ifError(err);
            assert.strictEqual(
                result.postData.content,
                '<p>Check this deal: <a href="https://www.target.com/p/12345">Target Deal</a></p>'
            );
            done();
        });
    });

    it('server-side processPost tags Amazon links without dropping existing query parameters', (t, done) => {
        const plugin = require('../library.js');
        const data = {
            postData: {
                content: '<p>Buy now: <a href="https://www.amazon.com/dp/B0012345?ref=cm_sw_r&psc=1">Amazon Link</a></p>'
            }
        };

        plugin.processPost(data, (err, result) => {
            assert.ifError(err);
            const content = result.postData.content;
            assert.ok(content.includes('tag=phtwllt-20'), 'Should contain affiliate tag');
            assert.ok(content.includes('ref=cm_sw_r'), 'Should preserve existing query param ref');
            assert.ok(content.includes('psc=1'), 'Should preserve existing query param psc');
            done();
        });
    });

    it('server-side processPost handles malformed input gracefully', (t, done) => {
        const plugin = require('../library.js');

        plugin.processPost(null, (err, res) => {
            assert.ifError(err);
            assert.strictEqual(res, null);

            plugin.processPost({}, (err2, res2) => {
                assert.ifError(err2);
                assert.deepStrictEqual(res2, {});

                plugin.processPost({ postData: {} }, (err3, res3) => {
                    assert.ifError(err3);
                    assert.deepStrictEqual(res3, { postData: {} });
                    done();
                });
            });
        });
    });
});
