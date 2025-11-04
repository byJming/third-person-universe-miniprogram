const CONFIG = {
  STAR_COUNT: 4000, SOLAR_SCALE: 70, MIN_STAR_SIZE: 0.2, MAX_STAR_SIZE: 3.0, MIN_SCALE: 0.2, MAX_SCALE: 15, ZOOM_SPEED: 0.12, TOOLTIP_DURATION: 4000, PLANET_SPEED_RATIO: 2000, PERSPECTIVE: 1200, DEPTH_RANGE: 8000, VIEW_ROTATE_SPEED: 0.001, ORBIT_TILT: 0.15
};
const STAR_NAMES = [
  '天狼星', '织女星', '牛郎星', '北极星', '北斗一(天枢)', '北斗二(天璇)', '北斗三(天玑)', '北斗四(天权)', '北斗五(玉衡)', '北斗六(开阳)', '北斗七(摇光)', '南门二', '大角星', '心宿二', '参宿四', '参宿七', '天津四', '老人星', '水委一', '马腹一', '十字架二', '轩辕十四', '角宿一', '毕宿五', '五车二'
];
const PLANET_DATA = [
  { name: '太阳', color: '#FFDB58', radius: 6.0, orbit: 0, speed: 0, type: '恒星', desc: '太阳系中心天体，黄矮星，表面温度5500℃，占太阳系总质量的99.86%' },
  { name: '水星', color: '#8B7355', radius: 1.2, orbit: 0.39, speed: 47.87, type: '行星', desc: '太阳系最小行星，无大气层，表面温差极大（-173℃~427℃）' },
  { name: '金星', color: '#DAA520', radius: 1.5, orbit: 0.72, speed: 35.02, type: '行星', desc: '太阳系最热行星，表面温度462℃，大气层以二氧化碳为主，有强烈温室效应' },
  { name: '地球', color: '#1E90FF', radius: 1.6, orbit: 1.0, speed: 29.78, type: '行星', desc: '唯一有液态水和生命的行星，有一颗天然卫星（月球），大气层含21%氧气' },
  { name: '火星', color: '#CD5C5C', radius: 1.3, orbit: 1.52, speed: 24.13, type: '行星', desc: '红色行星，表面有氧化铁（铁锈），有稀薄大气层，两极有冰盖' },
  { name: '木星', color: '#B8860B', radius: 4.5, orbit: 5.2, speed: 13.07, type: '行星', desc: '太阳系最大行星，气态巨行星，质量是其他行星总和的2.5倍，有著名的大红斑' },
  { name: '土星', color: '#DEB887', radius: 4.0, orbit: 9.54, speed: 9.69, type: '行星', desc: '气态巨行星，以美丽的光环闻名，光环由冰粒和岩石碎片组成' },
  { name: '天王星', color: '#4682B4', radius: 2.8, orbit: 19.2, speed: 6.81, type: '行星', desc: '冰巨行星，自转轴倾斜98°，表面温度-216℃，大气层含甲烷（呈蓝色）' },
  { name: '海王星', color: '#191970', radius: 2.7, orbit: 30.07, speed: 5.43, type: '行星', desc: '太阳系最远行星，冰巨行星，表面风速达2100km/h，是太阳系风速最快的行星' }
];
const SPECIAL_CELESTIALS = [
  { name: '天鹅座X-1（黑洞）', color: '#000000', radius: 3.5, x: 1200, y: -800, z: -500, type: '黑洞', rotationSpeed: 0.003, desc: '首个被确认的黑洞，质量约14倍太阳质量，吸积盘温度高达数百万℃，会扭曲时空' },
  { name: '类星体3C 273（白洞模拟）', color: '#F0F8FF', radius: 4.0, x: -1500, y: 1000, z: 300, type: '白洞', rotationSpeed: 0.002, desc: '理论天体，与黑洞相反，向外喷射物质和能量，是宇宙中最亮的天体之一' },
  { name: 'PSR J1748-2446ad（中子星）', color: '#B22222', radius: 1.8, x: 800, y: 1200, z: -800, type: '中子星', rotationSpeed: 0.005, desc: '已知自转最快的中子星，密度极高（1立方厘米约10亿吨），有超强磁场' },
  { name: '蟹状星云（超新星遗迹）', color: '#FF69B4', radius: 8.0, x: -1000, y: -1200, z: 500, type: '星云', rotationSpeed: 0.0005, desc: '1054年超新星爆发遗迹，中心有中子星，呈纤维状结构，距离地球约6500光年' },
  { name: '猎户座星云（M42）', color: '#1E90FF', radius: 10.0, x: 1500, y: -1500, z: -1000, type: '星云', rotationSpeed: 0.0003, desc: '距离地球最近的恒星形成区，亮度极高，肉眼可见，包含数千颗年轻恒星' }
];

