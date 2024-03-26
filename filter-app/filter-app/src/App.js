function productCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}

      </th>
    </tr>
  )

}

function productRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>

    </tr>
  )
}

function productTable({ products }) {
  const row = []
  let lastCategory = null

  products.forEach((product) => {
    if (product.category) { }

  });

}