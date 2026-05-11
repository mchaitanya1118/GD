'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix for Leaflet default icon issues in Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Marker Icon for Pilots
const PilotIcon = (color: string) => L.divIcon({
  html: `<div class="bg-${color}-500 p-2 rounded-full border-2 border-white shadow-lg text-white">
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
  </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function RecenterMap({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 14, { animate: true });
  }, [position, map]);
  return null;
}

export default function MapComponent({ riders, center, activeRiderId }: any) {
  return (
    <MapContainer 
      center={center || [24.7136, 46.6753]} // Riyadh default
      zoom={12} 
      className="h-full w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {center && <RecenterMap position={center} />}
      {riders.map((rider: any) => (
        <Marker 
          key={rider.id} 
          position={[rider.lastLat, rider.lastLng]}
          icon={PilotIcon(rider.id === activeRiderId ? 'orange' : 'emerald')}
        >
          <Popup className="rounded-xl overflow-hidden shadow-xl border-none">
            <div className="p-2 space-y-1 min-w-[150px]">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">PILOT #{rider.riderId}</p>
              <h3 className="text-sm font-bold text-slate-900">{rider.riderName}</h3>
              <div className="flex items-center gap-2 pt-1 border-t border-slate-100 mt-2">
                <span className={`w-2 h-2 rounded-full ${rider.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                <span className="text-[10px] font-black uppercase text-slate-500">{rider.status}</span>
                <span className="text-[10px] font-black uppercase text-slate-300 ml-auto">{rider.vehicleType}</span>
              </div>
              {rider.lastLocationUpdate && (
                <p className="text-[9px] text-slate-400 mt-2 italic">
                  Last Update: {new Date(rider.lastLocationUpdate).toLocaleTimeString()}
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
