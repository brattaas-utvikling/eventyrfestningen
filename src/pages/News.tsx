// src/routes/News.tsx
import { useParams, Link } from 'react-router-dom'
import { useSanityQuery } from '@/hooks/useSanityQuery'
import { queries } from '@/lib/sanityQueries'
import { urlFor } from '@/lib/sanity'
import { SEOHead } from '@/components/SEOHead'
import { generateArticleSchema } from '@/config/seo'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { Calendar, ArrowLeft, Share2 } from 'lucide-react'
import type { Post, PortableText as PortableTextType } from '@/types/sanity'
import { NewsSection } from '@/components/sections/NewsSection'

// liten, lokal renderer for Sanity Portable Text
function RenderPortableText({ value }: { value?: PortableTextType }) {
  if (!value) return null

  return (
    <>
      {value.map((block) => {
        if (block._type !== 'block') return null

        const text =
          block.children?.map((child) => child.text).join('') ?? ''

        switch (block.style) {
          case 'h2':
            return (
              <h2 key={block._key} className="h2 text-cynical-900 mt-6 mb-3">
                {text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={block._key} className="h3 text-cynical-900 mt-5 mb-2">
                {text}
              </h3>
            )
          default:
            return (
              <p key={block._key} className="lead text-cynical-700 mb-4">
                {text}
              </p>
            )
        }
      })}
    </>
  )
}

export function NewsPost() {
  const { slug } = useParams<{ slug: string }>()

  const { data: post, isLoading } = useSanityQuery<Post>(
    ['post', slug ?? ''],
    queries.postBySlug(slug ?? '')
  )

  const { data: relatedPosts } = useSanityQuery<Post[]>(
    ['recent-posts', '3'],
    queries.recentPosts(3)
  )

  const handleShare = async () => {
    if (navigator.share && post) {
      await navigator.share({
        title: post.title,
        text: post.excerpt ?? '',
        url: window.location.href,
      })
    }
  }

  if (isLoading) {
    return (
      <Section background="white">
        <Container size="md">
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </Container>
      </Section>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cynical-900">
        <div className="text-center">
          <h1 className="h1 text-white mb-4">
            Artikkelen ble ikke funnet
          </h1>
          <Button asChild variant="outline">
            <Link to="/nyheter">Tilbake til nyheter</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt ?? ''}
        image={
          post.mainImage
            ? urlFor(post.mainImage).width(1200).height(630).url()
            : undefined
        }
        type="article"
        schema={generateArticleSchema(post)}
      />
      
      <section className="py-12 sm:py-16 bg-cynical-900 border-b border-cynical-700">
        <Container size="md">
          <Button variant="ghost" className="mb-8" asChild>
            <Link to="/nyheter" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Tilbake til nyheter
            </Link>
          </Button>

          <h1 className="h1 text-white mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-cynical-300 mb-6">
            <Calendar className="h-4 w-4" />
            <span className="ui-text">
              {new Date(post.publishedAt).toLocaleDateString('nb-NO', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            {'share' in navigator ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="inline-flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Del
              </Button>
            ) : null}
          </div>
        </Container>
      </section>

      {post.mainImage ? (
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <img
            src={urlFor(post.mainImage).width(1920).height(1080).url()}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </section>
      ) : null}

      <Section background="cynical">
        <Container size="md">
          <article className="max-w-none space-y-4">
            <RenderPortableText value={post.body} />
          </article>
        </Container>
      </Section>

      {relatedPosts && relatedPosts.length > 0 ? (
        <NewsSection
          posts={relatedPosts.filter((p) => p._id !== post._id).slice(0, 3)}
          showTitle
        />
      ) : null}
    </>
  )
}

export function NewsList() {
  const { data: posts, isLoading } = useSanityQuery<Post[]>(
    'all-posts',
    queries.recentPosts(20)
  )

  return (
    <>
      <SEOHead
        title="Nyheter"
        description="Les de siste nyhetene fra Eventyrfestningen."
      />

      <section className="py-20 sm:py-28 bg-linear-to-br from-cynical-900 to-burgundy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="h1 text-white mb-6">
              Nyheter
            </h1>
            <p className="lead text-white/70">
              Hold deg oppdatert på det siste fra produksjonen, backstage og
              teatermiljøet.
            </p>
          </div>
        </Container>
      </section>

      {isLoading ? (
        <Section background="white">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : posts && posts.length > 0 ? (
        <NewsSection posts={posts} showTitle={false} />
      ) : (
        <Section background="cynical">
          <Container>
            <div className="text-center py-12">
              <p className="lead text-white/70">
                Ingen nyheter publisert ennå
              </p>
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
