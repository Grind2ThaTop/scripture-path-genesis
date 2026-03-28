import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Type, Image as ImageIcon, Palette, RotateCcw, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

// Import template images
import torahScrollImg from '@/assets/templates/torah-scroll.jpg';
import openBibleImg from '@/assets/templates/open-bible.jpg';
import burningBushImg from '@/assets/templates/burning-bush.jpg';
import partingSeaImg from '@/assets/templates/parting-sea.jpg';
import stoneTabletsImg from '@/assets/templates/stone-tablets.jpg';
import starsCovenantImg from '@/assets/templates/stars-covenant.jpg';
import oliveTreeImg from '@/assets/templates/olive-tree.jpg';
import jerusalemSunriseImg from '@/assets/templates/jerusalem-sunrise.jpg';
import lionJudahImg from '@/assets/templates/lion-judah.jpg';
import livingWaterImg from '@/assets/templates/living-water.jpg';
import menorahImg from '@/assets/templates/menorah.jpg';
import pillarFireImg from '@/assets/templates/pillar-fire.jpg';

interface Template {
  id: string;
  name: string;
  category: string;
  type: 'image' | 'gradient';
  bg: string; // image src or gradient CSS
  textColor: string;
  accentColor: string;
  overlay: number; // default overlay darkness
  layout: 'centered' | 'bottom' | 'top';
}

