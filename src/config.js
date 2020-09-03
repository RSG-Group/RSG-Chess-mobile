// RSG Chess mobile
// by RSG Group

export const colorPalettes = {
  default: {
    name: "RSG Chess standard",
    background: "rgb(240, 220, 180)",
    props: {
      whiteCells: "rgb(255, 205, 160)",
      blackCells: "rgb(210, 140, 70)",
      validBG: "red",
      selectedBG: "brown",
      selectedColor: "lightblue"
    }
  },
  blue: {
    name: "Light blue ocean",
    background: "rgb(220, 255, 245)",
    props: {
      whiteCells: "rgb(225, 225, 225)",
      blackCells: "rgb(110, 130, 180)",
      validBG: "rgb(255, 100, 45)",
      selectedBG: "rgb(155, 0, 0)",
      selectedColor: "lightgreen"
    }
  },
  green: {
    name: "Chess.com green",
    background: "rgb(235, 255, 205)",
    props: {
      whiteCells: "rgb(240, 240, 210)",
      blackCells: "rgb(120, 150, 85)",
      validBG: "rgb(255, 253, 158)",
      selectedBG: "rgb(70, 0, 165)",
      selectedColor: "rgb(255, 255, 155)"
    }
  },
  sweet: {
    name: "Sweety",
    background: "rgb(255, 234, 248)",
    props: {
      whiteCells: "rgb(255, 215, 215)",
      blackCells: "rgb(230, 110, 110)",
      validBG: "rgb(70, 0, 165)",
      selectedBG: "rgb(185, 75, 0)",
      selectedColor: "rgb(135, 255, 235)"
    }
  },
  gray: {
    name: "Grayscale",
    background: "rgb(255, 255, 255)",
    props: {
      whiteCells: "rgb(255, 255, 255)",
      blackCells: "rgb(100, 100, 100)",
      validBG: "rgb(205, 205, 205)",
      selectedBG: "rgb(5, 5, 5)",
      selectedColor: "rgb(250, 250, 250)"
    }
  },
  cyan: {
    name: "Cyan",
    background: "rgb(235, 255, 255)",
    props: {
      whiteCells: "rgb(200, 225, 225)",
      blackCells: "rgb(8,164,167)",
      validBG: "rgb(250, 200, 200)",
      selectedBG: "rgb(80, 0, 40)",
      selectedColor: "rgb(135, 255, 210)"
    }
  }
};

export const possiblePalettes = () => {
  const palettesArray = [];
  let key;
  for (key in colorPalettes) {
    palettesArray.push({ label: colorPalettes[key].name, value: key });
  }

  return palettesArray;
};

