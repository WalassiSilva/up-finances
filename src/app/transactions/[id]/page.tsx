import React from "react";

// type params
type TransactionProps = {
  params: {
    id: string;
  };
};

export default function Transaction({ params: { id } }: TransactionProps) {
  return <div>Transaction: {id}</div>;
}
