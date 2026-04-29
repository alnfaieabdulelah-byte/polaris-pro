// ============================================================
// POLARIS — Song & Emotion Data Structure
// ============================================================
// To add a new song: copy any song object below and fill in the fields.
// To add a new emotion: add a new key under "emotions" with songs array.
// To add a new genre: add a new key under "genres" with songs array.
// Spotify links: go to Spotify → right-click song → Share → Copy Link
// ============================================================

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumCover: string; // Spotify CDN or any image URL
  spotifyUrl: string; // Spotify deep link
  emotionTag: string;
  previewUrl?: string; // 30-second preview MP3 (optional)
  accentColor: string; // dominant color from album art (hex)
  story: {
    en: string; // English story
    ar: string; // Arabic translation
  };
}

export interface EmotionCategory {
  id: string;
  label: string;
  labelAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  ambientColor: string; // primary glow color
  accentColor: string;  // secondary accent
  animation: string;    // animation type identifier
  songs: Song[];
}

export interface GenreCollection {
  id: string;
  label: string;
  labelAr: string;
  description: string;
  icon: string;
  accentColor: string;
  songs: Song[];
}

// ============================================================
// EMOTION CATEGORIES
// ============================================================
export const emotions: EmotionCategory[] = [
  {
    id: "love",
    label: "Love",
    labelAr: "حب",
    description: "Warm, infinite, beautiful",
    descriptionAr: "دافئ، لا نهائي، جميل",
    icon: "♥",
    ambientColor: "#FF6B8A",
    accentColor: "#FFB3C6",
    animation: "particles-float",
    songs: [
      {
        id: "love-1",
        title: "Perfect",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
        spotifyUrl: "https://open.spotify.com/track/0tgVpDi06FyKpA1z0VMD4v",
        emotionTag: "Love",
        accentColor: "#D4A574",
        previewUrl: "",
        story: {
          en: "Ed Sheeran wrote 'Perfect' in 2017 as a declaration of love for his then-girlfriend (now wife) Cherry Seaborn. The song was written during the recording of ÷ and was inspired by a Beyoncé song. Sheeran described it as 'the first truly romantic thing he ever wrote.' It reached #1 in multiple countries and became one of the best-selling wedding songs of all time. The lyrics capture a moment of pure, simple perfection — a dance barefoot on grass, two people lost in each other.",
          ar: "كتب إد شيران أغنية 'بيرفكت' عام 2017 كإعلان حب لصديقته (زوجته الآن) شيري سيبورن. كُتبت الأغنية خلال تسجيل ألبوم ÷ وكانت مستوحاة من أغنية بيونسيه. وصفها شيران بأنها 'أول شيء رومانسي حقيقي كتبه'. وصلت إلى المرتبة الأولى في عدة دول وأصبحت واحدة من أكثر أغاني الأعراس مبيعاً على الإطلاق."
        }
      },
      {
        id: "love-2",
        title: "All of Me",
        artist: "John Legend",
        album: "Love in the Future",
        albumCover: "https://i.scdn.co/image/ab67616d0000b2732e8ed79e177ff6011076f5f0",
        spotifyUrl: "https://open.spotify.com/track/3U4isOIWM3VvDubwSI3y7a",
        emotionTag: "Love",
        accentColor: "#8B6914",
        previewUrl: "",
        story: {
          en: "John Legend wrote 'All of Me' for his wife Chrissy Teigen, whom he married in 2013. The song was performed live at their wedding in Italy. It became one of the biggest love songs of the 2010s, spending 67 non-consecutive weeks on the Billboard Hot 100. The lyrics are intimate and vulnerable — Legend exposes his own flaws and imperfections, declaring that he loves every part of his partner, even the 'crazy' parts.",
          ar: "كتب جون ليجيند 'أول أوف مي' لزوجته كريسي تيغن التي تزوجها عام 2013. غُنّيت الأغنية مباشرة في حفل زفافهم في إيطاليا. أصبحت من أكبر أغاني الحب في العقد الثاني من الألفية الثالثة، وأمضت 67 أسبوعاً متفرقة في قائمة بيلبورد هوت 100."
        }
      },
      {
        id: "love-3",
        title: "Can't Help Falling in Love",
        artist: "Elvis Presley",
        album: "Blue Hawaii",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273ef9b110e43fda649f5b70e44",
        spotifyUrl: "https://open.spotify.com/track/44AyOl4qoeZw2jSHpXN5YY",
        emotionTag: "Love",
        accentColor: "#2D5A8E",
        previewUrl: "",
        story: {
          en: "Originally recorded by Elvis Presley in 1961 for the film Blue Hawaii, 'Can't Help Falling in Love' is based on a French melody 'Plaisir d'amour' from 1784. The song captures the feeling of surrendering entirely to love — the idea that falling in love is as natural and inevitable as rivers flowing to the sea. It has been covered hundreds of times and remains one of the most recognizable love songs in human history.",
          ar: "سجّلها أصلاً إلفيس بريسلي عام 1961 لفيلم 'بلو هاواي'، وتعتمد الأغنية على لحن فرنسي من عام 1784. تجسّد الأغنية الشعور بالاستسلام الكامل للحب — الفكرة القائلة بأن الوقوع في الحب أمر طبيعي ولا مفر منه كتدفق الأنهار نحو البحر."
        }
      }
    ]
  },
  {
    id: "sadness",
    label: "Sadness",
    labelAr: "حزن",
    description: "Feel it, release it, heal",
    descriptionAr: "اشعر به، أطلقه، اشفَ",
    icon: "◐",
    ambientColor: "#4A7FBF",
    accentColor: "#7EB8F7",
    animation: "rain",
    songs: [
      {
        id: "sad-1",
        title: "The Night We Met",
        artist: "Lord Huron",
        album: "Strange Trails",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273c36dd9eb55fb5c1c7a51b6a3",
        spotifyUrl: "https://open.spotify.com/track/3hRV0jL3vUpRrcy398tRs0",
        emotionTag: "Sadness",
        accentColor: "#1A3A5C",
        previewUrl: "",
        story: {
          en: "'The Night We Met' by Lord Huron became a cultural phenomenon after its use in the Netflix series '13 Reasons Why' in 2017. The song was originally released in 2015 and gained massive viral attention. Frontman Ben Schneider wrote it about nostalgia and longing — specifically, the desperate wish to return to a single perfect moment in time before things went wrong. The haunting guitar and Schneider's ethereal vocals create a sound that feels like standing at the edge of memory.",
          ar: "أصبحت أغنية 'ذا نايت وي مت' لـ لورد هيورون ظاهرة ثقافية بعد استخدامها في المسلسل الشهير '13 ريزنز واي' عام 2017. كتبها بن شنايدر عن الحنين والشوق — تحديداً عن الرغبة اليائسة في العودة إلى لحظة مثالية واحدة قبل أن تسوء الأمور."
        }
      },
      {
        id: "sad-2",
        title: "Someone Like You",
        artist: "Adele",
        album: "21",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273499dbc5f32189e4aa1a08a73",
        spotifyUrl: "https://open.spotify.com/track/1zwMYTA5nlNjZxYrvBB2pV",
        emotionTag: "Sadness",
        accentColor: "#3D2B1F",
        previewUrl: "",
        story: {
          en: "Adele wrote 'Someone Like You' in response to a breakup with a long-term boyfriend. She visited his home unannounced after hearing he had married someone else, and wrote the song afterward. The sparse piano accompaniment was intentional — Adele wanted the emotion to carry without distraction. It debuted at #1 in 25 countries and became a modern anthem for heartbreak. Music psychologist Dr. Jacob Jolij has studied why this song makes people cry — the combination of tempo, minor key, and lyrical content creates a perfect storm of emotion.",
          ar: "كتبت أديل 'سومون لايك يو' استجابةً لانفصالها عن صديق عمرها. زارت منزله دون إشعار مسبق بعد أن علمت بزواجه من شخص آخر، وكتبت الأغنية بعد ذلك. التوزيع البسيط على البيانو كان مقصوداً — أرادت أديل أن يحمل العاطفة بدون تشتيت."
        }
      },
      {
        id: "sad-3",
        title: "Skinny Love",
        artist: "Bon Iver",
        album: "For Emma, Forever Ago",
        albumCover: "https://i.scdn.co/image/ab67616d0000b2735a0e0719bb17bea3d28b0fff",
        spotifyUrl: "https://open.spotify.com/track/3LaeaWKgG9HKe0fD3UHpzb",
        emotionTag: "Sadness",
        accentColor: "#4A3728",
        previewUrl: "",
        story: {
          en: "Justin Vernon (Bon Iver) recorded 'Skinny Love' in a remote Wisconsin cabin during a harsh winter after a difficult breakup and health struggles. He was completely isolated for three months, and the raw, unpolished quality of the recording reflects that isolation. 'Skinny love' refers to a relationship sustained by too little emotional nourishment — love that is starving. The entire album was recorded in 2006-2007 and released independently before becoming a critical sensation.",
          ar: "سجّل جاستن فيرنون (بون إيفر) أغنية 'سكيني لاف' في كابينة معزولة في ويسكونسن خلال شتاء قارس بعد انفصال مؤلم ومشاكل صحية. كان معزولاً تماماً لمدة ثلاثة أشهر، والجودة الخام غير المصقولة للتسجيل تعكس تلك العزلة. يشير 'الحب النحيل' إلى علاقة يتسمها نقص الغذاء العاطفي."
        }
      }
    ]
  },
  {
    id: "anger",
    label: "Anger",
    labelAr: "غضب",
    description: "Channel it. Transform it.",
    descriptionAr: "وجّهه. حوّله.",
    icon: "◈",
    ambientColor: "#CC2222",
    accentColor: "#FF6B6B",
    animation: "pulse-sharp",
    songs: [
      {
        id: "anger-1",
        title: "HUMBLE.",
        artist: "Kendrick Lamar",
        album: "DAMN.",
        albumCover: "https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699",
        spotifyUrl: "https://open.spotify.com/track/7KXjTSCq5nL1LoYtL7XAwS",
        emotionTag: "Anger",
        accentColor: "#8B0000",
        previewUrl: "",
        story: {
          en: "Kendrick Lamar's 'HUMBLE.' from the 2017 album DAMN. is a controlled explosion of righteous anger and self-assertion. The Mike WiLL Made-It beat is stripped down to a single piano loop and explosive drums — a deliberate contrast to the inflated egos Kendrick is criticizing. The music video, directed by Dave Meyers and the Little Homies, references Da Vinci's Last Supper. The song won the Grammy for Best Rap Song and Best Rap Performance in 2018, cementing Lamar's status as the defining voice of his generation.",
          ar: "أغنية 'هامبل' لكندريك لامار من ألبوم 'دامن' عام 2017 هي انفجار مضبوط من الغضب الصادق وتأكيد الذات. الموسيقى مقتصرة على حلقة بيانو واحدة وطبول انفجارية — تناقض مقصود مع الغرور المبالغ فيه الذي يكيّله كندريك بانتقاداته. فاز بجائزة غرامي لأفضل أغنية راب وأفضل أداء راب عام 2018."
        }
      },
      {
        id: "anger-2",
        title: "Break Stuff",
        artist: "Limp Bizkit",
        album: "Significant Other",
        albumCover: "https://i.scdn.co/image/ab67616d0000b2737fd20e1ef90e38fcb3a9d0a6",
        spotifyUrl: "https://open.spotify.com/track/5NU7bY2gUjJEJAJNv9MR6K",
        emotionTag: "Anger",
        accentColor: "#4A0000",
        previewUrl: "",
        story: {
          en: "'Break Stuff' by Limp Bizkit (1999) is one of the most cathartic anger anthems ever recorded. Fred Durst wrote it on a day when everything was going wrong — it was literally about having one of those days where you just want to break something. The song became an anthem for a generation of frustrated youth in the late 90s nu-metal era. Despite its aggressive nature, the song represents the universal human need to release pent-up frustration in a safe way.",
          ar: "'برايك ستاف' لليمب بيزكيت (1999) واحدة من أكثر أناشيد الغضب الكاثارسية المُسجَّلة. كتبها فريد دورست في يوم كان فيه كل شيء يسير على نحو خاطئ. أصبحت النشيد الرسمي لجيل من الشباب المحبط في حقبة نو-ميتال في أواخر التسعينيات."
        }
      },
      {
        id: "anger-3",
        title: "Killing in the Name",
        artist: "Rage Against the Machine",
        album: "Rage Against the Machine",
        albumCover: "https://i.scdn.co/image/ab67616d0000b27372862cd96f3f3ceef2b10a56",
        spotifyUrl: "https://open.spotify.com/track/59WN2psjkt1tyaxjspN8fp",
        emotionTag: "Anger",
        accentColor: "#1A0000",
        previewUrl: "",
        story: {
          en: "'Killing in the Name' by Rage Against the Machine (1992) is a monument of political anger. Written in response to the Rodney King beating and systemic racism, the song uses explosive guitar riffs and Zack de la Rocha's furious vocals to channel institutional injustice. The track ends with one of the most cathartic moments in rock history. In 2009, a fan campaign made it the UK Christmas #1, beating the X Factor winner — a symbol of rebellion against corporate music.",
          ar: "'كيلينج إن ذا نيم' لـ راج أجينست ذا ماشين (1992) هي صرح من الغضب السياسي. كُتبت استجابةً لضرب رودني كينج والعنصرية المنهجية. في عام 2009، أدت حملة جماهيرية إلى تصدّرها المرتبة الأولى في المملكة المتحدة في عيد الميلاد، متغلبةً على الفائز ببرنامج X Factor."
        }
      }
    ]
  },
  {
    id: "happiness",
    label: "Happiness",
    labelAr: "سعادة",
    description: "Pure joy, unfiltered light",
    descriptionAr: "فرح خالص، نور بلا فلتر",
    icon: "☀",
    ambientColor: "#FFD700",
    accentColor: "#FFEB80",
    animation: "burst-light",
    songs: [
      {
        id: "happy-1",
        title: "Happy",
        artist: "Pharrell Williams",
        album: "G I R L",
        albumCover: "https://i.scdn.co/image/ab67616d0000b2731f0e748074ce78a3c4ab1f2a",
        spotifyUrl: "https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCH",
        emotionTag: "Happiness",
        accentColor: "#E6A817",
        previewUrl: "",
        story: {
          en: "Pharrell Williams wrote 'Happy' in 2013 for the Despicable Me 2 soundtrack. It was almost not included in the film. When it was released as a standalone single, it became a global phenomenon — spending 10 weeks at #1 in the US. The song inspired a 24-hour music video and countless viral covers worldwide. Pharrell reportedly cried when Ellen DeGeneres showed him how many people the song had touched. It won the Grammy for Best Pop Solo Performance and became one of the best-selling digital singles of all time.",
          ar: "كتب فاريل ويليامز 'هابي' عام 2013 لموسيقى فيلم 'ديسبيكابل مي 2'. حين صدرت كأغنية مستقلة، أصبحت ظاهرة عالمية — قضت 10 أسابيع في المرتبة الأولى في الولايات المتحدة. الأغنية ألهمت مقطع موسيقي مدته 24 ساعة وتغطيات فيروسية لا تحصى حول العالم."
        }
      },
      {
        id: "happy-2",
        title: "Good as Hell",
        artist: "Lizzo",
        album: "Cuz I Love You",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffa1f5d1a4a",
        spotifyUrl: "https://open.spotify.com/track/3KkXRkHbMCARz0aVfEt68P",
        emotionTag: "Happiness",
        accentColor: "#C41E3A",
        previewUrl: "",
        story: {
          en: "Lizzo wrote 'Good as Hell' originally in 2016 as a song of empowerment and self-love. She has said it was written during a difficult period in her life when she was broke and struggling. The song was re-released in 2019 and became one of the year's biggest anthems. It's a celebration of inner strength and the ability to reclaim your joy — built on a gospel-influenced foundation of handclaps and an irresistible groove. Lizzo performed it at the 2019 BET Awards in a white tuxedo, and it became a defining moment.",
          ar: "كتبت ليزو 'جود آز هيل' أصلاً عام 2016 كأغنية تمكين وحب ذاتي. قالت إنها كُتبت في فترة صعبة من حياتها حين كانت تعاني ماديًا. أعيد إصدارها عام 2019 وأصبحت واحدة من أكبر أناشيد ذلك العام."
        }
      },
      {
        id: "happy-3",
        title: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        album: "Uptown Special",
        albumCover: "https://i.scdn.co/image/ab67616d0000b2731f09f71d93e6daf9ae5ffeb0",
        spotifyUrl: "https://open.spotify.com/track/32OlwWuMpZ6b0aN2RZOeMS",
        emotionTag: "Happiness",
        accentColor: "#8B4513",
        previewUrl: "",
        story: {
          en: "'Uptown Funk' by Mark Ronson featuring Bruno Mars (2014) is a masterclass in pure sonic joy. The track took nearly a year to complete because Ronson and Mars kept refining every element. Inspired by 80s funk, Minneapolis sound, and James Brown, it became one of the best-selling singles in history, spending 14 consecutive weeks at #1 in the US. The groove is meticulously constructed — every hi-hat, every bass note placed with surgical precision to make the body move involuntarily.",
          ar: "'أبتاون فانك' لمارك رونسون وبرونو مارس (2014) درس في الفرح الصوتي الخالص. استغرق تسجيل المقطوعة ما يقارب عاماً لأن رونسون ومارس كانا يحسّنان كل عنصر. مستوحاةً من موسيقى الفانك في الثمانينيات، أمضت 14 أسبوعاً متتالياً في المرتبة الأولى في الولايات المتحدة."
        }
      }
    ]
  },
  {
    id: "motivation",
    label: "Motivation",
    labelAr: "دافع",
    description: "Rise. Push. Become.",
    descriptionAr: "انهض. ادفع. كن.",
    icon: "▲",
    ambientColor: "#FF8C00",
    accentColor: "#FFB347",
    animation: "energy-surge",
    songs: [
      {
        id: "motiv-1",
        title: "Lose Yourself",
        artist: "Eminem",
        album: "8 Mile Soundtrack",
        albumCover: "https://i.scdn.co/image/ab67616d0000b2732e34ec8c1897fac76d52af2e",
        spotifyUrl: "https://open.spotify.com/track/5Z01UMMf7V1o0MzF86s6WJ",
        emotionTag: "Motivation",
        accentColor: "#1A1A1A",
        previewUrl: "",
        story: {
          en: "Eminem wrote 'Lose Yourself' for the 2002 film 8 Mile, which was semi-autobiographical. He wrote the lyrics on set between takes, on paper bags and scraps. The song became the first hip-hop track to win the Academy Award for Best Original Song. The opening guitar riff and the iconic first verse — 'His palms are sweaty...' — have become cultural touchstones for seizing your moment. It sat at #1 on the Billboard Hot 100 for 12 weeks and is one of the most motivational songs ever created.",
          ar: "كتب إمينيم 'لوز يورسيلف' لفيلم '8 مايل' عام 2002. كتب الكلمات في الموقع بين اللقطات، على أكياس ورق وقصاصات. أصبحت الأغنية أول مقطوعة هيب-هوب تفوز بجائزة الأوسكار لأفضل أغنية أصلية."
        }
      },
      {
        id: "motiv-2",
        title: "Eye of the Tiger",
        artist: "Survivor",
        album: "Eye of the Tiger",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273cd7a1aa49c40e4b2a7e3e7fe",
        spotifyUrl: "https://open.spotify.com/track/2KH16WveTQWT6KOG9Rg6e2",
        emotionTag: "Motivation",
        accentColor: "#FF6B00",
        previewUrl: "",
        story: {
          en: "'Eye of the Tiger' by Survivor (1982) was written specifically for Rocky III after Sylvester Stallone felt that Queen's 'Another One Bites the Dust' was too upbeat for his vision. The iconic guitar riff was composed in a single day by guitarist Frankie Sullivan. The song won the Grammy for Best Rock Performance in 1983 and remains one of the most recognizable sports anthems in history. The phrase 'Eye of the Tiger' entered the English language as a permanent idiom for fierce competitive focus.",
          ar: "كُتبت 'آي أوف ذا تايغر' لسورفايفور (1982) خصيصاً لفيلم 'روكي 3' بعد أن أحسّ سيلفستر ستالون أن أغنية كوين 'أنذر وان بايتس ذا داست' لا تتناسب مع رؤيته. فازت بجائزة غرامي لأفضل أداء روك عام 1983 وتُعدّ من أشهر أناشيد الرياضة في التاريخ."
        }
      },
      {
        id: "motiv-3",
        title: "Not Afraid",
        artist: "Eminem",
        album: "Recovery",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273fac2a5b2a50e34f4a4c0c7e5",
        spotifyUrl: "https://open.spotify.com/track/7lQ8MOoFyxGk4oGwIVW0OE",
        emotionTag: "Motivation",
        accentColor: "#1A1A2E",
        previewUrl: "",
        story: {
          en: "Eminem's 'Not Afraid' (2010) was written after his recovery from drug addiction and near-death experience. He had overdosed on methadone in 2007 and spent years rebuilding. The song is a direct address to anyone fighting their own battles — a declaration of survival and transformation. It debuted at #1 on the Billboard Hot 100, making Eminem the first artist to have three albums debut at #1 in the US in the 2000s. The song's message transcends music: it's a manifesto for anyone who has faced their darkest moment.",
          ar: "كُتبت 'نوت أفرايد' لإمينيم (2010) بعد تعافيه من إدمان المخدرات وتجربة الاقتراب من الموت. تعرّض لجرعة زائدة من الميثادون عام 2007 وقضى سنوات في إعادة بناء نفسه. الأغنية خطاب مباشر لكل من يخوض معاركه الخاصة."
        }
      }
    ]
  },
  {
    id: "loneliness",
    label: "Loneliness",
    labelAr: "وحدة",
    description: "You are not alone in feeling alone",
    descriptionAr: "أنت لست وحدك في شعورك بالوحدة",
    icon: "○",
    ambientColor: "#5B4B8A",
    accentColor: "#9B89C4",
    animation: "void-pulse",
    songs: [
      {
        id: "lone-1",
        title: "Mr. Lonely",
        artist: "Akon",
        album: "Trouble",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273bd9de96fad76e57f3a8d0d62",
        spotifyUrl: "https://open.spotify.com/track/3xKsf9qdS1CyvXSMEid6g8",
        emotionTag: "Loneliness",
        accentColor: "#3D2B6E",
        previewUrl: "",
        story: {
          en: "Akon's 'Mr. Lonely' (2004) became one of the defining songs of emotional vulnerability in the 2000s. Akon, who had spent time in prison before his music career, channeled the extreme isolation of solitary confinement into the song. The simplicity of 'I'm Mr. Lonely, I have nobody' — so plain, so unpoetic — became exactly what made it devastating. It resonated with millions who felt unseen. The song reached the top 10 in numerous countries and established Akon as a voice for emotional honesty.",
          ar: "'مستر لونلي' لأكون (2004) أصبحت واحدة من أبرز أغاني الضعف العاطفي في العقد الأول من الألفية الثالثة. كان أكون قد قضى وقتاً في السجن قبل مسيرته الموسيقية، وصبّ العزلة الشديدة لزنزانة الانفراد في الأغنية."
        }
      },
      {
        id: "lone-2",
        title: "Eleanor Rigby",
        artist: "The Beatles",
        album: "Revolver",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",
        spotifyUrl: "https://open.spotify.com/track/3GToknAS9GGRpdFBewGoeQ",
        emotionTag: "Loneliness",
        accentColor: "#2A1A0A",
        previewUrl: "",
        story: {
          en: "The Beatles' 'Eleanor Rigby' (1966) is a haunting portrait of invisible, forgotten people. McCartney came up with the character Eleanor Rigby while improvising — the name came from actress Eleanor Bron and a grave in a Bristol churchyard. The song uses only strings — no Beatles instruments — and tells the story of two lonely souls who never meet. It raised the question: 'All the lonely people, where do they all come from?' — a question that remains as urgent as ever in the modern world.",
          ar: "'إليانور ريجبي' للبيتلز (1966) صورة مأساوية لأشخاص غير مرئيين منسيين. استخدمت الأغنية الأوتار فقط — لا آلات البيتلز — وتحكي قصة روحين وحيدتين لا يلتقيان أبداً. وطرحت السؤال: 'كل الناس الوحيدين، من أين يأتون جميعاً؟'"
        }
      },
      {
        id: "lone-3",
        title: "Mad World",
        artist: "Gary Jules",
        album: "Trading Snakeoil for Wolftickets",
        albumCover: "https://i.scdn.co/image/ab67616d0000b2739f3c8db22a8b73e0697b3ed2",
        spotifyUrl: "https://open.spotify.com/track/3JOVTQ5h8HyvI8ejYABJOm",
        emotionTag: "Loneliness",
        accentColor: "#0D1117",
        previewUrl: "",
        story: {
          en: "Gary Jules' cover of Tears for Fears' 'Mad World' was recorded for the 2001 film Donnie Darko. The original was upbeat synth-pop; Jules stripped it to a simple piano and a barely-there vocal. The minimalism exposed the existential loneliness in the lyrics that the original version obscured. It became the UK Christmas #1 in 2003, making it one of the slowest and most melancholic songs ever to reach the top. The lyric 'The dreams in which I'm dying are the best I've ever had' became a defining statement of millennial disillusionment.",
          ar: "سُجّلت نسخة غاري جولز من أغنية 'ماد وورلد' لـ تيرز فور فيرز لفيلم 'داني داركو' عام 2001. الأصلية كانت موسيقى بوب إلكترونية صاخبة؛ جولز اختزلها إلى بيانو بسيط وصوت خافت. تصدّرت المرتبة الأولى في المملكة المتحدة في عيد الميلاد 2003."
        }
      }
    ]
  },
  {
    id: "nostalgia",
    label: "Nostalgia",
    labelAr: "حنين",
    description: "Memory as a place you can visit",
    descriptionAr: "الذاكرة كمكان يمكنك زيارته",
    icon: "◎",
    ambientColor: "#D4A574",
    accentColor: "#E8C99A",
    animation: "sepia-drift",
    songs: [
      {
        id: "nostalgia-1",
        title: "Yesterday",
        artist: "The Beatles",
        album: "Help!",
        albumCover: "https://i.scdn.co/image/ab67616d0000b2738a8b7e79b02d009a4ef7dcbf",
        spotifyUrl: "https://open.spotify.com/track/3BQHpFgAp4l80e1XslIjNI",
        emotionTag: "Nostalgia",
        accentColor: "#8B6914",
        previewUrl: "",
        story: {
          en: "Paul McCartney woke up with the melody to 'Yesterday' fully formed in his head in 1965. He was so sure it was a memory of another song that he played it to everyone he knew for weeks asking 'have you heard this before?' When no one could identify it, he realized it was original. It became the most covered song in history with over 2,000 recorded versions. John Lennon once said he wished he had written it. The song captures the impossible wish that the past could return — a universal human longing.",
          ar: "استيقظ بول مكارتني في عام 1965 وكانت لحن 'يستردي' مكتملاً في ذهنه. كان متأكداً جداً أنه يتذكر أغنية أخرى لدرجة أنه عزفها على الجميع لأسابيع متسائلاً 'هل سمعتم هذا من قبل؟' أصبحت الأغنية الأكثر تغطيةً في التاريخ بأكثر من 2000 نسخة مسجّلة."
        }
      },
      {
        id: "nostalgia-2",
        title: "Summer of '69",
        artist: "Bryan Adams",
        album: "Reckless",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273ac6bc6e1d8e36e0aca56d7f2",
        spotifyUrl: "https://open.spotify.com/track/1TcLPDMmAnB6KglqXqHSmS",
        emotionTag: "Nostalgia",
        accentColor: "#8B4513",
        previewUrl: "",
        story: {
          en: "'Summer of '69' by Bryan Adams (1985) is one of the great nostalgic anthems — but Bryan Adams himself has admitted he was only 9 years old in 1969. The song isn't actually about the year 1969 — it's about the feeling of a perfect summer that you can never get back. Adams wrote it with Jim Vallance about the pure euphoria of youth: playing guitar until your fingers bled, falling in love, believing the good times would last forever. The song resonates because it captures what all nostalgia is really about: the irretrievable past.",
          ar: "'سامر أوف '69' لبريان آدامز (1985) ليست في الواقع عن عام 1969 — بريان آدامز نفسه اعترف أنه كان في التاسعة من عمره في ذلك العام. الأغنية تتحدث عن شعور الصيف المثالي الذي لا يمكنك استعادته أبداً."
        }
      },
      {
        id: "nostalgia-3",
        title: "Fast Car",
        artist: "Tracy Chapman",
        album: "Tracy Chapman",
        albumCover: "https://i.scdn.co/image/ab67616d0000b27399b55e0d3f51ca4f79b2f49d",
        spotifyUrl: "https://open.spotify.com/track/2tznHmp70DxMyr2XhWLOW0",
        emotionTag: "Nostalgia",
        accentColor: "#2C1810",
        previewUrl: "",
        story: {
          en: "Tracy Chapman wrote 'Fast Car' in 1988 while living in poverty in Boston. The song tells the story of a woman escaping her circumstances — a father who drinks, a dead-end job, a dream of a better life just beyond reach. The guitar fingerpicking pattern is deceptively simple; Chapman taught herself guitar as a child. When she performed it at the Nelson Mandela 70th Birthday Tribute concert to a global audience of 600 million, it launched her career overnight. The song is about the nostalgia for a future that never arrived.",
          ar: "كتبت تريسي تشابمان 'فاست كار' عام 1988 وهي تعيش في فقر في بوسطن. الأغنية تحكي قصة امرأة تهرب من ظروفها — أب يشرب، عمل مسدود الآفاق، حلم بحياة أفضل في متناول اليد. حين أدّتها في حفل عيد ميلاد نيلسون مانديلا الـ70 أمام جمهور عالمي بلغ 600 مليون مشاهد، انطلقت مسيرتها بين عشية وضحاها."
        }
      }
    ]
  },
  {
    id: "confidence",
    label: "Confidence",
    labelAr: "ثقة",
    description: "You were born for this",
    descriptionAr: "وُلدت من أجل هذا",
    icon: "◆",
    ambientColor: "#9B59B6",
    accentColor: "#D2A8FF",
    animation: "crown-glow",
    songs: [
      {
        id: "conf-1",
        title: "Run the World (Girls)",
        artist: "Beyoncé",
        album: "4",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273718b39d7ea16c9a3f76d26e7",
        spotifyUrl: "https://open.spotify.com/track/7d8GetBHHgzSJl5JuAON5v",
        emotionTag: "Confidence",
        accentColor: "#4A0E6F",
        previewUrl: "",
        story: {
          en: "Beyoncé's 'Run the World (Girls)' (2011) samples Major Lazer's 'Pon de Floor' and was built around a concept of feminine power and sovereignty. Beyoncé spent months developing the choreography personally, drawing from African dance traditions, Bob Fosse, and military formations. The song was performed at the Billboard Music Awards with an army of dancers in a visual spectacle that became one of the most referenced performances in modern music history. It's a declaration: not a request, not a question.",
          ar: "'رن ذا وورلد' لبيونسيه (2011) مبنية على فكرة القوة الأنثوية والسيادة. أمضت بيونسيه أشهراً في تطوير الكوريوغرافيا شخصياً، مستلهمةً من تقاليد الرقص الأفريقي وبوب فوسي والتشكيلات العسكرية."
        }
      },
      {
        id: "conf-2",
        title: "God's Plan",
        artist: "Drake",
        album: "Scorpion",
        albumCover: "https://i.scdn.co/image/ab67616d0000b2730f5b2b9bcdb9c73abd6f67b6",
        spotifyUrl: "https://open.spotify.com/track/6DCZcSspjsKoFjzjrWbKno",
        emotionTag: "Confidence",
        accentColor: "#1A0A2E",
        previewUrl: "",
        story: {
          en: "'God's Plan' by Drake (2018) is built on supreme confidence — the certainty that everything happening in your life is part of a larger design. Drake gave away the entire $996,631.90 video budget to strangers in Miami for the music video. The song broke streaming records on its first day, with 4.6 million US streams in 24 hours. The music video won the Grammy for Best Music Video in 2019. The philosophical core is about surrendering to fate while maintaining absolute confidence in your destiny.",
          ar: "'جودز بلان' لدريك (2018) مبنية على ثقة مطلقة — اليقين بأن كل ما يحدث في حياتك جزء من تصميم أكبر. تبرّع دريك بكامل ميزانية الفيديو البالغة 996,631 دولاراً لغرباء في ميامي. كسرت الأغنية أرقام قياسية في البث الأول بها."
        }
      },
      {
        id: "conf-3",
        title: "King of Anything",
        artist: "Sara Bareilles",
        album: "Kaleidoscope Heart",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273aa78f72a2e14c1f2a1f6d5ca",
        spotifyUrl: "https://open.spotify.com/track/6I2OXAG3hfQ9UoMYCoBsqe",
        emotionTag: "Confidence",
        accentColor: "#1A3A2A",
        previewUrl: "",
        story: {
          en: "Sara Bareilles wrote 'King of Anything' (2010) in response to unsolicited opinions and people who try to control or diminish her voice. It's a manifesto of self-sovereignty — the refusal to let anyone else narrate your story. Bareilles has said it came from a relationship where she felt her voice was being suppressed. The song became an anthem for anyone who has ever felt talked over, dismissed, or defined by someone else's limited vision. It's quiet confidence — not a shout, but an unmovable declaration.",
          ar: "كتبت سارة بارييليس 'كينج أوف أنيذنج' (2010) رداً على الآراء غير المطلوبة والأشخاص الذين يحاولون التحكم في صوتها. إنها إعلان للسيادة الذاتية — الرفض السماح لأي شخص بسرد قصتك."
        }
      }
    ]
  },
  {
    id: "calm",
    label: "Calm",
    labelAr: "هدوء",
    description: "Stillness as strength",
    descriptionAr: "الصمت كقوة",
    icon: "◯",
    ambientColor: "#48BB78",
    accentColor: "#9AE6B4",
    animation: "breathe",
    songs: [
      {
        id: "calm-1",
        title: "Weightless",
        artist: "Marconi Union",
        album: "Weightless",
        albumCover: "https://i.scdn.co/image/ab67616d0000b27384c9a63d44d6a91a3d68d87e",
        spotifyUrl: "https://open.spotify.com/track/7ovek3GDqkWE3BF4YTtlHK",
        emotionTag: "Calm",
        accentColor: "#0A2A1A",
        previewUrl: "",
        story: {
          en: "'Weightless' by Marconi Union (2011) was scientifically designed with help from sound therapists at the British Academy of Sound Therapy to reduce anxiety. A study by MindLab International found it reduced anxiety by 65% and physiological resting rates by 35% — making it the 'most relaxing song ever created.' The track uses specific binaural beat frequencies, decreasing tempos from 60 to 50 BPM, and bass notes that synchronize with the resting heart rate. It literally rewires your nervous system.",
          ar: "صُمّمت 'وايتلس' لـ ماركوني يونيون (2011) علمياً بمساعدة معالجين صوتيين لتقليل القلق. وجدت دراسة من MindLab International أنها خفّضت القلق بنسبة 65% ومعدلات الراحة الفسيولوجية بنسبة 35% — مما يجعلها 'الأغنية الأكثر استرخاءً تم إنشاؤها على الإطلاق'."
        }
      },
      {
        id: "calm-2",
        title: "Holocene",
        artist: "Bon Iver",
        album: "Bon Iver, Bon Iver",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273b29eb13dc0e4e345d0e0d7e4",
        spotifyUrl: "https://open.spotify.com/track/6kLCHFM39wkFjOuyPGLGeQ",
        emotionTag: "Calm",
        accentColor: "#1A2A1A",
        previewUrl: "",
        story: {
          en: "'Holocene' by Bon Iver is named after the current geological epoch — a word suggesting timescales so vast that human problems shrink into insignificance. The music video, shot in Iceland, features a child walking alone through vast landscapes, emphasizing the feeling of being small in the grandest, most peaceful sense. Justin Vernon has described the song as being about 'the feeling of being humbled by the universe.' It's a reminder that you are part of something infinitely larger than your current worry.",
          ar: "'هولوسين' لـ بون إيفر مسمّاة على اسم الحقبة الجيولوجية الراهنة — كلمة تشير إلى أطر زمنية شاسعة لدرجة أن مشاكل الإنسان تصبح ضئيلة. مقطع الفيديو، المصوّر في آيسلندا، يُظهر طفلاً يمشي وحده عبر مناظر طبيعية شاسعة."
        }
      },
      {
        id: "calm-3",
        title: "Clair de Lune",
        artist: "Claude Debussy",
        album: "Suite Bergamasque",
        albumCover: "https://i.scdn.co/image/ab67616d0000b2736e9bce3a5855ee6c8c0ac5e7",
        spotifyUrl: "https://open.spotify.com/track/1cB5Vm1RxwEYIKoFOVq6mT",
        emotionTag: "Calm",
        accentColor: "#0A1A3A",
        previewUrl: "",
        story: {
          en: "Claude Debussy's 'Clair de Lune' (Moonlight), composed in 1905, is one of the most recognizable piano pieces in classical music. Debussy was inspired by the French symbolist poet Paul Verlaine's poem of the same name, which describes moonlight as a dreamlike, otherworldly illumination. The piece is impressionistic — it doesn't tell a story but evokes a feeling: the quiet beauty of moonlight on water. In 2022, NASA played 'Clair de Lune' on a transmission to the Moon — acknowledging that this piece of music is as timeless as space itself.",
          ar: "'كلير دو لون' (ضوء القمر) لكلود ديبوسي (1905) واحدة من أكثر مقطوعات البيانو الكلاسيكية تمييزاً. وفي عام 2022، أرسلت ناسا 'كلير دو لون' في بث إلى القمر — اعترافاً بأن هذه المقطوعة الموسيقية تتجاوز الزمن تماماً كالفضاء."
        }
      }
    ]
  },
  {
    id: "heartbreak",
    label: "Heartbreak",
    labelAr: "قلب مكسور",
    description: "The beautiful ache of having loved",
    descriptionAr: "الألم الجميل لكونك أحببت",
    icon: "◑",
    ambientColor: "#8B1A4A",
    accentColor: "#D4698A",
    animation: "shatter",
    songs: [
      {
        id: "hb-1",
        title: "drivers license",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a",
        spotifyUrl: "https://open.spotify.com/track/5wANPM4fQCJwkGd4rN57mH",
        emotionTag: "Heartbreak",
        accentColor: "#3D0A2A",
        previewUrl: "",
        story: {
          en: "'drivers license' by Olivia Rodrigo (2021) broke Spotify's record for most streams in a single day upon release. Rodrigo wrote it at 17, processing a complicated situation involving a co-star on the Disney show High School Musical: The Musical: The Series. The song captures a specific kind of teenage heartbreak — the cruelty of continuing to exist in a world where someone has moved on. The bridge — where her voice breaks on 'You're so much older now' — became one of the defining emotional moments in pop music of the 2020s.",
          ar: "'درايفرز لايسنس' لأوليفيا رودريغو (2021) كسرت رقم سبوتيفاي لأكثر التدفقات في يوم واحد عند الإصدار. كتبتها رودريغو في سن السابعة عشرة، تعالج من خلالها موقفاً معقداً مع زميل في مسلسل ديزني. الأغنية تجسّد نوعاً محدداً من حزن المراهقة."
        }
      },
      {
        id: "hb-2",
        title: "Back to December",
        artist: "Taylor Swift",
        album: "Speak Now",
        albumCover: "https://i.scdn.co/image/ab67616d0000b27390bc9b91e1a9c3d309f66040",
        spotifyUrl: "https://open.spotify.com/track/5sdQOyqq2IDhvmx2lHOpwd",
        emotionTag: "Heartbreak",
        accentColor: "#1A2A3A",
        previewUrl: "",
        story: {
          en: "'Back to December' by Taylor Swift (2010) is notable because it's one of the rare instances where Swift wrote a song taking full responsibility for a relationship ending — not assigning blame to the other person. Written about actor Taylor Lautner, it's an apology song about realizing too late what you had. Swift has said it's the song she is most proud of because it required the most honesty and vulnerability. The imagery of roses turning to rust and winter arriving speaks to the specific grief of knowing you caused someone's pain.",
          ar: "'باك تو ديسمبر' لتايلور سويفت (2010) لافتة لأنها من الحالات النادرة التي كتبت فيها سويفت أغنية تحمّل فيها المسؤولية الكاملة عن انتهاء علاقة. وقالت سويفت إنها الأغنية التي تفخر بها أكثر لأنها تطلّبت أكبر قدر من الصدق والضعف."
        }
      },
      {
        id: "hb-3",
        title: "Skinny",
        artist: "Billie Eilish",
        album: "HIT ME HARD AND SOFT",
        albumCover: "https://i.scdn.co/image/ab67616d0000b27354cba58b7cebfd89cdca04e3",
        spotifyUrl: "https://open.spotify.com/track/7e9bv0TxGUEjHjLLTOExWw",
        emotionTag: "Heartbreak",
        accentColor: "#0A1A0A",
        previewUrl: "",
        story: {
          en: "'Skinny' by Billie Eilish (2024) from her album 'HIT ME HARD AND SOFT' is one of the most vulnerable songs she has ever released. Written about feeling unrecognizable to herself after years of public life, body scrutiny, and personal transformation, the song blurs the line between heartbreak over a person and heartbreak over a version of yourself you can never return to. The whispered production allows the lyrics to land with surgical precision. Eilish wrote it as a meditation on identity, loss, and the strange grief of growing up in public.",
          ar: "'سكيني' لبيلي إيليش (2024) من ألبومها 'هيت مي هارد آند سوفت' واحدة من أكثر أغنياتها ضعفاً وصدقاً. كُتبت عن الشعور بعدم التعرف على الذات بعد سنوات من الحياة العامة وفحص الجسد والتحول الشخصي."
        }
      }
    ]
  }
];

