import { reader } from "../reader";
import ProductPageClient from "./ProductPageClient";

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

    // Load contact information for WhatsApp and phone links
    const contact = await reader.singletons.contact.read();
    const phoneNumber = contact?.phoneNumber || '';
    const phoneNumberFormatted = phoneNumber.replace(/[^0-9]/g, '');
    const whatsappBaseUrl = `https://wa.me/${phoneNumberFormatted}`;

    return (
        <ProductPageClient 
            categories={categories}
            phoneNumber={phoneNumber}
            whatsappBaseUrl={whatsappBaseUrl}
        />
    );
}