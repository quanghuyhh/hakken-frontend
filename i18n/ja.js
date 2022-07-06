import ja from 'vee-validate/dist/locale/ja.json'

export default {
  welcome: 'Welcome back!',
  nuxt: 'Nuxt Auth',
  username: 'Username',
  email_address: 'メールアドレス',
  confirm_email_address: 'メールアドレス(再入力)',
  password: 'パスワード',
  password_placeholder: '半角英数字8文字以上',
  confirm_password: 'パスワード',
  confirm_password_placeholder: '半角英数字8文字以上',
  code: 'Code',
  code_placeholder: 'Code',
  register: 'Register',
  login: 'ログイン',
  logout: 'ログアウト',
  my_profile: 'プロフィール',
  title: 'Hakken',
  already_account: '既にアカウントをお持ちですか？',
  login_button: 'ログインして相談する',
  forgot_button: '送信',
  confirm_forgot_password_button: 'Change Password',
  skip_button: '目的地未定',
  next_button: '次へ',
  common: {
    screen: {
      mypage: 'マイページへ',
      long_suffix: '%s｜日本中の旅行マイスターにオンラインで相談！オンライン旅相談【HAKKEN】',
      short_suffix: '%s｜【HAKKEN】',
      hakken_suffix: '%s【HAKKEN】'
    },
    footer: {
      news_title: '〇〇旅行会社が〇〇〇しました。〇〇旅行会社が〇〇〇しました。〇〇旅行会社が〇〇〇しました。'
    }
  },
  errors: {
    403: 'You don\'t have permission to access.'
  },
  calendar: {
    calendar_previous: '前月',
    calendar_next: '次月',
    monday: '月',
    tuesday: '火',
    wednesday: '水',
    thursday: '木',
    friday: '金',
    saturday: '土',
    sunday: '日',
    year: '年',
    month: '月',
    day: '日'
  },
  season: {
    spring: '春',
    summer: '夏',
    autumn: '秋',
    winter: '冬',
    no_season: '時期未定',
    warning: '「春」「夏」「秋」「冬」「時期未定」を選択した場合は、カレンダーで日付を選ぶことはできません'
  },
  forgot_password_link: 'パスワードを忘れた方 はこちら',
  human_unit: '名',
  human: '大人',
  children: '子供',
  kid: '幼児',
  travel_date: '旅行日',
  destination: '目的地',
  departure_address: '出発地',
  number_of_customers: '人数',
  purpose_of_travel: '旅行目的',
  budget_of_travel: '予算の目安',
  interested_in: '興味がある事',
  request: '要望',
  consultDay: '相談日',
  require: '必須',
  cannot_edit: '変更不可',
  search: '検索',
  back: '戻る',
  update: '更新する',
  header: {
    logout_button: 'ログアウト',
    edit_profile_button: '登録情報変更',
    home_button: 'サイトトップ'
  },
  custom_modal: {
    save: '予約する',
    close: '閉じる'
  },
  guest_header: {
    logo_alt: 'オンライン旅相談 HAKKEN',
    online_travel_consultation: 'ONLINE TRAVEL CONSULTATION',
    register_button: '新規会員登録',
    login_button: 'ログイン',
    travel_online_title: '日本中の旅行マイスターに',
    consult_online: 'オンラインで相談 ！',
    update_consultation_request: '相談内容を修正する',
    collect_info: {
      toggle_button: '相談内容',
      travel_date: '旅行日',
      destination: '目的地',
      point_of_departure: '出発地',
      number_of_customers: '人数',
      purpose_of_travel: '旅行目的',
      budget_of_travel: '予算の目安',
      interested_in: '興味がある事',
      request: '要望'
    }
  },
  guest_footer: {
    company: '会社案内',
    privacy: 'プライバシーポリシー',
    travel: 'インターネット旅行取引の詳細',
    terms_of_service: '利用規約',
    contact: 'お問い合わせ',
    copy_right: '© 2021 Cab Station Co., Ltd.',
    new_and_toppics: 'NEWS&TOPICS'
  },
  login_page: {
    title_page: 'HAKKENログイン',
    login_guide: '登録済みのメールアドレスとパスワードを入力してください。',
    messages: {
      login_success: 'ログインしました'
    },
    exception: {
      not_authorized: 'メールアドレスまたはパスワードが違います',
      default: '不明なエラーが発生しました。再度発生する場合は管理者までご連絡ください。(EL001）'
    },
    validation: {
      email_or_password_is_empty: 'メールアドレスおよびパスワードは必須項目です',
      email_or_verification_code_is_empty: 'Email or Code is not empty'
    }
  },
  profile: {
    back_button_title: 'マイページTOPへ戻る',
    page_title: '登録情報変更',
    change_password: 'パスワードの変更はこちらから',
    messages: {
      update_info_success: '登録情報を更新しました。'
    }
  },
  fields_placeholder: {
    email: 'info@hakken.jp',
    name: '例）山田 太郎',
    name_kana: '例）ヤマダ タロウ',
    kana_name: '例）ヤマダ タロウ',
    name_roman: '例）YAMADA TAROU',
    company_name_example: '例）株式会社〇〇〇',
    mobile: '例）000-0000-0000',
    phone: '例）000-0000-0000',
    tel: '例）00-0000-0000',
    fax: '例）00-0000-0000',
    post_code: '000-0000'
  },
  forgot_password: {
    title_page: 'パスワードを忘れた方',
    forgot_guide: '登録済みのメールアドレスを入力してください。パスワードリセット用のURLを送付いたします。',
    forgot_guide_success: '登録済みのメールアドレスにパスワードリセット用のURLを送付いたしました。',
    messages: {
      forgot_password_success: 'Successfully'
    },
    exception: {
      not_authorized: 'メールアドレスまたはパスワードが正しくありません.',
      user_not_found_exception: 'ユーザーが見つかりません',
      default: '不明なエラーが発生しました。再度発生する場合は管理者までご連絡ください。(EF001）'
    },
    validation: {
      email_or_password_is_empty: 'メールアドレスおよびパスワードは必須項目です'
    },
    cognito: {
      forgot_success: 'Success',
      forgot_failed: 'Failed'
    }
  },
  confirm_forgot_password: {
    title_page: 'パスワード再設定',
    confirm_forgot_guide: '新しいパスワードを登録してください。',
    messages: {
      change_password_success: 'パスワードを変更しました'
    },
    input: {
      new_password: '新しいパスワード',
      confirm_new_password: '新しいパスワード(再入力)',
      new_password_placeholder: '半角英数字8文字以上',
      confirm_password_placeholder: '上記と同じパスワードを入力'
    },
    btn: {
      change_password: '設定'
    },
    exception: {
      not_authorized: 'メールアドレスまたはパスワードが正しくありません.',
      expired_code_exception: '有効期限を過ぎています',
      invalid_password_exception: 'パスワードが正しくありません',
      user_not_found_exception: 'ユーザーが見つかりません',
      default: '不明なエラーが発生しました。再度発生する場合は管理者までご連絡ください。(EC001）'
    },
    validation: {
      email_or_password_is_empty: 'メールアドレスおよびパスワードは必須項目です',
      confirm_password_not_match: 'パスワードが一致していません'
    },
    cognito: {
      password_confirmed: 'Password Confirmed',
      password_not_confirmed: 'Password Not Confirmed'
    }
  },
  change_password: {
    page_title: 'パスワード変更',
    notice: 'パスワードを変更すると一度ログアウトします。',
    messages: {
      change_password_success: 'パスワードが更新されました。',
      change_password_failed: 'パスワードの変更が出来ませんでした。再度発生する場合は管理者までご連絡ください。'
    }
  },
  verify_register_page: {
    title_page: 'HAKKEN新規会員登録',
    guide_page: '旅行マイスターにオンライン相談するには会員登録が必要です。\n\r 以下のフォームにメールを入力して送信してください。',
    guide_sent_page: '入力されたメールアドレスに会員登録用のURLを送付いたしました。\n\r 手順に従って会員登録を完了してください。',
    field_email: 'メールアドレス',
    button_send: '送信'
  },
  register_page: {
    title_page: 'HAKKEN新規会員登録',
    required: '必須',
    field_name: 'お名前',
    placeholder_name: '例）山田 太郎',
    field_name_kana: 'お名前(カナ)',
    placeholder_name_kana: '例）ヤマダ タロウ',
    field_phone_number: '携帯電話',
    placeholder_phone_number: '例）090-0000-0000',
    field_password: 'パスワード',
    placeholder_password: '半角英数字8文字以上',
    field_confirm_password: 'パスワード(再入力)',
    placeholder_confirm_password: '上と同じパスワードを入力してください',
    register_button: '確認画面へ',
    register_submit_button: '登録して相談する',
    cancel_submit_button: '修正',
    accept_term: 'プライバシーポリシーと利用規約に同意します。',
    exception: {
      verify_invalid: 'URLが正しくないか、有効期限を過ぎています!',
      verify_expire: 'リンクの有効期限を過ぎています。再度会員登録を行ってください',
      register_failed: 'ユーザー登録が出来ませんでした。再度発生する場合は管理者までご連絡ください。'
    }
  },
  mypage: {
    title: '相談内容・提案一覧',
    tabs: {
      requested: '相談・予約',
      confirmed: '予約確定',
      completed: '相談履歴'
    },
    consult_block: {
      no: '受付No',
      consult_date: '相談依頼日',
      cancel_consult: '相談の取消'
    },
    consult_list: {
      title: 'ご提案一覧',
      title_completed: '相談済み',
      title_reserved: 'ご予約済み',
      message: 'メッセージ',
      call: 'オンライン相談',
      document: '各種書類',
      price_total: 'お見積り総額',
      include_tax: '税込',
      detail_consult: 'プラン詳細',
      meister_decline: '誠に申し訳ありませんがご依頼を承れませんでした。'
    },
    old_consult: {
      title: '過去の相談内容',
      detail_consult: '詳細',
      destination: '行先'
    },
    no_request: {
      no_consult_title: '旅行相談がありません。',
      find_meister: 'ご希望の相談内容で旅行マイスターを探してください。',
      top_button: '相談を依頼する',
      no_reserved_title: '予約確定の相談はありません。',
      no_completed_title: '過去の相談はありません。'
    },
    wait_consult: {
      finding_meister: '旅行マイスター選出中です。',
      after_find_meister: '選出が完了すると登録のメールアドレスに通知が送られます。'
    },
    edit_profile: {
      title: '{name}マイスターとのメッセージ',
      find_post_code_fail: '入力された郵便番号が正しくありません',
      invalid_form_data: '入力された内容に誤りがあります。入力した内容をご確認ください。',
      update_failed: 'プロフィールの更新が出来ませんでした',
      fetch_profile_failed: 'プロフィールの取得に失敗しました'
    },
    popup: {
      cancel: {
        title: '相談依頼を取り消しますか？',
        cancel: '取り消す',
        submit: '閉じる',
        cancel_error: '相談依頼の取消が出来ませんでした。再度発生する場合は管理者までご連絡ください。',
        cancel_successfully: '相談依頼を取り消しました。',
        date_select_error: '有効な日付を入力してください。'
      },
      pdf: {
        title: '各種書類[PDF]',
        estimation: '見積書',
        reverse_confirmation: '予約確認書',
        invoice: '請求書',
        receipt: '領収書'
      },
      video: {
        save: '希望日を変更する',
        save_change_request: '相談依頼を送る',
        select_date: '希望日を選択',
        create_success: {
          title: 'ご希望相談日時を受け付けました。',
          message: 'マイスターは相談日時を調整中です。'
        },
        no_request: {
          title: 'オンライン相談依頼'
        },
        change_request: {
          title: 'オンライン相談日変更要求'
        }
      }
    },
    tooltip: {
      requested: '[希望日]',
      accepted: '[相談日]',
      changed: '[変更]'
    },
    message: {
      title: 'メッセージボックス'
    }
  },
  plan_page: {
    page_title: '{meister_name}マイスターの提案プラン',
    title: 'ご提案プラン',
    redirect_top: 'マイページTOPへ戻る',
    total_price: '株式会社キャブステーション',
    plan_total_price: 'お見積り書',
    detail: '予約する',
    requested: '予約済',
    continue_plan: 'このプランの予約へ進む',
    update_plan: '更新する',
    quantity: '総額',
    quantity_suffix: '円',
    meal: '食事',
    itinerary: '行程表',
    register_plan_modal: {
      title: 'プランの予約申込',
      description: 'プランにお申込み頂く際には、会員情報の更新が必要です。\n必須情報を入力の上ご予約へお進みください。'
    },
    head: {
      title: '旅のしおり（プラン詳細）'
    },
    foot: {
      back_to_top: 'トップページへ',
      back_to_matching: '変更・取消',
      back_to_mypage: '別のマイスターと相談 '
    },
    popup: {
      policy: {
        accept_policy: 'プライバシーポリシーに同意します。',
        accept_term: '利用規約に同意します。',
        accept_agency_agreement: '旅行業約款に同意します。',
        accept_transaction: '取引条件説明書面（重要事項）及び取引条件説明書面（共通事項）を表示し保存しました。',
        accept_consent: '取引条件説明書面を電磁的方法で交付することを承諾します。',
        accept_provider_data: '旅行手配のために必要な範囲内での運送・宿泊機関・保険会社等への個人データの提供について同意します。'
      },
      approved_policy: {
        title: '旅行プランのご予約を承りました。',
        description: 'この度、旅行プランのご予約をいただき誠にありがとうございます。担当のマイスターはリソースの調整でき次第、連絡いたします。旅行マイスターからのメッセージはマイページでご確認頂けます。',
        btn_close: 'プラン詳細に戻る'
      },
      back_consultation_list: {
        title: '予約の取消または変更',
        send_message: '変更する',
        cancel: '取消する',
        default_message: '予約内容の変更相談をしたいです。'
      },
      cancel_reservation: {
        title: '予約取消に関して',
        description: '予約の取消を行います。以下のフォームに入力の上、「予約を取消」ボタンを押してください。',
        input_reason: '1. 取消理由をご記入ください。',
        placeholder_reason: '例: 日程調整ができなくなったため',
        input_policy: '2. 予約取消のポリシーをご確認の上でチェックしてください。',
        checkbox_term_and_policy: '予約取消の規約に同意します。',
        btn_cancel: '予約を取消',
        btn_exit: '閉じる',
        form_error: 'Somethings wrong! Please check and try again.'
      },
      cancel_step_2: {
        title: 'この内容で予約の取消をしてよろしいでしょうか。',
        yes: 'はい',
        no: 'いいえ'
      },
      cancel_step_3: {
        description: '予約の取消を受け付けました。<br/>取消手続きが完了するまで数日かかる場合がございます。<br/>予めご了承ください。',
        close: '閉じる'
      }
    }
  },
  traveller_request_page: {
    back_slide: '戻る',
    next_slide: '次へ',
    submit_request: 'この条件でマイスターを探す',
    prefectures: '都道府県',
    step1: {
      title: '目的地を教えてください。',
      no_address_button: '目的地未定',
      address_select: '目的地'
    },
    step3: {
      title: '旅行日(出発日)はいつですか？'
    },
    step4: {
      step3_title: '旅の日数は何日ですか？',
      step4_title: '人数は何人ですか？'
    },
    step5: {
      title: '旅の目的を教えてください。'
    },
    step6: {
      title: '旅の費用の目安を教えてください。',
      total: '総額',
      per_person: '一人当たり',
      yen: '円程度'
    },
    step7: {
      title: '興味がある事を選択してください。(複数可)'
    },
    step8: {
      title: '出発地を教えてください。',
      select: '選択',
      selected: '選択済',
      remove: '取消'
    },
    step9: {
      title: '何かご質問・ご要望はございますか？',
      destination_undecided: '目的地未定',
      request_placeholder: 'ご希望の相談日時や相談方法があれば、お気軽にご記入ください。'
    },
    step10: {
      title: '下記の内容でよろしいですか？',
      destination_undecided: '目的地未定',
      request: 'ご要望'
    },
    number_of_customers: '人数',
    budget_of_travel: '予算の目安',
    travel_day: '旅行日',
    destination_address: '目的地',
    departure_address: '出発地',
    human: '大人',
    children: '子供',
    kid: '幼児',
    purpose_of_travel: '旅行目的',
    interested_in: '興味がある事',
    note: 'ご要望',
    register_member: '会員登録して相談する',
    login_to_consul: 'ログインして相談する'
  },
  consultations: {
    matched_travel_meister: 'マッチングした旅行マイスター',
    matched_travel_meister_addition: '旅行マイスターの詳細ページより相談依頼が行えます。\nまた、旅行マイスターは何人でも相談可能です。',
    no_meister_matched: 'マッチングマイスターが見つかりませんでした。\n旅行条件を再設定し、再度マイスターをご検索ください。',
    no_matched_travel_meister_addition: 'マッチングマイスターが見つかりませんでした。\n旅行条件を再設定し、再度マイスターをご検索ください。',
    matched_travel_meister_button: '全ての旅行マイスターに相談する',
    matching_result: {
      title: '旅行マイスター一覧',
      station: '株式会社キャブステーション',
      name: '山田 太郎',
      prefecture: '石川県',
      travel_meister_details: '旅行マイスターの詳細',
      number_of_consultations: '相談件数',
      evaluation: '評価',
      category: '得意なカテゴリー',
      subject: '件',
      modal: {
        title: '全ての旅行マイスターに相談'
      }
    },
    matching_detail: {
      title: '{company_name}{meister_name}｜オンライン旅相談',
      back_travel_meisters: '旅行マイスター 一覧へ',
      talk_to_travel_meister: 'この旅行マイスターに相談する',
      travel_plan: 'いちおしの旅行プラン'
    },
    modal: {
      create_consultations: '相談する',
      day: '日'
    },
    send_consult: {
      title: '旅行相談を承りました。',
      back_to_meister_list: '旅行マイスター 一覧へ戻る'
    }
  },
  itineraries: {
    status: {
      processing: '受付までしばらくお待ちください',
      cancelled: '誠に申し訳ありませんがご依頼を承れませんでした。'
    }
  },
  online_meeting: {
    meeting_time: 'オンライン相談開始日時',
    customer_name: '顧客名',
    total_estimated_price: 'お見積り総額',
    estimated_price_suffix: '円(税込)',
    plan_detail: '見積詳細',
    chat_screen: '相談履歴'
  },
  chat: {
    send_message_failed: 'Somethings went wrong. Cannot send you message.'
  },
  fields: {
    email: 'メールアドレス',
    confirm_email: 'メールアドレス(再入力)',
    password: 'パスワード',
    current_password: '現在のパスワード',
    confirm_password: 'パスワード(再入力)',
    type: '登録種別',
    register_type: '登録種別',
    register_person_type: '個人',
    register_company_type: '法人',
    mypage: {
      name: '氏名',
      name_kana: '氏名(カナ)'
    },
    name_roman: '氏名(ローマ字)',
    company_name: '会社名',
    gender: '性別',
    male_gender: '男性',
    female_gender: '女性',
    unknown_gender: '回答しない',
    birthday: '生年月日',
    mobile: '携帯',
    phone: '携帯',
    tel: '固定電話',
    fax: 'FAX',
    post_code: '郵便番号',
    city: '都道府県',
    district: '市区町村',
    municipalities: '市区町村',
    address: 'ビル・建物名',
    accept_term: '利用規約',
    name: 'お名前',
    name_kana: 'お名前(カナ)',
    field_new_password: '新しいパスワード',
    field_new_password_confirmation: '新しいパスワード(再入力)',
    cancel_reservation: {
      reason: '取消理由を',
      agreement: ''
    }
  },
  validations: {
    ...ja.messages,
    password_strength: 'パスワードは半角英数字8文字以上で設定してください。',
    mobile_jp: '「携帯」は正しい形式で入力してください。',
    phone: '{_field_} の入力に誤りがあります',
    mobile: '「携帯」の形式が正しくありません',
    fax: '「FAX」の形式が正しくありません',
    katakana: '全角カタカナで入力してください'
  }
}
