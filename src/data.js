// Every fact here comes from SAYBS's Instagram, the couples' own posts that credit
// @saybsproduction, or the studio's 2022 website. Nothing is invented: where a fact
// is unknown (prices, surnames, venues) it is left out.

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
      p('elissa-roy-06', 'Elissa smiling beside the flower arch'),
      p('elissa-roy-05', 'Favour boxes and the wedding calendar'),
      p('elissa-roy-08', 'A bouquet of white hydrangeas in Elissa’s hands'),
      p('elissa-roy-12', 'Elissa waiting in the car with her bouquet'),
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
      p('valeria-jacob-b-04', 'Valeria against a white wall'),
      p('valeria-jacob-b-06', 'Jacob offering Valeria a rose'),
      p('valeria-jacob-b-08', 'The couple framed inside a giant heart'),
      p('valeria-jacob-b-10', 'The dessert table with roses and frames'),
      p('valeria-jacob-a-08', 'A place card that reads We got engaged'),
      p('valeria-jacob-a-01', 'Long tables set beneath the chandeliers'),
      p('valeria-jacob-a-06', 'Jacob with a glass in hand'),
      p('valeria-jacob-a-12', 'Valeria in the window light'),
      p('valeria-jacob-a-07', 'Valeria at the bar'),
      p('valeria-jacob-a-09', 'Valeria and Jacob under the chandeliers'),
      p('valeria-jacob-a-10', 'Jacob seated beside an antique lamp'),
      p('valeria-jacob-a-03', 'The couple reflected in the dining room'),
      p('valeria-jacob-a-11', 'Valeria and Jacob at their table'),
      p('valeria-jacob-a-04', 'The room set for dinner'),
      p('valeria-jacob-b-11', 'The dining room before the guests arrive'),
      p('valeria-jacob-a-14', 'The three-tier engagement cake'),
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
      p('brides-05', 'A bride walking to the flower arch'),
      p('brides-06', 'A bride and her bridesmaid'),
      p('archive-pm-3192', 'A bride by the window holding her bouquet'),
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

export const HOME_FILM = { id: 'moments', title: 'Moments', line: 'Some moments are simply too beautiful to fade with time.' }

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
