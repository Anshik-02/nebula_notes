import ForceGraph3D from "react-force-graph-3d";
import * as THREE from "three";

const Graphmodal = ({ graphData }) => {
  function makeTextSprite(text) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "24px Arial";
    context.fillStyle = "white";
    context.fillText(text, 0, 24);
    return canvas;
  }

  return (
    <div className="w-full h-[80vh]">
      <ForceGraph3D
        graphData={graphData}
        nodeThreeObject={(node) => {
          const geometry = new THREE.SphereGeometry(
            node.type === "folder" ? 10 : node.type === "note" ? 6 : 4,
            16,
            16
          );

          const material = new THREE.MeshBasicMaterial({
            color:
              node.type === "folder"
                ? 0x4cafef 
                : node.type === "note"
                ? 0xffa500 
                : 0x9c27b0, 
          });

          const mesh = new THREE.Mesh(geometry, material);


          if (node.type === "folder") {
            const spriteMaterial = new THREE.SpriteMaterial({
              map: new THREE.CanvasTexture(generateGlowTexture()),
              blending: THREE.AdditiveBlending,
            });
            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(30, 30, 1);
            mesh.add(sprite);
          }

          const labelCanvas = document.createElement("canvas");
          const ctx = labelCanvas.getContext("2d");


          labelCanvas.width = 256;
          labelCanvas.height = 64;

          ctx.font = "28px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(
            node.name || node.id,
            labelCanvas.width / 2,
            labelCanvas.height / 2
          );


          const texture = new THREE.CanvasTexture(labelCanvas);
          texture.needsUpdate = true;

          const sprite = new THREE.Sprite(
            new THREE.SpriteMaterial({
              map: texture,
              transparent: true,
              depthTest: false,
            })
          );


          sprite.scale.set(40, 12, 1);
          sprite.position.set(0, node.type === "folder" ? 15 : 10, 0);

          mesh.add(sprite);

          return mesh;
        }}
      />
    </div>
  );
};

function generateGlowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, "rgba(0, 150, 255, 0.8)");
  gradient.addColorStop(0.5, "rgba(0, 150, 255, 0.3)");
  gradient.addColorStop(1, "rgba(0, 150, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return canvas;
}

export default Graphmodal;
