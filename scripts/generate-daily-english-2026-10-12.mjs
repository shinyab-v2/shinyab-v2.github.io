import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const point = (title, explanation, examples) => ({ title, explanation, examples });
const idiom = (term, meaning, example) => ({ term, meaning, example });
const vocab = (term, partOfSpeech, meaning, context) => ({ term, partOfSpeech, meaning, context });
const quiz = (question, choices, answer, explanation) => ({ question, choices, answer, explanation });
const rolePlay = (scenario, learnerRole, coachRole, goal) => ({ scenario, learnerRole, coachRole, goal });

function makeLesson(level, date, grammarTopic, grammar, idioms, readingTitle, paragraphs, translations, vocabulary, quizzes, discussionQuestions, role) {
  return {
    date,
    title: `${level === "student" ? "Student Daily English" : "Daily English"} — ${date}`,
    grammarTopic,
    grammar,
    idioms,
    readingTitle,
    paragraphs,
    translations,
    vocabulary,
    quiz: quizzes,
    discussionQuestions,
    rolePlay: role
  };
}

const adult = [
  makeLesson(
    "adult", "2026-10-12", "Verb Patterns That Change Meaning: -ing or to-infinitive",
    {
      title: "동명사와 to부정사: 형태가 바뀌면 의미도 달라지는 동사",
      summary: "remember, forget, stop, try, regret처럼 목적어로 -ing와 to부정사를 모두 받을 수 있는 동사는 뒤의 형태에 따라 시간 관계와 의미가 달라집니다. -ing는 보통 이미 일어난 일이나 실제 경험을 돌아보고, to부정사는 앞으로 해야 할 행동이나 목적에 초점을 둡니다. 문맥 속 시간 순서를 먼저 판단하면 선택이 훨씬 정확해집니다.",
      points: [
        point("remember / forget + -ing", "과거에 실제로 한 행동의 기억을 말할 때 -ing를 씁니다. forget + -ing는 보통 부정문이나 질문에서 과거 행동에 대한 기억이 없다는 뜻으로 자연스럽습니다.", [
          "I remember meeting her at the conference. — 그 회의에서 그녀를 만났던 것을 기억합니다.",
          "Do you remember locking the side door? — 옆문을 잠갔던 것이 기억나나요?",
          "She will never forget seeing the northern lights. — 그녀는 오로라를 봤던 일을 절대 잊지 못할 것입니다.",
          "I don't remember approving that expense. — 그 비용을 승인했던 기억이 없습니다.",
          "He recalled sending the attachment before lunch. — 그는 점심 전에 첨부 파일을 보냈던 것을 떠올렸습니다."
        ]),
        point("remember / forget + to-infinitive", "해야 할 일을 기억하거나 잊는 것은 to부정사로 나타냅니다. 기억이 먼저이고 행동이 나중이라는 시간 관계가 핵심입니다.", [
          "Remember to save a copy before you edit the file. — 파일을 수정하기 전에 사본을 저장하는 것을 잊지 마세요.",
          "I forgot to attach the revised schedule. — 수정된 일정을 첨부하는 것을 잊었습니다.",
          "She remembered to call the supplier at nine. — 그녀는 9시에 공급업체에 전화할 것을 기억했습니다.",
          "Don't forget to switch off the projector. — 프로젝터 끄는 것을 잊지 마세요.",
          "We must remember to record who approved the change. — 변경을 누가 승인했는지 기록하는 것을 기억해야 합니다."
        ]),
        point("stop + -ing / stop + to-infinitive", "stop -ing는 하던 행동을 중단한다는 뜻이고, stop to do는 다른 행동을 하기 위해 현재 행동을 잠시 멈춘다는 뜻입니다.", [
          "The team stopped using the outdated form. — 팀은 오래된 양식 사용을 중단했습니다.",
          "We stopped to check the warning light. — 우리는 경고등을 확인하려고 멈췄습니다.",
          "He stopped interrupting after the chair spoke to him. — 의장이 그에게 말한 뒤 그는 끼어들기를 멈췄습니다.",
          "I stopped to answer an urgent call. — 긴급 전화를 받으려고 걸음을 멈췄습니다.",
          "Stopping to verify one figure prevented a larger mistake. — 수치 하나를 확인하려고 멈춘 것이 더 큰 실수를 막았습니다."
        ]),
        point("try + -ing / try + to-infinitive", "해결책을 시험해 볼 때 try -ing를 쓰고, 어렵더라도 어떤 행동을 시도하거나 노력할 때 try to do를 씁니다.", [
          "Try restarting the router before you call support. — 지원팀에 전화하기 전에 라우터를 재시작해 보세요.",
          "I tried to restart it, but the button was frozen. — 재시작하려고 했지만 버튼이 멈춰 있었습니다.",
          "Try moving the meeting to a quieter room. — 회의를 더 조용한 방으로 옮겨 보세요.",
          "She tried to explain the delay without blaming anyone. — 그녀는 누구도 탓하지 않고 지연을 설명하려고 노력했습니다.",
          "We tried adding labels, and the error rate fell. — 라벨을 붙여 보니 오류율이 떨어졌습니다."
        ]),
        point("regret / go on + -ing or to-infinitive", "regret -ing는 과거 행동을 후회하고, regret to do는 지금 전할 좋지 않은 소식에 유감을 표합니다. go on -ing는 같은 행동을 계속하고, go on to do는 다음 단계로 넘어갑니다.", [
          "I regret sending the message before checking the facts. — 사실을 확인하기 전에 메시지를 보낸 것을 후회합니다.",
          "We regret to inform you that the event has been cancelled. — 행사가 취소됐음을 알려 드리게 되어 유감입니다.",
          "She went on explaining the same point for ten minutes. — 그녀는 같은 요점을 10분 동안 계속 설명했습니다.",
          "She went on to propose a practical solution. — 이어서 그녀는 실용적인 해결책을 제안했습니다.",
          "After reviewing the problem, the group went on to test two alternatives. — 문제를 검토한 뒤 그룹은 두 가지 대안을 시험하는 단계로 넘어갔습니다."
        ])
      ]
    },
    [
      idiom("slip your mind", "깜빡 잊다", "The deadline slipped my mind until I saw the reminder. — 알림을 보기 전까지 마감일을 깜빡했습니다."),
      idiom("give it a go", "한번 해 보다", "If the usual fix fails, give the new method a go. — 평소 해결책이 실패하면 새 방법을 한번 시도해 보세요."),
      idiom("call it a day", "그날 일을 마치다", "We checked the final figures and called it a day. — 최종 수치를 확인하고 그날 일을 마쳤습니다.")
    ],
    "The Reminder That Saved a Community Event",
    [
      "On Monday morning, Leila remembered agreeing to book a sound system for a community event. She also remembered to check the confirmation email. The booking was listed, but the delivery address was an old office that the group had stopped using months earlier.",
      "Leila tried calling the supplier, but the line was busy. She then tried sending a message through the online portal. A reply arrived within ten minutes, explaining that the van had already left the warehouse. The driver agreed to stop to check the new address before entering the town centre.",
      "The organiser regretted not updating the shared contact sheet. He said, “I regret to admit that the task slipped my mind.” Instead of blaming him, the group corrected the sheet and went on to review every other booking for the event.",
      "They found that the catering team had the right address, but one volunteer had forgotten to order extension cables. She gave a nearby equipment shop a call and managed to reserve them. Trying a second supplier would have taken longer, so the quick local solution was sensible.",
      "The sound system and cables arrived before the guests. After testing the microphones, the team called it a day. They did not simply remember a near failure; they created a checklist that would remind future organisers to confirm addresses, contacts and equipment one week in advance."
    ],
    [
      "월요일 아침 Leila는 지역 행사 음향 시스템을 예약하기로 했던 일을 기억했고 확인 이메일도 확인했습니다. 예약은 돼 있었지만 배송 주소는 몇 달 전 사용을 중단한 옛 사무실이었습니다.",
      "Leila는 공급업체에 전화하려 했지만 통화 중이어서 온라인 포털로 메시지를 보내 보았습니다. 10분 만에 답이 왔고 차량은 이미 창고를 떠난 상태였습니다. 운전자는 도심으로 들어가기 전에 새 주소를 확인하려고 멈추기로 했습니다.",
      "주최자는 공동 연락처 표를 갱신하지 않은 것을 후회했고 그 일이 깜빡 잊혔다고 인정했습니다. 팀은 탓하는 대신 표를 고친 뒤 다른 모든 예약도 계속 점검했습니다.",
      "케이터링 팀의 주소는 맞았지만 한 봉사자는 연장 케이블 주문을 잊었습니다. 근처 장비점에 전화해 케이블을 예약했고, 두 번째 공급업체를 시도하는 것보다 빠른 현지 해결책이 합리적이었습니다.",
      "손님보다 먼저 음향 장비와 케이블이 도착했습니다. 마이크를 시험한 뒤 팀은 일을 마쳤습니다. 아찔했던 일을 기억하는 데서 끝내지 않고 앞으로 주소·연락처·장비를 일주일 전에 확인하게 하는 점검표를 만들었습니다."
    ],
    [
      vocab("confirmation", "noun", "확인서", "예약이 접수됐음을 알리는 이메일"), vocab("delivery", "noun", "배송", "장비를 행사장으로 가져오는 일"),
      vocab("supplier", "noun", "공급업체", "음향 장비를 제공하는 회사"), vocab("warehouse", "noun", "창고", "배송 차량이 출발한 장소"),
      vocab("organiser", "noun", "주최자", "행사 준비를 책임지는 사람"), vocab("extension", "noun", "연장용", "전원 케이블의 길이를 늘리는 장비"),
      vocab("reserve", "verb", "예약하다", "가게의 장비를 미리 확보하는 행동"), vocab("sensible", "adjective", "합리적인", "시간과 상황에 잘 맞는 판단"),
      vocab("microphones", "noun", "마이크들", "행사 전에 시험한 음향 장비"), vocab("checklist", "noun", "점검표", "필수 항목을 빠짐없이 확인하는 목록")
    ],
    [
      quiz("I remember _____ her at the conference.", ["meet", "meeting", "to meet yesterday", "met"], 1, "과거에 실제로 만난 기억은 remember + -ing로 표현합니다."),
      quiz("Please remember _____ the door before you leave.", ["locking", "locked", "to lock", "lock to"], 2, "앞으로 해야 할 행동을 기억하는 것은 remember + to부정사입니다."),
      quiz("We stopped _____ the map because we were lost.", ["to check", "checking forever", "checked", "to checking"], 0, "지도를 확인하려고 하던 행동을 잠시 멈췄으므로 stop to check입니다."),
      quiz("If the screen is frozen, try _____ the app.", ["restart", "restarting", "to restarted", "restarted"], 1, "해결 방법을 시험해 보는 의미이므로 try + -ing가 알맞습니다."),
      quiz("We regret _____ you that your application was unsuccessful.", ["informing yesterday", "to inform", "inform", "informed"], 1, "좋지 않은 소식을 지금 전하는 격식 표현은 regret to inform입니다."),
      quiz("What was wrong with the sound-system booking?", ["The price was missing", "The delivery address was old", "The microphones were broken", "The date was wrong"], 1, "예약 주소가 이미 사용을 중단한 옛 사무실이었습니다."),
      quiz("How did Leila reach the supplier?", ["By visiting the warehouse", "Through the online portal", "Through the caterer", "By cancelling the event"], 1, "전화 연결이 안 되어 온라인 포털 메시지를 보냈습니다."),
      quiz("What had a volunteer forgotten to order?", ["Food", "Chairs", "Extension cables", "Tickets"], 2, "봉사자가 연장 케이블 주문을 잊었습니다."),
      quiz("Why was the local shop a sensible choice?", ["It was free", "It offered a quicker solution", "It owned the venue", "It changed the address"], 1, "다른 공급업체를 찾는 것보다 빠르게 필요한 장비를 확보할 수 있었습니다."),
      quiz("What lasting change did the team make?", ["They stopped using microphones", "They created an advance checklist", "They moved the event", "They hired a new organiser"], 1, "다음 행사 준비를 위해 일주일 전 확인용 점검표를 만들었습니다.")
    ],
    ["What important task has slipped your mind before?", "Which small tasks do you always remember to do?", "When is it useful to try doing something differently?", "Describe a time when you stopped to check something.", "Use two verb patterns to explain a recent decision."],
    rolePlay("An event booking may contain an old address and missing equipment.", "Explain what you remember doing, what someone forgot to do and two solutions you tried.", "Act as the organiser, ask for a timeline and check the difference between each verb pattern.", "Use remember, forget, stop, try and regret with accurate complements, then repeat corrected sentences.")
  ),
  makeLesson(
    "adult", "2026-10-13", "Transitive and Intransitive Verb Pairs",
    {
      title: "자동사와 타동사 짝: rise/raise, lie/lay처럼 목적어를 정확히 연결하기",
      summary: "영어에는 뜻이 비슷해 보이지만 목적어 유무와 형태가 다른 동사 짝이 있습니다. rise는 스스로 오르고 raise는 무엇을 올리며, lie는 놓여 있고 lay는 무엇을 놓습니다. 문장에 행동의 대상을 직접 붙여야 하는지부터 확인하고 불규칙 과거형까지 함께 익혀야 합니다.",
      points: [
        point("rise / raise", "rise–rose–risen은 목적어 없이 주어가 오르고, raise–raised–raised는 목적어를 올리거나 문제를 제기합니다.", [
          "Prices rose sharply in September. — 9월에 물가가 크게 올랐습니다.",
          "The company raised its prices in September. — 회사는 9월에 가격을 올렸습니다.",
          "Several questions have arisen since the launch. — 출시 이후 여러 질문이 생겼습니다.",
          "Marta raised an important concern at the meeting. — Marta는 회의에서 중요한 우려를 제기했습니다.",
          "The sun had risen before we reached the coast. — 우리가 해안에 도착하기 전에 해가 떠 있었습니다."
        ]),
        point("lie / lay", "lie–lay–lain은 눕거나 놓여 있는 자동사이고, lay–laid–laid는 물건을 내려놓거나 규칙·토대를 마련하는 타동사입니다.", [
          "The documents are lying on the desk. — 서류가 책상 위에 놓여 있습니다.",
          "She laid the documents beside the keyboard. — 그녀는 서류를 키보드 옆에 놓았습니다.",
          "The village lies beyond the river. — 그 마을은 강 너머에 자리합니다.",
          "Clear rules laid the foundation for fair decisions. — 명확한 규칙이 공정한 결정의 토대를 마련했습니다.",
          "He had lain awake for an hour before the alarm rang. — 그는 알람이 울리기 전 한 시간 동안 깨어 누워 있었습니다."
        ]),
        point("sit / set", "sit–sat–sat은 사람이 앉아 있는 자동사이고, set–set–set은 물건을 놓거나 기준·시간을 정하는 타동사입니다.", [
          "Please sit near the window. — 창가에 앉아 주세요.",
          "Please set the box near the window. — 상자를 창가에 놓아 주세요.",
          "The committee sat for three hours. — 위원회는 세 시간 동안 회의를 했습니다.",
          "They set a realistic deadline for Friday. — 그들은 금요일로 현실적인 마감일을 정했습니다.",
          "The technician has set the temperature to twenty degrees. — 기술자가 온도를 20도로 맞춰 놓았습니다."
        ]),
        point("fall / fell", "fall–fell–fallen은 스스로 떨어지는 자동사이고, fell–felled–felled는 나무를 베어 넘어뜨리는 타동사입니다. 현재형 fell과 fall의 과거형 fell을 문맥으로 구분합니다.", [
          "Attendance fell after the timetable changed. — 시간표가 바뀐 뒤 참석률이 떨어졌습니다.",
          "A branch had fallen across the path. — 나뭇가지가 길을 가로질러 떨어져 있었습니다.",
          "The workers felled the damaged tree safely. — 작업자들이 손상된 나무를 안전하게 베었습니다.",
          "Temperatures are expected to fall overnight. — 밤사이 기온이 내려갈 것으로 예상됩니다.",
          "Only trained crews may fell trees in this area. — 이 지역에서는 훈련된 작업팀만 나무를 벨 수 있습니다."
        ]),
        point("grow / grow something; change of state", "일부 동사는 자동사와 타동사로 모두 쓰입니다. 목적어가 없으면 주어의 변화, 목적어가 있으면 누군가 그 변화를 일으킨다는 뜻입니다.", [
          "The organisation grew rapidly. — 그 조직은 빠르게 성장했습니다.",
          "The new director grew the organisation carefully. — 새 이사는 조직을 신중하게 성장시켰습니다.",
          "The door opened slowly. — 문이 천천히 열렸습니다.",
          "A guard opened the door. — 경비원이 문을 열었습니다.",
          "The schedule changed after the consultation, and the manager changed the notice as well. — 협의 뒤 일정이 바뀌었고 관리자는 공지도 바꿨습니다."
        ])
      ]
    },
    [
      idiom("raise a red flag", "위험 신호를 제기하다", "The unexplained rise in costs raised a red flag. — 설명되지 않은 비용 상승이 위험 신호를 제기했습니다."),
      idiom("set the record straight", "오해를 바로잡다", "The director set the record straight about the closure. — 이사는 폐쇄에 관한 오해를 바로잡았습니다."),
      idiom("lay the groundwork", "기초를 마련하다", "The pilot project laid the groundwork for a larger service. — 시범 사업이 더 큰 서비스의 기초를 마련했습니다.")
    ],
    "When One Verb Changed the Meaning of a Notice",
    [
      "A council notice said that parking charges would rise from November. On social media, however, a summary claimed that the council would rise the charges. The error looked small, but it made the announcement sound careless and raised doubts about who had approved it.",
      "A communications officer set the record straight. She explained that charges rise by themselves in a grammatical sentence, while an organisation raises them. She then noticed a second sentence saying that new signs would lie beside every entrance. That wording was correct: the signs would be lying there after workers had laid them down.",
      "The team reviewed other confusing pairs. Visitor numbers had fallen, but nobody had felled them. A committee had sat to discuss the problem and had set a new target. The town's reputation had grown, while local businesses had grown their weekend services.",
      "These distinctions mattered because the notice described responsibility. Saying that a cost rose can make the cause sound distant; saying that the council raised it names the decision-maker. The revised notice therefore stated both the change and the reason for it.",
      "The correction laid the groundwork for a short language guide. Editors now check whether each verb needs an object and verify irregular forms before publication. A tiny grammatical red flag became a useful reminder that clear verbs make public decisions easier to understand."
    ],
    [
      "의회 공지에는 11월부터 주차 요금이 오른다고 적혀 있었습니다. 그러나 소셜미디어 요약은 의회가 요금을 ‘rise’한다고 잘못 썼고, 작은 오류가 공지를 부주의하게 보이게 하며 승인 과정에 의문을 불러왔습니다.",
      "홍보 담당자는 오해를 바로잡았습니다. 요금은 스스로 rise하고 조직은 요금을 raise한다고 설명했습니다. 또 새 표지판이 모든 입구 옆에 놓여 있을 것이라는 문장은, 작업자가 표지판을 놓은 뒤의 상태를 뜻하므로 맞았습니다.",
      "팀은 다른 혼동되는 짝도 검토했습니다. 방문객 수는 떨어졌지만 누가 그것을 베어 넘긴 것은 아니었습니다. 위원회는 앉아 문제를 논의했고 새 목표를 정했습니다. 도시의 명성은 성장했고 지역 업체들은 주말 서비스를 키웠습니다.",
      "이 차이는 공지가 책임 소재를 설명하기 때문에 중요했습니다. 비용이 올랐다고 하면 원인이 멀게 느껴질 수 있지만 의회가 올렸다고 하면 결정 주체가 드러납니다. 수정 공지는 변화와 이유를 모두 명시했습니다.",
      "이번 수정은 짧은 언어 지침의 기초가 됐습니다. 편집자들은 이제 동사마다 목적어가 필요한지와 불규칙형을 출판 전에 확인합니다. 작은 문법상 위험 신호가 명확한 동사가 공공 결정을 이해하기 쉽게 한다는 교훈이 됐습니다."
    ],
    [
      vocab("charges", "noun", "요금", "주차 이용자가 내는 비용"), vocab("summary", "noun", "요약", "공지를 짧게 정리한 글"),
      vocab("careless", "adjective", "부주의한", "검토가 충분하지 않아 보이는 상태"), vocab("approved", "verb", "승인했다", "공식적으로 허가한 행동"),
      vocab("entrance", "noun", "입구", "새 표지판이 놓일 장소"), vocab("distinctions", "noun", "차이점들", "비슷한 동사 사이의 문법적 차이"),
      vocab("responsibility", "noun", "책임", "결정을 내린 주체가 지는 의무"), vocab("decision-maker", "noun", "결정권자", "요금 변경을 정한 주체"),
      vocab("revised", "adjective", "수정된", "오류와 설명을 고친 공지"), vocab("publication", "noun", "게시·출판", "대중에게 글을 공개하는 일")
    ],
    [
      quiz("The cost of fuel _____ last month.", ["raised", "rose", "has raise", "was rising it"], 1, "비용 자체가 오른 것이므로 목적어 없는 rise의 과거형 rose가 알맞습니다."),
      quiz("The company _____ its delivery fee.", ["rose", "risen", "raised", "arose"], 2, "회사가 목적어 fee를 올렸으므로 raised를 씁니다."),
      quiz("She _____ the keys on the table.", ["lay", "laid", "lain", "lied"], 1, "목적어 keys를 내려놓은 과거 행동은 laid입니다."),
      quiz("The committee _____ for three hours and _____ a new target.", ["set / sat", "sat / set", "sitted / setted", "sat / sat"], 1, "위원회는 sat, 목표는 set이 맞습니다."),
      quiz("A large branch has _____ across the path.", ["fell", "felled", "fallen", "fall"], 2, "현재완료에는 fall의 과거분사 fallen을 씁니다."),
      quiz("What error appeared in the social-media summary?", ["It used rise as a transitive verb", "It misspelled council", "It omitted November", "It used the wrong price"], 0, "the council would rise the charges라고 목적어를 잘못 붙였습니다."),
      quiz("Why was ‘signs would lie beside every entrance’ correct?", ["The signs tell lies", "It described their position", "Workers would sit there", "The entrances would move"], 1, "표지판이 놓여 있는 상태를 설명하므로 자동사 lie가 맞습니다."),
      quiz("What had the committee done?", ["Felled visitor numbers", "Sat and set a target", "Raised an entrance", "Lain a target"], 1, "위원회는 회의를 하고 새 목표를 정했습니다."),
      quiz("Why can verb choice affect responsibility?", ["It changes the font", "It can name or hide the actor", "It changes the date", "It removes every object"], 1, "타동사는 행동의 주체와 대상을 더 분명히 드러낼 수 있습니다."),
      quiz("What do editors now check?", ["Only spelling", "Objects and irregular verb forms", "Parking spaces only", "Social-media likes"], 1, "동사의 목적어 필요 여부와 불규칙형을 확인합니다.")
    ],
    ["Which verb pairs do you find most confusing?", "When is it useful to name the person who caused a change?", "Describe something that rose and something someone raised.", "Where are three objects lying near you, and who laid them there?", "How can a small language error affect public trust?"],
    rolePlay("A public notice contains rise/raise and lie/lay errors.", "Identify the errors, explain whether each verb needs an object and propose corrected sentences.", "Act as the editor and challenge the learner with five verb-pair examples.", "Use accurate irregular forms and explain how verb choice changes responsibility.")
  ),
  makeLesson(
    "adult", "2026-10-14", "Correlative Conjunctions and Parallel Structure",
    {
      title: "상관접속사와 병렬 구조: 짝을 이루는 표현을 균형 있게 연결하기",
      summary: "both ... and, either ... or, neither ... nor, not only ... but also는 두 요소를 강하게 연결합니다. 연결되는 단어·구·절은 가능한 한 같은 문법 형태로 맞춰야 읽기 쉽고, 동사는 가까운 주어와 일치하는 경우가 많습니다. 강조를 위해 not only를 문두에 두면 도치도 필요합니다.",
      points: [
        point("both A and B", "두 요소가 모두 사실일 때 쓰며 A와 B를 같은 형태로 맞춥니다. 복수 주어를 만들므로 동사는 일반적으로 복수형입니다.", [
          "The plan is both affordable and practical. — 그 계획은 저렴하면서도 실용적입니다.",
          "We need both to reduce delays and to improve accuracy. — 지연을 줄이고 정확성도 높여야 합니다.",
          "Both the manager and the analyst are attending. — 관리자와 분석가 모두 참석합니다.",
          "The role requires both patience and careful judgement. — 그 역할에는 인내와 신중한 판단이 모두 필요합니다.",
          "She both designed the survey and analysed the results. — 그녀는 설문을 설계했고 결과도 분석했습니다."
        ]),
        point("either A or B", "둘 중 하나가 가능하거나 선택되어야 할 때 씁니다. 주어를 연결하면 가까운 주어가 동사의 수를 결정하는 근접 일치가 흔합니다.", [
          "You can either call us or use the online form. — 전화하거나 온라인 양식을 이용할 수 있습니다.",
          "Either the assistants or the director is opening the meeting. — 보조자들이나 이사 중 한쪽이 회의를 시작합니다.",
          "Either the director or the assistants are opening the meeting. — 이사나 보조자들 중 한쪽이 회의를 시작합니다.",
          "We must decide either to postpone the launch or to reduce its scope. — 출시를 미루거나 범위를 줄이기로 결정해야 합니다.",
          "The fault lies either in the cable or in the adapter. — 고장은 케이블이나 어댑터 중 하나에 있습니다."
        ]),
        point("neither A nor B", "두 요소 모두 사실이 아니거나 선택되지 않을 때 씁니다. 부정 의미가 이미 있으므로 일반적으로 동사에 not을 추가하지 않습니다.", [
          "Neither option meets the safety standard. — 어느 선택도 안전 기준을 충족하지 않습니다.",
          "Neither the printer nor the laptops are connected. — 프린터도 노트북들도 연결돼 있지 않습니다.",
          "The change was neither explained clearly nor recorded properly. — 변경은 명확히 설명되지도, 제대로 기록되지도 않았습니다.",
          "She neither blamed the team nor ignored the error. — 그녀는 팀을 탓하지도 오류를 무시하지도 않았습니다.",
          "Neither waiting longer nor rushing now will solve the cause. — 더 기다리는 것도 지금 서두르는 것도 원인을 해결하지 못합니다."
        ]),
        point("not only A but also B", "두 사실을 연결하되 B를 추가 정보로 강조합니다. A와 B는 같은 문법 단위로 맞추고, 주어를 연결하면 보통 가까운 주어와 동사를 일치시킵니다.", [
          "The update is not only faster but also more secure. — 업데이트는 더 빠를 뿐 아니라 더 안전합니다.",
          "She not only found the error but also proposed a fix. — 그녀는 오류를 찾았을 뿐 아니라 해결책도 제안했습니다.",
          "Not only the staff but also the owner was surprised. — 직원들뿐 아니라 소유주도 놀랐습니다.",
          "The course teaches not only how to write clearly but also how to edit critically. — 이 과정은 명확한 글쓰기뿐 아니라 비판적 편집법도 가르칩니다.",
          "We need not only better tools but also clearer responsibilities. — 더 나은 도구뿐 아니라 더 명확한 책임도 필요합니다."
        ]),
        point("문두 not only와 도치", "not only가 절 전체를 강조하며 문두에 오면 조동사와 주어의 순서가 질문처럼 바뀝니다. 뒤의 but 절은 보통 평서문 어순입니다.", [
          "Not only did the team finish early, but it also stayed under budget. — 팀은 일찍 끝냈을 뿐 아니라 예산도 지켰습니다.",
          "Not only was the warning unclear, but it was also difficult to find. — 경고는 불명확했을 뿐 아니라 찾기도 어려웠습니다.",
          "Not only can the tool detect errors, but it can also explain them. — 그 도구는 오류를 찾을 뿐 아니라 설명도 할 수 있습니다.",
          "Not only have complaints fallen, but response times have improved. — 불만이 줄었을 뿐 아니라 응답 시간도 개선됐습니다.",
          "Not only should we correct the result, but we should also document the cause. — 결과를 고칠 뿐 아니라 원인도 기록해야 합니다."
        ])
      ]
    },
    [
      idiom("strike a balance", "균형을 맞추다", "The schedule must strike a balance between speed and care. — 일정은 속도와 신중함 사이의 균형을 맞춰야 합니다."),
      idiom("the best of both worlds", "두 장점을 모두 누리는 것", "The hybrid plan offers the best of both worlds. — 혼합안은 두 방식의 장점을 모두 제공합니다."),
      idiom("neither here nor there", "핵심과 무관한", "The colour is neither here nor there; safety is the real issue. — 색상은 핵심이 아니며 진짜 문제는 안전입니다.")
    ],
    "A Hybrid Schedule That Needed Better Balance",
    [
      "A small design firm wanted both to reduce office costs and to protect teamwork. One proposal required everyone to work remotely, while another brought the whole team back five days a week. Neither plan satisfied both goals.",
      "The director asked staff either to support one proposal or to suggest a workable alternative. Designers said that quiet work was easier at home, but rapid feedback was often better in person. The debate was not only about convenience but also about the quality of collaboration.",
      "A third proposal struck a balance. Teams would meet in the office on two shared days and choose either home or the office for the remaining days. Both new employees and experienced staff would have scheduled time for mentoring.",
      "Not only did the hybrid plan cost less than full-time office work, but it also preserved regular contact. Neither the director nor the staff representatives expected it to solve every problem, so they agreed to test it for eight weeks and review evidence rather than impressions.",
      "The trial delivered the best of both worlds for most staff. Focus time improved, and project delays fell. The firm kept the plan but allowed teams to adjust their shared days. The exact number of office chairs was neither here nor there; clear coordination was what made the structure work."
    ],
    [
      "한 소규모 디자인 회사는 사무실 비용을 줄이는 동시에 협업도 지키고 싶었습니다. 완전 원격안과 주 5일 출근안 어느 쪽도 두 목표를 모두 충족하지 못했습니다.",
      "이사는 직원들에게 한 안을 지지하거나 실행 가능한 대안을 제시하라고 했습니다. 집중 업무는 집이 더 쉬웠지만 빠른 피드백은 대면이 나았습니다. 논쟁은 편의뿐 아니라 협업의 질에 관한 것이었습니다.",
      "세 번째 제안이 균형을 맞췄습니다. 팀은 이틀을 공동 출근일로 삼고 나머지는 집이나 사무실 중 선택합니다. 신입과 경력 직원 모두 멘토링 시간을 갖습니다.",
      "혼합안은 전면 출근보다 비용이 적게 들었을 뿐 아니라 정기적인 접촉도 유지했습니다. 이사도 직원 대표도 모든 문제가 해결될 것으로 기대하지 않아 8주간 시험하고 인상이 아닌 근거를 검토하기로 했습니다.",
      "시범 운영은 대부분에게 두 방식의 장점을 제공했습니다. 집중 시간이 늘고 지연이 줄었습니다. 회사는 제도를 유지하되 팀별 조정을 허용했습니다. 의자 수보다 명확한 조율이 제도를 작동하게 한 핵심이었습니다."
    ],
    [
      vocab("firm", "noun", "회사", "혼합 근무를 검토한 디자인 조직"), vocab("remote", "adjective", "원격의", "사무실 밖에서 하는 근무 방식"),
      vocab("satisfied", "verb", "충족했다", "목표와 요구에 맞은 상태"), vocab("workable", "adjective", "실행 가능한", "실제로 적용할 수 있는 대안"),
      vocab("collaboration", "noun", "협업", "사람들이 함께 일하는 과정"), vocab("mentoring", "noun", "멘토링", "경험자가 신입을 돕는 활동"),
      vocab("preserved", "verb", "유지했다", "좋은 상태가 사라지지 않게 한 것"), vocab("representatives", "noun", "대표자들", "직원 의견을 전달하는 사람들"),
      vocab("impressions", "noun", "인상", "충분한 근거 없이 느끼는 판단"), vocab("coordination", "noun", "조율", "여러 사람의 일정과 행동을 맞추는 일")
    ],
    [
      quiz("The plan is both affordable _____ practical.", ["or", "nor", "and", "but"], 2, "both는 and와 짝을 이룹니다."),
      quiz("Either the director or the assistants _____ presenting today.", ["is", "are", "was", "be"], 1, "가까운 복수 주어 assistants에 맞춰 are를 씁니다."),
      quiz("The change was neither explained _____ recorded.", ["or", "nor", "and", "also"], 1, "neither의 짝은 nor입니다."),
      quiz("Choose the parallel sentence.", ["She likes reading and to swim.", "She likes to read and swimming.", "She likes reading and swimming.", "She likes read and swimming."], 2, "두 요소를 모두 -ing 형태로 맞췄습니다."),
      quiz("Not only _____ costs fall, but service also improved.", ["costs did", "did", "do the", "did the"], 3, "문두 not only 뒤에는 did + 주어 + 동사원형의 도치가 필요합니다."),
      quiz("What were the firm's two main goals?", ["More chairs and meetings", "Lower costs and protected teamwork", "Longer hours and higher rent", "Fewer designers and projects"], 1, "비용 절감과 협업 보호가 목표였습니다."),
      quiz("What did the third proposal require?", ["Five office days", "Two shared office days", "No remote work", "One permanent location"], 1, "이틀은 공동 출근하고 나머지는 장소를 선택했습니다."),
      quiz("Why was mentoring scheduled?", ["To reduce salaries", "To connect new and experienced staff", "To avoid every meeting", "To choose chairs"], 1, "신입과 경력 직원이 정기적으로 연결되도록 했습니다."),
      quiz("How long was the trial?", ["Two days", "Four weeks", "Eight weeks", "One year"], 2, "8주간 시험 운영하기로 했습니다."),
      quiz("What made the hybrid structure work?", ["Chair numbers", "Clear coordination", "A larger office", "No flexibility"], 1, "명확한 조율이 성공의 핵심이었습니다.")
    ],
    ["How would you strike a balance between focus and teamwork?", "Which tasks work better at home and which in person?", "Make one sentence with both ... and.", "What evidence should a workplace trial collect?", "When have you enjoyed the best of both worlds?"],
    rolePlay("A company must choose a remote, office or hybrid schedule.", "Compare the options with all four correlative pairs and recommend a balanced trial.", "Act as the director and question whether each pair is parallel and each verb agrees.", "Use one fronted not only sentence and repeat any corrected structure.")
  ),
  makeLesson(
    "adult", "2026-10-15", "Passive Reporting Structures",
    {
      title: "수동 보고 구조: 출처·거리감·시점을 정교하게 표현하기",
      summary: "보도·연구·공식 문서에서는 It is said that ...와 subject + is said to ...를 사용해 정보의 출처와 화자의 거리감을 나타냅니다. 현재·동시 상태에는 to be/do, 먼저 일어난 과거에는 to have + 과거분사, 진행에는 to be + -ing를 선택합니다. 증거가 불확실할 때 사실처럼 단정하지 않는 효과도 있습니다.",
      points: [
        point("It is said/thought/believed that ...", "가주어 it과 수동 보고동사를 사용하면 누가 말하거나 믿는지보다 내용에 초점을 둡니다. 필요하면 by + 출처를 붙입니다.", [
          "It is believed that the bridge is safe. — 그 다리는 안전한 것으로 여겨집니다.",
          "It is reported that demand has increased. — 수요가 증가한 것으로 보도됩니다.",
          "It is thought that the error began overnight. — 오류가 밤사이에 시작된 것으로 생각됩니다.",
          "It is widely recognised that sleep affects concentration. — 수면이 집중력에 영향을 준다는 점은 널리 인정됩니다.",
          "It was alleged that the figures had been altered. — 수치가 변경됐다는 주장이 제기됐습니다."
        ]),
        point("subject + is said to be/do", "내용절의 주어를 문장 앞으로 옮기고 수동태 + to부정사를 씁니다. 현재나 일반적인 사실은 to be/do가 알맞습니다.", [
          "The bridge is believed to be safe. — 그 다리는 안전한 것으로 여겨집니다.",
          "The new system is said to reduce waiting times. — 새 시스템은 대기 시간을 줄인다고 합니다.",
          "Two suppliers are understood to share the contract. — 두 공급업체가 계약을 나눠 맡는 것으로 알려져 있습니다.",
          "The committee is expected to publish its decision today. — 위원회는 오늘 결정을 발표할 것으로 예상됩니다.",
          "The medicine is known to cause mild drowsiness. — 그 약은 가벼운 졸음을 유발하는 것으로 알려져 있습니다."
        ]),
        point("is said to have + p.p.", "보고 시점보다 먼저 일어난 행동이나 과거 상태에는 완료부정사 to have + 과거분사를 씁니다.", [
          "The storm is reported to have damaged fifty homes. — 폭풍이 주택 50채를 파손한 것으로 보도됩니다.",
          "The company is believed to have known about the fault. — 회사는 결함을 알고 있었던 것으로 여겨집니다.",
          "Three witnesses are said to have seen the vehicle. — 목격자 세 명이 그 차량을 본 것으로 전해집니다.",
          "The painting was thought to have been lost. — 그 그림은 소실된 것으로 여겨졌습니다.",
          "The delay appears to have resulted from a power cut. — 지연은 정전에서 비롯된 것으로 보입니다."
        ]),
        point("진행과 수동: to be -ing / to have been p.p.", "현재 진행 중인 일은 to be + -ing, 이미 완료된 수동 사건은 to have been + 과거분사로 나타냅니다.", [
          "The team is believed to be testing a replacement. — 팀이 대체품을 시험 중인 것으로 여겨집니다.",
          "Several residents are reported to be waiting outside. — 주민 여러 명이 밖에서 기다리는 것으로 보도됩니다.",
          "The files are believed to have been copied. — 파일이 복사된 것으로 여겨집니다.",
          "The road is said to have been closed before dawn. — 도로가 새벽 전에 폐쇄된 것으로 전해집니다.",
          "The device appears to be working normally now. — 장치는 현재 정상 작동하는 것으로 보입니다."
        ]),
        point("동사 선택과 증거의 강도", "say/report는 전달, believe/think는 판단, know/recognise는 강한 확립, allege는 입증되지 않은 주장에 가깝습니다. 동사 선택이 확실성 수준을 바꿉니다.", [
          "The minister is reported to be considering the proposal. — 장관이 제안을 검토 중인 것으로 보도됩니다.",
          "The method is known to improve accuracy. — 그 방법은 정확성을 높이는 것으로 알려져 있습니다.",
          "The contractor is alleged to have broken the rules. — 계약업체가 규칙을 위반했다는 의혹이 제기됐습니다.",
          "The result is expected to be confirmed tomorrow. — 결과는 내일 확인될 것으로 예상됩니다.",
          "The two events are understood to be unrelated. — 두 사건은 관련이 없는 것으로 파악됩니다."
        ])
      ]
    },
    [
      idiom("according to reports", "보도에 따르면", "According to reports, the road will reopen at noon. — 보도에 따르면 도로는 정오에 다시 열립니다."),
      idiom("take with a pinch of salt", "곧이곧대로 믿지 않다", "Take early online claims with a pinch of salt. — 초기 온라인 주장은 곧이곧대로 믿지 마세요."),
      idiom("the word is", "소문·전언에 따르면", "The word is that a formal update will arrive today. — 전언에 따르면 오늘 공식 업데이트가 나옵니다.")
    ],
    "A Rumour, a Report and a Confirmed Fact",
    [
      "Early on Thursday, an online post claimed that a local hospital had closed its emergency department. The message was shared hundreds of times. The closure was said to have followed an electrical fault, but the post named no source and provided no time.",
      "A regional news site reported that part of the building was being inspected. According to reports, two treatment rooms had been closed temporarily, while the emergency entrance remained open. Patients were understood to be entering through a different door.",
      "The hospital then issued a statement. A cable fault was confirmed to have affected one corridor, and engineers were reported to be testing the supply. No patients had been harmed, and the department was known to have backup power.",
      "The original claim was therefore misleading. It turned a limited disruption into a complete closure. Readers who had taken the first post with a pinch of salt waited for evidence; others cancelled appointments unnecessarily.",
      "By midday, the corridor had reopened. The incident showed why reporting structures matter: ‘is alleged’, ‘is reported’ and ‘is confirmed’ do not carry the same weight. Responsible communication makes both the source and the degree of certainty visible."
    ],
    [
      "목요일 아침 온라인 게시물은 지역 병원 응급실이 폐쇄됐다고 주장했고 수백 번 공유됐습니다. 전기 결함 뒤 폐쇄됐다고 전해졌지만 출처도 시간도 없었습니다.",
      "지역 뉴스 사이트는 건물 일부가 점검 중이라고 보도했습니다. 보도에 따르면 진료실 두 곳만 임시 폐쇄됐고 응급실 입구는 열려 있었으며 환자들은 다른 문으로 들어가는 것으로 파악됐습니다.",
      "병원은 이어 공식 성명을 냈습니다. 케이블 결함이 복도 하나에 영향을 준 사실이 확인됐고 기술자들이 전원을 시험 중인 것으로 보도됐습니다. 다친 환자는 없었고 응급실에는 비상 전력이 있었습니다.",
      "최초 주장은 제한된 차질을 전면 폐쇄로 바꿔 말해 오해를 불렀습니다. 첫 게시물을 곧이곧대로 믿지 않은 독자들은 근거를 기다렸지만 다른 이들은 불필요하게 예약을 취소했습니다.",
      "정오까지 복도는 다시 열렸습니다. 이번 일은 의혹, 보도, 확인이 같은 무게를 갖지 않는다는 점을 보여 줍니다. 책임 있는 소통은 출처와 확실성 정도를 모두 드러냅니다."
    ],
    [
      vocab("emergency", "noun", "응급실", "긴급 환자를 치료하는 부서"), vocab("electrical", "adjective", "전기의", "케이블과 전원에 관련된 결함"),
      vocab("inspected", "verb", "점검됐다", "안전 여부를 자세히 확인한 상태"), vocab("temporarily", "adverb", "일시적으로", "짧은 기간 동안만 지속되는 상태"),
      vocab("corridor", "noun", "복도", "케이블 결함이 영향을 준 구역"), vocab("backup", "adjective", "비상용의", "주 전원이 끊길 때 대신 쓰는 것"),
      vocab("misleading", "adjective", "오해를 부르는", "사실을 잘못 이해하게 만드는"), vocab("disruption", "noun", "차질", "정상 운영이 잠시 방해받은 상태"),
      vocab("unnecessarily", "adverb", "불필요하게", "필요하지 않았는데도 한 행동"), vocab("certainty", "noun", "확실성", "정보가 사실이라고 믿을 수 있는 정도")
    ],
    [
      quiz("The bridge is believed _____ safe.", ["being", "to be", "that be", "have be"], 1, "현재 상태는 수동 보고동사 뒤 to be로 나타냅니다."),
      quiz("The storm is reported _____ fifty homes last night.", ["to damage", "to have damaged", "damaging", "to be damaged"], 1, "보고보다 먼저 끝난 과거 행동은 완료부정사를 씁니다."),
      quiz("The files are believed _____ copied.", ["to have been", "to be have", "having", "been to"], 0, "완료된 수동 사건은 to have been + 과거분사입니다."),
      quiz("Which verb best marks an unproven accusation?", ["know", "confirm", "allege", "recognise"], 2, "allege는 아직 입증되지 않은 주장을 나타냅니다."),
      quiz("The team is said _____ a replacement now.", ["to test yesterday", "to be testing", "to have test", "testing to"], 1, "현재 진행 중인 활동에는 to be testing을 씁니다."),
      quiz("What did the first online post claim?", ["Two rooms were inspected", "The emergency department had closed", "A new entrance opened", "Power costs rose"], 1, "응급실 전체가 폐쇄됐다고 주장했습니다."),
      quiz("What was actually closed?", ["The whole hospital", "Two treatment rooms and one corridor", "Every entrance", "The news site"], 1, "진료실 두 곳과 결함이 있는 복도 하나가 일시 폐쇄됐습니다."),
      quiz("What was the hospital testing?", ["Patient records", "The electrical supply", "A new appointment system", "News reports"], 1, "기술자들이 전원 공급을 시험하고 있었습니다."),
      quiz("What happened to some appointments?", ["They were cancelled unnecessarily", "They all moved abroad", "They became free", "They lasted longer"], 0, "과장된 게시물을 믿은 일부가 불필요하게 예약을 취소했습니다."),
      quiz("What is the reading's central lesson?", ["All passive forms are uncertain", "Reporting verbs show source and certainty", "Online posts are always false", "Hospitals should avoid statements"], 1, "보고동사 선택은 정보 출처와 확실성 수준을 보여 줍니다.")
    ],
    ["How do you decide whether an online report is reliable?", "What is the difference between alleged and confirmed?", "Rewrite one news claim with a passive reporting structure.", "When should a writer name the source directly?", "Why can uncertain language be more responsible than a firm claim?"],
    rolePlay("A viral claim conflicts with a hospital's partial update.", "Report what is alleged, reported and confirmed using three different passive structures.", "Act as a careful editor and ask for the source, time and degree of certainty.", "Use present, perfect and progressive infinitives accurately and finish with a verified summary.")
  ),
  makeLesson(
    "adult", "2026-10-16", "Advanced Time Clauses and Tense Choice",
    {
      title: "시간절의 시제 선택: 미래·완료·선후 관계를 정확히 연결하기",
      summary: "when, once, as soon as, before, after, until, by the time 같은 시간 접속사 뒤에서는 미래를 말해도 보통 will 대신 현재형을 씁니다. 두 과거 사건의 선후 관계가 분명하지 않으면 과거완료를 사용하고, until과 by의 차이로 지속과 마감 시점을 구분합니다.",
      points: [
        point("미래 시간절에는 현재형", "시간절 안에서는 미래 의미라도 현재단순을 쓰고, 주절에 will/can/may 등을 둡니다. will은 의지나 고집을 특별히 나타낼 때만 예외적입니다.", [
          "I will call you when the meeting ends. — 회의가 끝나면 전화하겠습니다.",
          "Once the figures are ready, we can publish the report. — 수치가 준비되면 보고서를 발표할 수 있습니다.",
          "Please wait here until the manager arrives. — 관리자가 올 때까지 여기서 기다려 주세요.",
          "As soon as she confirms the date, I will book the room. — 그녀가 날짜를 확인하는 즉시 방을 예약하겠습니다.",
          "Before you submit the form, check every required field. — 양식을 제출하기 전에 필수 항목을 모두 확인하세요."
        ]),
        point("완료를 강조하는 present perfect", "미래 시간절에서 한 행동이 완전히 끝난 뒤 다음 일이 일어남을 강조할 때 현재완료를 쓸 수 있습니다.", [
          "After you have read the guidance, sign the final page. — 안내문을 다 읽은 뒤 마지막 페이지에 서명하세요.",
          "We will decide once everyone has given their view. — 모두가 의견을 낸 뒤 결정하겠습니다.",
          "When the engineers have completed the test, the road will reopen. — 기술자들이 시험을 마치면 도로가 다시 열립니다.",
          "Do not archive the file until the client has approved it. — 고객이 승인할 때까지 파일을 보관 처리하지 마세요.",
          "As soon as I have checked the totals, I will send you the table. — 합계를 확인하는 즉시 표를 보내겠습니다."
        ]),
        point("과거완료로 먼저 일어난 사건 표시", "과거의 두 사건 중 하나가 다른 사건보다 먼저 완료됐음을 분명히 할 때 had + 과거분사를 씁니다. before/after가 관계를 충분히 보여 주면 과거단순도 가능하지만 완료형은 선행성을 강조합니다.", [
          "By the time we arrived, the presentation had started. — 우리가 도착했을 때 발표는 이미 시작됐습니다.",
          "After she had checked the invoice, she approved the payment. — 송장을 확인한 뒤 결제를 승인했습니다.",
          "The queue had disappeared before the doors closed. — 문이 닫히기 전에 줄은 사라져 있었습니다.",
          "Once the team had identified the cause, it tested a solution. — 팀이 원인을 찾은 뒤 해결책을 시험했습니다.",
          "He realised that he had saved the wrong version. — 그는 잘못된 버전을 저장했다는 것을 깨달았습니다."
        ]),
        point("until과 by / by the time", "until은 어떤 상태나 행동이 특정 시점까지 계속됨을, by는 그 시점 이전에 완료됨을 뜻합니다. by the time 뒤에는 절이 옵니다.", [
          "We worked until six. — 우리는 6시까지 계속 일했습니다.",
          "We had finished the work by six. — 우리는 6시까지 일을 끝냈습니다.",
          "Stay here until I return. — 제가 돌아올 때까지 여기 계세요.",
          "Please return the keys by Friday. — 금요일까지 열쇠를 반납해 주세요.",
          "By the time the audit ends, we will have reviewed every account. — 감사가 끝날 때쯤 모든 계정을 검토해 놓았을 것입니다."
        ]),
        point("no sooner / hardly / scarcely", "한 사건 직후 다른 사건이 일어났음을 강조하는 격식 구조입니다. 문두에 오면 had와 주어가 도치되며, no sooner는 than, hardly/scarcely는 when과 짝을 이룹니다.", [
          "No sooner had we launched the page than users reported an error. — 페이지를 공개하자마자 사용자들이 오류를 신고했습니다.",
          "Hardly had the meeting begun when the alarm sounded. — 회의가 시작하자마자 경보가 울렸습니다.",
          "Scarcely had she sat down when her phone rang. — 그녀가 앉자마자 전화가 울렸습니다.",
          "The guests had no sooner arrived than the rain started. — 손님들이 도착하자마자 비가 오기 시작했습니다.",
          "No sooner had the correction appeared than the rumour faded. — 정정문이 나오자마자 소문이 잦아들었습니다."
        ])
      ]
    },
    [
      idiom("in the nick of time", "아슬아슬하게 제시간에", "The replacement arrived in the nick of time. — 교체품이 아슬아슬하게 제시간에 도착했습니다."),
      idiom("sooner or later", "조만간, 결국", "Sooner or later, an untested process will fail. — 검증하지 않은 절차는 결국 실패합니다."),
      idiom("against the clock", "시간에 쫓겨", "The team worked against the clock to reopen the service. — 팀은 서비스를 재개하려고 시간에 쫓겨 일했습니다.")
    ],
    "The Twelve-Minute Window",
    [
      "A library planned to move its online catalogue to a new server before opening time. Once the final backup was complete, the technical team would switch systems. By the time readers arrived at nine, the service was meant to be running normally.",
      "The transfer began at seven. After the engineers had copied the records, they tested search and borrowing functions. No sooner had the first test ended than an error appeared in recent returns. A date field had changed format during the transfer.",
      "The team worked against the clock. They could not reopen the catalogue until they had confirmed that no records were missing. One engineer corrected the field while another compared totals. By 8:42, every total matched the backup.",
      "As soon as the director received the evidence, she approved the launch. The catalogue reopened at 8:48, in the nick of time. Hardly had the doors opened when the first reader used it to reserve a book.",
      "The team later changed its schedule. Future transfers would finish by the previous evening, and the public site would remain on the old server until all tests had passed. Sooner or later, every migration meets a surprise; good timing leaves room to respond carefully."
    ],
    [
      "도서관은 개관 전에 온라인 목록을 새 서버로 옮길 계획이었습니다. 최종 백업이 끝나면 시스템을 전환하고 9시에 이용자가 도착할 때는 정상 작동해야 했습니다.",
      "전송은 7시에 시작됐습니다. 기록을 복사한 뒤 검색과 대출 기능을 시험했는데 첫 시험이 끝나자마자 최근 반납 기록에서 오류가 나타났습니다. 날짜 필드 형식이 전송 중 바뀌었습니다.",
      "팀은 시간에 쫓겨 일했습니다. 기록 누락이 없음을 확인할 때까지 목록을 다시 열 수 없었습니다. 한 기술자는 필드를 고치고 다른 기술자는 합계를 비교했으며 8시 42분까지 모든 합계가 백업과 일치했습니다.",
      "이사가 증거를 받자마자 출시를 승인했고 목록은 8시 48분에 아슬아슬하게 다시 열렸습니다. 문이 열리자마자 첫 이용자가 책을 예약했습니다.",
      "팀은 이후 일정을 바꿨습니다. 앞으로 전송은 전날 저녁까지 끝내고 모든 시험이 통과될 때까지 공개 사이트는 이전 서버에 둡니다. 모든 이전 작업에는 결국 예상 밖 일이 생기며 좋은 일정은 신중하게 대응할 여지를 줍니다."
    ],
    [
      vocab("catalogue", "noun", "도서 목록", "검색과 예약에 쓰는 온라인 시스템"), vocab("backup", "noun", "백업", "문제에 대비해 보관한 데이터 사본"),
      vocab("transfer", "noun", "이전", "기록을 새 서버로 옮기는 작업"), vocab("functions", "noun", "기능들", "검색과 대출처럼 시스템이 하는 일"),
      vocab("field", "noun", "필드", "날짜 같은 한 종류의 데이터를 담는 칸"), vocab("totals", "noun", "합계", "누락 여부를 확인하려고 비교한 수치"),
      vocab("matched", "verb", "일치했다", "두 데이터 수가 같았던 상태"), vocab("approved", "verb", "승인했다", "출시를 공식 허가한 행동"),
      vocab("reserve", "verb", "예약하다", "책을 나중에 빌리도록 확보하는 것"), vocab("migration", "noun", "시스템 이전", "데이터와 서비스를 새 환경으로 옮기는 일")
    ],
    [
      quiz("I will call you when the meeting _____.", ["will end", "ends", "ended tomorrow", "ending"], 1, "미래 시간절에서는 현재형 ends를 씁니다."),
      quiz("Do not publish it until the client _____ it.", ["will approve", "has approved", "approve yesterday", "approving"], 1, "완료 후 게시한다는 뜻을 강조하므로 현재완료가 자연스럽습니다."),
      quiz("By the time we arrived, the talk _____.", ["starts", "had started", "will start", "has start"], 1, "도착보다 먼저 시작됐으므로 과거완료를 씁니다."),
      quiz("We worked _____ six, but we had finished _____ seven.", ["by / until", "until / by", "when / since", "by / for"], 1, "지속은 until, 마감 전 완료는 by입니다."),
      quiz("No sooner had we arrived _____ it began to rain.", ["when", "than", "until", "while"], 1, "no sooner는 than과 짝을 이룹니다."),
      quiz("What was the planned opening time?", ["Seven", "Eight", "Nine", "Ten"], 2, "이용자는 오전 9시에 도착할 예정이었습니다."),
      quiz("What caused the test error?", ["A missing server", "A changed date format", "A broken door", "A late reader"], 1, "전송 중 날짜 필드 형식이 바뀌었습니다."),
      quiz("Why could the team not reopen immediately?", ["The director was absent", "They had to confirm no records were missing", "The library was closed all day", "The backup had been deleted"], 1, "기록 누락 여부를 확인해야 했습니다."),
      quiz("When did the catalogue reopen?", ["8:42", "8:48", "9:12", "7:00"], 1, "오전 8시 48분에 재개됐습니다."),
      quiz("What scheduling change did the team make?", ["Start after opening", "Finish transfers the previous evening", "Stop making backups", "Test only search"], 1, "앞으로 이전을 전날 저녁까지 끝내기로 했습니다.")
    ],
    ["What tasks do you usually finish by a fixed time?", "When has something arrived in the nick of time for you?", "Explain a process using once, until and by the time.", "Why should technical schedules include extra time?", "Make a sentence beginning No sooner had ...."],
    rolePlay("A system must be transferred before a public opening.", "Explain the sequence, deadlines and a surprise using five time-clause structures.", "Act as the director and ask what had happened before each decision.", "Distinguish until from by and use one inverted no sooner or hardly sentence.")
  ),
  makeLesson(
    "adult", "2026-10-17", "Unreal Comparisons, Preferences, and It's Time",
    {
      title: "비현실적 비교와 선호: as if, would rather, it's time 뒤의 과거형",
      summary: "영어의 과거형은 과거 시간뿐 아니라 현재 사실과 거리를 두는 ‘비현실성’을 나타냅니다. as if/as though 뒤의 과거형은 사실과 다른 인상, would rather + 과거형은 다른 사람이 했으면 하는 현재·미래 행동, it's time + 과거형은 이미 해야 할 때가 됐다는 뜻입니다.",
      points: [
        point("as if / as though + 현재형", "말하는 사람이 그 상황을 사실이거나 충분히 가능한 것으로 볼 때 현재·현재완료를 사용할 수 있습니다.", [
          "It looks as if the train is delayed. — 기차가 지연된 것처럼 보입니다.",
          "She sounds as though she knows the answer. — 그녀는 답을 아는 것처럼 들립니다.",
          "It seems as if someone has moved the files. — 누군가 파일을 옮긴 것 같습니다.",
          "He talks as though he understands the process. — 그는 절차를 이해하는 듯 말합니다.",
          "The room feels as if the heating is still on. — 난방이 아직 켜진 것처럼 방이 느껴집니다."
        ]),
        point("as if / as though + 과거형", "현재 사실과 다르거나 가능성이 낮다고 느낄 때 과거형으로 거리를 둡니다. 격식 있는 표현에서는 모든 주어에 were를 쓸 수 있습니다.", [
          "He spends money as if he were a millionaire. — 그는 마치 백만장자인 것처럼 돈을 씁니다.",
          "She talks to me as though I were a child. — 그녀는 저를 아이인 것처럼 대합니다.",
          "The device looks as if it belonged in a museum. — 그 장치는 박물관에 있어야 할 것처럼 낡아 보입니다.",
          "They act as though the deadline did not matter. — 그들은 마감일이 중요하지 않은 것처럼 행동합니다.",
          "You sound as if you were standing in a tunnel. — 마치 터널에 서 있는 것처럼 목소리가 들립니다."
        ]),
        point("would rather + 동사원형", "주어 자신이 지금이나 미래에 선호하는 행동은 would rather + 동사원형으로 말합니다. 부정은 would rather not + 동사원형입니다.", [
          "I would rather wait for accurate figures. — 저는 정확한 수치를 기다리겠습니다.",
          "We would rather discuss this in person. — 우리는 이것을 직접 만나 논의하는 편이 낫겠습니다.",
          "She would rather not make a promise yet. — 그녀는 아직 약속하지 않는 편을 원합니다.",
          "Would you rather leave now or take the later train? — 지금 떠나겠어요, 아니면 늦은 기차를 타겠어요?",
          "I'd rather check twice than apologise later. — 나중에 사과하느니 두 번 확인하겠습니다."
        ]),
        point("would rather + 다른 주어 + 과거형", "다른 사람이 지금이나 미래에 다르게 행동하기를 바랄 때 would rather 뒤에 주어 + 과거형을 씁니다. 더 이전의 일을 바꾸고 싶으면 과거완료를 씁니다.", [
          "I'd rather you sent the draft tomorrow. — 초안은 내일 보내 주셨으면 합니다.",
          "We'd rather he did not mention the rumour. — 그가 그 소문을 언급하지 않았으면 합니다.",
          "Would you rather I called before I came? — 제가 오기 전에 전화하는 편이 좋겠나요?",
          "She'd rather we had checked with her first. — 그녀는 우리가 먼저 자신에게 확인했기를 바랍니다.",
          "They would rather the meeting started at ten. — 그들은 회의가 10시에 시작했으면 합니다."
        ]),
        point("it's time / high time + 과거형", "지금 해야 할 일이 이미 늦었거나 충분히 때가 됐다는 뜻으로 과거형을 씁니다. it's time to do와 달리 누가 행동해야 하는지 주어를 넣을 수 있습니다.", [
          "It's time we replaced the old system. — 이제는 낡은 시스템을 교체할 때입니다.",
          "It's high time the rules were clarified. — 규칙을 명확히 할 때가 진작 됐습니다.",
          "Isn't it time you took a break? — 이제 좀 쉴 때가 되지 않았나요?",
          "It's time to leave. — 이제 떠날 시간입니다.",
          "It is about time the council listened to residents. — 의회가 주민 의견을 들을 때가 됐습니다."
        ])
      ]
    },
    [
      idiom("live in the real world", "현실을 직시하다", "We need a plan that works in the real world. — 현실에서 작동하는 계획이 필요합니다."),
      idiom("long overdue", "진작 했어야 하는", "The safety review is long overdue. — 안전 검토는 진작 했어야 합니다."),
      idiom("have it your way", "당신 뜻대로 하다", "We can have it your way, but we should record the risk. — 당신 뜻대로 할 수 있지만 위험은 기록해야 합니다.")
    ],
    "The Office That Pretended Winter Had Not Arrived",
    [
      "By mid-October, the office heating sounded as though it were working hard, but several rooms remained cold. Staff wore coats at their desks. The facilities manager spoke as if the problem were minor, although temperature records showed otherwise.",
      "Some employees would rather work from home until the system was repaired. Others preferred a temporary heater. The manager said he would rather wait for the annual service, which was still three weeks away.",
      "At a staff meeting, Maya said, “It's high time we treated this as a health issue.” She would rather the company arranged an inspection immediately. A colleague added that the organisation behaved as though winter arrived by surprise every year.",
      "The director examined the records and agreed that the inspection was long overdue. She said she would rather the manager had reported the falling temperatures earlier, but she focused on the solution. An engineer found a faulty sensor that made the boiler behave as if the building were warm.",
      "The sensor was replaced that afternoon. The office did not become tropical, nor did anyone expect it to, but it reached a safe temperature. The company introduced weekly checks, accepting that plans must work in the real world rather than depend on convenient assumptions."
    ],
    [
      "10월 중순 사무실 난방은 열심히 작동하는 소리가 났지만 여러 방은 계속 추웠고 직원들은 외투를 입고 일했습니다. 시설 관리자는 기록과 달리 문제가 사소한 것처럼 말했습니다.",
      "일부 직원은 수리될 때까지 재택근무를 원했고 다른 직원은 임시 난방기를 선호했습니다. 관리자는 아직 3주 남은 정기 점검을 기다리는 편이 낫다고 했습니다.",
      "직원 회의에서 Maya는 이 문제를 건강 문제로 다룰 때가 진작 됐다고 말하며 즉시 점검을 마련했으면 한다고 했습니다. 한 동료는 회사가 매년 겨울이 갑자기 오는 것처럼 행동한다고 덧붙였습니다.",
      "이사는 기록을 보고 점검이 진작 이뤄졌어야 한다고 동의했습니다. 관리자가 기온 하락을 더 일찍 보고했기를 바랐지만 해결에 집중했습니다. 기술자는 건물이 따뜻한 것처럼 보일러를 작동시키는 고장 센서를 찾았습니다.",
      "센서는 그날 오후 교체됐습니다. 사무실이 열대처럼 따뜻해진 것은 아니지만 안전한 온도에 도달했습니다. 회사는 편리한 가정이 아니라 현실에서 작동하는 계획을 위해 매주 점검을 도입했습니다."
    ],
    [
      vocab("heating", "noun", "난방", "사무실을 따뜻하게 하는 시스템"), vocab("temperature", "noun", "온도", "방이 얼마나 따뜻하거나 차가운지 나타내는 수치"),
      vocab("facilities", "noun", "시설 관리", "건물과 설비를 관리하는 업무"), vocab("temporary", "adjective", "임시의", "수리 전 짧게 사용하는 대안"),
      vocab("inspection", "noun", "점검", "장비 상태를 자세히 확인하는 일"), vocab("overdue", "adjective", "기한이 지난", "이미 했어야 하지만 늦어진 상태"),
      vocab("faulty", "adjective", "고장 난", "정상적으로 작동하지 않는"), vocab("sensor", "noun", "센서", "온도를 감지하는 장치"),
      vocab("boiler", "noun", "보일러", "건물에 열을 공급하는 장비"), vocab("assumptions", "noun", "가정들", "증거 없이 사실로 여긴 생각")
    ],
    [
      quiz("He spends as if he _____ a millionaire.", ["is", "were", "has been certainly", "will be"], 1, "현재 사실과 다른 비교에는 과거형 were가 자연스럽습니다."),
      quiz("I would rather _____ for the confirmed result.", ["waiting", "to wait", "wait", "waited"], 2, "주어 자신의 선호는 would rather + 동사원형입니다."),
      quiz("I'd rather you _____ the draft tomorrow.", ["send", "sent", "will send", "sending"], 1, "다른 사람의 현재·미래 행동에 대한 선호는 과거형을 씁니다."),
      quiz("It's high time we _____ the old system.", ["replace", "replaced", "will replace", "replacing"], 1, "it's high time 뒤에는 비현실적 과거형을 씁니다."),
      quiz("She'd rather we _____ her before the announcement.", ["ask", "had asked", "will ask", "asking"], 1, "이미 지나간 행동에 대한 선호는 과거완료를 씁니다."),
      quiz("What showed that the heating problem was serious?", ["The manager's opinion", "Temperature records", "The annual service", "A tropical room"], 1, "실제 온도 기록이 여러 방의 추위를 보여 줬습니다."),
      quiz("What did some staff prefer?", ["Working at home temporarily", "Cancelling winter", "Opening every window", "Waiting three months"], 0, "수리 전까지 재택근무를 선호한 직원들이 있었습니다."),
      quiz("What did Maya say was overdue?", ["A party", "Treating the cold as a health issue", "Buying coats", "Changing the calendar"], 1, "건강 문제로 다룰 때가 진작 됐다고 말했습니다."),
      quiz("What caused the boiler problem?", ["A faulty sensor", "No electricity", "Open doors", "Staff coats"], 0, "고장 난 센서가 건물이 따뜻하다고 잘못 감지했습니다."),
      quiz("What preventive step followed?", ["Annual complaints", "Weekly checks", "Permanent remote work", "Removing the boiler"], 1, "회사는 매주 난방 점검을 도입했습니다.")
    ],
    ["What change in your routine is long overdue?", "Would you rather work in a cool or warm room? Why?", "Describe something that looks as if it were something else.", "What would you rather another person did this week?", "When should an organisation stop relying on assumptions?"],
    rolePlay("An office has ignored a recurring heating problem.", "Describe appearances, state your preference and argue that action is overdue.", "Act as the facilities manager and respond to requests from staff.", "Use as if, two would rather patterns and it's high time, then repeat corrected sentences.")
  ),
  makeLesson(
    "adult", "2026-10-18", "Articles in Generic, Institutional, and Fixed Expressions",
    {
      title: "관사 심화: 일반 개념·기관의 기능·고유한 대상을 구분하기",
      summary: "관사는 명사의 종류뿐 아니라 화자가 대상을 어떻게 바라보는지 보여 줍니다. 복수·불가산 명사의 일반 의미에는 무관사, 특정 집단에는 the를 쓰며, school/hospital/prison 같은 장소는 본래 기능을 이용할 때 무관사가 가능합니다. 교통·식사·신체 부위의 관습적 표현도 함께 구분합니다.",
      points: [
        point("일반 복수·불가산 명사에는 무관사", "한 종류 전체나 일반 개념을 말할 때 복수 가산명사와 불가산명사 앞에 관사를 쓰지 않습니다.", [
          "Libraries provide access to information. — 도서관은 정보 접근을 제공합니다.",
          "Patience is essential when teaching beginners. — 초보자를 가르칠 때 인내가 필수입니다.",
          "Electric cars are becoming more common. — 전기차가 점점 흔해지고 있습니다.",
          "Research takes time. — 연구에는 시간이 걸립니다.",
          "Children learn through play. — 아이들은 놀이를 통해 배웁니다."
        ]),
        point("특정 집단·이미 언급된 대상에는 the", "뒤의 수식어나 문맥이 범위를 특정하면 복수·불가산 명사에도 the를 씁니다.", [
          "The libraries in this district close at six. — 이 지역의 도서관들은 6시에 닫습니다.",
          "The information you sent was useful. — 당신이 보낸 정보는 유용했습니다.",
          "The children in the front row asked questions. — 앞줄의 아이들이 질문했습니다.",
          "I bought a guide, and the guide includes a map. — 안내서를 샀는데 그 안내서에는 지도가 있습니다.",
          "The research conducted last year changed the policy. — 작년에 수행된 연구가 정책을 바꿨습니다."
        ]),
        point("school, hospital, prison, bed의 기능과 건물", "사람이 기관의 본래 목적을 이용할 때 British English에서는 무관사가 흔합니다. 특정 건물이나 방문 장소를 말하면 the를 씁니다.", [
          "The children are at school. — 아이들은 수업을 받으러 학교에 있습니다.",
          "Their parents are waiting outside the school. — 부모들은 그 학교 건물 밖에서 기다립니다.",
          "He was taken to hospital after the accident. — 그는 사고 뒤 치료를 받으러 병원으로 이송됐습니다.",
          "I went to the hospital to visit him. — 저는 그를 방문하러 그 병원에 갔습니다.",
          "She stayed in bed while the nurse changed the bed. — 간호사가 침대를 정리하는 동안 그녀는 잠자리에 누워 있었습니다."
        ]),
        point("교통·식사·매체의 고정 표현", "by + 교통수단과 have + 식사에는 보통 무관사입니다. 특정 교통편·식사에는 a/the를 쓰며, 매체 표현은 관습이 다릅니다.", [
          "We travelled by train but took the bus home. — 기차로 갔지만 집에는 그 버스를 탔습니다.",
          "They had lunch at noon. — 그들은 정오에 점심을 먹었습니다.",
          "The lunch served at the conference was excellent. — 회의에서 제공된 점심은 훌륭했습니다.",
          "I heard the news on the radio. — 저는 라디오에서 그 소식을 들었습니다.",
          "She found the timetable on the internet. — 그녀는 인터넷에서 시간표를 찾았습니다."
        ]),
        point("신체 부위와 악기·발명품", "누군가의 신체 부위를 문맥상 분명하게 가리킬 때 take/grab/hit + 사람 + by/on + the body part 구조가 가능합니다. 악기 연주와 종 전체를 대표하는 발명품에는 the가 흔합니다.", [
          "The nurse took him by the arm. — 간호사가 그의 팔을 잡았습니다.",
          "The ball hit her on the shoulder. — 공이 그녀의 어깨에 맞았습니다.",
          "She plays the violin in an orchestra. — 그녀는 오케스트라에서 바이올린을 연주합니다.",
          "The smartphone has changed how people travel. — 스마트폰은 사람들의 여행 방식을 바꿨습니다.",
          "He looked me in the eye and answered honestly. — 그는 제 눈을 똑바로 보고 정직하게 답했습니다."
        ])
      ]
    },
    [
      idiom("in the public eye", "대중의 주목을 받는", "Decisions made in the public eye need clear explanations. — 대중의 주목 속에서 내린 결정은 명확한 설명이 필요합니다."),
      idiom("get the picture", "상황을 이해하다", "After seeing the map, I got the picture. — 지도를 보고 상황을 이해했습니다."),
      idiom("on the right track", "올바른 방향으로 가는", "The first results suggest we are on the right track. — 첫 결과는 우리가 올바른 방향이라는 것을 보여 줍니다.")
    ],
    "Why One Missing Article Changed the Visit",
    [
      "A visitor guide told families that children would be ‘at school’ during the morning. Most local readers understood that the children would be attending lessons. A translated notice, however, said that parents should meet them ‘at the school’, meaning a particular building.",
      "The difference mattered because the class was not in its usual building. The children had travelled by bus to a science centre, where they were taking part in a school programme. Parents who went to the school found locked gates and no staff.",
      "The centre corrected the message: children would be at the science centre for lessons, and parents should collect them from the main entrance. It also explained that anyone needing medical help would be taken to hospital, while family visitors should go to the hospital named in the emergency notice.",
      "Once parents saw the revised map, they got the picture. The organisation reviewed other fixed expressions, including by bus, at lunch and on the internet. Small articles were no longer treated as decoration; they were recognised as signals of general function or specific reference.",
      "The guide is now on the right track. Every place is checked from the reader's point of view: is this an activity, an institution's normal purpose or one identifiable building? That short question has made directions clearer and reduced confusion for families."
    ],
    [
      "방문 안내문은 오전에 아이들이 ‘at school’, 즉 수업 중일 것이라고 알렸습니다. 그러나 번역 공지는 부모가 특정 학교 건물에서 만나야 한다는 뜻의 ‘at the school’을 사용했습니다.",
      "반이 평소 학교 건물에 있지 않았기 때문에 차이가 중요했습니다. 아이들은 버스를 타고 과학 센터에 가서 학교 프로그램에 참여 중이었습니다. 학교로 간 부모들은 잠긴 문과 아무도 없는 모습을 봤습니다.",
      "센터는 아이들이 과학 센터에서 수업을 받고 부모는 정문에서 데려가야 한다고 바로잡았습니다. 치료가 필요한 사람은 병원으로 이송되고 가족 방문자는 응급 공지에 적힌 특정 병원으로 가야 한다고도 설명했습니다.",
      "수정 지도를 본 부모들은 상황을 이해했습니다. 조직은 by bus, at lunch, on the internet 같은 고정 표현도 검토했습니다. 작은 관사를 장식이 아니라 일반 기능과 특정 대상을 구분하는 신호로 인식했습니다.",
      "안내문은 이제 올바른 방향으로 가고 있습니다. 각 장소가 활동인지, 기관의 본래 기능인지, 식별 가능한 건물인지 독자 관점에서 확인합니다. 이 짧은 질문이 길 안내를 명확하게 하고 혼란을 줄였습니다."
    ],
    [
      vocab("translated", "adjective", "번역된", "다른 언어로 옮겨진 공지"), vocab("particular", "adjective", "특정한", "여러 곳 중 하나로 식별되는"),
      vocab("usual", "adjective", "평소의", "보통 이용하는 학교 건물"), vocab("science", "noun", "과학", "센터에서 진행한 학습 분야"),
      vocab("locked", "adjective", "잠긴", "문을 열 수 없는 상태"), vocab("collect", "verb", "데리러 가다", "아이를 만나 함께 돌아오는 행동"),
      vocab("medical", "adjective", "의료의", "치료와 건강에 관련된"), vocab("revised", "adjective", "수정된", "오류를 바로잡아 새로 만든"),
      vocab("reference", "noun", "지칭", "말하는 대상이 무엇인지 가리키는 방식"), vocab("identifiable", "adjective", "식별 가능한", "어느 하나인지 알 수 있는")
    ],
    [
      quiz("_____ information is useful, but _____ information you sent was especially helpful.", ["The / —", "— / the", "An / an", "A / the"], 1, "일반 정보는 무관사, 특정한 당신의 정보는 the를 씁니다."),
      quiz("The children are at _____, but their parents are outside _____ school.", ["the school / school", "school / the", "a school / —", "school / —"], 1, "수업 활동은 무관사, 특정 건물은 the school입니다."),
      quiz("We travelled by _____ and took _____ bus home.", ["the train / —", "train / the", "a train / a", "train / —"], 1, "by train은 무관사이고 특정 귀가 버스는 the bus입니다."),
      quiz("She plays _____ violin.", ["a", "an", "the", "—"], 2, "악기 연주에는 보통 the를 씁니다."),
      quiz("The nurse took him by _____ arm.", ["his only", "an", "the", "—"], 2, "take someone by the arm 구조에서 the를 씁니다."),
      quiz("Where were the children actually studying?", ["At their usual school", "At a science centre", "In hospital", "On the internet"], 1, "과학 센터의 학교 프로그램에 참여 중이었습니다."),
      quiz("Why were some parents confused?", ["The bus was late", "The article suggested the usual building", "The map was too colourful", "The centre had no entrance"], 1, "at the school이 특정 학교 건물을 가리켰기 때문입니다."),
      quiz("Where should parents collect the children?", ["The locked gate", "The science centre's main entrance", "The hospital", "The bus station"], 1, "과학 센터 정문으로 안내가 수정됐습니다."),
      quiz("What did the organisation review?", ["Only medical words", "Fixed expressions and article choices", "Bus prices", "Lesson marks"], 1, "고정 표현과 관사 사용을 함께 점검했습니다."),
      quiz("What question now guides editors?", ["Is the noun long?", "Is it a function or a specific building?", "Is the font blue?", "Is the reader a child?"], 1, "기능·기관 본래 목적·특정 건물 중 무엇인지 확인합니다.")
    ],
    ["Which article rules cause you the most difficulty?", "Explain the difference between at school and at the school.", "How do you usually travel to work or school?", "Describe one general idea and one specific example with articles.", "Why can a very small word change practical instructions?"],
    rolePlay("A visitor guide uses articles inconsistently for school, hospital and transport.", "Clarify each location and rewrite five directions from the reader's point of view.", "Act as an editor and ask whether each noun is general, functional or specifically identified.", "Use zero article, a/an and the accurately and repeat corrected instructions.")
  )
];

