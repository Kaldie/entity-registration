import InternalMongoClient from "./mongo";
import { ObjectId } from "mongodb"


export default class InstanceService {
    constructor() {
        this.mongo_client = new InternalMongoClient()
    }

    async add_instance(instance) {

        const collection = await this.mongo_client.get_instance_collection()

        if (instance._id) {
            const { _id, ...instance_without_id } = instance
            const update = { $set: instance_without_id }
            await collection.updateOne({ _id: ObjectId(_id) }, update)
        } else {
            await collection.insertOne(instance)
        }
    }

    async get_instance_by_id(id) {
        const objectId = ObjectId(id);
        const query = { _id: objectId }
        const collection = await this.mongo_client.get_instance_collection()
        const element = await collection.findOne(query)
        if (element) {
            element._id = element._id.toString()
            element.entity_id = element.entity_id.toString()
        }
        return element
    }

    async get_all_instances_by_entity(entity) {
        console.info(entity)
        const query = { entity_id: entity._id }
        const options = {
            // projection: { _id: 0 }
        }
        const collection = await this.mongo_client.get_instance_collection()
        const elements = []
        await collection.find(query, options).forEach(element => {
            element._id = element._id.toString()
            element.entity_id = element.entity_id.toString()
            elements.push(element)
        })

        return elements
    }


    async get_all_instances() {
        const query = {}
        const options = {
            // projection: { _id: 0 }
        }
        const collection = await this.mongo_client.get_instance_collection()
        const elements = []
        await collection.find(query, options).forEach(element => {
            element._id = element._id.toString()
            element.entity_id = element.entity_id.toString()
            elements.push(element)
        })

        return elements
    }

    async get_all_instances_by_entity_id(entity_id) {
        return this.get_all_instances_by_entity({ _id: entity_id })
    }

    async delete_instance(instance) {
        const collection = await this.mongo_client.get_instance_collection()
        const { _id } = instance
        console.warn(_id)
        const stuff = await collection.deleteOne({
            _id: ObjectId(instance._id)
        })
        console.warn(stuff, instance)
    }

    async delete_instance_by_id(id) {
        await this.delete_instance({ _id: id })
    }
}