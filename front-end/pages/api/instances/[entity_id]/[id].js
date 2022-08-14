// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import InstanceService from "../../../../services/instances"

const instanceService = new InstanceService()

export default async function userHandler(req, res) {
    const {
        query: { entity_id, id },
        method,
    } = req

    switch (method) {
        case "GET":
            const instance = instanceService.get_instance_by_id(id)
            res.status(200).json({ instance })
            break;
        case "DELETE":
            instanceService.delete_instance_by_id(id)
            res.status(204).end()
            break;
        case "POST":
            entity_service.add_entity(req.body)
            res.status(200).end()
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    return res
}