const student = [
  makeLesson(
    "student", "2026-10-12", "Present Simple Questions and Negatives with Do / Does",
    {
      title: "Do you ...? / She doesn't ...: 습관을 묻고 부정하기",
      summary: "현재단순은 습관과 반복되는 일을 말합니다. 질문에서는 Do/Does를 주어 앞에 두고, 부정문에서는 don't/doesn't를 씁니다. does나 doesn't가 이미 3인칭 단수 표시를 가지므로 뒤의 본동사는 항상 원형입니다. A1에서는 짧은 질문과 답을, A2에서는 의문사와 이유를 붙인 문장을 연습합니다.",
      points: [
        point("Do + I/you/we/they ...?", "I, you, we, they와 복수 주어의 현재 습관을 물을 때 Do를 앞에 둡니다.", [
          "[A1] Do you walk to school? — 너는 걸어서 학교에 가니?",
          "[A1] Do they play chess? — 그들은 체스를 두니?",
          "[A1] Do we need our books? — 우리 책이 필요하니?",
          "[A2] Do your friends study together after class? — 네 친구들은 수업 뒤 함께 공부하니?",
          "[A2] Do you usually help at home before dinner? — 너는 보통 저녁 전에 집안일을 돕니?"
        ]),
        point("Does + he/she/it ...?", "he, she, it 또는 한 사람·사물에는 Does를 씁니다. 뒤의 동사는 -s 없이 원형입니다.", [
          "[A1] Does Mina like science? — Mina는 과학을 좋아하니?",
          "[A1] Does your bus stop here? — 네 버스는 여기 서니?",
          "[A1] Does he read every night? — 그는 매일 밤 책을 읽니?",
          "[A2] Does the library open before school starts? — 도서관은 학교가 시작하기 전에 여니?",
          "[A2] Does your brother practise the piano at weekends? — 네 남동생은 주말에 피아노를 연습하니?"
        ]),
        point("don't / doesn't", "현재 습관을 부정할 때 do not/don't 또는 does not/doesn't를 씁니다. doesn't 뒤에도 동사원형이 옵니다.", [
          "[A1] I don't drink coffee. — 저는 커피를 마시지 않아요.",
          "[A1] She doesn't eat meat. — 그녀는 고기를 먹지 않아요.",
          "[A1] We don't have class on Sunday. — 우리는 일요일에 수업이 없어요.",
          "[A2] My dad doesn't drive to work because he takes the train. — 아빠는 기차를 타서 운전해 출근하지 않아요.",
          "[A2] The club doesn't meet when the school is closed. — 학교가 문을 닫으면 동아리는 모이지 않아요."
        ]),
        point("짧은 대답", "Yes, 주어 + do/does 또는 No, 주어 + don't/doesn't로 답합니다. 본동사를 다시 말하지 않아도 됩니다.", [
          "[A1] Do you swim? Yes, I do. — 수영하니? 응, 해.",
          "[A1] Does she cook? No, she doesn't. — 그녀는 요리하니? 아니, 안 해.",
          "[A1] Do they live nearby? Yes, they do. — 그들은 근처에 사니? 응, 그래.",
          "[A2] Does the shop close at six? No, it doesn't. — 그 가게는 6시에 닫나요? 아니요.",
          "[A2] Do your parents speak English at work? Yes, they do. — 부모님은 직장에서 영어를 쓰시니? 네."
        ]),
        point("의문사 + do/does", "what, where, when, why, how often 뒤에 do/does + 주어 + 동사원형을 붙여 자세한 정보를 묻습니다.", [
          "[A1] Where do you live? — 너는 어디에 사니?",
          "[A1] What does he eat for breakfast? — 그는 아침으로 무엇을 먹니?",
          "[A1] When do they finish school? — 그들은 언제 학교를 마치니?",
          "[A2] How often does your class use the computer room? — 네 반은 컴퓨터실을 얼마나 자주 이용하니?",
          "[A2] Why don't you join the reading club? — 독서 동아리에 가입하는 게 어때?"
        ])
      ]
    },
    [
      idiom("How often?", "얼마나 자주?", "How often do you visit the library? — 도서관에 얼마나 자주 가니?"),
      idiom("Not really.", "별로 그렇지 않아.", "Do you like early mornings? Not really. — 이른 아침을 좋아하니? 별로."),
      idiom("Why not?", "왜 안 돼? / 한번 해 보지 그래?", "Let's join the club. Why not? — 동아리에 가입하자. 좋아!")
    ],
    "The Monday Reading Club",
    [
      "Mina likes stories, but she doesn't read alone every day. On Mondays, she goes to the school reading club with two friends.",
      "The club meets in the library after class. Does it start at three? No, it doesn't. It starts at half past three.",
      "Mr Park leads the club. He doesn't choose every book. The students choose many of them. They usually read a short story first.",
      "After reading, Mr Park asks, “What does the main character want?” and “Why do the characters make that choice?” Everyone gives a short answer.",
      "Mina doesn't always agree with her friends, but she listens carefully. Does she enjoy the club? Yes, she does, because every Monday brings a new story."
    ],
    [
      "Mina는 이야기를 좋아하지만 매일 혼자 읽지는 않습니다. 월요일에는 두 친구와 학교 독서 동아리에 갑니다.",
      "동아리는 방과 후 도서관에서 모입니다. 3시에 시작하나요? 아니요. 3시 30분에 시작합니다.",
      "Park 선생님이 동아리를 이끕니다. 선생님이 모든 책을 고르지는 않고 학생들이 많은 책을 고릅니다. 보통 먼저 짧은 이야기를 읽습니다.",
      "읽은 뒤 선생님은 주인공이 무엇을 원하는지, 인물들이 왜 그런 선택을 하는지 묻습니다. 모두 짧게 답합니다.",
      "Mina는 친구들과 항상 같은 생각은 아니지만 잘 듣습니다. 동아리를 좋아하나요? 네, 매주 월요일 새 이야기를 만나서 좋아합니다."
    ],
    [
      vocab("alone", "adverb", "혼자", "다른 사람 없이 읽는 방식"), vocab("club", "noun", "동아리", "같은 관심사를 가진 학생 모임"),
      vocab("meets", "verb", "모인다", "정해진 시간에 함께 만나는 것"), vocab("library", "noun", "도서관", "독서 동아리가 모이는 장소"),
      vocab("leads", "verb", "이끈다", "모임을 진행하는 행동"), vocab("choose", "verb", "고르다", "여러 책 중 하나를 정하는 것"),
      vocab("character", "noun", "등장인물", "이야기 속 사람"), vocab("choice", "noun", "선택", "여러 가능성 중 고른 것"),
      vocab("agree", "verb", "동의하다", "다른 사람과 같은 생각을 가지다"), vocab("brings", "verb", "가져온다", "매주 새 이야기를 만나게 하는 것")
    ],
    [
      quiz("_____ you walk to school?", ["Does", "Do", "Are", "Is"], 1, "you의 현재단순 질문은 Do로 시작합니다."),
      quiz("Does Mina _____ science?", ["likes", "like", "liking", "liked"], 1, "Does 뒤에는 동사원형 like를 씁니다."),
      quiz("He _____ eat meat.", ["don't", "doesn't", "isn't", "not does"], 1, "he의 현재단순 부정은 doesn't + 동사원형입니다."),
      quiz("Do they play chess? Yes, they _____.", ["play", "are", "do", "does"], 2, "Do 질문의 짧은 긍정 답은 Yes, they do입니다."),
      quiz("_____ does the club meet? On Mondays.", ["What", "Where", "When", "Who"], 2, "요일을 물으므로 When이 알맞습니다."),
      quiz("Where does the club meet?", ["In the hall", "In the library", "At Mina's house", "Outside"], 1, "동아리는 도서관에서 모입니다."),
      quiz("What time does it start?", ["Three", "Half past three", "Four", "Half past four"], 1, "3시 30분에 시작합니다."),
      quiz("Who chooses many of the books?", ["Only Mr Park", "The students", "Mina's parents", "The librarian only"], 1, "학생들이 많은 책을 고릅니다."),
      quiz("What does Mr Park ask about?", ["The weather", "Characters and choices", "School lunch", "Sports"], 1, "주인공의 바람과 인물의 선택을 묻습니다."),
      quiz("Why does Mina enjoy the club?", ["There is no reading", "It brings a new story each week", "She always agrees", "It starts at three"], 1, "매주 새로운 이야기를 읽기 때문입니다.")
    ],
    ["Do you read every day?", "What does your family do on Mondays?", "How often do you visit a library?", "Which school club do you like, and why?", "Ask a friend three questions with do or does."],
    rolePlay("You want to learn about a school reading club.", "Ask when and where it meets, what students do and whether a friend likes it.", "Answer first with A1 short answers, then add an A2 reason or detail.", "Use do/does, don't/doesn't and two question words accurately.")
  ),
  makeLesson(
    "student", "2026-10-13", "Present Simple or Present Continuous",
    {
      title: "I do / I'm doing: 평소 습관과 지금 행동 구분하기",
      summary: "현재단순은 평소 습관·사실을, 현재진행은 말하는 지금 또는 임시로 진행 중인 행동을 나타냅니다. usually, every day는 현재단순과 자주 쓰이고 now, at the moment는 현재진행과 어울립니다. 상태동사 know, like, need는 보통 진행형으로 쓰지 않습니다.",
      points: [
        point("현재단순: 습관과 사실", "반복되는 일과 늘 참인 사실에는 동사 현재형을 씁니다. he/she/it에는 보통 -s를 붙입니다.", [
          "[A1] I walk to school every day. — 저는 매일 걸어서 학교에 가요.",
          "[A1] She plays tennis on Fridays. — 그녀는 금요일마다 테니스를 쳐요.",
          "[A1] Water boils at 100°C. — 물은 100도에서 끓어요.",
          "[A2] My father usually works from home on Monday. — 아빠는 보통 월요일에 재택근무를 해요.",
          "[A2] The school bus leaves at seven every morning. — 학교 버스는 매일 아침 7시에 출발해요."
        ]),
        point("현재진행: 지금 하는 행동", "말하는 순간 진행 중인 행동은 am/is/are + -ing로 표현합니다.", [
          "[A1] I am doing my homework now. — 저는 지금 숙제를 하고 있어요.",
          "[A1] They are waiting outside. — 그들은 밖에서 기다리고 있어요.",
          "[A1] She is talking to her teacher. — 그녀는 선생님과 이야기하고 있어요.",
          "[A2] We are watching the rain from the classroom. — 우리는 교실에서 비를 보고 있어요.",
          "[A2] Why are you carrying two umbrellas? — 왜 우산을 두 개 들고 있니?"
        ]),
        point("임시 상황과 변화", "바로 이 순간이 아니어도 요즘 임시로 하는 일이나 변하는 상황은 현재진행을 쓸 수 있습니다.", [
          "[A1] I am staying with my aunt this week. — 저는 이번 주 이모 집에 머물고 있어요.",
          "[A1] He is learning to swim this month. — 그는 이번 달 수영을 배우고 있어요.",
          "[A2] Our class is using a different room this week. — 우리 반은 이번 주 다른 교실을 쓰고 있어요.",
          "[A2] The days are getting shorter. — 낮이 점점 짧아지고 있어요.",
          "[A2] More students are bringing lunch from home these days. — 요즘 더 많은 학생이 집에서 점심을 가져오고 있어요."
        ]),
        point("시간 표현으로 시제 고르기", "always, often, every day는 현재단순을, now, today, at the moment는 현재진행을 알려 주는 단서가 됩니다. 뜻을 먼저 확인하세요.", [
          "[A1] We usually eat at twelve. — 우리는 보통 12시에 먹어요.",
          "[A1] We are eating early today. — 우리는 오늘 일찍 먹고 있어요.",
          "[A1] He often rides his bike. — 그는 자주 자전거를 타요.",
          "[A2] He is taking the bus today because it is raining. — 비가 와서 그는 오늘 버스를 타고 있어요.",
          "[A2] At the moment, the team is practising in the hall. — 지금 팀은 강당에서 연습 중이에요."
        ]),
        point("상태동사는 보통 현재단순", "know, like, love, want, need, understand, believe는 상태를 나타내므로 보통 진행형 대신 현재단순을 씁니다.", [
          "[A1] I know the answer. — 저는 답을 알아요.",
          "[A1] She likes this song. — 그녀는 이 노래를 좋아해요.",
          "[A1] We need more paper. — 우리는 종이가 더 필요해요.",
          "[A2] I understand the question, but I don't know the word. — 질문은 이해하지만 그 단어는 몰라요.",
          "[A2] Do you want to join us, or do you need more time? — 우리와 함께할래, 아니면 시간이 더 필요하니?"
        ])
      ]
    },
    [
      idiom("right now", "바로 지금", "I can't talk right now; I'm studying. — 지금은 말할 수 없어. 공부 중이야."),
      idiom("these days", "요즘", "I am reading more these days. — 요즘 책을 더 많이 읽고 있어요."),
      idiom("as usual", "평소처럼", "The bus is arriving at seven, as usual. — 버스는 평소처럼 7시에 도착해요.")
    ],
    "A Different Tuesday Morning",
    [
      "Joon usually rides his bike to school. He leaves home at seven thirty and meets Leo near the park.",
      "Today is different. Rain is falling heavily, so Joon is taking the bus. He is waiting at the stop with his blue umbrella.",
      "Leo usually brings a small lunch box, but today he is carrying a large bag. His class is making fruit salad, and he has six oranges inside.",
      "At school, students normally start with maths. This week, they are using the morning lessons for a science project. They are building simple weather tools.",
      "Joon likes different days because they make him notice his normal routine. Right now, he is drawing a rain gauge, but he still knows that tomorrow will probably be more usual."
    ],
    [
      "Joon은 보통 자전거를 타고 학교에 갑니다. 7시 30분에 집을 나서 공원 근처에서 Leo를 만납니다.",
      "오늘은 다릅니다. 비가 많이 내려 버스를 타고 있으며 파란 우산을 들고 정류장에서 기다립니다.",
      "Leo는 보통 작은 도시락을 가져오지만 오늘은 큰 가방을 들고 있습니다. 반에서 과일 샐러드를 만들 예정이라 안에 오렌지 여섯 개가 있습니다.",
      "학교에서는 보통 수학으로 시작하지만 이번 주는 아침 수업에 과학 프로젝트를 하고 있습니다. 간단한 기상 도구를 만드는 중입니다.",
      "Joon은 색다른 날이 평소 일상을 알아차리게 해서 좋아합니다. 지금은 우량계를 그리고 있지만 내일은 아마 더 평소 같을 것임을 압니다."
    ],
    [
      vocab("usually", "adverb", "보통", "자주 반복되는 일을 말하는 단어"), vocab("heavily", "adverb", "많이", "비가 강하게 내리는 모습"),
      vocab("umbrella", "noun", "우산", "비를 피하려고 쓰는 물건"), vocab("carrying", "verb", "들고 있는", "가방을 가지고 이동하는 행동"),
      vocab("fruit", "noun", "과일", "샐러드에 넣는 음식"), vocab("normally", "adverb", "평소에는", "일반적인 일과를 말하는 단어"),
      vocab("project", "noun", "프로젝트", "여러 시간 동안 함께 하는 학습 활동"), vocab("building", "verb", "만들고 있는", "도구를 조립하는 진행 행동"),
      vocab("routine", "noun", "일상", "자주 반복하는 생활 방식"), vocab("gauge", "noun", "측정기", "비의 양을 재는 도구")
    ],
    [
      quiz("Joon usually _____ his bike.", ["ride", "rides", "is ride", "riding"], 1, "평소 습관이고 Joon은 3인칭 단수이므로 rides입니다."),
      quiz("It _____ heavily right now.", ["rains every day", "is raining", "rain", "raining is"], 1, "지금 진행 중인 행동은 is raining입니다."),
      quiz("We _____ a different room this week.", ["use always", "are using", "uses", "using"], 1, "이번 주의 임시 상황은 현재진행이 자연스럽습니다."),
      quiz("Choose the correct state verb sentence.", ["I am knowing the answer.", "I know the answer.", "I knowing the answer.", "I do knowing the answer."], 1, "know는 보통 진행형으로 쓰지 않습니다."),
      quiz("He often _____, but today he _____ the bus.", ["cycles / is taking", "is cycling / takes", "cycle / taking", "cycles / takes now"], 0, "습관은 현재단순, 오늘의 임시 행동은 현재진행입니다."),
      quiz("How does Joon usually go to school?", ["By bus", "By bike", "On foot", "By train"], 1, "보통 자전거를 탑니다."),
      quiz("Why is he taking the bus today?", ["His bike is small", "It is raining heavily", "He is late", "Leo has oranges"], 1, "비가 많이 오기 때문입니다."),
      quiz("What is Leo carrying?", ["A small book", "A large bag", "A weather tool", "Two umbrellas"], 1, "과일을 담은 큰 가방을 들고 있습니다."),
      quiz("What is the class doing this week?", ["Only maths", "A science project", "A sports test", "A reading club"], 1, "아침 시간에 과학 프로젝트를 합니다."),
      quiz("What is Joon drawing now?", ["A bicycle", "A rain gauge", "An orange", "A bus stop"], 1, "현재 우량계를 그리고 있습니다.")
    ],
    ["How do you usually travel to school or work?", "What are you doing right now?", "Is your routine changing these days?", "What do you normally eat for breakfast?", "Say one usual action and one different action today."],
    rolePlay("Today is different from your normal school day.", "Describe three usual routines and three things happening today.", "Ask simple A1 questions first, then ask A2 follow-up questions with why or because.", "Choose present simple or continuous accurately and avoid continuous forms of know, like and need.")
  ),
  makeLesson(
    "student", "2026-10-14", "Have Got / Has Got and Have",
    {
      title: "I've got / I have: 소유와 특징 말하기",
      summary: "have got과 have는 현재의 소유, 가족관계, 특징을 말할 때 비슷한 뜻입니다. British English 회화에서는 have got이 매우 흔합니다. have got의 질문은 Have/Has를 앞으로 보내지만 일반동사 have의 질문은 Do/Does를 사용합니다. 과거에는 had를 씁니다.",
      points: [
        point("have got / has got", "I/you/we/they에는 have got, he/she/it에는 has got을 씁니다. 줄임말 I've got, she's got도 자주 씁니다.", [
          "[A1] I have got a new notebook. — 저는 새 공책이 있어요.",
          "[A1] She has got two brothers. — 그녀는 남자 형제가 두 명 있어요.",
          "[A1] We've got a small garden. — 우리는 작은 정원이 있어요.",
          "[A2] The classroom has got three large windows. — 교실에는 큰 창문이 세 개 있어요.",
          "[A2] My phone has got a useful dictionary app. — 제 휴대전화에는 유용한 사전 앱이 있어요."
        ]),
        point("haven't got / hasn't got", "소유하지 않았다고 말할 때 haven't got 또는 hasn't got을 씁니다.", [
          "[A1] I haven't got a ruler. — 저는 자가 없어요.",
          "[A1] He hasn't got a bicycle. — 그는 자전거가 없어요.",
          "[A1] We haven't got enough chairs. — 의자가 충분하지 않아요.",
          "[A2] Maya hasn't got her sports shoes today. — Maya는 오늘 운동화를 가지고 오지 않았어요.",
          "[A2] This tablet hasn't got a camera on the back. — 이 태블릿은 뒤쪽 카메라가 없어요."
        ]),
        point("Have/Has ... got?", "have got 질문에서는 Have/Has를 주어 앞으로 옮깁니다. 짧게 Yes, I have / No, she hasn't처럼 답합니다.", [
          "[A1] Have you got a pen? — 펜이 있니?",
          "[A1] Has he got a pet? — 그는 반려동물이 있니?",
          "[A1] Have they got tickets? — 그들은 표가 있니?",
          "[A2] Has your school got a science lab? — 네 학교에는 과학실이 있니?",
          "[A2] Have we got enough time to finish? — 우리에게 끝낼 시간이 충분하니?"
        ]),
        point("have와 do/does 질문", "일반동사 have도 소유를 말할 수 있습니다. 질문·부정에서는 Do you have ...? / She doesn't have ...를 사용합니다.", [
          "[A1] I have a blue bag. — 저는 파란 가방이 있어요.",
          "[A1] Do you have a pencil? — 연필이 있니?",
          "[A1] She doesn't have a bike. — 그녀는 자전거가 없어요.",
          "[A2] Does the room have air conditioning? — 그 방에는 에어컨이 있나요?",
          "[A2] We don't have enough paint for the whole wall. — 벽 전체에 칠할 페인트가 충분하지 않아요."
        ]),
        point("과거와 다른 뜻의 have", "과거 소유는 had를 씁니다. have breakfast, have a shower, have a good time처럼 활동을 말할 때는 보통 have got을 쓰지 않습니다.", [
          "[A1] I had a red bicycle when I was six. — 저는 여섯 살 때 빨간 자전거가 있었어요.",
          "[A1] We have breakfast at seven. — 우리는 7시에 아침을 먹어요.",
          "[A1] She has a shower after swimming. — 그녀는 수영 뒤 샤워해요.",
          "[A2] Did your old classroom have a projector? — 예전 교실에 프로젝터가 있었나요?",
          "[A2] We had a good time at the school fair. — 우리는 학교 축제에서 즐거운 시간을 보냈어요."
        ])
      ]
    },
    [
      idiom("Have you got ...?", "~을 가지고 있니?", "Have you got an extra pencil? — 여분의 연필이 있니?"),
      idiom("I've got it!", "알겠어! / 내가 할게!", "I've got it! We need to turn the map around. — 알겠어! 지도를 돌려야 해."),
      idiom("have a good time", "즐거운 시간을 보내다", "Have a good time at the fair! — 축제에서 즐겁게 보내!")
    ],
    "The Box for the New Student",
    [
      "A new student called Sami is joining Class 6B. The class wants to prepare a welcome box. They have got a clean box and some coloured paper.",
      "Mina asks, “Have we got enough pens?” They have got three pens, but they haven't got any pencils. Leo has got two new pencils at home.",
      "The box also needs a school map. Their classroom has got a map on the wall, but the students cannot take it. The office has extra paper maps.",
      "Has Sami got a water bottle? Nobody knows. The class adds a bottle and a small card. The card has useful words for places around the school.",
      "When Sami arrives, he smiles. He has got a notebook, but he hasn't got a map or bottle. The welcome box has everything he needs for a comfortable first day."
    ],
    [
      "Sami라는 새 학생이 6B반에 옵니다. 반 친구들은 환영 상자를 준비하려고 하며 깨끗한 상자와 색종이가 있습니다.",
      "Mina는 펜이 충분한지 묻습니다. 펜은 세 개 있지만 연필이 없습니다. Leo는 집에 새 연필 두 자루가 있습니다.",
      "상자에는 학교 지도도 필요합니다. 교실 벽에 지도가 있지만 가져갈 수는 없습니다. 행정실에는 여분의 종이 지도가 있습니다.",
      "Sami가 물병이 있는지는 아무도 모릅니다. 반은 물병과 작은 카드를 넣고 카드에는 학교 장소에 관한 유용한 단어를 적습니다.",
      "Sami가 도착해 미소 짓습니다. 공책은 있지만 지도와 물병은 없습니다. 환영 상자에는 편안한 첫날에 필요한 것이 모두 있습니다."
    ],
    [
      vocab("joining", "verb", "합류하는", "새 반에 들어오는 것"), vocab("prepare", "verb", "준비하다", "필요한 물건을 미리 마련하는 행동"),
      vocab("welcome", "noun", "환영", "새 학생을 반갑게 맞는 마음"), vocab("coloured", "adjective", "색이 있는", "상자를 꾸미는 종이"),
      vocab("enough", "determiner", "충분한", "필요한 만큼 있는 상태"), vocab("extra", "adjective", "여분의", "필요할 때 더 쓸 수 있는"),
      vocab("office", "noun", "행정실", "종이 지도를 보관하는 곳"), vocab("bottle", "noun", "물병", "물을 담아 마시는 물건"),
      vocab("arrives", "verb", "도착한다", "새 학생이 교실에 오는 행동"), vocab("comfortable", "adjective", "편안한", "걱정 없이 지낼 수 있는 상태")
    ],
    [
      quiz("She _____ got two brothers.", ["have", "has", "is", "does"], 1, "she와 함께 has got을 씁니다."),
      quiz("I _____ got a ruler.", ["haven't", "hasn't", "don't got", "am not"], 0, "I의 have got 부정은 haven't got입니다."),
      quiz("_____ your school got a library?", ["Do", "Does", "Have", "Has"], 3, "school은 단수이므로 Has ... got?을 씁니다."),
      quiz("Do you _____ a pencil?", ["have", "have got to", "has", "got"], 0, "Do 질문에서는 본동사 have 원형을 씁니다."),
      quiz("Which sentence is natural for an activity?", ["I have got breakfast at seven.", "I have breakfast at seven.", "I am got breakfast.", "I has breakfast."], 1, "식사 활동에는 have breakfast를 씁니다."),
      quiz("Who is joining Class 6B?", ["Leo", "Sami", "Mina", "A teacher"], 1, "Sami가 새로 합류합니다."),
      quiz("What is missing at first?", ["Pens", "Pencils", "A box", "Coloured paper"], 1, "펜은 있지만 연필이 없습니다."),
      quiz("Where are the extra maps?", ["At Leo's home", "In the office", "Under the box", "On Sami's desk"], 1, "행정실에 여분의 종이 지도가 있습니다."),
      quiz("Why do they add a water bottle?", ["They know Sami has one", "They do not know if Sami has one", "The map is wet", "The teacher asks for two"], 1, "Sami가 물병을 가지고 있는지 몰라서 넣습니다."),
      quiz("What does Sami already have?", ["A notebook", "A map", "A bottle", "Three pens"], 0, "Sami는 공책을 가지고 있습니다.")
    ],
    ["Have you got a favourite notebook?", "Has your school got a library or lab?", "What do you have in your bag today?", "What did you have when you were younger?", "What should a welcome box for a new student have?"],
    rolePlay("You are preparing a welcome box for a new student.", "Ask what the class has got and what it has not got, then suggest three items.", "Answer with A1 short forms and add A2 reasons with because.", "Use have got questions, negatives and ordinary have accurately.")
  ),
  makeLesson(
    "student", "2026-10-15", "Present Perfect with For, Since, and How Long",
    {
      title: "How long ...? / for / since: 과거부터 지금까지 말하기",
      summary: "현재완료는 과거에 시작해 지금도 이어지는 상태와 행동을 말할 수 있습니다. for는 기간, since는 시작점을 나타냅니다. How long have/has ...?로 기간을 묻고, 아직 계속되는 상태에는 have/has + 과거분사를 씁니다. 정확히 끝난 과거 시점만 말하면 과거단순을 사용합니다.",
      points: [
        point("for + 기간", "얼마 동안인지 기간의 길이를 말할 때 for를 씁니다.", [
          "[A1] I have lived here for two years. — 저는 여기서 2년 동안 살았어요.",
          "[A1] She has waited for ten minutes. — 그녀는 10분 동안 기다렸어요.",
          "[A1] We have known him for a long time. — 우리는 그를 오랫동안 알아요.",
          "[A2] My family has used this shop for five years. — 우리 가족은 이 가게를 5년 동안 이용했어요.",
          "[A2] The club has met on Fridays for three months. — 동아리는 3개월 동안 금요일마다 모였어요."
        ]),
        point("since + 시작점", "언제부터인지 시작 시점을 말할 때 since를 씁니다. 날짜, 요일, 시각, 과거절이 올 수 있습니다.", [
          "[A1] I have lived here since 2024. — 저는 2024년부터 여기 살았어요.",
          "[A1] He has been busy since Monday. — 그는 월요일부터 바빴어요.",
          "[A1] We have been friends since primary school. — 우리는 초등학교 때부터 친구예요.",
          "[A2] She has played the violin since she was seven. — 그녀는 일곱 살 때부터 바이올린을 연주했어요.",
          "[A2] It has rained since we left home. — 우리가 집을 나선 뒤로 비가 계속 왔어요."
        ]),
        point("How long have/has ...?", "지금까지 이어진 기간을 물을 때 How long + have/has + 주어 + 과거분사를 씁니다.", [
          "[A1] How long have you lived here? — 여기서 얼마나 오래 살았니?",
          "[A1] How long has she had that bag? — 그녀는 그 가방을 얼마나 오래 가지고 있었니?",
          "[A1] How long have they been friends? — 그들은 얼마나 오래 친구였니?",
          "[A2] How long has your brother studied English? — 네 형제는 영어를 얼마나 오래 공부했니?",
          "[A2] How long have you waited for the bus? — 버스를 얼마나 오래 기다렸니?"
        ]),
        point("have had / have known / have been", "have, know, be처럼 상태를 나타내는 동사는 현재완료 단순으로 지속을 말합니다. 현재진행형으로 바꾸지 않습니다.", [
          "[A1] I have had this watch for a year. — 저는 이 시계를 1년 동안 가지고 있어요.",
          "[A1] She has known Mina since June. — 그녀는 6월부터 Mina를 알아요.",
          "[A1] We have been at school since eight. — 우리는 8시부터 학교에 있어요.",
          "[A2] He has wanted a dog for many years. — 그는 여러 해 동안 개를 원했어요.",
          "[A2] They have liked this café since it opened. — 그들은 이 카페가 문을 연 뒤부터 좋아했어요."
        ]),
        point("현재완료와 과거단순", "지금도 계속되면 현재완료를, 이미 끝난 과거 기간이나 정확한 과거 시점에는 과거단순을 씁니다.", [
          "[A1] I lived there for two years, but I moved away. — 2년 살았지만 이사했어요.",
          "[A1] I have lived here for two years, and I still do. — 2년째 여기 살고 있어요.",
          "[A1] She bought the bag last year. — 그녀는 작년에 그 가방을 샀어요.",
          "[A2] We met in 2023 and have been friends since then. — 우리는 2023년에 만나 그때부터 친구예요.",
          "[A2] He studied French for one year, but he doesn't study it now. — 그는 1년간 프랑스어를 공부했지만 지금은 하지 않아요."
        ])
      ]
    },
    [
      idiom("for a long time", "오랫동안", "We have known each other for a long time. — 우리는 서로를 오랫동안 알아요."),
      idiom("since then", "그때부터", "I joined in May and have enjoyed it since then. — 5월에 가입했고 그때부터 즐기고 있어요."),
      idiom("How long have you ...?", "얼마나 오래 ~했니?", "How long have you played basketball? — 농구를 얼마나 오래 했니?")
    ],
    "The Old Tree in the School Garden",
    [
      "There is a large mango tree in the school garden. It has been there for more than forty years. Many students have sat under it since the school opened.",
      "Mr Lee has worked at the school since 2010. He has known the tree for sixteen years. He says it was already tall when he arrived.",
      "This week, students are making a history board. They have collected old photographs for three days. One picture shows the tree in 1995.",
      "Mina asks, “How long has the bench been under the tree?” Mr Lee explains that parents built it in 2018. Students have used it since then.",
      "The class has learned that history is not only in books. The tree and bench have been part of daily school life for years, and now their story is on the board."
    ],
    [
      "학교 정원에는 큰 망고나무가 있습니다. 40년 넘게 그 자리에 있었고 학교가 문을 연 뒤 많은 학생이 그 아래 앉았습니다.",
      "Lee 선생님은 2010년부터 학교에서 일했고 그 나무를 16년 동안 알고 지냈습니다. 처음 왔을 때도 이미 키가 컸다고 합니다.",
      "이번 주 학생들은 역사 게시판을 만들고 있습니다. 3일 동안 오래된 사진을 모았고 한 사진에는 1995년의 나무가 보입니다.",
      "Mina는 벤치가 얼마나 오래 나무 아래 있었는지 묻습니다. 선생님은 부모들이 2018년에 만들었고 학생들이 그때부터 사용했다고 설명합니다.",
      "반은 역사가 책에만 있는 것이 아님을 배웠습니다. 나무와 벤치는 오랫동안 학교 일상의 일부였고 이제 그 이야기가 게시판에 있습니다."
    ],
    [
      vocab("garden", "noun", "정원", "망고나무가 있는 학교 공간"), vocab("opened", "verb", "문을 열었다", "학교가 처음 운영을 시작한 것"),
      vocab("arrived", "verb", "도착했다", "선생님이 학교에 처음 온 행동"), vocab("history", "noun", "역사", "과거에 있었던 일들의 이야기"),
      vocab("collected", "verb", "모았다", "여러 사진을 한곳에 가져온 행동"), vocab("photographs", "noun", "사진들", "과거 모습을 보여 주는 그림"),
      vocab("bench", "noun", "벤치", "여러 사람이 앉는 긴 의자"), vocab("built", "verb", "만들었다", "부모들이 벤치를 만든 과거 행동"),
      vocab("daily", "adjective", "매일의", "학교에서 날마다 이어지는 생활"), vocab("board", "noun", "게시판", "사진과 글을 붙여 보여 주는 판")
    ],
    [
      quiz("I have lived here _____ two years.", ["since", "for", "from", "at"], 1, "기간의 길이 앞에는 for를 씁니다."),
      quiz("She has studied English _____ 2024.", ["for", "during", "since", "ago"], 2, "시작 시점 앞에는 since를 씁니다."),
      quiz("_____ have you known him?", ["How much", "How long", "When long", "Since how"], 1, "지속 기간을 물을 때 How long을 씁니다."),
      quiz("I _____ this bag for a year.", ["am having", "have had", "have", "had last"], 1, "지금까지의 소유는 have had로 표현합니다."),
      quiz("Choose the finished past action.", ["I have lived here since 2024.", "I lived there for two years, but I moved.", "I have known her for years.", "We have been here since eight."], 1, "이사해 끝난 과거 기간이므로 과거단순입니다."),
      quiz("How old is the tree?", ["Three years", "Sixteen years", "More than forty years", "Since 2018"], 2, "40년 넘게 그 자리에 있었습니다."),
      quiz("Since when has Mr Lee worked at the school?", ["1995", "2010", "2018", "2024"], 1, "2010년부터 근무했습니다."),
      quiz("How long have students collected photos?", ["For three days", "For forty years", "Since 1995", "For one hour"], 0, "3일 동안 모았습니다."),
      quiz("Who built the bench?", ["Mr Lee", "Students", "Parents", "The gardener"], 2, "학부모들이 2018년에 만들었습니다."),
      quiz("What has the class learned?", ["History is only in books", "Every tree is forty", "Everyday places can have history", "Benches are new"], 2, "일상 장소에도 역사가 있음을 배웠습니다.")
    ],
    ["How long have you lived in your town?", "What have you had for a long time?", "Who have you known since primary school?", "What place has changed since you first saw it?", "Ask a partner two How long questions."],
    rolePlay("You are making a history board about your school.", "Ask how long a teacher, tree and club have been there, then report the answers.", "Give A1 answers with for/since and add an A2 detail about when each began.", "Use How long, for, since, have had and past simple accurately.")
  ),
  makeLesson(
    "student", "2026-10-16", "Would Like, Want To, Offers, and Invitations",
    {
      title: "I'd like to ...: 바람·주문·초대를 공손하게 말하기",
      summary: "want to는 원하는 행동을 직접 말하고, would like to는 더 공손하게 말합니다. 음식이나 물건을 원하면 would like + 명사를 씁니다. Would you like ...?로 제안하거나 초대하고, Would you like to ...?로 함께 할 행동을 물을 수 있습니다.",
      points: [
        point("want to + 동사원형", "자신의 바람과 계획을 직접 말할 때 want to를 씁니다. he/she에는 wants to가 됩니다.", [
          "[A1] I want to learn guitar. — 저는 기타를 배우고 싶어요.",
          "[A1] She wants to join the club. — 그녀는 동아리에 가입하고 싶어 해요.",
          "[A1] We want to visit the museum. — 우리는 박물관에 가고 싶어요.",
          "[A2] I don't want to miss the first bus. — 저는 첫 버스를 놓치고 싶지 않아요.",
          "[A2] Why does Leo want to speak to the teacher? — Leo는 왜 선생님과 이야기하고 싶어 하나요?"
        ]),
        point("would like + 명사", "음식·음료·물건을 공손하게 요청할 때 would like + 명사를 씁니다. I'd like는 I would like의 줄임말입니다.", [
          "[A1] I'd like some water, please. — 물을 좀 주세요.",
          "[A1] She would like a sandwich. — 그녀는 샌드위치를 원해요.",
          "[A1] We'd like two tickets. — 표 두 장 주세요.",
          "[A2] I would like the blue notebook, not the green one. — 초록색 말고 파란 공책을 원해요.",
          "[A2] My parents would like more information about the trip. — 부모님은 여행 정보를 더 원하세요."
        ]),
        point("would like to + 동사원형", "자신이 하고 싶은 행동을 공손하게 말할 때 would like to를 씁니다.", [
          "[A1] I'd like to ask a question. — 질문하고 싶어요.",
          "[A1] He'd like to sit by the window. — 그는 창가에 앉고 싶어 해요.",
          "[A1] We would like to order now. — 지금 주문하고 싶어요.",
          "[A2] I would like to learn more about the art course. — 미술 과정에 관해 더 알고 싶어요.",
          "[A2] They'd like to arrive early so they can choose good seats. — 좋은 자리를 고르도록 일찍 도착하고 싶어 해요."
        ]),
        point("Would you like + 명사?", "상대에게 음식이나 물건을 공손하게 제안할 때 사용합니다. Yes, please / No, thank you로 답할 수 있습니다.", [
          "[A1] Would you like some juice? — 주스 좀 마실래?",
          "[A1] Would you like a seat? — 앉을 자리 드릴까요?",
          "[A1] Yes, please. — 네, 주세요.",
          "[A2] Would you like another piece of cake? — 케이크 한 조각 더 드실래요?",
          "[A2] No, thank you. I've had enough. — 아니요, 괜찮아요. 충분히 먹었어요."
        ]),
        point("Would you like to + 동사원형?", "상대를 활동에 초대하거나 제안할 때 씁니다. I'd love to / I'd like to, but ...로 자연스럽게 답합니다.", [
          "[A1] Would you like to come with us? — 우리와 함께 갈래?",
          "[A1] Would you like to play chess? — 체스를 둘래?",
          "[A1] I'd love to. — 정말 좋아.",
          "[A2] I'd like to, but I have music practice. — 그러고 싶지만 음악 연습이 있어.",
          "[A2] Would you like to meet outside the library at ten? — 10시에 도서관 밖에서 만날래?"
        ])
      ]
    },
    [
      idiom("I'd love to.", "정말 그러고 싶어.", "Would you like to join us? I'd love to. — 함께할래? 정말 좋아."),
      idiom("Yes, please.", "네, 주세요.", "Would you like some tea? Yes, please. — 차 마실래? 네, 주세요."),
      idiom("Maybe next time.", "다음에 하자.", "I can't come today. Maybe next time. — 오늘은 못 가. 다음에 하자.")
    ],
    "An Invitation to the Saturday Workshop",
    [
      "The town library is holding a drawing workshop on Saturday. Mina wants to learn how to draw animals, so she reads the poster carefully.",
      "She asks Leo, “Would you like to come with me?” Leo says, “I'd love to, but I have football practice in the morning.”",
      "The workshop starts at two, after his practice. Leo would like to join, so they decide to meet outside the library at half past one.",
      "At the workshop, a helper asks, “Would you like a pencil or a black pen?” Mina would like a pencil. Leo asks for a pen and some extra paper.",
      "They draw for two hours and have a good time. Mina wants to return next month. Leo would like to come too, if the next workshop starts in the afternoon."
    ],
    [
      "마을 도서관에서 토요일에 그림 워크숍을 엽니다. Mina는 동물 그리기를 배우고 싶어 포스터를 자세히 읽습니다.",
      "Mina가 Leo에게 함께 갈지 묻자 Leo는 정말 가고 싶지만 오전에 축구 연습이 있다고 답합니다.",
      "워크숍은 연습 뒤인 2시에 시작합니다. Leo도 참여하고 싶어서 둘은 1시 30분에 도서관 밖에서 만나기로 합니다.",
      "워크숍에서 도우미가 연필과 검은 펜 중 무엇을 원하는지 묻습니다. Mina는 연필을, Leo는 펜과 여분의 종이를 요청합니다.",
      "둘은 두 시간 동안 그림을 그리고 즐거운 시간을 보냅니다. Mina는 다음 달에도 오고 싶고 Leo도 오후에 시작한다면 함께 오고 싶어 합니다."
    ],
    [
      vocab("holding", "verb", "개최하는", "도서관이 행사를 여는 것"), vocab("workshop", "noun", "워크숍", "함께 배우고 만들어 보는 수업"),
      vocab("poster", "noun", "포스터", "행사 정보를 알리는 큰 종이"), vocab("practice", "noun", "연습", "축구 실력을 기르는 활동"),
      vocab("decide", "verb", "결정하다", "만날 시간과 장소를 정하는 것"), vocab("outside", "preposition", "~밖에서", "도서관 입구 바깥 위치"),
      vocab("helper", "noun", "도우미", "워크숍 참가자를 돕는 사람"), vocab("extra", "adjective", "여분의", "필요할 때 더 쓸 수 있는"),
      vocab("return", "verb", "다시 오다", "다음 달에 또 참가하는 것"), vocab("afternoon", "noun", "오후", "정오 뒤부터 저녁 전까지")
    ],
    [
      quiz("I want _____ guitar.", ["learn", "to learn", "learning to", "learned"], 1, "want 뒤에는 to부정사를 씁니다."),
      quiz("I'd like _____ water, please.", ["some", "to some", "a waters", "drinking"], 0, "would like 뒤에 원하는 명사를 바로 둘 수 있습니다."),
      quiz("We would like _____ now.", ["order", "to order", "ordering", "ordered"], 1, "원하는 행동은 would like to + 동사원형입니다."),
      quiz("Would you like some juice?", ["Yes, please.", "Yes, I like.", "Yes, I do juice.", "Yes, would."], 0, "제안을 받을 때 Yes, please가 자연스럽습니다."),
      quiz("Would you like to join us?", ["I'd love to.", "I love join.", "Yes, I would like joining.", "I am love."], 0, "초대를 기쁘게 받을 때 I'd love to라고 답합니다."),
      quiz("Where is the workshop?", ["At school", "At the town library", "At the football field", "At Mina's home"], 1, "마을 도서관에서 열립니다."),
      quiz("Why can't Leo go in the morning?", ["He is drawing", "He has football practice", "The library is closed", "He needs a pencil"], 1, "오전에 축구 연습이 있습니다."),
      quiz("What time do they meet?", ["One", "Half past one", "Two", "Half past two"], 1, "1시 30분에 만나기로 합니다."),
      quiz("What does Mina choose?", ["A black pen", "A pencil", "Two tickets", "A poster"], 1, "Mina는 연필을 원합니다."),
      quiz("When would Leo like the next workshop to start?", ["In the morning", "At night", "In the afternoon", "Before football"], 2, "다음 워크숍도 오후에 시작하면 오고 싶어 합니다.")
    ],
    ["What would you like to learn?", "Would you like to join a weekend workshop?", "What would you like to drink now?", "How do you answer an invitation politely?", "Invite a friend to one activity and give a time and place."],
    rolePlay("You are inviting a friend to a Saturday workshop and ordering materials there.", "Invite the friend, agree on a time and politely ask for two items.", "Accept one invitation, refuse another with a reason and offer materials.", "Use want to, would like, Would you like ...? and Would you like to ...? accurately.")
  ),
  makeLesson(
    "student", "2026-10-17", "Gerunds and Infinitives for Likes, Plans, and Purpose",
    {
      title: "doing / to do: 좋아하는 일·계획·목적 말하기",
      summary: "동사 뒤에 다른 행동을 붙일 때 -ing 또는 to + 동사원형을 사용합니다. like/love/enjoy 뒤에는 -ing가 자연스럽고, want/hope/plan 뒤에는 to부정사가 옵니다. 어떤 행동의 목적은 to부정사로 간단히 설명할 수 있습니다. stop/finish 뒤에는 -ing를 씁니다.",
      points: [
        point("like / love + -ing", "좋아하는 활동을 일반적으로 말할 때 like/love + -ing를 씁니다.", [
          "[A1] I like reading comics. — 저는 만화 읽기를 좋아해요.",
          "[A1] She loves dancing. — 그녀는 춤추기를 아주 좋아해요.",
          "[A1] We like playing outside. — 우리는 밖에서 놀기를 좋아해요.",
          "[A2] My brother loves building model planes. — 제 남동생은 모형 비행기 만들기를 좋아해요.",
          "[A2] Do you like learning new words through games? — 게임으로 새 단어 배우는 것을 좋아하니?"
        ]),
        point("enjoy / finish / stop + -ing", "enjoy, finish, stop 뒤에는 -ing 형태를 씁니다. to부정사를 쓰지 않습니다.", [
          "[A1] I enjoy cooking. — 저는 요리를 즐겨요.",
          "[A1] She finished writing the card. — 그녀는 카드 쓰기를 끝냈어요.",
          "[A1] Please stop talking. — 말하기를 멈춰 주세요.",
          "[A2] We enjoyed watching the school play. — 우리는 학교 연극 관람을 즐겼어요.",
          "[A2] He finished cleaning the table before lunch. — 그는 점심 전에 식탁 청소를 끝냈어요."
        ]),
        point("want / hope + to부정사", "원하거나 바라거나 기대하는 미래 행동에는 want/hope + to부정사를 씁니다.", [
          "[A1] I want to go home. — 저는 집에 가고 싶어요.",
          "[A1] She hopes to win. — 그녀는 이기기를 바라요.",
          "[A1] We want to help. — 우리는 돕고 싶어요.",
          "[A2] Leo hopes to visit his cousin during the holiday. — Leo는 방학에 사촌을 만나고 싶어 해요.",
          "[A2] They want to finish the project before Friday. — 그들은 금요일 전에 프로젝트를 끝내고 싶어 해요."
        ]),
        point("plan / decide / need + to부정사", "계획·결정·필요를 말하는 plan, decide, need 뒤에도 to부정사를 씁니다.", [
          "[A1] We plan to leave at eight. — 우리는 8시에 떠날 계획이에요.",
          "[A1] He decided to walk. — 그는 걷기로 결정했어요.",
          "[A1] I need to study. — 저는 공부해야 해요.",
          "[A2] The class plans to sell cakes at the fair. — 반은 축제에서 케이크를 팔 계획이에요.",
          "[A2] Mina decided to ask the teacher for advice. — Mina는 선생님께 조언을 구하기로 했어요."
        ]),
        point("목적을 나타내는 to부정사", "왜 어떤 행동을 하는지 목적을 말할 때 to + 동사원형을 씁니다. for + -ing는 물건의 용도를 설명할 때 자주 씁니다.", [
          "[A1] I went outside to play. — 저는 놀려고 밖에 나갔어요.",
          "[A1] She called to ask a question. — 그녀는 질문하려고 전화했어요.",
          "[A1] We use a knife for cutting. — 우리는 자를 때 칼을 사용해요.",
          "[A2] He saved money to buy a new bicycle. — 그는 새 자전거를 사려고 돈을 모았어요.",
          "[A2] This brush is for cleaning bottles. — 이 솔은 병을 닦는 용도예요."
        ])
      ]
    },
    [
      idiom("I can't wait to ...", "빨리 ~하고 싶어", "I can't wait to see the show. — 빨리 공연을 보고 싶어요."),
      idiom("give it a try", "한번 해 보다", "Drawing is difficult, but give it a try. — 그림이 어렵지만 한번 해 봐."),
      idiom("keep going", "계속하다", "The puzzle is hard, but keep going. — 퍼즐이 어렵지만 계속해.")
    ],
    "The Class Fair Project",
    [
      "Class 6B is preparing for the school fair. The students enjoy making things together. They plan to run a small games table on Friday.",
      "Mina loves drawing, so she decides to make the signs. Leo likes building things and wants to create a ring-toss game from old bottles.",
      "The group needs to collect safe materials. They bring cardboard to make the board and use bright paint for decorating it.",
      "At first, the rings are too small. Leo stops using them and makes larger ones. The team keeps going and finishes testing the game before lunch.",
      "Everyone can't wait to open the table. They hope to raise money to buy new library books. Working together has made the project both useful and fun."
    ],
    [
      "6B반은 학교 축제를 준비 중입니다. 학생들은 함께 만드는 일을 즐기며 금요일에 작은 게임대를 운영할 계획입니다.",
      "Mina는 그림을 좋아해 표지판을 만들기로 합니다. Leo는 만들기를 좋아하고 오래된 병으로 고리 던지기 게임을 만들고 싶어 합니다.",
      "모둠은 안전한 재료를 모아야 합니다. 판을 만들 골판지를 가져오고 밝은 물감은 꾸미는 데 사용합니다.",
      "처음에는 고리가 너무 작습니다. Leo는 그것을 쓰는 것을 멈추고 더 큰 것을 만듭니다. 팀은 계속해서 점심 전에 게임 시험을 끝냅니다.",
      "모두 게임대를 빨리 열고 싶어 합니다. 새 도서관 책을 사기 위한 돈을 모으고 싶어 합니다. 함께 일해 프로젝트가 유용하면서도 즐거워졌습니다."
    ],
    [
      vocab("preparing", "verb", "준비하는", "축제 전 필요한 일을 하는 것"), vocab("fair", "noun", "축제", "학교에서 여러 활동을 여는 행사"),
      vocab("create", "verb", "만들다", "새 게임을 제작하는 행동"), vocab("ring", "noun", "고리", "병 쪽으로 던지는 둥근 물건"),
      vocab("materials", "noun", "재료들", "게임을 만드는 데 쓰는 것들"), vocab("cardboard", "noun", "골판지", "판을 만드는 두꺼운 종이"),
      vocab("decorating", "verb", "꾸미는", "색과 그림을 더하는 활동"), vocab("testing", "verb", "시험하는", "게임이 잘 되는지 확인하는 행동"),
      vocab("raise", "verb", "모으다", "책을 살 돈을 마련하는 것"), vocab("useful", "adjective", "유용한", "좋은 목적에 도움이 되는")
    ],
    [
      quiz("I like _____ comics.", ["read", "reading", "to reading", "reads"], 1, "일반적으로 좋아하는 활동은 like + -ing입니다."),
      quiz("She finished _____ the card.", ["write", "to write", "writing", "wrote"], 2, "finish 뒤에는 -ing를 씁니다."),
      quiz("We hope _____ the match.", ["winning", "to win", "win to", "won"], 1, "hope 뒤에는 to부정사를 씁니다."),
      quiz("They plan _____ at eight.", ["leave", "leaving", "to leave", "left"], 2, "plan 뒤에는 to부정사를 씁니다."),
      quiz("He saved money _____ a bike.", ["buying", "to buy", "for buy", "bought"], 1, "돈을 모은 목적은 to buy로 나타냅니다."),
      quiz("What is Class 6B preparing for?", ["A test", "The school fair", "A trip", "A concert"], 1, "학교 축제를 준비합니다."),
      quiz("What does Mina decide to make?", ["The rings", "The signs", "The bottles", "The books"], 1, "Mina는 표지판을 만듭니다."),
      quiz("What game does Leo create?", ["Chess", "Ring toss", "Football", "A card game"], 1, "오래된 병으로 고리 던지기를 만듭니다."),
      quiz("Why does Leo make larger rings?", ["The first ones are too small", "The bottles are broken", "Lunch is late", "The signs are dark"], 0, "처음 만든 고리가 너무 작았습니다."),
      quiz("Why do students want to raise money?", ["To buy food", "To buy library books", "To travel", "To paint the class"], 1, "도서관에 새 책을 사기 위해서입니다.")
    ],
    ["What do you enjoy doing after school?", "What do you plan to do this weekend?", "What do you need to finish today?", "What would you like to try learning?", "Explain why you save money or time using to + verb."],
    rolePlay("Your class is planning one table for a school fair.", "Say what you enjoy doing, choose a job and explain the project's purpose.", "Offer three jobs and ask what the learner plans, wants and hopes to do.", "Use -ing after enjoy/finish and to-infinitives after plan/want/hope and for purpose.")
  ),
  makeLesson(
    "student", "2026-10-18", "Articles: A / An, The, and No Article",
    {
      title: "a/an / the / 무관사: 처음 말하는 것과 이미 아는 것",
      summary: "하나의 셀 수 있는 명사를 처음 말할 때 a/an을 쓰고, 이미 말했거나 모두가 어느 것인지 아는 대상에는 the를 씁니다. 복수나 셀 수 없는 명사를 일반적으로 말할 때는 관사를 쓰지 않습니다. 소리로 시작하는지에 따라 a와 an을 고릅니다.",
      points: [
        point("a + 자음 소리", "하나의 셀 수 있는 명사가 자음 소리로 시작하면 a를 씁니다. 철자보다 발음이 중요합니다.", [
          "[A1] I have a book. — 저는 책 한 권이 있어요.",
          "[A1] She saw a dog. — 그녀는 개 한 마리를 봤어요.",
          "[A1] He is a student. — 그는 학생이에요.",
          "[A2] We waited for a useful bus app to load. — 우리는 유용한 버스 앱이 열리기를 기다렸어요.",
          "[A2] Mina wants to buy a new umbrella. — Mina는 새 우산을 사고 싶어 해요."
        ]),
        point("an + 모음 소리", "모음 소리로 시작하는 하나의 셀 수 있는 명사 앞에는 an을 씁니다. 묵음 h와 철자 u의 발음에 주의합니다.", [
          "[A1] I ate an apple. — 저는 사과 하나를 먹었어요.",
          "[A1] She has an orange bag. — 그녀는 주황색 가방이 있어요.",
          "[A1] We waited for an hour. — 우리는 한 시간 기다렸어요.",
          "[A2] He wants to be an engineer. — 그는 엔지니어가 되고 싶어 해요.",
          "[A2] It was an unusual answer. — 그것은 특이한 대답이었어요."
        ]),
        point("처음 a/an, 다시 말할 때 the", "처음 소개하는 대상에는 a/an, 그 대상을 다시 말할 때는 the를 씁니다.", [
          "[A1] I saw a cat. The cat was black. — 고양이 한 마리를 봤는데 그 고양이는 검었어요.",
          "[A1] She bought a pen. The pen was blue. — 그녀는 펜을 샀고 그 펜은 파란색이었어요.",
          "[A1] We found a key. The key was old. — 우리는 열쇠 하나를 찾았고 그 열쇠는 오래됐어요.",
          "[A2] A boy entered the room, and the boy sat by the window. — 한 소년이 방에 들어와 창가에 앉았어요.",
          "[A2] I opened an email, but the email had no name. — 이메일 하나를 열었는데 그 이메일에는 이름이 없었어요."
        ]),
        point("상황에서 분명한 대상에는 the", "처음 말해도 화자와 듣는 사람이 어느 것인지 알 수 있거나 하나뿐인 대상에는 the를 씁니다.", [
          "[A1] Close the door, please. — 문을 닫아 주세요.",
          "[A1] The sun is bright today. — 오늘 해가 밝아요.",
          "[A1] Put it on the table. — 그것을 탁자 위에 놓아 주세요.",
          "[A2] Meet me at the school gate. — 학교 정문에서 만나자.",
          "[A2] The teacher in our classroom is Mr Kim. — 우리 교실에 있는 선생님은 Kim 선생님이에요."
        ]),
        point("일반 복수·불가산 명사에는 무관사", "어떤 종류 전체를 일반적으로 말할 때 복수명사와 셀 수 없는 명사 앞에는 a/an/the를 쓰지 않습니다.", [
          "[A1] Cats like warm places. — 고양이는 따뜻한 곳을 좋아해요.",
          "[A1] Water is important. — 물은 중요해요.",
          "[A1] Books can teach us many things. — 책은 많은 것을 가르쳐 줘요.",
          "[A2] Children need enough sleep. — 아이들은 충분한 잠이 필요해요.",
          "[A2] Music helps some students concentrate. — 음악은 일부 학생의 집중을 도와요."
        ])
      ]
    },
    [
      idiom("the first time", "처음으로", "This is the first time I have used the app. — 이 앱을 처음 써 봐요."),
      idiom("in a hurry", "서둘러", "I left home in a hurry. — 저는 서둘러 집을 나왔어요."),
      idiom("at the end", "끝에", "There is a question at the end of the story. — 이야기 끝에 질문이 있어요.")
    ],
    "The Umbrella at the Bus Stop",
    [
      "Mina is waiting at a bus stop when rain begins. She has a small umbrella, but the umbrella has a broken button.",
      "An older woman is standing beside her without an umbrella. Mina opens the umbrella by hand and invites the woman to share it.",
      "The bus arrives, and everyone gets on. In a hurry, Mina leaves the umbrella at the stop. She notices it when the bus reaches the next street.",
      "A driver at the end of the route calls the station. A cleaner has found an umbrella at the stop. The blue name label shows that it belongs to Mina.",
      "After school, Mina collects it from the station. She learns two things: kindness matters, and name labels help people return lost things to the right person."
    ],
    [
      "Mina가 버스 정류장에서 기다릴 때 비가 내리기 시작합니다. 작은 우산이 있지만 그 우산의 버튼은 고장 났습니다.",
      "나이 든 여성이 우산 없이 옆에 서 있습니다. Mina는 손으로 우산을 열어 함께 쓰자고 합니다.",
      "버스가 도착해 모두 탑니다. 서두르다가 Mina는 정류장에 우산을 두고 오고 다음 거리에 도착해서 알아차립니다.",
      "노선 끝의 운전사가 역에 전화합니다. 청소 직원이 정류장에서 우산 하나를 찾았고 파란 이름표를 보니 Mina의 것입니다.",
      "방과 후 Mina는 역에서 우산을 찾습니다. 친절은 중요하고 이름표는 잃어버린 물건을 주인에게 돌려주는 데 도움이 된다는 두 가지를 배웁니다."
    ],
    [
      vocab("begins", "verb", "시작한다", "비가 내리기 시작하는 것"), vocab("broken", "adjective", "고장 난", "버튼이 정상 작동하지 않는 상태"),
      vocab("older", "adjective", "나이가 더 많은", "Mina 옆에 선 여성을 설명하는 말"), vocab("share", "verb", "함께 쓰다", "한 우산을 두 사람이 이용하는 것"),
      vocab("hurry", "noun", "서두름", "시간이 없어 빠르게 움직이는 상태"), vocab("notices", "verb", "알아차린다", "우산이 없다는 것을 깨닫는 행동"),
      vocab("route", "noun", "노선", "버스가 정해진 길로 다니는 경로"), vocab("cleaner", "noun", "청소 직원", "잃어버린 우산을 발견한 사람"),
      vocab("label", "noun", "이름표", "주인의 이름을 적어 붙인 표"), vocab("kindness", "noun", "친절", "다른 사람을 배려하고 돕는 마음")
    ],
    [
      quiz("I have _____ useful app.", ["a", "an", "the", "—"], 0, "useful은 /juː/ 자음 소리로 시작하므로 a를 씁니다."),
      quiz("We waited for _____ hour.", ["a", "an", "the every", "—"], 1, "hour의 h는 묵음이어서 모음 소리로 시작하므로 an입니다."),
      quiz("I saw a dog. _____ dog was wet.", ["A", "An", "The", "—"], 2, "이미 말한 특정 개이므로 the를 씁니다."),
      quiz("Please close _____ door.", ["a", "an", "the", "—"], 2, "상황에서 어느 문인지 분명하므로 the를 씁니다."),
      quiz("_____ books can teach us many things.", ["A", "An", "The all", "—"], 3, "책이라는 종류 전체를 일반적으로 말해 무관사입니다."),
      quiz("What is broken?", ["The bus", "The umbrella button", "The stop", "The name label"], 1, "Mina의 우산 버튼이 고장 났습니다."),
      quiz("Who shares Mina's umbrella?", ["A cleaner", "An older woman", "The driver", "A teacher"], 1, "우산이 없는 나이 든 여성과 함께 씁니다."),
      quiz("Where does Mina leave the umbrella?", ["At school", "At the bus stop", "On the bus", "At home"], 1, "정류장에 두고 버스에 탑니다."),
      quiz("Who finds it?", ["A cleaner", "The woman", "A student", "Mina's friend"], 0, "청소 직원이 발견합니다."),
      quiz("How do people know it is Mina's?", ["It is small", "It has a blue name label", "It is broken", "The woman says so"], 1, "파란 이름표에 Mina의 정보가 있습니다.")
    ],
    ["What do you carry in a school bag?", "Have you ever found a lost thing?", "Why is a name label useful?", "Describe one thing using a/an and then the.", "What general things are important for students?"],
    rolePlay("You have lost an umbrella at a bus stop and call the station.", "Introduce the umbrella with a/an, then describe the specific umbrella with the.", "Ask about colour, label and location, first with A1 questions and then one A2 follow-up.", "Use a/an by sound, the for known objects and no article for general plurals.")
  )
];

