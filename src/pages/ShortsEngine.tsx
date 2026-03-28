import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useBackgroundTasks } from "@/hooks/useBackgroundTasks";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  Video, Sparkles, Film, Mic, Download, Plus, Trash2, RefreshCw,
  ChevronUp, ChevronDown, Image as ImageIcon, Type, Clock, Zap, Play, ArrowLeft,
  Wand2, Settings, Volume2, FileVideo, Hash, Eye, Loader2, CheckCircle2,
  Square, Pause
} from "lucide-react";

const TOPIC_PRESETS = [
  { id: "yahweh-is-one", label: "Yahweh is One", verse: "Deuteronomy 6:4", mood: "firm" },
  { id: "repent", label: "Repent & Turn Back", verse: "Acts 3:19", mood: "urgent" },
  { id: "narrow-path", label: "The Narrow Path", verse: "Matthew 7:13-14", mood: "warning" },
  { id: "stop-world", label: "Stop Worshipping the World", verse: "1 John 2:15-17", mood: "confrontational" },
  { id: "false-teachers", label: "False Teachers Exposed", verse: "Matthew 7:15", mood: "urgent" },
  { id: "fear-yahweh", label: "Fear Yahweh, Not Man", verse: "Proverbs 9:10", mood: "bold" },
  { id: "torah-stands", label: "Torah Is Not Done Away With", verse: "Matthew 5:17-18", mood: "firm" },
  { id: "wages-sin", label: "The Wages of Sin", verse: "Romans 6:23", mood: "sobering" },
  { id: "babylon", label: "Babylon Mindset", verse: "Revelation 18:4", mood: "warning" },
  { id: "pride-lust", label: "Pride, Lust, Greed", verse: "1 John 2:16", mood: "confrontational" },
  { id: "judgment-real", label: "Judgment Is Real", verse: "Hebrews 9:27", mood: "sobering" },
  { id: "yahusha-obeyed", label: "Yahshua Obeyed the Father", verse: "John 14:31", mood: "teaching" },
];

const STYLE_PRESETS = [
  { id: "urban-prophetic", label: "Urban Prophetic", desc: "Modern city, raw truth" },
  { id: "dark-warfare", label: "Dark Spiritual Warfare", desc: "Intense, battle imagery" },
  { id: "cinematic-modern", label: "Cinematic Modern", desc: "Clean, premium visuals" },
  { id: "ancient-desert", label: "Ancient Desert", desc: "Biblical landscapes" },
  { id: "babylon-contrast", label: "Babylon Contrast", desc: "Luxury vs judgment" },
  { id: "fire-judgment", label: "Fire & Judgment", desc: "Warning, flames, urgency" },
  { id: "calm-truth", label: "Calm Truth", desc: "Peace, light, clarity" },
];

const TONE_PRESETS = ["urgent", "bold", "sobering", "confrontational", "teaching", "calm", "prophetic"];
const DURATION_OPTIONS = [15, 30, 40, 45];
const MOTION_TYPES = ["ken-burns", "zoom-in", "zoom-out", "pan-left", "pan-right", "parallax", "static"];

interface Scene {
  id?: string;
  scene_order: number;
  narration_text: string;
  caption_text: string;
  verse_reference?: string;
  image_prompt: string;
  generated_image_url?: string;
  motion_type: string;
  duration_ms: number;
  transition_type?: string;
}

interface ShortProject {
  id?: string;
  title: string;
  topic: string;
  verse_reference: string;
  verse_text?: string;
  duration: number;
  style: string;
  tone: string;
  voice_preset: string;
  cta: string;
  status: string;
  script?: string;
  youtube_title?: string;
  youtube_description?: string;
  hashtags?: string[];
  scenes: Scene[];
}

