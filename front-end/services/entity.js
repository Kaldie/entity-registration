import InternalMongoClient from "./mongo";
import { ObjectId } from "mongodb"


export default class EntityService {
    constructor() {
        this.mongo_client = new InternalMongoClient()
    }

    async add_entity(entity) {

        const collection = await this.mongo_client.get_entity_collection()

        if (entity._id) {
            const { _id, ...entity_without_id } = entity
            const update = { $set: entity_without_id }
            collection.updateOne({ _id: ObjectId(_id) }, update)
        } else {
            collection.insertOne(entity)
        }
    }

    async get_entity_by_id(id) {
        const objectId = ObjectId(id);
        const query = { _id: objectId }
        const collection = await this.mongo_client.get_entity_collection()
        const element = await collection.findOne(query)
        if (element) {
            element._id = element._id.toString()
            return element
        }
        return null
    }

    async get_all_entities_as_list() {
        const query = {}
        const options = {
            // projection: { _id: 0 }
        }
        const collection = await this.mongo_client.get_entity_collection()
        const elements = []
        await collection.find(query, options).forEach(element => {
            element._id = element._id.toString()
            elements.push(element)
        })

        if (elements.length === 0) {
            const example = {
                name: "Pylon",
                description: "A element that keeps lines of the ground",
                attributes: [
                    {
                        name: "Material",
                        type: "Text",
                        version: "None",
                        description: "Material of which the pylon is made"
                    },
                    {
                        name: "NeedMaintanance",
                        type: "Boolean",
                        version: "None",
                        description: "Is it in dire need of maintance"
                    }
                ]
            }
            await this.add_entity(example)
            return this.get_all_entities_as_list()
        }
        return elements
    }

    async delete_entity(entity) {
        const collection = await this.mongo_client.get_entity_collection()
        const { _id } = entity
        console.warn(_id)
        const stuff = await collection.deleteOne({
            _id: ObjectId(entity._id)
        })
        console.warn(stuff, entity, entity.description, {
            _id: ObjectId(entity._id)
        })
    }
}