function validateLessons(label, lessons) {
  const errors = [];
  const dates = new Set();
  for (const lesson of lessons) {
    if (dates.has(lesson.date)) errors.push(`${lesson.date}: duplicate date`);
    dates.add(lesson.date);
    if (lesson.grammar.points.length !== 5) errors.push(`${lesson.date}: grammar points ${lesson.grammar.points.length}`);
    const exampleCount = lesson.grammar.points.reduce((sum, item) => sum + item.examples.length, 0);
    if (exampleCount !== 25) errors.push(`${lesson.date}: examples ${exampleCount}`);
    if (lesson.idioms.length !== 3) errors.push(`${lesson.date}: expressions ${lesson.idioms.length}`);
    if (lesson.paragraphs.length !== 5 || lesson.translations.length !== 5) errors.push(`${lesson.date}: reading/translation paragraphs`);
    if (lesson.vocabulary.length !== 10) errors.push(`${lesson.date}: vocabulary ${lesson.vocabulary.length}`);
    if (lesson.quiz.length !== 10) errors.push(`${lesson.date}: quiz ${lesson.quiz.length}`);
    if (lesson.discussionQuestions.length !== 5) errors.push(`${lesson.date}: discussion ${lesson.discussionQuestions.length}`);
    if (!lesson.rolePlay?.scenario || !lesson.rolePlay?.goal) errors.push(`${lesson.date}: role play incomplete`);
    for (const [index, item] of lesson.quiz.entries()) {
      if (item.choices.length !== 4 || item.answer < 0 || item.answer > 3) errors.push(`${lesson.date}: invalid quiz ${index + 1}`);
    }
    const reading = lesson.paragraphs.join(" ").toLowerCase();
    for (const item of lesson.vocabulary) {
      if (!reading.includes(item.term.toLowerCase())) errors.push(`${lesson.date}: vocabulary term not in reading: ${item.term}`);
    }
  }
  if (lessons.length !== 7) errors.push(`${label}: lesson count ${lessons.length}`);
  if (errors.length) throw new Error(`${label} validation failed:\n${errors.join("\n")}`);
}

