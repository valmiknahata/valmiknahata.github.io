'use client';

import { useState, useEffect } from 'react';

export default function EstClockHeader() {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateEstClock = () => {
      const now = new Date();
      const est = now.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTimeStr(est + ' EST');
    };
    updateEstClock();
    const interval = setInterval(updateEstClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        maxWidth: '925px',
        margin: '0 auto',
        width: '925px',
        boxSizing: 'border-box',
        padding: '36px 60px 0 60px',
        fontFamily: "'Crimson Text', serif",
        fontSize: '16px',
        color: '#555555',
      }}
    >
      <span>Valmik Nahata</span>
      <span>{timeStr}</span>
    </div>
  );
}
