window.__ModuleLoader__.load({
  id: '@miinum5017/dsh-plugin-desktop-pet',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const NS = '@miinum5017/dsh-plugin-desktop-pet'

    const zh = {
      petName: '小鲸灵',
      hint: '点我一下',
      hello1: '你好呀，我是小鲸灵 🐳',
      hello2: '今天也要写点好代码哦',
      hello3: '累了就摸摸我～',
      hello4: '我在这里陪你',
      hello5: '要不要休息一下？',
    }

    const en = {
      petName: 'Little Whale',
      hint: 'Click me',
      hello1: 'Hi, I am Little Whale 🐳',
      hello2: 'Let us write something nice today.',
      hello3: 'Pat me if you are tired.',
      hello4: 'I am right here with you.',
      hello5: 'Maybe take a short break?',
    }

    const FALLBACK = zh

    const CSS = `
.dsh-pet-root {
  position: fixed;
  z-index: 30;
  width: 96px;
  height: 96px;
  pointer-events: none;
  user-select: none;
  -webkit-user-select: none;
}
.dsh-pet-body {
  width: 96px;
  height: 96px;
  pointer-events: auto;
  cursor: grab;
  touch-action: none;
  outline: none;
  border-radius: 24px;
}
.dsh-pet-body:focus-visible {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-brand-primary, #4f86ea) 45%, transparent);
}
.dsh-pet-body.is-dragging { cursor: grabbing; }
.dsh-pet-art {
  display: block;
  overflow: visible;
  filter: drop-shadow(0 8px 12px rgba(24, 57, 110, .16));
}
.dsh-pet-float {
  animation: dsh-pet-float 3.4s ease-in-out infinite;
  transform-origin: 48px 66px;
}
.dsh-pet-tail {
  animation: dsh-pet-tail 2.1s ease-in-out infinite;
  transform-origin: 78px 58px;
}
.dsh-pet-spout {
  animation: dsh-pet-spout 3.2s ease-in-out infinite;
  transform-origin: 49px 23px;
}
.dsh-pet-eyes {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform .08s ease;
}
.dsh-pet-eyes.is-blinking { transform: scaleY(.08); }
.dsh-pet-body.is-happy .dsh-pet-float { animation: dsh-pet-hop .52s cubic-bezier(.2, .8, .3, 1); }
.dsh-pet-body.is-happy .dsh-pet-tail { animation: dsh-pet-wag .52s ease-in-out; }
.dsh-pet-bubble {
  position: absolute;
  right: 0;
  bottom: 100%;
  margin-bottom: 10px;
  max-width: 210px;
  min-width: 130px;
  padding: 9px 12px;
  border-radius: 14px;
  background: var(--dsw-alias-bg-base, #fff);
  color: var(--dsw-alias-label-primary, #1f2328);
  border: 1px solid var(--dsw-alias-border-l3, rgba(0, 0, 0, .12));
  box-shadow: 0 10px 28px rgba(20, 42, 80, .16);
  font-size: 13px;
  line-height: 19px;
  white-space: normal;
  overflow-wrap: anywhere;
  animation: dsh-pet-pop .22s cubic-bezier(.2, .8, .3, 1);
}
.dsh-pet-bubble::after {
  content: "";
  position: absolute;
  right: 18px;
  bottom: -6px;
  width: 11px;
  height: 11px;
  background: var(--dsw-alias-bg-base, #fff);
  border-right: 1px solid var(--dsw-alias-border-l3, rgba(0, 0, 0, .12));
  border-bottom: 1px solid var(--dsw-alias-border-l3, rgba(0, 0, 0, .12));
  transform: rotate(45deg);
}
.dsh-pet-heart {
  position: absolute;
  bottom: 74px;
  color: #ff6b8a;
  font-size: 16px;
  line-height: 1;
  pointer-events: none;
  animation: dsh-pet-heart 1.15s ease-out forwards;
  text-shadow: 0 1px 2px rgba(255, 255, 255, .65);
}
@keyframes dsh-pet-float {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50% { transform: translateY(-4px) rotate(1deg); }
}
@keyframes dsh-pet-tail {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(8deg); }
}
@keyframes dsh-pet-spout {
  0%, 100% { transform: scale(.9); opacity: .7; }
  50% { transform: scale(1.08); opacity: 1; }
}
@keyframes dsh-pet-hop {
  0%, 100% { transform: translateY(0) scale(1); }
  40% { transform: translateY(-8px) scale(1.04); }
  70% { transform: translateY(1px) scale(.98); }
}
@keyframes dsh-pet-wag {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(14deg); }
}
@keyframes dsh-pet-pop {
  from { transform: translateY(4px) scale(.94); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}
@keyframes dsh-pet-heart {
  0% { transform: translateY(0) scale(.6); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(-34px) scale(1.15) rotate(8deg); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .dsh-pet-float, .dsh-pet-tail, .dsh-pet-spout, .dsh-pet-heart, .dsh-pet-bubble {
    animation: none !important;
  }
}
@media (max-width: 720px) {
  .dsh-pet-root { transform: scale(.85); transform-origin: bottom right; }
}
`

    /** Resolve one dictionary entry, falling back to Chinese when the seat has no translator. */
    function translate(t, key) {
      if (typeof t === 'function') {
        try {
          const value = t(key)
          if (typeof value === 'string' && value.length > 0) return value
        } catch {
          // A missing namespace must not blank the decoration.
        }
      }
      return FALLBACK[key] || key
    }

    /** The whale artwork; `blink` closes the eyes for one frame. */
    function PetArt({ blink }) {
      return h('svg', {
        className: 'dsh-pet-art',
        viewBox: '0 0 96 96',
        width: 96,
        height: 96,
        'aria-hidden': true,
      },
        h('ellipse', {
          className: 'dsh-pet-shadow',
          cx: 48,
          cy: 87,
          rx: 23,
          ry: 4.2,
          fill: 'rgba(15, 34, 64, .18)',
        }),
        h('g', { className: 'dsh-pet-tail' },
          h('path', {
            d: 'M77 57c7-1 11-5 12-11 3 2 4 5 3 8 3 1 5 3 5 6-5 1-10-1-13-3-2 2-5 3-8 2',
            fill: '#5E96F2',
            stroke: '#3B74D8',
            strokeWidth: 2,
            strokeLinejoin: 'round',
          }),
        ),
        h('g', { className: 'dsh-pet-float' },
          h('path', {
            d: 'M18 54c0-17 13-29 30-29s30 12 30 29c0 16-13 27-30 27S18 70 18 54Z',
            fill: '#6FA8FF',
            stroke: '#3B74D8',
            strokeWidth: 2,
          }),
          h('path', {
            d: 'M28 57c0-9 9-15 20-15s20 6 20 15-9 15-20 15-20-6-20-15Z',
            fill: '#E8F3FF',
            opacity: .94,
          }),
          h('path', {
            d: 'M18 58c-6-2-10-6-11-11 5 0 10 2 14 6',
            fill: '#5E96F2',
            stroke: '#3B74D8',
            strokeWidth: 2,
            strokeLinejoin: 'round',
          }),
          h('path', {
            d: 'M78 58c6-2 10-6 11-11-5 0-10 2-14 6',
            fill: '#5E96F2',
            stroke: '#3B74D8',
            strokeWidth: 2,
            strokeLinejoin: 'round',
          }),
          h('g', { className: blink ? 'dsh-pet-eyes is-blinking' : 'dsh-pet-eyes' },
            h('circle', { cx: 38, cy: 49, r: 3.2, fill: '#17365C' }),
            h('circle', { cx: 58, cy: 49, r: 3.2, fill: '#17365C' }),
          ),
          h('circle', { cx: 30, cy: 57, r: 4, fill: '#FF9DB1', opacity: .55 }),
          h('circle', { cx: 66, cy: 57, r: 4, fill: '#FF9DB1', opacity: .55 }),
          h('path', {
            d: 'M43 59c2 3 8 3 10 0',
            fill: 'none',
            stroke: '#17365C',
            strokeWidth: 2,
            strokeLinecap: 'round',
          }),
          h('path', {
            className: 'dsh-pet-spout',
            d: 'M48 23c-2-5 1-9 4-10-1 3 0 5 2 6-2 3-3 5-6 4Z',
            fill: '#C9E4FF',
            stroke: '#3B74D8',
            strokeWidth: 1.5,
          }),
        ),
      )
    }

    /**
     * The floating pet. The overlay layer is click-through; only the body
     * accepts pointer events, so the rest of the app stays usable.
     */
    function DesktopPet({ t }) {
      const tr = (key) => translate(t, key)
      const [pos, setPos] = React.useState(null)
      const [bubble, setBubble] = React.useState(null)
      const [hearts, setHearts] = React.useState([])
      const [blink, setBlink] = React.useState(false)
      const [happy, setHappy] = React.useState(false)
      const [dragging, setDragging] = React.useState(false)
      const dragRef = React.useRef(null)
      const timersRef = React.useRef([])
      const bubbleIdRef = React.useRef(0)

      React.useEffect(() => {
        let alive = true
        let blinkTimer = 0
        let closeTimer = 0
        const loop = () => {
          blinkTimer = window.setTimeout(() => {
            if (!alive) return
            setBlink(true)
            closeTimer = window.setTimeout(() => {
              if (alive) setBlink(false)
            }, 150)
            loop()
          }, 2600 + Math.random() * 2600)
        }
        loop()
        return () => {
          alive = false
          window.clearTimeout(blinkTimer)
          window.clearTimeout(closeTimer)
        }
      }, [])

      React.useEffect(() => () => {
        for (const timer of timersRef.current) window.clearTimeout(timer)
        timersRef.current = []
      }, [])

      const later = (fn, ms) => {
        const timer = window.setTimeout(fn, ms)
        timersRef.current.push(timer)
      }

      const poke = () => {
        const index = 1 + Math.floor(Math.random() * 5)
        const id = ++bubbleIdRef.current
        setBubble({ id, text: tr('hello' + index) })
        setHappy(true)
        const heart = { id: id + Math.random(), x: 28 + Math.random() * 36 }
        setHearts((current) => [...current, heart])
        later(() => setHappy(false), 520)
        later(() => setBubble((current) => (current && current.id === id ? null : current)), 3400)
        later(() => setHearts((current) => current.filter((item) => item.id !== heart.id)), 1400)
      }

      const onPointerDown = (event) => {
        if (event.button !== 0) return
        const element = event.currentTarget
        const rect = element.getBoundingClientRect()
        dragRef.current = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          left: rect.left,
          top: rect.top,
          moved: false,
        }
        setDragging(true)
        try { element.setPointerCapture(event.pointerId) } catch { /* ignore */ }
        try { element.focus({ preventScroll: true }) } catch { element.focus() }
        event.preventDefault()
      }

      const onPointerMove = (event) => {
        const drag = dragRef.current
        if (!drag || drag.pointerId !== event.pointerId) return
        const dx = event.clientX - drag.startX
        const dy = event.clientY - drag.startY
        if (!drag.moved && Math.hypot(dx, dy) > 4) drag.moved = true
        if (!drag.moved) return
        const maxLeft = Math.max(8, window.innerWidth - 104)
        const maxTop = Math.max(8, window.innerHeight - 104)
        setPos({
          left: Math.min(maxLeft, Math.max(8, drag.left + dx)),
          top: Math.min(maxTop, Math.max(8, drag.top + dy)),
        })
      }

      const onPointerEnd = (event, activate) => {
        const drag = dragRef.current
        if (!drag) return
        dragRef.current = null
        setDragging(false)
        try { event.currentTarget.releasePointerCapture(event.pointerId) } catch { /* ignore */ }
        if (activate && !drag.moved) poke()
      }

      const onKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          poke()
        }
      }

      const rootStyle = {
        position: 'fixed',
        width: 96,
        height: 96,
        pointerEvents: 'none',
        zIndex: 30,
        ...(pos ? { left: pos.left, top: pos.top } : { right: 24, bottom: 24 }),
      }

      return h(React.Fragment, null,
        h('style', null, CSS),
        h('div', { className: 'dsh-pet-root', style: rootStyle },
          bubble && h('div', {
            className: 'dsh-pet-bubble',
            key: bubble.id,
            role: 'status',
            'aria-live': 'polite',
          }, bubble.text),
          h('div', {
            className: 'dsh-pet-body' + (happy ? ' is-happy' : '') + (dragging ? ' is-dragging' : ''),
            role: 'button',
            tabIndex: 0,
            title: tr('hint'),
            'aria-label': tr('petName'),
            onPointerDown,
            onPointerMove,
            onPointerUp: (event) => onPointerEnd(event, true),
            onPointerCancel: (event) => onPointerEnd(event, false),
            onKeyDown,
          }, h(PetArt, { blink })),
          hearts.map((heart) => h('span', {
            className: 'dsh-pet-heart',
            key: heart.id,
            style: { left: heart.x },
            'aria-hidden': true,
          }, '♥')),
        ),
      )
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(
          () => ctx.locale.register(NS, { zh, en }),
          'desktop-pet: dictionaries',
        )
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'desktop-pet',
          order: 50,
          locale: NS,
        }, DesktopPet))
      },
    }
  },
})
