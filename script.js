(function () {
  const ingredientInput = document.getElementById('ingredient');
  const excludeInput = document.getElementById('exclude');
  const genreInput = document.getElementById('genre'); // ★追加：ジャンル選択を読み込む
  const submitBtn = document.getElementById('submit');
  const resultsEl = document.getElementById('results');

  // メニューのバリエーションをジャンルごとに管理
  const menuTemplates = {
    // 🍝 パスタ（元の18種＋新しい10種＝計28種）
    pasta: [
      { name: 'のクリームパスタ', base: ['スパゲッティ', '生クリーム', 'バター', 'にんにく', '塩', 'こしょう'], note: 'クリームソース / こってり / カフェ定番' },
      { name: 'のトマトパスタ', base: ['スパゲッティ', 'トマト', 'にんにく', 'オリーブオイル', '塩', 'こしょう', 'バジル'], note: 'トマトソース / さっぱり / 定番' },
      { name: 'の和風パスタ', base: ['スパゲッティ', '醤油', 'だし', 'ごま油', 'ねぎ', '塩', 'こしょう'], note: '和風しょうゆ味 / あっさり / 和風喫茶向き' },
      { name: 'のペペロンチーノ', base: ['スパゲッティ', 'にんにく', 'オリーブオイル', '唐辛子', '塩', 'こしょう', 'パセリ'], note: 'オイルソース / ピリ辛 / シンプル' },
      { name: 'のアーリオ・オーリオ', base: ['スパゲッティ', 'にんにく', 'オリーブオイル', '塩', 'こしょう', 'パセリ'], note: 'オイルソース / にんにく香り強め' },
      { name: 'のカルボナーラ風', base: ['スパゲッティ', '卵', '生クリーム', 'ベーコン', '粉チーズ', '塩', 'こしょう'], note: '卵とチーズ / こってり / 人気メニュー向き' },
      { name: 'のガーリックオイルパスタ', base: ['スパゲッティ', 'にんにく', 'オリーブオイル', '塩', 'こしょう', 'パセリ', 'レモン'], note: 'オイルソース / さっぱりレモン / 香り高い' },
      { name: 'のジェノベーゼ風', base: ['スパゲッティ', 'バジル', 'にんにく', '松の実', 'オリーブオイル', '粉チーズ', '塩'], note: 'バジルソース / 香り豊か / 色鮮やか' },
      { name: 'のバター醤油パスタ', base: ['スパゲッティ', 'バター', '醤油', 'ねぎ', 'ごま', '塩', 'こしょう'], note: 'バター醤油味 / 香ばしい / 和風寄り' },
      { name: 'の冷製パスタ', base: ['スパゲッティ', 'オリーブオイル', 'レモン', 'にんにく', 'バジル', '塩', 'こしょう'], note: '冷製 / さっぱり / 夏向け' },
      { name: 'のナポリタン風', base: ['スパゲッティ', 'トマトケチャップ', '玉ねぎ', 'ピーマン', 'ウスターソース', '塩', 'こしょう'], note: 'ケチャップ味 / 昔ながらの喫茶店風' },
      { name: 'のチーズクリームパスタ', base: ['スパゲッティ', '生クリーム', '粉チーズ', 'バター', 'にんにく', '塩', 'こしょう'], note: 'チーズ多め / クリーミー / 濃厚' },
      { name: 'のレモンバターパスタ', base: ['スパゲッティ', 'バター', 'レモン', 'にんにく', '白ワイン', 'パセリ', '塩', 'こしょう'], note: 'レモンバターソース / さわやか / 白ワインに合う' },
      { name: 'の和風ねぎだしパスタ', base: ['スパゲッティ', '長ねぎ', 'だし', '醤油', 'ごま油', 'すりごま', '塩'], note: 'だし香る和風 / あっさり / 夜メニュー向き' },
      { name: 'のアジアン風パスタ', base: ['スパゲッティ', 'にんにく', 'ごま油', 'ラー油', '醤油', 'ねぎ', 'ごま'], note: 'ピリ辛 / アジアンテイスト / ビールに合う' },
      { name: 'のコンソメバターパスタ', base: ['スパゲッティ', 'コンソメ', 'バター', 'にんにく', 'パセリ', '塩', 'こしょう'], note: 'コンソメ＆バター / やさしい味 / ランチ向き' },
      { name: 'のオイルソースパスタ', base: ['スパゲッティ', 'オリーブオイル', 'にんにく', '唐辛子', 'アンチョビ', 'パセリ', '塩'], note: 'アンチョビ入りオイルソース / 旨み強め' },
      { name: 'の和風明太子風味', base: ['スパゲッティ', '明太子', 'バター', 'のり', 'ねぎ', '醤油'], note: '明太子 / クリーミー和風 / 人気メニュー向き' },
      { name: 'のボロネーゼ風', base: ['スパゲッティ', '合い挽き肉', '玉ねぎ', 'トマト缶', 'にんにく', 'ケチャップ', 'コンソメ'], note: 'ミートソース / ガッツリ / お子様にも人気' },
      { name: 'のアラビアータ', base: ['スパゲッティ', 'トマト缶', 'にんにく', '唐辛子', 'オリーブオイル', '塩', 'こしょう'], note: 'ピリ辛トマトソース / 刺激的 / お酒に合う' },
      { name: 'のトマトクリームパスタ', base: ['スパゲッティ', 'トマト', '生クリーム', 'にんにく', 'コンソメ', '塩', 'こしょう'], note: 'まろやかトマト / 女性に人気 / 濃厚' },
      { name: 'の梅しそ和風パスタ', base: ['スパゲッティ', '梅干し', '大葉', 'めんつゆ', 'ごま油', '白ごま'], note: '梅しそ風味 / さっぱり / 夏バテ気味の時に' },
      { name: 'の柚子胡椒パスタ', base: ['スパゲッティ', '柚子胡椒', 'オリーブオイル', 'だし', '醤油', 'ねぎ'], note: 'ピリ辛和風 / 柚子の香り / 大人向け' },
      { name: 'のカレー風味パスタ', base: ['スパゲッティ', 'カレー粉', '玉ねぎ', 'ケチャップ', 'コンソメ', 'オリーブオイル'], note: 'スパイシーカレー味 / 食欲そそる / アレンジ自在' },
      { name: 'のごま豆乳スープパスタ', base: ['スパゲッティ', '無調整豆乳', 'すりごま', '鶏ガラスープの素', '醤油', 'ラー油'], note: 'まろやか豆乳スープ / 担々麺風 / ぽかぽか温まる' },
      { name: 'のツナマヨぽん酢パスタ', base: ['スパゲッティ', 'ツナ缶', 'マヨネーズ', 'ぽん酢', 'ねぎ', 'のり'], note: 'ツナマヨ味 / 子供も大好き / 超簡単' },
      { name: 'の焦がしにんにく醤油パスタ', base: ['スパゲッティ', 'にんにく', '醤油', 'バター', '黒こしょう', 'ねぎ'], note: 'ガツンとニンニク / 香ばしい / 男飯' },
      { name: 'の塩昆布バターパスタ', base: ['スパゲッティ', '塩昆布', 'バター', 'オリーブオイル', 'ねぎ', '白ごま'], note: '旨みたっぷり / 調味料不要 / 和風' }
    ],

    // 🥩 定食メイン（たっぷり12種）
    main_dish: [
      { name: 'の生姜焼き', base: ['生姜', '醤油', 'みりん', '酒', '玉ねぎ', 'サラダ油'], note: '定食の王道 / ご飯が進む' },
      { name: 'の黒酢あん炒め', base: ['ピーマン', 'にんじん', '玉ねぎ', '黒酢', '醤油', '砂糖', '片栗粉'], note: 'まろやかな酸味 / 彩り鮮やか / 中華風' },
      { name: 'のおろしポン酢がけ', base: ['大根おろし', 'ポン酢', 'ねぎ', 'サラダ油'], note: 'さっぱり和風 / 夏バテにも / ヘルシー' },
      { name: 'のトマトチーズ焼き', base: ['トマト', 'チーズ', 'オリーブオイル', 'にんにく', '塩', 'こしょう'], note: '洋風おかず / 女性に人気 / オーブン・トースターで' },
      { name: 'の照り焼き', base: ['醤油', 'みりん', '砂糖', '酒', 'サラダ油'], note: '甘辛だれ / 子供も大好き / 鉄板メニュー' },
      { name: 'のチリソース炒め', base: ['長ねぎ', 'ケチャップ', '豆板醤', 'にんにく', '生姜', '鶏ガラスープ'], note: 'ピリ辛中華 / 食欲そそる / エビや鶏肉に' },
      { name: 'の塩昆布キャベツ炒め', base: ['キャベツ', '塩昆布', 'ごま油', '白ごま'], note: '旨みたっぷり / パパッと時短 / お酒のつまみにも' },
      { name: 'の味噌炒め（ホイコーロー風）', base: ['キャベツ', 'ピーマン', '味噌', '豆板醤', '砂糖', 'ごま油'], note: 'こってり味噌味 / ボリューム満点' },
      { name: 'のガーリックバター醤油', base: ['にんにく', 'バター', '醤油', '黒こしょう', 'ねぎ'], note: 'ガツンとニンニク / 匂いから美味しい' },
      { name: 'のピカタ', base: ['卵', '粉チーズ', '小麦粉', '塩', 'こしょう', 'サラダ油'], note: 'チーズ風味の衣 / お肉にもお魚にも合う' },
      { name: 'のネギ塩炒め', base: ['長ねぎ', 'ごま油', '鶏ガラスープの素', '塩', 'レモン汁', '黒こしょう'], note: 'さっぱりネギ塩 / 鉄板焼き風 / 夏にぴったり' },
      { name: 'のオイスターマヨ炒め', base: ['マヨネーズ', 'オイスターソース', 'にんにく', 'サラダ油'], note: 'コク旨濃厚 / ご飯が止まらない' }
    ],

    // 🥗 定食の副菜・小鉢（たっぷり12種）
    side_dish: [
      { name: 'の胡麻和え', base: ['すりごま', '醤油', '砂糖'], note: '定番小鉢 / ほうれん草やいんげんに / 栄養満点' },
      { name: 'のきんぴら', base: ['にんじん', '醤油', 'みりん', 'ごま油', '唐辛子', '白ごま'], note: '甘辛味 / ごぼうやれんこんにも / 日持ちする' },
      { name: 'のおひたし', base: ['だし汁', '醤油', 'かつお節'], note: 'さっぱり和風 / 箸休めにぴったり' },
      { name: 'の旨塩ナムル', base: ['ごま油', 'にんにく', '塩', '鶏ガラスープの素', '白ごま'], note: '韓国風 / もやしや青菜に / やみつき' },
      { name: 'の白和え', base: ['豆腐', 'すりごま', '醤油', '砂糖', '塩'], note: '優しい味わい / 彩りににんじん等をプラスして' },
      { name: 'のツナマヨポン酢サラダ', base: ['ツナ缶', 'マヨネーズ', 'ポン酢', 'かつお節'], note: '和風マヨ味 / 大根やきゅうりと合わせて' },
      { name: 'の甘酢和え', base: ['酢', '砂糖', '醤油', '塩'], note: 'さっぱりお酢 / きゅうりやわかめに / 疲労回復' },
      { name: 'の塩昆布ごま油和え', base: ['塩昆布', 'ごま油', '白ごま'], note: '切って和えるだけ / 超時短 / 旨み抜群' },
      { name: 'の梅おかか和え', base: ['梅干し', 'かつお節', '醤油', 'みりん'], note: '梅の酸味でさっぱり / 食欲増進' },
      { name: 'のガーリック炒め', base: ['にんにく', 'オリーブオイル', '塩', 'こしょう'], note: 'シンプルイズベスト / きのこや青菜に' },
      { name: 'のピーナッツ和え', base: ['砕いたピーナッツ', '醤油', '砂糖'], note: 'コクと食感が楽しい / ごま和えの代わりに' },
      { name: 'のだし煮', base: ['だし汁', '薄口醤油', 'みりん'], note: '素材の味を活かす / ほっとする味 / 定番' }
    ]
  };

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function getIngredientsForMenu(mainIngredient, template) {
    const base = template.base.filter(function (item) {
      return item !== mainIngredient;
    });
    return [mainIngredient].concat(base);
  }

  function parseExcludeList(raw) {
    if (!raw) return [];
    return raw
      .split(/[、,，\s]+/)
      .map(function (item) {
        return item.trim();
      })
      .filter(function (item) {
        return item.length > 0;
      });
  }

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ★変更：ジャンル（genre）を受け取って、その中からメニューを探すようにしました
  function suggestMenu(main, excludeList, genre) {
    const trimmed = main.trim();
    if (!trimmed) return null;

    const excluded = Array.isArray(excludeList) ? excludeList : [];
    
    // 選ばれたジャンルの配列を取得（万が一見つからない場合は空配列）
    const targetTemplates = menuTemplates[genre] || [];

    const candidates = targetTemplates.filter(function (t) {
      const ingredients = getIngredientsForMenu(trimmed, t);
      return !ingredients.some(function (ing) {
        return excluded.indexOf(ing) !== -1;
      });
    });

    if (candidates.length === 0) {
      return [];
    }

    const picked = shuffleArray(candidates).slice(0, 10);
    return picked.map(function (t) {
      const menuName = trimmed + t.name;
      const ingredients = getIngredientsForMenu(trimmed, t);
      return {
        menuName: menuName,
        ingredients: ingredients,
        note: t.note || ''
      };
    });
  }

  function renderResults(suggestions) {
    resultsEl.classList.remove('empty');
    resultsEl.innerHTML = suggestions
      .map(function (s) {
        const listItems = s.ingredients
          .map(function (ing) {
            return '<li>' + escapeHtml(ing) + '</li>';
          })
          .join('');
        return (
          '<div class="menu-card">' +
          '<h3>' + escapeHtml(s.menuName) + '</h3>' +
          (s.note ? '<p class="menu-note">' + escapeHtml(s.note) + '</p>' : '') +
          '<p class="ingredients-title">必要な食材</p>' +
          '<ul class="ingredients-list">' + listItems + '</ul>' +
          '</div>'
        );
      })
      .join('');
  }

  function showMessage(text, isError) {
    resultsEl.classList.remove('empty');
    resultsEl.innerHTML =
      '<p class="results-message' + (isError ? ' error' : '') + '">' +
      escapeHtml(text) +
      '</p>';
  }

  function onSubmit() {
    const value = ingredientInput.value;
    const excludeValue = excludeInput ? excludeInput.value : '';
    // ★追加：ドロップダウンで何が選ばれているかを取得
    const genreValue = genreInput ? genreInput.value : 'pasta';
    
    const excludeList = parseExcludeList(excludeValue);
    
    // ★変更：ジャンルも渡して検索を実行
    const suggestions = suggestMenu(value, excludeList, genreValue);

    if (!suggestions) {
      showMessage('メイン食材を入力してください。', true);
      return;
    }

    if (suggestions.length === 0) {
      showMessage('条件に合う候補が見つかりませんでした。入れない食材を減らしてみてください。', false);
      return;
    }

    renderResults(suggestions);
  }

  submitBtn.addEventListener('click', onSubmit);
  ingredientInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') onSubmit();
  });
})();
