import React from "react";

export default function SwipeBar() {
  return (
    <Drawer
      anchor={anchor}
      open={state[anchor]}
      onClose={toggleDrawer(anchor, false)}
    >
      {list(anchor)}
    </Drawer>
  );
}
