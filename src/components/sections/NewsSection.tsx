// components/sections/NewsSection.tsx
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { urlFor } from '@/lib/sanity'
import type { Post } from '@/types/sanity'

interface NewsSectionProps {
  posts: Post[]
  showTitle?: boolean
  limit?: number
}

export function NewsSection({ posts, showTitle = true, limit }: NewsSectionProps) {
  const displayPosts = limit ? posts.slice(0, limit) : posts

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-navy-50">
      <Container>
        {/* Header */}
        {showTitle && (
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-4">
                Siste nytt
              </h2>
              <p className="text-lg text-gray-600">
                Hold deg oppdatert på produksjonen
              </p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link to="/nyheter">
                Se alle nyheter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/nyheter/${post.slug}`}>
                <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  {/* Image */}
                  {post.mainImage && (
                    <div className="aspect-video overflow-hidden bg-linear-to-br from-navy-900 to-burgundy-900">
                      <img
                        src={urlFor(post.mainImage)
                          .width(800)
                          .height(450)
                          .quality(85)
                          .auto('format')
                          .url()}
                        alt={post.mainImage.alt || post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}

                  <CardContent className="p-6">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('nb-NO', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </time>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-display font-bold text-navy-900 mb-3 group-hover:text-torch-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-700 line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Read more */}
                    <div className="flex items-center text-torch-600 font-semibold group-hover:gap-2 transition-all">
                      <span>Les mer</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Show all button */}
        {showTitle && (
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link to="/nyheter">
                Se alle nyheter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </Container>
    </section>
  )
}