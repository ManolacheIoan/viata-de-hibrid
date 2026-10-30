import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = SITE_NAME;
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
          background: "#0A0A0B",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "1px solid #26262B",
          }}
        >
          <span style={{ fontSize: 40, fontWeight: 600, color: "#06B6D4" }}>
            Studio
          </span>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 40, fontWeight: 600, color: "#F97316" }}>
            Arena
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontSize: 22,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#F5F5F7",
              background: "rgba(10,10,11,0.8)",
              border: "1px solid #26262B",
              borderRadius: 999,
              padding: "10px 28px",
            }}
          >
            {SITE_NAME}
          </span>
          <span style={{ fontSize: 18, color: "#A1A1A6" }}>
            Două lumi, aceeași disciplină.
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