// Canvas video renderer - renders scenes with motion effects and captions
async function renderVideoToBlob(
  scenes: Scene[],
  onProgress: (pct: number, msg: string) => void
): Promise<Blob> {
  const WIDTH = 1080;
  const HEIGHT = 1920;
  const FPS = 30;

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d")!;

  // Load all scene images
  onProgress(5, "Loading scene images...");
  const images: (HTMLImageElement | null)[] = [];
  for (let i = 0; i < scenes.length; i++) {
    if (scenes[i].generated_image_url) {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // fallback to solid color
          img.src = scenes[i].generated_image_url!;
        });
        images.push(img);
      } catch {
        images.push(null);
      }
    } else {
      images.push(null);
    }
  }

  onProgress(15, "Setting up video encoder...");

  const stream = canvas.captureStream(FPS);
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm",
    videoBitsPerSecond: 8_000_000,
  });

  const chunks: Blob[] = [];
  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  const recordingDone = new Promise<Blob>((resolve) => {
    mediaRecorder.onstop = () => {
      resolve(new Blob(chunks, { type: "video/webm" }));
    };
  });

  mediaRecorder.start();

  // Render each scene frame by frame
  const totalFrames = scenes.reduce((sum, s) => sum + Math.round((s.duration_ms / 1000) * FPS), 0);
  let globalFrame = 0;

  for (let si = 0; si < scenes.length; si++) {
    const scene = scenes[si];
    const sceneFrames = Math.round((scene.duration_ms / 1000) * FPS);
    const img = images[si];

    for (let f = 0; f < sceneFrames; f++) {
      const progress = f / sceneFrames;

      // Background
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Draw image with motion effect
      if (img) {
        ctx.save();
        const motion = scene.motion_type || "ken-burns";
        let scale = 1;
        let offsetX = 0;
        let offsetY = 0;

        if (motion === "ken-burns") {
          scale = 1 + progress * 0.15;
          offsetX = -progress * 40;
          offsetY = -progress * 30;
        } else if (motion === "zoom-in") {
          scale = 1 + progress * 0.25;
        } else if (motion === "zoom-out") {
          scale = 1.25 - progress * 0.25;
        } else if (motion === "pan-left") {
          offsetX = -progress * 100;
        } else if (motion === "pan-right") {
          offsetX = progress * 100;
        }

        const imgAspect = img.width / img.height;
        const canvasAspect = WIDTH / HEIGHT;
        let drawW, drawH;
        if (imgAspect > canvasAspect) {
          drawH = HEIGHT * scale;
          drawW = drawH * imgAspect;
        } else {
          drawW = WIDTH * scale;
          drawH = drawW / imgAspect;
        }
        const dx = (WIDTH - drawW) / 2 + offsetX;
        const dy = (HEIGHT - drawH) / 2 + offsetY;

        // Fade in first 10 frames, fade out last 10
        const fadeIn = Math.min(f / 10, 1);
        const fadeOut = Math.min((sceneFrames - f) / 10, 1);
        ctx.globalAlpha = fadeIn * fadeOut;
        ctx.drawImage(img, dx, dy, drawW, drawH);
        ctx.globalAlpha = 1;
        ctx.restore();
      } else {
        // Gradient fallback
        const grad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
        grad.addColorStop(0, "#1a0a0a");
        grad.addColorStop(1, "#0a0a1a");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      }

      // Dark overlay for text readability
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Caption text - center of screen, bold
      if (scene.caption_text) {
        const captionY = HEIGHT * 0.45;
        ctx.save();
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = 20;
        ctx.font = "bold 64px sans-serif";

        // Word wrap
        const words = scene.caption_text.split(" ");
        const lines: string[] = [];
        let currentLine = "";
        for (const word of words) {
          const test = currentLine ? `${currentLine} ${word}` : word;
          if (ctx.measureText(test).width > WIDTH * 0.85) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = test;
          }
        }
        if (currentLine) lines.push(currentLine);

        const lineHeight = 80;
        const startY = captionY - ((lines.length - 1) * lineHeight) / 2;

        // Animate text in word by word
        const textProgress = Math.min(f / 15, 1);
        ctx.globalAlpha = textProgress;

        lines.forEach((line, li) => {
          ctx.fillText(line, WIDTH / 2, startY + li * lineHeight);
        });

        ctx.globalAlpha = 1;
        ctx.restore();
      }

      // Verse reference - bottom area
      if (scene.verse_reference) {
        ctx.save();
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.font = "italic 40px serif";
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 10;
        ctx.fillText(scene.verse_reference, WIDTH / 2, HEIGHT * 0.78);
        ctx.restore();
      }

      // Scene number indicator (small, top-left)
      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = "24px sans-serif";
      ctx.fillText(`${si + 1}/${scenes.length}`, 40, 60);
      ctx.restore();

      // Wait for next frame
      await new Promise((resolve) => setTimeout(resolve, 1000 / FPS));

      globalFrame++;
      const pct = 15 + (globalFrame / totalFrames) * 80;
      onProgress(pct, `Rendering scene ${si + 1}/${scenes.length}...`);
    }
  }

  onProgress(95, "Finalizing video...");
  mediaRecorder.stop();

  return recordingDone;
}

