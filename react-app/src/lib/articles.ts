import fs from 'fs'
import fsPromises from 'fs/promises'
import path from 'path'

import matter from 'gray-matter'

// Enhanced Article type with MDX support
export type Article = {
  path: string
  title: string
  subtitle: string
  date: string
  thumbnail: string
  // Smaller order shown first. Null order is last. Sorted alphabetically within
  // order.
  order: number | null
  // If true, will show up in navigation.
  visible: boolean
  content: string
  // New: Track if file is MDX for rendering purposes
  isMDX: boolean
}

export type Category = {
  // Articles with no category will be grouped together with a null name.
  name: string | null
  articles: Article[]

  // Added during static generation.
  active?: boolean
}

export type PageProps = {
  categories: Category[]
  article: Article | null
}

const articlesFolder = path.join(process.cwd(), 'public/articles')

const walk = async (dirPath: string): Promise<string[]> =>
  (
    await Promise.all(
      await fsPromises
        .readdir(dirPath, { withFileTypes: true })
        .then((entries) =>
          entries.flatMap(async (entry) =>
            entry.isDirectory()
              ? // Get all child paths and prepend with this directory.
                (await walk(path.join(dirPath, entry.name)))
                  .map((subEntry) => path.join(entry.name, subEntry))
                  .flat()
              : entry.name
          )
        )
    )
  ).flat()

export const getAllArticles = async (): Promise<Article[]> =>
  (await walk(articlesFolder))
    .map((fileName): Article => {
      const { data, content } = matter(
        fs.readFileSync(path.join(articlesFolder, fileName)).toString()
      )

      const paths = fileName.split('/').map((s) => s.replace(/\.mdx?$/, ''))
      const title = data.title || paths[paths.length - 1]

    //   const wordCount = content.split(/\s+/g).length
    //   const subtitle = `${wordCount} words (~${Math.round(
    //     wordCount / 250
    //   ).toLocaleString()} minute read)`

      return {
        path: '/' + paths.join('/'),
        title: title,
        subtitle: data.subtitle,
        date: data.date,
        thumbnail: data.thumbnail,
        content,
        order:
          typeof data.order === 'number'
            ? data.order
            : typeof data.order === 'string' && !isNaN(Number(data.order))
            ? Number(data.order)
            : null,
        visible: data.visible === true,
        isMDX: fileName.endsWith('.mdx'), // Determine if the file is MDX
      }
    })
    
    // Sort by order.
    .sort((a, b) => {
      const aOrder = a.order || Infinity
      const bOrder = b.order || Infinity

      // If same order, sort alphabetically by title.
      return aOrder === bOrder
        ? a.title.localeCompare(b.title)
        : aOrder - bOrder
    })

export const getAllSlicedArticles = async (): Promise<Article[]> => {
    const articles = await getAllArticles()

  // Shorten content from posts to minimize build size but allow previewing on
  // the homepage.
    const slicedArticles = articles.map((article) => ({
        ...article,
        content: article.content.slice(0, 300),
    }))

    return slicedArticles;
}

// export async function getArticleBySlug(slug: string) {
//   const articles = await getAllArticles()
//   return articles.find(article => article.slug === slug) || null
// }