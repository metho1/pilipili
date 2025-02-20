if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$j = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$j], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/hbuilderx/Projects/pilipili/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const _imports_0$3 = "/static/avatar.jpg";
  const _sfc_main$i = {
    name: "TopBar",
    data() {
      return {};
    },
    methods: {
      goToSearch() {
        uni.navigateTo({
          url: "/pages/search/search"
          // 这里是你的搜索页面路径
        });
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "top-bar" }, [
      vue.createElementVNode("image", {
        class: "avatar",
        src: _imports_0$3
      }),
      vue.createElementVNode("view", {
        class: "custom-search-bar",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.goToSearch && $options.goToSearch(...args))
      }, [
        vue.createVNode(_component_uni_icons, {
          type: "search",
          size: "36rpx",
          style: { "margin-right": "15rpx" }
        }),
        vue.createElementVNode("text", null, "搜索")
      ]),
      vue.createVNode(_component_uni_icons, {
        type: "email",
        size: "50rpx"
      })
    ]);
  }
  const TopBar = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["render", _sfc_render$i], ["__scopeId", "data-v-10c29057"], ["__file", "D:/hbuilderx/Projects/pilipili/components/top-bar.vue"]]);
  const _imports_0$2 = "/static/filter1.svg";
  const _sfc_main$h = {
    name: "NavTabs",
    props: {
      activeTab: String,
      //父组件传递当前选中的tab值
      tabs: Array
    },
    data() {
      return {};
    },
    methods: {
      switchTab(tab) {
        this.$emit("tabChange", tab);
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "nav-tabs" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.tabs, (tab, index) => {
          return vue.openBlock(), vue.createElementBlock("text", {
            key: index,
            class: vue.normalizeClass(["tab", $props.activeTab === tab.value ? "active" : ""]),
            onClick: ($event) => $options.switchTab(tab.value)
          }, [
            tab.value === "filter" ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              src: _imports_0$2,
              class: "stats-icon"
            })) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              [
                vue.createTextVNode(
                  vue.toDisplayString(tab.text),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ], 10, ["onClick"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const NavTabs = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h], ["__scopeId", "data-v-fdb8fc5f"], ["__file", "D:/hbuilderx/Projects/pilipili/components/nav-tabs.vue"]]);
  const _sfc_main$g = {
    name: "UniCard",
    emits: ["click"],
    props: {
      title: {
        type: String,
        default: ""
      },
      subTitle: {
        type: String,
        default: ""
      },
      padding: {
        type: String,
        default: "10px"
      },
      margin: {
        type: String,
        default: "15px"
      },
      spacing: {
        type: String,
        default: "0 10px"
      },
      extra: {
        type: String,
        default: ""
      },
      cover: {
        type: String,
        default: ""
      },
      thumbnail: {
        type: String,
        default: ""
      },
      isFull: {
        // 内容区域是否通栏
        type: Boolean,
        default: false
      },
      isShadow: {
        // 是否开启阴影
        type: Boolean,
        default: true
      },
      shadow: {
        type: String,
        default: "0px 0px 3px 1px rgba(0, 0, 0, 0.08)"
      },
      border: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      onClick(type) {
        this.$emit("click", type);
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-card", { "uni-card--full": $props.isFull, "uni-card--shadow": $props.isShadow, "uni-card--border": $props.border }]),
        style: vue.normalizeStyle({ "margin": $props.isFull ? 0 : $props.margin, "padding": $props.spacing, "box-shadow": $props.isShadow ? $props.shadow : "" })
      },
      [
        vue.createCommentVNode(" 封面 "),
        vue.renderSlot(_ctx.$slots, "cover", {}, () => [
          $props.cover ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-card__cover"
          }, [
            vue.createElementVNode("image", {
              class: "uni-card__cover-image",
              mode: "widthFix",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick("cover")),
              src: $props.cover
            }, null, 8, ["src"])
          ])) : vue.createCommentVNode("v-if", true)
        ], true),
        vue.renderSlot(_ctx.$slots, "title", {}, () => [
          $props.title || $props.extra ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-card__header"
          }, [
            vue.createCommentVNode(" 卡片标题 "),
            vue.createElementVNode("view", {
              class: "uni-card__header-box",
              onClick: _cache[1] || (_cache[1] = ($event) => $options.onClick("title"))
            }, [
              $props.thumbnail ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-card__header-avatar"
              }, [
                vue.createElementVNode("image", {
                  class: "uni-card__header-avatar-image",
                  src: $props.thumbnail,
                  mode: "aspectFit"
                }, null, 8, ["src"])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "uni-card__header-content" }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-card__header-content-title uni-ellipsis" },
                  vue.toDisplayString($props.title),
                  1
                  /* TEXT */
                ),
                $props.title && $props.subTitle ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "uni-card__header-content-subtitle uni-ellipsis"
                  },
                  vue.toDisplayString($props.subTitle),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ])
            ]),
            vue.createElementVNode("view", {
              class: "uni-card__header-extra",
              onClick: _cache[2] || (_cache[2] = ($event) => $options.onClick("extra"))
            }, [
              vue.createElementVNode(
                "text",
                { class: "uni-card__header-extra-text" },
                vue.toDisplayString($props.extra),
                1
                /* TEXT */
              )
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ], true),
        vue.createCommentVNode(" 卡片内容 "),
        vue.createElementVNode(
          "view",
          {
            class: "uni-card__content",
            style: vue.normalizeStyle({ padding: $props.padding }),
            onClick: _cache[3] || (_cache[3] = ($event) => $options.onClick("content"))
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode("view", {
          class: "uni-card__actions",
          onClick: _cache[4] || (_cache[4] = ($event) => $options.onClick("actions"))
        }, [
          vue.renderSlot(_ctx.$slots, "actions", {}, void 0, true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__scopeId", "data-v-ae4bee67"], ["__file", "D:/hbuilderx/Projects/pilipili/uni_modules/uni-card/components/uni-card/uni-card.vue"]]);
  const API_BASE_URL = "http://192.168.181.217:8082/";
  const API_RESOURCES_URL = "http://www.setrain.top/";
  const _imports_0$1 = "/static/views.svg";
  const _imports_1$1 = "/static/barrages.svg";
  const _sfc_main$f = {
    name: "Recommend",
    data() {
      return {
        page: 0,
        banners: [
          {
            url: API_RESOURCES_URL + "covers/6.jpg",
            content: "静谧的街道竟暗藏汹涌，真相竟是！"
          },
          {
            url: API_RESOURCES_URL + "covers/4.jpg",
            content: "点击开启你的异世界冒险之旅！"
          },
          {
            url: API_RESOURCES_URL + "covers/5.jpg",
            content: "周边模玩年度盛典，投稿赢大额流量与万元奖金，快来参与吧！"
          }
        ],
        videos: []
      };
    },
    created() {
      formatAppLog("log", "at pages/index/recommend.vue:64", "recommend");
      this.fetchVideos();
    },
    methods: {
      // 获取 fetchVideos 数据
      async fetchVideos() {
        try {
          this.page++;
          formatAppLog("log", "at pages/index/recommend.vue:72", this.page);
          const res = await uni.request({
            url: API_BASE_URL + "videoBuss/getVideoList",
            method: "GET",
            data: {
              page: this.page
            }
          });
          if (res.statusCode === 200) {
            let newvideos = res.data.list;
            newvideos = newvideos.map((item) => {
              item.cover = API_RESOURCES_URL + item.cover;
              item.time = this.formatTime(item.time);
              return item;
            });
            this.videos = this.videos.concat(newvideos);
          } else {
            formatAppLog("error", "at pages/index/recommend.vue:89", "请求失败:", res);
            this.page--;
            uni.showToast({
              title: "数据加载失败",
              icon: "none"
            });
          }
        } catch (error) {
          this.page--;
          formatAppLog("error", "at pages/index/recommend.vue:98", "网络请求错误:", error);
          uni.showToast({
            title: "网络请求失败",
            icon: "none"
          });
        }
      },
      format(num) {
        if (num >= 1e4) {
          let formatted = (num / 1e4).toFixed(1);
          return formatted.endsWith(".0") ? formatted.slice(0, -2) + "万" : formatted + "万";
        }
        return num;
      },
      gotoVideo(video) {
        uni.setStorageSync("videoInfo", video);
        uni.navigateTo({
          url: `/pages/video/video?videoid=${video.videoid}`
        });
      },
      formatTime(time) {
        let hour = Math.floor(time / 3600);
        let minute = Math.floor(time / 60 % 60);
        let second = time % 60;
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        return (hour > 0 ? hour + ":" : "") + minute + ":" + second;
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_card = resolveEasycom(vue.resolveDynamicComponent("uni-card"), __easycom_0);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 轮播图 "),
        vue.createVNode(_component_uni_card, {
          margin: "8rpx",
          padding: "0rpx",
          spacing: "0rpx"
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("swiper", {
              style: { "height": "400rpx" },
              circular: "",
              autoplay: "",
              interval: 2e3,
              "indicator-dots": "",
              "indicator-active-color": "#fff"
            }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.banners, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
                    vue.createElementVNode("view", { class: "swiper-item" }, [
                      vue.createElementVNode("image", {
                        src: item.url,
                        class: "banner-image",
                        "lazy-load": "true"
                      }, null, 8, ["src"]),
                      vue.createElementVNode(
                        "view",
                        { class: "text-overlay" },
                        vue.toDisplayString(item.content),
                        1
                        /* TEXT */
                      )
                    ])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ]),
          _: 1
          /* STABLE */
        }),
        vue.createCommentVNode(" 视频列表 "),
        vue.createElementVNode("view", { class: "video-container" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.videos, (video) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: video.videoid,
                class: "video-item",
                onClick: ($event) => $options.gotoVideo(video)
              }, [
                vue.createElementVNode("view", { class: "video-image-container" }, [
                  vue.createElementVNode("image", {
                    src: video.cover,
                    class: "video-image",
                    "lazy-load": "true"
                  }, null, 8, ["src"]),
                  vue.createElementVNode(
                    "view",
                    { class: "video-time" },
                    vue.toDisplayString(video.time),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "video-stats" }, [
                    vue.createElementVNode("image", {
                      src: _imports_0$1,
                      class: "stats-icon",
                      "lazy-load": "true"
                    }),
                    vue.createElementVNode(
                      "text",
                      { class: "views_barrages" },
                      vue.toDisplayString($options.format(video.views)),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("image", {
                      src: _imports_1$1,
                      class: "stats-icon",
                      "lazy-load": "true"
                    }),
                    vue.createElementVNode(
                      "text",
                      { class: "views_barrages" },
                      vue.toDisplayString($options.format(video.barrages)),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { style: { "padding": "10rpx 15rpx" } }, [
                  vue.createElementVNode(
                    "view",
                    { class: "video-title" },
                    vue.toDisplayString(video.title),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "video-uploader" }, [
                    vue.createVNode(_component_uni_icons, {
                      type: "person",
                      size: "30rpx"
                    }),
                    vue.createTextVNode(
                      " " + vue.toDisplayString(video.username),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const Recommend = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__scopeId", "data-v-82c9c6a1"], ["__file", "D:/hbuilderx/Projects/pilipili/pages/index/recommend.vue"]]);
  const _sfc_main$e = {
    name: "Hot",
    data() {
      return {};
    },
    created() {
      formatAppLog("log", "at pages/index/hot.vue:16", "hot");
    },
    methods: {}
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " hot ");
  }
  const Hot = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__file", "D:/hbuilderx/Projects/pilipili/pages/index/hot.vue"]]);
  const _sfc_main$d = {
    name: "Live",
    data() {
      return {};
    },
    created() {
      formatAppLog("log", "at pages/index/live.vue:16", "live");
    },
    methods: {}
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " live ");
  }
  const Live = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__file", "D:/hbuilderx/Projects/pilipili/pages/index/live.vue"]]);
  const _sfc_main$c = {
    name: "Zones",
    data() {
      return {};
    },
    created() {
      formatAppLog("log", "at pages/index/zones.vue:16", "zones");
    },
    methods: {}
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " zones ");
  }
  const Zones = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__file", "D:/hbuilderx/Projects/pilipili/pages/index/zones.vue"]]);
  const _sfc_main$b = {
    components: {
      TopBar,
      NavTabs,
      Recommend,
      Hot,
      Live,
      Zones
    },
    data() {
      return {
        currentTab: "recommend",
        tabs: [
          {
            text: "直播",
            value: "live"
          },
          {
            text: "推荐",
            value: "recommend"
          },
          {
            text: "热门",
            value: "hot"
          },
          {
            text: "分区",
            value: "zones"
          }
        ],
        isLoading: false,
        // 防止多次请求，避免请求过快
        isLoadingTop: true,
        // 启用下拉刷新功能
        isTriggeredTop: false
        // 初始时不显示下拉刷新动画
      };
    },
    onLoad() {
    },
    computed: {
      currentComponent() {
        return this.currentTab === "live" ? "Live" : this.currentTab === "hot" ? "Hot" : this.currentTab === "zones" ? "Zones" : "Recommend";
      }
    },
    methods: {
      handleTabChange(tab) {
        this.currentTab = tab;
        formatAppLog("log", "at pages/index/index.vue:74", "当前Tab:", this.currentTab);
      },
      fetchData() {
        this.isLoading = true;
        formatAppLog("log", "at pages/index/index.vue:78", "fetch");
        const childComponent = this.$refs.currentComponentRef;
        if (childComponent && typeof childComponent.fetchVideos === "function") {
          childComponent.fetchVideos().then(() => {
            this.isLoading = false;
          }).catch(() => this.isLoading = false);
        }
      },
      handleRefresher() {
        formatAppLog("log", "at pages/index/index.vue:87", "顶部下拉刷新s>>>", this.isLoadingTop, this.isTriggeredTop);
        if (this.isLoading)
          return;
        this.isLoadingTop = true;
        this.isTriggeredTop = true;
        this.isLoading = true;
        formatAppLog("log", "at pages/index/index.vue:92", "fetch");
        const childComponent = this.$refs.currentComponentRef;
        if (childComponent && typeof childComponent.fetchVideos === "function") {
          childComponent.videos = [];
          childComponent.fetchVideos().then(() => {
            formatAppLog("log", "at pages/index/index.vue:98", "数据加载成功");
          }).catch(() => {
            formatAppLog("error", "at pages/index/index.vue:101", "数据加载失败");
          }).finally(() => {
            this.isLoading = false;
            this.isTriggeredTop = false;
          });
        } else {
          this.isLoading = false;
          this.isTriggeredTop = false;
        }
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_StatusBar = vue.resolveComponent("StatusBar");
    const _component_TopBar = vue.resolveComponent("TopBar");
    const _component_NavTabs = vue.resolveComponent("NavTabs");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createVNode(_component_StatusBar),
        vue.createCommentVNode(" 顶部导航 "),
        vue.createVNode(_component_TopBar),
        vue.createCommentVNode(" 直播、推荐、热门、分区 "),
        vue.createVNode(_component_NavTabs, {
          activeTab: $data.currentTab,
          tabs: $data.tabs,
          onTabChange: $options.handleTabChange
        }, null, 8, ["activeTab", "tabs", "onTabChange"]),
        vue.createCommentVNode(" 主要内容区域 "),
        vue.createElementVNode("scroll-view", {
          "scroll-y": "",
          class: "container",
          onScrolltolower: _cache[0] || (_cache[0] = (...args) => $options.fetchData && $options.fetchData(...args)),
          "lower-threshold": "200rpx",
          "refresher-enabled": $data.isLoadingTop,
          "refresher-triggered": $data.isTriggeredTop,
          onRefresherrefresh: _cache[1] || (_cache[1] = (...args) => $options.handleRefresher && $options.handleRefresher(...args))
        }, [
          (vue.openBlock(), vue.createBlock(
            vue.resolveDynamicComponent($options.currentComponent),
            { ref: "currentComponentRef" },
            null,
            512
            /* NEED_PATCH */
          ))
        ], 40, ["refresher-enabled", "refresher-triggered"])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__file", "D:/hbuilderx/Projects/pilipili/pages/index/index.vue"]]);
  const _sfc_main$a = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_StatusBar = vue.resolveComponent("StatusBar");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createVNode(_component_StatusBar),
        vue.createElementVNode("view")
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesProfileProfile = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__file", "D:/hbuilderx/Projects/pilipili/pages/profile/profile.vue"]]);
  const block0 = (Comp) => {
    (Comp.$renderjs || (Comp.$renderjs = [])).push("ybVideo");
    (Comp.$renderjsModules || (Comp.$renderjsModules = {}))["ybVideo"] = "0020cf84";
  };
  const _sfc_main$9 = {
    props: {
      dataId: {
        type: String,
        default() {
          let mydate = /* @__PURE__ */ new Date();
          return "cms" + mydate.getMinutes() + mydate.getSeconds() + mydate.getMilliseconds() + Math.round(Math.random() * 1e4);
        }
      },
      //播放链接
      src: {
        type: String,
        default: ""
      },
      //标题
      title: {
        type: String,
        default: ""
      },
      //封面
      poster: {
        type: String,
        default: ""
      },
      //视频格式
      formats: {
        type: String,
        default: "auto"
      },
      //时长（单位：s）
      duration: {
        type: Number,
        default: 0
      },
      //静音
      muted: {
        type: Boolean,
        default: false
      },
      //自动播放
      autoplay: {
        type: Boolean,
        default: false
      },
      //初始播放时间 (单位是秒)
      initialTime: {
        type: Number,
        default: 0
      },
      //是否循环播放
      loop: {
        type: Boolean,
        default: false
      },
      //预加载属性
      preload: {
        type: String,
        default: "auto"
        //auto/meta/none
      },
      //设置菜单
      settings: {
        type: String,
        default: "all"
      },
      //控制栏
      controls: {
        type: Boolean,
        default: true
      },
      //展示进度条
      progressShow: {
        type: Boolean,
        default: true
      },
      //显示上一个视频按钮
      prevBtnShow: {
        type: Boolean,
        default: false
      },
      //显示下一个视频按钮
      nextBtnShow: {
        type: Boolean,
        default: false
      },
      //显示播放按钮
      playShow: {
        type: Boolean,
        default: true
      },
      //显示播放时间
      timeShow: {
        type: Boolean,
        default: true
      },
      //显示静音按钮
      volumeShow: {
        type: Boolean,
        default: true
      },
      //显示设置按钮
      settingShow: {
        type: Boolean,
        default: true
      },
      //显示全拼按钮
      fullscreenShow: {
        type: Boolean,
        default: true
      },
      //镜像画面
      mirror: {
        type: Boolean,
        default: false
      },
      //音量
      volume: {
        type: Number,
        default: 1
      },
      //倍率
      playbackRate: {
        type: Number,
        default: 1
      },
      //长按倍速
      longpressPlaybackRate: {
        type: Number,
        default: 3
      },
      //展示弹幕
      barrageShow: {
        type: Boolean,
        default: false
      },
      //弹幕库
      barrages: {
        type: Array,
        default() {
          return new Array();
        }
      },
      //弹幕配置
      barrageConfig: {
        type: Object,
        default() {
          return new Object();
        }
      },
      //弹幕显示上下间距
      barrageGap: {
        type: Number,
        default: 0
      },
      //是否直播
      isLive: {
        type: Boolean,
        default: false
      },
      //flv配置
      flvConfig: {
        type: Object,
        default() {
          return new Object();
        }
      },
      //flv切片列表
      segments: {
        type: Array,
        default() {
          return new Array();
        }
      },
      //非全屏时屏幕方向 仅APP支持
      generallyDirection: {
        type: String,
        default: "portrait-primary"
      },
      //全屏时屏幕方向 仅APP支持
      fullscreenDirection: {
        type: String,
        default: "landscape-primary"
      },
      //当视频尺寸与视频容器大小不一致时的处理
      objectFit: {
        type: String,
        default: "contain"
      },
      crossOrigin: {
        type: String,
        default: ""
      },
      //开启长按倍速播放
      enableLongpressPlaybackRate: {
        type: Boolean,
        default: true
      },
      //开启双击播放暂停
      enableDoubleToggle: {
        type: Boolean,
        default: true
      },
      //是否将视频转化为Blob对象,仅支持mp4
      enableBlob: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      prop() {
        return {
          //监听标题
          title: this.title,
          //监听倍速
          playbackRate: this.playbackRate,
          //监听长按倍速
          longpressPlaybackRate: this.longpressPlaybackRate,
          //监听总进度
          duration: this.duration,
          //监听音量
          volume: this.volume,
          //监听封面
          poster: this.poster,
          //监听控制器
          controls: this.controls,
          //监听静音
          muted: this.muted,
          //监听弹幕显示/隐藏
          barrageShow: this.barrageShow,
          //监听进度条显示/隐藏
          progressShow: this.progressShow,
          //监听上一集按钮显示/隐藏
          prevBtnShow: this.prevBtnShow,
          //监听下一集按钮显示/隐藏
          nextBtnShow: this.nextBtnShow,
          //监听播放按钮显示/隐藏
          playShow: this.playShow,
          //监听时间显示/隐藏
          timeShow: this.timeShow,
          //监听音量按钮显示/隐藏
          volumeShow: this.volumeShow,
          //监听设置按钮显示/隐藏
          settingShow: this.settingShow,
          //监听全屏按钮显示/隐藏
          fullscreenShow: this.fullscreenShow,
          //监听循环播放
          loop: this.loop,
          //监听自动播放
          autoplay: this.autoplay,
          //监听加载模式
          preload: this.preload,
          //监听设置选项
          settings: this.settings,
          //监听镜像
          mirror: this.mirror,
          //监听尺寸不合时的处理
          objectFit: this.objectFit,
          //监听网络处理
          crossOrigin: this.crossOrigin,
          //监听blob
          enableBlob: this.enableBlob,
          //监听长按倍速播放开关
          enableLongpressPlaybackRate: this.enableLongpressPlaybackRate,
          //监听双击播放暂停开关
          enableDoubleToggle: this.enableDoubleToggle,
          //监听初始播放时间
          initialTime: this.initialTime,
          //监听画中画
          pictureInPicture: this.pictureInPicture
        };
      }
    },
    data() {
      return {
        ready: "",
        state: "",
        seekTime: -1,
        danmu: "",
        fullscreen: false,
        pictureInPicture: false,
        barrageRefresh: -1,
        captureEvent: -1
      };
    },
    created() {
      plus.screen.lockOrientation(this.generallyDirection);
    },
    mounted() {
      this.$nextTick(function() {
        setTimeout(() => {
          this.ready = this.dataId;
        }, 100);
      });
    },
    beforeDestroy() {
      plus.screen.lockOrientation(this.generallyDirection);
    },
    methods: {
      //触发事件
      onCanplay(e) {
        this.$emit("canplay", e);
      },
      onCanplaythrough(e) {
        this.$emit("canplaythrough", e);
      },
      onLoadeddata(e) {
        this.$emit("loadeddata", e);
      },
      onLoadedmetadata(e) {
        this.$emit("loadedmetadata", e);
      },
      onLoadstart(e) {
        this.$emit("loadstart", e);
      },
      onPlay(e) {
        this.$emit("play", e);
      },
      onPause(e) {
        this.$emit("pause", e);
      },
      onEnded(e) {
        this.$emit("ended", e);
      },
      onSeeking(e) {
        this.$emit("seeking", e);
      },
      onSeeked(e) {
        this.$emit("seeked", e);
      },
      onWaiting(e) {
        this.$emit("waiting", e);
      },
      onPlaying(e) {
        this.$emit("playing", e);
      },
      onProgress(e) {
        this.$emit("progress", e);
      },
      onTimeupdate(e) {
        this.$emit("timeupdate", e);
      },
      onVolumechange(e) {
        this.$emit("volumeChange", e);
      },
      onRatechange(e) {
        this.$emit("rateChange", e);
      },
      onDurationchange(e) {
        this.$emit("durationChange", e);
      },
      onAbort(e) {
        this.$emit("abort", e);
      },
      onErr(e) {
        this.$emit("error", e);
      },
      onEnterpictureinpicture(e) {
        this.$emit("enterpictureinpicture", e);
      },
      onLeavepictureinpicture(e) {
        this.$emit("leavepictureinpicture", e);
      },
      onCaptureFinish(e) {
        this.$emit("captureFinish", e);
      },
      onControlsChange(e) {
        this.$emit("controlsChange", e);
      },
      onBarrageChange(e) {
        this.$emit("barrageChange", e);
      },
      onPrevBtnClick(e) {
        this.$emit("prevBtnClick", e);
      },
      onNextBtnClick(e) {
        this.$emit("nextBtnClick", e);
      },
      onSeizing(e) {
        this.$emit("seizing", e);
      },
      onStatisticsInfo(e) {
        this.$emit("statisticsInfo", e);
      },
      onLoadingComplete(e) {
        this.$emit("loadingComplete", e);
      },
      onRecoveredEarlyEof(e) {
        this.$emit("recoveredEarlyEof", e);
      },
      onMediaInfo(e) {
        this.$emit("mediaInfo", e);
      },
      onMetadataArrived(e) {
        this.$emit("metadataArrived", e);
      },
      onScriptdataArrived(e) {
        this.$emit("scriptdataArrived", e);
      },
      // 操作事件
      play() {
        this.state = "";
        this.$nextTick(function() {
          this.state = "play";
        });
      },
      pause() {
        this.state = "";
        this.$nextTick(function() {
          this.state = "pause";
        });
      },
      toggle() {
        this.state = "";
        this.$nextTick(function() {
          this.state = "toggle";
        });
      },
      reload() {
        this.state = "";
        this.$nextTick(function() {
          this.state = "reload";
        });
      },
      stop() {
        this.state = "";
        this.$nextTick(function() {
          this.state = "stop";
        });
      },
      seek(time) {
        this.seekTime = -1;
        this.$nextTick(function() {
          this.seekTime = time;
        });
      },
      capture() {
        this.captureEvent = -1;
        this.$nextTick(function() {
          this.captureEvent = 1;
        });
      },
      drawBarrage(danmu) {
        this.danmu = "";
        this.$nextTick(function() {
          this.danmu = danmu;
        });
      },
      refreshBarrage() {
        this.barrageRefresh = -1;
        this.$nextTick(function() {
          this.barrageRefresh = 1;
        });
      },
      switchFullscreen() {
        this.fullscreen = !this.fullscreen;
        this.switchDirection();
      },
      switchPictureInPicture() {
        this.pictureInPicture = !this.pictureInPicture;
      },
      launchPictureInPicture() {
        this.pictureInPicture = true;
      },
      exitPictureInPicture() {
        this.pictureInPicture = false;
      },
      launchFullscreen() {
        this.fullscreen = true;
        this.switchDirection();
      },
      exitFullscreen() {
        this.fullscreen = false;
        this.switchDirection();
      },
      switchDirection() {
        if (this.fullscreen) {
          plus.screen.lockOrientation(this.fullscreenDirection);
        } else {
          plus.screen.lockOrientation(this.generallyDirection);
        }
      },
      fullscreenChange(e) {
        this.fullscreen = e.fullscreen;
        this.$emit("fullscreenChange", e);
        this.switchDirection();
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "yingbing-video",
      id: "yb-video" + $props.dataId,
      "data-title": $props.title,
      "data-poster": $props.poster,
      "data-formats": $props.formats,
      "data-duration": $props.duration,
      "data-muted": $props.muted,
      "data-autoplay": $props.autoplay,
      "data-initialTime": $props.initialTime,
      "data-loop": $props.loop,
      "data-preload": $props.preload,
      "data-settings": $props.settings,
      "data-controls": $props.controls,
      "data-progressShow": $props.progressShow,
      "data-prevBtnShow": $props.prevBtnShow,
      "data-nextBtnShow": $props.nextBtnShow,
      "data-playShow": $props.playShow,
      "data-timeShow": $props.timeShow,
      "data-volumeShow": $props.volumeShow,
      "data-settingShow": $props.settingShow,
      "data-fullscreenShow": $props.fullscreenShow,
      "data-mirror": $props.mirror,
      "data-volume": $props.volume,
      "data-playbackRate": $props.playbackRate,
      "data-longpressPlaybackRate": $props.longpressPlaybackRate,
      "data-barrageShow": $props.barrageShow,
      "data-barrageGap": $props.barrageGap,
      "data-isLive": $props.isLive,
      "data-generallyDirection": $props.generallyDirection,
      "data-fullscreenDirection": $props.fullscreenDirection,
      "data-objectFit": $props.objectFit,
      "data-crossOrigin": $props.crossOrigin,
      "data-enableBlob": $props.enableBlob,
      "data-enableLongpressPlaybackRate": $props.enableLongpressPlaybackRate,
      "data-enableDoubleToggle": $props.enableDoubleToggle,
      "data-pictureInPicture": $data.pictureInPicture,
      "data-fullscreen": $data.fullscreen,
      barrages: vue.wp($props.barrages),
      "change:barrages": _ctx.ybVideo.barragesWatcher,
      barrageConfig: vue.wp($props.barrageConfig),
      "change:barrageConfig": _ctx.ybVideo.barrageConfigWatcher,
      fullscreen: vue.wp($data.fullscreen),
      "change:fullscreen": _ctx.ybVideo.fullscreenWatcher,
      flvConfig: vue.wp($props.flvConfig),
      "change:flvConfig": _ctx.ybVideo.flvConfigWatcher,
      state: vue.wp($data.state),
      "change:state": _ctx.ybVideo.stateWatcher,
      seekTime: vue.wp($data.seekTime),
      "change:seekTime": _ctx.ybVideo.seekTimeWatcher,
      danmu: vue.wp($data.danmu),
      "change:danmu": _ctx.ybVideo.danmuWatcher,
      captureEvent: vue.wp($data.captureEvent),
      "change:captureEvent": _ctx.ybVideo.captureEventWatcher,
      barrageRefresh: vue.wp($data.barrageRefresh),
      "change:barrageRefresh": _ctx.ybVideo.barrageRefreshWatcher,
      prop: vue.wp($options.prop),
      "change:prop": _ctx.ybVideo.propWatcher,
      ready: vue.wp($data.ready),
      "change:ready": _ctx.ybVideo.readyWatcher,
      src: vue.wp($props.src),
      "change:src": _ctx.ybVideo.srcWatcher,
      segments: vue.wp($props.segments),
      "change:segments": _ctx.ybVideo.segmentsWatcher
    }, [
      vue.createElementVNode("view", { class: "ybplayer-slots" }, [
        vue.createElementVNode("view", { class: "ybplayer-controls-slots" }, [
          vue.renderSlot(_ctx.$slots, "controls", {}, void 0, true)
        ]),
        vue.createElementVNode("view", { class: "ybplayer-default-slots" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])
      ])
    ], 8, ["id", "data-title", "data-poster", "data-formats", "data-duration", "data-muted", "data-autoplay", "data-initialTime", "data-loop", "data-preload", "data-settings", "data-controls", "data-progressShow", "data-prevBtnShow", "data-nextBtnShow", "data-playShow", "data-timeShow", "data-volumeShow", "data-settingShow", "data-fullscreenShow", "data-mirror", "data-volume", "data-playbackRate", "data-longpressPlaybackRate", "data-barrageShow", "data-barrageGap", "data-isLive", "data-generallyDirection", "data-fullscreenDirection", "data-objectFit", "data-crossOrigin", "data-enableBlob", "data-enableLongpressPlaybackRate", "data-enableDoubleToggle", "data-pictureInPicture", "data-fullscreen", "barrages", "change:barrages", "barrageConfig", "change:barrageConfig", "fullscreen", "change:fullscreen", "flvConfig", "change:flvConfig", "state", "change:state", "seekTime", "change:seekTime", "danmu", "change:danmu", "captureEvent", "change:captureEvent", "barrageRefresh", "change:barrageRefresh", "prop", "change:prop", "ready", "change:ready", "src", "change:src", "segments", "change:segments"]);
  }
  if (typeof block0 === "function")
    block0(_sfc_main$9);
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-72cc154e"], ["__file", "D:/hbuilderx/Projects/pilipili/uni_modules/yingbing-video/components/yingbing-video/yingbing-video.vue"]]);
  const _sfc_main$8 = {
    name: "uniCollapseItem",
    props: {
      // 列表标题
      title: {
        type: String,
        default: ""
      },
      name: {
        type: [Number, String],
        default: ""
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否显示动画,app 端默认不开启动画，卡顿严重
      showAnimation: {
        type: Boolean,
        default: false
      },
      // 是否展开
      open: {
        type: Boolean,
        default: false
      },
      // 缩略图
      thumb: {
        type: String,
        default: ""
      },
      // 标题分隔线显示类型
      titleBorder: {
        type: String,
        default: "auto"
      },
      border: {
        type: Boolean,
        default: true
      },
      showArrow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      const elId = `Uni_${Math.ceil(Math.random() * 1e6).toString(36)}`;
      return {
        isOpen: false,
        isheight: null,
        height: 0,
        elId,
        nameSync: 0
      };
    },
    watch: {
      open(val) {
        this.isOpen = val;
        this.onClick(val, "init");
      }
    },
    updated(e) {
      this.$nextTick(() => {
        this.init(true);
      });
    },
    created() {
      this.collapse = this.getCollapse();
      this.oldHeight = 0;
      this.onClick(this.open, "init");
    },
    // TODO vue3
    unmounted() {
      this.__isUnmounted = true;
      this.uninstall();
    },
    mounted() {
      if (!this.collapse)
        return;
      if (this.name !== "") {
        this.nameSync = this.name;
      } else {
        this.nameSync = this.collapse.childrens.length + "";
      }
      if (this.collapse.names.indexOf(this.nameSync) === -1) {
        this.collapse.names.push(this.nameSync);
      } else {
        formatAppLog("warn", "at uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.vue:154", `name 值 ${this.nameSync} 重复`);
      }
      if (this.collapse.childrens.indexOf(this) === -1) {
        this.collapse.childrens.push(this);
      }
      this.init();
    },
    methods: {
      init(type) {
        this.getCollapseHeight(type);
      },
      uninstall() {
        if (this.collapse) {
          this.collapse.childrens.forEach((item, index) => {
            if (item === this) {
              this.collapse.childrens.splice(index, 1);
            }
          });
          this.collapse.names.forEach((item, index) => {
            if (item === this.nameSync) {
              this.collapse.names.splice(index, 1);
            }
          });
        }
      },
      onClick(isOpen, type) {
        if (this.disabled)
          return;
        this.isOpen = isOpen;
        if (this.isOpen && this.collapse) {
          this.collapse.setAccordion(this);
        }
        if (type !== "init") {
          this.collapse.onChange(isOpen, this);
        }
      },
      getCollapseHeight(type, index = 0) {
        const views = uni.createSelectorQuery().in(this);
        views.select(`#${this.elId}`).fields({
          size: true
        }, (data) => {
          if (index >= 10)
            return;
          if (!data) {
            index++;
            this.getCollapseHeight(false, index);
            return;
          }
          this.height = data.height;
          this.isheight = true;
          if (type)
            return;
          this.onClick(this.isOpen, "init");
        }).exec();
      },
      getNvueHwight(type) {
        dom.getComponentRect(this.$refs["collapse--hook"], (option) => {
          if (option && option.result && option.size) {
            this.height = option.size.height;
            this.isheight = true;
            if (type)
              return;
            this.onClick(this.open, "init");
          }
        });
      },
      /**
       * 获取父元素实例
       */
      getCollapse(name = "uniCollapse") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-collapse-item" }, [
      vue.createCommentVNode(" onClick(!isOpen) "),
      vue.createElementVNode(
        "view",
        {
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick(!$data.isOpen)),
          class: vue.normalizeClass(["uni-collapse-item__title", { "is-open": $data.isOpen && $props.titleBorder === "auto", "uni-collapse-item-border": $props.titleBorder !== "none" }])
        },
        [
          vue.createElementVNode("view", { class: "uni-collapse-item__title-wrap" }, [
            vue.renderSlot(_ctx.$slots, "title", {}, () => [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["uni-collapse-item__title-box", { "is-disabled": $props.disabled }])
                },
                [
                  $props.thumb ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    src: $props.thumb,
                    class: "uni-collapse-item__title-img"
                  }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "text",
                    { class: "uni-collapse-item__title-text" },
                    vue.toDisplayString($props.title),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )
            ], true)
          ]),
          $props.showArrow ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: vue.normalizeClass([{ "uni-collapse-item__title-arrow-active": $data.isOpen, "uni-collapse-item--animation": $props.showAnimation === true }, "uni-collapse-item__title-arrow"])
            },
            [
              vue.createVNode(_component_uni_icons, {
                color: $props.disabled ? "#ddd" : "#bbb",
                size: "14",
                type: "bottom"
              }, null, 8, ["color"])
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uni-collapse-item__wrap", { "is--transition": $props.showAnimation }]),
          style: vue.normalizeStyle({ height: ($data.isOpen ? $data.height : 0) + "px" })
        },
        [
          vue.createElementVNode("view", {
            id: $data.elId,
            ref: "collapse--hook",
            class: vue.normalizeClass(["uni-collapse-item__wrap-content", { open: $data.isheight, "uni-collapse-item--border": $props.border && $data.isOpen }])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 10, ["id"])
        ],
        6
        /* CLASS, STYLE */
      )
    ]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-3d2dde9f"], ["__file", "D:/hbuilderx/Projects/pilipili/uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.vue"]]);
  const _sfc_main$7 = {
    name: "uniCollapse",
    emits: ["change", "activeItem", "input", "update:modelValue"],
    props: {
      value: {
        type: [String, Array],
        default: ""
      },
      modelValue: {
        type: [String, Array],
        default: ""
      },
      accordion: {
        // 是否开启手风琴效果
        type: [Boolean, String],
        default: false
      }
    },
    data() {
      return {};
    },
    computed: {
      // TODO 兼容 vue2 和 vue3
      dataValue() {
        let value = typeof this.value === "string" && this.value === "" || Array.isArray(this.value) && this.value.length === 0;
        let modelValue = typeof this.modelValue === "string" && this.modelValue === "" || Array.isArray(this.modelValue) && this.modelValue.length === 0;
        if (value) {
          return this.modelValue;
        }
        if (modelValue) {
          return this.value;
        }
        return this.value;
      }
    },
    watch: {
      dataValue(val) {
        this.setOpen(val);
      }
    },
    created() {
      this.childrens = [];
      this.names = [];
    },
    mounted() {
      this.$nextTick(() => {
        this.setOpen(this.dataValue);
      });
    },
    methods: {
      setOpen(val) {
        let str = typeof val === "string";
        let arr = Array.isArray(val);
        this.childrens.forEach((vm, index) => {
          if (str) {
            if (val === vm.nameSync) {
              if (!this.accordion) {
                formatAppLog("warn", "at uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue:75", "accordion 属性为 false ,v-model 类型应该为 array");
                return;
              }
              vm.isOpen = true;
            }
          }
          if (arr) {
            val.forEach((v) => {
              if (v === vm.nameSync) {
                if (this.accordion) {
                  formatAppLog("warn", "at uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue:85", "accordion 属性为 true ,v-model 类型应该为 string");
                  return;
                }
                vm.isOpen = true;
              }
            });
          }
        });
        this.emit(val);
      },
      setAccordion(self) {
        if (!this.accordion)
          return;
        this.childrens.forEach((vm, index) => {
          if (self !== vm) {
            vm.isOpen = false;
          }
        });
      },
      resize() {
        this.childrens.forEach((vm, index) => {
          vm.getCollapseHeight();
        });
      },
      onChange(isOpen, self) {
        let activeItem = [];
        if (this.accordion) {
          activeItem = isOpen ? self.nameSync : "";
        } else {
          this.childrens.forEach((vm, index) => {
            if (vm.isOpen) {
              activeItem.push(vm.nameSync);
            }
          });
        }
        this.$emit("change", activeItem);
        this.emit(activeItem);
      },
      emit(val) {
        this.$emit("input", val);
        this.$emit("update:modelValue", val);
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-collapse" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-3f050360"], ["__file", "D:/hbuilderx/Projects/pilipili/uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue"]]);
  const _imports_0 = "/static/views_gray.svg";
  const _imports_1 = "/static/barrages_gray.svg";
  const _sfc_main$6 = {
    name: "RelatedVideos",
    props: {
      relatedVideos: Array
    },
    data() {
      return {};
    },
    methods: {
      gotoVideo(video) {
        uni.setStorageSync("videoInfo", video);
        uni.navigateTo({
          url: `/pages/video/video?videoid=${video.videoid}`
        });
      },
      format(num) {
        if (num >= 1e4) {
          let formatted = (num / 1e4).toFixed(1);
          return formatted.endsWith(".0") ? formatted.slice(0, -2) + "万" : formatted + "万";
        }
        return num;
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$1);
    return vue.openBlock(true), vue.createElementBlock(
      vue.Fragment,
      null,
      vue.renderList($props.relatedVideos, (related) => {
        return vue.openBlock(), vue.createElementBlock("view", {
          key: related.videoid,
          class: "related-item",
          onClick: ($event) => $options.gotoVideo(related)
        }, [
          vue.createCommentVNode(" 视频封面 "),
          vue.createElementVNode("view", { class: "related-image-container" }, [
            vue.createElementVNode("image", {
              src: related.cover,
              class: "related-image"
            }, null, 8, ["src"]),
            vue.createElementVNode(
              "view",
              { class: "related-time" },
              vue.toDisplayString(related.time),
              1
              /* TEXT */
            )
          ]),
          vue.createCommentVNode(" 视频信息 "),
          vue.createElementVNode("view", { class: "related-stats" }, [
            vue.createElementVNode(
              "text",
              { class: "related-title" },
              vue.toDisplayString(related.title),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "related-username" }, [
              vue.createVNode(_component_uni_icons, {
                type: "person",
                size: "30rpx"
              }),
              vue.createTextVNode(
                " " + vue.toDisplayString(related.username),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { style: { "display": "flex", "align-items": "center" } }, [
              vue.createElementVNode("image", {
                src: _imports_0,
                class: "related-icon"
              }),
              vue.createElementVNode(
                "text",
                { class: "related-views" },
                vue.toDisplayString($options.format(related.views)),
                1
                /* TEXT */
              ),
              vue.createElementVNode("image", {
                src: _imports_1,
                class: "related-icon"
              }),
              vue.createElementVNode(
                "text",
                { class: "related-barrages" },
                vue.toDisplayString($options.format(related.barrages)),
                1
                /* TEXT */
              )
            ])
          ])
        ], 8, ["onClick"]);
      }),
      128
      /* KEYED_FRAGMENT */
    );
  }
  const RelatedVideos = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-df0b614b"], ["__file", "D:/hbuilderx/Projects/pilipili/components/related-videos.vue"]]);
  const _sfc_main$5 = {
    components: {
      NavTabs,
      RelatedVideos
    },
    data() {
      return {
        showControls: true,
        currentTab: "abstracts",
        videoid: null,
        videoData: {},
        videoComplement: {},
        action: {
          liked: false,
          collected: false,
          shared: false
        },
        comments: [],
        relatedVideos: [
          {
            videoid: 5,
            title: "我看到的和我画的",
            cover: "https://n.sinaimg.cn//sinakd20122//121//w1441h1080//20200519//7d3b-itvqcca5339779.jpg",
            views: 1169,
            barrages: 5,
            time: "1:07",
            username: "MORNCOLOUR"
          },
          {
            videoid: 6,
            title: "128秒看完《哪吒2》",
            cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 628e3,
            barrages: 592,
            time: "2:08",
            username: "神奇的大智"
          },
          {
            videoid: 7,
            title: "今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！",
            cover: "https://th.bing.com//th//id//OIP.ECINZWIzQunW4_8_pdbDuAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 16e4,
            barrages: 3230,
            time: "0:15",
            username: "芝士阿毛"
          },
          {
            videoid: 8,
            title: "我看到的和我画的",
            cover: "https://n.sinaimg.cn//sinakd20122//121//w1441h1080//20200519//7d3b-itvqcca5339779.jpg",
            views: 449e3,
            barrages: 242,
            time: "1:07",
            username: "MORNCOLOUR"
          },
          {
            videoid: 9,
            title: "128秒看完《哪吒2》",
            cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 628e3,
            barrages: 592,
            time: "2:08",
            username: "神奇的大智"
          },
          {
            videoid: 10,
            title: "我看到的和我画的",
            cover: "https://n.sinaimg.cn//sinakd20122//121//w1441h1080//20200519//7d3b-itvqcca5339779.jpg",
            views: 1169,
            barrages: 5,
            time: "1:07",
            username: "MORNCOLOUR"
          },
          {
            videoid: 11,
            title: "128秒看完《哪吒2》",
            cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 628e3,
            barrages: 592,
            time: "2:08",
            username: "神奇的大智"
          },
          {
            videoid: 12,
            title: "今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！",
            cover: "https://th.bing.com//th//id//OIP.ECINZWIzQunW4_8_pdbDuAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 16e4,
            barrages: 3230,
            time: "0:15",
            username: "芝士阿毛"
          },
          {
            videoid: 13,
            title: "我看到的和我画的",
            cover: "https://n.sinaimg.cn//sinakd20122//121//w1441h1080//20200519//7d3b-itvqcca5339779.jpg",
            views: 1169,
            barrages: 5,
            time: "1:07",
            username: "MORNCOLOUR"
          },
          {
            videoid: 14,
            title: "128秒看完《哪吒2》",
            cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 628e3,
            barrages: 592,
            time: "2:08",
            username: "神奇的大智"
          },
          {
            videoid: 15,
            title: "今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！",
            cover: "https://th.bing.com//th//id//OIP.ECINZWIzQunW4_8_pdbDuAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 16e4,
            barrages: 3230,
            time: "0:15",
            username: "芝士阿毛"
          },
          {
            videoid: 16,
            title: "我看到的和我画的",
            cover: "https://n.sinaimg.cn//sinakd20122//121//w1441h1080//20200519//7d3b-itvqcca5339779.jpg",
            views: 449e3,
            barrages: 242,
            time: "1:07",
            username: "MORNCOLOUR"
          },
          {
            videoid: 17,
            title: "128秒看完《哪吒2》",
            cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 628e3,
            barrages: 592,
            time: "2:08",
            username: "神奇的大智"
          },
          {
            videoid: 18,
            title: "我看到的和我画的",
            cover: "https://n.sinaimg.cn//sinakd20122//121//w1441h1080//20200519//7d3b-itvqcca5339779.jpg",
            views: 1169,
            barrages: 5,
            time: "1:07",
            username: "MORNCOLOUR"
          },
          {
            videoid: 19,
            title: "128秒看完《哪吒2》",
            cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 628e3,
            barrages: 592,
            time: "2:08",
            username: "神奇的大智"
          },
          {
            videoid: 20,
            title: "今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！",
            cover: "https://th.bing.com//th//id//OIP.ECINZWIzQunW4_8_pdbDuAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 16e4,
            barrages: 3230,
            time: "0:15",
            username: "芝士阿毛"
          }
        ],
        user: {
          // userid: 1, （已知）
          // username: '芝士阿毛', 根据userid得到下面完整信息
          avatar: "/static/avatar.jpg",
          fans: 53e3,
          videonum: 108
        },
        barrages: [
          {
            key: "fctc651a9pm2j20bia8j",
            time: 1,
            text: "这是新增的一条弹幕"
          },
          {
            key: "fctc651a9pm2j20bia8q",
            time: 1,
            text: "这是新增的一条弹幕",
            fontSize: 16,
            color: "#0ff"
          },
          {
            key: "fctc651a9pm2j20bi8jw",
            time: 3,
            text: "这是第3秒的弹幕",
            color: "#ccc"
          }
        ],
        barrageConfig: {
          speed: 100,
          defaultColor: "#000000",
          fontSize: 20,
          textShadowBlur: 0
        }
      };
    },
    computed: {
      tabs() {
        return [
          {
            text: "简介",
            value: "abstracts"
          },
          {
            text: `评论（${this.videoComplement.comments})`,
            value: "comments"
          }
        ];
      }
    },
    onLoad(options) {
      this.videoid = options.videoid;
      this.videoData = uni.getStorageSync("videoInfo") || {};
      this.fetchVideoComplement();
    },
    onReady() {
      this.videoContext = uni.createVideoContext("myVideo");
    },
    methods: {
      handleTabChange(tab) {
        this.currentTab = tab;
      },
      format(num) {
        if (num >= 1e4) {
          let formatted = (num / 1e4).toFixed(1);
          return formatted.endsWith(".0") ? formatted.slice(0, -2) + "万" : formatted + "万";
        }
        return num;
      },
      toggleLike() {
        this.action.liked = !this.action.liked;
        this.videoComplement.likes += this.action.liked ? 1 : -1;
      },
      toggleCollect() {
        this.action.collected = !this.action.collected;
        this.videoComplement.collections += this.action.collected ? 1 : -1;
      },
      toggleShare() {
        this.action.shared = !this.action.shared;
        this.videoComplement.forwards += this.action.shared ? 1 : -1;
      },
      convert(number) {
        return number < 10 ? "0" + number : number;
      },
      // 获取 videoComplement 数据
      async fetchVideoComplement() {
        try {
          const res = await uni.request({
            url: API_BASE_URL + "videoBuss/getVideo",
            method: "GET",
            data: {
              videoid: this.videoid
            }
          });
          if (res.statusCode === 200) {
            this.videoComplement = res.data;
            this.videoComplement.tags = JSON.parse(this.videoComplement.tags.replace(/'/g, '"'));
            let date = new Date(this.videoComplement.releasetime * 1e3);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hours = this.convert(date.getHours());
            let minutes = this.convert(date.getMinutes());
            let seconds = this.convert(date.getSeconds());
            this.videoComplement.releasetime = year + "年" + month + "月" + day + "日 " + hours + ":" + minutes + ":" + seconds;
            this.videoComplement.url = API_RESOURCES_URL + this.videoComplement.url;
            formatAppLog("log", "at pages/video/video.vue:366", this.videoComplement);
          } else {
            formatAppLog("error", "at pages/video/video.vue:368", "请求失败:", res);
            uni.showToast({
              title: "数据加载失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/video/video.vue:375", "网络请求错误:", error);
          uni.showToast({
            title: "网络请求失败",
            icon: "none"
          });
        }
      },
      back() {
        uni.navigateBack();
      },
      fullscreenChange() {
        this.showControls = !this.showControls;
      }
      // doubleSpeed() {
      // 	let videoContext = uni.createVideoContext('myVideo', this);
      // 	videoContext.playbackRate(1.5);
      // 	__f__('log','at pages/video/video.vue:391',1);
      // },
      // sendDanmu() {
      // 	this.videoContext.sendDanmu({
      // 		text: this.danmuValue,
      // 		color: this.getRandomColor()
      // 	});
      // 	this.danmuValue = '';
      // },
      // videoErrorCallback: function(e) {
      // 	uni.showModal({
      // 		content: e.target.errMsg,
      // 		showCancel: false
      // 	})
      // },
      // getRandomColor: function() {
      // 	const rgb = []
      // 	for (let i = 0; i < 3; ++i) {
      // 		let color = Math.floor(Math.random() * 256).toString(16)
      // 		color = color.length == 1 ? '0' + color : color
      // 		rgb.push(color)
      // 	}
      // 	return '#' + rgb.join('')
      // }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_StatusBar = vue.resolveComponent("StatusBar");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$1);
    const _component_yingbing_video = resolveEasycom(vue.resolveDynamicComponent("yingbing-video"), __easycom_1);
    const _component_NavTabs = vue.resolveComponent("NavTabs");
    const _component_uni_collapse_item = resolveEasycom(vue.resolveDynamicComponent("uni-collapse-item"), __easycom_2);
    const _component_uni_collapse = resolveEasycom(vue.resolveDynamicComponent("uni-collapse"), __easycom_3);
    const _component_RelatedVideos = vue.resolveComponent("RelatedVideos");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createVNode(_component_StatusBar),
        vue.createElementVNode("view", { class: "container" }, [
          vue.createCommentVNode(" 视频播放器 "),
          vue.createCommentVNode(' 		<video id="myVideo" :src="videoComplement.url" class="video-player" autoplay controls danmu-btn enable-danmu\r\n			:danmu-list="danmuList" object-fit="fill" :title="videoData.title" vslide-gesture="true"\r\n			vslide-gesture-in-fullscreen="true">\r\n			<cover-view class="back-button" @click="back">\r\n				<</cover-view>\r\n					<cover-view style="position: absolute;top: 128rpx;right: 60rpx;"\r\n						@click="doubleSpeed">倍速</cover-view>\r\n		</video> '),
          vue.createVNode(_component_yingbing_video, {
            src: $data.videoComplement.url,
            style: { "width": "100%", "height": "450rpx" },
            autoplay: "",
            preload: "meta",
            title: $data.videoData.title,
            onFullscreenChange: $options.fullscreenChange,
            settings: "barrage,playbackRate,mirror",
            "object-fit": "contain",
            barrages: $data.barrages,
            barrageShow: "",
            "barrage-config": $data.barrageConfig
          }, {
            controls: vue.withCtx(() => [
              vue.withDirectives(vue.createVNode(_component_uni_icons, {
                class: "back-button",
                type: "left",
                size: "40rpx",
                color: "#FFF",
                onClick: $options.back
              }, null, 8, ["onClick"]), [
                [vue.vShow, $data.showControls]
              ])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["src", "title", "onFullscreenChange", "barrages", "barrage-config"]),
          vue.createCommentVNode(" 简介、评论 "),
          vue.createVNode(_component_NavTabs, {
            activeTab: $data.currentTab,
            tabs: $options.tabs,
            onTabChange: $options.handleTabChange
          }, null, 8, ["activeTab", "tabs", "onTabChange"]),
          vue.createCommentVNode(" 简介页面 "),
          vue.createElementVNode("scroll-view", {
            "scroll-y": "",
            style: { "height": "995rpx" }
          }, [
            vue.withDirectives(vue.createElementVNode(
              "view",
              { style: { "padding": "15rpx 15rpx 0rpx 15rpx" } },
              [
                vue.createCommentVNode(" 作者信息 "),
                vue.createElementVNode("view", {
                  class: "user-info",
                  onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onVideoClick && _ctx.onVideoClick(...args))
                }, [
                  vue.createElementVNode("view", { style: { "position": "relative", "min-width": "350rpx" } }, [
                    vue.createElementVNode("image", {
                      class: "avatar",
                      src: $data.user.avatar
                    }, null, 8, ["src"]),
                    vue.createElementVNode(
                      "text",
                      { class: "username" },
                      vue.toDisplayString($data.videoData.username),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "userfans" },
                      vue.toDisplayString($options.format($data.user.fans)) + "粉丝 " + vue.toDisplayString($data.user.videonum) + "视频",
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "attent-button" }, "+ 关注")
                ]),
                vue.createCommentVNode(" 视频信息 采用折叠面板"),
                vue.createVNode(_component_uni_collapse, { style: { "padding-top": "10rpx", "padding-bottom": "10rpx", "max-width": "96%" } }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_collapse_item, {
                      "title-border": "none",
                      border: false
                    }, {
                      title: vue.withCtx(() => [
                        vue.createElementVNode(
                          "view",
                          { class: "video-title" },
                          vue.toDisplayString($data.videoData.title),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "flex-start", "align-items": "center", "margin": "10rpx 0rpx" } }, [
                          vue.createElementVNode("image", {
                            src: _imports_0,
                            class: "stats-icon"
                          }),
                          vue.createElementVNode(
                            "text",
                            { class: "views_barrages" },
                            vue.toDisplayString($options.format($data.videoData.views)),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode("image", {
                            src: _imports_1,
                            class: "stats-icon"
                          }),
                          vue.createElementVNode(
                            "text",
                            { class: "views_barrages" },
                            vue.toDisplayString($options.format($data.videoData.barrages)),
                            1
                            /* TEXT */
                          ),
                          vue.createElementVNode(
                            "text",
                            { class: "views_barrages" },
                            vue.toDisplayString($data.videoComplement.releasetime),
                            1
                            /* TEXT */
                          )
                        ])
                      ]),
                      default: vue.withCtx(() => [
                        vue.createElementVNode(
                          "text",
                          { style: { "color": "#69686d", "font-size": "26rpx" } },
                          vue.toDisplayString($data.videoComplement.abstracts),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { style: { "display": "flex", "gap": "20rpx", "flex-wrap": "wrap", "margin-top": "15rpx" } }, [
                          (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            null,
                            vue.renderList($data.videoComplement.tags, (tag) => {
                              return vue.openBlock(), vue.createElementBlock(
                                "text",
                                { class: "tag" },
                                vue.toDisplayString(tag),
                                1
                                /* TEXT */
                              );
                            }),
                            256
                            /* UNKEYED_FRAGMENT */
                          ))
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createCommentVNode(" 点赞、收藏、分享 "),
                vue.createElementVNode("view", { class: "actions" }, [
                  vue.createElementVNode("view", {
                    class: "action-item",
                    onClick: _cache[1] || (_cache[1] = (...args) => $options.toggleLike && $options.toggleLike(...args))
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: $data.action.liked ? "hand-up-filled" : "hand-up",
                      size: "66rpx;"
                    }, null, 8, ["type"]),
                    vue.createElementVNode(
                      "view",
                      { class: "likes" },
                      vue.toDisplayString($options.format($data.videoComplement.likes)),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", {
                    class: "action-item",
                    onClick: _cache[2] || (_cache[2] = (...args) => $options.toggleCollect && $options.toggleCollect(...args))
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: $data.action.collected ? "star-filled" : "star",
                      size: "66rpx;"
                    }, null, 8, ["type"]),
                    vue.createElementVNode(
                      "text",
                      { class: "likes" },
                      vue.toDisplayString($options.format($data.videoComplement.collections)),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", {
                    class: "action-item",
                    onClick: _cache[3] || (_cache[3] = (...args) => $options.toggleShare && $options.toggleShare(...args))
                  }, [
                    vue.createVNode(_component_uni_icons, {
                      type: $data.action.shared ? "redo-filled" : "redo",
                      size: "66rpx;"
                    }, null, 8, ["type"]),
                    vue.createElementVNode(
                      "text",
                      { class: "likes" },
                      vue.toDisplayString($options.format($data.videoComplement.forwards)),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createCommentVNode(" 相关视频推荐 "),
                vue.createVNode(_component_RelatedVideos, { "related-videos": $data.relatedVideos }, null, 8, ["related-videos"])
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, $data.currentTab === "abstracts"]
            ]),
            vue.createCommentVNode(" 评论区页面 "),
            vue.withDirectives(vue.createElementVNode(
              "view",
              { class: "comments-section" },
              [
                vue.createElementVNode("text", { class: "section-title" }, "评论"),
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.comments, (comment) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: comment.id,
                      class: "comment-item"
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "comment-author" },
                        vue.toDisplayString(comment.author) + ":",
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "comment-content" },
                        vue.toDisplayString(comment.content),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, $data.currentTab === "comments"]
            ])
          ])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesVideoVideo = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__file", "D:/hbuilderx/Projects/pilipili/pages/video/video.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" <StatusBar /> "),
        vue.createElementVNode("view")
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesDynamicDynamic = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__file", "D:/hbuilderx/Projects/pilipili/pages/dynamic/dynamic.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {
        searchText: "",
        // 搜索框输入
        searchHistory: [
          "元宵",
          "第五人格",
          "deepseek",
          "捏捏乐",
          "游戏实况",
          "元宵",
          "第五人格",
          "deepseek",
          "捏捏乐",
          "游戏实况"
        ],
        // 模拟搜索历史
        hotSearchList: []
      };
    },
    onLoad() {
      this.fetchHotSearchList();
    },
    methods: {
      search() {
        if (!this.searchText.trim())
          return;
        if (!this.searchHistory.includes(this.searchText)) {
          this.searchHistory.unshift(this.searchText);
          if (this.searchHistory.length > 10)
            this.searchHistory.pop();
        }
        uni.navigateTo({
          url: `/pages/search/searchResult?query=${this.searchText}`,
          success: () => {
            this.searchText = "";
          }
        });
      },
      back() {
        uni.switchTab({
          url: "/pages/index/index"
        });
      },
      searchFromHistory(item) {
        this.searchText = item;
        this.search();
      },
      clearHistory() {
        this.searchHistory = [];
      },
      goHotSearch(title) {
        uni.navigateTo({
          url: `/pages/search/searchResult?query=${title}`
        });
      },
      // 获取热搜列表
      async fetchHotSearchList() {
        try {
          const res = await uni.request({
            url: API_BASE_URL + "hotSearchBuss/hotSearch",
            // 替换为实际的后端接口地址
            method: "GET"
          });
          if (res.statusCode === 200) {
            this.hotSearchList = res.data;
          } else {
            formatAppLog("error", "at pages/search/search.vue:96", "请求失败:", res);
            uni.showToast({
              title: "数据加载失败",
              icon: "none"
            });
          }
        } catch (error) {
          formatAppLog("error", "at pages/search/search.vue:103", "网络请求错误:", error);
          uni.showToast({
            title: "网络请求失败",
            icon: "none"
          });
        }
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_StatusBar = vue.resolveComponent("StatusBar");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createVNode(_component_StatusBar),
        vue.createElementVNode("view", { class: "container" }, [
          vue.createCommentVNode(" 顶部搜索栏 "),
          vue.createElementVNode("view", { class: "top-bar" }, [
            vue.createVNode(_component_uni_icons, {
              type: "left",
              size: "40rpx;",
              onClick: $options.back
            }, null, 8, ["onClick"]),
            vue.createElementVNode("view", { class: "search-bar" }, [
              vue.createVNode(_component_uni_icons, {
                type: "search",
                size: "36rpx",
                style: { "margin-right": "15rpx" }
              }),
              vue.withDirectives(vue.createElementVNode("input", {
                style: { "font-size": "28rpx", "width": "390rpx" },
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.searchText = $event),
                type: "text",
                focus: "",
                placeholder: $data.searchHistory[Math.floor(Math.random() * $data.searchHistory.length)],
                "placeholder-style": "font-size: 28rpx;",
                "cursor-color": "#fe58a4",
                onConfirm: _cache[1] || (_cache[1] = (...args) => $options.search && $options.search(...args))
              }, null, 40, ["placeholder"]), [
                [vue.vModelText, $data.searchText]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                {
                  onClick: _cache[2] || (_cache[2] = ($event) => $data.searchText = "")
                },
                [
                  vue.createVNode(_component_uni_icons, {
                    type: "clear",
                    size: "36rpx",
                    color: "#69686d;"
                  })
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, $data.searchText]
              ])
            ]),
            vue.createElementVNode("text", {
              class: "search-btn",
              onClick: _cache[3] || (_cache[3] = (...args) => $options.search && $options.search(...args))
            }, "搜索")
          ]),
          vue.createCommentVNode(" 搜索历史 "),
          vue.createElementVNode("view", { class: "search-history" }, [
            vue.createElementVNode("view", { class: "title" }, [
              vue.createElementVNode("text", null, "搜索历史"),
              vue.createVNode(_component_uni_icons, {
                type: "trash",
                size: "38rpx;",
                color: "#69686d",
                onClick: $options.clearHistory
              }, null, 8, ["onClick"])
            ]),
            vue.createElementVNode("view", { class: "history-tags" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.searchHistory, (item) => {
                  return vue.openBlock(), vue.createElementBlock("text", {
                    class: "tag",
                    onClick: ($event) => $options.searchFromHistory(item)
                  }, vue.toDisplayString(item), 9, ["onClick"]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ])
          ]),
          vue.createCommentVNode(" pilipili热搜 "),
          vue.createElementVNode("view", { class: "hot-search" }, [
            vue.createElementVNode("view", { class: "title" }, "pillipili热搜"),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.hotSearchList, (item) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: item.id,
                  class: "hot-item",
                  onClick: ($event) => $options.goHotSearch(item.title)
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "hot-text" },
                    vue.toDisplayString(item.id || "") + "  " + vue.toDisplayString(item.title || ""),
                    1
                    /* TEXT */
                  ),
                  vue.withDirectives(vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["hot-tag", item.tagType])
                    },
                    vue.toDisplayString(item.tag || ""),
                    3
                    /* TEXT, CLASS */
                  ), [
                    [vue.vShow, item.tag]
                  ])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesSearchSearch = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__file", "D:/hbuilderx/Projects/pilipili/pages/search/search.vue"]]);
  const _sfc_main$2 = {
    components: {
      RelatedVideos,
      NavTabs
    },
    data() {
      return {
        searchText: "",
        debounceTimer: null,
        //用于防抖的计时器
        currentTab: "videos",
        tabs: [
          {
            text: "视频",
            value: "videos"
          },
          {
            text: "用户",
            value: "users"
          },
          {
            value: "filter"
          }
        ],
        currentZone: "不限",
        zones: ["不限", "生活", "美食", "游戏", "音乐", "时尚", "知识", "娱乐", "影视", "动画", "汽车", "动物圈", "科技", "运动", "鬼畜"],
        relatedVideos: [
          {
            videoid: 5,
            title: "我看到的和我画的",
            cover: "https://n.sinaimg.cn//sinakd20122//121//w1441h1080//20200519//7d3b-itvqcca5339779.jpg",
            views: 1169,
            barrages: 5,
            time: "1:07",
            username: "MORNCOLOUR"
          },
          {
            videoid: 6,
            title: "128秒看完《哪吒2》",
            cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 628e3,
            barrages: 592,
            time: "2:08",
            username: "神奇的大智"
          },
          {
            videoid: 7,
            title: "今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！",
            cover: "https://th.bing.com//th//id//OIP.ECINZWIzQunW4_8_pdbDuAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 16e4,
            barrages: 3230,
            time: "0:15",
            username: "芝士阿毛"
          },
          {
            videoid: 8,
            title: "我看到的和我画的",
            cover: "https://n.sinaimg.cn//sinakd20122//121//w1441h1080//20200519//7d3b-itvqcca5339779.jpg",
            views: 449e3,
            barrages: 242,
            time: "1:07",
            username: "MORNCOLOUR"
          },
          {
            videoid: 9,
            title: "128秒看完《哪吒2》",
            cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 628e3,
            barrages: 592,
            time: "2:08",
            username: "神奇的大智"
          },
          {
            videoid: 10,
            title: "我看到的和我画的",
            cover: "https://n.sinaimg.cn//sinakd20122//121//w1441h1080//20200519//7d3b-itvqcca5339779.jpg",
            views: 1169,
            barrages: 5,
            time: "1:07",
            username: "MORNCOLOUR"
          },
          {
            videoid: 11,
            title: "128秒看完《哪吒2》",
            cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 628e3,
            barrages: 592,
            time: "2:08",
            username: "神奇的大智"
          },
          {
            videoid: 12,
            title: "今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！",
            cover: "https://th.bing.com//th//id//OIP.ECINZWIzQunW4_8_pdbDuAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 16e4,
            barrages: 3230,
            time: "0:15",
            username: "芝士阿毛"
          },
          {
            videoid: 13,
            title: "128秒看完《哪吒2》",
            cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 628e3,
            barrages: 592,
            time: "2:08",
            username: "神奇的大智"
          },
          {
            videoid: 14,
            title: "今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！",
            cover: "https://th.bing.com//th//id//OIP.ECINZWIzQunW4_8_pdbDuAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 16e4,
            barrages: 3230,
            time: "0:15",
            username: "芝士阿毛"
          },
          {
            videoid: 15,
            title: "128秒看完《哪吒2》",
            cover: "https://th.bing.com//th//id//OIF.wGKp55LBt8wSF8rHC2tGsg?w=295&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 628e3,
            barrages: 592,
            time: "2:08",
            username: "神奇的大智"
          },
          {
            videoid: 16,
            title: "今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！今年的新科状元居然是位女子！",
            cover: "https://th.bing.com//th//id//OIP.ECINZWIzQunW4_8_pdbDuAHaEK?w=263&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            views: 16e4,
            barrages: 3230,
            time: "0:15",
            username: "芝士阿毛"
          }
        ]
      };
    },
    onLoad(options) {
      this.searchText = options.query || "";
    },
    watch: {
      // 监听 searchText 的变化
      searchText: {
        handler(newVal, oldVal) {
          if (this.debounceTimer) {
            clearTimeout(this.debounceTimer);
          }
          this.debounceTimer = setTimeout(() => {
            if (newVal === "") {
              this.back();
            }
          }, 300);
        },
        immediate: true
        // 立即触发监听器
      }
    },
    methods: {
      back() {
        uni.redirectTo({
          url: "/pages/search/search"
        });
      },
      search() {
        if (!this.searchText.trim())
          return;
        uni.navigateTo({
          url: `/pages/search/searchResult?query=${this.searchText}`
        });
      },
      handleTabChange(tab) {
        this.currentTab = tab;
      },
      switchZone(zone) {
        this.currentZone = zone;
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_StatusBar = vue.resolveComponent("StatusBar");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$1);
    const _component_NavTabs = vue.resolveComponent("NavTabs");
    const _component_RelatedVideos = vue.resolveComponent("RelatedVideos");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createVNode(_component_StatusBar),
        vue.createElementVNode("view", { class: "container" }, [
          vue.createCommentVNode(" 顶部搜索栏 "),
          vue.createElementVNode("view", { class: "top-bar" }, [
            vue.createVNode(_component_uni_icons, {
              type: "left",
              size: "40rpx;",
              onClick: $options.back
            }, null, 8, ["onClick"]),
            vue.createElementVNode("view", { class: "search-bar" }, [
              vue.createVNode(_component_uni_icons, {
                type: "search",
                size: "36rpx",
                style: { "margin-right": "15rpx" }
              }),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  style: { "font-size": "28rpx", "width": "390rpx" },
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.searchText = $event),
                  type: "text",
                  "cursor-color": "#fe58a4",
                  onConfirm: _cache[1] || (_cache[1] = (...args) => $options.search && $options.search(...args))
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $data.searchText]
              ]),
              vue.createElementVNode("view", {
                onClick: _cache[2] || (_cache[2] = (...args) => $options.back && $options.back(...args))
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "clear",
                  size: "36rpx",
                  color: "#69686d;"
                })
              ])
            ]),
            vue.createElementVNode("text", {
              class: "search-btn",
              onClick: _cache[3] || (_cache[3] = (...args) => $options.search && $options.search(...args))
            }, "搜索")
          ]),
          vue.createCommentVNode(" 筛选框 "),
          vue.createVNode(_component_NavTabs, {
            activeTab: $data.currentTab,
            tabs: $data.tabs,
            onTabChange: $options.handleTabChange
          }, null, 8, ["activeTab", "tabs", "onTabChange"]),
          vue.createElementVNode("scroll-view", {
            "scroll-y": "",
            style: { "height": "1380rpx" }
          }, [
            vue.createCommentVNode(" 视频搜索结果 "),
            vue.withDirectives(vue.createElementVNode(
              "view",
              { style: { "position": "relative" } },
              [
                vue.withDirectives(vue.createElementVNode(
                  "view",
                  { class: "filter" },
                  [
                    vue.createElementVNode("text", { style: { "font-size": "28rpx" } }, "内容分区"),
                    vue.createElementVNode("view", { style: { "display": "flex", "gap": "20rpx", "flex-wrap": "wrap", "margin": "10rpx 0rpx" } }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList($data.zones, (zone) => {
                          return vue.openBlock(), vue.createElementBlock("text", {
                            class: vue.normalizeClass(["zone", $data.currentZone === zone ? "active" : ""]),
                            onClick: ($event) => $options.switchZone(zone)
                          }, vue.toDisplayString(zone), 11, ["onClick"]);
                        }),
                        256
                        /* UNKEYED_FRAGMENT */
                      ))
                    ])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, $data.currentTab === "filter"]
                ]),
                vue.createVNode(_component_RelatedVideos, { "related-videos": $data.relatedVideos }, null, 8, ["related-videos"])
              ],
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, $data.currentTab === "videos" || $data.currentTab === "filter"]
            ]),
            vue.createCommentVNode(" 用户搜索结果 "),
            vue.withDirectives(vue.createElementVNode(
              "view",
              null,
              "1",
              512
              /* NEED_PATCH */
            ), [
              [vue.vShow, $data.currentTab === "users"]
            ])
          ])
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesSearchSearchResult = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "D:/hbuilderx/Projects/pilipili/pages/search/searchResult.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/profile/profile", PagesProfileProfile);
  __definePage("pages/video/video", PagesVideoVideo);
  __definePage("pages/dynamic/dynamic", PagesDynamicDynamic);
  __definePage("pages/search/search", PagesSearchSearch);
  __definePage("pages/search/searchResult", PagesSearchSearchResult);
  const _sfc_main$1 = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:8", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:11", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:14", "App Hide");
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return null;
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "D:/hbuilderx/Projects/pilipili/App.vue"]]);
  const _sfc_main = {
    name: "StatusBar",
    data() {
      return {};
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "status-bar" }, [
      vue.createCommentVNode(" 这里是状态栏 ")
    ]);
  }
  const StatusBar = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6ad8bb15"], ["__file", "D:/hbuilderx/Projects/pilipili/components/status-bar.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    app.component("StatusBar", StatusBar);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
