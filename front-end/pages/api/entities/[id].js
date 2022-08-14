// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import EntityService from "../../../services/entity"

const entity_service = new EntityService()

export default async function userHandler(req, res) {
    const {
        query: { id },
        method,
    } = req

    switch (method) {
        case "GET":
            const entity = await entity_service.get_entity_by_id(id)
            res.status(200).json(entity)
            break;
        case "DELETE":
            // TODO: check if id in body===id in query
            const thisEntity = JSON.parse(req.body)
            entity_service.delete_entity(thisEntity)
            res.status(204).end()
            break
        case "POST":
            // TODO: check if id in body===id in query
            entity_service.add_entity(req.body)
            res.status(200).end()
            break
        default:
            res.setHeader("Allow", ["DELETE", "POST"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    return res
}
