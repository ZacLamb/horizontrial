// Product catalog. Every slug is the EXACT URL that already exists on horizonyc.com,
// so current rankings carry over with zero redirects.
const { img } = require('./site');

const commonFaqs = [
  { q: 'Is installation really free?', a: 'Yes. Professional installation is included on every order, no strings attached. Your quote covers the product and installation; NYC sales tax (8.875%) is added separately.' },
  { q: 'How does payment work?', a: 'A 50% deposit is due when you place your order, and the remaining 50% is charged after installation is complete.' },
  { q: 'How long does it take?', a: 'Most products are fabricated in about two weeks. Motorized projects typically take two to three weeks, and your designer gives you a detailed timeline at the consultation.' },
  { q: 'What warranty do you offer?', a: 'All products carry a limited lifetime warranty, and Horizon includes one year of free service after installation.' }
];

const categories = {
  shadesblinds: {
    slug: 'shadesblinds', nav: 'Shades & Blinds', title: 'Custom Shades & Blinds in NYC',
    metaTitle: 'Custom Shades & Blinds NYC | Horizon Window Treatments',
    metaDesc: 'Custom roller, Roman and solar shades plus wood and metal blinds, measured and installed free across Manhattan and Brooklyn. Book a free in-home consultation.',
    lede: 'Made-to-measure shades and blinds for every room, light condition and style, measured by our designers and installed free.',
    img: img.roller,
    intro: 'Whether you need to cut the glare on a south-facing living room, darken a bedroom on a lit-up avenue, or simply replace tired builder blinds, Horizon has a shade or blind for it. Every product is custom-sized to your windows and fabricated in about two weeks.'
  },
  drapery: {
    slug: 'drapery', nav: 'Drapery', title: 'Custom Drapery & Curtains in NYC',
    metaTitle: 'Custom Drapery & Curtains NYC | Ripple Fold, Pinch Pleat | Horizon',
    metaDesc: 'Custom drapery and curtains for New York homes — ripple fold, pinch pleat and grommet, with blackout linings and motorized tracks. Free consultation and installation.',
    lede: 'Softness, warmth and drama, tailored to the inch. Custom drapery handcrafted in Brooklyn and installed by Horizon.',
    img: img.drapery,
    intro: 'Drapery is the fastest way to make a room feel finished. Choose a heading style, fabric, lining and hardware with your designer, then let us handle measuring, fabrication and installation. Pair drapery with a shade underneath for full light and privacy control.'
  },
  motorization: {
    slug: 'motorization', nav: 'Motorization', title: 'Motorized Shades & Blinds in NYC',
    metaTitle: 'Motorized Shades & Blinds NYC | Somfy, Lutron, PowerView | Horizon',
    metaDesc: 'Motorized shades, drapes and skylight shades in NYC. Wired, rechargeable or battery motors, app and voice control. Licensed electricians and free installation.',
    lede: 'Open every shade in the apartment with one tap, one schedule or one word. Quiet motors, clean installs, no cords.',
    img: img.motor,
    intro: 'Motorized window treatments are the single biggest quality-of-life upgrade for New York apartments with tall, wide or hard-to-reach windows. Horizon employs licensed electricians and experienced installers, and installation — including wiring, calibration and programming — is free on every motorization option.'
  },
  'hunter-douglas': {
    slug: 'hunter-douglas', nav: 'Hunter Douglas', title: 'Hunter Douglas Shades in NYC',
    metaTitle: 'Hunter Douglas Dealer NYC | Duette, Silhouette, Luminette | Horizon',
    metaDesc: 'Authorized Hunter Douglas dealer in Manhattan. Duette honeycomb shades, Silhouette shadings and Luminette privacy sheers with PowerView motorization. Free consultation.',
    lede: 'Authorized Hunter Douglas dealer in New York. See and feel every collection at our Chelsea showroom.',
    img: img.hd,
    intro: 'Hunter Douglas products are among the highest energy-saving window treatments in the industry, and they come with full manufacturer warranties. As an authorized dealer, Horizon handles your selection, measuring, ordering and installation from start to finish.'
  }
};

