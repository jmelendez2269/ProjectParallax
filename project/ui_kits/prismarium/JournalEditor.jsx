// JournalEditor.jsx — Prismarium Study Journal
// Exports: JournalEditor
// Requires: window.React

const SAMPLE_ENTRIES = [
  { id:1, title:'Hermetic Principles & Quantum Mechanics', date:'Apr 18, 2026', preview:'The Principle of Correspondence — "As above, so below" — finds a striking parallel in…', tags:['Hermeticism','Quantum','Correspondence'] },
  { id:2, title:'Notes on the Tao Te Ching', date:'Apr 15, 2026', preview:'Chapter 1: The Tao that can be spoken is not the eternal Tao. This resonates with…', tags:['Taoism','Wu Wei'] },
  { id:3, title:'Seven Lenses on Emptiness', date:'Apr 10, 2026', preview:'Running the concept of "emptiness" through all seven lenses reveals remarkable convergence…', tags:['Buddhism','Physics','Kabbalah'] },
];

const SAMPLE_CONTENT = [
  { type:'eyebrow', text:'Hermetic Principles & Quantum Mechanics' },
  { type:'h1', text:'The Principle of Correspondence' },
  { type:'p', text:'"As above, so below; as below, so above." — The Kybalion' },
  { type:'clip', source:'The Kybalion, Ch. 2', text:'The great Third Hermetic Principle embodies the truth that there is always a Correspondence between the laws and phenomena of the various planes of Being and Life.' },
  { type:'p', text:"This passage finds a striking parallel in quantum entanglement — where the state of one particle instantaneously influences its entangled partner regardless of distance. Both frameworks suggest that the macro and micro are reflections of the same underlying pattern." },
  { type:'wikilink', text:'[[Sacred Geometry]]', context:'→ connects to patterns in nature' },
  { type:'p', text:'Jung\'s concept of the collective unconscious maps onto this principle as well. The archetypes that appear across all human cultures regardless of contact suggest a "correspondence" between individual psyche and collective mind.' },
];

const JournalSidebar = ({ entries, activeId, setActiveId }) =>
  React.createElement('aside', {
    style: { width:240, flexShrink:0, borderRight:'1px solid rgba(255,255,255,0.07)', padding:'20px 0', display:'flex', flexDirection:'column', gap:2 }
  },
    React.createElement('div', { style:{ padding:'0 16px 14px', borderBottom:'1px solid rgba(255,255,255,0.06)', marginBottom:8 } },
      React.createElement('div', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:9, color:'rgba(34,211,238,0.6)', letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:10 } }, 'Study Journal'),
      React.createElement('button', { style:{ width:'100%', padding:'8px 12px', background:'rgba(34,211,238,0.08)', border:'1px solid rgba(34,211,238,0.22)', borderRadius:6, color:'#22D3EE', fontFamily:"'Fira Mono',monospace", fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', cursor:'pointer', display:'flex', alignItems:'center', gap:6, justifyContent:'center' } },
        React.createElement('span', { style:{fontSize:14} }, '+'), 'New Entry'
      )
    ),
    ...entries.map(entry =>
      React.createElement('button', {
        key: entry.id,
        onClick: () => setActiveId(entry.id),
        style: {
          display:'block', width:'100%', textAlign:'left', padding:'10px 16px',
          background: activeId===entry.id ? 'rgba(34,211,238,0.06)' : 'transparent',
          borderLeft: `2px solid ${activeId===entry.id ? '#22D3EE' : 'transparent'}`,
          border:'none', cursor:'pointer', transition:'all 0.15s'
        }
      },
        React.createElement('div', { style:{ fontFamily:"'Inter',sans-serif", fontSize:12, fontWeight:600, color: activeId===entry.id ? '#f1f5f9' : '#a1a1aa', marginBottom:3, lineHeight:1.3 } }, entry.title),
        React.createElement('div', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:9, color:'#52525b', letterSpacing:'0.06em' } }, entry.date)
      )
    )
  );

