// Existing blog posts on horizonyc.com — URLs kept exactly as they are today.
// Full article HTML is pulled from WordPress by `npm run migrate` (scripts/migrate-wordpress.js)
// into content/posts/<slug>.json, and rendered on the new design.
const fs = require('fs');
const path = require('path');

const list = [
  ['8-types-of-curtains-and-things-to-consider-when-buying-them', '8 Types of Curtains and Things To Consider When Buying Them', 'An overview of curtain styles and the factors to weigh before you buy.', 'Drapery'],
  ['the-15-best-roller-shades-in-nyc', 'The 15 Best Roller Shades In NYC', 'Roller shades that combine practicality and style for traditional or modern interiors.', 'Shades'],
  ['how-do-cordless-blinds-work-everything-you-need-to-know', 'How Do Cordless Blinds Work? Everything You Need to Know', 'How a hidden lift mechanism lets cordless blinds operate without a visible cord.', 'Blinds'],
  ['curtains-for-tall-windows-ideas-alternative-window-treatment-suggestions', 'Curtains for Tall Windows: Ideas + Alternative Window Treatment Suggestions', 'Six ways to dress tall windows, where to hang the rod, and alternatives to drapery.', 'Drapery'],
  ['top-10-creative-curtain-types', 'Top 10 Creative Curtain Types To Give Your Home a Fresh Look', 'Curtain styles that add color and design to a room.', 'Drapery'],
  ['how-to-clean-blinds-the-easiest-way-2', 'How to Clean Blinds the Easiest Way', 'Simple routines for light and deep cleaning, by blind material.', 'Care'],
  ['10-best-roller-shades-in-nyc-to-elevate-your-new-york-city-apartment', '10 Best Roller Shades in NYC to Elevate Your New York City Apartment', 'Why roller shades suit city apartments, plus our top picks.', 'Shades'],
  ['10-ideas-on-how-to-style-your-living-room-on-budget', '10 Ideas on How to Style Your Living Room on a Budget', 'Affordable living room styling ideas that look great and last.', 'Design'],
  ['top-5-stylish-and-functional-window-treatments-for-sliding-glass-doors', 'Top 5 Stylish and Functional Window Treatments For Sliding Glass Doors', 'Treatments for sliding doors that still open and close smoothly.', 'Design'],
  ['shopping-for-window-treatments-in-nyc-consider-6-key-factors', 'Shopping for Window Treatments in NYC? Consider 6 Key Factors', 'Six considerations before buying window treatments in New York City.', 'Buying Guide'],
  ['the-7-best-window-treatments-for-french-doors-a-complete-guide', 'The 7 Best Window Treatments for French Doors', 'Seven options for French doors that balance light and décor.', 'Design'],
  ['blinds-vs-curtains-which-one-to-choose', 'Blinds Vs. Curtains: Which One to Choose?', 'The pros and cons of blinds versus curtains.', 'Buying Guide'],
  ['2023-trending-window-treatments', 'The Top 10 Trending Window Treatments of 2023', 'Popular window treatment trends from 2023.', 'Trends'],
  ['unconventional-window-treatments', "Unconventional Window Treatments: A Beginner's Guide to Trying Something New", 'Unusual window coverings for a distinctive look.', 'Design'],
  ['why-are-shutters-best-window-treatments', 'Why Are Shutters the Best Window Treatment?', 'Why shutters rank among the best window coverings.', 'Shutters'],
  ['the-ultimate-guide-to-the-hottest-window-treatment-trends-in-new-york-city-2024', 'The Ultimate Guide to the Hottest Window Treatment Trends in New York City 2024', 'NYC trends from bold color to minimalist design.', 'Trends'],
  ['supreme-guide-to-window-tinting-services-in-nyc', 'Supreme Guide to Window Tinting Services in NYC', 'The benefits of window tinting for privacy and comfort in NYC.', 'Guide'],
  ['energy-efficient-blackout-shades-in-nyc', 'Save Big on Energy Bills with Energy-Efficient Blackout Shades for Your Bedroom', 'How energy-efficient blackout shades can lower energy costs.', 'Shades'],
  ['coastal-window-treatments-for-beach-houses', 'Best 5 Coastal Window Treatments for Beach Houses', 'Coastal window treatment ideas for beach homes.', 'Design'],
  ['kitchen-window-treatments', 'Top 6 Kitchen Window Treatments Ideas', 'Kitchen window ideas that balance privacy, light and style.', 'Design']
].map(([slug, title, excerpt, tag]) => ({ slug, title, excerpt, tag, url: '/' + slug + '/' }));

const dir = path.join(__dirname, '..', 'content', 'posts');
function load(slug) {
  try { return JSON.parse(fs.readFileSync(path.join(dir, slug + '.json'), 'utf8')); } catch { return null; }
}
// Older dated permalinks seen on the homepage → current slugs
const legacyDated = {
  '/2023/01/30/curtains-for-tall-windows-ideas-alternative-window-treatment-suggestions/': '/curtains-for-tall-windows-ideas-alternative-window-treatment-suggestions/',
  '/2023/01/30/how-to-clean-blinds-the-easiest-way/': '/how-to-clean-blinds-the-easiest-way-2/'
};

module.exports = { posts: list, bySlug: Object.fromEntries(list.map(p => [p.slug, p])), load, legacyDated };
