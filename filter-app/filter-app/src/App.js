import { useState } from 'react'

function FilterProductTable({ products }) {
  const [filterText, setFilterText] = useState('')
  const [isStockOnly, setIsStockOnly] = useState(false)
  return (
    <div>
      <SearchBar filterText={filterText} isStockOnly={isStockOnly} onFilterTextChange={setFilterText} onIsStockOnlyChange={setIsStockOnly} />
      <ProductTable products={products} filterText={filterText} isStockOnly={isStockOnly} />
    </div>
  )

}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="4">
        {category}
      </th>
    </tr>
  )

}

function ProductRow({ product }) {
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

function ProductTable({ products, filterText, isStockOnly }) {
  const rows = []
  let lastCategory = null

  products.forEach((product) => {

    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return
    }
    if (isStockOnly && !product.stocked) {
      return
    }
    if (product.category !== lastCategory) {

      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      )

    }

    rows.push(
      <ProductRow product={product} key={product.name} />
    )

    lastCategory = product.category
  })

  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function SearchBar({ filterText, isStockOnly, onFilterTextChange, onIsStockOnlyChange }) {
  return (
    <form>
      <input type="text" placeholder="search..." value={filterText} onChange={(e) => onFilterTextChange(e.target.value)} />
      <label >
        <input type="checkbox" checked={isStockOnly} onChange={(e) => onIsStockOnlyChange(e.target.checked)} />
        {' '}
        only show product in stock
      </label>
    </form>
  )

}




const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

export default function App() {
  return <FilterProductTable products={PRODUCTS} />

}
