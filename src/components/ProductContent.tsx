import { useEffect, useState } from "react";
import { ClipboardList, Trash2 } from "lucide-react";
import { getProducts } from "@/services/api";
import { AddProductModal } from "@/components/AddProductModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/services/api";
import { toast } from "react-toastify";

export function ProductsContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const token =
        (typeof window !== "undefined" && localStorage.getItem("TOKEN")) || "";
      const data = await getProducts(token);
      console.log(data);
      if (data.data) {
        setProducts(data?.data);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">
        Products Management
      </h2>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {products?.map((product: any) => (
            <ProductCard
              key={product._id}
              title={product.name}
              value={product.quantity}
              icon={<ClipboardList className="h-6 w-6" />}
              price={product.price}
              description={product.description}
              id={product._id}
              setProducts={setProducts}
              image={product.image}
            />
          ))}
          {products?.length === 0 && loading === false && (
            <>
              <p>No products found</p>
            </>
          )}
          <AddProductModal setProducts={setProducts} />
        </div>
      )}
    </div>
  );
}

function ProductCard({
  title,
  value,
  icon,
  price,
  description,
  id,
  setProducts,
  image,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  price: number;
  description?: string;
  id: string;
  setProducts: any;
  image?: string;
}) {
  const handleDeleteProduct = (id: string) => async () => {
    const token =
      (typeof window !== "undefined" && localStorage.getItem("TOKEN")) || "";
    const response = await deleteProduct(id, token);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    setProducts((prev: any) =>
      prev.filter((product: any) => product._id !== id)
    );
    toast.success("Product deleted successfully!");
  };
  return (
    <Card key={id} className="group hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-extrabold">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-1 text-gray-500">{description}</div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-500">Price: Rs {price}</div>
      </CardContent>
      <div className="flex flex-row justify-between">
        {image && (
          <img src={image} alt={title} className="w-40 h-40 object-cover" />
        )}
        <div className="flex justify-end p-4 group-hover:opacity-100 opacity-0 transition-opacity">
          <Button
            variant="destructive"
            size="icon"
            onClick={handleDeleteProduct(id)}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </Card>
  );
}
