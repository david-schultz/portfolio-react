export const demosConfig = {
  'markdown': {
    title: 'Markdown Converter',
    subtitle: 'Experimenting with AI image processing',
    year: '2025',
    thumbnail: "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/generic.jpg",
    order: null,
    visible: true,
  },
  'portals': {
    title: 'Thinking with Portals',
    subtitle: 'Experimenting with Three.js physics',
    year: '2024',
    thumbnail: "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/generic.jpg",
    order: null,
    visible: true,
  },
  'arboretum': {
    title: 'Arboretum Explorer',
    subtitle: 'Experimenting with d3.js',
    year: '2023',
    thumbnail: "https://schultzdavidg-portfolio.s3.us-west-1.amazonaws.com/images/generic.jpg",
    order: null,
    visible: true,
  },
}

export type DemoMetadata = {
  title: string
  subtitle: string
  year: string
  thumbnail: string
  order: number | null
  visible: boolean
}
