import { config, collection, singleton, fields } from '@keystatic/core';

export const markdocConfig = fields.markdoc.createMarkdocConfig({});

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    products: collection({
      label: 'Products',
      slugField: 'name',
      path: 'products/*',
      format: { contentField: 'description' },
      schema: {
        name: fields.slug({
          name: {
            label: 'Product Name',
            description: 'Used for URL slug (e.g., "STONER")',
          },
        }),
        description: fields.markdoc({
          label: 'Product Description',
          options: {
            bold: true,
            italic: true,
            link: true,
            heading: true,
            blockquote: true,
            orderedList: true,
            unorderedList: true,
          },
          description: 'Full product description (e.g., "a gentle blend of botanical oils...")',
        }),
        mainImage: fields.image({
          label: 'Main Product Display Image',
          directory: 'public/uploads/products',
          publicPath: '/uploads/products',
          description: 'Primary product image for main page display',
        }),
        productLabelImage: fields.image({
          label: 'Product Label Image',
          directory: 'public/uploads/products/labels',
          publicPath: '/uploads/products/labels',
          description: 'Image of product in the products page',
          validation: { isRequired: true },
        }),
        displayOrder: fields.integer({
          label: 'Display Order',
          description: 'Order for displaying products (lower numbers appear first)',
          validation: { isRequired: false },
          defaultValue: 0,
        }),
      },
    }),
    services: collection({
      label: 'Services',
      slugField: 'title',
      path: 'services/*',
      format: { contentField: 'description' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Service Title',
            description: 'Used for URL slug (e.g., "Hair Growth Steps")',
          },
        }),
        categoryLabel: fields.text({
          label: 'Category Label',
          description: 'e.g., "SKINCARE", "WELLNESS"',
          validation: { isRequired: false },
        }),
        description: fields.markdoc({
          label: 'Service Description',
          options: {
            bold: true,
            italic: true,
            link: true,
            heading: true,
            blockquote: true,
            orderedList: true,
            unorderedList: true,
          },
          description: 'Detailed service description with benefits and uses (e.g., "EXCELLENT PAIN RELIEVER", "ALLEVIATES MUSCULAR, JOINTS AND NERVES PAINS...")',
        }),
        image: fields.image({
          label: 'Service Image',
          directory: 'public/uploads/services',
          publicPath: '/uploads/services',
          description: 'Image for service display',
          validation: { isRequired: false },
        }),
        displayOrder: fields.integer({
          label: 'Display Order',
          description: 'Order for displaying services (lower numbers appear first)',
          validation: { isRequired: false },
          defaultValue: 0,
        }),
      },
    }),
    reviews: collection({
      label: 'Reviews',
      slugField: 'customerName',
      path: 'reviews/*',
      schema: {
        customerName: fields.slug({
          name: {
            label: 'Customer Name',
            description: 'Used for URL slug (e.g., "alexis-green-city")',
          },
        }),
        testimonial: fields.text({
          label: 'Testimonial Quote',
          description: 'Customer review/testimonial text',
          validation: { isRequired: true },
        }),
        name: fields.text({
          label: 'Display Name',
          description: 'Name to display with testimonial (e.g., "Alexis")',
          validation: { isRequired: true },
        }),
        location: fields.text({
          label: 'Location',
          description: 'Customer location (e.g., "Green City", "Lush Land")',
          validation: { isRequired: false },
        }),
        product: fields.relationship({
          label: 'Product',
          collection: 'products',
          description: 'The product that helped this customer',
          validation: { isRequired: false },
        }),
        beforeImage: fields.image({
          label: 'Before Image',
          directory: 'public/uploads/reviews/before',
          publicPath: '/uploads/reviews/before',
          description: 'Image showing condition before using the product',
          validation: { isRequired: false },
        }),
        afterImage: fields.image({
          label: 'After Image',
          directory: 'public/uploads/reviews/after',
          publicPath: '/uploads/reviews/after',
          description: 'Image showing results after using the product',
          validation: { isRequired: false },
        }),
        video: fields.file({
          label: 'Video Testimonial',
          directory: 'public/uploads/reviews/videos',
          publicPath: '/uploads/reviews/videos',
          description: 'Video file showing customer testimony or testimonial',
          validation: { isRequired: false },
        }),
        featured: fields.checkbox({
          label: 'Featured Review',
          description: 'Show in featured testimonials section',
          defaultValue: false,
        }),
        displayOrder: fields.integer({
          label: 'Display Order',
          description: 'Order for displaying reviews (lower numbers appear first)',
          validation: { isRequired: false },
          defaultValue: 0,
        }),
      },
    }),
  },

  singletons: {
    home: singleton({
      label: 'Home',
      path: 'content/home/index',
      schema: {
        title: fields.text({ label: 'Internal Title' }),
        hero: fields.object(
          {
            heading: fields.text({ label: 'Heading' }),
            subheading: fields.text({
              label: 'Subheading',
              validation: { isRequired: false },
            }),
            ctaLabel: fields.text({
              label: 'Primary CTA Label',
              validation: { isRequired: true },
            }),
            ctaTarget: fields.text({
              label: 'Primary CTA Target',
              description: 'Relative path or full URL',
              validation: { isRequired: true },
            }),
            image: fields.image({
              label: 'Hero Image',
              directory: 'public/uploads/home/hero',
              publicPath: '/uploads/home/hero',
            }),
            logo: fields.image({
              label: 'Hero Logo',
              directory: 'public/uploads/home/hero',
              publicPath: '/uploads/home/hero',
              validation: { isRequired: false },
            }),
            accentIcon: fields.image({
              label: 'Accent Icon',
              directory: 'public/uploads/home/hero',
              publicPath: '/uploads/home/hero',
              validation: { isRequired: false },
            }),
          },
          { label: 'Hero Section' }
        ),
        intro: fields.object(
          {
            image: fields.image({
              label: 'Intro Image',
              directory: 'public/uploads/home/intro',
              publicPath: '/uploads/home/intro',
            }),
            logo: fields.image({
              label: 'Intro Logo',
              directory: 'public/uploads/home/intro',
              publicPath: '/uploads/home/intro',
              validation: { isRequired: false },
            }),
            copy: fields.markdoc({
              label: 'Intro section content',
              options: {
                bold: true,
                italic: true,
                link: true,
                heading: true,
                blockquote: true,
                orderedList: true,
                unorderedList: true,
              },
            }),
            ctaLabel: fields.text({
              label: 'Intro CTA Label',
              validation: { isRequired: false },
            }),
            ctaTarget: fields.text({
              label: 'Intro CTA Target',
              description: 'Relative path or full URL',
              validation: { isRequired: false },
            }),
          },
          { label: 'Intro Block' }
        ),
        why: fields.object(
          {
            heading: fields.text({ label: 'Heading' }),
            body: fields.markdoc({
              label: 'Body',
              options: {
                bold: true,
                italic: true,
                link: true,
                heading: true,
                blockquote: true,
                orderedList: true,
                unorderedList: true,
              },
            }),
            image: fields.image({
              label: 'Primary Image',
              directory: 'public/uploads/home/why',
              publicPath: '/uploads/home/why',
            }),
            highlightImage: fields.image({
              label: 'Highlight Image',
              directory: 'public/uploads/home/why',
              publicPath: '/uploads/home/why',
              validation: { isRequired: false },
            }),
            highlightCaption: fields.text({
              label: 'Highlight Caption',
              validation: { isRequired: false },
            }),
          },
          { label: 'Why Section' }
        ),
        philosophy: fields.object(
          {
            heading: fields.text({ label: 'Heading' }),
            body: fields.markdoc({
              label: 'Body',
              options: {
                bold: true,
                italic: true,
                link: true,
                heading: true,
                blockquote: true,
                orderedList: true,
                unorderedList: true,
              },
            }),
            image: fields.image({
              label: 'Image',
              directory: 'public/uploads/home/philosophy',
              publicPath: '/uploads/home/philosophy',
            }),
          },
          { label: 'Our Philosophy' }
        ),
        promise: fields.object(
          {
            heading: fields.text({ label: 'Heading' }),
            body: fields.markdoc({
              label: 'Body',
              options: {
                bold: true,
                italic: true,
                link: true,
                heading: true,
                blockquote: true,
                orderedList: true,
                unorderedList: true,
              },
            }),
            illustration: fields.image({
              label: 'Pink Promise Illustration or any image symbolizing the promise',
              directory: 'public/uploads/home/promise',
              publicPath: '/uploads/home/promise',
              validation: { isRequired: false },
            }),
          },
          { label: 'Our Promise' }
        ),
        theme: fields.object(
          {
            primaryColor: fields.text({
              label: 'Primary Color',
              description: 'Hex color code (e.g., #0A5C4A)',
            }),
            secondaryColor: fields.text({
              label: 'Secondary Color',
              description: 'Hex color code (e.g., #F8EDE6)',
              validation: { isRequired: false },
            }),
            accentColor: fields.text({
              label: 'Accent Color',
              description: 'Hex color code (e.g., #1F6F5B)',
              validation: { isRequired: false },
            }),
          },
          {
            label: 'Theme Colors',
          }
        ),
      },
    }),
    footer: singleton({
      label: 'Footer',
      path: 'content/footer/index',
      schema: {
        logo: fields.image({
          label: 'Footer Logo',
          directory: 'public/uploads/footer',
          publicPath: '/uploads/footer',
        }),
        tagline: fields.text({
          label: 'Tagline',
          description: 'e.g., "THE NATURAL WAY"',
        }),
        address: fields.markdoc({
          label: 'Address',
          options: { bold: true, italic: true },
          description: 'Full address with formatting',
        }),
        copyright: fields.text({
          label: 'Copyright Notice',
          description: 'e.g., "COPYRIGHT © 2025 TANTE BEAUTY."',
        }),
        socialLinks: fields.array(
          fields.object({
            platform: fields.select({
              label: 'Platform',
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'X (Twitter)', value: 'x' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Snapchat', value: 'snapchat' },
                { label: 'Telegram', value: 'telegram' },
              ],
              defaultValue: 'facebook',
            }),
            url: fields.url({ label: 'URL' }),
          }),
          {
            label: 'Social Links',
            itemLabel: (props) => props.fields.platform.value ?? 'Link',
          }
        ),
      },
    }),
    reviewsBottom: singleton({
      label: 'Reviews Bottom Section',
      path: 'content/reviews-bottom/index',
      schema: {
        brandStatement: fields.text({
          label: 'Brand Statement',
          description: 'Main brand message/quote (e.g., "A healthy and beautiful skin is nurtured by & only Natural Cosmetics")',
          validation: { isRequired: true },
        }),
        logo: fields.image({
          label: 'Brand statement background image',
          directory: 'public/uploads/reviews-bottom',
          publicPath: '/uploads/reviews-bottom',
          description: 'Brand logo for reviews section bottom',
          validation: { isRequired: false },
        }),
      },
    }),
    contact: singleton({
      label: 'Contact',
      path: 'content/contact/index',
      schema: {
        contactPhoto: fields.image({
          label: 'Contact Photo',
          directory: 'public/uploads/contact',
          publicPath: '/uploads/contact',
          description: 'Contact page photo (portrait image)',
        }),
        mailingAddress: fields.text({
          label: 'Mailing Address',
          description: 'Full mailing address (e.g., "123 Anywhere St. Any City, ST 12345")',
        }),
        emailAddress: fields.text({
          label: 'Email Address',
          description: 'Contact email address (e.g., "hello@reallygreatsite.com")',
        }),
        phoneNumber: fields.text({
          label: 'Phone Number',
          description: 'Contact phone number (e.g., "+250789943032")',
        }),
      },
    }),
    productSettings: singleton({
      label: 'Product Settings',
      path: 'content/product-settings/index',
      schema: {
        heading: fields.text({
          label: 'Section Heading',
          description: 'Main heading for products section (e.g., "OUR BEAUTY PRODUCTS FOR YOU")',
        }),
        subtitle: fields.text({
          label: 'Subtitle',
          description: 'Subtitle text below heading (e.g., "To make things easier, we\'ve gathered your favorites here.")',
          validation: { isRequired: false },
        }),
        descriptionText: fields.text({
          label: 'Description Text',
          description: 'Text displayed below product grid (e.g., "Our products are thoughtfully crafted...")',
          validation: { isRequired: false },
        }),
      },
    }),
    serviceSettings: singleton({
      label: 'Service Settings',
      path: 'content/service-settings/index',
      schema: {
        heading: fields.text({
          label: 'Section Heading',
          description: 'Main heading for services section (e.g., "WE SERVE YOU THROUGH THESE SERVICES")',
        }),
      },
    }),
  },
});
