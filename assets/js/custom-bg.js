(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;

  if (!root || !body) {
    return;
  }

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canUseFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  var bg = document.createElement("div");
  bg.className = "falling-lines-bg";
  bg.setAttribute("aria-hidden", "true");
  var bendLines = [];

  var createLayer = function (className, lineCount, profile) {
    var layer = document.createElement("div");
    layer.className = "line-container " + className;

    for (var i = 0; i < lineCount; i += 1) {
      var line = document.createElement("span");
      var tierRoll = Math.random();
      var tier = "mid";
      if (tierRoll < profile.thickRatio) {
        tier = "thick";
      } else if (tierRoll > profile.thinStart) {
        tier = "thin";
      }

      line.dataset.tier = tier;
      if (Math.random() < (profile.heroRatio || 0)) {
        line.dataset.hero = "true";
      }
      line.style.animationDuration = (profile.speedMin + Math.random() * profile.speedRange).toFixed(2) + "s";
      line.style.animationDelay = (-Math.random() * profile.delayRange).toFixed(2) + "s";
      var drift = profile.driftMin + Math.random() * profile.driftRange;

      line.style.setProperty("--line-lean", (profile.leanMin + Math.random() * profile.leanRange).toFixed(2) + "deg");
      line.style.setProperty("--fall-x-start", "0vh");
      line.style.setProperty("--fall-y-start", profile.fallStart.toFixed(2) + "vh");
      line.style.setProperty("--fall-x-end", drift.toFixed(2) + "vh");
      line.style.setProperty("--fall-y-end", profile.fallEnd.toFixed(2) + "vh");
      line.style.setProperty("--star-twinkle-delay", (-Math.random() * 3.2).toFixed(2) + "s");
      line.style.setProperty("--star-rotation", (Math.random() * 360).toFixed(2) + "deg");
      line.style.setProperty("--star-head-scale", (1.02 + Math.random() * 0.86).toFixed(2));

      if (tier === "thick") {
        line.style.setProperty("--line-w", (profile.thickWidthMin + Math.random() * profile.thickWidthRange).toFixed(2) + "px");
        line.style.setProperty("--line-h", (profile.thickHeightMin + Math.random() * profile.thickHeightRange).toFixed(2) + "%");
        line.style.setProperty("--line-opacity", (profile.thickOpacityMin + Math.random() * profile.thickOpacityRange).toFixed(2));
      } else if (tier === "thin") {
        line.style.setProperty("--line-w", (profile.thinWidthMin + Math.random() * profile.thinWidthRange).toFixed(2) + "px");
        line.style.setProperty("--line-h", (profile.thinHeightMin + Math.random() * profile.thinHeightRange).toFixed(2) + "%");
        line.style.setProperty("--line-opacity", (profile.thinOpacityMin + Math.random() * profile.thinOpacityRange).toFixed(2));
      } else {
        line.style.setProperty("--line-w", (profile.midWidthMin + Math.random() * profile.midWidthRange).toFixed(2) + "px");
        line.style.setProperty("--line-h", (profile.midHeightMin + Math.random() * profile.midHeightRange).toFixed(2) + "%");
        line.style.setProperty("--line-opacity", (profile.midOpacityMin + Math.random() * profile.midOpacityRange).toFixed(2));
      }

      line.style.setProperty("--line-mt", (profile.marginTopMin + Math.random() * profile.marginTopRange).toFixed(2) + "%");
      line.style.setProperty("--line-sway-x", "0px");
      line.style.setProperty("--line-sway-rot", "0deg");
      line.style.setProperty("--line-slow-y", "0px");

      var anchorRatio = lineCount > 1 ? i / (lineCount - 1) : 0.5;
      bendLines.push({
        el: line,
        anchorRatio: anchorRatio,
        jitterRatio: -0.03 + Math.random() * 0.06,
        yRatio: 0.1 + Math.random() * 0.8,
        maxPush: profile.bendPush,
        maxRot: profile.bendRot,
        maxSlow: profile.slowLift,
        sway: 0,
        rot: 0,
        slow: 0,
      });

      layer.appendChild(line);
    }

    return layer;
  };

  var isMobile = window.innerWidth < 768;

  var backLayer = createLayer("line-back", isMobile ? 24 : 36, {
    thickRatio: 0.1,
    thinStart: 0.7,
    speedMin: 6.4,
    speedRange: 4.6,
    delayRange: 10,
    thickWidthMin: 6,
    thickWidthRange: 5,
    thickHeightMin: 34,
    thickHeightRange: 28,
    thickOpacityMin: 0.52,
    thickOpacityRange: 0.16,
    midWidthMin: 4,
    midWidthRange: 4,
    midHeightMin: 40,
    midHeightRange: 32,
    midOpacityMin: 0.44,
    midOpacityRange: 0.2,
    thinWidthMin: 2,
    thinWidthRange: 3,
    thinHeightMin: 46,
    thinHeightRange: 30,
    thinOpacityMin: 0.36,
    thinOpacityRange: 0.2,
    marginTopMin: -28,
    marginTopRange: 26,
    leanMin: -6,
    leanRange: 12,
    fallStart: -215,
    fallEnd: 245,
    driftMin: -26,
    driftRange: 52,
    bendPush: 10,
    bendRot: 1.2,
    slowLift: 46,
    heroRatio: 0.015,
  });

  var midLayer = createLayer("line-mid", isMobile ? 36 : 52, {
    thickRatio: 0.24,
    thinStart: 0.78,
    speedMin: 4.9,
    speedRange: 4.2,
    delayRange: 8.6,
    thickWidthMin: 8,
    thickWidthRange: 7,
    thickHeightMin: 30,
    thickHeightRange: 26,
    thickOpacityMin: 0.7,
    thickOpacityRange: 0.2,
    midWidthMin: 5,
    midWidthRange: 6,
    midHeightMin: 36,
    midHeightRange: 30,
    midOpacityMin: 0.58,
    midOpacityRange: 0.2,
    thinWidthMin: 2,
    thinWidthRange: 4,
    thinHeightMin: 40,
    thinHeightRange: 28,
    thinOpacityMin: 0.46,
    thinOpacityRange: 0.2,
    marginTopMin: -24,
    marginTopRange: 24,
    leanMin: -5,
    leanRange: 10,
    fallStart: -230,
    fallEnd: 268,
    driftMin: -22,
    driftRange: 44,
    bendPush: 14,
    bendRot: 1.75,
    slowLift: 62,
    heroRatio: 0.03,
  });

  var frontLayer = createLayer("line-front", isMobile ? 50 : 72, {
    thickRatio: 0.42,
    thinStart: 0.84,
    speedMin: 3.6,
    speedRange: 3.2,
    delayRange: 7.4,
    thickWidthMin: 10,
    thickWidthRange: 8,
    thickHeightMin: 24,
    thickHeightRange: 24,
    thickOpacityMin: 0.82,
    thickOpacityRange: 0.16,
    midWidthMin: 6,
    midWidthRange: 7,
    midHeightMin: 30,
    midHeightRange: 28,
    midOpacityMin: 0.68,
    midOpacityRange: 0.2,
    thinWidthMin: 3,
    thinWidthRange: 4,
    thinHeightMin: 34,
    thinHeightRange: 24,
    thinOpacityMin: 0.54,
    thinOpacityRange: 0.2,
    marginTopMin: -22,
    marginTopRange: 22,
    leanMin: -4,
    leanRange: 8,
    fallStart: -246,
    fallEnd: 300,
    driftMin: -16,
    driftRange: 32,
    bendPush: 18,
    bendRot: 2.35,
    slowLift: 80,
    heroRatio: 0.065,
  });

  var stardust = document.createElement("div");
  stardust.className = "stardust-layer";

  var aura = document.createElement("div");
  aura.className = "cursor-aura";

  bg.appendChild(stardust);
  bg.appendChild(backLayer);
  bg.appendChild(midLayer);
  bg.appendChild(frontLayer);
  bg.appendChild(aura);
  body.prepend(bg);

  var cursorFx = null;
  var impactEnergy = 0;
  if (!prefersReducedMotion && canUseFinePointer) {
    body.classList.add("cursor-fx-enabled");
    root.classList.add("cursor-fx-enabled");

    var cursorLayer = document.createElement("div");
    cursorLayer.className = "cursor-fx-layer";
    cursorLayer.setAttribute("aria-hidden", "true");

    var cursorRing = document.createElement("div");
    cursorRing.className = "cursor-fx-ring";

    var cursorCore = document.createElement("div");
    cursorCore.className = "cursor-fx-core";

    cursorLayer.appendChild(cursorRing);
    cursorLayer.appendChild(cursorCore);
    body.appendChild(cursorLayer);

    cursorFx = {
      layer: cursorLayer,
      ring: cursorRing,
      core: cursorCore,
      targetX: window.innerWidth * 0.5,
      targetY: window.innerHeight * 0.5,
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
      trails: [],
    };

    for (var trailIndex = 0; trailIndex < 6; trailIndex += 1) {
      var trail = document.createElement("span");
      trail.className = "cursor-fx-trail";
      trail.style.setProperty("--trail-size", (12 - trailIndex * 1.4).toFixed(2) + "px");
      trail.style.setProperty("--trail-opacity", (0.3 - trailIndex * 0.042).toFixed(3));
      cursorLayer.appendChild(trail);
      cursorFx.trails.push({
        el: trail,
        x: cursorFx.x,
        y: cursorFx.y,
      });
    }

    var interactiveSelector = "a, button, summary, [role='button'], .clickable, .btn";
    var textInputSelector = "input, textarea, [contenteditable='true'], [contenteditable='']";

    document.addEventListener(
      "pointerover",
      function (event) {
        var target = event.target;
        if (!target || !target.closest) {
          return;
        }

        if (target.closest(textInputSelector)) {
          body.classList.remove("cursor-fx-hover");
          return;
        }

        if (target.closest(interactiveSelector)) {
          body.classList.add("cursor-fx-hover");
        } else {
          body.classList.remove("cursor-fx-hover");
        }
      },
      { passive: true }
    );

    document.addEventListener(
      "pointerdown",
      function () {
        body.classList.add("cursor-fx-pressed");
      },
      { passive: true }
    );

    document.addEventListener(
      "pointerup",
      function () {
        body.classList.remove("cursor-fx-pressed");
      },
      { passive: true }
    );

    document.addEventListener(
      "click",
      function (event) {
        if (!cursorFx) {
          return;
        }

        impactEnergy = 1;
        root.style.setProperty("--flow-impact-x", (event.clientX / window.innerWidth * 100).toFixed(2) + "%");
        root.style.setProperty("--flow-impact-y", (event.clientY / window.innerHeight * 100).toFixed(2) + "%");

        var wave = document.createElement("span");
        wave.className = "cursor-click-wave";
        wave.style.left = event.clientX + "px";
        wave.style.top = event.clientY + "px";
        cursorFx.layer.appendChild(wave);
        wave.addEventListener("animationend", function () {
          wave.remove();
        });

        for (var i = 0; i < 9; i += 1) {
          var spark = document.createElement("span");
          spark.className = "cursor-click-spark";
          spark.style.left = event.clientX + "px";
          spark.style.top = event.clientY + "px";
          spark.style.setProperty("--spark-angle", (i * 40 + Math.random() * 20 - 10).toFixed(2) + "deg");
          spark.style.setProperty("--spark-distance", (20 + Math.random() * 26).toFixed(2) + "px");
          spark.style.setProperty("--spark-size", (2.2 + Math.random() * 2.2).toFixed(2) + "px");
          cursorFx.layer.appendChild(spark);
          spark.addEventListener("animationend", function () {
            this.remove();
          });
        }
      },
      { passive: true }
    );
  }

  if (!prefersReducedMotion) {
    var pointerX = 0;
    var pointerY = 0;
    var pointerXPct = 50;
    var pointerYPct = 50;
    var hasPointerMoved = false;

    window.addEventListener(
      "pointermove",
      function (event) {
        var x = event.clientX / window.innerWidth - 0.5;
        var y = event.clientY / window.innerHeight - 0.5;

        pointerX = x;
        pointerY = y;
        pointerXPct = event.clientX / window.innerWidth;
        pointerYPct = event.clientY / window.innerHeight;
        hasPointerMoved = true;

        if (cursorFx) {
          cursorFx.targetX = event.clientX;
          cursorFx.targetY = event.clientY;
        }
      },
      { passive: true }
    );

    var smoothX = 0;
    var smoothY = 0;
    var smoothXPct = 0.5;
    var smoothYPct = 0.5;
    var prevSmoothX = 0;
    var prevSmoothY = 0;
    var vortexX = 0;
    var vortexY = 0;

    var animatePointer = function () {
      smoothX += (pointerX - smoothX) * 0.08;
      smoothY += (pointerY - smoothY) * 0.08;
      smoothXPct += (pointerXPct - smoothXPct) * 0.1;
      smoothYPct += (pointerYPct - smoothYPct) * 0.1;

      root.style.setProperty("--flow-x-back", (smoothX * 10).toFixed(2) + "px");
      root.style.setProperty("--flow-y-back", (smoothY * 8).toFixed(2) + "px");
      root.style.setProperty("--flow-x-mid", (smoothX * 20).toFixed(2) + "px");
      root.style.setProperty("--flow-y-mid", (smoothY * 15).toFixed(2) + "px");
      root.style.setProperty("--flow-x-front", (smoothX * 34).toFixed(2) + "px");
      root.style.setProperty("--flow-y-front", (smoothY * 24).toFixed(2) + "px");
      root.style.setProperty("--cursor-x", (smoothXPct * 100).toFixed(2) + "%");
      root.style.setProperty("--cursor-y", (smoothYPct * 100).toFixed(2) + "%");

      var frameVelocityX = (smoothX - prevSmoothX) * window.innerWidth;
      var frameVelocityY = (smoothY - prevSmoothY) * window.innerHeight;
      prevSmoothX = smoothX;
      prevSmoothY = smoothY;

      vortexX += ((frameVelocityX * 1.7) - vortexX) * 0.16;
      vortexY += ((frameVelocityY * 1.4) - vortexY) * 0.16;
      root.style.setProperty("--flow-vortex-x", vortexX.toFixed(2) + "px");
      root.style.setProperty("--flow-vortex-y", vortexY.toFixed(2) + "px");

      var pointerPx = smoothXPct * window.innerWidth;
      var pointerPy = smoothYPct * window.innerHeight;
      var bendRadius = Math.min(360, window.innerWidth * 0.24);
      for (var k = 0; k < bendLines.length; k += 1) {
        var bendLine = bendLines[k];
        var anchorPx = (bendLine.anchorRatio + bendLine.jitterRatio) * window.innerWidth;
        var anchorPy = bendLine.yRatio * window.innerHeight;
        var deltaX = anchorPx - pointerPx;
        var deltaY = (anchorPy - pointerPy) * 0.7;
        var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        var influence = 0;
        if (hasPointerMoved && distance < bendRadius) {
          var t = 1 - distance / bendRadius;
          influence = t * t;
        }

        var sign = deltaX >= 0 ? 1 : -1;
        var targetSway = sign * influence * bendLine.maxPush;
        var targetRot = sign * influence * bendLine.maxRot;
        var targetSlow = -influence * bendLine.maxSlow;
        bendLine.sway += (targetSway - bendLine.sway) * 0.2;
        bendLine.rot += (targetRot - bendLine.rot) * 0.2;
        bendLine.slow += (targetSlow - bendLine.slow) * 0.2;
        bendLine.el.style.setProperty("--line-sway-x", bendLine.sway.toFixed(2) + "px");
        bendLine.el.style.setProperty("--line-sway-rot", bendLine.rot.toFixed(2) + "deg");
        bendLine.el.style.setProperty("--line-slow-y", bendLine.slow.toFixed(2) + "px");
      }

      impactEnergy *= 0.92;
      if (impactEnergy < 0.01) {
        impactEnergy = 0;
      }
      root.style.setProperty("--flow-impact-energy", impactEnergy.toFixed(3));

      if (cursorFx) {
        cursorFx.x += (cursorFx.targetX - cursorFx.x) * 0.26;
        cursorFx.y += (cursorFx.targetY - cursorFx.y) * 0.26;
        cursorFx.ring.style.left = cursorFx.x.toFixed(2) + "px";
        cursorFx.ring.style.top = cursorFx.y.toFixed(2) + "px";
        cursorFx.core.style.left = cursorFx.x.toFixed(2) + "px";
        cursorFx.core.style.top = cursorFx.y.toFixed(2) + "px";

        var leadX = cursorFx.x;
        var leadY = cursorFx.y;
        for (var j = 0; j < cursorFx.trails.length; j += 1) {
          var trailNode = cursorFx.trails[j];
          var follow = 0.28 - j * 0.028;
          trailNode.x += (leadX - trailNode.x) * follow;
          trailNode.y += (leadY - trailNode.y) * follow;
          trailNode.el.style.left = trailNode.x.toFixed(2) + "px";
          trailNode.el.style.top = trailNode.y.toFixed(2) + "px";
          leadX = trailNode.x;
          leadY = trailNode.y;
        }
      }

      window.requestAnimationFrame(animatePointer);
    };

    window.requestAnimationFrame(animatePointer);
  }

  var hasArticle = !!document.querySelector("article");
  var maxBlur = hasArticle ? 13 : 5;

  var updateBlur = function () {
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var blur = Math.min(maxBlur, scrollY / (hasArticle ? 110 : 260));
    root.style.setProperty("--flow-scroll-blur", blur.toFixed(2) + "px");
  };

  window.addEventListener("scroll", updateBlur, { passive: true });
  window.addEventListener(
    "resize",
    function () {
      updateBlur();
    },
    { passive: true }
  );

  var headerTitle = document.querySelector(".main-menu > a.text-base.font-medium.truncate");
  if (headerTitle) {
    headerTitle.classList.add("site-title-handwrite");
  }

  var setupHeroTyping = function () {
    var heroTextWrap = document.querySelector(
      "article.prose.max-w-full .relative.flex.flex-col.items-center.justify-center.px-1.py-1.text-center"
    );
    if (!heroTextWrap) {
      return;
    }

    var nameEl = heroTextWrap.querySelector("h1");
    var headlineEl = heroTextWrap.querySelector("h2");
    if (!nameEl || !headlineEl) {
      return;
    }

    nameEl.classList.add("hero-typing-name");
    headlineEl.classList.add("hero-typing-headline");

    if (prefersReducedMotion) {
      return;
    }

    var typedKey = "hero-typed-once-v1";
    if (window.sessionStorage && window.sessionStorage.getItem(typedKey) === "1") {
      return;
    }

    var typeText = function (el, speed, done) {
      var source = (el.textContent || "").trim();
      if (!source) {
        if (done) {
          done();
        }
        return;
      }

      el.textContent = "";
      el.classList.add("typing-caret");
      var index = 0;
      var tick = function () {
        index += 1;
        el.textContent = source.slice(0, index);
        if (index < source.length) {
          window.setTimeout(tick, speed);
        } else {
          el.classList.remove("typing-caret");
          if (done) {
            done();
          }
        }
      };

      window.setTimeout(tick, 120);
    };

    if (window.sessionStorage) {
      window.sessionStorage.setItem(typedKey, "1");
    }

    typeText(nameEl, 86, function () {
      window.setTimeout(function () {
        typeText(headlineEl, 64);
      }, 150);
    });
  };

  setupHeroTyping();

  updateBlur();
})();