const EditorToolbar = () =>
  React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:4, padding:'8px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(0,0,0,0.2)' } },
    ...['B','I','H1','H2','`','❝','⊞'].map(tool =>
      React.createElement('button', { key:tool, style:{ width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Fira Mono',monospace", fontSize:11, color:'#52525b', background:'transparent', border:'none', borderRadius:4, cursor:'pointer' } }, tool)
    ),
    React.createElement('div', { style:{ width:1, height:20, background:'rgba(255,255,255,0.08)', margin:'0 4px' } }),
    React.createElement('button', {
      style: { display:'flex', alignItems:'center', gap:5, padding:'4px 10px', fontFamily:"'Fira Mono',monospace", fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', color:'#B48F4A', background:'rgba(180,143,74,0.08)', border:'1px solid rgba(180,143,74,0.25)', borderRadius:4, cursor:'pointer' }
    }, '✂ Clip to Journal'),
    React.createElement('div', { style:{ marginLeft:'auto', fontFamily:"'Fira Mono',monospace", fontSize:9, color:'#52525b', letterSpacing:'0.08em' } }, 'Auto-saved 2m ago ✓')
  );

const ContentBlock = ({ block }) => {
  if (block.type === 'eyebrow')
    return React.createElement('div', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:10, color:'rgba(34,211,238,0.5)', letterSpacing:'0.25em', textTransform:'uppercase', marginBottom:6 } }, block.text);
  if (block.type === 'h1')
    return React.createElement('h1', { style:{ fontFamily:"'Cinzel',serif", fontSize:26, fontWeight:600, color:'#f1f5f9', margin:'0 0 16px', letterSpacing:'-0.01em', lineHeight:1.2 } }, block.text);
  if (block.type === 'p')
    return React.createElement('p', { style:{ fontFamily:"'Inter',sans-serif", fontSize:14, color:'#d4d4d8', lineHeight:1.75, margin:'0 0 14px' } }, block.text);
  if (block.type === 'clip')
    return React.createElement('div', { style:{ borderLeft:'2px solid #06b6d4', background:'rgba(6,182,212,0.05)', padding:'10px 16px', margin:'14px 0', borderRadius:'0 6px 6px 0' } },
      React.createElement('div', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:9, color:'rgba(34,211,238,0.6)', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:6 } }, '📎 ' + block.source),
      React.createElement('p', { style:{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, fontStyle:'italic', color:'#a1a1aa', margin:0, lineHeight:1.6 } }, `"${block.text}"`)
    );
  if (block.type === 'wikilink')
    return React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:8, margin:'10px 0', padding:'6px 12px', background:'rgba(180,143,74,0.06)', border:'1px solid rgba(180,143,74,0.2)', borderRadius:6, width:'fit-content' } },
      React.createElement('span', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:11, color:'#B48F4A' } }, block.text),
      React.createElement('span', { style:{ fontFamily:"'Inter',sans-serif", fontSize:11, color:'#71717a' } }, block.context)
    );
  return null;
};

const JournalEditor = () => {
  const [activeId, setActiveId] = React.useState(1);
  const entry = SAMPLE_ENTRIES.find(e => e.id === activeId);

  return React.createElement('div', { style:{ display:'flex', height:'calc(100vh - 70px)', overflow:'hidden' } },
    React.createElement(JournalSidebar, { entries:SAMPLE_ENTRIES, activeId, setActiveId }),
    React.createElement('div', { style:{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' } },
      React.createElement(EditorToolbar),
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'32px 48px', maxWidth:720 } },
        entry && React.createElement('div', null,
          React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:20 } },
            ...entry.tags.map(tag =>
              React.createElement('span', { key:tag, style:{ padding:'3px 10px', fontSize:9, fontFamily:"'Fira Mono',monospace", letterSpacing:'0.08em', textTransform:'uppercase', border:'1px solid rgba(34,211,238,0.22)', background:'rgba(34,211,238,0.06)', color:'#67E8F9', borderRadius:3 } }, tag)
            )
          ),
          ...SAMPLE_CONTENT.map((block, i) => React.createElement(ContentBlock, { key:i, block })),
          // Blinking cursor
          React.createElement('div', { style:{ display:'inline-block', width:2, height:18, background:'#22D3EE', verticalAlign:'middle', animation:'blink 1.1s step-end infinite' } })
        )
      )
    ),
    // Right panel — stats
    React.createElement('aside', { style:{ width:200, borderLeft:'1px solid rgba(255,255,255,0.07)', padding:20, display:'flex', flexDirection:'column', gap:14 } },
      React.createElement('div', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:9, color:'#52525b', letterSpacing:'0.2em', textTransform:'uppercase' } }, 'Entry Info'),
      ...[['Words','342'],['Clips','1'],['Links','1'],['Created','Apr 18'],['Modified','2m ago']].map(([k,v]) =>
        React.createElement('div', { key:k },
          React.createElement('div', { style:{ fontFamily:"'Fira Mono',monospace", fontSize:9, color:'#52525b', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:2 } }, k),
          React.createElement('div', { style:{ fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:600, color:'#a1a1aa' } }, v)
        )
      ),
      React.createElement('hr', { style:{ border:'none', borderTop:'1px solid rgba(255,255,255,0.06)', margin:'4px 0' } }),
      React.createElement('button', { style:{ padding:'8px 0', fontFamily:"'Fira Mono',monospace", fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', background:'transparent', border:'1px solid rgba(255,255,255,0.10)', borderRadius:4, color:'#71717a', cursor:'pointer' } }, 'Export →')
    )
  );
};

Object.assign(window, { JournalEditor });
