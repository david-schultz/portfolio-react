import { getAllArticles } from './src/lib/articles.ts'

async function testMDX() {
  try {
    console.log('Testing MDX article processing...')
    const articles = await getAllArticles()
    
    console.log(`Found ${articles.length} articles:`)
    articles.forEach(article => {
      console.log(`- ${article.title} (${article.path}) - MDX: ${article.isMDX}`)
      console.log(`  Visible: ${article.visible}`)
      console.log(`  Content preview: ${article.content.substring(0, 100)}...`)
      console.log('')
    })
    
    console.log('✅ MDX integration test successful!')
  } catch (error) {
    console.error('❌ MDX integration test failed:', error)
  }
}

testMDX()
