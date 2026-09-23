'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert');
const Url = require('../static/lib/url.js');
const plugin = require('../library.js');

// Mock DOM element matching browser HTMLElement interface used by cj.js
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

// Client autoMonetize simulation with full network rules
function mockAutoMonetize(element, options) {
    options = options || {};
    const cjDomains = options.cjDomains || ['stubhub.com', 'woot.com', 'fiverr.com', 'booking.com'];
    const ls_id = 'R*/doq1oWeQ';
    const wm_offerid = '223073.1';
    const bb_offerid = '492045.1';
    const sc_offerid = '209383.1';
    const ps_offerid = '20265.1';
    const jt_offerid = '372959.1';

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

    // Already monetized domains
    if (domainInLowerCase.indexOf('goto.target.com') !== -1 ||
        domainInLowerCase.indexOf('linksynergy.walmart.com') !== -1 ||
        domainInLowerCase.indexOf('click.linksynergy.com') !== -1 ||
        domainInLowerCase.indexOf('adorama.evyy.net') !== -1 ||
        domainInLowerCase.indexOf('tkqlhce.com') !== -1) {
        element.setAttribute('data-affiliate-monetized', 'true');
        return;
    }

    if (/(?:^|\.)(?:amazon\.com|a\.co|amzn\.to|amzn\.com)$/i.test(domainInLowerCase)) {
        var u = new Url(url);
        u.protocol = 'https';
        u.query['tag'] = 'phtwllt-20';
        element.href = u.toString();
        element.setAttribute('data-affiliate-monetized', 'true');
    } else if (domainInLowerCase.indexOf('target.com') !== -1) {
        var u = new Url('https://goto.target.com/c/437216/81938/2092');
        u.query['u'] = url;
        element.href = u.toString();
        element.setAttribute('data-affiliate-monetized', 'true');
    } else if (domainInLowerCase.indexOf('adorama.com') !== -1) {
        var u = new Url('https://adorama.evyy.net/c/437216/51926/1036');
        u.query['u'] = url;
        element.href = u.toString();
        element.setAttribute('data-affiliate-monetized', 'true');
    } else if (domainInLowerCase.indexOf('walmart.com') !== -1) {
        var u = new Url('https://linksynergy.walmart.com/fs-bin/click?subid=0&type=10&tmpid=1082');
        u.query['RD_PARM1'] = url;
        u.query['id'] = ls_id;
        u.query['offerid'] = wm_offerid;
        element.href = u.toString();
        element.setAttribute('data-affiliate-monetized', 'true');
    } else if (domainInLowerCase.indexOf('jackrabbit.com') !== -1) {
        var u = new Url('https://click.linksynergy.com/deeplink?id=' + encodeURIComponent(ls_id));
        u.query['murl'] = url;
        u.query['mid'] = 40451;
        element.href = u.toString();
        element.setAttribute('data-affiliate-monetized', 'true');
    } else if (domainInLowerCase.indexOf('bestbuy.com') !== -1) {
        var u = new Url('https://click.linksynergy.com/fs-bin/click?subid=0&type=10&tmpid=13127');
        u.query['RD_PARM1'] = url;
        u.query['id'] = ls_id;
        u.query['offerid'] = bb_offerid;
        element.href = u.toString();
        element.setAttribute('data-affiliate-monetized', 'true');
    } else if (domainInLowerCase.indexOf('samsclub.com') !== -1) {
        var u = new Url('https://click.linksynergy.com/fs-bin/click?subid=0&type=10&tmpid=13344');
        u.query['RD_PARM1'] = url;
        u.query['id'] = ls_id;
        u.query['offerid'] = sc_offerid;
        element.href = u.toString();
        element.setAttribute('data-affiliate-monetized', 'true');
    } else if (domainInLowerCase.indexOf('petsmart.com') !== -1) {
        var u = new Url('https://click.linksynergy.com/fs-bin/click?subid=0&type=10&tmpid=5690');
        u.query['RD_PARM1'] = url;
        u.query['id'] = ls_id;
        u.query['offerid'] = ps_offerid;
        element.href = u.toString();
        element.setAttribute('data-affiliate-monetized', 'true');
    } else if (domainInLowerCase.indexOf('jet.com') !== -1) {
        var u = new Url('https://click.linksynergy.com/fs-bin/click?subid=0&type=10&tmpid=20265');
        u.query['RD_PARM1'] = url;
        u.query['id'] = ls_id;
        u.query['offerid'] = jt_offerid;
        element.href = u.toString();
        element.setAttribute('data-affiliate-monetized', 'true');
    } else if (cjDomains.some(d => domainInLowerCase === d || domainInLowerCase.endsWith('.' + d))) {
        var u = new Url('https://www.tkqlhce.com/click-8181347-12624508');
        u.query['url'] = url;
        element.href = u.toString();
        element.setAttribute('data-affiliate-monetized', 'true');
    } else {
        element.setAttribute('data-affiliate-monetized', 'true');
    }
}

