// ════════════════════════════════════════════════
//   POLARIS v2.0 — قاعدة بيانات الأغاني
// ════════════════════════════════════════════════
//
// ══════════════════════════════════════════════
//  🖼️ كيف تحصل على صورة الكوفر Art:
// ══════════════════════════════════════════════
//
//  الطريقة 1 — من Spotify مباشرة (أسهل):
//  ─────────────────────────────────────────────
//  1. افتح الأغنية في Spotify Web Player
//     https://open.spotify.com
//
//  2. كليك يمين على صورة الألبوم
//     ← Inspect / فحص العنصر
//
//  3. ستجد src يبدأ هكذا:
//     https://i.scdn.co/image/ab67616d0000b273XXXXXXXXXX
//
//  4. انسخ الرابط وضعه في حقل cover
//
//  الطريقة 2 — Spotify API (للأغاني الكثيرة):
//  ─────────────────────────────────────────────
//  افتح هذا الرابط واستبدل TRACK_ID برقم الأغنية:
//  https://open.spotify.com/oembed?url=https://open.spotify.com/track/TRACK_ID
//  ستحصل على JSON فيه thumbnail_url
//
//  الطريقة 3 — Last.fm API (مجاناً):
//  ─────────────────────────────────────────────
//  https://ws.audioscrobbler.com/2.0/?method=track.getInfo
//  &artist=ARTIST&track=SONG&api_key=YOUR_KEY&format=json
//
//  ثم خذ image[3]["#text"] (الحجم mega)
//
// ══════════════════════════════════════════════
//  🔗 كيف تحصل على رابط Spotify:
// ══════════════════════════════════════════════
//
//  في Spotify: ثلاث نقاط ← Share ← Copy Song Link
//  الشكل: https://open.spotify.com/track/XXXXXXXXXXXXXXX
//
// ══════════════════════════════════════════════
//  ➕ كيف تضيف أغنية جديدة:
// ══════════════════════════════════════════════
//
//  انسخ هذا القالب وعبّي البيانات:
//
//  {
//    id: 'unique-id',          ← أي نص فريد بلا مسافات
//    title: 'اسم الأغنية',
//    artist: 'اسم الفنان',
//    cover: 'رابط صورة الكوفر',
//    spotify: 'رابط سبوتيفاي',
//    storyEn: 'قصة الأغنية بالإنجليزي',
//    storyAr: 'قصة الأغنية بالعربي'
//  }
//
// ══════════════════════════════════════════════
//  ➕ كيف تضيف جانر (Genre) جديد:
// ══════════════════════════════════════════════
//
//  داخل POLARIS_DATA.genres.EMOTION_ID
//  أضف عنصر جديد في المصفوفة:
//
//  {
//    id: 'my-genre',
//    name: '🎸 اسم الجانر',
//    songs: [ ... أغانيك هنا ... ]
//  }
//
// ══════════════════════════════════════════════
//  ➕ كيف تضيف عاطفة (Emotion) جديدة:
// ══════════════════════════════════════════════
//
//  1. أضف في POLARIS_DATA.emotions مصفوفة
//  2. أضف مفتاح جديد في POLARIS_DATA.genres
//  3. اختر ألوان للـ bg/orbs
//
// ════════════════════════════════════════════════

