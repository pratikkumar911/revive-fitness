import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16181b",
          borderRadius: 12,
        }}
      >
        <svg
          width="36"
          height="48"
          viewBox="0 0 12 24"
        >
          <path
            d="M8 0 0 14h5l-2 10 9-15H7z"
            fill="#39ff14"
          />
        </svg>
      </div>
    ),
    size,
  );
}
