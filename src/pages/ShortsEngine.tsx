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
  Square, Pause, Music
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

const BEAT_PRESETS = [
  { id: "hood-trap", label: "🔥 Hood Trap", prompt: "dark trap beat, heavy 808 bass, hi-hats, aggressive snare, cinematic tension, hood energy, no vocals, instrumental only" },
  { id: "drill", label: "⚡ Drill", prompt: "UK drill beat, sliding 808s, dark piano melody, aggressive percussion, menacing energy, no vocals, instrumental only" },
  { id: "boom-bap", label: "💥 Boom Bap", prompt: "boom bap hip hop beat, hard drums, chopped soul sample, gritty underground, no vocals, instrumental only" },
  { id: "cinematic-hard", label: "🎬 Cinematic Hard", prompt: "epic cinematic trap beat, orchestral strings, heavy 808 bass, war drums, intense dark atmosphere, no vocals" },
  { id: "dark-ambient", label: "🌑 Dark Ambient", prompt: "dark ambient atmospheric beat, deep bass, eerie pads, minimal percussion, suspenseful mood, no vocals" },
  { id: "prophetic-fire", label: "🔥 Prophetic Fire", prompt: "aggressive spiritual warfare beat, tribal drums, distorted 808s, intense chanting atmosphere, battle energy, no vocals" },
  { id: "street-gospel", label: "⛪ Street Gospel", prompt: "hard gospel trap beat, choir samples, heavy 808 bass, church organ, aggressive drums, street energy, no vocals" },
  { id: "custom", label: "🎤 Custom Beat", prompt: "" },
];

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
  audio_base64?: string;
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

