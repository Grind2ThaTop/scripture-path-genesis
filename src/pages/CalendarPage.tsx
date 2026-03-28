import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { Link } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, addMonths, subMonths, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import {
  CalendarDays, ChevronLeft, ChevronRight, Plus, Clock, MapPin,
  Users, LogIn, Loader2, BookOpen, CheckCircle2, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const EVENT_TYPES = [
  { value: 'teaching', label: '📖 Teaching', color: 'bg-primary/20 text-primary' },
  { value: 'prayer', label: '🙏 Prayer', color: 'bg-blue-500/20 text-blue-400' },
  { value: 'qa', label: '❓ Q&A', color: 'bg-purple-500/20 text-purple-400' },
  { value: 'study', label: '📚 Study', color: 'bg-emerald-500/20 text-emerald-400' },
  { value: 'fellowship', label: '🤝 Fellowship', color: 'bg-amber-500/20 text-amber-400' },
  { value: 'fast', label: '⚔️ Fast Day', color: 'bg-red-500/20 text-red-400' },
  { value: 'sabbath', label: '🕊️ Sabbath', color: 'bg-indigo-500/20 text-indigo-400' },
];

export default function CalendarPage() {
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin();
  const qc = useQueryClient();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', event_type: 'teaching', speaker: '', start_time: '', end_time: '' });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const { data: events, isLoading } = useQuery({
    queryKey: ['events', format(currentMonth, 'yyyy-MM')],
    queryFn: async () => {
      const { data, error } = await (supabase.from('events' as any) as any)
        .select('*')
        .gte('start_time', monthStart.toISOString())
        .lte('start_time', monthEnd.toISOString())
        .order('start_time');
      if (error) throw error;
      return data as any[];
    },
    enabled: !!user,
  });

  const { data: myRSVPs } = useQuery({
    queryKey: ['my-rsvps'],
    queryFn: async () => {
      const { data, error } = await (supabase.from('event_attendance' as any) as any)
        .select('event_id')
        .eq('user_id', user!.id);
      if (error) throw error;
      return new Set((data || []).map((r: any) => r.event_id));
    },
    enabled: !!user,
  });

  const { data: attendanceCounts } = useQuery({
    queryKey: ['attendance-counts', format(currentMonth, 'yyyy-MM')],
    queryFn: async () => {
      const eventIds = (events || []).map((e: any) => e.id);
      if (!eventIds.length) return {};
      const { data, error } = await (supabase.from('event_attendance' as any) as any)
        .select('event_id')
        .in('event_id', eventIds);
      if (error) throw error;
      const counts: Record<string, number> = {};
      (data || []).forEach((a: any) => { counts[a.event_id] = (counts[a.event_id] || 0) + 1; });
      return counts;
    },
    enabled: !!user && !!events?.length,
  });

  const createEvent = useMutation({
    mutationFn: async () => {
      const { error } = await (supabase.from('events' as any) as any).insert({
        ...newEvent,
        created_by: user!.id,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setShowCreate(false);
      setNewEvent({ title: '', description: '', event_type: 'teaching', speaker: '', start_time: '', end_time: '' });
      qc.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event created');
    },
    onError: (e: any) => toast.error(e.message),
  });

  const toggleRSVP = async (eventId: string) => {
    if (myRSVPs?.has(eventId)) {
      await (supabase.from('event_attendance' as any) as any).delete().eq('event_id', eventId).eq('user_id', user!.id);
    } else {
      await (supabase.from('event_attendance' as any) as any).insert({ event_id: eventId, user_id: user!.id });
    }
    qc.invalidateQueries({ queryKey: ['my-rsvps'] });
    qc.invalidateQueries({ queryKey: ['attendance-counts'] });
    toast.success(myRSVPs?.has(eventId) ? 'RSVP cancelled' : 'RSVP confirmed');
  };

  const getEventsForDay = (day: Date) => (events || []).filter((e: any) => isSameDay(parseISO(e.start_time), day));
  const selectedEvents = selectedDate ? getEventsForDay(selectedDate) : events || [];
  const typeInfo = (type: string) => EVENT_TYPES.find(t => t.value === type) || EVENT_TYPES[0];

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <CalendarDays className="w-16 h-16 text-primary" />
        <h1 className="text-3xl font-display font-bold text-foreground">Calendar</h1>
        <Link to="/auth"><Button><LogIn className="mr-2 h-4 w-4" /> Sign In</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
            <CalendarDays className="text-primary" /> Calendar
          </h1>
          <p className="text-muted-foreground mt-1">Church rhythm. Sabbath. Gatherings. Discipline.</p>
        </div>
        {isAdmin && (
          <Dialog open={showCreate} onOpenChange={setShowCreate}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" /> New Event</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create Event</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Event title" value={newEvent.title} onChange={e => setNewEvent(p => ({ ...p, title: e.target.value }))} className="bg-secondary" />
                <Textarea placeholder="Description" value={newEvent.description} onChange={e => setNewEvent(p => ({ ...p, description: e.target.value }))} className="bg-secondary" />
                <select value={newEvent.event_type} onChange={e => setNewEvent(p => ({ ...p, event_type: e.target.value }))}
                  className="w-full bg-secondary text-foreground rounded-md border border-border p-2 text-sm">
                  {EVENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                <Input placeholder="Speaker (optional)" value={newEvent.speaker} onChange={e => setNewEvent(p => ({ ...p, speaker: e.target.value }))} className="bg-secondary" />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">Start</label>
                    <Input type="datetime-local" value={newEvent.start_time} onChange={e => setNewEvent(p => ({ ...p, start_time: e.target.value }))} className="bg-secondary" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">End</label>
                    <Input type="datetime-local" value={newEvent.end_time} onChange={e => setNewEvent(p => ({ ...p, end_time: e.target.value }))} className="bg-secondary" />
                  </div>
                </div>
                <Button onClick={() => createEvent.mutate()} disabled={!newEvent.title.trim() || !newEvent.start_time || createEvent.isPending} className="w-full">
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Calendar Grid */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button onClick={() => setCurrentMonth(m => subMonths(m, 1))} className="text-muted-foreground hover:text-foreground"><ChevronLeft /></button>
          <h2 className="font-display font-semibold text-foreground">{format(currentMonth, 'MMMM yyyy')}</h2>
          <button onClick={() => setCurrentMonth(m => addMonths(m, 1))} className="text-muted-foreground hover:text-foreground"><ChevronRight /></button>
        </div>

        <div className="grid grid-cols-7 text-center text-xs text-muted-foreground border-b border-border">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="p-2">{d}</div>)}
        </div>

        <div className="grid grid-cols-7">
          {/* Empty cells for offset */}
          {Array.from({ length: monthStart.getDay() }).map((_, i) => <div key={`e-${i}`} className="p-2 border-b border-r border-border min-h-[60px]" />)}
          {days.map(day => {
            const dayEvents = getEventsForDay(day);
            const selected = selectedDate && isSameDay(day, selectedDate);
            return (
              <button key={day.toISOString()} onClick={() => setSelectedDate(selected ? null : day)}
                className={`p-2 border-b border-r border-border min-h-[60px] text-left transition-all hover:bg-muted/30 ${
                  isToday(day) ? 'bg-primary/5' : ''
                } ${selected ? 'bg-primary/10 ring-1 ring-primary/30' : ''}`}
              >
                <span className={`text-xs font-medium ${isToday(day) ? 'text-primary' : 'text-foreground'}`}>
                  {format(day, 'd')}
                </span>
                {dayEvents.slice(0, 2).map((e: any) => (
                  <div key={e.id} className={`mt-1 text-[10px] px-1 py-0.5 rounded truncate ${typeInfo(e.event_type).color}`}>
                    {e.title}
                  </div>
                ))}
                {dayEvents.length > 2 && <p className="text-[10px] text-muted-foreground mt-0.5">+{dayEvents.length - 2} more</p>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Event List */}
      <div>
        <h2 className="font-display font-semibold text-foreground mb-3">
          {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'All Events This Month'}
        </h2>
        {isLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : !selectedEvents.length ? (
          <p className="text-muted-foreground text-sm py-6 text-center">No events scheduled.</p>
        ) : (
          <div className="space-y-3">
            {selectedEvents.map((event: any) => (
              <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`text-[10px] ${typeInfo(event.event_type).color} border-0`}>{typeInfo(event.event_type).label}</Badge>
                      <h3 className="font-display font-semibold text-foreground">{event.title}</h3>
                    </div>
                    {event.description && <p className="text-sm text-muted-foreground mb-2">{event.description}</p>}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {format(parseISO(event.start_time), 'h:mm a')}{event.end_time && ` – ${format(parseISO(event.end_time), 'h:mm a')}`}</span>
                      {event.speaker && <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {event.speaker}</span>}
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {(attendanceCounts as any)?.[event.id] || 0} attending</span>
                    </div>
                  </div>
                  <Button size="sm" variant={myRSVPs?.has(event.id) ? 'secondary' : 'default'} onClick={() => toggleRSVP(event.id)}>
                    {myRSVPs?.has(event.id) ? <><CheckCircle2 className="w-3 h-3 mr-1" /> Going</> : 'RSVP'}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
