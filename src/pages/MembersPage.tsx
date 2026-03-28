import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, LogIn, Loader2, Search, Crown, Flame, BookOpen, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const LEVEL_NAMES = ['', 'Seeker', 'Learner', 'Rooted', 'Disciplined', 'Builder', 'Servant', 'Guide', 'Teacher', 'Elder-track'];
const LEVEL_COLORS = ['', 'text-muted-foreground', 'text-blue-400', 'text-emerald-400', 'text-amber-400', 'text-orange-400', 'text-red-400', 'text-purple-400', 'text-primary', 'text-primary'];

export default function MembersPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState(0);

  const { data: members, isLoading } = useQuery({
    queryKey: ['members-directory'],
    queryFn: async () => {
      const { data: profiles, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (error) throw error;

      const userIds = (profiles || []).map(p => p.user_id);
      const { data: levels } = await (supabase.from('user_levels') as any).select('user_id, current_level, xp, days_consistent, lessons_completed');

      const { data: groupMemberships } = await (supabase.from('group_members' as any) as any).select('user_id, group_id');
      const { data: groups } = await (supabase.from('accountability_groups' as any) as any).select('id, name');

      const levelMap = (levels || []).reduce((acc: any, l: any) => { acc[l.user_id] = l; return acc; }, {});
      const groupMap = (groups || []).reduce((acc: any, g: any) => { acc[g.id] = g.name; return acc; }, {});
      const memberGroups: Record<string, string[]> = {};
      (groupMemberships || []).forEach((m: any) => {
        if (!memberGroups[m.user_id]) memberGroups[m.user_id] = [];
        memberGroups[m.user_id].push(groupMap[m.group_id] || 'Unknown');
      });

      const { data: roles } = await (supabase.from('user_roles') as any).select('user_id, role');
      const roleMap: Record<string, string[]> = {};
      (roles || []).forEach((r: any) => {
        if (!roleMap[r.user_id]) roleMap[r.user_id] = [];
        roleMap[r.user_id].push(r.role);
      });

      return (profiles || []).map(p => ({
        ...p,
        level: levelMap[p.user_id]?.current_level || 1,
        xp: levelMap[p.user_id]?.xp || 0,
        streak: levelMap[p.user_id]?.days_consistent || 0,
        lessons: levelMap[p.user_id]?.lessons_completed || 0,
        circles: memberGroups[p.user_id] || [],
        roles: roleMap[p.user_id] || ['user'],
      }));
    },
    enabled: !!user,
  });

  const filtered = (members || []).filter((m: any) => {
    if (search && !m.display_name?.toLowerCase().includes(search.toLowerCase())) return false;
    if (levelFilter && m.level !== levelFilter) return false;
    return true;
  });

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <Users className="w-16 h-16 text-primary" />
        <h1 className="text-3xl font-display font-bold text-foreground">Members</h1>
        <Link to="/auth"><Button><LogIn className="mr-2 h-4 w-4" /> Sign In</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
          <Users className="text-primary" /> Members
        </h1>
        <p className="text-muted-foreground mt-1">The body. Searchable. Every member on a growth path.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-secondary" />
        </div>
        <select value={levelFilter} onChange={e => setLevelFilter(Number(e.target.value))}
          className="bg-secondary text-foreground rounded-md border border-border p-2 text-sm">
          <option value={0}>All Levels</option>
          {LEVEL_NAMES.slice(1).map((name, i) => <option key={i+1} value={i+1}>{name}</option>)}
        </select>
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} members</p>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((member: any) => (
            <motion.div key={member.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-card border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{(member.display_name || 'A')[0].toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{member.display_name || 'Anonymous'}</p>
                  <p className={`text-xs ${LEVEL_COLORS[member.level] || 'text-muted-foreground'}`}>
                    {LEVEL_NAMES[member.level] || 'Seeker'}
                  </p>
                </div>
                {member.roles.includes('admin') && <Badge className="text-[10px] bg-primary/20 text-primary border-0"><Shield className="w-2.5 h-2.5 mr-0.5" /> Admin</Badge>}
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-400" /> {member.streak}d</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-blue-400" /> {member.lessons}</span>
                <span className="flex items-center gap-1"><Crown className="w-3 h-3 text-primary" /> {member.xp} XP</span>
              </div>

              {member.circles.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {member.circles.map((c: string) => <Badge key={c} variant="outline" className="text-[10px]">{c}</Badge>)}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