const products = [
  // ---------- SHADES & BLINDS ----------
  {
    slug: 'roller-shades', cat: 'shadesblinds', title: 'Roller Shades', serviceKey: 'roller-shades',
    metaTitle: 'Custom Roller Shades NYC | Blackout & Light Filtering | Horizon',
    metaDesc: 'Custom roller shades in Manhattan and Brooklyn — blackout, light filtering and textured fabrics, manual or motorized. Free measuring and installation.',
    lede: 'The clean, modern essential. A single panel of fabric that rolls up out of sight and down to exactly the light you want.',
    img: img.roller, gallery: [img.roller, img.bedroomShade, img.positano],
    sections: [
      { h: 'Why roller shades work so well in New York', p: 'Roller shades take up almost no depth, which matters in apartments with shallow window pockets, radiators and AC sleeves. They give a crisp, architectural look that suits pre-war and new-construction interiors alike.' },
      { h: 'Choose your opacity', p: 'Sheer and light-filtering fabrics soften daylight and keep a sense of the view. Blackout fabrics, paired with side channels or a fascia, take bedrooms and media rooms close to fully dark — essential on lit-up avenues.' },
      { h: 'Manual or motorized', p: 'Choose a continuous-loop chain, a cordless spring lift, or a quiet motor you control by remote, app or voice. Dual roller brackets let you stack a sheer and a blackout on one window.' }
    ],
    features: ['Blackout, light-filtering and sheer fabrics', 'Textured and woven fabric options', 'Dual (day/night) roller configurations', 'Cassettes, fascias and side channels', 'Cordless, chain or motorized lift'],
    bestFor: ['Bedrooms & nurseries', 'Living rooms with city views', 'Home offices', 'Modern & minimalist interiors']
  },
  {
    slug: 'roman-shades', cat: 'shadesblinds', title: 'Roman Shades', serviceKey: 'roman-shades',
    metaTitle: 'Custom Roman Shades NYC | Flat, Hobbled & Relaxed Folds | Horizon',
    metaDesc: 'Handcrafted Roman shades for NYC homes in hundreds of fabrics. Flat, hobbled and relaxed folds, blackout linings and motorized options. Free in-home consultation.',
    lede: 'The softness of drapery with the tailored function of a shade. Fabric folds into elegant pleats as it rises.',
    img: img.roman, gallery: [img.roman, img.vignette, img.fabricChair],
    sections: [
      { h: 'A fabric-first shade', p: 'Roman shades let you bring color, pattern and texture to a window without the volume of full drapery. Your designer brings fabric books to your home so you can see each option in your own light.' },
      { h: 'Fold styles', p: 'Flat folds read crisp and contemporary; hobbled (cascading) folds feel classic and full; relaxed folds give a soft, curved hem suited to traditional brownstones and townhouses.' },
      { h: 'Lining for privacy and sleep', p: 'Choose standard, privacy or blackout lining. Blackout-lined Roman shades are a favorite for bedrooms where you want a tailored look and a dark room.' }
    ],
    features: ['Hundreds of designer fabrics', 'Flat, hobbled and relaxed folds', 'Privacy and blackout linings', 'Cordless and motorized lift', 'Inside or outside mount'],
    bestFor: ['Brownstones & townhouses', 'Dining rooms', 'Bedrooms', 'Kitchens & breakfast nooks']
  },
  {
    slug: 'solar-shades', cat: 'shadesblinds', title: 'Solar Shades', serviceKey: 'solar-shades',
    metaTitle: 'Solar Shades NYC | Glare & UV Control, Keep Your View | Horizon',
    metaDesc: 'Custom solar shades for NYC apartments and offices. Cut glare and UV, protect floors and furniture from fading, and keep your view. Manual or motorized.',
    lede: 'Cut the glare and the UV without losing the skyline. Solar shades are how New Yorkers keep the view and lose the heat.',
    img: img.positano, gallery: [img.positano, img.roller, img.hd],
    sections: [
      { h: 'Protect your interiors', p: 'Solar fabrics block a large share of UV rays, which helps prevent hardwood floors, art and upholstery from fading — a real concern on high floors and south- or west-facing windows.' },
      { h: 'Openness factor, explained', p: 'Solar fabrics are rated by openness: a higher percentage keeps more view, a lower percentage blocks more glare and adds daytime privacy. Your designer will recommend the right balance for each exposure.' },
      { h: 'Pair with blackout', p: 'Solar shades are not built for nighttime privacy. Many clients add a blackout roller on a dual bracket or drapery over the top for evenings.' }
    ],
    features: ['Multiple openness factors (view vs. glare)', 'UV protection for floors & furniture', 'Exclusive colors and collections', 'Dual solar + blackout brackets', 'Motorization with sun sensors'],
    bestFor: ['High-floor apartments', 'South- and west-facing windows', 'Offices & conference rooms', 'Floor-to-ceiling glass']
  },
  {
    slug: 'wood-blinds', cat: 'shadesblinds', title: 'Wood Blinds', serviceKey: 'blinds',
    metaTitle: 'Custom Wood Blinds NYC | Real Wood & Faux Wood | Horizon',
    metaDesc: 'Custom wood blinds in natural grains and painted finishes, made to measure for NYC windows. Cordless options, decorative tapes, free installation.',
    lede: 'Natural grains sourced from around the world, finished to complement your floors, millwork and furniture.',
    img: img.blinds, gallery: [img.blinds, img.kitchen, img.panels],
    sections: [
      { h: 'Warmth and precise control', p: 'Tilting slats give you exact control over light and privacy, all day. Real wood brings warmth that pairs beautifully with pre-war millwork and hardwood floors.' },
      { h: 'Real wood or faux wood', p: 'Real basswood is lightweight and rich in grain. Faux wood resists humidity, making it a smart choice for kitchens and bathrooms.' },
      { h: 'Finishes and details', p: 'Choose stains and paints, slat sizes, routeless slats for better light blocking, and decorative cloth tapes for a tailored finish.' }
    ],
    features: ['Real basswood & moisture-resistant faux wood', 'Stains and painted finishes', '2" and 2½" slat options', 'Decorative cloth tapes', 'Cordless lift for child & pet safety'],
    bestFor: ['Studies & home offices', 'Kitchens (faux wood)', 'Traditional interiors', 'Street-level windows']
  },
  {
    slug: 'metal-blinds', cat: 'shadesblinds', title: 'Metal Blinds', serviceKey: 'blinds',
    metaTitle: 'Custom Metal & Aluminum Blinds NYC | Horizon Window Treatments',
    metaDesc: 'Durable custom aluminum mini blinds for NYC homes and offices. Slim profiles, dozens of colors, easy to clean. Free measuring and installation.',
    lede: 'Slim, durable and easy to keep clean. Metal blinds are the practical workhorse for homes and offices.',
    img: img.kitchen, gallery: [img.kitchen, img.blinds],
    sections: [
      { h: 'Built for everyday use', p: 'Aluminum slats resist moisture and dust and wipe clean in seconds, ideal for kitchens, bathrooms and busy commercial spaces.' },
      { h: 'A slim, modern profile', p: 'Narrow slats and low-profile headrails disappear into the window, keeping the focus on the room rather than the treatment.' }
    ],
    features: ['Aluminum slats in many colors', 'Moisture and dust resistant', 'Slim headrails', 'Cordless options', 'Ideal for commercial spaces'],
    bestFor: ['Kitchens & bathrooms', 'Offices', 'Rental properties', 'Utility spaces']
  },

  // ---------- DRAPERY ----------
  {
    slug: 'ripple-fold-drapery', cat: 'drapery', title: 'Ripple Fold Drapery', serviceKey: 'drapery',
    metaTitle: 'Ripple Fold Drapery NYC | Custom Ripplefold Curtains | Horizon',
    metaDesc: 'Custom ripple fold drapery for NYC lofts, condos and offices. Smooth S-curve folds on a ceiling or wall track, manual or motorized. Free installation.',
    lede: 'A continuous, perfectly even S-curve that glides on a track. The signature look of modern New York interiors.',
    img: img.drapery, gallery: [img.drapery, img.motorDrapes],
    sections: [
      { h: 'Clean lines for big glass', p: 'Ripple fold drapery hangs on a ceiling- or wall-mounted track, so it can run the full width of floor-to-ceiling windows and stack neatly to the side.' },
      { h: 'Made for motorization', p: 'Ripple fold is the easiest drapery style to motorize. A quiet track motor opens and closes even very wide, heavy panels on schedule or by voice.' }
    ],
    features: ['Ceiling or wall-mounted tracks', 'Sheer, light-filtering & blackout fabrics', 'Consistent fullness options', 'Motorized tracks available', 'Ideal for wide spans'],
    bestFor: ['Lofts & condos', 'Floor-to-ceiling windows', 'Bedrooms (blackout)', 'Offices & hospitality']
  },
  {
    slug: 'pinch-pleat', cat: 'drapery', title: 'Pinch Pleat Drapery', serviceKey: 'drapery',
    metaTitle: 'Custom Pinch Pleat Drapes NYC | Handcrafted Curtains | Horizon',
    metaDesc: 'Handcrafted pinch pleat drapery for New York homes — double, triple and inverted pleats in custom fabrics and linings. Free consultation and installation.',
    lede: 'Tailored pleats with timeless structure. Pinch pleat drapery adds formality and warmth to any room.',
    img: img.motorDrapes, gallery: [img.motorDrapes, img.drapery, img.fabricRolls],
    sections: [
      { h: 'Classic tailoring', p: 'Double, triple and inverted (Euro) pleats give drapery a crisp, structured heading that hangs in uniform folds — ideal for brownstones, pre-war apartments and formal rooms.' },
      { h: 'Hardware matters', p: 'Pinch pleats can hang from decorative rods with rings or from a traverse track. Your designer will help select finials and finishes to match your interior.' }
    ],
    features: ['Double, triple & inverted pleats', 'Decorative rods or traverse tracks', 'Blackout & interlinings', 'Custom fabrics and trims', 'Motorization available'],
    bestFor: ['Living & dining rooms', 'Pre-war apartments', 'Primary bedrooms', 'Traditional interiors']
  },
  {
    slug: 'grommet', cat: 'drapery', title: 'Grommet Drapery', serviceKey: 'drapery',
    metaTitle: 'Custom Grommet Curtains NYC | Horizon Window Treatments',
    metaDesc: 'Custom grommet drapery with deep, hand-pressed folds for a relaxed modern look. Sized to your windows and installed free across Manhattan and Brooklyn.',
    lede: 'Deep, hand-pressed folds that slide easily along a rod for a relaxed, modern look.',
    img: img.panels, gallery: [img.panels, img.drapery],
    sections: [
      { h: 'Easy everyday operation', p: 'Metal grommets slide smoothly along the rod, so panels open and close by hand with no tracks or cords. A great choice for casual living spaces.' },
      { h: 'Finishes to match', p: 'Grommets come in finishes that coordinate with your rod and hardware, from matte black to brushed nickel.' }
    ],
    features: ['Hand-pressed deep folds', 'Coordinated grommet finishes', 'Lined or unlined', 'Blackout lining available', 'Easy to operate'],
    bestFor: ['Living rooms', "Kids' rooms", 'Casual & modern interiors', 'Sliding doors']
  },

  // ---------- MOTORIZATION ----------
  {
    slug: 'motorized-solar-roller-shades', cat: 'motorization', title: 'Motorized Solar & Roller Shades', serviceKey: 'motorized-shades',
    metaTitle: 'Motorized Roller & Solar Shades NYC | Somfy & Lutron | Horizon',
    metaDesc: 'Motorized roller and solar shades for NYC apartments: app, remote and voice control, schedules and sun sensors. Licensed electricians, free installation.',
    lede: 'The most popular motorized product we install: quiet, clean and controlled from your phone.',
    img: img.positano, gallery: [img.positano, img.roller, img.hd],
    sections: [
      { h: 'Set it and forget it', p: 'Schedule shades to lower when the afternoon sun hits and rise in the morning. Sun sensors can adjust them automatically based on outdoor conditions.' },
      { h: 'Works with your smart home', p: 'Control shades by remote, wall switch, tablet, phone or voice through compatible smart-home hubs.' }
    ],
    features: ['Somfy and Lutron motor options', 'App, remote, keypad & voice control', 'Schedules and sun sensors', 'Wired, rechargeable or battery power', 'Whisper-quiet operation'],
    bestFor: ['Floor-to-ceiling windows', 'Hard-to-reach windows', 'Whole-apartment systems', 'Media rooms']
  },
  {
    slug: 'motorized-drapes', cat: 'motorization', title: 'Motorized Drapes', serviceKey: 'motorized-shades',
    metaTitle: 'Motorized Drapes & Curtains NYC | Motorized Drapery Tracks | Horizon',
    metaDesc: 'Motorized drapery tracks for wide and tall NYC windows. Open heavy drapes by remote, app or voice. Licensed electricians and free installation.',
    lede: 'Wide spans, heavy fabric, tall windows — a motorized track makes them all effortless.',
    img: img.motorDrapes, gallery: [img.motorDrapes, img.drapery],
    sections: [
      { h: 'Built for tall windows', p: 'Tall windows are hard to reach, so motorization is the practical choice. Tracks stay hidden behind the fabric, and drapes can be automated with presets through a smart-home hub.' },
      { h: 'Layer it', p: 'Combine a motorized sheer and a motorized blackout drape, or drapery over a motorized shade, all on one scene.' }
    ],
    features: ['Hidden ceiling or wall tracks', 'Ripple fold and pinch pleat styles', 'Remote, app and voice control', 'Scenes and schedules', 'Hardwired or battery'],
    bestFor: ['Living rooms with wide glass', 'Primary bedrooms', 'Lofts', 'Hospitality spaces']
  },
  {
    slug: 'motorized-roman-shades', cat: 'motorization', title: 'Motorized Roman Shades', serviceKey: 'motorized-shades',
    metaTitle: 'Motorized Roman Shades NYC | Horizon Window Treatments',
    metaDesc: 'Motorized Roman shades in custom fabrics for NYC homes. Quiet motors, app and remote control, blackout linings. Free in-home consultation and installation.',
    lede: 'Designer fabric meets one-touch control. All the softness of a Roman shade, none of the cords.',
    img: img.vignette, gallery: [img.vignette, img.roman],
    sections: [
      { h: 'Cord-free and child-safe', p: 'Motorized Roman shades eliminate lift cords entirely, a cleaner look and a safer choice for homes with children and pets.' },
      { h: 'Even folds, every time', p: 'A motor raises and lowers the shade at a consistent speed, so folds stack evenly and fabric wears less.' }
    ],
    features: ['Hundreds of designer fabrics', 'Flat and hobbled folds', 'Blackout linings', 'Remote, app & voice control', 'No cords'],
    bestFor: ['Bedrooms', 'Nurseries', 'Dining rooms', 'Formal living rooms']
  },
  {
    slug: 'motorized-skylights', cat: 'motorization', title: 'Motorized Skylight Shades', serviceKey: 'motorized-shades',
    metaTitle: 'Motorized Skylight Shades NYC | Horizon Window Treatments',
    metaDesc: 'Motorized skylight shades for NYC penthouses, townhouses and top-floor units. Control heat, glare and light from out-of-reach skylights. Free installation.',
    lede: 'Out-of-reach skylights, finally under control. Block heat and glare at the push of a button.',
    img: img.duette, gallery: [img.duette, img.hd],
    sections: [
      { h: 'Heat and glare control from above', p: 'Skylights can turn top-floor rooms into greenhouses. Motorized honeycomb or roller skylight shades block heat and glare, and insulate in winter.' },
      { h: 'Professional installation', p: 'Skylight shades require precise measuring and mounting. Horizon handles everything, including wiring and calibration.' }
    ],
    features: ['Honeycomb and roller options', 'Room-darkening fabrics', 'Remote, app & schedule control', 'Insulating cellular design', 'Professional install included'],
    bestFor: ['Penthouses', 'Top-floor townhouse rooms', 'Atriums', 'Bathrooms & kitchens with skylights']
  },

  // ---------- HUNTER DOUGLAS ----------
  {
    slug: 'duette-honeycomb-shades', cat: 'hunter-douglas', title: 'Duette® Honeycomb Shades', serviceKey: 'hunter-douglas',
    metaTitle: 'Hunter Douglas Duette Honeycomb Shades NYC | Horizon',
    metaDesc: 'Hunter Douglas Duette honeycomb shades in NYC. Energy-saving cellular design, light-filtering or room-darkening, top-down/bottom-up and PowerView. Authorized dealer.',
    lede: 'Honeycomb cells trap air to insulate your windows, keeping rooms cooler in summer and warmer in winter.',
    img: img.duette, gallery: [img.duette, img.hd],
    sections: [
      { h: 'Energy savings built in', p: 'Duette honeycomb shades are among the most energy-efficient window treatments available, helping to keep room temperature steady and reduce outside noise.' },
      { h: 'Light filtering to room darkening', p: 'Depending on the fabric, Duette shades can softly filter daylight or fully block it. Top-down/bottom-up and dual-shade options give you privacy and light at the same time.' }
    ],
    features: ['Insulating honeycomb construction', 'Heat & noise insulation', 'Top-down/bottom-up option', 'Duolite® dual shades', 'PowerView® motorization'],
    bestFor: ['Bedrooms', 'Street-facing apartments', 'Drafty pre-war windows', 'Skylights']
  },
  {
    slug: 'silhouette-shades', cat: 'hunter-douglas', title: 'Silhouette® Window Shadings', serviceKey: 'hunter-douglas',
    metaTitle: 'Hunter Douglas Silhouette Shadings NYC | Horizon',
    metaDesc: 'Hunter Douglas Silhouette window shadings in NYC: soft S-vanes between two sheers diffuse daylight beautifully. Room-darkening and Duolite options. Authorized dealer.',
    lede: 'Soft fabric vanes floating between two sheers, diffusing sunlight into a warm, even glow.',
    img: img.silhouette, gallery: [img.silhouette, img.motor],
    sections: [
      { h: 'Light, beautifully managed', p: 'Silhouette shadings use soft S-shaped vanes suspended between two sheer facings. Tilt the vanes to move between a gentle glow and full privacy, a softer alternative to the traditional blind.' },
      { h: 'Add room darkening', p: 'Duolite® adds a room-darkening shade behind the Silhouette for bedrooms and media rooms.' }
    ],
    features: ['Soft S-vane design', 'Tilt for privacy or view', 'Duolite® room-darkening option', 'UV protection', 'PowerView® motorization'],
    bestFor: ['Living rooms', 'Kitchens', 'Bedrooms (with Duolite)', 'Home offices']
  },
  {
    slug: 'luminette-privacy-sheers', cat: 'hunter-douglas', title: 'Luminette® Privacy Sheers', serviceKey: 'hunter-douglas',
    metaTitle: 'Hunter Douglas Luminette Privacy Sheers NYC | Horizon',
    metaDesc: 'Hunter Douglas Luminette privacy sheers for large NYC windows and sliding doors. Vanes rotate 180° for privacy and light. Room-darkening and PowerView options.',
    lede: 'The look of a sheer drapery with the control of a vertical blind, ideal for big glass and sliding doors.',
    img: img.hd, gallery: [img.hd, img.panels],
    sections: [
      { h: 'Made for large windows', p: 'Fabric vanes stitched behind a sheer facing rotate up to 180 degrees, balancing privacy and daylight across wide windows and sliding glass doors.' },
      { h: 'Hidden hardware', p: 'Luminette hardware is concealed for a clean, drapery-like look, with room-darkening fabrics and PowerView® motorization available.' }
    ],
    features: ['Rotating fabric vanes (180°)', 'Concealed hardware', 'Room-darkening options', 'Ideal for sliding doors', 'PowerView® motorization'],
    bestFor: ['Sliding glass doors', 'Terrace doors', 'Wide living room windows', 'Condo walls of glass']
  }
];

