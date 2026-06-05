import type { AppLanguage } from './translations'

const exactJa: Record<string, string> = {
  '119 전화 연결': '119へ電話接続',
  'AI 안부 대화': 'AI安否会話',
  'AI 안부 대화 내용': 'AI安否会話内容',
  'AI 안부 대화 화면': 'AI安否会話画面',
  'DOLBOM-3942 코드로 연결 요청을 보냈어요.': 'DOLBOM-3942コードで連携リクエストを送りました。',
  'SOS 호출 이력': 'SOS呼び出し履歴',
  'SOS 조작': 'SOS操作',
  '가족 요양사 연결 코드': '家族・介護士連携コード',
  '가족 초대': '家族を招待',
  '가족에게 초대코드 보내기': '家族へ招待コードを送信',
  '가입 완료': '登録完了',
  '가입 정보 보조 패널': '登録情報補助パネル',
  '가입 정보 입력': '登録情報入力',
  '가입 진행 단계': '登録進行ステップ',
  '가입 준비중': '登録準備中',
  '거주지': '居住地',
  '경력': '経歴',
  '경력 증빙 첨부': '経歴証明を添付',
  '계정 및 보안': 'アカウント・セキュリティ',
  '계정 정보 입력': 'アカウント情報入力',
  '고위험 어르신 우선순위, 요양사 배정, 사례 메모와 대응 완료를 한눈에 확인하세요.':
    '高リスク高齢者の優先順位、介護士割り当て、ケースメモ、対応完了を一目で確認してください。',
  '기관 일정': '機関予定',
  '기관명': '機関名',
  '기록 작성': '記録作成',
  '기록 보기': '記録を見る',
  '기록 진행 현황': '記録進行状況',
  '기록 요약': '記録要約',
  '기본 정보': '基本情報',
  '긴급 신고': '緊急通報',
  '긴급 SOS': '緊急SOS',
  '긴급 SOS 화면': '緊急SOS画面',
  '긴급 알림이 가족과 복지사에게 최우선으로 발송되었습니다.':
    '緊急通知が家族と福祉担当者へ最優先で送信されました。',
  '긴급 알림 발송 대기 중입니다. 오작동이면 지금 취소할 수 있어요.':
    '緊急通知の送信待機中です。誤操作なら今すぐ取り消せます。',
  '김민수 요양사': 'キム・ミンス介護士',
  '김민수 요양사 프로필 미리보기': 'キム・ミンス介護士プロフィールプレビュー',
  '김민수 요양사 프로필 사진': 'キム・ミンス介護士プロフィール写真',
  '김영자 어르신': 'キム・ヨンジャ高齢者',
  '김영자 어르신 프로필': 'キム・ヨンジャ高齢者プロフィール',
  '김영자님 프로필': 'キム・ヨンジャさんプロフィール',
  '나이': '年齢',
  '낮음': '低い',
  '내 돌봄팀': '自分のケアチーム',
  '내 기본 정보': '自分の基本情報',
  '대상자': '対象者',
  '대상자와 돌봄팀을 관리해요.': '対象者とケアチームを管理します。',
  '대시보드': 'ダッシュボード',
  '더보기': 'もっと見る',
  '돌봄ON': 'Dolbom ON',
  '돌봄ON 어르신 홈': 'Dolbom ON 高齢者ホーム',
  '돌봄팀 관리': 'ケアチーム管理',
  '돌봄팀 권한과 변경 내역': 'ケアチーム権限と変更履歴',
  '돌봄팀 연결 주요 작업': 'ケアチーム連携の主な操作',
  '돌봄팀 연결 상태 정상': 'ケアチーム連携状態は正常',
  '돌봄팀 연결 요약': 'ケアチーム連携要約',
  '동행 후 약 복용 확인.': '病院同行後、薬の服用を確認。',
  '되돌아가기': '戻る',
  '등록 주소 기준으로 알림을 보냅니다.': '登録住所を基準に通知を送ります。',
  '마감:': '締切:',
  '마이페이지': 'マイページ',
  '마이페이지 메뉴': 'マイページメニュー',
  '마이페이지 설정': 'マイページ設定',
  '마이페이지 열기': 'マイページを開く',
  '말씀해 주세요': '話してください',
  '모든 정보가 정확한지 다시 한 번 확인해 주세요.':
    'すべての情報が正確かもう一度確認してください。',
  '방문 기록': '訪問記録',
  '방문 기록 검색': '訪問記録検索',
  '방문 기록 검색 및 필터': '訪問記録検索・フィルター',
  '방문 기록 관리': '訪問記録管理',
  '방문 기록 목록': '訪問記録一覧',
  '방문 기록 보조 정보': '訪問記録補助情報',
  '방문 기록 요약': '訪問記録要約',
  '방문 시작': '訪問開始',
  '방문 시작 전 신분 확인과 긴급 연락처를 다시 확인하세요.':
    '訪問開始前に身分確認と緊急連絡先を再確認してください。',
  '방문 일정': '訪問予定',
  '방문 일정 목록': '訪問予定一覧',
  '방문 일정 보기': '訪問予定表示',
  '방문 일정 보조 정보': '訪問予定補助情報',
  '방문 일정 요약': '訪問予定要約',
  '방문일정': '訪問予定',
  '방문중': '訪問中',
  '방문 요양': '訪問介護',
  '방문 요양 및 생활 지원': '訪問介護および生活支援',
  '방문 요양 및 생활 지원.': '訪問介護および生活支援。',
  '복지 현황': '福祉状況',
  '복지사': '福祉担当者',
  '복지사 돌봄 연결 메뉴': '福祉担当者ケア連携メニュー',
  '복지사 배정': '福祉担当者割り当て',
  '복지사 요청 메모': '福祉担当者リクエストメモ',
  '보고서': 'レポート',
  '보유 자격': '保有資格',
  '보유 자격증': '保有資格証',
  '빠른 답변': 'クイック返信',
  '빠른 메뉴': 'クイックメニュー',
  '빠른 연락': 'クイック連絡',
  '상담 관리': '相談管理',
  '상세 보기': '詳細を見る',
  '서울 강남구': 'ソウル市江南区',
  '서울 강남구 외 2곳': 'ソウル市江南区ほか2か所',
  '상태 필터': '状態フィルター',
  '상태 요약 보기 가능': '状態要約を表示可能',
  '새 배정 업무': '新しい割り当て業務',
  '설정 저장': '設定を保存',
  '성실하고 책임감 있게 돌봄을 실천하며, 항상 어르신의 입장에서 생각하겠습니다.':
    '誠実で責任感のあるケアを実践し、常に高齢者の立場で考えます。',
  '서비스 전문 분야': 'サービス専門分野',
  '신분 확인 (신분증, 명찰)': '身分確認（身分証、名札）',
  '안전 확인': '安全確認',
  '알림': '通知',
  '알림 목록': '通知一覧',
  '알림 상세 준비 중': '通知詳細は準備中',
  '알림 수신 중': '通知を受信中',
  '알림 요약': '通知要約',
  '업무 보기': '業務を見る',
  '업무 상태 필터': '業務状態フィルター',
  '업무 체크': '業務チェック',
  '업무명, 어르신 이름, 요청자 검색': '業務名、高齢者名、依頼者で検索',
  '오전 (09:00 ~ 12:00)': '午前 (09:00 ~ 12:00)',
  '오후 (13:00 ~ 17:00)': '午後 (13:00 ~ 17:00)',
  '오늘': '今日',
  '오늘 업무': '今日の業務',
  '오늘 업무 검색': '今日の業務検索',
  '오늘 업무 검색 및 필터': '今日の業務検索・フィルター',
  '오늘 업무 목록': '今日の業務一覧',
  '오늘 업무 보조 정보': '今日の業務補助情報',
  '오늘 업무 요약': '今日の業務要約',
  '오늘 일정': '今日の予定',
  '오작동 취소': '誤操作を取消',
  '요양사': '介護士',
  '요양사 배정': '介護士割り当て',
  '위험 신호와 최근 상태 알림을 빠르게 확인하세요.':
    '危険サインと最近の状態通知をすばやく確認してください。',
  '음성 안내': '音声案内',
  '음성 안내 화면': '音声案内画面',
  '음성으로 SOS 호출': '音声でSOS呼び出し',
  '음성으로 계속하기': '音声で続ける',
  '음성을 인식하여 정확하게 도와드릴게요.': '音声を認識して正確にお手伝いします。',
  '이름, 상태, 메모 내용으로 검색하세요.': '名前、状態、メモ内容で検索してください。',
  '이전': '戻る',
  '이전 화면으로 되돌아가기': '前の画面へ戻る',
  '입력 항목 체크': '入力項目チェック',
  '입력 팁': '入力のヒント',
  '자격 정보': '資格情報',
  '자격 정보 입력': '資格情報入力',
  '자격번호': '資格番号',
  '자격증': '資格証',
  '자격증 발급기관': '資格証発行機関',
  '자격증 첨부': '資格証を添付',
  '자격증 첨부 파일 아이콘': '資格証添付ファイルアイコン',
  '자격증과 서류는 선명하게 첨부되어야 합니다.':
    '資格証と書類は鮮明に添付してください。',
  '자기소개는 300자 이내로 작성해 주세요.':
    '自己紹介は300文字以内で作成してください。',
  '저장하고 다음': '保存して次へ',
  '전체': '全体',
  '전체 기록 보기': '全記録を見る',
  '전체 메모 보기': 'すべてのメモを見る',
  '전체 일정 보기': '全予定を見る',
  '전체 준비물 가이드 보기': '持ち物ガイドをすべて見る',
  '전화하기': '電話する',
  '전문 분야 / 가능 서비스': '専門分野 / 対応可能サービス',
  '조건에 맞는 방문 기록이 없어요.': '条件に合う訪問記録はありません。',
  '조건에 맞는 오늘 업무가 없어요.': '条件に合う今日の業務はありません。',
  '조건에 맞는 어르신이 없어요.': '条件に合う高齢者はいません。',
  '지금 바로 알림 발송': '今すぐ通知を送信',
  '최우선 알림': '最優先通知',
  '초대 링크 복사': '招待リンクをコピー',
  '최근 방문 기록': '最近の訪問記録',
  '최근 방문 메모': '最近の訪問メモ',
  '최근 확인:': '最近の確認:',
  '취득일': '取得日',
  '치매 이해와 케어 과정 수료 (대한치매협회)':
    '認知症理解とケア課程修了（大韓認知症協会）',
  '치매교육 수료': '認知症教育修了',
  '치매교육 수료증': '認知症教育修了証',
  '치매 케어': '認知症ケア',
  '파일 선택': 'ファイル選択',
  '파일 선택 또는 드래그하여 업로드': 'ファイルを選択またはドラッグしてアップロード',
  '표시할 알림이 없어요.': '表示する通知はありません。',
  '프로필 미리보기': 'プロフィールプレビュー',
  '프로필 정보는 가입 완료 후에도 수정할 수 있습니다.':
    'プロフィール情報は登録完了後も修正できます。',
  '프로필 사진': 'プロフィール写真',
  '프로필 수정': 'プロフィール編集',
  '한국보건의료인국가시험원': '韓国保健医療人国家試験院',
  '행복돌봄센터': '幸せケアセンター',
  '희망 근무 형태': '希望勤務形態',
  '희망 활동 시간': '希望活動時間',
  '희망 활동 시간 / 요일': '希望活動時間 / 曜日',
}

