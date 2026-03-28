import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  MessageSquare, HelpCircle, Trophy, BookOpen, Shield,
  Heart, Send, ArrowLeft, Plus, Clock, User
} from 'lucide-react';

const CHANNELS = [
  { id: 'questions', label: 'Questions', icon: HelpCircle, desc: 'Structured questions only' },
  { id: 'testimonies', label: 'Testimonies', icon: Trophy, desc: 'Real growth stories' },
  { id: 'breakdowns', label: 'Breakdowns', icon: BookOpen, desc: 'Members teaching' },
  { id: 'accountability', label: 'Accountability', icon: Shield, desc: 'Who is applying?' },
];

interface Post {
  id: string;
  user_id: string;
  channel: string;
  title: string;
  content: string;
  post_type: string;
  likes: number;
  pinned: boolean;
  created_at: string;
}

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export default function CommunityPage() {
  const { user } = useAuth();
  const [activeChannel, setActiveChannel] = useState('questions');
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;
    fetchPosts();
    fetchLikes();

    const channel = supabase
      .channel('community')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'community_posts' }, () => fetchPosts())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'community_comments' }, () => {
        if (expandedPost) fetchComments(expandedPost);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user, activeChannel]);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('community_posts')
      .select('*')
      .eq('channel', activeChannel)
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(50);
    setPosts((data as Post[]) || []);
    setLoading(false);
  };

  const fetchLikes = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('post_likes')
      .select('post_id')
      .eq('user_id', user.id);
    if (data) setLikedPosts(new Set(data.map((l: any) => l.post_id)));
  };

  const fetchComments = async (postId: string) => {
    const { data } = await supabase
      .from('community_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    if (data) setComments(prev => ({ ...prev, [postId]: data as Comment[] }));
  };

  const createPost = async () => {
    if (!user || !newTitle.trim() || !newContent.trim()) return;
    const { error } = await supabase.from('community_posts').insert({
      user_id: user.id,
      channel: activeChannel,
      title: newTitle.trim(),
      content: newContent.trim(),
      post_type: 'discussion',
    });
    if (error) { toast.error('Failed to post'); return; }
    setNewTitle('');
    setNewContent('');
    setShowCompose(false);
    toast.success('Posted!');
    fetchPosts();
  };

  const toggleLike = async (postId: string) => {
    if (!user) return;
    if (likedPosts.has(postId)) {
      await supabase.from('post_likes').delete().eq('post_id', postId).eq('user_id', user.id);
      setLikedPosts(prev => { const n = new Set(prev); n.delete(postId); return n; });
    } else {
      await supabase.from('post_likes').insert({ post_id: postId, user_id: user.id });
      setLikedPosts(prev => new Set(prev).add(postId));
    }
    fetchPosts();
  };

  const addComment = async (postId: string) => {
    if (!user || !commentText[postId]?.trim()) return;
    await supabase.from('community_comments').insert({
      post_id: postId,
      user_id: user.id,
      content: commentText[postId].trim(),
    });
    setCommentText(prev => ({ ...prev, [postId]: '' }));
    fetchComments(postId);
  };

  const timeAgo = (d: string) => {
    const mins = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
    return `${Math.floor(mins / 1440)}d ago`;
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Shield size={48} className="text-primary" />
        <h2 className="text-xl font-display font-bold text-foreground">The Narrow Path</h2>
        <p className="text-muted-foreground text-center max-w-md">This community is for the set-apart. Sign in to enter.</p>
        <Link to="/auth"><Button>Sign In</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-3">
        <Link to="/"><Button variant="ghost" size="icon"><ArrowLeft size={18} /></Button></Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">The Narrow Path</h1>
          <p className="text-sm text-muted-foreground">Iron sharpens iron — controlled, disciplined, growth-focused</p>
        </div>
      </div>

      {/* Channels */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {CHANNELS.map((ch) => (
          <button
            key={ch.id}
            onClick={() => { setActiveChannel(ch.id); setShowCompose(false); }}
            className={`flex items-center gap-2 p-3 rounded-lg border text-left transition-all ${
              activeChannel === ch.id
                ? 'bg-primary/10 border-primary/30 text-primary'
                : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground'
            }`}
          >
            <ch.icon size={18} />
            <div>
              <p className="text-sm font-medium">{ch.label}</p>
              <p className="text-[10px] opacity-70">{ch.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Compose */}
      <div>
        {!showCompose ? (
          <Button onClick={() => setShowCompose(true)} variant="outline" className="w-full gap-2 border-dashed">
            <Plus size={16} /> Post in #{activeChannel}
          </Button>
        ) : (
          <Card className="border-primary/20">
            <CardContent className="p-4 space-y-3">
              <Input
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="font-medium"
              />
              <Textarea
                placeholder="Share your insight, question, or testimony..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
              />
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" size="sm" onClick={() => setShowCompose(false)}>Cancel</Button>
                <Button size="sm" onClick={createPost} className="gap-1"><Send size={14} /> Post</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Posts */}
      <div className="space-y-3">
        {loading && <p className="text-muted-foreground text-sm text-center py-8">Loading...</p>}
        {!loading && posts.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-12">No posts yet in #{activeChannel}. Be the first.</p>
        )}
        {posts.map((post) => (
          <Card key={post.id} className={post.pinned ? 'border-primary/30' : ''}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  {post.pinned && <span className="text-[10px] font-bold text-primary uppercase tracking-wider">📌 Pinned</span>}
                  <h3 className="font-display font-semibold text-foreground">{post.title}</h3>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap flex items-center gap-1">
                  <Clock size={10} /> {timeAgo(post.created_at)}
                </span>
              </div>
              <p className="text-sm text-foreground/80 whitespace-pre-wrap">{post.content}</p>
              <div className="flex items-center gap-4 pt-1">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1 text-xs transition-colors ${
                    likedPosts.has(post.id) ? 'text-red-400' : 'text-muted-foreground hover:text-red-400'
                  }`}
                >
                  <Heart size={14} fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
                  {post.likes > 0 && post.likes}
                </button>
                <button
                  onClick={() => {
                    if (expandedPost === post.id) { setExpandedPost(null); }
                    else { setExpandedPost(post.id); fetchComments(post.id); }
                  }}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <MessageSquare size={14} /> Reply
                </button>
              </div>

              {/* Comments */}
              {expandedPost === post.id && (
                <div className="border-t border-border pt-3 mt-2 space-y-3">
                  {(comments[post.id] || []).map((c) => (
                    <div key={c.id} className="flex gap-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User size={12} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground/80">{c.content}</p>
                        <span className="text-[10px] text-muted-foreground">{timeAgo(c.created_at)}</span>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Reply..."
                      value={commentText[post.id] || ''}
                      onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                      className="text-sm"
                      onKeyDown={(e) => e.key === 'Enter' && addComment(post.id)}
                    />
                    <Button size="icon" variant="ghost" onClick={() => addComment(post.id)}>
                      <Send size={14} />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
