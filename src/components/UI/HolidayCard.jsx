import { Card, CardContent, Chip, IconButton } from "@mui/material";

import { FaRegCalendarAlt, FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function HolidayCard({
  event,
  handleEmojiClick,
  handleEditHoliday,
  handleDeleteHoliday,
}) {
  console.log("holiday event", event);
  //   const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);

  return (
    <Card
      className="relative overflow-hidden group cursor-pointer h-full"
      sx={{
        background: `linear-gradient(135deg, ${event.color}, ${
          event.secondaryColor
        })`,
        transition: "all 0.3s ease",
        color: "white",
        "&:hover": {
          boxShadow:
            "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
          transform: "translateY(-4px)",
        },
      }}
      onClick={() => handleEmojiClick(event._id)}
    >
      <CardContent
        sx={{
          p: 3,
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Section: Date and Actions */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium border border-white/10">
            <FaRegCalendarAlt className="text-sm" />
            {event.startDate}
          </div>

          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleEditHoliday(event);
              }}
              sx={{
                p: 0.8,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(8px)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
                color: "white",
              }}
            >
              <FaRegEdit size={16} />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteHoliday(event.id);
              }}
              sx={{
                p: 0.8,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(8px)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.4)" },
                color: "white",
              }}
            >
              <MdOutlineDeleteOutline size={18} />
            </IconButton>
          </div>
        </div>

        {/* Middle Section: Emojis and Name */}
        <div className="flex-grow flex flex-col justify-center py-4">
          <div className="flex flex-wrap gap-1 mb-3">
            {event.animatedIcon.slice(0, 3).map((emoji, index) => (
              <span
                key={index}
                className="text-2xl drop-shadow-md hover:scale-125 transition-transform duration-200 inline-block pointer-events-none select-none"
              >
                {emoji}
              </span>
            ))}
            {event.animatedIcon.length > 3 && (
              <span className="text-xs bg-black/10 backdrop-blur-sm self-center px-2 py-0.5 rounded-full border border-white/5">
                +{event.animatedIcon.length - 3}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold leading-tight drop-shadow-sm mb-1 line-clamp-2">
            {event.name}
          </h3>
        </div>

        {/* Decorative background element */}
        <div
          className="absolute -right-4 -bottom-4 text-8xl opacity-10 rotate-12 pointer-events-none select-none"
          aria-hidden="true"
        >
          {event.animatedIcon[0]}
        </div>
      </CardContent>
    </Card>
  );
}
