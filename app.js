/* ══════════════════════════════════════════════════════════
   HadeelGaming — app.js   (vanilla, no framework, no CDN runtime)
   ══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var KICK_SLUG = 'hadeelgaming';
  var LIVE_POLL_MS = 60000;    // re-check Kick every minute

  /* ─── icons ─── */
  var ICONS = {
    youtube: '<path fill="currentColor" d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z"/>',
    facebook: '<path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.6V13h2.8v8h3.1Z"/>',
    kick: '<path fill="currentColor" d="M3 3h5.4v5.6h1.8V5.8h1.8V3h5.4v5.6h-1.8v2.8h-1.8v1.2h1.8v2.8h1.8V21h-5.4v-2.8h-1.8v-2.8H8.4V21H3z"/>',
    tiktok: '<path fill="currentColor" d="M16.6 5.8a4.8 4.8 0 0 1-1-.9 4.7 4.7 0 0 1-1.1-2.6h-3.2v11.1a2.8 2.8 0 1 1-2-2.7V8.4a6 6 0 1 0 5.2 6V9a7.9 7.9 0 0 0 4.6 1.5V7.3a4.7 4.7 0 0 1-2.5-1.5Z"/>',
    instagram: '<path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.9 3.9 0 0 1-1.4-.9 3.9 3.9 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.9-.1Zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1 0 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2 0 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1 0-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1a3.5 3.5 0 0 0-.8-1.3 3.5 3.5 0 0 0-1.3-.8c-.4-.2-1-.3-2.1-.4-1.2 0-1.6-.1-4.7-.1Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Zm6.3-8.2a1.2 1.2 0 1 1-2.3 0 1.2 1.2 0 0 1 2.3 0Z"/>',
    play: '<path fill="currentColor" d="M8 5v14l11-7L8 5Z"/>',
    arrow: '<path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6"/>'
  };

  /* ─── channels ─── */
  var CHANNELS = [
    { id:'kick',      name:'Kick',      url:'https://kick.com/hadeelgaming', handle:'kick.com/hadeelgaming',
      brand:'#53fc18', sub:{ar:'البث المباشر',en:'Live streaming'} },
    { id:'tiktok',    name:'TikTok',    url:'https://www.tiktok.com/@hadeeljehad', handle:'@hadeeljehad',
      brand:'#ff3b5c', sub:{ar:'مقاطع وكليبات',en:'Clips & shorts'} },
    { id:'instagram', name:'Instagram', url:'https://www.instagram.com/hadeeljehad93/', handle:'@hadeeljehad93',
      brand:'#e1306c', sub:{ar:'صور وستوري',en:'Photos & stories'} },
    { id:'youtube',   name:'YouTube',   url:'https://www.youtube.com/@HadeelJehad7', handle:'@HadeelJehad7',
      brand:'#ff0033', sub:{ar:'فيديوهات',en:'Videos'} },
    { id:'facebook',  name:'Facebook',  url:'https://www.facebook.com/Hadeelo.Gaming', handle:'Hadeelo.Gaming',
      brand:'#1877f2', sub:{ar:'الصفحة الرسمية',en:'Official page'} }
  ];

  var SECTIONS = ['home', 'live', 'socials', 'support', 'contact'];
  var PAY_URL = 'https://streamlabs.com/hadeelmanasrah/tip';
  var langHooks = [];   // components that need to re-render their own copy

  /* ─── i18n ─── */
  var I18N = {
    ar: {
      navHome:'الرئيسية', navAbout:'عني', navLive:'البث',
      navSocials:'القنوات', navContact:'تواصل',
      heroTag:'جيمنج • بث مباشر • كل يوم الساعة 8',
      enterSite:'ادخل 💗', enterHint:'🔊 هيشغّل موسيقى الخلفية',
      unk:'تابع اللايف على Kick', checking:'بنشيّك على البث…', liveNow:'لايف دلوقتي على KICK', offNow:'مش لايف دلوقتي',
      watchLive:'شوف البث', explore:'استكشف', watchOnKick:'اتفرج على Kick',
      liveStatus:'حالة البث', aboutMe:'عن هديل',
      offTitle:'اللايف كل يوم الساعة 8', offSub:'اعمل فولو على Kick ومتفوّتش أي لايف',
      liveTitle:'البث شغال دلوقتي', liveSub:'ادخل الشات وقول سلام 👋',
      followers:'متابع', viewers:'مشاهد',
      autoRefresh:'بيتحدّث تلقائيًا كل دقيقة',
      connectTitle:'تواصل معايا',
      supportTitle:'ادعم هديل',
      supportLead:'لو المحتوى عاجبك وحابب تدعم، تقدر تبعت دعم من Streamlabs — أي مبلغ بيفرق وبيفرّحها.',
      supStep1:'دوس على زرار الدعم', supStep2:'هيفتحلك صفحة Streamlabs',
      supStep3:'اكتب المبلغ وأكّد التحويل',
      openInstapay:'ادعم هديل 💗', copyLink:'انسخ الرابط', copied:'اتنسخ ✓',
      scanQr:'امسح الكود بكاميرا الموبايل',
      musicOn:'شغّالة دلوقتي', musicOff:'اضغط للتشغيل', musicBlocked:'دوس في أي حتة عشان تشتغل',
      supportNote:'الدعم اختياري تمامًا — متابعتك ومشاهدتك للبث تفرق برضو.',
      contactMe:'للتواصل', contactSub:'للإعلانات والتعاون والشغل، ابعتلي على الإيميل.',
      rights:'جميع الحقوق محفوظة', devBy:'تطوير',
      ago:{d:'يوم',h:'ساعة',m:'دقيقة',now:'دلوقتي'}
    },
    en: {
      navHome:'HOME', navAbout:'ABOUT', navLive:'LIVE',
      navSocials:'SOCIALS', navContact:'CONTACT',
      heroTag:'GAMING • STREAMING • LIVE DAILY AT 8',
      enterSite:'ENTER 💗', enterHint:'🔊 Background music will play',
      unk:'Watch the live on Kick', checking:'Checking the stream…', liveNow:'LIVE NOW ON KICK', offNow:'Currently offline',
      watchLive:'WATCH LIVE', explore:'EXPLORE', watchOnKick:'WATCH ON KICK',
      liveStatus:'LIVE STATUS', aboutMe:'ABOUT HADEEL',
      offTitle:'Live every day at 8', offSub:'Follow on Kick so you never miss a stream',
      liveTitle:'Streaming right now', liveSub:'Jump in the chat and say hi 👋',
      followers:'followers', viewers:'watching',
      autoRefresh:'Refreshes automatically every minute',
      connectTitle:'CONNECT WITH ME',
      supportTitle:'SUPPORT HADEEL',
      supportLead:'If you enjoy the content and want to chip in, you can send a tip through Streamlabs — any amount means a lot.',
      supStep1:'Tap the support button', supStep2:'The Streamlabs page opens',
      supStep3:'Enter the amount and confirm',
      openInstapay:'Support on Streamlabs', copyLink:'Copy link', copied:'Copied ✓',
      scanQr:'Scan the code with your phone camera',
      musicOn:'Now playing', musicOff:'Tap to play', musicBlocked:'Tap anywhere to start',
      supportNote:'Support is entirely optional — following and watching the stream helps just as much.',
      contactMe:'CONTACT', contactSub:'For ads, collabs and business — reach me by email.',
      rights:'All rights reserved', devBy:'Dev by',
      ago:{d:'d',h:'h',m:'m',now:'just now'}
    }
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var svg = function (path, cls) {
    return '<svg viewBox="0 0 24 24"' + (cls ? ' class="' + cls + '"' : '') + ' aria-hidden="true">' + path + '</svg>';
  };
  var hexA = function (hex, a) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    var n = parseInt(h, 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
  };

  var lang = 'ar';
  var t = function () { return I18N[lang]; };
  var fmtNum = function (n) { return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US').format(n); };

  var count = function (v) {
    if (typeof v === 'number') return isFinite(v) ? v : null;
    if (typeof v === 'string' && v.trim() !== '') {
      var n = Number(v);
      return isFinite(n) ? n : null;
    }
    return null;
  };

  /* ══ socials, rail ══ */
  function renderSocials() {
    $('#socialGrid').innerHTML = CHANNELS.map(function (c, i) {
      return '<a class="soc" data-rv style="transition-delay:' + (i * 45) + 'ms;--brand:' + c.brand +
             ';--brand-soft:' + hexA(c.brand, .14) + ';--brand-line:' + hexA(c.brand, .34) + '"' +
             ' href="' + c.url + '" target="_blank" rel="noopener">' +
               '<i class="soc-shine" aria-hidden="true"></i>' +
               '<i class="soc-edge" aria-hidden="true"></i>' +
               (c.id === 'kick' ? '<span class="soc-live" id="kickLiveTag" hidden>LIVE</span>' : '') +
               '<span class="soc-ic">' + svg(ICONS[c.id]) + '<i class="soc-halo"></i></span>' +
               '<span class="soc-txt">' +
                 '<span class="soc-name">' + c.name + '</span>' +
                 '<span class="soc-sub">' + esc(c.sub[lang]) + '</span>' +
                 '<span class="soc-handle">' + esc(c.handle) + '</span>' +
               '</span>' +
               '<span class="soc-go">' + svg(ICONS.arrow) + '</span>' +
             '</a>';
    }).join('');

    $('#railItems').innerHTML = CHANNELS.map(function (c) {
      return '<a class="rail-a" style="--brand:' + c.brand + ';--brand-soft:' + hexA(c.brand, .16) + '"' +
             ' href="' + c.url + '" target="_blank" rel="noopener"' +
             ' aria-label="' + c.name + '" data-name="' + c.name + '">' + svg(ICONS[c.id]) + '</a>';
    }).join('');
  }

  /* ══ language ══ */
  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    $$('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var v = t()[k];
      if (!v) return;
      if (k === 'heroTag') {
        el.innerHTML = esc(v).replace(/•/g, '<i>•</i>');
      } else {
        el.textContent = v;
      }
    });

    $$('.lang-seg button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });

    document.title = lang === 'ar'
      ? 'هديل جيمنج | HadeelGaming'
      : 'HadeelGaming | Gaming · Streaming';

    renderSocials();
    paintLive();
    langHooks.forEach(function (fn) { fn(); });
    observeReveal();
    try { localStorage.setItem('hg_lang', lang); } catch (e) {}
  }

  /* ══ live status ══ */
  var liveState = 'checking';
  var liveData = null;

  function paintLive() {
    var label = liveState === 'live' ? t().liveNow : liveState === 'off' ? t().offNow : liveState === 'unk' ? t().unk : t().checking;

    var pill = $('#livePill');
    pill.setAttribute('data-state', liveState);
    $('.live-txt', pill).textContent = label;

    var st = $('#lmState');
    st.setAttribute('data-state', liveState);
    st.lastElementChild.textContent = label;

    var live = liveState === 'live';
    $('#lmTitle').textContent = live ? (liveData && liveData.title) || t().liveTitle : t().offTitle;
    $('#lmSub').textContent = live ? (liveData && liveData.category) || t().liveSub : t().offSub;
    $('#thumbBadge').hidden = !live;

    var tag = $('#kickLiveTag');
    if (tag) tag.hidden = !live;

    var thumbBox = $('#liveThumb'), thumbImg = $('#liveThumbImg');
    if (live && liveData && liveData.thumbnail) {
      thumbImg.src = liveData.thumbnail;
      thumbBox.classList.add('has-thumb');
    } else {
      thumbImg.src = 'logo-512.webp';
      thumbBox.classList.remove('has-thumb');
    }

    var fRow = $('#statFollowers'), vRow = $('#statViewers');
    var followers = liveData ? count(liveData.followers) : null;
    var viewers = liveData ? count(liveData.viewers) : null;

    if (followers !== null) {
      $('#statFollowersVal').textContent = fmtNum(followers);
      fRow.hidden = false;
    } else fRow.hidden = true;

    if (live && viewers !== null) {
      $('#statViewersVal').textContent = fmtNum(viewers);
      vRow.hidden = false;
    } else vRow.hidden = true;
  }

  function mountPlayer() {
    var box = $('#livePlayer');
    if (box.firstChild) { box.hidden = false; return; }
    var f = document.createElement('iframe');
    f.src = 'https://player.kick.com/' + KICK_SLUG + '?parent=' + encodeURIComponent(location.hostname) + '&autoplay=true&muted=false';
    f.allowFullscreen = true;
    f.allow = 'autoplay; fullscreen; picture-in-picture';
    f.title = 'HadeelGaming — Kick live stream';
    f.loading = 'lazy';
    box.appendChild(f);
    box.hidden = false;
  }

  function checkLive() {
    mountPlayer();
    liveState = 'unk'; paintLive();
    return;
    fetch('/api/live?t=' + Date.now(), { headers: { accept: 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        liveData = d;
        if (d && typeof d.live === 'boolean') { liveState = d.live ? 'live' : 'off'; }
        else { liveState = 'unk'; }
        paintLive();
      })
      .catch(function () { liveState = 'unk'; liveData = null; paintLive(); });
  }

  /* ══ reveal ══ */
  var io = null, rvArmed = false, rvTick = false;

  function revealAll() { $$('[data-rv]').forEach(function (el) { el.classList.add('in'); }); }

  function sweepReveal() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    $$('[data-rv]:not(.in)').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('in');
    });
  }

  function scheduleSweep() {
    if (rvTick) return;
    rvTick = true;
    requestAnimationFrame(function () { rvTick = false; sweepReveal(); });
  }

  function observeReveal() {
    if (!rvArmed) {
      rvArmed = true;
      document.documentElement.classList.add('rv-on');
      addEventListener('scroll', scheduleSweep, { passive: true });
      addEventListener('resize', scheduleSweep, { passive: true });
      setTimeout(sweepReveal, 1200);
      setTimeout(revealAll, 6000);
    }
    if ('IntersectionObserver' in window) {
      if (!io) {
        io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
      }
      $$('[data-rv]:not(.in)').forEach(function (el) { io.observe(el); });
    }
    requestAnimationFrame(sweepReveal);
  }

  /* ══ section dots + nav highlight ══ */
  function initSectionNav() {
    var dots = $('#dots');
    dots.innerHTML = SECTIONS.map(function (id) {
      return '<a class="dot" href="#' + id + '" aria-label="' + id + '"></a>';
    }).join('');

    var mark = function () {
      var y = scrollY + innerHeight * 0.35;
      var current = SECTIONS[0];
      SECTIONS.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      });
      $$('.dot', dots).forEach(function (d) {
        d.setAttribute('aria-current', d.getAttribute('href') === '#' + current ? 'true' : 'false');
      });
      $$('.nav-links a').forEach(function (a) {
        var h = a.getAttribute('href');
        a.classList.toggle('on', h === '#' + current || (current === 'live' && h === '#about'));
      });
      $('#toTop').classList.toggle('show', scrollY > 500);
    };

    addEventListener('scroll', mark, { passive: true });
    mark();
  }

  /* ══ nav ══ */
  function initNav() {
    var nav = $('#nav'), burger = $('#burger'), links = $('#navLinks');

    addEventListener('scroll', function () {
      nav.classList.toggle('stuck', scrollY > 20);
    }, { passive: true });

    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    $('#toTop').addEventListener('click', function () {
      scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ══ music player ══
     Click-to-play only: the track never attempts to start itself. Nothing
     plays until the visitor presses the play button in the player panel. */
  function initPlayer() {
    var el = $('#player'), audio = $('#audio');
    if (!el || !audio) return;

    var head = $('#plHead');
    var playBtn = $('#plPlay'), muteBtn = $('#plMute');
    var backBtn = $('#plBack5'), fwdBtn = $('#plFwd5');
    var seek = $('#plSeek'), vol = $('#plVol'), volNum = $('#plVolNum');
    var timeEl = $('#plTime'), stateEl = $('#plState');
    var seeking = false;

    var prefs = { vol: 35, muted: false, rate: 1, open: false };
    try {
      var saved = JSON.parse(localStorage.getItem('hg_music') || '{}');
      Object.keys(prefs).forEach(function (k) {
        if (saved[k] !== undefined) prefs[k] = saved[k];
      });
    } catch (e) {}

    var save = function () {
      try {
        localStorage.setItem('hg_music', JSON.stringify({
          vol: prefs.vol, muted: prefs.muted, rate: prefs.rate, open: prefs.open
        }));
      } catch (e) {}
    };

    var fmt = function (s) {
      if (!isFinite(s)) return '0:00';
      var m = Math.floor(s / 60), sec = Math.floor(s % 60);
      return m + ':' + (sec < 10 ? '0' : '') + sec;
    };

    var setState = function (s) {
      el.setAttribute('data-state', s);
      var key = s === 'playing' ? 'musicOn' : s === 'blocked' ? 'musicBlocked' : 'musicOff';
      stateEl.setAttribute('data-i18n', key);
      stateEl.textContent = t()[key];
      playBtn.setAttribute('aria-label', s === 'playing' ? 'Pause' : 'Play');
    };

    audio.volume = prefs.vol / 100;
    audio.muted = !!prefs.muted;
    audio.playbackRate = prefs.rate;
    vol.value = prefs.vol;
    volNum.textContent = prefs.vol;
    el.classList.toggle('muted', !!prefs.muted);
    if (prefs.open) { el.classList.add('open'); head.setAttribute('aria-expanded', 'true'); }
    $$('.pl-speeds button').forEach(function (b) {
      b.setAttribute('aria-pressed', Number(b.dataset.rate) === prefs.rate ? 'true' : 'false');
    });
    setState('idle');

    /* pull the file into a blob purely so the scrub bar is seekable once it
       finishes loading — this does not start playback on its own */
    function markSeekable(on) {
      seek.disabled = !on;
      seek.title = on ? '' : 'loading…';
    }
    markSeekable(false);

    function pickSource() {
      var canWebm = audio.canPlayType('audio/webm; codecs=opus');
      return 'music.mp3';
    }

    function adoptBlob(url) {
      var at = audio.currentTime;
      var wasPlaying = !audio.paused;
      audio.src = url;
      audio.load();
      var restore = function () {
        audio.removeEventListener('loadedmetadata', restore);
        try { if (at > 0.2) audio.currentTime = at; } catch (e) {}
        if (wasPlaying) tryPlay();
        markSeekable(true);
      };
      audio.addEventListener('loadedmetadata', restore);
    }

    fetch(pickSource())
      .then(function (r) { return r.ok ? r.blob() : null; })
      .then(function (b) { if (b) adoptBlob(URL.createObjectURL(b)); })
      .catch(function () { /* stay on the streaming source; seek stays disabled */ });

    function tryPlay() {
      var p = audio.play();
      if (!p || !p.then) { setState('playing'); return; }
      p.then(function () { setState('playing'); })
       .catch(function () { setState('blocked'); });
    }

    /* ── controls ── */
    head.addEventListener('click', function () {
      var open = el.classList.toggle('open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
      prefs.open = open;
      save();
    });

    playBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (audio.paused) tryPlay();
      else { audio.pause(); setState('idle'); }
      save();
    });

    function skip(delta) {
      if (!isFinite(audio.duration)) return;
      var next = audio.currentTime + delta;
      if (next < 0) next = 0;
      if (next > audio.duration) next = audio.duration;
      audio.currentTime = next;
      if (!seeking && audio.duration) {
        seek.value = Math.round((next / audio.duration) * 1000);
      }
    }

    if (backBtn) backBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      skip(-5);
    });
    if (fwdBtn) fwdBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      skip(5);
    });

    muteBtn.addEventListener('click', function () {
      audio.muted = !audio.muted;
      prefs.muted = audio.muted;
      el.classList.toggle('muted', audio.muted);
      save();
    });

    vol.addEventListener('input', function () {
      var v = Number(vol.value);
      audio.volume = v / 100;
      volNum.textContent = v;
      prefs.vol = v;
      if (v > 0 && audio.muted) { audio.muted = false; prefs.muted = false; el.classList.remove('muted'); }
      save();
    });

    $$('.pl-speeds button').forEach(function (b) {
      b.addEventListener('click', function () {
        var r = Number(b.dataset.rate);
        audio.playbackRate = r;
        prefs.rate = r;
        $$('.pl-speeds button').forEach(function (o) {
          o.setAttribute('aria-pressed', o === b ? 'true' : 'false');
        });
        save();
      });
    });

    seek.addEventListener('input', function () { seeking = true; });
    seek.addEventListener('change', function () {
      if (audio.duration && !seek.disabled) {
        try { audio.currentTime = (Number(seek.value) / 1000) * audio.duration; } catch (e) {}
      }
      seeking = false;
    });

    audio.addEventListener('timeupdate', function () {
      if (!audio.duration) return;
      if (!seeking) seek.value = Math.round((audio.currentTime / audio.duration) * 1000);
      timeEl.textContent = fmt(audio.currentTime) + ' / ' + fmt(audio.duration);
    });
    audio.addEventListener('loadedmetadata', function () {
      timeEl.textContent = fmt(0) + ' / ' + fmt(audio.duration);
    });
    audio.addEventListener('play', function () { setState('playing'); });
    audio.addEventListener('pause', function () { if (!audio.ended) setState('idle'); });

    langHooks.push(function () { setState(el.getAttribute('data-state')); });

    // the entry-gate tap is the user gesture that unlocks autoplay
    document.addEventListener('zesta:enter', function () {
      if (audio.paused) tryPlay();
    }, { once: true });
  }

  /* ══ floating hearts ══ */
  function initHearts() {
    var box = $('#hearts'); if (!box) return;
    var s = '';
    for (var i = 0; i < 16; i++) {
      s += '<i style="left:' + Math.round(Math.random() * 100) + '%;font-size:' + (12 + Math.round(Math.random() * 22)) +
           'px;animation-duration:' + (9 + Math.round(Math.random() * 12)) + 's;animation-delay:-' + Math.round(Math.random() * 14) + 's">' +
           (i % 3 ? '♥' : '💗') + '</i>';
    }
    box.innerHTML = s;
  }
  initHearts();

  /* ══ entry gate ══ */
  function initEntryGate() {
    var gate = $('#entryGate'), btn = $('#entryBtn');
    if (!gate || !btn) return;
    btn.addEventListener('click', function () {
      gate.classList.add('done');
      document.dispatchEvent(new Event('zesta:enter'));
      setTimeout(function () { if (gate.parentNode) gate.parentNode.removeChild(gate); }, 650);
    });
  }

  /* ══ copy the payment link ══ */
  function initCopyPay() {
    var btn = $('#copyPay');
    if (!btn) return;
    var label = $('span[data-i18n]', btn);

    btn.addEventListener('click', function () {
      var done = function () {
        var original = t().copyLink;
        label.textContent = t().copied;
        btn.classList.add('copied');
        setTimeout(function () {
          label.textContent = original;
          btn.classList.remove('copied');
        }, 1800);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(PAY_URL).then(done, fallbackCopy);
      } else fallbackCopy();

      function fallbackCopy() {
        var ta = document.createElement('textarea');
        ta.value = PAY_URL;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  }

  /* ══ animated pixel field ══ */
  function initFx() {
    var c = $('#fx');
    if (!c || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var ctx = c.getContext('2d', { alpha: true });
    var w = 0, h = 0, dpr = Math.min(devicePixelRatio || 1, 2);
    var grid = [], pixels = [], streaks = [];
    var GAP = 26;
    var frameNo = 0;
    var reduced = false;

    var BUCKETS = 10, MAX_A = 0.72;
    var buckets = [], bucketColour = [];
    for (var q = 0; q < BUCKETS; q++) {
      buckets.push([]);
      bucketColour.push('rgba(255,79,154,' + (((q + 0.5) / BUCKETS) * MAX_A).toFixed(3) + ')');
    }

    function build() {
      w = c.width = innerWidth * dpr;
      h = c.height = innerHeight * dpr;
      c.style.width = innerWidth + 'px';
      c.style.height = innerHeight + 'px';

      var small = innerWidth < 760;
      var gap = (small ? GAP - 4 : GAP - 9) * dpr;

      grid = [];
      var cols = Math.ceil(w / gap) + 1, rows = Math.ceil(h / gap) + 1;
      for (var gx = 0; gx < cols; gx++) {
        for (var gy = 0; gy < rows; gy++) {
          if (Math.random() > (small ? 0.40 : 0.52)) continue;
          grid.push({
            x: gx * gap, y: gy * gap,
            s: (Math.random() < 0.22 ? 3 : 2) * dpr,
            base: Math.random() * 0.22 + 0.08,
            amp: Math.random() * 0.40 + 0.18,
            sp: Math.random() * 0.016 + 0.004,
            ph: Math.random() * Math.PI * 2
          });
        }
      }

      pixels = [];
      var pc = small ? 80 : 190;
      for (var i = 0; i < pc; i++) {
        pixels.push({
          x: Math.random() * w, y: Math.random() * h,
          s: (Math.random() < 0.22 ? 4 : Math.random() < 0.5 ? 3 : 2) * dpr,
          vx: (Math.random() - 0.5) * 0.16 * dpr,
          vy: -(Math.random() * 0.26 + 0.06) * dpr,
          a: Math.random() * 0.5 + 0.32,
          tw: Math.random() * Math.PI * 2,
          tws: Math.random() * 0.03 + 0.01
        });
      }

      streaks = [];
      var sc = small ? 4 : 9;
      for (var j = 0; j < sc; j++) {
        streaks.push({
          x: Math.random() * w, y: Math.random() * h,
          len: (Math.random() * 130 + 60) * dpr,
          sp: (Math.random() * 0.6 + 0.25) * dpr,
          a: Math.random() * 0.18 + 0.05
        });
      }
    }

    function frame() {
      requestAnimationFrame(frame);
      frameNo++;
      if (reduced && frameNo % 2) return;

      ctx.clearRect(0, 0, w, h);

      for (var b = 0; b < BUCKETS; b++) buckets[b].length = 0;
      for (var i = 0; i < grid.length; i++) {
        var g = grid[i];
        g.ph += g.sp;
        var a = g.base + Math.max(0, Math.sin(g.ph)) * g.amp;
        var bi = (a * BUCKETS / MAX_A) | 0;
        if (bi >= BUCKETS) bi = BUCKETS - 1;
        buckets[bi].push(g);
      }
      for (var bk = 0; bk < BUCKETS; bk++) {
        var list = buckets[bk];
        if (!list.length) continue;
        ctx.fillStyle = bucketColour[bk];
        for (var n = 0; n < list.length; n++) {
          ctx.fillRect(list[n].x, list[n].y, list[n].s, list[n].s);
        }
      }

      ctx.lineCap = 'round';
      for (var k = 0; k < streaks.length; k++) {
        var s = streaks[k];
        s.x += s.sp; s.y += s.sp;
        if (s.x > w + s.len || s.y > h + s.len) {
          s.x = -s.len - Math.random() * w * 0.4;
          s.y = -s.len + Math.random() * h;
        }
        var lg = ctx.createLinearGradient(s.x, s.y, s.x + s.len, s.y + s.len);
        lg.addColorStop(0, 'rgba(255,79,154,0)');
        lg.addColorStop(0.5, 'rgba(255,111,177,' + s.a + ')');
        lg.addColorStop(1, 'rgba(255,79,154,0)');
        ctx.strokeStyle = lg;
        ctx.lineWidth = 1.1 * dpr;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.len, s.y + s.len);
        ctx.stroke();
      }

      for (var b2 = 0; b2 < BUCKETS; b2++) buckets[b2].length = 0;
      for (var p = 0; p < pixels.length; p++) {
        var px = pixels[p];
        px.x += px.vx; px.y += px.vy;
        px.tw += px.tws;
        if (px.y < -px.s) { px.y = h + px.s; px.x = Math.random() * w; }
        if (px.x < -px.s) px.x = w; else if (px.x > w + px.s) px.x = 0;
        px.cur = px.a * (0.62 + 0.38 * Math.sin(px.tw));
        var pbi = (px.cur * BUCKETS / 0.9) | 0;
        buckets[pbi >= BUCKETS ? BUCKETS - 1 : pbi].push(px);
      }
      var halo = 2 * dpr;
      for (var pb = 0; pb < BUCKETS; pb++) {
        var plist = buckets[pb];
        if (!plist.length) continue;
        var pa = ((pb + 0.5) / BUCKETS) * 0.9;
        ctx.fillStyle = 'rgba(255,79,154,' + (pa * 0.22).toFixed(3) + ')';
        for (var m = 0; m < plist.length; m++) {
          ctx.fillRect(plist[m].x - halo, plist[m].y - halo, plist[m].s + halo * 2, plist[m].s + halo * 2);
        }
        ctx.fillStyle = 'rgba(255,156,200,' + pa.toFixed(3) + ')';
        for (var m2 = 0; m2 < plist.length; m2++) {
          ctx.fillRect(plist[m2].x, plist[m2].y, plist[m2].s, plist[m2].s);
        }
      }
    }

    build();
    addEventListener('resize', build, { passive: true });

    var t0 = performance.now(), f0 = 0;
    var probe = setInterval(function () {
      var dt = performance.now() - t0;
      var fps = ((frameNo - f0) * 1000) / dt;
      if (fps < 34) reduced = true;
      clearInterval(probe);
    }, 1600);

    requestAnimationFrame(frame);
  }

  /* ══ cursor glow ══ */
  function initCursor() {
    var g = $('.cursor-glow');
    if (!g || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
    addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!running) { running = true; requestAnimationFrame(loop); }
    }, { passive: true });
    function loop() {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
      g.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) requestAnimationFrame(loop);
      else running = false;
    }
  }

  /* ══ boot ══ */
  function boot() {
    $('#yr').textContent = new Date().getFullYear();

    initEntryGate();

    var savedLang = null;
    try { savedLang = localStorage.getItem('hg_lang'); } catch (e) {}
    applyLang(savedLang === 'en' ? 'en' : 'ar');

    $$('.lang-seg button').forEach(function (b) {
      b.addEventListener('click', function () { applyLang(b.dataset.lang); });
    });

    $$('.panel, .sec-head, .foot-in').forEach(function (el) {
      el.setAttribute('data-rv', '');
    });

    initNav();
    initSectionNav();
    initCopyPay();
    initPlayer();
    initFx();
    initCursor();
    observeReveal();

    checkLive();
    setInterval(checkLive, LIVE_POLL_MS);
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) checkLive();
    });

    var b = $('#boot');
    if (b) {
      var hero = $('.hero-logo img');
      var hide = function () { b.classList.add('done'); };
      if (hero && hero.complete) hide();
      else if (hero) hero.addEventListener('load', hide, { once: true });
      setTimeout(hide, 900);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

/* ══ basic code-view deterrent (Ctrl+U, F12, right-click) ══ */
(function () {
  document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  document.addEventListener('keydown', function (e) {
    var k = (e.key || '').toLowerCase();
    var ctrl = e.ctrlKey || e.metaKey;
    if (e.key === 'F12' ||
        (ctrl && (k === 'u' || k === 's')) ||
        (ctrl && e.shiftKey && (k === 'i' || k === 'j' || k === 'c')) ||
        (e.metaKey && e.altKey && (k === 'i' || k === 'u'))) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
})();
