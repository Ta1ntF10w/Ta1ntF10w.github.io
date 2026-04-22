(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;

  if (!root || !body) {
    return;
  }

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var bg = document.createElement("div");
  bg.className = "falling-lines-bg";
  bg.setAttribute("aria-hidden", "true");

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
      layer.appendChild(line);
    }

    return layer;
  };

  var isMobile = window.innerWidth < 768;

  var backLayer = createLayer("line-back", isMobile ? 18 : 26, {
    thickRatio: 0.1,
    thinStart: 0.7,
    speedMin: 8.8,
    speedRange: 6.2,
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
    heroRatio: 0.015,
  });

  var midLayer = createLayer("line-mid", isMobile ? 24 : 34, {
    thickRatio: 0.24,
    thinStart: 0.78,
    speedMin: 6.4,
    speedRange: 5.8,
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
    heroRatio: 0.03,
  });

  var frontLayer = createLayer("line-front", isMobile ? 30 : 46, {
    thickRatio: 0.42,
    thinStart: 0.84,
    speedMin: 4.8,
    speedRange: 4.4,
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

  if (!prefersReducedMotion) {
    var pointerX = 0;
    var pointerY = 0;
    var pointerXPct = 50;
    var pointerYPct = 50;

    window.addEventListener(
      "pointermove",
      function (event) {
        var x = event.clientX / window.innerWidth - 0.5;
        var y = event.clientY / window.innerHeight - 0.5;

        pointerX = x;
        pointerY = y;
        pointerXPct = event.clientX / window.innerWidth;
        pointerYPct = event.clientY / window.innerHeight;
      },
      { passive: true }
    );

    var smoothX = 0;
    var smoothY = 0;
    var smoothXPct = 0.5;
    var smoothYPct = 0.5;

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

  updateBlur();
})();
