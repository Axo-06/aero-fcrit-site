import BlackHole from "./black-hole";

export default function BlackHoleDemo() {
  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      <BlackHole />
    </div>
  );
}
