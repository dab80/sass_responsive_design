(function(){var Q;
(function (Q) {
    /**
     * An event dispatcher allowing clients to subscribe (tap), unsubscribe (untap) and
     * dispatch (raise) events.
     */
    var Signal = (function () {
        function Signal() {
            // All callbacks that have tapped this signal
            this.listeners = [];
        }
        /**
         * Listen for this signal to be raised.
         * @param l the callback for the listener
         */
        Signal.prototype.tap = function (l) {
            // Make a copy of the listeners to avoid the all too common
            // subscribe-during-dispatch problem
            this.listeners = this.listeners.slice(0);
            this.listeners.push(l);
        };
        /**
         * Stop listening for this signal to be raised.
         * @param l the callback to be removed as a listener
         */
        Signal.prototype.untap = function (l) {
            var ix = this.listeners.indexOf(l);
            if (ix == -1) {
                return;
            }
            // Make a copy of the listeners to avoid the all to common
            // unsubscribe-during-dispatch problem
            this.listeners = this.listeners.slice(0);
            this.listeners.splice(ix, 1);
        };
        /**
         * Raise the signal for all listeners and pass allowing the given arguments.
         * @param args an arbitrary list of arguments to be passed to listeners
         */
        Signal.prototype.raise = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this.listeners.forEach(function (l) {
                l.apply(_this, args);
            });
        };
        return Signal;
    })();
    Q.Signal = Signal;
})(Q || (Q = {}));
/// <reference path="signal.ts" />
var Q;
(function (Q) {
    var OfOne = (function () {
        function OfOne(node) {
            this.e = node;
        }
        OfOne.prototype.set = function (e) {
            this.e = e;
            return this;
        };
        OfOne.prototype.selectOne = function (sel) {
            var e = this.e.querySelector(sel);
            return e ? new OfOne(e) : null;
        };
        OfOne.prototype.selectMany = function (sel) {
            return new OfMany(this.e.querySelectorAll(sel));
        };
        OfOne.prototype.focus = function () {
            this.e.focus();
            return this;
        };
        OfOne.prototype.blur = function () {
            this.e.blur();
            return this;
        };
        OfOne.prototype.click = function () {
            this.e.click();
            return this;
        };
        OfOne.prototype.hasFocus = function () {
            return document.activeElement == this.e;
        };
        OfOne.prototype.contains = function (q) {
            return contains(this.e, q instanceof OfOne ? q.e : q);
        };
        OfOne.prototype.text = function () {
            return text(this.e);
        };
        OfOne.prototype.html = function () {
            return html(this.e);
        };
        OfOne.prototype.setHtml = function (v) {
            setHtml(this.e, v);
            return this;
        };
        OfOne.prototype.setText = function (v) {
            setText(this.e, v);
            return this;
        };
        OfOne.prototype.hasAttr = function (k) {
            return hasAttr(this.e, k);
        };
        OfOne.prototype.attr = function (k) {
            return attr(this.e, k);
        };
        OfOne.prototype.setAttr = function (k, v) {
            setAttr(this.e, k, v);
            return this;
        };
        OfOne.prototype.prop = function (k) {
            return prop(this.e, k);
        };
        OfOne.prototype.setProp = function (k, v) {
            setProp(this.e, k, v);
            return this;
        };
        OfOne.prototype.val = function () {
            return val(this.e);
        };
        OfOne.prototype.setVal = function (v) {
            setVal(this.e, v);
            return this;
        };
        OfOne.prototype.css = function (k) {
            return css(this.e, k);
        };
        OfOne.prototype.setCss = function (k, v, p) {
            setCss(this.e, k, v, p);
            return this;
        };
        OfOne.prototype.setCssTransform = function (xform) {
            setCssTransform(this.e, xform);
            return this;
        };
        OfOne.prototype.setCssAnimationFillmode = function (fillmode) {
            setCssAnimationFillmode(this.e, fillmode);
            return this;
        };
        OfOne.prototype.on = function (name, f, capture) {
            on(this.e, name, f, capture);
            return this;
        };
        OfOne.prototype.off = function (name, f, capture) {
            off(this.e, name, f, capture);
            return this;
        };
        OfOne.prototype.child = function () {
            var p = this.e.firstElementChild;
            return p ? new OfOne(p) : null;
        };
        OfOne.prototype.children = function () {
            return new OfMany(this.e.children);
        };
        OfOne.prototype.parent = function () {
            var p = this.e.parentElement;
            return p ? new OfOne(p) : null;
        };
        OfOne.prototype.remove = function () {
            remove(this.e);
            return this;
        };
        OfOne.prototype.hasClass = function (c) {
            return hasClass(this.e, c);
        };
        OfOne.prototype.setClass = function (c) {
            setClass(this.e, c);
            return this;
        };
        OfOne.prototype.addClass = function (c) {
            addClass(this.e, c);
            return this;
        };
        OfOne.prototype.removeClass = function (c) {
            removeClass(this.e, c);
            return this;
        };
        OfOne.prototype.toggleClass = function (c) {
            toggleClass(this.e, c);
            return this;
        };
        OfOne.prototype.switchClass = function (c, on) {
            switchClass(this.e, c, on);
            return this;
        };
        // TODO(jaime): Should probably make these typesafe.
        OfOne.prototype.append = function (o) {
            append(this.e, o);
            return this;
        };
        OfOne.prototype.insert = function (o, before) {
            insert(this.e, o, before);
            return this;
        };
        OfOne.prototype.appendText = function (text) {
            append(this.e, document.createTextNode(text));
            return this;
        };
        OfOne.prototype.appendTo = function (o) {
            append(o, this.e);
            return this;
        };
        OfOne.prototype.prepend = function (o) {
            prepend(this.e, o);
            return this;
        };
        OfOne.prototype.prependTo = function (o) {
            prepend(o, this.e);
            return this;
        };
        OfOne.prototype.bounds = function () {
            return this.e.getBoundingClientRect();
        };
        OfOne.prototype.elem = function () {
            return this.e;
        };
        OfOne.prototype.offsetWidth = function () {
            return this.e.offsetWidth;
        };
        OfOne.prototype.offsetHeight = function () {
            return this.e.offsetHeight;
        };
        OfOne.prototype.offsetTop = function () {
            return this.e.offsetTop;
        };
        OfOne.prototype.offsetLeft = function () {
            return this.e.offsetLeft;
        };
        return OfOne;
    })();
    Q.OfOne = OfOne;
    var OfMany = (function () {
        function OfMany(e) {
            if (e instanceof Array) {
                this.e = e.map(function (i) {
                    if (i instanceof OfOne) {
                        return i.e;
                    }
                    return i;
                });
            }
            else if (e.length > 0 || e instanceof NodeList || e instanceof HTMLCollection) {
                this.e = [];
                for (var i = 0, n = e.length; i < n; i++) {
                    this.e.push(e[i]);
                }
            }
            else {
                this.e = [];
            }
        }
        OfMany.prototype.selectMany = function (sel) {
            var all = new OfMany;
            this.eachQ(function (q) {
                q.selectMany(sel).e.forEach(function (e) {
                    all.push(e);
                });
            });
            return all;
        };
        OfMany.prototype.empty = function () {
            return this.e.length == 0;
        };
        OfMany.prototype.size = function () {
            return this.e.length;
        };
        OfMany.prototype.contains = function (c) {
            var e = this.e;
            for (var i = 0, n = e.length; i < n; i++) {
                if (contains(e[i], c)) {
                    return true;
                }
            }
            return false;
        };
        OfMany.prototype.setHtml = function (v) {
            this.e.forEach(function (e) {
                setHtml(e, v);
            });
            return this;
        };
        OfMany.prototype.setText = function (v) {
            this.e.forEach(function (e) {
                setText(e, v);
            });
            return this;
        };
        OfMany.prototype.setAttr = function (k, v) {
            this.e.forEach(function (e) {
                setAttr(e, k, v);
            });
            return this;
        };
        OfMany.prototype.setProp = function (k, v) {
            this.e.forEach(function (e) {
                setProp(e, k, v);
            });
            return this;
        };
        OfMany.prototype.setVal = function (v) {
            this.e.forEach(function (e) {
                setVal(e, v);
            });
            return this;
        };
        OfMany.prototype.setCss = function (k, v, p) {
            this.e.forEach(function (e) {
                setCss(e, k, v, p);
            });
            return this;
        };
        OfMany.prototype.setCssTransform = function (xform) {
            this.e.forEach(function (e) {
                setCssTransform(e, xform);
            });
            return this;
        };
        OfMany.prototype.on = function (name, f, capture) {
            this.e.forEach(function (e) {
                if (e) {
                    on(e, name, f, capture);
                }
            });
            return this;
        };
        OfMany.prototype.off = function (name, f, capture) {
            this.e.forEach(function (e) {
                if (e) {
                    off(e, name, f, capture);
                }
            });
            return this;
        };
        OfMany.prototype.remove = function () {
            this.e.forEach(remove);
            return this;
        };
        OfMany.prototype.setClass = function (c) {
            this.e.forEach(function (e) {
                setClass(e, c);
            });
            return this;
        };
        OfMany.prototype.addClass = function (c) {
            this.e.forEach(function (e) {
                addClass(e, c);
            });
            return this;
        };
        OfMany.prototype.removeClass = function (c) {
            this.e.forEach(function (e) {
                removeClass(e, c);
            });
            return this;
        };
        OfMany.prototype.toggleClass = function (c) {
            this.e.forEach(function (e) {
                toggleClass(e, c);
            });
            return this;
        };
        OfMany.prototype.switchClass = function (c, on) {
            this.e.forEach(function (e) {
                switchClass(e, c, on);
            });
            return this;
        };
        OfMany.prototype.appendTo = function (o) {
            this.e.forEach(function (e) {
                append(o, e);
            });
            return this;
        };
        OfMany.prototype.prependTo = function (o) {
            this.e.forEach(function (e) {
                prepend(o, e);
            });
            return this;
        };
        OfMany.prototype.eachQ = function (f, q) {
            if (!q) {
                q = new OfOne;
            }
            this.e.forEach(function (e, i) {
                q.set(e);
                f(q, i);
            });
            q.set(null);
            return this;
        };
        OfMany.prototype.push = function (o) {
            this.e.push(o instanceof OfOne ? o.e : o);
            return this;
        };
        OfMany.prototype.oneAt = function (index) {
            return new OfOne(this.e[index]);
        };
        return OfMany;
    })();
    Q.OfMany = OfMany;
    function createOne(t) {
        return new OfOne(document.createElement(t));
    }
    Q.createOne = createOne;
    function createMany(t, n) {
        var q = new OfMany;
        while (q.e.length < n) {
            q.push(createOne(t));
        }
        return q;
    }
    Q.createMany = createMany;
    function selectMany(sel, t) {
        t = t || document;
        return new OfMany(t.querySelectorAll(sel));
    }
    Q.selectMany = selectMany;
    function selectOne(sel, t) {
        t = t || document;
        var r = t.querySelector(sel);
        return r ? new OfOne(r) : null;
    }
    Q.selectOne = selectOne;
    function body() {
        return new OfOne(document.body);
    }
    Q.body = body;
    function head() {
        return new OfOne(document.head);
    }
    Q.head = head;
    function html(e) {
        return e.innerHTML;
    }
    Q.html = html;
    function setHtml(e, v) {
        e.innerHTML = v;
    }
    Q.setHtml = setHtml;
    function text(e) {
        return e.textContent;
    }
    Q.text = text;
    function setText(e, v) {
        e.textContent = v;
    }
    Q.setText = setText;
    function css(e, k) {
        var lv = e.style.getPropertyValue(k);
        return lv ? lv : getComputedStyle(e).getPropertyValue(k);
    }
    Q.css = css;
    function setCss(e, k, v, p) {
        if (k != 'opacity' && typeof v == 'number') {
            v = v + 'px';
        }
        e.style.setProperty(k, v, p || '');
    }
    Q.setCss = setCss;
    function setCssTransform(e, xform) {
        e.style.setProperty('-webkit-transform', xform);
        e.style.setProperty('-moz-transform', xform);
        e.style.setProperty('-ms-transform', xform);
        e.style.setProperty('transform', xform);
    }
    Q.setCssTransform = setCssTransform;
    function setCssAnimationFillmode(e, fillmode) {
        e.style.setProperty('-webkit-animation-fill-mode', fillmode);
        e.style.setProperty('-moz-animation-fill-mode', fillmode);
        e.style.setProperty('-ms-animation-fill-mode', fillmode);
        e.style.setProperty('animation-fill-mode', fillmode);
    }
    Q.setCssAnimationFillmode = setCssAnimationFillmode;
    function prop(e, k) {
        return e[k];
    }
    Q.prop = prop;
    function setProp(e, k, v) {
        if (v == null) {
            delete e[k];
        }
        else {
            e[k] = v;
        }
    }
    Q.setProp = setProp;
    function hasAttr(e, k) {
        return e.hasAttribute(k);
    }
    Q.hasAttr = hasAttr;
    function attr(e, k) {
        return e.hasAttribute(k) ? e.getAttribute(k) : '';
    }
    Q.attr = attr;
    function setAttr(e, k, v) {
        if (v == null) {
            e.removeAttribute(k);
        }
        else {
            e.setAttribute(k, v);
        }
    }
    Q.setAttr = setAttr;
    function contains(e, child) {
        return e.contains(child);
    }
    Q.contains = contains;
    function val(e) {
        return e['value'];
    }
    Q.val = val;
    function setVal(e, v) {
        e['value'] = v;
    }
    Q.setVal = setVal;
    function on(e, n, f, capture) {
        e.addEventListener(n, f, !!capture);
    }
    Q.on = on;
    function off(e, n, f, capture) {
        e.removeEventListener(n, f, !!capture);
    }
    Q.off = off;
    function hasClass(e, c) {
        return e.classList.contains(c);
    }
    Q.hasClass = hasClass;
    function setClass(e, c) {
        e.className = c;
    }
    Q.setClass = setClass;
    function addClass(e, c) {
        e.classList.add(c);
    }
    Q.addClass = addClass;
    function removeClass(e, c) {
        e.classList.remove(c);
    }
    Q.removeClass = removeClass;
    function toggleClass(e, c) {
        e.classList.toggle(c);
    }
    Q.toggleClass = toggleClass;
    function switchClass(e, c, on) {
        if (on) {
            e.classList.add(c);
        }
        else {
            e.classList.remove(c);
        }
    }
    Q.switchClass = switchClass;
    function remove(e) {
        var p = e.parentElement;
        if (p) {
            p.removeChild(e);
        }
    }
    Q.remove = remove;
    function insert(e, o, b) {
        var en = (e instanceof OfOne) ? e.e : e, on = (o instanceof OfOne) ? o.e : o, bn = (b instanceof OfOne) ? b.e : b;
        en.insertBefore(on, bn);
    }
    Q.insert = insert;
    function append(e, o) {
        var en = (e instanceof OfOne) ? e.e : e, on = (o instanceof OfOne) ? o.e : o;
        en.appendChild(on);
    }
    Q.append = append;
    function prepend(e, o) {
        var en = (e instanceof OfOne) ? e.e : e, on = (o instanceof OfOne) ? o.e : o;
        en.insertBefore(on, en.firstChild);
    }
    Q.prepend = prepend;
})(Q || (Q = {}));
/// <reference path="../ts/util/q.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Q;
(function (Q) {
    var ExpiredTokenView = (function (_super) {
        __extends(ExpiredTokenView, _super);
        function ExpiredTokenView() {
            _super.call(this, document.createElement('div'));
            this.setAttr('class', 'container ExpiredTokenView')
                .append(Q.createOne('div').setAttr('class', 'form-signin')
                .append(Q.createOne('h3').setAttr('class', 'text-form-header text-white tc').appendText('Sorry.'))
                .append(Q.createOne('div').setAttr('class', 'form-copy-box text-white tc').appendText('This password reset link has expired.'))
                .append(Q.createOne('div').setAttr('class', 'form-copy-box text-white tc')
                .append(this.tryAgain = Q.createOne('span').setAttr('class', 'form-link').appendText('Try again')).appendText(' or ')
                .append(this.returnToLogin = Q.createOne('span').setAttr('class', 'form-link').appendText('return to log in.'))));
        }
        return ExpiredTokenView;
    })(Q.OfOne);
    Q.ExpiredTokenView = ExpiredTokenView;
    var ForgotPasswordView = (function (_super) {
        __extends(ForgotPasswordView, _super);
        function ForgotPasswordView() {
            _super.call(this, document.createElement('div'));
            this.setAttr('class', 'container login ForgotPassword')
                .append(this.form = Q.createOne('form').setAttr('class', 'form-signin').setAttr('novalidate', '')
                .append(Q.createOne('div').setAttr('class', 'tc text-white form-copy-box').appendText('      Enter your email below and we\'ll send you a link to reset your password. Or, ')
                .append(this.returnToLogin = Q.createOne('span').setAttr('class', 'form-link returnToLogin').appendText('return to Login.')))
                .append(Q.createOne('div').setAttr('class', 'input-container')
                .append(this.login = Q.createOne('input').setAttr('type', 'text').setAttr('class', 'form-control login full-border').setAttr('placeholder', 'Email').setAttr('required', '').setAttr('autofocus', ''))
                .append(this.submit = Q.createOne('input').setAttr('type', 'submit').setAttr('class', 'login-button').setAttr('value', '')))
                .append(this.clientErrorMessage = Q.createOne('div').setAttr('class', 'error-message').appendText('We don\'t recognize that account.      ')
                .append(Q.createOne('a').setAttr('class', 'form-link text-white').setAttr('href', 'mailto:team@fullstory.com').appendText('Contact us')).appendText(' for help.    '))
                .append(this.serverErrorMessage = Q.createOne('div').setAttr('class', 'error-message').appendText('Sorry, we were unable to process that.  Please try again in a few moments.      ')
                .append(Q.createOne('a').setAttr('class', 'form-link text-white').setAttr('href', 'mailto:team@fullstory.com').appendText('Contact us')).appendText(' for help.    ')));
        }
        return ForgotPasswordView;
    })(Q.OfOne);
    Q.ForgotPasswordView = ForgotPasswordView;
    var LoginView = (function (_super) {
        __extends(LoginView, _super);
        function LoginView() {
            _super.call(this, document.createElement('div'));
            this.setAttr('class', 'external-form-container container login')
                .append(this.form = Q.createOne('form').setAttr('class', 'form-signin').setAttr('novalidate', '')
                .append(this.loginGoogleContainer = Q.createOne('div').setAttr('class', 'login-google'))
                .append(Q.createOne('div').setAttr('class', 'input-container')
                .append(this.login = Q.createOne('input').setAttr('id', 'account').setAttr('type', 'text').setAttr('class', 'form-control login').setAttr('placeholder', 'Email').setAttr('required', '').setAttr('autofocus', ''))
                .append(this.password = Q.createOne('input').setAttr('id', 'password').setAttr('type', 'password').setAttr('class', 'form-control').setAttr('placeholder', 'Password').setAttr('required', ''))
                .append(this.submit = Q.createOne('input').setAttr('type', 'submit').setAttr('class', 'login-button').setAttr('value', '')))
                .append(this.errorMessage = Q.createOne('div').setAttr('class', 'error-message'))
                .append(this.forgotPassword = Q.createOne('div').setAttr('id', 'resetPasswordLink').setAttr('class', 'tc text-white form-copy-box form-link').appendText('Forgot password?')));
        }
        return LoginView;
    })(Q.OfOne);
    Q.LoginView = LoginView;
    var LoginGoogleButtonView = (function (_super) {
        __extends(LoginGoogleButtonView, _super);
        function LoginGoogleButtonView() {
            _super.call(this, document.createElement('div'));
            this.setAttr('class', 'login-google-container')
                .append(this.googleLoginButtonLink = Q.createOne('a').setAttr('class', 'login-google-button').setAttr('href', '/googleStartLogin').appendText('    Log in with Google    ')
                .append(Q.createOne('div').setAttr('class', 'icon-google'))
                .append(Q.createOne('div').setAttr('class', 'icon-carat')));
        }
        return LoginGoogleButtonView;
    })(Q.OfOne);
    Q.LoginGoogleButtonView = LoginGoogleButtonView;
    var PasswordSuccessView = (function (_super) {
        __extends(PasswordSuccessView, _super);
        function PasswordSuccessView() {
            _super.call(this, document.createElement('div'));
            this.setAttr('class', 'form-signin')
                .append(Q.createOne('h3').setAttr('class', 'text-form-header tc text-white').appendText('You\'ve got mail!'))
                .append(this.message = Q.createOne('div').setAttr('class', 'text-white form-copy-box tc plainText').appendText('Check your inbox for instructions on how to reset your FullStory password.'))
                .append(this.check = Q.createOne('div').setAttr('class', 'mail-check'));
        }
        return PasswordSuccessView;
    })(Q.OfOne);
    Q.PasswordSuccessView = PasswordSuccessView;
    var ResetPasswordView = (function (_super) {
        __extends(ResetPasswordView, _super);
        function ResetPasswordView() {
            _super.call(this, document.createElement('div'));
            this.setAttr('class', 'container login ResetPasswordView')
                .append(this.form = Q.createOne('form').setAttr('class', 'form-signin').setAttr('novalidate', '')
                .append(Q.createOne('div').setAttr('id', 'resetPasswordLink').setAttr('class', 'form-copy-box text-action text-white tc').appendText('Reset your password.'))
                .append(Q.createOne('div').setAttr('class', 'input-container')
                .append(this.login = Q.createOne('input').setAttr('type', 'text').setAttr('class', 'form-control login').setAttr('placeholder', 'Email').setAttr('disabled', ''))
                .append(this.password = Q.createOne('input').setAttr('type', 'password').setAttr('class', 'form-control').setAttr('placeholder', 'Enter new password').setAttr('required', '').setAttr('autofocus', ''))
                .append(this.submit = Q.createOne('input').setAttr('type', 'submit').setAttr('class', 'login-button').setAttr('value', '')))
                .append(this.errorMessage = Q.createOne('div').setAttr('class', 'error-message').appendText('Error setting password.      ')
                .append(Q.createOne('a').setAttr('href', 'mailto:team@fullstory.com').appendText('Contact us')).appendText(' for help.    '))
                .append(this.passwordStrength = Q.createOne('div').setAttr('class', 'error-message').appendText('      We suggest a password with 8 characters, including a number and a symbol.    '))
                .append(this.loginGoogleContainer = Q.createOne('div')));
        }
        return ResetPasswordView;
    })(Q.OfOne);
    Q.ResetPasswordView = ResetPasswordView;
    var SignupErrorView = (function (_super) {
        __extends(SignupErrorView, _super);
        function SignupErrorView() {
            _super.call(this, document.createElement('div'));
            this.setAttr('class', 'form-signin message error')
                .append(this.title = Q.createOne('h1').appendText('    Whoops.  '))
                .append(this.msg = Q.createOne('h2').appendText('    It looks like we had an issue with your signup request.  '))
                .append(Q.createOne('br'))
                .append(Q.createOne('div').setAttr('class', 'instruction')
                .append(this.link = Q.createOne('a').appendText('Return to Sign Up')));
        }
        return SignupErrorView;
    })(Q.OfOne);
    Q.SignupErrorView = SignupErrorView;
    var SignupFormView = (function (_super) {
        __extends(SignupFormView, _super);
        function SignupFormView() {
            _super.call(this, document.createElement('div'));
            this
                .append(this.title = Q.createOne('h1').appendText('    Choose your own adventure.  '))
                .append(this.msg = Q.createOne('h2').appendText('    Build a plan that’s just right for your business.  '))
                .append(Q.createOne('form').setAttr('action', '/provisionOrg').setAttr('method', 'post')
                .append(Q.createOne('input').setAttr('name', 'email').setAttr('placeholder', 'Work Email Address').setAttr('type', 'email'))
                .append(Q.createOne('button').setAttr('class', 'submit').setAttr('name', 'subscribe').appendText('GO')))
                .append(Q.createOne('div').setAttr('class', 'instruction').appendText('    Enter your work email above to access your ')
                .append(Q.createOne('strong').appendText('fully-loaded')).appendText(' 14-day FullStory Pro trial.  '));
        }
        return SignupFormView;
    })(Q.OfOne);
    Q.SignupFormView = SignupFormView;
    var SignupSuccessView = (function (_super) {
        __extends(SignupSuccessView, _super);
        function SignupSuccessView() {
            _super.call(this, document.createElement('div'));
            this.setAttr('class', 'form-signin message')
                .append(this.title = Q.createOne('h1').appendText('    Awesome!  '))
                .append(this.msg = Q.createOne('h2').appendText('    Your account has been created. Please check your email for the link to get started!  '))
                .append(Q.createOne('br'))
                .append(Q.createOne('div').setAttr('class', 'instruction').appendText('    Not seeing the activation email? Contact ')
                .append(Q.createOne('a').setAttr('href', 'mailto:support@fullstory.com').appendText('support@fullstory.com')).appendText(' and let us help!  '))
                .append(Q.createOne('script').setAttr('type', 'text/javascript').appendText('    var google_conversion_id = 965315604;    var google_conversion_language = "en";    var google_conversion_format = "3";    var google_conversion_color = "ffffff";    var google_conversion_label = "30sPCJ3I_2UQlJimzAM";    var google_conversion_value = 1.00;    var google_conversion_currency = "USD";    var google_remarketing_only = false;  '))
                .append(Q.createOne('script').setAttr('type', 'text/javascript').setAttr('src', '//www.googleadservices.com/pagead/conversion.js'))
                .append(Q.createOne('noscript').appendText('    <div style="display:inline;">      <img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/965315604/?value=1.00&amp;currency_code=USD&amp;label=30sPCJ3I_2UQlJimzAM&amp;guid=ON&amp;script=0"/>    </div>  '))
                .append(Q.createOne('script').appendText('    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;    n.push=n;n.loaded=!0;n.version=\'2.0\';n.queue=[];t=b.createElement(e);t.async=!0;    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,    document,\'script\',\'//connect.facebook.net/en_US/fbevents.js\');    fbq(\'init\', \'1507515186231910\');    fbq(\'track\', "PageView");  '))
                .append(Q.createOne('noscript').appendText('<img height="1" width="1" style="display:none"    src="https://www.facebook.com/tr?id=1507515186231910&ev=PageView&noscript=1"    />'));
        }
        return SignupSuccessView;
    })(Q.OfOne);
    Q.SignupSuccessView = SignupSuccessView;
})(Q || (Q = {})); // module Q
// DO NOT IMPORT ANYTHING HERE.
var FS;
(function (FS) {
    // NOTE: These constants, structs, and functions must match those in events.go.
    // ---------------------------------------------------------------------------
    // Constants from events.go
    // ---------------------------------------------------------------------------
    // "Raw" events -- saved only in playback event bundles.
    // Definitions:
    //   hermite(x) :: (x0, x1, dx0, dx1) -- Hermite cubic spline parameters.
    // Special case -- insertions recorded before /start responds.
    // [DO NOT USE] export var EVENT_MUT_UNPARSED_INSERT = 0x0000; // [parentId, beforeId, Node]
    // Another special case -- insertions recorded internally, but not yet saved (may be skipped).
    // [DO NOT USE] export var EVENT_MUT_PARSED_INSERT = 0x0001;   // [id, [parents], parentId, beforeId, stream...] (only used during recording)
    // "Mutation/Recording" events -- large and/or high-frequency, saved only in playback stream.
    FS.EVENT_MUT_INSERT = 0x0002; // [parentId, beforeId, stream...]
    FS.EVENT_MUT_REMOVE = 0x0003; // [(id)+]
    FS.EVENT_MUT_ATTR = 0x0004; // [id, attr, value]
    FS.EVENT_MUT_ATTR_CURVE = 0x0005; // [endTime, id, attr, hermite(value)]
    FS.EVENT_MUT_TEXT = 0x0006; // [id, text]
    FS.EVENT_MUT_SKIPIDS = 0x0007; // [count] : legacy event -- only used by old recording script.
    FS.EVENT_MOUSEMOVE = 0x0008; // [x, y, id] - id recently added
    FS.EVENT_MOUSEMOVE_CURVE = 0x0009; // [endTime, hermite(x), hermite(y), id] - id recently added
    FS.EVENT_SCROLL = 0x000a; // [id, left, top]
    FS.EVENT_SCROLL_CURVE = 0x000b; // [endTime, id, hermite(left), hermite(top)]
    FS.EVENT_MOUSEDOWN = 0x000c; // [x, y]
    FS.EVENT_MOUSEUP = 0x000d; // [x, y]
    FS.EVENT_KEYDOWN = 0x000e; // [keyCode]
    FS.EVENT_KEYUP = 0x000f; // [keyCode]
    FS.EVENT_CLICK = 0x0010; // [id, x, y, elemX, elemY, elemWidth, elemHeight]
    FS.EVENT_FOCUS = 0x0011; // [id]
    FS.EVENT_VALUECHANGE = 0x0012; // [id, value] (note: value == true/false for checkbox/radiobutotn)
    FS.EVENT_RESIZE = 0x0013; // [client (inside scrollbars) width, client height, media (including scrollbars) width, media height]
    FS.EVENT_DOMLOADED = 0x0014; // []
    FS.EVENT_LOAD = 0x0015; // []
    FS.EVENT_PLACEHOLDER_SIZE = 0x0016; // [id, width, height]
    FS.EVENT_UNLOAD = 0x0017; // []
    FS.EVENT_BLUR = 0x0018; // [id]
    FS.EVENT_SET_FRAME_BASE = 0x0019; // [Base Url, DocType]  (frameId is implicit)
    FS.EVENT_TOUCHSTART = 0x0020; // [touchid, x, y]
    FS.EVENT_TOUCHEND = 0x0021; // [touchid, x, y]
    FS.EVENT_TOUCHCANCEL = 0x0022; // [touchid, x, y]
    FS.EVENT_TOUCHMOVE = 0x0023; // [touchid, x, y]
    FS.EVENT_TOUCHMOVE_CURVE = 0x0024; // [endTime, touchid, hermite(x), hermite(y)]
    FS.EVENT_NAVIGATE = 0x0025; // [url]
    FS.EVENT_PLAY = 0x0026; // [id]
    FS.EVENT_PAUSE = 0x0027; // [id]
    // This is used for zooming on mobile browsers (and some desktop browsers, like Safari).
    // We record window.innerWidth rather than calculating the zoom factor on the client, because
    // we want to calculate a spline for this value. Being non-linear (1/x), zoom factor can't be
    // interpolated this way. Instead, we just calculate the zoom factor from this value during playback.
    FS.EVENT_INNERWIDTH = 0x0028; // [iw]
    FS.EVENT_INNERWIDTH_CURVE = 0x0029; // [endTime, hermite(iw)]
    FS.EVENT_LOG = 0x0030; // [{log|info|warn|error}, msg*]
    FS.EVENT_ERROR = 0x0031; // [error, url, line]
    FS.EVENT_DBL_CLICK = 0x0032; // [id]
    FS.EVENT_FORM_SUBMIT = 0x0033; // [id of form elem]
    FS.EVENT_WINDOW_FOCUS = 0x0034; // []
    FS.EVENT_WINDOW_BLUR = 0x0035; // []
    FS.EVENT_HEARTBEAT = 0x0036; // []
    // ------------------------------------------------------------------------------------
    // NAVIGATION_TIMING
    // Only the array of perf numbers is returned from the client to make payload small. 
    // Here is mapping from array index to property (of window.performance.timing object) name. 
    // 
    // 0 connectEnd
    // 1 connectStart
    // 2 domComplete
    // 3 domContentLoadedEventEnd
    // 4 domContentLoadedEventStart
    // 5 domInteractive
    // 6 domLoading
    // 7 domainLookupEnd
    // 8 domainLookupStart
    // 9 fetchStart
    // 10 loadEventEnd
    // 11 loadEventStart
    // 12 navigationStart
    // 13 redirectEnd
    // 14 redirectStart
    // 15 requestStart
    // 16 responseEnd
    // 17 responseStart
    // 18 secureConnectionStart
    // 19 unloadEventEnd
    // 20 unloadEventStart
    FS.NAVIGATION_TIMING = 0x0037; // data gathered from window.performance.timing object
    // No longer used.
    // [DO NOT USE] export var EVENT_COOKED_CLICK = 0x1000;       // [id]
    // [DO NOT USE] export var EVENT_COOKED_FOCUS = 0x1001;       // [id]
    // [DO NOT USE] export var EVENT_COOKED_CHANGE = 0x1002;      // [id, value]
    // ---------------------------------------------------------------------------
    // "System" events -- not saved, used to communicate with server.
    FS.EVENT_SYS_SETMETA = 0x2000; // [uid, metadata-json]
    FS.EVENT_SYS_SETVAR = 0x2001; // [scope, json-args, init?]
    FS.EVENT_SYS_HIGHLIGHT = 0x2002; // [type, tag(, valuetype)]
    FS.EVENT_COOKED_LOAD = "load";
    FS.EVENT_COOKED_UNLOAD = "unload";
    FS.EVENT_COOKED_NAVIGATE = "navigate";
    FS.EVENT_COOKED_CLICK = "click";
    FS.EVENT_COOKED_TAP = "tap";
    FS.EVENT_COOKED_FOCUS = "focus";
    FS.EVENT_COOKED_CHANGE = "change";
    FS.EVENT_COOKED_MOUSE_THRASH = "thrash";
    FS.EVENT_FORM_ABANDONED = "abandon";
    function isUserActionEvent(kind) {
        switch (kind) {
            case FS.EVENT_MOUSEDOWN:
            case FS.EVENT_MOUSEMOVE:
            case FS.EVENT_MOUSEMOVE_CURVE:
            case FS.EVENT_MOUSEUP:
            case FS.EVENT_KEYDOWN:
            case FS.EVENT_KEYUP:
            case FS.EVENT_TOUCHSTART:
            case FS.EVENT_TOUCHEND:
            case FS.EVENT_TOUCHMOVE:
            case FS.EVENT_TOUCHMOVE_CURVE:
            case FS.EVENT_TOUCHCANCEL:
            case FS.EVENT_CLICK:
            case FS.EVENT_SCROLL:
            case FS.EVENT_SCROLL_CURVE:
            case FS.EVENT_NAVIGATE:
                return true;
        }
        return false;
    }
    FS.isUserActionEvent = isUserActionEvent;
    FS.MAX_LOGS_PER_PAGE = 1024;
})(FS || (FS = {}));
// DO NOT EDIT -- generated from Go package fs/api/pricingapi
var fs_api_pricingapi;
(function (fs_api_pricingapi) {
    ///////////////
    // Constants //
    ///////////////
    fs_api_pricingapi.CorePack = 0;
    fs_api_pricingapi.ExperiencePack = 1;
    fs_api_pricingapi.DataPack = 2;
    fs_api_pricingapi.SupportPack = 3;
    fs_api_pricingapi.PageInsightsPack = 4;
    fs_api_pricingapi.NumPacks = 5;
    fs_api_pricingapi.MarketingPartnerDiscount = 1;
    fs_api_pricingapi.AgencyPartnerDiscount = 2;
    fs_api_pricingapi.EnterpriseDealPenalty = 1;
    fs_api_pricingapi.NoReport = "none";
    fs_api_pricingapi.TextReport = "text";
    fs_api_pricingapi.HtmlReport = "html";
    fs_api_pricingapi.CsvReport = "csv";
})(fs_api_pricingapi || (fs_api_pricingapi = {}));
// DO NOT EDIT -- generated from Go package fs/search/professor
var fs_search_professor;
(function (fs_search_professor) {
    ///////////////
    // Constants //
    ///////////////
    fs_search_professor.UserCountType = 0;
    fs_search_professor.SessionCountType = 1;
    fs_search_professor.EventCountType = 2;
    fs_search_professor.ClickCountType = 3;
})(fs_search_professor || (fs_search_professor = {}));
///<reference path='../../recording/api.ts'/>
///<reference path='../../goimports/fs_api_pricingapi.ts'/>
///<reference path='../../goimports/fs_search_professor.ts'/>
var FS;
(function (FS) {
    var pricingapi = fs_api_pricingapi;
    FS.INTERNAL_CREATOR = "FullStory Helpbot";
    FS.HIGHLIGHTS_NOTE = "note";
    FS.GEO_RECORD_ALL = "", FS.GEO_RECORD_WHITELIST = "whitelist", FS.GEO_RECORD_BLACKLIST = "blacklist";
    // TODO(sarah): Make this an enum instead of constants.
    FS.PlanStateInvalid = 0;
    FS.PlanStateCustom = 1; // custom free plans
    FS.PlanStateTrial = 2;
    FS.PlanStatePaid = 3;
    FS.PlanStateFreemium = 4;
    // TODO(sarah): Use invoiced and child state states after admin changes are done.
    FS.PlanStateInvoiced = 5;
    FS.PlanStateChild = 6;
    FS.PlanStateTrialExpired = 7;
    FS.PlanStateGift = 8; // Plan is free but not "freemium"
    function planState(plan) {
        if (plan.Custom) {
            return FS.PlanStateCustom;
        }
        if (plan.Invoiced) {
            return FS.PlanStateInvoiced;
        }
        if (plan.ParentId) {
            return FS.PlanStateChild;
        }
        var corePackPurchased = plan.Packs[pricingapi.CorePack] == 0, expPackPurchased = plan.Packs[pricingapi.ExperiencePack] == 0;
        if (plan.Price == 0) {
            if (corePackPurchased) {
                if (expPackPurchased) {
                    // free plan + core and exp packs purchased = gift or other free plan
                    return FS.PlanStateGift;
                }
                // free plan with core pack only = freemium
                return FS.PlanStateFreemium;
            }
            // free plan with expiring core pack = trial
            if (plan.Packs[pricingapi.CorePack] < Date.now()) {
                return FS.PlanStateTrialExpired;
            }
            else {
                return FS.PlanStateTrial;
            }
        }
        // non-zero price
        if (corePackPurchased) {
            return FS.PlanStatePaid;
        }
        return FS.PlanStateInvalid; // paid + expiring pack makes no sense
    }
    FS.planState = planState;
    function getPlanStateClass(planState) {
        switch (planState) {
            case FS.PlanStateTrial:
                return "trialState";
            case FS.PlanStateTrialExpired:
                return "trialExpiredState";
            case FS.PlanStatePaid:
                return "paidState";
            case FS.PlanStateFreemium:
                return "freemiumState";
            case FS.PlanStateGift:
                return "giftState";
            case FS.PlanStateInvoiced:
                return "invoicedState";
            case FS.PlanStateChild:
                return "childState";
            case FS.PlanStateCustom:
                return "planStateCustom";
            case FS.PlanStateInvalid:
                console.log("Invalid plan editor state: " + this._planState);
                return "";
        }
    }
    FS.getPlanStateClass = getPlanStateClass;
    FS.ErrnoResourceAuthed = 1; // failed to fetch a resource due to 401 or 403
    FS.ErrnoResourceBadHost = 2; // failed to fetch a resource due to a DNS failure to resolve host
    FS.ErrnoResourceWrongContent = 3; // failed to fetch a resource b/c it had the wrong Content-Type (e.g. a CSS file as HTML)
    // values 4-15 reserved
    FS.ErrnoResourceGenericFailed = 16;
    FS.MonthGranularity = "month";
    FS.WeekGranularity = "week";
    FS.DayGranularity = "day";
    FS.HourGranularity = "hour";
    // The types of clicks that could be requested for an activity map. Ideally, this would be generated by tsexport, but
    // there are some complications in the server code that make that difficult atm. Needs to match schema.go.
    FS.AllClickType = "active"; // All click types
    FS.DeadClickType = "dead";
    FS.ErrorClickType = "error";
    FS.RageClickType = "rage";
    (function (VisSize) {
        VisSize[VisSize["Medium"] = 0] = "Medium";
        VisSize[VisSize["Large"] = 1] = "Large";
    })(FS.VisSize || (FS.VisSize = {}));
    var VisSize = FS.VisSize;
    // Shared between plan editor and admin pricing calculator.
    FS.allowedSeatCounts = [
        20,
        30,
        40,
        50,
        60,
        70,
        80,
        90,
        100,
        110,
        120,
        130,
        140,
        150,
        160,
        170,
        180,
        190,
        200
    ];
})(FS || (FS = {}));
///<reference path='../../../gen/wwwviews.ts'/>
///<reference path='../../../ts/ui/api/clientapi.ts'/>
///<reference path='../../../ts/util/q.ts'/>
var Signup;
(function (Signup) {
    var view;
    function init() {
        var m = parseURLSearchParams();
        if (m['success'] != undefined) {
            installSuccessView();
        }
        else if (m['waitlist'] != undefined) {
            installSuccessView("We're excited that you want to try FullStory.<br> We'll be in touch as we work through the backlog of requests.<br>In the meantime, <a class='link-white' href='http://www.twitter.com/fullstory'>follow @fullstory on Twitter</a>.");
        }
        else if (m['error'] != undefined) {
            installErrorView();
        }
        else if (m['already'] != undefined) {
            installErrorView("It looks like you already have a FullStory account. Great!<br>You can <a href='/login'>login</a>. Or if you'd like to create another organization under this email, please reach out to <a href='mailto:support@fullstory.com'>support@fullstory.com</a>.", "Welcome back 😀");
        }
        else if (m['blocked'] != undefined) {
            installErrorView("It appears you're trying to sign up with a free email account. Please use your work email address instead. Thank you!", "Hmm.");
        }
        else if (m['invalid'] != undefined) {
            installErrorView("That doesn't appear to be a valid email address. Please double check and try again.", "Hmm.");
        }
        else if (m['noplus'] != undefined) {
            installErrorView("Emails with plus signs are not allowed for new signups.", "Hmm.");
        }
        else {
            installSignupView();
        }
    }
    Signup.init = init;
    function installSignupView() {
        var signupView = Q.selectOne(".SignupView");
        signupView.setHtml('');
        view = new Q.SignupFormView();
        view.appendTo(signupView);
        var submitButtons = Q.selectMany("input[type='submit']");
        Q.selectMany(".form-signup").on("submit", function () {
            submitButtons.setAttr("disabled", "true");
            submitButtons.setCss("opacity", "0.3");
        });
    }
    function installSuccessView(msg, title) {
        var signupView = Q.selectOne(".SignupView");
        signupView.setHtml('');
        view = new Q.SignupSuccessView();
        if (msg) {
            view.msg.setHtml(msg);
            if (title) {
                view.title.setText(title);
            }
        }
        view.appendTo(signupView);
    }
    function installErrorView(msgHTML, title) {
        var signupView = Q.selectOne(".SignupView");
        signupView.setHtml('');
        view = new Q.SignupErrorView();
        if (msgHTML) {
            view.msg.setHtml(msgHTML);
            if (title) {
                view.title.setText(title);
            }
        }
        view.link.on('click', function (e) {
            window.location.assign("/signup/");
        });
        view.appendTo(signupView);
    }
    function parseURLSearchParams() {
        var m = {};
        var query = location.search.slice(1);
        var vs = query.split('&');
        for (var i = 0; i < vs.length; i++) {
            // Need this regex to keep from stripping the last '==' from the base64 encoded token
            var pair = vs[i].split(/=(?!=)(?!$)/);
            m[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return m;
    }
})(Signup || (Signup = {}));
Signup.init();
})();