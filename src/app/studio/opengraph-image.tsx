import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `Studio — ${SITE_NAME}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background:
            "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(6,182,212,0.25), transparent 70%), #0A0A0B",
        }}
      >
        <span
          style={{
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#06B6D4",
          }}
        >
          Studio
        </span>
        <span
          style={{
            marginTop: 24,
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: -1,
            color: "#F5F5F7",
          }}
        >
          Construiesc produse digitale.
        </span>
        <span style={{ marginTop: 28, fontSize: 26, color: "#A1A1A6" }}>
          {SITE_NAME}
        </span>
      </div>
    ),
    { ...size }
  );
}
