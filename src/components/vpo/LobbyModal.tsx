import { useState, useEffect } from "react";
import { X, Plus, ArrowRight, Search, XCircle } from "lucide-react";

interface Friend {
  id: string;
  name: string;
  status: string;
  avatar: string;
  online: boolean;
  statusColor: string;
}

interface LobbyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LobbyModal = ({ isOpen, onClose }: LobbyModalProps) => {
  const [lobbyMembers, setLobbyMembers] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState("Chanel");
  const [lobbyId, setLobbyId] = useState("");
  const [invitedFriends, setInvitedFriends] = useState<Set<string>>(new Set());

  const friends: Friend[] = [
    {
      id: "friend-1",
      name: "Elena Bois",
      status: "In Runway • Act I",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop",
      online: true,
      statusColor: "bg-green-500",
    },
    {
      id: "friend-2",
      name: "Marcus Wu",
      status: "Browsing Prada",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop",
      online: true,
      statusColor: "bg-green-500",
    },
    {
      id: "friend-3",
      name: "Satoshi N.",
      status: "Idle • 5m",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop",
      online: true,
      statusColor: "bg-yellow-500",
    },
  ];

  const brands = ["Chanel", "Hermès", "Dior", "Prada"];

  useEffect(() => {
    if (isOpen) {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      setLobbyId(`${randomId}-X99`);
      // Prevent body scroll and hide overflow
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const inviteFriend = (friendId: string) => {
    if (lobbyMembers >= 2) {
      alert("Lobby is full (Max 3 friends).");
      return;
    }

    setInvitedFriends((prev) => new Set(prev).add(friendId));
    setLobbyMembers((prev) => prev + 1);
  };

  const kickMember = (slotId: string, friendId: string) => {
    setInvitedFriends((prev) => {
      const newSet = new Set(prev);
      newSet.delete(friendId);
      return newSet;
    });
    setLobbyMembers((prev) => prev - 1);
  };

  const enterBrandSpace = () => {
    // Placeholder for navigation logic
    console.log(`Entering ${selectedBrand} space`);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-[#050505] modal-enter"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* Global Grain & Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-30 bg-grain" />
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#111] via-[#080808] to-[#050505] opacity-90" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Main Layout */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row overflow-hidden" style={{ height: "100vh" }}>
        {/* LEFT: Lobby Scene / Stage */}
        <div className="flex-1 relative flex flex-col h-full transition-all duration-700">
          {/* Stage Header */}
          <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-20">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-2 tracking-tight">
                Lobby
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-widest text-stone-500 font-mono">
                  ID: {lobbyId}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 border border-white/10 hover:bg-white hover:text-black transition-colors rounded-full text-white/50 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 3D Avatar Stage (Centered) */}
          <div className="flex-1 flex items-center justify-center p-8 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-4 md:gap-8 perspective-2000">
              {/* Host Avatar (Always Present) */}
              <div className="relative group w-[180px] md:w-[220px] aspect-[0.7] transform-style-3d transition-transform duration-500 hover:scale-105 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-lg backdrop-blur-[2px] shadow-2xl overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 blur-[40px] rounded-full" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[70%] bg-gradient-to-t from-stone-800 to-stone-400 rounded-t-full opacity-80 mix-blend-overlay" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[78%] h-[68%] bg-black/40 rounded-t-full blur-[2px]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-md animate-pulse duration-[3000ms]" />
                </div>
                <div className="absolute bottom-4 left-0 w-full text-center z-10">
                  <span className="text-xs font-serif italic text-white block">You</span>
                  <span className="text-[8px] uppercase tracking-widest text-stone-500">
                    Host • Ready
                  </span>
                </div>
              </div>

              {/* Slot 1 */}
              {lobbyMembers >= 1 && Array.from(invitedFriends)[0] ? (
                <FriendSlot
                  friend={friends.find((f) => f.id === Array.from(invitedFriends)[0])!}
                  slotId="slot-1"
                  onKick={(slotId, friendId) => kickMember(slotId, friendId)}
                />
              ) : (
                <EmptySlot slotId="slot-1" />
              )}

              {/* Slot 2 */}
              {lobbyMembers >= 2 && Array.from(invitedFriends)[1] ? (
                <FriendSlot
                  friend={friends.find((f) => f.id === Array.from(invitedFriends)[1])!}
                  slotId="slot-2"
                  onKick={(slotId, friendId) => kickMember(slotId, friendId)}
                />
              ) : (
                <EmptySlot slotId="slot-2" />
              )}
            </div>
          </div>

          {/* Stage Controls (Bottom) */}
          <div className="h-auto p-8 border-t border-white/5 bg-[#050505]/50 backdrop-blur-sm flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="w-full md:w-auto">
              <label className="block text-[9px] uppercase tracking-widest text-stone-500 mb-3">
                Select Brand Destination
              </label>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-4 py-2 border text-[10px] uppercase tracking-wider transition-all ${
                      selectedBrand === brand
                        ? "bg-white text-black border-white"
                        : "border-white/20 text-stone-400 hover:border-white hover:text-white"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={enterBrandSpace}
              className="w-full md:w-auto px-12 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] hover:bg-stone-300 transition-colors flex items-center justify-center gap-2"
            >
              <span>Enter Brand Space</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT: Friends Panel */}
        <div className="w-full md:w-[320px] lg:w-[380px] bg-[#0A0A0B] border-l border-white/10 flex flex-col h-full z-30">
          {/* Panel Tabs */}
          <div className="flex border-b border-white/5">
            <button className="flex-1 py-4 text-[10px] uppercase tracking-widest text-white border-b border-white bg-white/5">
              Online (3)
            </button>
            <button className="flex-1 py-4 text-[10px] uppercase tracking-widest text-stone-600 hover:text-stone-400">
              Offline (9)
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-3 h-3 text-stone-600" />
              <input
                type="text"
                placeholder="SEARCH FRIENDS"
                className="w-full bg-[#111] border border-white/10 py-2 pl-9 pr-4 text-[10px] tracking-wider text-white focus:outline-none focus:border-stone-500 placeholder:text-stone-700 uppercase"
              />
            </div>
          </div>

          {/* Friends List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-3 hover:bg-white/5 transition-colors group rounded-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-stone-800 border border-white/10 overflow-hidden">
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className={`w-full h-full object-cover transition-all ${
                          invitedFriends.has(friend.id)
                            ? "grayscale-0 opacity-100"
                            : "grayscale opacity-70 group-hover:grayscale-0"
                        }`}
                      />
                    </div>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 ${friend.statusColor} rounded-full border border-black`}
                    />
                  </div>
                  <div>
                    <span className="text-xs text-stone-300 font-medium block font-serif italic">
                      {friend.name}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-stone-600">
                      {friend.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => inviteFriend(friend.id)}
                  disabled={invitedFriends.has(friend.id)}
                  className={`opacity-0 group-hover:opacity-100 transition-opacity text-[9px] border px-2 py-1 uppercase tracking-widest ${
                    invitedFriends.has(friend.id)
                      ? "text-green-500 border-green-500/50 opacity-100"
                      : "border-white/20 text-stone-400 hover:text-white hover:border-white"
                  }`}
                >
                  {invitedFriends.has(friend.id) ? "Invited ✓" : "Invite"}
                </button>
              </div>
            ))}

            <div className="p-4 mt-4 border-t border-white/5">
              <p className="text-[9px] text-stone-600 leading-relaxed">
                Max 3 friends per lobby. Invited friends appear as avatars in the room. Voice chat
                is enabled automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Empty Slot Component
const EmptySlot = ({ slotId }: { slotId: string }) => (
  <div className="relative w-[180px] md:w-[220px] aspect-[0.7] border border-white/5 rounded-lg flex items-center justify-center group">
    <div className="text-center opacity-30 group-hover:opacity-60 transition-opacity">
      <Plus className="w-6 h-6 mx-auto mb-2 text-white" />
      <span className="text-[9px] uppercase tracking-widest text-stone-400">Empty Slot</span>
    </div>
  </div>
);

// Friend Slot Component
const FriendSlot = ({
  friend,
  slotId,
  onKick,
}: {
  friend: Friend;
  slotId: string;
  onKick: (slotId: string, friendId: string) => void;
}) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsConnected(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-[180px] md:w-[220px] aspect-[0.7] animate-avatar-enter transform-style-3d group">
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/0 border border-white/20 rounded-lg backdrop-blur-md shadow-2xl overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[70%] bg-gradient-to-t from-stone-700 to-stone-300 rounded-t-full opacity-90 mix-blend-overlay" />
        <div className="absolute bottom-4 left-0 w-full text-center z-10">
          <span className="text-xs font-serif italic text-white block">{friend.name}</span>
          <span
            className={`text-[8px] uppercase tracking-widest ${
              isConnected ? "text-stone-500" : "text-green-400"
            }`}
          >
            {isConnected ? "Joined" : "Connecting..."}
          </span>
        </div>
        <button
          onClick={() => onKick(slotId, friend.id)}
          className="absolute top-2 right-2 text-stone-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <XCircle className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default LobbyModal;
