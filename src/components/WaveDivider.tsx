interface WaveDividerProps {
  color?: "primary" | "secondary";
  flip?: boolean;
}

const WaveDivider = ({ color = "secondary", flip = false }: WaveDividerProps) => {
  const fill = color === "primary" ? "hsl(8, 100%, 40%)" : "hsl(122, 46%, 33%)";
  return (
    <div className={`section-wave ${flip ? "rotate-180" : ""}`}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
