import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy, Flame, BookOpen, Users, Crown, Medal, LogIn, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LEVEL_NAMES = ['', 'Milk', 'Foundation', 'Understanding', 'Application', 'Teacher'];
const LEVEL_COLORS = ['', 'text-muted-foreground', 'text-blue-400', 'text-purple-400', 'text-orange-400', 'text-primary'];

export default function LeaderboardPage() {
  const { user } = useAuth();

  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      // Get all user levels with profiles
      const { data: levels, error } = await (supabase.from('user_levels') as any)
        .select('user_id, xp, current_level, days_consistent, lessons_completed')
        .order('xp', { ascending: false })
        .limit(50);
      if (error) throw error;

      // Get profiles for display names
      const userIds = (levels || []).map((l: any) => l.user_id);
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, display_name, avatar_url')
        .in('user_id', userIds);

      const profileMap = (profiles || []).reduce((acc: any, p: any) => {
        acc[p.user_id] = p;
        return acc;
      }, {});

      return (levels || []).map((l: any, i: number) => ({
        ...l,
        rank: i + 1,
        display_name: profileMap[l.user_id]?.display_name || 'Anonymous',
        avatar_url: profileMap[l.user_id]?.avatar_url,
      }));
    },
    enabled: !!user,
  });

  const { data: badges } = useQuery({
    queryKey: ['my-badges'],
    queryFn: async () => {
      const { data, error } = await (supabase.from('user_badges') as any)
        .select('*, badges(*)')
        .eq('user_id', user!.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: allBadges } = useQuery({
    queryKey: ['all-badges'],
    queryFn: async () => {
      const { data, error } = await (supabase.from('badges') as any).select('*').order('xp_reward');
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <Trophy className="w-16 h-16 text-primary" />
        <h1 className="text-3xl font-display font-bold text-foreground">Leaderboard</h1>
        <Link to="/auth"><Button><LogIn className="mr-2 h-4 w-4" /> Sign In</Button></Link>
      </div>
    );
  }

  const earnedIds = new Set((badges || []).map((b: any) => b.badge_id));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
          <Trophy className="text-primary" /> Leaderboard
        </h1>
        <p className="text-muted-foreground mt-1">Silent competition. Real discipline.</p>
      </div>

      {/* Leaderboard */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border bg-secondary/30">
          <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
            <Crown className="w-4 h-4 text-primary" /> Top Disciplined
          </h2>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : !leaderboard?.length ? (
          <div className="text-center py-12 text-muted-foreground">No users yet. Be the first.</div>
        ) : (
          <div className="divide-y divide-border">
            {leaderboard.map((entry: any) => (
              <motion.div
                key={entry.user_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex items-center gap-4 p-4 ${entry.user_id === user.id ? 'bg-primary/5' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  entry.rank === 1 ? 'bg-primary text-primary-foreground' :
                  entry.rank === 2 ? 'bg-accent text-accent-foreground' :
                  entry.rank === 3 ? 'bg-secondary text-secondary-foreground' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {entry.rank <= 3 ? ['🥇','🥈','🥉'][entry.rank-1] : entry.rank}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">
                    {entry.display_name}
                    {entry.user_id === user.id && <span className="text-primary ml-1">(you)</span>}
                  </p>
                  <p className={`text-xs ${LEVEL_COLORS[entry.current_level] || 'text-muted-foreground'}`}>
                    {LEVEL_NAMES[entry.current_level] || 'Milk'}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-orange-400" /> {entry.days_consistent}d</span>
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-blue-400" /> {entry.lessons_completed}</span>
                  <span className="font-bold text-primary">{entry.xp} XP</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-xl font-display font-semibold text-foreground flex items-center gap-2 mb-4">
          <Medal className="text-primary" /> Achievements
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {(allBadges || []).map((badge: any) => {
            const earned = earnedIds.has(badge.id);
            return (
              <div key={badge.id}
                className={`bg-card border rounded-lg p-3 text-center space-y-2 transition-all ${
                  earned ? 'border-primary/40 bg-primary/5' : 'border-border opacity-50'
                }`}
              >
                <div className="text-2xl">{earned ? '🏆' : '🔒'}</div>
                <p className="text-xs font-semibold text-foreground">{badge.name}</p>
                <p className="text-[10px] text-muted-foreground">{badge.description}</p>
                <Badge variant={earned ? 'default' : 'secondary'} className="text-[10px]">
                  +{badge.xp_reward} XP
                </Badge>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