describe('Url class methods and edge cases', () => {
    it('parses standard URLs into protocol, host, port, path, query, and hash', () => {
        const u = new Url('https://user:pass@example.com:8080/path/to/resource?foo=bar&baz=qux#section1');
        assert.strictEqual(u.protocol, 'https');
        assert.strictEqual(u.host, 'example.com');
        assert.strictEqual(u.port, '8080');
        assert.strictEqual(u.user, 'user');
        assert.strictEqual(u.pass, 'pass');
        assert.strictEqual(u.path, '/path/to/resource');
        assert.strictEqual(u.query.foo, 'bar');
        assert.strictEqual(u.query.baz, 'qux');
        assert.strictEqual(u.hash, 'section1');
    });

    it('omits default ports (80 for http, 443 for https) in output', () => {
        const httpUrl = new Url('http://example.com:80/page');
        assert.strictEqual(httpUrl.port, '');
        assert.strictEqual(httpUrl.toString(), 'http://example.com/page');

        const httpsUrl = new Url('https://example.com:443/page');
        assert.strictEqual(httpsUrl.port, '');
        assert.strictEqual(httpsUrl.toString(), 'https://example.com/page');
    });

    it('handles query manipulation: adding, editing, and deleting query parameters', () => {
        const u = new Url('https://www.example.com/search?q=deals');
        u.query['sort'] = 'price';
        u.query['q'] = 'laptops';
        assert.strictEqual(u.toString(), 'https://www.example.com/search?q=laptops&sort=price');

        delete u.query['sort'];
        assert.strictEqual(u.toString(), 'https://www.example.com/search?q=laptops');
    });

    it('handles array-based multi-value query parameters', () => {
        const u = new Url('https://www.example.com/filter?tag=electronics&tag=deals');
        assert.ok(Array.isArray(u.query.tag));
        assert.strictEqual(u.query.tag.length, 2);
        assert.strictEqual(u.query.tag[0], 'electronics');
        assert.strictEqual(u.query.tag[1], 'deals');
        assert.strictEqual(u.toString(), 'https://www.example.com/filter?tag=electronics&tag=deals');
    });

    it('clearQuery() removes all query parameters from u.query', () => {
        const u = new Url('https://www.example.com/items?cat=1&page=2');
        assert.strictEqual(Object.keys(u.query).length, 2);
        assert.strictEqual(u.query.toString(), 'cat=1&page=2');

        u.clearQuery();
        assert.strictEqual(Object.keys(u.query).length, 0);
        assert.strictEqual(u.query.toString(), '');
        assert.strictEqual(u.toString(), 'https://www.example.com/items');
    });

    it('paths() method gets and sets path components correctly', () => {
        const u = new Url('https://www.example.com/api/v1/users');
        const p = u.paths();
        assert.deepStrictEqual(p, ['api', 'v1', 'users']);

        u.paths(['api', 'v2', 'items']);
        assert.strictEqual(u.path, '/api/v2/items');
        assert.strictEqual(u.toString(), 'https://www.example.com/api/v2/items');
    });

    it('isAbsolute() correctly reports URL absoluteness', () => {
        assert.ok(new Url('https://example.com/test').isAbsolute());
        assert.ok(new Url('http://example.com').isAbsolute());
        assert.ok(new Url('/local/path').isAbsolute());
    });

    it('encode and decode handle special characters', () => {
        const u = new Url('https://www.example.com');
        assert.strictEqual(u.encode("it's a test"), "it%27s%20a%20test");
        assert.strictEqual(u.decode("it%27s%20a%20test"), "it's a test");
    });
});

