import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart, Plus, LogIn, Loader2, CheckCircle2, Users, HandHeart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function ChurchPage() {
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin();
  const qc = useQueryClient();
  const [newPrayer, setNewPrayer] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');

  // Prayer requests
  const { data: prayers, isLoading: prayersLoading } = useQuery({
    queryKey: ['prayers'],
    queryFn: async () => {
      const { data, error } = await (supabase.from('prayer_requests' as any) as any)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(30);
      if (error) throw error;

      // Get profiles
      const userIds = [...new Set((data || []).map((p: any) => p.user_id))];
      const { data: profiles } = await supabase.from('profiles').select('user_id, display_name').in('user_id', userIds as string[]);
      const profileMap = (profiles || []).reduce((acc: any, p: any) => { acc[p.user_id] = p.display_name; return acc; }, {});

      return (data || []).map((p: any) => ({ ...p, display_name: profileMap[p.user_id] || 'Anonymous' }));
    },
    enabled: !!user,
  });

  // Check which prayers current user supports
  const { data: mySupport } = useQuery({
    queryKey: ['my-prayer-support'],
    queryFn: async () => {
      const { data, error } = await (supabase.from('prayer_support' as any) as any)
        .select('prayer_id')
        .eq('user_id', user!.id);
      if (error) throw error;
      return new Set((data || []).map((s: any) => s.prayer_id));
    },
    enabled: !!user,
  });

  // Accountability groups
  const { data: groups, isLoading: groupsLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data, error } = await (supabase.from('accountability_groups' as any) as any)
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;

      // Get member counts
      const groupIds = (data || []).map((g: any) => g.id);
      const { data: members } = await (supabase.from('group_members' as any) as any)
        .select('group_id, user_id')
        .in('group_id', groupIds);

      const memberCounts: Record<string, number> = {};
      const memberSets: Record<string, Set<string>> = {};
      (members || []).forEach((m: any) => {
        memberCounts[m.group_id] = (memberCounts[m.group_id] || 0) + 1;
        if (!memberSets[m.group_id]) memberSets[m.group_id] = new Set();
        memberSets[m.group_id].add(m.user_id);
      });

      return (data || []).map((g: any) => ({
        ...g,
        member_count: memberCounts[g.id] || 0,
        is_member: memberSets[g.id]?.has(user!.id) || false,
      }));
    },
    enabled: !!user,
  });

  const submitPrayer = useMutation({
    mutationFn: async () => {
      const { error } = await (supabase.from('prayer_requests' as any) as any).insert({
        user_id: user!.id,
        request_text: newPrayer,
      });
      if (error) throw error;
    },
    onSuccess: () => { setNewPrayer(''); qc.invalidateQueries({ queryKey: ['prayers'] }); toast.success('Prayer submitted'); },
    onError: (e: any) => toast.error(e.message),
  });

  const togglePraying = async (prayerId: string) => {
    if (mySupport?.has(prayerId)) {
      await (supabase.from('prayer_support' as any) as any).delete().eq('prayer_id', prayerId).eq('user_id', user!.id);
    } else {
      await (supabase.from('prayer_support' as any) as any).insert({ prayer_id: prayerId, user_id: user!.id });
    }
    qc.invalidateQueries({ queryKey: ['my-prayer-support'] });
    qc.invalidateQueries({ queryKey: ['prayers'] });
  };

  const createGroup = useMutation({
    mutationFn: async () => {
      const { data, error } = await (supabase.from('accountability_groups' as any) as any)
        .insert({ name: newGroupName, description: newGroupDesc, created_by: user!.id })
        .select()
        .single();
      if (error) throw error;
      // Auto-join
      await (supabase.from('group_members' as any) as any).insert({ group_id: data.id, user_id: user!.id });
    },
    onSuccess: () => {
      setNewGroupName(''); setNewGroupDesc('');
      qc.invalidateQueries({ queryKey: ['groups'] });
      toast.success('Group created');
    },
    onError: (e: any) => toast.error(e.message),
  });

  const toggleGroup = async (groupId: string, isMember: boolean) => {
    if (isMember) {
      await (supabase.from('group_members' as any) as any).delete().eq('group_id', groupId).eq('user_id', user!.id);
    } else {
      await (supabase.from('group_members' as any) as any).insert({ group_id: groupId, user_id: user!.id });
    }
    qc.invalidateQueries({ queryKey: ['groups'] });
    toast.success(isMember ? 'Left group' : 'Joined group');
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <Heart className="w-16 h-16 text-primary" />
        <h1 className="text-3xl font-display font-bold text-foreground">Church Mode</h1>
        <Link to="/auth"><Button><LogIn className="mr-2 h-4 w-4" /> Sign In</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
          <HandHeart className="text-primary" /> Church Mode
        </h1>
        <p className="text-muted-foreground mt-1">Prayer, accountability, brotherhood.</p>
      </div>

      <Tabs defaultValue="prayer" className="w-full">
        <TabsList className="w-full bg-secondary">
          <TabsTrigger value="prayer" className="flex-1">🙏 Prayer Wall</TabsTrigger>
          <TabsTrigger value="groups" className="flex-1">⚔️ Accountability</TabsTrigger>
        </TabsList>

        {/* PRAYER */}
        <TabsContent value="prayer" className="mt-4 space-y-4">
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <Textarea
              placeholder="What do you need prayer for?"
              value={newPrayer}
              onChange={(e) => setNewPrayer(e.target.value)}
              className="bg-secondary border-border"
            />
            <Button onClick={() => submitPrayer.mutate()} disabled={!newPrayer.trim() || submitPrayer.isPending} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Submit Prayer Request
            </Button>
          </div>

          {prayersLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : (
            <div className="space-y-3">
              {(prayers || []).map((prayer: any) => (
                <motion.div key={prayer.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`bg-card border rounded-lg p-4 ${prayer.is_answered ? 'border-green-500/30' : 'border-border'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-1">{prayer.display_name}</p>
                      <p className="text-sm text-foreground">{prayer.request_text}</p>
                      {prayer.is_answered && (
                        <Badge className="mt-2 bg-green-500/20 text-green-400 text-xs"><CheckCircle2 className="w-3 h-3 mr-1" /> Answered</Badge>
                      )}
                    </div>
                    <button
                      onClick={() => togglePraying(prayer.id)}
                      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                        mySupport?.has(prayer.id) ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${mySupport?.has(prayer.id) ? 'fill-current' : ''}`} />
                      <span className="text-[10px]">Praying</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* GROUPS */}
        <TabsContent value="groups" className="mt-4 space-y-4">
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <Input placeholder="Group name (e.g. Iron Sharpens Iron)" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} className="bg-secondary border-border" />
            <Input placeholder="Description (optional)" value={newGroupDesc} onChange={(e) => setNewGroupDesc(e.target.value)} className="bg-secondary border-border" />
            <Button onClick={() => createGroup.mutate()} disabled={!newGroupName.trim() || createGroup.isPending} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Create Accountability Group
            </Button>
          </div>

          {groupsLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {(groups || []).map((group: any) => (
                <motion.div key={group.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-card border border-border rounded-lg p-4 space-y-3"
                >
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{group.name}</h3>
                    {group.description && <p className="text-xs text-muted-foreground mt-1">{group.description}</p>}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" /> {group.member_count}/{group.max_members}
                    </span>
                    <Button
                      size="sm"
                      variant={group.is_member ? 'secondary' : 'default'}
                      onClick={() => toggleGroup(group.id, group.is_member)}
                      disabled={!group.is_member && group.member_count >= group.max_members}
                    >
                      {group.is_member ? 'Leave' : group.member_count >= group.max_members ? 'Full' : 'Join'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
