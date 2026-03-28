import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useIsAdmin } from '@/hooks/useIsAdmin';
import { Link } from 'react-router-dom';
import {
  Shield, Trash2, Ban, LogIn, Loader2, Users, MessageSquare, Pin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function AdminPage() {
  const { user } = useAuth();
  const { isAdmin, loading: adminLoading } = useIsAdmin();
  const qc = useQueryClient();

  const { data: posts } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: async () => {
      const { data, error } = await supabase.from('community_posts').select('*').order('created_at', { ascending: false }).limit(50);
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const { data: users } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });

  const { data: banned } = useQuery({
    queryKey: ['banned-users'],
    queryFn: async () => {
      const { data, error } = await (supabase.from('banned_users' as any) as any).select('*');
      if (error) throw error;
      return data as any[];
    },
    enabled: isAdmin,
  });

  const bannedIds = new Set((banned || []).map((b: any) => b.user_id));

  const deletePost = async (id: string) => {
    await supabase.from('community_posts').delete().eq('id', id);
    qc.invalidateQueries({ queryKey: ['admin-posts'] });
    toast.success('Post deleted');
  };

  const togglePin = async (id: string, pinned: boolean) => {
    await supabase.from('community_posts').update({ pinned: !pinned }).eq('id', id);
    qc.invalidateQueries({ queryKey: ['admin-posts'] });
    toast.success(pinned ? 'Unpinned' : 'Pinned');
  };

  const banUser = async (userId: string) => {
    await (supabase.from('banned_users' as any) as any).insert({ user_id: userId, banned_by: user!.id, reason: 'Admin action' });
    qc.invalidateQueries({ queryKey: ['banned-users'] });
    toast.success('User banned');
  };

  const unbanUser = async (userId: string) => {
    await (supabase.from('banned_users' as any) as any).delete().eq('user_id', userId);
    qc.invalidateQueries({ queryKey: ['banned-users'] });
    toast.success('User unbanned');
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <Shield className="w-16 h-16 text-primary" />
        <h1 className="text-3xl font-display font-bold">Admin</h1>
        <Link to="/auth"><Button><LogIn className="mr-2 h-4 w-4" /> Sign In</Button></Link>
      </div>
    );
  }

  if (adminLoading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Shield className="w-16 h-16 text-destructive" />
        <h1 className="text-2xl font-display font-bold text-foreground">Access Denied</h1>
        <p className="text-muted-foreground">Admin only.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground flex items-center gap-3">
          <Shield className="text-primary" /> Admin Controls
        </h1>
        <p className="text-muted-foreground mt-1">Manage community, users, and content.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-primary">{posts?.length || 0}</p>
          <p className="text-xs text-muted-foreground">Posts</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-primary">{users?.length || 0}</p>
          <p className="text-xs text-muted-foreground">Users</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-destructive">{banned?.length || 0}</p>
          <p className="text-xs text-muted-foreground">Banned</p>
        </div>
      </div>

      <Tabs defaultValue="posts">
        <TabsList className="w-full bg-secondary">
          <TabsTrigger value="posts" className="flex-1"><MessageSquare className="w-3 h-3 mr-1" /> Posts</TabsTrigger>
          <TabsTrigger value="users" className="flex-1"><Users className="w-3 h-3 mr-1" /> Users</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-4 space-y-2">
          {(posts || []).map((post) => (
            <div key={post.id} className="bg-card border border-border rounded-lg p-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {post.pinned && <Pin className="w-3 h-3 text-primary" />}
                  <p className="text-sm font-medium text-foreground truncate">{post.title}</p>
                </div>
                <p className="text-xs text-muted-foreground">{post.channel} · {new Date(post.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => togglePin(post.id, post.pinned)}>
                  <Pin className={`w-3 h-3 ${post.pinned ? 'text-primary' : 'text-muted-foreground'}`} />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => deletePost(post.id)} className="text-destructive hover:text-destructive">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="users" className="mt-4 space-y-2">
          {(users || []).map((profile) => (
            <div key={profile.id} className="bg-card border border-border rounded-lg p-3 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{profile.display_name || 'Anonymous'}</p>
                <p className="text-xs text-muted-foreground">Joined {new Date(profile.created_at).toLocaleDateString()}</p>
              </div>
              {bannedIds.has(profile.user_id) ? (
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="text-xs">Banned</Badge>
                  <Button size="sm" variant="outline" onClick={() => unbanUser(profile.user_id)}>Unban</Button>
                </div>
              ) : profile.user_id !== user.id ? (
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => banUser(profile.user_id)}>
                  <Ban className="w-3 h-3 mr-1" /> Ban
                </Button>
              ) : (
                <Badge className="text-xs">You</Badge>
              )}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
