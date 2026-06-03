"use client";

import { useEffect, useState, useCallback, useMemo, Fragment } from 'react';
import api from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  Save, 
  Calculator,
  Loader2,
  Calendar,
  Filter,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  User,
  MoreHorizontal
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DailyEntryGrid() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [companyCode, setCompanyCode] = useState('ALL');
  const [companies, setCompanies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [riders, setRiders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [entryMap, setEntryMap] = useState<Record<string, any>>({});
  const [pendingChanges, setPendingChanges] = useState<Record<string, any>>({});

  const daysInMonth = useMemo(() => new Date(year, month, 0).getDate(), [month, year]);
  const daysArray = useMemo(() => Array.from({ length: daysInMonth }, (_, i) => i + 1), [daysInMonth]);

  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());

  const fetchGrid = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/daily-entries?month=${month}&year=${year}&companyCode=${companyCode}`);
      setRiders(data.riders);
      setEntryMap(data.entryMap);
      setPendingChanges({});
    } catch (error) {
      console.error('[DailyEntryGrid] fetchGrid error:', error);
      toast.error('Failed to fetch daily entries');
    } finally {
      setLoading(false);
    }
  }, [month, year, companyCode]);

  const fetchCompanies = async () => {
    try {
      const { data } = await api.get('/riders/companies');
      setCompanies(data);
    } catch (error) {
      console.error('Failed to fetch companies');
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    fetchGrid();
  }, [fetchGrid]);

  const handleCellChange = (riderId: string, day: number, field: string, value: any) => {
    const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const changeKey = `${riderId}_${dateKey}`;
    
    setPendingChanges(prev => ({
      ...prev,
      [changeKey]: {
        ...prev[changeKey],
        riderId,
        date: dateKey,
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    const updates = Object.values(pendingChanges);
    if (updates.length === 0) {
      toast.info('No changes to save');
      return;
    }

    setSaving(true);
    try {
      await api.post('/daily-entries/bulk', { updates });
      toast.success('Daily entries saved successfully');
      setPendingChanges({});
      fetchGrid();
    } catch (error) {
      toast.error('Failed to save entries');
    } finally {
      setSaving(false);
    }
  };

  const getEntryValue = useCallback((riderId: string, day: number, field: string) => {
    const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const key = `${riderId}_${dateKey}`;
    
    if (pendingChanges[key] && pendingChanges[key][field] !== undefined) {
      return pendingChanges[key][field];
    }
    
    const entry = entryMap[key];
    if (entry) {
      return entry[field];
    }
    
    if (field === 'status') return '';
    return 0;
  }, [year, month, pendingChanges, entryMap]);

  const dailySummaries = useMemo(() => {
    const summaries: Record<number, { worked: number, notWorked: number }> = {};
    daysArray.forEach(day => {
      let worked = 0;
      let notWorked = 0;
      riders.forEach(rider => {
        const status = getEntryValue(rider.id, day, 'status');
        if (status === 'working') worked++;
        else if (status === 'not_working' || status === 'absent') notWorked++;
      });
      summaries[day] = { worked, notWorked };
    });
    return summaries;
  }, [riders, entryMap, pendingChanges, daysArray, getEntryValue]);

  const selectedDateStats = useMemo(() => {
    let totalOrders = 0;
    let totalCash = 0;
    riders.forEach(rider => {
      const orders = getEntryValue(rider.id, selectedDate, 'orders');
      const cash = getEntryValue(rider.id, selectedDate, 'cashCollected');
      totalOrders += typeof orders === 'number' ? orders : 0;
      totalCash += typeof cash === 'number' ? cash : 0;
    });
    return { totalOrders, totalCash };
  }, [riders, selectedDate, getEntryValue]);

  const filteredRiders = useMemo(() => {
    if (!searchQuery) return riders;
    const lowerQuery = searchQuery.toLowerCase();
    return riders.filter(rider => 
      rider.riderName.toLowerCase().includes(lowerQuery) || 
      rider.riderId.toLowerCase().includes(lowerQuery)
    );
  }, [riders, searchQuery]);

  // Group riders by nationality
  const groupedRiders = useMemo(() => {
    const groups: Record<string, any[]> = {};
    filteredRiders.forEach(rider => {
      const nationality = rider.nationality || 'OTHER';
      if (!groups[nationality]) groups[nationality] = [];
      groups[nationality].push(rider);
    });
    return groups;
  }, [filteredRiders]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const totalWorked = useMemo(() => {
    return Object.values(dailySummaries).reduce((acc, curr) => acc + curr.worked, 0);
  }, [dailySummaries]);

  // Calendar Logic
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const calendarDays = useMemo(() => {
    const days = [];
    // Padding for start of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Days in month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }, [firstDayOfMonth, daysInMonth]);

  return (
    <div className="max-w-[100vw] flex flex-col space-y-6 pb-10">
      {/* Top Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-white/40 backdrop-blur-xl p-6 rounded-3xl premium-shadow border border-white/60 mx-4 mt-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="h-16 w-24 bg-slate-900 rounded-2xl flex flex-col items-center justify-center shadow-lg border-2 border-white/10 group overflow-hidden relative shrink-0">
             <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <span className="text-2xl font-bold text-white leading-none relative z-10">{totalWorked}</span>
             <span className="text-[9px] font-semibold text-emerald-400 uppercase tracking-wider mt-1 relative z-10">Total Worked</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-md shrink-0">
              <Calendar className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Attendance Calendar</h2>
              <p className="text-xs font-medium text-slate-500">Interactive Performance Hub</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
          <div className="flex items-center gap-3 flex-1 xl:flex-none">
            <Select value={String(month)} onValueChange={(val) => { if (val) setMonth(parseInt(val)); }}>
              <SelectTrigger className="h-10 rounded-xl bg-white border-slate-200 shadow-sm font-semibold text-sm min-w-[120px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                {months.map((m, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)} className="font-medium text-sm">{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={String(year)} onValueChange={(val) => { if (val) setYear(parseInt(val)); }}>
              <SelectTrigger className="h-10 rounded-xl bg-white border-slate-200 shadow-sm font-semibold text-sm min-w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                {[2024, 2025, 2026].map(y => (
                  <SelectItem key={y} value={String(y)} className="font-medium text-sm">{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="h-10 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md transition-all shrink-0"
            onClick={handleSave}
            disabled={saving || Object.keys(pendingChanges).length === 0}
          >
            {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save className="mr-2" size={16} />}
            Save Changes ({Object.keys(pendingChanges).length})
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-4">
        {/* Rows: Calendar, then Date Info */}
        <div className="flex flex-col gap-6 shrink-0">
          <div className="bg-white/60 backdrop-blur-md p-5 rounded-3xl premium-shadow border border-white/60">
            <div className="flex flex-row gap-1 justify-between w-full">
              {daysArray.map((day) => {
                const dayOfWeek = new Date(year, month - 1, day).toLocaleDateString('en-US', { weekday: 'narrow' }).toUpperCase();
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      "flex-1 min-w-0 py-1.5 px-0.5 rounded-lg flex flex-col items-center justify-center transition-all relative group border",
                      selectedDate === day 
                        ? "bg-slate-900 border-slate-900 shadow-sm transform scale-110 z-10" 
                        : "bg-white/80 border-slate-100 hover:border-emerald-500/50 hover:bg-white"
                    )}
                  >
                    <span className={cn(
                      "text-[8px] font-bold mb-0.5",
                      selectedDate === day ? "text-slate-300" : "text-slate-400"
                    )}>
                      {dayOfWeek}
                    </span>
                    <span className={cn(
                      "text-xs font-bold",
                      selectedDate === day ? "text-white" : "text-slate-800"
                    )}>
                      {day}
                    </span>

                    {/* Indicator dot */}
                    {dailySummaries[day]?.notWorked > 0 && (
                      <div className="absolute top-1 right-1 h-1 w-1 rounded-full bg-rose-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats for selected day */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-row justify-center items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{dailySummaries[selectedDate]?.worked || 0}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Worked</span>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-row justify-center items-baseline gap-2">
              <span className="text-2xl font-bold text-rose-500">{dailySummaries[selectedDate]?.notWorked || 0}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Absent</span>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-row justify-center items-baseline gap-2">
              <span className="text-2xl font-bold text-blue-500">{selectedDateStats.totalOrders}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Orders</span>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-row justify-center items-baseline gap-2">
              <span className="text-2xl font-bold text-amber-500">{selectedDateStats.totalCash.toFixed(2)}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cash</span>
            </div>
          </div>
        </div>

        {/* Bottom Row: Interactive Rider List for Selected Day */}
        <div className="flex flex-col bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col gap-4 bg-slate-50/50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {new Date(year, month - 1, selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </h3>
                <p className="text-xs font-medium text-emerald-600 mt-0.5">
                  Managing Attendance & Performance
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700">Active</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Tabs value={companyCode} onValueChange={setCompanyCode} className="w-full md:w-auto">
                <TabsList className="bg-slate-100 p-1 rounded-xl h-auto flex flex-wrap gap-1">
                  <TabsTrigger value="ALL" className="rounded-lg px-4 py-1.5 font-semibold text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500 transition-all">ALL</TabsTrigger>
                  {companies.map(c => (
                    <TabsTrigger key={c} value={c} className="rounded-lg px-4 py-1.5 font-semibold text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500 transition-all">{c}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <Input 
                  placeholder="Search pilots..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 pl-9 rounded-xl bg-white border-slate-200 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="p-5 bg-slate-50/30">
            <div className="grid grid-cols-2 gap-4">
              {filteredRiders.map((rider) => {
                const status = getEntryValue(rider.id, selectedDate, 'status');
                const isWorking = status === 'working';
                return (
                  <div key={rider.id} className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500 text-sm shrink-0">
                          {rider.riderId.slice(-2)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-sm text-slate-900 truncate">{rider.riderName}</h4>
                          <p className="text-xs font-medium text-slate-500 truncate">{rider.riderId}</p>
                        </div>
                      </div>
                      
                      <div className="shrink-0 flex bg-slate-100 p-1 rounded-lg">
                        <button
                          onClick={() => handleCellChange(rider.id, selectedDate, 'status', 'working')}
                          className={cn(
                            "px-3 py-1 rounded-md text-xs font-semibold transition-all",
                            isWorking ? "bg-emerald-500 text-white shadow-sm" : "text-slate-500 hover:bg-slate-200"
                          )}
                        >
                          Work
                        </button>
                        <button
                          onClick={() => handleCellChange(rider.id, selectedDate, 'status', 'absent')}
                          className={cn(
                            "px-3 py-1 rounded-md text-xs font-semibold transition-all",
                            !isWorking ? "bg-rose-500 text-white shadow-sm" : "text-slate-500 hover:bg-slate-200"
                          )}
                        >
                          Absent
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div>
                        <Label className="text-[10px] font-semibold text-slate-500 uppercase mb-1.5 block">Orders</Label>
                        <Input 
                          type="number"
                          value={getEntryValue(rider.id, selectedDate, 'orders') || ''}
                          onChange={(e) => handleCellChange(rider.id, selectedDate, 'orders', parseInt(e.target.value) || 0)}
                          className="h-8 bg-white border-slate-200 font-medium text-sm"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label className="text-[10px] font-semibold text-slate-500 uppercase mb-1.5 block">Cash Collected</Label>
                        <Input 
                          type="number"
                          step="0.01"
                          value={getEntryValue(rider.id, selectedDate, 'cashCollected') || ''}
                          onChange={(e) => handleCellChange(rider.id, selectedDate, 'cashCollected', parseFloat(e.target.value) || 0)}
                          className="h-8 bg-white border-slate-200 font-medium text-sm"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredRiders.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center h-full py-20 opacity-60">
                <Search size={32} className="text-slate-400 mb-3" />
                <p className="text-sm font-medium text-slate-500">No Pilots Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