class Star {
  constructor() { this.init(); }
  init() { this.x = (Math.random() - 0.5) * CONFIG.DEPTH_RANGE * 2; this.y = (Math.random() - 0.5) * CONFIG.DEPTH_RANGE * 2; this.z = (Math.random() - 0.5) * CONFIG.DEPTH_RANGE * 2; this.size = Math.random() * (CONFIG.MAX_STAR_SIZE - CONFIG.MIN_STAR_SIZE) + CONFIG.MIN_STAR_SIZE; this.baseBrightness = Math.random() * 0.6 + 0.4; this.brightness = this.baseBrightness; this.name = STAR_NAMES[Math.floor(Math.random() * STAR_NAMES.length)]; this.type = '恒星'; this.desc = '普通恒星，通过氢核聚变产生能量，是宇宙中最常见的天体'; this.temp = Math.random() * 10000 + 3000; this.color = this.getStarColor(); }
  getStarColor() { if (this.temp > 10000) return '#87CEFA'; if (this.temp > 7000) return '#F0F8FF'; if (this.temp > 5000) return '#FFFFE0'; if (this.temp > 4000) return '#FFD700'; if (this.temp > 3000) return '#FFA500'; return '#FF6347'; }
  draw(ctx, project3D, width, height) { const { x, y, size, visible } = project3D(this.x, this.y, this.z); if (!visible) return; const drawSize = this.size * size; const depthBrightness = this.brightness * (1 - Math.abs(this.z) / CONFIG.DEPTH_RANGE * 0.8); if (x < -50 || x > width + 50 || y < -50 || y > height + 50 || drawSize < 0.05) return; const flickerChance = this.temp < 4000 ? 0.97 : 0.99; if (Math.random() > flickerChance) { this.brightness = Math.max(0.3, Math.min(1.3, this.brightness + (Math.random() - 0.5) * 0.2)); } ctx.beginPath(); ctx.arc(x, y, drawSize, 0, Math.PI * 2); const alpha = Math.floor(depthBrightness * 255).toString(16).padStart(2, '0'); ctx.fillStyle = `${this.color}${alpha}`; ctx.fill(); if (this.size > 2.0 && Math.abs(this.z) < CONFIG.DEPTH_RANGE * 0.3) { ctx.beginPath(); ctx.arc(x, y, drawSize * 3, 0, Math.PI * 2); ctx.fillStyle = `${this.color}10`; ctx.fill(); } }
  isClicked(clickX, clickY, project3D) { const { x, y, size, visible } = project3D(this.x, this.y, this.z); if (!visible) return false; const drawSize = this.size * size; const detectionRadius = drawSize + (size > 0.8 ? 15 : 10); return Math.hypot(clickX - x, clickY - y) < detectionRadius; }
}