export const strings = {
  welcomeTitle: {
    en: "Welcome",
    bg: "Добре дошли",
    ru: "Добро пожаловать!"
  },
  selectMode: {
    en: "Choose game mode",
    bg: "Изберете начин за игра",
    ru: "Выберите игровой режим"
  },
  playAgainstAI: {
    en: "Play versus AI",
    bg: "Игра срещу AI",
    ru: "Игра против AI"
  },
  easy: {
    en: "Easy",
    bg: "Лесно",
    ru: "Легко"
  },
  medium: {
    en: "Medium",
    bg: "Средно",
    ru: "Средний"
  },
  hard: {
    en: "Hard",
    bg: "Трудно",
    ru: "Жесткий"
  },
  puzzles: {
    en: "Puzzles (coming soon)",
    bg: "Puzzles (coming soon)",
    ru: "Puzzles (coming soon)"
  },
  resume: {
    en: 'Resume',
    bg: 'Продължи игра',
    ru: 'Продолжить игру'
  },
  or: {
    en: "or",
    bg: "или",
    ru: "или"
  },
  singleplayer: {
    en: "Start singleplayer",
    bg: "Започнете singleplayer",
    ru: "Пуск singleplayer"
  },
  singleplayerDescription: {
    en: "Start singleplayer",
    bg: "Започнете singleplayer",
    ru: "Пуск singleplayer"
  },
  hardModeWarning: {
    en:
      'Warning: The AI may require longer time to make its turn on the "hard" level!',
    bg:
      "Внимание: AI алгоритъма може да се нуждае от повече време, за да направи ход, ако изберете най-трудното ниво!",
    ru:
      "Предупреждение: алгоритму AI может потребоваться больше времени, чтобы сделать ход, если вы выберете самый сложный уровень!"
  },
  placeOnTheSurface: {
    en: "Place your device horizontally on the surface and",
    bg: "Поставете устройството си на плоска повърхност и",
    ru: "Поместите устройство горизонтально на поверхность и"
  },
  back: {
    en: "back",
    bg: "обратно",
    ru: "обратно"
  },
  realBoardExperience: {
    en: "the black figures - for real board experience",
    bg: "черните фигури - за преживяване, като на истинска шах дъска",
    ru: "черные фигуры - за преживяване, като на истинска шах дъска"
  },
  letStart: {
    en: "Let's start singleplayer!",
    bg: "Нека започнем със singleplayer",
    ru: "Давайте начнем singleplayer!"
  },
  settings: {
    en: "Settings",
    bg: "Настройки",
    ru: "Настройки"
  },
  newGame: {
    en: "New Game",
    bg: "Нова игра",
    ru: "Новая игра"
  },
  newGameMenu: {
    en: "Back to menu",
    bg: "Обратно към началното меню",
    ru: "Меню"
  },
  startGameAndSelectMode: {
    en: "(Start a new game first and then select game mode)",
    bg:
      '(Започнете нова игра, а после изберете начин за игра от "welcome меню"-то)',
    ru: "(Сначала запустите новую игру, затем выберите игровой режим)"
  },
  showValidMoves: {
    en: "Show the valid moves on the board",
    bg: "Показване на валидните ходове върху дъската",
    ru: "Показать действительные ходы на доске"
  },
  selectPalette: {
    en: "Choose one of our chessboard color palettes",
    bg: "Изберете цветова палитра за шах дъската",
    ru: "Выберите цветовую палитру:"
  },
  colorPalettes: {
    en: "Color palettes",
    bg: "Цветови палитри",
    ru: "Цветовую палитру"
  },
  personalize: {
    en: "personalize",
    bg: "персонализиране",
    ru: "предпочтения"
  },
  personalizeSettingsLabel: {
    en:
      "Set your preferences which will be kept even after you restart the app",
    bg:
      "Задайте предпочитанията си, които ще се запаметят дори след рестартиране",
    ru:
      "Задайте настройки, которые будут сохранены даже после перезапуска приложения"
  },
  checkOutPalettes: {
    en:
      "Check out all color palettes to select the best one for you on our website!",
    bg: "Разгледайте всички цветови палитри от RSG Chess на нашия уебсайт!",
    ru:
      "Посмотрите все цветовые палитры, чтобы выбрать лучший для вас на нашем сайте!"
  },
  lang: {
    en: "Language",
    bg: "Език",
    ru: "Язык"
  },
  okaySettings: {
    en: "Okay",
    bg: "Готово",
    ru: "Готовый"
  },
  okayNative: {
    en: "Okay",
    bg: "Добре",
    ru: "Хорошо"
  },
  cancel: {
    en: "Cancel",
    bg: "Отказ",
    ru: "Отмена"
  },
  rotateBlackPiecesSetting: {
    en: "Rotate the black figures",
    bg: "Завъртете черните фигури",
    ru: "Поверните черные фигуры"
  },
  rotateBlackPiecesLabel: {
    en:
      "Rotate the pieces for better experience, especially if you're two players on the device.",
    bg:
      "Завъртете фигурите за по-добър ефект, особено ако двама играчи играете на това устройство!",
    ru:
      "Поверните шахматные фигуры для лучшего опыта, особенно если вы два игрока на устройстве."
  },
  gameOver: {
    en: "The game is over",
    bg: "Играта свърши",
    ru: "Игра окончена"
  },
  takeLook: {
    en: "TAKE A LOOK",
    bg: "ПОКАЖИ",
    ru: "ПОКАЖИТЕ МЭ"
  },
  sourceCode: {
    en: "Source code",
    ru: "Source код",
    bg: "Source код"
  },
  license: {
    en: "License",
    bg: "Лиценз",
    ru: "Лицензия"
  },
  contactUs: {
    en: "or contact us: ",
    bg: "или се свържете с нас: ",
    ru: "или свяжитесь с нами: "
  },
  reportProblem: {
    en: "Report a problem ",
    bg: "Съобщете за проблем ",
    ru: "Сообщить о проблеме "
  },
  learnToPlay: {
    en: "Learn how to play chess here",
    bg: "Научете как да играете шах",
    ru: "Узнайте, как играть в шахматы здесь"
  },
  promotePawn: {
    en: "Select a piece to promote to: ",
    bg: "Изберете фигура, в която да превърнете пешката",
    ru: "Выберите форму, чтобы превратить пешку"
  },
  close: {
    en: "Close",
    bg: "Затвори",
    ru: "Закрыть"
  },
  hideThis: {
    en: "Hide this",
    bg: "Скрий това",
    ru: "Скрыть это"
  },
  checkmate: {
    en: "Checkmate!",
    bg: "Шах и мат!",
    ru: "Шах и мат!"
  },
  stalemate: {
    en: "Stalemate",
    bg: "Пат",
    ru: "Пат"
  },
  draw: {
    en: "Draw",
    bg: "Равенство",
    ru: "Безвыходное положение"
  },
  whiteWon: {
    en: "The white player won!",
    bg: "Белият играч победи!",
    ru: "Победил белый игрок!"
  },
  blackWon: {
    en: "The black player won!",
    bg: "Черният играч победи!",
    ru: "Победил черный игрок!"
  },
  chooseLang: {
    en:
      "Choose a language.\nAll game modals, dialogues and texts will be displayed on that language.",
    bg:
      "Изберете език.\nВсички надписи в играта ще бъдат показвани на този език.",
    ru: "Выберите язык.\nВсе титры в игре будут отображаться на этом языке."
  },
  invalidMove: {
    en: "Invalid move...",
    bg: "Невалиден ход...",
    ru: "Неверный ход ..."
  },
  AIPromoted: {
    en: "The AI promoted one of his pawns!",
    bg: "Противникът произведе една от пешките си!",
    ru: "Противник произвел одну из своих пешек!"
  },
  AIThinking: {
    en: "Plеase wait while our AI is thinking...",
    bg: "Моля изчакайте докато противника ви мисли...",
    ru: "Подождите, пока ваш оппонент не подумает..."
  },
  about: {
    initial: {
      en:
        "RSG Chess is an open-source chess game which is appropriate for any age. The app is verified by Google Play Protect, labeled as PEGI 3 and distributed under the Apache 2.0 License. \n\nThe game can be fun in many aspects. You can play versus friends on your own device or vs AI in two levels - Easy or Medium... and all this - offline! New AI levels, multy-player mode, leaderboards and more will be rolled out in future releases. RSG Chess also has extra features for better experience. One of them are the custom color palettes - way to customize the chessboard with the colors you prefer! Go to the settings and see them in action! Also if you're using bigger device you can place it on the surface, rotate the black pieces from the settings and fell like you're on real chess board.",
      ru:
        "RSG Chess - это игра с открытым исходным кодом, которая подходит для любого возраста. Приложение проверено в Google Play Protect, обозначенное как PEGI 3, и распространяется под лицензией Apache 2.0. \n\nИгра может быть интересной во многих аспектах. Вы можете играть против друзей на своем собственном устройстве или против AI на двух уровнях - Easy или Medium ... и все это - офлайн! В будущих выпусках будут развернуты новые уровни AI, многопользовательский режим, списки лидеров и многое другое. RSG Chess также имеет дополнительные возможности для лучшего опыта. Одна из них - пользовательские цветовые палитры - способ настройки шахматной доски с цветами, которые вы предпочитаете! Перейдите в настройки и увидите их в действии! Также, если вы используете большее устройство, вы можете разместить его на поверхности, повернуть черные фигуры из настроек и упасть, как на реальной шахматной доске.",
      bg:
        'RSG Chess е open-source шах игра, която е подходяща за всички възрастови групи. Проложението е проверено от Google Play Protect и лицензирано под Apache 2.0 лиценза. \n\nИграта е забавна по всяко време! Може да играете срещу вашите приятели на това устройство (single-player) или срещу нашия AI алгоритъм в две нива на трудност. RSG Chess също поддържа функция за завъртане на черните фигури за "преживяване като на истинска шах дъска". Всички тези начини за игра НЕ изискват връзка с интернет и могат да се използват офлайн. Цветовите палитри са нруга функция, която ви позволява да персонализирате шах дъската с цветовете, които харесвате. \n\nСъщо така повече AI нива, мултиплейър и др., може да очаквате в бъдещи версии.'
    },
    label: {
      en: "About",
      bg: "За нас",
      ru: "О нас"
    }
  },
  privacy: {
    en: "Privacy Policy",
    bg: "Поверителност",
    ru: "Конфиденциальность"
  },
  gameOptions: {
    en: "Game options",
    bg: "Опции за игра",
    ru: "Игровые настройки"
  },
  aboutRSGChess: {
    en: "About RSG Chess",
    bg: "За RSG Chess",
    ru: "Для RSG Chess"
  },
  sessionOnlyLabel: {
    en:
      "These settings are session-only. If you restart the app they won't be saved!",
    bg: "Тези настройки няма да бъдат запазени ако рестартирате приложението!",
    ru: "Если вы перезапустите приложение, эти настройки не будут сохранены!"
  },
  fastAction: {
    en: "fast actions",
    bg: "бързи действия",
    ru: "быстрые действия"
  },
  play: {
    en: "Play",
    bg: "Играй",
    ru: "Играть"
  },
  pieces: {
    rook: {
      en: "rook",
      bg: "топ",
      ru: "ладья"
    },
    queen: {
      en: "queen",
      bg: "царица",
      ru: "Ферзь"
    },
    knight: {
      en: "knight",
      bg: "кон",
      ru: "Конь"
    },
    bishop: {
      en: "bishop",
      bg: "офицер",
      ru: "слон"
    }
  },
  palettes: {
    default: {
      en: "default",
      bg: "основен",
      ru: "умолчанию"
    },
    blue: {
      en: "blue",
      bg: "синьо",
      ru: "синий"
    },
    green: {
      en: "green",
      bg: "зелено",
      ru: "зеленый"
    },
    sweet: {
      en: "sweety",
      bg: "сладко",
      ru: "сладкий розовый"
    },
    gray: {
      en: "grayscale",
      bg: "черно-бяло",
      ru: "серый"
    },
    cyan: {
      en: "cyan",
      bg: "синьо-зелен",
      ru: "циан"
    }
  },
  languages: {
    en: {
      en: "English",
      bg: "Bulgarian",
      ru: "Russian"
    },
    bg: {
      en: "Английски",
      bg: "Български",
      ru: "Руски"
    },
    ru: {
      en: "Aнглийский",
      bg: "Болгарский",
      ru: "Русский"
    },
    native: {
      en: "English",
      bg: "Български",
      ru: "Руский"
    }
  }
};

