"use strict";
/* globals config */

(function() {
    var domains = ['www.textbookunderground.com', 'stubhub.co.kr', 'way.com', 'es.dhgate.com', 'jetradar.com.br',
    'jetradar.com.au', 'www.gaffos.com', 'www.ebooks.com', 'dorcousa.com', 'www.dl1961.com', 'everbuying.net',
    'www.getresponse.com', 'lightinthebox.7eer.net', 'www.authenticwatches.com', 'www.interserver.net',
    'usa.kaspersky.com', 'www.gamesdeal.com', 'www.1800lighting.com', 'koutea.com', 'www.stubhub.co.kr',
    'm.travelmob.com', 'viviscalman.com', 'www.thrivemarket.com', 'www.namecheap.com', 'holabirdsports.com',
    'us.nd-bd.com', 'weekendinitaly.com', 'cn.gamesdeal.com', 'store.wdc.com', 'theliteracysite.greatergood.com',
    'rosesonly.com', 'www.mybullysticks.com', 'www.expertrating.com', 'www.tickets.cheap.', 'hosting24.com',
    'lightingever.com', 'pariscityvision.com', 'eyedoptics.com', 'callawayapparel.com', 'bestvetcare.com',
    'it.dhgate.com', 'afeyewear.com', 'megamotormadness.com', 'www.nobelcom.com', 'cyberlink.com',
    'www.backjoy.com', 'mysecretwood.com', 'daz3d.com', 'playaresorts.com', 'kinguin.net',
    'www.factoryoutletstore.com', 'mediatemple.net', 'www.roxio.de', 'www.lafurniturestore.com',
    'www.lightinthebox.com', 'armorconcepts.com', 'm.aliexpress.com', 'silagames.com', 'www.shindigz.com',
    'www.autoeurope.com', 'us.gearbest.com', 'theautismsite.greatergood.com', 'heartlandamerica.com',
    'www.digitalrev.com', 'support.phone.com', 'usbkill.com', 'www.terapeak.com', 'www.clickmeeting.com',
    'mojosocks.com', 'lukluks.com', 'www.nearlynatural.com', 'directgardening.com', 'www.ereleases.com',
    'www.bookingbuddy.co.uk', 'fuselenses.com', 'www.livingsocial.com', 'kingsbottle.com', 'modernbathroom.com',
    'livingdna.com', 'www.greatclubs.com', 'catholiccompany.com', 'eglobalcentral.com', 'www.nestlearning.com',
    'de.supershuttle.fr', 'lightingever.de', 'www.bedandbreakfast.com', 'www.picturesongold.com', 'www.terapeak.fr',
    'm.sammydress.com', 'bluehost.com', 'freetaxusa.com', 'www.chiefsupply.com', 'www.thingsyouneverknew.com',
    'clymer.com', 'dogcrate.com', 'www.terapeak.cn', 'anolon.com', 'www.terapeak.ca', 'www.jabra.com', 'yoins.com',
    'www.terapeak.de', 'bestofvegas.com', 'yvesrocher.ca', 'www.worldmarket.com', 'mojomarketplace.com',
    'www.mygretchen.com', 'www.gadventures.com', 'intercall.com', 'chemicalguys.com', 'www.luggageguy.com',
    'veteransadvantage.com', 'www.amiclubwear.com', 'thehungryjpeg.com', 'www.cheapoair.com', 'www.terapeak.jp',
    'purminerals.com', 'www.jimmyjazz.com', 'balance.bistromd.com', 'fr.gamesdeal.com', 'otel.com',
    'www.petcaresupplies.com', 'www.wondershare.fr', 'de.dhgate.com', 'qlinkwireless.com', 'dealsmachine.com',
    'www.wondershare.it', 'getresponse.ru', 'www.fragrancex.com', 'vapesourcing.com', 'bornshoes.com',
    'www.designcrowd.com', 'getresponse.pl', 'www.wondershare.de', 'phone.com', 'www.wondershare.es',
    'ticketbis.cl', 'getresponse.es', 'misterart.com', 'www.evemattress.com', 'shop.keetsa.com', 'netfirms.com',
    'cliradex.com', 'homeaway.tw', 'petfancy.com', 'www.patpat.com', 'rosesonly.com.sg', 'californiadelicious.com',
    'www.avg.com', 'sheetmusicplus.com', 'sport.woot.com', 'www.airfarewatchdog.com', 'brayola.com',
    'starlinetours.com', 'mensusa.com', 'www.eibmarkt.com', 'www.smartbuyglasses.ca', 'control.phone.com',
    'designashirt.com', 'fuse-rx.com', 'www.rapala.com', 'moosejaw.com', 'www.willygoat.com', 'rentalcars.com',
    'uk.gearbest.com', 'www.profootballfocus.com', 'www.symantec.com', 'www.costumecraze.com',
    'www.undercovertourist.com', 'shirt.woot.com', 'swap.com', 'www.clickandgrow.com', 'brestrogen.com',
    'www.sonos.com', 'www.hairextensionbuy.com', 'airwander.com', 'whistle.com', 'www.affordableasia.com',
    'frilly.com', 'vividracing.com', 'www.milanoo.com', 'airsoftmegastore.com', 'getreponse.co.uk',
    'zizowireless.com', 'www.carsondellosa.com', 'refrigiwear.com', 'homary.com', 'ebooks.com',
    'www.sousvidesupreme.com', 'dresslink.com', 'taldepot.com', 'ca.jetradar.com', 'www.clicknkids.com',
    'www.ihomeaudio.com', 'glasswire.com', 'www.holabirdsports.com', 'circulon.com', 'www.sheetmusicplus.com',
    'fleximounts.com', 'www.holidayautos.se', 'safariland.com', 'www.laborlawposters-online.com',
    'www.americasbest.com', 'carrot-top.com', 'thelogocompany.net', 'valleyfoodstorage.com', 'www.holidayautos.no',
    'vessos.com', 'www.canadapetcare.com', 'www.printpictures.us', 'revivalanimal.com', 'adameve.com',
    'ticketbis.com', 'www.entertainmentearth.com', 'www.swap.com', 'touchofmodern.com', 'www.instaslim.com',
    'onlyauto.com', 'tomtop.com', 'magix.com', 'cheapoair.com', 'zaful.com', 'dealyard.com', 'gpsorigins.com',
    'justhost.com', 'homeaway.jp', 'creativekidstuff.com', 'starregistry.com', 'www.sammydress.com', 'pureflix.com',
    'homeaway.hk', 'choies.com', 'cubavera.com', 'www.dexclusive.com', 'lowcostairlines.com', 'm.rosewholesale.com',
    'www.justhost.com', 'rock.com', 'www.bestbullysticks.com', 'www.stewleonards.com', 'expertrating.com',
    'meatthebutchers.com', 'animationfactory.com', 'clipart.com', 'mrp.com', 'www.holidayautos.fr',
    'tickets.fandango.com', 'www.holidayautos.de', 'fiverr.com', 'rafaellasportswear.com', 'carolynpollack.com',
    'jewlr.com', 'www.hostgator.com', 'www.perryellis.com', 'www.gradshop.com', 'www.booking.com',
    'www.lighterside.com', 'www.ticketnetwork.com', 'www.hobbytron.com', 'www.tonyrobbins.com', 'pamono.com',
    'magix.com', 'healthmateforever.com', 'www.tafford.com', 'www.booking.com', 'autoeurope.com',
    'www.allianztravelinsurance.com', 'turnkeyinternet.net', 'www.booking.com', 'badcreditloans.com',
    'www.stubhub.com.cn', 'en.supershuttle.fr', 'buy.guildwars2.com', 'www.gamersgate.com', 'www.buyautoparts.com',
    'woot.com', 'palaceresorts.com', 'silverfernbrand.com', 'www.couturecandy.com', 'plusinlove.com',
    'pl.gamesdeal.com', 'bluenile.com', 'www.booking.com', 'www.triwa.com', 'www.nchsoftware.com',
    'eglobalcentral.de', 'www.perfumeemporium.com', 'eglobalcentral.at', 'www.homeaway.com.co', 'eglobalcentral.be',
    'ericdress.com', 'gamiss.com', 'soufeel.es', 'www.mychicagosteak.com', 'www.homeaway.com.ar',
    'planttherapy.com', 'soufeel.fr', 'www.lensplanet.com', 'electronics.woot.com', 'americansignletters.com',
    'soufeel.ca', 'haynes.co.uk', 'soufeel.de', 'drwhitaker.com', 'support.terapeak.com', 'eshop.macsales.com',
    'doctor-recommended.com', 'thrivemarket.com', 'blueear.cz', 'www.cheapflights.com', 'www.123-reg.co.uk',
    'eglobalcentral.eu', 'www.pacificcoast.com', 'eglobalcentral.fr', 'www.lunarpages.com', 'www.glassesshop.com',
    'kids.woot.com', 'www.gilchristsoames.com', 'www.contiki.com', 'rosegal.com', 'www.designtoscano.com',
    'www.churchgoers.com', 'www.netfirms.com', 'soufeel.it', 'tickets.cheap', 'coolglow.com', 'www.oo-software.com',
    'www.edenfantasys.com', 'm.tours4fun.com', 'fullcircle.com', 'www.onegreatfamily.com', 'uk.nd-bd.com',
    'checkintocash.com', 'costumecraze.com', 'www.entirelypets.com', 'www.contentwatch.com', 'www.blueear.cz',
    'www.homeaway.asia', 'www.eukhost.com', 'ticketbis.co.kr', 'tech.woot.com', 'ipage.com',
    'www.golfshoesplus.com', 'www.peoplefinders.com', 'www.ornamentshop.com', 'www.fandangofanshop.com',
    'www.123inkjets.com', 'www.zonealarm.com', 'www.naked-zebra.com', 'm.fashionmia.com', 'www.simplilearn.com',
    'www.compandsave.com', 'www.prestigia.com', 'overstocksheetclub.com', 'russellstover.com', 'myprotein.com',
    'viviscal.com', 'm.koreanmall.com', 'www.discountmags.com', 'www.campusbookrentals.com', 'stubhub.in',
    'stubhub.id', 'www.1-800-inkfarm.com', 'stubhub.hk', 'patchmd.com', 'store.omronhealthcare.com',
    'www.stubhub.com', 'thediabetessite.greatergood.com', 'www.logogarden.com', 'stubhub.ec', 'lifeisgood.com',
    'dotandbo.com', 'fr.autoeurope.ca', 'magix-audio.com', 'stubhub.cl', 'stubhub.co', 'www.otel.com',
    'bellelily.com', 'koreanmall.com', 'shop.silkn.com', 'stubhub.ph', 'stubhub.pe', 'stubhub.my', '123stores.com',
    'rapala.com', 'thebreastcancersite.greatergood.com', 'cloud9living.com', 'www.zchocolat.com',
    'secure.checksinthemail.com', 'stubhub.jp', 'ie.nd-bd.com', 'sg.travelmob.com', 'wdc.com', 'rosesonly.co.uk',
    'jetradar.co.uk', 'myvega.ca', 'www.heavengifts.com', 'stubhub.uy', 'www.intercall.com', 'fr.caseable.com',
    'stubhub.tw', 'patpat.com', 'stubhub.sg', 'www.tallmenshoes.com', 'theveteranssite.greatergood.com',
    'www.24-7pressrelease.com', 'www.deewatch.com', 'outdoortechnology.com', 'www.worldwidegolfshops.com',
    'www.autopia-carcare.com', 'www.homeclick.com', 'www.herbspro.com', 'eu.caseable.com', 'www.botanicchoice.com',
    'www.farmfreshtoyou.com', 'newchic.com', 'miniinthebox.7eer.net', 'www.footshop.com', 'www.misterart.com',
    'www.onlinesports.com', 'www.ticketliquidator.com', 'execucar.com', 'roxio.com', 'csvape.com',
    'healthyskoop.com', 'www.pinnaclesys.com', 'www.aliexpress.com', 'www.autoeurope.ca', 'knownhost.com',
    'jetradar.co.nz', 'www.carouselchecks.com', 'rungreen.com', 'www.christmasornaments.com', 'flexispot.com',
    'www.slipcovershop.com', '1800postcards.com', 'www.cloud9living.com', 'notino.com', 'oscaroparts.com',
    'jetradar.co.th', 'urvapin.com', 'www.tomtom.com', 'www.dhgate.com', 'www.healthmateforever.com',
    'www.chapters.indigo.ca', 'mobile.fandango.com', 'craftholic.cz', 'luminati.io',
    'www.trampolinepartsandsupply.com', 'www.abebooks.co.uk', 'www.sunfood.com', 'fairyseason.com', 'clymer.co.uk',
    'm.yoins.com', 'www.lifeear.com', 'travelmob.com', 'dev.getresponse.com', 'www.beautyspin.com', 'credible.com',
    'advantage.active.com', 'www.travelmob.com', 'www.silverrushstyle.com', 'golden-charms.com',
    'www.poolproducts.com', 'thehungersite.greatergood.com', 'www.yarntree.co.kr', 'cn.vicnic.com',
    'www.jalbum.net', 'cigavette.com', 'opensky.com', 'www.all-battery.com', 'rallyhouse.com', 'www.cymax.com',
    'hu.gamesdeal.com', 'shopplanetblue.com', 'www.tmart.com', 'discountsurgical.com', 'www.bnbtobacco.com',
    'diamonds-usa.com', 'aeroflowbreastpumps.com', 'www.usadawgs.com', 'www.smartbuyglasses.com',
    'www.directgardening.com', 'myvega.com', 'www.x-cart.com', 'www.purchasetix.com', 'www.stubhub.au',
    'www.stubhub.ar', 'www.flowersfast.com', 'shoeline.com', 'www.stubhub.co', 'www.stubhub.cl',
    'bedandbreakfast.com', 'www.lacewigsbuy.com', 'www.stubhub.br', 'www.catholiccompany.com', 'www.stylenotch.com',
    'www.canvaspeople.com', 'www.suzannesomers.com', 'www.taxi2airport.com', 'buyincoins.com', 'kidgps.us',
    'www.stubhub.jp', 'stdcheck.com', 'www.spokeo.com', 'gearbest.com', 'www.stubhub.id', 'www.pariscityvision.com',
    'www.stubhub.in', 'www.stubhub.kr', 'www.power-systems.com', 'greatcompanions.com', 'scdkey.com',
    'www.mypoints.com', 'www.stubhub.ec', 'eyeconic.com', 'franklinmint.com', 'store.silagames.com',
    'www.cheapair.com', 'muvee.com', 'm.zaful.com', 'www.stubhub.hk', 'www.starlinetours.com', 'flydubai.com',
    'omronhealthcare.com', 'www.cndirect.com', 'spokeo.com', 'www.swimspot.com', 'isango.com',
    'www.ownersdirect.co.uk', 'www.vegastickets.com', 'www.verseo.com', 'gearbest', 'www.yvesrocherusa.com',
    'theanimalrescuesite.greatergood.com', 'divadames.com', 'www.petcarechoice.com', 'sammydress.com',
    'storenvy.com', 'chicgrace.com', 'www.luxomo.com', 'www.ziprecruiter.com', 'anjolee.com', 'beddinginn.com',
    'www.macsales.com', 'www.gallerycollection.com', 'www.techforless.com', 'blackhawx.com', 'www.goedekers.com',
    'everbuying.com', 'www.totalpetsupply.com', 'stubhub.com.au', 'webstore.ansi.org', 'stubhub.com.br',
    'stubhub.com.cn', 'soufeel.com', 'degustabox.com', 'fr.fashionmia.com', 'www.leaffilter.com', 'homeaway.com.sg',
    'republicwireless.com', 'supershuttle.com', 'homeaway.com.ph', 'taylormadegolf.com', 'www.testclear.com',
    'soufeel.co.uk', 'www.myweddingfavors.com', 'www.vetshop.com', 'www.armorconcepts.com', 'eibmarkt.com',
    'm.discountsurgical.com', 'arttoframe.com', 'phen375.com', 'jeulia.com', 'mackeeper.kromtech.net',
    'taylormadegolf.ca', 'zapals.com', 'www.omnis.com', 'www.boscovs.com', 'shopgeox.com', 'stubhub.com.mx',
    'homeaway.com.my', 'haynes.com', 'www.stubhub.th', 'www.stubhub.tw', 'www.stubhub.sg', 'www.stubhub.mx',
    'www.stubhub.my', 'lafurniturestore.com', 'www.purcosmetics.com', 'www.stubhub.ph', 'www.stubhub.pe',
    'tools.woot.com', 'www.smartbuyglasses.co.za', 'suntransfers.com', 'depositphotos.com', 'www.stubhub.za',
    'homeaway.com.cn', 'www.ashleystewart.com', 'shop.chopra.com', 'evan-moor.com', 'www.checks-superstore.com',
    'allivet.com', 'stubhub.com.ar', 'www.stubhub.ve', 'bookingbuddy.com', 'mclarenstore.com', 'twigby.com',
    'officialmerchandise.com', 'www.stubhub.uy', 'griffintechnology.com', 'www.briantracy.com', 'www.priody.sk',
    'homedna.com', 'holidayautos.fr', 'svmoscow.com', 'www.greatcall.com', 'lendingpoint.com', 'au.nd-bd.com',
    'www.princetonwatches.com', 'cosme-de.com', 'www.airportparkingreservations.com', 'budgetpetcare.com',
    'www.silkn.com', 'holidayautos.de', 'www.roku.com', 'www.woot.com', 'www.iprint.com', 'travel.spentapp.com',
    'www.domain.com', 'www.halegroves.com', 'www.deewatch.de', 'pt.dhgate.com', 'www.happyfeet.com',
    'www.betterworldbooks.com', 'www.stumpsparty.com', 'www.bluehost.com', 'www.carrental8.com',
    'www.xdorialife.com', 'www.canvasdiscount.com', 'dexclusive.com', 'www.discountednewspapers.com',
    'www.priody.de', 'www.priody.cz', 'www.mmoga.co.uk', 'affiliates.sheetmusicplus.com', 'homeaway.com.vn',
    'www.deewatch.es', 'freedompop.com', 'www.petstreetmall.com', 'www.antennasdirect.com', 'holidayautos.se',
    'www.deewatch.fr', 'gameladen', 'www.homeaway.ru', 'www.deewatch.se', 'www.teamsnap.com', 'holidayautos.no',
    'www.newegg.ca', 'provailen.com', 'www.vapor4life.com', 'www.bookingbuddy.com', 'www.transcender.com',
    'www.case-mate.com', 'www.socialengine.com', 'www.einvite.com', 'evemattress.com', 'www.wondershare.com',
    'candylipz.com', 'www.homesquare.com', 'wholesale.naked-zebra.com', 'centralparksightseeing.com',
    'www.priody.hu', 'www.trendfabrik.de', 'computers.woot.com', 'www.autobarn.net', 'jetradar.pt', 'www.mwave.com',
    'jetradar.pl', 'jetradar.sg', 'www.lifeisgood.com', 'www.roxio.com', 'www.essayedge.com',
    'eglobalcentral.co.it', 'adzuna.co.uk', 'www.connectyourhome.com', 'mycoolingstore.com', 'intl.turtlebeach.com',
    'www.weekendinitaly.com', 'potsandpans.com', 'jetradar.fr', 'www.smapmade.com', 'mylabbox.com', 'jetradar.es',
    'www.globehunters.us', 'coastalscents.com', 'www.arkivmusic.com', 'www.getolympus.com', 'stylenotch.com',
    'jetradar.it', 'vueling.com', 'xdorialife.com', 'usconcealedcarry.com', 'catholicmatch.com',
    'eglobalcentral.co.uk', 'www.cb1weightgainer.com', 'www.groundlink.com', 'lightingever.co.uk', 'soufeel.com.au',
    'www.homeaway.co.uk', 'www.zinio.com', 'secure.getresponse.com', 'sabonnyc.com', 'boohooman.com', 'jetradar.de',
    'www.shoeline.com', 'airocide.com', 'www.oreilly.com', 'fr.smartbuyglasses.ca', 'www.focalprice.com',
    'www.azbro.com', 'www.holidayautos.com', 'www.asmc.es', 'www.tours4fun.es', 'www.modernbathroom.com',
    'jalbum.net', 'www.bestdealmagazines.com', 'www.officedesigns.com', 'www.koreanmall.com', 'www.medexsupply.com',
    'www.swing-n-slide.com', 'es.gamesdeal.com', 'coastal.com', 'strength.com', 'www.terapeak.co.uk',
    'getallparts.com', 'www.lensdirect.com', 'www.identcheck.net', 'tvc-mall.com', 'www.theartofshaving.com',
    'adiphene.com', 'tradingview.com', 'greatcall.com', 'm.ericdress.com', 'www.carolinarustica.com',
    'cndirect.com', 'ru.dhgate.com', 'dresslily.com', 'www.eyeglasses.com', 'www.cbazaar.com', 'www.iclipart.com',
    'therainforestsite.greatergood.com', 'lightake.com', 'thealzheimerssite.greatergood.com', 'www.rvt.com',
    'weareknitters.com', 'www.parallels.com', 'www.terapeak.com.hk', 'plantsexpress.com', 'www.3dcart.com',
    'www.hotelwatchdog.com', 'bookvip.com', 'verseo.com', 'retailmenot', 'm.newchic.com', 'homeaway.co.th',
    'nuk-usa.com', 'ilovesciencestore.com', 'lifeear.com', 'www.winebasket.com', 'www.oasap.com',
    'www.neweggbusiness.com', 'connect.getresponse.com', 'beverlyhillsautocovers.com', 'oxfordbiolabs.com',
    'it.gamesdeal.com', 'ribbet.com', 'www.governmentauctions.org', 'trx2.com', 'www.diamonds-usa.com',
    'www.trustedtours.com', 'stubhub.com.ve', 'reolink.com', 'homeaway.co.kr', 'www.chicnico.com', 'vroom.com',
    'www.comboink.com', 'www.coffee.org', 'silvergoldbull.com', 'case-mate.com', 'www.framesdirect.com',
    'www.inkcartridges.com', 'siccups.com', 'homeaway.co.id', 'homeaway.co.in', 'bestdealmagazines.com',
    'www.priody.com', 'vapordna.com', 'www.cosmedix.com', 'www.miniinthebox.com', 'smarthome.com', 'ghostbed.com',
    'www.rallyhouse.com', 'fleximounts.jp', 'goedekers.com', 'sellout.woot.com', 'www.iolo.com',
    'www.loanbyphone.com', 'www.anypromo.com', 'www.picanova.com', 'www.vegascreativesoftware.com',
    'originalpenguin.com', 'madisonavenuemalls.com', 'lightsonline.com', 'www.bestoforlando.com',
    'twinkledeals.com', 'www.foxrentacar.com', 'www.omnisnetwork.biz', 'footshop.com', 'www.isango.com',
    'booking.com', 'fr.dhgate.com', 'taxi2airport.com', 'de.gamesdeal.com', 'www.bestcanvas.ca',
    'www.mightyleaf.com', 'jetradar.com', 'sofftshoe.com', 'www.mrp.com', 'jewlr.nl', 'avg.com',
    'blog.namecheap.com', 'english.ctrip.com', 'www.ipage.com', 'www.airsoftmegastore.com', 'www.spiritline.com',
    'www.shadesshuttersblinds.com', 'healthydirections.com', 'framesdirect.com', 'www.vitaminshoppe.com',
    'pyramydair.com', 'es.foxrentacar.com', 'gamersgate.com', 'webhosting.uk.com', 'www.supershuttle.fr',
    'naked-zebra.com', 'thewarmingstore.com', 'www.adagio.com', 'accessories.woot.com', 'neonlitter.com',
    'www.touchofmodern.com', 'www.lovehomeswap.com', 'www.fashionmia.com', 'www.1928.com', 'trafalgar.com',
    'www.worldpetexpress.net', 'www.tickets.cheap', 'www.mmoga.com', 'anjaysdesigns.com', 'farberwarecookware.com',
    'www.cashmereboutique.com', 'chynnadolls.com', 'kidsroom.de', 'yvesrocherusa.com', 'home.woot.com',
    'www.concordsupplies.com', 'jewlr.de', 'jewlr.ca', 'www.choies.com', 'iphotos.com', 'www.sephra.com',
    'jewlr.fr', 'www.ihg.com', 'jewlr.es', 'www.parksleepfly.com', 'jewlr.eu', 'es.supershuttle.fr', 'rawlings.com',
    'stubhub.co.za', 'simplyinsured.com', 'holidayautos.com', 'www.healthydirections.com', 'www.nolo.com',
    'www.4inkjets.com', 'www.gothamcigars.com', 'stubhub.co.th', 'eglobalcentral.com.es', 'www.fandango.com',
    'rosewholesale.com', 'www.lookupfare.com', 'm.cloud9living.com', 'love-scent.com', 'www.westmusic.com',
    'www.lexmod.com', 'www.fandangonow.com', 'drdavidwilliams.com', 'www.tours4fun.com', 'www.calendars.com',
    'online-top-up.digicelgroup.com', 'cuvanaecigar.com', 'www.caseable.com'
    ];    
    domains.push("shop.usa.canon.com", "ca.hotels.com", "hotels.com");
    var websiteId = 8450503;
    var trackingServerDomain = 'www.anrdoezrs.net';
    var generateLinkOnLoad = true;
    var publisherId = 4999405;
    var sid = undefined;
    var debug = false;
    //Amazon
    var amazon_tag = "phtwllt-20";
    //ebay
    var epn_campaign = 5338188580;
    var epn_pub = 5575178708;
    //linkshare
    var ls_id="R*/doq1oWeQ"
    //walmart
    var wm_offerid="223073.1";
    //bestbuy
    var bb_offerid="492045.1";    
    //sams club
    var sc_offerid="477763.1";
    //petsmart
    var ps_offerid="506142.1";
    //jet.com
    var jt_offerid="413201.1";

    //groupon
    var affiliateCountries='.groupon.com';
    var gpnWebSite=[{'id':209005, 'name':'http://phatwalletforums.com'}];
    var gpnAffiliateId='208001'; 
    var gpnBaseURL='https://partner.groupon.com';


    var amazon_enabled = true;
    var cj_enabled = true;
    var ebay_enabled = true;
    var ir_enabled = true;
    var ls_enabled = true;
    var gp_enabled = true;
    (function() {
        var getPageBasedImpressionUrl = function() {
                return '//' + trackingServerDomain + '/pageImpression';
            },
            collectDomains = function(content) {
                var collectedDomains = [];
                var anchors = $(".content a"); //content.getElementsByTagName("a");
                for (var i = 0; i < anchors.length; i++) {
                    var url = anchors[i].href;
                    collectedDomains.push(url.toLowerCase());
                }
                return collectedDomains;
            },
            collectImpressions = function(doc) {
                var imgs = doc.getElementsByTagName("img");
                var srcs = [];
                for (var i = 0; i < imgs.length; i++) {
                    var matches = imgs[i].src.match(/image-(\d+-\d+)/);
                    if (matches) {
                        srcs.push(imgs[i].src);
                    }
                }
                return srcs;
            },
            appendThirdPartyImpressions = function(thirdPartyImpressions) {
                var impressionSources = JSON.parse(thirdPartyImpressions);
                for (var i = 0; i < impressionSources.length; i++) {
                    var hiddenDiv = document.createElement("div");
                    var url = impressionSources[i] + '&cachebuster=' + i;
                    hiddenDiv.innerHTML = "<img style=\"display:none\" src=\"" + url + "\" />";
                    document.body.appendChild(hiddenDiv.firstChild);
                }
            },
            trackImpressions = function(doc) {
                var xhr = createCORSRequest('POST', getPageBasedImpressionUrl());
                if (xhr) {
                    xhr.send(JSON.stringify({
                        publisherId: publisherId,
                        websiteId: websiteId,
                        urls: collectDomains(doc),
                        impressions: collectImpressions(doc)
                    }));

                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4 && xhr.status == 200) {
                            var thirdPartyImpressions = xhr.responseText;
                            if (thirdPartyImpressions !== undefined && thirdPartyImpressions.length > 0) {
                                appendThirdPartyImpressions(thirdPartyImpressions);
                            }
                        }
                    };
                }
            },
            createCORSRequest = function(method, url) {
                var xhr = new XMLHttpRequest();

                if ("withCredentials" in xhr) {
                    xhr.open(method, url, true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.withCredentials = true;
                } else if (typeof XDomainRequest != "undefined") {
                    // IE <9 way of making CORS requests
                    xhr = new XDomainRequest();
                    xhr.open(method, url);
                } else {
                    xhr = null;
                }
                return xhr;
            };

        return trackImpressions(document);
    })();


    (function() {
        function log(consoleStr) {
            if (debug && window.console) {
                console.log(consoleStr);
            }
        }

        //IE 8 doesn't have indexOf
        if (!Array.prototype.indexOf) {
            log("shimming Array.indexOf ...");
            Array.prototype.indexOf = function(obj, start) {
                for (var i = (start || 0), j = this.length; i < j; i++) {
                    if (this[i] === obj) {
                        return i;
                    }
                }
                return -1;
            }
        }

        function checkIfEnabled() {
            if (typeof global_amazon_enabled !== 'undefined') {
                amazon_enabled = global_amazon_enabled;
            }
            if (typeof global_cj_enabled !== 'undefined') {
                cj_enabled = global_cj_enabled;
            }
            if (typeof global_ebay_enabled !== 'undefined') {
                ebay_enabled = global_ebay_enabled;
            }
            if (typeof global_ir_enabled !== 'undefined') {
                ir_enabled = global_ir_enabled;
            }
            if (typeof global_ls_enabled !== 'undefined') {
                ls_enabled = global_ls_enabled;
            }
            if (typeof global_gp_enabled !== 'undefined') {
                gp_enabled = global_gp_enabled;
            }
        }

        //dom ready with support for older browsers (IE8)
        //  if support no longer needed, just use
        //      document.addEventListener("DOMContentLoaded", handler, false)
        function bindReady(handler) {

            var called = false;

            function ready() {
                if (called)
                    return;
                called = true;
                handler()
            }

            if (document.addEventListener) {
                // native event
                log("using native addEventListener");
                document.addEventListener("DOMContentLoaded", ready, false)
            } else if (document.attachEvent) {
                // IE

                try {
                    var isFrame = window.frameElement != null
                } catch (e) {}

                // IE, the document is not inside a frame
                if (document.documentElement.doScroll && !isFrame) {
                    function tryScroll() {
                        if (called)
                            return;
                        try {
                            document.documentElement.doScroll("left");
                            log("using doScroll hack");
                            ready()
                        } catch (e) {
                            setTimeout(tryScroll, 10)
                        }
                    }

                    tryScroll()
                }

                // IE, the document is inside a frame
                document.attachEvent("onreadystatechange", function() {
                    if (document.readyState === "complete") {
                        log("using onreadystatechange");
                        ready()
                    }
                })
            }

            // Old browsers
            if (window.addEventListener) {
                log("using window addEventListener");
                window.addEventListener('load', ready, false)
            } else if (window.attachEvent) {
                log("using attachEvent onload");
                window.attachEvent('onload', ready)
            } else {
                var fn = window.onload;
                // very old browser, copy old onload
                window.onload = function() {
                    // replace by new onload and call the old one
                    log("using window.onload");
                    fn && fn();
                    ready()
                }
            }
        }

        //IE 8 doesn't have addEventListener
        function addEvent(element, event, func) {
            if (element.addEventListener) {
                element.addEventListener(event, func);
            } else if (element.attachEvent) {
                // IE DOM
                element.attachEvent("on" + event, func);
            }
        }

        function decodeEntities(encodedString) {
            var textArea = document.createElement('textarea');
            textArea.innerHTML = encodedString;
            return textArea.value;
        }
        function getDomainAndProtocol(url) {
            var matches = url.match(/^(https?)\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
            var protocol = matches && matches[1];
            var domain = matches && matches[2];
            return {
                domain: domain,
                protocol: protocol
            };
        }

        function matchesParentDomain(domain) {
            for (var i = 0; i < domains.length; i++) {
                var suffix = domains[i];
                if (domain.indexOf(suffix, domain.length - suffix.length) !== -1)
                    return true;
            }
            return false
        }

        function cleanUrl(rawUrl) {
            if (!rawUrl || typeof rawUrl !== 'string') {
                return '';
            }
            var url = rawUrl.trim();

            // Decode common escaped entities / encodings in quotes
            url = url.replace(/&quot;/gi, '"')
                     .replace(/&#34;/g, '"')
                     .replace(/&#39;/g, "'")
                     .replace(/&amp;/gi, '&');

            // Strip leading and trailing quotes, backslashes, percent-encoded quotes
            url = url.replace(/^(?:\\*["'`\s]|%5C%22|%22|%27)+|(?:\\*["'`\s]|%5C%22|%22|%27)+$/gi, '');

            // If browser turned an unquoted/malformed scheme into a relative URL on current domain:
            // e.g. https://phatwalletforums.com/topic/24452/.../\"https://goto.target.com/...
            // or /topic/24452/.../%5C%22https://goto.target.com/...
            var embeddedMatch = url.match(/(?:\/|%5C%22|%22|\\\"|\\|\")(https?:\/\/[^\s"'<>]+)$/i);
            if (embeddedMatch) {
                url = embeddedMatch[1];
            } else {
                var httpIdx = url.search(/https?:\/\//i);
                if (httpIdx > 0) {
                    var prefix = url.substring(0, httpIdx);
                    // Only unwrap if prefix does not look like query params (?u= or &url=)
                    if (prefix.indexOf('?') === -1 && prefix.indexOf('&') === -1) {
                        url = url.substring(httpIdx);
                    }
                }
            }

            // Strip any remaining quotes or backslashes
            url = url.replace(/^(?:\\*["'`\s]|%5C%22|%22|%27)+|(?:\\*["'`\s]|%5C%22|%22|%27)+$/gi, '');

            return url;
        }

        function autoMonetizeLink(element) {
            if (!element || element.nodeType !== 1) {
                return;
            }
            if (element.getAttribute('data-affiliate-monetized') === 'true') {
                return;
            }

            var start = new Date().getTime();
            var rawHref = element.getAttribute('href') || element.href || '';
            var url = cleanUrl(rawHref);
            if (!url && element.href) {
                url = cleanUrl(element.href);
            }

            if (!url || !/^https?:\/\//i.test(url)) {
                element.setAttribute('data-affiliate-monetized', 'true');
                return;
            }

            // If the raw href was corrupted (e.g. had stray quotes or was made relative by browser), fix the element immediately
            if (element.getAttribute('href') !== url) {
                element.href = url;
            }

            var domainAndProtocol = getDomainAndProtocol(url);
            if (!domainAndProtocol || !domainAndProtocol.domain) {
                element.setAttribute('data-affiliate-monetized', 'true');
                return;
            }

            var domainInLowerCase = domainAndProtocol.domain.toLowerCase();

            // Check if already an affiliate link from one of our networks
            if (domainInLowerCase.indexOf("goto.target.com") !== -1 ||
                domainInLowerCase.indexOf("adorama.evyy.net") !== -1 ||
                domainInLowerCase.indexOf("linksynergy.walmart.com") !== -1 ||
                domainInLowerCase.indexOf("rover.ebay.com") !== -1 ||
                domainInLowerCase.indexOf(trackingServerDomain) !== -1 ||
                domainInLowerCase.indexOf("click.linksynergy.com") !== -1 ||
                domainInLowerCase.indexOf("tracking.groupon.com") !== -1 ||
                domainInLowerCase.indexOf("partner.groupon.com") !== -1) {
                element.setAttribute('data-affiliate-monetized', 'true');
                return;
            }

            var hashIndex = url.indexOf('#');
            var frag = "";
            if (hashIndex > -1) {
                frag = url.substring(hashIndex + 1);
                url = url.substring(0, hashIndex);
            }

            if (cj_enabled && (domains.indexOf(domainInLowerCase) >= 0 || matchesParentDomain(domainInLowerCase))) {
                log("Domain found in list. Automonetizing...");
                var extraParams = "";
                if (sid) {
                    extraParams = "/sid/" + sid;
                }
                if (frag) {
                    extraParams = extraParams + "/fragment/" + encodeURIComponent(frag);
                }
                element.href = "https://" + trackingServerDomain + "/links/" + websiteId + "/type/am" + extraParams +
                    "/" + url;
                element.setAttribute('data-affiliate-monetized', 'true');
            } else if (amazon_enabled && /(?:^|\.)(?:amazon\.com|a\.co|amzn\.to|amzn\.com)$/i.test(domainInLowerCase)) {
                var u = new Url(url);
                log(u);
                u.protocol = 'https';
                u.query["tag"] = amazon_tag;
                element.href = u.toString();
                element.setAttribute('data-affiliate-monetized', 'true');
            } else if (ebay_enabled && domainInLowerCase.indexOf("ebay.com") !== -1 && domainInLowerCase.indexOf(
                "rover.ebay.com") == -1) {
                var u = new Url("https://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&toolid=11800");
                //pub=5575178708&campid=5338188580&mpre=");
                u.query["pub"] = epn_pub;
                u.query["campid"] = epn_campaign;
                u.query["mpre"] = url;
                element.href = u.toString();
                element.setAttribute('data-affiliate-monetized', 'true');
            } else if (ir_enabled && domainInLowerCase.indexOf("target.com") !== -1 && domainInLowerCase.indexOf(
                    "goto.target.com") == -1) {
                var u = new Url("https://goto.target.com/c/437216/81938/2092");
                u.query["u"] = url;
                log(url);
                element.href = u.toString();
                element.setAttribute('data-affiliate-monetized', 'true');
            } else if (ir_enabled && domainInLowerCase.indexOf("adorama.com") !== -1 && domainInLowerCase.indexOf(
                "adorama.evyy.net") == -1) {
                var u = new Url("https://adorama.evyy.net/c/437216/51926/1036");
                u.query["u"] = url;
                log(url);
                element.href = u.toString();
                element.setAttribute('data-affiliate-monetized', 'true');
            } else if (ls_enabled && domainInLowerCase.indexOf("walmart.com") !== -1 && domainInLowerCase.indexOf(
                "linksynergy.walmart.com") == -1 && domainInLowerCase.indexOf("click.linksynergy.com") == -1) {
                var u = new Url("https://linksynergy.walmart.com/fs-bin/click?subid=0&type=10&tmpid=1082");
                u.query["RD_PARM1"] = url;
                u.query["id"] = ls_id;
                u.query["offerid"] = wm_offerid;
                log(url);
                element.href = u.toString();
                element.setAttribute('data-affiliate-monetized', 'true');
            } else if (ls_enabled && domainInLowerCase.indexOf("jackrabbit.com") !== -1 && domainInLowerCase.indexOf("click.linksynergy.com") == -1) {
                var u = new Url("https://click.linksynergy.com/deeplink?id=" + encodeURIComponent(ls_id));
                u.query["murl"] = url;
                u.query["mid"] = 40451;
                log(url);
                element.href = u.toString();
                element.setAttribute('data-affiliate-monetized', 'true');
            } else if (ls_enabled && domainInLowerCase.indexOf("bestbuy.com") !== -1 && domainInLowerCase.indexOf("click.linksynergy.com") == -1) {
                var u = new Url("https://click.linksynergy.com/fs-bin/click?subid=0&type=10&tmpid=13127");
                u.query["RD_PARM1"] = url;
                u.query["id"] = ls_id;
                u.query["offerid"] = bb_offerid;
                log(url);
                element.href = u.toString();
                element.setAttribute('data-affiliate-monetized', 'true');
            } else if (ls_enabled && domainInLowerCase.indexOf("samsclub.com") !== -1 && domainInLowerCase.indexOf("click.linksynergy.com") == -1) {
                var u = new Url("https://click.linksynergy.com/fs-bin/click?subid=0&type=10&tmpid=13344");
                u.query["RD_PARM1"] = url;
                u.query["id"] = ls_id;
                u.query["offerid"] = sc_offerid;
                log(url);
                element.href = u.toString();
                element.setAttribute('data-affiliate-monetized', 'true');
            } else if (ls_enabled && domainInLowerCase.indexOf("petsmart.com") !== -1 && domainInLowerCase.indexOf("click.linksynergy.com") == -1) {
                var u = new Url("https://click.linksynergy.com/fs-bin/click?subid=0&type=10&tmpid=5690");
                u.query["RD_PARM1"] = url;
                u.query["id"] = ls_id;
                u.query["offerid"] = ps_offerid;
                log(url);
                element.href = u.toString();
                element.setAttribute('data-affiliate-monetized', 'true');
            } else if (ls_enabled && domainInLowerCase.indexOf("jet.com") !== -1 && domainInLowerCase.indexOf("click.linksynergy.com") == -1) {
                var u = new Url("https://click.linksynergy.com/fs-bin/click?subid=0&type=10&tmpid=20265");
                u.query["RD_PARM1"] = url;
                u.query["id"] = ls_id;
                u.query["offerid"] = jt_offerid;
                log(url);
                element.href = u.toString();
                element.setAttribute('data-affiliate-monetized', 'true');
            } else if (gp_enabled && domainInLowerCase.indexOf("groupon.com") !== -1 && domainInLowerCase.indexOf(
            "tracking.groupon.com") == -1 && domainInLowerCase.indexOf("partner.groupon.com") == -1) {  
                $.ajax({
                    type: "GET",
                    url:  gpnBaseURL+"/bookmarklet/v1/create/campaign",
                    data: {affiliateId : gpnAffiliateId, dealUrl : url },
                    dataType: "jsonp",
                    jsonpCallback : "jsonpCallback",
                    contentType : "application/json",
                    success: function(data) {
                        if (data && data.errors && data.errors.length != 0) {
                            log("Unable to generate partner link for this deal");
                        } else if (data && data.sniplet) {
                            var u = $($.parseHTML(decodeEntities(data.sniplet))).filter("a").attr("href");
                            if (u) {
                                log(u);
                                element.href = u;
                                element.setAttribute('data-affiliate-monetized', 'true');
                            }
                        }
                    },
                    error: function() {
                      console.log("Unable to generate partner link for this deal");
                    },
                    complete : function() {
                      element.setAttribute('data-affiliate-monetized', 'true');
                      console.log("done");
                    }
                  });
            } else {
                element.setAttribute('data-affiliate-monetized', 'true');
                log("Domain not found in list. ");
            }

            log("total time: " + (new Date().getTime() - start));
        }

        function createClickHandlerFor(element) {
            return function() {
                autoMonetizeLink(element)
            };
        }

        function autoMonetizeLinks() {
            log("auto monetizing links");

            var anchors = $(".content a"); //document.getElementsByTagName("a");
            log("found " + anchors.length + " a tags.");
            for (var i = 0; i < anchors.length; i++) {
                var anchor = anchors[i];
                if (generateLinkOnLoad)
                    autoMonetizeLink(anchor);
                else
                    addEvent(anchor, "click", createClickHandlerFor(anchor));
            }
        }
        $(window).on('action:ajaxify.end', function() {
            log("cj ajaxify.end");
            checkIfEnabled();
            autoMonetizeLinks();
        });

        /*if (document.readyState === "complete") {
            log("readState is complete");
            autoMonetizeLinks();
        } else {
            log("DOMContentLoaded is registered");
            bindReady(autoMonetizeLinks)
        }*/
    })();
})()