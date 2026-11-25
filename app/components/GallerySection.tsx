import type { RefObject } from "react";
import { GALLERY } from "./site-data";

type GallerySectionProps = {
  galleryRef: RefObject<HTMLElement | null>;
  galleryTrackRef: RefObject<HTMLDivElement | null>;
  galleryProgressRef: RefObject<HTMLElement | null>;
};

export default function GallerySection({ galleryRef, galleryTrackRef, galleryProgressRef }: GallerySectionProps) {
  return (
    <section className="gallery" id="gallery" aria-label="Gallery" ref={galleryRef}>
      <div className="gallery-sticky">
        <div className="gallery-head"><h2>Inside Revive</h2><p>Keep scrolling to walk the floor. Photos and clips are placeholders for now.</p></div>
        <div className="gallery-track" ref={galleryTrackRef}>
          {GALLERY.map(([caption, size, image, alt]) => (
            <figure className={`gallery-card ${size}`} key={caption}>
              <img className="gallery-image" src={image} alt={alt} />
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="gallery-bar" aria-hidden="true"><i ref={galleryProgressRef} /></div>
      </div>
    </section>
  );
}
