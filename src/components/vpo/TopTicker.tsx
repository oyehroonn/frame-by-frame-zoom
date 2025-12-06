const TopTicker = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-8 flex items-center bg-vpo-grain border-b border-border/10 overflow-hidden">
      <div className="animate-ticker flex whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="inline-flex items-center text-[11px] tracking-[0.15em] text-foreground/70 font-sans uppercase">
            <span>VIRTUAL PREMIUM OUTLETS</span>
            <span className="mx-6 text-foreground/30">—</span>
            <span>NEW YORK • PARIS • TOKYO • MILAN</span>
            <span className="mx-6 text-foreground/30">—</span>
            <span>THE NEW COLLECTION AVAILABLE NOW</span>
            <span className="mx-6 text-foreground/30">—</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopTicker;
