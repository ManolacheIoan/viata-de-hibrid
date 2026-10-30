import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `Arena — ${SITE_NAME}`;
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
            "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(249,115,22,0.25), transparent 70%), #0A0A0B",
        }}
      >
        <span
          style={{
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#F97316",
          }}
        >
          Arena
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
          Hibridul Fizic
        </span>
        <span style={{ marginTop: 28, fontSize: 26, color: "#A1A1A6" }}>
          {SITE_NAME}
        </span>
      </div>
    ),
    { ...size }
  );
}
