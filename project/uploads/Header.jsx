// Header.jsx — Prismarium floating glass pill nav
// Exports: PrismariumHeader
// Requires: window.React

const PrismariumHeader = ({ activeScreen, setActiveScreen }) => {
  const [moreOpen, setMoreOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const navItems = [
    { name: 'Library', id: 'library' },
    { name: 'Courses', id: 'courses' },
    { name: 'Journal', id: 'journal' },
    { name: 'Graph', id: 'graph' },
  ];

  return React.createElement('header', {
    style: {
      position: 'sticky', top: 0, zIndex: 50,
      paddingTop: 14, paddingLeft: 16, paddingRight: 16, paddingBottom: 8,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
      pointerEvents: 'none',
    }
  },
    React.createElement('nav', {
      style: {
        pointerEvents: 'auto',
        margin: '0 auto',
        maxWidth: 1280,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        background: 'rgba(10,18,18,0.80)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 9999,
        position: 'relative',
        overflow: 'hidden',
      }
    },
      // Top gradient line
      React.createElement('div', { style: { position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(34,211,238,0.25),transparent)' } }),

      // Logo
      React.createElement('div', {
        onClick: () => setActiveScreen('library'),
        style: { display:'flex', alignItems:'center', gap:10, cursor:'pointer', flexShrink:0 }
      },
        React.createElement('div', { style: { width:30, height:30, borderRadius:'50%', border:'1px solid rgba(34,211,238,0.3)', background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' } },
          React.createElement('svg', { viewBox:'0 0 100 100', fill:'none', width:20, height:20 },
            React.createElement('circle', { cx:50, cy:50, r:40, stroke:'#22D3EE', strokeWidth:2, fill:'none', opacity:0.5 }),
            React.createElement('circle', { cx:50, cy:50, r:20, stroke:'#22D3EE', strokeWidth:1, fill:'none' }),
            React.createElement('circle', { cx:50, cy:50, r:4, fill:'#22D3EE' }),
          )
        ),
        React.createElement('span', { style: { fontFamily:"'Cinzel',serif", fontSize:16, fontWeight:700, letterSpacing:'0.28em', color:'#e4e4e7', textTransform:'uppercase' } }, 'Prismarium')
      ),

      // Desktop nav
      React.createElement('div', { style: { display:'flex', alignItems:'center', gap:2, marginLeft:24 } },
        ...navItems.map(item =>
          React.createElement('button', {
            key: item.id,
            onClick: () => setActiveScreen(item.id),
            style: {
              position: 'relative',
              padding: '7px 16px',
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "'Inter',sans-serif",
              border: '1px solid ' + (activeScreen === item.id ? 'rgba(34,211,238,0.22)' : 'transparent'),
              borderRadius: 7,
              background: activeScreen === item.id ? 'rgba(34,211,238,0.08)' : 'transparent',
              color: activeScreen === item.id ? '#67E8F9' : '#71717a',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }
          },
            item.name,
            activeScreen === item.id && React.createElement('div', {
              style: { position:'absolute', bottom:-2, left:'50%', transform:'translateX(-50%)', width:4, height:4, borderRadius:'50%', background:'#22D3EE', boxShadow:'0 0 6px #22d3ee' }
            })
          )
        ),
        // Extras dropdown
        React.createElement('div', { style: { position:'relative', marginLeft:4 } },
          React.createElement('button', {
            onClick: () => setMoreOpen(!moreOpen),
            style: { display:'flex', alignItems:'center', gap:4, padding:'6px 10px', fontFamily:"'Fira Mono',monospace", fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase', color:'#52525b', background:'transparent', border:'none', cursor:'pointer' }
          }, 'EXTRAS ', React.createElement('span', { style: { display:'inline-block', transform: moreOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 0.2s', fontSize:8 } }, '▼')),
          moreOpen && React.createElement('div', {
            style: { position:'absolute', right:0, top:'calc(100% + 10px)', width:180, background:'#0a0a0f', border:'1px solid rgba(255,255,255,0.09)', borderRadius:12, padding:'6px', zIndex:100, boxShadow:'0 10px 40px rgba(0,0,0,0.8)' }
          },
            React.createElement('div', { style: { padding:'6px 10px 4px', fontSize:9, fontFamily:"'Fira Mono',monospace", color:'rgba(34,211,238,0.45)', letterSpacing:'0.2em', textTransform:'uppercase', borderBottom:'1px solid rgba(255,255,255,0.05)', marginBottom:4 } }, 'Modules'),
            ...['Ritual Library','The Oracle','Workbench'].map(name =>
              React.createElement('button', { key:name, onClick:()=>setMoreOpen(false), style:{ display:'block', width:'100%', textAlign:'left', padding:'7px 10px', fontSize:12, fontFamily:"'Fira Mono',monospace", color:'#a1a1aa', background:'transparent', border:'none', cursor:'pointer', borderRadius:6 } }, name)
            )
          )
        )
      ),

      // Right: Search + User
      React.createElement('div', { style: { display:'flex', alignItems:'center', gap:10, marginLeft:'auto' } },
        // Search button
        React.createElement('button', {
          onClick: () => setActiveScreen('convergence'),
          style: { display:'flex', alignItems:'center', gap:6, padding:'7px 14px', background:'rgba(6,182,212,0.08)', border:'1px solid rgba(34,211,238,0.28)', borderRadius:8, color:'#22D3EE', cursor:'pointer', fontFamily:"'Inter',sans-serif", fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', transition:'all 0.2s' }
        },
          React.createElement('svg', { width:14, height:14, fill:'none', stroke:'currentColor', strokeWidth:1.5, viewBox:'0 0 24 24' },
            React.createElement('path', { d:'M5 3l14 9-14 9V3z', fill:'currentColor', stroke:'none' })
          ),
          'Seven Lenses'
        ),
        // User avatar
        React.createElement('div', { style: { display:'flex', alignItems:'center', gap:8, padding:'4px 8px 4px 12px', border:'1px solid rgba(255,255,255,0.09)', borderRadius:9999, background:'rgba(0,0,0,0.3)' } },
          React.createElement('span', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:11, fontWeight:700, color:'#71717a' } }, 'seeker'),
          React.createElement('div', { style:{ width:26, height:26, borderRadius:'50%', background:'rgba(34,211,238,0.15)', border:'1px solid rgba(34,211,238,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Fira Mono',monospace", fontSize:11, fontWeight:700, color:'#22D3EE' } }, 'S')
        )
      )
    )
  );
};

Object.assign(window, { PrismariumHeader });
