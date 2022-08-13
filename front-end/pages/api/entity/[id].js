// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import EntityService from "../../../services/entity"

const entity_service = new EntityService()

export default async function userHandler(req, res) {
    const {
        query: { id, name },
        method,
    } = req

    switch (method) {
        case 'DELETE':
            console.log('here', [req.body])
            const entity = JSON.parse(req.body)
            console.warn(entity)
            entity_service.delete_entity(entity)
            // Get data from your database
            res.status(200).json()
            break
        case 'POST':
            entity_service.add_entity(req.body)
            res.status(200).json({ name: 'John Doe' })
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    return res
}
