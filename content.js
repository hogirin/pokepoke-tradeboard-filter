(function () {
  console.log("content.js loaded");

  // --- 投稿ごとの「もっと見る(◯◯)」を見て、件数が多い投稿を非表示にする ---
  function hideByMoreCount() {
    console.log("hideByMoreCount CALLED");

    const host = document.querySelector("gds-pokemon-card-pocket-trades-list");
    if (!host || !host.shadowRoot) {
      console.log("no host or shadowRoot");
      return;
    }
    const root = host.shadowRoot;

    const buttons = root.querySelectorAll(
      ".PokemonCardPocketTradesCards_cards__moreViewButton_i9gOU"
    );
    console.log("buttons length", buttons.length);

    buttons.forEach((btn, i) => {
      const text = (btn.textContent || "").replace(/\s+/g, " ");
      const m = text.match(/もっと見る\s*\(\s*(\d+)\s*\)/);
      if (!m) return;

      const count = parseInt(m[1], 10);
      if (count < 100) return; // 3桁以上を非表示

      const container = btn.closest(".PokemonCardPocketTradesPosts_trade_NuHdi");
      if (!container) return;

      const tabContent = container.closest(".List_tabContent_Sl6Z9");
      if (!tabContent) return;

      container.style.display = "none";
      console.log("HIDE", i, count);
    });
  }

  // --- 一覧最下部の「もっと見る」（追加ロード）用 ---
  function setupListMoreViewHook() {
    const host = document.querySelector("gds-pokemon-card-pocket-trades-list");
    const root = host?.shadowRoot || document;

    const listMoreButtons = root.querySelectorAll(".List_moreView_m9u0p");

    listMoreButtons.forEach((btn) => {
      if (btn._pokeListMoreHooked) return; // 二重登録防止
      btn._pokeListMoreHooked = true;

      btn.addEventListener("click", () => {
        setTimeout(() => {
          hideByMoreCount();
        }, 1500);
        setTimeout(() => {
          hideByMoreCount();
        }, 3000);
      });
    });
  }

  // --- タブ切り替えボタン（List_tab_EXu1D）用 ---
  function setupTabClickHook() {
    const host = document.querySelector("gds-pokemon-card-pocket-trades-list");
    const root = host?.shadowRoot || document;

    const tabs = root.querySelectorAll(".List_tab_EXu1D");

    tabs.forEach((tab) => {
      if (tab._pokeTabHooked) return;
      tab._pokeTabHooked = true;

      tab.addEventListener("click", () => {
        setTimeout(() => {
          hideByMoreCount();
        }, 1500);
        setTimeout(() => {
          hideByMoreCount();
        }, 3000);
      });
    });
  }

  // --- カード絞り込みモーダルの「決定」ボタン用 ---
  // class="PokemonCardPocketTradesSelectingCardModal_modalContent__primaryButton_ikre8"
  function setupSelectCardPrimaryButtonHook() {
    const host = document.querySelector("gds-pokemon-card-pocket-trades-list");
    const root = host?.shadowRoot || document;

    const buttons = root.querySelectorAll(
      ".PokemonCardPocketTradesSelectingCardModal_modalContent__primaryButton_ikre8"
    );

    buttons.forEach((btn) => {
      if (btn._pokeSelectCardHooked) return;
      btn._pokeSelectCardHooked = true;

      btn.addEventListener("click", () => {
        setTimeout(() => {
          hideByMoreCount();
        }, 1500);
        setTimeout(() => {
          hideByMoreCount();
        }, 3000);
      });
    });
  }

  // --- 「🔍検索するカードを選択」ボタン用 ---
  // class="List_selectedCard__secondaryButton_JFIJL"
  function setupSelectedCardSecondaryButtonHook() {
    const host = document.querySelector("gds-pokemon-card-pocket-trades-list");
    const root = host?.shadowRoot || document;

    const buttons = root.querySelectorAll(
      ".List_selectedCard__secondaryButton_JFIJL"
    );

    buttons.forEach((btn) => {
      if (btn._pokeSelectedCardSecondaryHooked) return;
      btn._pokeSelectedCardSecondaryHooked = true;

      btn.addEventListener("click", () => {
        // モーダルが開くだけなので軽め
        setTimeout(() => {
          hideByMoreCount();
        }, 2000);
      });
    });
  }

  // --- 初期化処理 ---
  function init() {
    console.log("init called");
    hideByMoreCount();
    setupListMoreViewHook();
    setupTabClickHook();
    setupSelectCardPrimaryButtonHook();
    setupSelectedCardSecondaryButtonHook();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;

          hideByMoreCount();
          setupListMoreViewHook();
          setupTabClickHook();
          setupSelectCardPrimaryButtonHook();
          setupSelectedCardSecondaryButtonHook();
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  window.addEventListener("load", init);
})();