describe('cleanUrl and sanitizeUrl logic', () => {
    it('strips leading and trailing quotes, double quotes, and escaped backslashes', () => {
        assert.strictEqual(cleanUrl('"https://example.com"'), 'https://example.com');
        assert.strictEqual(cleanUrl('\'https://example.com\''), 'https://example.com');
        assert.strictEqual(cleanUrl('\\"https://example.com\\"'), 'https://example.com');
        assert.strictEqual(cleanUrl('\\\\"https://example.com\\\\"'), 'https://example.com');
        assert.strictEqual(cleanUrl('%5C%22https://example.com%5C%22'), 'https://example.com');
        assert.strictEqual(cleanUrl('%22https://example.com%22'), 'https://example.com');
    });

    it('converts HTML entities for quotes and ampersands', () => {
        assert.strictEqual(cleanUrl('&quot;https://example.com&quot;'), 'https://example.com');
        assert.strictEqual(cleanUrl('&#34;https://example.com&#34;'), 'https://example.com');
        assert.strictEqual(cleanUrl('&#39;https://example.com&#39;'), 'https://example.com');
        assert.strictEqual(
            cleanUrl('https://example.com/deal?a=1&amp;b=2'),
            'https://example.com/deal?a=1&b=2'
        );
    });

    it('un-embeds nested absolute URLs caused by relative path corruption', () => {
        const input1 = '/topic/24452/deal/\\"https://goto.target.com/c/123/456';
        assert.strictEqual(cleanUrl(input1), 'https://goto.target.com/c/123/456');

        const input2 = '/topic/999/daily-deals/%5C%22https://www.walmart.com/ip/123';
        assert.strictEqual(cleanUrl(input2), 'https://www.walmart.com/ip/123');

        const input3 = 'https://phatwalletforums.com/topic/10/https://www.bestbuy.com/site/item.p';
        assert.strictEqual(cleanUrl(input3), 'https://www.bestbuy.com/site/item.p');
    });

    it('does not truncate legitimate query parameters containing encoded or raw URLs', () => {
        const urlWithParam = 'https://goto.target.com/c/437216/81938/2092?u=https%3A%2F%2Fwww.target.com%2Fp%2F123';
        assert.strictEqual(cleanUrl(urlWithParam), urlWithParam);

        const linksynergyParam = 'https://click.linksynergy.com/fs-bin/click?RD_PARM1=https%3A%2F%2Fwww.bestbuy.com';
        assert.strictEqual(cleanUrl(linksynergyParam), linksynergyParam);
    });

    it('handles falsy or non-string inputs safely without throwing', () => {
        assert.strictEqual(cleanUrl(null), '');
        assert.strictEqual(cleanUrl(undefined), '');
        assert.strictEqual(cleanUrl(''), '');
        assert.strictEqual(cleanUrl(123), '');
        assert.strictEqual(cleanUrl({}), '');
    });
});