export const globalStyles = {
  drawerItemLabel: {
    margin: 12,
    marginLeft: 20,
    fontSize: 19,
    fontWeight: "bold",
    color: "black"
  }
};

export const puzzles = JSON.parse(
  `[{"date":2003,"fen":"2R1b1k1/N4p1p/5np1/8/8/2N4P/Pr4P1/7K w - - 0 1","loc":"Rethymnon","pls":"Magnus Carlsen vs Can Arduman","sln":"Ne4"},{"date":"10/19/2007","fen":"r4r2/pp2Np1k/3p1Q1p/8/2q1p3/6P1/PP3RKP/8 w - - 1 0","loc":"Bilbao","pls":"Magnus Carlsen vs Judit Polgar","sln":"Nf5"},{"date":2007,"fen":"3r1bk1/5p2/3N1qpp/3Q4/8/3R2PP/5PK1/8 w - - 0 1","loc":"Moscow","pls":"Magnus Carlsen vs Ruslan Ponomariov","sln":"Ne4"},{"date":2007,"fen":"r5k1/3B1p2/p2p2pb/1p1Np1q1/1P1nP3/PP1Q2P1/5RKP/2r1R3 w - - 0 1","loc":"Khanty Mansyisk","pls":"Magnus Carlsen vs Lenier Dominguez","sln":"h4"},{"date":2010,"fen":"5nk1/4rqp1/3pbp2/5B2/1p2PP1Q/5P1P/1B6/6RK w - - 0 1","loc":"Bilbao","pls":"Magnus Carlsen vs Alexei Shirov","sln":"Bxf6"},{"date":"6/2/2014","fen":"r1bq1rk1/pp2bppp/n3pn2/8/8/P1N2Q2/1PPN1PPP/R1B1KB1R w KQ - 1 0","loc":"Stavanger","pls":"Magnus Carlsen vs Fabiano Caruana","sln":"Bxa6"},{"date":1910,"fen":"r1b3r1/pp1k1q1p/2n2pN1/3p1N2/3P4/5Q1R/5PPP/5RK1 w - - 0 1","loc":"New York","pls":"Capablanca vs Michelsen","sln":"Rxh7"},{"date":1911,"fen":"2r3rk/3q1p1p/5p2/1p1p1b2/2pN3R/P1P1R3/1P3PPP/3Q2K1 w - - 0 1","loc":"New York","pls":"Capablanca vs Harry Morris","sln":"Re7"},{"date":1913,"fen":"rq2rb2/2p2kpQ/p6p/1p2P3/1Pn2P2/PB6/6PP/2RR2K1 w - - 0 1","loc":"New York","pls":"Capablanca vs Oscar Chajes","sln":"Rxc4"},{"date":1913,"fen":"8/7p/p7/4kpPP/3p4/3K4/P7/8 w - - 0 1","loc":"London","pls":"Capablanca vs Edward Lasker","sln":"h6"},{"date":1927,"fen":"6rk/p5p1/1pQ1Np1p/8/3B3P/4P1P1/5PK1/1q6 w - - 0 1","loc":"Buenos Aires","pls":"Capablanca  vs Alexander Alekhine","sln":"Nxg7"},{"date":1935,"fen":"r1br1q1k/p3nQp1/1p2p3/2p3NN/7P/8/PPP2PP1/R5K1 w - - 0 1","loc":"Barcelona simul","pls":"Capablanca vs Ribera","sln":"Nf6"},{"date":1938,"fen":"r5k1/5pp1/Br5p/2R1n3/8/1pK1PP2/1P5P/R7 w - - 0 1","loc":"Paris","pls":"Capablanca vs Nicolas Rossolima","sln":"Bd3"},{"date":1975,"fen":"r1b2rk1/pp2qppp/4p3/2bn4/4N3/P2B4/1PPB1PPP/R2Q1RK1 w - - 0 1","loc":"USA","pls":"Christiansen vs C. Madsen","sln":"c4"},{"date":1982,"fen":"3r3k/2R1R3/p4r1p/1p3Pp1/2p3Q1/6P1/P3P1KP/1q6 w - - 0 1","loc":"Surakarta","pls":"Christiansen vs Edhi Handoko","sln":"Qd4"},{"date":1985,"fen":"5rk1/2p1qr2/3pBb2/p2P2BQ/8/1p4P1/7P/R6K w - - 0 1","loc":"USA","pls":"Christiansen vs Kamran Shirazi","sln":"Ra4"},{"date":1986,"fen":"q2r3k/1r3pb1/2R1p2p/p4p2/2QN4/1P2P1P1/5P1P/2R3K1 w - - 0 1","loc":"Dubai","pls":"Christiansen vs Cifuentes Parada","sln":"Ra6"},{"date":1987,"fen":"8/1R6/p3r1kp/6p1/P3p1P1/4B2P/5P1K/r7 w - - 0 1","loc":"Germany","pls":"Christiansen vs Robert Zysk","sln":"Bd4"},{"date":1988,"fen":"3r2n1/3r1p1k/1p2q1pp/2pRB3/p1P1P3/P3Q1P1/1P5P/3R2K1 w - - 0 1","loc":"Dieren","pls":"Mephisto Mega IV C","sln":"Bc7"},{"date":1989,"fen":"8/8/5p2/4k1pp/p1P4P/P3K1P1/8/8 w - - 0 1","loc":"New York","pls":"Mephisto Almeria","sln":"g4"},{"date":2008,"fen":"3q2k1/5pp1/1p2p2p/1Q6/1PP4P/2B1bPP1/6K1/8 w - - 0 1","loc":"Singapore","pls":"Cori T vs Sonia Deshmukh","sln":"Qe5"},{"date":2010,"fen":"3r1rk1/3q2p1/4p2p/1p1p1RbP/p2P1NQ1/6PK/PP3R2/8 w - - 0 1","loc":"Chotowa","pls":"Cori T vs Anna Skrzypczak","sln":"Nxe6"},{"date":2016,"fen":"2r2r1k/4bbpp/pp1q1p2/3n4/3P2Q1/1B1N4/PP1B1PP1/R3R1K1 w - - 1 0","loc":"Baku","pls":"Deysi Cori T vs Mammadova Narmin Fazahir Qizi","sln":"Bxd5"},{"date":1956,"fen":"3q2k1/1r1P1pp1/8/1p2B1p1/2pQ2P1/3nR2P/1P3PK1/8 w - - 0 1","loc":"Washington","pls":"Fischer vs Antillo Di Camillo","sln":"Bc7"},{"date":1959,"fen":"r1b2rk1/p3bp1p/4pp1Q/8/1p1qNp2/1n4N1/PPP3PP/R4R1K w - - 0 1","loc":"Yugoslavia","pls":"Fischer vs Pal Benko","sln":"Nh5"},{"date":1960,"fen":"7r/1k1r2pp/1pn5/3p1P2/2p2B2/2q5/2P3PP/RQ3RK1 w - - 0 1","loc":"Berlin","pls":"Fischer vs Klaus Darga","sln":"Qb5"},{"date":1960,"fen":"k6r/p4r2/2n1b2p/1R1p4/2p1p1P1/q1P1Q1BB/2P2P1P/1R4K1 w - - 0 1","loc":"New York","pls":"Fischer vs Raymond Weinstein","sln":"Qxh6"},{"date":1962,"fen":"r1r3k1/2pbbpp1/p2p1qnp/np1Pp3/4P2P/2P2NP1/PP2QP2/RNBBK2R w - - 0 1","loc":"Varna","pls":"Fischer vs Victor Ciocaltea","sln":"Bg5"},{"date":1964,"fen":"3q1rk1/R2b2bp/2rpppp1/1p1N1P2/1P2P3/3PB3/4Q1PP/5R1K w - - 0 1","loc":"Houston Simul","pls":"Fischer vs. C. H. Bone","sln":"fxe6"},{"date":1970,"fen":"1kb3rr/1p3p2/R3p2p/3pPp2/2pP1N1q/2P5/2P2PPP/1RQ3K1 w - - 0 1","loc":"Leningrad","pls":"Karpov vs Izotov","sln":"Qa3"},{"date":1971,"fen":"2br2k1/p4rb1/P1p3qp/2P1n3/1N1N4/2B2n2/R5BP/2QR3K w - - 0 1","loc":"Rostov","pls":"Karpov vs Leonid Gofstein","sln":"Nxf3"},{"date":1971,"fen":"4rr2/1p5R/3p1p2/p2Bp3/P2bPkP1/1P5R/1P2K3/8 w - - 0 1","loc":"Hastings","pls":"Karpov vs Henrique Mecking","sln":"Rg7"},{"date":1972,"fen":"2rr4/2q2pkp/1p2pnp1/pB1bQ3/P4P2/2N5/1PPR2PP/2KR4 w - - 0 1","loc":"San Antonio","pls":"Karpov vs Donald Byrne","sln":"Ba6"},{"date":1972,"fen":"6r1/3b1Npk/4p3/3pP2P/8/6R1/q4P2/2Q3K1 w - - 0 1","loc":"Moscow","pls":"Karpov vs Mark Taimanov","sln":"Qg5"},{"date":1973,"fen":"r5k1/pp1n1rbp/2n1p1p1/3pPq2/3P4/BP3N1P/P4RP1/R2Q1NK1 w - - 0 1","loc":"Leningrad","pls":"Karpov vs Eugenio Torre","sln":"g4"},{"date":1979,"fen":"5k2/p3p3/q2p1rR1/2rR3p/2p1QP1P/2P5/2P3P1/2K5 w - - 0 1","loc":"Tilburg","pls":"Karpov vs Gennadi Sosonko","sln":"Rxc5"},{"date":1980,"fen":"2r5/1b2rppp/3R1n2/4B3/2k2N2/5P2/6PP/1R4K1 w - - 0 1","loc":"Bugojno","pls":"Karpov vs Mikhail Tal","sln":"Rd2"},{"date":1983,"fen":"3rrk2/R4ppB/7p/1p2N1q1/nPbP1p2/2PQ1P2/6PP/4R1K1 w - - 0 1","loc":"USSR","pls":"Karpov vs Efim Geller","sln":"Qxc4"},{"date":1988,"fen":"2r2k1r/4ppbp/2B3p1/q2Ppb2/8/4B3/PR3PPP/3Q1RK1 w - - 0 1","loc":"Riga","pls":"Karpov vs V Kveinis","sln":"g4"},{"date":2002,"fen":"2rr2k1/pp2ppbp/3n2b1/1q4p1/1nNP2P1/4P2P/PB1NQP2/R2R1BK1 w - - 0 1","loc":"Moscow","pls":"Karpov vs Judit Polgar","sln":"Nxd6"},{"date":2007,"fen":"r1bqk2r/pppp1ppp/8/3Pp3/1b1n4/6P1/PP1PPPBP/R1BQK1NR w KQkq - 0 1","loc":"Ajaccio","pls":"Karpov vs Alain Costa","sln":"e3"},{"date":2006,"fen":"4kr2/p1Bbpp2/1p4p1/n6p/2B1P2P/2K2P2/P2R2P1/8 w - - 0 1","loc":"Tallinn","pls":"Karpov vs Alexei Shirov","sln":"Bb5"},{"date":1976,"fen":"2rq1k1r/p3nppp/1p2pN2/nP1pP3/3P2P1/2R1QN2/5PKP/2R5 w - - 0 1","loc":"Tbilisi","pls":"Kasparov vs Dmitry Kaiumov","sln":"Rxc8"},{"date":1976,"fen":"3r1r2/4Qp2/1nqP2pk/p3p2p/1pB5/1P6/5RPP/5R1K w - - 0 1","loc":"USSR","pls":"Kasparov vs Aldyn Guseinov","sln":"Rxf7"},{"date":1977,"fen":"8/2r1q2p/7k/2pR1Q2/4p2p/1P2P3/5PP1/6K1 w - - 0 1","loc":"Cagnes sur Mer","pls":"Kasparov vs Adrian Negulescu","sln":"Qg4"},{"date":1977,"fen":"r5k1/ppr2p2/6p1/3pP3/3P3Q/q2B1R1P/P5PK/8 w - - 0 1","loc":"Riga","pls":"Kasparov vs Evgeny Pigusov","sln":"Bxg6"},{"date":1977,"fen":"r1bqkb1r/pp1n1ppp/3pp3/4P3/3N4/2PB4/P1PBQPPP/R3K2R w - - 0 1","loc":"Telex","pls":"Kasparov vs Guy West","sln":"Nxe6"},{"date":1977,"fen":"6k1/2R3pp/8/n3p3/P3P3/1p3KP1/1b3P2/8 w - - 0 1","loc":"Leningrad","pls":"Kasparov vs Andrei Kharitonov","sln":"Rc5"},{"date":1977,"fen":"r5k1/pq1nR1pp/1p3r2/5p2/3P4/3B1b1Q/P4PPP/R5K1 w - - 0 1","loc":"Cagnes sur Mer","pls":"Kasparov vs Dariusz Weider","sln":"Bxf5"},{"date":1980,"fen":"r3r1k1/pp3nPp/1b1p1B2/1q1P1N2/8/P4Q2/1P3PK1/R6R w - - 0 1","loc":"Baku","pls":"Kasparov vs Istvan Csom","sln":"Rxh7"},{"date":1980,"fen":"r4r1k/pbn1Nppp/np3q2/3p2N1/5B2/6PB/Pb3P1P/R2QR1K1 w - - 0 1","loc":"Malta","pls":"Kasparov vs Slavoljub Marjanovic","sln":"Nxh7"},{"date":1983,"fen":"r4r1k/p1q3pp/3pBpb1/2nPpN2/2p1P3/P1P5/1R4R1/2BQ3K w - - 0 1","loc":"Herceg Novi","pls":"Kasparov vs Victor Korchnoi","sln":"Rxg6"},{"date":1988,"fen":"r3r1k1/pb4pp/nq1np3/1p1pNp2/3P1N2/QP2P1P1/P4P1P/R1R2BK1 w - - 0 1","loc":"Cannes","pls":"Kasparov vs Gorgui Gueye","sln":"Nd7"},{"date":1994,"fen":"2b3rk/4np1p/p6P/2r1qpQR/1pP1p3/4N3/PPB2PP1/1K1R4 w - - 0 1","loc":"Moscow","pls":"Kasparov vs Lautier","sln":"Ng4"},{"date":1996,"fen":"r3kn2/5q2/r3p2p/4Pp2/1Q3N1B/5P1P/1P6/6RK w - - 0 1","loc":"Amsterdam VSB","pls":"Kasparov vs Yasser Seirawan","sln":"Nh5"},{"date":1999,"fen":"2r5/p4k1p/1pn1Rp1B/2p4n/P1N5/2Pr4/1P3PP1/2R3K1 w - - 0 1","loc":"Besancon","pls":"Kasparov vs Malina Nicoara","sln":"Rd6"},{"date":2000,"fen":"3r2k1/4Rb1p/p1q2p2/5Qp1/2pB3N/Pr5P/5PP1/4R1K1 w - - 0 1","loc":"Internet","pls":"Kasparov vs Jamie Hillman","sln":"Rxf7"},{"date":2000,"fen":"r3rk2/5pn1/pb1nq1pR/1p2p1P1/2p1P3/2P2QN1/PPBB1P2/2K4R w - - 0 1","loc":"Internet","pls":"Kasparov vs Alexander Karman","sln":"Qf6"},{"date":2000,"fen":"2k1r1r1/ppq2pp1/2pb1n1p/3n1P2/3P4/P2B1Q1P/1PPB2R1/2KN1R2 w - - 0 1","loc":"Internet","pls":"Kasparov vs Raphael Kruse","sln":"c4"},{"date":2000,"fen":"1rn3k1/R1R2p1p/6p1/8/3PB3/7P/3r2PK/8 w - - 0 1","loc":"Linares","pls":"Kasparov vs Alexei Shirov","sln":"Rab7"},{"date":2001,"fen":"2r5/pp1b4/4p3/3pPk2/5P2/8/1K6/3R2R1 w - - 0 1","loc":"Astana","pls":"Kasparov vs Alexei Shirov","sln":"Rd4"},{"date":1994,"fen":"1rbr2k1/2Rnbppp/4p3/q2pP3/3B4/2RB1N2/P3QPPP/6K1 w - - 0 1","loc":"New York","pls":"Kramnik vs Judit Polgar","sln":"Ra7"},{"date":2013,"fen":"r6k/2p2R1p/1p1pn2B/3Np1p1/p1P5/P5P1/7P/7K w - - 1 0","loc":"Moscow","pls":"Vladimir Kramnik vs Alexander Morozevich","sln":"Re7"},{"date":1997,"fen":"3rr3/1p3pkp/1p2b1p1/3N4/1P6/5N2/PK1R1bPP/3R4 w - - 0 1","loc":"St. Petersburg","pls":"Potkin vs Igor Kudinov","sln":"Nc7"},{"date":1992,"fen":"8/8/8/pp1p2k1/6P1/4R1KP/6N1/6q1 w - - 0 1","loc":"St Cugat","pls":"Topalov vs Pablo Glavina","sln":"Re6"},{"date":2003,"fen":"6k1/1p3ppp/p1n1b3/q1B5/6P1/P6P/1PPr1QB1/1K2R3 w - - 0 1","loc":"Internet","pls":"Adams vs John Nunn","sln":"Rxe6"},{"date":1989,"fen":"r3rk2/1p1n1p1Q/p1b1p3/2q3pN/8/2PB4/P1P2PP1/2KRR3 w - - 0 1","loc":"Haifa","pls":"Adams vs Fernandez","sln":"Bg6"},{"date":2003,"fen":"6k1/1p3ppp/p1n1b3/q1B5/6P1/P6P/1PPr1QB1/1K2R3 w - - 0 1","loc":"Internet","pls":"Adams vs John Nunn","sln":"Rxe6"}]`
);

// The app is translated and written by Radi Cho
// RSG Chess - All Rights Reserved. Radostin Cholakov
