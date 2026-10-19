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
    ko: "삼군(三軍)은 큰 나라의 군대 전체, 필부(匹夫)는 이름 없는 보통 사람이다. 공자가 살던 춘추시대는 나라끼리 땅과 군대를 빼앗고 빼앗기던 때였다. 그런 세상에서도 수만 대군의 장수는 사로잡을 수 있지만, 한 사람이 품은 뜻만은 아무도 빼앗지 못한다는 것이다. 공자는 사연 없이 이 한 줄만 남겼고, 그래서 읽는 사람마다 자기 사연을 채워 넣게 된다.",
    en: "\"Three armies\" meant a great state's whole army; \"a common man\" is anyone without a name. Confucius lived in an age when states seized each other's land and armies. Even then, you could capture the commander of tens of thousands — but no one could take away what one person had set his heart on. Confucius left only the line, no story, so every reader ends up filling in a story of their own.",
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
  83: {
    ko: "『자조론』은 스마일스가 리즈의 젊은 노동자들에게 한 강연에서 시작된 책이다. 1859년에 나와 날개 돋친 듯 팔렸는데, 같은 해에 다윈의 『종의 기원』과, 이 책에도 실린 밀의 『자유론』이 나왔다. 이 문장 바로 뒤에는 「무엇이 안 되는지를 알아내면서, 무엇이 되는지를 알게 된다」가 이어진다. 실패를 지도처럼 쓰라는 이야기다.",
    en: "*Self-Help* grew out of talks Smiles gave to young working men in Leeds. It came out in 1859 and sold like wildfire — the same year as Darwin's *On the Origin of Species* and Mill's *On Liberty*, which is also in this book. Right after this line comes: \"We often discover what will do, by finding out what will not do.\" Use failure as a map, in other words.",
  },
  84: {
    ko: "「엘도라도」는 전설 속 황금의 도시다. 끝내 아무도 찾지 못한 곳이니, 스티븐슨은 그 이름을 빌려 「닿지 못하는 곳을 향해 가는 즐거움」에 대한 짧은 에세이를 썼다. 이 문장은 그 글의 마지막 문장이다. 그는 평생 폐병을 안고 살면서도 먼 바다와 섬으로 여행을 멈추지 않았고, 사모아에서 생을 마쳤다.",
    en: "El Dorado is the legendary city of gold that no one ever found. Stevenson borrowed the name for a short essay on the pleasure of heading toward a place you never reach, and this is its last sentence. He lived all his life with weak lungs, yet never stopped travelling to far seas and islands, and he died in Samoa.",
  },
  85: {
    ko: "테니슨은 가장 가까운 친구 아서 핼럼이 스물두 살에 갑자기 세상을 떠난 뒤 이 시를 썼다. 시 속의 율리시스는 긴 방랑 끝에 고향에 돌아왔지만, 늙은 몸으로 다시 바다로 나서려 한다. 이 구절은 그 시의 마지막 줄이다. 테니슨은 단테의 『신곡』에서 율리시스를 빌려 왔는데, 그 단테의 율리시스도 이 책에 실려 있다.",
    en: "Tennyson wrote this poem after his closest friend, Arthur Hallam, died suddenly at twenty-two. Ulysses has come home to Ithaca after long wandering, yet old as he is, he means to set out to sea again. This is the poem's last line. Tennyson took his Ulysses from Dante's *Divine Comedy* — and Dante's Ulysses is in this book too.",
  },
  86: {
    ko: "롱펠로는 첫 아내를 잃고 몇 해 뒤 이 시를 썼다. 부제는 「젊은이의 마음이 시편 작가에게 한 말」. 삶은 헛된 꿈이라는 탄식에 맞서, 지금 여기서 살아가자고 대답하는 시다. 이 구절은 마지막 연의 첫머리이고, 「애써 일하고, 기다리는 법을 배우자」로 시가 끝난다. 19세기 미국에서 가장 많이 외워진 시 가운데 하나였다.",
    en: "Longfellow wrote this poem a few years after losing his first wife. Its subtitle: \"What the Heart of the Young Man Said to the Psalmist.\" Against the lament that life is an empty dream, it answers: live here and now. These words open the last stanza, and the poem ends: \"Learn to labor and to wait.\" It was one of the most memorized poems in nineteenth-century America.",
  },
  87: {
    ko: "『아이네이스』 1권, 트로이에서 살아남은 아이네아스의 배들이 폭풍에 흩어지고 몇 척만 겨우 리비아 해안에 닿는다. 지치고 겁먹은 부하들 앞에서, 아이네아스는 속으로는 근심을 감춘 채 이 말로 그들을 북돋운다. 베르길리우스는 이 서사시를 11년 동안 쓰다 끝내지 못하고 세상을 떠났다. 같은 시의 5권 구절도 이 책에 있다.",
    en: "*Aeneid*, Book 1: the ships of Aeneas, survivors of Troy, are scattered by a storm, and only a few reach the Libyan shore. Before his exhausted, frightened men, hiding his own worry, Aeneas lifts their spirits with these words. Virgil worked on the epic for eleven years and died before finishing it. A line from Book 5 of the same poem is also in this book.",
  },
  88: {
    ko: "뜻밖에도 이 말은 사랑의 시에서 나왔다. 『사랑의 노래』 3권 11편에서, 시인은 자신을 속여 온 연인에게서 이제 마음을 떼어 내려 하며 스스로를 다그친다. 「참고 견뎌라.」 오비디우스는 훗날 황제의 노여움을 사 흑해 끝으로 쫓겨났는데, 그곳에서 쓴 편지시의 구절도 이 책에 실려 있다.",
    en: "Surprisingly, these words come from a love poem. In *Amores* 3.11 the poet is tearing his heart away from a mistress who has deceived him, and he spurs himself on: \"Be patient and endure.\" Later Ovid angered the emperor and was banished to the far shore of the Black Sea; a line from the verse letters he wrote there is in this book as well.",
  },
  89: {
    ko: "세네카가 친구 루킬리우스에게 보낸 열세 번째 편지는 쓸데없는 두려움에 대한 이야기다. 그는 아직 오지 않은 일, 어쩌면 끝내 오지 않을 일 때문에 미리 괴로워하지 말라고 말한다. 이 책에는 세네카의 편지 세 통에서 나온 문장이 실려 있다. 세 통 모두 친구에게 쓴 글이라, 철학이라기보다 다정한 충고처럼 읽힌다.",
    en: "Seneca's thirteenth letter to his friend Lucilius is about needless fear. Don't suffer in advance, he says, over what hasn't come yet — and may never come. This book has lines from three of Seneca's letters. All three were written to a friend, so they read less like philosophy than like kind advice.",
  },
  90: {
    ko: "『논어』에는 잘못에 대한 말이 여러 번 나온다. 학이편에는 「잘못하면 고치기를 꺼리지 마라」가 있고, 이 책에 실린 자공의 말은 군자의 잘못을 일식과 월식에 견준다. 모두가 보지만, 고치면 모두가 우러러본다고. 이 문장은 그 이야기들을 한 줄로 줄인 것 같다. 잘못 자체보다, 고치지 않는 것이 진짜 잘못이라는 것이다.",
    en: "The *Analects* returns to mistakes again and again. In Book 1: \"When you have faults, do not fear to abandon them.\" Zigong's saying in this book compares a gentleman's faults to eclipses of the sun and moon: everyone sees them, and when he corrects them, everyone looks up to him. This line seems to fold all of that into one: the real fault is not the mistake but leaving it uncorrected.",
  },
  91: {
    ko: "『중용』은 공자의 손자 자사가 지었다고 전한다. 20장은 노나라 임금이 나라 다스리는 법을 묻자 공자가 답하는 긴 장인데, 그 끝에 배우고 묻고 생각하고 가리고 행하라는 다섯 가지 공부가 나오고 이 문장이 이어진다. 그리고 이렇게 맺는다. 「이 길을 해낼 수 있다면, 어리석은 이도 반드시 밝아지고 약한 이도 반드시 강해진다.」",
    en: "The *Doctrine of the Mean* is traditionally attributed to Zisi, Confucius's grandson. Chapter 20 is Confucius's long answer to the Duke of Lu on how to govern. Near its end come five kinds of study — learn widely, inquire, reflect, discern, practise — and then this line. It closes: \"Let a man proceed in this way, and though dull, he will surely become intelligent; though weak, he will surely become strong.\"",
  },
  92: {
    ko: "포드의 첫 자동차 회사는 2년도 못 가 문을 닫았고, 두 번째 회사에서는 투자자들과 부딪혀 나왔다. 1903년에 세운 세 번째 회사가 포드 자동차다. 그리고 몇 해 뒤 모델 T가 나와 자동차를 보통 사람의 물건으로 바꿔 놓았다. 그러니 이 말은 실패를 두 번 겪은 사람이 자서전 첫머리에 적은 말이다.",
    en: "Ford's first car company folded in less than two years, and he left his second after clashing with its investors. The third, founded in 1903, was the Ford Motor Company — and a few years later the Model T turned the car into an ordinary person's possession. So this is something a man who had failed twice wrote at the start of his autobiography.",
  },
  93: {
    ko: "이 문장은 남들이 내 일을 막아설 때 어떻게 할 것인가를 다룬 대목에 있다. 마르쿠스는 마음이 그 방해를 오히려 일의 재료로 바꿀 수 있다고 말한다. 원문을 그대로 옮기면 「길을 막는 것이 길을 앞으로 나아가게 한다」에 가깝다. 전쟁과 역병 속에서 나라를 다스리던 사람이 막사에서 스스로에게 쓴 말이다.",
    en: "This line sits in a passage about what to do when others obstruct your work. Marcus says the mind can turn the obstruction itself into material for the work. Rendered closely, the Greek is nearer to \"what stands in the way moves the way forward.\" Words written in a tent, to himself, by a man governing an empire through war and plague.",
  },
  94: {
    ko: "『작은 아씨들』 44장. 막내 에이미와 로리가 결혼하고 집에 돌아온 날, 로리는 식구들 앞에서 결혼 생활을 날씨에 빗대 「결혼하고 나서는 늘 따뜻하고 화창하다」고 너스레를 떤다. 에이미는 「지금까지는 좋은 날씨예요. 얼마나 갈지는 모르지만」 하고 받으며 이 말을 한다. 폭풍은 살면서 닥칠 어려움이고, 배를 모는 건 자기 삶의 키를 스스로 잡는 일이다. 철없던 막내가 그렇게 자랐다.",
    en: "*Little Women*, chapter 44. The day Amy and Laurie come home married, Laurie teases the family by describing married life as weather — \"altogether salubrious and balmy.\" Amy answers: \"Lovely weather so far. I don't know how long it will last,\" and then says this. The storms are the troubles life will bring; sailing the ship is taking the helm of your own life. The flighty youngest sister has grown up.",
  },
  95: {
    ko: "『미들마치』 72장. 의사 리드게이트가 뇌물 추문에 휘말리자, 도러시아는 그의 결백을 밝혀 주고 싶어 한다. 주변에서는 남의 일에 끼어들지 말라고 말리지만, 저녁 식탁에서 그녀는 다시 그 이야기를 꺼낸다. 이 문장은 그때 나온다. 엘리엇은 이 긴 소설을 「평범한 사람들의 숨은 선함」에 대한 이야기로 맺는데, 그 맺음말도 이 책에 실려 있다.",
    en: "*Middlemarch*, chapter 72. When the doctor Lydgate is caught up in a bribery scandal, Dorothea wants to clear his name. Those around her tell her not to meddle, but at dinner she brings it up again, and this is what she says. Eliot ends her long novel with the hidden goodness of ordinary lives — and that ending is in this book too.",
  },
  96: {
    ko: "「원」은 우리 삶과 생각이 하나의 원에서 더 큰 원으로 끝없이 넓어진다는 에세이다. 어떤 원도 마지막이 아니고, 어제의 생각은 오늘의 생각에 둘러싸인다. 이 문장은 그 글의 끝머리에 있고, 바로 뒤에 「삶의 길은 놀랍다. 자신을 내맡길 때 열린다」가 이어진다. 이 책에는 같은 에머슨의 「자기 신뢰」 두 줄도 있다.",
    en: "\"Circles\" is an essay about how our lives and thoughts widen endlessly, from one circle to a larger one; no circle is the last, and yesterday's thought is surrounded by today's. This sentence comes near the end, followed by \"The way of life is wonderful; it is by abandonment.\" This book also has two lines from Emerson's \"Self-Reliance.\"",
  },
  97: {
    ko: "『도덕경』 33장은 짧은 대구 여덟 줄로 되어 있다. 첫 줄은 「남을 아는 이는 슬기롭고, 자기를 아는 이는 밝다」이고, 이 문장 바로 뒤에는 「만족할 줄 아는 이가 부유하다」가 이어진다. 바깥을 이기는 힘보다 안을 다스리는 힘을 더 높이 친다. 한 장이 한 숨에 읽힐 만큼 짧으니, 오늘 한 장만 펼쳐 보자.",
    en: "Chapter 33 of the *Tao Te Ching* is just eight short paired lines. The first: \"He who knows other men is discerning; he who knows himself is intelligent.\" Right after this line comes \"He who is content is rich.\" It rates the power to govern what is inside above the force to conquer what is outside. A chapter short enough to read in one breath — try opening just one today.",
  },
  98: {
    ko: "몽테뉴는 서른여덟에 공직에서 물러나 자기 성의 탑 꼭대기 서재로 들어갔다. 그곳에서 마음 가는 대로 써 내려간 글을 「에세」, 곧 「시도」라 불렀고, 에세이라는 말이 여기서 나왔다. 「고독에 대하여」에서 그는 가게 뒤편에 나만의 작은 방을 하나 마련해 두라고 권한다. 남에게 다 내어 주지 않은, 나에게만 속한 방 말이다.",
    en: "At thirty-eight Montaigne retired from public life to the library at the top of a tower on his estate. There he wrote whatever came to mind and called the pieces *essais* — \"attempts\" — which is where the word essay comes from. In \"Of Solitude\" he advises keeping a little back room behind the shop, all your own: a room you never hand over to anyone else.",
  },
  99: {
    ko: "헬렌 켈러의 『낙관론』은 두 부분으로 되어 있다. 1부는 자기 안의 낙관, 2부는 세상을 향한 낙관이고, 이 문장은 2부에 있다. 바로 뒤에서 그녀는 미국을 세운 사람들을 버티게 한 것도 희망이었다고 말한다. 같은 에세이에서 나온 「세상은 고통으로 가득하지만」도 이 책에 있으니, 두 문장을 나란히 읽어 보자.",
    en: "Helen Keller's *Optimism* has two parts — optimism within and optimism without — and this sentence comes in the second. Right after it she says it was hope, too, that steadied the people who founded the American commonwealths. \"Although the world is full of suffering\" comes from the same essay and is also in this book; read the two side by side.",
  },
  100: {
    ko: "1843년의 영국은 공장은 돌아가는데 일자리를 잃은 사람들이 굶주리던 때였다. 칼라일은 『과거와 현재』에서 12세기 한 수도원장의 이야기를 꺼내 당시의 영국과 견준다. 「노동」 장은 「일에는 오래가는 고귀함과 거룩함마저 있다」로 시작한다. 이 문장은 그 장의 한가운데에서, 일이 사람을 어떻게 세우는지 이야기하는 대목에 있다.",
    en: "England in 1843: the factories ran, while those who had lost their work went hungry. In *Past and Present* Carlyle sets the story of a twelfth-century abbot beside the England of his day. The chapter \"Labour\" opens: \"For there is a perennial nobleness, and even sacredness, in Work.\" This line sits in the middle of it, where he talks about how work makes a person.",
  },
  101: {
    ko: "앤은 브론테 세 자매 가운데 막내이고, 『아그네스 그레이』와 『와일드펠 홀의 소작인』을 썼다. 「좁은 길」은 그녀가 세상을 떠나기 한 해 전에 쓴 시로, 바르게 사는 좁은 길을 가자고 스스로를 다독인다. 앤은 이듬해 스물아홉에 세상을 떠났다. 언니들의 그늘에 가려 있었지만, 지금은 다시 읽히는 작가다.",
    en: "Anne was the youngest of the three Brontë sisters and wrote *Agnes Grey* and *The Tenant of Wildfell Hall*. \"The Narrow Way,\" written a year before her death, encourages herself to keep to the narrow path of a right life. She died the next year at twenty-nine. Long overshadowed by her sisters, she is read again today.",
  },
  102: {
    ko: "이 시는 디킨슨이 세상을 떠난 지 10년 뒤인 1896년, 세 번째 시집에 실려 처음 나왔다. 새벽이 언제 올지 모르니 모든 문을 열어 둔다는 두 줄 뒤에, 그녀는 이렇게 묻는다. 「새벽은 새처럼 깃털이 있을까, 바닷가처럼 물결이 칠까?」 이 책에 실린 그녀의 「희망은 깃털 달린 것」과 이어 읽으면 재미있다.",
    en: "This poem first appeared in 1896, ten years after Dickinson's death, in the third series of her poems. After the two lines about opening every door because she doesn't know when dawn will come, she asks: \"Or has it feathers like a bird, / Or billows like a shore?\" Read it beside her \"Hope is the thing with feathers,\" also in this book.",
  },
  103: {
    ko: "1899년, 루스벨트는 미국-스페인 전쟁에서 의용 기병대를 이끌고 돌아와 뉴욕 주지사가 되어 있었다. 시카고에서 한 이 연설에서 그는 편안함보다 분투하는 삶을 택하자고 말했다. 이 문장 바로 뒤에는 「이 삶에서 우리는 애쓰지 않고는 아무것도 얻지 못한다」가 이어진다. 2년 뒤 그는 대통령이 되었다.",
    en: "By 1899 Roosevelt had come back from the Spanish-American War, where he led a volunteer cavalry regiment, and was governor of New York. In this Chicago speech he urged choosing the strenuous life over ease. Right after this line: \"In this life we get nothing save by effort.\" Two years later he was president.",
  },
  104: {
    ko: "메리 셸리는 열여덟 살 여름, 스위스 제네바 호숫가에서 바이런과 친구들이 무서운 이야기 짓기 내기를 하던 중 『프랑켄슈타인』을 떠올렸다. 소설은 북극 탐험에 나선 월턴이 누나에게 보내는 편지로 시작하고, 이 문장은 그 첫 편지에 있다. 그녀의 어머니 울스턴크래프트의 문장도 이 책에 실려 있다.",
    en: "Mary Shelley was eighteen that summer on Lake Geneva when Byron and his friends held a contest to write ghost stories, and the idea of *Frankenstein* came to her. The novel opens with letters from Walton, bound for the Arctic, to his sister, and this line is in the first one. A sentence by her mother, Mary Wollstonecraft, is also in this book.",
  },
  105: {
    ko: "탕왕은 은나라를 세운 임금이다. 그는 날마다 얼굴을 씻는 세숫대야에 이 글을 새겨 두고, 씻을 때마다 마음도 새로 하자고 다짐했다고 전한다. 이 글은 『대학』에 인용되어 오늘까지 전한다. 『대학』은 백성을 새롭게 한다는 「신민」을 이야기하며 이 글을 꺼내는데, 그 시작이 임금 자신의 세수였다는 게 재미있다.",
    en: "King Tang founded the Shang dynasty. He is said to have had these words engraved on the basin he washed in each day, so that every washing would renew his mind as well. The words survive because *The Great Learning* quotes them, while speaking of renewing the people — and it's rather charming that the renewal starts with the king washing his own face.",
  },
  106: {
    ko: "맹자는 여러 나라 임금을 찾아다니며 뜻을 펴려 했지만, 원칙에 맞지 않는 자리와 선물은 끝내 받지 않았다. 이 짧은 한 줄은 그런 그의 삶과 겹쳐 읽힌다. 하지 않을 것을 먼저 정해 둔 사람이라야, 정말 해야 할 일을 해낼 수 있다는 뜻이다. 무엇이든 다 하려는 사람은 결국 아무것도 해내지 못한다. 오늘 하지 않을 일을 하나 정해 보는 것도 방법이다.",
    en: "Mencius travelled from court to court hoping to put his ideas into practice, yet he refused every post and gift that didn't fit his principles. This short line reads alongside that life. Only someone who has first decided what he will not do can accomplish what he truly must; whoever tries to do everything ends up doing nothing. Try it: decide on one thing you won't do today.",
  },
  107: {
    ko: "호라티우스가 로마에서 수사학을 공부하던 젊은 친구 롤리우스에게 보낸 시 편지다. 그는 시골에서 호메로스를 다시 읽었더니, 무엇이 바르고 무엇이 그른지를 철학자들보다 더 잘 가르쳐 주더라고 말한다. 그러니 미루지 말고 지금 지혜롭게 살기 시작하라고. 「감히 지혜로워져라」는 1,800년 뒤 칸트가 계몽의 표어로 빌려 썼다.",
    en: "A verse letter from Horace to his young friend Lollius, who was studying rhetoric in Rome. Horace says he has been rereading Homer in the country, and that Homer teaches right and wrong better than the philosophers do — so don't put it off; start living wisely now. Eighteen centuries later Kant borrowed \"Dare to be wise\" as the motto of the Enlightenment.",
  },
  108: {
    ko: "『얼간이 윌슨』의 주인공 데이비드 윌슨은 마을에 와서 한 농담 하나 때문에 「얼간이」라는 별명을 얻는다. 그는 남몰래 비꼬는 격언을 모은 「달력」을 쓰는데, 트웨인은 이 소설의 장마다 그 달력의 한 구절을 머리에 달았다. 이 말도 그중 하나다. 별명과 달리 윌슨은 끝내 지문으로 살인 사건을 풀어 마을을 놀라게 한다.",
    en: "David Wilson, the hero of *Pudd'nhead Wilson*, earns the nickname \"Pudd'nhead\" — fool — from a single joke he makes on arriving in town. In private he keeps a \"calendar\" of wry maxims, and Twain heads each chapter with one of them; this is one. Despite the nickname, Wilson ends up astonishing the town by solving a murder with fingerprints.",
  },
  109: {
    ko: "『줄리어스 시저』 2막 2장, 운명의 3월 15일 아침이다. 아내 칼푸르니아는 남편이 살해되는 꿈을 꾸고 오늘은 집에 있으라고 애원한다. 시저는 이 말로 두려움을 물리치고 원로원으로 간다. 그리고 그날 그곳에서 브루투스 일행의 칼에 쓰러진다. 용기에 대한 이 멋진 말이, 극 안에서는 비극의 문턱이다.",
    en: "*Julius Caesar*, Act 2, Scene 2: the morning of the Ides of March. His wife Calpurnia has dreamed of his murder and begs him to stay home. Caesar brushes off her fear with these words and goes to the Senate — where, that day, he falls to the daggers of Brutus and the others. A fine line about courage, and within the play, the threshold of tragedy.",
  },
  110: {
    ko: "『제인 에어』 6장, 고아원 학교 로우드에서 어린 제인은 억울한 일에 분노를 삭이지 못한다. 친구 헬렌 번스는 부당한 벌을 받고도 조용히 견디며, 제인에게 이 말을 건넨다. 헬렌은 얼마 뒤 폐병으로 세상을 떠난다. 브론테는 같은 학교에서 어린 나이에 세상을 떠난 큰언니 마리아를 떠올리며 헬렌을 그렸다고 한다.",
    en: "*Jane Eyre*, chapter 6: at Lowood, a charity school, young Jane can't get over her rage at injustice. Her friend Helen Burns, who bears unfair punishment quietly, says this to her. Helen soon dies of consumption. Brontë is said to have drawn Helen from her eldest sister Maria, who died young after attending a school like it.",
  },
  111: {
    ko: "세네카가 루킬리우스에게 보낸 백여 통의 편지 가운데 맨 첫 편지의 첫머리다. 「나 자신을 되찾아라」로 시작해, 시간이 어떻게 우리 손에서 빠져나가는지 이야기한다. 철학 편지를 시간 이야기로 시작했다는 것 자체가 그의 대답이다. 이 책에는 같은 편지들에서 나온 세네카의 문장이 두 개 더 있다.",
    en: "These words open the very first of Seneca's hundred-odd letters to Lucilius. It begins \"Claim yourself for yourself\" and goes on to how time slips out of our hands. That he started a set of philosophical letters with time is itself his answer. This book has two more sentences of Seneca's from the same letters.",
  },
  112: {
    ko: "『돈키호테』 21장. 지난밤 무시무시한 소리에 밤새 떨었는데 날이 밝고 보니 물레방아 소리였던 망신 뒤, 돈키호테는 저 멀리 황금처럼 반짝이는 것을 쓴 사람을 본다. 그는 「한 문이 닫히면 다른 문이 열린다」는 속담을 꺼내며, 어젯밤 놓친 모험 대신 더 나은 모험이 왔다고 기뻐한다. 그 반짝이는 것은 이발사의 놋대야였다.",
    en: "*Don Quixote*, chapter 21. After a night spent trembling at a terrible noise that turned out, at dawn, to be fulling mills, Don Quixote spots a rider wearing something that gleams like gold. Quoting the proverb \"where one door shuts, another opens,\" he rejoices that a better adventure has come in place of the one they missed. The gleaming thing was a barber's brass basin.",
  },
  113: {
    ko: "1758년 달력 머리말 속 장면이다. 경매장에서 사람들이 세금이 너무 무겁다고 투덜대자, 에이브러햄 영감이 「가난한 리처드」의 격언들을 엮어 게으름이야말로 가장 무거운 세금이라고 연설한다. 이 문장도 그 가운데 하나다. 그런데 이야기의 끝이 재미있다. 사람들은 연설에 고개를 끄덕이고는, 경매가 열리자마자 정반대로 마구 사들였다.",
    en: "A scene from the 1758 almanac's preface. At an auction, people grumble that taxes are too heavy, and Father Abraham answers with a speech woven from Poor Richard's sayings: idleness is the heaviest tax of all. This line is one of them. The ending is the fun part: the crowd nodded along — and the moment the auction opened, did exactly the opposite and bought extravagantly.",
  },
  114: {
    ko: "한용운은 승려이자 3·1 독립선언서에 이름을 올린 33인 가운데 한 사람이다. 1926년에 낸 시집 『님의 침묵』의 첫 시가 이 시이고, 「님은 갔습니다. 아아 사랑하는 나의 님은 갔습니다」로 시작한다. 그 「님」이 떠난 연인인지, 잃어버린 나라인지, 부처인지는 읽는 사람의 몫으로 남아 있다. 이별을 다시 만날 믿음으로 바꾸는 이 구절은 시의 끝자락에 놓여 있다.",
    en: "Han Yong-un was a Buddhist monk and one of the thirty-three signers of Korea's 1919 Declaration of Independence. This is the title poem of his 1926 collection *The Silence of Love*, and it begins \"My love has gone. Ah, my beloved has gone.\" Whether that love is a lost lover, a lost country or the Buddha is left to the reader. This line, turning parting into faith in meeting again, comes near the poem's end.",
  },
  115: {
    ko: "윤동주는 1941년 11월, 대학 졸업을 앞두고 손수 묶은 시집 원고의 맨 앞에 이 시를 붙였다. 시집은 끝내 그의 손으로 나오지 못했다. 일본 유학 중 독립운동 혐의로 붙잡힌 그는 해방을 반년 앞둔 1945년 2월, 스물일곱에 후쿠오카 감옥에서 세상을 떠났다. 친구가 간직한 원고로 1948년에야 시집이 나왔다. 「부끄럼」이라는 말이 그래서 더 무겁다.",
    en: "In November 1941, about to graduate, Yun Dong-ju put this poem at the front of a collection he had bound by hand. He never saw it published. Arrested in Japan on charges of independence activity, he died in a Fukuoka prison in February 1945, aged twenty-seven, half a year before liberation. A friend kept the manuscript, and the book came out in 1948. That is why the word \"shame\" weighs so much here.",
  },
  116: {
    ko: "블레이크는 시를 쓰고, 그 시를 손수 동판에 새겨 찍고, 한 장 한 장 물감을 칠해 책을 만들었다. 『천국과 지옥의 결혼』은 그렇게 만든 책이다. 「악마의 목소리」에서 악마는 몸과 영혼이 따로라는 생각, 에너지는 악이라는 생각이 틀렸다고 말하고, 이 문장으로 끝맺는다. 같은 책의 「지옥의 격언」도 기막히게 엉뚱하니 함께 읽어 보자.",
    en: "Blake wrote his poems, etched them himself on copper plates, printed them and colored every page by hand. *The Marriage of Heaven and Hell* was made that way. In \"The Voice of the Devil,\" the devil says it is an error to think body and soul are separate, or that energy is evil — and ends with this line. The same book's \"Proverbs of Hell\" are wonderfully strange; read them too.",
  },
  117: {
    ko: "프로스트는 영국에 머물던 시절, 친구인 시인 에드워드 토머스와 자주 숲길을 걸었다. 토머스는 어느 길을 고르든 늘 다른 길을 아쉬워했고, 프로스트는 그 친구를 슬쩍 놀리려고 이 시를 썼다고 했다. 시를 처음부터 읽어 보면 두 길이 「사실 거의 같았다」는 구절이 나온다. 마지막 줄이 조금 다르게 들릴 것이다.",
    en: "While living in England, Frost often walked the woods with his friend the poet Edward Thomas. Whichever path Thomas chose, he always regretted the other one, and Frost said he wrote this poem to tease him gently. Read it from the start and you'll find the two roads were \"really about the same.\" The last lines may sound a little different after that.",
  },
  118: {
    ko: "셸리는 1819년 가을, 피렌체 근처 숲에서 폭풍을 몰고 오는 서풍을 맞으며 이 시를 썼다고 적었다. 시인은 바람에게 낙엽처럼 자신을 실어 가 달라고, 자기 말을 온 세상에 흩뿌려 달라고 외친다. 이 물음은 그 시의 마지막 줄이다. 셸리는 3년 뒤 스물아홉에 바다에서 배가 뒤집혀 세상을 떠났다.",
    en: "Shelley noted that he wrote this poem in a wood near Florence in the autumn of 1819, as the west wind gathered a storm. The poet begs the wind to lift him like a dead leaf and scatter his words across the world. This question is the poem's last line. Three years later, at twenty-nine, Shelley drowned when his boat went down at sea.",
  },
  119: {
    ko: "『파우스트』는 하늘에서 시작한다. 욥기처럼, 악마 메피스토펠레스가 주님께 파우스트를 타락시킬 수 있다고 내기를 건다. 주님은 이 말로 답하고, 이렇게 덧붙인다. 「착한 사람은 어두운 충동 속에서도 바른 길을 잘 알고 있다.」 헤매는 것은 애쓰는 사람의 몫이라는 것이다. 이 책에는 같은 작품의 두 대목이 더 실려 있다.",
    en: "*Faust* begins in Heaven. As in the Book of Job, the devil Mephistopheles bets the Lord he can lead Faust astray. The Lord answers with this line, and adds: \"A good man, in his dark striving, is well aware of the right way.\" Going astray is the lot of anyone who strives. This book has two more passages from the same work.",
  },
  120: {
    ko: "『예언자』에서, 알무스타파는 낯선 도시에서 12년을 기다린 끝에 고향으로 가는 배를 맞는다. 떠나기 전 사람들이 사랑, 결혼, 아이, 일에 대해 묻고, 그는 하나씩 답한다. 「일에 대하여」에서 이 문장 뒤에는 이런 말이 이어진다. 사랑 없이 마지못해 일하느니, 차라리 일을 그만두고 성전 문 앞에 앉아 동냥을 하라고.",
    en: "In *The Prophet*, Almustafa has waited twelve years in a foreign city when at last the ship that will take him home arrives. Before he leaves, the people ask him about love, marriage, children, work, and he answers each. In \"On Work,\" this line is followed by: if you cannot work with love but only with distaste, better to leave your work and sit at the temple gate and take alms.",
  },
  121: {
    ko: "「자기 신뢰」의 맨 마지막 문장이다. 남의 생각과 관습에 기대지 말고 자기 안의 목소리를 믿으라는 긴 글이, 결국 평화도 바깥에서 오지 않는다는 말로 끝난다. 바로 이어서 「원칙의 승리 말고는 그 무엇도 평화를 가져다주지 못한다」가 붙어 있다. 이 책에는 같은 글의 첫머리 쪽 문장 「너 자신을 믿어라」도 실려 있다.",
    en: "This is the very last sentence of \"Self-Reliance.\" A long essay urging you to trust the voice within rather than lean on others' opinions and customs ends by saying that peace, too, does not come from outside. Right after it: \"Nothing can bring you peace but the triumph of principles.\" This book also has \"Trust thyself,\" from earlier in the same essay.",
  },
  122: {
    ko: "포프의 『인간론』은 사람이 우주에서 어떤 자리에 있는지를 운율 맞춘 2행 연구로 풀어낸 긴 철학시다. 이 줄 바로 뒤에는 「사람은 지금 복된 적이 없고, 언제나 복될 것이다」가 이어진다. 희망이 솟는 까닭은 아직 이루지 못했기 때문이라는 것이다. 포프는 키가 140센티미터도 안 됐고 평생 병에 시달렸지만, 당대 최고의 시인이었다.",
    en: "Pope's *An Essay on Man* is a long philosophical poem in rhymed couplets about man's place in the universe. The next line is \"Man never Is, but always To be blest\" — hope springs precisely because we haven't arrived. Pope stood under four and a half feet tall and was ill all his life, yet he was the leading poet of his age.",
  },
  123: {
    ko: "『작은 아씨들』 13장, 여름 오후 언덕 위에서 네 자매와 로리는 저마다의 「공중누각」, 곧 꿈을 이야기한다. 메그는 아름다운 집, 베스는 가족과 함께 지내는 것, 에이미는 로마에서 그림을 그리는 것. 그리고 조가 이 말을 하고는 덧붙인다. 「아마 책을 써서 부자가 되고 유명해질 거야.」 조처럼, 올컷 자신도 글을 써서 가족을 먹여 살렸다.",
    en: "*Little Women*, chapter 13: on a summer afternoon on a hill, the four sisters and Laurie each describe their \"castle in the air.\" Meg wants a lovely house, Beth to stay safe at home with Father and Mother, Amy to paint in Rome. Jo says this, then adds: \"I think I shall write books, and get rich and famous.\" Like Jo, Alcott herself wrote to support her family.",
  },
  124: {
    ko: "『아이네이스』 5권, 아이네아스는 세상을 떠난 아버지를 기리며 배 경주를 연다. 결승선을 앞두고 앞서가던 배를 다른 배가 맹렬히 쫓고, 모두가 함성을 지른다. 이 구절은 그 숨 막히는 순간에 나온다. 성공이 그들을 키우고, 할 수 있다고 믿으니 할 수 있다. 승부는 마지막에 바다의 신들에게 올린 기도로 갈린다. 경기 장면만 읽어도 손에 땀이 난다.",
    en: "*Aeneid*, Book 5: Aeneas holds a boat race in memory of his father. Near the finish one ship chases the leader furiously while everyone roars. This line comes at that breathless moment: success feeds them; they can because they think they can. In the end the race is decided by a prayer to the gods of the sea. The race alone is worth reading — it will have your palms sweating.",
  },
  125: {
    ko: "이 시는 레우코노에라는 여인에게 건네는 짧은 노래다. 그녀는 바빌론의 점성술로 앞날을 알아보려 한다. 시인은 묻지 말라고, 신들이 정한 끝은 알 수 없다고 말한다. 「포도주를 거르고, 먼 희망은 짧게 잘라라. 우리가 말하는 사이에도 시샘하는 시간은 달아났다.」 그리고 이 말로 맺는다. 그 유명한 「카르페 디엠」이 여기서 나왔다.",
    en: "A short song addressed to a woman, Leuconoe, who wants to know the future from Babylonian astrology. Don't ask, says the poet; the end the gods have set can't be known. \"Strain the wine, and cut long hope short. Even as we speak, envious time has fled.\" Then he closes with this. The famous *carpe diem* comes from here.",
  },
  126: {
    ko: "오비디우스는 황제의 노여움을 사 흑해 끝 토미스로 쫓겨났고, 이 편지는 그곳에서 맞은 여섯 번째 여름에 친구에게 썼다. 그는 물방울은 바위를 뚫고, 반지는 닳고, 쟁기 날도 무뎌진다고 늘어놓는다. 그런데 하고 싶은 말은 그다음이다. 시간이 모든 것을 갉아먹는데, 나만은 닳지 않고 버티고 있다고. 끈기의 말로 알려진 구절이 사실은 유배자의 한탄이었다.",
    en: "Ovid had angered the emperor and been banished to Tomis on the Black Sea; he wrote this letter to a friend in his sixth summer there. Dripping water hollows stone, he says; a ring wears thin; even a plough's share is worn down. But his real point comes next: time devours everything — except him, who is not worn away. A line known as praise of persistence was really an exile's lament.",
  },
  127: {
    ko: "『신곡』 지옥편 26곡. 단테는 불꽃에 싸여 고통받는 율리시스를 만나고, 율리시스는 자기의 마지막 항해를 들려준다. 늙은 동료들과 세상의 끝이라던 헤라클레스의 기둥에 이르렀을 때, 그는 이 말로 그들을 설득해 그 너머 미지의 바다로 나아간다. 배는 끝내 가라앉는다. 테니슨의 「율리시스」가 바로 이 장면에서 태어났고, 그 시도 이 책에 있다.",
    en: "*Inferno*, Canto 26: Dante meets Ulysses, wrapped in flame, who tells of his last voyage. Reaching with his aging companions the Pillars of Hercules, the supposed end of the world, he persuades them with these words to sail on into the unknown sea. The ship goes down. Tennyson's \"Ulysses\" was born from this scene — and that poem is in this book too.",
  },
  128: {
    ko: "라퐁텐은 이솝 우화를 시로 다시 지었는데, 이 이야기는 교훈부터 먼저 말하고 시작한다. 거북이 토끼에게 내기를 걸자, 토끼는 비웃으며 풀을 뜯고, 바람 냄새를 맡고, 딴청을 부리다 뒤늦게 달린다. 결승선에는 이미 거북이 와 있다. 라퐁텐의 첫 우화집은 여섯 살 왕세자에게 바쳐졌다. 아이에게 읽히려던 책인데, 어른이 읽어야 할 책이 되었다.",
    en: "La Fontaine retold Aesop's fables in verse, and this one starts with its moral. The tortoise challenges the hare; the hare scoffs, nibbles grass, sniffs which way the wind blows, dawdles — and runs too late. The tortoise is already at the line. La Fontaine dedicated his first book of fables to the six-year-old Dauphin. Written for a child, it became a book for grown-ups.",
  },
  129: {
    ko: "윤동주가 연희전문학교에 들어간 해인 1938년에 쓴 시다. 「내를 건너서 숲으로 / 고개를 넘어서 마을로」 날마다 같은 길을 걷는다. 그런데 시인은 그 길을 어제도 가고 오늘도 갈 「새로운 길」이라고 부른다. 같은 길도 오늘의 마음으로 걸으면 새 길이 된다. 「서시」보다 3년 앞서 쓴, 젊고 밝은 시다.",
    en: "Yun Dong-ju wrote this in 1938, the year he entered Yonhi College in Seoul. \"Across the stream to the woods, over the pass to the village\" — the same road every day. Yet he calls it \"my road, a new road,\" walked yesterday and to be walked today. The same road, walked with today's heart, becomes new. A young, bright poem, written three years before his \"Prologue.\"",
  },
  130: {
    ko: "이백은 당나라 황제의 부름을 받고 장안에 갔지만, 궁정에서 뜻을 펴지 못하고 쫓겨나듯 떠났다. 「행로난」은 그 무렵의 노래다. 만 냥짜리 술과 안주를 앞에 두고도 넘어가지 않아, 칼을 뽑아 사방을 둘러봐도 마음이 아득하다. 「갈 길이 어렵구나, 갈림길은 많은데 내 길은 어디 있나」 하고 탄식한 끝에, 시는 이 두 줄로 몸을 일으킨다.",
    en: "Li Bai was summoned to the court at Chang'an but could not make his way there and left, more or less driven out. \"The Hard Road\" belongs to that time. Before wine and dishes worth ten thousand coins he cannot eat; he draws his sword and looks around, lost. \"The road is hard! So many forks — where is mine?\" After that cry, the poem lifts itself with these two lines.",
  },
  131: {
    ko: "『오만과 편견』 31장, 엘리자베스는 로징스 저택에서 피아노를 치고 있다. 다아시가 일부러 다가와 가까이 서서 듣자, 그녀는 웃으며 쏘아붙인다. 「저를 겁주려고 그렇게 위엄 있게 오셨나요?」 그리고 이 말을 덧붙인다. 아직 서로를 오해하고 있는 두 사람이 은근히 끌리는 장면이다. 이 고집 덕분에, 엘리자베스는 지금도 가장 사랑받는 주인공 가운데 하나다.",
    en: "*Pride and Prejudice*, chapter 31: Elizabeth is playing the piano at Rosings. When Darcy deliberately comes and stands close to listen, she teases him: \"You mean to frighten me, Mr. Darcy, by coming in all this state to hear me.\" Then she adds this. Two people who still misjudge each other, quietly drawn together. Thanks to this stubbornness, Elizabeth remains one of the best-loved heroines ever written.",
  },
  132: {
    ko: "1860년 2월, 일리노이의 시골 변호사 링컨은 뉴욕의 쿠퍼 유니언에서 노예제 확대에 맞서는 연설을 했다. 이 문장은 그 연설의 마지막 문장이다. 동부 사람들 앞에서 처음 선 이 연설로 그는 단숨에 전국적인 인물이 되었고, 몇 달 뒤 대통령 후보가 되었다. 그날 찍은 사진과 이 연설이 자기를 대통령으로 만들었다고 그는 훗날 말했다고 전한다.",
    en: "In February 1860 Lincoln, a country lawyer from Illinois, spoke at Cooper Union in New York against the spread of slavery. This is the speech's last sentence. His first appearance before an Eastern audience made him a national figure overnight, and within months he was the party's candidate for president. He is said to have credited that day's photograph and this speech with making him president.",
  },
  133: {
    ko: "마르쿠스는 열두 살에 철학자의 옷을 입고 다닐 만큼 철학을 사랑했고, 황제가 된 뒤에도 공부를 놓지 않았다. 그런 그가 『명상록』 10권에서 스스로를 다그친다. 좋은 사람이 어때야 하는지 그만 논하고, 그런 사람이 되라고. 평생 철학을 읽고 논한 사람이 내린 결론이라 무게가 있다. 철학을 읽기만 하는 우리에게도 하는 말 같다.",
    en: "Marcus loved philosophy so much that at twelve he took to wearing a philosopher's rough cloak, and even as emperor he never stopped studying. Yet here, in Book 10, he scolds himself: stop arguing about what a good man should be, and be one. Coming from a man who read and argued philosophy all his life, the conclusion carries weight. It sounds meant for those of us who only read philosophy, too.",
  },
  134: {
    ko: "『미들마치』 51장. 윌 래디슬로는 사랑하는 도러시아와 결코 맺어질 수 없다고 생각한다. 그녀의 죽은 남편이 유언장에, 그녀가 윌과 결혼하면 재산을 잃게 해 두었기 때문이다. 「우리는 영영 갈라졌어」라고 중얼거리는 그 뒤에 작가가 이 문장을 덧붙인다. 그러니 이 말은 절망 속에 아직 희망이 살아 있다는 작가의 귀띔이다.",
    en: "*Middlemarch*, chapter 51. Will Ladislaw believes he can never be with Dorothea, because her late husband's will strips her of her fortune if she marries Will. \"We are forever divided,\" he says — and after that the author adds this sentence. It is Eliot's quiet hint that hope is still alive inside his despair.",
  },
  135: {
    ko: "『월든』 2장은 소로가 왜 숲으로 들어갔는지를 말하는 장이다. 「나는 삶을 의도한 대로 살고 싶어서 숲으로 갔다」는 그 유명한 문장도 여기 있다. 바로 앞에서 그는 「우리 삶은 자잘한 일로 조각조각 흩어진다」고 말한다. 그리고 이 짧은 말을 두 번 되풀이한다. 할 일을 백 가지에서 두세 가지로, 끼니를 세 번에서 한 번으로 줄이라고.",
    en: "Chapter 2 of *Walden* tells why Thoreau went to the woods; the famous \"I went to the woods because I wished to live deliberately\" is here. Just before this he writes, \"Our life is frittered away by detail.\" Then he says these two words, twice: keep your affairs to two or three, not a hundred; eat one meal a day instead of three, if need be.",
  },
  136: {
    ko: "『햄릿』 1막 3장, 대신 폴로니어스가 파리로 떠나는 아들에게 이것저것 당부를 늘어놓는다. 「돈은 빌려주지도 빌리지도 마라」 같은 잔소리 끝에 나오는 말이 이것이다. 이어서 「그러면 밤이 낮을 따르듯, 누구에게도 거짓되지 않으리라」고 말한다. 그런데 정작 폴로니어스는 극 내내 엿듣고 꾸미는 인물이다. 그래서 이 말이 더 묘하게 들린다.",
    en: "*Hamlet*, Act 1, Scene 3: Polonius showers his son, leaving for Paris, with advice. After nagging like \"Neither a borrower nor a lender be\" comes this — and then: \"And it must follow, as the night the day, / Thou canst not then be false to any man.\" Yet Polonius himself spends the play eavesdropping and scheming, which makes the line ring rather strangely.",
  },
  137: {
    ko: "1900년대 초, 에디슨은 새 축전지를 만들려고 실험을 거듭하고 있었다. 동료 맬러리가 연구소에 가 보니, 그는 이미 9천 번 넘게 실험하고도 쓸 만한 결과를 하나도 얻지 못한 상태였다. 안쓰러운 마음에 「그 많은 일을 하고도 결과가 없다니 안타깝다」고 하자, 에디슨은 웃으며 이렇게 받아쳤다. 그 축전지는 몇 해 뒤 결국 완성되었다.",
    en: "In the early 1900s Edison was experimenting endlessly to build a new storage battery. When his colleague Mallory visited the lab, Edison had done over nine thousand experiments without a single promising result. Sympathizing, Mallory said it was a shame to have done so much work without getting any results — and Edison, smiling, shot back with this. The battery was finished a few years later.",
  },
  138: {
    ko: "1910년 4월, 대통령에서 물러난 루스벨트는 유럽을 돌다 파리 소르본에서 연설했다. 이 문장은 「중요한 것은 비평하는 사람이 아니라, 경기장에 서서 먼지와 땀과 피로 얼굴이 범벅된 사람이다」로 시작하는 대목 안에 있다. 사람들은 이 대목을 「경기장의 사나이」라 부르며 지금도 즐겨 인용한다. 연설 전문은 꽤 길지만, 이 한 단락만은 꼭 읽어 보자.",
    en: "In April 1910, a year out of the presidency, Theodore Roosevelt was touring Europe and spoke at the Sorbonne in Paris. This sentence sits inside the passage that begins \"It is not the critic who counts\" and praises the man \"actually in the arena, whose face is marred by dust and sweat and blood.\" People call it \"The Man in the Arena\" and still quote it often. The whole speech is long, but this one paragraph is worth reading in full.",
  },
  139: {
    ko: "1818년, 키츠의 긴 시 『엔디미온』은 잡지 비평가들에게 혹평을 받았다. 이 문장은 그 뒤 출판인 헤시에게 보낸 편지에 있다. 그는 칭찬도 비난도 잠깐일 뿐, 자기 작품을 가장 엄하게 비판하는 사람은 자기 자신이라고 말한다. 그때 그는 스물두 살이었다. 2년 남짓 뒤, 키츠는 스물다섯에 폐병으로 세상을 떠났지만, 끝내 가장 위대한 시인들 사이에 들었다.",
    en: "In 1818 Keats's long poem *Endymion* was savaged by the magazine critics. These words come from a letter he then wrote to his publisher Hessey: praise or blame lasts only a moment; his harshest critic is himself. He was twenty-two. Little more than two years later he died of consumption at twenty-five — and did, in the end, take his place among the greatest.",
  },
  140: {
    ko: "제목은 성 아우구스티누스의 말에서 왔다. 우리 잘못들을 발밑에 밟고 오르면, 그것으로 사다리를 만들 수 있다는 것이다. 롱펠로는 이 생각을 시로 옮겨, 큰 사람들이 높은 곳에 오른 것은 단번이 아니라 남들 잠든 밤에 한 칸씩 오른 덕이라고 말한다. 이 책에는 롱펠로의 시와 소설 구절이 두 편 더 있다.",
    en: "The title comes from a saying of St. Augustine: if we tread our vices underfoot, we can make a ladder of them. Longfellow turns the thought into verse — the great reached their heights not in a single flight, but rung by rung while others slept. This book has two more passages by Longfellow, from a poem and from a novel.",
  },
  141: {
    ko: "『도덕경』 41장은 뒤집힌 말들의 목록이다. 「큰 네모는 모서리가 없고, 큰 그릇은 늦게 이루어지며, 큰 소리는 들리지 않고, 큰 형상은 모양이 없다.」 그런데 1970년대 중국 마왕퇴 무덤에서 나온 비단 사본에는 이 구절이 「큰 그릇은 이루어짐이 없다」로 적혀 있다. 늦게 이루어지는 걸까, 끝내 완성되지 않는 걸까. 둘 다 곱씹어 볼 만하다.",
    en: "Chapter 41 of the *Tao Te Ching* is a list of reversals: \"The great square has no corners; the great vessel is late in the making; the great sound is hard to hear; the great image has no shape.\" But a silk manuscript found in a tomb at Mawangdui in the 1970s writes this line as \"the great vessel is never completed.\" Late in the making, or never finished at all? Both are worth chewing on.",
  },
  142: {
    ko: "맹자는 이 말 앞에 「무엇을 하는 것은 우물을 파는 것과 같다」고 먼저 말한다. 한 길은 사람 키쯤이니, 아홉 길이면 꽤 깊다. 그만큼 팠어도 물이 나오기 전에 멈추면, 처음부터 안 판 것과 다르지 않다는 것이다. 짧지만 아픈 말이다. 이 책에는 『맹자』의 다른 두 구절도 실려 있다.",
    en: "Before this line Mencius says, \"To do something is like digging a well.\" A ren was about a man's height, so nine is deep indeed. Dig that far, stop before you reach water, and it's no different from never having dug. Short, and it stings. This book has two other passages from the *Mencius*.",
  },
  143: {
    ko: "『월든』의 맺음말에서 소로는 가난을 탓하지 말라고 말한다. 이 문장 바로 뒤에는 「구빈원에서도 즐겁고 가슴 설레는 빛나는 시간을 가질 수 있을 것이다」가 이어지고, 「지는 해는 부자의 집 창에도 구빈원의 창에도 똑같이 밝게 비친다」고 덧붙인다. 2년 넘게 오두막에서 살아 본 사람이 하는 말이라 허투루 들리지 않는다.",
    en: "In the Conclusion of *Walden*, Thoreau tells us not to blame poverty. Right after this sentence comes: \"You may perhaps have some pleasant, thrilling, glorious hours, even in a poor-house,\" and \"the setting sun is reflected from the windows of the alms-house as brightly as from the rich man's abode.\" From someone who lived over two years in a cabin, it doesn't ring hollow.",
  },
  144: {
    ko: "디킨슨이 세상을 떠난 뒤 1890년에 처음 나온 시집에서, 「삶」이라는 묶음의 여섯 번째 시다. 이 시는 「한 사람의 아픔을 덜어 주거나 / 지친 울새 한 마리를 둥지로 돌려보낼 수 있다면」으로 이어진다. 거창한 업적이 아니라 아주 작은 도움 하나로도 삶은 헛되지 않다는 것이다. 평생 집 밖을 잘 나서지 않은 시인의 말이라 더 다정하다.",
    en: "This is the sixth poem in the section \"Life\" of the first book of Dickinson's poems, published in 1890 after her death. It goes on: \"If I can ease one life the aching, / Or cool one pain, / Or help one fainting robin / Unto his nest again.\" Not grand achievements — even one small kindness keeps a life from being in vain. From a poet who rarely left her house, it is all the tenderer.",
  },
  145: {
    ko: "『대사들』의 주인공 스트레더는 쉰다섯 살이다. 그는 약혼녀의 부탁으로 파리에 간 그 집 아들을 데려오러 왔다가, 오히려 파리에 마음을 빼앗긴다. 한 조각가의 정원 파티에서 그는 젊은 친구에게 이 말을 쏟아 낸다. 자기는 너무 늦었지만 너는 그러지 말라고. 헨리 제임스는 실제로 한 작가가 파리의 정원에서 젊은이에게 한 말에서 이 소설을 떠올렸다고 밝혔다.",
    en: "Strether, the hero of *The Ambassadors*, is fifty-five. Sent to Paris by his fiancée to bring her son home, he finds himself captivated by Paris instead. At a sculptor's garden party he pours this out to a young friend: it's too late for me, but don't you make the mistake. James said the novel grew from a remark an older writer actually made to a young man in a Paris garden.",
  },
  146: {
    ko: "812년, 한유는 나라의 최고 학교에서 학생들을 가르치고 있었다. 이 글은 그가 학생들에게 이 말로 훈계하자, 한 학생이 웃으며 대드는 장면으로 이어진다. 「선생님은 그렇게 부지런하신데, 왜 벼슬길에서는 늘 밀려나고 살림은 가난하십니까?」 한유는 그 물음에 차분히 답한다. 자기 처지를 웃음으로 버무린 이 글은 당나라 문장의 명편으로 꼽힌다.",
    en: "In 812 Han Yu was teaching at the empire's highest academy. This piece has him lecture the students with these words — and then a student laughs and talks back: \"Sir, if you're so diligent, why are you always passed over in office, and so poor?\" Han Yu answers him calmly. Wrapping his own lot in humor, the essay is counted among the masterpieces of Tang prose.",
  },
  147: {
    ko: "1783년 베를린의 한 월간지에 「계몽이란 무엇인가」라는 물음이 실렸고, 이듬해 칸트가 같은 잡지에 짧은 글로 답했다. 계몽이란 「스스로 초래한 미성년 상태에서 벗어나는 것」이고, 그 표어가 바로 이 말이다. 원문 「Sapere aude」는 호라티우스의 시구에서 빌린 것인데, 이 책에도 그 구절이 실려 있다. 「감히 지혜로워져라. 시작하라.」 언젠가 넘기다 만나게 될 것이다.",
    en: "In 1783 a Berlin monthly asked \"What is enlightenment?\", and the next year Kant answered in the same journal with a short essay. Enlightenment, he wrote, is \"man's emergence from his self-incurred immaturity,\" and this was its motto. The Latin, *Sapere aude*, comes from a line of Horace — a line that is also in this book: \"Dare to be wise; begin!\" You may come across it one day as you turn the pages.",
  },
  148: {
    ko: "1643년 영국 의회는 모든 책을 출판 전에 허가받게 하는 법을 만들었다. 밀턴은 이에 맞서 『아레오파기티카』를 썼고, 허가 없이 그대로 펴냈다. 그는 좋은 책을 죽이는 것은 사람을 죽이는 것과 거의 같다고 말한다. 이 문장은 그 글의 절정이다. 표현의 자유를 말할 때 지금도 가장 먼저 꺼내 드는 글 가운데 하나다.",
    en: "In 1643 the English Parliament required every book to be licensed before printing. Milton answered with *Areopagitica* — and published it without a license. To kill a good book, he says, is almost to kill a man. This sentence is the essay's climax, and it is still among the first texts quoted whenever freedom of expression is at stake.",
  },
  149: {
    ko: "『파우스트』 2부의 마지막. 늙고 눈먼 파우스트는 바다를 막아 새 땅을 일구는 꿈을 꾸고 있다. 사실 그 소리는 일꾼들이 아니라 그의 무덤을 파는 소리지만, 그는 자유로운 땅에서 자유로운 사람들이 사는 모습을 그리며 이 말을 하고 숨을 거둔다. 괴테는 이 결말을 세상을 떠나기 몇 달 전에 마쳤다. 60년 걸린 작품의 마지막 말이다.",
    en: "The end of *Faust*, Part Two. Old and blind, Faust dreams of holding back the sea to make new land. The digging he hears is not workers but men digging his grave — yet, picturing free people on free land, he speaks these words and dies. Goethe finished this ending months before his own death. The last word of a work sixty years in the making.",
  },
  150: {
    ko: "열여섯 살의 더글러스는 노예를 길들이기로 이름난 코비에게 보내져 매질을 견디며 살았다. 이 문장은 그가 마침내 코비에게 맞서 싸운 날의 이야기를 시작하는 말이다. 그 싸움 뒤로 코비는 다시는 그를 때리지 못했고, 그는 그날을 자유를 향한 전환점으로 꼽았다. 이 책은 그가 탈출한 지 7년 뒤 실명을 걸고 펴낸 것이다.",
    en: "At sixteen Douglass was sent to Covey, a notorious \"slave-breaker,\" and endured his whippings. This sentence opens the story of the day he finally fought back. After that fight Covey never laid a hand on him again, and Douglass called that day the turning point of his life. He published this book seven years after his escape, under his real name — at great risk.",
  },
  151: {
    ko: "안데르센의 짧은 동화다. 나비 한 마리가 신붓감을 찾아 꽃들 사이를 오가는데, 너무 오래 고르다 그만 홀로 늙어 버린다. 늦가을 비바람을 피해 난롯불 따뜻한 방 안에 들어오니 살 수는 있었지만, 그는 이렇게 외치며 창으로 날아간다. 그리고 사람 눈에 띄어 핀에 꽂힌 채 진열 상자에 들어간다. 웃기면서도 쓸쓸한, 안데르센다운 이야기다.",
    en: "A short tale by Andersen. A butterfly flits among the flowers looking for a bride, but takes so long choosing that he grows old alone. In late autumn he comes indoors out of the wind and rain, where a stove makes it summer-warm; he can live there — but cries this and flies at the window. He is spotted, admired, and pinned in a curiosity box. Funny and lonely at once, pure Andersen.",
  },
  152: {
    ko: "랍비 벤 에즈라는 12세기 스페인의 실제 유대인 학자다. 브라우닝은 그의 입을 빌려, 늙음은 쇠퇴가 아니라 삶이 완성되는 때라고 노래한다. 이 구절 바로 뒤에 「삶의 마지막, 처음은 그것을 위해 지어졌다」가 이어진다. 젊음은 늙음을 위한 준비였다는 것이다. 이 책에는 같은 시인의 「안드레아 델 사르토」도 있다.",
    en: "Rabbi Ben Ezra was a real twelfth-century Jewish scholar from Spain. Through his voice Browning sings that age is not decline but life's fulfilment. Right after these words: \"The last of life, for which the first was made.\" Youth, that is, was preparation for age. This book also has Browning's \"Andrea del Sarto.\"",
  },
  153: {
    ko: "1895년 애틀랜타 박람회에서 워싱턴은 흑인으로서는 드물게 백인과 흑인이 섞인 청중 앞에 섰다. 이 연설로 그는 하루아침에 전국적인 지도자가 되었지만, 차별을 너무 순순히 받아들였다는 비판도 받았다. 대표적인 비판자가 훗날의 사상가 W. E. B. 듀보이스다. 두 사람의 논쟁까지 찾아 읽으면 이 문장이 훨씬 입체적으로 보인다.",
    en: "At the 1895 Atlanta Exposition, Washington stood — rarely for a Black man then — before an audience of both Black and white listeners. The speech made him a national leader overnight, but he was also criticized for accepting segregation too readily; his best-known critic was W. E. B. Du Bois. Read their debate too, and this sentence becomes far more three-dimensional.",
  },
  154: {
    ko: "증자는 공자의 제자이고, 공자의 손자 자사를 가르쳤다고 전한다. 이 말은 이렇게 이어진다. 「어짊을 자기 짐으로 삼았으니 무겁지 않은가. 죽은 뒤에야 내려놓으니 멀지 않은가.」 그러니 넓고 굳센 뜻이 필요하다는 것이다. 「임중도원」, 짐은 무겁고 길은 멀다는 말이 바로 여기서 나왔다.",
    en: "Zengzi was a disciple of Confucius and is said to have taught Confucius's grandson Zisi. The saying goes on: \"Perfect virtue is the burden he takes upon himself — is it not heavy? Only with death does his course stop — is it not long?\" Hence the need for breadth and strength of mind. The Chinese idiom \"the burden is heavy and the road is long\" comes from here.",
  },
  155: {
    ko: "에이브러햄 영감이 시간에 대해 이야기하는 대목이다. 「삶을 사랑하는가? 그렇다면 시간을 낭비하지 마라. 삶은 시간으로 지어졌으니까.」 그리고 이 격언이 이어진다. 머리말 끝에서 프랭클린은 이 격언들 가운데 자기 지혜는 십 분의 일도 안 되고, 온 시대와 나라의 지혜를 주워 모은 것이라고 털어놓는다.",
    en: "This is from Father Abraham's passage on time: \"Dost thou love life, then do not squander time, for that is the stuff life is made of.\" Then comes this proverb. At the end of the preface Franklin admits that not a tenth part of this wisdom was his own — rather \"the gleanings I had made of the sense of all ages and nations.\"",
  },
  156: {
    ko: "타고르는 1913년 아시아 사람으로는 처음 노벨 문학상을 받았다. 『길 잃은 새』는 1916년 일본을 여행하며 하이쿠의 짧은 시에 끌려 쓴 짧은 시 300여 편을 모은 책이다. 이 구절은 그 여섯 번째다. 한두 줄짜리 시들이라 아무 쪽이나 펼쳐 읽기 좋다. 이 앱처럼.",
    en: "In 1913 Tagore became the first Asian to win the Nobel Prize in Literature. *Stray Birds* collects some three hundred short poems he wrote in 1916 while travelling in Japan, drawn to the brevity of haiku. This is the sixth. One- and two-line poems, made for opening at any page — like this app.",
  },
  157: {
    ko: "1933년 3월, 대공황이 가장 깊던 때다. 은행들이 줄줄이 문을 닫고 노동자 넷 중 하나가 일자리를 잃었다. 취임식 연단에 선 루스벨트는 이 말로 연설을 시작했다. 이어서 두려움을 「후퇴를 전진으로 바꾸려는 노력을 마비시키는, 이름 없고 이유 없는 공포」라고 불렀다. 그는 이틀 뒤 모든 은행의 문을 잠시 닫게 하고 은행 정리에 들어갔다.",
    en: "March 1933, the depth of the Great Depression: banks were failing one after another and a quarter of workers had lost their jobs. Taking the oath, Roosevelt opened his speech with this, and went on to call that fear a \"nameless, unreasoning, unjustified terror which paralyzes needed efforts to convert retreat into advance.\" Two days later he closed all the banks to set them in order.",
  },
  158: {
    ko: "「경험에 대하여」는 『에세』의 맨 마지막 글이다. 몽테뉴는 말년에 신장 결석으로 지독한 통증을 겪었고, 이 글에서 그 아픔을 숨김없이 이야기한다. 이 문장도 아플까 봐 미리 겁내는 것이 아픔보다 더 괴롭다는 이야기 속에 있다. 철학자의 말이라기보다, 아파 본 사람의 말이다.",
    en: "\"Of Experience\" is the very last of the *Essays*. In his later years Montaigne suffered agonizing kidney stones, and here he writes about the pain openly. This sentence sits in that discussion: dreading pain hurts more than the pain itself. Less a philosopher's maxim than the words of someone who has hurt.",
  },
  159: {
    ko: "『라셀라스』 6장, 행복의 골짜기에 사는 한 장인이 하늘을 나는 날개를 만들겠다고 나선다. 왕자가 이런저런 걱정을 늘어놓자, 장인은 이 말로 받아친다. 1년 뒤 마침내 그는 날개를 달고 벼랑에서 뛰어내렸다. 그리고 곧장 호수에 빠졌는데, 날개가 물에 떠서 목숨은 건졌다. 그래도 그는 시도했다.",
    en: "*Rasselas*, chapter 6: an artist in the Happy Valley sets out to build wings for flying. When the prince raises one doubt after another, the artist replies with this. A year later he finally straps on the wings and leaps from a cliff — and drops straight into the lake, where the wings, useless in the air, keep him afloat. Still, he tried.",
  },
  160: {
    ko: "『하이페리온』의 주인공 플레밍은 사랑을 거절당한 상처를 안고 유럽을 떠돈다. 어느 날 더위를 피해 들어간 작은 예배당에서, 그는 무너지듯 무릎을 꿇고 울다가 벽의 대리석 묘비에 새겨진 이 글을 읽는다. 무덤 속 이름 모를 이가 입을 열어, 어떤 친구도 해 주지 못한 위로를 건네는 것 같았다. 플레밍은 롱펠로 자신이다. 그는 자신을 거절했던 그 사람과 몇 해 뒤 끝내 결혼했다.",
    en: "Flemming, the hero of *Hyperion*, wanders Europe nursing the wound of rejected love. One hot day he steps into a little chapel, falls to his knees weeping, and reads this inscription on a marble tablet in the wall. It seemed as if the unknown occupant of that grave had spoken the comfort no friend had yet given him. Flemming is Longfellow himself — who, years later, did marry the woman who had turned him down.",
  },
  161: {
    ko: "이 책에 실린 「자기 일을 찾은 사람은 복되다」와 같은 「노동」 장에 있는 말이다. 칼라일은 이 말을 몸으로 겪었다. 1835년, 그가 쓴 『프랑스 혁명사』 1권 원고를 친구 밀이 빌려 갔는데, 그 집 하녀가 휴지인 줄 알고 불쏘시개로 태워 버렸다. 칼라일은 처음부터 다시 썼다. 그 친구가 바로 이 책에 실린 『자유론』의 존 스튜어트 밀이다.",
    en: "From the same chapter, \"Labour,\" as \"Blessed is he who has found his work,\" also in this book. Carlyle lived this line. In 1835 his friend borrowed the manuscript of the first volume of *The French Revolution*, and a maid in that house took it for waste paper and burned it as kindling. Carlyle wrote it all again. The friend was John Stuart Mill, whose *On Liberty* is in this book.",
  },
  162: {
    ko: "『자조론』이 성공만 떠받든다는 비판이 나오자, 스마일스는 머리말에서 이렇게 답했다. 가장 훌륭한 사람들도 좋은 일에서 실패할 수 있고, 그들도 실패하려고 애쓴 것은 아니라고. 그리고 이 문장을 덧붙였다. 무엇을 이루었느냐보다 무엇을 위해 애썼느냐가 먼저라는 것이다. 이 책에는 같은 책의 「실패에서 더 많은 지혜를 배운다」도 있다.",
    en: "When critics said *Self-Help* worshipped success, Smiles answered in his preface: even the best people may fail in the best of causes, and they didn't try to fail either. Then he added this. What you strove for comes before what you achieved. This book also has \"We learn wisdom from failure much more than from success,\" from the same work.",
  },
  163: {
    ko: "675년, 스물여섯 살 무렵의 왕발은 지금의 베트남 북부에서 벼슬하던 아버지를 뵈러 가던 길에 남창의 등왕각 잔치에 들렀다가, 그 자리에서 이 글을 단숨에 지었다고 전한다. 「지는 노을은 외로운 따오기와 나란히 날고, 가을 물은 긴 하늘과 한 빛이다」라는 구절로 유명하다. 이 문장 바로 앞에는 「늙을수록 더욱 씩씩해야 한다」가 있다. 왕발은 이듬해 아버지를 뵙고 돌아오다 바다에 빠져 세상을 떠났다.",
    en: "In 675 Wang Bo, about twenty-six, was on his way to visit his father, an official in what is now northern Vietnam, when he stopped at a banquet at the Pavilion of Prince Teng in Nanchang and is said to have written this preface then and there. It is famous for \"the sunset clouds fly with a lone wild duck; the autumn water shares one color with the endless sky.\" Just before this line: \"Old, one should grow all the bolder.\" Returning from his father the next year, he drowned.",
  },
  164: {
    ko: "헬렌 켈러가 아홉 살 때 시인이자 의사인 올리버 웬델 홈스에게 보낸 편지다. 그녀는 맹아학교에서 「꼬마 제이키」라는 슬픈 이야기를 읽고 있었다. 제이키는 가난하고 앞을 못 보는 아이였다. 어릴 땐 모두가 늘 행복한 줄 알았는데, 이제는 고통을 안다고 쓰고, 이 문장을 덧붙인다. 아홉 살 아이의 편지라는 게 믿기지 않는다.",
    en: "A letter nine-year-old Helen Keller wrote to Oliver Wendell Holmes, poet and physician. At the school for the blind she was reading a sad story, \"Little Jakey,\" about a poor blind boy. When she was small, she writes, she thought everybody was always happy; now she knows about pain — and she adds this. Hard to believe it's from a nine-year-old.",
  },
  165: {
    ko: "「장진주」는 「술을 권하노라」라는 뜻의 노래다. 「그대는 보지 못했는가, 황하의 물이 하늘에서 내려와 바다로 달려가 다시 오지 않는 것을」로 시작한다. 이백은 덧없는 인생을 한탄하다가 이 구절에서 자신을 일으켜 세운다. 바로 뒤에 「천금은 다 써 버려도 다시 돌아온다」가 이어진다. 소리 내어 읽어야 제맛인 시다.",
    en: "\"Bring In the Wine\" is a drinking song. It opens: \"Do you not see the waters of the Yellow River coming down from heaven, rushing to the sea, never to return?\" Lamenting how fleeting life is, Li Bai pulls himself up with this line — followed by \"Spend a thousand pieces of gold, and they'll come back again.\" A poem that only truly works read aloud.",
  },
  166: {
    ko: "제갈량이 세상을 떠나기 얼마 전, 여덟 살 아들 첨에게 남긴 짧은 편지다. 86자밖에 안 되는 이 글은 「군자는 고요함으로 몸을 닦고, 검소함으로 덕을 기른다」로 시작한다. 천하를 놓고 싸우던 재상이 아들에게 남긴 말이 고요함과 담박함이었다. 그 아들 첨은 훗날 나라를 지키다 전사했다.",
    en: "A short letter Zhuge Liang left his eight-year-old son Zhan not long before his death. Just eighty-six characters, it begins: \"A gentleman cultivates himself through stillness and nourishes his virtue through frugality.\" The chancellor who fought over an empire left his son stillness and simplicity. That son later died in battle defending their state.",
  },
  167: {
    ko: "기원전 43년, 로마는 카이사르 암살 뒤 내전으로 치닫고 있었다. 키케로는 안토니우스를 탄핵하는 연설을 잇달아 했는데, 열두 번째 연설에서 그는 안토니우스에게 평화 사절을 보내자는 안에 처음엔 자기도 찬성했다고 털어놓는다. 그리고 이 말로 생각을 바꾼다. 그해 겨울, 키케로는 안토니우스가 보낸 병사들의 손에 목숨을 잃었다.",
    en: "In 43 BC Rome was sliding into civil war after Caesar's murder. Cicero gave speech after speech against Mark Antony; in the twelfth he admits that he himself had at first supported sending a peace embassy to Antony, and with these words changes his mind. That December, Cicero was killed by soldiers Antony sent after him.",
  },
  168: {
    ko: "자공은 공자의 제자 가운데 말을 가장 잘하고 장사로 큰 부자가 된 사람이다. 이 말은 그가 스승을 이어 군자를 설명한 대목이다. 해와 달이 가려지면 모든 사람이 보지만, 다시 밝아지면 모두가 우러러본다. 잘못을 숨기지 말라는 말이다. 이 책의 공자 「잘못하고도 고치지 않는 것」과 나란히 읽어 보자.",
    en: "Zigong was the most eloquent of Confucius's disciples, and a merchant who grew very rich. Here he follows his teacher in describing the gentleman: when the sun or moon is eclipsed, everyone sees it; when it shines again, everyone looks up. Don't hide your mistakes. Read it beside Confucius's \"To have faults and not to reform them,\" also in this book.",
  },
  169: {
    ko: "『중용』 20장, 공자가 노나라 임금에게 나라 다스리는 법을 답하는 대목이다. 이 문장 바로 뒤에 「말을 미리 정하면 막히지 않고, 일을 미리 정하면 곤란하지 않고, 행동을 미리 정하면 탈이 없다」가 이어진다. 같은 장의 「남이 한 번에 해내면 나는 백 번을 한다」도 이 책에 있다.",
    en: "*Doctrine of the Mean*, chapter 20, from Confucius's answer to the Duke of Lu on governing. Right after this line: \"If words are settled beforehand, there will be no stumbling; if affairs, no difficulty; if conduct, no remorse.\" \"If another man succeeds by one effort, he will use a hundred,\" from the same chapter, is also in this book.",
  },
  170: {
    ko: "디킨스가 마지막으로 완성한 소설 『우리 서로의 친구』의 한 장면이다. 부잣집에서 자란 철없는 아가씨 벨라가 「저는 세상에 쓸모없는 사람이에요」라고 하자, 비서 로크스미스가 이렇게 받는다. 벨라는 울먹이며 「그런데 저는 누구의 짐도 덜어 주지 않는걸요」 하고 대꾸한다. 그 로크스미스에게는 큰 비밀이 있다. 그 비밀이 이 긴 소설을 끌고 간다.",
    en: "A scene from *Our Mutual Friend*, the last novel Dickens completed. When Bella, a spoiled young woman brought up in a rich house, says she is useless enough in this world, the secretary Rokesmith answers with this. Half-crying, Bella protests that she doesn't lighten anyone's burden. Rokesmith hides a great secret — and that secret drives this long novel.",
  },
  171: {
    ko: "『미들마치』의 맨 마지막 문단이다. 엘리엇은 이 긴 소설의 주인공 도러시아가 세상에 이름을 남기지 못했다고 말하며, 이렇게 맺는다. 세상이 나쁘지 않은 것은 「숨은 삶을 성실히 살다가, 아무도 찾지 않는 무덤에 잠든 사람들」 덕분이라고. 소설의 마지막 문장이 이토록 따뜻한 경우는 드물다.",
    en: "This is the closing paragraph of *Middlemarch*. Eliot says her heroine Dorothea left no name in the world, and ends: things are not so ill with you and me as they might have been, thanks to those \"who lived faithfully a hidden life, and rest in unvisited tombs.\" Rarely is a novel's last sentence so warm.",
  },
  172: {
    ko: "『순자』의 첫 편 「권학」의 첫 문장들이다. 「청출어람」, 제자가 스승보다 나을 수 있다는 그 말이 바로 여기서 나왔다. 순자는 사람이 타고난 그대로는 선하지 않다고 보았다. 그러니 배움은 쪽빛을 더 푸르게, 물을 더 차게 만드는 일이다. 같은 편의 「새기기를 그치지 않으면 쇠와 돌도 새긴다」도 이 책에 있다.",
    en: "These are the opening sentences of \"An Exhortation to Learning,\" the first chapter of the *Xunzi* — the source of the saying that the student can be bluer than the indigo he came from. Xunzi held that human nature, left as it is, is not good; learning is what makes the blue bluer and the water colder. \"Carve without giving up, and metal and stone can be engraved,\" from the same chapter, is also in this book.",
  },
  173: {
    ko: "자하는 공자의 제자 가운데 문학과 학문으로 이름난 사람이다. 공자가 세상을 떠난 뒤 위나라에서 제자들을 길렀고, 아들을 잃고 너무 울어 눈이 멀었다는 이야기도 전한다. 날마다 새것을 알고 달마다 아는 것을 잃지 않는다는 이 말은, 『논어』 첫 구절 「배우고 때때로 익히면」과 같은 이야기다. 이 앱의 모토와 나란히 놓아 보자.",
    en: "Zixia was the disciple of Confucius best known for letters and learning; after Confucius's death he taught in the state of Wei, and it is said he wept so much when he lost his son that he went blind. Knowing something new each day and not forgetting what you know each month is the same idea as the *Analects*' first line, \"Is it not pleasant to learn with a constant perseverance and application?\" Set it beside this app's motto.",
  },
  174: {
    ko: "키츠가 미국으로 건너간 동생 부부에게 석 달에 걸쳐 쓴 긴 편지의 한 대목이다. 같은 편지에 세상을 「영혼을 만드는 골짜기」라 부른 유명한 구절도 있다. 키츠는 이 편지를 쓰던 무렵, 동생 톰을 폐병으로 잃은 지 얼마 되지 않았다. 직접 겪어야 진짜가 된다는 말이 그래서 가볍지 않다.",
    en: "From a long letter Keats wrote over three months to his brother and sister-in-law, who had emigrated to America. The same letter calls the world \"the vale of Soul-making.\" When he wrote it, he had not long lost his brother Tom to consumption. So the idea that nothing becomes real until it is lived is anything but light.",
  },
  175: {
    ko: "『의상 철학』은 독일의 괴짜 철학자 토이펠스드뢰크라는 가짜 인물의 책을 칼라일이 소개하는 척 쓴 기묘한 소설이다. 주인공은 「영원한 부정」의 절망을 지나 「영원한 긍정」에 이르고, 이 장에서 이 말을 한다. 칼라일 자신의 젊은 날의 위기가 그대로 녹아 있다. 해야 할 일 하나를 하면 다음 길이 보인다는 것이다.",
    en: "*Sartor Resartus* is a strange novel in which Carlyle pretends to introduce the book of an eccentric German philosopher, Teufelsdröckh, who never existed. Its hero passes through the despair of the \"Everlasting No\" to the \"Everlasting Yea,\" and in that chapter says this. Carlyle's own youthful crisis is in it. Do the one duty in front of you, and the next path appears.",
  },
  176: {
    ko: "『라셀라스』 35장, 공주 네카야는 가장 아끼던 시녀 페쿠아를 아랍 도적들에게 빼앗기고 깊은 슬픔에 빠져 있다. 스승 임락은 시간은 흘러가고 흐르는 동안 슬픔도 작아진다며, 이 말로 공주를 위로한다. 그리고 몇 장 뒤, 페쿠아는 무사히 돌아온다. 슬픔에 갇혀 있지 말라는 존슨의 말은, 그 자신이 우울과 싸우며 얻은 것이다.",
    en: "*Rasselas*, chapter 35: Princess Nekayah is sunk in grief after Arab raiders carry off her beloved companion Pekuah. Her teacher Imlac tells her that time flows on and sorrow shrinks as it flows, and comforts her with these words. A few chapters later Pekuah comes back safe. Johnson's advice not to let grief stagnate came from his own lifelong fight with melancholy.",
  },
  177: {
    ko: "『논어』는 공자가 세상을 떠난 뒤 제자들이 스승의 말을 모아 엮은 책이고, 이 문장은 그 맨 첫 줄이다. 바로 뒤에 「벗이 먼 곳에서 찾아오면 또한 즐겁지 아니한가」가 이어지니, 배움과 벗과 기쁨이 한자리에 놓인 셈이다. 주희는 익힐 습(習)을 어린 새가 날기 위해 날갯짓을 거듭하는 모습으로 풀었다. 한 번 읽고 끝내지 말고, 날갯짓하듯 다시 펼쳐 보자.",
    en: "The *Analects* were gathered by Confucius's students after his death, and this is their very first line. Right after it comes \"Is it not delightful to have friends coming from distant quarters?\" — learning, friendship and joy, set side by side. Zhu Xi read the character for practice, 習, as a young bird beating its wings again and again before it can fly. Don't read it once and stop; come back to it, the way a bird tries its wings.",
  },
};
