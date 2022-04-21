import imageUrlBuilder from "@sanity/image-url";

const BREAKPOINTS = [640, 768, 1024, 1280, 1536]; // px

export const findLastNonNullValue = (items: any, currentIndex: number) => {
  const sliced = items.slice(0, currentIndex);
  return sliced.filter((val: any) => val !== null).pop();
};

const generateSrcSet = (
  urlBuilder: any,
  breakpoints: any,
  { quality }: { quality: any }
) => {
  return breakpoints
    .map((width: any) => {
      return `${urlBuilder
        .width(width)
        .auto("format")
        .quality(quality)} ${width}w`;
    })
    .join(", ");
};

// Generate srcset sizes based off breakpoints
const generateSizes = (breakpoints: typeof BREAKPOINTS, sizes: any) => {
  if (!sizes) {
    return undefined;
  }

  if (typeof sizes === "string") {
    return sizes;
  }

  if (sizes.length === 1 && sizes[0] !== null) {
    return sizes[0];
  }

  return sizes
    .map((val: any, i: number) => {
      if (i === sizes.length - 1) {
        return sizes[i];
      }

      let current = val;
      if (val === null) {
        current = findLastNonNullValue(sizes, i);
      }

      return `(max-width: ${breakpoints?.[i]}px) ${current}`;
    })
    .join(", ");
};

interface Props {
  crop?: {
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
  };
  dataset?: string;
  height?: number;
  hotspot?: any; // TODO: type
  layout?: "fill" | "responsive";
  objectFit?: any; // TODO: type
  options?: Record<string, any>;
  projectId?: string;
  quality?: number;
  sizes?: any;
  src: string;
  width?: number;
}

/**
 * A simple image component that wraps around `@sanity/image-url`
 */
const SanityImage = (props: Props) => {
  const {
    // blurDataURL,
    crop,
    dataset = process.env.NEXT_PUBLIC_SANITY_DATASET,
    height,
    hotspot,
    layout,
    objectFit,
    options,
    projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    quality = 80,
    sizes,
    src,
    width,
    ...rest
  } = props;

  if (!dataset) {
    throw new Error('SanityImage is missing required "dataset" property.');
  }
  if (!projectId) {
    throw new Error('SanityImage is missing required "projectId" property.');
  }
  if (!src) {
    return null;
  }

  // Strip out blacklisted props
  // @ts-ignore
  delete rest?.["decoding"];
  // @ts-ignore
  delete rest?.["ref"];
  // @ts-ignore
  delete rest?.["srcSet"];
  // @ts-ignore
  delete rest?.["style"];

  const urlBuilder = imageUrlBuilder({ projectId, dataset }).image({
    _ref: src,
    crop,
    hotspot,
  });

  // Generate srcset + sizes
  const srcSetSizes = generateSizes(BREAKPOINTS, sizes);
  const srcSet = generateSrcSet(urlBuilder, BREAKPOINTS, { quality });

  // Determine image aspect ratio (factoring in any potential crop)
  let aspectRatio;
  if (height && width) {
    const multiplierWidth = 1 - (crop?.left || 0) - (crop?.right || 0);
    const multiplierHeight = 1 - (crop?.bottom || 0) - (crop?.top || 0);
    aspectRatio = (width * multiplierWidth) / (height * multiplierHeight);
  }

  let urlDefault: string;

  // Apply props
  /*
  if (height) {
    url = url.height(options.height);
  }
  if (width) {
    url = url.width(options.width);
  }
  */

  // TODO: check for valid range
  if (options?.blur) {
    urlDefault = urlBuilder.blur(options.blur).url();
  } else {
    urlDefault = urlBuilder.url();
  }

  return (
    <img
      {...rest}
      alt=""
      decoding="async"
      // src={blurDataURL}
      sizes={srcSetSizes}
      src={urlDefault}
      srcSet={srcSet}
      // @ts-ignore
      style={{
        ...(layout === "fill" && {
          bottom: 0,
          height: "100%",
          left: 0,
          objectFit,
          position: "absolute",
          right: 0,
          top: 0,
          width: "100%",
        }),
        ...(layout === "responsive" && {
          ...(aspectRatio ? { aspectRatio } : {}),
          width: "100%",
        }),
      }}
    />
  );
};

export default SanityImage;