const POLARIS_DATA = {

  // ════════════════════════════════════════════
  //  EMOTIONS
  // ════════════════════════════════════════════

  emotions: [
    {
      id: 'love',
      emoji: '🤍',
      title: 'Love',
      desc: 'That warm feeling that makes everything feel possible.',
      colors: {
        bg:  'linear-gradient(145deg, #0e0016 0%, #1a0525 50%, #080010 100%)',
        orb1: '#c084fc',
        orb2: '#e879f9',
        orb3: '#7c3aed'
      }
    },
    {
      id: 'anger',
      emoji: '🔥',
      title: 'Anger',
      desc: 'Raw energy — sometimes you just need to feel it all.',
      colors: {
        bg:  'linear-gradient(145deg, #1a0500 0%, #2d0800 50%, #0d0000 100%)',
        orb1: '#ef4444',
        orb2: '#f97316',
        orb3: '#dc2626'
      }
    },
    {
      id: 'sadness',
      emoji: '🩵',
      title: 'Sadness',
      desc: 'Let it pour. Some feelings need to be felt fully.',
      colors: {
        bg:  'linear-gradient(145deg, #020b18 0%, #041525 50%, #010810 100%)',
        orb1: '#38bdf8',
        orb2: '#0ea5e9',
        orb3: '#0369a1'
      }
    },
    {
      id: 'euphoria',
      emoji: '✨',
      title: 'Euphoria',
      desc: 'Peak alive — when everything clicks and you feel infinite.',
      colors: {
        bg:  'linear-gradient(145deg, #0a0a00 0%, #181400 50%, #050800 100%)',
        orb1: '#facc15',
        orb2: '#fbbf24',
        orb3: '#a3e635'
      }
    },
    {
      id: 'melancholy',
      emoji: '🌙',
      title: 'Melancholy',
      desc: 'Beautiful sadness — nostalgia mixed with something undefined.',
      colors: {
        bg:  'linear-gradient(145deg, #05050f 0%, #0c0c20 50%, #030308 100%)',
        orb1: '#818cf8',
        orb2: '#6366f1',
        orb3: '#4338ca'
      }
    },
    {
      id: 'nostalgia',
      emoji: '📼',
      title: 'Nostalgia',
      desc: 'Memories that hit different at 2AM.',
      colors: {
        bg:  'linear-gradient(145deg, #0f0800 0%, #1e1000 50%, #080400 100%)',
        orb1: '#fb923c',
        orb2: '#f59e0b',
        orb3: '#d97706'
      }
    }
  ],

  // ════════════════════════════════════════════
  //  GENRES & SONGS
  // ════════════════════════════════════════════

  genres: {

    // ══════════════════════
    //   LOVE 🤍
    // ══════════════════════
    love: [
      {
        id: 'classics',
        name: '🏆 All-Time Classics',
        songs: [
          {
            id: 'cant-help-falling',
            title: "Can't Help Falling in Love",
            artist: 'Elvis Presley',
            // ─── رابط صورة الكوفر من Spotify ───
            cover: 'https://i.scdn.co/image/ab67616d0000b273ef44e8c2b20af04e7dd4b085',
            spotify: 'https://open.spotify.com/track/44AyOl4qVkzS48vBsbNXaC',
            storyEn: "Written in 1961, inspired by the French melody 'Plaisir d'Amour'. Elvis recorded it for Blue Hawaii. It captures the feeling of surrendering completely to love — you simply cannot stop yourself from falling. Voted one of the greatest love songs of all time in Rolling Stone's 500 Greatest Songs list.",
            storyAr: "كُتبت عام 1961، مستوحاة من اللحن الفرنسي 'Plaisir d'Amour'. سجّلها إلفيس لفيلمه 'Blue Hawaii'. تجسّد لحظة الاستسلام الكامل للحب — الشعور بأنك ببساطة لا تستطيع إيقاف سقوطك."
          },
          {
            id: 'all-of-me-legend',
            title: 'All of Me',
            artist: 'John Legend',
            cover: 'https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96',
            spotify: 'https://open.spotify.com/track/3U4isOIWM3VvDubwSI3y7a',
            storyEn: "John Legend wrote this for his then-girlfriend Chrissy Teigen before they married. A raw, honest celebration of loving someone completely — flaws and all. 'All of me loves all of you' became one of the most quoted lines in modern romance. It won multiple Grammys and spent 10 weeks at #1.",
            storyAr: "كتبها جون ليجند لصديقته آنذاك كريسي تيغن قبل زواجهما. احتفاء صادق بحبّ شخص بكل جوانبه — عيوبه وكماله. أصبحت 'كل ما فيّ يحب كل ما فيكِ' من أكثر العبارات اقتباساً في الرومانسية الحديثة."
          },
          {
            id: 'make-you-feel-my-love',
            title: 'Make You Feel My Love',
            artist: 'Bob Dylan',
            cover: 'https://i.scdn.co/image/ab67616d0000b2730a517f3cda637e391eaaad06',
            spotify: 'https://open.spotify.com/track/53URzPPPnKGzDupZDYGEOD',
            storyEn: "Bob Dylan wrote this quiet masterpiece in 1997. Though Adele's version brought it to a new generation, Dylan's original captures something purer — a love that asks nothing in return. Pitchfork calls it 'one of Dylan's most emotionally direct compositions ever'.",
            storyAr: "كتب بوب ديلان هذه التحفة الهادئة عام 1997. رغم أن نسخة أديل أوصلتها لجيل جديد، تظل النسخة الأصلية تعبيراً أنقى — حب لا يطلب مقابلاً."
          },
          {
            id: 'thinking-out-loud-ed',
            title: 'Thinking Out Loud',
            artist: 'Ed Sheeran',
            cover: 'https://i.scdn.co/image/ab67616d0000b273b4e63903a63fc7b0cbbf04f8',
            spotify: 'https://open.spotify.com/track/34gCuhDGsG4bRPIf9bb02f',
            storyEn: "Ed Sheeran co-wrote this with Amy Wadge in just 30 minutes after a late-night conversation about enduring love. It imagines dancing with the same person at 70 with the same fire you had at 20. Won the 2016 Grammy for Song of the Year.",
            storyAr: "كتبها إد شيران مع إيمي وادج في 30 دقيقة فقط. تتخيّل الرقص مع نفس الشخص عند السبعين بنفس الحرارة. فازت بجائزة Grammy لأفضل أغنية عام 2016."
          },
          {
            id: 'her-jvke-song',
            title: 'her',
            artist: 'JVKE',
            cover: 'https://i.scdn.co/image/ab67616d0000b27378b680a4b06a4d5f4f3e5b1a',
            spotify: 'https://open.spotify.com/track/7FIWs0pqAYbP91WWM0vlTQ',
            storyEn: "JVKE wrote 'her' about the overwhelming, cinematic feeling of falling in love — where ordinary moments suddenly feel extraordinary. The piano-driven production and raw vocal delivery made it the Gen Z anthem for that specific flutter in your chest you can't explain.",
            storyAr: "كتب JVKE أغنية 'her' عن ذلك الشعور الساحق حين تقع في الحب — حيث تبدو اللحظات العادية فجأة استثنائية. أصبحت نشيد الجيل Z لرجفة الصدر التي لا تستطيع تفسيرها."
          },
          {
            id: "something-beatles",
            title: "Something",
            artist: "THE BEATLES",
            cover: "https://t2.genius.com/unsafe/430x430/https%3A%2F%2Fimages.genius.com%2F08e455693a0ba9c998a43b0eb470b662.750x750x1.png",
            spotify: "https://open.spotify.com/track/0pNeVovbiZHkulpGeOx1Gj?si=825ed8b1271f4ee3",
            storyEn: "Frank Sinatra called it the greatest love song ever written. George Harrison captures the inexplicable magnetic pull of a lover's movements and aura, focusing on the small, silent details that create a profound connection. The line 'Something in the way she moves attracts me like no other lover' is one of the most romantic lines in music history.",
            storyAr: "وصفها فرانك سيناترا بأنها أعظم أغنية حب كُتبت على الإطلاق. جورج هاريسون يلتقط الجاذبية المغناطيسية التي لا يمكن تفسيرها لحركات وهالة الحبيبة، مركزاً على التفاصيل الصغيرة والصامتة التي تخلق اتصالاً عميقاً."
          },
          {
            id: "at-last-eva-cassidy",
            title: "At Last",
            artist: "Eva Cassidy",
            cover: "https://t2.genius.com/unsafe/430x430/https%3A%2F%2Fimages.genius.com%2F8386512c57a83163b86afbfb52af437b.945x945x1.jpg",
            spotify: "https://open.spotify.com/track/4YZGjgax8MyMh4VxYi2dNg?si=8881a9cb09554e07",
            storyEn: "Originally recorded by Etta James in 1960, Eva Cassidy's 1996 cover transforms it into a haunting, ethereal ballad. Cassidy's pure, emotive voice and the stripped-down arrangement create an intimate atmosphere that feels like a private serenade. The song captures the overwhelming relief and joy of finally finding true love after a long wait.",
            storyAr: "لحظة الانتصار العاطفي بعد طول انتظار. تُصور الأغنية شعور الارتياح والسكينة حين يجد الإنسان توأم روحه، وكأن العالم كان يسير بلونٍ باهت حتى تلك اللحظة. هي احتفال بالنهايات السعيدة التي تأتي لتمحو سنوات من العزلة والبحث المضني في طرقات الوحدة."
          },
        ]
      },
      {
        id: 'indie-love',
        name: '🎸 Indie Love',
        songs: [
          {
            id: 'first-day-of-my-life',
            title: 'First Day of My Life',
            artist: 'Bright Eyes',
            cover: 'https://i.scdn.co/image/ab67616d0000b273e3e4b9e8e4a7cc56a03e7f6d',
            spotify: 'https://open.spotify.com/track/3OHbKAoipRmRqFCNAasnUl',
            storyEn: "Conor Oberst wrote this as a declaration that love redefines existence — as if the world only truly began when you found that person. Quiet, acoustic, devastatingly sincere. Reddit's r/indieheads consistently ranks it as one of the greatest love songs ever written.",
            storyAr: "كتبها كونور أوبرست كإعلان بأن الحب يُعيد تعريف الوجود — كأن العالم لم يبدأ حقاً إلا في اللحظة التي وجدتَ فيها ذلك الشخص."
          },
          {
            id: 'such-great-heights-postal',
            title: 'Such Great Heights',
            artist: 'The Postal Service',
            cover: 'https://i.scdn.co/image/ab67616d0000b27344a1e5b9b5db33d2f4c5ed74',
            spotify: 'https://open.spotify.com/track/2ajuzDSZBFufhBQGPY4KJR',
            storyEn: "Ben Gibbard wrote this about the feeling that you and someone are so perfectly matched it feels like fate. Electronic beats mixed with heartfelt lyrics created something new. One of the most celebrated indie love songs of the 2000s, beloved by every generation since.",
            storyAr: "كتبها بن غيبارد عن الشعور بأنك أنت وشخص آخر متوافقان بشكل مثالي لدرجة أنه يبدو كالقدر. مزيج الإيقاعات الإلكترونية مع الكلمات الصادقة أنتج شيئاً فريداً."
          },
          {
            id: 'tenerife-sea-ed',
            title: 'Tenerife Sea',
            artist: 'Ed Sheeran',
            cover: 'https://i.scdn.co/image/ab67616d0000b27319d9c2de3e2c2cb2a8db4c66',
            spotify: 'https://open.spotify.com/track/1mGqfBXOzDZGBRECEhMFCE',
            storyEn: "Often overshadowed by 'Thinking Out Loud' on the same album, but arguably Ed's most intimate song. It captures a single frozen moment — looking at someone and feeling your whole world has narrowed to just their eyes.",
            storyAr: "تطغى عليها 'Thinking Out Loud' من نفس الألبوم، لكنها ربما أكثر أغاني إد حميمية. تصوّر لحظة واحدة متجمدة — النظر لشخص والشعور بأن عالمك بأكمله ضاق حتى أصبح عينَيه فقط."
          },
          {
            id: 'somewhere-only-keane',
            title: 'Somewhere Only We Know',
            artist: 'Keane',
            cover: 'https://i.scdn.co/image/ab67616d0000b27359f0d1d71e76c2bb22cc3779',
            spotify: 'https://open.spotify.com/track/1wGcGEAFNqSoLNlpS0RZbv',
            storyEn: "Tom Chaplin wrote this as a meditation on returning to a place — physical or emotional — only you and someone you love share. One of the defining anthems of 2000s emotional indie rock, later revived by Lily Allen.",
            storyAr: "كتبها توم شابلين كتأمل في العودة لمكان — جسدي أو عاطفي — يعرفه أنت وشخص تحبه فقط. من أبرز أناشيد الإندي الروك العاطفي في الألفينيات."
          }
        ]
      },
      {
        id: 'kpop-love',
        name: '🌸 K-Pop Love',
        songs: [
          {
            id: 'spring-day-bts',
            title: 'Spring Day',
            artist: 'BTS',
            cover: 'https://i.scdn.co/image/ab67616d0000b273730b69a5d4e9a0a0d4c3f0b4',
            spotify: 'https://open.spotify.com/track/4hE5UNNMUABl3C9S00RCYA',
            storyEn: "Often cited as BTS's masterpiece. A longing for someone lost — to distance, time, or death. Imagery drawn from Ursula Le Guin's 'The Ones Who Walk Away from Omelas'. Has never left Korean music charts since its 2017 release — a world record.",
            storyAr: "يُشار إليها كتحفة BTS، هي شوق لشخص فقدتَه — سواء للمسافة أو الزمن أو الموت. لم تغادر المخططات الموسيقية الكورية منذ إطلاقها عام 2017 — رقم قياسي عالمي."
          },
          {
            id: 'eight-iu-suga',
            title: 'eight (feat. SUGA)',
            artist: 'IU',
            cover: 'https://i.scdn.co/image/ab67616d0000b2739bb1e4b0f86bdd9e218a1c46',
            spotify: 'https://open.spotify.com/track/2vpuBNryOWkTmeTt3EIhSv',
            storyEn: "IU wrote 'eight' for her late friends Jonghyun of SHINee and Sulli — both passed away. About wanting to stay 25 forever with those you love, frozen before loss finds you. One of the most emotionally complex K-Pop songs ever made.",
            storyAr: "كتبت IU هذه الأغنية لصديقيها الراحلين جونهيون من SHINee وسولي. عن الرغبة في البقاء في الخامسة والعشرين للأبد، متجمداً قبل أن يجدك الفقد."
          },
          {
            id: 'hype-boy-nj',
            title: 'Hype Boy',
            artist: 'NewJeans',
            cover: 'https://i.scdn.co/image/ab67616d0000b27352af9df1d2a40d0c0d00f7e8',
            spotify: 'https://open.spotify.com/track/0n67oJBVVinGMJoaKgGRFV',
            storyEn: "NewJeans burst onto the scene with 'Hype Boy', a Y2K-infused track capturing the dizzy, almost embarrassing intensity of a new crush. Its simplicity is genius — it sounds like a diary entry set to 2022's catchiest production.",
            storyAr: "انطلقت NewJeans بقوة مع 'Hype Boy'، مقطوعة بنكهة Y2K تجسّد دوار التعلق الجديد. بساطتها هي عبقريتها."
          },
          {
            id: 'celebrity-iu',
            title: 'Celebrity',
            artist: 'IU',
            cover: 'https://i.scdn.co/image/ab67616d0000b273f3c26765aa39dff6e7ee0d8e',
            spotify: 'https://open.spotify.com/track/2OAMBCOuPCVeU2WBwBKNNn',
            storyEn: "IU's 'Celebrity' is a gift — she wrote it to make the listener feel seen, special, like the most important person in the world. A radical act of affirmation disguised as a pop song. It works completely.",
            storyAr: "أغنية IU 'Celebrity' هدية — كتبتها لتجعل المستمع يشعر بأنه مرئي ومميز، كأهم شخص في العالم. فعل تأكيد جذري متنكر في هيئة أغنية بوب."
          },
          {
            id: 'love-scenario-ikon',
            title: 'Love Scenario',
            artist: 'iKON',
            cover: 'https://i.scdn.co/image/ab67616d0000b2730f8bc64d2a0e2a5fc1e0c4b7',
            spotify: 'https://open.spotify.com/track/4eHtnlBSXWmHHfWf3lHyDd',
            storyEn: "A K-Pop phenomenon so catchy even Korean kindergartners were caught singing it. 'Love Scenario' describes the tender, bittersweet end of a love story — not with anger, but with gentle acceptance that it was beautiful while it lasted.",
            storyAr: "ظاهرة موسيقية في كوريا وصلت لطفل الروضة. تصف نهاية رقيقة لقصة حب — ليس بغضب، بل بقبول لطيف بأنها كانت جميلة."
          }
        ]
      }
    ],

    // ══════════════════════
    //   ANGER 🔥
    // ══════════════════════
    anger: [
      {
        id: 'rock-legends',
        name: '🏆 Rock Legends',
        songs: [
          {
            id: 'bohemian-rhapsody',
            title: 'Bohemian Rhapsody',
            artist: 'Queen',
            cover: 'https://i.scdn.co/image/ab67616d0000b273e8d8fc34c0b6e75a1ecdf99a',
            spotify: 'https://open.spotify.com/track/4u7EnebtmKWzUH433cf5Qv',
            storyEn: "Freddie Mercury wrote this in secret over months. Three songs in one: a ballad, an opera section, and hard rock. He refused to explain its meaning. Voted the greatest rock song of all time in multiple polls. The four-part operatic section took 70+ hours to record.",
            storyAr: "كتبه فريدي ميركوري سراً على مدى أشهر. ثلاث أغانٍ في واحدة: بالاد، قسم أوبرالي، وروك صلب. رفض تفسير معناه. صُوِّت له كأعظم أغنية روك في التاريخ."
          },
          {
            id: 'smells-teen-spirit',
            title: 'Smells Like Teen Spirit',
            artist: 'Nirvana',
            cover: 'https://i.scdn.co/image/ab67616d0000b273e3e4b9e8e4a7cc56a03e7f6d',
            spotify: 'https://open.spotify.com/track/5ghIJDpPoe3CjHMGu71E6T',
            storyEn: "Kurt Cobain wrote this trying to sound like The Pixies. What he created was the anthem of an entire generation's disillusionment. The title came from a friend who wrote 'Kurt smells like Teen Spirit' on his wall — that was a deodorant brand. It defined alternative rock forever.",
            storyAr: "كتبها كورت كوبين محاولاً يبدو كـ The Pixies. لكن ما أنتجه كان نشيد خيبة أمل جيل بأكمله. جاء الاسم من صديقة كتبت 'كورت يشمّ كـ Teen Spirit' على جداره."
          },
          {
            id: 'master-puppets-meta',
            title: 'Master of Puppets',
            artist: 'Metallica',
            cover: 'https://i.scdn.co/image/ab67616d0000b2739408e8cb8d8dcc14c4c6a6a6',
            spotify: 'https://open.spotify.com/track/5sICkBXVmaCQk5aISGR3x1',
            storyEn: "An indictment of drug addiction — the 'master' is the drug controlling you. The mid-song acoustic passage is one of the most beautiful, unexpected moments in metal history. Stranger Things introduced it to a new generation, but metalheads have known it as a masterpiece for 35+ years.",
            storyAr: "إدانة لإدمان المخدرات — 'السيد' هو المخدر الذي يتحكم بك. المقطع الأكوستيكي في منتصف الأغنية من أجمل وأكثر اللحظات مفاجأةً في تاريخ الميتال."
          },
          {
            id: 'highway-hell-acdc',
            title: 'Highway to Hell',
            artist: 'AC/DC',
            cover: 'https://i.scdn.co/image/ab67616d0000b273854aa35d9e73fcd3e79f5b4c',
            spotify: 'https://open.spotify.com/track/2zYzyRzEIWCLMOiSqAZMgP',
            storyEn: "Bon Scott wrote this about the exhausting life on the road — constantly on tour buses. Tragically his last studio album before his death. The riff became one of the most recognizable in all of rock history. It plays every day somewhere on Earth.",
            storyAr: "كتبها بون سكوت عن الحياة المرهقة على الطريق. كان آخر ألبوم أستوديو له قبل وفاته. أصبح الريف واحداً من أكثر الأعزوفات تميزاً في تاريخ الروك."
          }
        ]
      },
      {
        id: 'nu-metal',
        name: '⚡ Nu-Metal Energy',
        songs: [
          {
            id: 'in-the-end-lp',
            title: 'In the End',
            artist: 'Linkin Park',
            cover: 'https://i.scdn.co/image/ab67616d0000b27306f87998d9d9f8a3636db6e6',
            spotify: 'https://open.spotify.com/track/60a0Rd6pjrkxjPbaKzXjfq',
            storyEn: "Written about effort that goes unrecognized — putting everything into something only for it to mean nothing. Almost cut from the album. Became one of the best-selling rock songs of the 2000s. Chester Bennington's pain in the vocals is deeply real.",
            storyAr: "عن جهد لا يُقدَّر — وضع كل شيء في شيء ما ليكتشف أنه لا يعني شيئاً. كادت تُحذف من الألبوم. أصبحت من أكثر أغاني الروك مبيعاً في الألفينيات."
          },
          {
            id: 'numb-lp',
            title: 'Numb',
            artist: 'Linkin Park',
            cover: 'https://i.scdn.co/image/ab67616d0000b273778b5dd4d9eb4b0d4f42cd36',
            spotify: 'https://open.spotify.com/track/1OUuTBBMlxHfqHHQXCwA4h',
            storyEn: "About the suffocation of living under someone else's expectations. Chester said it was deeply personal — feeling like you can never be enough for the people supposed to love you. One of the most-streamed rock songs globally on Spotify.",
            storyAr: "عن اختناق العيش تحت توقعات الآخرين. قال تشيستر إنها شخصية جداً — الشعور بأنك لن تكون كافياً أبداً لأشخاص يُفترض أن يحبوك."
          },
          {
            id: 'break-stuff-lb',
            title: 'Break Stuff',
            artist: 'Limp Bizkit',
            cover: 'https://i.scdn.co/image/ab67616d0000b2736d8a5d7c0e4c6d5e88c0e5e6',
            spotify: 'https://open.spotify.com/track/3hRV0jL3vUpRyS55Aa2b1C',
            storyEn: "Fred Durst wrote this about a genuinely terrible day — everything going wrong, pure unfiltered rage. The anthem for anyone who ever wanted to just explode. Its raw aggression became cathartic for millions. Defines the nu-metal era.",
            storyAr: "كتبها فريد دورست عن يوم سيئ حقيقي — كل شيء يسوء، غضب صافٍ بلا فلتر. أصبحت نشيداً لكل من أراد الانفجار."
          },
          {
            id: 'killing-name-ratm',
            title: 'Killing in the Name',
            artist: 'Rage Against the Machine',
            cover: 'https://i.scdn.co/image/ab67616d0000b2734e0a0b52dc88e67498d2a64c',
            spotify: 'https://open.spotify.com/track/59WN2psjkt1tyaxjspN8fp',
            storyEn: "A direct challenge to systemic racism and police brutality. Zack de la Rocha's delivery is one of the most politically charged in rock history. 'Fuck you, I won't do what you tell me' became a universal rallying cry for resistance. Beat the X Factor winner to UK #1 in 2009.",
            storyAr: "تحدٍّ مباشر للعنصرية المنهجية وعنف الشرطة. أداء زاك دو لا روشا من أكثر الأداءات شحناً سياسياً في تاريخ الروك."
          }
        ]
      }
    ],

    // ══════════════════════
    //   SADNESS 🩵
    // ══════════════════════
    sadness: [
      {
        id: 'greatest-sad',
        name: '💙 Greatest Sad Songs',
        songs: [
          {
            id: 'someone-like-you-adele',
            title: 'Someone Like You',
            artist: 'Adele',
            cover: 'https://i.scdn.co/image/ab67616d0000b27314460f5ac22fbd2e0fe15e3e',
            spotify: 'https://open.spotify.com/track/1zwMYTA5nlNjZxYrvBB2pV',
            storyEn: "Adele wrote this about a real breakup — showing up at an ex's door to find he had moved on. She performed it live at the BRITs and made an entire arena cry. Music psychologist Dr. Jacob Jolij called it scientifically the saddest song ever based on tempo, key, and lyrics.",
            storyAr: "كتبتها أديل عن فراق حقيقي — الوصول لباب حبيب سابق لتجده قد تجاوز الأمر وأصبح سعيداً. عندما أدّتها في حفل BRITs، بكى المكان بأكمله."
          },
          {
            id: 'skinny-love-boniver',
            title: 'Skinny Love',
            artist: 'Bon Iver',
            cover: 'https://i.scdn.co/image/ab67616d0000b2730748504ec76ef98ad5f7a6a6',
            spotify: 'https://open.spotify.com/track/1D4PUZL1GGBI5OEBL1kp2L',
            storyEn: "Justin Vernon wrote this entire album isolated in a Wisconsin cabin after a breakup and serious illness. 'Skinny Love' is about a relationship barely surviving — kept alive by two people with no energy left to truly love each other. Pitchfork gave the album a perfect score.",
            storyAr: "كتب جاستن فيرنون الألبوم بأكمله في كابينة معزولة في ويسكونسن. 'Skinny Love' عن علاقة تكاد تموت — يُبقيها حيّة شخصان لم يعد لديهما طاقة للحب الحقيقي."
          },
          {
            id: 'the-scientist-coldplay',
            title: 'The Scientist',
            artist: 'Coldplay',
            cover: 'https://i.scdn.co/image/ab67616d0000b27396a4f8a3f27da1f2c4f1a7f0',
            spotify: 'https://open.spotify.com/track/75JFxkI2RXiU7L9VXzMkle',
            storyEn: "Chris Martin wrote this at piano after a breakup, playing it emotionally in reverse — starting at the end, going back to the beginning. The music video literally plays backward. It's about wanting to undo the damage, to return before everything broke.",
            storyAr: "كتبها كريس مارتن على البيانو بعد فراق، يلعبها عاطفياً بالعكس. الفيديو الموسيقي يُشغَّل حرفياً بالعكس. عن الرغبة في التراجع عن الضرر."
          },
          {
            id: 'hurt-johnnycash',
            title: 'Hurt',
            artist: 'Johnny Cash',
            cover: 'https://i.scdn.co/image/ab67616d0000b2736e18b3f70f0a46fc6d1fb706',
            spotify: 'https://open.spotify.com/track/28cngnGq4j3YMpjGIBxZ9Q',
            storyEn: "Trent Reznor wrote the original, but when Johnny Cash recorded it at 71 — months before his death, just after his wife June died — it became something else entirely. Rick Rubin produced it. Reznor said: 'It's his song now'. Voted most emotionally powerful music video ever made.",
            storyAr: "كتبها ترنت رزنور، لكن حين سجّلها جوني كاش وهو في السبعين — بعد وفاة زوجته جون — أصبحت شيئاً مختلفاً. قال رزنور: 'هي أغنيته الآن'."
          },
          {
            id: 'drivers-license-olivia',
            title: "drivers license",
            artist: 'Olivia Rodrigo',
            cover: 'https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e52',
            spotify: 'https://open.spotify.com/track/6HU7h9RYOaPRFeh0R3UeAr',
            storyEn: "Olivia wrote this in her bedroom about the torture of getting your driver's license with no one to share it with. It broke the Spotify first-week record with 76 million streams. Music journalists called it 'the defining sad song of a generation'.",
            storyAr: "كتبتها أوليفيا في غرفتها عن التعذيب المحدد من الحصول على رخصة القيادة دون أحد لمشاركتها. كسرت رقم Spotify للأسبوع الأول بـ 76 مليون استماع."
          }
        ]
      },
      {
        id: 'indie-sad',
        name: '🌧️ Indie Tears',
        songs: [
          {
            id: 'moon-song-phoebe',
            title: 'Moon Song',
            artist: 'Phoebe Bridgers',
            cover: 'https://i.scdn.co/image/ab67616d0000b273f3b4a03ceaf57a89b5e8e5e0',
            spotify: 'https://open.spotify.com/track/2giKFxaBX9oHf7MYqmLBCA',
            storyEn: "Phoebe wrote this about being so in love you'd follow someone anywhere — even into destruction. About loving someone who cannot love you back the same way. Pitchfork named it one of the best songs of the decade.",
            storyAr: "كتبتها فيبي عن التعلق العميق بشخص لدرجة اتباعه لأي مكان — حتى نحو الدمار. عن حبّ شخص لا يستطيع حبّك بنفس الطريقة."
          },
          {
            id: 'cardigan-taylor',
            title: 'cardigan',
            artist: 'Taylor Swift',
            cover: 'https://i.scdn.co/image/ab67616d0000b273da5d5aeeabacacer7f7f74b4',
            spotify: 'https://open.spotify.com/track/4R2kfaDFhslZEMJqAFNpdd',
            storyEn: "Part of Taylor's 'folklore' trilogy about a love triangle from three perspectives. 'cardigan' tells it from the girl's view — being someone's second choice, knowing they'll come back when no one else will have them. Produced by Aaron Dessner, intimate and spectral.",
            storyAr: "جزء من ثلاثية 'folklore' عن مثلث حب. تحكيها 'cardigan' من منظور الفتاة — الألم من كونكِ الخيار الثاني، ومعرفة أنهم سيعودون حين لا يجد أحدهم غيركِ."
          },
          {
            id: 'traitor-olivia',
            title: 'traitor',
            artist: 'Olivia Rodrigo',
            cover: 'https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e52',
            spotify: 'https://open.spotify.com/track/4nS5KMBt9iGMljWBqMNSr5',
            storyEn: "The most specific heartbreak — not that they left, but that they replaced you so quickly. Watching someone you loved become everything they couldn't be for you, for someone else. Critics call it her most 'lyrically complex' song.",
            storyAr: "أكثر أنواع الحزن تحديداً — ليس أنهم رحلوا، بل أنهم استبدلوك بسرعة. مراقبة شخص أحببته يصبح كل ما لم يستطع أن يكونه لكَ، لشخص آخر."
          }
        ]
      }
    ],

    // ══════════════════════
    //   EUPHORIA ✨
    // ══════════════════════
    euphoria: [
      {
        id: 'peak-songs',
        name: '⚡ Peak Energy',
        songs: [
          {
            id: 'blinding-lights-weeknd',
            title: 'Blinding Lights',
            artist: 'The Weeknd',
            cover: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb92',
            spotify: 'https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b',
            storyEn: "Inspired by 1980s synthwave — specifically driving at night. Became the best-charting song in Billboard Hot 100 history, accumulating more weeks on the chart than any song ever. Its euphoric energy is scientifically linked to dopamine release by music researchers at McGill.",
            storyAr: "مستوحاة من السينث ويف الثمانيني — تحديداً القيادة ليلاً. أصبحت أفضل أغنية في تاريخ مخطط Billboard Hot 100 من حيث عدد الأسابيع المتراكمة."
          },
          {
            id: 'uptown-funk-ronson',
            title: 'Uptown Funk',
            artist: 'Mark Ronson ft. Bruno Mars',
            cover: 'https://i.scdn.co/image/ab67616d0000b273e419ccba0baa8bd3f3d7abf6',
            spotify: 'https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS',
            storyEn: "Took Mark Ronson and Bruno Mars over a year — they kept feeling something was missing. The result spent 14 weeks at #1 in the US. Rolling Stone called it 'a masterclass in funk production'. It is physically impossible to be sad while it plays.",
            storyAr: "استغرق مارك رونسون وبرونو مارس أكثر من عام لإكمالها. النتيجة أمضت 14 أسبوعاً في صدارة المخططات الأمريكية. يستحيل الحزن أثناء تشغيلها."
          },
          {
            id: 'dancing-queen-abba',
            title: 'Dancing Queen',
            artist: 'ABBA',
            cover: 'https://i.scdn.co/image/ab67616d0000b273571eb1451d99db89c5e0b8f6',
            spotify: 'https://open.spotify.com/track/0GjEhVFGZW8afUYGChu3Rr',
            storyEn: "ABBA recorded this the night before the King of Sweden's wedding. A perfect pop song — pure distilled joy, no cynicism whatsoever. Musicologists found its chord progression physically mimics the feeling of a dance. Still makes every room happy 45 years later.",
            storyAr: "سجّل ABBA هذه الأغنية ليلة قبل زواج ملك السويد. أغنية بوب مثالية — فرح نقي مقطّر. درس علماء الموسيقى لماذا تُطلق هذه الكمية من السعادة."
          },
          {
            id: 'dont-stop-now-queen',
            title: "Don't Stop Me Now",
            artist: 'Queen',
            cover: 'https://i.scdn.co/image/ab67616d0000b273e8d8fc34c0b6e75a1ecdf99a',
            spotify: 'https://open.spotify.com/track/5T8EDUDqKcs6OSOwEsfqG7',
            storyEn: "Freddie Mercury wrote this at the height of his personal excess — wild parties, pure euphoria of being alive. Scientists at University of Manchester calculated it as the world's most perfect feel-good song based on tempo, pitch, and chord progression. Freddie at his most brilliant.",
            storyAr: "كتبها فريدي ميركوري في ذروة جموحه — حفلات صاخبة وبهجة خالصة من الحياة. حسبها علماء مانشستر كأكثر أغنية مُبهجة في العالم."
          },
          {
            id: 'happy-pharrell',
            title: 'Happy',
            artist: 'Pharrell Williams',
            cover: 'https://i.scdn.co/image/ab67616d0000b273e8107e6d9214baa81bb79bba',
            spotify: 'https://open.spotify.com/track/60nZcoimTHgCjJ5QKb7TXB',
            storyEn: "Pharrell wrote 10 versions before this one. Originally for Despicable Me 2 soundtrack. Went to #1 in 24 countries. Music researchers at University of Groningen found it physiologically induces happiness by mirroring the brain's reward pattern.",
            storyAr: "كتب فاريل 10 نسخ قبل هذه. كُتبت أصلاً لفيلم Despicable Me 2. وصلت لـ#1 في 24 دولة. وجد باحثو جامعة خرونينغن أنها تُحدث السعادة فيزيولوجياً."
          }
        ]
      },
      {
        id: 'kpop-hype',
        name: '🔥 K-Pop Hype',
        songs: [
          {
            id: 'dynamite-bts',
            title: 'Dynamite',
            artist: 'BTS',
            cover: 'https://i.scdn.co/image/ab67616d0000b273b4e63903a63fc7b0cbbf04f8',
            spotify: 'https://open.spotify.com/track/0t1kP63rueHleOhQkYSXFY',
            storyEn: "BTS's first all-English song, released during COVID-19 to bring joy worldwide. Debuted at #1 on Billboard Hot 100 — first Korean act ever. The members cried after recording it because it felt like a gift they were giving the world during its darkest period.",
            storyAr: "أول أغنية بالكامل بالإنجليزية لـ BTS، أُطلقت خلال كوفيد-19 لإدخال البهجة. صعدت لـ#1 في Billboard Hot 100 — أول فنان كوري يحقق ذلك. بكى الأعضاء بعد تسجيلها."
          },
          {
            id: 'fearless-lesserafim',
            title: 'FEARLESS',
            artist: 'LE SSERAFIM',
            cover: 'https://i.scdn.co/image/ab67616d0000b273c47e96fcfcd5e8b0e3f2e4c4',
            spotify: 'https://open.spotify.com/track/0Srve6MLzN9bJcRWWGg3kv',
            storyEn: "LE SSERAFIM's debut is a declaration — the group name means 'I am fearless' (anagram). About moving forward regardless of what people say. One of the most powerful debut statements in 4th generation K-Pop history.",
            storyAr: "أغنية デビو لـ LE SSERAFIM هي إعلان — اسم المجموعة يعني 'أنا لا أخشى شيئاً'. عن المضي قدماً بغض النظر عما يقوله الناس."
          },
          {
            id: 'super-shy-nj',
            title: 'Super Shy',
            artist: 'NewJeans',
            cover: 'https://i.scdn.co/image/ab67616d0000b27352af9df1d2a40d0c0d00f7e8',
            spotify: 'https://open.spotify.com/track/3mfGQmMfaHf0mJtI6h6UMB',
            storyEn: "Captures the specific euphoria of having a crush and not being able to say it. The 2000s-influenced production and youthful energy made it a global hit beyond K-Pop audiences. It is the sonic equivalent of butterflies in your stomach.",
            storyAr: "'Super Shy' تجسّد النشوة المحددة من التعلق بشخص وعدم القدرة على البوح. الإنتاج المتأثر بالألفينيات والطاقة الشبابية جعلاها ناجحة عالمياً."
          }
        ]
      }
    ],

    // ══════════════════════
    //   MELANCHOLY 🌙
    // ══════════════════════
    melancholy: [
      {
        id: 'beautiful-dark',
        name: '🌙 Beautiful & Dark',
        songs: [
          {
            id: 'retrograde-jblake',
            title: 'Retrograde',
            artist: 'James Blake',
            cover: 'https://i.scdn.co/image/ab67616d0000b273f0cbffa0e2b7a0fd3e7f67f6',
            spotify: 'https://open.spotify.com/track/4pXsL7hWM5CYNfqxmjJMBv',
            storyEn: "One of those rare songs that creates its own atmosphere. The opening piano, building electronic production, and his falsetto create something that sounds like looking at a city from far away at night. Pitchfork gave it a perfect 10.",
            storyAr: "واحدة من تلك الأغاني النادرة التي تصنع جوّها الخاص. البيانو الافتتاحي والإنتاج الإلكتروني المتصاعد وأداؤه الحاد يصنعون شيئاً يبدو كالنظر لمدينة من بعيد ليلاً."
          },
          {
            id: 'holocene-boniver',
            title: 'Holocene',
            artist: 'Bon Iver',
            cover: 'https://i.scdn.co/image/ab67616d0000b273f2d6ce29985ee1f8b9d5f4cb',
            spotify: 'https://open.spotify.com/track/4q5JiOOKLLNLnWUqHdABCl',
            storyEn: "Named after the current geological epoch. About a cosmic sense of smallness — standing in a vast landscape realizing how little any of it matters, and how beautiful that is. The Iceland-filmed music video was named one of the greatest ever made.",
            storyAr: "سُمّيت باسم الحقبة الجيولوجية الحالية. عن الشعور الكوني بالصغر — الوقوف في منظر شاسع وإدراك كم لا يهم أي شيء، وكم ذلك جميل."
          },
          {
            id: 'wait-m83',
            title: 'Wait',
            artist: 'M83',
            cover: 'https://i.scdn.co/image/ab67616d0000b27322f6fcfef81e40eb61c1ea77',
            spotify: 'https://open.spotify.com/track/0DDk6UVFJHEQXRsXrqWfZl',
            storyEn: "Anthony Gonzalez wrote this as a letter to nostalgia itself — suspended between who you were and who you're becoming. The child's voice in the bridge is devastating. SPIN called the album 'the most ambitious of the decade'.",
            storyAr: "كتبها أنتوني غونزاليس كرسالة للحنين ذاته — التعليق بين من كنت ومن أصبحت. صوت الطفل في الجسر الأغنوي مدمّر."
          },
          {
            id: 'liability-lorde',
            title: 'Liability',
            artist: 'Lorde',
            cover: 'https://i.scdn.co/image/ab67616d0000b273f8cbafdf7b1ff21fe15f6d63',
            spotify: 'https://open.spotify.com/track/5FBPRFnEpFmRNJd5PQjpn2',
            storyEn: "Ella wrote this about being 'too much' for people — a personality burning too bright, leaving others singed. 'The only love I haven't screwed up, she's in my head.' Rolling Stone called it 'one of the most honest pop songs of the decade'.",
            storyAr: "كتبتها إيلا عن كونكِ 'أكثر من اللازم' للناس — الشخصية التي تضيء بقوة فتحرق الآخرين. 'الحب الوحيد الذي لم أدمره موجود في رأسي'."
          },
          {
            id: 'reaper-sia',
            title: 'Reaper',
            artist: 'Sia',
            cover: 'https://i.scdn.co/image/ab67616d0000b2733bd8dbfc2d8e8fa8a1bb9d53',
            spotify: 'https://open.spotify.com/track/2HEAqzVs8QbJEzgGBkMCVN',
            storyEn: "Sia wrote this about depression — death following you. But she turned it into something unexpectedly empowering. The production swells into something almost triumphant, capturing melancholy's paradox: it can be heavy and beautiful simultaneously.",
            storyAr: "كتبتها سيا عن الاكتئاب — الشعور بأن الموت يتبعك. لكنها حوّلته لشيء مُمكِّن. الإنتاج يتصاعد لشيء شبه منتصر، يجسّد مفارقة الحزن الجميل."
          }
        ]
      }
    ],

    // ══════════════════════
    //   NOSTALGIA 📼
    // ══════════════════════
    nostalgia: [
      {
        id: 'classics-throwback',
        name: '📼 Throwback Hits',
        songs: [
          {
            id: 'september-ewf',
            title: 'September',
            artist: 'Earth, Wind & Fire',
            cover: 'https://i.scdn.co/image/ab67616d0000b27387c9fc3f35bc0ccb7e3b80c0',
            spotify: 'https://open.spotify.com/track/7Cuk8jsPPoNYQWXK9XRFvG',
            storyEn: "'Do you remember the 21st night of September?' — one of the most iconic lines in pop. Allee Willis, who co-wrote it, was asked why the 21st. She said: 'It just sounded right'. No deeper meaning. Pure joy that has made people happy for 45 years.",
            storyAr: "'هل تتذكر الليلة الحادية والعشرين من سبتمبر؟' من أشهر مطلع في تاريخ البوب. سُئلت الكاتبة لماذا الحادي والعشرين. قالت: 'بدا صحيحاً'. لا معنى أعمق. بهجة خالصة لمدة 45 عاماً."
          },
          {
            id: 'dreams-fleetwood',
            title: 'Dreams',
            artist: 'Fleetwood Mac',
            cover: 'https://i.scdn.co/image/ab67616d0000b2739e2f95ae77cf436017292b99',
            spotify: 'https://open.spotify.com/track/0ofHAoxe9vBkTCp2UQIavz',
            storyEn: "Stevie Nicks wrote this in 10 minutes in Sly Stone's studio. Fleetwood Mac's only US #1. In 2020, Nathan Apodaca's TikTok skateboard video sent it back to the top 43 years after release — one of the greatest viral moments in music history.",
            storyAr: "كتبتها ستيفي نيكس في 10 دقائق. في 2020، فيديو TikTok أعادها للمخططات بعد 43 عاماً — واحدة من أعظم اللحظات الفيروسية في تاريخ الموسيقى."
          },
          {
            id: 'take-on-me-aha',
            title: 'Take On Me',
            artist: 'a-ha',
            cover: 'https://i.scdn.co/image/ab67616d0000b273add95f44cd61e56b56d1be74',
            spotify: 'https://open.spotify.com/track/2WfaOiMkCvy7F5fcp2zZ8L',
            storyEn: "a-ha recorded three different versions before the iconic final take. The revolutionary pencil-sketch music video took 16 weeks to produce. Reached #1 in 36 countries. The 'TAKE ON ME' falsetto note is one of the most recognizable moments in pop history.",
            storyAr: "سجّلت a-ha ثلاث نسخ مختلفة قبل التسجيل الأيقوني. استغرق الفيديو بأسلوب الرصاص 16 أسبوعاً للإنتاج. وصل لـ#1 في 36 دولة."
          },
          {
            id: 'dont-stop-believer',
            title: "Don't Stop Believin'",
            artist: 'Journey',
            cover: 'https://i.scdn.co/image/ab67616d0000b2734e0a0b52dc88e67498d2a64c',
            spotify: 'https://open.spotify.com/track/4bHsxqR3GMrXTxEPLuK5ue',
            storyEn: "Steve Perry wrote this about small-town kids chasing their dreams. It became the best-selling digital catalog single of the 20th century. The piano intro is one of the most recognized in rock history. The Sopranos finale used it — making it instantly iconic all over again.",
            storyAr: "كتبها ستيف بيري عن أطفال المدن الصغيرة يلاحقون أحلامهم. أصبحت أكثر أغاني الكتالوج الرقمي مبيعاً في القرن العشرين."
          },
          {
            id: 'eye-tiger-survivor',
            title: 'Eye of the Tiger',
            artist: 'Survivor',
            cover: 'https://i.scdn.co/image/ab67616d0000b273e4a106b24de5db61abf1c59e',
            spotify: 'https://open.spotify.com/track/2HWEhnG5zvXBpOHnmhcGRe',
            storyEn: "Sylvester Stallone called Survivor for Rocky III's theme because Queen refused. The opening riff was written in one hour. Won the Grammy for Best Rock Performance. Now played at virtually every sports event on Earth.",
            storyAr: "اتصل سيلفستر ستالون بـ Survivor لأن Queen رفضت. كُتب الريف في ساعة واحدة. فاز بـ Grammy. تُشغَّل الآن في كل حدث رياضي تقريباً على وجه الأرض."
          }
        ]
      },
      {
        id: 'kpop-nostalgia',
        name: '🌸 K-Pop Nostalgia',
        songs: [
          {
            id: 'attention-nj',
            title: 'Attention',
            artist: 'NewJeans',
            cover: 'https://i.scdn.co/image/ab67616d0000b27352af9df1d2a40d0c0d00f7e8',
            spotify: 'https://open.spotify.com/track/0n67oJBVVinGMJoaKgGRFV',
            storyEn: "NewJeans' debut arrived fully formed — confident, Y2K-influenced. Shot on film cameras, it gave a nostalgic quality making listeners feel they were remembering something they'd never experienced. It redefined 4th gen K-Pop sound completely.",
            storyAr: "أغنية デビو لـ NewJeans وصلت مكتملة — واثقة، بتأثيرات Y2K. صُوِّر على كاميرات فيلمية، مما أعطاه طابعاً حنينياً جعل المستمعين يشعرون كأنهم يتذكرون شيئاً لم يختبروه."
          },
          {
            id: 'ditto-nj',
            title: 'Ditto',
            artist: 'NewJeans',
            cover: 'https://i.scdn.co/image/ab67616d0000b27352af9df1d2a40d0c0d00f7e8',
            spotify: 'https://open.spotify.com/track/17fDm2FaVSgL7XHs0SBBXZ',
            storyEn: "A K-Pop anomaly — slow, nostalgic, shot on camcorder aesthetic, yet became one of the most-streamed K-Pop songs ever. The feeling of wanting to freeze a perfect moment. Critics say it defined a new era of sound in the genre.",
            storyAr: "'Ditto' شاذة في K-Pop — بطيئة، حنينية، بجمالية كاميرا قديمة، ومع ذلك من أكثر أغاني K-Pop استماعاً. الشعور برغبة تجميد لحظة مثالية مع شخص ما."
          },
          {
            id: 'omg-nj',
            title: 'OMG',
            artist: 'NewJeans',
            cover: 'https://i.scdn.co/image/ab67616d0000b27352af9df1d2a40d0c0d00f7e8',
            spotify: 'https://open.spotify.com/track/6yb9tmdabIMRGBUZ8klNsJ',
            storyEn: "Two songs in one — first a dreamy delicate piece, then an explosive party drop. The duality mirrors the experience of having an overwhelming crush. The music video went viral for its abstract, unsettling storyline involving cult-like brainwashing.",
            storyAr: "'OMG' هي أغنيتان في واحدة — الأولى حالمة، والثانية انفجار راقص. الازدواجية تعكس تجربة التعلق الطاغي."
          }
        ]
      }
    ]
  }
};