export default function ShortsEngine() {
  const { user } = useAuth();
  const { addTask, updateTask } = useBackgroundTasks();
  const [activeTab, setActiveTab] = useState("create");
  const [generating, setGenerating] = useState(false);
  const [project, setProject] = useState<ShortProject>({
    title: "",
    topic: "",
    verse_reference: "",
    verse_text: "",
    duration: 30,
    style: "urban-prophetic",
    tone: "urgent",
    voice_preset: "truth-narrator",
    cta: "Follow for truth",
    status: "draft",
    scenes: [],
  });
  const [savedProjects, setSavedProjects] = useState<any[]>([]);
  const [expandedScene, setExpandedScene] = useState<number | null>(null);
  const [generatingImage, setGeneratingImage] = useState<number | null>(null);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [batchGenerating, setBatchGenerating] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0, message: "" });
  const [rendering, setRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState({ pct: 0, message: "" });
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (user) loadProjects();
  }, [user]);

  const loadProjects = async () => {
    const { data } = await supabase
      .from("shorts_projects")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) setSavedProjects(data);
  };

  const generateSceneImage = async (sceneIndex: number) => {
    const scene = project.scenes[sceneIndex];
    if (!scene.image_prompt) { toast.error("Add an image prompt first"); return; }
    setGeneratingImage(sceneIndex);
    try {
      const { data, error } = await supabase.functions.invoke("shorts-media", {
        body: { action: "generate_image", prompt: scene.image_prompt },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (data?.image_url) {
        updateScene(sceneIndex, { generated_image_url: data.image_url });
        toast.success(`Scene ${sceneIndex + 1} image generated!`);
      } else {
        toast.info("Image generated but URL format may differ. Check console.");
        console.log("AIMLAPI response:", data);
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to generate image");
    } finally {
      setGeneratingImage(null);
    }
  };

  const previewVoice = async (sceneIndex: number) => {
    const scene = project.scenes[sceneIndex];
    if (!scene.narration_text) { toast.error("Add narration text first"); return; }
    setPlayingAudio(sceneIndex);
    try {
      const { data, error } = await supabase.functions.invoke("shorts-media", {
        body: { action: "generate_tts", text: scene.narration_text, voice: "alloy" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      if (data?.audio_base64) {
        const audio = new Audio(`data:audio/mpeg;base64,${data.audio_base64}`);
        audio.onended = () => setPlayingAudio(null);
        await audio.play();
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to generate voice");
      setPlayingAudio(null);
    }
  };

  const selectTopic = (preset: typeof TOPIC_PRESETS[0]) => {
    setProject(p => ({
      ...p,
      topic: preset.label,
      verse_reference: preset.verse,
      tone: preset.mood,
      title: preset.label,
    }));
  };

  const generateScript = async () => {
    if (!project.topic || !project.verse_reference) {
      toast.error("Select a topic and verse first");
      return;
    }
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("shorts-script", {
        body: {
          topic: project.topic,
          verse_reference: project.verse_reference,
          verse_text: project.verse_text,
          duration: project.duration,
          tone: project.tone,
          style: project.style,
          cta: project.cta,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const script = data.script;
      setProject(p => ({
        ...p,
        title: script.title || p.title,
        youtube_title: script.youtube_title,
        youtube_description: script.youtube_description,
        hashtags: script.hashtags,
        script: JSON.stringify(script),
        scenes: script.scenes.map((s: any) => ({
          scene_order: s.scene_order,
          narration_text: s.narration_text,
          caption_text: s.caption_text,
          verse_reference: s.verse_reference || "",
          image_prompt: s.image_prompt,
          motion_type: s.motion_type || "ken-burns",
          duration_ms: s.duration_ms || 5000,
          transition_type: "fade",
        })),
      }));
      setActiveTab("scenes");
      toast.success("Script generated! Review your scenes.");
    } catch (e: any) {
      toast.error(e.message || "Failed to generate script");
    } finally {
      setGenerating(false);
    }
  };

  const saveProject = async () => {
    if (!user) return;
    try {
      const projectData = {
        user_id: user.id,
        title: project.title || "Untitled Short",
        topic: project.topic,
        verse_reference: project.verse_reference,
        verse_text: project.verse_text,
        duration: project.duration,
        style: project.style,
        tone: project.tone,
        voice_preset: project.voice_preset,
        cta: project.cta,
        status: project.status,
        script: project.script,
        youtube_title: project.youtube_title,
        youtube_description: project.youtube_description,
        hashtags: project.hashtags,
      };

      let projectId = project.id;

      if (project.id) {
        await supabase.from("shorts_projects").update(projectData).eq("id", project.id);
      } else {
        const { data } = await supabase.from("shorts_projects").insert(projectData).select().single();
        if (data) {
          projectId = data.id;
          setProject(p => ({ ...p, id: data.id }));
        }
      }

      if (projectId && project.scenes.length > 0) {
        await supabase.from("shorts_scenes").delete().eq("project_id", projectId);
        await supabase.from("shorts_scenes").insert(
          project.scenes.map(s => ({ ...s, project_id: projectId }))
        );
      }

      toast.success("Project saved!");
      loadProjects();
    } catch (e: any) {
      toast.error("Failed to save project");
    }
  };

  const updateScene = (index: number, updates: Partial<Scene>) => {
    setProject(p => ({
      ...p,
      scenes: p.scenes.map((s, i) => i === index ? { ...s, ...updates } : s),
    }));
  };

  const moveScene = (index: number, direction: "up" | "down") => {
    const newScenes = [...project.scenes];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newScenes.length) return;
    [newScenes[index], newScenes[swapIndex]] = [newScenes[swapIndex], newScenes[index]];
    newScenes.forEach((s, i) => (s.scene_order = i + 1));
    setProject(p => ({ ...p, scenes: newScenes }));
  };

  const deleteScene = (index: number) => {
    setProject(p => ({
      ...p,
      scenes: p.scenes.filter((_, i) => i !== index).map((s, i) => ({ ...s, scene_order: i + 1 })),
    }));
  };

  // Batch generate all scene images
  const generateAllImages = async () => {
    const scenesNeedingImages = project.scenes.filter(s => s.image_prompt && !s.generated_image_url);
    if (scenesNeedingImages.length === 0) {
      toast.info("All scenes already have images or need prompts");
      return;
    }
    setBatchGenerating(true);
    setBatchProgress({ current: 0, total: project.scenes.length, message: "Starting..." });

    for (let i = 0; i < project.scenes.length; i++) {
      const scene = project.scenes[i];
      if (!scene.image_prompt || scene.generated_image_url) {
        setBatchProgress(p => ({ ...p, current: i + 1, message: `Scene ${i + 1} skipped` }));
        continue;
      }
      setBatchProgress({ current: i + 1, total: project.scenes.length, message: `Generating scene ${i + 1}...` });
      try {
        const { data, error } = await supabase.functions.invoke("shorts-media", {
          body: { action: "generate_image", prompt: scene.image_prompt },
        });
        if (error) throw error;
        if (data?.image_url) {
          updateScene(i, { generated_image_url: data.image_url });
        }
      } catch (e: any) {
        toast.error(`Scene ${i + 1} failed: ${e.message}`);
      }
    }
    setBatchGenerating(false);
    toast.success("All images generated!");
  };

  // Render and download video
  const renderAndDownload = async () => {
    if (project.scenes.length === 0) {
      toast.error("No scenes to render");
      return;
    }
    setRendering(true);
    setRenderProgress({ pct: 0, message: "Preparing..." });

    try {
      const blob = await renderVideoToBlob(project.scenes, (pct, msg) => {
        setRenderProgress({ pct, message: msg });
      });

      setRenderProgress({ pct: 100, message: "Download ready!" });

      // Trigger download
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${project.title || "truth-short"}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Video downloaded!");
    } catch (e: any) {
      toast.error(`Render failed: ${e.message}`);
    } finally {
      setRendering(false);
    }
  };

  const totalDurationMs = project.scenes.reduce((sum, s) => sum + s.duration_ms, 0);
  const scenesWithImages = project.scenes.filter(s => s.generated_image_url).length;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6">
        <Video className="w-16 h-16 text-primary" />
        <h1 className="text-2xl font-bold text-center">Truth Shorts Engine</h1>
        <p className="text-muted-foreground text-center max-w-md">
          Generate cinematic Bible truth shorts for YouTube. Sign in to start creating.
        </p>
        <Link to="/auth"><Button>Sign In</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-red-600 to-orange-500">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Truth Shorts Engine</h1>
            <p className="text-sm text-muted-foreground">Generate cinematic Bible truth videos</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={saveProject}>
            Save Project
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="create" className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Create
          </TabsTrigger>
          <TabsTrigger value="scenes" className="flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5" /> Scenes
            {project.scenes.length > 0 && (
              <Badge variant="secondary" className="ml-1 text-xs">{project.scenes.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-1.5">
            <Mic className="w-3.5 h-3.5" /> Voice
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Export
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-1.5">
            <FileVideo className="w-3.5 h-3.5" /> Projects
          </TabsTrigger>
        </TabsList>

        {/* CREATE TAB */}
        <TabsContent value="create" className="space-y-6 mt-4">
          {/* Topic Presets */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500" /> Topic
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {TOPIC_PRESETS.map(t => (
                  <Button
                    key={t.id}
                    variant={project.topic === t.label ? "default" : "outline"}
                    size="sm"
                    className="text-xs justify-start h-auto py-2"
                    onClick={() => selectTopic(t)}
                  >
                    <div className="text-left">
                      <div className="font-semibold">{t.label}</div>
                      <div className="text-[10px] opacity-70">{t.verse}</div>
                    </div>
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Custom Topic</label>
                  <Input
                    value={project.topic}
                    onChange={e => setProject(p => ({ ...p, topic: e.target.value }))}
                    placeholder="Your topic..."
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Verse Reference</label>
                  <Input
                    value={project.verse_reference}
                    onChange={e => setProject(p => ({ ...p, verse_reference: e.target.value }))}
                    placeholder="e.g. Matthew 7:13-14"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Verse Text (optional)</label>
                <Textarea
                  value={project.verse_text || ""}
                  onChange={e => setProject(p => ({ ...p, verse_text: e.target.value }))}
                  placeholder="Paste the verse text here..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4 space-y-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Duration
                </label>
                <div className="flex gap-2">
                  {DURATION_OPTIONS.map(d => (
                    <Button
                      key={d}
                      variant={project.duration === d ? "default" : "outline"}
                      size="sm"
                      onClick={() => setProject(p => ({ ...p, duration: d }))}
                    >
                      {d}s
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 space-y-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" /> Visual Style
                </label>
                <Select value={project.style} onValueChange={v => setProject(p => ({ ...p, style: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STYLE_PRESETS.map(s => (
                      <SelectItem key={s.id} value={s.id}>
                        <div>
                          <span className="font-medium">{s.label}</span>
                          <span className="text-xs text-muted-foreground ml-2">{s.desc}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 space-y-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Volume2 className="w-3 h-3" /> Tone
                </label>
                <Select value={project.tone} onValueChange={v => setProject(p => ({ ...p, tone: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {TONE_PRESETS.map(t => (
                      <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4 space-y-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Type className="w-3 h-3" /> CTA
                </label>
                <Input
                  value={project.cta}
                  onChange={e => setProject(p => ({ ...p, cta: e.target.value }))}
                  placeholder="Call to action..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Generate Button */}
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
              onClick={generateScript}
              disabled={generating}
            >
              {generating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Generating Script...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Generate Short Script
                </>
              )}
            </Button>
          </motion.div>
        </TabsContent>

        {/* SCENES TAB */}
        <TabsContent value="scenes" className="space-y-4 mt-4">
          {project.scenes.length === 0 ? (
            <Card className="p-8 text-center">
              <Film className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No scenes yet. Generate a script first.</p>
              <Button variant="outline" className="mt-3" onClick={() => setActiveTab("create")}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Go to Create
              </Button>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{project.scenes.length} scenes</Badge>
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />
                    {(totalDurationMs / 1000).toFixed(1)}s total
                  </Badge>
                  <Badge variant={scenesWithImages === project.scenes.length ? "default" : "secondary"}>
                    {scenesWithImages}/{project.scenes.length} images
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateAllImages}
                    disabled={batchGenerating}
                  >
                    {batchGenerating ? (
                      <><Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> {batchProgress.message}</>
                    ) : (
                      <><Wand2 className="w-3.5 h-3.5 mr-1" /> Generate All Images</>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                  setProject(p => ({
                    ...p,
                    scenes: [...p.scenes, {
                      scene_order: p.scenes.length + 1,
                      narration_text: "",
                      caption_text: "",
                      image_prompt: "",
                      motion_type: "ken-burns",
                      duration_ms: 5000,
                      transition_type: "fade",
                    }],
                  }));
                }}>
                  <Plus className="w-4 h-4 mr-1" /> Add Scene
                </Button>
                </div>
              </div>

              {batchGenerating && (
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{batchProgress.message}</span>
                    <span className="text-xs text-muted-foreground">{batchProgress.current}/{batchProgress.total}</span>
                  </div>
                  <Progress value={(batchProgress.current / batchProgress.total) * 100} className="h-2" />
                </div>
              )}

              <div className="space-y-3">
                <AnimatePresence>
                  {project.scenes.map((scene, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card className="overflow-hidden">
                        {/* Scene Header */}
                        <div
                          className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => setExpandedScene(expandedScene === i ? null : i)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">
                              {scene.scene_order}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate max-w-[300px]">{scene.caption_text || "Untitled scene"}</p>
                              <p className="text-xs text-muted-foreground">{(scene.duration_ms / 1000).toFixed(1)}s · {scene.motion_type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => { e.stopPropagation(); moveScene(i, "up"); }}>
                              <ChevronUp className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => { e.stopPropagation(); moveScene(i, "down"); }}>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={e => { e.stopPropagation(); deleteScene(i); }}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>

                        {/* Expanded Scene Editor */}
                        {expandedScene === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t"
                          >
                            <CardContent className="pt-4 space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground">Narration</label>
                                  <Textarea
                                    value={scene.narration_text}
                                    onChange={e => updateScene(i, { narration_text: e.target.value })}
                                    rows={3}
                                    placeholder="What the narrator says..."
                                  />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground">On-Screen Caption</label>
                                  <Textarea
                                    value={scene.caption_text}
                                    onChange={e => updateScene(i, { caption_text: e.target.value })}
                                    rows={3}
                                    placeholder="Short punchy text..."
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground">Verse Reference</label>
                                  <Input
                                    value={scene.verse_reference || ""}
                                    onChange={e => updateScene(i, { verse_reference: e.target.value })}
                                    placeholder="e.g. John 3:16"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground">Motion Type</label>
                                  <Select value={scene.motion_type} onValueChange={v => updateScene(i, { motion_type: v })}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      {MOTION_TYPES.map(m => (
                                        <SelectItem key={m} value={m}>{m}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-xs font-medium text-muted-foreground">Duration ({(scene.duration_ms / 1000).toFixed(1)}s)</label>
                                  <Slider
                                    value={[scene.duration_ms]}
                                    onValueChange={([v]) => updateScene(i, { duration_ms: v })}
                                    min={1000}
                                    max={15000}
                                    step={500}
                                    className="mt-2"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="text-xs font-medium text-muted-foreground">Image Prompt</label>
                                <Textarea
                                  value={scene.image_prompt}
                                  onChange={e => updateScene(i, { image_prompt: e.target.value })}
                                  rows={3}
                                  placeholder="Cinematic image description..."
                                />
                              </div>

                              {scene.generated_image_url && (
                                <div className="rounded-lg overflow-hidden border aspect-[9/16] max-w-[200px]">
                                  <img src={scene.generated_image_url} alt={`Scene ${scene.scene_order}`} className="w-full h-full object-cover" />
                                </div>
                              )}

                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => generateSceneImage(i)}
                                  disabled={generatingImage === i}
                                >
                                  {generatingImage === i ? (
                                    <><RefreshCw className="w-3.5 h-3.5 mr-1 animate-spin" /> Generating...</>
                                  ) : (
                                    <><ImageIcon className="w-3.5 h-3.5 mr-1" /> Generate Image</>
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => previewVoice(i)}
                                  disabled={playingAudio === i}
                                >
                                  {playingAudio === i ? (
                                    <><Volume2 className="w-3.5 h-3.5 mr-1 animate-pulse" /> Playing...</>
                                  ) : (
                                    <><Play className="w-3.5 h-3.5 mr-1" /> Preview Voice</>
                                  )}
                                </Button>
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}
        </TabsContent>

        {/* VOICE TAB */}
        <TabsContent value="voice" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Mic className="w-4 h-4" /> Voice Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Narrator Voice</label>
                  <Select value={project.voice_preset} onValueChange={v => setProject(p => ({ ...p, voice_preset: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="truth-narrator">Truth Narrator (Bold, Commanding)</SelectItem>
                      <SelectItem value="warning-voice">Warning Voice (Urgent, Intense)</SelectItem>
                      <SelectItem value="scripture-reader">Scripture Reader (Calm, Clear)</SelectItem>
                      <SelectItem value="gentle-truth">Gentle Truth (Warm, Steady)</SelectItem>
                      <SelectItem value="cinematic-intro">Cinematic Intro (Deep, Epic)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">TTS Provider</label>
                  <Select defaultValue="aimlapi">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aimlapi">AIMLAPI TTS</SelectItem>
                      <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-dashed">
                <p className="text-sm text-muted-foreground text-center">
                  🎙️ Voice generation will be powered by AIMLAPI or ElevenLabs.
                  <br />Configure your API key in settings to enable narration.
                </p>
              </div>

              {project.scenes.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Narration Preview</h3>
                  {project.scenes.map((scene, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/30">
                      <Badge variant="outline" className="mt-0.5 shrink-0">{i + 1}</Badge>
                      <p className="text-sm">{scene.narration_text}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* EXPORT TAB */}
        <TabsContent value="export" className="space-y-4 mt-4">
          {/* Render & Download */}
          <Card className="border-primary/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileVideo className="w-5 h-5 text-primary" /> Render & Download Video
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="p-3 text-center bg-muted/30">
                  <p className="text-2xl font-bold">{project.scenes.length}</p>
                  <p className="text-xs text-muted-foreground">Scenes</p>
                </Card>
                <Card className="p-3 text-center bg-muted/30">
                  <p className="text-2xl font-bold">{(totalDurationMs / 1000).toFixed(0)}s</p>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </Card>
                <Card className="p-3 text-center bg-muted/30">
                  <p className="text-2xl font-bold">{scenesWithImages}/{project.scenes.length}</p>
                  <p className="text-xs text-muted-foreground">Images Ready</p>
                </Card>
                <Card className="p-3 text-center bg-muted/30">
                  <p className="text-2xl font-bold">9:16</p>
                  <p className="text-xs text-muted-foreground">1080×1920</p>
                </Card>
              </div>

              {scenesWithImages < project.scenes.length && project.scenes.length > 0 && (
                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center gap-3">
                  <Loader2 className="w-5 h-5 text-orange-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Missing scene images</p>
                    <p className="text-xs text-muted-foreground">
                      {project.scenes.length - scenesWithImages} scene(s) need images. Go to Scenes tab and click "Generate All Images" first.
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setActiveTab("scenes")} className="shrink-0 ml-auto">
                    Go to Scenes
                  </Button>
                </div>
              )}

              {rendering && (
                <div className="p-4 rounded-lg border bg-muted/20 space-y-3">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{renderProgress.message}</p>
                      <p className="text-xs text-muted-foreground">{Math.round(renderProgress.pct)}% complete</p>
                    </div>
                  </div>
                  <Progress value={renderProgress.pct} className="h-3" />
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  className="flex-1 h-14 text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  onClick={renderAndDownload}
                  disabled={rendering || project.scenes.length === 0}
                >
                  {rendering ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Rendering Video...</>
                  ) : (
                    <><Download className="w-5 h-5 mr-2" /> Render & Download Video</>
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Renders as WebM video with motion effects and burned-in captions. Ready for YouTube Shorts upload.
              </p>
            </CardContent>
          </Card>

          {/* YouTube Metadata */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Hash className="w-4 h-4" /> YouTube Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">YouTube Title</label>
                  <Input
                    value={project.youtube_title || ""}
                    onChange={e => setProject(p => ({ ...p, youtube_title: e.target.value }))}
                    placeholder="Title for YouTube..."
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Hashtags</label>
                  <Input
                    value={(project.hashtags || []).join(" ")}
                    onChange={e => setProject(p => ({ ...p, hashtags: e.target.value.split(" ").filter(Boolean) }))}
                    placeholder="#bible #truth #shorts"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">YouTube Description</label>
                <Textarea
                  value={project.youtube_description || ""}
                  onChange={e => setProject(p => ({ ...p, youtube_description: e.target.value }))}
                  rows={4}
                  placeholder="Video description..."
                />
              </div>

              {(project.youtube_title || project.youtube_description) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const text = `${project.youtube_title || ""}\n\n${project.youtube_description || ""}\n\n${(project.hashtags || []).join(" ")}`;
                    navigator.clipboard.writeText(text);
                    toast.success("Copied to clipboard!");
                  }}
                >
                  📋 Copy Title + Description + Hashtags
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* PROJECTS TAB */}
        <TabsContent value="projects" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Saved Projects</h2>
            <Button size="sm" onClick={() => {
              setProject({
                title: "", topic: "", verse_reference: "", verse_text: "",
                duration: 30, style: "urban-prophetic", tone: "urgent",
                voice_preset: "truth-narrator", cta: "Follow for truth",
                status: "draft", scenes: [],
              });
              setActiveTab("create");
            }}>
              <Plus className="w-4 h-4 mr-1" /> New Project
            </Button>
          </div>

          {savedProjects.length === 0 ? (
            <Card className="p-8 text-center">
              <FileVideo className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No projects yet. Create your first short!</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {savedProjects.map(p => (
                <Card key={p.id} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={async () => {
                  const { data: scenes } = await supabase
                    .from("shorts_scenes")
                    .select("*")
                    .eq("project_id", p.id)
                    .order("scene_order");
                  setProject({ ...p, scenes: scenes || [] });
                  setActiveTab("scenes");
                }}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{p.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{p.topic} · {p.duration}s · {p.style}</p>
                        <p className="text-xs text-muted-foreground">{p.verse_reference}</p>
                      </div>
                      <Badge variant={p.status === "draft" ? "secondary" : "default"} className="text-xs">
                        {p.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
