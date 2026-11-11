// Business facts — every claim here comes from the current horizonyc.com.
// Change once, updates header, footer, schema and every page.
const U = '/wp-content/uploads/';

module.exports = {
  name: 'Horizon Window Treatments',
  shortName: 'Horizon',
  url: (process.env.SITE_URL || 'https://horizonyc.com').replace(/\/$/, ''),
  phone: '(212) 759-4111',
  phoneTel: '+12127594111',
  email: 'customer@horizonyc.com',
  address: { street: '133 West 24th Street', city: 'New York', state: 'NY', zip: '10011', neighborhood: 'Chelsea' },
  geo: { lat: 40.7443, lng: -73.9936 },
  founded: 1999,
  brands: ['Hunter Douglas', 'Somfy', 'Lutron', 'Carole Fabrics', 'Graber'],
  social: {
    facebook: 'https://www.facebook.com/horizonwindowtreatmentsnyc/',
    instagram: 'https://www.instagram.com/horizonwindownyc/',
    pinterest: 'https://www.pinterest.com/HorizonWindowTreatments/',
    linkedin: 'https://www.linkedin.com/company/horizon-window-treatments-nyc'
  },
  googleReviews: process.env.GOOGLE_REVIEWS_URL || 'https://www.google.com/search?q=Horizon+Window+Treatments+133+West+24th+Street',
  tagline: 'An easier way to buy window treatments. We bring the best of Horizon to your doorstep within a matter of days.',

  // Horizon's own photography / dealer imagery, kept at the exact WordPress paths
  img: {
    hero: U + '2026/03/iStock-1266344111-1-1-scaled.jpg',
    intro: U + '2023/07/2020_DSS_DUOPV_New-Orleans-10_Living-Room-1_1.webp',
    roller: U + 'elementor/thumbs/2020_DRS_CC_Travinia_LivingRoom-qnbb7041szaf7523fxoza9b2fe52999z2qtftpw93k.jpg',
    motor: U + 'elementor/thumbs/2018_SIL_SoftTouch_Kitchen-qnbbz5e2gdtius6933osy5lysreqqz0ma22v605us0.jpg',
    roman: U + 'elementor/thumbs/2021_Alustra_VIG_Stacking_Dining_Room-qnbbzbyxs82i381havlki95oxrl3ok56iaddfakcm6.jpg',
    blinds: U + 'elementor/thumbs/2017_PAR_SL_Basswood_Bedroom1-qnbbwxhsbgs2dfsnw8cna5ea8xkwvter91sx2jh2m2.jpg',
    hd: U + 'elementor/thumbs/2023-DU-PV-Duolite-Office-Dog-qnbbyqcnf18vnd1o3bbizjtl97mg785smn3baa4nn0.jpg',
    drapery: U + '2022/10/Drapery01-min.jpg',
    kitchen: U + '2023/07/2017_PAR_SL_Basswood_Kitchen.webp',
    bedroomShade: U + 'elementor/thumbs/2020_PROV_LR_Santa-Rosa_IOL-Bedroom-q7lmzxruixik2wpww2oms4hq6gn9bnygp9iik3l95s.jpg',
    panels: U + 'elementor/thumbs/2021_HER_Standard_Panels_LivingRoom_EE_Closed-q7lmzzniwll4q4n6l3hvx40nd8dzr25xdithinigtc.jpg',
    positano: U + 'elementor/thumbs/2023_PROV_PV_Positano_Detail-q7ln01j7a9npdckga4b523jkk04q6gde1s4gh7fogw.jpg',
    evoke: U + 'elementor/thumbs/2017_DBS_UG_Evoke_Bathroom-Open-q7d8t7u6vrd840o1z6rekty9gqh2pf6w0lic7bkskg.jpg',
    coastalOpen: U + 'elementor/thumbs/2017_DBS_UG_Coastal_Bathroom-Open-q7d8t6wcoxbxsepf4ocs0c6svclphq35oguuq1m6qo.jpg',
    coastalClosed: U + 'elementor/thumbs/2017_DBS_UG_Coastal_Bathroom-Closed1-q7d8t50ob99d56s5fnjivcnvokuz2bvp07jvrhoz34.jpg',
    consult: U + '2023/07/Free-In-Home-Consultation.webp',
    fabrication: U + '2023/07/Motorization.webp',
    install: U + '2023/07/Installation.webp',
    fabricChair: U + '2023/07/2022_WT_Fabric_Gold_Chair-600x650.webp',
    fabricRolls: U + '2023/07/2022_WT_Fabric_Rolls_Bin-600x650.webp',
    silhouette: U + '2023/03/2020_Sil_Bon-Soir_LD_Kids-Room.jpg',
    motorDrapes: U + '2023/03/2021_SON_Lenox_PV_LF_Bedroom.jpg',
    vignette: U + '2023/07/2018_VIG_AccentsByTheYard_Duolite.webp',
    duette: U + '2022/10/004_DU01_LightLock_Detail-min.jpg',
    logo: U + '2022/10/New-footer-logo.png'
  },

  promise: [
    { icon: 'award', title: 'Exceptional Service', text: 'A dedicated design guide from your first sample through delivery and installation.' },
    { icon: 'tag', title: 'Higher Quality', text: 'Products from trusted U.S. manufacturers, fabricated to your exact measurements.' },
    { icon: 'shield', title: 'Warranty', text: 'Limited lifetime product warranties plus one year of free service.' },
    { icon: 'handshake', title: 'Our Guarantee', text: "If something isn't right, we make it right. That's the Horizon promise." }
  ],

  process: [
    { key: 'consult', title: 'Free In-Home Consultation', text: 'A Horizon designer brings fabric samples to you, takes precise measurements and gives you a clear quote and timeline.' },
    { key: 'fabrication', title: 'Ordering & Fabrication', text: 'We have proudly handcrafted our products in Brooklyn since 1999, with two-week timelines on most products.' },
    { key: 'install', title: 'Free Installation', text: "Professional installation of shades, blinds and drapery is always included, performed by Horizon's vetted installers." }
  ]
};