const phraseJa: ReadonlyArray<[RegExp, string]> = [
  [/김영자님/g, 'キム・ヨンジャさん'],
  [/이순자님/g, 'イ・スンジャさん'],
  [/박철수님/g, 'パク・チョルスさん'],
  [/최복례님/g, 'チェ・ボクリェさん'],
  [/최복순님/g, 'チェ・ボクスンさん'],
  [/김태환님/g, 'キム・テファンさん'],
  [/이수진 복지사/g, 'イ・スジン福祉担当者'],
  [/박수진 복지사/g, 'パク・スジン福祉担当者'],
  [/김민수 요양사/g, 'キム・ミンス介護士'],
  [/김민수/g, 'キム・ミンス'],
  [/이수진/g, 'イ・スジン'],
  [/이순자/g, 'イ・スンジャ'],
  [/박철수/g, 'パク・チョルス'],
  [/김영자/g, 'キム・ヨンジャ'],
  [/복지사/g, '福祉担当者'],
  [/요양보호사/g, '介護福祉士'],
  [/요양사/g, '介護士'],
  [/사회복지사/g, '社会福祉士'],
  [/간호조무사/g, '看護助手'],
  [/어르신/g, '高齢者'],
  [/가족/g, '家族'],
  [/보호자/g, '保護者'],
  [/오늘/g, '今日'],
  [/내일/g, '明日'],
  [/어제/g, '昨日'],
  [/최근/g, '最近'],
  [/방문/g, '訪問'],
  [/기록/g, '記録'],
  [/일정/g, '予定'],
  [/업무/g, '業務'],
  [/상담/g, '相談'],
  [/보고서/g, 'レポート'],
  [/알림/g, '通知'],
  [/상태/g, '状態'],
  [/위험/g, '危険'],
  [/주의/g, '注意'],
  [/안정/g, '安定'],
  [/완료/g, '完了'],
  [/진행 중/g, '進行中'],
  [/예정/g, '予定'],
  [/미작성/g, '未作成'],
  [/작성 완료/g, '作成完了'],
  [/임시 저장/g, '一時保存'],
  [/전체/g, '全体'],
  [/담당/g, '担当'],
  [/대상자/g, '対象者'],
  [/요청/g, '依頼'],
  [/내용/g, '内容'],
  [/마감/g, '締切'],
  [/검색/g, '検索'],
  [/필터/g, 'フィルター'],
  [/메모/g, 'メモ'],
  [/관리/g, '管理'],
  [/연결/g, '連携'],
  [/권한/g, '権限'],
  [/변경/g, '変更'],
  [/초대/g, '招待'],
  [/코드/g, 'コード'],
  [/복사/g, 'コピー'],
  [/보내기/g, '送信'],
  [/확인/g, '確認'],
  [/작성/g, '作成'],
  [/보기/g, '見る'],
  [/시작/g, '開始'],
  [/추가/g, '追加'],
  [/저장/g, '保存'],
  [/전화/g, '電話'],
  [/연락/g, '連絡'],
  [/길찾기/g, '経路案内'],
  [/위치/g, '位置'],
  [/주소/g, '住所'],
  [/자격/g, '資格'],
  [/정보/g, '情報'],
  [/프로필/g, 'プロフィール'],
  [/미리보기/g, 'プレビュー'],
  [/입력/g, '入力'],
  [/설정/g, '設定'],
  [/기관/g, '機関'],
  [/복약/g, '服薬'],
  [/식사/g, '食事'],
  [/수면/g, '睡眠'],
  [/통증/g, '痛み'],
  [/기분/g, '気分'],
  [/일반/g, '一般'],
  [/낮음/g, '低い'],
  [/높음/g, '高い'],
  [/보통/g, '普通'],
  [/긴급/g, '緊急'],
  [/오작동/g, '誤操作'],
  [/취소/g, '取消'],
  [/준비 중/g, '準備中'],
  [/자기소개/g, '自己紹介'],
  [/첨부/g, '添付'],
  [/서류/g, '書類'],
  [/서비스/g, 'サービス'],
  [/활동/g, '活動'],
  [/지역/g, '地域'],
  [/경력/g, '経歴'],
  [/근무/g, '勤務'],
  [/기간/g, '期間'],
  [/시작월/g, '開始月'],
  [/종료월/g, '終了月'],
  [/담당 업무/g, '担当業務'],
  [/희망/g, '希望'],
  [/요일/g, '曜日'],
  [/추가 교육/g, '追加教育'],
  [/수료일/g, '修了日'],
  [/수료/g, '修了'],
  [/식사 보조/g, '食事補助'],
  [/이동 보조/g, '移動補助'],
  [/정서 지원/g, '情緒支援'],
  [/야간 케어/g, '夜間ケア'],
  [/주간 돌봄/g, '日中ケア'],
  [/단기 돌봄/g, '短期ケア'],
  [/이름/g, '名前'],
  [/나이/g, '年齢'],
  [/연락처/g, '連絡先'],
  [/딸/g, '娘'],
  [/아들/g, '息子'],
  [/세/g, '歳'],
  [/명/g, '名'],
  [/건/g, '件'],
  [/월/g, '月'],
  [/화/g, '火'],
  [/수/g, '水'],
  [/목/g, '木'],
  [/금/g, '金'],
  [/토/g, '土'],
  [/일/g, '日'],
  [/급/g, '級'],
  [/분/g, '分'],
]

