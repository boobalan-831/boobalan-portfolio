
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CloudBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    nodes?: THREE.Mesh[];
    edgesGroup?: THREE.Group;
    animationId?: number;
  }>({});

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    
    // Create Three.js renderer with alpha for transparency
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 100;

    // Create floating node spheres
    const nodes: THREE.Mesh[] = [];
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x4fb3ff,
      emissive: 0x4fb3ff,
      emissiveIntensity: 0.2
    });
    const sphereGeom = new THREE.SphereGeometry(1.5, 16, 16);

    const nodeCount = window.innerWidth < 640 ? 20 : 30;
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(sphereGeom, nodeMaterial.clone());
      node.position.set(
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60
      );
      scene.add(node);
      nodes.push(node);
    }

    // Create lines between nearby nodes
    const edgesGroup = new THREE.Group();
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < 50) { // Only connect nearby nodes
          const material = new THREE.LineBasicMaterial({
            color: 0x4fb3ff,
            transparent: true,
            opacity: 0.2
          });
          const points = [nodes[i].position, nodes[j].position];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, material);
          edgesGroup.add(line);
        }
      }
    }
    scene.add(edgesGroup);

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      
      const intersects = raycaster.intersectObjects(nodes);
      nodes.forEach(node => {
        const material = node.material as THREE.MeshBasicMaterial;
        if (intersects.find(i => i.object === node)) {
          material.emissiveIntensity = 0.6;
        } else {
          material.emissiveIntensity = 0.2;
        }
      });
    };

    // Animation loop
    const animate = () => {
      const time = performance.now() * 0.0003;

      // Drift nodes using sin/cos for organic motion
      nodes.forEach((node, idx) => {
        const baseX = node.userData.baseX || node.position.x;
        const baseY = node.userData.baseY || node.position.y;
        const baseZ = node.userData.baseZ || node.position.z;
        
        if (!node.userData.baseX) {
          node.userData.baseX = baseX;
          node.userData.baseY = baseY;
          node.userData.baseZ = baseZ;
        }

        node.position.x = baseX + Math.sin(time + idx) * 3;
        node.position.y = baseY + Math.cos(time + idx * 1.3) * 3;
        node.position.z = baseZ + Math.sin(time + idx * 0.7) * 2;
      });

      // Pulse lines every 2 seconds
      const pulse = (Math.sin(time * Math.PI) + 1) / 2;
      edgesGroup.children.forEach(line => {
        const material = (line as THREE.Line).material as THREE.LineBasicMaterial;
        material.opacity = 0.1 + 0.15 * pulse;
      });

      renderer.render(scene, camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Store references
    sceneRef.current = {
      renderer,
      scene,
      camera,
      nodes,
      edgesGroup,
    };

    // Start animation and add listeners
    animate();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Dispose Three.js resources
      nodes.forEach(node => {
        node.geometry.dispose();
        (node.material as THREE.Material).dispose();
      });
      edgesGroup.children.forEach(line => {
        (line as THREE.Line).geometry.dispose();
        ((line as THREE.Line).material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-20"
      style={{ 
        background: 'transparent',
        pointerEvents: 'none'
      }}
      aria-hidden="true"
    />
  );
};

export default CloudBackground;
