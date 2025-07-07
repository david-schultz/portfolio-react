


export default function MarkdownDemo() {



  return (
    <>

      <section className="md:col-span-4 flex flex-col gap-4 md:sticky md:top-16 self-start">
        <p>todo</p>
      </section>

      <main className="md:col-span-8 flex flex-col">
        <nav className="flex gap-1 font-mono text-xs items-center sticky top-0 pt-16 bg-bg z-[10000]">todo</nav>

        <article className="max-w-4xl mx-auto px-2 py-8">
          {renderedContent}
        </article>
      </main>
    
    </>
  )
}