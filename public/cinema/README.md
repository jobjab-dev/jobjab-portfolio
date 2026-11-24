# Custom Single-Shot Cinema Video Backdrop (Opt-In)

By default, Jobjab Studio renders a 100% continuous, zero-cut 60fps Three.js WebGL2 3D anime world directly in the browser (`components/cinema/Jobjab3DWorld.tsx`).

If you generate a real continuous single-shot AI video (for example with Google Veo 3, Kling, or Runway), you can plug it directly into the scroll-scrubbed engine:

1. Encode your video with frequent keyframes so browser scroll seeking stays instant:
   ```bash
   ffmpeg -i raw.mp4 -vf scale=1920:-2 -c:v libx264 -g 8 -keyint_min 8 -movflags +faststart -an public/cinema/jobjab-walk.mp4
   ```
2. Place the file at `public/cinema/jobjab-walk.mp4`.
3. Set in `.env.local` and Vercel Environment Variables:
   ```env
   NEXT_PUBLIC_CINEMA_VIDEO_URL=/cinema/jobjab-walk.mp4
   ```

## Ready-to-Paste Single-Continuous-Shot Prompt (Veo / Kling / Runway)

> One continuous unbroken 16:9 first-person steadicam walkthrough shot at 1.65m eye-level, hand-painted Makoto Shinkai anime gouache style, no cuts or dissolves. Starting in sunlit autumn morning walking straight through a stone studio gate, gliding smoothly past six glowing architectural glass exhibition frames showing minimalist typography cards and waveforms, continuing as the sky warms into golden hour above translucent amber and cyan trading depth towers, passing futuristic wireframe polyhedron sculptures along a twilight harbor promenade, arriving at a dark bay suspension bridge anchored by a glowing amber homomorphic encryption octahedron crystal lattice under stars, and pushing smoothly forward through floor-to-ceiling midnight glass doors into a serene studio overlooking rain-lit towers with a warm amber desk lamp glowing on dark wood. Smooth steady forward motion, zero baked text or watermarks.
