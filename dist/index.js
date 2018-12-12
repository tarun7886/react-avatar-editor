!(function(e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t(
        require('prop-types'),
        require('react'),
        require('react-dom')
      ))
    : 'function' == typeof define && define.amd
      ? define(['prop-types', 'react', 'react-dom'], t)
      : (e.AvatarEditor = t(e.PropTypes, e.React, e.ReactDOM))
})(this, function(e, t, i) {
  'use strict'
  function o(e, t) {
    return new Promise(function(i, o) {
      var a,
        n = new Image()
      ;(n.onload = function() {
        return i(n)
      }),
        (n.onerror = o),
        !1 ==
          (null !== (a = e) &&
            !!a.match(
              /^\s*data:([a-z]+\/[a-z]+(;[a-z-]+=[a-z-]+)?)?(;base64)?,[a-z0-9!$&',()*+;=\-._~:@/?%\s]*\s*$/i
            )) &&
          t &&
          (n.crossOrigin = t),
        (n.src = e)
    })
  }
  ;(e = e && e.hasOwnProperty('default') ? e.default : e),
    (t = t && t.hasOwnProperty('default') ? t.default : t),
    (i = i && i.hasOwnProperty('default') ? i.default : i)
  var a = function(e, t) {
      if (!(e instanceof t))
        throw new TypeError('Cannot call a class as a function')
    },
    n = (function() {
      function e(e, t) {
        for (var i = 0; i < t.length; i++) {
          var o = t[i]
          ;(o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            'value' in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
        }
      }
      return function(t, i, o) {
        return i && e(t.prototype, i), o && e(t, o), t
      }
    })(),
    r =
      Object.assign ||
      function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var i = arguments[t]
          for (var o in i)
            Object.prototype.hasOwnProperty.call(i, o) && (e[o] = i[o])
        }
        return e
      },
    s = function(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        )
      return !t || ('object' != typeof t && 'function' != typeof t) ? e : t
    },
    h = (function() {
      return function(e, t) {
        if (Array.isArray(e)) return e
        if (Symbol.iterator in Object(e))
          return (function(e, t) {
            var i = [],
              o = !0,
              a = !1,
              n = void 0
            try {
              for (
                var r, s = e[Symbol.iterator]();
                !(o = (r = s.next()).done) &&
                (i.push(r.value), !t || i.length !== t);
                o = !0
              );
            } catch (e) {
              ;(a = !0), (n = e)
            } finally {
              try {
                !o && s.return && s.return()
              } finally {
                if (a) throw n
              }
            }
            return i
          })(e, t)
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance'
        )
      }
    })(),
    u = !(
      'undefined' == typeof window ||
      'undefined' == typeof navigator ||
      !('ontouchstart' in window || navigator.msMaxTouchPoints > 0)
    ),
    c = 'undefined' != typeof File,
    d = {
      touch: {
        react: {
          down: 'onTouchStart',
          mouseDown: 'onMouseDown',
          drag: 'onTouchMove',
          move: 'onTouchMove',
          mouseMove: 'onMouseMove',
          up: 'onTouchEnd',
          mouseUp: 'onMouseUp',
        },
        native: {
          down: 'touchstart',
          mouseDown: 'mousedown',
          drag: 'touchmove',
          move: 'touchmove',
          mouseMove: 'mousemove',
          up: 'touchend',
          mouseUp: 'mouseup',
        },
      },
      desktop: {
        react: {
          down: 'onMouseDown',
          drag: 'onDragOver',
          move: 'onMouseMove',
          up: 'onMouseUp',
        },
        native: {
          down: 'mousedown',
          drag: 'dragStart',
          move: 'mousemove',
          up: 'mouseup',
        },
      },
    },
    l = u ? d.touch : d.desktop,
    p =
      'undefined' != typeof window && window.devicePixelRatio
        ? window.devicePixelRatio
        : 1,
    g = (function(e) {
      function d() {
        var e, t, i
        a(this, d)
        for (var o = arguments.length, n = Array(o), h = 0; h < o; h++)
          n[h] = arguments[h]
        return (
          (t = i = s(
            this,
            (e = d.__proto__ || Object.getPrototypeOf(d)).call.apply(
              e,
              [this].concat(n)
            )
          )),
          (i.state = {
            drag: !1,
            my: null,
            mx: null,
            image: { x: 0.5, y: 0.5 },
          }),
          (i.handleImageReady = function(e) {
            var t = i.getInitialSize(e.width, e.height)
            ;(t.resource = e),
              (t.x = 0.5),
              (t.y = 0.5),
              i.setState({ drag: !1, image: t }, i.props.onImageReady),
              i.props.onLoadSuccess(t)
          }),
          (i.clearImage = function() {
            var e = i.canvas
            e.getContext('2d').clearRect(0, 0, e.width, e.height)
          }),
          (i.handleMouseDown = function(e) {
            ;(e = e || window.event).preventDefault(),
              i.setState({ drag: !0, mx: null, my: null })
          }),
          (i.handleMouseUp = function() {
            i.state.drag && (i.setState({ drag: !1 }), i.props.onMouseUp())
          }),
          (i.handleMouseMove = function(e) {
            if (((e = e || window.event), !1 !== i.state.drag)) {
              e.preventDefault()
              var t = e.targetTouches ? e.targetTouches[0].pageX : e.clientX,
                o = e.targetTouches ? e.targetTouches[0].pageY : e.clientY,
                a = { mx: t, my: o },
                n = i.props.rotate
              if (
                ((n = (n %= 360) < 0 ? n + 360 : n), i.state.mx && i.state.my)
              ) {
                var s = i.state.mx - t,
                  h = i.state.my - o,
                  u = i.state.image.width * i.props.scale,
                  c = i.state.image.height * i.props.scale,
                  d = i.getCroppingRect(),
                  l = d.x,
                  p = d.y
                ;(l *= u), (p *= c)
                var g = function(e) {
                    return e * (Math.PI / 180)
                  },
                  m = Math.cos(g(n)),
                  v = Math.sin(g(n)),
                  f = p + -s * v + h * m,
                  y = {
                    x:
                      (l + s * m + h * v) / u +
                      1 / i.props.scale * i.getXScale() / 2,
                    y: f / c + 1 / i.props.scale * i.getYScale() / 2,
                  }
                i.props.onPositionChange(y), (a.image = r({}, i.state.image, y))
              }
              i.setState(a), i.props.onMouseMove(e)
            }
          }),
          (i.setCanvas = function(e) {
            i.canvas = e
          }),
          s(i, t)
        )
      }
      return (
        (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' +
                typeof t
            )
          ;(e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
            t &&
              (Object.setPrototypeOf
                ? Object.setPrototypeOf(e, t)
                : (e.__proto__ = t))
        })(d, t.Component),
        n(d, [
          {
            key: 'componentDidMount',
            value: function() {
              this.props.disableHiDPIScaling && (p = 1)
              var e = i.findDOMNode(this.canvas).getContext('2d')
              if (
                (this.props.image && this.loadImage(this.props.image),
                this.paint(e),
                document)
              ) {
                var t = !!(function() {
                    var e = !1
                    try {
                      var t = Object.defineProperty({}, 'passive', {
                        get: function() {
                          e = !0
                        },
                      })
                      window.addEventListener('test', t, t),
                        window.removeEventListener('test', t, t)
                    } catch (t) {
                      e = !1
                    }
                    return e
                  })() && { passive: !1 },
                  o = l.native
                document.addEventListener(o.move, this.handleMouseMove, t),
                  document.addEventListener(o.up, this.handleMouseUp, t),
                  u &&
                    (document.addEventListener(
                      o.mouseMove,
                      this.handleMouseMove,
                      t
                    ),
                    document.addEventListener(o.mouseUp, this.handleMouseUp, t))
              }
            },
          },
          {
            key: 'componentWillReceiveProps',
            value: function(e) {
              ;(e.image && this.props.image !== e.image) ||
              this.props.width !== e.width ||
              this.props.height !== e.height
                ? this.loadImage(e.image)
                : e.image || this.clearImage()
            },
          },
          {
            key: 'componentDidUpdate',
            value: function(e, t) {
              var o = i.findDOMNode(this.canvas),
                a = o.getContext('2d')
              a.clearRect(0, 0, o.width, o.height),
                this.paint(a),
                this.paintImage(a, this.state.image, this.props.border),
                (e.image === this.props.image &&
                  e.width === this.props.width &&
                  e.height === this.props.height &&
                  e.position === this.props.position &&
                  e.scale === this.props.scale &&
                  e.rotate === this.props.rotate &&
                  t.my === this.state.my &&
                  t.mx === this.state.mx &&
                  t.image.x === this.state.image.x &&
                  t.image.y === this.state.image.y) ||
                  this.props.onImageChange()
            },
          },
          {
            key: 'componentWillUnmount',
            value: function() {
              if (document) {
                var e = l.native
                document.removeEventListener(e.move, this.handleMouseMove, !1),
                  document.removeEventListener(e.up, this.handleMouseUp, !1),
                  u &&
                    (document.removeEventListener(
                      e.mouseMove,
                      this.handleMouseMove,
                      !1
                    ),
                    document.removeEventListener(
                      e.mouseUp,
                      this.handleMouseUp,
                      !1
                    ))
              }
            },
          },
          {
            key: 'isVertical',
            value: function() {
              return this.props.rotate % 180 != 0
            },
          },
          {
            key: 'getBorders',
            value: function() {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : this.props.border
              return Array.isArray(e) ? e : [e, e]
            },
          },
          {
            key: 'getDimensions',
            value: function() {
              var e = this.props,
                t = e.width,
                i = e.height,
                o = e.rotate,
                a = e.border,
                n = {},
                r = this.getBorders(a),
                s = h(r, 2),
                u = s[0],
                c = s[1],
                d = t,
                l = i
              return (
                this.isVertical()
                  ? ((n.width = l), (n.height = d))
                  : ((n.width = d), (n.height = l)),
                (n.width += 2 * u),
                (n.height += 2 * c),
                { canvas: n, rotate: o, width: t, height: i, border: a }
              )
            },
          },
          {
            key: 'getImage',
            value: function() {
              var e = this.getCroppingRect(),
                t = this.state.image
              ;(e.x *= t.resource.width),
                (e.y *= t.resource.height),
                (e.width *= t.resource.width),
                (e.height *= t.resource.height)
              var i = document.createElement('canvas')
              this.isVertical()
                ? ((i.width = e.height), (i.height = e.width))
                : ((i.width = e.width), (i.height = e.height))
              var o = i.getContext('2d')
              return (
                o.translate(i.width / 2, i.height / 2),
                o.rotate(this.props.rotate * Math.PI / 180),
                o.translate(-i.width / 2, -i.height / 2),
                (o.filter = this.props.filters),
                this.isVertical() &&
                  o.translate(
                    (i.width - i.height) / 2,
                    (i.height - i.width) / 2
                  ),
                o.drawImage(t.resource, -e.x, -e.y),
                i
              )
            },
          },
          {
            key: 'getImageScaledToCanvas',
            value: function() {
              var e = this.getDimensions(),
                t = e.width,
                i = e.height,
                o = document.createElement('canvas')
              return (
                this.isVertical()
                  ? ((o.width = i), (o.height = t))
                  : ((o.width = t), (o.height = i)),
                this.paintImage(o.getContext('2d'), this.state.image, 0, 1),
                o
              )
            },
          },
          {
            key: 'getXScale',
            value: function() {
              var e = this.props.width / this.props.height,
                t = this.state.image.width / this.state.image.height
              return Math.min(1, e / t)
            },
          },
          {
            key: 'getYScale',
            value: function() {
              var e = this.props.height / this.props.width,
                t = this.state.image.height / this.state.image.width
              return Math.min(1, e / t)
            },
          },
          {
            key: 'getCroppingRect',
            value: function() {
              var e = this.props.position || {
                  x: this.state.image.x,
                  y: this.state.image.y,
                },
                t = 1 / this.props.scale * this.getXScale(),
                i = 1 / this.props.scale * this.getYScale(),
                o = { x: e.x - t / 2, y: e.y - i / 2, width: t, height: i },
                a = 0,
                n = 1 - o.width,
                s = 0,
                h = 1 - o.height
              return (
                (this.props.disableBoundaryChecks || t > 1 || i > 1) &&
                  ((a = -o.width), (n = 1), (s = -o.height), (h = 1)),
                r({}, o, {
                  x: Math.max(a, Math.min(o.x, n)),
                  y: Math.max(s, Math.min(o.y, h)),
                })
              )
            },
          },
          {
            key: 'loadImage',
            value: function(e) {
              var t
              c && e instanceof File
                ? ((t = e),
                  new Promise(function(e, i) {
                    var a = new FileReader()
                    ;(a.onload = function(t) {
                      try {
                        var a = o(t.target.result)
                        e(a)
                      } catch (t) {
                        i(t)
                      }
                    }),
                      a.readAsDataURL(t)
                  }))
                    .then(this.handleImageReady)
                    .catch(this.props.onLoadFailure)
                : 'string' == typeof e &&
                  o(e, this.props.crossOrigin)
                    .then(this.handleImageReady)
                    .catch(this.props.onLoadFailure)
            },
          },
          {
            key: 'getInitialSize',
            value: function(e, t) {
              var i = void 0,
                o = void 0,
                a = this.getDimensions()
              return (
                a.height / a.width > t / e
                  ? (o = e * ((i = this.getDimensions().height) / t))
                  : (i = t * ((o = this.getDimensions().width) / e)),
                { height: i, width: o }
              )
            },
          },
          {
            key: 'paintImage',
            value: function(e, t, i) {
              var o =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : p
              if (t.resource) {
                var a = this.calculatePosition(t, i)
                e.save(),
                  e.translate(e.canvas.width / 2, e.canvas.height / 2),
                  e.rotate(this.props.rotate * Math.PI / 180),
                  e.translate(-e.canvas.width / 2, -e.canvas.height / 2),
                  (e.filter = this.props.filters),
                  this.isVertical() &&
                    e.translate(
                      (e.canvas.width - e.canvas.height) / 2,
                      (e.canvas.height - e.canvas.width) / 2
                    ),
                  e.scale(o, o),
                  (e.globalCompositeOperation = 'destination-over'),
                  e.drawImage(t.resource, a.x, a.y, a.width, a.height),
                  e.restore()
              }
            },
          },
          {
            key: 'calculatePosition',
            value: function(e, t) {
              e = e || this.state.image
              var i = this.getBorders(t),
                o = h(i, 2),
                a = o[0],
                n = o[1],
                r = this.getCroppingRect(),
                s = e.width * this.props.scale,
                u = e.height * this.props.scale,
                c = -r.x * s,
                d = -r.y * u
              return (
                this.isVertical() ? ((c += n), (d += a)) : ((c += a), (d += n)),
                { x: c, y: d, height: u, width: s }
              )
            },
          },
          {
            key: 'paint',
            value: function(e) {
              e.save(),
                e.scale(p, p),
                e.translate(0, 0),
                (e.fillStyle =
                  'rgba(' + this.props.color.slice(0, 4).join(',') + ')')
              var t = this.props.borderRadius,
                i = this.getDimensions(),
                o = this.getBorders(i.border),
                a = h(o, 2),
                n = a[0],
                r = a[1],
                s = i.canvas.height,
                u = i.canvas.width
              ;(t = Math.max(t, 0)),
                (t = Math.min(t, u / 2 - n, s / 2 - r)),
                e.beginPath(),
                (function(e, t, i, o, a, n) {
                  if (0 === n) e.rect(t, i, o, a)
                  else {
                    var r = o - n,
                      s = a - n
                    e.translate(t, i),
                      e.arc(n, n, n, Math.PI, 1.5 * Math.PI),
                      e.lineTo(r, 0),
                      e.arc(r, n, n, 1.5 * Math.PI, 2 * Math.PI),
                      e.lineTo(o, s),
                      e.arc(r, s, n, 2 * Math.PI, 0.5 * Math.PI),
                      e.lineTo(n, a),
                      e.arc(n, s, n, 0.5 * Math.PI, Math.PI),
                      e.translate(-t, -i)
                  }
                })(e, n, r, u - 2 * n, s - 2 * r, t),
                e.rect(u, 0, -u, s),
                e.fill('evenodd'),
                e.restore()
            },
          },
          {
            key: 'render',
            value: function() {
              var e = this.props,
                i = (e.scale,
                e.rotate,
                e.image,
                e.border,
                e.borderRadius,
                e.width,
                e.height,
                e.position,
                e.color,
                e.style),
                o = e.filters,
                a = (e.crossOrigin,
                e.onLoadFailure,
                e.onLoadSuccess,
                e.onImageReady,
                e.onImageChange,
                e.onMouseUp,
                e.onMouseMove,
                e.onPositionChange,
                e.disableBoundaryChecks,
                e.disableHiDPIScaling,
                (function(e, t) {
                  var i = {}
                  for (var o in e)
                    t.indexOf(o) >= 0 ||
                      (Object.prototype.hasOwnProperty.call(e, o) &&
                        (i[o] = e[o]))
                  return i
                })(e, [
                  'scale',
                  'rotate',
                  'image',
                  'border',
                  'borderRadius',
                  'width',
                  'height',
                  'position',
                  'color',
                  'style',
                  'filters',
                  'crossOrigin',
                  'onLoadFailure',
                  'onLoadSuccess',
                  'onImageReady',
                  'onImageChange',
                  'onMouseUp',
                  'onMouseMove',
                  'onPositionChange',
                  'disableBoundaryChecks',
                  'disableHiDPIScaling',
                ])),
                n = this.getDimensions(),
                s = {
                  width: n.canvas.width,
                  height: n.canvas.height,
                  cursor: this.state.drag ? 'grabbing' : 'grab',
                  touchAction: 'none',
                },
                h = {
                  width: n.canvas.width * p,
                  height: n.canvas.height * p,
                  filter: o,
                  style: r({}, s, i),
                }
              return (
                (h[l.react.down] = this.handleMouseDown),
                u && (h[l.react.mouseDown] = this.handleMouseDown),
                t.createElement('canvas', r({ ref: this.setCanvas }, h, a))
              )
            },
          },
        ]),
        d
      )
    })()
  return (
    (g.propTypes = {
      scale: e.number,
      rotate: e.number,
      image: e.oneOfType(
        [e.string].concat(
          (function(e) {
            if (Array.isArray(e)) {
              for (var t = 0, i = Array(e.length); t < e.length; t++)
                i[t] = e[t]
              return i
            }
            return Array.from(e)
          })(c ? [e.instanceOf(File)] : [])
        )
      ),
      border: e.oneOfType([e.number, e.arrayOf(e.number)]),
      borderRadius: e.number,
      width: e.number,
      height: e.number,
      position: e.shape({ x: e.number, y: e.number }),
      color: e.arrayOf(e.number),
      style: e.object,
      filters: e.string,
      crossOrigin: e.oneOf(['', 'anonymous', 'use-credentials']),
      className: e.string,
      onLoadFailure: e.func,
      onLoadSuccess: e.func,
      onImageReady: e.func,
      onImageChange: e.func,
      onMouseUp: e.func,
      onMouseMove: e.func,
      onPositionChange: e.func,
      disableBoundaryChecks: e.bool,
      disableHiDPIScaling: e.bool,
    }),
    (g.defaultProps = {
      scale: 1,
      rotate: 0,
      border: 25,
      borderRadius: 0,
      width: 200,
      height: 200,
      color: [0, 0, 0, 0.5],
      style: {},
      filters: '',
      className: '',
      onLoadFailure: function() {},
      onLoadSuccess: function() {},
      onImageReady: function() {},
      onImageChange: function() {},
      onMouseUp: function() {},
      onMouseMove: function() {},
      onPositionChange: function() {},
      disableBoundaryChecks: !1,
      disableHiDPIScaling: !1,
    }),
    g
  )
})