describe('Client-side autoMonetize rules', () => {
    it('rewrites Amazon link with tag=phtwllt-20', () => {
        const el = createMockElement('https://www.amazon.com/dp/B08N5WRWNW');
        mockAutoMonetize(el);

        assert.strictEqual(typeof el.href, 'string');
        assert.ok(el.href.startsWith('https://www.amazon.com/dp/B08N5WRWNW?tag=phtwllt-20'));
        assert.strictEqual(el.getAttribute('data-affiliate-monetized'), 'true');
    });

    it('rewrites Amazon shortlinks (a.co and amzn.to) with tag=phtwllt-20 and enforces https', () => {
        const acoEl = createMockElement('http://a.co/d/0iKHm6Jo');
        mockAutoMonetize(acoEl);
        assert.strictEqual(acoEl.href, 'https://a.co/d/0iKHm6Jo?tag=phtwllt-20');
        assert.strictEqual(acoEl.getAttribute('data-affiliate-monetized'), 'true');

        const amznEl = createMockElement('https://amzn.to/3example');
        mockAutoMonetize(amznEl);
        assert.strictEqual(amznEl.href, 'https://amzn.to/3example?tag=phtwllt-20');
        assert.strictEqual(amznEl.getAttribute('data-affiliate-monetized'), 'true');
    });

    it('rewrites Target link cleanly to goto.target.com with u parameter', () => {
        const el = createMockElement('https://www.target.com/p/apple-airpods-pro/-/A-80183742');
        mockAutoMonetize(el);

        assert.strictEqual(typeof el.href, 'string');
        assert.ok(el.href.startsWith('https://goto.target.com/c/437216/81938/2092?u='));
        assert.ok(el.href.includes('apple-airpods-pro'));
        assert.strictEqual(el.getAttribute('data-affiliate-monetized'), 'true');
    });

    it('bypasses Target links already monetized (goto.target.com)', () => {
        const existing = 'https://goto.target.com/c/437216/81938/2092?u=https%3A%2F%2Fwww.target.com';
        const el = createMockElement(existing);
        mockAutoMonetize(el);

        assert.strictEqual(el.href, existing);
        assert.strictEqual(el.getAttribute('data-affiliate-monetized'), 'true');
    });

    it('rewrites Walmart link with linksynergy.walmart.com and offerid', () => {
        const el = createMockElement('https://www.walmart.com/ip/Sony-PlayStation-5/12345678');
        mockAutoMonetize(el);

        assert.strictEqual(typeof el.href, 'string');
        assert.ok(el.href.startsWith('https://linksynergy.walmart.com/fs-bin/click?'));
        assert.ok(el.href.includes('offerid=223073.1'));
        assert.ok(el.href.includes('RD_PARM1=https%3A%2F%2Fwww.walmart.com'));
        assert.strictEqual(el.getAttribute('data-affiliate-monetized'), 'true');
    });

    it('rewrites BestBuy link with click.linksynergy.com and single slash path', () => {
        const el = createMockElement('https://www.bestbuy.com/site/sony-headphones/12345.p');
        mockAutoMonetize(el);

        assert.strictEqual(typeof el.href, 'string');
        assert.ok(el.href.startsWith('https://click.linksynergy.com/fs-bin/click?'));
        assert.ok(!el.href.includes('//fs-bin/click'));
        assert.ok(el.href.includes('offerid=492045.1'));
        assert.strictEqual(el.getAttribute('data-affiliate-monetized'), 'true');
    });

    it('rewrites Sam\'s Club link with click.linksynergy.com and offerid=209383.1', () => {
        const el = createMockElement('https://www.samsclub.com/p/member-mark-paper-towels/prod1234');
        mockAutoMonetize(el);

        assert.strictEqual(typeof el.href, 'string');
        assert.ok(el.href.startsWith('https://click.linksynergy.com/fs-bin/click?'));
        assert.ok(el.href.includes('offerid=209383.1'));
        assert.strictEqual(el.getAttribute('data-affiliate-monetized'), 'true');
    });

    it('rewrites PetSmart link with click.linksynergy.com and offerid=20265.1', () => {
        const el = createMockElement('https://www.petsmart.com/dog/food/dry-food/brand-12345.html');
        mockAutoMonetize(el);

        assert.strictEqual(typeof el.href, 'string');
        assert.ok(el.href.startsWith('https://click.linksynergy.com/fs-bin/click?'));
        assert.ok(el.href.includes('offerid=20265.1'));
        assert.strictEqual(el.getAttribute('data-affiliate-monetized'), 'true');
    });

    it('rewrites Jet.com link with click.linksynergy.com and jt_offerid=372959.1', () => {
        const el = createMockElement('https://www.jet.com/product/item/12345');
        mockAutoMonetize(el);

        assert.strictEqual(typeof el.href, 'string');
        assert.ok(el.href.startsWith('https://click.linksynergy.com/fs-bin/click?'));
        assert.ok(el.href.includes('offerid=372959.1'));
        assert.strictEqual(el.getAttribute('data-affiliate-monetized'), 'true');
    });

    it('rewrites Adorama link with adorama.evyy.net Impact Radius link', () => {
        const el = createMockElement('https://www.adorama.com/nikond850.html');
        mockAutoMonetize(el);

        assert.strictEqual(typeof el.href, 'string');
        assert.ok(el.href.startsWith('https://adorama.evyy.net/c/437216/51926/1036?u='));
        assert.strictEqual(el.getAttribute('data-affiliate-monetized'), 'true');
    });

    it('rewrites JackRabbit link with click.linksynergy.com/deeplink', () => {
        const el = createMockElement('https://www.jackrabbit.com/shoes/running-123');
        mockAutoMonetize(el);

        assert.strictEqual(typeof el.href, 'string');
        assert.ok(el.href.startsWith('https://click.linksynergy.com/deeplink?'));
        assert.ok(el.href.includes('mid=40451'));
        assert.strictEqual(el.getAttribute('data-affiliate-monetized'), 'true');
    });

    it('rewrites CJ domain links to tkqlhce.com', () => {
        const el = createMockElement('https://www.woot.com/offers/special-deal-item');
        mockAutoMonetize(el);

        assert.strictEqual(typeof el.href, 'string');
        assert.ok(el.href.startsWith('https://www.tkqlhce.com/click-8181347-12624508?url='));
        assert.strictEqual(el.getAttribute('data-affiliate-monetized'), 'true');
    });

    it('enforces idempotency across multiple runs on the same DOM element', () => {
        const el = createMockElement('https://www.target.com/p/item/-/A-123');
        mockAutoMonetize(el);
        const firstPass = el.href;

        // Second pass
        mockAutoMonetize(el);
        assert.strictEqual(el.href, firstPass);

        // Third pass
        mockAutoMonetize(el);
        assert.strictEqual(el.href, firstPass);
    });

    it('safely ignores non-HTTP links (anchors, javascript, mailto, tel)', () => {
        const anchor = createMockElement('#top');
        mockAutoMonetize(anchor);
        assert.strictEqual(anchor.href, '#top');
        assert.strictEqual(anchor.getAttribute('data-affiliate-monetized'), 'true');

        const js = createMockElement('javascript:void(0);');
        mockAutoMonetize(js);
        assert.strictEqual(js.href, 'javascript:void(0);');
        assert.strictEqual(js.getAttribute('data-affiliate-monetized'), 'true');

        const mail = createMockElement('mailto:support@example.com');
        mockAutoMonetize(mail);
        assert.strictEqual(mail.href, 'mailto:support@example.com');
        assert.strictEqual(mail.getAttribute('data-affiliate-monetized'), 'true');
    });
});

