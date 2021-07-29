import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, updateSales] = useState(props.sales);

  const { data, error } = useSWR(
    "https://nextjs-course-9ca7b-default-rtdb.firebaseio.com/sales.json"
  );
  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      updateSales(transformedSales);
    }
  }, [data]);

  if (!data || !sales) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => {
        return (
          <li key={sale.id}>
            {sale.username} - ${sale.volume}
          </li>
        );
      })}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-9ca7b-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();
  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { sales: transformedSales } };
}

export default LastSalesPage;
