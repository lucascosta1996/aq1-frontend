// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default async function handler(req, res) {
//   try {
//     // Initialize Zora
//     const zora = initializeZora()

//     // Get the collection address
//     const { data } = await axios.get('https://api.opensea.io/api/v1/collection/aqone')
//     const collectionAddress = data['collection']['address'];

//     // Get the collection
//     const collection = await zora.fetchCollection(collectionAddress)

//     // Return the collection as JSON
//     res.status(200).json(collection)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Internal server error' })
//   }
// }

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
