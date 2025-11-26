import { useState, useCallback, useMemo } from 'react';

export interface EventLog {
  timestamp: string;
  event: string;
  data: unknown;
}

export function useEventsLog() {
  const [events, setEvents] = useState<EventLog[]>([]);

  const logEvent = useCallback((event: string, data: unknown = {}) => {
    const eventData = {
      timestamp: new Date().toISOString(),
      event,
      data,
    };
    console.log('Event received:', eventData);
    setEvents((prev) => [eventData, ...prev].slice(0, 50));
  }, []);

  const clearEvents = useCallback(() => setEvents([]), []);

  const exportEvents = useCallback(() => {
    if (events.length === 0) return;
    const blob = new Blob([JSON.stringify(events, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skingpt-events-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [events]);

  return useMemo(
    () => ({ events, logEvent, clearEvents, exportEvents }),
    [events, logEvent, clearEvents, exportEvents],
  );
}
