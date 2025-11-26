import type { EventLog } from '../hooks/useEventsLog';

interface Props {
  events: EventLog[];
  onClear: () => void;
  onExport: () => void;
}

export function EventsPanel({ events, onClear, onExport }: Props) {
  return (
    <div className="events-panel visible">
      <div className="panel-header">
        <h2>Events Monitor</h2>
        <span className="event-count">{events.length}</span>
      </div>
      <div className="status-indicator">
        <span className="status-dot" />
        <span>Listening for events...</span>
      </div>
      <div className="panel-controls">
        <button type="button" className="btn btn-clear" onClick={onClear}>
          Clear All
        </button>
        <button type="button" className="btn btn-export" onClick={onExport}>
          Export JSON
        </button>
      </div>
      <div className="events-log">
        {events.length === 0 ? (
          <div className="empty-state">
            <h3>No events yet</h3>
            <p>Open the chat and interact to see events</p>
          </div>
        ) : (
          events.map((e, i) => (
            <EventItem key={`${e.timestamp}-${i}`} event={e} />
          ))
        )}
      </div>
    </div>
  );
}

function EventItem({ event }: { event: EventLog }) {
  const time = new Date(event.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  const hasData = event.data && Object.keys(event.data as object).length > 0;

  return (
    <div className="event-item" data-event={event.event}>
      <div className="event-header">
        <span className="event-type">{event.event}</span>
        <span className="event-timestamp">{time}</span>
      </div>
      {hasData && (
        <div className="event-data">
          <pre>{JSON.stringify(event.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
