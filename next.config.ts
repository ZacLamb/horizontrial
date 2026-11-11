import type { NextConfig } from 'next';
const redirects = [
  ['/shadesblinds','/services'],
  ['/motorization','/services/motorized-shades'],
  ['/motorized-solar-roller-shades','/services/motorized-shades'],
  ['/motorized-roman-shades','/services/motorized-shades'],
  ['/motorized-skylights','/services/motorized-shades'],
  ['/roller-shades','/services/roller-solar-shades'],
  ['/solar-shades','/services/roller-solar-shades'],
  ['/drapery','/services/custom-drapery'],
  ['/roman-shades','/services/roman-shades'],
  ['/wood-blinds','/services/custom-blinds'],
  ['/metal-blinds','/services/custom-blinds'],
  ['/hunter-douglas','/services/hunter-douglas'],
  ['/duette-honeycomb-shades','/services/hunter-douglas'],
  ['/silhouette-shades','/services/hunter-douglas'],
  ['/luminette-privacy-sheers','/services/hunter-douglas'],
  ['/bookappointment','/contact'],
  ['/contact-us','/contact'],
  ['/about-us','/about'],
  ['/faqs','/services'],
  ['/pricing','/contact'],
];
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {return redirects.map(([source,destination]) => ({source,destination,permanent:true}));}
};
export default nextConfig;
