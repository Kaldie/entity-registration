// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import EntityService from "../../services/entity"

const entity_service = new EntityService()

export default async function userHandler(req, res) {
    const {
        method,
    } = req

    switch (method) {
        case 'GET':

            // Get data from your database
            res.status(200).json({ magic: 'snow' })
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
