import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-500 text-sm">Fill in the details for the new product</p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <ProductForm />
      </div>
    </div>
  )
}