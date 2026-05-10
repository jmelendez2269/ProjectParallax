// ConvergenceMachine.jsx — 7-Lens AI reasoning interface
// Exports: ConvergenceMachine
// Requires: window.React

const LENSES = [
  { id:'scientific',     label:'Scientific',              color:'#FF3A5C', desc:'Physics, biology, empirical evidence' },
  { id:'psychological',  label:'Psychological',           color:'#FF8C2A', desc:'Jungian archetypes, shadow work' },
  { id:'philosophical',  label:'Philosophical',           color:'#F5D020', desc:'Metaphysics, ethics, epistemology' },
  { id:'spiritual',      label:'Religious / Spiritual',   color:'#2AFFA0', desc:'Comparative theology, mysticism' },
  { id:'historical',     label:'Historical / Anthro.',    color:'#20E0F5', desc:'Cultural evolution, mythology' },
  { id:'occult',         label:'Symbolic / Occult',       color:'#3A7FFF', desc:'Correspondences, alchemy, astrology' },
  { id:'mathematical',   label:'Mathematical',            color:'#B03AFF', desc:'Sacred geometry, numerology, ratios' },
];

const SAMPLE_RESPONSE = {
  query: 'What is the nature of emptiness?',
  lenses: {
    scientific:    'Quantum field theory describes the vacuum as a seething sea of virtual particles — "empty" space is actually the lowest energy state of quantum fields, teeming with zero-point fluctuations. The Casimir effect demonstrates this measurably: two uncharged plates brought close together experience an attractive force due to vacuum energy.',
    psychological: 'Jung would frame emptiness as the encounter with the Self beyond ego — the "dark night of the soul" is often experienced as a void, but is actually the dissolution of false identity structures. The Jungian concept of kenosis (self-emptying) maps onto Buddhist śūnyatā, suggesting a universal psychological archetype.',
    philosophical: 'Heidegger\'s "Nothing" (das Nichts) is not mere absence but the ground of Being itself — anxiety reveals this Nothing as the horizon within which beings appear. Sartre extends this: consciousness is always "a hole in Being," perpetually fleeing the fullness it can never possess.',
    spiritual:     'Buddhist śūnyatā teaches that all phenomena lack inherent, independent existence — emptiness is not nihilistic but the precondition for interdependence (pratītyasamutpāda). In Kabbalah, the Ain Soph (Limitless) precedes all manifestation. Christian apophatic theology (Meister Eckhart\'s Gottheit) mirrors this — God beyond God.',
    historical:    'The concept of void appears in Sumerian cosmology (Abzu), Egyptian Nun, Greek Chaos, and Vedic Hiranyagarbha — across cultures, the primordial state is a fertile emptiness from which creation emerges. This cross-cultural consistency suggests a deep experiential archetype.',
    occult:        'In Hermetic tradition, the Prima Materia — the undifferentiated substance of the Great Work — is associated with emptiness and potentiality. The Ain in the Kabbalistic Tree of Life represents absolute emptiness as the precondition of the Ain Soph Aur (Limitless Light).',
    mathematical:  'The mathematical concept of zero, independently developed in Babylon, India, and Mesoamerica, encodes something profound: a number representing nothing that makes all other numbers possible. Cantor\'s transfinite mathematics reveals infinitely many "sizes" of emptiness.',
  }
};

