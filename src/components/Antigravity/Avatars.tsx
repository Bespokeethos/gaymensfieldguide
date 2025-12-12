export const ArchitectAvatar = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full bg-industrial-900" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#171717"/>
    <path d="M50 20L80 35V65L50 80L20 65V35L50 20Z" fill="none" stroke="#EAB308" strokeWidth="2"/>
    <path d="M50 30L70 40V60L50 70L30 60V40L50 30Z" fill="#EAB308" fillOpacity="0.1" stroke="#EAB308" strokeWidth="1"/>
    <circle cx="50" cy="50" r="10" fill="#EAB308"/>
    <path d="M10 90H90" stroke="#333" strokeWidth="2" strokeDasharray="4 4"/>
  </svg>
);

export const ScoutAvatar = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full bg-banana-500" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#EAB308"/>
    <circle cx="50" cy="50" r="35" stroke="#000" strokeWidth="4" fill="none"/>
    <line x1="50" y1="15" x2="50" y2="85" stroke="#000" strokeWidth="2"/>
    <line x1="15" y1="50" x2="85" y2="50" stroke="#000" strokeWidth="2"/>
    <circle cx="50" cy="50" r="5" fill="#000"/>
    <path d="M75 75L90 90" stroke="#000" strokeWidth="4"/>
  </svg>
);

export const MirrorAvatar = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full bg-blue-500" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#3B82F6"/>
    <path d="M20 20 Q 50 80 80 20" stroke="#FFF" strokeWidth="2" fill="none"/>
    <path d="M20 50 Q 50 110 80 50" stroke="#FFF" strokeWidth="2" fill="none"/>
    <path d="M20 80 Q 50 20 80 80" stroke="#FFF" strokeWidth="2" fill="none"/>
    <path d="M0 0L100 100" stroke="rgba(255,255,255,0.2)" strokeWidth="50" style={{mixBlendMode: 'overlay'}}/>
  </svg>
);