class Planet {
  constructor(data) { this.name = data.name; this.color = data.color; this.radius = data.radius; this.orbit = data.orbit * CONFIG.SOLAR_SCALE; this.speed = (data.speed / CONFIG.PLANET_SPEED_RATIO) * 0.6; this.angle = Math.random() * Math.PI * 2; this.isSun = data.name === '太阳'; this.type = data.type; this.desc = data.desc; this.rotationAngle = 0; this.rotationSpeed = this.isSun ? 0.002 : (Math.random() * 0.001 + 0.0005); }
  update() { if (this.speed > 0) { this.angle += this.speed; if (this.angle > Math.PI * 2) this.angle -= Math.PI * 2; } this.rotationAngle += this.rotationSpeed; if (this.rotationAngle > Math.PI * 2) this.rotationAngle -= Math.PI * 2; }
  draw(ctx, project3D, scale) { const sunX = 0; const sunY = 0; const sunZ = 0; const planetX = sunX + Math.cos(this.angle) * this.orbit; const planetY = sunY + Math.sin(this.angle) * this.orbit * Math.cos(CONFIG.ORBIT_TILT); const planetZ = sunZ + Math.sin(this.angle) * this.orbit * Math.sin(CONFIG.ORBIT_TILT); const sunProj = project3D(sunX, sunY, sunZ); const planetProj = project3D(planetX, planetY, planetZ); if (!sunProj.visible || !planetProj.visible) return; if (!this.isSun && scale > 0.4) { ctx.beginPath(); for (let i = 0; i <= 100; i++) { const ang = (i / 100) * Math.PI * 2; const orbX = Math.cos(ang) * this.orbit; const orbY = Math.sin(ang) * this.orbit * Math.cos(CONFIG.ORBIT_TILT); const orbZ = Math.sin(ang) * this.orbit * Math.sin(CONFIG.ORBIT_TILT); const orbProj = project3D(orbX, orbY, orbZ); if (i === 0) ctx.moveTo(orbProj.x, orbProj.y); else ctx.lineTo(orbProj.x, orbProj.y); } const orbitAlpha = Math.min(0.4, planetProj.size * 1.2); ctx.strokeStyle = `rgba(255,255,255,${orbitAlpha})`; ctx.lineWidth = Math.max(0.2, 0.6 * sunProj.size); ctx.stroke(); } const targetProj = this.isSun ? sunProj : planetProj; const drawRadius = this.radius * targetProj.size; ctx.beginPath(); ctx.arc(targetProj.x, targetProj.y, drawRadius, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); this.drawSurfaceDetails(ctx, targetProj, drawRadius); if (this.isSun) { const sunBrightness = 1 - Math.abs(sunZ) / CONFIG.DEPTH_RANGE * 0.6; ctx.beginPath(); ctx.arc(sunProj.x, sunProj.y, drawRadius * 2.2, 0, Math.PI * 2); ctx.fillStyle = `#FFA500${Math.floor(sunBrightness * 60).toString(16).padStart(2,'0')}`; ctx.fill(); ctx.beginPath(); ctx.arc(sunProj.x, sunProj.y, drawRadius * 3.8, 0, Math.PI * 2); ctx.fillStyle = `#FFFFE0${Math.floor(sunBrightness * 25).toString(16).padStart(2,'0')}`; ctx.fill(); } if (this.name === '土星' && scale > 0.6 && planetProj.size > 0.3) { ctx.save(); const proj = planetProj; ctx.translate(proj.x, proj.y); const tilt = this.angle * CONFIG.ORBIT_TILT + Math.PI / 6; ctx.rotate(tilt); ctx.beginPath(); ctx.ellipse(0, 0, drawRadius * 3.2, drawRadius * 0.8, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(245,245,220,0.35)'; ctx.fill(); ctx.beginPath(); ctx.ellipse(0, 0, drawRadius * 2.8, drawRadius * 0.7, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fill(); ctx.beginPath(); ctx.ellipse(0, 0, drawRadius * 2.7, drawRadius * 0.65, 0, 0, Math.PI * 2); ctx.fillStyle = 'rgba(210,180,140,0.5)'; ctx.fill(); for (let i = 0; i < 6; i++) { const angle1 = (i / 6) * Math.PI * 2; const angle2 = ((i + 0.8) / 6) * Math.PI * 2; ctx.beginPath(); ctx.arc(0, 0, drawRadius * 3.0, angle1, angle2); ctx.arc(0, 0, drawRadius * 2.7, angle2, angle1, true); ctx.closePath(); ctx.fillStyle = 'rgba(160,82,45,0.2)'; ctx.fill(); } ctx.restore(); } }
  drawSurfaceDetails(ctx, proj, radius) { if (this.isSun) { for (let i = 0; i < 5; i++) { const sX = proj.x + (Math.random() - 0.5) * radius * 1.5; const sY = proj.y + (Math.random() - 0.5) * radius * 1.5; const sSize = radius * (Math.random() * 0.2 + 0.1); ctx.beginPath(); ctx.arc(sX, sY, sSize, 0, Math.PI * 2); ctx.fillStyle = 'rgba(30,30,30,0.4)'; ctx.fill(); } } else if (this.name === '地球') { ctx.save(); ctx.beginPath(); ctx.arc(proj.x, proj.y, radius, 0, Math.PI * 2); ctx.clip(); ctx.fillStyle = '#1E90FF'; ctx.fillRect(proj.x - radius, proj.y - radius, radius * 2, radius * 2); ctx.fillStyle = '#228B22'; ctx.rotate(this.rotationAngle); ctx.beginPath(); ctx.moveTo(proj.x - radius * 0.6, proj.y - radius * 0.3); ctx.bezierCurveTo(proj.x - radius * 0.2, proj.y - radius * 0.7, proj.x + radius * 0.5, proj.y - radius * 0.4, proj.x + radius * 0.7, proj.y + radius * 0.1); ctx.bezierCurveTo(proj.x + radius * 0.3, proj.y + radius * 0.6, proj.x - radius * 0.4, proj.y + radius * 0.5, proj.x - radius * 0.6, proj.y - radius * 0.3); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.beginPath(); ctx.arc(proj.x + radius * 0.3, proj.y - radius * 0.4, radius * 0.5, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } else if (this.name === '木星') { const stripeCount = 8; for (let i = 0; i < stripeCount; i++) { const yOffset = (i / stripeCount - 0.5) * radius * 2; const h = (radius * 2) / stripeCount; const color = i % 2 === 0 ? '#B8860B' : '#A0522D'; ctx.fillStyle = color; ctx.fillRect(proj.x - radius, proj.y + yOffset, radius * 2, h); } ctx.fillStyle = 'rgba(150,40,20,0.7)'; ctx.beginPath(); ctx.ellipse(proj.x + radius * 0.4, proj.y, radius * 0.3, radius * 0.5, Math.PI / 6, 0, Math.PI * 2); ctx.fill(); } else if (this.name === '火星') { ctx.beginPath(); ctx.arc(proj.x, proj.y, radius, 0, Math.PI * 2); ctx.fillStyle = '#CD5C5C'; ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.beginPath(); ctx.arc(proj.x - radius * 0.5, proj.y - radius * 0.5, radius * 0.3, 0, Math.PI * 2); ctx.fill(); } }
  isClicked(clickX, clickY, project3D) { const sunX = 0; const sunY = 0; const sunZ = 0; const planetX = sunX + Math.cos(this.angle) * this.orbit; const planetY = sunY + Math.sin(this.angle) * this.orbit * Math.cos(CONFIG.ORBIT_TILT); const planetZ = sunZ + Math.sin(this.angle) * this.orbit * Math.sin(CONFIG.ORBIT_TILT); const proj = this.isSun ? project3D(sunX, sunY, sunZ) : project3D(planetX, planetY, planetZ); if (!proj.visible) return false; const drawRadius = this.radius * proj.size; const detectionRadius = this.isSun ? drawRadius + 30 * proj.size : drawRadius + 25 * proj.size; return Math.hypot(clickX - proj.x, clickY - proj.y) < detectionRadius; }
}

class SpecialCelestial {
  constructor(data) { this.name = data.name; this.color = data.color; this.radius = data.radius; this.x = data.x; this.y = data.y; this.z = data.z; this.type = data.type; this.desc = data.desc; this.rotationSpeed = data.rotationSpeed; this.rotationAngle = 0; this.particleTimer = 0; this.particleSpeed = 0.02; }
  update() { this.rotationAngle += this.rotationSpeed; if (this.rotationAngle > Math.PI * 2) this.rotationAngle -= Math.PI * 2; this.particleTimer += this.particleSpeed; if (this.particleTimer > Math.PI * 2) this.particleTimer = 0; }
  draw(ctx, project3D) { const proj = project3D(this.x, this.y, this.z); if (!proj.visible) return; const drawRadius = this.radius * proj.size; switch (this.type) { case '黑洞': this.drawBlackHole(ctx, proj, drawRadius); break; case '白洞': this.drawWhiteHole(ctx, proj, drawRadius); break; case '中子星': this.drawNeutronStar(ctx, proj, drawRadius); break; case '星云': this.drawNebula(ctx, proj, drawRadius); break; } }
  drawBlackHole(ctx, proj, radius) { ctx.save(); ctx.translate(proj.x, proj.y); ctx.rotate(this.rotationAngle); const diskRadius = radius * 3; const gradient = ctx.createRadialGradient(0, 0, radius, 0, 0, diskRadius); gradient.addColorStop(0.3, 'rgba(255,69,0,0.1)'); gradient.addColorStop(0.6, 'rgba(255,165,0,0.3)'); gradient.addColorStop(0.8, 'rgba(255,215,0,0.2)'); gradient.addColorStop(1.0, 'rgba(255,255,255,0)'); ctx.beginPath(); ctx.arc(0, 0, diskRadius, 0, Math.PI * 2); ctx.fillStyle = gradient; ctx.fill(); ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.fillStyle = '#000'; ctx.fill(); ctx.beginPath(); ctx.arc(0, 0, radius * 1.2, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 0.5 * proj.size; ctx.stroke(); ctx.restore(); for (let i = 0; i < 8; i++) { const angle = this.rotationAngle + (i / 8) * Math.PI * 2; const dist = radius * (Math.random() * 1.5 + 1.2); const particleX = proj.x + Math.cos(angle) * dist; const particleY = proj.y + Math.sin(angle) * dist; const particleSize = radius * (Math.random() * 0.3 + 0.1); const colorRatio = dist / (radius * 2.7); const r = 255; const g = Math.floor(255 * colorRatio); const b = Math.floor(50 * colorRatio); ctx.beginPath(); ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2); ctx.fillStyle = `rgba(${r},${g},${b},0.6)`; ctx.fill(); } }
  drawWhiteHole(ctx, proj, radius) { ctx.beginPath(); ctx.arc(proj.x, proj.y, radius, 0, Math.PI * 2); const gradient = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, radius); gradient.addColorStop(0, '#FFFFFF'); gradient.addColorStop(0.7, '#F0F8FF'); gradient.addColorStop(1.0, '#87CEFA'); ctx.fillStyle = gradient; ctx.fill(); ctx.save(); ctx.translate(proj.x, proj.y); ctx.rotate(this.rotationAngle); ctx.beginPath(); ctx.moveTo(0, -radius * 2); ctx.lineTo(-radius * 0.8, -radius * 5); ctx.lineTo(radius * 0.8, -radius * 5); ctx.closePath(); ctx.fillStyle = 'rgba(135,206,250,0.4)'; ctx.fill(); ctx.beginPath(); ctx.moveTo(0, radius * 2); ctx.lineTo(-radius * 0.8, radius * 5); ctx.lineTo(radius * 0.8, radius * 5); ctx.closePath(); ctx.fillStyle = 'rgba(135,206,250,0.4)'; ctx.fill(); ctx.restore(); for (let i = 0; i < 10; i++) { const angle = this.particleTimer + (i / 10) * Math.PI * 2; const dist = radius * (Math.random() * 4 + 2); const particleX = proj.x + Math.cos(angle) * dist; const particleY = proj.y + Math.sin(angle) * dist; const particleSize = radius * (Math.random() * 0.4 + 0.1); const colorRatio = 1 - (dist / (radius * 6)); ctx.beginPath(); ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,${Math.floor(200 + 55 * colorRatio)},0.7)`; ctx.fill(); } }
  drawNeutronStar(ctx, proj, radius) { ctx.beginPath(); ctx.arc(proj.x, proj.y, radius, 0, Math.PI * 2); const gradient = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, radius); gradient.addColorStop(0, '#FF4500'); gradient.addColorStop(0.8, '#B22222'); gradient.addColorStop(1.0, '#8B0000'); ctx.fillStyle = gradient; ctx.fill(); ctx.save(); ctx.translate(proj.x, proj.y); ctx.rotate(this.rotationAngle); ctx.beginPath(); ctx.arc(0, -radius * 0.6, radius * 0.3, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fill(); ctx.beginPath(); ctx.arc(0, radius * 0.6, radius * 0.3, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fill(); if (Math.sin(this.rotationAngle * 20) > 0.8) { ctx.beginPath(); ctx.moveTo(0, -radius * 0.6); ctx.lineTo(-radius * 2, -radius * 4); ctx.lineTo(radius * 2, -radius * 4); ctx.closePath(); ctx.fillStyle = 'rgba(173,216,230,0.3)'; ctx.fill(); } ctx.restore(); }
  drawNebula(ctx, proj, radius) { for (let i = 0; i < 3; i++) { const cloudRadius = radius * (Math.random() * 0.5 + 0.8); const cloudX = proj.x + (Math.random() - 0.5) * radius * 0.5; const cloudY = proj.y + (Math.random() - 0.5) * radius * 0.5; ctx.beginPath(); ctx.arc(cloudX, cloudY, cloudRadius, 0, Math.PI * 2); const alpha = Math.floor(Math.random() * 30 + 20).toString(16).padStart(2,'0'); const mixColor = this.name.includes('蟹状') ? `rgba(255,105,180,${parseInt(alpha, 16)/255})` : `rgba(30,144,255,${parseInt(alpha, 16)/255})`; ctx.fillStyle = mixColor; ctx.fill(); } const starCount = Math.floor(Math.random() * 5 + 3); for (let i = 0; i < starCount; i++) { const starX = proj.x + (Math.random() - 0.5) * radius * 1.2; const starY = proj.y + (Math.random() - 0.5) * radius * 1.2; const starSize = radius * (Math.random() * 0.3 + 0.1); ctx.beginPath(); ctx.arc(starX, starY, starSize, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fill(); } }
  isClicked(clickX, clickY, project3D) { const proj = project3D(this.x, this.y, this.z); if (!proj.visible) return false; const drawRadius = this.radius * proj.size; const detectionRadius = drawRadius + 30 * proj.size; return Math.hypot(clickX - proj.x, clickY - proj.y) < detectionRadius; }
}

Page({
  data: {
      loading: { show: true, text: '加载真实宇宙...' },
      tooltip: { show: false, name: '', type: '', desc: '', left: 0, top: 0 }
  },

  onUnload() {
      if (this.animationFrameId) {
          this.canvas.cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
      }
      if (this.tooltipTimer) {
          clearTimeout(this.tooltipTimer);
          this.tooltipTimer = null;
      }
  },

  onLoad: function () {
      this.stars = []; this.solarSystem = []; this.specialCelestials = []; this.scale = 1; this.viewAngle = 0; this.viewDistance = 2000; this.isDragging = false; this.lastX = 0; this.lastY = 0; this.touchDist = 0; this.lastScale = 1;
      
      const windowInfo = wx.getWindowInfo();
      this.width = windowInfo.windowWidth;
      this.height = windowInfo.windowHeight;
      this.devicePixelRatio = windowInfo.pixelRatio;
  },

  onReady: function () {
      const query = wx.createSelectorQuery();
      query.select('#universe').node().exec((res) => {
          if (!res[0] || !res[0].node) {
              console.error("无法获取 Canvas 节点");
              return;
          }
          const canvas = res[0].node;
          this.canvas = canvas;
          const ctx = canvas.getContext('2d');
          this.ctx = ctx;

          canvas.width = this.width * this.devicePixelRatio;
          canvas.height = this.height * this.devicePixelRatio;
          ctx.scale(this.devicePixelRatio, this.devicePixelRatio);

          this.project3D = (x, y, z) => {
              const cosA = Math.cos(this.viewAngle);
              const sinA = Math.sin(this.viewAngle);
              const rotatedX = x * cosA - z * sinA;
              const rotatedZ = x * sinA + z * cosA;
              const depth = this.viewDistance - rotatedZ;
              const factor = CONFIG.PERSPECTIVE / (CONFIG.PERSPECTIVE + depth);
              const screenX = this.width / 2 + rotatedX * factor * this.scale;
              const screenY = this.height / 2 + y * factor * this.scale;
              return { x: screenX, y: screenY, size: factor, visible: factor > 0.008 && depth > 0 };
          };
          
          this.initUniverse();
          this.animate();
      });
  },

  initUniverse() {
      this.stars = Array.from({ length: CONFIG.STAR_COUNT }, () => new Star());
      this.solarSystem = PLANET_DATA.map(data => new Planet(data));
      this.specialCelestials = SPECIAL_CELESTIALS.map(data => new SpecialCelestial(data));
      setTimeout(() => { this.setData({ 'loading.show': false }); }, 1500);
  },

  animate() {
      this.ctx.fillStyle = '#000008';
      this.ctx.fillRect(0, 0, this.width, this.height);
      if (!this.isDragging) { this.viewAngle += CONFIG.VIEW_ROTATE_SPEED; }

      const cosA = Math.cos(this.viewAngle);
      const sinA = Math.sin(this.viewAngle);
      this.stars.sort((a, b) => (b.x * sinA + b.z * cosA) - (a.x * sinA + a.z * cosA));
      
      this.stars.forEach(star => star.draw(this.ctx, this.project3D, this.width, this.height));
      this.specialCelestials.forEach(celestial => { celestial.update(); celestial.draw(this.ctx, this.project3D); });
      this.solarSystem.forEach(planet => { planet.update(); planet.draw(this.ctx, this.project3D, this.scale); });
      
      this.animationFrameId = this.canvas.requestAnimationFrame(this.animate.bind(this));
  },

  handleTouchStart(e) {
      const touches = e.touches;
      if (touches.length === 1) { this.isDragging = true; this.lastX = touches[0].x; this.lastY = touches[0].y; } 
      else if (touches.length === 2) { this.isDragging = false; this.touchDist = Math.hypot(touches[1].x - touches[0].x, touches[1].y - touches[0].y); this.lastScale = this.scale; }
  },

  handleTouchMove(e) {
      const touches = e.touches;
      if (touches.length === 1 && this.isDragging) { const deltaX = touches[0].x - this.lastX; this.viewAngle += deltaX * 0.005; this.lastX = touches[0].x; this.lastY = touches[0].y; } 
      else if (touches.length === 2) { const newDist = Math.hypot(touches[1].x - touches[0].x, touches[1].y - touches[0].y); this.scale = Math.max(CONFIG.MIN_SCALE, Math.min(CONFIG.MAX_SCALE, this.lastScale * (newDist / this.touchDist))); }
  },

  handleTouchEnd() { this.isDragging = false; this.touchDist = 0; },

  handleClick(e) {
      const clickX = e.detail.x; const clickY = e.detail.y; let target = null;
      
      const findTarget = (list) => {
          for (const item of list) {
              if (item.isClicked(clickX, clickY, this.project3D)) return item;
          }
          return null;
      };

      target = findTarget(this.specialCelestials) || findTarget(this.solarSystem);

      if (!target) {
          const clickableStars = this.stars
              .map(star => ({ star, proj: this.project3D(star.x, star.y, star.z) }))
              .filter(({ proj }) => proj.visible && proj.size > 0.4)
              .sort((a, b) => b.proj.size - a.proj.size);
          
          for (const { star } of clickableStars) {
              if (star.isClicked(clickX, clickY, this.project3D)) {
                  target = star;
                  break;
              }
          }
      }
      
      if (target) {
          const tooltipWidth = 280;
          const tooltipHeight = 120;
          const margin = 15;

          let left = clickX + margin;
          let top = clickY + margin;

          if (left + tooltipWidth > this.width) {
              left = clickX - tooltipWidth - margin;
          }
          if (left < 0) {
              left = margin;
          }

          if (top + tooltipHeight > this.height) {
              top = clickY - tooltipHeight - margin;
          }
          if (top < 0) {
              top = margin;
          }

          this.setData({ tooltip: { show: true, name: target.name, type: target.type, desc: target.desc, left, top } });
          if (this.tooltipTimer) clearTimeout(this.tooltipTimer);
          this.tooltipTimer = setTimeout(() => { this.setData({ 'tooltip.show': false }); }, CONFIG.TOOLTIP_DURATION);
      } else { this.setData({ 'tooltip.show': false }); }
  }
});