// Canvas video renderer with Hormozi-style captions and audio
async function renderVideoToBlob(
  scenes: Scene[],
  onProgress: (pct: number, msg: string) => void,
  musicUrl?: string | null,
): Promise<{ blob: Blob; mimeType: string; extension: "mp4" | "webm" }> {
  const WIDTH = 1080;
  const HEIGHT = 1920;
  const FPS = 30;

  const recorderFormats = [
    { mimeType: "video/mp4;codecs=h264,aac", extension: "mp4" as const },
    { mimeType: "video/mp4", extension: "mp4" as const },
    { mimeType: "video/webm;codecs=vp9,opus", extension: "webm" as const },
    { mimeType: "video/webm;codecs=vp8,opus", extension: "webm" as const },
    { mimeType: "video/webm", extension: "webm" as const },
  ];

  const recorderFormat = recorderFormats.find(({ mimeType }) => MediaRecorder.isTypeSupported(mimeType));
  if (!recorderFormat) {
    throw new Error("This browser can't export video on this device yet.");
  }

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
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
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

  // Prepare audio context for mixing narration + music
  onProgress(10, "Preparing audio...");
  const audioCtx = new AudioContext({ sampleRate: 44100 });
  const totalDurationSec = scenes.reduce((s, sc) => s + sc.duration_ms / 1000, 0);

  // Load narration audio per scene
  const narrationBuffers: (AudioBuffer | null)[] = [];
  for (const scene of scenes) {
    if (scene.audio_base64) {
      try {
        const binary = atob(scene.audio_base64);
        const bytes = new Uint8Array(binary.length);
        for (let j = 0; j < binary.length; j++) bytes[j] = binary.charCodeAt(j);
        const decoded = await audioCtx.decodeAudioData(bytes.buffer.slice(0));
        narrationBuffers.push(decoded);
      } catch {
        narrationBuffers.push(null);
      }
    } else {
      narrationBuffers.push(null);
    }
  }

  // Load background music
  let musicBuffer: AudioBuffer | null = null;
  if (musicUrl) {
    try {
      const resp = await fetch(musicUrl);
      const arrBuf = await resp.arrayBuffer();
      musicBuffer = await audioCtx.decodeAudioData(arrBuf.slice(0));
    } catch (e) {
      console.warn("Failed to load music:", e);
    }
  }

  // Mix all audio into a single offline buffer
  const offlineCtx = new OfflineAudioContext(2, Math.ceil(totalDurationSec * 44100), 44100);

  if (musicBuffer) {
    const musicSrc = offlineCtx.createBufferSource();
    musicSrc.buffer = musicBuffer;
    musicSrc.loop = true;
    const gainNode = offlineCtx.createGain();
    gainNode.gain.value = 0.22;
    musicSrc.connect(gainNode);
    gainNode.connect(offlineCtx.destination);
    musicSrc.start(0);
  }

  let timeOffset = 0;
  for (let i = 0; i < scenes.length; i++) {
    if (narrationBuffers[i]) {
      const src = offlineCtx.createBufferSource();
      src.buffer = narrationBuffers[i]!;
      const gain = offlineCtx.createGain();
      gain.gain.value = 1.15;
      src.connect(gain);
      gain.connect(offlineCtx.destination);
      src.start(timeOffset + 0.2);
    }
    timeOffset += scenes[i].duration_ms / 1000;
  }

  onProgress(12, "Mixing audio...");
  const mixedBuffer = await offlineCtx.startRendering();

  onProgress(15, "Setting up video encoder...");

  const liveAudioCtx = new AudioContext({ sampleRate: 44100 });
  if (liveAudioCtx.state === "suspended") {
    await liveAudioCtx.resume();
  }

  const audioDestination = liveAudioCtx.createMediaStreamDestination();
  const liveGain = liveAudioCtx.createGain();
  liveGain.gain.value = 1;

  const liveSource = liveAudioCtx.createBufferSource();
  liveSource.buffer = mixedBuffer;
  liveSource.connect(liveGain);
  liveGain.connect(audioDestination);
  liveGain.connect(liveAudioCtx.destination);

  const videoStream = canvas.captureStream(FPS);
  const audioTracks = audioDestination.stream.getAudioTracks();
  const combinedStream = new MediaStream([...videoStream.getVideoTracks(), ...audioTracks]);

  const mediaRecorder = new MediaRecorder(combinedStream, {
    mimeType: recorderFormat.mimeType,
    videoBitsPerSecond: 8_000_000,
    audioBitsPerSecond: 192_000,
  });

  const chunks: Blob[] = [];
  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  const recordingDone = new Promise<{ blob: Blob; mimeType: string; extension: "mp4" | "webm" }>((resolve, reject) => {
    mediaRecorder.onerror = () => reject(new Error("Video recording failed."));
    mediaRecorder.onstop = () => {
      resolve({
        blob: new Blob(chunks, { type: recorderFormat.mimeType }),
        mimeType: recorderFormat.mimeType,
        extension: recorderFormat.extension,
      });
    };
  });

  mediaRecorder.start(250);
  liveSource.start(liveAudioCtx.currentTime + 0.05);

  const totalFrames = scenes.reduce((sum, s) => sum + Math.round((s.duration_ms / 1000) * FPS), 0);
  let globalFrame = 0;

  for (let si = 0; si < scenes.length; si++) {
    const scene = scenes[si];
    const sceneFrames = Math.round((scene.duration_ms / 1000) * FPS);
    const img = images[si];

    const words = (scene.caption_text || "").split(/\s+/).filter(Boolean);
    const wordsPerFrame = words.length > 0 ? sceneFrames / words.length : 1;

    for (let f = 0; f < sceneFrames; f++) {
      const progress = f / sceneFrames;

      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      if (img) {
        ctx.save();
        const motion = scene.motion_type || "ken-burns";
        let scale = 1, offsetX = 0, offsetY = 0;

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
        let drawW: number, drawH: number;
        if (imgAspect > canvasAspect) {
          drawH = HEIGHT * scale;
          drawW = drawH * imgAspect;
        } else {
          drawW = WIDTH * scale;
          drawH = drawW / imgAspect;
        }

        const fadeIn = Math.min(f / 10, 1);
        const fadeOut = Math.min((sceneFrames - f) / 10, 1);
        ctx.globalAlpha = fadeIn * fadeOut;
        ctx.drawImage(img, (WIDTH - drawW) / 2 + offsetX, (HEIGHT - drawH) / 2 + offsetY, drawW, drawH);
        ctx.globalAlpha = 1;
        ctx.restore();
      } else {
        const grad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
        grad.addColorStop(0, "#1a0a0a");
        grad.addColorStop(1, "#0a0a1a");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      }

      const overlayGrad = ctx.createLinearGradient(0, HEIGHT * 0.55, 0, HEIGHT);
      overlayGrad.addColorStop(0, "rgba(0,0,0,0)");
      overlayGrad.addColorStop(0.3, "rgba(0,0,0,0.6)");
      overlayGrad.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = overlayGrad;
      ctx.fillRect(0, HEIGHT * 0.55, WIDTH, HEIGHT * 0.45);

      if (words.length > 0) {
        const activeWordIndex = Math.min(Math.floor(f / wordsPerFrame), words.length - 1);
        const captionY = HEIGHT * 0.72;
        const fontSize = 88;
        const lineHeight = 110;

        ctx.font = `900 ${fontSize}px "Arial Black", "Impact", sans-serif`;
        const captionLines: { word: string; wordIdx: number }[][] = [];
        let currentLine: { word: string; wordIdx: number }[] = [];
        let currentWidth = 0;
        const maxWidth = WIDTH * 0.88;

        words.forEach((word, wi) => {
          const wordWidth = ctx.measureText(word + " ").width;
          if (currentWidth + wordWidth > maxWidth && currentLine.length > 0) {
            captionLines.push(currentLine);
            currentLine = [];
            currentWidth = 0;
          }
          currentLine.push({ word, wordIdx: wi });
          currentWidth += wordWidth;
        });
        if (currentLine.length > 0) captionLines.push(currentLine);

        let activeLineIdx = 0;
        for (let li = 0; li < captionLines.length; li++) {
          if (captionLines[li].some((w) => w.wordIdx === activeWordIndex)) {
            activeLineIdx = li;
            break;
          }
        }
        const startLine = Math.max(0, activeLineIdx - 1);
        const endLine = Math.min(captionLines.length, startLine + 3);
        const visibleLines = captionLines.slice(startLine, endLine);

        const totalHeight = visibleLines.length * lineHeight;
        const startYPos = captionY - totalHeight / 2;

        visibleLines.forEach((line, li) => {
          const lineText = line.map((w) => w.word).join(" ");
          const fullWidth = ctx.measureText(lineText).width;
          let drawX = WIDTH / 2 - fullWidth / 2;

          line.forEach(({ word, wordIdx }) => {
            const wWidth = ctx.measureText(word).width;
            const isActive = wordIdx === activeWordIndex;
            const isPast = wordIdx < activeWordIndex;

            ctx.save();
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";

            if (isActive) {
              const pad = 12;
              const boxScale = 1.05 + Math.sin(f * 0.3) * 0.02;
              ctx.save();
              const wordCenterX = drawX + wWidth / 2;
              const wordCenterY = startYPos + li * lineHeight;
              ctx.translate(wordCenterX, wordCenterY);
              ctx.scale(boxScale, boxScale);
              ctx.translate(-wordCenterX, -wordCenterY);

              ctx.fillStyle = "#FFD700";
              const radius = 10;
              const bx = drawX - pad;
              const by = startYPos + li * lineHeight - fontSize / 2 - pad / 2;
              const bw = wWidth + pad * 2;
              const bh = fontSize + pad;
              ctx.beginPath();
              ctx.moveTo(bx + radius, by);
              ctx.lineTo(bx + bw - radius, by);
              ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + radius);
              ctx.lineTo(bx + bw, by + bh - radius);
              ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - radius, by + bh);
              ctx.lineTo(bx + radius, by + bh);
              ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - radius);
              ctx.lineTo(bx, by + radius);
              ctx.quadraticCurveTo(bx, by, bx + radius, by);
              ctx.closePath();
              ctx.fill();

              ctx.fillStyle = "#000000";
              ctx.font = `900 ${fontSize}px "Arial Black", "Impact", sans-serif`;
              ctx.fillText(word, drawX, startYPos + li * lineHeight);
              ctx.restore();
            } else {
              ctx.shadowColor = "rgba(0,0,0,0.9)";
              ctx.shadowBlur = 15;
              ctx.shadowOffsetY = 4;
              ctx.fillStyle = isPast ? "rgba(255,255,255,0.6)" : "#ffffff";
              ctx.font = `900 ${fontSize}px "Arial Black", "Impact", sans-serif`;
              ctx.fillText(word, drawX, startYPos + li * lineHeight);
            }

            ctx.restore();
            drawX += wWidth + ctx.measureText(" ").width;
          });
        });
      }

      if (scene.verse_reference) {
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.font = "italic 36px Georgia, serif";
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 8;
        ctx.fillText(scene.verse_reference, WIDTH / 2, HEIGHT * 0.88);
        ctx.restore();
      }

      await new Promise((resolve) => setTimeout(resolve, 1000 / FPS));
      globalFrame++;
      const pct = 15 + (globalFrame / totalFrames) * 80;
      onProgress(pct, `Rendering scene ${si + 1}/${scenes.length}...`);
    }
  }

  onProgress(95, "Finalizing video...");
  await new Promise((resolve) => setTimeout(resolve, 350));
  if (mediaRecorder.state !== "inactive") {
    mediaRecorder.requestData();
    await new Promise((resolve) => setTimeout(resolve, 100));
    mediaRecorder.stop();
  }

  const result = await recordingDone;

  try {
    liveSource.stop();
  } catch {
    // no-op
  }
  videoStream.getTracks().forEach((track) => track.stop());
  audioDestination.stream.getTracks().forEach((track) => track.stop());
  await Promise.allSettled([liveAudioCtx.close(), audioCtx.close()]);

  return result;
}

