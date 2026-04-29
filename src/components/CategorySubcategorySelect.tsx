'use client'
/**
 * CategorySubcategorySelect
 *
 * Drop-in component for admin product create/edit forms.
 * Renders a category <select> and, when the chosen category has subcategories,
 * a second <select> for the subcategory.
 *
 * Usage:
 *   <CategorySubcategorySelect
 *     category={form.category}
 *     subcategory={form.subcategory}
 *     onCategoryChange={(cat) => setForm(f => ({ ...f, category: cat, subcategory: '' }))}
 *     onSubcategoryChange={(sub) => setForm(f => ({ ...f, subcategory: sub }))}
 *   />
 */

import { PRODUCT_CATEGORIES, getSubcategories } from '@/lib/constants'

interface Props {
  category: string
  subcategory?: string
  onCategoryChange: (category: string) => void
  onSubcategoryChange: (subcategory: string) => void
  /** Pass Tailwind classes to override the default select styling */
  className?: string
  required?: boolean
}

export default function CategorySubcategorySelect({
  category,
  subcategory = '',
  onCategoryChange,
  onSubcategoryChange,
  className = '',
  required = false,
}: Props) {
  const subcategories = getSubcategories(category)
  const hasSubcategories = subcategories.length > 0

  const baseSelect =
    'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#1565C0] focus:ring-2 focus:ring-blue-50 transition-all ' +
    className

  return (
    <div className="flex flex-col gap-3">
      {/* Category */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Category {required && <span className="text-red-400">*</span>}
        </label>
        <select
          value={category}
          onChange={e => {
            onCategoryChange(e.target.value)
            // Always reset subcategory when category changes
            onSubcategoryChange('')
          }}
          required={required}
          className={baseSelect}
        >
          <option value="">— Select a category —</option>
          {PRODUCT_CATEGORIES.map(cat => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory — only rendered when the chosen category has subcategories */}
      {hasSubcategories && (
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Subcategory
          </label>
          <select
            value={subcategory}
            onChange={e => onSubcategoryChange(e.target.value)}
            className={baseSelect}
          >
            <option value="">— All / No subcategory —</option>
            {subcategories.map(sub => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}