
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CloudBackgroundProps {
  className?: string;
}

const CloudBackground = ({ className }: CloudBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    nodes: THREE.Mesh[];
    connections: THREE.Line[];
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const isMobile = window.innerWidth < 768;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: "low-power"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 50;

    // Cloud nodes
    const nodes: THREE.Mesh[] = [];
    const nodeCount = isMobile ? 8 : 12;
    const nodeGeometry = new THREE.SphereGeometry(0.8, 8, 8);
    
    for (let i = 0; i < nodeCount; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: 0x00c2ff,
        transparent: true,
        opacity: Math.random() * 0.15 + 0.1
      });
      
      const node = new THREE.Mesh(nodeGeometry, material);
      node.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20
      );
      
      // Store initial position for animation
      node.userData = {
        initialPos: node.position.clone(),
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.2
      };
      
      scene.add(node);
      nodes.push(node);
    }

    // Node connections
    const connections: THREE.Line[] = [];
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.08
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < 15 && Math.random() > 0.6) {
          const points = [nodes[i].position, nodes[j].position];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, connectionMaterial.clone());
          line.userData = {
            phase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.8 + Math.random() * 0.4
          };
          scene.add(line);
          connections.push(line);
        }
      }
    }

    // Tech symbols (floating glyphs)
    const symbols = ['{}', '</>', 'λ', '⬢'];
    const symbolMeshes: THREE.Mesh[] = [];
    
    if (!isMobile) {
      symbols.forEach((symbol, index) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d')!;
        canvas.width = 64;
        canvas.height = 64;
        
        context.fillStyle = '#00c2ff';
        context.font = '32px monospace';
        context.textAlign = 'center';
        context.fillText(symbol, 32, 40);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.15
        });
        
        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 15
        );
        
        mesh.userData = {
          initialPos: mesh.position.clone(),
          phase: Math.random() * Math.PI * 2,
          speed: 0.1 + Math.random() * 0.1
        };
        
        scene.add(mesh);
        symbolMeshes.push(mesh);
      });
    }

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      if (isMobile) return;
      
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Subtle camera movement for parallax
      camera.position.x = mouse.x * 2;
      camera.position.y = mouse.y * 2;
      camera.lookAt(0, 0, 0);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      // Animate nodes
      nodes.forEach((node) => {
        const { initialPos, phase, speed } = node.userData;
        node.position.x = initialPos.x + Math.sin(time * speed + phase) * 2;
        node.position.y = initialPos.y + Math.cos(time * speed + phase * 1.2) * 1.5;
        node.position.z = initialPos.z + Math.sin(time * speed * 0.5 + phase) * 1;
      });

      // Animate connections (pulsing opacity)
      connections.forEach((connection) => {
        const { phase, pulseSpeed } = connection.userData;
        const opacity = 0.05 + Math.sin(time * pulseSpeed + phase) * 0.03;
        connection.material.opacity = Math.max(0.02, opacity);
      });

      // Animate tech symbols
      symbolMeshes.forEach((mesh) => {
        const { initialPos, phase, speed } = mesh.userData;
        mesh.position.x = initialPos.x + Math.sin(time * speed + phase) * 1;
        mesh.position.y = initialPos.y + Math.cos(time * speed + phase * 0.8) * 1;
        mesh.rotation.z = time * 0.1 + phase;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Store refs for cleanup
    sceneRef.current = {
      scene,
      camera,
      renderer,
      nodes,
      connections,
      animationId
    };

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        
        // Dispose of Three.js resources
        nodes.forEach(node => {
          node.geometry.dispose();
          if (Array.isArray(node.material)) {
            node.material.forEach(mat => mat.dispose());
          } else {
            node.material.dispose();
          }
        });
        
        connections.forEach(connection => {
          connection.geometry.dispose();
          if (Array.isArray(connection.material)) {
            connection.material.forEach(mat => mat.dispose());
          } else {
            connection.material.dispose();
          }
        });
        
        symbolMeshes.forEach(mesh => {
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(mat => mat.dispose());
          } else {
            mesh.material.dispose();
          }
        });
        
        renderer.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-20 ${className || ''}`}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
};

export default CloudBackground;
