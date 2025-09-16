import { LAZY_LOAD_CLASSNAME } from "../constants";

// The callback function to execute when an image intersects
interface LazyLoadImage extends HTMLImageElement {
  dataset: {
    src: string;
    [key: string]: string;
  };
}

export function handleImgIntersection(
  entries: IntersectionObserverEntry[] = [],
  observer: IntersectionObserver
): void {
  entries.forEach((entry) => {
    // Check if the element is intersecting (i.e., is in the viewport)
    if (entry.isIntersecting) {
      const image = entry.target as LazyLoadImage;

      // Take the URL from data-src and put it in the src attribute
      image.src = image.dataset.src;

      // The image is now loading. We can remove the class.
      image.classList.remove(LAZY_LOAD_CLASSNAME);

      // Stop observing this image, as our job is done.
      observer.unobserve(image);
    }
  });
}
