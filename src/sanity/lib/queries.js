import { groq } from "next-sanity";

// Helper macro — resolves a localizable scalar field with fallback to base locale
// Usage in GROQ: inline the pattern with field name substitution

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
          "eyebrow": coalesce(eyebrow[language == $locale][0].value, eyebrow[language == $baseLocale][0].value),
          "heading": coalesce(heading[language == $locale][0].value, heading[language == $baseLocale][0].value),
          "body": coalesce(body[language == $locale][0].value, body[language == $baseLocale][0].value),
          style,
          primaryButton {
            "text": coalesce(text[language == $locale][0].value, text[language == $baseLocale][0].value),
            linkType, href, "pageRef": pageRef-> { "slug": slug.current }
          },
          secondaryButton {
            "text": coalesce(text[language == $locale][0].value, text[language == $baseLocale][0].value),
            linkType, href, "pageRef": pageRef-> { "slug": slug.current }
          },
          "image": coalesce(image[language == $locale][0].value, image[language == $baseLocale][0].value) { ..., crop, hotspot, asset-> },
          "images": coalesce(images[language == $locale][0].value, images[language == $baseLocale][0].value)[] { ..., crop, hotspot, asset-> }
        },
        _type == "imageTilesWithTextBlock" => {
          "heading": coalesce(heading[language == $locale][0].value, heading[language == $baseLocale][0].value),
          "body": coalesce(body[language == $locale][0].value, body[language == $baseLocale][0].value),
          "subheading": coalesce(subheading[language == $locale][0].value, subheading[language == $baseLocale][0].value),
          "subheadingBody": coalesce(subheadingBody[language == $locale][0].value, subheadingBody[language == $baseLocale][0].value),
          button {
            "text": coalesce(text[language == $locale][0].value, text[language == $baseLocale][0].value),
            linkType, href, "pageRef": pageRef-> { "slug": slug.current }
          },
          "images": coalesce(images[language == $locale][0].value, images[language == $baseLocale][0].value)[] { ..., asset-> },
          "statsTitle": coalesce(statsTitle[language == $locale][0].value, statsTitle[language == $baseLocale][0].value),
          "stats": coalesce(stats[language == $locale][0].value, stats[language == $baseLocale][0].value)
        },
        _type == "videoWithTextBlock" => {
          "vimeoUrl": coalesce(vimeoUrl[language == $locale][0].value, vimeoUrl[language == $baseLocale][0].value),
          "videoTitle": coalesce(videoTitle[language == $locale][0].value, videoTitle[language == $baseLocale][0].value),
          "heading": coalesce(heading[language == $locale][0].value, heading[language == $baseLocale][0].value),
          primaryButton {
            "text": coalesce(text[language == $locale][0].value, text[language == $baseLocale][0].value),
            linkType, href, "pageRef": pageRef-> { "slug": slug.current }
          },
          secondaryButton {
            "text": coalesce(text[language == $locale][0].value, text[language == $baseLocale][0].value),
            linkType, href, "pageRef": pageRef-> { "slug": slug.current }
          }
        },
        _type == "videoBlock" => {
          "vimeoUrl": coalesce(vimeoUrl[language == $locale][0].value, vimeoUrl[language == $baseLocale][0].value),
          "videoTitle": coalesce(videoTitle[language == $locale][0].value, videoTitle[language == $baseLocale][0].value)
        },
        _type == "memberLogosBlock" => {
          "heading": coalesce(heading[language == $locale][0].value, heading[language == $baseLocale][0].value),
          "logos": coalesce(logos[language == $locale][0].value, logos[language == $baseLocale][0].value)[] {
            name,
            logo { ..., asset-> }
          }
        },
        _type == "quoteBlock" => {
          "companyLogo": coalesce(companyLogo[language == $locale][0].value, companyLogo[language == $baseLocale][0].value) { ..., asset-> },
          "quote": coalesce(quote[language == $locale][0].value, quote[language == $baseLocale][0].value),
          "personImage": coalesce(personImage[language == $locale][0].value, personImage[language == $baseLocale][0].value) { ..., asset-> },
          "personName": coalesce(personName[language == $locale][0].value, personName[language == $baseLocale][0].value),
          "personRole": coalesce(personRole[language == $locale][0].value, personRole[language == $baseLocale][0].value)
        },
        _type == "imageWithTextBlock" => {
          "eyebrow": coalesce(eyebrow[language == $locale][0].value, eyebrow[language == $baseLocale][0].value),
          "heading": coalesce(heading[language == $locale][0].value, heading[language == $baseLocale][0].value),
          "body": coalesce(body[language == $locale][0].value, body[language == $baseLocale][0].value),
          button {
            "text": coalesce(text[language == $locale][0].value, text[language == $baseLocale][0].value),
            linkType, href, "pageRef": pageRef-> { "slug": slug.current }
          },
          "image": coalesce(image[language == $locale][0].value, image[language == $baseLocale][0].value) { ..., asset-> }
        },
        _type == "statsGridBlock" => {
          "heading": coalesce(heading[language == $locale][0].value, heading[language == $baseLocale][0].value),
          "body": coalesce(body[language == $locale][0].value, body[language == $baseLocale][0].value),
          "stats": coalesce(stats[language == $locale][0].value, stats[language == $baseLocale][0].value)
        },
        _type == "twoColTextBlock" => {
          "eyebrow": coalesce(eyebrow[language == $locale][0].value, eyebrow[language == $baseLocale][0].value),
          "heading": coalesce(heading[language == $locale][0].value, heading[language == $baseLocale][0].value),
          "body": coalesce(body[language == $locale][0].value, body[language == $baseLocale][0].value)
        },
        _type == "ctaBannerBlock" => {
          "heading": coalesce(heading[language == $locale][0].value, heading[language == $baseLocale][0].value),
          "body": coalesce(body[language == $locale][0].value, body[language == $baseLocale][0].value),
          primaryButton {
            "text": coalesce(text[language == $locale][0].value, text[language == $baseLocale][0].value),
            linkType, href, "pageRef": pageRef-> { "slug": slug.current }
          },
          secondaryButton {
            "text": coalesce(text[language == $locale][0].value, text[language == $baseLocale][0].value),
            linkType, href, "pageRef": pageRef-> { "slug": slug.current }
          }
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
      linkType,
      href,
      "pageRef": pageRef-> { "slug": slug.current },
      columns[] {
        title,
        items[] {
          name,
          description,
          linkType,
          href,
          "pageRef": pageRef-> { "slug": slug.current },
          icon
        }
      }
    }
  }
`;

export const FOOTER_QUERY = groq`
  *[_type == "navigation"][0] {
    footerColumns[] {
      title,
      items[] {
        name,
        linkType,
        href,
        "pageRef": pageRef-> { "slug": slug.current }
      }
    },
    footerSmallPrint
  }
`;
