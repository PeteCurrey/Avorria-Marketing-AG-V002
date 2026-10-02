import type { Metadata } from 'next'
import { getCategories } from '@/lib/lobby'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'
import { PageHeader } from '@/components/ui/dashboard/PageHeader'
import { SectionLabel } from '@/components/ui/dashboard/SectionLabel'
import { Button } from '@/components/ui/Button'
import { saveCategoryAction, toggleCategoryAction } from '@/lib/actions/lobby'

export const metadata: Metadata = {
  title: 'Category Manager // The Lobby Admin // Avorria',
  robots: { index: false, follow: false },
}

export default async function AdminCategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <PageHeader
        label="TAXONOMY GOVERNANCE"
        title="Category Architecture"
      />

      <LobbyAdminNav />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Category List (8 cols) */}
        <div className="lg:col-span-8 border border-[var(--color-border)] bg-white overflow-x-auto">
          <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
            <SectionLabel>Active Categories ({categories.length})</SectionLabel>
          </div>

          <table className="w-full text-left text-sm font-light border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-ivory-dark)] text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Category Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {categories.map((cat) => (
                <tr key={cat.id || cat.slug} className="hover:bg-[var(--color-ivory)] h-14">
                  <td className="py-3.5 px-4 text-[var(--color-graphite-muted)]">
                    {cat.displayOrder || 0}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-[var(--color-graphite)]">{cat.name}</p>
                    <p className="text-[0.6875rem] text-[var(--color-graphite-muted)] line-clamp-1">{cat.description}</p>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-[var(--color-graphite-mid)]">
                    /{cat.slug}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite-muted)]">
                      {cat.isActive !== false ? 'Active' : 'Disabled'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <form action={toggleCategoryAction.bind(null, cat.id, cat.isActive !== false)}>
                      <button
                        type="submit"
                        className="text-[0.6875rem] font-light tracking-[0.1em] uppercase text-[var(--color-graphite)] hover:text-[var(--color-accent)] underline underline-offset-4"
                      >
                        {cat.isActive !== false ? 'Deactivate' : 'Activate'}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Category (4 cols) */}
        <div className="lg:col-span-4 border border-[var(--color-border)] p-6 bg-white space-y-4">
          <SectionLabel>Add Category</SectionLabel>

          <form action={saveCategoryAction as any} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                Category Name *
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="e.g. AI Strategy"
                className="w-full border border-[var(--color-border)] px-3 py-2 text-sm font-light text-[var(--color-graphite)] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="slug" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                URL Slug *
              </label>
              <input
                id="slug"
                name="slug"
                required
                pattern="^[a-z0-9-]+$"
                placeholder="ai-strategy"
                className="w-full border border-[var(--color-border)] px-3 py-2 text-sm font-mono text-[var(--color-graphite)] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="description" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={2}
                placeholder="Scope and purpose of this topic category..."
                className="w-full border border-[var(--color-border)] p-3 text-xs font-light text-[var(--color-graphite)] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="displayOrder" className="block text-[0.6875rem] font-light tracking-[0.14em] uppercase text-[var(--color-graphite-muted)]">
                Display Order
              </label>
              <input
                id="displayOrder"
                name="displayOrder"
                type="number"
                defaultValue={categories.length + 1}
                className="w-full border border-[var(--color-border)] px-3 py-2 text-sm font-light text-[var(--color-graphite)] focus:outline-none"
              />
            </div>

            <Button type="submit" variant="primary" size="sm" className="w-full">
              Create Category
            </Button>
          </form>
        </div>

      </div>

    </div>
  )
}
