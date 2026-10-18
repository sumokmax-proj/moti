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
  51: {
    ko: "1883년 가을, 서른 살의 반 고흐는 네덜란드 북동부 드렌터의 황야에서 홀로 그림을 그리고 있었다. 화가가 되겠다고 마음먹은 지 3년, 그림은 한 점도 팔리지 않았고 동생 테오가 보내 주는 돈으로 살았다. 이 문장은 바로 그 테오에게 쓴 긴 편지 속에 있다. 반 고흐의 편지는 800통 넘게 남아 있는데, 그림만큼이나 좋은 읽을거리다.",
    en: "In the autumn of 1883 Van Gogh, thirty years old, was painting alone on the heaths of Drenthe in the north-east of the Netherlands. Three years after deciding to become an artist he had not sold a single picture, and he lived on money from his brother Theo. These words come from one of his long letters to Theo. More than eight hundred of his letters survive, and they are as rewarding to read as his paintings are to look at.",
  },
  54: {
    ko: "1941년 10월, 처칠은 모교 해로 스쿨을 찾아 학생들 앞에 섰다. 프랑스가 무너진 뒤 영국이 한동안 홀로 버텨 온 때였고, 미국은 아직 전쟁에 뛰어들기 전이었다. 그런데 이 말에는 뒷부분이 있다. 「크든 작든, 명예와 분별에 따른 신념이 아니라면」. 무조건 버티라는 말이 아니라, 지켜야 할 것을 끝까지 지키라는 말이었던 셈이다.",
    en: "In October 1941 Churchill went back to his old school, Harrow, and stood before the boys. Britain had held out for months after the fall of France, much of that time alone, and America was not yet in the war. And the sentence goes on: \"in nothing, great or small, large or petty — never give in except to convictions of honour and good sense.\" It was never a call to hold on to everything — only to what is worth holding.",
  },
  57: {
    ko: "『제인 에어』 23장. 가정교사 제인은 고용주 로체스터가 다른 여자와 결혼하려 한다고 믿고, 아일랜드의 새 일자리로 떠나라는 말까지 듣는다. 그 자리에서 제인은 가난하고 신분이 낮아도 영혼은 대등하다고 맞선다. 1847년, 브론테는 이 소설을 「커러 벨」이라는 남자 이름으로 냈다. 여자가 쓴 책은 편견 어린 눈으로 읽히던 시절이었다.",
    en: "*Jane Eyre*, chapter 23. Jane, a governess, believes her employer Mr Rochester is about to marry another woman, and he even talks of sending her to a new post in Ireland. Here she stands up to him: poor and low-born she may be, but her soul is his equal. In 1847 Brontë published the novel under a man's name, \"Currer Bell\" — books by women were read through a haze of prejudice then.",
  },
  71: {
    ko: "사마천은 흉노에 항복한 장수 이릉을 변호하다가 한 무제의 노여움을 사 궁형을 받았다. 이 문장은 훗날 사형을 앞둔 친구 임안에게 보낸 답장에 있다. 그는 죽음 대신 치욕을 견딘 까닭을, 아버지가 남긴 역사서를 끝내기 위해서였다고 털어놓는다. 그렇게 끝낸 책이 『사기』다. 무거운 죽음이란 무엇인지, 그 책이 대답하고 있는 셈이다.",
    en: "Sima Qian defended the general Li Ling, who had surrendered to the Xiongnu, and Emperor Wu punished him with castration. These words come from a letter he later wrote to his friend Ren An, who was awaiting execution. He explains why he chose disgrace over death: to finish the history his father had left him. That history is the *Records of the Grand Historian* — his own answer to what makes a death weigh as much as a mountain.",
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