// ============================================================
// GENRE COLLECTIONS
// ============================================================
export const genres: GenreCollection[] = [
  {
    id: "love-songs",
    label: "Best Love Songs Ever",
    labelAr: "أفضل أغاني الحب على الإطلاق",
    description: "The greatest love songs humanity has ever written",
    icon: "♥",
    accentColor: "#FF6B8A",
    songs: [
      {
        id: "genre-love-1",
        title: "My Heart Will Go On",
        artist: "Celine Dion",
        album: "Let's Talk About Love",
        albumCover: "https://i.scdn.co/image/ab67616d0000b2736e6ae2c7b70a67d20607e0b8",
        spotifyUrl: "https://open.spotify.com/track/4IKVDbCSBTxBeAsMKTQkLd",
        emotionTag: "Love",
        accentColor: "#1A3A5C",
        previewUrl: "",
        story: {
          en: "James Horner composed 'My Heart Will Go On' for the 1997 film Titanic. Director James Cameron initially didn't want a song over the end credits, but producer Jon Landau convinced him. Celine Dion recorded the vocals in a single take. It became the best-selling single of 1998 and won the Academy Award for Best Original Song. The pan flute intro is one of the most recognizable musical phrases of the 20th century. The song has sold over 18 million copies worldwide.",
          ar: "لحّن جيمس هورنر 'ماي هارت ويل غو أون' لفيلم تايتانيك عام 1997. أدّت سيلين ديون المقطوعة الصوتية في تسجيل واحد. أصبحت الأغنية الأكثر مبيعاً لعام 1998 وفازت بجائزة الأوسكار لأفضل أغنية أصلية. بيعت أكثر من 18 مليون نسخة حول العالم."
        }
      },
      {
        id: "genre-love-2",
        title: "Thinking Out Loud",
        artist: "Ed Sheeran",
        album: "X",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273221f60de0cec9e1a8e9e2a43",
        spotifyUrl: "https://open.spotify.com/track/34gCuhDGsG4bRPIf9bb02f",
        emotionTag: "Love",
        accentColor: "#8B4513",
        previewUrl: "",
        story: {
          en: "Ed Sheeran co-wrote 'Thinking Out Loud' with Amy Wadge in a single night in 2014. He has said it took about 20 minutes to write. The song is about growing old with someone — choosing them again and again, every decade. The music video, featuring Sheeran and dancer Brittany Cherry in an extended ballroom sequence, became one of the most-viewed videos on YouTube. It won the Grammy for Song of the Year in 2016.",
          ar: "شارك إد شيران في تأليف 'ثنكينج آوت لاود' مع إيمي وادج في ليلة واحدة عام 2014. قال إنها استغرقت نحو 20 دقيقة للكتابة. الأغنية عن الشيخوخة مع شخص ما — اختياره مراراً وتكراراً في كل عقد. فازت بجائزة غرامي لأفضل أغنية العام 2016."
        }
      },
      {
        id: "genre-love-3",
        title: "At Last",
        artist: "Etta James",
        album: "At Last!",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273c8b5a9432e85dd9b82c8e0cd",
        spotifyUrl: "https://open.spotify.com/track/0BuJNkRuMbMXuOwEUzxFj3",
        emotionTag: "Love",
        accentColor: "#4A2A0A",
        previewUrl: "",
        story: {
          en: "Etta James recorded 'At Last' in 1960, transforming a 1941 Glenn Miller big band number into an intimate, soulful ballad. Her voice — raw, powerful, filled with longing — turned the simple lyric 'at last, my love has come along' into one of the most emotionally devastating phrases in music history. The song has been used at countless weddings and was performed by Beyoncé at President Obama's inauguration in 2009. James herself said it was the song that defined her life and career.",
          ar: "سجّلت إيتا جيمس 'أت لاست' عام 1960، محوّلةً مقطوعة بيغ باند لغلين ميلر من عام 1941 إلى بالاد صوفية حميمة. أُدّيت الأغنية من قِبَل بيونسيه في حفل تنصيب الرئيس أوباما عام 2009."
        }
      }
    ]
  },
  {
    id: "rock-classics",
    label: "Best Rock Songs Ever",
    labelAr: "أفضل أغاني الروك على الإطلاق",
    description: "The anthems that changed the world",
    icon: "⚡",
    accentColor: "#FF4500",
    songs: [
      {
        id: "genre-rock-1",
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        albumCover: "https://i.scdn.co/image/ab67616d0000b2737b1b82442e9f0b06e3c5c0b5",
        spotifyUrl: "https://open.spotify.com/track/7tFiyTwD0nx5a1eklYtX2J",
        emotionTag: "Motivation",
        accentColor: "#4A2A6A",
        previewUrl: "",
        story: {
          en: "Freddie Mercury composed 'Bohemian Rhapsody' in 1975 and refused to explain its meaning to anyone, including his bandmates. The song breaks every conventional rock rule — it's 5 minutes 55 seconds long, changes genre multiple times (ballad, opera, hard rock), and was declared 'unreleasable' by the label. Guitarist Brian May and producer Roy Thomas Baker spent three weeks recording the operatic section alone. It went to #1 twice — in 1975 and again in 1991 after Mercury's death. It was voted the greatest song of all time in multiple UK polls.",
          ar: "لحّن فريدي ميركوري 'بوهيميان رابسودي' عام 1975 ورفض شرح معناها لأي شخص بما في ذلك زملاؤه. الأغنية تكسر كل قواعد الروك التقليدية — مدتها 5 دقائق و55 ثانية وتغيّر النوع الموسيقي عدة مرات. قضى البعض ثلاثة أسابيع في تسجيل الجزء الأوبرالي وحده."
        }
      },
      {
        id: "genre-rock-2",
        title: "Stairway to Heaven",
        artist: "Led Zeppelin",
        album: "Led Zeppelin IV",
        albumCover: "https://i.scdn.co/image/ab67616d0000b27351c02a77d09dfcd53c8676d0",
        spotifyUrl: "https://open.spotify.com/track/5CQ30WqJwcep0pYcV4AMNc",
        emotionTag: "Nostalgia",
        accentColor: "#2A1A0A",
        previewUrl: "",
        story: {
          en: "'Stairway to Heaven' by Led Zeppelin (1971) is consistently voted the greatest rock song ever recorded. Jimmy Page wrote the guitar parts; Robert Plant wrote the lyrics spontaneously in one sitting by a fire, saying the words 'wrote themselves.' The song's dynamic journey from a gentle fingerpicked intro to a blazing hard rock finale mirrors the spiritual journey described in its lyrics. It has been played on radio more than any other song in history. Page has described the song as 'the ultimate Zeppelin song.'",
          ar: "'ستيرواي تو هيفن' لـ ليد زيبلين (1971) يُصوَّت عليها باستمرار بوصفها أعظم أغنية روك سُجّلت على الإطلاق. كتب روبرت بلانت الكلمات بشكل عفوي في جلسة واحدة بجانب النار، قائلاً إن الكلمات 'كتبت نفسها'."
        }
      },
      {
        id: "genre-rock-3",
        title: "Smells Like Teen Spirit",
        artist: "Nirvana",
        album: "Nevermind",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273fbc71c99f9c1296c56dd51b6",
        spotifyUrl: "https://open.spotify.com/track/5ghIJDpPoe3CfHMGu71E6T",
        emotionTag: "Anger",
        accentColor: "#0A0A2A",
        previewUrl: "",
        story: {
          en: "'Smells Like Teen Spirit' by Nirvana (1991) changed popular music forever. Kurt Cobain intentionally wrote it as a parody of rock anthems, but it accidentally became the anthem it was parodying. The song was so culturally disruptive that it ended the dominance of hair metal and launched the grunge era. The music video, shot in a high school gymnasium, cost $33,000 and became one of the most influential ever made. Cobain reportedly disliked the song's massive popularity, feeling it overshadowed his other work.",
          ar: "'سميلز لايك تين سبيريت' لنيرفانا (1991) غيّرت الموسيقى الشعبية إلى الأبد. كتبها كيرت كوباين عمداً كمحاكاة ساخرة لأناشيد الروك، لكنها تحوّلت صدفةً إلى النشيد الذي كانت تستهزئ به. أنهت الأغنية هيمنة موسيقى الهير ميتال وأطلقت عصر الغرانج."
        }
      }
    ]
  },
  {
    id: "kpop-universe",
    label: "Best K-Pop Songs Ever",
    labelAr: "أفضل أغاني الكيبوب على الإطلاق",
    description: "The global wave that reshaped music culture",
    icon: "✦",
    accentColor: "#FF85A1",
    songs: [
      {
        id: "genre-kpop-1",
        title: "Dynamite",
        artist: "BTS",
        album: "Dynamite",
        albumCover: "https://i.scdn.co/image/ab67616d0000b2730b9f38ec6e1bf0ef26b56da7",
        spotifyUrl: "https://open.spotify.com/track/5QDLhrAOJJdNAmCTJ8xMyW",
        emotionTag: "Happiness",
        accentColor: "#1A0A3A",
        previewUrl: "",
        story: {
          en: "'Dynamite' by BTS (2020) was the group's first fully English-language single and their first song to debut at #1 on the Billboard Hot 100. Released during the COVID-19 pandemic, it was intentionally designed to bring joy and energy to a world in crisis. The retro disco-funk aesthetic was a deliberate choice by the group to honor classic pop. The song broke Spotify's record for most streams in a single day and helped cement BTS as a truly global phenomenon, earning them a nomination for a Grammy for Best Pop Duo/Group Performance.",
          ar: "'دايناميت' لـ BTS (2020) كانت أول أغنية كاملة بالإنجليزية للمجموعة وأول أغنية تتصدر المرتبة الأولى في بيلبورد هوت 100. أُصدرت خلال جائحة كوفيد-19 وصُمّمت عمداً لإضفاء البهجة والطاقة على عالم في أزمة."
        }
      },
      {
        id: "genre-kpop-2",
        title: "LALISA",
        artist: "LISA",
        album: "LALISA",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273c89e5a5b1f7e14b06ea30b56",
        spotifyUrl: "https://open.spotify.com/track/3n2CiW6q6a8ky0LRFZ1XVM",
        emotionTag: "Confidence",
        accentColor: "#3A0A3A",
        previewUrl: "",
        story: {
          en: "'LALISA' by BLACKPINK's Lisa (2021) was her debut solo single and broke multiple records simultaneously: most-viewed K-pop solo debut MV in 24 hours, fastest K-pop solo artist to reach 100 million views on YouTube. The song is an unapologetic celebration of Thai identity and self — Lisa (Lalisa Manobal) was the first Thai member of a major K-pop group. The visual and cultural fusion of Korean pop with Thai cultural elements represented a new chapter in the globalization of K-pop.",
          ar: "'لاليسا' لليزا من بلاك بينك (2021) كانت أغنيتها الصولو الأولى وكسرت عدة أرقام قياسية في آنٍ واحد. الأغنية احتفال لا اعتذاري بالهوية التايلاندية والذات — كانت ليزا أول عضو تايلاندية في مجموعة كيبوب كبرى."
        }
      },
      {
        id: "genre-kpop-3",
        title: "Gangnam Style",
        artist: "PSY",
        album: "PSY 6甲",
        albumCover: "https://i.scdn.co/image/ab67616d0000b2732b37a14019f9cc1c7e25d89e",
        spotifyUrl: "https://open.spotify.com/track/03UrZgTINDqvnUMbbIMixEl",
        emotionTag: "Happiness",
        accentColor: "#2A1A0A",
        previewUrl: "",
        story: {
          en: "'Gangnam Style' by PSY (2012) was a cultural earthquake — it became the first YouTube video to reach 1 billion views, then 2 billion, then 3 billion, and held the record for most views for 1,755 days. PSY wrote it as a satirical commentary on the Gangnam district of Seoul — a wealthy, trend-obsessed neighborhood — poking fun at materialism and pretension. Despite being sung entirely in Korean, it became a global phenomenon that proved language is no barrier to musical connection.",
          ar: "'غانغنام ستايل' لـ PSY (2012) كانت زلزالاً ثقافياً — أصبح أول فيديو على يوتيوب يبلغ مليار مشاهدة، ثم ملياران، ثم ثلاثة مليارات. كتبها PSY كتعليق ساخر على حي غانغنام في سيول — وثبت أن اللغة ليست حاجزاً أمام الروابط الموسيقية."
        }
      }
    ]
  }
];
