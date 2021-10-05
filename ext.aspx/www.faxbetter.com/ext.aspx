
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#" xmlns:fb="http://www.facebook.com/2008/fbml">
<head id="Head1"><title>
	FaxBetter :: Send & Receive Faxes Online for Free
</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>	
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" />
	<script async src="//www.googletagservices.com/tag/js/gpt.js"></script>
	<script async src="prebid2.11.0.js"></script>
    <script type='text/javascript'>
        var extensionId = "monhibmpaiooeijgnpcoondnmjlhchgd";
        var adDiv = "div-gpt-ad-1556022443537-0";
        var gptAdCode = "/21663527194/inbox_header";
        var appNexusId = "0";
        
        var PREBID_TIMEOUT = 1000;
        var bidFloor = 0.10;

        var adUnits = [{
            code: adDiv,
            //sizes: [[970, 90],[728, 90],[300, 100]],
            //sizes: [[728, 90]],
			mediaTypes: {
				banner: {
					sizes: [[728, 90]]
				}
			},
            bids: [{
                    bidder: 'appnexus',
                    params: {
                        placementId: appNexusId
                    }
                }
                ]
        }];

        var pbjs = pbjs || {};
        pbjs.que = pbjs.que || [];

        

        var priceBuckets = {
            "buckets": [{
                    "min": 0,
                    "max": 5,
                    "increment": 0.10
                },
                {
                    "min": 5,
                    "max": 50,
                    "increment": 1.00
                }]
        };


        pbjs.que.push(function () {
            pbjs.setConfig({ priceGranularity: priceBuckets });
        });

        pbjs.bidderSettings = {
            standard: {
                bidCpmAdjustment: function (bidCpm) {
                    return bidCpm > bidFloor ? bidCpm : 0;
                }
            }
        };
    </script>
        <!-- Prebid Config Section END -->
        
        <!-- Prebid Boilerplate Section START. No Need to Edit. -->
        <script type='text/javascript'>
            var googletag = googletag || {};
            googletag.cmd = googletag.cmd || [];
            googletag.cmd.push(function () {
                googletag.pubads().disableInitialLoad();
            });

            function getBids() {
                pbjs.que.push(function () {
                    pbjs.addAdUnits(adUnits);
                    pbjs.requestBids({
                        bidsBackHandler: sendAdserverRequest
                    });
                });

                function sendAdserverRequest() {
                    if (pbjs.adserverRequestSent) return;
                    pbjs.adserverRequestSent = true;
                    googletag.cmd.push(function () {
                        pbjs.que.push(function () {
                            //var targetingParams = pbjs.getAdserverTargeting();
                            var bidList = pbjs.getBidResponsesForAdUnitCode(adDiv).bids;
                            if ($.grep(bidList, function (n) { return (n.cpm > 0); }).length > 0) {
                                pbjs.setTargetingForGPTAsync();
                                googletag.pubads().refresh();
                                var topBid = pbjs.getHighestCpmBids(adDiv)[0];
                                //chrome.runtime.sendMessage(extensionId, { message: "adpageload", bid: pbjs.getHighestCpmBids(adDiv)[0] }, function (reply) { });
                                window.parent.postMessage({ evt: "pdext-adpageload", data: { bid: { bidder: topBid.bidder, cpm: topBid.cpm, size: topBid.size, adserverTargeting: { hb_pb: topBid.adserverTargeting.hb_pb } } } }, "*");
                                //window.parent.postMessage({ evt: "pdext-adpageload", data: { bid: topBid } }, "*");
                                //window.parent.postMessage({ evt: "pdext-adpageload", data: { bid: { bidder: "perfectdelivery", cpm: 0, size:"728x90", adserverTargeting: { hb_pb: 0 } } } }, "*");
                                //window.parent.dispatchEvent(new CustomEvent("pdext-adpageload", { detail: { bid: pbjs.getHighestCpmBids(adDiv)[0] }}));
                            } else { 
								
                                window.parent.postMessage({ evt: "pdext-adpagenone" }, "*");
								
                                //insertNativeAd("pd1");
                            }
                            //console.log(JSON.stringify(bidList));
                        });
                    });

                }

                googletag.cmd.push(function () { googletag.display(adDiv); });

                setTimeout(function () {
                    sendAdserverRequest();
                }, PREBID_TIMEOUT);
            }
        </script>
        <!-- Prebid Boilerplate Section END -->

        

    <script type='text/javascript'>
        googletag.cmd.push(function () {
            googletag.defineSlot(gptAdCode, [[728, 90]], adDiv).addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
        });
    </script>
	<script>
        
        function messageReceived(evt) {
            if (evt.data.message === "setup") {
                
                if (evt.data.nativeAdCode != null) {
                    insertNativeAd(evt.data.nativeAdCode);
                } else {
                    getBids();
                }
            }
        }
		
        function insertNativeAd(nativeAdCode) {
            $("#pd-ad").css("display", "inherit");
            var pdiframe = $("<iframe id=\"pd-iframe\" frameborder=\"0\" scrolling=\"no\" allowfullscreen=\"\"></iframe>");
            pdiframe.on("load", function() {
                showNativeAd(nativeAdCode);
            });
            if (nativeAdCode == "pd1")
                $("#stripe-right,#stripe-right-inner").addClass("pd");
            pdiframe[0].src = "https://portal.perfect.delivery/display/" + nativeAdCode;
            $("#pd-ad").append(pdiframe);
        }
		
        function showNativeAd(nativeAdCode) {
            $("#" + adDiv).hide();
            $("#pd-ad").show();
            //chrome.runtime.sendMessage(extensionId, { message: "adpageload", bid: { bidder: "perfectdelivery", cpm: 0, size:"728x90", adserverTargeting: { hb_pb: 0 } } }, function (reply) { });
            window.parent.postMessage({ evt: "pdext-adpageload", data: { bid: { bidder: "perfectdelivery", bidderadcode: nativeAdCode, cpm: 0, size:"728x90", adserverTargeting: { hb_pb: 0 } } } }, "*");
            //window.parent.dispatchEvent(new CustomEvent("pdext-adpageload", { detail: { bid: pbjs.getHighestCpmBids(adDiv)[0] }}));
        }
		
        window.addEventListener("message", messageReceived, false);
        $(document).on("click", "#closeButton", function (evt) {
            //chrome.runtime.sendMessage(extensionId, { message: "adclose" }, function (reply) { });
            window.parent.postMessage({ evt: "pdext-adclose" }, "*");
            //window.parent.dispatchEvent(new CustomEvent("pdext-adclose"));
        });
		
        var googleIframeId = "google_ads_iframe_" + gptAdCode + "_0";
        var clicklistener = setInterval(function () {
            var elem = document.activeElement;
            if (elem && elem.tagName === "IFRAME" && (elem.id === googleIframeId || elem.id === "pd-iframe")) {
                clearInterval(clicklistener);
                recordClick();
            }
        }, 100);
		
        //$(document).on("click", "#pd-ad", recordClick);
		
        function recordClick() {
            //chrome.runtime.sendMessage(extensionId, { message: "adclick" }, function (reply) { });
            window.parent.postMessage({ evt: "pdext-adclick" }, "*");
            //window.parent.dispatchEvent(new CustomEvent("pdext-adclick"));
        }

        var mouseInit = false;
        function logMouseMovement(event){
            //event = event || { clientX: -1, clientY: -1, target: { id: "" } };
            var data = {
                x: event.clientX,
                y: event.clientY,
                targetid: $(event.target).closest("[id]").length > 0 ? $(event.target).closest("[id]")[0].id : ""
            };
            window.parent.postMessage({ evt: "pdext-mousemove", pos: data }, "*");
            //window.parent.dispatchEvent(new CustomEvent("pdext-mousemove", { detail: data }));
            mouseInit = true;
        }
		
        $(document).mousemove(logMouseMovement);
        $(document).on("contextmenu", "body", function(){ return false; }); 
        $(document).on("mousedown", "body", function(event) {
            if (event.which !== 1) {
                window.parent.postMessage({ evt: "pdext-rightclick" }, "*");
                //window.parent.dispatchEvent(new CustomEvent("pdext-rightclick"));
                event.preventDefault();
            } else {
                if (!mouseInit) logMouseMovement(event);
            }
        });	
        $(document).on("mouseenter", "#" + adDiv + ",#pd-ad", function(){ 
            var data = { x: 5, y: 5, targetid: "ad" };
            window.parent.postMessage({ evt: "pdext-mousemove", pos: data }, "*");
            //window.parent.dispatchEvent(new CustomEvent("pdext-mousemove"));
        }); 	
    </script>
