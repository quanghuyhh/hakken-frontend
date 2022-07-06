export const RESERVATION_MOCKUP = {
  id: 8,
  hash_id: 'f0279142-309f-413c-ac87-0c90e2909081',
  traveler_id: 64,
  code: 'HA2204A5608',
  destination_id: 4,
  point_of_departure_id: 3,
  status: 'completed',
  start_date: '2022-04-26',
  end_date: '2022-04-27',
  total_day: 1,
  number_of_adult: 2,
  number_of_children: 0,
  number_of_infant: 0,
  budget: 0,
  season: null,
  address_optionals: null,
  note: '',
  max_number_meister: 5,
  created_at: '2022-04-19 07:06:13',
  updated_at: '2022-04-19 07:07:02',
  created_at_timestamp: 1650351973,
  start_date_timestamp: 1650351973,
  end_date_timestamp: 1650351973,
  destination: {
    id: 4,
    hash_id: 'e5dda95e-2fc5-4bdc-8ead-81d3260bcf3e',
    name: '宮城県'
  },
  point_of_departure: {
    id: 3,
    hash_id: '22a2d546-3487-4959-8f21-5c1b2d6cb1cd',
    name: '岩手県'
  },
  purposes: [{
    id: 18,
    hash_id: '045e46c5-e6af-440a-9fd7-4b33d05c3f90',
    name: '医療ツーリズム',
    pivot: {
      consultation_id: 8,
      purpose_id: 18
    }
  }],
  favorites: [{
    id: 24,
    hash_id: '6ec8e874-6c4e-4b58-b5ab-270c8a374030',
    name: 'パワースポットや映えスポット',
    pivot: {
      consultation_id: 8,
      favorite_id: 24
    }
  }],
  matching: [{
    id: 28,
    hash_id: 'fbf7f1fc-d4e4-439e-a3ce-a2df74b93b23',
    code: 'muciAJ0olkPGKBoD',
    consultation_id: 8,
    meister_id: 16,
    status: 'estimated',
    is_choose_one: 1,
    expected_meeting_time: null,
    created_at: '2022-04-19 07:06:13',
    updated_at: '2022-04-19 07:06:13',
    deleted_at: null,
    meister: {
      id: 16,
      hash_id: '6e5dcbff-7980-308d-b9ad-226d88a0255f',
      cognito_id: '4f9b9ff2-377d-4b7c-84d4-e2855392cb79',
      name: '田中優',
      email: 'meister+14@hakken.dev',
      destination_id: 4,
      parent_id: null,
      created_at: '2022-04-18T08:31:27.000000Z',
      updated_at: '2022-04-18T08:31:27.000000Z',
      company: {
        name: '株式会社Cab Station'
      },
      avatar: '/images/reservation/sample_prof01.jpg'
    },
    itinerary: {
      id: 6,
      hash_id: 'da16c6e0-63dd-4020-83c8-98447c1bbbf7',
      code: 'Qqc4eJwPP2pju1qzkqAd',
      consultation_id: 8,
      matching_consultations_meister_id: 25,
      meister_id: 13,
      traveler_id: 64,
      status: 'estimated',
      created_at: '2022-04-19 07:09:50',
      updated_at: '2022-04-27 17:00:15',
      deleted_at: null
    },
    online_meeting: [],
    status_index: 5
  }, {
    id: 27,
    hash_id: '92fc7f93-2621-40d6-9cfe-ebb2c4c87e14',
    code: 'CxXeQi7PUeJXhUYc',
    consultation_id: 8,
    meister_id: 15,
    status: 'cancelled',
    is_choose_one: 1,
    expected_meeting_time: null,
    created_at: '2022-04-19 07:06:13',
    updated_at: '2022-04-19 07:06:13',
    deleted_at: null,
    meister: {
      id: 15,
      hash_id: '77a0d9fe-9b5e-3827-b368-65fb16e0a94f',
      cognito_id: '453ec661-4d44-49ef-8e89-94fc7fc6b0d7',
      name: '田中優',
      email: 'meister+13@hakken.dev',
      destination_id: 4,
      parent_id: null,
      created_at: '2022-04-18T08:31:26.000000Z',
      updated_at: '2022-04-18T08:31:26.000000Z',
      company: {
        name: '株式会社Cab Station'
      },
      avatar: '/images/reservation/sample_prof02.jpg'
    },
    itinerary: {
      id: 6,
      hash_id: 'da16c6e0-63dd-4020-83c8-98447c1bbbf7',
      code: 'Qqc4eJwPP2pju1qzkqAd',
      consultation_id: 8,
      matching_consultations_meister_id: 25,
      meister_id: 13,
      traveler_id: 64,
      status: 'cancelled',
      created_at: '2022-04-19 07:09:50',
      updated_at: '2022-04-27 17:00:15',
      deleted_at: null
    },
    online_meeting: [],
    status_index: 5
  }, {
    id: 26,
    hash_id: '0284fdb2-07e9-41ed-93c8-28875a2aea06',
    code: '177DOWWEoVyUbDKC',
    consultation_id: 8,
    meister_id: 14,
    status: 'cancelled',
    is_choose_one: 1,
    expected_meeting_time: null,
    created_at: '2022-04-19 07:06:13',
    updated_at: '2022-04-19 07:06:13',
    deleted_at: null,
    meister: {
      id: 14,
      hash_id: '8230b335-820a-3e1f-b238-07dfa2b5a91a',
      cognito_id: '7269ddc4-012f-47fd-a58b-9dbe781af1f3',
      name: '田中優',
      email: 'meister+12@hakken.dev',
      destination_id: 4,
      parent_id: null,
      created_at: '2022-04-18T08:31:26.000000Z',
      updated_at: '2022-04-18T08:31:26.000000Z',
      company: {
        name: '株式会社ABC'
      },
      avatar: '/images/reservation/sample_prof03.jpg'
    },
    itinerary: {
      id: 6,
      hash_id: 'da16c6e0-63dd-4020-83c8-98447c1bbbf7',
      code: 'Qqc4eJwPP2pju1qzkqAd',
      consultation_id: 8,
      matching_consultations_meister_id: 25,
      meister_id: 13,
      traveler_id: 64,
      status: 'cancelled',
      created_at: '2022-04-19 07:09:50',
      updated_at: '2022-04-27 17:00:15',
      deleted_at: null
    },
    online_meeting: [],
    status_index: 5
  }, {
    id: 25,
    hash_id: '9a5d4988-56ab-4cb4-9738-69c08aa2c399',
    code: 'Xb3MBKUJOucBWmVa',
    consultation_id: 8,
    meister_id: 13,
    status: 'completed',
    is_choose_one: 1,
    expected_meeting_time: null,
    created_at: '2022-04-19 07:06:13',
    updated_at: '2022-04-19 07:09:50',
    deleted_at: null,
    meister: {
      id: 13,
      hash_id: 'e4e31658-a58a-3a87-9cab-d86f992a2dd0',
      cognito_id: '93da13ed-5b09-4ef3-b630-e567c91f73a7',
      name: '田中優',
      email: 'meister+11@hakken.dev',
      destination_id: 4,
      parent_id: null,
      created_at: '2022-04-18T08:31:25.000000Z',
      updated_at: '2022-04-18T08:31:25.000000Z',
      company: {
        name: '株式会社カンコウ'
      },
      avatar: '/images/reservation/sample_prof04.jpg'
    },
    itinerary: {
      id: 6,
      hash_id: 'da16c6e0-63dd-4020-83c8-98447c1bbbf7',
      code: 'Qqc4eJwPP2pju1qzkqAd',
      consultation_id: 8,
      matching_consultations_meister_id: 25,
      meister_id: 13,
      traveler_id: 64,
      status: 'completed',
      created_at: '2022-04-19 07:09:50',
      updated_at: '2022-04-27 17:00:15',
      deleted_at: null
    },
    online_meeting: [],
    status_index: 0
  }, {
    id: 24,
    hash_id: 'b06ce30f-c850-4820-b158-fbf550110e79',
    code: 'rHQRPaxyqp6HUDrp',
    consultation_id: 8,
    meister_id: 12,
    status: 'accepted',
    is_choose_one: 1,
    expected_meeting_time: null,
    created_at: '2022-04-19 07:06:13',
    updated_at: '2022-04-19 07:07:02',
    deleted_at: null,
    meister: {
      id: 12,
      hash_id: 'babb8fdf-884a-3ac8-862b-16dcb10449c2',
      cognito_id: 'd8a34b93-21bf-4adf-9e6f-bab17cc03dbc',
      name: '田中優',
      email: 'meister+10@hakken.dev',
      destination_id: 4,
      parent_id: null,
      created_at: '2022-04-18T08:31:25.000000Z',
      updated_at: '2022-04-18T08:31:25.000000Z',
      company: {
        name: '株式会社Cab Station'
      },
      avatar: '/images/reservation/sample_prof05.jpg'
    },
    itinerary: {
      id: 5,
      hash_id: '157dd7b8-4948-4f9b-bbcc-f4c64bd3bdc8',
      code: '8HFnJLePijWalXG06UIT',
      consultation_id: 8,
      matching_consultations_meister_id: 24,
      meister_id: 12,
      traveler_id: 64,
      status: 'estimated',
      created_at: '2022-04-19 07:07:02',
      updated_at: '2022-04-19 07:07:02',
      deleted_at: null
    },
    online_meeting: [],
    status_index: 0
  }]
}
