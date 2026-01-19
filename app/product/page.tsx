import { ProductCard } from "../components/ui/productCard/productCard";
import { reader } from "../reader";

// Type for ProductCategory from keystatic reader
type ProductCategoryEntry = Awaited<ReturnType<typeof reader.collections.productCategories.read>>;

// Interface for ProductCategory data structure with slug
export interface ProductCategory extends NonNullable<ProductCategoryEntry> {
    slug: string;
}

export default async function ProductPage() {
    // Load all product categories
    const categorySlugs = await reader.collections.productCategories.list();
   
    const productCategories = await Promise.all(
        categorySlugs.map(async (slug) => {
            const category = await reader.collections.productCategories.read(slug);
            if (!category) {
                
                return null;
            }
          
            return { ...category, slug } as ProductCategory;
        })
    );

    
    // Filter out null values
    const categories = productCategories.filter(
        (category): category is ProductCategory => category !== null
    );
   

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center mb-16 text-primary">
                TANTE BEAUTY PRODUCTS
            </h1>

            {categories.map((category) => (
                <section key={category.slug} className="mb-20">
                    <div className="border-b-2 border-primary mb-8 pb-2">
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-primary">
                            {category.category_name}
                        </h2>
                        {category.description && (
                            <p className="text-gray-600 mt-2 italic">{category.description}</p>
                        )}
                    </div>

                    {category.sub_categories.map((subCategory, subIndex) => (
                        <div key={subIndex} className="mb-12">
                            <h3 className="text-lg font-medium mb-6 text-primary/80 flex items-center">
                                <span className="w-8 h-[1px] bg-primary/40 mr-3"></span>
                                {subCategory.sub_category_name}
                            </h3>
                            
                            {/* RESPONSIVE GRID: No more manual column calculation */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {subCategory.products.map((product, productIndex) => (
                                    <div key={productIndex} className="flex justify-center">
                                        <ProductCard
                                            productName={product.product_name}
                                            productImage={product.image_url || ''}
                                            productPrice={product.price.amount || 0}
                                            productCurrency={product.price.currency}
                                            productDescription={product.details.description}
                                            productCategory={subCategory.sub_category_name}
                                            ProductInStock={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
}