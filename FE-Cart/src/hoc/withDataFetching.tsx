import React, { useEffect, useState, ComponentType } from "react";
import { Item } from "../model/Items";
import result from "../assets/products.json"; // ✅ Import JSON directly
import { useOutletContext } from "react-router-dom";

// Define a type for the fetched data
interface WithDataProps {
  data: Item[];
  loading: boolean;
  error: string | null;
  setLoading?: (loading: boolean) => void; // Accept setLoading from parent
}

// HOC Function
const withDataFetching = (key: string) => <P extends object>(
  WrappedComponent: ComponentType<P & WithDataProps>
): React.FC<Omit<P, keyof WithDataProps>> => {
  return (props) => {
    const { showFooter } = useOutletContext<{ showFooter: (footer: boolean) => void }>();
    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { products = {} } = result;
    useEffect(() => {
      try {
        console.log(`Fetching data for: ${key}`, products[key]);
        if (products[key]) {
          setData(products[key]); // ✅ Directly use imported JSON
          setLoading(false);
          showFooter(false);
        } else {
          throw new Error("Key not found in JSON");
        }
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
        showFooter(false);
      }
    }, [key]);

    return <WrappedComponent {...(props as P)} data={data} loading={loading} error={error} />;
  };
};

export default withDataFetching;
