// Every fact here comes from SAYBS's Instagram, the couples' own posts that credit
// @saybsproduction, or the studio's 2022 website. Nothing is invented: where a fact
// is unknown (prices, surnames, venues) it is left out.

export const OWNERS = 'Ribal & Samer Bsaibes'

export const CONTACT = {
  phoneDisplay: '+961 3 986 904',
  whatsapp: '9613986904',
  email: 'info@saybsproduction.com',
  instagram: 'https://www.instagram.com/saybsproduction/',
  address: 'Champville street, Awkar, Mont-Liban',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Champville+Awkar+Lebanon',
}

export const waLink = (text) =>
  `https://wa.me/${CONTACT.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

const p = (id, alt) => ({ id, alt })

export const EXHIBITIONS = [
  {
    slug: 'elissa-roy',
    title: 'Elissa & Roy',
    kind: 'Wedding',
    place: 'Kyra, Lebanon',
    date: '2 August 2026',
    epigraph: { ar: 'ايد ب ايد مشينا، وعالحلم سوا بقينا', en: 'Hand in hand we walked, and stayed together in the dream.' },
    words: 'Portraits, details, little moments, and one unforgettable feeling.',
    wordsBy: 'Elissa',
    film: { title: 'The Beat of Us', url: 'https://www.instagram.com/p/DdZS1u1CAq6/' },
    home: [p('elissa-roy-10', 'Roy and Elissa laughing together among the trees'), p('elissa-roy-13', 'Roy kissing Elissa on the forehead'), p('elissa-roy-01', 'Elissa looking down at her white bouquet by the window')],
    cover: [p('elissa-roy-09', 'Roy and Elissa walking through the garden'), p('elissa-roy-04', 'Elissa in her gown among white flowers')],
    hang: [
      p('elissa-roy-07', 'Roy fixing his cufflinks before the ceremony'),
      p('elissa-roy-02', 'Roy alone in a dark doorway'),
      p('elissa-roy-03', 'Wedding favours stamped with an R and E monogram'),
      p('elissa-roy-05', 'Favour boxes and the wedding calendar'),
      p('elissa-roy-08', 'A bouquet of white hydrangeas in Elissa’s hands'),
      p('elissa-roy-11', 'Roy and Elissa face to face beneath her veil'),
      p('elissa-roy-00', 'Elissa and Roy on the terrace before the ceremony'),
      p('elissa-roy-16', 'A kiss on the terrace at dusk'),
      p('elissa-roy-15', 'Cutting the cake under a rain of lights'),
    ],
    credits: [
      ['Wedding planner', 'YS Concepts', 'https://www.instagram.com/ysconcepts/'],
      ['Venue', 'Kyra', 'https://www.instagram.com/kyravenue/'],
      ['Flowers', 'Giorgio Flowers', 'https://www.instagram.com/giorgioflowers/'],
      ['Wedding dress', 'Mireille Dagher', 'https://www.instagram.com/mireilledagherofficial/'],
      ['Bride’s hair', 'Victor Keyrouz', 'https://www.instagram.com/victorkeyrouz/'],
      ['Bride’s makeup', 'Elie Al Hajj', 'https://www.instagram.com/elie.alhajj/'],
      ['Chocolate', 'Amaryllis', 'https://www.instagram.com/amaryllislebanon/'],
      ['Music', 'Eyli Music', 'https://www.instagram.com/eyli.music/'],
      ['Photography and film', 'SAYBS', 'https://www.instagram.com/saybsproduction/'],
    ],
  },
  {
    slug: 'valeria-jacob',
    title: 'Valeria & Jacob',
    kind: 'Engagement',
    place: 'Lebanon',
    date: '2026',
    words: 'Lucky in love, luckier in life.',
    wordsBy: null,
    home: [p('valeria-jacob-a-05', 'Valeria posing on a leather sofa'), p('valeria-jacob-b-00', 'Valeria and Jacob laughing together, seated'), p('valeria-jacob-a-00', 'Valeria and Jacob in a dining room hung with gilded mirrors')],
    cover: [p('valeria-jacob-a-02', 'Valeria seated in the ornate dining room'), p('valeria-jacob-b-09', 'Jacob laughing beneath a chandelier')],
    hang: [
      p('valeria-jacob-b-01', 'A black rose beside a postcard that reads How lucky are we'),
      p('valeria-jacob-b-03', 'Valeria and Jacob with a bouquet of dark roses'),
      p('valeria-jacob-b-07', 'Jacob slipping the ring onto Valeria’s finger'),
      p('valeria-jacob-b-05', 'Two hands and two rings'),
      p('valeria-jacob-b-02', 'Valeria and Jacob by the rose wall'),
      p('valeria-jacob-b-08', 'The couple framed inside a giant heart'),
      p('valeria-jacob-b-10', 'The dessert table with roses and frames'),
      p('valeria-jacob-a-08', 'A place card that reads We got engaged'),
      p('valeria-jacob-a-01', 'Long tables set beneath the chandeliers'),
      p('valeria-jacob-a-06', 'Jacob with a glass in hand'),
      p('valeria-jacob-a-10', 'Jacob seated beside an antique lamp'),
      p('valeria-jacob-a-03', 'The couple reflected in the dining room'),
      p('valeria-jacob-a-11', 'Valeria and Jacob at their table'),
      p('valeria-jacob-a-04', 'The room set for dinner'),
      p('valeria-jacob-b-11', 'The dining room before the guests arrive'),
      p('valeria-jacob-a-15', 'Valeria and Jacob with their cake'),
      p('valeria-jacob-a-13', 'Friends lifting the couple into the air'),
    ],
    credits: null,
  },
  {
    slug: 'brides',
    title: 'The Brides',
    kind: 'Portraits',
    place: 'Lebanon',
    date: 'Recent weddings',
    words: 'Authentic shots showing real moments and emotions.',
    wordsBy: 'Maya Bou Mansour',
    home: [p('brides-00', 'A bride on a terrace above the sea'), p('archive-ik-0230', 'A bride laughing, looking up')],
    cover: [p('brides-03', 'A bride smiling with her bouquet'), p('brides-04', 'A bride in a fitted gown on a polished black floor')],
    hang: [
      p('brides-01', 'A bride with her bouquet before a flower arch'),
      p('brides-02', 'A bride in an off-shoulder gown'),
      p('archive-jp1-0340', 'A couple framed by tall open doors above the sea'),
      p('brides-06', 'A bride and her bridesmaid'),
    ],
    credits: null,
  },
]

export const FILMS = [
  { id: 'rana', title: 'Rana & Pierre', line: 'A glimpse into our happiest day.', lineBy: 'Rana', kind: 'Wedding film' },
  { id: 'veronique', title: 'Veronique', line: 'And just like that, forever began.', lineBy: 'Veronique', kind: 'Wedding film', place: 'St Nicolas Cathedral, Ballouneh' },
  { id: 'elie-rula', title: 'Elie & Rula', line: 'The day we said yes, the sky opened its gates.', lineBy: 'Elie & Rula', kind: 'Wedding film' },
  { id: 'nizar-monica', title: 'Nizar & Monica', line: 'Their love story speaks for itself.', lineBy: null, kind: 'Trailer' },
  { id: 'cherine', title: 'Cherine', line: 'One year as your wife.', lineBy: 'Cherine', kind: 'Anniversary film' },
]

export const HERO_FILMS = ['nizar-monica', 'moments', 'rana']

// What SAYBS do, from their 2022 website (Photography, Cinematography, Studio photography,
// Filming/Editing, Weddings, Engagements, Baptism, Decoration, Projects), their Vimeo
// (teasers and trailers) and their Instagram (reels, Manel Mallat's music video set).
export const SERVICES = [
  {
    id: 'photography',
    title: 'Wedding photography',
    line: 'The whole day, from getting ready to the last dance.',
    text: 'Portraits, family, details and decoration, and every moment in between, told honestly and never over edited.',
    items: ['Getting ready and the ceremony', 'Couple and family portraits', 'Details and decoration', 'The party, until the last dance'],
    media: { kind: 'photo', id: 'elissa-roy-10', alt: 'Roy and Elissa laughing together among the trees' },
  },
  {
    id: 'films',
    title: 'Wedding films',
    line: 'Films that feel like you.',
    text: 'Cinematic films cut from the whole day and shaped into a story you will want to watch again and again.',
    items: ['The teaser', 'The trailer', 'Reels made for sharing'],
    media: { kind: 'film', id: 'veronique', alt: 'Veronique and her husband, a SAYBS wedding film' },
  },
  {
    id: 'engagements',
    title: 'Engagements',
    line: 'The yes, and the party that follows.',
    text: 'Proposals, engagement parties and sessions before the wedding, in a place that means something to you.',
    items: ['Proposals', 'Engagement parties', 'Engagement sessions'],
    media: { kind: 'photo', id: 'valeria-jacob-a-05', alt: 'Valeria posing on a leather sofa at her engagement' },
  },
  {
    id: 'studio',
    title: 'Studio & portraits',
    line: 'Light, patience and a quiet room.',
    text: 'Studio photography, bridal portraits and maternity sessions, lit and directed by the same team that shoots your wedding.',
    items: ['Studio photography', 'Bridal portraits', 'Maternity sessions'],
    media: { kind: 'photo', id: 'archive-pm-3192', alt: 'A bride by the window holding her bouquet' },
  },
  {
    id: 'projects',
    title: 'Music videos & projects',
    line: 'When the story is yours to tell.',
    text: 'Music videos and creative projects, from the set to the final cut, like Manel Mallat’s Ya Hobbi Li Jayi.',
    items: ['Music videos', 'Behind the scenes', 'Creative projects'],
    media: { kind: 'film', id: 'manel-clip-02', alt: 'On set with Manel Mallat' },
  },
]
export const ALSO = 'We also cover baptisms, family celebrations and event decoration.'

export const MARQUEE = [
  [p('elissa-roy-06', 'Elissa smiling beside the flower arch'), p('valeria-jacob-a-07', 'Valeria at the bar'), p('brides-05', 'A bride walking to the flower arch'), p('valeria-jacob-a-14', 'The three-tier engagement cake'), p('elissa-roy-12', 'Elissa waiting in the car with her bouquet')],
  [p('valeria-jacob-b-06', 'Jacob offering Valeria a rose'), p('valeria-jacob-a-12', 'Valeria in the window light'), p('manel-14', 'A crew member holding a ring light on set'), p('valeria-jacob-a-09', 'Valeria and Jacob under the chandeliers'), p('valeria-jacob-b-04', 'Valeria against a white wall')],
]

export const PROCESS = [
  { title: 'Check your date', text: 'Send us your date and venue on WhatsApp or by email. Bookings are open for 2027.' },
  { title: 'Plan it together', text: 'We talk through your day, the moments that matter to you, and whether you want photographs, a film or both.' },
  { title: 'The day', text: 'Our photographer and cinematographer work side by side, from getting ready to the last dance.' },
  { title: 'Your story', text: 'You receive your edited photographs and your film, ready to keep and to share.' },
]

// Earlier films on the studio's Vimeo (vimeo.com/saybs, 42 films). Embedded, not copied.
export const VIMEO = [
  { id: '236670701', thumb: 'https://i.vimeocdn.com/video/658846600-d40a7488780eb402d25cb08124189e0cf6dcd0054a0695b9ac1e5978bda1beb1-d_640', title: 'Elias & Marcelle', kind: 'The trailer', length: '2:27' },
  { id: '238667375', thumb: 'https://i.vimeocdn.com/video/661428296-62ad8bb4c84778161426b43e238dbf4224427926acc7d848822f9dafcac795bb-d_640', title: 'Diala & John', kind: 'The teaser', length: '1:51' },
  { id: '237739745', thumb: 'https://i.vimeocdn.com/video/660236207-86c1dd49788e394faf4c4fdfd47507614d82206f451d42ecee700c2746915285-d_640', title: 'Alain & Joy', kind: 'The teaser', length: '1:35' },
  { id: '237725254', thumb: 'https://i.vimeocdn.com/video/660217269-0d76deecbcf8e657d486c035bf699a8cc3d4c98c538091fa244d79079ab510b4-d_640', title: 'Alain & Nicole', kind: 'The teaser', length: '1:40' },
  { id: '236667956', thumb: 'https://i.vimeocdn.com/video/659772520-56d2f029ea2ffb79c3290e438f7b9ceff644b8ad73105b671c02b89a234d834d-d_640', title: 'Daoud & Chirine', kind: 'The teaser', length: '1:41' },
  { id: '234933215', thumb: 'https://i.vimeocdn.com/video/656699149-00d2e344bc3662ee65487806ca7c411095c1d15ae3f2cb063c296fb360d206e8-d_640', title: 'Jessy & Georges', kind: 'The teaser', length: '1:30' },
]
export const VIMEO_URL = 'https://vimeo.com/saybs'

export const HOME_FILM = { id: 'veronique', title: 'Veronique', line: 'And just like that, forever began.' }

export const ON_SET = {
  title: 'On set with Manel Mallat',
  work: 'Ya Hobbi Li Jayi',
  clips: ['manel-clip-02', 'manel-clip-04', 'manel-clip-07', 'manel-clip-12'],
  photos: [p('manel-01', 'Manel Mallat on a stool among paper birds and clouds'), p('manel-11', 'The shot on the field monitor'), p('manel-09', 'Manel between takes on the cloud set')],
}

export const TESTIMONIALS = [
  {
    name: 'Maya Bou Mansour',
    short: 'Their photos and videos are not overly edited compared to what you usually see.',
    full: 'Simply amazing! You should stick with the Saybs team, because their photos and videos are not overly edited compared to what you usually see. At first it seems cool to have photos with special lights and effects, but then you realize that you need authentic shots showing real moments and emotions.',
  },
  {
    name: 'Nathalie Malian Salame',
    full: 'I just love your work! Amazing team! You really made my brother’s wedding memorable!',
  },
  {
    name: 'Nathalie Abou Khalil Fahd',
    full: 'Rough roads often lead to unbelievable destinations. A big thank you to every person who took the risk and celebrated with us during these challenging times, making this day an unforgettable one.',
  },
]

export const STUDIO = {
  home: p('manel-05', 'The SAYBS team reviewing shots on the camera with the artist'),
  about: [
    p('manel-06', 'A SAYBS cinematographer with a camera on a gimbal'),
    p('manel-00', 'Showing the artist a frame on the back of the camera'),
    p('manel-03', 'The studio set with lights, camera and crew'),
    p('manel-08', 'Adjusting the dress between takes'),
    p('manel-10', 'The crew rigging paper birds over the set'),
    p('manel-13', 'A laugh with the crew on set'),
  ],
}

// Draft: SAYBS have not supplied inclusions or prices yet.
export const COLLECTIONS = [
  { title: 'Wedding photography', lines: ['From getting ready to the last dance', 'A full, edited gallery of your day', 'Prints and albums on request'] },
  { title: 'Wedding film', lines: ['A cinematic film of your day', 'Short reels made for sharing'] },
  { title: 'Photography & film', lines: ['One team for both', 'Photographs and film that tell the same story'] },
  { title: 'Engagement', lines: ['A session before the wedding', 'In a place that means something to you', 'Photographs, film, or both'] },
  { title: 'Studio & portraits', lines: ['Studio photography', 'Maternity and family portraits', 'Music video and campaign sets'] },
]

export const PACKAGE_PHOTOS = [
  p('archive-ik-1059', 'A couple in a painted church hall'),
  p('archive-rdy-1565', 'A couple and their guest in a garden'),
]

export const INQUIRE_PHOTO = p('elissa-roy-14', 'Roy and Elissa crossing a stone courtyard')
