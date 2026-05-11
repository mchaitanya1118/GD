'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import api from '@/lib/api';
import { MapPin, Navigation, Signal, SignalLow, SignalZero, Loader2, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

// Dynamically import MapComponent to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-50 flex flex-col items-center justify-center rounded-2xl animate-pulse">
      <Loader2 size={48} className="text-slate-200 animate-spin mb-4" />
      <p className="text-xs font-black uppercase tracking-widest text-slate-300">Loading Satellite Stream...</p>
    </div>
  )
});

export default function GPSTrackingPage() {
  const [riders, setRiders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedRider, setSelectedRider] = useState<any>(null);

  const fetchLocations = async () => {
    try {
      const res = await api.get('/riders/gps/active');
      setRiders(res.data);
    } catch (error) {
      console.error('Failed to fetch rider locations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
    const interval = setInterval(fetchLocations, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const filteredRiders = riders.filter(r => 
    r.riderName.toLowerCase().includes(search.toLowerCase()) ||
    r.riderId.toLowerCase().includes(search.toLowerCase())
  );

  const getSignalStrength = (lastUpdate: string) => {
    const diff = Date.now() - new Date(lastUpdate).getTime();
    if (diff < 30000) return <Signal size={14} className="text-emerald-500" />;
    if (diff < 120000) return <SignalLow size={14} className="text-orange-400" />;
    return <SignalZero size={14} className="text-slate-300" />;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
             <div className="bg-slate-900 p-2 rounded-xl text-white">
                <Navigation size={20} className="fill-current" />
             </div>
             <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Live Tracking</h1>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-12">
            Monitoring <span className="text-emerald-500">{riders.length} Active Pilots</span> Across Saudi Arabia
          </p>
        </div>

        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={16} />
          <input
            type="text"
            placeholder="FIND PILOT BY NAME OR ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 bg-white border-2 border-slate-100 rounded-2xl pl-12 pr-4 text-[10px] font-black tracking-widest uppercase focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        {/* Sidebar List */}
        <div className="w-full md:w-80 bg-white rounded-2xl border-2 border-slate-50 flex flex-col shadow-sm min-h-0 overflow-hidden">
          <div className="p-4 border-b border-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">PILOT ROSTER</span>
            <span className="bg-slate-100 px-2 py-1 rounded-lg text-[9px] font-black text-slate-500 uppercase tabular-nums">
              {filteredRiders.length} FOUND
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide">
            {filteredRiders.map((rider) => (
              <button
                key={rider.id}
                onClick={() => setSelectedRider(rider)}
                className={cn(
                  "w-full p-4 rounded-xl text-left transition-all group flex items-start gap-4",
                  selectedRider?.id === rider.id 
                    ? "bg-slate-900 text-white shadow-xl translate-x-2" 
                    : "hover:bg-slate-50"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 transition-colors",
                  selectedRider?.id === rider.id ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"
                )}>
                  <MapPin size={18} className={selectedRider?.id === rider.id ? "text-emerald-400" : "text-slate-400"} />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-tighter truncate",
                      selectedRider?.id === rider.id ? "text-slate-400" : "text-slate-400"
                    )}>
                      #{rider.riderId}
                    </span>
                    {getSignalStrength(rider.lastLocationUpdate)}
                  </div>
                  <h3 className="text-xs font-black uppercase truncate">{rider.riderName}</h3>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-[8px] font-black uppercase px-1.5 py-0.5 rounded",
                      selectedRider?.id === rider.id ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-100 text-slate-500"
                    )}>
                      {rider.vehicleType}
                    </span>
                    <span className="text-[8px] font-bold opacity-60 truncate">
                      {rider.lastLocationUpdate ? formatDistanceToNow(new Date(rider.lastLocationUpdate), { addSuffix: true }).toUpperCase() : 'NO SIGNAL'}
                    </span>
                  </div>
                </div>
              </button>
            ))}
            
            {filteredRiders.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center opacity-30 italic">
                <p className="text-[10px] font-black uppercase">No Pilots Located</p>
              </div>
            )}
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 min-h-[400px]">
          <MapComponent 
            riders={riders} 
            center={selectedRider ? [selectedRider.lastLat, selectedRider.lastLng] : null}
            activeRiderId={selectedRider?.id}
          />
        </div>
      </div>
    </div>
  );
}