const fallbackAttributes = [
  'alt',
  'aria-label',
  'placeholder',
  'title',
] as const

const hangulPattern = /[가-힣]/
const textOriginals = new WeakMap<Text, string>()
const attrOriginals = new WeakMap<Element, Map<string, string>>()
const inputOriginals = new WeakMap<HTMLInputElement | HTMLTextAreaElement, string>()

function hasHangul(value: string) {
  return hangulPattern.test(value)
}

function shouldSkip(node: Node) {
  const element =
    node.nodeType === Node.ELEMENT_NODE
      ? (node as Element)
      : node.parentElement

  return Boolean(
    element?.closest(
      'script, style, noscript, svg, canvas, [data-i18n-skip]',
    ),
  )
}

function cleanupResidualHangul(value: string) {
  if (!hasHangul(value)) {
    return value
  }

  const withoutHangul = value
    .replace(/[가-힣]+/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

  return withoutHangul || '内容を確認してください'
}

export function translateLegacyDomText(value: string) {
  const normalized = value.replace(/\s+/g, ' ').trim()
  const exact = exactJa[normalized]

  if (exact) {
    return value.replace(normalized, exact)
  }

  let translated = value

  for (const [pattern, replacement] of phraseJa) {
    translated = translated.replace(pattern, replacement)
  }

  return cleanupResidualHangul(translated)
}

function translateTextNode(node: Text, language: AppLanguage) {
  if (shouldSkip(node)) {
    return
  }

  const current = node.textContent ?? ''

  if (language === 'ja') {
    if (!hasHangul(current)) {
      return
    }

    if (!textOriginals.has(node)) {
      textOriginals.set(node, current)
    }

    const next = translateLegacyDomText(current)

    if (node.textContent !== next) {
      node.textContent = next
    }

    return
  }

  if (!textOriginals.has(node)) {
    return
  }

  const next = textOriginals.get(node) ?? ''

  if (node.textContent !== next) {
    node.textContent = next
  }
}

function translateAttributes(element: Element, language: AppLanguage) {
  if (shouldSkip(element)) {
    return
  }

  for (const attribute of fallbackAttributes) {
    const current = element.getAttribute(attribute)

    if (!current) {
      continue
    }

    if (language === 'ja') {
      if (!hasHangul(current)) {
        continue
      }

      const originals = attrOriginals.get(element) ?? new Map<string, string>()

      if (!attrOriginals.has(element)) {
        attrOriginals.set(element, originals)
      }

      if (!originals.has(attribute)) {
        originals.set(attribute, current)
      }

      const next = translateLegacyDomText(current)

      if (current !== next) {
        element.setAttribute(attribute, next)
      }

      continue
    }

    const original = attrOriginals.get(element)?.get(attribute)

    if (original && current !== original) {
      element.setAttribute(attribute, original)
    }
  }

  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement
  ) {
    const current = element.value

    if (language === 'ja') {
      if (!hasHangul(current)) {
        return
      }

      if (!inputOriginals.has(element)) {
        inputOriginals.set(element, current)
      }

      const next = translateLegacyDomText(current)

      if (current !== next) {
        element.value = next
      }

      return
    }

    if (!inputOriginals.has(element)) {
      return
    }

    const next = inputOriginals.get(element) ?? ''

    if (current !== next) {
      element.value = next
    }
  }
}

function translateTree(root: ParentNode, language: AppLanguage) {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
  )

  let current: Node | null = walker.currentNode

  while (current) {
    if (current.nodeType === Node.TEXT_NODE) {
      translateTextNode(current as Text, language)
    } else if (current.nodeType === Node.ELEMENT_NODE) {
      translateAttributes(current as Element, language)
    }

    current = walker.nextNode()
  }
}

export function applyLegacyDomFallback(language: AppLanguage) {
  translateTree(document.body, language)

  if (language !== 'ja') {
    return () => {}
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          translateTextNode(node as Text, language)
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          translateTree(node as Element, language)
        }
      }

      if (mutation.type === 'characterData') {
        translateTextNode(mutation.target as Text, language)
      }

      if (mutation.type === 'attributes') {
        translateAttributes(mutation.target as Element, language)
      }
    }
  })

  observer.observe(document.body, {
    attributeFilter: [...fallbackAttributes],
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  })

  return () => observer.disconnect()
}