describe('Server-side processPost (library.js)', () => {
    it('sanitizes escaped quotes in href attributes', (t, done) => {
        const data = {
            postData: {
                content: '<p>Check out <a href=\\"https://www.target.com/p/12345\\">Target Deal</a></p>'
            }
        };

        plugin.processPost(data, (err, result) => {
            assert.ifError(err);
            assert.strictEqual(
                result.postData.content,
                '<p>Check out <a href="https://www.target.com/p/12345">Target Deal</a></p>'
            );
            done();
        });
    });

    it('tags Amazon links and preserves existing query parameters', (t, done) => {
        const data = {
            postData: {
                content: '<p><a href="https://www.amazon.com/dp/B0012345?ref=cm_sw_r&psc=1">Amazon Link</a></p>'
            }
        };

        plugin.processPost(data, (err, result) => {
            assert.ifError(err);
            const content = result.postData.content;
            assert.ok(content.includes('tag=phtwllt-20'));
            assert.ok(content.includes('ref=cm_sw_r'));
            assert.ok(content.includes('psc=1'));
            done();
        });
    });

    it('overwrites other affiliate tags on Amazon links with phtwllt-20', (t, done) => {
        const data = {
            postData: {
                content: '<p><a href="https://www.amazon.com/dp/B0012345?tag=competitor-20&ref=dp_1">Amazon Link</a></p>'
            }
        };

        plugin.processPost(data, (err, result) => {
            assert.ifError(err);
            const content = result.postData.content;
            assert.ok(content.includes('tag=phtwllt-20'));
            assert.ok(!content.includes('tag=competitor-20'));
            assert.ok(content.includes('ref=dp_1'));
            done();
        });
    });

    it('correctly processes multiple Amazon links within the same post', (t, done) => {
        const data = {
            postData: {
                content: '<p><a href="https://www.amazon.com/dp/B001">First</a> and <a href="https://www.amazon.com/dp/B002?foo=bar">Second</a></p>'
            }
        };

        plugin.processPost(data, (err, result) => {
            assert.ifError(err);
            const content = result.postData.content;
            assert.ok(content.includes('https://www.amazon.com/dp/B001?tag=phtwllt-20'));
            assert.ok(content.includes('https://www.amazon.com/dp/B002?foo=bar&tag=phtwllt-20'));
            done();
        });
    });

    it('tags Amazon mobile shortlinks (a.co and amzn.to) and upgrades to https', (t, done) => {
        const data = {
            postData: {
                content: '<p>Check out <a href="http://a.co/d/0iKHm6Jo">Phone Deal</a> and <a href="https://amzn.to/3example?ref=share">Other Deal</a></p>'
            }
        };

        plugin.processPost(data, (err, result) => {
            assert.ifError(err);
            const content = result.postData.content;
            assert.ok(content.includes('https://a.co/d/0iKHm6Jo?tag=phtwllt-20'));
            assert.ok(content.includes('https://amzn.to/3example?ref=share&tag=phtwllt-20'));
            done();
        });
    });

    it('leaves non-Amazon links untouched in post content', (t, done) => {
        const data = {
            postData: {
                content: '<p><a href="https://www.google.com/search?q=deals">Google Search</a></p>'
            }
        };

        plugin.processPost(data, (err, result) => {
            assert.ifError(err);
            assert.strictEqual(
                result.postData.content,
                '<p><a href="https://www.google.com/search?q=deals">Google Search</a></p>'
            );
            done();
        });
    });

    it('handles malformed, empty, and non-object inputs gracefully', (t, done) => {
        plugin.processPost(null, (err, res) => {
            assert.ifError(err);
            assert.strictEqual(res, null);

            plugin.processPost({}, (err2, res2) => {
                assert.ifError(err2);
                assert.deepStrictEqual(res2, {});

                plugin.processPost({ postData: {} }, (err3, res3) => {
                    assert.ifError(err3);
                    assert.deepStrictEqual(res3, { postData: {} });

                    plugin.processPost({ postData: { content: 12345 } }, (err4, res4) => {
                        assert.ifError(err4);
                        assert.deepStrictEqual(res4, { postData: { content: 12345 } });
                        done();
                    });
                });
            });
        });
    });
});
