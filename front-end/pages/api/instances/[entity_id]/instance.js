// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import InstanceService from "../../../../services/instances"

const instance_service = new InstanceService()

export default async function userHandler(req, res) {
    const {
        method,
        query
    } = req

    switch (method) {
        case "GET":
            const instances = await instance_service.get_all_instances_by_entity_id(query.entity_id)
            // Get data from your database
            res.status(200).json({ instances })
            break
        case "POST":
            instance_service.add_instance(req.body)
            res.status(200).json({ john: "dohwn" })
            break
        default:
            res.setHeader("Allow", ["GET, POST"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    return res
}
