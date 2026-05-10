// LibraryGrid.jsx — Prismarium book card grid
// Exports: LibraryGrid
// Requires: window.React

const SAMPLE_TEXTS = [
  { id:1, title:'The Kybalion', author:'Three Initiates', domain:'Hermetic', lenses:['Philosophical','Symbolic/Occult'], summary:'Seven Hermetic principles governing the universe, including Mentalism, Correspondence, and Vibration.', curator:'A foundational text of Western esotericism — the seven laws underpin most occult systems.' },
  { id:2, title:'The Emerald Tablet', author:'Hermes Trismegistus', domain:'Alchemy', lenses:['Symbolic/Occult','Philosophical'], summary:'The foundational alchemical text: "As above, so below." Thirteen verses encoding the secrets of transformation.', curator:'Perhaps the most quoted sentence in all of esoterica.' },
  { id:3, title:'Bhagavad Gita', author:'Vyasa', domain:'Hindu Scripture', lenses:['Religious/Spiritual','Philosophical'], summary:'Krishna instructs Arjuna on duty, devotion, and the nature of the self on the battlefield of Kurukshetra.', curator:'Essential reading for any serious student of consciousness and action.' },
  { id:4, title:'The Book of the Law', author:'Aleister Crowley', domain:'Thelema', lenses:['Symbolic/Occult','Philosophical'], summary:'Received in Cairo, 1904. The foundational text of Thelema — "Do what thou wilt shall be the whole of the Law."', curator:null },
  { id:5, title:'I Ching', author:'King Wen', domain:'Taoist', lenses:['Mathematical','Philosophical','Historical'], summary:'The ancient Chinese oracle of 64 hexagrams encoding patterns of change, used for divination and wisdom.', curator:'The oldest continuously used system of symbols in human history.' },
  { id:6, title:'Corpus Hermeticum', author:'Hermes Trismegistus', domain:'Hermetic', lenses:['Philosophical','Religious/Spiritual'], summary:'Collection of Greek texts from 2nd–3rd century CE presenting Hermetic cosmology and theosophy.', curator:null },
  { id:7, title:'Sefer Yetzirah', author:'Unknown', domain:'Kabbalah', lenses:['Mathematical','Symbolic/Occult'], summary:'The oldest known Kabbalistic text describing the 32 paths of wisdom through letters and numbers.', curator:'The source of the letter-number mysticism that permeates Western occultism.' },
  { id:8, title:'The Gospel of Thomas', author:'Thomas the Apostle', domain:'Gnostic', lenses:['Religious/Spiritual','Philosophical'], summary:'114 sayings of Jesus discovered at Nag Hammadi in 1945 — a direct transmission without narrative.', curator:'Startlingly direct. Read it slowly.' },
  { id:9, title:'Tao Te Ching', author:'Laozi', domain:'Taoist', lenses:['Philosophical','Religious/Spiritual'], summary:'81 verses on the nature of the Tao — the way that cannot be named. Wu wei, effortless action, and return.', curator:'The most translated book after the Bible.' },
  { id:10, title:'Upanishads', author:'Various Rishis', domain:'Vedanta', lenses:['Religious/Spiritual','Philosophical'], summary:'Over 200 philosophical texts forming the theoretical basis of Hinduism — exploring Brahman, Atman, and liberation.', curator:null },
];

const DOMAIN_COLORS = {
  'Hermetic': '#B48F4A',
  'Alchemy': '#FF8C2A',
  'Hindu Scripture': '#FF3A5C',
  'Thelema': '#B03AFF',
  'Taoist': '#2AFFA0',
  'Kabbalah': '#3A7FFF',
  'Gnostic': '#20E0F5',
  'Vedanta': '#F5D020',
};