const TEMPLATES: Template[] = [
  // 📖 Scripture & Scrolls
  { id: 'torah-scroll', name: 'Torah Scroll', category: 'Scripture', type: 'image', bg: torahScrollImg, textColor: '#ffffff', accentColor: '#e2c87e', overlay: 0.55, layout: 'centered' },
  { id: 'open-bible', name: 'Open Bible', category: 'Scripture', type: 'image', bg: openBibleImg, textColor: '#ffffff', accentColor: '#e2c87e', overlay: 0.5, layout: 'centered' },
  { id: 'stone-tablets', name: 'Stone Tablets', category: 'Scripture', type: 'image', bg: stoneTabletsImg, textColor: '#ffffff', accentColor: '#d4a84c', overlay: 0.5, layout: 'centered' },

  // 🔥 Fire & Power
  { id: 'burning-bush', name: 'Burning Bush', category: 'Fire', type: 'image', bg: burningBushImg, textColor: '#ffffff', accentColor: '#ff9544', overlay: 0.45, layout: 'centered' },
  { id: 'pillar-fire', name: 'Pillar of Fire', category: 'Fire', type: 'image', bg: pillarFireImg, textColor: '#ffffff', accentColor: '#ffaa44', overlay: 0.4, layout: 'top' },
  { id: 'menorah', name: 'Temple Menorah', category: 'Fire', type: 'image', bg: menorahImg, textColor: '#ffffff', accentColor: '#e2c87e', overlay: 0.5, layout: 'centered' },

  // 🌍 Land & Nature
  { id: 'parting-sea', name: 'Parting the Sea', category: 'Epic', type: 'image', bg: partingSeaImg, textColor: '#ffffff', accentColor: '#6fb3de', overlay: 0.4, layout: 'top' },
  { id: 'olive-tree', name: 'Olive Tree', category: 'Nature', type: 'image', bg: oliveTreeImg, textColor: '#ffffff', accentColor: '#c4b86c', overlay: 0.45, layout: 'bottom' },
  { id: 'jerusalem', name: 'Jerusalem Sunrise', category: 'Land', type: 'image', bg: jerusalemSunriseImg, textColor: '#ffffff', accentColor: '#e2c87e', overlay: 0.4, layout: 'top' },

  // 🦁 Power & Covenant
  { id: 'lion-judah', name: 'Lion of Judah', category: 'Power', type: 'image', bg: lionJudahImg, textColor: '#ffffff', accentColor: '#e2c87e', overlay: 0.45, layout: 'centered' },
  { id: 'stars-covenant', name: "Abraham's Stars", category: 'Covenant', type: 'image', bg: starsCovenantImg, textColor: '#ffffff', accentColor: '#aabbff', overlay: 0.35, layout: 'top' },
  { id: 'living-water', name: 'Living Water', category: 'Spirit', type: 'image', bg: livingWaterImg, textColor: '#ffffff', accentColor: '#88ccee', overlay: 0.4, layout: 'centered' },

  // 🎨 Gradient classics
  { id: 'covenant-gold', name: 'Covenant Gold', category: 'Classic', type: 'gradient', bg: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', textColor: '#e2c87e', accentColor: '#c9a84c', overlay: 0, layout: 'centered' },
  { id: 'midnight-prayer', name: 'Midnight', category: 'Classic', type: 'gradient', bg: '#0a0a0f', textColor: '#ffffff', accentColor: '#c9a84c', overlay: 0, layout: 'centered' },
  { id: 'parchment', name: 'Parchment', category: 'Classic', type: 'gradient', bg: 'linear-gradient(145deg, #f5e6c8 0%, #e8d5a8 50%, #d4c090 100%)', textColor: '#3d2b1f', accentColor: '#8b5e3c', overlay: 0, layout: 'centered' },
  { id: 'blood-covenant', name: 'Blood Covenant', category: 'Classic', type: 'gradient', bg: 'linear-gradient(180deg, #0a0000 0%, #2d0000 40%, #5c0000 100%)', textColor: '#ff9999', accentColor: '#ff4444', overlay: 0, layout: 'centered' },
  { id: 'royal-purple', name: 'Royal Purple', category: 'Classic', type: 'gradient', bg: 'linear-gradient(135deg, #1a0a2e 0%, #2d1450 40%, #4a1f7a 80%, #6b2fa0 100%)', textColor: '#e8d5f5', accentColor: '#c9a0e8', overlay: 0, layout: 'centered' },
  { id: 'deep-waters', name: 'Deep Waters', category: 'Classic', type: 'gradient', bg: 'linear-gradient(180deg, #0a1628 0%, #0d253f 40%, #1a4a6e 80%, #2980b9 100%)', textColor: '#d4e8f7', accentColor: '#6fb3de', overlay: 0, layout: 'bottom' },
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
  const [imageLoaded, setImageLoaded] = useState(false);

  const effectiveTextColor = customTextColor || selectedTemplate.textColor;
  const effectiveAccentColor = customAccentColor || selectedTemplate.accentColor;
  const effectiveOverlay = customBgImage ? overlayOpacity : selectedTemplate.overlay;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCustomBgImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const drawTextOnCanvas = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number) => {
    const pad = W * 0.1;
    const maxW = W - pad * 2;
    const scale = W / 1080;

    // Verse text
    const vSize = fontSize * scale;
    ctx.font = `italic ${vSize}px "Cormorant Garamond", "Georgia", serif`;
    ctx.fillStyle = effectiveTextColor;
    ctx.textAlign = textAlign;
    ctx.textBaseline = 'top';

    const textX = textAlign === 'left' ? pad : textAlign === 'right' ? W - pad : W / 2;

    // Word wrap
    const words = verseText.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (ctx.measureText(testLine).width > maxW && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);

    const lineHeight = vSize * 1.5;
    const totalTextHeight = lines.length * lineHeight;
    const layout = selectedTemplate.layout;

    let startY: number;
    if (layout === 'top') {
      startY = H * 0.12;
    } else if (layout === 'bottom') {
      startY = H - totalTextHeight - H * 0.25;
    } else {
      startY = H / 2 - totalTextHeight / 2 - H * 0.05;
    }

    // Text shadow for readability
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 8 * scale;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2 * scale;

    lines.forEach((line, i) => {
      ctx.fillText(line, textX, startY + i * lineHeight);
    });

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

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
    ctx.font = `600 ${rSize}px "IBM Plex Sans", "Helvetica", sans-serif`;
    ctx.fillStyle = effectiveAccentColor;
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 4 * scale;
    ctx.fillText(reference, textX, lineY + rSize * 1.2);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Custom subtext
    if (customSubtext) {
      ctx.font = `${rSize * 0.75}px "IBM Plex Sans", sans-serif`;
      ctx.fillStyle = effectiveTextColor + 'aa';
      ctx.fillText(customSubtext, textX, lineY + rSize * 2.8);
    }

    // Watermark
    if (watermark) {
      const wmSize = 14 * scale;
      ctx.font = `${wmSize}px "IBM Plex Sans", sans-serif`;
      ctx.fillStyle = effectiveTextColor + '44';
      ctx.textAlign = 'right';
      ctx.fillText(watermark, W - pad * 0.5, H - pad * 0.4);
    }
  }, [verseText, reference, customSubtext, fontSize, refFontSize, textAlign, effectiveTextColor, effectiveAccentColor, watermark, selectedTemplate.layout]);

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = aspectRatio.width;
    const H = aspectRatio.height;
    canvas.width = W;
    canvas.height = H;

    const bgSrc = customBgImage || (selectedTemplate.type === 'image' ? selectedTemplate.bg : null);

    if (bgSrc) {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const scale = Math.max(W / img.width, H / img.height);
        const x = (W - img.width * scale) / 2;
        const y = (H - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        // Overlay
        ctx.fillStyle = `rgba(0,0,0,${effectiveOverlay})`;
        ctx.fillRect(0, 0, W, H);
        drawTextOnCanvas(ctx, W, H);
        setImageLoaded(true);
      };
      img.src = bgSrc;
    } else {
      // Gradient or solid
      const colorMatches = selectedTemplate.bg.match(/#[0-9a-fA-F]{6}/g) || [];
      if (colorMatches.length >= 2) {
        const isVert = selectedTemplate.bg.includes('180deg');
        const grad = isVert ? ctx.createLinearGradient(0, 0, 0, H) : ctx.createLinearGradient(0, 0, W, H);
        colorMatches.forEach((c, i) => grad.addColorStop(i / (colorMatches.length - 1), c));
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = selectedTemplate.bg;
      }
      ctx.fillRect(0, 0, W, H);
      drawTextOnCanvas(ctx, W, H);
    }
  }, [selectedTemplate, aspectRatio, customBgImage, effectiveOverlay, drawTextOnCanvas]);

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
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        toast.success('Image copied to clipboard!');
      }
    } catch {
      toast.error('Share failed — try downloading instead');
    }
  };

  // Group templates by category
  const categories = [...new Set(TEMPLATES.map(t => t.category))];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/">
          <Button variant="ghost" size="icon"><ArrowLeft size={18} /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Share the Truth</h1>
          <p className="text-sm text-muted-foreground">Create cinematic scripture images</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
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
          <Tabs defaultValue="template" className="w-full">
            <TabsList className="w-full grid grid-cols-3 rounded-t-lg rounded-b-none">
              <TabsTrigger value="template" className="gap-1.5 text-xs"><Palette size={14} />Templates</TabsTrigger>
              <TabsTrigger value="text" className="gap-1.5 text-xs"><Type size={14} />Text</TabsTrigger>
              <TabsTrigger value="image" className="gap-1.5 text-xs"><ImageIcon size={14} />Custom</TabsTrigger>
            </TabsList>

            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* TEMPLATE TAB */}
              <TabsContent value="template" className="mt-0 space-y-5">
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

                {categories.map(cat => (
                  <div key={cat} className="space-y-2">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">{cat}</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {TEMPLATES.filter(t => t.category === cat).map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setSelectedTemplate(t);
                            setCustomTextColor(null);
                            setCustomAccentColor(null);
                            setCustomBgImage(null);
                          }}
                          className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all group ${
                            selectedTemplate.id === t.id
                              ? 'border-primary ring-2 ring-primary/30 scale-[1.02]'
                              : 'border-border hover:border-muted-foreground'
                          }`}
                        >
                          {t.type === 'image' ? (
                            <img src={t.bg} alt={t.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <div className="absolute inset-0" style={{ background: t.bg }} />
                          )}
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                          <span className="absolute inset-0 flex items-end p-1.5">
                            <span className="text-[10px] font-semibold text-white leading-tight drop-shadow-lg">
                              {t.name}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Color overrides */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
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

                {selectedTemplate.type === 'image' && (
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Overlay Darkness: {Math.round(effectiveOverlay * 100)}%</Label>
                    <Slider value={[effectiveOverlay]} onValueChange={([v]) => setOverlayOpacity(v)} min={0} max={0.85} step={0.05} />
                  </div>
                )}
              </TabsContent>

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

              {/* CUSTOM IMAGE TAB */}
              <TabsContent value="image" className="mt-0 space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Upload Your Own Background</Label>
                  <Button variant="outline" className="w-full gap-2" onClick={() => fileInputRef.current?.click()}>
                    <ImageIcon size={14} /> Upload Image
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
                    💡 <strong>Tip:</strong> Upload landscape photos, ancient textures, or nature scenes. Use the overlay slider to darken for readability.
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