const LensSlider = ({ lens, value, onChange }) =>
  React.createElement('div', { style:{ marginBottom:12 } },
    React.createElement('div', { style:{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:4 } },
      React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8 } },
        React.createElement('div', { style:{ width:8, height:8, borderRadius:'50%', background:lens.color, boxShadow:`0 0 8px ${lens.color}` } }),
        React.createElement('span', { style:{ fontFamily:"'Inter',sans-serif", fontSize:12, fontWeight:500, color:'#a1a1aa' } }, lens.label)
      ),
      React.createElement('span', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:10, color:lens.color, letterSpacing:'0.05em' } }, value + '%')
    ),
    React.createElement('div', { style:{ position:'relative', height:4, background:'rgba(255,255,255,0.07)', borderRadius:2 } },
      React.createElement('div', { style:{ position:'absolute', left:0, top:0, height:'100%', width:value+'%', background:`linear-gradient(90deg, ${lens.color}80, ${lens.color})`, borderRadius:2, transition:'width 0.15s' } }),
      React.createElement('input', { type:'range', min:0, max:100, value, onChange: e => onChange(parseInt(e.target.value)),
        style:{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0, cursor:'pointer', margin:0 }
      })
    )
  );

const ConvergenceMachine = () => {
  const [query, setQuery] = React.useState(SAMPLE_RESPONSE.query);
  const [weights, setWeights] = React.useState({ scientific:14, psychological:14, philosophical:14, spiritual:14, historical:14, occult:15, mathematical:15 });
  const [activeLens, setActiveLens] = React.useState('spiritual');
  const [hasResponse, setHasResponse] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const handleQuery = () => {
    setLoading(true);
    setHasResponse(false);
    setTimeout(() => { setLoading(false); setHasResponse(true); }, 1400);
  };

  const setWeight = (id, val) => setWeights(w => ({ ...w, [id]: val }));

  return React.createElement('div', { style:{ display:'flex', height:'calc(100vh - 70px)', overflow:'hidden' } },
    // Left — Controls
    React.createElement('aside', { style:{ width:280, flexShrink:0, borderRight:'1px solid rgba(255,255,255,0.07)', padding:20, overflowY:'auto', display:'flex', flexDirection:'column', gap:0 } },
      React.createElement('div', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:9, color:'rgba(34,211,238,0.6)', letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:4 } }, 'The Convergence Machine'),
      React.createElement('div', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, fontStyle:'italic', color:'#71717a', marginBottom:20, lineHeight:1.5 } }, 'Understanding through seven perspectives'),

      React.createElement('div', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:9, color:'#52525b', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:12 } }, 'Lens Weights'),
      ...LENSES.map(lens => React.createElement(LensSlider, { key:lens.id, lens, value:weights[lens.id], onChange: v => setWeight(lens.id, v) })),

      React.createElement('hr', { style:{ border:'none', borderTop:'1px solid rgba(255,255,255,0.06)', margin:'16px 0' } }),

      // Presets
      React.createElement('div', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:9, color:'#52525b', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:8 } }, 'Presets'),
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:5 } },
        ...[ ['Scholar', {scientific:10,psychological:10,philosophical:20,spiritual:10,historical:40,occult:5,mathematical:5}], ['Practitioner', {scientific:5,psychological:15,philosophical:10,spiritual:35,historical:5,occult:25,mathematical:5}], ['Scientist', {scientific:45,psychological:20,philosophical:15,spiritual:5,historical:5,occult:5,mathematical:5}] ].map(([name, preset]) =>
          React.createElement('button', { key:name, onClick:()=>setWeights(preset), style:{ padding:'7px 10px', fontFamily:"'Fira Mono',monospace", fontSize:10, letterSpacing:'0.1em', textTransform:'uppercase', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:4, color:'#71717a', cursor:'pointer', textAlign:'left' } }, name)
        )
      )
    ),

    // Main area
    React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' } },
      // Query input
      React.createElement('div', { style:{ padding:'20px 28px', borderBottom:'1px solid rgba(255,255,255,0.07)', background:'rgba(0,0,0,0.15)' } },
        React.createElement('div', { style:{ display:'flex', gap:10 } },
          React.createElement('input', {
            value: query,
            onChange: e => setQuery(e.target.value),
            onKeyDown: e => e.key === 'Enter' && handleQuery(),
            placeholder: 'Enter a concept, question, or text passage…',
            style:{ flex:1, background:'rgba(0,0,0,0.5)', border:'1px solid rgba(255,255,255,0.10)', borderRadius:6, padding:'11px 16px', color:'#f1f5f9', fontFamily:"'Cormorant Garamond',serif", fontSize:15, fontStyle:'italic', outline:'none' }
          }),
          React.createElement('button', { onClick:handleQuery, style:{ padding:'11px 22px', background:'#06B6D4', border:'none', borderRadius:6, color:'#000', fontFamily:"'Cinzel',serif", fontSize:10, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer', boxShadow:'0 0 20px rgba(6,182,212,0.35)', flexShrink:0 } }, loading ? '⟳ Synthesizing…' : 'Synthesize →')
        )
      ),

      // Lens tabs + response
      React.createElement('div', { style:{ flex:1, display:'flex', overflow:'hidden' } },
        // Lens tabs
        React.createElement('div', { style:{ width:48, borderRight:'1px solid rgba(255,255,255,0.06)', display:'flex', flexDirection:'column', alignItems:'center', paddingTop:12, gap:6 } },
          ...LENSES.map(lens =>
            React.createElement('button', {
              key:lens.id,
              onClick:()=>setActiveLens(lens.id),
              title:lens.label,
              style:{ width:32, height:32, borderRadius:6, background: activeLens===lens.id ? `${lens.color}22` : 'transparent', border:`1px solid ${activeLens===lens.id ? lens.color+'60' : 'transparent'}`, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s' }
            },
              React.createElement('div', { style:{ width:8, height:8, borderRadius:'50%', background:lens.color, boxShadow: activeLens===lens.id ? `0 0 8px ${lens.color}` : 'none' } })
            )
          )
        ),

        // Response area
        React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'28px 36px' } },
          loading && React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:12, color:'#52525b', fontFamily:"'Fira Mono',monospace", fontSize:12, letterSpacing:'0.1em' } },
            React.createElement('div', { style:{ width:16, height:16, borderRadius:'50%', border:'2px solid rgba(34,211,238,0.3)', borderTopColor:'#22D3EE', animation:'spin 0.8s linear infinite' } }),
            'Synthesizing across seven lenses…'
          ),
          !loading && hasResponse && (() => {
            const lens = LENSES.find(l => l.id === activeLens);
            const response = SAMPLE_RESPONSE.lenses[activeLens];
            return React.createElement('div', null,
              React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10, marginBottom:16 } },
                React.createElement('div', { style:{ width:10, height:10, borderRadius:'50%', background:lens.color, boxShadow:`0 0 12px ${lens.color}` } }),
                React.createElement('div', { style:{ fontFamily:"'Cinzel',serif", fontSize:15, fontWeight:600, color:'#f1f5f9' } }, lens.label),
                React.createElement('div', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:9, color:lens.color, letterSpacing:'0.1em', textTransform:'uppercase', opacity:0.7 } }, lens.desc)
              ),
              React.createElement('div', { style:{ fontFamily:"'Inter',sans-serif", fontSize:14, color:'#d4d4d8', lineHeight:1.8 } }, response),

              React.createElement('hr', { style:{ border:'none', borderTop:'1px solid rgba(255,255,255,0.06)', margin:'28px 0' } }),

              React.createElement('div', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:9, color:'#52525b', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:12 } }, 'Synthesis Overview'),
              React.createElement('div', { style:{ display:'flex', gap:8, flexWrap:'wrap' } },
                ...LENSES.map(l =>
                  React.createElement('button', {
                    key:l.id,
                    onClick:()=>setActiveLens(l.id),
                    style:{ padding:'6px 14px', fontFamily:"'Fira Mono',monospace", fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase', border:`1px solid ${l.color}40`, background: activeLens===l.id ? `${l.color}18` : `${l.color}08`, color: activeLens===l.id ? l.color : l.color+'99', borderRadius:4, cursor:'pointer' }
                  }, l.label)
                )
              )
            );
          })()
        )
      )
    )
  );
};

Object.assign(window, { ConvergenceMachine });
