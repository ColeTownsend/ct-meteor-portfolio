// Generated by CoffeeScript 1.7.1
(function() {
    var Loading, SOCKS_COUNT, cart, cumulativeOffset, fade, grid, loading, logo, product,
    __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    };

    SOCKS_COUNT = 34;

    fade = (function() {
        var el, hidden, hide, hideTimeout, show;
        el = document.querySelector('#fade');
        el.style.display = 'none';
        hideTimeout = null;
        hidden = true;
        show = function() {
            hidden = false;
            el.style.display = 'block';
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
            hideTimeout = null;
            return setTimeout((function(_this) {
                return function() {
                    return el.className = 'visible';
                };
            })(this));
        };
        hide = function() {
            hidden = true;
            el.className = '';
            return hideTimeout = setTimeout(function() {
                return el.style.display = 'none';
            }, 450);
        };
        return {
            show: show,
            hide: hide,
            isHidden: function() {
                return hidden;
            }
        };
    })();

    cumulativeOffset = function(el) {
        var left, top;
        top = 0;
        left = 0;
        while (el) {
            top += el.offsetTop || 0;
            left += el.offsetLeft || 0;
            el = el.offsetParent;
        }
        return {
            top: top,
            left: left
        };
    };

    logo = (function() {
        var el, scrollFade, show, updateOffset;
        el = document.querySelector('#logo');
        el.addEventListener('click', function() {
            grid.closeCurrentItem();
            return cart.close();
        });
        scrollFade = 30;
        updateOffset = function(options) {
            var offset, scrollY;
            if (options == null) {
                options = {};
            }
            if (options.animated == null) {
                options.animated = false;
            }
            if (!fade.isHidden()) {
                return;
            }
            scrollY = Math.min(window.scrollY, scrollFade);
            offset = scrollY / scrollFade;
            dynamics.animate(el, {
                opacity: 1 - offset,
                translateY: - offset * 10
            }, {
                type: dynamics.easeInOut,
                duration: 300,
                animated: options.animated
            });
            if (offset >= 1) {
                return el.className = "hidden";
            } else {
                return el.className = "";
            }
        };
        show = function() {
            dynamics.animate(el, {
                opacity: 1,
                translateY: 0
            }, {
                type: dynamics.spring,
                duration: 500
            });
            return el.className = "";
        };
        return {
            show: show,
            updateOffset: updateOffset
        };
    })();

    product = (function() {
        var button, closeButtonEl, closeButtonSpan, closeButtonSpanStates, closeButtonSpanVisible, el, hide, hideCloseButton, show, texts;
        el = document.querySelector('#product');
        texts = el.querySelectorAll('h2 > span, p > span, button');
        closeButtonEl = el.querySelector('a.close');
        closeButtonSpan = closeButtonEl.querySelector('span');
        closeButtonSpanVisible = false;
        button = el.querySelector('button');
        closeButtonSpanStates = [
        {
            translateY: - 58
        }, {
            translateX: - 48,
            rotateZ: - 90
        }
        ];
        dynamics.css(closeButtonSpan, closeButtonSpanStates[1]);
        closeButtonEl.addEventListener('mouseover', (function(_this) {
            return function() {
                closeButtonSpanVisible = true;
                return dynamics.animate(closeButtonSpan, {
                    translateX: 0,
                    translateY: 0,
                    rotate: 0
                }, {
                    type: dynamics.spring,
                    frequency: 200,
                    friction: 800,
                    duration: 2000
                });
            };
        })(this));
        hideCloseButton = function(properties, options) {
            var old;
            if (properties == null) {
                properties = null;
            }
            if (options == null) {
                options = null;
            }
            if (!closeButtonSpanVisible) {
                return;
            }
            closeButtonSpanVisible = false;
            old = closeButtonSpan;
            if (properties != null) {
                options.complete = function() {
                    return old.parentNode.removeChild(old);
                };
                dynamics.animate(old, properties, options);
            } else {
                old.parentNode.removeChild(old);
            }
            closeButtonSpan = closeButtonSpan.cloneNode();
            dynamics.css(closeButtonSpan, closeButtonSpanStates[1]);
            return closeButtonEl.appendChild(closeButtonSpan);
        };
        closeButtonEl.addEventListener('mouseout', (function(_this) {
            return function() {
                return hideCloseButton(closeButtonSpanStates[0], {
                    type: dynamics.spring,
                    frequency: 0,
                    friction: 490,
                    anticipationStrength: 150,
                    anticipationSize: 250,
                    duration: 500
                });
            };
        })(this));
        show = function() {
            var i, text, _i, _ref, _results;
            el.style.pointerEvents = 'auto';
            _results = [];
            for (i = _i = 0, _ref = texts.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                text = texts[i];
                _results.push(dynamics.animate(text, {
                    opacity: 1,
                    translateY: 0
                }, {
                    type: dynamics.spring,
                    frequency: 300,
                    friction: 800,
                    duration: 2000,
                    delay: 500 + i * 70
                }));
            }
            return _results;
        };
        hide = function(animated, options) {
            var h, i, text, _i, _ref, _results;
            if (animated == null) {
                animated = true;
            }
            if (options == null) {
                options = {};
            }
            el.style.pointerEvents = 'none';
            hideCloseButton();
            _results = [];
            for (i = _i = 0, _ref = texts.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                text = texts[i];
                if (text.parentNode.tagName.toLowerCase() === 'h2') {
                    h = 24;
                } else {
                    h = 32;
                }
                _results.push(dynamics.animate(text, {
                    opacity: 0,
                    translateY: h
                }, {
                    type: dynamics.easeInOut,
                    duration: 200,
                    animated: animated,
                    complete: options.complete
                }));
            }
            return _results;
        };
        hide(false, {
            complete: (function(_this) {
                return function() {
                    return el.style.display = '';
                };
            })(this)
        });
        return {
            show: show,
            hide: hide,
            closeButtonEl: closeButtonEl,
            button: button
        };
    })();

    Loading = (function() {
        function Loading(el) {
            this.stop = __bind(this.stop, this);
            this.tick = __bind(this.tick, this);
            this.start = __bind(this.start, this);
            this.el = el;
            this.dots = this.el.querySelectorAll('span.dot');
            this.current = 0;
            this.animated = false;
            this.hiddenIndexes = [];
        }

        Loading.prototype.start = function() {
            if (this.animated) {
                return;
            }
            this.animated = true;
            this.tick();
            return this.interval = setInterval(this.tick, 500);
        };

        Loading.prototype.tick = function() {
            var dot;
            dot = this.dots[this.current];
            if (this.stopping) {
                dynamics.animate(dot.querySelector("span"), {
                    opacity: 0
                }, {
                    type: dynamics.easeInOut,
                    duration: 300,
                    delay: 350
                });
                this.hiddenIndexes.push(this.current);
            }
            dynamics.animate(dot, {
                translateY: - 10
            }, {
                type: dynamics.forceWithGravity,
                bounce: 60,
                gravity: 1300
            });
            this.current += 1;
            if (this.current > 2) {
                this.current = 0;
            }
            if (this.hiddenIndexes.indexOf(this.current) !== - 1) {
                if (this.interval) {
                    clearInterval(this.interval);
                }
                return this.hiddenIndexes = [];
            }
        };

        Loading.prototype.stop = function() {
            if (!this.animated) {
                return;
            }
            this.stopping = true;
            return this.animated = false;
        };

        return Loading;

    })();

    loading = new Loading(document.querySelector('header .loading'));

    loading.start();

    cart = (function() {
        var addItem, cartEl, cartLabelEl, cartSection, closeEl, currentCartLabelEl, items, setCartSectionVisibility, setCloseButtonVisibility;
        cartEl = document.querySelector('header a#cart');
        closeEl = document.querySelector('header a#closeCart');
        cartLabelEl = cartEl.querySelector('.label');
        cartSection = {
            el: document.querySelector('#cartSection'),
            items: document.querySelector('#cartSection .items'),
            footer: document.querySelector('#cartSection .footer')
        };
        currentCartLabelEl = null;
        items = [];
        setCartSectionVisibility = function(visible, options) {
            var hide, show;
            if (options == null) {
                options = {};
            }
            if (options.animated == null) {
                options.animated = true;
            }
            show = function() {
                cartSection.el.style.pointerEvents = 'auto';
                dynamics.animate(cartSection.footer, {
                    translateY: 0
                }, {
                    type: dynamics.spring,
                    frequency: 250,
                    friction: 1200,
                    duration: 3500,
                    animated: options.animated
                });
                return dynamics.animate(cartSection.items, {
                    translateY: 0,
                    opacity: 1
                }, {
                    type: dynamics.spring,
                    frequency: 250,
                    friction: 1200,
                    duration: 3500,
                    animated: options.animated,
                    delay: options.animated ? 100 : 0,
                    complete: options.complete
                });
            };
            hide = function() {
                cartSection.el.style.pointerEvents = 'none';
                dynamics.animate(cartSection.footer, {
                    translateY: 260
                }, {
                    type: dynamics.easeInOut,
                    duration: 700,
                    animated: options.animated,
                    complete: options.complete,
                    delay: options.animated ? 200 : 0
                });
                return dynamics.animate(cartSection.items, {
                    translateY: 260,
                    opacity: 0
                }, {
                    type: dynamics.easeInOut,
                    duration: 700,
                    animated: options.animated
                });
            };
            if (visible) {
                return show();
            } else {
                return hide();
            }
        };
        setCartSectionVisibility(false, {
            animated: false,
            complete: (function(_this) {
                return function() {
                    return cartSection.el.style.display = '';
                };
            })(this)
        });
        setCloseButtonVisibility = function(visible, options) {
            var hideElement, opacityAnimationOptions, showElement;
            if (options == null) {
                options = {};
            }
            if (options.animated == null) {
                options.animated = true;
            }
            opacityAnimationOptions = {
                type: dynamics.easeInOut,
                duration: 200,
                animated: options.animated
            };
            showElement = function(el) {
                return dynamics.animate(el, {
                    scaleX: 1,
                    opacity: 1
                }, {
                    type: dynamics.spring,
                    frequency: 250,
                    friction: 300,
                    duration: 700,
                    animated: options.animated,
                    delay: 150
                });
            };
            hideElement = function(el) {
                return dynamics.animate(el, {
                    scaleX: 0.01,
                    opacity: 0
                }, {
                    type: dynamics.easeInOut,
                    duration: 300,
                    animated: options.animated
                });
            };
            if (visible) {
                showElement(closeEl);
                return hideElement(cartEl);
            } else {
                showElement(cartEl);
                return hideElement(closeEl);
            }
        };
        setCloseButtonVisibility(false, {
            animated: false
        });
        addItem = function(item) {
            if (currentCartLabelEl) {
                dynamics.animate(currentCartLabelEl, {
                    translateY: 6,
                    opacity: 0
                }, {
                    type: dynamics.easeInOut,
                    duration: 250
                });
            }
            items.push(item);
            currentCartLabelEl = cartLabelEl.cloneNode();
            currentCartLabelEl.innerHTML = items.length;
            dynamics.css(currentCartLabelEl, {
                translateY: - 6,
                opacity: 0
            });
            cartEl.appendChild(currentCartLabelEl);
            cartEl.className = 'filled';
            return dynamics.animate(currentCartLabelEl, {
                translateY: 0,
                opacity: 1
            }, {
                type: dynamics.gravity,
                bounciness: 600,
                duration: 800
            });
        };
        return {
            addItem: addItem,
            open: function() {
                fade.show();
                setCloseButtonVisibility(true);
                return setCartSectionVisibility(true);
            },
            close: function() {
                setTimeout((function(_this) {
                    return function() {
                        return fade.hide();
                    };
                })(this), 450);
                setCloseButtonVisibility(false);
                return setCartSectionVisibility(false);
            }
        };
    })();

    grid = (function() {
        var Item, addToCartCurrentItem, cartEl, closeCartEl, closeCurrentItem, currentItem, gridEl, i, item, itemClicked, itemLoaded, items, loadedCount, productEl, showItems, _i, _j, _len;
        gridEl = document.querySelector('#grid');
        productEl = document.querySelector('#product');
        cartEl = document.querySelector('header a#cart');
        closeCartEl = document.querySelector('header a#closeCart');
        Item = (function() {
            function Item(i) {
                this.imgLoaded = __bind(this.imgLoaded, this);
                this.addToCart = __bind(this.addToCart, this);
                this.close = __bind(this.close, this);
                this.animateClonedEl = __bind(this.animateClonedEl, this);
                this.itemClick = __bind(this.itemClick, this);
                this.absolutePosition = __bind(this.absolutePosition, this);
                this.show = __bind(this.show, this);
                this.itemOut = __bind(this.itemOut, this);
                this.itemOver = __bind(this.itemOver, this);
                this.setDisabled = __bind(this.setDisabled, this);
                this.load = __bind(this.load, this);
                this.index = i;
                this.el = document.createElement('a');
                this.el.className = "item";
                this.img = document.createElement('img');
                this.el.appendChild(this.img);
                this.img.addEventListener('load', this.imgLoaded);
                this.el.addEventListener('mouseover', this.itemOver);
                this.el.addEventListener('mouseout', this.itemOut);
                this.el.addEventListener('click', this.itemClick);
            }

            Item.prototype.load = function() {
                return this.img.src = "./img/socks/socks-" + this.index + ".jpg";
            };

            Item.prototype.setDisabled = function(disabled) {
                this.disabled = disabled;
            };

            Item.prototype.itemOver = function() {
                if (this.disabled) {
                    return;
                }
                return dynamics.animate(this.el, {
                    scale: 1.18,
                    opacity: 1
                }, {
                    type: dynamics.spring,
                    frequency: 250,
                    duration: 300
                });
            };

            Item.prototype.itemOut = function() {
                if (this.disabled) {
                    return;
                }
                return dynamics.animate(this.el, {
                    scale: 1
                }, {
                    type: dynamics.spring,
                    duration: 1500
                });
            };

            Item.prototype.show = function() {
                dynamics.css(this.el, {
                    opacity: 0,
                    scale: 0.01
                });
                gridEl.appendChild(this.el);
                return dynamics.animate(this.el, {
                    scale: 1,
                    opacity: 1
                }, {
                    type: dynamics.spring,
                    friction: 300,
                    frequency: 200,
                    duration: 2000,
                    delay: this.index * 20
                });
            };

            Item.prototype.absolutePosition = function() {
                var offset, productOffset;
                offset = cumulativeOffset(this.el);
                productOffset = cumulativeOffset(productEl);
                return {
                    top: offset.top - window.scrollY - productOffset.top,
                    left: offset.left - window.scrollX - productOffset.left
                };
            };

            Item.prototype.itemClick = function() {
                var pos;
                if (this.disabled) {
                    return;
                }
                fade.show();
                logo.show();
                product.show();
                pos = this.absolutePosition();
                this.clonedEl = this.el.cloneNode(true);
                this.clonedEl.addEventListener('click', this.close);
                dynamics.css(this.clonedEl, {
                    position: 'absolute',
                    top: pos.top,
                    left: pos.left,
                    zIndex: 100
                });
                productEl.appendChild(this.clonedEl);
                this.el.classList.add('hidden');
                dynamics.animate(this.clonedEl, {
                    translateX: - pos.left + 40,
                    translateY: - pos.top + 60,
                    scale: 2,
                    opacity: 1
                }, {
                    type: dynamics.spring,
                    friction: 600,
                    frequency: 100,
                    anticipationSize: 140,
                    anticipationStrength: 50,
                    duration: 2000
                });
                return typeof this.clicked === "function" ? this.clicked() : void 0;
            };

            Item.prototype.animateClonedEl = function(properties, options, noAnimation) {
                var cloneElPos, pos;
                if (properties == null) {
                    properties = {};
                }
                if (options == null) {
                    options = {};
                }
                if (noAnimation == null) {
                    noAnimation = true;
                }
                dynamics.setTimeout((function(_this) {
                    return function() {
                        return dynamics.css(_this.clonedEl, {
                            zIndex: 1
                        });
                    };
                })(this), 400);
                pos = this.absolutePosition();
                cloneElPos = cumulativeOffset(this.clonedEl);
                cloneElPos.top += window.scrollY;
                cloneElPos.left += window.scrollX;
                productEl.removeChild(this.clonedEl);
                document.body.appendChild(this.clonedEl);
                dynamics.css(this.clonedEl, {
                    top: cloneElPos.top,
                    left: cloneElPos.left
                });
                options.complete = (function(_this) {
                    return function() {
                        if (!noAnimation) {
                            dynamics.css(_this.el, {
                                scale: 0.01
                            });
                            dynamics.animate(_this.el, {
                                scale: 1
                            }, {
                                type: dynamics.spring,
                                friction: 600,
                                frequency: 200,
                                anticipationSize: 140,
                                anticipationStrength: 50,
                                duration: 2000
                            });
                        }
                        _this.el.classList.remove('hidden');
                        document.body.removeChild(_this.clonedEl);
                        return _this.clonedEl = null;
                    };
                })(this);
                return dynamics.animate(this.clonedEl, properties, options);
            };

            Item.prototype.close = function(callback) {
                var pos;
                fade.hide();
                logo.updateOffset({
                    animated: true
                });
                product.hide();
                pos = this.absolutePosition();
                this.animateClonedEl({
                    translateX: - parseInt(this.clonedEl.style.left, 10) + pos.left,
                    translateY: - parseInt(this.clonedEl.style.top, 10) + pos.top,
                    scale: 1,
                    opacity: 1
                }, {
                    type: dynamics.spring,
                    friction: 600,
                    frequency: 100,
                    duration: 1200
                });
                return setTimeout((function(_this) {
                    return function() {
                        return typeof callback === "function" ? callback() : void 0;
                    };
                })(this), 500);
            };

            Item.prototype.addToCart = function() {
                var offset, pos, properties;
                fade.hide();
                logo.updateOffset({
                    animated: true
                });
                product.hide();
                pos = cumulativeOffset(this.el);
                offset = cumulativeOffset(cartEl);
                offset.left += 27;
                properties = {
                    translateX: offset.left - pos.left - 32,
                    translateY: offset.top - pos.top - 48,
                    scale: 0.2,
                    opacity: 0
                };
                return this.animateClonedEl(properties, {
                    type: dynamics.spring,
                    frequency: 30,
                    friction: 200,
                    anticipationStrength: 140,
                    anticipationSize: 220,
                    duration: 700
                }, false);
            };

            Item.prototype.imgLoaded = function() {
                this.img.className = "loaded";
                return typeof this.loaded === "function" ? this.loaded() : void 0;
            };

            return Item;

        })();
        items = [];
        loadedCount = 0;
        currentItem = null;
        showItems = function() {
            var item, _i, _len, _results;
            loading.stop();
            _results = [];
            for (_i = 0, _len = items.length; _i < _len; _i++) {
                item = items[_i];
                _results.push(item.show());
            }
            return _results;
        };
        itemLoaded = function() {
            loadedCount += 1;
            if (loadedCount >= items.length) {
                return showItems();
            }
        };
        itemClicked = function() {
            return currentItem = this;
        };
        for (i = _i = 1; 1 <= SOCKS_COUNT ? _i <= SOCKS_COUNT : _i >= SOCKS_COUNT; i = 1 <= SOCKS_COUNT ? ++_i : --_i) {
            item = new Item(i);
            item.loaded = itemLoaded;
            item.clicked = itemClicked;
            items.push(item);
        }
        for (_j = 0, _len = items.length; _j < _len; _j++) {
            item = items[_j];
            item.load();
        }
        cartEl.addEventListener('click', function() {
            var windowHeight, windowWidth, _results;
            grid.closeCurrentItem(function() {
                return cart.open();
            });
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
            return;
            _results = [];
            for (i in items) {
                item = items[i];
                _results.push((function(item) {
                    var delay, offset, translateX;
                    item.setDisabled(true);
                    offset = cumulativeOffset(item.el);
                    delay = Math.abs(offset.left - (windowWidth / 2)) / (windowWidth / 2) + offset.top / windowHeight;
                    delay *= 500;
                    translateX = offset.left - (windowWidth / 2);
                    return dynamics.animate(item.el, {
                        translateY: - offset.top + 160,
                        translateX: translateX,
                        rotate: Math.round(Math.random() * 90 - 45)
                    }, {
                        type: dynamics.bezier,
                        delay: delay,
                        duration: 450,
                        points: [
                        {
                            "x": 0,
                            "y": 0,
                            "cp": [
                            {
                                "x": 0.2,
                                "y": 0
                            }
                            ]
                        }, {
                            "x": 1,
                            "y": 1,
                            "cp": [
                            {
                                "x": 0.843,
                                "y": 0.351
                            }
                            ]
                        }
                        ],
                        complete: (function(_this) {
                            return function() {
                                return item.el.style.visibility = 'hidden';
                            };
                        })(this)
                    });
                })(item));
            }
            return _results;
        });
        closeCartEl.addEventListener('click', function() {
            var windowHeight, windowWidth;
            cart.close();
            windowWidth = window.innerWidth;
            return windowHeight = window.innerHeight;
        });
        closeCurrentItem = function(callback) {
            if (currentItem != null) {
                currentItem.close(callback);
            } else {
                callback();
            }
            return currentItem = null;
        };
        addToCartCurrentItem = function() {
            if (currentItem != null) {
                dynamics.setTimeout(cart.addItem.bind(cart, currentItem), 500);
                currentItem.addToCart();
            }
            return currentItem = null;
        };
        return {
            closeCurrentItem: closeCurrentItem,
            addToCartCurrentItem: addToCartCurrentItem
        };
    })();

    (function() {
        window.addEventListener('scroll', logo.updateOffset);
        window.addEventListener('keyup', (function(_this) {
            return function(e) {
                if (e.keyCode === 27) {
                    return grid.closeCurrentItem();
                }
            };
        })(this));
        product.closeButtonEl.addEventListener('click', grid.closeCurrentItem);
        return product.button.addEventListener('click', grid.addToCartCurrentItem);
    })();

}).call(this);


