tsParticles.load("tsparticles", {
  background: {
    color: {
      value: "#0d1117" // A dark, slightly blue-charcoal background
    }
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse" // Particles move away from the cursor
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: "#ffffff"
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.2, // Subtle links
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce"
      },
      random: false,
      speed: 0.5, // Slow, gentle movement
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80 // Number of particles
    },
    opacity: {
      value: 0.3 // Subtle particles
    },
    shape: {
      type: "circle"
    },
    size: {
      value: { min: 1, max: 3 }
    }
  },
  detectRetina: true
});
