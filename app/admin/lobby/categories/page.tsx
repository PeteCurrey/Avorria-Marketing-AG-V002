import type { Metadata } from 'next'
import { getCategories } from '@/lib/lobby'
import { LobbyAdminNav } from '@/components/admin/LobbyAdminNav'
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
      <div className="border-b border-white/10 pb-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block mb-1">
          TAXONOMY GOVERNANCE // STRUCTURAL DOMAINS
        </span>
        <h1 className="text-2xl sm:text-3xl font-extralight text-white tracking-tight">
          Category Taxonomy Architecture
        </h1>
        <p className="text-sm font-light text-white/60 mt-1 max-w-2xl">
          Configure structural areas (Marketing, Search, Meta, Websites, Small Business, Tech, Avorria). Categories are database-driven and fully reorderable.
        </p>
      </div>

      <LobbyAdminNav />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Category List (8 cols) */}
        <div className="lg:col-span-8 border border-white/10 bg-[#111] overflow-x-auto">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-white/80">Active Categories</span>
            <span className="text-[11px] font-mono text-white/40">{categories.length} total</span>
          </div>

          <table className="w-full text-left text-xs font-light border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-mono uppercase tracking-wider text-white/40">
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Category Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-[11px]">
              {categories.map((cat) => (
                <tr key={cat.id || cat.slug} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4 text-white/40">
                    {cat.displayOrder || 0}
                  </td>
                  <td className="py-3.5 px-4 font-sans text-xs">
                    <p className="text-white">{cat.name || (cat as any).label}</p>
                    <p className="text-[10px] text-white/40 line-clamp-1">{cat.description || (cat as any).shortDescription}</p>
                  </td>
                  <td className="py-3.5 px-4 text-white/60">
                    /category/{cat.slug}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[9px] px-2 py-0.5 border ${
                        cat.isActive
                          ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-400'
                          : 'border-white/10 bg-white/5 text-white/40'
                      }`}
                    >
                      {cat.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <form action={toggleCategoryAction.bind(null, cat.id || cat.slug, cat.isActive)}>
                      <button
                        type="submit"
                        className="text-[11px] font-mono text-white/50 hover:text-white underline underline-offset-2"
                      >
                        {cat.isActive ? 'Disable' : 'Enable'}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Category Form (4 cols) */}
        <div className="lg:col-span-4 border border-white/10 p-6 bg-[#111] space-y-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">
              EXPAND TAXONOMY
            </span>
            <h3 className="text-sm font-mono uppercase text-white/90">
              + New Category
            </h3>
          </div>

          <form action={saveCategoryAction as any} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-white/60">Category Name *</label>
              <input
                name="name"
                required
                placeholder="e.g. Sovereign Infrastructure"
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-light text-white focus:border-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/60">Slug *</label>
              <input
                name="slug"
                required
                pattern="^[a-z0-9-]+$"
                placeholder="sovereign-infrastructure"
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/60">Description</label>
              <textarea
                name="description"
                rows={3}
                placeholder="Scope definition of what dispatches belong in this domain."
                className="w-full bg-[#181818] border border-white/15 p-2 text-xs font-light text-white focus:border-white focus:outline-none leading-relaxed"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-white/60">Display Order</label>
              <input
                type="number"
                name="displayOrder"
                defaultValue={categories.length + 1}
                className="w-full bg-[#181818] border border-white/15 px-3 py-2 text-xs font-mono text-white focus:border-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-white text-black text-xs font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Add Category
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}
