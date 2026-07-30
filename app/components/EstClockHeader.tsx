'use client';

import { useState, useEffect, ReactNode } from 'react';

interface EstClockHeaderProps {
  leftContent?: ReactNode;
}

export default function EstClockHeader({ leftContent }: EstClockHeaderProps) {
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
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '0 0 2em 0' }}>
      <div>{leftContent ?? <span>Valmik Nahata</span>}</div>
      <span>{timeStr}</span>
    </div>
  );
}
