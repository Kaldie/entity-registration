import { MongoClient } from "mongodb"


export default class InternalMongoClient {
    static client = undefined

    constructor() {
        this.username = process.env.MONGO_USERNAME || "user"
        this.password = process.env.MONGO_PASSWORD || "password"
        this.host = process.env.MONGO_HOST || "host"
        this.port = process.env.MONGO_PORT || "27017"
        this.dbName = process.env.MONGO_DBNAME || "myProject";
        this.url = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}`;

        this.entity_collection_name = "entity"
        this.instance_collection_name = "instance"

    }

    create_client() {

        if (!InternalMongoClient.client) {
            InternalMongoClient.client = new MongoClient(this.url);
        }

        return this.client
    }

    async connect_client() {
        if (!InternalMongoClient.client) {
            this.create_client()
        }

        await InternalMongoClient.client.connect();


        return InternalMongoClient.client;
    }

    async get_entity_collection() {
        await this.connect_client()
        return InternalMongoClient.client.db(this.dbName).collection(this.entity_collection_name)
    }

    async get_instance_collection() {
        await this.connect_client()
        return InternalMongoClient.client.db(this.dbName).collection(this.instance_collection_name)
    }

}