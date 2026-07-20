// Dynamic sound synthesizer using the Web Audio API
// No static files needed - everything is procedurally generated!

class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  private isMuted: boolean = true;
  private isMusicPlaying: boolean = false;
  private synthInterval: any = null;

  init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime); // default moderate volume
      this.isMuted = false;
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  setMute(mute: boolean) {
    this.isMuted = mute;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(mute ? 0 : 0.3, this.ctx.currentTime);
    }
    if (!mute && !this.isMusicPlaying) {
      this.startAmbientMusic();
    }
  }

  toggleMute(): boolean {
    this.init();
    this.setMute(!this.isMuted);
    return this.isMuted;
  }

  getMuteState() {
    return this.isMuted;
  }

  // Plays a sci-fi mechanical click
  playClick() {
    if (this.isMuted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
    
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    
    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Keypress keyboard sounds
  playType() {
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150 + Math.random() * 300, now);
    
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    
    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Hologram or scan radar sweep sound
  playScan() {
    if (this.isMuted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 1.2);
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    
    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(now);
    osc.stop(now + 1.3);
  }

  // Error/Access Denied alarm
  playError() {
    if (this.isMuted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    
    osc1.frequency.setValueAtTime(110, now);
    osc2.frequency.setValueAtTime(111.5, now);
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain!);
    
    osc1.start(now);
    osc2.start(now);
    
    osc1.stop(now + 0.4);
    osc2.stop(now + 0.4);
  }

  // Access Granted / Success chimes
  playSuccess() {
    if (this.isMuted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const o = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, now + idx * 0.1);
      
      g.gain.setValueAtTime(0.08, now + idx * 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4);
      
      o.connect(g);
      g.connect(this.masterGain!);
      
      o.start(now + idx * 0.1);
      o.stop(now + idx * 0.1 + 0.5);
    });
  }

  // Memory Crystal or Folder shattered explosion
  playExplode() {
    if (this.isMuted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Create Noise Buffer
    const bufferSize = this.ctx.sampleRate * 1.5; // 1.5 seconds
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    // Bandpass Filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(80, now + 1.2);
    filter.Q.setValueAtTime(5, now);
    
    // Volume envelope
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
    
    // Low frequency sub boom
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(100, now);
    subOsc.frequency.exponentialRampToValueAtTime(20, now + 0.4);
    subGain.gain.setValueAtTime(0.3, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);
    
    subOsc.connect(subGain);
    subGain.connect(this.masterGain!);
    
    noise.start(now);
    subOsc.start(now);
    
    noise.stop(now + 1.5);
    subOsc.stop(now + 0.5);
  }

  // Spaceship Rocket Launch thrusters
  playRocketLaunch() {
    if (this.isMuted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Noise source for rushing engine air
    const bufferSize = this.ctx.sampleRate * 4; // 4 seconds
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150, now);
    filter.frequency.exponentialRampToValueAtTime(2000, now + 3);
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 1.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 4);
    
    // Dynamic drone
    const drone = this.ctx.createOscillator();
    drone.type = 'sawtooth';
    drone.frequency.setValueAtTime(50, now);
    drone.frequency.linearRampToValueAtTime(120, now + 3);
    
    const droneFilter = this.ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(100, now);
    
    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.01, now);
    droneGain.gain.linearRampToValueAtTime(0.3, now + 1.5);
    droneGain.gain.exponentialRampToValueAtTime(0.001, now + 4);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);
    
    drone.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.masterGain!);
    
    noise.start(now);
    drone.start(now);
    
    noise.stop(now + 4);
    drone.stop(now + 4);
  }

  // Thunder Sound (Lightning Strike)
  playThunder() {
    if (this.isMuted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Crack noise
    const bufferSize = this.ctx.sampleRate * 2.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(40, now + 1.5);
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);
    
    noise.start(now);
    noise.stop(now + 2.5);
  }

  // Arcade beep for jumping/hitting inside the mini arcade game
  playArcadeBeep(type: 'jump' | 'score' | 'gameover') {
    if (this.isMuted || !this.ctx) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'square';
    if (type === 'jump') {
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    } else if (type === 'score') {
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    } else {
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.4);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    }
    
    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(now);
    osc.stop(now + 0.42);
  }

  // Synthesized Cyber Ambient Looping Music
  // Plays custom warm cyberpunk chords procedurally
  startAmbientMusic() {
    if (this.isMusicPlaying || !this.ctx) return;
    this.isMusicPlaying = true;
    this.init();
    
    const playChord = (frequencies: number[], duration: number) => {
      if (this.isMuted || !this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      
      frequencies.forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const filter = this.ctx!.createBiquadFilter();
        const gain = this.ctx!.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        
        // Soft frequency modulation for tape flutter / analog synth feel
        osc.frequency.linearRampToValueAtTime(freq + Math.random() * 2 - 1, now + duration);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(250 + Math.random() * 50, now);
        
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.linearRampToValueAtTime(0.02, now + 0.5); // attack
        gain.gain.linearRampToValueAtTime(0.015, now + duration - 0.5); // sustain
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration); // release
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);
        
        osc.start(now);
        osc.stop(now + duration);
      });
    };

    // Progression of ambient cosmic cyberpunk chords (Root, 3rd, 5th, 7th)
    const progressions = [
      [110.00, 220.00, 261.63, 329.63, 392.00], // Am7 (A2, A3, C4, E4, G4)
      [116.54, 233.08, 277.18, 349.23, 415.30], // A#m7 (A#2, A#3, C#4, F4, G#4)
      [130.81, 261.63, 311.13, 392.00, 466.16], // Cm7 (C3, C4, D#4, G4, A#4)
      [98.00, 196.00, 246.94, 293.66, 349.23]    // G7 (G2, G3, B3, D4, F4)
    ];
    
    let index = 0;
    const intervalTime = 6000; // 6 seconds per chord
    
    const loop = () => {
      const chord = progressions[index];
      playChord(chord, intervalTime / 1000);
      index = (index + 1) % progressions.length;
    };
    
    loop(); // play first chord
    this.synthInterval = setInterval(loop, intervalTime);
  }

  stopAmbientMusic() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.isMusicPlaying = false;
  }
}

export const audio = new AudioManager();
