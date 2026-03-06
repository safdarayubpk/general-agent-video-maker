import React from "react";
import { brand, layout } from "../styles";

interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  tint?: string;
  style?: React.CSSProperties;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title,
  children,
  width = "100%",
  height = "85%",
  tint,
  style,
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: layout.terminalRadius,
        overflow: "hidden",
        background: tint || brand.bgTertiary,
        border: `1px solid rgba(255,255,255,0.06)`,
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {/* macOS chrome */}
      <div
        style={{
          height: layout.windowChromeHeight,
          background: "rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          paddingLeft: 16,
          gap: layout.windowDotGap,
          flexShrink: 0,
        }}
      >
        <div style={{ width: layout.windowDotSize, height: layout.windowDotSize, borderRadius: "50%", background: "#FF5F56" }} />
        <div style={{ width: layout.windowDotSize, height: layout.windowDotSize, borderRadius: "50%", background: "#FFBD2E" }} />
        <div style={{ width: layout.windowDotSize, height: layout.windowDotSize, borderRadius: "50%", background: "#27C93F" }} />
        <span
          style={{
            marginLeft: 12,
            fontSize: 13,
            color: brand.textDim,
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          {title}
        </span>
      </div>
      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: layout.terminalPadding,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};
