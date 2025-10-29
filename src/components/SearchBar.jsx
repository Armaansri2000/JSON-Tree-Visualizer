import React, { useState } from 'react';

export default function SearchBar({ nodes, rfInstance, setMatchMessage }) {
  const [q, setQ] = useState('');

  const onSearch = () => {
    setMatchMessage('');
    const normalized = q.trim();

    if (!normalized) {
      setMatchMessage('Enter to search');
      setTimeout(() => setMatchMessage(''), 2000);
      return;
    }

    let query = normalized.startsWith('$') ? normalized : '$.' + normalized;
    const found = nodes.find((n) => n.id === query);

    if (found) {
      rfInstance?.setCenter(found.position.x, found.position.y, { duration: 800 });
      setMatchMessage('Match found');
    } else {
      setMatchMessage('No match found');
    }

    // Clear message and input after 2.5s
    setTimeout(() => {
      setMatchMessage('');
      setQ('');
    }, 2500);
  };

  return (
    <div className="card" style={{ padding: 10 }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Search JSON Path</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. $.user.address.city or items[0].name"
          style={{ flex: 1, padding: 8 }}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
        <button onClick={onSearch}>Search</button>
      </div>
    </div>
  );
}
