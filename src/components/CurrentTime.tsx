'use client'

import React, { useState, useEffect, forwardRef } from "react";

interface CurrentTimeProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export const CurrentTime = forwardRef<HTMLSpanElement, CurrentTimeProps>(
  ({ className, ...props }, ref) => {
    const [currentTime, setCurrentTime] = useState('');

    // Update time every second
    useEffect(() => {
      const updateTime = () => {
        const now = new Date();
        // Convert to Seattle time (Pacific Time)
        const seattleTime = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Los_Angeles',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }).format(now);
        
        // Get timezone abbreviation (PST/PDT)
        const timeZone = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Los_Angeles',
          timeZoneName: 'short'
        }).formatToParts(now).find(part => part.type === 'timeZoneName')?.value || 'PT';
        
        setCurrentTime(`${seattleTime} ${timeZone}`);
      };

      // Update immediately
      updateTime();
      
      // Then update every second
      const interval = setInterval(updateTime, 1000);
      
      return () => clearInterval(interval);
    }, []);

    return (
      <span ref={ref} className={className} {...props}>
        {currentTime}
      </span>
    );
  }
);

CurrentTime.displayName = "CurrentTime";