const BookCard = ({ text }) => {
  const [hovered, setHovered] = React.useState(false);
  const domainColor = DOMAIN_COLORS[text.domain] || '#B48F4A';

  return React.createElement('div', {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: {
      position: 'relative',
      borderRadius: 6,
      overflow: 'hidden',
      border: `1px solid ${hovered ? domainColor + '70' : 'rgba(255,255,255,0.14)'}`,
      background: '#161c2a',
      transition: 'all 0.25s',
      transform: hovered ? 'scale(1.025)' : 'scale(1)',
      boxShadow: hovered ? `0 0 28px ${domainColor}28` : 'none',
      cursor: 'pointer',
    }
  },
    // Book cover
    React.createElement('div', {
      style: { aspectRatio:'2/3', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:12, background: `linear-gradient(160deg, #161e30 0%, #0e1220 100%)`, position:'relative', overflow:'hidden' }
    },
      // Scanline overlay
      React.createElement('div', { style:{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(18,18,18,0) 50%, rgba(0,0,0,0.2) 50%)', backgroundSize:'100% 4px', opacity:0.18, pointerEvents:'none', zIndex:1 } }),
      // Domain color bar at top
      React.createElement('div', { style:{ position:'absolute', top:0, left:0, right:0, height:2, background:domainColor, opacity:0.7 } }),
      React.createElement('div', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, fontWeight:600, color:'rgba(220,210,200,0.7)', textAlign:'center', lineHeight:1.4, zIndex:2 } }, text.title),
      React.createElement('div', { style:{ marginTop:8, fontFamily:"'Fira Mono',monospace", fontSize:9, color:domainColor, letterSpacing:'0.08em', textTransform:'uppercase', opacity:0.8, zIndex:2 } }, text.domain),

      // Hover overlay
      hovered && React.createElement('div', {
        style: { position:'absolute', inset:0, background:'rgba(6,4,18,0.96)', backdropFilter:'blur(4px)', display:'flex', flexDirection:'column', padding:12, zIndex:10, overflow:'hidden' }
      },
        React.createElement('div', { style:{ fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:700, color:'#f1f5f9', lineHeight:1.3, marginBottom:6 } }, text.title),
        text.author && React.createElement('div', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:9, color:domainColor, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:8 } }, '// ' + text.author),
        React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:8 } },
          React.createElement('span', { style:{ padding:'2px 7px', fontSize:9, fontFamily:"'Fira Mono',monospace", letterSpacing:'0.08em', textTransform:'uppercase', border:`1px solid ${domainColor}40`, background:`${domainColor}12`, color:domainColor, borderRadius:3 } }, text.domain),
          ...text.lenses.slice(0,2).map(l => React.createElement('span', { key:l, style:{ padding:'2px 7px', fontSize:9, fontFamily:"'Fira Mono',monospace", letterSpacing:'0.06em', textTransform:'uppercase', border:'1px solid rgba(255,255,255,0.10)', background:'rgba(255,255,255,0.04)', color:'#71717a', borderRadius:3 } }, l))
        ),
        React.createElement('div', { style:{ fontSize:11, color:'#a1a1aa', lineHeight:1.5, flex:1, overflow:'hidden' } }, text.summary),
        text.curator && React.createElement('div', { style:{ marginTop:8, paddingTop:8, borderTop:'1px solid rgba(255,255,255,0.07)' } },
          React.createElement('div', { style:{ fontSize:9, fontFamily:"'Fira Mono',monospace", color:`${domainColor}90`, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:3 } }, 'Curator Note'),
          React.createElement('div', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:11, fontStyle:'italic', color:'#a1a1aa' } }, `"${text.curator}"`)
        ),
        React.createElement('div', { style:{ marginTop:8, paddingTop:8, borderTop:'1px solid rgba(255,255,255,0.07)', display:'flex', justifyContent:'flex-end' } },
          React.createElement('span', { style:{ fontSize:10, fontFamily:"'Fira Mono',monospace", color:'#52525b', letterSpacing:'0.1em', textTransform:'uppercase' } }, 'Access →')
        )
      )
    )
  );
};

const LibrarySearchBar = ({ query, setQuery }) =>
  React.createElement('div', { style:{ position:'relative', maxWidth:480 } },
    React.createElement('input', {
      value: query,
      onChange: e => setQuery(e.target.value),
      placeholder: 'Search wisdom traditions, authors, concepts…',
      style: { width:'100%', background:'rgba(0,0,0,0.5)', border:'1px solid rgba(255,255,255,0.10)', borderRadius:6, padding:'10px 14px 10px 38px', color:'#f1f5f9', fontFamily:"'Inter',sans-serif", fontSize:13, outline:'none', boxSizing:'border-box' }
    }),
    React.createElement('svg', { style:{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', opacity:0.4 }, width:14, height:14, fill:'none', stroke:'#a1a1aa', strokeWidth:1.5, viewBox:'0 0 24 24' },
      React.createElement('circle', { cx:11, cy:11, r:8 }),
      React.createElement('path', { d:'m21 21-4.35-4.35' })
    )
  );

const LibraryGrid = () => {
  const [query, setQuery] = React.useState('');
  const filtered = SAMPLE_TEXTS.filter(t =>
    !query || t.title.toLowerCase().includes(query.toLowerCase()) || t.domain.toLowerCase().includes(query.toLowerCase()) || t.author.toLowerCase().includes(query.toLowerCase())
  );

  return React.createElement('div', { style:{ padding:'24px 32px', maxWidth:1280, margin:'0 auto' } },
    // Header row
    React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 } },
      React.createElement('div', null,
        React.createElement('div', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:9, color:'rgba(34,211,238,0.6)', letterSpacing:'0.3em', textTransform:'uppercase', marginBottom:5 } }, 'The Convergence Library'),
        React.createElement('h1', { style:{ fontFamily:"'Cinzel',serif", fontSize:26, fontWeight:600, color:'#f1f5f9', margin:0, letterSpacing:'-0.01em' } }, 'Sacred Texts')
      ),
      React.createElement(LibrarySearchBar, { query, setQuery })
    ),
    // Filter badges
    React.createElement('div', { style:{ display:'flex', gap:6, marginBottom:20, flexWrap:'wrap' } },
      ['All', 'Hermetic', 'Taoist', 'Kabbalah', 'Gnostic', 'Hindu Scripture'].map(f =>
        React.createElement('button', { key:f, style:{ padding:'4px 12px', fontSize:10, fontFamily:"'Fira Mono',monospace", letterSpacing:'0.08em', textTransform:'uppercase', border:'1px solid rgba(255,255,255,0.10)', background: f==='All' ? 'rgba(34,211,238,0.08)' : 'rgba(255,255,255,0.03)', color: f==='All' ? '#22D3EE' : '#71717a', borderRadius:4, cursor:'pointer' } }, f)
      )
    ),
    // Grid
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(130px,1fr))', gap:12 } },
      ...filtered.map(t => React.createElement(BookCard, { key:t.id, text:t }))
    ),
    React.createElement('div', { style:{ marginTop:16, fontFamily:"'Fira Mono',monospace", fontSize:10, color:'#52525b', letterSpacing:'0.1em' } }, `${filtered.length} texts — Showing sample collection`)
  );
};

Object.assign(window, { LibraryGrid, BookCard });
