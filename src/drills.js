require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})


function searchByProduceName(searchTerm) {
    knexInstance
      .select('id', 'name', 'price', 'date_added', 'checked','category')
      .from('shopping_list')
      .where('name', 'ILIKE', `%${searchTerm}%`)
      .then(result => {
        console.log(result)
      })
  }

// searchByProduceName('Pre')

function paginateProducts(page) {
    const productsPerPage = 10
    const offset = productsPerPage * (page - 1)
    knexInstance
    .select('id', 'name', 'price', 'date_added', 'checked','category')
      .from('shopping_list')
      .limit(productsPerPage)
      .offset(offset)
      .then(result => {
        console.log(result)
      })
}
// paginateProducts(2)

function productsAddedDaysAgo(daysAgo) {
    knexInstance
      .select('id', 'name', 'price', 'date_added', 'checked','category')
      .where(
        'date_added',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
      )
      .from('shopping_list')
      .then(result => {
        console.log(result)
      })
}
// productsAddedDaysAgo(45)

function totalCostForCategories() {
    knexInstance
      .select('category')
      .sum('price as total')
      .from('shopping_list')
      .groupBy('category')
      .orderBy([
        { column: 'total', order: 'ASC' },
      ])
      .then(result => {
        console.log(result)
      })
}
totalCostForCategories()