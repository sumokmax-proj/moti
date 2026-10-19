/* 문맥 해설 — 출처 쪽지의 「이 문장이 나온 자리」. (스테이징 실험, 2026-10-16)
 *
 * 명언이 나온 자리를 짧게 이야기한다: 누가, 언제, 어떤 처지에서, 무엇에 이어 이 말을 했는지.
 * 말투는 책의 저자가 독자에게 건네듯 — 배움으로 가는 길을 가리키는 쪽으로(반말 평서체).
 * 사실은 정확하게, 해석은 조금 들어가도 된다. 실시간 AI 생성이 아니라 미리 쓰고 대조해서 싣는다.
 * 베트남어 화면은 영어를 보여 준다. 영어는 책 제목을 *별표* 로 감싼다(쪽지에서 기울임).
 * 기준은 QUOTE_STANDARDS.md 「문맥 해설」. */
const QUOTES_CONTEXT = {
  3: {
    ko: "프랭클린은 25년 동안 「가난한 리처드」라는 가짜 이름으로 해마다 달력을 냈고, 그 귀퉁이마다 짧은 격언을 실었다. 마지막 해인 1758년 머리말에서, 그는 경매장에 모인 사람들 앞에서 에이브러햄 영감이 그 격언들을 줄줄이 엮어 연설하는 장면을 지어냈다. 이 문장도 그 연설 속에 있다. 이 머리말은 『부자가 되는 길』이라는 이름으로 따로 퍼져 나갔다.",
    en: "For twenty-five years Franklin published an almanac every year under a made-up name, \"Poor Richard,\" filling its margins with short sayings. In the preface to the last one, in 1758, he invented a scene: an old man, Father Abraham, standing before a crowd at an auction and stringing those sayings together into a speech. This line is part of it. The preface went on to travel on its own as *The Way to Wealth*.",
  },
  4: {
    ko: "『도덕경』 64장은 일이 커지기 전에 다스리라는 이야기를 한다. 이 문장 바로 앞에 「아름드리나무도 털끝 같은 싹에서 자라고, 아홉 층 누대도 한 줌 흙을 쌓아 올린 것이다」가 놓여 있다. 크고 먼 것일수록 작고 가까운 데서 시작한다는 것이다. 오천 자 남짓한 짧은 책이니, 한 장씩 천천히 걸어 보기 좋다.",
    en: "Chapter 64 of the *Tao Te Ching* is about dealing with things before they grow. Just before this line it says: \"The tree that fills a man's arms grew from a tiny sprout; the tower of nine storeys rose from a heap of earth.\" The greater and farther the goal, the smaller and nearer the place it begins. The book is barely five thousand characters long — good for walking through one chapter at a time.",
  },
  6: {
    ko: "2005년 스탠퍼드대 졸업식에서 잡스는 「세 가지 이야기」를 들려주었다. 이 문장은 두 번째, 사랑과 상실에 관한 이야기 끝에 나온다. 서른 살에 자기가 세운 애플에서 쫓겨났지만, 그래도 여전히 자기 일을 사랑하고 있다는 걸 알았기에 다시 시작할 수 있었다는 이야기다. 그는 이렇게 덧붙였다. 「아직 찾지 못했다면 계속 찾아라. 안주하지 마라.」",
    en: "At Stanford's 2005 commencement Jobs told \"three stories.\" This line closes the second, about love and loss. At thirty he was fired from Apple, the company he had started, but he found he still loved what he did — and that was what let him begin again. Then he added: \"If you haven't found it yet, keep looking. Don't settle.\"",
  },
  21: {
    ko: "1955년 4월, 아인슈타인이 세상을 떠나자 잡지 『라이프』는 그를 추모하는 기사를 실었다. 생전에 그를 만났던 『라이프』의 윌리엄 밀러가 그때 들은 말을 옮겨 적은 것이 이 문장이다. 아인슈타인의 말이라며 떠도는 글은 많지만, 이처럼 언제 누가 들었는지가 남아 있는 말은 드물다. 그래서 이 책에 실을 수 있었다.",
    en: "When Einstein died in April 1955, *LIFE* ran a piece in his memory. William Miller of *LIFE*, who had met him while he was alive, set down these words as he had heard them. Plenty of sayings float around with Einstein's name on them; few come with a record of who heard them and when. That is why this one could go into the book.",
  },
  30: {
    ko: "『파우스트』 1부, 악마 메피스토펠레스와 계약을 맺은 파우스트는 막상 세상으로 나서려니 겁이 난다. 수염도 길고, 세상 사는 법도 모르고, 남들 앞에선 늘 작아진다고. 그때 메피스토펠레스가 건네는 말이 이것이다. 악마의 입에서 나온 위로라는 게 묘하다. 괴테는 이 작품을 거의 60년에 걸쳐 썼다.",
    en: "In Part One of *Faust*, having made his pact with the devil Mephistopheles, Faust suddenly balks at going out into the world: his beard is long, he never learned how to live among people, he always feels small beside others. These are the words Mephistopheles gives him in reply. Strange, that the comfort comes from the devil. Goethe worked on *Faust* for nearly sixty years.",
  },
  37: {
    ko: "1854년, 서른한 살의 파스퇴르는 새로 세워진 릴 대학 이학부의 학장이 되어 첫 강연을 했다. 그는 외르스테드가 강의 중에 전류 옆의 나침반 바늘이 움직이는 것을 보고 전자기를 발견한 일을 들려주며, 「우연이라고 하겠지만」 하고 괄호를 열어 이 말을 덧붙였다. 가장 유명한 문장이 사실은 괄호 속 한마디였던 셈이다.",
    en: "In 1854 Pasteur, thirty-one, became dean of the new Faculty of Sciences at Lille and gave its opening address. Telling how Ørsted saw a compass needle swing beside an electric current and so discovered electromagnetism, he paused — \"by chance, you might say\" — and added these words in parentheses. His most famous sentence was, in fact, an aside.",
  },
  41: {
    ko: "1597년, 칠천량에서 조선 수군이 거의 무너진 뒤 이순신에게 남은 배는 13척뿐이었다. 명량에서 130여 척의 왜선을 맞기 전날, 그는 장수들을 모아 「병법에 이르기를」 하며 이 말을 건넸다고 일기에 적었다. 옛 병서 『오자』의 구절을 빌린 것이다. 이튿날의 결과는 우리가 아는 그대로다. 그 하루하루가 궁금하다면 『난중일기』를 직접 펼쳐 보자.",
    en: "By 1597 the Joseon navy had been all but destroyed at Chilcheollyang, and Yi Sun-sin had just thirteen ships left. The day before he met some 130 Japanese ships at Myeongnyang, he gathered his captains and, \"as the art of war says,\" gave them these words — borrowed from the old military classic *Wuzi*. He wrote it down in his diary. What happened the next day is history. If you want to live those days with him, open his *War Diary*.",
  },
  42: {
    ko: "1909년 하얼빈에서 이토 히로부미를 쏜 안중근은 뤼순 감옥에 갇혔다. 사형을 기다리던 몇 달 동안 그는 『동양평화론』을 쓰고 많은 글씨를 남겼는데, 이 글귀도 그중 하나다. 끝에 「경술년 3월, 뤼순 옥중에서」라고 적혀 있다. 죽음을 앞둔 사람이 남긴 말이 책 이야기라는 것, 한 번쯤 곱씹어 볼 만하다.",
    en: "In 1909 An Jung-geun shot Itō Hirobumi at Harbin and was locked up in Lüshun Prison. In the months he waited for execution he wrote *On Peace in East Asia* and left many pieces of calligraphy; this is one of them, signed \"Third month of 1910, in Lüshun Prison.\" A man facing death chose to write about books. That is worth turning over in your mind.",
  },
  43: {
    ko: "삼군(三軍)은 큰 나라의 군대 전체를 말하고, 필부(匹夫)는 이름 없는 보통 사람을 말한다. 수만 명의 군대에서도 장수는 빼앗아 올 수 있지만, 한 사람이 품은 뜻은 아무도 빼앗지 못한다는 것이다. 공자는 이 말을 짧게 남겼을 뿐 사연을 적지 않았다. 『논어』에는 이렇게 맥락 없이 남은 한 줄이 많아서, 오히려 읽는 사람이 자기 사연을 채워 넣게 된다.",
    en: "\"The forces of a large state\" — in Chinese, three armies — meant a great kingdom's whole army; \"a common man\" is anyone without a name. You can carry off the commander of tens of thousands, but no one can take away what one person has set his heart on. Confucius left only the line, not the story behind it. The *Analects* is full of such lines with no context, and readers end up filling in stories of their own.",
  },
  44: {
    ko: "맹자는 이 말 앞에, 밭 갈던 순임금과 담 쌓던 부열, 감옥에 갇혔던 관중처럼 낮은 데서 일어선 사람들을 늘어놓는다. 뒤로는 「굶주리게 하고 하는 일마다 어긋나게 하는 것은, 마음을 흔들고 성질을 참게 하여 못 하던 일을 할 수 있게 하려는 것이다」가 이어진다. 그리고 이렇게 맺는다. 「근심 속에서 살고, 안락 속에서 죽는다.」",
    en: "Before this line Mencius lists people who rose from low places: Shun, who ploughed the fields; Fu Yue, who built earthen walls; Guan Zhong, raised from a jailer's keeping. After it he goes on: hunger, want and thwarted plans are sent \"to stir the mind, toughen the nature, and make one able to do what one could not do before.\" And he ends: \"We live in sorrow and calamity, and die in ease and pleasure.\"",
  },
  45: {
    ko: "루쉰의 단편 「고향」에서, 화자는 이십여 년 만에 고향 집을 팔러 돌아온다. 어린 시절 단짝이던 룬투는 가난한 농사꾼이 되어 그를 「나리」라고 부르고, 화자는 둘 사이에 생긴 두꺼운 벽을 느낀다. 배를 타고 떠나며 그는 희망이란 있다고도 없다고도 할 수 없다고 생각한다. 그리고 소설의 마지막 문장이 이것이다.",
    en: "In Lu Xun's short story \"My Old Home,\" the narrator returns after more than twenty years to sell the family house. Runtu, his best friend as a boy, is now a poor farmer who calls him \"Master,\" and the narrator feels a thick wall between them. Leaving by boat, he thinks that hope can be said neither to exist nor not to exist. Then comes this, the story's last sentence.",
  },
  46: {
    ko: "세네카는 말년에 시칠리아에 있던 친구 루킬리우스에게 백여 통의 편지를 보냈다. 104번째 편지는 열병을 앓다 로마를 떠나 시골 별장으로 간 이야기로 시작해, 어디로 떠나든 마음은 따라온다는 이야기로 이어진다. 그 뒷부분에 이 문장이 있다. 편지라지만 처음부터 읽힐 것을 생각하고 쓴 글이라, 오늘 읽어도 한 통 한 통이 짧은 에세이 같다.",
    en: "Late in life Seneca sent more than a hundred letters to his friend Lucilius in Sicily. Letter 104 begins with him leaving Rome for his country house to shake off a fever, and moves on to how your mind comes with you wherever you go. This line comes in its later part. They are letters, but written to be read by others, and each still reads like a short essay today.",
  },
  47: {
    ko: "소로는 월든 호숫가에 오두막을 짓고 2년 2개월을 혼자 살았다. 무엇이 정말 필요한지 몸으로 따져 보려는 실험이었다. 『월든』의 맺음말은 그 실험에서 얻은 것을 이렇게 시작한다. 「적어도 이것 하나는 배웠다.」 그리고 이 문장이 이어진다. 거창한 결심보다, 2년을 살아 보고 나서 한 말이라 무게가 다르다.",
    en: "Thoreau built a cabin by Walden Pond and lived there alone for two years and two months — an experiment to find out in his own life what was truly necessary. The Conclusion of *Walden* sums up what he gained this way: \"I learned this, at least, by my experiment,\" and then comes this sentence. It carries a different weight coming after two years of actually living it, rather than from a grand resolution.",
  },
  48: {
    ko: "헬렌 켈러는 생후 19개월에 병으로 보고 듣는 힘을 잃었다. 일곱 살에 설리번 선생님을 만나 손바닥에 쓰는 글자로 세상을 다시 배웠고, 이 글은 래드클리프 대학에 다니던 스물세 살에 썼다. 제목이 『낙관론』인 이 짧은 에세이에서, 그녀는 어둠을 모르는 낙관은 가볍다고 말한다. 그러니 이 문장은 고통을 지나온 사람의 낙관이다.",
    en: "Helen Keller lost her sight and hearing to an illness at nineteen months. At almost seven she met her teacher Anne Sullivan and learned the world again through letters spelled into her palm; she wrote this at twenty-three, while a student at Radcliffe. In the short essay *Optimism* she says that optimism which has never known darkness is shallow. This sentence is the optimism of someone who has come through suffering.",
  },
  50: {
    ko: "크림 전쟁에서 돌아온 뒤 나이팅게일은 병으로 거의 누워 지냈다. 그래도 그 침대에서 간호 학교를 세우고 병원과 군 위생을 고치는 보고서를 써 냈다. 이 말은 1861년 사촌 힐러리에게 보낸 편지에 있고, 뒷날 그녀의 전기를 쓴 쿡이 그 편지를 책에 옮겨 실었다. 「등불을 든 천사」보다 훨씬 고집스러운 사람이 보인다.",
    en: "After the Crimean War, Nightingale spent much of her life confined to bed by illness. Yet from that bed she founded a school of nursing and wrote reports that reformed hospitals and army sanitation. These words are from an 1861 letter to her cousin Hilary; her biographer Cook later printed the letter in his book. You see someone far more stubborn than \"the lady with the lamp.\"",
  },
  51: {
    ko: "1883년 가을, 서른 살의 반 고흐는 네덜란드 북동부 드렌터의 황야에서 홀로 그림을 그리고 있었다. 화가가 되겠다고 마음먹은 지 3년, 그림은 한 점도 팔리지 않았고 동생 테오가 보내 주는 돈으로 살았다. 이 문장은 바로 그 테오에게 쓴 긴 편지 속에 있다. 반 고흐의 편지는 800통 넘게 남아 있는데, 그림만큼이나 좋은 읽을거리다.",
    en: "In the autumn of 1883 Van Gogh, thirty years old, was painting alone on the heaths of Drenthe in the north-east of the Netherlands. Three years after deciding to become an artist he had not sold a single picture, and he lived on money from his brother Theo. These words come from one of his long letters to Theo. More than eight hundred of his letters survive, and they are as rewarding to read as his paintings are to look at.",
  },
  52: {
    ko: "1801년, 서른 살의 베토벤은 고향 본의 오랜 친구 베겔러에게 귀가 점점 들리지 않는다는 비밀을 처음 털어놓았다. 몇 달 뒤 보낸 이 편지에서 그는 사랑하는 사람이 생겼다는 이야기와 함께 이 말을 적었다. 이듬해 그는 절망 속에서 유서를 썼지만 부치지 않았고, 그 뒤로 「영웅」과 「운명」 교향곡을 써 나갔다.",
    en: "In 1801 Beethoven, thirty, confided to Wegeler, an old friend from his hometown of Bonn, the secret that he was losing his hearing. In this letter a few months later he wrote these words — along with the news that he had fallen in love. The next year, in despair, he wrote a testament he never sent; after it he went on to write the \"Eroica\" and the Fifth Symphony.",
  },
  53: {
    ko: "더글러스는 노예로 태어나 스무 살에 북부로 탈출했다. 1857년, 영국이 서인도 제도의 노예를 해방한 날을 기념하는 자리에서 그는 이 연설을 했다. 이 문장 뒤에는 「소란 없이 자유를 바라는 사람은 땅을 갈지 않고 곡식을 바라는 사람」이라는 말과, 「권력은 요구 없이는 아무것도 내주지 않는다」가 이어진다.",
    en: "Douglass was born into slavery and escaped to the North at twenty. In 1857 he gave this speech on the anniversary of Britain's emancipation of slaves in the West Indies. Right after this line come two more: those who want freedom without agitation \"want crops without plowing up the ground,\" and \"Power concedes nothing without a demand.\"",
  },
  54: {
    ko: "1941년 10월, 처칠은 모교 해로 스쿨을 찾아 학생들 앞에 섰다. 프랑스가 무너진 뒤 영국이 한동안 홀로 버텨 온 때였고, 미국은 아직 전쟁에 뛰어들기 전이었다. 그런데 이 말에는 뒷부분이 있다. 「크든 작든, 명예와 분별에 따른 신념이 아니라면」. 무조건 버티라는 말이 아니라, 지켜야 할 것을 끝까지 지키라는 말이었던 셈이다.",
    en: "In October 1941 Churchill went back to his old school, Harrow, and stood before the boys. Britain had held out for months after the fall of France, much of that time alone, and America was not yet in the war. And the sentence goes on: \"in nothing, great or small, large or petty — never give in except to convictions of honour and good sense.\" It was never a call to hold on to everything — only to what is worth holding.",
  },
  55: {
    ko: "에디슨이 세상을 떠난 이듬해인 1932년, 그의 연구소에서 일했던 로자노프가 『하퍼스』에 「연구소의 에디슨」이라는 회고를 실었다. 거기서 에디슨은 「사람들이 내 말이라며 되풀이하는 걸 들었겠지만」 하고 이 말을 꺼낸다. 이미 1901년부터 그의 말로 신문에 오르내리던 문장이다. 이 책의 다른 에디슨 명언 두 편을 함께 읽으면, 그 「땀」이 어떤 것이었는지 보인다.",
    en: "In 1932, the year after Edison died, Rosanoff, who had worked in his laboratory, published a memoir in *Harper's*, \"Edison in His Laboratory.\" There Edison brings this up himself: \"You may have heard people repeat what I have said.\" The line had already been in the papers as his since 1901. Read it with the two other Edison quotes in this book and you'll see what that \"perspiration\" looked like.",
  },
  56: {
    ko: "「권학」은 배움을 권하는 글이고, 『순자』의 첫 편이다. 「배움은 그쳐서는 안 된다」로 시작하고, 우리가 아는 「청출어람」도 바로 이 편에서 나왔다. 순자는 사람의 본성이 저절로 선하지 않다고 보았다. 그래서 배움이란 칼로 새기듯 꾸준히 사람을 다듬는 일이라고 말한다. 이 문장이 그 비유의 한가운데에 있다.",
    en: "\"An Exhortation to Learning\" is the first chapter of the *Xunzi*. It opens with \"Learning must never stop,\" and the saying that the student can surpass the teacher — blue dye bluer than the plant it comes from — also comes from here. Xunzi held that human nature is not good on its own, so learning is the steady work of carving and shaping a person. This sentence sits right in the middle of that image.",
  },
  57: {
    ko: "『제인 에어』 23장. 가정교사 제인은 고용주 로체스터가 다른 여자와 결혼하려 한다고 믿고, 아일랜드의 새 일자리로 떠나라는 말까지 듣는다. 그 자리에서 제인은 가난하고 신분이 낮아도 영혼은 대등하다고 맞선다. 1847년, 브론테는 이 소설을 「커러 벨」이라는 남자 이름으로 냈다. 여자가 쓴 책은 편견 어린 눈으로 읽히던 시절이었다.",
    en: "*Jane Eyre*, chapter 23. Jane, a governess, believes her employer Mr Rochester is about to marry another woman, and he even talks of sending her to a new post in Ireland. Here she stands up to him: poor and low-born she may be, but her soul is his equal. In 1847 Brontë published the novel under a man's name, \"Currer Bell\" — books by women were read through a haze of prejudice then.",
  },
  58: {
    ko: "디킨슨은 평생 1,800편 가까운 시를 썼지만, 살아서 발표한 것은 열 편 남짓이었다. 그녀가 세상을 떠난 뒤 동생이 서랍에서 시 묶음을 찾아냈고, 몇 해에 걸쳐 시집으로 나왔다. 「희망」이라는 제목도 편집자가 붙인 것이다. 이 시의 마지막 연은 이렇다. 「그래도 아무리 궁할 때에도, 그것은 내게 빵 부스러기 하나 청하지 않았다.」",
    en: "Dickinson wrote nearly 1,800 poems but published only about ten in her lifetime. After her death her sister found bundles of poems in her drawers, and they came out over several years as books. Even the title \"Hope\" was added by an editor. The poem ends: \"Yet, never, in extremity, / It asked a crumb of me.\"",
  },
  59: {
    ko: "광복 뒤 김구는 『백범일지』에 「나의 소원」이라는 글을 덧붙였다. 그 가운데 「내가 원하는 우리 나라」는 이렇게 시작한다. 「나는 우리나라가 세계에서 가장 아름다운 나라가 되기를 원한다. 가장 부강한 나라가 되기를 원하는 것은 아니다.」 그리고 이 문장이 이어진다. 독립운동에 평생을 바친 사람의 마지막 소원이 문화였다.",
    en: "After Korea's liberation, Kim Gu added an essay, \"My Wish,\" to his autobiography *Baekbeom Ilji*. Its section \"The Country I Want\" begins: \"I want our country to be the most beautiful country in the world. I do not wish it to be the richest and strongest.\" Then comes this sentence. A man who gave his whole life to the independence movement had, as his last wish, culture.",
  },
  60: {
    ko: "정약용은 전라도 강진에서 18년을 유배객으로 지냈다. 그 긴 시간 동안 책 수백 권을 썼고, 『목민심서』는 유배가 끝나던 해에 마쳤다. 고을을 다스리는 수령이 지켜야 할 일을 적은 책인데, 그 첫머리 「율기」는 남을 다스리기 전에 자기 몸가짐부터 다스리라는 장이다. 그 첫 조목에 이 짧은 두 마디가 있다.",
    en: "Jeong Yak-yong spent eighteen years in exile at Gangjin, in the far south-west of Korea. In that long time he wrote hundreds of volumes, and *Admonitions on Governing the People* was finished the year the exile ended. It is a book of duties for a county magistrate, and its first part, \"Yulgi,\" asks him to govern his own conduct before governing anyone else. These two short commands are in its very first article.",
  },
  61: {
    ko: "울스턴크래프트는 여자아이는 집에서만 가르치면 된다는 당시의 생각에 맞서 『여성의 권리 옹호』를 썼다. 그녀가 바란 것은 여성이 남성 위에 서는 것이 아니라, 교육을 받아 스스로를 다스리는 것이었다. 그녀는 딸을 낳고 며칠 만에 세상을 떠났는데, 그 딸이 『프랑켄슈타인』을 쓴 메리 셸리다. 이 책에 모녀가 함께 실려 있다.",
    en: "Wollstonecraft wrote *A Vindication of the Rights of Woman* against the view of her day that girls needed only to be taught at home. What she wanted was not for women to stand above men, but to be educated and so to govern themselves. She died days after giving birth to a daughter — Mary Shelley, who wrote *Frankenstein*. Mother and daughter are both in this book.",
  },
  63: {
    ko: "「유로」는 노자의 말을 이야기로 풀어 쓴 편이다. 「천하의 큰일은 반드시 작은 데서 시작된다」는 노자의 말을, 한비는 둑과 개미구멍으로 보여 준다. 바로 뒤에는 「백 척 높은 집도 굴뚝 틈의 불티 하나로 탄다」가 이어진다. 한비는 순자의 제자였으니, 이 책의 노자와 순자를 함께 떠올리며 읽으면 재미있다.",
    en: "\"Illustrations of Laozi\" retells Laozi's sayings as stories. Laozi says the great affairs of the world always begin in small things; Han Fei shows it with a dike and an ant hole. Right after comes: \"A hall a hundred feet high burns down from a spark through a crack in the chimney.\" Han Fei was a student of Xunzi, so it's fun to read him with this book's Laozi and Xunzi in mind.",
  },
  64: {
    ko: "굴원은 초나라의 신하였지만 모함을 받아 쫓겨났고, 끝내 멱라강에 몸을 던졌다고 전한다. 「이소」는 「근심을 만나다」라는 뜻으로, 그 억울함과 뜻을 370여 행에 쏟아 낸 긴 노래다. 이 구절은 시인이 하늘 끝까지 뜻 맞는 이를 찾아 길을 떠나는 대목에 나온다. 단오에 먹는 쫑즈가 그를 기리는 데서 왔다는 이야기도 전한다.",
    en: "Qu Yuan served the state of Chu but was slandered and banished, and he is said in the end to have drowned himself in the Miluo River. \"Li Sao\" means \"Encountering Sorrow\": a long song of some 370 lines pouring out his grief and his ideals. This line comes as the poet sets out to the ends of heaven in search of a kindred spirit. The rice dumplings eaten at the Dragon Boat Festival are said to have begun in his memory.",
  },
  65: {
    ko: "『작은 아씨들』 15장, 남북전쟁에 나간 아버지가 워싱턴에서 앓아누웠다는 전보가 온다. 간호하러 떠나는 마치 부인이 네 딸에게 남긴 말이 이것이다. 「희망을 품고, 바쁘게 지내렴. 무슨 일이 있어도 너희에게 아버지가 없어지는 일은 없다는 걸 기억하고.」 같은 장에서 조는 어머니의 여비를 보태려고 머리카락을 판다.",
    en: "*Little Women*, chapter 15: a telegram comes saying their father, away in the Civil War, lies ill in Washington. Leaving to nurse him, Mrs. March says this to her four daughters: \"Hope and keep busy, and whatever happens, remember that you never can be fatherless.\" In the same chapter Jo sells her hair to help pay for her mother's journey.",
  },
  66: {
    ko: "로마 황제 마르쿠스 아우렐리우스는 북쪽 국경에서 전쟁을 치르던 막사에서, 그리스어로 자기 자신에게 쓰는 글을 남겼다. 남에게 보이려고 쓴 글이 아니어서 원래 제목도 「자기 자신에게」다. 이 문장 뒤에는 「그러니 이런 생각들로 영혼을 물들여라」가 이어진다. 황제가 아니라, 날마다 마음을 다잡는 한 사람의 수첩이다.",
    en: "The Roman emperor Marcus Aurelius, fighting on the northern frontier, wrote in Greek notes addressed to himself in his tent. They were never meant for others; the original title is simply \"To Himself.\" After this line comes: \"Dye it, then, with a continuous series of such thoughts.\" Not an emperor's book so much as one man's notebook for steadying his mind each day.",
  },
  67: {
    ko: "에픽테토스는 노예로 태어나 다리를 절었고, 자유를 얻은 뒤 철학을 가르쳤다. 그는 한 줄도 쓰지 않았고, 제자 아리아노스가 스승의 말을 받아 적어 손에 쥐고 다닐 만한 작은 책으로 엮었다. 그게 「손안의 책」, 『엥케이리디온』이다. 이 문장 뒤로 그는 죽음을 예로 든다. 죽음이 끔찍한 게 아니라, 죽음이 끔찍하다는 생각이 끔찍한 것이라고.",
    en: "Epictetus was born a slave and walked with a limp; once free, he taught philosophy. He never wrote a line himself — his student Arrian took down his words and boiled them into a little book you could carry in your hand: the *Enchiridion*, \"handbook.\" After this line he takes death as his example: death is not terrible; the belief that death is terrible — that is what's terrible.",
  },
  68: {
    ko: "『우상의 황혼』은 니체가 정신을 놓기 직전인 1888년에 써서, 이듬해 1월에 나왔다. 「잠언과 화살」은 그 첫머리의 짧은 화살 같은 말 마흔네 개다. 사실 이 문장은 이렇게 이어진다. 「사람은 행복을 바라고 애쓰지 않는다. 영국인만 그런다.」 행복을 셈하던 영국 철학자들을 꼬집는 농담인데, 앞부분만 떼어 놓고 보아도 충분히 단단하다.",
    en: "Nietzsche wrote *Twilight of the Idols* in 1888, just before his mind gave way; it came out the next January. \"Maxims and Arrows\" opens the book with forty-four short, arrow-like sayings. This one actually continues: \"Man does not strive after happiness; only the Englishman does.\" It's a jab at the English philosophers who did sums with happiness — but the first half holds up perfectly well on its own.",
  },
  69: {
    ko: "에머슨은 목사직을 내려놓고 강연과 글로 살아가던 사람이다. 1841년에 나온 「자기 신뢰」는 남의 생각을 따라 사는 대신 자기 안의 목소리를 믿으라는 글이다. 「사람이 되려는 자는 순응하지 않아야 한다」, 「어리석은 일관성은 좁은 마음의 도깨비다」 같은 말이 다 이 글에 있다. 짧은 글이니 통째로 읽어 보길 권한다.",
    en: "Emerson gave up the ministry and lived by lecturing and writing. \"Self-Reliance,\" published in 1841, tells you to trust the voice within rather than live by other people's opinions. \"Whoso would be a man must be a nonconformist\" and \"A foolish consistency is the hobgoblin of little minds\" are both in it. It's a short essay — worth reading whole.",
  },
  70: {
    ko: "노예로 태어난 워싱턴은 열여섯 살에 햄프턴 학교에 가려고 수백 킬로미터를 걷고 얻어 타며 갔다. 돈이 떨어져 길바닥 판자 밑에서 잠을 자기도 했다. 겨우 도착하자 입학 시험 대신 교실 청소를 맡았고, 그는 세 번 쓸고 네 번 닦았다. 이 문장은 그 이야기가 담긴 3장에 있다. 그는 훗날 터스키기 학교를 세웠다.",
    en: "Born into slavery, Washington set out at sixteen for Hampton Institute, hundreds of miles away, on foot and by begged rides. When his money ran out he slept under a board sidewalk. On arrival, instead of an entrance exam he was told to clean a classroom — he swept it three times and dusted it four. This line is in chapter 3, which tells that story. He later founded the Tuskegee Institute.",
  },
  71: {
    ko: "사마천은 흉노에 항복한 장수 이릉을 변호하다가 한 무제의 노여움을 사 궁형을 받았다. 이 문장은 훗날 사형을 앞둔 친구 임안에게 보낸 답장에 있다. 그는 죽음 대신 치욕을 견딘 까닭을, 아버지가 남긴 역사서를 끝내기 위해서였다고 털어놓는다. 그렇게 끝낸 책이 『사기』다. 무거운 죽음이란 무엇인지, 그 책이 대답하고 있는 셈이다.",
    en: "Sima Qian defended the general Li Ling, who had surrendered to the Xiongnu, and Emperor Wu punished him with castration. These words come from a letter he later wrote to his friend Ren An, who was awaiting execution. He explains why he chose disgrace over death: to finish the history his father had left him. That history is the *Records of the Grand Historian* — his own answer to what makes a death weigh as much as a mountain.",
  },
  72: {
    ko: "헨리는 어려서 뼈 결핵을 앓아 한쪽 다리를 잘라 냈고, 남은 다리마저 잃을 뻔했다. 에든버러의 병원에서 외과의 리스터에게 치료받으며 오래 누워 지내던 시절에 이 시를 썼다. 「인빅터스」, 곧 「정복되지 않는 자」라는 제목은 나중에 붙었다. 그의 친구 스티븐슨은 『보물섬』의 외다리 선장 실버를 헨리에게서 떠올렸다고 했다.",
    en: "As a boy Henley had tuberculosis of the bone and lost one leg below the knee, and nearly lost the other. He wrote this poem during a long stay in an Edinburgh hospital, under the care of the surgeon Joseph Lister. The title \"Invictus\" — \"unconquered\" — was added later. His friend Robert Louis Stevenson said Henley was the inspiration for Long John Silver in *Treasure Island*.",
  },
  73: {
    ko: "『실낙원』 1권, 하늘에서 쫓겨나 지옥 불바다에 떨어진 사탄이 정신을 차리고 처음 하는 말 가운데 하나다. 조금 뒤에는 「하늘에서 섬기느니 지옥에서 다스리는 게 낫다」가 나온다. 그러니 이 말은 사탄의 오기이기도 하다. 밀턴은 앞을 보지 못하게 된 뒤 이 긴 서사시를 입으로 불러 받아 적게 했다.",
    en: "*Paradise Lost*, Book 1: Satan, cast out of Heaven into a lake of fire, comes to his senses, and this is among the first things he says. A little later comes \"Better to reign in Hell, than serve in Heav'n.\" So the line is also Satan's defiance. Milton, by then blind, composed this long epic by dictating it.",
  },
  74: {
    ko: "『자에는 자로』에서, 젊은 클라우디오는 엄한 법에 걸려 사형 선고를 받는다. 수녀가 되려던 누이 이사벨라는 자기가 나서 봐야 소용없을 거라며 망설인다. 그때 클라우디오의 친구 루치오가 그녀를 떠미는 말이 이것이다. 이사벨라는 결국 법을 쥔 앤젤로에게 찾아가고, 이야기는 거기서부터 뒤틀린다.",
    en: "In *Measure for Measure* young Claudio is condemned to death under a harsh law. His sister Isabella, about to become a nun, hesitates — what could her pleading do? These are the words with which Claudio's friend Lucio pushes her on. She goes to Angelo, the man who holds the law, and from there the story takes its twist.",
  },
  75: {
    ko: "『윈더미어 부인의 부채』 3막, 밤늦게 달링턴 경의 방에 신사들이 모여 잡담을 나눈다. 사랑에 빠졌다는 달링턴 경이 이 말을 하자, 친구는 「오늘 밤 꽤 낭만적이군」 하고 받아친다. 재치 있는 대사로 가득한 희극 속에서 문득 진심이 새어 나온 한 줄이다. 와일드의 말장난 사이에는 이런 문장이 숨어 있다.",
    en: "*Lady Windermere's Fan*, Act 3: late at night, gentlemen chatting in Lord Darlington's rooms. Darlington, who is in love, says this, and a friend comes back with \"You are very romantic to-night, Darlington.\" In a comedy full of quips it is a line where sincerity slips through. Lines like this are hidden among Wilde's wordplay.",
  },
  76: {
    ko: "밀은 『자유론』을 아내 해리엇 테일러와 함께 다듬었고, 그녀가 세상을 떠난 이듬해인 1859년에 펴내며 그녀에게 바쳤다. 1장은 사회가 개인에게 간섭해도 되는 선을 긋는 장이다. 이 문장도 끝까지 읽어야 한다. 「다른 사람의 자유를 빼앗거나 그것을 얻으려는 노력을 막지 않는 한에서.」",
    en: "Mill worked on *On Liberty* with his wife Harriet Taylor; she died in 1858, and he published it the next year with a dedication to her. Chapter 1 draws the line beyond which society may not interfere with the individual. This sentence, too, must be read to the end: \"so long as we do not attempt to deprive others of theirs, or impede their efforts to obtain it.\"",
  },
  77: {
    ko: "존슨은 어머니의 장례비를 마련하려고 『라셀라스』를 일주일 저녁 만에 써냈다고 한다. 13장에서 왕자 라셀라스는 「행복의 골짜기」를 빠져나가려 산에 굴을 파려 한다. 큰일 앞에서 망설이는 그에게 스승 임락이 하는 말이다. 「하루 세 시간씩 힘차게 걸으면, 7년이면 지구 한 바퀴를 도는 거리를 걷게 된다.」",
    en: "Johnson is said to have written *Rasselas* in the evenings of a single week to pay for his mother's funeral. In chapter 13 Prince Rasselas wants to tunnel through the mountain to escape the Happy Valley. When he hesitates before so great a task, his teacher Imlac says this — and adds: \"He that shall walk with vigour three hours a day will pass in seven years a space equal to the circumference of the globe.\"",
  },
  78: {
    ko: "「안드레아 델 사르토」는 르네상스 화가의 독백이다. 사람들은 그를 「흠 없는 화가」라 불렀지만, 그는 자기 그림에 영혼이 모자라다는 걸 안다. 해 질 녘, 아내 앞에서 라파엘로와 미켈란젤로를 떠올리며 하는 말이 이것이다. 손에 잡히는 데서 멈춘 사람의 아쉬움이라서, 이 말이 더 아프게 들린다.",
    en: "\"Andrea del Sarto\" is the monologue of a Renaissance painter. People called him \"the faultless painter,\" but he knows his work lacks soul. At dusk, before his wife, thinking of Raphael and Michelangelo, he says this. Coming from a man who stopped at what he could grasp, the line hurts all the more.",
  },
  79: {
    ko: "두보는 스물네 살 무렵 과거에 떨어지고 산동 지방을 떠돌다 태산을 바라보며 이 시를 썼다. 「망악」은 「큰 산을 바라보다」라는 뜻이다. 이 구절은 시의 마지막 두 줄이다. 두보는 평생 높은 자리에 오르지 못하고 떠돌았지만, 훗날 「시성」이라 불리며 시의 정상에 올랐다.",
    en: "Around the age of twenty-four, after failing the imperial examination, Du Fu was wandering in Shandong when he wrote this poem looking up at Mount Tai. \"Wang Yue\" means \"Gazing at the Great Mountain.\" These are its last two lines. Du Fu never rose to high office and spent his life on the road, yet later generations called him the Sage of Poetry — he reached the summit after all.",
  },
  80: {
    ko: "이 말은 이렇게 이어진다. 「그 좋은 점을 골라 따르고, 좋지 않은 점은 보고 내 것을 고친다.」 그러니 스승은 훌륭한 사람만이 아니다. 나보다 못해 보이는 사람에게서도 배울 것이 있다는 뜻이다. 『논어』에는 이처럼 앞부분만 유명하고 뒷부분은 잘 알려지지 않은 구절이 많다. 뒷부분까지 읽을 때 비로소 온전해진다.",
    en: "The saying goes on: \"I will select their good qualities and follow them, their bad qualities and avoid them.\" So a teacher is not only someone admirable; there is something to learn even from those who seem lesser than you. The *Analects* is full of lines whose first half is famous and second half forgotten. They only become whole when you read on.",
  },
  81: {
    ko: "윌리엄 제임스는 미국 심리학의 아버지로 불린다. 이 책은 교사들에게 한 강연을 묶은 것이고, 8장은 습관을 다룬다. 이 문장은 이렇게 이어진다. 「그러면 어느 맑은 아침, 자신이 그 세대에서 손꼽히는 실력자가 되어 있음을 알게 될 것이다.」 매일의 작은 습관이 쌓여 사람이 된다는 이야기다.",
    en: "William James is often called the father of American psychology. This book gathers talks he gave to teachers, and chapter 8 is about habit. The sentence goes on: \"He can with perfect certainty count on waking up some fine morning, to find himself one of the competent ones of his generation.\" A person, in other words, is built from small daily habits.",
  },
  82: {
    ko: "1776년 겨울, 워싱턴의 군대는 패배를 거듭하며 뉴저지를 가로질러 물러나고 있었다. 그 행렬 속에 있던 페인은 「지금은 사람의 영혼을 시험하는 때다」로 시작하는 이 글을 썼다. 워싱턴은 델라웨어강을 건너 트렌턴을 기습하기 전, 병사들에게 이 글을 읽어 주게 했다고 전한다.",
    en: "In the winter of 1776 Washington's army was retreating across New Jersey after defeat upon defeat. Paine, marching with it, wrote this pamphlet, which begins \"These are the times that try men's souls.\" Washington is said to have had it read to his soldiers before they crossed the Delaware to surprise Trenton.",
  },
  117: {
    ko: "프로스트는 영국에 머물던 시절, 친구인 시인 에드워드 토머스와 자주 숲길을 걸었다. 토머스는 어느 길을 고르든 늘 다른 길을 아쉬워했고, 프로스트는 그 친구를 슬쩍 놀리려고 이 시를 썼다고 했다. 시를 처음부터 읽어 보면 두 길이 「사실 거의 같았다」는 구절이 나온다. 마지막 줄이 조금 다르게 들릴 것이다.",
    en: "While living in England, Frost often walked the woods with his friend the poet Edward Thomas. Whichever path Thomas chose, he always regretted the other one, and Frost said he wrote this poem to tease him gently. Read it from the start and you'll find the two roads were \"really about the same.\" The last lines may sound a little different after that.",
  },
  138: {
    ko: "1910년 4월, 대통령에서 물러난 루스벨트는 유럽을 돌다 파리 소르본에서 연설했다. 이 문장은 「중요한 것은 비평하는 사람이 아니라, 경기장에 서서 먼지와 땀과 피로 얼굴이 범벅된 사람이다」로 시작하는 대목 안에 있다. 사람들은 이 대목을 「경기장의 사나이」라 부르며 지금도 즐겨 인용한다. 연설 전문은 꽤 길지만, 이 한 단락만은 꼭 읽어 보자.",
    en: "In April 1910, a year out of the presidency, Theodore Roosevelt was touring Europe and spoke at the Sorbonne in Paris. This sentence sits inside the passage that begins \"It is not the critic who counts\" and praises the man \"actually in the arena, whose face is marred by dust and sweat and blood.\" People call it \"The Man in the Arena\" and still quote it often. The whole speech is long, but this one paragraph is worth reading in full.",
  },
  147: {
    ko: "1783년 베를린의 한 월간지에 「계몽이란 무엇인가」라는 물음이 실렸고, 이듬해 칸트가 같은 잡지에 짧은 글로 답했다. 계몽이란 「스스로 초래한 미성년 상태에서 벗어나는 것」이고, 그 표어가 바로 이 말이다. 원문 「Sapere aude」는 호라티우스의 시구에서 빌린 것인데, 이 책에도 그 구절이 실려 있다. 「감히 지혜로워져라. 시작하라.」 언젠가 넘기다 만나게 될 것이다.",
    en: "In 1783 a Berlin monthly asked \"What is enlightenment?\", and the next year Kant answered in the same journal with a short essay. Enlightenment, he wrote, is \"man's emergence from his self-incurred immaturity,\" and this was its motto. The Latin, *Sapere aude*, comes from a line of Horace — a line that is also in this book: \"Dare to be wise; begin!\" You may come across it one day as you turn the pages.",
  },
  177: {
    ko: "『논어』는 공자가 세상을 떠난 뒤 제자들이 스승의 말을 모아 엮은 책이고, 이 문장은 그 맨 첫 줄이다. 바로 뒤에 「벗이 먼 곳에서 찾아오면 또한 즐겁지 아니한가」가 이어지니, 배움과 벗과 기쁨이 한자리에 놓인 셈이다. 주희는 익힐 습(習)을 어린 새가 날기 위해 날갯짓을 거듭하는 모습으로 풀었다. 한 번 읽고 끝내지 말고, 날갯짓하듯 다시 펼쳐 보자.",
    en: "The *Analects* were gathered by Confucius's students after his death, and this is their very first line. Right after it comes \"Is it not delightful to have friends coming from distant quarters?\" — learning, friendship and joy, set side by side. Zhu Xi read the character for practice, 習, as a young bird beating its wings again and again before it can fly. Don't read it once and stop; come back to it, the way a bird tries its wings.",
  },
};
