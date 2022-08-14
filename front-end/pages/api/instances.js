// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import InstanceService from "../../services/instances"

const instance_service = new InstanceService()

export default async function userHandler(req, res) {
    const {
        method,
    } = req

    switch (method) {
        case "GET":
            const instances = await instance_service.get_all_instances()
            // Get data from your database
            res.status(200).json(JSON.stringify(instances))
            break
        default:
            res.setHeader("Allow", ["GET"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    return res
}