<style type="text/css">
        body {
            font-size: 13px;
            line-height: 19px;
            color: #000000;
            font-family: Arial,sans-serif;
            padding: 0;
            margin: 0;
            overflow-y: hidden;
        }
		a {
            color: #000000;
        }
        #stripe {
            min-width: 750px;
            background: transparent;
            overflow: hidden;
            font-size: 14px;
        }
        #stripe-content {
            margin:0 auto;
			padding-left: 161px;
			width:895px;
        }
		#stripe-icon {
			margin: 10px 25px 0 0;			
		}
		#stripe-icon {
			float: left;
		}
		#stripe-icon-img {
			margin-bottom:10px;
			width: 21px;
			height: 21px;
			margin: auto;
			/*background: rgba(204,204,204,0.6);
			border-radius: 5px;
			-moz-border-radius: 5px;
			-webkit-border-radius: 5px;*/
			overflow: hidden;
		}
		#stripe-icon-img:hover {
			width: 140px;
		}
		#stripe-icon-img > img {
			margin-top: 1px;
		}
		#icon-info {
			font-size:9px;
			padding: 2px 5px 0 0;
			float: right;
		}
        .stripe-close {
            margin: 2px 5px 0;
            cursor: pointer;
        }
		#stripe-right {
			float:left;
		}
		#pd-ad {
			display: none;
			text-align:center;
			float:left;
		}
		#pd-ad > iframe {
			border: 0px; 
			overflow: hidden; 
			padding: 0px;
			width: 728px;
			height: 108px;
		}
		#stripe-spacer {
			display:none;
		}
        
		#stripe-content {
			padding-left: 0;
		}
		#stripe {
			min-height: 100px;
		}
		#stripe-icon {
			margin: 10px 5px 5px 0;	
		}
		#stripe-icon-img {
			height: 23px;
			line-height: .85em;
		}
		#stripe-icon-img:hover {
			width: 95px;
		}
		#stripe-icon-img > img {
			margin: 1px 0 0 3px;
		}
		#icon-info {
			padding: 2px 0 0 5px;
		}
		@-moz-document url-prefix() {
			#icon-info {
				padding: 0px 0 0 3px;
			}
		}
		.stripe-close {
			margin: 5px 7px 0;
		}
		#stripe-right {
			border: 1px solid rgba(0, 0, 0, 0.3);
			border-radius: 0 5px 5px 0;
			background: rgba(245,245,245,0.9);
			/*border: 1px solid rgba(0, 0, 0, 0.5);
			border-radius: 0 5px 5px 0;
			background: rgba(245,245,245,0.9);
			margin-left: -1px;
			border-left: 1px solid rgba(0, 0, 0, 0.1);*/
		}
		#div-gpt-ad-1556022443537-0, #pd-ad {
			box-shadow: rgba(0, 0, 0, 0.498) 0px 1px 2px;
			border-top: 1px solid rgba(0, 0, 0, 0.1);
			border-left: 1px solid rgba(0, 0, 0, 0.1);
		}	
		#stripe-spacer {
			display:auto;
			width: 100px;
		}
		#stripe-right.pd {
			border: none !important;
			background: url("https://portal.perfect.delivery/images/728x90ad_dk_bg.png") !important;
			color: white;
			margin-top: 1px;
			margin-left: -1px;
		}
		#stripe-right-inner.pd {
			background-color: rgba(0, 0, 0, 0.2);
			height: 57px;
			border-radius: 0 5px 5px 0;
		}
		#stripe-right.pd a {
			color: white;
		}
		
    </style>
</head>
<body>
	<div id="stripe">
		<div id="stripe-content">
			<div id="div-gpt-ad-1556022443537-0" style="text-align:center;float:left;">
				<script type='text/javascript'>
                    googletag.cmd.push(function () { googletag.display(adDiv); });
                </script>
			</div>
			<div id="pd-ad">
			</div>
			<div id="stripe-right">
				<div id="stripe-right-inner">
					<div id="stripe-controls">
						<div id="stripe-control">
							<i id="closeButton" class="stripe-close fa fa-times"></i>
						</div>
					</div>
					
					<div id="stripe-icon" class="stripe-icon-nohover">
						<div id="stripe-icon-img">
							<img src="images/fbicon19.png">
							<div id="icon-info">
								Ad by FaxBetter<br/><a href="https://support.faxbetter.com/kb/section/25/" target="_blank">More Info</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="stripe-spacer">
			</div>
		</div>
	</div>


</body>
</html>