// Convert AudioBuffer to WAV Blob
function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const dataLength = buffer.length * blockAlign;
  const headerLength = 44;
  const totalLength = headerLength + dataLength;
  const arrayBuffer = new ArrayBuffer(totalLength);
  const view = new DataView(arrayBuffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeString(0, "RIFF");
  view.setUint32(4, totalLength - 8, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(36, "data");
  view.setUint32(40, dataLength, true);

  const channels = [];
  for (let i = 0; i < numChannels; i++) channels.push(buffer.getChannelData(i));

  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = Math.max(-1, Math.min(1, channels[ch][i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: "audio/wav" });
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
    voice_preset: "onyx",
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
  const [renderedVideoUrl, setRenderedVideoUrl] = useState<string | null>(null);
  const renderedVideoBlobRef = useRef<Blob | null>(null);
  const renderedVideoExtRef = useRef<"mp4" | "webm">("webm");
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const [generatingMusic, setGeneratingMusic] = useState(false);
  const [musicPrompt, setMusicPrompt] = useState("dark trap beat, heavy 808s, aggressive drums, cinematic tension, hood energy, no vocals");
  const [musicPreset, setMusicPreset] = useState("hood-trap");
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
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

  const enforceBlackRepresentation = (prompt: string): string => {
    const hasBlack = /black\s*(man|woman|men|women|people|family|person|couple|youth|teen|kid|child)/i.test(prompt);
    if (hasBlack) return prompt;
    return `${prompt}. IMPORTANT: All people in this image MUST be Black/African-American. Feature Black men, Black women, or Black families. Urban, modern, relatable setting. No generic stock photos.`;
  };

  const generateSceneImage = async (sceneIndex: number) => {
    const scene = project.scenes[sceneIndex];
    if (!scene.image_prompt) { toast.error("Add an image prompt first"); return; }
    setGeneratingImage(sceneIndex);
    try {
      const enhancedPrompt = enforceBlackRepresentation(scene.image_prompt);
      const { data, error } = await supabase.functions.invoke("shorts-media", {
        body: { action: "generate_image", prompt: enhancedPrompt },
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

  const generateSceneVoiceAudio = async (scene: Scene) => {
    const narration = scene.narration_text?.trim();
    if (!narration) return null;

    const { data, error } = await supabase.functions.invoke("shorts-media", {
      body: { action: "generate_tts", text: narration, voice: project.voice_preset || "onyx" },
    });

    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    if (!data?.audio_base64) throw new Error("No narration audio returned");

    return data.audio_base64 as string;
  };

  const ensureSceneAudio = async (scenes: Scene[], taskId?: string) => {
    const narratedSceneCount = scenes.filter((scene) => scene.narration_text?.trim()).length;
    if (narratedSceneCount === 0) return scenes;

    const nextScenes = [...scenes];
    let completed = 0;

    for (let i = 0; i < nextScenes.length; i++) {
      const scene = nextScenes[i];
      if (!scene.narration_text?.trim()) continue;

      if (!scene.audio_base64) {
        const audio_base64 = await generateSceneVoiceAudio(scene);
        if (audio_base64) {
          nextScenes[i] = { ...scene, audio_base64 };
          setProject((current) => ({
            ...current,
            scenes: current.scenes.map((existing, index) =>
              index === i ? { ...existing, audio_base64 } : existing,
            ),
          }));
        }
      }

      completed += 1;
      if (taskId) {
        const progress = Math.round(5 + (completed / narratedSceneCount) * 15);
        const message = narratedSceneCount === 1
          ? "Narration locked in..."
          : `Building narration ${completed}/${narratedSceneCount}...`;
        setRenderProgress({ pct: progress, message });
        updateTask(taskId, { progress, message });
      }
    }

    return nextScenes;
  };

  const previewVoice = async (sceneIndex: number) => {
    const scene = project.scenes[sceneIndex];
    if (!scene.narration_text) { toast.error("Add narration text first"); return; }
    setPlayingAudio(sceneIndex);
    try {
      const audioBase64 = await generateSceneVoiceAudio(scene);
      if (!audioBase64) throw new Error("No narration audio returned");

      updateScene(sceneIndex, { audio_base64: audioBase64 } as any);
      const audio = new Audio(`data:audio/mpeg;base64,${audioBase64}`);
      audio.onended = () => setPlayingAudio(null);
      await audio.play();
    } catch (e: any) {
      toast.error(e.message || "Failed to generate voice");
      setPlayingAudio(null);
    }
  };

  const generateMusic = async () => {
    setGeneratingMusic(true);
    const taskId = `music-${Date.now()}`;
    addTask({ id: taskId, label: "Generating beat", module: "Shorts", progress: 0, message: "Submitting to AI...", status: "running" });
    try {
      const beatPrompt = musicPreset === "custom" 
        ? musicPrompt 
        : BEAT_PRESETS.find(b => b.id === musicPreset)?.prompt || musicPrompt;
      
      // Step 1: Submit
      const { data, error } = await supabase.functions.invoke("shorts-media", {
        body: { action: "generate_music", prompt: beatPrompt },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      
      if (data?.audio_url) {
        setMusicUrl(data.audio_url);
        updateTask(taskId, { progress: 100, message: "Beat ready! 🔥", status: "done" });
        toast.success("Beat generated! Hit play to preview.");
        return;
      }

      // Step 2: Poll until complete
      const genId = data?.generation_id;
      if (!genId) throw new Error("No generation ID returned");
      
      updateTask(taskId, { progress: 15, message: "Beat is cooking... 🔥" });
      
      for (let attempt = 0; attempt < 30; attempt++) {
        await new Promise(r => setTimeout(r, 3000));
        updateTask(taskId, { progress: 15 + (attempt / 30) * 75, message: `Generating beat... (${attempt * 3}s)` });
        
        const { data: pollData, error: pollError } = await supabase.functions.invoke("shorts-media", {
          body: { action: "poll_music", generation_id: genId },
        });
        
        if (pollError) { console.error("Poll error:", pollError); continue; }
        if (pollData?.error) { console.error("Poll data error:", pollData.error); continue; }
        
        if (pollData?.status === "completed" && pollData?.audio_url) {
          setMusicUrl(pollData.audio_url);
          updateTask(taskId, { progress: 100, message: "Beat ready! 🔥", status: "done" });
          toast.success("Beat generated! Hit play to preview. 🔥");
          return;
        }
        
        if (pollData?.status === "error") {
          throw new Error("Music generation failed on server");
        }
      }
      
      updateTask(taskId, { progress: 100, message: "Timed out — try again", status: "error" });
      toast.error("Beat generation timed out. Try again.");
    } catch (e: any) {
      updateTask(taskId, { progress: 100, message: e.message, status: "error" });
      toast.error(e.message || "Failed to generate beat");
    } finally {
      setGeneratingMusic(false);
    }
  };

  const toggleMusicPlayback = () => {
    if (!musicUrl) return;
    if (musicPlaying && musicAudioRef.current) {
      musicAudioRef.current.pause();
      setMusicPlaying(false);
    } else {
      const audio = new Audio(musicUrl);
      audio.onended = () => setMusicPlaying(false);
      musicAudioRef.current = audio;
      audio.play();
      setMusicPlaying(true);
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
    const taskId = `batch-images-${Date.now()}`;
    setBatchGenerating(true);
    setBatchProgress({ current: 0, total: project.scenes.length, message: "Starting..." });
    addTask({ id: taskId, label: `Generating ${project.scenes.length} scene images`, module: "Shorts", progress: 0, message: "Starting...", status: "running" });

    for (let i = 0; i < project.scenes.length; i++) {
      const scene = project.scenes[i];
      if (!scene.image_prompt || scene.generated_image_url) {
        const pct = ((i + 1) / project.scenes.length) * 100;
        setBatchProgress(p => ({ ...p, current: i + 1, message: `Scene ${i + 1} skipped` }));
        updateTask(taskId, { progress: pct, message: `Scene ${i + 1} skipped` });
        continue;
      }
      const pct = ((i + 0.5) / project.scenes.length) * 100;
      setBatchProgress({ current: i + 1, total: project.scenes.length, message: `Generating scene ${i + 1}...` });
      updateTask(taskId, { progress: pct, message: `Generating scene ${i + 1}/${project.scenes.length}...` });
      try {
        const enhancedPrompt = enforceBlackRepresentation(scene.image_prompt);
        const { data, error } = await supabase.functions.invoke("shorts-media", {
          body: { action: "generate_image", prompt: enhancedPrompt },
        });
        if (error) throw error;
        if (data?.image_url) {
          updateScene(i, { generated_image_url: data.image_url });
        }
      } catch (e: any) {
        toast.error(`Scene ${i + 1} failed: ${e.message}`);
      }
      updateTask(taskId, { progress: ((i + 1) / project.scenes.length) * 100 });
    }
    setBatchGenerating(false);
    updateTask(taskId, { progress: 100, message: "All images generated!", status: "done" });
    toast.success("All images generated!");
  };

  // Render and download video
  const renderAndDownload = async () => {
    if (!user) return;
    if (project.scenes.length === 0) {
      toast.error("No scenes to render");
      return;
    }

    const taskId = `render-video-${Date.now()}`;
    setRendering(true);
    setRenderProgress({ pct: 0, message: "Preparing..." });
    addTask({ id: taskId, label: `Rendering "${project.title || "Truth Short"}"`, module: "Shorts", progress: 0, message: "Preparing...", status: "running" });

    try {
      const scenesWithAudio = await ensureSceneAudio(project.scenes, taskId);
      const rendered = await renderVideoToBlob(scenesWithAudio, (pct, msg) => {
        const adjustedPct = Math.max(20, Math.round(pct * 0.8));
        setRenderProgress({ pct: adjustedPct, message: msg });
        updateTask(taskId, { progress: adjustedPct, message: msg });
      }, musicUrl);

      setRenderProgress({ pct: 85, message: "Uploading video..." });
      updateTask(taskId, { progress: 85, message: "Uploading video..." });

      const fileName = `${user.id}/${project.id || Date.now()}_${Date.now()}.${rendered.extension}`;
      const { error: uploadError } = await supabase.storage
        .from("shorts-videos")
        .upload(fileName, rendered.blob, { contentType: rendered.mimeType, upsert: true });

      let publicUrl: string | null = null;
      if (uploadError) {
        console.error("Upload error:", uploadError);
        toast.error("Video rendered but upload failed. You can still save it below.");
      } else {
        const { data: urlData } = supabase.storage.from("shorts-videos").getPublicUrl(fileName);
        publicUrl = urlData?.publicUrl || null;

        if (project.id && publicUrl) {
          await supabase.from("shorts_projects")
            .update({ final_video_url: publicUrl, status: "rendered" })
            .eq("id", project.id);
          setProject((current) => ({ ...current, final_video_url: publicUrl, status: "rendered" }));
        }
      }

      setRenderProgress({ pct: 100, message: "Video ready!" });
      updateTask(taskId, { progress: 100, message: "Video ready! 🔥", status: "done" });

      if (renderedVideoUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(renderedVideoUrl);
      }
      const localUrl = URL.createObjectURL(rendered.blob);
      renderedVideoBlobRef.current = rendered.blob;
      renderedVideoExtRef.current = rendered.extension;
      setRenderedVideoUrl(localUrl);
      setActiveTab("export");

      toast.success("Video rendered with audio. Save it below. 🔥");
      loadProjects();
    } catch (e: any) {
      toast.error(`Render failed: ${e.message}`);
      updateTask(taskId, { progress: 0, message: e.message, status: "error" });
    } finally {
      setRendering(false);
    }
  };

  const downloadVideo = async () => {
    if (!renderedVideoUrl) return;
    try {
      const blob = renderedVideoBlobRef.current ?? await fetch(renderedVideoUrl).then((response) => {
        if (!response.ok) throw new Error(`Failed to fetch video: ${response.status}`);
        return response.blob();
      });

      const extension = renderedVideoExtRef.current || (renderedVideoUrl.toLowerCase().includes(".mp4") ? "mp4" : "webm");
      const mimeType = blob.type || (extension === "mp4" ? "video/mp4" : "video/webm");
      const safeTitle = (project.title || "truth-short").trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase() || "truth-short";
      const fileName = `${safeTitle}_${Date.now()}.${extension}`;
      const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

      if (isMobile && navigator.share) {
        const file = new File([blob], fileName, { type: mimeType });
        const canShareFiles = typeof navigator.canShare !== "function" || navigator.canShare({ files: [file] });

        if (canShareFiles) {
          await navigator.share({ files: [file], title: project.title || "Truth Short" });
          toast.success("Use your phone’s save/share sheet to keep the video.");
          return;
        }
      }

      const url = URL.createObjectURL(blob);
      if (isMobile) {
        window.open(url, "_blank", "noopener,noreferrer");
        toast.success("Opened the video. Use your browser’s share/save option to keep it.");
        setTimeout(() => URL.revokeObjectURL(url), 30000);
        return;
      }

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      toast.success("Video download started. 📲");
    } catch (e: any) {
      toast.error("Download failed: " + (e.message || "Unknown error"));
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
        <TabsList className="grid grid-cols-6 w-full">
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
          <TabsTrigger value="music" className="flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5" /> Music
            {musicUrl && <CheckCircle2 className="w-3 h-3 text-green-500" />}
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
                <Mic className="w-4 h-4" /> Voice & Narration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Narrator Voice</label>
                  <Select value={project.voice_preset} onValueChange={v => setProject(p => ({ ...p, voice_preset: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alloy">Alloy (Balanced, Clear)</SelectItem>
                      <SelectItem value="echo">Echo (Warm, Resonant)</SelectItem>
                      <SelectItem value="fable">Fable (Expressive, Story)</SelectItem>
                      <SelectItem value="onyx">Onyx (Deep, Commanding)</SelectItem>
                      <SelectItem value="nova">Nova (Warm, Friendly)</SelectItem>
                      <SelectItem value="shimmer">Shimmer (Clear, Bright)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Speed</label>
                  <Select defaultValue="1.0">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.8">Slow (0.8x)</SelectItem>
                      <SelectItem value="1.0">Normal (1.0x)</SelectItem>
                      <SelectItem value="1.1">Slightly Fast (1.1x)</SelectItem>
                      <SelectItem value="1.2">Fast (1.2x)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium">AIMLAPI TTS Connected</p>
                  <p className="text-xs text-muted-foreground">Voice generation is ready. Preview individual scenes or generate all narration at once.</p>
                </div>
              </div>

              {project.scenes.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Scene Narration</h3>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={async () => {
                        const taskId = `narration-all-${Date.now()}`;
                        addTask({ id: taskId, label: "Generating all narration", module: "Shorts", progress: 0, message: "Starting...", status: "running" });
                        for (let i = 0; i < project.scenes.length; i++) {
                          if (!project.scenes[i].narration_text) continue;
                          updateTask(taskId, { progress: ((i + 0.5) / project.scenes.length) * 100, message: `Scene ${i + 1}/${project.scenes.length}...` });
                          await previewVoice(i);
                          // Small delay between scenes
                          await new Promise(r => setTimeout(r, 500));
                          updateTask(taskId, { progress: ((i + 1) / project.scenes.length) * 100 });
                        }
                        updateTask(taskId, { progress: 100, message: "All narration generated!", status: "done" });
                        toast.success("All narration previewed!");
                      }}
                      disabled={playingAudio !== null}
                    >
                      <Volume2 className="w-3.5 h-3.5 mr-1" /> Play All Narration
                    </Button>
                  </div>
                  {project.scenes.map((scene, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/20">
                      <Badge variant="outline" className="mt-0.5 shrink-0">{i + 1}</Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{scene.narration_text || <span className="text-muted-foreground italic">No narration text</span>}</p>
                        {scene.verse_reference && (
                          <p className="text-xs text-muted-foreground mt-1">📖 {scene.verse_reference}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 h-8 w-8"
                        onClick={() => previewVoice(i)}
                        disabled={playingAudio === i}
                      >
                        {playingAudio === i ? (
                          <Volume2 className="w-4 h-4 animate-pulse text-primary" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  <Mic className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Generate a script first to see narration scenes here.</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => setActiveTab("create")}>
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Go to Create
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* MUSIC TAB */}
        <TabsContent value="music" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Music className="w-5 h-5" /> Background Beat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Beat Style</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {BEAT_PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setMusicPreset(preset.id);
                        if (preset.prompt) setMusicPrompt(preset.prompt);
                      }}
                      className={`p-3 rounded-lg border text-left transition-all text-sm ${
                        musicPreset === preset.id 
                          ? "border-primary bg-primary/10 ring-1 ring-primary" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="font-medium">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {musicPreset === "custom" && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Custom Beat Description</label>
                  <Textarea
                    value={musicPrompt}
                    onChange={e => setMusicPrompt(e.target.value)}
                    rows={3}
                    placeholder="Describe the beat you want... e.g. 'dark trap beat, heavy 808s, aggressive drums'"
                  />
                </div>
              )}

              <div className="p-3 rounded-lg bg-muted/30 border">
                <p className="text-xs text-muted-foreground mb-1">Current prompt:</p>
                <p className="text-sm">{musicPreset === "custom" ? musicPrompt : BEAT_PRESETS.find(b => b.id === musicPreset)?.prompt}</p>
              </div>

              <Button
                className="w-full h-12 text-base font-bold"
                onClick={generateMusic}
                disabled={generatingMusic}
              >
                {generatingMusic ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Cooking Beat...</>
                ) : (
                  <><Music className="w-5 h-5 mr-2" /> Generate Beat 🔥</>
                )}
              </Button>

              {musicUrl && (
                <div className="p-4 rounded-lg border bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 rounded-full"
                        onClick={toggleMusicPlayback}
                      >
                        {musicPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </Button>
                      <div>
                        <p className="font-semibold text-sm">Beat Ready</p>
                        <p className="text-xs text-muted-foreground">
                          {BEAT_PRESETS.find(b => b.id === musicPreset)?.label || "Custom Beat"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={generateMusic} disabled={generatingMusic}>
                        <RefreshCw className="w-3.5 h-3.5 mr-1" /> Regenerate
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={musicUrl} download="beat.mp3" target="_blank" rel="noopener noreferrer">
                          <Download className="w-3.5 h-3.5 mr-1" /> Download
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="p-2 rounded bg-green-500/10 border border-green-500/30 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <p className="text-xs">This beat will be included when you render the final video.</p>
                  </div>
                </div>
              )}

              {!musicUrl && !generatingMusic && (
                <div className="p-4 rounded-lg border border-dashed text-center text-muted-foreground">
                  <Music className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No beat generated yet. Pick a style and hit generate.</p>
                  <p className="text-xs mt-1">AI generates custom instrumentals — no weak generic music. Every beat hits hard. 🔥</p>
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

              {/* VIDEO PLAYER */}
              {renderedVideoUrl && (
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden border-2 border-primary/50 bg-black mx-auto" style={{ maxWidth: 360 }}>
                    <video
                      src={renderedVideoUrl}
                      controls
                      playsInline
                      className="w-full"
                      style={{ aspectRatio: "9/16" }}
                    />
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button
                      className="h-12 px-6 text-base font-bold"
                      onClick={downloadVideo}
                    >
                      <Download className="w-5 h-5 mr-2" /> Download Video
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 px-6"
                      onClick={renderAndDownload}
                      disabled={rendering}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" /> Re-Render
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    WebM format (1080×1920) · Ready for YouTube Shorts upload
                  </p>
                </div>
              )}

              {!renderedVideoUrl && (
                <div className="flex gap-3">
                  <Button
                    className="flex-1 h-14 text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    onClick={renderAndDownload}
                    disabled={rendering || project.scenes.length === 0}
                  >
                    {rendering ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Rendering Video...</>
                    ) : (
                      <><Film className="w-5 h-5 mr-2" /> Render Video</>
                    )}
                  </Button>
                </div>
              )}

              {!renderedVideoUrl && (
                <p className="text-xs text-muted-foreground text-center">
                  Renders as WebM video with motion effects and burned-in captions. Ready for YouTube Shorts upload.
                </p>
              )}
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
              if (renderedVideoUrl?.startsWith("blob:")) {
                URL.revokeObjectURL(renderedVideoUrl);
              }
              renderedVideoBlobRef.current = null;
              renderedVideoExtRef.current = "webm";
              setRenderedVideoUrl(null);
              setMusicUrl(null);
              setProject({
                title: "", topic: "", verse_reference: "", verse_text: "",
                duration: 30, style: "urban-prophetic", tone: "urgent",
                voice_preset: "onyx", cta: "Follow for truth",
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

                  if (renderedVideoUrl?.startsWith("blob:")) {
                    URL.revokeObjectURL(renderedVideoUrl);
                  }
                  renderedVideoBlobRef.current = null;
                  renderedVideoExtRef.current = p.final_video_url?.toLowerCase().includes(".mp4") ? "mp4" : "webm";
                  setProject({ ...p, scenes: scenes || [] });

                  if (p.final_video_url) {
                    setRenderedVideoUrl(p.final_video_url);
                    setActiveTab("export");
                  } else {
                    setRenderedVideoUrl(null);
                    setActiveTab("scenes");
                  }
                }}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{p.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{p.topic} · {p.duration}s · {p.style}</p>
                        <p className="text-xs text-muted-foreground">{p.verse_reference}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Badge variant={p.status === "rendered" ? "default" : p.status === "draft" ? "secondary" : "outline"} className="text-xs">
                          {p.status === "rendered" ? "✅ Video Ready" : p.status}
                        </Badge>
                        {p.final_video_url && <Video className="w-3.5 h-3.5 text-primary" />}
                      </div>
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
