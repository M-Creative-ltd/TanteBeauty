'use client';

import { useState } from 'react';
import { ProductCard } from '../components/ui/productCard/productCard';
import ProductOverlay from '../components/ui/ProductOverlay/ProductOverlay';

// Type for ProductCategory from keystatic reader
type ProductCategoryEntry = Awaited<ReturnType<typeof import('../reader').reader.collections.productCategories.read>>;

export interface ProductCategory extends NonNullable<ProductCategoryEntry> {
    slug: string;
}

interface ProductPageClientProps {
    categories: ProductCategory[];
    phoneNumber: string;
    whatsappBaseUrl: string;
}

interface SelectedProduct {
    productName: string;
    productImage: string;
    productDescription: string;
    productPrice: number;
    productCurrency: string;
}

export default function ProductPageClient({ categories, phoneNumber, whatsappBaseUrl }: ProductPageClientProps) {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null);

    const handleProductClick = (product: {
        product_name: string;
        image_url: string | null;
        details: { description: string };
        price: { amount: number | null; currency: string };
        stock_status?: boolean;
    }) => {
        setSelectedProduct({
            productName: product.product_name,
            productImage: product.image_url || '',
            productDescription: product.details.description,
            productPrice: product.price.amount || 0,
            productCurrency: product.price.currency,
        });
        setIsOverlayOpen(true);
    };

    const handleCloseOverlay = () => {
        setIsOverlayOpen(false);
        setSelectedProduct(null);
    };

    const getWhatsAppUrl = (productName: string) => {
        const message = `Hello, I would like to order *${productName}*`;
        return `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-4xl font-bold text-center mb-16 text-primary font-serif">
                    TANTE BEAUTY PRODUCTS
                </h1>

                {categories.map((category) => (
                    <section key={category.slug} className="mb-20">
                        <div className="border-b-2 border-primary mb-8 pb-2">
                            <h2 className="text-2xl font-bold uppercase tracking-widest text-primary font-serif">
                                {category.category_name}
                            </h2>
                            {category.description && (
                                <p className="text-gray-600 mt-2 italic">{category.description}</p>
                            )}
                        </div>

                        {category.sub_categories.map((subCategory, subIndex) => (
                            <div key={subIndex} className="mb-12">
                                <h3 className="text-lg font-medium mb-6 text-primary/80 flex items-center font-serif">
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
                                                ProductInStock={product.stock_status ?? true}
                                                onClick={() => handleProductClick(product)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                ))}
            </div>

            {selectedProduct && (
                <ProductOverlay
                    isOpen={isOverlayOpen}
                    onClose={handleCloseOverlay}
                    product={selectedProduct}
                    phoneNumber={phoneNumber}
                    whatsappUrl={getWhatsAppUrl(selectedProduct.productName)}
                />
            )}
        </>
    );
}