validateLessons("B1-B2", adult);
validateLessons("A1-A2", student);

const adultDir = path.join(root, "english", "week-2026-10-12");
const studentDir = path.join(root, "student-english", "week-2026-10-12");
fs.mkdirSync(adultDir, { recursive: true });
fs.mkdirSync(studentDir, { recursive: true });
fs.writeFileSync(path.join(adultDir, "week.json"), `${JSON.stringify(adult, null, 2)}\n`);
fs.writeFileSync(path.join(studentDir, "week.json"), `${JSON.stringify(student, null, 2)}\n`);

const studentHistoryPath = path.join(root, "student-english", "data", "week.json");
const previousStudentLessons = JSON.parse(fs.readFileSync(studentHistoryPath, "utf8"));
const studentByDate = new Map(previousStudentLessons.map((lesson) => [lesson.date, lesson]));
for (const lesson of student) studentByDate.set(lesson.date, lesson);
const studentHistory = [...studentByDate.values()].sort((a, b) => a.date.localeCompare(b.date));
fs.writeFileSync(studentHistoryPath, `${JSON.stringify(studentHistory, null, 2)}\n`);

const weeklyRedirect = (title, label) => `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=./?date=2026-10-12">
  <title>${title} — 2026-10-12 주간</title>
  <link rel="canonical" href="./?date=2026-10-12">
</head>
<body>
  <p><a href="./?date=2026-10-12">2026-10-12 주간 ${label} 열기</a></p>
</body>
</html>
`;

fs.writeFileSync(path.join(root, "english", "week-2026-10-12.html"), weeklyRedirect("Daily English B1–B2", "Daily English B1–B2"));
fs.writeFileSync(path.join(root, "student-english", "week-2026-10-12.html"), weeklyRedirect("Student Daily English A1–A2", "Student Daily English A1–A2"));

console.log(JSON.stringify({
  adult: { lessons: adult.length, from: adult[0].date, to: adult.at(-1).date, examplesPerDay: 25 },
  student: { lessons: student.length, from: student[0].date, to: student.at(-1).date, examplesPerDay: 25, history: studentHistory.length }
}, null, 2));
