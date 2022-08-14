// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import EntityService from "../../services/entity"

const entity_service = new EntityService()

export default async function userHandler(req, res) {
    const {
        method,
    } = req

    switch (method) {
        case "POST":
            entity_service.add_entity(req.body)
            res.status(200)
            break
        default:
            res.setHeader("Allow", ["POST"])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    return res
}
