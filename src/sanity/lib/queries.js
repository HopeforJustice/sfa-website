import { groq } from "next-sanity";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    pageBuilder[] {
      _type,
      _key,
      ...select(
        _type == "heroBlock" => {
          eyebrow,
          heading,
          body,
          primaryButton,
          secondaryButton,
          image { ..., crop, hotspot, asset-> }
        },
        _type == "imageTilesWithTextBlock" => {
          heading,
          body,
          subheading,
          subheadingBody,
          button,
          images[] { ..., asset-> },
          statsTitle,
          stats
        },
        _type == "videoWithTextBlock" => {
          vimeoUrl,
          videoTitle,
          heading,
          primaryButton,
          secondaryButton
        },
        _type == "memberLogosBlock" => {
          heading,
          logos[] {
            name,
            logo { ..., asset-> }
          }
        },
        _type == "quoteBlock" => {
          companyLogo { ..., asset-> },
          quote,
          personImage { ..., asset-> },
          personName,
          personRole
        },
        _type == "imageWithTextBlock" => {
          eyebrow,
          heading,
          body,
          button,
          image { ..., asset-> }
        }
      )
    }
  }
`;

export const PAGE_SLUGS_QUERY = groq`
  *[_type == "page" && defined(slug.current) && slug.current != "home"] {
    "slug": slug.current
  }
`;

export const NAV_QUERY = groq`
  *[_type == "navigation"][0] {
    items[] {
      "type": _type,
      title,
      href,
      columns[] {
        title,
        items[] {
          name,
          description,
          href,
          icon
        }
      }
    }
  }
`;
