/*20240528*/ ! function(e, n) {
	if ("object" == typeof module && "object" == typeof module.exports) module.exports = n(e);
	else {
		var t = n(e),
			i = e.jsBridge;
		if ("object" == typeof i)
			for (var o in i) {
				var r = i[o];
				t[o] || "function" != typeof r || (t[o] = function() {
					r.apply(i, arguments)
				})
			}
		e.jsBridge = t
	}
}("object" == typeof window ? window : this, function(e) {
	var n = !1,
		t = {
			isReady: function() {
				return !!e.WebViewJavascriptBridge
			},
			ready: function(e) {
				p(e)
			},
			audioPlayer: {
				play: function(e, n) {
					c("10.play", "object" == typeof e ? e : {}, "function" == typeof e ? e : n)
				},
				pause: function(e) {
					c("10.pause", {}, e)
				},
				resume: function(e) {
					c("10.resume", {}, e)
				},
				stop: function(e) {
					c("10.stop", {}, e)
				},
				add: function(e, n) {
					c("10.add", e, n)
				},
				list: function(e) {
					c("10.list", {}, e)
				},
				remove: function(e, n) {
					c("10.remove", e, n)
				},
				clear: function(e) {
					c("10.clear", {}, e)
				},
				setListener: function(e) {
					o("10.setListener", {}, function(n, t) {
						if (e && t) {
							var i = JSON.parse(t);
							e(i.event, i.data)
						}
					})
				},
				removeListener: function(e) {
					o("10.removeListener")
				}
			},
			umanalytics: {
				getDeviceInfo: function(e) {
					u("8.getDeviceInfo", {}, e)
				},
				onEvent: function(e, n) {
					c("8.onEvent", e, n)
				}
			},
			txVideo: {
				play: function(e) {
					o("7.play", "string" == typeof e ? {
						url: e
					} : e)
				},
				playList: function(e) {
					o("7.playList", e)
				},
				addPlayer: function(e, n) {
					e.e = "function" == typeof e.onEvent, o("7.addPlayer", e, function(t, i) {
						if (/^\d+$/.test(i)) n && n(parseInt(i));
						else if (e.e) {
							var o = JSON.parse(i);
							e.onEvent(o.p, o.e, o.d ? o.d : null)
						}
					})
				},
				removePlayer: function(e) {
					o("7.removePlayer", {
						p: e
					})
				}
			},
			network: {
				wifiInfo: function(e) {
					c("6.wifiInfo", {}, e)
				},
				active: function(e) {
					c("6.active", {}, e)
				},
				setConnectionListener: function(e) {
					u("6.scl", {}, e)
				}
			},
			ble: {
				getState: function(e) {
					a("5.getState", {}, e)
				},
				requestPermission: function(e) {
					s("5.requestPermission", {}, e)
				},
				requestEnable: function(e) {
					s("5.requestEnable", {}, e)
				},
				getBondedDevices: function(e) {
					u("5.getBondedDevices", {}, e)
				},
				getName: function(e) {
					r("5.getName", {}, e)
				},
				getPeripheral: function(e) {
					u("5.getPeripheral", {}, e)
				},
				isScanning: function(e) {
					s("5.isScanning", {}, e)
				},
				isConnected: function(e, n) {
					s("5.isConnected", e, n)
				},
				scan: function(e) {
					c("5.scan", {}, e)
				},
				stopScan: function(e) {
					s("5.stopScan", {}, e)
				},
				connect: function(e, n) {
					o("5.connect", e, n)
				},
				disconnect: function(e, n) {
					o("5.disconnect", e, n)
				},
				requestMtu: function(e, n) {
					c("5.requestMtu", e, n)
				},
				discoverServices: function(e, n) {
					c("5.discoverServices", e, n)
				},
				discoverCharacteristics: function(e, n) {
					c("5.discoverCharacteristics", e, n)
				},
				discoverDescriptors: function(e, n) {
					c("5.discoverDescriptors", e, n)
				},
				setNotify: function(e, n) {
					c("5.setNotify", e, n)
				},
				read: function(e, n) {
					c("5.read", e, n)
				},
				write: function(e, n) {
					c("5.write", e, n)
				}
			},
			fs: {
				exist: function(e, n) {
					o("3.exist", {
						s: e
					}, n)
				},
				mkdir: function(e, n) {
					o("3.mkdir", {
						s: e
					}, n)
				},
				list: function(e, n) {
					c("3.list", {
						s: e
					}, n)
				},
				size: function(e, n) {
					o("3.size", {
						s: e
					}, function(e, t) {
						"function" == typeof n && n(e, e ? parseInt(t) : t)
					})
				},
				delete: function(e, n) {
					o("3.delete", {
						s: e
					}, n)
				},
				copy: function(e, n, t) {
					o("3.copy", {
						s: e,
						d: n
					}, t)
				},
				writeText: function(e, n, t) {
					o("3.writeText", {
						s: e,
						a: n
					}, t)
				},
				appendText: function(e, n, t) {
					o("3.appendText", {
						s: e,
						a: n
					}, t)
				},
				readText: function(e, n) {
					o("3.readText", {
						s: e
					}, n)
				},
				writeBinary: function(e, n, t) {
					o("3.writeBinary", {
						s: e,
						a: n
					}, t)
				},
				appendBinary: function(e, n, t) {
					o("3.appendBinary", {
						s: e,
						a: n
					}, t)
				},
				readBinary: function(e, n) {
					o("3.readBinary", {
						s: e
					}, n)
				},
				toUri: function(e, n) {
					o("3.toUri", {
						s: e
					}, n)
				},
				toAbsolute: function(e, n) {
					o("3.toAbsolute", {
						s: e
					}, n)
				},
				share: function(e, n) {
					o("3.share", {
						s: e
					}, n)
				},
				open: function(e, n) {
					o("3.open", {
						s: e
					}, n)
				},
				unzip: function(e, n, t) {
					var i = {
						s: e,
						d: n
					};
					"object" == typeof e && (i.s = e.src, i.d = e.dst, i.pwd = e.pwd, t = n), o("3.unzip", i, t)
				},
				md5: function(e, n) {
					o("3.md5", {
						s: e
					}, n)
				},
				sha1: function(e, n) {
					o("3.sha1", {
						s: e
					}, n)
				},
				sha256: function(e, n) {
					o("3.sha256", {
						s: e
					}, n)
				},
				download: function(e, n) {
					r("3.download", e, function(t) {
						var i = JSON.parse(t);
						0 == i.a ? "function" == typeof e.progress && e.progress(i.t, i.d) :
							"function" == typeof n && n(1 == i.a, i.m)
					})
				}
			},
			rc: {
				init: function(e, n) {
					s("s.init", e, n)
				},
				setUserInfoListener: function(e) {
					r("s.setUserInfoListener", {}, e)
				},
				setUserInfo: function(e) {
					o("s.setUserInfo", e, null)
				},
				connect: function(e, n) {
					o("s.connect", e, n)
				},
				disconnect: function(e) {
					s("s.disconnect", {}, e)
				},
				logout: function(e) {
					s("s.logout", {}, e)
				}
			},
			rcIM: {
				startConversationList: function(e, n) {
					s("q.startConversationList", e, n)
				},
				startConversation: function(e, n) {
					s("q.startConversation", e, n)
				},
				startSubConversationList: function(e, n) {
					s("q.startSubConversationList", e, n)
				},
				unreadMessageCount: function(e) {
					a("q.unreadMessageCount", {}, e)
				}
			},
			rcCall: {
				startSingleCall: function(e, n) {
					s("r.startSingleCall", e, n)
				},
				startMultiCall: function(e, n) {
					s("r.startMultiCall", e, n)
				}
			},
			video: {
				play: function(e) {
					o("x.play", "string" == typeof e ? {
						url: e
					} : e)
				},
				addPlayer: function(e, n) {
					e.e = "function" == typeof e.onEvent, o("x.addPlayer", e, function(t, i) {
						if (/^\d+$/.test(i)) n && n(parseInt(i));
						else if (e.e) {
							var o = JSON.parse(i);
							e.onEvent(o.p, o.e, o.d ? o.d : null)
						}
					})
				},
				removePlayer: function(e) {
					o("x.removePlayer", {
						p: e
					})
				},
				resource: function(e) {
					o("x.resource", e)
				},
				start: function(e) {
					o("x.start", {
						p: e
					})
				},
				pause: function(e) {
					o("x.pause", {
						p: e
					})
				},
				stop: function(e) {
					o("x.stop", {
						p: e
					})
				},
				fullScreen: function(e) {
					o("x.fullScreen", {
						p: e
					})
				}
			},
			displays: {
				getDisplays: function(e) {
					u("z.getDisplays", {}, e)
				},
				show: function(e, n) {
					s("z.show", e, n)
				},
				dismiss: function(e) {
					o("z.dismiss", {
						x: e
					})
				}
			},
			iap: {
				canMakePayments: function(e) {
					s("i.canMakePayments", {}, e)
				},
				getProducts: function(e, n) {
					c("i.getProducts", e, n)
				},
				setTransanctionListener: function(e) {
					c("i.setTransanctionListener", {}, e)
				},
				getUnfinishedTransactions: function() {
					c("i.getUnfinishedTransactions", {})
				},
				purchase: function(e) {
					c("i.purchase", e)
				},
				restoreTransactions: function(e) {
					c("i.restoreTransactions", e)
				},
				finishTransaction: function(e) {
					o("i.finishTransaction", e)
				},
				setDownloadListener: function(e) {
					c("i.setDownloadListener", {}, e)
				},
				startDownloads: function(e) {
					c("i.startDownloads", e)
				},
				pauseDownloads: function(e) {
					o("i.pauseDownloads", e)
				},
				resumeDownloads: function(e) {
					o("i.resumeDownloads", e)
				},
				cancelDownloads: function(e) {
					o("i.cancelDownloads", e)
				}
			},
			doc: {
				canOpen: function(e, n) {
					s("c.canOpen", {
						url: e
					}, n)
				},
				open: function(e) {
					o("c.open", e)
				}
			},
			bc: {
				login: function(e) {
					o("b.login", {}, e)
				},
				logout: function(e) {
					o("b.logout", {}, e)
				},
				setShouldUseAlipay: function(e) {
					o("b.setShouldUseAlipay", {
						b: e
					})
				},
				setSyncForTaoke: function(e) {
					o("b.setSyncForTaoke", {
						b: e
					})
				},
				setForceH5: function(e) {
					o("b.setForceH5", {
						b: e
					})
				},
				setTaokeParams: function(e) {
					o("b.setTaokeParams", e)
				},
				setChannel: function(e) {
					o("b.setChannel", e)
				},
				setISVCode: function(e) {
					o("b.setISVCode", {
						s: e
					})
				},
				setISVVersion: function(e) {
					o("b.setISVVersion", {
						s: e
					})
				},
				detail: function(e, n) {
					o("b.detail", e, n)
				},
				shop: function(e, n) {
					o("b.shop", e, n)
				},
				url: function(e, n) {
					o("b.url", e, n)
				},
				addCart: function(e, n) {
					o("b.addCart", e, n)
				},
				cart: function(e, n) {
					o("b.cart", e, n)
				},
				order: function(e, n) {
					o("b.order", e, n)
				}
			},
			getui: {
				setListener: function(e) {
					u("g.setListener", {}, e)
				},
				turnOffPush: function() {
					o("g.turnOffPush")
				},
				turnOnPush: function() {
					o("g.turnOnPush")
				},
				setBadge: function(e, n) {
					s("g.setBadge", e, n)
				},
				isPushTurnedOn: function(e) {
					s("g.isPushTurnedOn", {}, e)
				},
				getClientid: function(e) {
					r("g.getClientid", {}, e)
				},
				bindAlias: function(e, n) {
					s("g.bindAlias", {
						alias: e
					}, n)
				},
				unBindAlias: function(e, n) {
					s("g.unBindAlias", e, n)
				},
				setTag: function(e, n) {
					s("g.setTag", {
						tags: e
					}, n)
				},
				setSilentTime: function(e, n) {
					s("g.setSilentTime", e, n)
				}
			},
			jiguang: {
				setListener: function(e) {
					u("j.setListener", {}, e)
				},
				stopPush: function() {
					o("j.stopPush")
				},
				resumePush: function() {
					o("j.resumePush")
				},
				isPushStopped: function(e) {
					s("j.isPushStopped", {}, e)
				},
				getRegistrationID: function(e) {
					r("j.getRegistrationID", {}, e)
				},
				setAlias: function(e, n) {
					r("j.setAlias", {
						alias: e
					}, n)
				},
				deleteAlias: function(e) {
					r("j.deleteAlias", {}, e)
				},
				getAlias: function(e) {
					r("j.getAlias", {}, e)
				},
				setBadge: function(e) {
					o("j.setBadge", {
						b: e
					})
				},
				setTags: function(e, n) {
					u("j.setTags", {
						tags: e
					}, n)
				},
				addTags: function(e, n) {
					u("j.addTags", {
						tags: e
					}, n)
				},
				deleteTags: function(e, n) {
					u("j.deleteTags", {
						tags: e
					}, n)
				},
				cleanTags: function(e) {
					u("j.cleanTags", {}, e)
				},
				getAllTags: function(e) {
					u("j.getAllTags", {}, e)
				}
			},
			notification: {
				getBadge: function(e) {
					r("n.getBadge", {}, function(n) {
						e && e(parseInt(n))
					})
				},
				setBadge: function(e) {
					o("n.setBadge", {
						badge: e
					})
				},
				requestAuth: function(e) {
					s("n.requestAuth", {}, e)
				},
				notify: function(e, n) {
					c("n.notify", e, n)
				},
				cancelAll: function() {
					o("n.cancelAll")
				}
			},
			x5: {
				videoCacheSize: function(e) {
					t.ios ? e && e(0) : o("x5.videoCacheSize", {}, function(n, t) {
						e && e(n && t ? parseInt(t) : 0)
					})
				},
				clearVideoCache: function(e) {
					t.ios ? e && e() : r("x5.clearVideoCache", {}, e)
				},
				playVideo: function(e, n) {
					t.ios ? n && n(!1) : s("x5.playVideo", {
						url: e
					}, n)
				},
				getEnabledState: function(e) {
					t.ios ? e && e(-1) : a("x5.getEnabledState", {}, e)
				},
				setEnabledState: function(e, n) {
					t.ios ? n && n(!1) : s("x5.setEnabledState", {
						s: e
					}, n)
				}
			},
			weibo: {
				login: function(e) {
					o("w.login", {}, function(n, t) {
						var i = t ? JSON.parse(t) : null;
						if ("function" == typeof e) e(n, i);
						else if (n && "string" == typeof e) {
							var o = e + (e.indexOf("?") >= 0 ? "&" : "?") + "uid=" + encodeURIComponent(
									i.uid) + "&expiresTime=" + encodeURIComponent(i.expiresTime) +
								"&phoneNum=" + encodeURIComponent(i.phoneNum) + "&refreshToken=" +
								encodeURIComponent(i.refreshToken) + "&token=" + encodeURIComponent(i
									.token);
							location.href = o
						}
					})
				},
				installed: function(e) {
					s("w.installed", {}, e)
				},
				shareText: function(e, n) {
					i(e, n)
				},
				shareImage: function(e, n) {
					i(e, n, "i")
				},
				shareVideo: function(e, n) {
					i(e, n, "v")
				},
				shareWebPage: function(e, n) {
					i(e, n, "w")
				},
				shareImages: function(e, n) {
					i(e, n, "j")
				},
				shareStory: function(e, n) {
					i(e, n, "s")
				}
			},
			accelerometer: {
				support: function(e) {
					s("sa.support", {}, e)
				},
				start: function(e) {
					o("sa.start", {}, e ? function(n, t) {
						if (n && t) {
							var i = JSON.parse(t);
							e(i[0], i[1], i[2])
						}
					} : null)
				},
				stop: function(e) {
					o("sa.stop")
				}
			},
			gyroscope: {
				support: function(e) {
					s("sg.support", {}, e)
				},
				start: function(e) {
					o("sg.start", {}, e ? function(n, t) {
						if (n && t) {
							var i = JSON.parse(t);
							e(i[0], i[1], i[2])
						}
					} : null)
				},
				stop: function(e) {
					o("sg.stop")
				}
			},
			checkCamera: function(e) {
				t.ios ? e && e({
					count: 2,
					front: !0,
					back: !0
				}) : u("checkCamera", {}, e)
			},
			appDownloads: function() {
				t.ios || o("appDownloads")
			},
			openSetting: function(e) {
				o("openSetting", {
					w: e
				})
			},
			getSettingState: function(e, n) {
				s("getSettingState", {
					w: e
				}, n)
			},
			getIMEI: function(e) {
				t.ios ? e && e("unknown") : r("1.imei", {}, e)
			},
			getOAID: function(e) {
				t.ios ? e && e("unknown") : r("1.oaid", {}, e)
			},
			getIDFA: function(e) {
				t.ios ? r("1.idfa", {}, e) : e && e("unknown")
			},
			requestPermissions: function(e, n) {
				u("requestPermissions", {
					p: e
				}, n)
			},
			action: function(e) {
				o("action", e ? {
					btns: e
				} : {}, null)
			},
			uiNavigation: function(e) {
				o("uiNavigation", {
					b: e
				})
			},
			uiShare: function(e) {
				o("uiShare", {
					b: e
				})
			},
			uiActions: function(e) {
				o("uiActions", {
					b: e
				})
			},
			uiRefresh: function(e) {
				o("uiRefresh", {
					b: e
				})
			},
			saveImageToAlbum: function(e, n) {
				s("saveImageToAlbum", {
					i: e
				}, n)
			},
			saveImagesToAlbum: function(e, n) {
				s("saveImagesToAlbum", {
					i: e
				}, n)
			},
			saveVideoToAlbum: function(e, n) {
				s("saveVideoToAlbum", {
					i: e
				}, n)
			},
			backToHome: function(e) {
				o("backToHome", {
					loadHomePage: !!e
				})
			},
			setClipboardText: function(e) {
				o("setClipboardText", {
					text: e
				})
			},
			debug: function() {
				o("debug", {}), n = !0
			},
			qqLogin: function(e) {
				e ? o("qqLogin", {}, function(n, t) {
					if ("function" == typeof e) e(n, t ? JSON.parse(t) : null);
					else if (n && "string" == typeof e) {
						var i = JSON.parse(t),
							o = e + (e.indexOf("?") >= 0 ? "&" : "?") + "openid=" + encodeURIComponent(i
								.openid) + "&access_token=" + encodeURIComponent(i.access_token);
						i.userinfo && (o += "&userinfo=" + JSON.stringify(i.userinfo)), location.href =
							o
					}
				}) : alert("Missing Parameter")
			},
			wxLogin: function(e) {
				e ? o("wxLogin", {}, function(n, t) {
					if ("function" == typeof e) e(n, t ? JSON.parse(t) : null);
					else if (n && "string" == typeof e) {
						var i = JSON.parse(t),
							o = e + (e.indexOf("?") >= 0 ? "&" : "?") + "code=" + encodeURIComponent(i
								.code);
						i.openid && (o += "&openid=" + encodeURIComponent(i.openid)), i.access_token &&
							(o += "&access_token=" + encodeURIComponent(i.access_token)), i.userinfo &&
							(o += "&userinfo=" + JSON.stringify(i.userinfo)), location.href = o
					}
				}) : alert("Missing Parameter")
			},
			unionPay: function(e, n) {
				o("v.pay", e, n)
			},
			unionSeInfo: function(e) {
				t.ios ? "function" == typeof e && e(!1, "not supported") : o("v.seInfo", {}, e)
			},
			unionPayAppInstalled: function(e) {
				s("v.unionPayAppInstalled", {}, e)
			},
			abcPay: function(e, n) {
				o("u.abcPay", e, n)
			},
			abcPayAppInstalled: function(e) {
				s("u.abcPayAppInstalled", {}, e)
			},
			icbcPay: function(e, n) {
				o("0.icbcPay", e, n)
			},
			net: function(e, n) {
				o("net", e, function(e, t) {
					var i = JSON.parse(t);
					n && "function" == typeof n && n(1 == i.a, i.b)
				})
			},
			netUploadFile: function(e) {
				o("netUploadFile", e, function(n, t) {
					var i = JSON.parse(t);
					0 == i.a && "function" == typeof e.onProgress && e.onProgress(i.b, i.c), 1 == i.a &&
						"function" == typeof e.onSuccess && e.onSuccess(i.b), 2 == i.a && "function" ==
						typeof e.onFail && e.onFail(i.b)
				})
			},
			http: {
				get: function(e, n, i) {
					var o = {
						url: e,
						method: "GET"
					};
					n && "object" == typeof n && (o.params = n), t.net(o, function(e, t) {
						if (e) {
							var o = "function" == typeof n ? n : "function" == typeof i ? i : null;
							o && o(JSON.parse(t))
						}
					})
				},
				post: function(e, n, i) {
					var o = {
						url: e,
						method: "POST"
					};
					n && "object" == typeof n && (o.params = n), t.net(o, function(e, t) {
						if (e) {
							var o = "function" == typeof n ? n : "function" == typeof i ? i : null;
							o && o(JSON.parse(t))
						}
					})
				}
			},
			onMenuScan: function(e) {
				f("onMenuScan", function(n) {
					t.scan({
						needResult: !0
					}, e)
				})
			},
			cacheSize: function(e) {
				o("cacheSize", {}, function(n, t) {
					e && e(n && t ? parseInt(t) : 0)
				})
			},
			toast: function(e) {
				o("toast", {
					s: "string" == typeof e ? e : JSON.stringify(e)
				})
			},
			exit: function(e) {
				o("exit", {
					k: !!e
				})
			},
			upgrade: function(e) {
				o("upgrade", e, function(n, t) {
					if (e && "function" == typeof e.progress && t) {
						var i = JSON.parse(t);
						e.progress(i.a, i.b)
					}
				})
			},
			home: function() {
				t.ios ? t.exit() : o("home")
			},
			openInBrowser: function(e) {
				o("openInBrowser", {
					s: e
				})
			},
			miniProgram: function(e) {
				r("miniProgram", e, function(n) {
					"function" == typeof e.onResult && e.onResult(n)
				})
			},
			setMiniProgramResult: function(e) {
				o("setMiniProgramResult", {
					r: "string" != typeof e ? JSON.stringify(e) : e
				})
			},
			open: function(e) {
				o("open", "string" == typeof e ? {
					url: e
				} : e)
			},
			setOptions: function(e) {
				o("setOptions", e)
			},
			close: function(e) {
				t.version > 35 && t.isRoot || o("close", e ? {
					f: e
				} : {})
			},
			evalInNavbar: function(e) {
				o("evalInNavbar", {
					j: e
				})
			},
			evalInNavbarAction: function(e, n) {
				t.evalInNavbar("action(" + JSON.stringify({
					action: e,
					data: n
				}) + ")")
			},
			evalInToolbar: function(e) {
				o("evalInToolbar", {
					j: e
				})
			},
			launch: function(e, n) {
				"string" == typeof e ? s("launch", {
					a: e
				}, n) : a("launch", {
					b: e
				}, n)
			},
			canLaunch: function(e, n) {
				s("canLaunch", {
					u: e
				}, n)
			},
			launchPackage: function(e, n) {
				s("launchPackage", {
					s: e
				}, n)
			},
			onMenuAction: function(e) {
				f("onMenuAction", function(n) {
					t.action(e)
				})
			},
			onClose: function(e) {
				f("onClose", e)
			},
			onBackPressed: function(e) {
				f("onBackPressed", e)
			},
			onMenuShareTimeline: function(e) {
				d("onMenuShareTimeline", 0, e)
			},
			onMenuShareFriend: function(e) {
				d("onMenuShareFriend", 1, e)
			},
			onMenuShareQQ: function(e) {
				d("onMenuShareQQ", 2, e)
			},
			onMenuShareQZone: function(e) {
				d("onMenuShareQZone", 3, e)
			}
		};

	function i(e, n, t) {
		e = e || {};
		var i = {};
		t && (i[t] = e), e.text && (i.text = e.text), r("w.share", i, n)
	}

	function o(t, i, r) {
		l() ? e.WebViewJavascriptBridge.callHandler(t, i || {}, function(e) {
			if (n && alert("js back\n\n" + e), r && "function" == typeof r) {
				var t = JSON.parse(e);
				return r(!!t.success, t.text)
			}
		}) : p(function() {
			o(t, i, r)
		})
	}

	function r(e, n, t) {
		return o(e, n, t ? function(e, n) {
			if (t) return t(n)
		} : null)
	}

	function a(e, n, t) {
		return o(e, n, t ? function(e, n) {
			if (t) return t(parseInt(n))
		} : null)
	}

	function s(e, n, t) {
		return o(e, n, t ? function(e, n) {
			if (t) return t("true" == n)
		} : null)
	}

	function c(e, n, t) {
		return o(e, n, "function" == typeof t ? function(e, n) {
			var i = null;
			if (n) try {
				i = JSON.parse(n)
			} catch (e) {}
			return t(e, i)
		} : null)
	}

	function u(e, n, t) {
		return o(e, n, t ? function(e, n) {
			if (t) return t(n ? JSON.parse(n) : null)
		} : null)
	}

	function f(n, t) {
		l() ? e.WebViewJavascriptBridge.registerHandler(n, function(e, n) {
			var i = {
				ok: !0
			};
			if (t) {
				var o = t(e);
				null != o && (i.data = o)
			}
			n(i)
		}) : p(function() {
			f(n, t)
		})
	}

	function l() {
		return t.inApp || console.log("jsBridge can only used in App"), !!t.isReady() || (console.log(
			"jsBridge is not ready\nUsage:\njsBridge.ready(function(){\n  //do something\n});"), !1)
	}

	function d(e, n, i) {
		f(e, function(e) {
			"function" == typeof i ? i() : (i = i || {}, t.share({
				to: n,
				title: i.title || document.title,
				link: i.link || location.href,
				imgUrl: i.imgUrl || "",
				desc: i.desc || ""
			}, function(e) {
				e && i.success && i.success(), e || i.cancel && i.cancel()
			}))
		})
	}

	function p(n) {
		var t = e;
		if (t && t.navigator &&
			/MicroMessenger.*miniProgram|Alipay.*MiniProgram|toutiaomicroapp|QQ.*miniProgram|swan\/|JD.*miniProgram/i
			.test(t.navigator.userAgent)) console.error("not support miniPrograme");
		else {
			if (t.WebViewJavascriptBridge) return n(WebViewJavascriptBridge);
			if (t.WVJBCallbacks) return t.WVJBCallbacks.push(n);
			t.WVJBCallbacks = [n];
			var i = document,
				o = i.createElement("iframe");
			o.style.display = "none", o.src = "wvjbscheme://__BRIDGE_LOADED__";
			var r = i.body ? i.body : i.documentElement;
			r.appendChild(o), setTimeout(function() {
				r.removeChild(o)
			}, 3e3)
		}
	}
	for (var g = [{
			f: "wxOpenCustomerServiceChat|wxLaunchMiniProgram|wxSubscribeMsg|showImages|showSplash|appSettings|sidebarOpen|sidebarClose|sidebarHeader|captureWebPage|sysShare|share|shareText|shareMusic|shareImage|shareVideo|shareWxMiniProgram|shareImages|shareQqMiniProgram|wxOpenLaunchAppExtinfo|clearCache|clearCookie|vibrate|onAppEnterBackground|onAppEnterForeground|progress|print|presentBrowser|restart|actionButton"
		}, {
			f: "pay|wxPay|aliPay",
			j: 1
		}, {
			f: "appInfo|deviceInfo|contactOne|contactAll",
			j: 3
		}, {
			f: "wxAppInstalled|sidebarIsOpen|saveScreenshotToAlbum|canGoBack|canGoForward",
			j: 4
		}, {
			f: "scanFromUrl|scanFromAlbum|scan|getClipboardText|getDeviceId|getInstallId",
			j: 2
		}, {
			i: "d",
			n: "d",
			f: "deviceOwnerAuth|deviceOwnerAuthAvailable|",
			j: 4
		}, {
			i: 2,
			f: "agreed|agreement|userAgreement|userPrivacy",
			o: {
				onAgree: function(e) {
					t.ios ? e && e(!0) : o("2.onAgree", {}, e)
				}
			},
			j: 1
		}, {
			i: 4,
			n: "db",
			f: "tables",
			o: {
				execSQL: function(e, n, t) {
					c("4.execSQL", {
						s: e,
						a: n
					}, t)
				},
				query: function(e, n, t) {
					c("4.query", {
						s: e,
						a: n
					}, t)
				}
			}
		}, {
			i: 9,
			n: "audioRecorder",
			f: "startRecord|stopRecord|play|pause|resume|stop|duration|remove|upload",
			e: 1
		}, {
			i: 9,
			n: "audioRecorder",
			f: "read",
			j: 2
		}, {
			i: "a",
			n: "bdloc",
			f: "getCurrentPosition",
			j: 3
		}, {
			i: "a",
			n: "bdloc",
			f: "stop",
			j: 1
		}, {
			i: "y",
			n: "bdface",
			f: "detect|liveness",
			j: 3
		}, {
			i: "y",
			n: "bdface",
			f: "config",
			j: 1
		}, {
			i: 11,
			n: "ttStat",
			f: "init|eventRegister|eventPurchase|eventAccessAccount|eventAccessPaymentChannel|eventAddCart|eventAddToFavorite|eventCheckOut|eventCreateGameRole|eventLogin|eventUpdateLevel|eventQuest|eventViewContent|eventV3|setUserUniqueID"
		}, {
			i: 12,
			n: "ttAd",
			f: "init|bannerExpressAd|interactionExpressAd|rewardVideoAd|fullScreenVideoAd|interactionAd2|testTool",
			e: 1
		}, {
			i: 13,
			n: "xlx",
			f: "init|refreshMediaUserId|refreshAppSecret|open"
		}, {
			i: 14,
			n: "hyAd",
			f: "init|openMotivateVideoAd",
			e: 1
		}, {
			i: 15,
			n: "fm",
			f: "rewardVideoAd",
			e: 1
		}, {
			i: 16,
			n: "hx",
			f: "init|rewardVideoAD|fullscreenVideoAD|interstitialAD|nativeAD|isAdOpen|gameList",
			e: 1
		}, {
			i: 17,
			n: "yuemeng",
			f: "openReader|setOutUserId"
		}, {
			i: 18,
			n: "txRtc",
			f: "login|logout|getLoginStatus|setUserInfo|requestPermission|setListener|removeListener|getSDKVersion|enableFloatWindow|enableMuteMode|setCallingBell|call|groupCall|setCallListener|removeCallListener|createChatRoom|enterChatRoom|destroyChatRoom|setChatRoomListener|removeChatRoomListener|createVideoLiveRoom|enterVideoLiveRoom|setVideoLiveRoomListener|removeVideoLiveRoomListener|enterRoom|startLocalAudio|stopLocalAudio|exitRoom"
		}, {
			i: 19,
			n: "leto",
			f: "syncUserInfo|jumpMiniGame|startGameCenter",
			e: 1
		}, {
			i: 20,
			n: "yhad",
			f: "rewardAdvert",
			e: 1
		}, {
			i: 21,
			f: "alipayLogin"
		}, {
			i: 22,
			n: "dyad",
			f: "jumpAdList|jumpAdDetail|jumpMine"
		}, {
			i: 23,
			n: "mid",
			f: "init|commonTask|weChatTask|cplTask|newsTask|novelTask|uiPreference|rewardVideo",
			e: 1
		}, {
			i: 24,
			n: "xw",
			f: "jumpToList|jumpToDetail"
		}, {
			i: 25,
			n: "yilan",
			f: "init|shortVideo|littleTiktokVideo|littleKuaishouVideo|play|login|logout|getToken",
			e: 1
		}, {
			i: 26,
			n: "nfc",
			f: "isSupported|isEnabled|openSettings|enableForegroundDispatch|disableForegroundDispatch|writeNdefUri|writeNdefText|writeNdefMime|cancelWriteNdef|makeReadOnlyNdef|cancelMakeReadOnlyNdef|writeMifareUltralightPage|cancelWriteMifareUltralightPage|transceiveMifareUltralight|cancelTransceiveMifareUltralight",
			e: 1
		}, {
			i: 27,
			n: "pcg",
			f: "load|loadDetail"
		}, {
			i: 28,
			n: "bh",
			f: "rewardVideo|fullVideo|interactionAd|nativeAd",
			e: 1
		}, {
			i: 29,
			n: "xprinter",
			f: "init|connectBtPort|connectNetPort|connectUsbPort|disconnectCurrentPort|disconnetNetPort|checkLinkedState|getBtAvailableDevice|onDiscovery|writeDataByUSB|writeSendData|write|writeTSC|writePos58|writePos76|writePos80",
			e: 1
		}, {
			i: 30,
			n: "sms",
			f: "list",
			e: 1
		}, {
			i: 31,
			f: "appList",
			j: 3
		}, {
			i: 32,
			n: "bm",
			f: "config|rewardVideoAd|interstitialAd|bannerAd|feedVideo|hVideo|interactive|cpa|setUserId",
			e: 1
		}, {
			i: 33,
			f: "callLog"
		}, {
			i: 34,
			n: "dlna",
			f: "search|videoResource|audioResource|imageResource|play|pause|stop|seek|devices|mediaInfo|positionInfo"
		}, {
			i: 35,
			n: "qmf",
			f: "wxPay|aliPay|unionPay|pay|seInfo|unionPayAppInstalled"
		}, {
			i: 36,
			n: "wch",
			f: "info"
		}, {
			i: 37,
			n: "push",
			f: "getPushId|getDeviceToken|bindTag|bindAlias|isOnline",
			e: 1
		}, {
			i: 38,
			n: "cncb",
			f: "pay"
		}, {
			i: 39,
			n: "gdtAction",
			f: "logAction|setUserUniqueId|onRegister|onLogin|onBindAccount|onQuestFinish|onCreateRole|onUpdateLevel|onShare|onRateApp|onViewContent|onAddToCart|onCheckout|onPurchase|onAddPaymentChannel"
		}, {
			i: 40,
			n: "netum",
			f: "setMode|getBlueToothList|connectSppBlueTooth|sendCommand",
			e: 1
		}, {
			i: 41,
			n: "fusion",
			f: "setUserId|bannerAd|interactionAd|rewardVideoAd",
			e: 1
		}, {
			i: 42,
			n: "game321",
			f: "platformLogin|openSuit",
			e: 1
		}, {
			i: 43,
			n: "gdt",
			f: "setChannel|interaction|interactionFullScreen|rewardVideo",
			e: 1
		}, {
			i: 44,
			n: "topflow",
			f: "banner|rewardVideo",
			e: 1
		}, {
			i: 45,
			n: "tel",
			f: "call"
		}, {
			i: 46,
			n: "qs",
			f: "scan",
			e: 1
		}, {
			i: 47,
			n: "amapLoc",
			f: "getCurrentPosition|stop"
		}, {
			i: 48,
			n: "amapNavi",
			f: "showRoute",
			e: 1
		}, {
			i: 49,
			n: "amapTrack",
			f: "startTrack|stopTrack",
			e: 1
		}, {
			i: 50,
			n: "pns",
			f: "setAuthSDKInfo|checkAuthEnvEnable|getLoginToken"
		}, {
			i: 51,
			n: "sia",
			f: "checkSupport|request"
		}, {
			i: 52,
			n: "zj",
			f: "rewardVideo|interstitial|fullScreenVideo|banner|contentVideo|h5|task|setUserId|getMedia|setMedia",
			e: 1
		}, {
			i: 53,
			n: "serialPort",
			f: "getDevices|open|send|close",
			e: 1
		}, {
			i: 54,
			n: "prt",
			f: "getUsbPrinters|open|close|sendBytesData|printText|printImage|printTable|initPrinter|setFont|setPrinter|setLeftMargin|cutPaper|ringBuzzer|blackLableFind|resetFeedDistance"
		}, {
			i: 55,
			n: "bmNews",
			f: "config|show|setUserId|startCountDown|setRewardResult",
			e: 1
		}, {
			i: 56,
			n: "uhf",
			f: "open|close|isOpen|getFirmwareVersion|getTemperature|getPower|setPower|getRegion|setRegion|inventoryOnce|inventoryStart|inventoryStop|getTagIDCount|getTagIDs|readTagData|writeTagData|blockWriteTagData|blockEraseTagData|lockTag|killTag|setParameters|setParamBytes|readTagLED|readTagTemperature|registerReadTags|unregisterReadTags"
		}, {
			i: 57,
			n: "hkc",
			f: "addDevice|getDevices|addPreview|removePreview|startPreview|stopPreview|snapshot"
		}, {
			i: 58,
			n: "ob",
			f: "preview|removePreview|snapshot"
		}, {
			i: 59,
			n: "bmVideo",
			f: "config|show|setUserId",
			e: 1
		}, {
			i: 60,
			n: "bmGame",
			f: "config|show|setUserId",
			e: 1
		}, {
			i: 61,
			n: "bmNovel",
			f: "config|show|setUserId",
			e: 1
		}, {
			i: 62,
			n: "xyAd",
			f: "config|rewardVideoAd|interstitialAd|bannerAd|feedVideo|hVideo|interactive|cpa|setUserId",
			e: 1
		}, {
			i: 63,
			n: "xyNews",
			f: "config|show|startCountDown|setRewardResult|setUserId",
			e: 1
		}, {
			i: 64,
			n: "xyVideo",
			f: "config|show|setUserId",
			e: 1
		}, {
			i: 65,
			n: "xyGame",
			f: "config|show|setUserId",
			e: 1
		}, {
			i: 66,
			n: "xyNovel",
			f: "config|show|setUserId",
			e: 1
		}, {
			i: 67,
			n: "qqLoc",
			f: "getCurrentPosition|stop"
		}, {
			i: 68,
			n: "flyer",
			f: "logEvent|setAdditionalData|setMinTimeBetweenSessions|logSession|setResolveDeepLinkURLs|sendPushNotificationData|getAppsFlyerUID|setCustomerUserId|setCollect|setCollectData|stop|start|anonymizeUser",
			e: 1
		}, {
			i: 69,
			n: "topVpn",
			f: "setConfigInfo|loginVOne|requestVPNResInfo|startService|closeService|logoutVOne|requestCaptcha|getStatus|modifyPassword",
			e: 1
		}, {
			i: 70,
			n: "fbEvent",
			f: "logEvent|setAutoLogAppEventsEnabled|setAdvertiserIDCollectionEnabled"
		}, {
			i: 71,
			n: "fbLogin",
			f: "login|logout"
		}, {
			i: 72,
			n: "fbShare",
			f: "shareLink|sharePhoto|shareVideo|shareMedia"
		}, {
			i: 73,
			n: "tb",
			f: "requestPermissionIfNecessary|interaction|banner|rewardVideo|shortVideo",
			e: 1
		}, {
			i: 74,
			n: "aliRpVerify",
			f: "start"
		}, {
			i: 75,
			n: "aliSmartVerify",
			f: "getMetaInfo|start"
		}, {
			i: 76,
			n: "aliZimVerify",
			f: "getMetaInfo|getSession|verify"
		}, {
			i: 77,
			n: "kc",
			f: "banner|insert|fullVideo|rewardVideo|videoContent|news|novel|dial|constellatory|almanac|oneiromancy|weather|study|xm",
			e: 1
		}, {
			i: 78,
			n: "adjust",
			f: "registerAdjustBridge|trackEvent|setSessionParameter|trackThirdPartySharing|trackAdRevenue|trackPlayStoreSubscription|getGoogleAdId|getAmazonAdId|getAdjustAdId",
			e: 1
		}, {
			i: 79,
			n: "vpn",
			f: "start|stop|status"
		}, {
			i: 80,
			n: "floater",
			f: "open|close|status|hasPermission|requestPermission|setWindowBackground"
		}, {
			i: 81,
			n: "yh",
			f: "startScan|stopScan|connect|disconnect|write",
			e: 1
		}, {
			i: 82,
			n: "tz",
			f: "requestPermissionIfNecessary|reward|fullscreen|dialog|banner|contentVideo",
			e: 1
		}, {
			i: 83,
			n: "txIm",
			f: "login|logout|getLoginStatus|getSDKVersion|getUnreadMessageCount|setListener|removeListener|setMessageListener|removeMessageListener|chat|conversation|contact"
		}, {
			i: 84,
			n: "easeIm",
			f: "init|login|status|logout|userInfo|unreadMessageCount|chat"
		}, {
			i: 85,
			n: "ttGm",
			f: "reward|interstitialFull|banner|requestPermissionIfNecessary|testTool",
			e: 1
		}, {
			i: 86,
			n: "ttDp",
			f: "init|video|grid|userProfile|requestPermissionIfNecessary",
			e: 1
		}, {
			i: 87,
			n: "contact",
			f: "pick|all|add|delete"
		}, {
			i: 88,
			n: "fn",
			f: "interaction|fullscreenVideo|banner|reward",
			e: 1
		}, {
			i: 89,
			n: "yk",
			f: "requestPermission|requestEnable|scan|stopScan|connect|disconnect|getPrinterInfo|setAutoOffTime|setPaperSize|printImage|printBlankLine|cut"
		}, {
			i: 90,
			n: "qy",
			f: "start"
		}, {
			i: 91,
			n: "bdNavi",
			f: "showRoute",
			e: 1
		}, {
			i: 92,
			n: "bp",
			f: "print",
			e: 1
		}, {
			i: 93,
			n: "txDoc",
			f: "isSupportExt|open"
		}, {
			i: 94,
			n: "wwx",
			f: "register|isInstalled|login|shareText|shareLink|shareFile|shareVideo|shareImage|shareMiniProgram|shareLocation"
		}, {
			i: 95,
			n: "wj",
			f: "requestPermissionIfNecessary|reward|fullscreen|dialog|banner",
			e: 1
		}, {
			i: 96,
			n: "yxIm",
			f: "init|login|logout|info|setCallkitUserNickname|setCallkitUserAvatar|setUserInfo|setGlobalOptions|getGlobalOptions|navigate",
			e: 1
		}, {
			i: 97,
			n: "gid",
			f: "signIn|signIn2|signOut|googlePlayServicesAvailable"
		}, {
			i: 98,
			n: "yxRtc",
			f: "init|login|logout|info|setCallkitUserNickname|setCallkitUserAvatar|singleCall",
			e: 1
		}, {
			i: 99,
			n: "dy",
			f: "initSdk|isAppInstalled|authorize|share|shareToContacts|openRecordPage"
		}, {
			i: 100,
			n: "wallpaper",
			f: "info|clear|setWallpaper"
		}, {
			i: 101,
			n: "ewg",
			f: "connect|disconnect|status|startCheck|stopCheck",
			e: 1
		}, {
			i: 102,
			n: "msa",
			f: "request"
		}, {
			i: 103,
			n: "battery",
			f: "status",
			e: 1
		}, {
			i: 104,
			n: "imei",
			f: "request"
		}, {
			i: 105,
			n: "emulator",
			f: "check"
		}, {
			i: 106,
			n: "tobid",
			f: "requestPermissionIfNecessary|reward|interstitial|banner",
			e: 1
		}, {
			i: 107,
			n: "hj",
			f: "requestPermissionIfNecessary|reward|interstitial|banner",
			e: 1
		}, {
			i: 108,
			n: "audio",
			f: "getVolume|setVolume"
		}, {
			i: 109,
			n: "screen",
			f: "getBrightness|setBrightness"
		}, {
			i: 110,
			n: "usb",
			f: "devices|serialPorts|openSerialPort|closeSerialPort|writeSerialPort|readSerialPort|breakSerialPort",
			e: 1
		}, {
			i: 111,
			n: "topOn",
			f: "reward|interstitial|banner",
			e: 1
		}, {
			i: "t",
			n: "bdocr",
			f: "general|generalBasic|accurate|accurateBasic|generalEnhanced|webImage|idCardFront|idCardFrontAuto|idCardBack|idCardBackAuto|bankCard|vehicleLicense|drivingLicense|licensePlate|businessLicense|receipt|passport|vatInvoice|qrcode|numbers|lottery|businessCard|handWriting|custom",
			j: 3
		}, {
			i: "zq",
			n: "zqprinter",
			f: "SDK_Version|Prn_GetPortList|Prn_Connect|Prn_Disconnect|Prn_PrinterInit|Prn_Status|Prn_PowerStatus|Prn_PrintText|Prn_PrintEscText|Prn_PrintString|Prn_PrintBarcode|Prn_PrintQRCode|Prn_PrintBitmap|Prn_PrintBmp|Prn_CutPaper|Prn_OpenCashbox|Prn_LineFeed|Prn_MarkFeed|Prn_SetCharacterSet|Prn_SetInterCharacterSet|Prn_SetLineSpacing|Prn_SetFontStyle|Prn_SetFontSize|Prn_SetAlignment|Prn_SendData|Prn_ReadData|Prn_BeginTransaction|Prn_EndTransaction|Prn_GetMsrTrack",
			j: 2
		}], m = function(e, n, t) {
			Object.defineProperty(e, n, {
				configurable: !1,
				writable: !1,
				value: t
			})
		}, v = function(e, n) {
			for (var t = n.f.split("|"), i = 0, a = t.length; i < a; i++) {
				var f = t[i];
				f && m(e, f, function(e, n) {
					var t = (e.i ? e.i + "." : "") + n;
					return function(n, i) {
						var a = "function" == typeof n;
						return (1 == e.j ? o : 2 == e.j ? r : 3 == e.j ? u : 4 == e.j ? s : c)(t,
							a ? {} : n, a ? n : i)
					}
				}(n, f))
			}
			if ("object" == typeof n.o)
				for (var l in n.o) m(e, l, n.o[l])
		}, h = 0, y = g.length; h < y; h++) {
		var b = g[h];
		b.n ? t[b.n] ? v(t[b.n], b) : m(t, b.n, function() {
			var e, n = {};
			return v(n, b), b.e && (m(n, "setListener", (e = b.i, function(n) {
				return o(e + ".setListener", {}, function(e, t) {
					if (n && t) {
						var i = JSON.parse(t);
						return n(i.event, i.data)
					}
				})
			})), m(n, "removeListener", function(e) {
				return function() {
					return o(e + ".removeListener")
				}
			}(b.i))), n
		}()) : v(t, b)
	}
	var P = /LT-APP\/(\d+)/,
		S = navigator ? navigator.userAgent : "",
		w = P.test(S);
	if (!w) {
		var I = e.WebViewJavascriptBridgeInterface;
		w = !!I, I && I.ltApp && (S += I.ltApp())
	}
	Object.defineProperty(t, "inApp", {
		configurable: !1,
		writable: !1,
		value: w
	}), Object.defineProperty(t, "version", {
		configurable: !1,
		writable: !1,
		value: P.test(S) ? parseInt(P.exec(S)[1]) : 0
	});
	var A = /LT-APP\/(\d+)\/(\d+)/;
	Object.defineProperty(t, "appVersion", {
		configurable: !1,
		writable: !1,
		value: A.test(S) ? parseInt(A.exec(S)[2]) : 0
	}), Object.defineProperty(t, "ios", {
		configurable: !1,
		writable: !1,
		value: /(iPhone|iPad|iPod|iOS)/i.test(S) || navigator && "MacIntel" == navigator.platform &&
			navigator.maxTouchPoints > 0
	});
	var C = /YM-RT/.test(S);
	return Object.defineProperty(t, "isRoot", {
		configurable: !1,
		get: function() {
			return C
		}
	}), t.inApp && t.ready(function() {
		t.version > 35 && t.version < 41 && s("_isRoot", {}, function(e) {
			C = e
		})
	}), t
});