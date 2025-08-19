import React, { useEffect, useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import { Badge, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { seeAllChats, unSeenChats } from "@/lib/chat";
import { SmnkErrorBoundary, theme } from "@/pages/_app";

function ChatNotification({ url }: { url: string }) {
  const { _id } = useSelector((state: RootState) => state.users.user);

  const [count, setCount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await unSeenChats(_id);
      setCount(data);
    })();
  });
  //console.log(count);
  return (
    <SmnkErrorBoundary>
      <IconButton
        onClick={async () => {
          await seeAllChats(_id);
          router.push(url);
        }}
        size="large"
        edge="end"
        aria-label="menu"
        sx={{ mr: 2, color: theme.rent[1000] }}
      >
        <Badge badgeContent={count} color="error">
          <ChatIcon />
        </Badge>
      </IconButton>
    </SmnkErrorBoundary>
  );
}

export default ChatNotification;
