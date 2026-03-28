import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Type, Image as ImageIcon, Palette, RotateCcw, ChevronDown, Plus, Minus, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface Template {
  id: string;
  name: string;
  category: string;
  bgType: 'gradient' | 'solid' | 'image';
  bg: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  layout: 'centered' | 'bottom' | 'left' | 'overlay';
  overlayOpacity: number;
}

const TEMPLATES: Template[] = [
  // Dark & Bold
  { id: 'covenant-gold', name: 'Covenant Gold', category: 'Dark', bgType: 'gradient', bg: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', textColor: '#e2c87e', accentColor: '#c9a84c', fontFamily: 'Cormorant Garamond', layout: 'centered', overlayOpacity: 0 },
  { id: 'burning-bush', name: 'Burning Bush', category: 'Fire', bgType: 'gradient', bg: 'linear-gradient(135deg, #1a0000 0%, #3d0c02 30%, #8b2500 70%, #c94418 100%)', textColor: '#ffd7b5', accentColor: '#ff9544', fontFamily: 'Cormorant Garamond', layout: 'centered', overlayOpacity: 0 },
  { id: 'deep-waters', name: 'Deep Waters', category: 'Nature', bgType: 'gradient', bg: 'linear-gradient(180deg, #0a1628 0%, #0d253f 40%, #1a4a6e 80%, #2980b9 100%)', textColor: '#d4e8f7', accentColor: '#6fb3de', fontFamily: 'Cormorant Garamond', layout: 'bottom', overlayOpacity: 0 },
  { id: 'olive-branch', name: 'Olive Branch', category: 'Nature', bgType: 'gradient', bg: 'linear-gradient(145deg, #1a1e0a 0%, #2d3316 30%, #4a5828 70%, #6b7f32 100%)', textColor: '#e8e4c9', accentColor: '#c4b86c', fontFamily: 'Cormorant Garamond', layout: 'centered', overlayOpacity: 0 },
  { id: 'royal-purple', name: 'Royal Purple', category: 'Royal', bgType: 'gradient', bg: 'linear-gradient(135deg, #1a0a2e 0%, #2d1450 40%, #4a1f7a 80%, #6b2fa0 100%)', textColor: '#e8d5f5', accentColor: '#c9a0e8', fontFamily: 'Cormorant Garamond', layout: 'centered', overlayOpacity: 0 },
  // Light & Clean
  { id: 'morning-light', name: 'Morning Light', category: 'Light', bgType: 'gradient', bg: 'linear-gradient(180deg, #fdf6e3 0%, #fceabb 50%, #f8d56b 100%)', textColor: '#2c1810', accentColor: '#8b5e3c', fontFamily: 'Cormorant Garamond', layout: 'centered', overlayOpacity: 0 },
  { id: 'pure-white', name: 'Pure White', category: 'Light', bgType: 'gradient', bg: 'linear-gradient(180deg, #ffffff 0%, #f5f0e8 100%)', textColor: '#1a1a2e', accentColor: '#c9a84c', fontFamily: 'Cormorant Garamond', layout: 'centered', overlayOpacity: 0 },
  { id: 'parchment', name: 'Ancient Parchment', category: 'Classic', bgType: 'gradient', bg: 'linear-gradient(145deg, #f5e6c8 0%, #e8d5a8 50%, #d4c090 100%)', textColor: '#3d2b1f', accentColor: '#8b5e3c', fontFamily: 'Cormorant Garamond', layout: 'centered', overlayOpacity: 0 },
  // Dramatic
  { id: 'midnight-prayer', name: 'Midnight Prayer', category: 'Dark', bgType: 'solid', bg: '#0a0a0f', textColor: '#ffffff', accentColor: '#c9a84c', fontFamily: 'Cormorant Garamond', layout: 'centered', overlayOpacity: 0 },
  { id: 'blood-covenant', name: 'Blood Covenant', category: 'Fire', bgType: 'gradient', bg: 'linear-gradient(180deg, #0a0000 0%, #2d0000 40%, #5c0000 100%)', textColor: '#ff9999', accentColor: '#ff4444', fontFamily: 'Cormorant Garamond', layout: 'centered', overlayOpacity: 0 },
  { id: 'heavens-declare', name: 'Heavens Declare', category: 'Nature', bgType: 'gradient', bg: 'linear-gradient(180deg, #000022 0%, #000044 30%, #001155 60%, #003388 100%)', textColor: '#ccddff', accentColor: '#6699ff', fontFamily: 'Cormorant Garamond', layout: 'bottom', overlayOpacity: 0 },
  { id: 'desert-sand', name: 'Desert Sand', category: 'Classic', bgType: 'gradient', bg: 'linear-gradient(145deg, #c2956a 0%, #d4a574 30%, #e8c49a 60%, #f0dbb8 100%)', textColor: '#2c1810', accentColor: '#6b3a1f', fontFamily: 'Cormorant Garamond', layout: 'left', overlayOpacity: 0 },
];

const ASPECT_RATIOS = [
  { label: 'Instagram Post (1:1)', width: 1080, height: 1080 },
  { label: 'Instagram Story (9:16)', width: 1080, height: 1920 },
  { label: 'Facebook Post (16:9)', width: 1200, height: 675 },
  { label: 'Twitter/X Post (16:9)', width: 1200, height: 675 },
  { label: 'Pinterest (2:3)', width: 1000, height: 1500 },
  { label: 'Desktop Wallpaper (16:9)', width: 1920, height: 1080 },
  { label: 'Phone Wallpaper (9:19.5)', width: 1170, height: 2532 },
];

export default function SharePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedTemplate, setSelectedTemplate] = useState<Template>(TEMPLATES[0]);
  const [verseText, setVerseText] = useState('"In the beginning Elohim created the heavens and the earth."');
  const [reference, setReference] = useState('Genesis 1:1');
  const [customSubtext, setCustomSubtext] = useState('');
  const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[0]);
  const [fontSize, setFontSize] = useState(48);
  const [refFontSize, setRefFontSize] = useState(24);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [customBgImage, setCustomBgImage] = useState<string | null>(null);
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [customTextColor, setCustomTextColor] = useState<string | null>(null);
  const [customAccentColor, setCustomAccentColor] = useState<string | null>(null);
  const [watermark, setWatermark] = useState('דרך Derekh');

  const effectiveTextColor = customTextColor || selectedTemplate.textColor;
  const effectiveAccentColor = customAccentColor || selectedTemplate.accentColor;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCustomBgImage(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = aspectRatio.width;
    const H = aspectRatio.height;
    canvas.width = W;
    canvas.height = H;

    const draw = () => {
      // Background
      if (customBgImage) {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          // Cover fill
          const scale = Math.max(W / img.width, H / img.height);
          const x = (W - img.width * scale) / 2;
          const y = (H - img.height * scale) / 2;
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          // Overlay
          ctx.fillStyle = `rgba(0,0,0,${overlayOpacity})`;
          ctx.fillRect(0, 0, W, H);
          drawText();
        };
        img.src = customBgImage;
        return;
      }

      if (selectedTemplate.bgType === 'gradient') {
        // Parse gradient
        const gradCanvas = document.createElement('canvas');
        gradCanvas.width = W;
        gradCanvas.height = H;
        const div = document.createElement('div');
        div.style.cssText = `width:${W}px;height:${H}px;background:${selectedTemplate.bg}`;

        // Manually parse gradient colors
        const colorMatches = selectedTemplate.bg.match(/#[0-9a-fA-F]{6}/g) || [];
        if (colorMatches.length >= 2) {
          const isVertical = selectedTemplate.bg.includes('180deg');
          const grad = isVertical
            ? ctx.createLinearGradient(0, 0, 0, H)
            : ctx.createLinearGradient(0, 0, W, H);
          colorMatches.forEach((c, i) => {
            grad.addColorStop(i / (colorMatches.length - 1), c);
          });
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = '#1a1a2e';
        }
      } else {
        ctx.fillStyle = selectedTemplate.bg;
      }
      ctx.fillRect(0, 0, W, H);
      drawText();
    };

    const drawText = () => {
      const pad = W * 0.1;
      const maxW = W - pad * 2;
      const scale = W / 1080; // scale relative to 1080 base

      // Verse text
      const vSize = fontSize * scale;
      ctx.font = `italic ${vSize}px "${selectedTemplate.fontFamily}", serif`;
      ctx.fillStyle = effectiveTextColor;
      ctx.textAlign = textAlign;

      const textX = textAlign === 'left' ? pad : textAlign === 'right' ? W - pad : W / 2;

      // Word wrap
      const words = verseText.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxW && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);

      const lineHeight = vSize * 1.5;
      const totalTextHeight = lines.length * lineHeight;

      // Position based on layout
      let startY: number;
      if (selectedTemplate.layout === 'bottom') {
        startY = H - totalTextHeight - H * 0.2;
      } else if (selectedTemplate.layout === 'left') {
        startY = H / 2 - totalTextHeight / 2;
      } else {
        startY = H / 2 - totalTextHeight / 2 - H * 0.05;
      }

      lines.forEach((line, i) => {
        ctx.fillText(line, textX, startY + i * lineHeight);
      });

      // Decorative line
      const lineY = startY + totalTextHeight + vSize * 0.6;
      ctx.strokeStyle = effectiveAccentColor;
      ctx.lineWidth = 2 * scale;
      const decorW = Math.min(120 * scale, maxW * 0.3);
      const lineStartX = textAlign === 'left' ? pad : textAlign === 'right' ? W - pad - decorW : W / 2 - decorW / 2;
      ctx.beginPath();
      ctx.moveTo(lineStartX, lineY);
      ctx.lineTo(lineStartX + decorW, lineY);
      ctx.stroke();

      // Reference
      const rSize = refFontSize * scale;
      ctx.font = `600 ${rSize}px "IBM Plex Sans", sans-serif`;
      ctx.fillStyle = effectiveAccentColor;
      ctx.fillText(reference, textX, lineY + rSize * 1.8);

      // Custom subtext
      if (customSubtext) {
        ctx.font = `${rSize * 0.75}px "IBM Plex Sans", sans-serif`;
        ctx.fillStyle = effectiveTextColor + 'aa';
        ctx.fillText(customSubtext, textX, lineY + rSize * 3.2);
      }

      // Watermark
      if (watermark) {
        const wmSize = 14 * scale;
        ctx.font = `${wmSize}px "IBM Plex Sans", sans-serif`;
        ctx.fillStyle = effectiveTextColor + '44';
        ctx.textAlign = 'right';
        ctx.fillText(watermark, W - pad * 0.5, H - pad * 0.4);
      }
    };

    draw();
  }, [selectedTemplate, verseText, reference, customSubtext, aspectRatio, fontSize, refFontSize, textAlign, customBgImage, overlayOpacity, effectiveTextColor, effectiveAccentColor, watermark]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${reference.replace(/\s+/g, '_')}_share.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    toast.success('Image downloaded!');
  };

  const shareImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
      if (!blob) throw new Error('Failed');
      if (navigator.share) {
        const file = new File([blob], `${reference}.png`, { type: 'image/png' });
        await navigator.share({ title: reference, text: verseText, files: [file] });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        toast.success('Image copied to clipboard!');
      }
    } catch {
      toast.error('Share failed — try downloading instead');
    }
  };

  const previewScale = previewRef.current
    ? Math.min(
        (previewRef.current.clientWidth - 32) / aspectRatio.width,
        400 / aspectRatio.height,
        1
      )
    : 0.4;

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/">
          <Button variant="ghost" size="icon"><ArrowLeft size={18} /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Share the Truth</h1>
          <p className="text-sm text-muted-foreground">Create beautiful scripture images to share</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Preview */}
        <div className="space-y-4">
          <div ref={previewRef} className="bg-card rounded-lg border border-border p-4 flex items-center justify-center min-h-[300px]">
            <canvas
              ref={canvasRef}
              style={{
                maxWidth: '100%',
                maxHeight: '500px',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={downloadImage} className="flex-1 gap-2">
              <Download size={16} /> Download
            </Button>
            <Button onClick={shareImage} variant="secondary" className="flex-1 gap-2">
              <Share2 size={16} /> Share
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-card rounded-lg border border-border">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="w-full grid grid-cols-3 rounded-t-lg rounded-b-none">
              <TabsTrigger value="text" className="gap-1.5 text-xs"><Type size={14} />Text</TabsTrigger>
              <TabsTrigger value="template" className="gap-1.5 text-xs"><Palette size={14} />Style</TabsTrigger>
              <TabsTrigger value="image" className="gap-1.5 text-xs"><ImageIcon size={14} />Image</TabsTrigger>
            </TabsList>

            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* TEXT TAB */}
              <TabsContent value="text" className="mt-0 space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Verse Text</Label>
                  <Textarea
                    value={verseText}
                    onChange={(e) => setVerseText(e.target.value)}
                    rows={4}
                    className="text-sm"
                    placeholder="Type or paste your verse..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Reference</Label>
                  <Input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Genesis 1:1" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Subtitle (optional)</Label>
                  <Input value={customSubtext} onChange={(e) => setCustomSubtext(e.target.value)} placeholder="Your message..." />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Verse Font Size: {fontSize}px</Label>
                  <Slider value={[fontSize]} onValueChange={([v]) => setFontSize(v)} min={24} max={80} step={2} />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Reference Size: {refFontSize}px</Label>
                  <Slider value={[refFontSize]} onValueChange={([v]) => setRefFontSize(v)} min={14} max={40} step={1} />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Text Alignment</Label>
                  <div className="flex gap-2">
                    {(['left', 'center', 'right'] as const).map((a) => (
                      <Button key={a} size="sm" variant={textAlign === a ? 'default' : 'outline'} onClick={() => setTextAlign(a)}>
                        {a === 'left' && <AlignLeft size={14} />}
                        {a === 'center' && <AlignCenter size={14} />}
                        {a === 'right' && <AlignRight size={14} />}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Watermark</Label>
                  <Input value={watermark} onChange={(e) => setWatermark(e.target.value)} placeholder="דרך Derekh" />
                </div>
              </TabsContent>

              {/* STYLE TAB */}
              <TabsContent value="template" className="mt-0 space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Aspect Ratio</Label>
                  <Select value={aspectRatio.label} onValueChange={(v) => setAspectRatio(ASPECT_RATIOS.find((a) => a.label === v) || ASPECT_RATIOS[0])}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ASPECT_RATIOS.map((ar) => (
                        <SelectItem key={ar.label} value={ar.label}>{ar.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Templates</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {TEMPLATES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSelectedTemplate(t);
                          setCustomTextColor(null);
                          setCustomAccentColor(null);
                          setCustomBgImage(null);
                        }}
                        className={`relative rounded-md overflow-hidden h-16 border-2 transition-all ${
                          selectedTemplate.id === t.id ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-muted-foreground'
                        }`}
                        style={{ background: t.bg }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium px-1 text-center" style={{ color: t.textColor }}>
                          {t.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Text Color</Label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={effectiveTextColor} onChange={(e) => setCustomTextColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-border" />
                      <span className="text-xs font-mono text-muted-foreground">{effectiveTextColor}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Accent Color</Label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={effectiveAccentColor} onChange={(e) => setCustomAccentColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border border-border" />
                      <span className="text-xs font-mono text-muted-foreground">{effectiveAccentColor}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* IMAGE TAB */}
              <TabsContent value="image" className="mt-0 space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Custom Background Image</Label>
                  <Button variant="outline" className="w-full gap-2" onClick={() => fileInputRef.current?.click()}>
                    <ImageIcon size={14} /> Upload Background
                  </Button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  {customBgImage && (
                    <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground" onClick={() => setCustomBgImage(null)}>
                      <RotateCcw size={12} className="mr-1" /> Remove custom image
                    </Button>
                  )}
                </div>
                {customBgImage && (
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Overlay Darkness: {Math.round(overlayOpacity * 100)}%</Label>
                    <Slider value={[overlayOpacity]} onValueChange={([v]) => setOverlayOpacity(v)} min={0} max={0.9} step={0.05} />
                  </div>
                )}
                <div className="p-3 bg-muted/50 rounded-md">
                  <p className="text-xs text-muted-foreground">
                    💡 <strong>Tip:</strong> Upload a landscape photo, nature scene, or texture. The overlay control lets you darken it so text remains readable.
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