products.forEach(p => { p.faqs = (p.faqs || []).concat(commonFaqs); p.url = '/' + p.slug + '/'; });
Object.values(categories).forEach(c => { c.url = '/' + c.slug + '/'; c.items = products.filter(p => p.cat === c.slug); });

// "Services" used for neighborhood combination pages (curated, not every product)
const services = [
  { key: 'motorized-shades', name: 'Motorized Shades', url: '/motorization/', img: img.motor, angle: 'one-touch control of hard-to-reach and floor-to-ceiling windows' },
  { key: 'roller-shades', name: 'Roller Shades', url: '/roller-shades/', img: img.roller, angle: 'clean, space-saving light and privacy control' },
  { key: 'solar-shades', name: 'Solar Shades', url: '/solar-shades/', img: img.positano, angle: 'glare and UV control that keeps the view' },
  { key: 'roman-shades', name: 'Roman Shades', url: '/roman-shades/', img: img.roman, angle: 'tailored fabric shades with soft, structured folds' },
  { key: 'custom-drapery', name: 'Custom Drapery', url: '/drapery/', img: img.drapery, angle: 'made-to-measure drapery that adds warmth and drama' },
  { key: 'hunter-douglas', name: 'Hunter Douglas Shades', url: '/hunter-douglas/', img: img.hd, angle: 'energy-efficient Duette, Silhouette and Luminette shadings' }
];

module.exports = { categories, products, services, commonFaqs };
